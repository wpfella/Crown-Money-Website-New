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

  // 1. Canonical URL normalization & legacy 301 redirects before static or Vite middleware
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next();
    }

    const rawPath = req.path || '/';
    // Do not touch Vite internal or file-extension asset requests
    if (
      rawPath.startsWith('/@') ||
      rawPath.startsWith('/src/') ||
      rawPath.startsWith('/node_modules/') ||
      /\.[a-zA-Z0-9]+$/.test(rawPath)
    ) {
      return next();
    }

    const cleanPath = rawPath === '/' ? '/' : rawPath.replace(/\/+$/, '');
    const lowerPath = cleanPath.toLowerCase();
    const querySuffix = req.url.includes('?') ? `?${req.url.split('?').slice(1).join('?')}` : '';

    // Legacy 301 redirects
    if (LEGACY_REDIRECTS[lowerPath]) {
      return res.redirect(301, `${LEGACY_REDIRECTS[lowerPath]}${querySuffix}`);
    }
    if (lowerPath.startsWith('/blog/')) {
      return res.redirect(301, `/guides${querySuffix}`);
    }

    // Enforce canonical no-trailing-slash URLs (e.g. /about/ -> 301 -> /about)
    if (rawPath.length > 1 && rawPath.endsWith('/')) {
      return res.redirect(301, `${cleanPath}${querySuffix}`);
    }

    next();
  });

  if (!isProd) {
    // Serve public files (robots.txt, sitemap.xml, llms.txt, llms-full.txt, assets) with redirect: false
    app.use(
      express.static(path.resolve(__dirname, 'public'), {
        index: false,
        redirect: false,
      })
    );

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      try {
        const url = req.originalUrl.split('?')[0] || '/';
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

        const cacheControl =
          status === 200
            ? 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
            : 'no-store, no-cache, must-revalidate';

        res
          .status(status)
          .set({
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': cacheControl,
          })
          .end(html);
      } catch (err) {
        next(err);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    // Serve static assets (JS, CSS, sitemap.xml, robots.txt, llms.txt, llms-full.txt)
    // CRITICAL: redirect: false prevents express.static from issuing 301 /about -> /about/
    app.use(
      express.static(distPath, {
        index: false,
        extensions: false,
        redirect: false,
      })
    );

    const cleanTemplatePath = path.join(distPath, '_template.html');
    const rawTemplate = fs.existsSync(cleanTemplatePath)
      ? fs.readFileSync(cleanTemplatePath, 'utf-8')
      : fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');

    app.get('*', (req, res) => {
      const url = req.path || '/';
      const { status, redirectTo, html } = renderRouteHtml(rawTemplate, url);

      if (status === 301 && redirectTo) {
        return res.redirect(301, redirectTo);
      }

      const cacheControl =
        status === 200
          ? 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
          : 'no-store, no-cache, must-revalidate';

      res
        .status(status)
        .set({
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': cacheControl,
        })
        .send(html);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Crown Money server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
