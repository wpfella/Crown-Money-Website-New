import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { renderRouteHtml, LEGACY_REDIRECTS } from './src/seo/routeMeta';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // 1. Handle legacy 301 redirects before static or Vite middleware
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next();
    }
    const cleanPath = req.path === '/' ? '/' : req.path.replace(/\/+$/, '');
    const lowerPath = cleanPath.toLowerCase();

    if (LEGACY_REDIRECTS[lowerPath]) {
      return res.redirect(301, LEGACY_REDIRECTS[lowerPath]);
    }
    if (lowerPath.startsWith('/blog/')) {
      return res.redirect(301, '/guides');
    }
    next();
  });

  if (!isProd) {
    // Serve public files (robots.txt, sitemap.xml, llms.txt, assets)
    app.use(express.static(path.resolve(__dirname, 'public'), { index: false }));

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      try {
        const url = req.originalUrl.split('?')[0] || '/';
        // Do not intercept Vite internal or asset requests
        if (
          url.startsWith('/@') ||
          url.startsWith('/src/') ||
          url.startsWith('/node_modules/') ||
          /\.[a-zA-Z0-9]+$/.test(url)
        ) {
          return next();
        }

        const rawTemplate = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        const transformedTemplate = await vite.transformIndexHtml(url, rawTemplate);
        const { status, redirectTo, html } = renderRouteHtml(transformedTemplate, url);

        if (status === 301 && redirectTo) {
          return res.redirect(301, redirectTo);
        }

        res.status(status).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html);
      } catch (err) {
        next(err);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    // Serve static assets (JS, CSS, sitemap.xml, robots.txt, etc.) without auto-serving index.html
    app.use(
      express.static(distPath, {
        index: false,
        extensions: false,
      })
    );

    const rawTemplate = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');

    app.get('*', (req, res) => {
      const url = req.path || '/';
      const { status, redirectTo, html } = renderRouteHtml(rawTemplate, url);

      if (status === 301 && redirectTo) {
        return res.redirect(301, redirectTo);
      }

      res.status(status).set({ 'Content-Type': 'text/html; charset=utf-8' }).send(html);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Crown Money server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
