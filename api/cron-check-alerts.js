/**
 * Vercel Serverless Function: api/cron-check-alerts.js
 * Automated Pantry Email Alert & Deduplication System
 * 
 * Capabilities:
 * 1. Automatic Vercel Cron scheduled checks (e.g. daily at 08:00 UTC) via GET /api/cron-check-alerts
 * 2. Authenticated user-triggered checks via POST /api/cron-check-alerts with user JWT
 * 3. Detects expired products, products approaching expiry, and low-stock products
 * 4. Strictly respects user email notification preferences (alert_expiry, alert_expired, alert_low_stock)
 * 5. Robust 24-hour deduplication window per (user_id, product_id, alert_type) stored in Supabase
 * 6. Records all triggered alerts into public.alerts linked to the user's ID
 * 7. Records email deliveries into public.email_notifications audit log
 * 8. Zero frontend secrets: all Resend and Supabase keys read strictly server-side
 */

function cleanString(val) {
  if (!val || typeof val !== "string") return "";
  let s = val.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.substring(1, s.length - 1).trim();
  }
  return s;
}

  const DEPRECATED_PROJECT_IDS = ["sqcreimqdrlaxbykrnzy"];
  function isDeprecatedProject(str) {
    if (!str || typeof str !== 'string') return false;
    return DEPRECATED_PROJECT_IDS.some(id => str.includes(id));
  }

  const candidates = [
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_URL,
    process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL,
    process.env.STORAGE_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
    process.env.SUPABASE_PROJECT_URL,
    process.env.NEXT_PUBLIC_PROJECT_URL,
    process.env.PROJECT_URL
  ];

  for (const c of candidates) {
    const raw = cleanString(c);
    if (!raw || isDeprecatedProject(raw)) continue;
    if (raw.startsWith("sb_publishable_") || raw.startsWith("sb_secret_") || raw.startsWith("eyJ")) continue;
    if (raw.startsWith("https://") && !raw.includes("your-project")) {
      return raw.replace(/\/+$/, "");
    }
    if (/^[a-z0-9-]+\.supabase\.co/i.test(raw)) {
      return `https://${raw.replace(/\/+$/, "")}`;
    }
  }

  // Fallback scan
  for (const [k, v] of Object.entries(process.env)) {
    if (typeof v !== "string" || !v.includes(".supabase.co") || isDeprecatedProject(v)) continue;
    const raw = cleanString(v);
    if (isDeprecatedProject(raw)) continue;
    if (raw.startsWith("https://") && !raw.includes("your-project") && !raw.includes("xyzcompany")) {
      return raw.replace(/\/+$/, "");
    }
  }

  return null;
}

// Resolve Supabase Keys (Public Anon & Service Role)
function getSupabaseKeys() {
  const serviceCandidates = [
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    process.env.SUPABASE_SERVICE_KEY,
    process.env.SERVICE_ROLE_KEY
  ];
  let serviceRoleKey = null;
  for (const k of serviceCandidates) {
    const raw = cleanString(k);
    if (raw && (raw.startsWith("sb_secret_") || raw.startsWith("eyJ")) && raw.length > 20) {
      serviceRoleKey = raw;
      break;
    }
  }

  const anonCandidates = [
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    process.env.SUPABASE_ANON_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    process.env.SUPABASE_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  ];
  let anonKey = null;
  for (const k of anonCandidates) {
    const raw = cleanString(k);
    if (!raw) continue;
    if (raw.startsWith("sb_secret_")) continue;
    if ((raw.startsWith("sb_publishable_") || raw.startsWith("eyJ")) && raw.length > 20) {
      anonKey = raw;
      break;
    }
    if (raw.length > 20 && !raw.includes("your-anon-key")) {
      anonKey = raw;
      break;
    }
  }

  return { serviceRoleKey, anonKey };
}

// Format Date YYYY-MM-DD
function parseDateString(dateVal) {
  if (!dateVal) return null;
  if (typeof dateVal === "string") {
    // If YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateVal.trim())) {
      return dateVal.trim();
    }
    // If DD/MM/YYYY
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateVal.trim())) {
      const parts = dateVal.trim().split("/");
      return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
    }
  }
  try {
    const d = new Date(dateVal);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split("T")[0];
    }
  } catch (e) {}
  return null;
}

// Helper to make authenticated Supabase REST calls
async function supabaseFetch(url, authHeaderKey, token = null, method = "GET", body = null) {
  const headers = {
    "apikey": authHeaderKey,
    "Authorization": `Bearer ${token || authHeaderKey}`,
    "Content-Type": "application/json"
  };

  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const resp = await fetch(url, options);
  let json = null;
  try {
    json = await resp.json();
  } catch (e) {
    json = null;
  }
  return { ok: resp.ok, status: resp.status, data: json };
}

