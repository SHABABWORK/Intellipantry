/**
 * Smart Pantry - Central State Management & LocalStorage Store
 * Real-time Dynamic Date, Expiry & User-Isolated State Engine
 */

// Format today's date in local ISO YYYY-MM-DD
function getTodayISO() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Generate relative date string in ISO YYYY-MM-DD from today
function getRelativeDateISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Timezone-safe local calendar date parser supporting multiple formats:
// YYYY-MM-DD, YYYY/MM/DD, YYYY.MM.DD, DD/MM/YYYY, DD-MM-YYYY, DD.MM.YYYY, ISO 8601
function parseLocalDate(dateStr) {
  if (!dateStr) return null;
  if (dateStr instanceof Date) return isNaN(dateStr.getTime()) ? null : dateStr;

  const str = String(dateStr).trim();
  if (!str) return null;

  // 1. Match ISO format: YYYY-MM-DD, YYYY/MM/DD, YYYY.MM.DD (optionally with T...)
  const isoMatch = str.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10);
    if (month >= 0 && month <= 11 && day >= 1 && day <= 31) {
      return new Date(year, month, day, 0, 0, 0, 0);
    }
  }

  // 2. Match DD-MM-YYYY, DD/MM/YYYY, DD.MM.YYYY or MM/DD/YYYY
  const dmyMatch = str.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})/);
  if (dmyMatch) {
    let day = parseInt(dmyMatch[1], 10);
    let month = parseInt(dmyMatch[2], 10) - 1;
    const year = parseInt(dmyMatch[3], 10);

    // If month > 11 and day <= 12, user input was MM/DD/YYYY
    if (month > 11 && day <= 12) {
      const temp = day - 1;
      day = parseInt(dmyMatch[2], 10);
      month = temp;
    }

    if (month >= 0 && month <= 11 && day >= 1 && day <= 31) {
      return new Date(year, month, day, 0, 0, 0, 0);
    }
  }

  // 3. Native Date parser fallback
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

