/**
 * IntelliPantry - Master Production Supabase Engine
 * 
 * Features:
 * - Real Supabase Authentication (signInWithPassword, signUp, signOut, getSession, onAuthStateChange)
 * - Strict User Isolation & Permanent Source of Truth in Supabase
 * - Auto Profile Association (profiles table)
 * - Pantry Products CRUD (pantry_products table) with RLS
 * - Alerts CRUD (alerts table) with RLS
 * - Notification Preferences (notification_preferences table) with RLS
 * - Activity Logs (activity_logs table) with RLS
 * - Supabase Realtime WebSocket Subscriptions for live updates
 * - Clean unsubscribe on logout/user switch
 * - Serverless Resend Login Notifications
 */

(function(window) {
  class SupabaseService {
    constructor() {
      this.client = null;
      this.activeChannels = {};
      this.init();
    }

    init() {
      const config = window.SupabaseConfig ? window.SupabaseConfig.get() : null;
      if (!config || !window.supabase) {
        return;
      }

      try {
        if (config.isConfigured) {
          this.client = window.supabase.createClient(config.url, config.key, {
            auth: {
              persistSession: true,
              autoRefreshToken: true,
              detectSessionInUrl: true,
              storage: window.localStorage
            }
          });
          window.supabaseClient = this.client;
          console.log("[Supabase] Connected to live PostgreSQL database at:", config.url);
        }
      } catch (err) {
        console.error("[Supabase] Initialization error:", err);
      }
    }

    isReady() {
      if (!this.client && window.SupabaseConfig && window.SupabaseConfig.isConfigured()) {
        this.init();
      }
      return Boolean(this.client);
    }

    isUUID(str) {
      return typeof str === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
    }

    // Secure helper: Always extract authenticated user's real Supabase Auth UUID
    async getAuthenticatedUserId(fallbackId = null) {
      if (this.isReady()) {
        try {
          const { data: { session } } = await this.client.auth.getSession();
          if (session && session.user && session.user.id && this.isUUID(session.user.id)) {
            return session.user.id;
          }
        } catch (e) {}

        try {
          const { data: { user } } = await this.client.auth.getUser();
          if (user && user.id && this.isUUID(user.id)) return user.id;
        } catch (e) {}
      }

      try {
        const raw = localStorage.getItem('smartpantry_user');
        if (raw) {
          const u = JSON.parse(raw);
          if (u && u.id && this.isUUID(u.id)) return u.id;
        }
      } catch (e) {}

      if (fallbackId && typeof fallbackId === 'string' && this.isUUID(fallbackId)) {
        return fallbackId;
      }

      return null;
    }

    getCanonicalRedirectUrl(path = '/') {
      // 1. Detect if running in local development
      const isLocal = typeof window !== 'undefined' && (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.protocol === 'file:'
      );

      if (isLocal) {
        const port = window.location.port ? `:${window.location.port}` : '';
        const origin = window.location.protocol === 'file:' 
          ? 'http://localhost:3000' 
          : `${window.location.protocol}//${window.location.hostname}${port}`;
        return `${origin}${path.startsWith('/') ? path : '/' + path}`;
      }

      // 2. Production canonical domain: https://www.intellipantry.in
      const canonicalBase = 'https://www.intellipantry.in';
      if (!path || path === '/') {
        return `${canonicalBase}/`;
      }
      return `${canonicalBase}${path.startsWith('/') ? path : '/' + path}`;
    }

    // ==========================================
    // 1. REAL SUPABASE AUTHENTICATION
    // ==========================================

    async signUp(email, password, fullName) {
      if (!email || !email.includes('@')) {
        return { success: false, error: "Please enter a valid email address." };
      }
      if (!password || password.length < 6) {
        return { success: false, error: "Password must be at least 6 characters long." };
      }

      if (!this.isReady()) {
        return { 
          success: false, 
          error: "Supabase connection required. Configure your Supabase project URL and anon key." 
        };
      }

      try {
        const cleanEmail = email.trim().toLowerCase();
        const cleanName = (fullName || cleanEmail.split('@')[0]).trim();

        // Canonical production redirect to https://www.intellipantry.in/
        const redirectUrl = this.getCanonicalRedirectUrl('/');
        const { data, error } = await this.client.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: cleanName
            }
          }
        });

        if (error) {
          let friendlyError = error.message;
          const msg = (error.message || '').toLowerCase();
          if (msg.includes('user already registered') || msg.includes('already exists')) {
            friendlyError = "An account with this email already exists. Please log in.";
          } else if (msg.includes('sending confirmation email') || msg.includes('confirmation email')) {
            friendlyError = "Supabase email delivery error: Supabase cannot send confirmation emails right now. To enable instant signup, turn OFF 'Confirm email' in Supabase Dashboard (Authentication > Providers > Email), or configure Custom SMTP.";
          } else if (msg.includes('password') && (msg.includes('short') || msg.includes('least') || msg.includes('weak'))) {
            friendlyError = "Password must be at least 6 characters long.";
          } else if (msg.includes('rate limit')) {
            friendlyError = "Too many requests. Please wait a few moments before trying again.";
          } else if (msg.includes('failed to fetch') || msg.includes('network') || msg.includes('load failed')) {
            friendlyError = "Unable to reach Supabase. Please verify your Supabase Project URL (https://<project-ref>.supabase.co) is correctly configured in Vercel.";
          }
          return { success: false, error: friendlyError, rawError: error.message };
        }

        const user = data.user;
        const session = data.session;

        // If user already exists in Supabase GoTrue
        if (user && user.identities && user.identities.length === 0) {
          return { success: false, error: "An account with this email already exists. Please log in." };
        }

        const isConfirmed = Boolean(user.email_confirmed_at || user.confirmed_at || (session && session.access_token));
        const userObj = {
          id: user.id,
          email: user.email,
          name: cleanName,
          emailVerified: isConfirmed
        };

        // Create or update profile in profiles table
        await this.ensureProfile(userObj);

        // DO NOT auto-login user upon signup.
        // User logs in via the Sign In form
        return {
          success: true,
          user: userObj,
          session: session,
          token: session ? session.access_token : null,
          needsEmailConfirmation: !isConfirmed
        };
      } catch (err) {
        let msg = err.message || "Signup failed on Supabase server.";
        if (msg.toLowerCase().includes('failed to fetch') || msg.toLowerCase().includes('network')) {
          msg = "Unable to connect to the server. Please check your internet connection.";
        }
        return { success: false, error: msg };
      }
    }

    async signIn(email, password) {
      if (!email || !email.includes('@')) {
        return { success: false, error: "Please enter your registered email address." };
      }
      if (!password) {
        return { success: false, error: "Please enter your password." };
      }

      if (!this.isReady()) {
        return { 
          success: false, 
          error: "Supabase connection required. Configure your Supabase project URL and anon key." 
        };
      }

      try {
        const cleanEmail = email.trim().toLowerCase();
        const { data, error } = await this.client.auth.signInWithPassword({
          email: cleanEmail,
          password
        });

        if (error) {
          let friendlyError = error.message;
          const msg = (error.message || '').toLowerCase();
          if (msg.includes('invalid login credentials') || msg.includes('invalid credentials')) {
            friendlyError = "Incorrect email or password. Please try again.";
          } else if (msg.includes('email not confirmed')) {
            friendlyError = "Email not confirmed. Please check your inbox or resend the verification email.";
          } else if (msg.includes('user not found')) {
            friendlyError = "No account found with this email address. Please sign up.";
          } else if (msg.includes('rate limit')) {
            friendlyError = "Too many login attempts. Please wait a few moments before trying again.";
          } else if (msg.includes('failed to fetch') || msg.includes('network') || msg.includes('load failed')) {
            friendlyError = "Unable to reach Supabase. Please verify your Supabase Project URL (https://<project-ref>.supabase.co) is correctly configured in Vercel.";
          }
          return { success: false, error: friendlyError, rawError: error.message };
        }

        const user = data.user;
        const session = data.session;

        const userObj = {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || cleanEmail.split('@')[0] || 'Pantry Chef',
          emailVerified: Boolean(user.email_confirmed_at || user.confirmed_at)
        };

        // Ensure profile row exists in public.profiles
        await this.ensureProfile(userObj);

        localStorage.setItem('smartpantry_token', session.access_token);
        localStorage.setItem('smartpantry_user', JSON.stringify(userObj));

        // Dispatch background login alert
        this.dispatchLoginNotification(userObj);

        return {
          success: true,
          user: userObj,
          session,
          token: session.access_token
        };
      } catch (err) {
        let msg = err.message || "Authentication error.";
        if (msg.toLowerCase().includes('failed to fetch') || msg.toLowerCase().includes('network')) {
          msg = "Unable to connect to the server. Please check your internet connection.";
        }
        return { success: false, error: msg };
      }
    }

    async signInWithOAuth(provider = 'google') {
      if (!this.isReady()) {
        return { success: false, error: "Supabase connection required." };
      }
      try {
        const redirectTo = this.getCanonicalRedirectUrl('/');
        const { data, error } = await this.client.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo
          }
        });
        if (error) return { success: false, error: error.message };
        return { success: true, data };
      } catch (err) {
        return { success: false, error: err.message || "Failed to initialize OAuth sign in." };
      }
    }

    async signOut() {
      try {
        this.unsubscribeAll();
        if (this.isReady()) {
          await this.client.auth.signOut();
        }
      } catch (err) {
        console.warn("[Supabase Auth] SignOut error:", err);
      } finally {
        localStorage.removeItem('smartpantry_token');
        localStorage.removeItem('smartpantry_user');
      }
    }

    async signOutOtherSessions() {
      if (!this.isReady()) return { success: false, error: "Supabase connection required." };
      try {
        if (this.client.auth && typeof this.client.auth.signOut === 'function') {
          const { error } = await this.client.auth.signOut({ scope: 'others' });
          if (error) throw error;
          return { success: true };
        }
        return { success: true };
      } catch (err) {
        console.warn("[Supabase Auth] signOutOtherSessions error:", err);
        return { success: false, error: err.message || "Failed to sign out other sessions." };
      }
    }

    isAuthenticated() {
      if (!this.isReady()) return false;
      const token = localStorage.getItem('smartpantry_token');
      const userRaw = localStorage.getItem('smartpantry_user');
      if (!token || !userRaw || token === 'guest_access_token') return false;
      try {
        const u = JSON.parse(userRaw);
        return Boolean(u && u.id && u.id !== 'guest_pantry_user');
      } catch (e) {
        return false;
      }
    }

    async getCurrentUser() {
      if (this.isReady()) {
        try {
          const { data: { user } } = await this.client.auth.getUser();
          if (user) {
            return {
              id: user.id,
              email: user.email,
              name: user.user_metadata?.full_name || user.email.split('@')[0] || 'Pantry Chef',
              avatarUrl: user.user_metadata?.avatar_url || '',
              emailVerified: Boolean(user.email_confirmed_at || user.confirmed_at),
              createdAt: user.created_at,
              lastSignInAt: user.last_sign_in_at
            };
          }
        } catch (e) {}
      }

      try {
        const raw = localStorage.getItem('smartpantry_user');
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    }

    async getSession() {
      if (!this.isReady()) return null;
      try {
        const { data: { session } } = await this.client.auth.getSession();
        return session;
      } catch (e) {
        return null;
      }
    }

    onAuthStateChange(callback) {
      if (!this.isReady()) return null;
      try {
        return this.client.auth.onAuthStateChange(callback);
      } catch (e) {
        console.warn("[Supabase Auth] onAuthStateChange error:", e);
        return null;
      }
    }

    async updatePassword(newPassword) {
      if (!this.isReady()) return { success: false, error: "Supabase connection required." };
      try {
        const { data, error } = await this.client.auth.updateUser({ password: newPassword });
        if (error) return { success: false, error: error.message };
        return { success: true, data };
      } catch (err) {
        return { success: false, error: err.message || "Failed to update password." };
      }
    }

    async updateEmail(newEmail) {
      if (!newEmail || !this.isReady()) return { success: false, error: "New email address required." };
      try {
        const redirectUrl = this.getCanonicalRedirectUrl('/');
        const { data, error } = await this.client.auth.updateUser({
          email: newEmail.trim().toLowerCase()
        }, {
          emailRedirectTo: redirectUrl
        });
        if (error) return { success: false, error: error.message };
        return { success: true, data };
      } catch (err) {
        return { success: false, error: err.message || "Failed to update email address." };
      }
    }

    async resendConfirmation(email) {
      if (!email || !this.isReady()) return { success: false, error: "Email address required." };
      try {
        const redirectUrl = this.getCanonicalRedirectUrl('/');
        const { error } = await this.client.auth.resend({
          type: 'signup',
          email: email.trim().toLowerCase(),
          options: {
            emailRedirectTo: redirectUrl
          }
        });
        if (error) throw error;
        return { success: true };
      } catch (err) {
        let msg = err.message || "Failed to resend confirmation email.";
        if (msg.toLowerCase().includes('rate limit') || msg.toLowerCase().includes('security purposes')) {
          msg = "Please wait a moment before requesting another confirmation email.";
        }
        console.warn("[Supabase Auth] resendConfirmation error:", msg);
        return { success: false, error: msg };
      }
    }

    async resetPasswordForEmail(email) {
      if (!email || !this.isReady()) return { success: false, error: "Email address required." };
      try {
        const redirectUrl = this.getCanonicalRedirectUrl('/login.html?type=recovery');
        const { error } = await this.client.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
          redirectTo: redirectUrl
        });
        if (error) {
          let msg = error.message;
          if (msg.toLowerCase().includes('sending recovery email') || msg.toLowerCase().includes('recovery email')) {
            msg = "Supabase could not send recovery email. To resolve this, configure Custom SMTP in your Supabase Dashboard (Project Settings > Authentication > SMTP Settings).";
          }
          return { success: false, error: msg };
        }
        return { success: true };
      } catch (err) {
        let msg = err.message || "Failed to send reset email.";
        if (msg.toLowerCase().includes('sending recovery email') || msg.toLowerCase().includes('recovery email')) {
          msg = "Supabase could not send recovery email. To resolve this, configure Custom SMTP in your Supabase Dashboard (Project Settings > Authentication > SMTP Settings).";
        }
        console.warn("[Supabase Auth] resetPassword error:", msg);
        return { success: false, error: msg };
      }
    }

    async signInWithOtp(email, isSignUp = true) {
      if (!email || !email.includes('@')) {
        return { success: false, error: "Please enter a valid email address." };
      }
      if (!this.isReady()) return { success: false, error: "Supabase connection required." };
      try {
        const redirectUrl = this.getCanonicalRedirectUrl('/');
        const { data, error } = await this.client.auth.signInWithOtp({
          email: email.trim().toLowerCase(),
          options: {
            emailRedirectTo: redirectUrl,
            shouldCreateUser: isSignUp
          }
        });
        if (error) {
          let msg = error.message;
          if (msg.toLowerCase().includes('magic link email') || msg.toLowerCase().includes('sending magic link')) {
            msg = "Supabase could not send magic link email. Configure Custom SMTP in your Supabase Dashboard (Project Settings > Authentication > SMTP Settings).";
          }
          return { success: false, error: msg };
        }
        return { success: true, data };
      } catch (err) {
        return { success: false, error: err.message || "Failed to send magic link or OTP." };
      }
    }

    async resetPassword(email) {
      return this.resetPasswordForEmail(email);
    }

    async sendMagicLink(email) {
      return this.signInWithOtp(email, false);
    }

    async verifyOtp(param1, tokenArg, typeArg = 'signup') {
      let email, token, type;
      if (typeof param1 === 'object' && param1 !== null) {
        email = param1.email;
        token = param1.token;
        type = param1.type || 'signup';
      } else {
        email = param1;
        token = tokenArg;
        type = typeArg || 'signup';
      }
      if (!email || !token) {
        return { success: false, error: "Email and verification code are required." };
      }
      if (!this.isReady()) return { success: false, error: "Supabase connection required." };
      try {
        const cleanEmail = email.trim().toLowerCase();
        const cleanToken = token.trim();

        // 1. Primary verification attempt
        let res = await this.client.auth.verifyOtp({
          email: cleanEmail,
          token: cleanToken,
          type: type
        });

        // 2. Comprehensive type fallback across signup, email, and magiclink
        if (res.error && (type === 'signup' || type === 'email' || type === 'magiclink')) {
          const fallbackTypes = ['signup', 'email', 'magiclink'].filter(t => t !== type);
          for (const fbType of fallbackTypes) {
            const retryRes = await this.client.auth.verifyOtp({
              email: cleanEmail,
              token: cleanToken,
              type: fbType
            });
            if (!retryRes.error && retryRes.data && retryRes.data.user) {
              res = retryRes;
              break;
            }
          }
        }

        if (res.error) {
          let friendlyError = res.error.message;
          const msg = (res.error.message || '').toLowerCase();
          if (msg.includes('expired') || msg.includes('has expired')) {
            friendlyError = "The verification code has expired. Please request a new code.";
          } else if (msg.includes('invalid') || msg.includes('token is invalid')) {
            friendlyError = "The 6-digit code you entered is invalid. Please double-check and try again.";
          } else if (msg.includes('rate limit')) {
            friendlyError = "Too many verification attempts. Please wait a moment.";
          }
          return { success: false, error: friendlyError };
        }

        const user = res.data.user;
        const session = res.data.session;
        if (!user) {
          return { success: false, error: "Verification succeeded but user session could not be established." };
        }

        const userObj = {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || cleanEmail.split('@')[0] || 'Pantry Chef',
          emailVerified: true
        };

        await this.ensureProfile(userObj);

        if (session && session.access_token) {
          localStorage.setItem('smartpantry_token', session.access_token);
          localStorage.setItem('smartpantry_user', JSON.stringify(userObj));
        }

        this.dispatchLoginNotification(userObj);

        return {
          success: true,
          user: userObj,
          session,
          token: session ? session.access_token : null
        };
      } catch (err) {
        return { success: false, error: err.message || "OTP verification failed." };
      }
    }

    async exchangeCodeForSession(code) {
      if (!code || !this.isReady()) return null;
      try {
        const { data, error } = await this.client.auth.exchangeCodeForSession(code);
        if (error) {
          console.warn("[Supabase Auth] exchangeCodeForSession error:", error.message);
          return null;
        }
        if (data && data.session && data.user) {
          const userObj = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.full_name || data.user.email.split('@')[0] || 'Pantry Chef',
            emailVerified: true
          };
          await this.ensureProfile(userObj);
          if (data.session.access_token) {
            localStorage.setItem('smartpantry_token', data.session.access_token);
            localStorage.setItem('smartpantry_user', JSON.stringify(userObj));
          }
          this.dispatchLoginNotification(userObj);
          return { user: userObj, session: data.session, token: data.session.access_token };
        }
        return null;
      } catch (err) {
        console.warn("[Supabase Auth] exchangeCodeForSession exception:", err);
        return null;
      }
    }

    async reauthenticate() {
      if (!this.isReady()) return { success: false, error: "Supabase connection required." };
      try {
        const { data, error } = await this.client.auth.reauthenticate();
        if (error) return { success: false, error: error.message };
        return { success: true, data };
      } catch (err) {
        return { success: false, error: err.message || "Failed to trigger reauthentication." };
      }
    }

    // ==========================================
    // 2. PROFILES TABLE MANAGEMENT
    // ==========================================

    async getProfile(userId) {
      if (!userId || !this.isUUID(userId) || !this.isReady()) return null;
      try {
        const { data, error } = await this.client
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        if (error) throw error;
        return data;
      } catch (err) {
        console.warn("[Supabase Profile] Query error:", err.message);
        return null;
      }
    }

    async ensureProfile(user) {
      if (!user || !user.id || !this.isUUID(user.id) || !this.isReady()) return;
      try {
        await this.client
          .from('profiles')
          .upsert({
            id: user.id,
            full_name: user.name || user.email.split('@')[0],
            email: user.email,
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' });
      } catch (err) {
        // Silently continue if table trigger already handled profile creation
      }
    }

    async updateProfile(userId, { fullName, avatarUrl }) {
      if (!userId || !this.isUUID(userId) || !this.isReady()) return false;
      try {
        const updates = { updated_at: new Date().toISOString() };
        if (fullName !== undefined) updates.full_name = fullName;
        if (avatarUrl !== undefined) updates.avatar_url = avatarUrl;

        const { data, error } = await this.client
          .from('profiles')
          .update(updates)
          .eq('id', userId)
          .select();

        if (error) throw error;
        return data && data[0] ? data[0] : true;
      } catch (err) {
        console.warn("[Supabase Profile] Update error:", err.message);
        return false;
      }
    }

    // ==========================================
    // 3. PANTRY ITEMS CRUD (pantry_items as Single Source of Truth)
    // ==========================================

    async getProducts(userId = null) {
      const config = window.SupabaseConfig ? window.SupabaseConfig.get() : { url: '' };
      if (!this.isReady()) {
        console.error("[Supabase DB] SELECT Error: Supabase client is not connected.", { projectUrl: config.url });
        throw new Error("Supabase client is not connected.");
      }

      // Supabase Auth getUser() is the single source of truth for user identification
      let effectiveUserId = null;
      try {
        const { data: { user }, error: authError } = await this.client.auth.getUser();
        if (user && user.id && this.isUUID(user.id)) {
          effectiveUserId = user.id;
        }
      } catch (e) {
        console.warn("[Supabase DB] getUser() check encountered error:", e.message);
      }

      if (!effectiveUserId) {
        effectiveUserId = await this.getAuthenticatedUserId(userId);
      }

      if (!effectiveUserId || !this.isUUID(effectiveUserId)) {
        console.error("[Supabase DB] SELECT Error: No authenticated Supabase user UUID available.", { userId, projectUrl: config.url });
        throw new Error("No authenticated Supabase user session found. Please log in.");
      }

      console.log(`[Supabase DB] SELECT pantry_items for user: ${effectiveUserId} on project: ${config.url}`);

      const { data, error } = await this.client
        .from('pantry_items')
        .select('*')
        .eq('user_id', effectiveUserId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("[Supabase DB] SELECT Error on pantry_items:", {
          userId: effectiveUserId,
          projectUrl: config.url,
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        throw new Error(`Supabase SELECT failed [${error.code || 'ERR'}]: ${error.message}${error.hint ? ' (' + error.hint + ')' : ''}`);
      }

      console.log(`[Supabase DB] SELECT Success: Loaded ${(data || []).length} items for user: ${effectiveUserId}`);
      return (data || []).map(r => this.mapFromDB(r));
    }

    async insertProduct(productData, userId = null) {
      const config = window.SupabaseConfig ? window.SupabaseConfig.get() : { url: '' };
      if (!this.isReady()) {
        console.error("[Supabase DB] INSERT Error: Supabase client not initialized.", { projectUrl: config.url });
        throw new Error("Supabase client is not connected.");
      }

      // Step 1: Identify authenticated user using supabase.auth.getUser()
      let effectiveUserId = null;
      try {
        const res = await this.client.auth.getUser();
        const user = res?.data?.user;
        if (user && user.id && this.isUUID(user.id)) {
          effectiveUserId = user.id;
        }
      } catch (e) {
        console.warn("[Supabase DB] getUser() check error:", e);
      }

      if (!effectiveUserId) {
        effectiveUserId = await this.getAuthenticatedUserId(userId);
      }

      if (!effectiveUserId || !this.isUUID(effectiveUserId)) {
        console.error("[Supabase DB] INSERT Error: No authenticated user session found.", { userId, projectUrl: config.url });
        throw new Error("No authenticated Supabase user session found. Please log in.");
      }

      // Step 2: Prepare record strictly conforming to public.pantry_items columns:
      // id, user_id, name, brand, category, barcode, image_url, description,
      // ingredients, serving_information, nutrition_information, quantity, unit,
      // purchase_date, expiry_date, minimum_stock, current_stock, consumption_rate, price
      const qty = Number(productData.quantity) || 1;
      const unitVal = productData.unit || productData.quantity_unit || 'pcs';
      const minStockVal = productData.minimum_stock !== undefined 
        ? Number(productData.minimum_stock) 
        : (productData.minStock !== undefined ? Number(productData.minStock) : 2);
      const currentStockVal = productData.current_stock !== undefined 
        ? Number(productData.current_stock) 
        : qty;
      const priceVal = productData.price !== undefined ? Number(productData.price) : 0;
      const descVal = productData.description || productData.notes || null;
      const expiryVal = productData.expiry_date || productData.effectiveExpiryDate || productData.actualExpiryDate || productData.expiryDate || null;
      const purchaseVal = productData.purchase_date || productData.purchaseDate || null;
      const nutritionVal = productData.nutrition_information 
        ? (typeof productData.nutrition_information === 'object' ? JSON.stringify(productData.nutrition_information) : String(productData.nutrition_information)) 
        : null;

      const pantryItemRecord = {
        user_id: effectiveUserId,
        name: productData.name || 'Unnamed Product',
        brand: productData.brand || null,
        category: productData.category || 'Pantry',
        barcode: productData.barcode || null,
        image_url: productData.image_url || productData.imageUrl || productData.image || null,
        description: descVal,
        ingredients: productData.ingredients || null,
        serving_information: productData.serving_information || null,
        nutrition_information: nutritionVal,
        quantity: qty,
        unit: unitVal,
        purchase_date: purchaseVal,
        expiry_date: expiryVal,
        minimum_stock: minStockVal,
        current_stock: currentStockVal,
        consumption_rate: productData.consumption_rate !== undefined && productData.consumption_rate !== null ? Number(productData.consumption_rate) : null,
        price: priceVal
      };

      if (productData.id && typeof productData.id === 'string' && productData.id.includes('-') && productData.id.length >= 30) {
        pantryItemRecord.id = productData.id;
      } else if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        pantryItemRecord.id = crypto.randomUUID();
      }

      console.log(`[Supabase DB] INSERT into public.pantry_items for user: ${effectiveUserId} on project: ${config.url}`, {
        name: pantryItemRecord.name,
        category: pantryItemRecord.category,
        quantity: pantryItemRecord.quantity,
        user_id: effectiveUserId
      });

      const { data, error } = await this.client
        .from('pantry_items')
        .insert([pantryItemRecord])
        .select();

      if (error) {
        console.error("[Supabase DB] INSERT Error on pantry_items:", {
          userId: effectiveUserId,
          projectUrl: config.url,
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        throw new Error(`Supabase INSERT failed [${error.code || 'ERR'}]: ${error.message}${error.hint ? ' (' + error.hint + ')' : ''}`);
      }

      const savedRow = data && data[0] ? data[0] : pantryItemRecord;
      console.log(`[Supabase DB] INSERT Success for user: ${effectiveUserId}, record ID: ${savedRow.id}`);
      return this.mapFromDB(savedRow);
    }

    async updateProduct(id, updates, userId = null) {
      const config = window.SupabaseConfig ? window.SupabaseConfig.get() : { url: '' };
      if (!this.isReady()) throw new Error("Supabase client is not connected.");

      let effectiveUserId = null;
      try {
        const { data: { user } } = await this.client.auth.getUser();
        if (user && user.id && this.isUUID(user.id)) effectiveUserId = user.id;
      } catch (e) {}

      if (!effectiveUserId) effectiveUserId = await this.getAuthenticatedUserId(userId);
      if (!effectiveUserId || !this.isUUID(effectiveUserId)) {
        throw new Error("No authenticated Supabase user session found.");
      }

      const dbPayload = {
        updated_at: new Date().toISOString()
      };
      if (updates.name !== undefined) dbPayload.name = updates.name;
      if (updates.brand !== undefined) dbPayload.brand = updates.brand;
      if (updates.imageUrl !== undefined || updates.image_url !== undefined || updates.image !== undefined) {
        dbPayload.image_url = updates.imageUrl || updates.image_url || updates.image;
      }
      if (updates.category !== undefined) dbPayload.category = updates.category;
      if (updates.barcode !== undefined) dbPayload.barcode = updates.barcode;
      if (updates.quantity !== undefined) {
        dbPayload.quantity = Number(updates.quantity) || 1;
        if (updates.current_stock === undefined) dbPayload.current_stock = dbPayload.quantity;
      }
      if (updates.unit !== undefined || updates.quantityUnit !== undefined) {
        dbPayload.unit = updates.unit || updates.quantityUnit;
      }
      if (updates.minStock !== undefined || updates.minimum_stock !== undefined || updates.lowStockThreshold !== undefined) {
        dbPayload.minimum_stock = updates.minimum_stock !== undefined ? Number(updates.minimum_stock) : (updates.minStock !== undefined ? Number(updates.minStock) : Number(updates.lowStockThreshold));
      }
      if (updates.current_stock !== undefined) dbPayload.current_stock = Number(updates.current_stock);
      if (updates.consumption_rate !== undefined) dbPayload.consumption_rate = updates.consumption_rate !== null ? Number(updates.consumption_rate) : null;
      if (updates.price !== undefined) dbPayload.price = Number(updates.price);
      if (updates.description !== undefined || updates.notes !== undefined) {
        dbPayload.description = updates.description !== undefined ? updates.description : updates.notes;
      }
      if (updates.ingredients !== undefined) dbPayload.ingredients = updates.ingredients;
      if (updates.serving_information !== undefined) dbPayload.serving_information = updates.serving_information;
      if (updates.nutrition_information !== undefined) {
        dbPayload.nutrition_information = typeof updates.nutrition_information === 'object' ? JSON.stringify(updates.nutrition_information) : String(updates.nutrition_information);
      }
      if (updates.purchaseDate !== undefined || updates.purchase_date !== undefined) {
        dbPayload.purchase_date = updates.purchase_date || updates.purchaseDate;
      }
      if (updates.expiryDate !== undefined || updates.expiry_date !== undefined || updates.effectiveExpiryDate !== undefined || updates.actualExpiryDate !== undefined) {
        dbPayload.expiry_date = updates.expiry_date || updates.effectiveExpiryDate || updates.actualExpiryDate || updates.expiryDate;
      }

      console.log(`[Supabase DB] UPDATE pantry_items for user: ${effectiveUserId}, item: ${id}`);

      const { data, error } = await this.client
        .from('pantry_items')
        .update(dbPayload)
        .eq('id', id)
        .eq('user_id', effectiveUserId)
        .select();

      if (error) {
        console.error("[Supabase DB] UPDATE Error on pantry_items:", {
          userId: effectiveUserId,
          productId: id,
          projectUrl: config.url,
          error
        });
        throw new Error(`Supabase UPDATE failed [${error.code || 'ERR'}]: ${error.message}`);
      }

      console.log(`[Supabase DB] UPDATE Success for item: ${id}`);
      return data && data[0] ? this.mapFromDB(data[0]) : true;
    }

    async deleteProduct(id, userId = null) {
      const config = window.SupabaseConfig ? window.SupabaseConfig.get() : { url: '' };
      if (!id) return false;
      if (!this.isReady()) throw new Error("Supabase client is not connected.");

      let effectiveUserId = null;
      try {
        const { data: { user } } = await this.client.auth.getUser();
        if (user && user.id && this.isUUID(user.id)) effectiveUserId = user.id;
      } catch (e) {}

      if (!effectiveUserId) effectiveUserId = await this.getAuthenticatedUserId(userId);
      if (!effectiveUserId || !this.isUUID(effectiveUserId)) {
        throw new Error("No authenticated Supabase user session found.");
      }

      console.log(`[Supabase DB] DELETE from pantry_items for user: ${effectiveUserId}, item: ${id}`);

      const { error } = await this.client
        .from('pantry_items')
        .delete()
        .eq('id', id)
        .eq('user_id', effectiveUserId);

      if (error) {
        console.error("[Supabase DB] DELETE Error on pantry_items:", {
          userId: effectiveUserId,
          productId: id,
          projectUrl: config.url,
          error
        });
        throw new Error(`Supabase DELETE failed [${error.code || 'ERR'}]: ${error.message}`);
      }

      console.log(`[Supabase DB] DELETE Success for item: ${id}`);
      return true;
    }

    // ==========================================
    // 4. NOTIFICATION PREFERENCES
    // ==========================================

    async getUserSettings(userId) {
      if (!userId || !this.isUUID(userId) || !this.isReady()) return null;
      try {
        const [notifRes, userSetRes] = await Promise.allSettled([
          this.client.from('notification_preferences').select('*').eq('user_id', userId).maybeSingle(),
          this.client.from('user_settings').select('*').eq('user_id', userId).maybeSingle()
        ]);

        const notifData = (notifRes.status === 'fulfilled' && notifRes.value.data) ? notifRes.value.data : {};
        const userSetData = (userSetRes.status === 'fulfilled' && userSetRes.value.data) ? userSetRes.value.data : {};

        return {
          notification_preferences: notifData,
          user_settings: userSetData,
          preferences: {
            email_notifications: notifData.email_notifications ?? notifData.preferences?.email_notifications ?? true,
            alert_expiry: notifData.expiry_alerts ?? notifData.preferences?.alert_expiry ?? true,
            alert_expired: notifData.expired_product_alerts ?? notifData.preferences?.alert_expired ?? true,
            alert_low_stock: notifData.low_stock_alerts ?? notifData.preferences?.alert_low_stock ?? true,
            shopping_recommendations: notifData.shopping_recommendations ?? notifData.preferences?.shopping_recommendations ?? true,
            meal_plan_notifications: notifData.meal_plan_notifications ?? notifData.preferences?.meal_plan_notifications ?? true,
            alert_weekly_summary: notifData.weekly_summary ?? notifData.preferences?.alert_weekly_summary ?? false,
            alert_security: notifData.security_notifications ?? notifData.preferences?.alert_security ?? true
          },
          pantry_settings: {
            default_location: userSetData.default_storage_type ?? userSetData.pantry_settings?.default_location ?? notifData.pantry_settings?.default_location ?? 'Pantry',
            expiry_warning_days: userSetData.expiry_warning_period_days ?? userSetData.pantry_settings?.expiry_warning_days ?? notifData.pantry_settings?.expiry_warning_days ?? 7,
            low_stock_threshold: userSetData.minimum_stock_threshold ?? userSetData.low_stock_warning_level ?? userSetData.pantry_settings?.low_stock_threshold ?? notifData.pantry_settings?.low_stock_threshold ?? 2,
            default_unit: userSetData.default_quantity_unit ?? userSetData.pantry_settings?.default_unit ?? notifData.pantry_settings?.default_unit ?? 'pcs',
            default_planning_period_days: userSetData.default_planning_period_days ?? userSetData.pantry_settings?.default_planning_period_days ?? 7,
            default_category: userSetData.pantry_settings?.default_category ?? notifData.pantry_settings?.default_category ?? 'Pantry',
            auto_add_scanned_products: userSetData.auto_add_scanned_products ?? userSetData.pantry_settings?.auto_add_scanned_products ?? true,
            auto_calculate_expiry: userSetData.auto_calculate_expiry ?? userSetData.pantry_settings?.auto_calculate_expiry ?? true,
            opened_product_tracking: userSetData.opened_product_tracking ?? userSetData.pantry_settings?.opened_product_tracking ?? true,
            smart_shopping_recommendations: userSetData.smart_shopping_recommendations ?? userSetData.pantry_settings?.smart_shopping_recommendations ?? true,
            food_waste_tracking: userSetData.food_waste_tracking ?? userSetData.pantry_settings?.food_waste_tracking ?? true
          },
          general_settings: {
            theme: userSetData.theme ?? userSetData.general_settings?.theme ?? notifData.general_settings?.theme ?? 'light',
            layout_mode: userSetData.layout_mode ?? userSetData.general_settings?.layout_mode ?? 'comfortable',
            language: userSetData.language ?? userSetData.general_settings?.language ?? notifData.general_settings?.language ?? 'English',
            timezone: userSetData.timezone ?? userSetData.general_settings?.timezone ?? notifData.general_settings?.timezone ?? 'Asia/Kolkata',
            currency: userSetData.currency ?? userSetData.general_settings?.currency ?? notifData.general_settings?.currency ?? 'INR',
            date_format: userSetData.date_format ?? userSetData.general_settings?.date_format ?? notifData.general_settings?.date_format ?? 'DD/MM/YYYY'
          },
          privacy_settings: {
            analytics_enabled: userSetData.analytics_enabled ?? userSetData.privacy_settings?.analytics_enabled ?? true,
            ai_personalization: userSetData.ai_personalization ?? userSetData.privacy_settings?.ai_personalization ?? true,
            recipe_personalization: userSetData.recipe_personalization ?? userSetData.privacy_settings?.recipe_personalization ?? true,
            shopping_personalization: userSetData.shopping_personalization ?? userSetData.privacy_settings?.shopping_personalization ?? true,
            profile_visibility: userSetData.profile_visibility ?? userSetData.privacy_settings?.profile_visibility ?? 'private',
            data_usage_consent: userSetData.data_usage_consent ?? userSetData.privacy_settings?.data_usage_consent ?? true
          }
        };
      } catch (err) {
        console.warn("[Supabase Settings] Fetch error:", err);
        return null;
      }
    }

    async saveUserSettings(userId, settingsData) {
      if (!userId || !this.isReady()) return false;
      const effectiveUserId = await this.getAuthenticatedUserId(userId);
      if (!effectiveUserId) return false;

      const p = settingsData.preferences || {};
      const pp = settingsData.pantry_settings || {};
      const gen = settingsData.general_settings || {};
      const priv = settingsData.privacy_settings || {};

      const notifPayload = {
        user_id: effectiveUserId,
        email_notifications: p.email_notifications !== false,
        expiry_alerts: p.alert_expiry !== false && p.expiry_alerts !== false,
        expired_product_alerts: p.alert_expired !== false && p.expired_product_alerts !== false,
        low_stock_alerts: p.alert_low_stock !== false && p.low_stock_alerts !== false,
        shopping_recommendations: p.shopping_recommendations !== false,
        meal_plan_notifications: p.meal_plan_notifications !== false,
        weekly_summary: !!p.alert_weekly_summary || !!p.weekly_summary,
        security_notifications: p.alert_security !== false && p.security_notifications !== false,
        preferences: p,
        pantry_settings: pp,
        general_settings: gen,
        updated_at: new Date().toISOString()
      };

      const userSettingsPayload = {
        user_id: effectiveUserId,
        minimum_stock_threshold: pp.low_stock_threshold !== undefined ? Number(pp.low_stock_threshold) : 2,
        low_stock_warning_level: pp.low_stock_threshold !== undefined ? Number(pp.low_stock_threshold) : 2,
        default_planning_period_days: pp.default_planning_period_days !== undefined ? Number(pp.default_planning_period_days) : 7,
        default_storage_type: pp.default_location || 'Pantry',
        expiry_warning_period_days: pp.expiry_warning_days !== undefined ? Number(pp.expiry_warning_days) : 7,
        default_quantity_unit: pp.default_unit || 'pcs',
        auto_add_scanned_products: pp.auto_add_scanned_products !== false,
        auto_calculate_expiry: pp.auto_calculate_expiry !== false,
        opened_product_tracking: pp.opened_product_tracking !== false,
        smart_shopping_recommendations: pp.smart_shopping_recommendations !== false,
        food_waste_tracking: pp.food_waste_tracking !== false,
        theme: gen.theme || 'light',
        layout_mode: gen.layout_mode || 'comfortable',
        language: gen.language || 'English',
        timezone: gen.timezone || 'Asia/Kolkata',
        currency: gen.currency || 'INR',
        date_format: gen.date_format || 'DD/MM/YYYY',
        analytics_enabled: priv.analytics_enabled !== false,
        ai_personalization: priv.ai_personalization !== false,
        recipe_personalization: priv.recipe_personalization !== false,
        shopping_personalization: priv.shopping_personalization !== false,
        profile_visibility: priv.profile_visibility || 'private',
        data_usage_consent: priv.data_usage_consent !== false,
        preferences: p,
        pantry_settings: pp,
        general_settings: gen,
        privacy_settings: priv,
        updated_at: new Date().toISOString()
      };

      try {
        const p1 = this.client
          .from('notification_preferences')
          .upsert(notifPayload, { onConflict: 'user_id' });

        const p2 = this.client
          .from('user_settings')
          .upsert(userSettingsPayload, { onConflict: 'user_id' });

        await Promise.allSettled([p1, p2]);
        return true;
      } catch (err) {
        console.warn("[Supabase Settings] Save error:", err.message);
        return false;
      }
    }

    async uploadAvatar(userId, fileOrDataUrl) {
      if (!userId || !this.isReady()) return { success: false, error: 'Supabase client not ready' };
      const effectiveUserId = await this.getAuthenticatedUserId(userId);
      if (!effectiveUserId) return { success: false, error: 'User authentication required' };

      try {
        let avatarUrl = '';
        if (typeof fileOrDataUrl === 'string' && fileOrDataUrl.startsWith('data:image/')) {
          avatarUrl = fileOrDataUrl;
        } else if (fileOrDataUrl instanceof File || fileOrDataUrl instanceof Blob) {
          const fileExt = (fileOrDataUrl.name || 'avatar.jpg').split('.').pop();
          const filePath = `${effectiveUserId}/avatar-${Date.now()}.${fileExt}`;
          try {
            const { data, error } = await this.client.storage
              .from('avatars')
              .upload(filePath, fileOrDataUrl, { upsert: true });

            if (!error && data) {
              const { data: publicUrlData } = this.client.storage
                .from('avatars')
                .getPublicUrl(filePath);
              avatarUrl = publicUrlData?.publicUrl || '';
            }
          } catch(storageErr) {
            console.warn("[Supabase Storage] bucket upload error, using DataURL fallback:", storageErr);
          }

          if (!avatarUrl) {
            avatarUrl = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(fileOrDataUrl);
            });
          }
        } else if (typeof fileOrDataUrl === 'string') {
          avatarUrl = fileOrDataUrl;
        }

        if (!avatarUrl) return { success: false, error: 'Invalid avatar data' };

        // Save to public.profiles
        await this.updateProfile(effectiveUserId, { avatarUrl });

        // Update auth metadata
        try {
          await this.client.auth.updateUser({
            data: { avatar_url: avatarUrl }
          });
        } catch (e) {}

        return { success: true, avatarUrl };
      } catch (err) {
        return { success: false, error: err.message || 'Avatar upload failed' };
      }
    }

    async getDatabaseHealthAndStats(userId) {
      if (!this.isReady()) {
        return {
          status: 'error',
          error: '🔴 Database connection unavailable',
          latencyMs: 0,
          pantryCount: 0,
          shoppingCount: 0,
          alertsCount: 0,
          mealPlansCount: 0,
          lastSyncTime: null,
          lastUpdateTime: null
        };
      }

      const effectiveUserId = await this.getAuthenticatedUserId(userId);
      const startTime = performance.now();
      let latencyMs = 0;
      let pantryCount = 0;
      let shoppingCount = 0;
      let alertsCount = 0;
      let mealPlansCount = 0;
      let lastUpdateTime = null;

      try {
        const { count: pCount, data: latestPantry, error: pErr } = await this.client
          .from('pantry_items')
          .select('updated_at', { count: 'exact' })
          .eq('user_id', effectiveUserId)
          .order('updated_at', { ascending: false })
          .limit(1);

        latencyMs = Math.round(performance.now() - startTime);

        if (pErr) {
          const testRes = await fetch(`${this.url}/auth/v1/settings`, {
            headers: { 'apikey': this.key, 'Authorization': `Bearer ${this.key}` }
          });
          if (!testRes.ok) {
            return {
              status: 'error',
              error: '🔴 Database connection unavailable: ' + (pErr.message || 'Connection failed'),
              latencyMs,
              pantryCount: 0,
              shoppingCount: 0,
              alertsCount: 0,
              mealPlansCount: 0,
              lastSyncTime: null,
              lastUpdateTime: null
            };
          }
        }

        pantryCount = pCount ?? (window.store ? window.store.getItems().length : 0);
        if (latestPantry && latestPantry[0]?.updated_at) {
          lastUpdateTime = latestPantry[0].updated_at;
        }

        // Shopping List Count
        try {
          const { count: sCount } = await this.client
            .from('shopping_list')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', effectiveUserId);
          shoppingCount = sCount ?? 0;
        } catch (e) {
          shoppingCount = 0;
        }

        // Alerts Count
        try {
          const { count: aCount } = await this.client
            .from('alerts')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', effectiveUserId);
          alertsCount = aCount ?? (window.store ? (window.store.alerts || []).length : 0);
        } catch (e) {
          alertsCount = window.store ? (window.store.alerts || []).length : 0;
        }

        // Meal Plans Count
        try {
          const { count: mCount } = await this.client
            .from('meal_plans')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', effectiveUserId);
          mealPlansCount = mCount ?? 0;
        } catch (e) {
          mealPlansCount = 0;
        }

        if (!lastUpdateTime) {
          try {
            const { data: latestAct } = await this.client
              .from('activity_logs')
              .select('created_at')
              .eq('user_id', effectiveUserId)
              .order('created_at', { ascending: false })
              .limit(1)
              .maybeSingle();
            if (latestAct?.created_at) lastUpdateTime = latestAct.created_at;
          } catch (e) {}
        }

        return {
          status: 'connected',
          latencyMs,
          pantryCount,
          shoppingCount,
          alertsCount,
          mealPlansCount,
          lastSyncTime: new Date().toISOString(),
          lastUpdateTime: lastUpdateTime || new Date().toISOString()
        };
      } catch (err) {
        return {
          status: 'error',
          error: '🔴 Database connection unavailable: ' + (err.message || 'Offline'),
          latencyMs: Math.round(performance.now() - startTime),
          pantryCount: 0,
          shoppingCount: 0,
          alertsCount: 0,
          mealPlansCount: 0,
          lastSyncTime: null,
          lastUpdateTime: null
        };
      }
    }

    // ==========================================
    // 5. ACTIVITY LOGS
    // ==========================================

    async getActivity(userId, limit = 50) {
      if (!userId || !this.isUUID(userId) || !this.isReady()) return [];
      try {
        const { data, error } = await this.client
          .from('activity_logs')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (!error && Array.isArray(data)) return data;

        // Fallback to pantry_activity
        const leg = await this.client
          .from('pantry_activity')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(limit);

        return leg.data || [];
      } catch (err) {
        return [];
      }
    }

    async logActivity(userId, { action, productId, productName, details }) {
      if (!userId || !this.isReady()) return null;
      const effectiveUserId = await this.getAuthenticatedUserId(userId);
      if (!effectiveUserId) return null;

      const dbRecord = {
        user_id: effectiveUserId,
        action: action || 'updated',
        product_id: productId ? String(productId) : null,
        product_name: productName || 'Item',
        details: details || '',
        created_at: new Date().toISOString()
      };

      try {
        const { data, error } = await this.client
          .from('activity_logs')
          .insert([dbRecord])
          .select();

        // Also insert into pantry_activity for compatibility
        await this.client
          .from('pantry_activity')
          .insert([dbRecord]);

        return data ? data[0] : null;
      } catch (err) {
        return null;
      }
    }

    // ==========================================
    // 6. ALERTS CRUD
    // ==========================================

    async getAlerts(userId) {
      if (!userId || !this.isUUID(userId) || !this.isReady()) return [];
      try {
        const { data, error } = await this.client
          .from('alerts')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(data)) return data;

        // Fallback to pantry_alerts
        const leg = await this.client
          .from('pantry_alerts')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        return leg.data || [];
      } catch (err) {
        return [];
      }
    }

    async createAlert(userId, { title, message, type, productId, productName, emailSent, emailSentAt }) {
      if (!userId || !this.isReady()) return null;
      const effectiveUserId = await this.getAuthenticatedUserId(userId);
      if (!effectiveUserId) return null;

      const dbRecord = {
        user_id: effectiveUserId,
        title: title || 'Pantry Alert',
        message: message || '',
        type: type || 'system',
        product_id: productId ? String(productId) : null,
        product_name: productName || null,
        email_sent: Boolean(emailSent),
        email_sent_at: emailSentAt || (emailSent ? new Date().toISOString() : null),
        is_read: false,
        created_at: new Date().toISOString()
      };

      try {
        const { data, error } = await this.client
          .from('alerts')
          .insert([dbRecord])
          .select();

        await this.client
          .from('pantry_alerts')
          .insert([dbRecord]);

        return data ? data[0] : null;
      } catch (err) {
        return null;
      }
    }

    async markAlertAsRead(alertId, userId) {
      if (!userId || !alertId || !this.isReady()) return false;
      const effectiveUserId = await this.getAuthenticatedUserId(userId);
      try {
        await this.client.from('alerts').update({ is_read: true }).eq('id', alertId).eq('user_id', effectiveUserId);
        await this.client.from('pantry_alerts').update({ is_read: true }).eq('id', alertId).eq('user_id', effectiveUserId);
        return true;
      } catch (err) {
        return false;
      }
    }

    async markAllAlertsAsRead(userId) {
      if (!userId || !this.isReady()) return false;
      const effectiveUserId = await this.getAuthenticatedUserId(userId);
      try {
        await this.client.from('alerts').update({ is_read: true }).eq('user_id', effectiveUserId).eq('is_read', false);
        await this.client.from('pantry_alerts').update({ is_read: true }).eq('user_id', effectiveUserId).eq('is_read', false);
        return true;
      } catch (err) {
        return false;
      }
    }

    async deleteAlert(alertId, userId) {
      if (!userId || !alertId || !this.isReady()) return false;
      const effectiveUserId = await this.getAuthenticatedUserId(userId);
      try {
        await this.client.from('alerts').delete().eq('id', alertId).eq('user_id', effectiveUserId);
        await this.client.from('pantry_alerts').delete().eq('id', alertId).eq('user_id', effectiveUserId);
        return true;
      } catch (err) {
        return false;
      }
    }

    // ==========================================
    // 7. REALTIME WEBSOCKET SUBSCRIPTIONS
    // ==========================================

    subscribeToUserProducts(userId, onDataChange) {
      if (!this.isReady() || !userId || !this.isUUID(userId)) return null;

      try {
        const channelName = `pantry-products-${userId}`;
        if (this.activeChannels[channelName]) {
          this.client.removeChannel(this.activeChannels[channelName]);
        }

        const channel = this.client
          .channel(channelName)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'pantry_items',
              filter: `user_id=eq.${userId}`
            },
            (payload) => {
              console.log("[Supabase Realtime] pantry_items event:", payload.eventType);
              if (typeof onDataChange === 'function') onDataChange(payload);
            }
          )
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'pantry_products',
              filter: `user_id=eq.${userId}`
            },
            (payload) => {
              console.log("[Supabase Realtime] pantry_products event:", payload.eventType);
              if (typeof onDataChange === 'function') onDataChange(payload);
            }
          )
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'products',
              filter: `user_id=eq.${userId}`
            },
            (payload) => {
              console.log("[Supabase Realtime] products event:", payload.eventType);
              if (typeof onDataChange === 'function') onDataChange(payload);
            }
          )
          .subscribe();

        this.activeChannels[channelName] = channel;
        return channel;
      } catch (err) {
        console.warn("[Supabase Realtime] Products subscription error:", err);
        return null;
      }
    }

    subscribeToUserAlerts(userId, onDataChange) {
      if (!this.isReady() || !userId || !this.isUUID(userId)) return null;

      try {
        const channelName = `alerts-${userId}`;
        if (this.activeChannels[channelName]) {
          this.client.removeChannel(this.activeChannels[channelName]);
        }

        const channel = this.client
          .channel(channelName)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'alerts',
              filter: `user_id=eq.${userId}`
            },
            (payload) => {
              console.log("[Supabase Realtime] alerts event:", payload.eventType);
              if (typeof onDataChange === 'function') onDataChange(payload);
            }
          )
          .subscribe();

        this.activeChannels[channelName] = channel;
        return channel;
      } catch (err) {
        console.warn("[Supabase Realtime] Alerts subscription error:", err);
        return null;
      }
    }

    subscribeToUserSettings(userId, onDataChange) {
      if (!this.isReady() || !userId || !this.isUUID(userId)) return null;

      try {
        const channelName = `settings-${userId}`;
        if (this.activeChannels[channelName]) {
          this.client.removeChannel(this.activeChannels[channelName]);
        }

        const channel = this.client
          .channel(channelName)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'notification_preferences',
              filter: `user_id=eq.${userId}`
            },
            (payload) => {
              console.log("[Supabase Realtime] notification_preferences event:", payload.eventType);
              if (typeof onDataChange === 'function') onDataChange({ table: 'notification_preferences', ...payload });
            }
          )
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'user_settings',
              filter: `user_id=eq.${userId}`
            },
            (payload) => {
              console.log("[Supabase Realtime] user_settings event:", payload.eventType);
              if (typeof onDataChange === 'function') onDataChange({ table: 'user_settings', ...payload });
            }
          )
          .subscribe();

        this.activeChannels[channelName] = channel;
        return channel;
      } catch (err) {
        console.warn("[Supabase Realtime] Settings subscription error:", err);
        return null;
      }
    }

    unsubscribeAll() {
      if (!this.client) return;
      Object.keys(this.activeChannels).forEach(key => {
        try {
          if (this.activeChannels[key]) {
            this.client.removeChannel(this.activeChannels[key]);
          }
        } catch (e) {}
      });
      this.activeChannels = {};
      console.log("[Supabase Realtime] Cleaned up all private channels.");
    }

    // ==========================================
    // 8. HELPER MAPPING & RESEND DISPATCH
    // ==========================================

    mapFromDB(row) {
      if (!row) return null;
      const minStockVal = row.low_stock_threshold !== undefined && row.low_stock_threshold !== null
        ? Number(row.low_stock_threshold)
        : (row.minimum_stock !== undefined && row.minimum_stock !== null
          ? Number(row.minimum_stock)
          : (row.min_stock !== undefined && row.min_stock !== null ? Number(row.min_stock) : 2));
      const qtyVal = Number(row.quantity) || 1;
      const expDate = row.expiry_date || '';
      const unitVal = row.quantity_unit || row.unit || 'pcs';
      const notesVal = row.notes || row.description || '';

      return {
        id: row.id,
        name: row.product_name || row.name || 'Unnamed Product',
        brand: row.brand || '',
        imageUrl: row.product_image || row.image_url || '',
        minStock: minStockVal,
        lowStockThreshold: minStockVal,
        category: row.category || 'Pantry',
        quantity: qtyVal,
        unit: unitVal,
        quantityUnit: unitVal,
        expiryDate: expDate,
        purchaseDate: row.purchase_date || '',
        barcode: row.barcode || '',
        price: Number(row.price) || 0,
        storageLocation: row.storage_location || row.location || 'Pantry',
        description: notesVal,
        notes: notesVal,
        ingredients: row.ingredients || '',
        nutrition: row.nutrition || null,
        actualExpiryDate: row.actual_expiry_date || null,
        estimatedExpiryDate: row.estimated_expiry_date || null,
        effectiveExpiryDate: row.effective_expiry_date || expDate || '',
        expiryType: row.expiry_type || (row.actual_expiry_date ? 'actual' : (row.estimated_expiry_date ? 'estimated' : 'actual')),
        isEstimate: row.expiry_type === 'estimated' || Boolean(row.estimated_expiry_date && !row.actual_expiry_date),
        shelfLifeDays: row.shelf_life_days || null,
        productStatus: row.product_status || 'Unopened',
        openedDate: row.opened_date || null,
        openedShelfLifeDays: row.opened_shelf_life_days || null,
        recommendedUseByDate: row.recommended_use_by_date || null,
        storageType: row.storage_type || null,
        storageRecommendation: row.storage_recommendation || null,
        expiryStatus: row.expiry_status || null,
        emoji: row.emoji || (window.store ? window.store.detectEmoji(row.product_name || row.name, row.category) : '📦'),
        status: (window.store && (row.effective_expiry_date || expDate)) 
          ? window.store.calculateStatus(row.effective_expiry_date || expDate, qtyVal, minStockVal) 
          : (row.expiry_status || row.status || 'Fresh'),
        addedAt: row.created_at || new Date().toISOString(),
        updatedAt: row.updated_at || new Date().toISOString()
      };
    }

    async getShelfLifeReference() {
      if (!this.isReady()) return [];
      try {
        const { data, error } = await this.client
          .from('shelf_life_reference')
          .select('*')
          .order('product_name', { ascending: true });
        if (!error && Array.isArray(data)) return data;
        return [];
      } catch (e) {
        return [];
      }
    }

    dispatchLoginNotification(user) {
      if (!user || !user.email) return;

      const clientInfo = {
        loginDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        loginTime: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZoneName: "short" }),
        browser: navigator.userAgent.includes("Chrome") ? "Chrome" : (navigator.userAgent.includes("Firefox") ? "Firefox" : "Web Browser"),
        device: window.innerWidth < 768 ? "Mobile Device" : "Desktop Computer"
      };

      fetch("/api/send-login-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          loginDate: clientInfo.loginDate,
          loginTime: clientInfo.loginTime,
          browser: clientInfo.browser,
          device: clientInfo.device
        })
      }).catch((e) => {
        console.warn("[Resend Alert Notice]", e);
      });
    }
  }

  window.supabaseService = new SupabaseService();
  window.supabaseClient = window.supabaseService.client;
})(window);