// HTML Email Generator
function buildAlertEmailHtml(userName, alertsData) {
  const { expired = [], expiresToday = [], verySoon = [], expiring = [], openedUseBy = [], lowStock = [] } = alertsData;

  const appBaseUrl = (process.env.SITE_URL || "https://www.intellipantry.in").replace(/\/+$/, "");

  let sectionsHtml = "";

  // 1. Expired Items Section (🔴)
  if (expired.length > 0) {
    sectionsHtml += `
      <div style="background:#fff5f5; border:1px solid #fed7d7; border-radius:14px; padding:18px 20px; margin-bottom:20px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <span style="font-size:18px;">🔴</span>
          <h3 style="margin:0; font-size:15px; font-weight:700; color:#c53030;">Expired Products (${expired.length})</h3>
        </div>
        <p style="margin:0 0 12px; font-size:13px; color:#742a2a; line-height:1.5;">
          These items have passed their expiration date and should be inspected or safely discarded:
        </p>
        <ul style="margin:0; padding-left:20px; font-size:13.5px; color:#4a1515;">
          ${expired.map(i => `
            <li style="padding:4px 0;">
              <strong>${i.name}</strong> — ${i.quantity} ${i.unit}
              <span style="color:#e53e3e; font-weight:600; font-size:12px; background:#fff; padding:2px 6px; border-radius:6px; border:1px solid #feb2b2; margin-left:6px;">
                Expired: ${i.expiryDate || "Past date"}
              </span>
              ${i.isEstimate ? `<span style="color:#b45309; font-size:11px; background:#fef3c7; padding:2px 6px; border-radius:4px;">✨ Estimated</span>` : ''}
              ${i.location ? `<span style="color:#718096; font-size:12px;"> • ${i.location}</span>` : ""}
            </li>
          `).join("")}
        </ul>
      </div>
    `;
  }

  // 2. Expires Today Section (⚠️)
  if (expiresToday.length > 0) {
    sectionsHtml += `
      <div style="background:#fef2f2; border:1.5px solid #f87171; border-radius:14px; padding:18px 20px; margin-bottom:20px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <span style="font-size:18px;">⚠️</span>
          <h3 style="margin:0; font-size:15px; font-weight:700; color:#b91c1c;">Expires Today! (${expiresToday.length})</h3>
        </div>
        <p style="margin:0 0 12px; font-size:13px; color:#7f1d1d; line-height:1.5;">
          These items reach their expiration date today. Cook or consume them today to avoid food waste:
        </p>
        <ul style="margin:0; padding-left:20px; font-size:13.5px; color:#450a0a;">
          ${expiresToday.map(i => `
            <li style="padding:4px 0;">
              <strong>${i.name}</strong> — ${i.quantity} ${i.unit}
              <span style="color:#b91c1c; font-weight:700; font-size:12px; background:#fee2e2; padding:2px 6px; border-radius:6px; border:1px solid #fca5a5; margin-left:6px;">
                Expires Today
              </span>
              ${i.isEstimate ? `<span style="color:#b45309; font-size:11px; background:#fef3c7; padding:2px 6px; border-radius:4px;">✨ Estimated</span>` : ''}
              ${i.location ? `<span style="color:#718096; font-size:12px;"> • ${i.location}</span>` : ""}
            </li>
          `).join("")}
        </ul>
      </div>
    `;
  }

  // 3. Very Soon Section (🟠 1–7 days)
  if (verySoon.length > 0) {
    sectionsHtml += `
      <div style="background:#fff7ed; border:1px solid #fed7aa; border-radius:14px; padding:18px 20px; margin-bottom:20px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <span style="font-size:18px;">🟠</span>
          <h3 style="margin:0; font-size:15px; font-weight:700; color:#c2410c;">Urgent: Expiring Very Soon (${verySoon.length})</h3>
        </div>
        <p style="margin:0 0 12px; font-size:13px; color:#7c2d12; line-height:1.5;">
          These products have only 1 to 7 days remaining. Prioritize them in your meal planning this week:
        </p>
        <ul style="margin:0; padding-left:20px; font-size:13.5px; color:#7c2d12;">
          ${verySoon.map(i => `
            <li style="padding:4px 0;">
              <strong>${i.name}</strong> — ${i.quantity} ${i.unit}
              <span style="color:#ea580c; font-weight:600; font-size:12px; background:#fff; padding:2px 6px; border-radius:6px; border:1px solid #fdba74; margin-left:6px;">
                ${i.daysLeft === 1 ? "1 day left (Tomorrow)" : `${i.daysLeft} days left`} (${i.expiryDate})
              </span>
              ${i.isEstimate ? `<span style="color:#b45309; font-size:11px; background:#fef3c7; padding:2px 6px; border-radius:4px;">✨ Estimated</span>` : ''}
              ${i.location ? `<span style="color:#718096; font-size:12px;"> • ${i.location}</span>` : ""}
            </li>
          `).join("")}
        </ul>
      </div>
    `;
  }

  // 4. Expiring Soon Section (🟡 8–30 days)
  if (expiring.length > 0) {
    sectionsHtml += `
      <div style="background:#fffaf0; border:1px solid #feebc8; border-radius:14px; padding:18px 20px; margin-bottom:20px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <span style="font-size:18px;">🟡</span>
          <h3 style="margin:0; font-size:15px; font-weight:700; color:#b45309;">Approaching Expiry (${expiring.length})</h3>
        </div>
        <p style="margin:0 0 12px; font-size:13px; color:#78350f; line-height:1.5;">
          These products will expire in the next 8 to 30 days:
        </p>
        <ul style="margin:0; padding-left:20px; font-size:13.5px; color:#78350f;">
          ${expiring.map(i => `
            <li style="padding:4px 0;">
              <strong>${i.name}</strong> — ${i.quantity} ${i.unit}
              <span style="color:#d97706; font-weight:600; font-size:12px; background:#fff; padding:2px 6px; border-radius:6px; border:1px solid #fde68a; margin-left:6px;">
                ${i.daysLeft} days left (${i.expiryDate})
              </span>
              ${i.isEstimate ? `<span style="color:#b45309; font-size:11px; background:#fef3c7; padding:2px 6px; border-radius:4px;">✨ Estimated</span>` : ''}
              ${i.location ? `<span style="color:#718096; font-size:12px;"> • ${i.location}</span>` : ""}
            </li>
          `).join("")}
        </ul>
      </div>
    `;
  }

  // 5. Opened Products Section (🔓)
  if (openedUseBy.length > 0) {
    sectionsHtml += `
      <div style="background:#faf5ff; border:1px solid #e9d5ff; border-radius:14px; padding:18px 20px; margin-bottom:20px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <span style="font-size:18px;">🔓</span>
          <h3 style="margin:0; font-size:15px; font-weight:700; color:#7e22ce;">Opened Products to Consume (${openedUseBy.length})</h3>
        </div>
        <p style="margin:0 0 12px; font-size:13px; color:#581c87; line-height:1.5;">
          These items were opened and have reached or are nearing their recommended opened shelf life:
        </p>
        <ul style="margin:0; padding-left:20px; font-size:13.5px; color:#581c87;">
          ${openedUseBy.map(i => `
            <li style="padding:4px 0;">
              <strong>${i.name}</strong> — ${i.quantity} ${i.unit}
              <span style="color:#9333ea; font-weight:600; font-size:12px; background:#fff; padding:2px 6px; border-radius:6px; border:1px solid #d8b4fe; margin-left:6px;">
                Use by: ${i.useByDate || "Soon"}
              </span>
              ${i.storageTip ? `<span style="color:#7e22ce; font-size:11.5px; font-style:italic;"> • ${i.storageTip}</span>` : ""}
            </li>
          `).join("")}
        </ul>
      </div>
    `;
  }

  // 6. Low Stock Section (🛒)
  if (lowStock.length > 0) {
    sectionsHtml += `
      <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:14px; padding:18px 20px; margin-bottom:20px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <span style="font-size:18px;">🛒</span>
          <h3 style="margin:0; font-size:15px; font-weight:700; color:#166534;">Low-Stock Products (${lowStock.length})</h3>
        </div>
        <p style="margin:0 0 12px; font-size:13px; color:#14532d; line-height:1.5;">
          These pantry staples are running low and should be restocked:
        </p>
        <ul style="margin:0; padding-left:20px; font-size:13.5px; color:#14532d;">
          ${lowStock.map(i => `
            <li style="padding:4px 0;">
              <strong>${i.name}</strong> — Remaining: <strong>${i.quantity} ${i.unit}</strong>
              <span style="color:#2f855a; font-weight:600; font-size:12px; background:#fff; padding:2px 6px; border-radius:6px; border:1px solid #86efac; margin-left:6px;">
                Threshold: ${i.threshold} ${i.unit}
              </span>
              ${i.location ? `<span style="color:#718096; font-size:12px;"> • Location: ${i.location}</span>` : ""}
            </li>
          `).join("")}
        </ul>
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IntelliPantry Daily Inventory Alert</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fbfaf5; margin: 0; padding: 24px 12px; color: #1f2823; -webkit-font-smoothing: antialiased; }
    .wrapper { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 20px; border: 1px solid #e6e3da; overflow: hidden; box-shadow: 0 4px 24px rgba(30, 57, 42, 0.05); }
    .header { background: #1e392a; padding: 26px 32px; color: #ffffff; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #bbf7d0; }
    .content { padding: 30px; }
    .greeting { font-size: 16px; font-weight: 700; color: #1e392a; margin-bottom: 12px; }
    .cta-btn { display: inline-block; background: #1e392a; color: #ffffff !important; text-decoration: none; padding: 13px 28px; border-radius: 12px; font-size: 14px; font-weight: 700; margin: 10px 0 20px; text-align: center; }
    .footer { text-align: center; padding: 22px 24px; background: #faf9f5; border-top: 1px solid #e6e3da; font-size: 12px; color: #8c968f; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>🍃 IntelliPantry</h1>
      <p>Automated Pantry & Inventory Alert</p>
    </div>
    <div class="content">
      <div class="greeting">Hello ${userName || "Pantry Chef"},</div>
      <p style="font-size:14px; color:#4a5568; line-height:1.6; margin-top:0; margin-bottom:20px;">
        Here is your automated inventory update. We detected items in your pantry that need attention to keep your food fresh and prevent waste:
      </p>

      ${sectionsHtml}

      <div style="text-align:center; margin-top:24px;">
        <a href="${appBaseUrl}/" class="cta-btn" target="_blank">
          Open IntelliPantry Dashboard →
        </a>
      </div>

      <p style="font-size:12px; color:#718096; line-height:1.5; margin-top:20px; border-top:1px dashed #e2e8f0; padding-top:14px;">
        ℹ️ <em>Estimated shelf life is a general reference only. The actual manufacturer expiry date must always take priority.</em>
      </p>
    </div>
    <div class="footer">
      © 2026 IntelliPantry • Fresh Food, Zero Waste.<br>
      You are receiving this automated alert based on your notification settings.<br>
      Need help? Reach out to support at <a href="mailto:intellipantrynotify@gmail.com" style="color:#2e9e5b; text-decoration:none; font-weight:600;">intellipantrynotify@gmail.com</a>
    </div>
  </div>
</body>
</html>`;
}

// Plain Text Email Generator
function buildAlertEmailText(userName, alertsData) {
  const { expired = [], expiresToday = [], verySoon = [], expiring = [], openedUseBy = [], lowStock = [] } = alertsData;
  const appBaseUrl = (process.env.SITE_URL || "https://www.intellipantry.in").replace(/\/+$/, "");

  let text = `Hello ${userName || "Pantry Chef"},\n\nHere is your automated IntelliPantry inventory update:\n\n`;

  if (expired.length > 0) {
    text += `🔴 EXPIRED PRODUCTS (${expired.length}):\n`;
    expired.forEach(i => {
      text += `- ${i.name}: ${i.quantity} ${i.unit} (Expired: ${i.expiryDate || "Past date"})\n`;
    });
    text += "\n";
  }

  if (expiresToday.length > 0) {
    text += `⚠️ EXPIRES TODAY (${expiresToday.length}):\n`;
    expiresToday.forEach(i => {
      text += `- ${i.name}: ${i.quantity} ${i.unit} (Expires today!)\n`;
    });
    text += "\n";
  }

  if (verySoon.length > 0) {
    text += `🟠 URGENT: EXPIRING IN 1-7 DAYS (${verySoon.length}):\n`;
    verySoon.forEach(i => {
      text += `- ${i.name}: ${i.quantity} ${i.unit} (${i.daysLeft} days left - ${i.expiryDate})\n`;
    });
    text += "\n";
  }

  if (expiring.length > 0) {
    text += `🟡 EXPIRING SOON in 8-30 DAYS (${expiring.length}):\n`;
    expiring.forEach(i => {
      text += `- ${i.name}: ${i.quantity} ${i.unit} (${i.daysLeft} days left - ${i.expiryDate})\n`;
    });
    text += "\n";
  }

  if (openedUseBy.length > 0) {
    text += `🔓 OPENED PRODUCTS TO CONSUME (${openedUseBy.length}):\n`;
    openedUseBy.forEach(i => {
      text += `- ${i.name}: ${i.quantity} ${i.unit} (Use by: ${i.useByDate || "Soon"})\n`;
    });
    text += "\n";
  }

  if (lowStock.length > 0) {
    text += `🛒 LOW STOCK PRODUCTS (${lowStock.length}):\n`;
    lowStock.forEach(i => {
      text += `- ${i.name}: ${i.quantity} ${i.unit} remaining (Threshold: ${i.threshold} ${i.unit})\n`;
    });
    text += "\n";
  }

  text += `Manage your pantry online anytime at: ${appBaseUrl}/\n\n`;
  text += `Estimated shelf life is a general reference only. Manufacturer printed dates always take priority.\n\n`;
  text += `IntelliPantry — Fresh Food, Zero Waste.\n`;

  return text;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, x-vercel-cron");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).json({ ok: true });
  }

  const supabaseUrl = getSupabaseUrl();
  const { serviceRoleKey, anonKey } = getSupabaseKeys();
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "IntelliPantry <onboarding@resend.dev>";
  const replyTo = process.env.RESEND_REPLY_TO || "intellipantrynotify@gmail.com";

  // Authorization resolution:
  // 1. Vercel Cron header 'x-vercel-cron: 1'
  // 2. Bearer CRON_SECRET or query ?secret=CRON_SECRET
  // 3. User JWT in 'Authorization: Bearer <user_token>'
  const isVercelCron = Boolean(req.headers["x-vercel-cron"]);
  const authHeader = req.headers["authorization"] || "";
  let userToken = null;

  if (authHeader.startsWith("Bearer ")) {
    const candidate = authHeader.substring(7).trim();
    if (process.env.CRON_SECRET && candidate === process.env.CRON_SECRET) {
      // Authorized via CRON_SECRET
    } else {
      userToken = candidate;
    }
  }

  const querySecret = req.query && req.query.secret ? cleanString(req.query.secret) : null;
  const isSecretAuthorized = process.env.CRON_SECRET && querySecret === process.env.CRON_SECRET;

  try {
    const todayStr = new Date().toISOString().split("T")[0];
    const todayDate = new Date(todayStr);
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    let targetUsers = [];

    // Mode A: Individual Authenticated User (called from browser session)
    if (userToken && userToken !== serviceRoleKey && userToken !== anonKey) {
      const userResp = await supabaseFetch(`${supabaseUrl}/auth/v1/user`, anonKey || serviceRoleKey, userToken);
      if (userResp.ok && userResp.data && userResp.data.id) {
        const u = userResp.data;
        targetUsers.push({
          id: u.id,
          email: u.email,
          fullName: u.user_metadata?.full_name || u.email?.split("@")[0] || "Pantry Chef",
          isEmailVerified: Boolean(u.email_confirmed_at || u.confirmed_at),
          userToken: userToken
        });
      }
    }

    // Mode B: Scheduled Cron or Service Scan (All Users)
    if (targetUsers.length === 0 && (isVercelCron || isSecretAuthorized || !userToken)) {
      if (serviceRoleKey) {
        // Query all profiles with service role key
        const profilesResp = await supabaseFetch(
          `${supabaseUrl}/rest/v1/profiles?select=id,email,full_name`,
          serviceRoleKey
        );

        if (profilesResp.ok && Array.isArray(profilesResp.data) && profilesResp.data.length > 0) {
          targetUsers = profilesResp.data.map(p => ({
            id: p.id,
            email: p.email,
            fullName: p.full_name || p.email?.split("@")[0] || "Pantry Chef",
            isEmailVerified: true,
            userToken: null
          }));
        } else {
          // Fallback to auth admin users endpoint
          const adminResp = await supabaseFetch(
            `${supabaseUrl}/auth/v1/admin/users?per_page=500`,
            serviceRoleKey
          );
          if (adminResp.ok && adminResp.data && Array.isArray(adminResp.data.users)) {
            targetUsers = adminResp.data.users.map(u => ({
              id: u.id,
              email: u.email,
              fullName: u.user_metadata?.full_name || u.email?.split("@")[0] || "Pantry Chef",
              isEmailVerified: Boolean(u.email_confirmed_at || u.confirmed_at),
              userToken: null
            }));
          }
        }
      }
    }

    // If still no users detected and no service key
    if (targetUsers.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No active users found for scheduled alert check. Set SUPABASE_SERVICE_ROLE_KEY in Vercel to enable automated multi-tenant background scanning, or pass user Bearer token to inspect individual session.",
        timestamp: new Date().toISOString()
      });
    }

    const results = {
      usersScanned: targetUsers.length,
      emailsSent: 0,
      alertsRecorded: 0,
      userSummaries: []
    };

    // Process each target user
    for (const user of targetUsers) {
      if (!user.email || !user.email.includes("@")) continue;

      const activeKey = user.userToken ? (anonKey || serviceRoleKey) : serviceRoleKey;
      const activeToken = user.userToken || serviceRoleKey;

      if (!activeKey || !activeToken) continue;

      // 1. Fetch User Notification Preferences
      let prefs = {
        alert_expiry: true,
        alert_expired: true,
        alert_low_stock: true,
        expiry_warning_days: 7,
        low_stock_threshold: 2
      };

      const prefResp = await supabaseFetch(
        `${supabaseUrl}/rest/v1/notification_preferences?user_id=eq.${user.id}&select=*`,
        activeKey,
        activeToken
      );

      if (prefResp.ok && Array.isArray(prefResp.data) && prefResp.data.length > 0) {
        const row = prefResp.data[0];
        const p = row.preferences || {};
        const ps = row.pantry_settings || {};
        prefs.alert_expiry = p.alert_expiry !== false;
        prefs.alert_expired = p.alert_expired !== false;
        prefs.alert_low_stock = p.alert_low_stock !== false;
        prefs.expiry_warning_days = Number(ps.expiry_warning_days) || 7;
        prefs.low_stock_threshold = Number(ps.low_stock_threshold) || 2;
      }

      // If user disabled all 3 pantry alert types, skip completely
      if (!prefs.alert_expiry && !prefs.alert_expired && !prefs.alert_low_stock) {
        results.userSummaries.push({ userId: user.id, email: user.email, status: "alerts_disabled_by_user" });
        continue;
      }

      // 2. Fetch User Pantry Items
      const itemsResp = await supabaseFetch(
        `${supabaseUrl}/rest/v1/pantry_items?user_id=eq.${user.id}&select=*`,
        activeKey,
        activeToken
      );

      let items = (itemsResp.ok && Array.isArray(itemsResp.data)) ? itemsResp.data : [];

      // Fallback check pantry_products for backwards compatibility
      if (items.length === 0) {
        const legacyResp = await supabaseFetch(
          `${supabaseUrl}/rest/v1/pantry_products?user_id=eq.${user.id}&select=*`,
          activeKey,
          activeToken
        );
        if (legacyResp.ok && Array.isArray(legacyResp.data)) {
          items = legacyResp.data;
        }
      }

      if (items.length === 0) {
        results.userSummaries.push({ userId: user.id, email: user.email, status: "no_items" });
        continue;
      }

      // 3. Fetch Deduplication Records (Alerts sent with email in the last 24 hours)
      const dedupResp = await supabaseFetch(
        `${supabaseUrl}/rest/v1/alerts?user_id=eq.${user.id}&email_sent=eq.true&email_sent_at=gte.${twentyFourHoursAgo}&select=product_id,type,message,email_sent_at`,
        activeKey,
        activeToken
      );

      const sentAlertsSet = new Set();
      if (dedupResp.ok && Array.isArray(dedupResp.data)) {
        dedupResp.data.forEach(a => {
          if (a.product_id && a.type) {
            sentAlertsSet.add(`${a.type}:${a.product_id}`);
            // Also extract dedup key signature if present in message: [DEDUP:...]
            if (a.message && a.message.includes("[DEDUP:")) {
              const m = a.message.match(/\[DEDUP:([^\]]+)\]/);
              if (m && m[1]) sentAlertsSet.add(m[1]);
            }
          }
        });
      }

      // 4. Identify Alert Candidates across Universal Shelf-Life Categories
      const warningDays = prefs.expiry_warning_days || 7;

      const candidateExpired = [];
      const candidateExpiresToday = [];
      const candidateVerySoon = [];
      const candidateExpiring = [];
      const candidateOpenedUseBy = [];
      const candidateLowStock = [];

      for (const item of items) {
        const itemId = String(item.id || item.product_id || "");
        const itemName = item.product_name || item.name || "Pantry Item";
        const itemQty = Number(item.quantity) || 0;
        const itemUnit = item.quantity_unit || item.unit || "pcs";
        const itemLocation = item.storage_location || item.storage_type || item.location || "Pantry";
        const isEstimate = Boolean(item.expiry_type === 'estimated' || (item.estimated_expiry_date && !item.actual_expiry_date));
        const itemThreshold = (item.low_stock_threshold !== null && item.low_stock_threshold !== undefined && !isNaN(Number(item.low_stock_threshold)))
          ? Number(item.low_stock_threshold)
          : ((item.minimum_stock !== null && item.minimum_stock !== undefined && !isNaN(Number(item.minimum_stock)))
            ? Number(item.minimum_stock)
            : prefs.low_stock_threshold);

        // Effective expiry date resolution (Manufacturer actual > Opened use-by > Estimated)
        const effDateStr = parseDateString(item.effective_expiry_date || item.actual_expiry_date || item.estimated_expiry_date || item.expiry_date);
        const openedUseByStr = parseDateString(item.recommended_use_by_date);
        const isOpened = item.product_status === 'Opened' || Boolean(item.opened_date);

        // A. Opened Product Use-By Alert
        if (isOpened && openedUseByStr && prefs.alert_expiry) {
          const openedUseByDate = new Date(openedUseByStr);
          const diffMs = openedUseByDate.getTime() - todayDate.getTime();
          const daysLeft = Math.round(diffMs / 86400000);

          if (daysLeft <= warningDays) {
            const dedupKey = `${user.id}:${itemId}:opened_use_by:${openedUseByStr}`;
            if (!sentAlertsSet.has(dedupKey) && !sentAlertsSet.has(`opened_use_by:${itemId}`)) {
              candidateOpenedUseBy.push({
                id: itemId,
                name: itemName,
                quantity: itemQty,
                unit: itemUnit,
                useByDate: openedUseByStr,
                daysLeft: daysLeft,
                storageTip: item.storage_recommendation || "Consume promptly after opening",
                location: itemLocation,
                dedupKey: dedupKey
              });
            }
          }
        }

        // B. Expiry Status Checks based on effective expiry date
        if (effDateStr) {
          const expDate = new Date(effDateStr);
          const diffMs = expDate.getTime() - todayDate.getTime();
          const daysLeft = Math.round(diffMs / 86400000);

          // 1. Expired Check (< 0 days)
          if (daysLeft < 0 && prefs.alert_expired) {
            const dedupKey = `${user.id}:${itemId}:expired:${effDateStr}`;
            if (!sentAlertsSet.has(dedupKey) && !sentAlertsSet.has(`expired:${itemId}`)) {
              candidateExpired.push({
                id: itemId,
                name: itemName,
                quantity: itemQty,
                unit: itemUnit,
                expiryDate: effDateStr,
                daysAgo: Math.abs(daysLeft),
                isEstimate: isEstimate,
                location: itemLocation,
                dedupKey: dedupKey
              });
            }
          }
          // 2. Expires Today (0 days)
          else if (daysLeft === 0 && prefs.alert_expiry) {
            const dedupKey = `${user.id}:${itemId}:expires_today:${effDateStr}`;
            if (!sentAlertsSet.has(dedupKey) && !sentAlertsSet.has(`expires_today:${itemId}`)) {
              candidateExpiresToday.push({
                id: itemId,
                name: itemName,
                quantity: itemQty,
                unit: itemUnit,
                expiryDate: effDateStr,
                daysLeft: 0,
                isEstimate: isEstimate,
                location: itemLocation,
                dedupKey: dedupKey
              });
            }
          }
          // 3. Very Soon (1–7 days)
          else if (daysLeft >= 1 && daysLeft <= 7 && prefs.alert_expiry) {
            const dedupKey = `${user.id}:${itemId}:very_soon:${effDateStr}`;
            if (!sentAlertsSet.has(dedupKey) && !sentAlertsSet.has(`very_soon:${itemId}`)) {
              candidateVerySoon.push({
                id: itemId,
                name: itemName,
                quantity: itemQty,
                unit: itemUnit,
                expiryDate: effDateStr,
                daysLeft: daysLeft,
                isEstimate: isEstimate,
                location: itemLocation,
                dedupKey: dedupKey
              });
            }
          }
          // 4. Expiring Soon (8 to warningDays)
          else if (daysLeft >= 8 && daysLeft <= warningDays && prefs.alert_expiry) {
            const dedupKey = `${user.id}:${itemId}:expiring_soon:${effDateStr}`;
            if (!sentAlertsSet.has(dedupKey) && !sentAlertsSet.has(`expiry:${itemId}`)) {
              candidateExpiring.push({
                id: itemId,
                name: itemName,
                quantity: itemQty,
                unit: itemUnit,
                expiryDate: effDateStr,
                daysLeft: daysLeft,
                isEstimate: isEstimate,
                location: itemLocation,
                dedupKey: dedupKey
              });
            }
          }
        }

        // C. Low-Stock Check
        if (prefs.alert_low_stock && itemQty <= itemThreshold) {
          const dedupKey = `${user.id}:${itemId}:low_stock:${todayStr}`;
          if (!sentAlertsSet.has(dedupKey) && !sentAlertsSet.has(`low_stock:${itemId}`)) {
            candidateLowStock.push({
              id: itemId,
              name: itemName,
              quantity: itemQty,
              unit: itemUnit,
              threshold: itemThreshold,
              location: itemLocation,
              dedupKey: dedupKey
            });
          }
        }
      }

      const totalAlertsCount = candidateExpired.length + candidateExpiresToday.length + candidateVerySoon.length + candidateExpiring.length + candidateOpenedUseBy.length + candidateLowStock.length;

      if (totalAlertsCount === 0) {
        results.userSummaries.push({ userId: user.id, email: user.email, status: "clean_or_recently_alerted" });
        continue;
      }

      // 5. Send Alert Email via Resend
      let emailSuccess = false;
      let emailId = null;

      // Subject line generation
      let subject = "IntelliPantry Daily Inventory Alert";
      if (candidateExpired.length > 0 && candidateExpiresToday.length === 0 && candidateVerySoon.length === 0 && candidateExpiring.length === 0 && candidateLowStock.length === 0) {
        subject = `⚠️ Expired Products Notice (${candidateExpired.length} item${candidateExpired.length > 1 ? "s" : ""}) — IntelliPantry`;
      } else if (candidateExpiresToday.length > 0) {
        subject = `🚨 Products Expire Today (${candidateExpiresToday.length} item${candidateExpiresToday.length > 1 ? "s" : ""}) — IntelliPantry`;
      } else if (candidateVerySoon.length > 0) {
        subject = `⏰ Urgent: ${candidateVerySoon.length} item(s) expiring within 7 days — IntelliPantry`;
      } else if (candidateExpiring.length > 0) {
        subject = `🟡 Items Expiring Soon (${candidateExpiring.length} item${candidateExpiring.length > 1 ? "s" : ""}) — IntelliPantry`;
      } else if (candidateLowStock.length > 0 && totalAlertsCount === candidateLowStock.length) {
        subject = `🛒 Low Stock Alert: Restock Needed (${candidateLowStock.length} item${candidateLowStock.length > 1 ? "s" : ""}) — IntelliPantry`;
      } else {
        subject = `🍃 Pantry Update: ${totalAlertsCount} item(s) need your attention — IntelliPantry`;
      }

      const htmlContent = buildAlertEmailHtml(user.fullName, {
        expired: candidateExpired,
        expiresToday: candidateExpiresToday,
        verySoon: candidateVerySoon,
        expiring: candidateExpiring,
        openedUseBy: candidateOpenedUseBy,
        lowStock: candidateLowStock
      });

      const textContent = buildAlertEmailText(user.fullName, {
        expired: candidateExpired,
        expiresToday: candidateExpiresToday,
        verySoon: candidateVerySoon,
        expiring: candidateExpiring,
        openedUseBy: candidateOpenedUseBy,
        lowStock: candidateLowStock
      });

      if (resendApiKey) {
        try {
          const resendResp = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${resendApiKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              from: fromEmail,
              to: [user.email],
              reply_to: replyTo,
              subject: subject,
              text: textContent,
              html: htmlContent
            })
          });

          const resendData = await resendResp.json();
          if (resendResp.ok && resendData && resendData.id) {
            emailSuccess = true;
            emailId = resendData.id;
            results.emailsSent++;
          } else {
            console.error(`[Resend Error for ${user.email}]`, resendData);
          }
        } catch (mailErr) {
          console.error(`[Resend Network Error for ${user.email}]`, mailErr);
        }
      } else {
        console.warn("[IntelliPantry Cron] RESEND_API_KEY is not set. Simulating alert recording.");
      }

      // 6. Record Triggered Alerts in public.alerts & email audit
      const alertRecords = [];

      candidateExpired.forEach(i => {
        alertRecords.push({
          user_id: user.id,
          product_id: i.id,
          product_name: i.name,
          title: `Expired: ${i.name}`,
          message: `${i.name} (${i.quantity} ${i.unit}) passed expiration date on ${i.expiryDate}. [DEDUP:${i.dedupKey}]`,
          type: "expired",
          is_read: false,
          email_sent: emailSuccess,
          email_sent_at: emailSuccess ? new Date().toISOString() : null
        });
      });

      candidateExpiresToday.forEach(i => {
        alertRecords.push({
          user_id: user.id,
          product_id: i.id,
          product_name: i.name,
          title: `Expires Today: ${i.name}`,
          message: `${i.name} (${i.quantity} ${i.unit}) expires today (${i.expiryDate}). Prioritize cooking today! [DEDUP:${i.dedupKey}]`,
          type: "expiry",
          is_read: false,
          email_sent: emailSuccess,
          email_sent_at: emailSuccess ? new Date().toISOString() : null
        });
      });

      candidateVerySoon.forEach(i => {
        alertRecords.push({
          user_id: user.id,
          product_id: i.id,
          product_name: i.name,
          title: `Expiring Very Soon: ${i.name}`,
          message: `${i.name} (${i.quantity} ${i.unit}) expires in ${i.daysLeft} day${i.daysLeft > 1 ? "s" : ""} (${i.expiryDate}). [DEDUP:${i.dedupKey}]`,
          type: "expiry",
          is_read: false,
          email_sent: emailSuccess,
          email_sent_at: emailSuccess ? new Date().toISOString() : null
        });
      });

      candidateExpiring.forEach(i => {
        alertRecords.push({
          user_id: user.id,
          product_id: i.id,
          product_name: i.name,
          title: `Expiring Soon: ${i.name}`,
          message: `${i.name} (${i.quantity} ${i.unit}) expires in ${i.daysLeft} days (${i.expiryDate}). [DEDUP:${i.dedupKey}]`,
          type: "expiry",
          is_read: false,
          email_sent: emailSuccess,
          email_sent_at: emailSuccess ? new Date().toISOString() : null
        });
      });

      candidateOpenedUseBy.forEach(i => {
        alertRecords.push({
          user_id: user.id,
          product_id: i.id,
          product_name: i.name,
          title: `Opened Item Use-By: ${i.name}`,
          message: `Opened product "${i.name}" has recommended use-by date on ${i.useByDate} (${i.daysLeft <= 0 ? 'Due now' : i.daysLeft + ' days left'}). [DEDUP:${i.dedupKey}]`,
          type: "expiry",
          is_read: false,
          email_sent: emailSuccess,
          email_sent_at: emailSuccess ? new Date().toISOString() : null
        });
      });

      candidateLowStock.forEach(i => {
        alertRecords.push({
          user_id: user.id,
          product_id: i.id,
          product_name: i.name,
          title: `Low Stock: ${i.name}`,
          message: `${i.name} has only ${i.quantity} ${i.unit} remaining (low stock threshold: ${i.threshold}). [DEDUP:${i.dedupKey}]`,
          type: "low_stock",
          is_read: false,
          email_sent: emailSuccess,
          email_sent_at: emailSuccess ? new Date().toISOString() : null
        });
      });

      if (alertRecords.length > 0) {
        const insertResp = await supabaseFetch(
          `${supabaseUrl}/rest/v1/alerts`,
          activeKey,
          activeToken,
          "POST",
          alertRecords
        );

        if (insertResp.ok) {
          results.alertsRecorded += alertRecords.length;
        } else {
          console.warn("[Alert Insert Error]", insertResp.data);
        }
      }

      // Record Email Audit if delivered
      if (emailSuccess) {
        await supabaseFetch(
          `${supabaseUrl}/rest/v1/email_notifications`,
          activeKey,
          activeToken,
          "POST",
          [{
            user_id: user.id,
            recipient_email: user.email,
            subject: subject,
            notification_type: "pantry_alert",
            status: "sent",
            provider: "resend",
            sent_at: new Date().toISOString()
          }]
        ).catch(() => {});
      }

      results.userSummaries.push({
        userId: user.id,
        email: user.email,
        status: emailSuccess ? "alert_email_sent" : (resendApiKey ? "email_failed" : "recorded_without_email"),
        emailId: emailId,
        expiredCount: candidateExpired.length,
        expiresTodayCount: candidateExpiresToday.length,
        verySoonCount: candidateVerySoon.length,
        expiringCount: candidateExpiring.length,
        openedUseByCount: candidateOpenedUseBy.length,
        lowStockCount: candidateLowStock.length
      });
    }

    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      summary: results
    });

  } catch (err) {
    console.error("[Fatal Error in api/cron-check-alerts]", err);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error in alert cron processing",
      details: err.message
    });
  }
};
