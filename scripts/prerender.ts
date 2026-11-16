import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALL_ROUTES, LEGACY_REDIRECTS, renderRouteHtml } from '../src/seo/routeMeta';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');
const savedTemplatePath = path.join(distDir, '_template.html');

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Run vite build first.');
  process.exit(1);
}

// Preserve a clean copy of the freshly built Vite HTML shell for server.ts
const templateHtml = fs.readFileSync(templatePath, 'utf-8');

fs.writeFileSync(savedTemplatePath, templateHtml, 'utf-8');

let count = 0;
for (const routePath of Object.keys(ALL_ROUTES)) {
  const { html } = renderRouteHtml(templateHtml, routePath);
  if (routePath === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf-8');
  } else {
    const cleanRel = routePath.replace(/^\/+/, '');
    const htmlFilePath = path.join(distDir, `${cleanRel}.html`);
    fs.mkdirSync(path.dirname(htmlFilePath), { recursive: true });
    // Write flat .html file (e.g. dist/about.html) so static CDNs with cleanUrls serve /about (200) without 301 -> /about/
    fs.writeFileSync(htmlFilePath, html, 'utf-8');

    // Also write directory index.html (dist/about/index.html) for fallback compatibility
    const routeDir = path.join(distDir, cleanRel);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf-8');
  }
  count++;
}

// Generate dist/404.html for static hosts
const { html: notFoundHtml } = renderRouteHtml(templateHtml, '/404-not-found');
fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

// Generate dist/_redirects for Cloudflare Pages / Netlify static edge routing (no-slash canonicals + legacy 301s)
const redirectLines: string[] = [
  '# Legacy 301 Redirects',
  ...Object.entries(LEGACY_REDIRECTS).map(([from, to]) => `${from} ${to} 301`),
  '',
  '# Canonical No-Slash Normalization',
  ...Object.keys(ALL_ROUTES)
    .filter((r) => r !== '/')
    .map((r) => `${r}/ ${r} 301`),
];
fs.writeFileSync(path.join(distDir, '_redirects'), redirectLines.join('\n') + '\n', 'utf-8');

// Generate dist/_headers for static CDN cache lifetimes & security headers
const prodCsp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.google-analytics.com https://*.crownmoney.com.au https://*.posthog.com https://cdn.oncehub.com https://*.oncehub.com https://paperform.co https://*.paperform.co https://elfsightcdn.com https://*.elfsight.com https://*.elfsightcdn.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.oncehub.com https://*.paperform.co https://*.elfsight.com https://*.elfsightcdn.com",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https://storage.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com https://*.elfsight.com https://*.elfsightcdn.com https://*.oncehub.com",
  "connect-src 'self' https: wss:",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.googletagmanager.com https://*.crownmoney.com.au https://*.oncehub.com https://go.oncehub.com https://paperform.co https://*.paperform.co https://*.elfsight.com",
  "frame-ancestors 'self' https://crownmoney.com.au https://*.crownmoney.com.au https://*.google.com https://*.googleapis.com https://*.googleusercontent.com",
  "form-action 'self' https://*.paperform.co https://*.oncehub.com",
  "upgrade-insecure-requests",
].join('; ');

const headersContent = `/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Cross-Origin-Opener-Policy: same-origin-allow-popups
  Referrer-Policy: strict-origin-when-cross-origin
  X-Permitted-Cross-Domain-Policies: none
  X-DNS-Prefetch-Control: on
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()
  Content-Security-Policy: ${prodCsp}

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`;
fs.writeFileSync(path.join(distDir, '_headers'), headersContent, 'utf-8');

console.log(`Pre-rendered ${count} static route HTML files (.html + /index.html), _template.html, _redirects, _headers, and 404.html into dist/`);

