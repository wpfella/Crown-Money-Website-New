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

// Preserve a clean copy of the un-rendered Vite HTML shell for server.ts
const templateHtml = fs.existsSync(savedTemplatePath)
  ? fs.readFileSync(savedTemplatePath, 'utf-8')
  : fs.readFileSync(templatePath, 'utf-8');

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
  '/blog/* /guides 301',
  '',
  '# Canonical No-Slash Normalization',
  ...Object.keys(ALL_ROUTES)
    .filter((r) => r !== '/')
    .map((r) => `${r}/ ${r} 301`),
];
fs.writeFileSync(path.join(distDir, '_redirects'), redirectLines.join('\n') + '\n', 'utf-8');

console.log(`Pre-rendered ${count} static route HTML files (.html + /index.html), _template.html, _redirects, and 404.html into dist/`);
