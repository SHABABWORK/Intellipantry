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
  res.setHeader("Cache-Control", "public, max-age=60, s-maxage=300");

  if (req.method === "OPTIONS") {
    return res.status(200).json({ ok: true });
  }

  const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "").trim();
  const rawKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "").trim();
  const siteUrl = (process.env.SITE_URL || "https://www.intellipantry.in").trim();

  const isUrlValid = Boolean(
    rawUrl && 
    rawUrl.startsWith("https://") && 
    !rawUrl.startsWith("sb_publishable_") && 
    !rawUrl.includes("your-project") &&
    !rawUrl.includes("xyzcompany")
  );

  const isKeyValid = Boolean(
    rawKey && 
    rawKey.length > 20 && 
    !rawKey.includes("your-anon-key")
  );

  let urlWarning = null;
  if (rawUrl && !rawUrl.startsWith("https://")) {
    urlWarning = "NEXT_PUBLIC_SUPABASE_URL must be a valid HTTPS URL (e.g., https://your-id.supabase.co). It appears an API key was entered instead.";
  }

  return res.status(200).json({
    supabaseUrl: isUrlValid ? rawUrl : null,
    supabaseAnonKey: isKeyValid ? rawKey : null,
    siteUrl,
    configured: isUrlValid && isKeyValid,
    urlWarning
  });
};