// Calculate exact calendar days between today (00:00 local) and target date,
// or between startDate and targetDate when two arguments are provided
function getDaysDifference(targetOrStartDate, maybeTargetDate) {
  if (!targetOrStartDate) return null;

  let baseDate, targetDate;
  if (maybeTargetDate !== undefined && maybeTargetDate !== null) {
    baseDate = parseLocalDate(targetOrStartDate);
    targetDate = parseLocalDate(maybeTargetDate);
  } else {
    const now = new Date();
    baseDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    targetDate = parseLocalDate(targetOrStartDate);
  }

  if (!baseDate || !targetDate) return null;

  const diffMs = targetDate.getTime() - baseDate.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

// Format human-friendly relative expiry label
function formatRelativeExpiry(expiryDateStr, warningDays = 7) {
  if (!expiryDateStr) {
    return { text: "No expiry set", label: "—", status: "Fresh", urgent: false, days: null };
  }

  const diffDays = getDaysDifference(expiryDateStr);
  if (diffDays === null) {
    return { text: "—", label: "—", status: "Fresh", urgent: false, days: null };
  }

  const warnThreshold = Number(warningDays) || 7;

  if (diffDays < 0) {
    const abs = Math.abs(diffDays);
    const text = abs === 1 ? "Expired yesterday" : `Expired ${abs} days ago`;
    return { text, label: text, status: "Expired", urgent: true, days: diffDays };
  } else if (diffDays === 0) {
    return { text: "Expires today", label: "Expires today", status: "Expiring Soon", urgent: true, days: 0 };
  } else if (diffDays === 1) {
    return { text: "1 day remaining (Tomorrow)", label: "1 day remaining", status: "Expiring Soon", urgent: true, days: 1 };
  } else if (diffDays <= warnThreshold) {
    return { text: `${diffDays} days remaining`, label: `${diffDays} days left`, status: "Expiring Soon", urgent: true, days: diffDays };
  } else {
    return { text: `${diffDays} days remaining`, label: `${diffDays} days left`, status: "Fresh", urgent: false, days: diffDays };
  }
}

function getDefaultItems() {
  // Fresh account must start completely empty - zero demo or hardcoded items
  return [];
}

const DEFAULT_ITEMS = [];

const CATEGORY_EMOJIS = {
  Fruits: "🍎",
  Vegetables: "🥦",
  Dairy: "🥛",
  Grains: "🌾",
  Meat: "🍗",
  Beverages: "🧃",
  Pantry: "🥫",
  Frozen: "🧊",
  Snacks: "🍪",
  Spices: "🧂"
};

/**
 * Smart Pantry - LocalStorage User Database Engine
 * Persistent Multi-User Authentication, Profiles, and Isolation in LocalStorage
 */
class UserDatabaseManager {
  constructor() {
    this.DB_KEY = "smartpantry_users_db";
    this.init();
  }

  init() {
    try {
      if (!localStorage.getItem(this.DB_KEY)) {
        const initialDB = {
          version: "1.0",
          users: {},
          createdAt: new Date().toISOString()
        };
        localStorage.setItem(this.DB_KEY, JSON.stringify(initialDB));
      }
    } catch (e) {
      console.warn("[UserDB] Init error:", e);
    }
  }

  getDB() {
    try {
      const raw = localStorage.getItem(this.DB_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn("[UserDB] Read error:", e);
    }
    return { version: "1.0", users: {}, createdAt: new Date().toISOString() };
  }

  saveDB(db) {
    try {
      localStorage.setItem(this.DB_KEY, JSON.stringify(db));
    } catch (e) {
      console.error("[UserDB] Save error:", e);
    }
  }

  findUser(email) {
    if (!email) return null;
    const normalized = email.trim().toLowerCase();
    const db = this.getDB();
    return db.users[normalized] || null;
  }

  registerUser({ fullName, email, password, clientInfo, role = "user" }) {
    const normalized = email.trim().toLowerCase();
    const db = this.getDB();

    let user = db.users[normalized];
    if (user) {
      user.name = fullName.trim() || user.name;
      if (password) user.password = password;
      user.lastLogin = new Date().toISOString();
      user.updatedAt = new Date().toISOString();
    } else {
      const uid = "user_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
      user = {
        id: uid,
        name: fullName.trim() || normalized.split("@")[0] || "Pantry Chef",
        email: normalized,
        password: password || "",
        role: role,
        emailVerified: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        preferences: {
          emailNotifications: true,
          expiryAlerts: true,
          lowStockAlerts: true,
          expiredAlerts: true,
          securityAlerts: true
        }
      };
      db.users[normalized] = user;
    }

    this.saveDB(db);
    const token = "sp_jwt_" + btoa(JSON.stringify({ id: user.id, email: user.email, time: Date.now() }));
    this.setActiveSession(user, token);
    return { success: true, user, token };
  }

  loginUser({ email, password, clientInfo }) {
    const normalized = email.trim().toLowerCase();
    const db = this.getDB();
    let user = db.users[normalized];

    if (!user) {
      const rawName = normalized.split("@")[0] || "User";
      const cleanName = rawName.replace(/[^a-zA-Z0-9]/g, " ").trim();
      const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1) || "User";
      const uid = "user_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

      user = {
        id: uid,
        name: formattedName,
        email: normalized,
        password: password || "",
        role: "user",
        emailVerified: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        preferences: {
          emailNotifications: true,
          expiryAlerts: true,
          lowStockAlerts: true,
          expiredAlerts: true,
          securityAlerts: true
        }
      };
      db.users[normalized] = user;
    } else {
      user.lastLogin = new Date().toISOString();
      if (password) user.password = password;
    }

    this.saveDB(db);
    const token = "sp_jwt_" + btoa(JSON.stringify({ id: user.id, email: user.email, time: Date.now() }));
    this.setActiveSession(user, token);
    return { success: true, user, token };
  }

  setActiveSession(user, token) {
    try {
      localStorage.setItem("smartpantry_token", token);
      localStorage.setItem("smartpantry_user", JSON.stringify(user));
    } catch (e) {
      console.error("[UserDB] Set active session error:", e);
    }
  }

  getActiveUser() {
    try {
      const raw = localStorage.getItem("smartpantry_user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  getAllUsers() {
    const db = this.getDB();
    return Object.values(db.users || {});
  }

  logout() {
    try {
      localStorage.removeItem("smartpantry_token");
      localStorage.removeItem("smartpantry_user");
      if (window.supabaseService) {
        window.supabaseService.signOut().catch(() => {});
      }
      if (window.store) {
        window.store.items = [];
        window.store.userId = null;
        window.store.notify();
      }
    } catch (e) {}
  }
}

window.UserDB = new UserDatabaseManager();

function getCurrentUserInfo() {
  try {
    const raw = localStorage.getItem("smartpantry_user");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id && parsed.id !== 'guest_pantry_user') return parsed;
    }
  } catch (e) {}
  return null;
}

class PantryStore {
  constructor() {
    this.listeners = [];
    this.items = [];
    this.activity = [];
    this.alerts = [];
    this.fullSettings = null;
    this.userId = null;
    this.isLoading = false;
    this.init();
  }

  get storageKey() {
    const user = getCurrentUserInfo();
    const uid = user ? (user.id || (user.email ? user.email.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'guest')) : 'guest';
    return `smartpantry_user_pantry_${uid}`;
  }

  get settingsKey() {
    const user = getCurrentUserInfo();
    const uid = user ? (user.id || (user.email ? user.email.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'guest')) : 'guest';
    return `smart_pantry_settings_${uid}`;
  }

  get fullSettingsKey() {
    const user = getCurrentUserInfo();
    const uid = user ? (user.id || (user.email ? user.email.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'guest')) : 'guest';
    return `smart_pantry_full_settings_${uid}`;
  }

  get activityKey() {
    const user = getCurrentUserInfo();
    const uid = user ? (user.id || (user.email ? user.email.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'guest')) : 'guest';
    return `smart_pantry_activity_${uid}`;
  }

  get alertsKey() {
    const user = getCurrentUserInfo();
    const uid = user ? (user.id || (user.email ? user.email.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'guest')) : 'guest';
    return `smart_pantry_live_alerts_${uid}`;
  }

  get alertHistoryKey() {
    const user = getCurrentUserInfo();
    const uid = user ? (user.id || (user.email ? user.email.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'guest')) : 'guest';
    return `smart_pantry_alerts_${uid}`;
  }

  init() {
    const user = getCurrentUserInfo();
    if (!user || !user.id || user.id === 'guest_pantry_user') {
      this.userId = null;
      this.items = [];
      this.activity = [];
      this.alerts = [];
      return;
    }
    this.userId = user.id;

    // 1. Initial cache loads (isolated per user)
    const cached = localStorage.getItem(this.storageKey);
    this.items = cached ? JSON.parse(cached) : [];

    try {
      const cachedAct = localStorage.getItem(this.activityKey);
      this.activity = cachedAct ? JSON.parse(cachedAct) : [];
    } catch(e) { this.activity = []; }

    try {
      const cachedAlerts = localStorage.getItem(this.alertsKey);
      this.alerts = cachedAlerts ? JSON.parse(cachedAlerts) : [];
    } catch(e) { this.alerts = []; }

    // 2. Initialize default full settings
    this.loadLocalFullSettings();

    // 3. Fetch from Supabase Cloud Database ONLY when authenticated
    if (window.supabaseService && window.supabaseService.isAuthenticated()) {
      this.fetchFromSupabase();
      this.fetchSettingsFromSupabase();
      this.fetchActivityFromSupabase();
      this.fetchAlertsFromSupabase();
      this.setupRealtimeSubscriptions();
    }

    // 4. Compute dynamic pantry alerts on startup
    setTimeout(() => {
      if (this.userId) {
        this.syncAlertsFromPantry();
        this.checkAndDispatchPantryAlerts();
        this.updateAlertBadge();
      }
    }, 1200);
  }

  clearUserSession() {
    this.userId = null;
    this.items = [];
    this.activity = [];
    this.alerts = [];
    if (window.supabaseService) {
      window.supabaseService.unsubscribeAll();
    }
    this.notify();
  }

  async initUser(userId) {
    this.clearUserSession();
    this.userId = userId;
    if (!this.userId) return;

    // Immediately restore cached items, activity, and alerts for this specific user
    try {
      const cached = localStorage.getItem(this.storageKey);
      if (cached) this.items = JSON.parse(cached);
    } catch(e) {}
    try {
      const cachedAct = localStorage.getItem(this.activityKey);
      if (cachedAct) this.activity = JSON.parse(cachedAct);
    } catch(e) {}
    try {
      const cachedAlerts = localStorage.getItem(this.alertsKey);
      if (cachedAlerts) this.alerts = JSON.parse(cachedAlerts);
    } catch(e) {}
    this.notify();

    this.loadLocalFullSettings();
    await this.fetchFromSupabase();
    await this.fetchSettingsFromSupabase();
    await this.fetchActivityFromSupabase();
    await this.fetchAlertsFromSupabase();
    this.setupRealtimeSubscriptions();
  }

  setupRealtimeSubscriptions() {
    if (!this.userId || !window.supabaseService) return;

    window.supabaseService.subscribeToUserProducts(this.userId, (payload) => {
      if (payload && payload.eventType) {
        if (payload.eventType === 'INSERT' && payload.new) {
          const item = window.supabaseService.mapFromDB(payload.new);
          if (!this.items.some(i => String(i.id) === String(item.id))) {
            this.items = [item, ...this.items];
          }
        } else if (payload.eventType === 'UPDATE' && payload.new) {
          const item = window.supabaseService.mapFromDB(payload.new);
          this.items = this.items.map(i => String(i.id) === String(item.id) ? item : i);
        } else if (payload.eventType === 'DELETE' && payload.old) {
          this.items = this.items.filter(i => String(i.id) !== String(payload.old.id));
        } else {
          this.fetchFromSupabase();
          return;
        }
        this.saveItems(this.items);
        this.syncAlertsFromPantry();
        this.notify();
      } else {
        this.fetchFromSupabase();
      }
    });

    window.supabaseService.subscribeToUserAlerts(this.userId, () => {
      this.fetchAlertsFromSupabase();
    });

    window.supabaseService.subscribeToUserSettings(this.userId, () => {
      this.fetchSettingsFromSupabase().then(() => {
        if (typeof window.renderSettingsView === 'function') {
          window.renderSettingsView();
        }
      });
    });
  }

  loadLocalFullSettings() {
    const user = getCurrentUserInfo();
    const defaultSettings = {
      preferences: {
        email_notifications: true,
        alert_expiry: true,
        expiry_alerts: true,
        alert_expired: true,
        expired_product_alerts: true,
        alert_low_stock: true,
        low_stock_alerts: true,
        alert_security: true,
        security_notifications: true,
        alert_weekly_summary: false,
        weekly_summary: false,
        shopping_recommendations: true,
        meal_plan_notifications: true
      },
      pantry_settings: {
        default_location: "Pantry",
        expiry_warning_days: 7,
        low_stock_threshold: 2,
        default_unit: "pcs",
        default_category: "Pantry",
        default_planning_period_days: 7,
        auto_add_scanned_products: true,
        auto_calculate_expiry: true,
        opened_product_tracking: true,
        smart_shopping_recommendations: true,
        food_waste_tracking: true
      },
      general_settings: {
        language: "English",
        timezone: "Asia/Kolkata",
        currency: "INR",
        date_format: "DD/MM/YYYY",
        theme: "light",
        layout_mode: "comfortable"
      },
      privacy_settings: {
        data_usage_consent: true,
        analytics_enabled: true,
        ai_personalization: true,
        recipe_personalization: true,
        shopping_personalization: true,
        profile_visibility: "private"
      }
    };

    try {
      const raw = localStorage.getItem(this.fullSettingsKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        this.fullSettings = {
          preferences: { ...defaultSettings.preferences, ...(parsed.preferences || {}) },
          pantry_settings: { ...defaultSettings.pantry_settings, ...(parsed.pantry_settings || {}) },
          general_settings: { ...defaultSettings.general_settings, ...(parsed.general_settings || {}) },
          privacy_settings: { ...defaultSettings.privacy_settings, ...(parsed.privacy_settings || {}) }
        };
      } else {
        this.fullSettings = defaultSettings;
        localStorage.setItem(this.fullSettingsKey, JSON.stringify(defaultSettings));
      }
    } catch(e) {
      this.fullSettings = defaultSettings;
    }

    this.applyTheme(this.fullSettings.general_settings?.theme || 'light');
    this.applyLayoutMode(this.fullSettings.general_settings?.layout_mode || 'comfortable');

    // Compatibility for legacy getSettings()
    const setKey = this.settingsKey;
    if (!localStorage.getItem(setKey)) {
      localStorage.setItem(setKey, JSON.stringify({
        email: user ? (user.email || "intellipantrynotify@gmail.com") : "intellipantrynotify@gmail.com",
        alertOnStockOut: true,
        alertOnExpiry: true
      }));
    }
  }

  async fetchFromSupabase() {
    if (!this.userId || this.userId === 'guest_pantry_user' || !window.supabaseService || !window.supabaseService.isAuthenticated()) {
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    this.notify();
    try {
      const dbItems = await window.supabaseService.getProducts(this.userId);
      if (Array.isArray(dbItems)) {
        // Merge items that are marked as pendingSync or not in dbItems yet
        const currentItems = Array.isArray(this.items) ? this.items : [];
        const pendingItems = currentItems.filter(item => item && item.pendingSync);
        const merged = [...dbItems];

        for (const p of pendingItems) {
          if (!merged.some(m => String(m.id) === String(p.id))) {
            merged.push(p);
          }
        }

        this.items = merged;
        try {
          localStorage.setItem(this.storageKey, JSON.stringify(merged));
          if (this.userId) {
            localStorage.setItem(`smartpantry_user_pantry_${this.userId}`, JSON.stringify(merged));
          }
        } catch(e) {}
        this.syncAlertsFromPantry();

        // If there were pending items and remote table is online, background sync them
        if (pendingItems.length > 0) {
          this.syncPendingItemsToSupabase();
        }
      } else {
        // dbItems is null (table 404 or offline) - preserve local pantry items!
        console.log("[PantryStore] Remote table returned null/offline. Preserving existing local pantry items.");
      }
    } catch (err) {
      console.warn("[PantryStore] Supabase fetch warning:", err.message);
    } finally {
      this.isLoading = false;
      this.notify();
    }
  }

  async syncPendingItemsToSupabase() {
    if (!this.userId || !window.supabaseService || !window.supabaseService.isReady()) return;
    const pending = (this.items || []).filter(i => i && i.pendingSync);
    if (!pending.length) return;

    for (const item of pending) {
      try {
        const saved = await window.supabaseService.insertProduct(item, this.userId);
        if (saved && saved.id) {
          item.id = saved.id;
          item.pendingSync = false;
          item.synced = true;
        }
      } catch (e) {
        break; // Stop loop if remote table remains offline/404
      }
    }
    this.saveItems(this.items);
  }

  async fetchSettingsFromSupabase() {
    if (!this.userId || this.userId === 'guest_pantry_user' || !window.supabaseService || !window.supabaseService.isAuthenticated()) return;
    try {
      const dbSettings = await window.supabaseService.getUserSettings(this.userId);
      if (dbSettings) {
        if (dbSettings.preferences) this.fullSettings.preferences = { ...this.fullSettings.preferences, ...dbSettings.preferences };
        if (dbSettings.pantry_settings) this.fullSettings.pantry_settings = { ...this.fullSettings.pantry_settings, ...dbSettings.pantry_settings };
        if (dbSettings.general_settings) this.fullSettings.general_settings = { ...this.fullSettings.general_settings, ...dbSettings.general_settings };
        if (dbSettings.privacy_settings) this.fullSettings.privacy_settings = { ...this.fullSettings.privacy_settings, ...dbSettings.privacy_settings };
        localStorage.setItem(this.fullSettingsKey, JSON.stringify(this.fullSettings));
        this.applyTheme(this.fullSettings.general_settings?.theme || 'light');
        this.applyLayoutMode(this.fullSettings.general_settings?.layout_mode || 'comfortable');
        this.notify();
      }
    } catch (err) {
      console.warn("[PantryStore] Supabase settings fetch warning:", err);
    }
  }

  async fetchActivityFromSupabase() {
    if (!this.userId || this.userId === 'guest_pantry_user' || !window.supabaseService || !window.supabaseService.isAuthenticated()) return;
    try {
      const dbActivity = await window.supabaseService.getActivity(this.userId, 50);
      if (Array.isArray(dbActivity) && dbActivity.length > 0) {
        this.activity = dbActivity;
        localStorage.setItem(this.activityKey, JSON.stringify(this.activity));
        this.notify();
      }
    } catch (err) {
      console.warn("[PantryStore] Supabase activity fetch warning:", err);
    }
  }

  async fetchAlertsFromSupabase() {
    if (!this.userId || this.userId === 'guest_pantry_user' || !window.supabaseService || !window.supabaseService.isAuthenticated()) return;
    try {
      const dbAlerts = await window.supabaseService.getAlerts(this.userId);
      if (Array.isArray(dbAlerts)) {
        this.alerts = dbAlerts;
        localStorage.setItem(this.alertsKey, JSON.stringify(this.alerts));
        this.updateAlertBadge();
        this.notify();
      }
    } catch (err) {
      console.warn("[PantryStore] Supabase alerts fetch warning:", err);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => {
      try { fn(); } catch(e) { console.error(e); }
    });
    this.updateAlertBadge();
  }

  getItems() {
    return Array.isArray(this.items) ? this.items : [];
  }

  saveItems(items) {
    this.items = items;
    if (this.userId) {
      localStorage.setItem(`smartpantry_user_pantry_${this.userId}`, JSON.stringify(items));
    }
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.syncAlertsFromPantry();
    this.notify();
    this.checkAndDispatchPantryAlerts();
  }

  // ==========================================
  // PANTRY CRUD WITH AUTOMATED ACTIVITY LOGGING
  // ==========================================

  async addItem(item) {
    const resolvedEmoji = item.emoji || this.detectEmoji(item.name, item.category);
    const warnDays = this.fullSettings?.pantry_settings?.expiry_warning_days || 7;
    const purchaseDateVal = item.purchaseDate || (window.ShelfLife ? window.ShelfLife.getTodayLocalISO() : (window.getTodayISO ? window.getTodayISO() : new Date().toISOString().split('T')[0]));

    // 1. Resolve Expiry & Shelf Life Prediction
    let actualExpiryDate = null;
    let estimatedExpiryDate = null;
    let expiryType = item.expiryType || 'actual';
    let shelfLifeDaysVal = item.shelfLifeDays !== undefined ? item.shelfLifeDays : null;
    let storageTypeVal = item.storageType || item.location || "Pantry";
    let storageRecVal = item.storageRecommendation || null;

    if (item.actualExpiryDate) {
      actualExpiryDate = item.actualExpiryDate;
      expiryType = 'actual';
    } else if (item.estimatedExpiryDate) {
      estimatedExpiryDate = item.estimatedExpiryDate;
      expiryType = 'estimated';
    } else if (item.expiryDate) {
      if (item.expiryType === 'estimated') {
        estimatedExpiryDate = item.expiryDate;
        expiryType = 'estimated';
      } else {
        actualExpiryDate = item.expiryDate;
        expiryType = 'actual';
      }
    } else {
      // No expiry date provided: Predict from Universal Shelf-Life Database
      if (window.ShelfLife && typeof window.ShelfLife.predictExpiry === 'function') {
        const pred = window.ShelfLife.predictExpiry(item.name, item.category, purchaseDateVal);
        estimatedExpiryDate = pred.estimated_expiry_date;
        shelfLifeDaysVal = pred.typical_shelf_life_days;
        if (!item.storageType) storageTypeVal = pred.storage_type;
        if (!item.storageRecommendation) storageRecVal = pred.storage_recommendation;
        expiryType = 'estimated';
      }
    }

    // 2. Resolve Opened Tracking
    let productStatus = item.productStatus || 'Unopened';
    let openedDate = item.openedDate || null;
    let openedShelfLifeDaysVal = item.openedShelfLifeDays !== undefined ? item.openedShelfLifeDays : null;
    let recommendedUseByVal = item.recommendedUseByDate || null;

    if (productStatus === 'Opened' && window.ShelfLife) {
      const calc = window.ShelfLife.calculateOpenedUseByDate(item.name, item.category, openedDate);
      openedDate = calc.opened_date;
      openedShelfLifeDaysVal = calc.opened_shelf_life_days;
      recommendedUseByVal = calc.recommended_use_by_date;
      if (!storageRecVal && calc.storage_recommendation) {
        storageRecVal = calc.storage_recommendation;
      }
    }

    // 3. Determine Effective Expiry Date using Priority Rules:
    // Priority 1: Manufacturer printed actual expiry
    // Priority 2: Opened use-by date if earlier
    // Priority 3: Database estimated expiry
    let effectiveExpiryDate = null;
    let isEstimate = expiryType === 'estimated';

    if (window.ShelfLife && typeof window.ShelfLife.calculateEffectiveExpiry === 'function') {
      const eff = window.ShelfLife.calculateEffectiveExpiry({
        actual_expiry_date: actualExpiryDate,
        estimated_expiry_date: estimatedExpiryDate,
        product_status: productStatus,
        opened_date: openedDate,
        recommended_use_by_date: recommendedUseByVal,
        name: item.name,
        category: item.category,
        purchase_date: purchaseDateVal
      });
      effectiveExpiryDate = eff.effective_expiry_date;
      expiryType = eff.expiry_type;
      isEstimate = eff.is_estimate;
    } else {
      effectiveExpiryDate = actualExpiryDate || estimatedExpiryDate || item.expiryDate || "";
      isEstimate = expiryType === 'estimated';
    }

    const computedStatus = this.calculateStatus(effectiveExpiryDate, item.quantity, item.minStock, warnDays);
    const expiryStatusVal = window.ShelfLife ? window.ShelfLife.getExpiryStatus(effectiveExpiryDate).status : computedStatus;

    const effectiveUserId = window.supabaseService ? await window.supabaseService.getAuthenticatedUserId(this.userId) : this.userId;
    if (effectiveUserId) this.userId = effectiveUserId;

    const unitVal = item.unit || item.quantityUnit || "pcs";
    const minStockVal = item.minStock !== undefined ? Number(item.minStock) : (item.lowStockThreshold !== undefined ? Number(item.lowStockThreshold) : 2);
    const notesVal = item.notes || item.description || "";

    const genId = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : ('prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6));

    const newItem = {
      id: item.id || genId,
      name: item.name,
      brand: item.brand || "",
      imageUrl: item.imageUrl || item.image || "",
      minStock: minStockVal,
      lowStockThreshold: minStockVal,
      category: item.category || "Pantry",
      quantity: Number(item.quantity) || 1,
      unit: unitVal,
      quantityUnit: unitVal,
      expiryDate: effectiveExpiryDate || "",
      actualExpiryDate: actualExpiryDate,
      estimatedExpiryDate: estimatedExpiryDate,
      effectiveExpiryDate: effectiveExpiryDate,
      expiryType: expiryType,
      isEstimate: isEstimate,
      shelfLifeDays: shelfLifeDaysVal,
      productStatus: productStatus,
      openedDate: openedDate,
      openedShelfLifeDays: openedShelfLifeDaysVal,
      recommendedUseByDate: recommendedUseByVal,
      storageType: storageTypeVal,
      storageRecommendation: storageRecVal,
      expiryStatus: expiryStatusVal,
      purchaseDate: purchaseDateVal,
      barcode: item.barcode || "",
      price: Number(item.price) || 0,
      notes: notesVal,
      description: notesVal,
      location: item.location || item.storageLocation || storageTypeVal,
      storageLocation: item.location || item.storageLocation || storageTypeVal,
      status: computedStatus,
      emoji: resolvedEmoji,
      addedAt: item.addedAt || new Date().toISOString(),
      pendingSync: false
    };

    // Attempt remote Supabase database persistence if online/configured
    if (effectiveUserId && window.supabaseService && window.supabaseService.isReady()) {
      try {
        const saved = await window.supabaseService.insertProduct(newItem, effectiveUserId);
        if (saved && saved.id) {
          newItem.id = saved.id;
          newItem.synced = true;
          newItem.pendingSync = false;
          if (saved.addedAt) newItem.addedAt = saved.addedAt;
        } else {
          newItem.pendingSync = true;
        }
      } catch (err) {
        console.warn("[PantryStore] Supabase insertProduct warning:", err.message);
        newItem.pendingSync = true;
      }
    }

    this.items = [newItem, ...this.items.filter(i => String(i.id) !== String(newItem.id))];
    this.saveItems(this.items);

    // Log Activity
    await this.logActivity(
      'added',
      newItem.id,
      newItem.name,
      `Added ${newItem.quantity} ${newItem.unit} to ${newItem.category}${newItem.isEstimate ? ' (Estimated Expiry)' : ''}`
    );

    return newItem;
  }

  async updateItem(id, updates) {
    const current = this.getItemById(id);
    const oldQty = current ? Number(current.quantity) : 1;
    const newQty = updates.quantity !== undefined ? Number(updates.quantity) : oldQty;
    const warnDays = this.fullSettings?.pantry_settings?.expiry_warning_days || 7;

    // Recalculate shelf-life / expiry if dates, status, or names changed
    const merged = { ...(current || {}), ...updates };
    if (
      updates.actualExpiryDate !== undefined ||
      updates.estimatedExpiryDate !== undefined ||
      updates.expiryDate !== undefined ||
      updates.productStatus !== undefined ||
      updates.openedDate !== undefined ||
      updates.name !== undefined ||
      updates.category !== undefined
    ) {
      if (window.ShelfLife) {
        // If product status changed to opened and recommended date not set
        if (merged.productStatus === 'Opened' && !merged.recommendedUseByDate) {
          const calc = window.ShelfLife.calculateOpenedUseByDate(merged.name, merged.category, merged.openedDate);
          updates.openedDate = calc.opened_date;
          updates.openedShelfLifeDays = calc.opened_shelf_life_days;
          updates.recommendedUseByDate = calc.recommended_use_by_date;
          merged.openedDate = calc.opened_date;
          merged.openedShelfLifeDays = calc.opened_shelf_life_days;
          merged.recommendedUseByDate = calc.recommended_use_by_date;
          if (!merged.storageRecommendation) {
            updates.storageRecommendation = calc.storage_recommendation;
            merged.storageRecommendation = calc.storage_recommendation;
          }
        }

        const eff = window.ShelfLife.calculateEffectiveExpiry({
          actual_expiry_date: merged.actualExpiryDate !== undefined ? merged.actualExpiryDate : (merged.expiryType === 'actual' ? merged.expiryDate : null),
          estimated_expiry_date: merged.estimatedExpiryDate !== undefined ? merged.estimatedExpiryDate : (merged.expiryType === 'estimated' ? merged.expiryDate : null),
          product_status: merged.productStatus,
          opened_date: merged.openedDate,
          recommended_use_by_date: merged.recommendedUseByDate,
          name: merged.name,
          category: merged.category,
          purchase_date: merged.purchaseDate
        });

        updates.effectiveExpiryDate = eff.effective_expiry_date;
        updates.expiryDate = eff.effective_expiry_date;
        updates.expiryType = eff.expiry_type;
        updates.isEstimate = eff.is_estimate;
        updates.expiryStatus = window.ShelfLife.getExpiryStatus(eff.effective_expiry_date).status;
      }
    }

    const expDate = updates.expiryDate !== undefined ? updates.expiryDate : (current ? current.expiryDate : "");
    const stk = updates.minStock !== undefined ? updates.minStock : (current && current.minStock !== undefined ? current.minStock : 2);
    updates.status = this.calculateStatus(expDate, newQty, stk, warnDays);

    const effectiveUserId = window.supabaseService ? await window.supabaseService.getAuthenticatedUserId(this.userId) : this.userId;
    if (effectiveUserId) this.userId = effectiveUserId;

    let saved = null;
    if (effectiveUserId && window.supabaseService && window.supabaseService.isReady()) {
      try {
        saved = await window.supabaseService.updateProduct(id, updates, effectiveUserId);
      } catch (err) {
        console.warn("[PantryStore] Supabase updateProduct warning:", err.message);
      }
    }

    this.items = this.items.map(item => String(item.id) === String(id) ? { ...item, ...updates, ...(saved || {}) } : item);
    this.saveItems(this.items);

    // Log Activity (Distinguish quantity changes from info edits)
    const isQtyChange = updates.quantity !== undefined && oldQty !== newQty;
    const action = isQtyChange ? 'quantity_changed' : 'updated';
    const details = isQtyChange 
      ? `Quantity adjusted from ${oldQty} to ${newQty} ${updates.unit || (current ? current.unit : 'pcs')}`
      : `Updated product information`;

    await this.logActivity(
      action,
      id,
      current ? current.name : 'Item',
      details
    );

    return this.getItemById(id);
  }

  // Toggle Opened/Unopened status for a product
  async toggleProductOpenedStatus(id, customOpenedDate = null) {
    const item = this.getItemById(id);
    if (!item) return null;

    const isCurrentlyOpened = item.productStatus === "Opened";
    const newStatus = isCurrentlyOpened ? "Unopened" : "Opened";
    const today = window.ShelfLife ? window.ShelfLife.getTodayLocalISO() : (window.getTodayISO ? window.getTodayISO() : new Date().toISOString().split("T")[0]);
    const openedDate = isCurrentlyOpened ? null : (customOpenedDate || today);

    let openedData = {
      productStatus: newStatus,
      openedDate: openedDate,
      openedShelfLifeDays: null,
      recommendedUseByDate: null
    };

    if (newStatus === "Opened" && window.ShelfLife) {
      const calc = window.ShelfLife.calculateOpenedUseByDate(item.name, item.category, openedDate);
      openedData.openedShelfLifeDays = calc.opened_shelf_life_days;
      openedData.recommendedUseByDate = calc.recommended_use_by_date;
      if (!item.storageRecommendation && calc.storage_recommendation) {
        openedData.storageRecommendation = calc.storage_recommendation;
      }
    }

    return await this.updateItem(id, openedData);
  }

  async deleteItem(id) {
    const item = this.getItemById(id);
    const itemName = item ? item.name : 'Product';

    const effectiveUserId = window.supabaseService ? await window.supabaseService.getAuthenticatedUserId(this.userId) : this.userId;
    if (effectiveUserId) this.userId = effectiveUserId;

    if (effectiveUserId && window.supabaseService && window.supabaseService.isReady()) {
      try {
        await window.supabaseService.deleteProduct(id, effectiveUserId);
      } catch (err) {
        console.warn("[PantryStore] Supabase deleteProduct warning:", err.message);
      }
    }

    this.items = this.items.filter(item => String(item.id) !== String(id));
    this.saveItems(this.items);

    // Clean up any alerts associated with this deleted product
    if (Array.isArray(this.alerts)) {
      this.alerts = this.alerts.filter(a => String(a.product_id) !== String(id));
      try {
        localStorage.setItem(this.alertsKey, JSON.stringify(this.alerts));
      } catch(e) {}
      this.updateAlertBadge();
    }

    // Log Activity
    await this.logActivity('deleted', id, itemName, `Removed from pantry`);
    return true;
  }

  clearAll() {
    this.items = [];
    localStorage.removeItem(this.storageKey);
    this.logActivity('deleted', 'all', 'All Products', 'Pantry inventory reset');
    this.notify();
  }

  getItemById(id) {
    return this.getItems().find(i => String(i.id) === String(id));
  }

  getShoppingList() {
    if (window.RecipeEngine && typeof window.RecipeEngine.getShoppingList === 'function') {
      const list = window.RecipeEngine.getShoppingList();
      if (Array.isArray(list) && list.length > 0) return list;
    }
    return this.getItems().filter(i => {
      const threshold = i.minStock !== undefined && i.minStock !== null && !isNaN(Number(i.minStock)) ? Number(i.minStock) : 2;
      const s = this.calculateStatus(i.expiryDate, i.quantity, threshold);
      return s === "Low Stock" || s === "Expired" || Number(i.quantity) <= threshold;
    });
  }

  // ==========================================
  // ACTIVITY ENGINE
  // ==========================================

  async logActivity(action, productId, productName, details) {
    const entry = {
      id: 'act_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      action: action || 'updated',
      product_id: productId ? String(productId) : null,
      product_name: productName || 'Product',
      details: details || '',
      created_at: new Date().toISOString()
    };

    this.activity = [entry, ...this.activity.slice(0, 99)];
    try {
      localStorage.setItem(this.activityKey, JSON.stringify(this.activity));
    } catch(e) {}

    if (this.userId && window.supabaseService && window.supabaseService.isReady()) {
      try {
        await window.supabaseService.logActivity(this.userId, {
          action: entry.action,
          productId: entry.product_id,
          productName: entry.product_name,
          details: entry.details
        });
      } catch(err) {
        console.warn("[Pantry Activity] Sync error:", err.message);
      }
    }

    this.notify();
  }

  getActivity(timeframe = 'all') {
    const all = Array.isArray(this.activity) ? this.activity : [];
    if (timeframe === 'all') return all;

    const cutoffMs = this.getCutoffTimestamp(timeframe);
    return all.filter(a => new Date(a.created_at || a.createdAt || Date.now()).getTime() >= cutoffMs);
  }

  // ==========================================
  // REAL-TIME ALERT CENTER ENGINE
  // ==========================================

  getAlerts(filter = 'all') {
    const all = Array.isArray(this.alerts) ? this.alerts : [];
    if (filter === 'unread') return all.filter(a => !a.is_read);
    if (filter === 'expiry') return all.filter(a => a.type === 'expiry');
    if (filter === 'low_stock') return all.filter(a => a.type === 'low_stock');
    if (filter === 'security') return all.filter(a => a.type === 'security');
    return all;
  }

  getUnreadAlertsCount() {
    return this.getAlerts('unread').length;
  }

  updateAlertBadge() {
    const unreadCount = this.getUnreadAlertsCount();
    const badges = document.querySelectorAll('.noti-badge, #topbarAlertBadge');
    badges.forEach(b => {
      b.textContent = unreadCount;
      b.style.display = unreadCount > 0 ? 'flex' : 'none';
    });
  }

  syncAlertsFromPantry() {
    const items = this.getItems();
    const settings = this.getFullSettings();
    const warningDays = settings.pantry_settings?.expiry_warning_days || 7;
    const threshold = settings.pantry_settings?.low_stock_threshold || 2;
    const alertsPref = settings.preferences || {};

    const existingAlertsMap = {};
    (this.alerts || []).forEach(a => {
      if (a.product_id) existingAlertsMap[a.product_id + '_' + a.type] = a;
    });

    const newAlerts = [];

    items.forEach(item => {
      const diffDays = getDaysDifference(item.expiryDate);
      const qty = Number(item.quantity) || 0;

      // 1. Expired alert
      if (diffDays !== null && diffDays < 0 && alertsPref.alert_expired !== false) {
        const key = item.id + '_expiry_expired';
        const existing = existingAlertsMap[key];
        newAlerts.push({
          id: existing ? existing.id : 'al_' + key,
          product_id: item.id,
          type: 'expiry',
          title: 'Product Expired',
          message: `"${item.name}" expired ${Math.abs(diffDays)} day(s) ago (${item.expiryDate}).`,
          is_read: existing ? existing.is_read : false,
          created_at: existing ? existing.created_at : new Date().toISOString()
        });
      }
      // 2. Expiring soon alert
      else if (diffDays !== null && diffDays >= 0 && diffDays <= warningDays && alertsPref.alert_expiry !== false) {
        const key = item.id + '_expiry_soon';
        const existing = existingAlertsMap[key];
        const dayLabel = diffDays === 0 ? 'today' : (diffDays === 1 ? 'tomorrow' : `in ${diffDays} days`);
        newAlerts.push({
          id: existing ? existing.id : 'al_' + key,
          product_id: item.id,
          type: 'expiry',
          title: 'Expiring Soon',
          message: `"${item.name}" expires ${dayLabel} (${item.expiryDate}).`,
          is_read: existing ? existing.is_read : false,
          created_at: existing ? existing.created_at : new Date().toISOString()
        });
      }

      // 3. Out of stock alert
      if (qty <= 0 && alertsPref.alert_low_stock !== false) {
        const key = item.id + '_out_of_stock';
        const existing = existingAlertsMap[key];
        newAlerts.push({
          id: existing ? existing.id : 'al_' + key,
          product_id: item.id,
          type: 'low_stock',
          title: 'Out of Stock',
          message: `"${item.name}" is completely out of stock. Add to your shopping list!`,
          is_read: existing ? existing.is_read : false,
          created_at: existing ? existing.created_at : new Date().toISOString()
        });
      }
      // 4. Low stock alert
      else if (qty > 0 && qty <= threshold && alertsPref.alert_low_stock !== false) {
        const key = item.id + '_low_stock';
        const existing = existingAlertsMap[key];
        newAlerts.push({
          id: existing ? existing.id : 'al_' + key,
          product_id: item.id,
          type: 'low_stock',
          title: 'Low Stock Alert',
          message: `"${item.name}" is low (${qty} ${item.unit} left). Threshold is ${threshold}.`,
          is_read: existing ? existing.is_read : false,
          created_at: existing ? existing.created_at : new Date().toISOString()
        });
      }
    });

    // Retain manual system/security alerts
    const systemAlerts = (this.alerts || []).filter(a => a.type === 'security' || a.type === 'system');
    this.alerts = [...newAlerts, ...systemAlerts];

    try {
      localStorage.setItem(this.alertsKey, JSON.stringify(this.alerts));
    } catch(e) {}

    this.updateAlertBadge();
  }

  async markAlertRead(alertId) {
    this.alerts = this.alerts.map(a => a.id === alertId ? { ...a, is_read: true } : a);
    try {
      localStorage.setItem(this.alertsKey, JSON.stringify(this.alerts));
    } catch(e) {}

    if (this.userId && window.supabaseService && window.supabaseService.isReady()) {
      try {
        await window.supabaseService.markAlertAsRead(alertId, this.userId);
      } catch(e) {}
    }

    this.updateAlertBadge();
    this.notify();
  }

  async markAllAlertsRead() {
    this.alerts = this.alerts.map(a => ({ ...a, is_read: true }));
    try {
      localStorage.setItem(this.alertsKey, JSON.stringify(this.alerts));
    } catch(e) {}

    if (this.userId && window.supabaseService && window.supabaseService.isReady()) {
      try {
        await window.supabaseService.markAllAlertsAsRead(this.userId);
      } catch(e) {}
    }

    this.updateAlertBadge();
    this.notify();
  }

  async deleteAlert(alertId) {
    this.alerts = this.alerts.filter(a => a.id !== alertId);
    try {
      localStorage.setItem(this.alertsKey, JSON.stringify(this.alerts));
    } catch(e) {}

    if (this.userId && window.supabaseService && window.supabaseService.isReady()) {
      try {
        await window.supabaseService.deleteAlert(alertId, this.userId);
      } catch(e) {}
    }

    this.updateAlertBadge();
    this.notify();
  }

  // ==========================================
  // SETTINGS & APPEARANCE
  // ==========================================

  getFullSettings() {
    if (!this.fullSettings) {
      this.loadLocalFullSettings();
    }
    return this.fullSettings;
  }

  async saveFullSettings(newSettings) {
    this.fullSettings = {
      preferences: { ...this.fullSettings.preferences, ...(newSettings.preferences || {}) },
      pantry_settings: { ...this.fullSettings.pantry_settings, ...(newSettings.pantry_settings || {}) },
      general_settings: { ...this.fullSettings.general_settings, ...(newSettings.general_settings || {}) },
      privacy_settings: { ...this.fullSettings.privacy_settings, ...(newSettings.privacy_settings || {}) }
    };

    try {
      localStorage.setItem(this.fullSettingsKey, JSON.stringify(this.fullSettings));
    } catch(e) {}

    // Legacy sync
    const user = getCurrentUserInfo();
    this.saveSettings({
      email: user.email || "intellipantrynotify@gmail.com",
      alertOnStockOut: this.fullSettings.preferences.alert_low_stock !== false,
      alertOnExpiry: this.fullSettings.preferences.alert_expiry !== false
    });

    // Apply Theme & Layout Density immediately to DOM
    this.applyTheme(this.fullSettings.general_settings?.theme || 'light');
    this.applyLayoutMode(this.fullSettings.general_settings?.layout_mode || 'comfortable');

    // Recalculate pantry alerts & metrics immediately
    this.syncAlertsFromPantry();
    this.notify();

    if (this.userId && window.supabaseService && window.supabaseService.isReady()) {
      try {
        await window.supabaseService.saveUserSettings(this.userId, this.fullSettings);
      } catch(e) {
        console.warn("[PantryStore] Settings cloud save warning:", e);
      }
    }
  }

  applyTheme(theme) {
    const root = document.documentElement;
    const body = document.body;
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      root.classList.add('dark-theme');
      root.setAttribute('data-theme', 'dark');
      if (body) {
        body.classList.add('dark-theme');
        body.setAttribute('data-theme', 'dark');
      }
    } else {
      root.classList.remove('dark-theme');
      root.removeAttribute('data-theme');
      if (body) {
        body.classList.remove('dark-theme');
        body.removeAttribute('data-theme');
      }
    }

    if (theme === 'system' && window.matchMedia && !this._systemThemeBound) {
      this._systemThemeBound = true;
      try {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener('change', () => {
          if (this.fullSettings?.general_settings?.theme === 'system') {
            this.applyTheme('system');
          }
        });
      } catch (err) {}
    }
  }

  applyLayoutMode(mode) {
    if (mode === 'compact') {
      document.body.classList.add('compact-mode');
    } else {
      document.body.classList.remove('compact-mode');
    }
  }

  // ==========================================
  // DATA EXPORT (JSON DOWNLOAD)
  // ==========================================

  exportUserData() {
    const user = getCurrentUserInfo();
    const exportBundle = {
      app: "IntelliPantry",
      version: "1.0",
      exportedAt: new Date().toISOString(),
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      settings: this.getFullSettings(),
      pantryProductsCount: this.items.length,
      pantryProducts: this.items,
      recentActivity: this.activity,
      alerts: this.alerts
    };

    const jsonStr = JSON.stringify(exportBundle, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `intellipantry_backup_${getTodayISO()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ==========================================
  // DYNAMIC TIMEFRAME INSIGHTS ENGINE
  // ==========================================

  getCutoffTimestamp(timeframe) {
    const now = Date.now();
    const DAY_MS = 24 * 60 * 60 * 1000;
    if (timeframe === '7d') return now - (7 * DAY_MS);
    if (timeframe === '30d') return now - (30 * DAY_MS);
    if (timeframe === '3m') return now - (90 * DAY_MS);
    if (timeframe === '1y') return now - (365 * DAY_MS);
    return 0; // 'all'
  }

  getInsightsData(timeframe = '30d') {
    const items = this.getItems();
    const settings = this.getFullSettings();
    const warningDays = settings.pantry_settings?.expiry_warning_days || 7;
    const threshold = settings.pantry_settings?.low_stock_threshold || 2;
    const cutoffMs = this.getCutoffTimestamp(timeframe);

    // Filter items based on timeframe (by purchaseDate, addedAt or createdAt)
    const filteredItems = items.filter(item => {
      if (timeframe === 'all') return true;
      const dateStr = item.addedAt || item.purchaseDate || item.createdAt;
      if (!dateStr) return true;
      const itemTime = new Date(dateStr).getTime();
      return isNaN(itemTime) || itemTime >= cutoffMs;
    });

    const totalProducts = filteredItems.length;
    let lowStockCount = 0;
    let outOfStockCount = 0;
    let normalStockCount = 0;
    let expiringSoonCount = 0;
    let expiredCount = 0;

    let within3Days = 0;
    let within7Days = 0;
    let within30Days = 0;
    let alreadyExpired = 0;

    let totalUnits = 0;
    const categoryCounts = {};
    const lowStockNames = [];
    const expiringSoonNames = [];

    filteredItems.forEach(item => {
      const qty = Number(item.quantity) || 0;
      totalUnits += qty;

      // Category count (only for present categories)
      const cat = item.category || "Pantry";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;

      // Expiry calculations
      const diffDays = getDaysDifference(item.expiryDate);

      if (diffDays !== null) {
        if (diffDays < 0) {
          alreadyExpired++;
          expiredCount++;
        } else if (diffDays <= 3) {
          within3Days++;
          expiringSoonCount++;
          expiringSoonNames.push(item.name);
        } else if (diffDays <= 7) {
          within7Days++;
          if (warningDays >= 7) expiringSoonCount++;
          expiringSoonNames.push(item.name);
        } else if (diffDays <= 30) {
          within30Days++;
          if (warningDays >= 30) expiringSoonCount++;
        }
      }

      // Stock calculations
      if (qty <= 0) {
        outOfStockCount++;
        lowStockCount++;
        lowStockNames.push(item.name);
      } else if (qty <= threshold) {
        lowStockCount++;
        lowStockNames.push(item.name);
      } else {
        normalStockCount++;
      }
    });

    // Filtered activity feed
    const filteredActivity = this.getActivity(timeframe);

    // Smart contextual insights
    const smartInsights = [];
    if (totalProducts === 0) {
      smartInsights.push("🥣 Your pantry is currently empty. Add your first product to generate real-time analytics.");
    } else {
      if (alreadyExpired > 0) {
        smartInsights.push(`⚠️ You have ${alreadyExpired} expired product(s) that should be reviewed or safely removed.`);
      }
      if (within3Days > 0) {
        smartInsights.push(`🚨 ${within3Days} product(s) expire within the next 3 days. Prioritize cooking them today.`);
      } else if (expiringSoonCount > 0) {
        smartInsights.push(`⏳ You have ${expiringSoonCount} product(s) expiring within your ${warningDays}-day alert window.`);
      }
      if (outOfStockCount > 0) {
        smartInsights.push(`🛒 ${outOfStockCount} product(s) are completely out of stock. Check your shopping list.`);
      } else if (lowStockCount > 0) {
        const topLow = lowStockNames.slice(0, 2).join(', ');
        smartInsights.push(`📦 ${topLow}${lowStockNames.length > 2 ? ` and ${lowStockNames.length - 2} other(s)` : ''} are low in stock (≤ ${threshold} threshold).`);
      }
      if (smartInsights.length === 0) {
        smartInsights.push(`✅ All ${totalProducts} tracked item(s) are fresh and well-stocked across ${Object.keys(categoryCounts).length} category/categories.`);
      }
    }

    return {
      timeframe,
      totalProducts,
      totalUnits,
      lowStockCount,
      outOfStockCount,
      normalStockCount,
      expiringSoonCount,
      expiredCount,
      totalCategories: Object.keys(categoryCounts).length,
      recentlyAddedCount: filteredItems.filter(i => {
        const d = new Date(i.addedAt || i.purchaseDate || Date.now()).getTime();
        return Date.now() - d <= (7 * 24 * 60 * 60 * 1000);
      }).length,
      categoryCounts,
      expiryBreakdown: {
        within3Days,
        within7Days,
        within30Days,
        alreadyExpired
      },
      stockBreakdown: {
        lowStock: lowStockCount,
        outOfStock: outOfStockCount,
        normalStock: normalStockCount
      },
      activityList: filteredActivity,
      smartInsights
    };
  }

  // ==========================================
  // LEGACY COMPATIBILITY METHODS
  // ==========================================

  getSettings() {
    try {
      const data = localStorage.getItem(this.settingsKey);
      const user = getCurrentUserInfo();
      const defaultEmail = user.email || "intellipantrynotify@gmail.com";
      return data ? JSON.parse(data) : { email: defaultEmail, alertOnStockOut: true, alertOnExpiry: true };
    } catch (e) {
      const user = getCurrentUserInfo();
      return { email: user.email || "intellipantrynotify@gmail.com", alertOnStockOut: true, alertOnExpiry: true };
    }
  }

  saveSettings(settings) {
    localStorage.setItem(this.settingsKey, JSON.stringify(settings));
    this.notify();
  }

  detectEmoji(name = "", category = "") {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("apple")) return "🍎";
    if (lowerName.includes("banana")) return "🍌";
    if (lowerName.includes("orange") || lowerName.includes("lemon")) return "🍋";
    if (lowerName.includes("milk")) return "🥛";
    if (lowerName.includes("egg")) return "🥚";
    if (lowerName.includes("rice")) return "🌾";
    if (lowerName.includes("chicken")) return "🍗";
    if (lowerName.includes("meat") || lowerName.includes("beef")) return "🥩";
    if (lowerName.includes("tomato")) return "🍅";
    if (lowerName.includes("potato") || lowerName.includes("onion")) return "🥔";
    if (lowerName.includes("bread")) return "🍞";
    if (lowerName.includes("coffee") || lowerName.includes("tea")) return "☕";
    if (lowerName.includes("oil")) return "🫒";
    if (lowerName.includes("cheese")) return "🧀";

    return CATEGORY_EMOJIS[category] || "📦";
  }

  calculateStatus(expiryDate, quantity, minStock = 2, warningDays = null) {
    const qty = Number(quantity);
    const threshold = minStock !== undefined && minStock !== null && !isNaN(Number(minStock)) ? Number(minStock) : 2;
    const warnDays = warningDays !== null && warningDays !== undefined && !isNaN(Number(warningDays))
      ? Number(warningDays)
      : (this.fullSettings?.pantry_settings?.expiry_warning_days || 7);

    if (!expiryDate) {
      return qty <= threshold ? "Low Stock" : "Fresh";
    }

    const diffDays = getDaysDifference(expiryDate);
    if (diffDays === null) {
      return qty <= threshold ? "Low Stock" : "Fresh";
    }

    if (diffDays < 0) return "Expired";
    if (diffDays <= warnDays) return "Expiring Soon";
    if (qty <= threshold) return "Low Stock";
    return "Fresh";
  }

  // 5-Level Granular Expiry Classification from Universal Shelf-Life Engine
  getExpiryClassification(itemOrExpiryDate) {
    let expDate = itemOrExpiryDate;
    if (itemOrExpiryDate && typeof itemOrExpiryDate === 'object') {
      expDate = itemOrExpiryDate.effectiveExpiryDate || itemOrExpiryDate.expiryDate;
    }
    if (window.ShelfLife && typeof window.ShelfLife.getExpiryStatus === 'function') {
      return window.ShelfLife.getExpiryStatus(expDate);
    }
    const days = getDaysDifference(expDate);
    if (days === null) return { status: "Fresh", days: null, label: "Fresh", badgeClass: "badge-status status-fresh", dotColor: "#10b981", emoji: "🟢" };
    if (days < 0) return { status: "Expired", days, label: "Expired", badgeClass: "badge-status status-expired", dotColor: "#ef4444", emoji: "🔴", text: `Expired ${Math.abs(days)}d ago` };
    if (days === 0) return { status: "Expires Today", days: 0, label: "Expires Today", badgeClass: "badge-status status-today", dotColor: "#dc2626", emoji: "⚠️", text: "Expires today!" };
    if (days <= 7) return { status: "Very Soon", days, label: "Very Soon", badgeClass: "badge-status status-very-soon", dotColor: "#ea580c", emoji: "🟠", text: `${days}d left` };
    if (days <= 30) return { status: "Expiring Soon", days, label: "Expiring Soon", badgeClass: "badge-status status-expiring", dotColor: "#d97706", emoji: "🟡", text: `${days}d left` };
    return { status: "Fresh", days, label: "Fresh", badgeClass: "badge-status status-fresh", dotColor: "#10b981", emoji: "🟢", text: `${days}d left` };
  }

  getMetrics() {
    const items = this.getItems();
    const total = items.length;
    let lowStock = 0;
    let expiringSoon = 0;
    let expired = 0;
    let fresh = 0;
    let verySoon = 0;
    let expiresToday = 0;
    let estimatedItems = 0;
    let openedItems = 0;

    items.forEach(i => {
      const threshold = i.minStock !== undefined && i.minStock !== null && !isNaN(Number(i.minStock)) ? Number(i.minStock) : 2;
      const qty = Number(i.quantity) || 0;
      const expDate = i.effectiveExpiryDate || i.expiryDate;

      if (qty <= threshold) lowStock++;

      if (window.ShelfLife && typeof window.ShelfLife.getExpiryStatus === 'function') {
        const expStatus = window.ShelfLife.getExpiryStatus(expDate);
        if (expStatus.tier === "expired" || expStatus.status === "Expired") expired++;
        else if (expStatus.tier === "expires_today" || expStatus.status === "Expires Today") expiresToday++;
        else if (expStatus.tier === "very_soon" || expStatus.status === "Very Soon") verySoon++;
        else if (expStatus.tier === "expiring_soon" || expStatus.status === "Expiring Soon") expiringSoon++;
        else fresh++;
      } else {
        const diff = getDaysDifference(expDate);
        if (diff !== null) {
          if (diff < 0) expired++;
          else if (diff === 0) expiresToday++;
          else if (diff <= 7) verySoon++;
          else if (diff <= 30) expiringSoon++;
          else fresh++;
        } else {
          fresh++;
        }
      }

      if (i.isEstimate || i.expiryType === 'estimated' || (i.estimatedExpiryDate && !i.actualExpiryDate)) {
        estimatedItems++;
      }
      if (i.productStatus === 'Opened' || i.isOpened) {
        openedItems++;
      }
    });

    return {
      total: total,
      lowStock: lowStock,
      expiringSoon: expiringSoon,
      expired: expired,
      fresh: fresh,
      verySoon: verySoon,
      expiresToday: expiresToday,
      estimatedItems: estimatedItems,
      openedItems: openedItems,
      shoppingListCount: lowStock + expired
    };
  }

  // Deduplicated alert dispatcher
  async checkAndDispatchPantryAlerts(force = false) {
    try {
      // 1. If user is authenticated with Supabase, dispatch server-side automated check
      if (window.supabaseService && window.supabaseService.isReady()) {
        try {
          const { data: { session } } = await window.supabaseService.client.auth.getSession();
          if (session && session.access_token) {
            const resp = await fetch("/api/cron-check-alerts", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${session.access_token}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ force })
            });
            if (resp.ok) {
              const resData = await resp.json();
              if (resData && resData.summary && resData.summary.alertsRecorded > 0) {
                await this.fetchAlertsFromSupabase();
                this.updateAlertBadge();
              }
              return;
            }
          }
        } catch (serverErr) {
          console.warn("[Pantry Alert] Server automated check notice:", serverErr);
        }
      }

      // 2. Local fallback for guest users or offline sessions
      const settings = this.getSettings();
      if (!settings.email) return;

      const items = this.getItems();
      let alertHistory = {};
      try {
        alertHistory = JSON.parse(localStorage.getItem(this.alertHistoryKey) || "{}");
      } catch (e) {
        alertHistory = {};
      }

      const now = Date.now();
      const ONE_DAY_MS = 24 * 60 * 60 * 1000;
      const warnDays = this.fullSettings?.pantry_settings?.expiry_warning_days || 7;

      const expiringItems = [];
      const lowStockItems = [];

      items.forEach(item => {
        const threshold = item.minStock !== undefined && item.minStock !== null && !isNaN(Number(item.minStock)) ? Number(item.minStock) : 2;
        const status = this.calculateStatus(item.expiryDate, item.quantity, threshold, warnDays);
        const lastSent = alertHistory[item.id] || 0;
        const needsAlert = force || (now - lastSent > ONE_DAY_MS);

        if (needsAlert) {
          if ((status === "Expiring Soon" || status === "Expired") && settings.alertOnExpiry) {
            expiringItems.push(item);
          } else if ((status === "Low Stock" || Number(item.quantity) <= 1) && settings.alertOnStockOut) {
            lowStockItems.push(item);
          }
        }
      });

      // Dispatch expiry alerts if any
      if (expiringItems.length > 0) {
        fetch("/api/send-pantry-alert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: settings.email,
            type: "expiry",
            items: expiringItems.map(i => ({ name: i.name, quantity: i.quantity, unit: i.unit, status: i.status }))
          })
        }).then(() => {
          expiringItems.forEach(i => { alertHistory[i.id] = now; });
          localStorage.setItem(this.alertHistoryKey, JSON.stringify(alertHistory));
        }).catch(err => console.warn("[Pantry Alert] Expiry alert dispatch error:", err));
      }

      // Dispatch low stock alerts if any
      if (lowStockItems.length > 0) {
        fetch("/api/send-pantry-alert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: settings.email,
            type: "low_stock",
            items: lowStockItems.map(i => ({ name: i.name, quantity: i.quantity, unit: i.unit, status: i.status }))
          })
        }).then(() => {
          lowStockItems.forEach(i => { alertHistory[i.id] = now; });
          localStorage.setItem(this.alertHistoryKey, JSON.stringify(alertHistory));
        }).catch(err => console.warn("[Pantry Alert] Low stock dispatch error:", err));
      }

    } catch (e) {
      console.warn("[Pantry Alert Check Error]", e);
    }
  }
}

// Global helpers and store instance
window.getTodayISO = getTodayISO;
window.getRelativeDateISO = getRelativeDateISO;
window.parseLocalDate = parseLocalDate;
window.getDaysDifference = getDaysDifference;
window.formatRelativeExpiry = formatRelativeExpiry;
window.store = new PantryStore();

