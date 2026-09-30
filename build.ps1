# PowerShell build script for Smart Pantry
Write-Host "[Build] Generating Smart Pantry Vercel bundle..."

$root = $PSScriptRoot
if (-not $root) { $root = Get-Location }

$dist = Join-Path $root "dist"

if (Test-Path $dist) {
    Remove-Item -Recurse -Force $dist
}

New-Item -ItemType Directory -Force -Path $dist | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $dist "css") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $dist "js") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $dist "assets") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $dist "api") | Out-Null

$pubUrl = ($env:NEXT_PUBLIC_SUPABASE_URL, $env:SUPABASE_URL | Where-Object { $_ } | Select-Object -First 1)
$pubKey = ($env:NEXT_PUBLIC_SUPABASE_ANON_KEY, $env:SUPABASE_ANON_KEY | Where-Object { $_ } | Select-Object -First 1)

function Inject-Env($filePath, $destPath) {
    $content = Get-Content -Raw -Path $filePath -Encoding UTF8
    if ($pubUrl -or $pubKey) {
        $jsonUrl = $pubUrl | ConvertTo-Json
        $jsonKey = $pubKey | ConvertTo-Json
        $scriptTag = "<script>window.ENV=window.ENV||{};window.ENV.NEXT_PUBLIC_SUPABASE_URL=$jsonUrl;window.ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY=$jsonKey;</script>"
        if ($content -match "<head>") {
            $content = $content -replace "<head>", "<head>`n  $scriptTag"
        } else {
            $content = "$scriptTag`n$content"
        }
    }
    Set-Content -Path $destPath -Value $content -Encoding UTF8
}

Inject-Env (Join-Path $root "landing.html") (Join-Path $dist "index.html")
Inject-Env (Join-Path $root "landing.html") (Join-Path $dist "landing.html")
Inject-Env (Join-Path $root "login.html") (Join-Path $dist "login.html")
Inject-Env (Join-Path $root "dashboard.html") (Join-Path $dist "dashboard.html")

if (Test-Path (Join-Path $root "vercel.json")) {
    Copy-Item (Join-Path $root "vercel.json") (Join-Path $dist "vercel.json") -Force
}
if (Test-Path (Join-Path $root "supabase_schema.sql")) {
    Copy-Item (Join-Path $root "supabase_schema.sql") (Join-Path $dist "supabase_schema.sql") -Force
}
if (Test-Path (Join-Path $root ".env.example")) {
    Copy-Item (Join-Path $root ".env.example") (Join-Path $dist ".env.example") -Force
}
if (Test-Path (Join-Path $root "README.md")) {
    Copy-Item (Join-Path $root "README.md") (Join-Path $dist "README.md") -Force
}
if (Test-Path (Join-Path $root "build.js")) {
    Copy-Item (Join-Path $root "build.js") (Join-Path $dist "build.js") -Force
}
if (Test-Path (Join-Path $root "supabase")) {
    Copy-Item -Recurse (Join-Path $root "supabase") (Join-Path $dist "supabase") -Force
}

$favFiles = @("favicon.ico", "favicon.png", "favicon-48x48.png", "favicon-32x32.png", "favicon-16x16.png", "apple-touch-icon.png", "android-chrome-192x192.png", "android-chrome-512x512.png", "site.webmanifest")
foreach ($fav in $favFiles) {
    if (Test-Path (Join-Path $root $fav)) {
        Copy-Item (Join-Path $root $fav) (Join-Path $dist $fav) -Force
    }
}

$robots = "User-agent: *`nAllow: /`n"
Set-Content -Path (Join-Path $dist "robots.txt") -Value $robots -Encoding UTF8

Copy-Item -Recurse (Join-Path $root "css\*") (Join-Path $dist "css") -Force
Copy-Item -Recurse (Join-Path $root "js\*") (Join-Path $dist "js") -Force
Copy-Item -Recurse (Join-Path $root "assets\*") (Join-Path $dist "assets") -Force
if (Test-Path (Join-Path $root "api")) {
    Copy-Item -Recurse (Join-Path $root "api\*") (Join-Path $dist "api") -Force
}

$public = Join-Path $root "public"
if (Test-Path $public) { Remove-Item -Recurse -Force $public }
Copy-Item -Recurse -Force $dist $public

# Create deployment zip with POSIX compliant paths
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = Join-Path $root "smartpantry-deploy.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}
[System.IO.Compression.ZipFile]::CreateFromDirectory($dist, $zipPath)

Write-Host "[Build] SUCCESS: Vercel bundle and Zip created at: $zipPath"
