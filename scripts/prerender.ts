import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALL_ROUTES, renderRouteHtml } from '../src/seo/routeMeta';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf-8');

let count = 0;
for (const routePath of Object.keys(ALL_ROUTES)) {
  const { html } = renderRouteHtml(templateHtml, routePath);
  if (routePath === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf-8');
  } else {
    const cleanRel = routePath.replace(/^\/+/, '');
    const routeDir = path.join(distDir, cleanRel);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf-8');
  }
  count++;
}

// Also generate dist/404.html for static hosts
const { html: notFoundHtml } = renderRouteHtml(templateHtml, '/404-not-found');
fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

console.log(`Pre-rendered ${count} static route HTML files + 404.html into dist/`);
