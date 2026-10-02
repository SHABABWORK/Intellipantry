/**
 * IntelliPantry - Production Supabase Configuration & Auto-Discovery
 * 
 * Sources:
 * 1. Dynamic Vercel Serverless Endpoint (/api/config)
 * 2. Window ENV (if injected)
 * 3. Local Storage Override (via Database Settings modal)
 */

(function(window) {
  let cachedConfig = {
    url: "",
    key: "",
    isConfigured: false
  };

  function readLocalConfig() {
    let url = "";
    let key = "";
    try {
      url = localStorage.getItem("smartpantry_supabase_url") || "";
      key = localStorage.getItem("smartpantry_supabase_key") || "";
    } catch (e) {}

    // Automatically purge old placeholders, dead projects, or mistaken API keys saved as URLs
    const isDeadUrl = url.includes("xyzcompany") || 
      url.includes("your-project") || 
      url.includes("placeholder") || 
      url.includes("oubfjolxhvkujjjnzvol") || 
      url.includes("ivskkcmzzrhzhofwjtrt") || 
      url.includes("wzszikfgxquqezsmlvcr") || 
      url.startsWith("sb_publishable_") || 
      (url && !url.startsWith("https://"));

    if (isDeadUrl) {
      try {
        localStorage.removeItem("smartpantry_supabase_url");
        localStorage.removeItem("smartpantry_supabase_key");
      } catch (e) {}
      url = "";
      key = "";
    }

    if (!url || isDeadUrl) {
      url = (typeof window.ENV !== "undefined" && (window.ENV.NEXT_PUBLIC_SUPABASE_URL || window.ENV.SUPABASE_URL)) 
        ? (window.ENV.NEXT_PUBLIC_SUPABASE_URL || window.ENV.SUPABASE_URL) 
        : "https://sqcreimqdrlaxbykrnzy.supabase.co";
    }

    if (!key || key.includes("your-anon-key") || key.includes("placeholder") || key.length < 20 || key.includes("v637P_FSQIKQq4PrfujlXGa2ciGR9UD68UY9vH_cqN4") || key.includes("Vywsz4cOEWnrOMOIseXckuvLT80K0_rjxSNxOfkad1w")) {
      key = (typeof window.ENV !== "undefined" && (window.ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY || window.ENV.SUPABASE_ANON_KEY)) 
        ? (window.ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY || window.ENV.SUPABASE_ANON_KEY) 
        : "sb_publishable_uXIdmQNVJhuwVW0W2-BQxQ_Ko-r34jW";
    }

    const isValid = Boolean(
      url && 
      key && 
      !url.includes("your-project") && 
      !url.includes("xyzcompany") &&
      !key.includes("your-anon-key") &&
      url.startsWith("https://") &&
      !url.startsWith("sb_publishable_")
    );

    cachedConfig = { url: url.trim(), key: key.trim(), isConfigured: isValid };
    return cachedConfig;
  }

  // Initial synchronous read
  readLocalConfig();

  // Asynchronous auto-discovery from Vercel environment variables via /api/config
  const readyPromise = (async function autoDiscover() {
    try {
      const res = await fetch("/api/config", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.urlWarning) {
          console.warn("[Supabase Config Warning]:", data.urlWarning);
        }
        if (data && data.supabaseUrl && data.supabaseUrl.startsWith("https://") && data.supabaseAnonKey) {
          const currentUrl = localStorage.getItem("smartpantry_supabase_url") || "";
          if (!currentUrl || currentUrl.includes("xyzcompany") || currentUrl.includes("your-project") || !currentUrl.startsWith("https://")) {
            cachedConfig = {
              url: data.supabaseUrl.trim(),
              key: data.supabaseAnonKey.trim(),
              isConfigured: true
            };
            if (window.supabaseService && !window.supabaseService.isReady()) {
              window.supabaseService.init();
            }
          }
        } else if (data && (!data.supabaseUrl || !data.supabaseUrl.startsWith("https://"))) {
          // If serverless reports invalid or missing URL, reflect unconfigured state
          cachedConfig.isConfigured = false;
        }
      }
    } catch (e) {
      // In offline or local preview mode, fallback to cachedConfig
    }
    return cachedConfig;
  })();

  function getSupabaseConfig() {
    if (!cachedConfig.isConfigured) {
      readLocalConfig();
    }
    return cachedConfig;
  }

  function saveSupabaseConfig(url, key) {
    try {
      if (url) localStorage.setItem("smartpantry_supabase_url", url.trim());
      if (key) localStorage.setItem("smartpantry_supabase_key", key.trim());
      readLocalConfig();
      return true;
    } catch (e) {
      console.error("[Supabase Config] Save error:", e);
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
    isConfigured: () => getSupabaseConfig().isConfigured,
    readyPromise
  };
})(window);
