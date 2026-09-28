/**
 * Vercel Serverless Function: api/config.js
 * Safely provides public, browser-safe environment variables to the frontend.
 * 
 * SECURITY NOTE:
 * NEVER expose RESEND_API_KEY, SUPABASE_SERVICE_ROLE_KEY, or database passwords here.
 */

module.exports = function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  // Never cache config so environment changes take effect immediately
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  if (req.method === "OPTIONS") {
    return res.status(200).json({ ok: true });
  }

  function cleanString(val) {
    if (!val || typeof val !== 'string') return '';
    let s = val.trim();
    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
      s = s.substring(1, s.length - 1).trim();
    }
    return s;
  }

  // 1. Resolve Supabase Project URL from all standard environment variable names
  const urlVarNames = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_PROJECT_URL",
    "SUPABASE_PROJECT_URL",
    "NEXT_PUBLIC_PROJECT_URL",
    "PROJECT_URL",
    "NEXT_PUBLIC_SUPABASE_HOST",
    "SUPABASE_HOST",
    "NEXT_PUBLIC_SUPABASE_PROJECT_ID",
    "SUPABASE_PROJECT_ID"
  ];

  let resolvedUrl = null;
  let urlSource = null;

  for (const name of urlVarNames) {
    const raw = cleanString(process.env[name]);
    if (!raw) continue;

    // Skip if this is an API key (publishable or secret) or JWT
    if (raw.startsWith("sb_publishable_") || raw.startsWith("sb_secret_") || raw.startsWith("eyJ")) {
      continue;
    }

    // Direct https URL
    if (raw.startsWith("https://") && !raw.includes("your-project") && !raw.includes("xyzcompany")) {
      resolvedUrl = raw.replace(/\/+$/, "");
      urlSource = name;
      break;
    }

    // http:// -> https://
    if (raw.startsWith("http://") && raw.includes(".supabase.co")) {
      resolvedUrl = raw.replace("http://", "https://").replace(/\/+$/, "");
      urlSource = name;
      break;
    }

    // Domain only e.g. "xxxx.supabase.co"
    if (/^[a-z0-9-]+\.supabase\.co/i.test(raw)) {
      resolvedUrl = `https://${raw.replace(/\/+$/, "")}`;
      urlSource = name;
      break;
    }

    // Project reference only (e.g. 20 alphanumeric characters)
    if (/^[a-z0-9]{20}$/i.test(raw)) {
      resolvedUrl = `https://${raw}.supabase.co`;
      urlSource = name;
      break;
    }
  }

  // Fallback scan: check all process.env values for any containing '.supabase.co'
  if (!resolvedUrl) {
    for (const [k, v] of Object.entries(process.env)) {
      if (typeof v !== 'string' || !v.includes('.supabase.co')) continue;
      const raw = cleanString(v);
      if (raw.startsWith('https://') && !raw.includes('your-project')) {
        resolvedUrl = raw.replace(/\/+$/, '');
        urlSource = k;
        break;
      }
      if (/^[a-z0-9-]+\.supabase\.co/i.test(raw)) {
        resolvedUrl = `https://${raw.replace(/\/+$/, '')}`;
        urlSource = k;
        break;
      }
    }
  }

  // 2. Resolve Supabase Anon / Public Key from all standard variable names
  const keyVarNames = [
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_SUPABASE_KEY",
    "SUPABASE_KEY",
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    "SUPABASE_PUBLISHABLE_KEY"
  ];

  let resolvedKey = null;
  let keySource = null;

  for (const name of keyVarNames) {
    const raw = cleanString(process.env[name]);
    if (!raw) continue;
    // Security: NEVER expose secret role key
    if (raw.startsWith("sb_secret_")) continue;
    if ((raw.startsWith("sb_publishable_") || raw.startsWith("eyJ")) && raw.length > 20) {
      resolvedKey = raw;
      keySource = name;
      break;
    }
    if (raw.length > 20 && !raw.includes("your-anon-key")) {
      resolvedKey = raw;
      keySource = name;
      break;
    }
  }

  // If NEXT_PUBLIC_SUPABASE_URL was set to the publishable key and no key was found elsewhere
  if (!resolvedKey) {
    const fallbackKey = cleanString(process.env.NEXT_PUBLIC_SUPABASE_URL);
    if (fallbackKey && fallbackKey.startsWith("sb_publishable_") && fallbackKey.length > 20) {
      resolvedKey = fallbackKey;
      keySource = "NEXT_PUBLIC_SUPABASE_URL (inferred key)";
    }
  }

  const siteUrl = (process.env.SITE_URL || "https://www.intellipantry.in").trim();

  // Diagnostics metadata (safe, zero secrets leaked)
  const envStatus = {
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
    SUPABASE_ANON_KEY: Boolean(process.env.SUPABASE_ANON_KEY),
    urlSource,
    keySource
  };

  let urlWarning = null;
  if (!resolvedUrl) {
    const rawProvidedUrl = cleanString(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL);
    if (rawProvidedUrl && rawProvidedUrl.startsWith("sb_publishable_")) {
      urlWarning = "NEXT_PUBLIC_SUPABASE_URL currently contains a Publishable API Key instead of a web URL. It must be set to your Supabase Project URL (e.g. https://[project-ref].supabase.co).";
    } else {
      urlWarning = "NEXT_PUBLIC_SUPABASE_URL is missing or invalid. Set it to https://[project-ref].supabase.co in Vercel.";
    }
  }

  return res.status(200).json({
    supabaseUrl: resolvedUrl,
    supabaseAnonKey: resolvedKey,
    siteUrl,
    configured: Boolean(resolvedUrl && resolvedKey),
    envStatus,
    urlWarning
  });
};
