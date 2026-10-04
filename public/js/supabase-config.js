/**
 * IntelliPantry - Production Supabase Configuration & Auto-Discovery
 * 
 * Production Priority:
 * 1. /api/config (Vercel Serverless Function — Source of Truth)
 * 2. Window ENV (build-time environment injection if provided)
 * 3. Local Development Override (localhost only)
 * 
 * SECURITY: Zero hardcoded API keys in source code.
 */

(function(window) {
  // Automatically clear stale localStorage overrides or references to deprecated project
  try {
    const storedUrl = localStorage.getItem("smartpantry_supabase_url") || "";
    if (storedUrl.includes("sqcreimqdrlaxbykrnzy")) {
      localStorage.removeItem("smartpantry_supabase_url");
      localStorage.removeItem("smartpantry_supabase_key");
    }
    const isLocal = typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.protocol === 'file:'
    );
    if (!isLocal) {
      localStorage.removeItem("smartpantry_supabase_url");
      localStorage.removeItem("smartpantry_supabase_key");
    }
  } catch (e) {}

  let cachedConfig = {
    url: "",
    key: "",
    isConfigured: false
  };

  // 1. Initial check: window.ENV if injected during build
  if (typeof window.ENV !== "undefined" && window.ENV) {
    const envUrl = (window.ENV.NEXT_PUBLIC_SUPABASE_URL || window.ENV.SUPABASE_URL || "").trim();
    const envKey = (window.ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY || window.ENV.SUPABASE_ANON_KEY || "").trim();
    if (envUrl.startsWith("https://") && !envUrl.includes("sqcreimqdrlaxbykrnzy") && envKey.length > 20) {
      cachedConfig = {
        url: envUrl,
        key: envKey,
        isConfigured: true
      };
    }
  }

  // 2. Asynchronous auto-discovery from Vercel environment variables via /api/config
  const readyPromise = (async function autoDiscover() {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch("/api/config", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const sUrl = (data?.supabaseUrl || "").trim();
          const sKey = (data?.supabaseAnonKey || "").trim();

          if (sUrl.startsWith("https://") && !sUrl.includes("sqcreimqdrlaxbykrnzy") && sKey.length > 20) {
            cachedConfig = {
              url: sUrl,
              key: sKey,
              isConfigured: true
            };
            // Immediately notify Supabase service to initialize with verified credentials
            if (window.supabaseService && typeof window.supabaseService.initClient === 'function') {
              window.supabaseService.initClient(sUrl, sKey);
            }
            return cachedConfig;
          }
        }
      } catch (e) {
        if (attempt < 2) {
          await new Promise(r => setTimeout(r, 200 * (attempt + 1)));
        }
      }
    }

    // Local development fallback only
    try {
      const isLocal = typeof window !== 'undefined' && (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
      );
      if (isLocal) {
        const localUrl = (localStorage.getItem("smartpantry_supabase_url") || "").trim();
        const localKey = (localStorage.getItem("smartpantry_supabase_key") || "").trim();
        if (localUrl.startsWith("https://") && localKey.length > 20) {
          cachedConfig = { url: localUrl, key: localKey, isConfigured: true };
          if (window.supabaseService && typeof window.supabaseService.initClient === 'function') {
            window.supabaseService.initClient(localUrl, localKey);
          }
          return cachedConfig;
        }
      }
    } catch (e) {}

    return cachedConfig;
  })();

  function getSupabaseConfig() {
    return cachedConfig;
  }

  function saveSupabaseConfig(url, key) {
    try {
      if (url) localStorage.setItem("smartpantry_supabase_url", url.trim());
      if (key) localStorage.setItem("smartpantry_supabase_key", key.trim());
      cachedConfig = {
        url: (url || "").trim(),
        key: (key || "").trim(),
        isConfigured: Boolean(url && key && key.length > 20)
      };
      if (window.supabaseService && typeof window.supabaseService.initClient === 'function') {
        window.supabaseService.initClient(cachedConfig.url, cachedConfig.key);
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  function clearSupabaseConfig() {
    try {
      localStorage.removeItem("smartpantry_supabase_url");
      localStorage.removeItem("smartpantry_supabase_key");
      cachedConfig = { url: "", key: "", isConfigured: false };
    } catch (e) {}
  }

  window.SupabaseConfig = {
    get: getSupabaseConfig,
    save: saveSupabaseConfig,
    clear: clearSupabaseConfig,
    isConfigured: () => Boolean(cachedConfig.isConfigured && cachedConfig.url && cachedConfig.key),
    readyPromise
  };
})(window);
