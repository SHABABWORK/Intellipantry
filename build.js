const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const distDir = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  const isDirectory = stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('[Build] Generating Vercel production bundle in ./dist and ./public ...');

// 1. Ensure dist directories exist
['css', 'js', 'assets/categories', 'api'].forEach(dir => {
  fs.mkdirSync(path.join(distDir, dir), { recursive: true });
});

function injectPublicEnv(htmlContent) {
  const pubUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '').trim();
  const pubKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '').trim();

  if (!pubUrl && !pubKey) return htmlContent;

  const envScript = `<script>window.ENV=window.ENV||{};window.ENV.NEXT_PUBLIC_SUPABASE_URL=${JSON.stringify(pubUrl)};window.ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY=${JSON.stringify(pubKey)};</script>`;

  if (htmlContent.includes('<head>')) {
    return htmlContent.replace('<head>', `<head>\n  ${envScript}`);
  }
  return envScript + '\n' + htmlContent;
}

// 2. Copy core HTML entry pages (with build-time environment injection if provided)
const dashboardHtml = fs.readFileSync(path.join(srcDir, 'dashboard.html'), 'utf8');
const loginHtml = fs.readFileSync(path.join(srcDir, 'login.html'), 'utf8');
const landingHtml = fs.readFileSync(path.join(srcDir, 'landing.html'), 'utf8');

fs.writeFileSync(path.join(distDir, 'index.html'), injectPublicEnv(dashboardHtml), 'utf8');
fs.writeFileSync(path.join(distDir, 'landing.html'), injectPublicEnv(landingHtml), 'utf8');
fs.writeFileSync(path.join(distDir, 'login.html'), injectPublicEnv(loginHtml), 'utf8');
fs.writeFileSync(path.join(distDir, 'dashboard.html'), injectPublicEnv(dashboardHtml), 'utf8');

// 3. Copy vercel.json, robots.txt & supabase_schema.sql
if (fs.existsSync(path.join(srcDir, 'vercel.json'))) {
  fs.copyFileSync(path.join(srcDir, 'vercel.json'), path.join(distDir, 'vercel.json'));
}
if (fs.existsSync(path.join(srcDir, 'supabase_schema.sql'))) {
  fs.copyFileSync(path.join(srcDir, 'supabase_schema.sql'), path.join(distDir, 'supabase_schema.sql'));
}
if (fs.existsSync(path.join(srcDir, '.env.example'))) {
  fs.copyFileSync(path.join(srcDir, '.env.example'), path.join(distDir, '.env.example'));
}
if (fs.existsSync(path.join(srcDir, 'supabase'))) {
  copyRecursiveSync(path.join(srcDir, 'supabase'), path.join(distDir, 'supabase'));
}

const favFiles = [
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'site.webmanifest'
];
favFiles.forEach(file => {
  if (fs.existsSync(path.join(srcDir, file))) {
    fs.copyFileSync(path.join(srcDir, file), path.join(distDir, file));
  }
});

const robotsContent = `User-agent: *\nAllow: /\n`;
fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsContent, 'utf8');

// 4. Copy static assets, css, js, and api
copyRecursiveSync(path.join(srcDir, 'css'), path.join(distDir, 'css'));
copyRecursiveSync(path.join(srcDir, 'js'), path.join(distDir, 'js'));
copyRecursiveSync(path.join(srcDir, 'assets'), path.join(distDir, 'assets'));
if (fs.existsSync(path.join(srcDir, 'api'))) {
  copyRecursiveSync(path.join(srcDir, 'api'), path.join(distDir, 'api'));
}

// 5. Also mirror to public folder for seamless Vercel output directory fallback
copyRecursiveSync(distDir, publicDir);

console.log('[Build] SUCCESS: All pages, assets, and Vercel API bundled cleanly into ./dist and ./public!');
