import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type Request, type Response, type NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { renderRouteHtml, LEGACY_REDIRECTS } from './src/seo/routeMeta';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Allowlisted upstream Zapier webhook destinations (never exposed to or controlled by client URLs)
const ZAPIER_WEBHOOKS = {
  contact: 'https://hooks.zapier.com/hooks/catch/24598887/up2kqpo/',
  newsletter: 'https://hooks.zapier.com/hooks/catch/24598887/up2fobt/',
  exit_popup: 'https://hooks.zapier.com/hooks/catch/24598887/up2fobt/',
  chat_lead: 'https://hooks.zapier.com/hooks/catch/24598887/42ljmvx/',
  bank_reconnect: 'https://hooks.zapier.com/hooks/catch/24598887/4h9kvht/',
} as const;

type LeadType = keyof typeof ZAPIER_WEBHOOKS;

const CROWN_ASSISTANT_SYSTEM_PROMPT = `You are a professional, helpful, and trustworthy AI assistant for Crown Money, an Australian financial strategy company.
Crown Money specialises in debt reduction and wealth building.

Key Services & Concepts:
- Mortgage reduction strategies that help homeowners pay off their 30-year mortgage in half the time.
- Financial coaching and tracking through a proprietary dashboard.
- Optimising mortgage structures to work for the homeowner, not the bank.
- Wealth building and investment property strategy.
- The Passive Income Plan (PIP): Uses debt recycling to turn home equity into passive income, converting bad debt into tax-deductible good debt. Contact fsfl@crown.money for more.

General Information & FAQ:
- Reviews:
  - Google: https://g.page/CrownMoney
  - Facebook: https://www.facebook.com/CrownMoneyManagement/reviews/
  - Trustpilot: https://www.trustpilot.com/review/crownmoneymanagement.com.au/location/melbourne
- Depositing Cash: Deposit into everyday account, then transfer to home loan BSB/Account OR email clientcare@crown.money to arrange direct debit.
- Phone Banking (Origin): App available for iOS (App Store) and Android (Play Store). Search for "Origin Mortgages Mobile Access". Note: Redraws cannot be done via app; use the digital Redraw Request Form.
- Lost Superannuation: Log in to myGov, link to ATO, access "Super" section to search.
- Licensing: Crown Money holds an Australian Credit Licence (ACL). Operated by Crown Lending Pty Ltd, ACL Number 388 279, ACN 119 504 862. [View Licence PDF](https://storage.googleapis.com/crown_money/Website/License%20%26%20Legal/Crown%20Lending%20ASIC%20ACL.pdf).

Support & Operations:
- 90 Day Review: Speak to your Financial Strategist or email coaches@crown.money.
- Loan Discharge: Email discharge@crown.money. Process takes 3-4 weeks. Important: Redirect income and stop direct debits before discharge.
- Change Redraw Account: Email clientcare@crown.money for a DDR form.
- Employer Payments: Provide BSB and Account details from your settlement email.
- Redraw Requests: Use the digital [Redraw Request Form](https://share-ap1.hsforms.com/1mytJWX7yTRm1UX14zx7qzw35dvz). Redraws are no longer via email. Watch this [step-by-step video](https://hello.crownmoneymanagement.com.au/share/hubspotvideo/312935213533) to see how it works.
- Adding Redraw Form to Home Screen:
  - iPhone: Open form > Share icon > Add to Home Screen.
  - Android: Open form > Three dots > Add to Home Screen / Install App.
- Redraw Timing: Processed same day if before cutoff (Advantedge: 10:45am, Origin/Well Nigh: 12:45pm AEST). Funds usually available after 6pm.
- Account Login:
  - Origin: Call 1300 767 023 for access. Login: https://online.originmms.com.au/ib/crown
  - Well Nigh: Issued at settlement. Login: https://crownmoney.emms.net.au/security/login
- Third-Party Transfers: Not allowed for Advantedge/Well Nigh. Origin allows via Redraw Request Form + phone confirmation.
- BSB Numbers:
  - Advantedge: 083-545 (NAB)
  - Well Nigh: 037-842 (Westpac)
  - Origin: 636-380 (Indue/Columbus Capital)
- Head Office: Level 19, 180 Lonsdale Street, Melbourne VIC 3000. Phone: 1300 882 981.

Your goal is to help homeowners understand these concepts and actively prompt them to book a free strategy call by visiting the contact page at /contact. Once they submit their details, they will be redirected to the booking system.

If the user shares their name, email, or phone number in the chat, acknowledge them warmly and mention that we have received them and our specialists will be in touch shortly. If any of these are missing (e.g. they only gave an email but no phone number), kindly ask them for the missing details so we can connect with them.

Guidelines:
- Be concise, professional, and friendly.
- Use standard Markdown for links to make them clickable.
- Avoid using markdown symbols like * or # for headers or lists unless necessary for clarity.
- If asked about specific rates or products, explain that a personalised strategy session is needed to provide accurate information for their situation.
- Always mention the free strategy call as the next logical step.`;

// Lazy server-only Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// Lightweight sliding-window IP rate limiter
function createRateLimiter(options: { windowMs: number; max: number }) {
  const hits = new Map<string, number[]>();

  const cleanup = setInterval(() => {
    const cutoff = Date.now() - options.windowMs;
    for (const [ip, timestamps] of hits.entries()) {
      const valid = timestamps.filter((t) => t > cutoff);
      if (valid.length === 0) {
        hits.delete(ip);
      } else {
        hits.set(ip, valid);
      }
    }
  }, Math.max(options.windowMs, 60_000));
  cleanup.unref();

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const cutoff = now - options.windowMs;
    const recent = (hits.get(ip) || []).filter((t) => t > cutoff);

    if (recent.length >= options.max) {
      res.setHeader('Retry-After', String(Math.ceil(options.windowMs / 1000)));
      return res.status(429).json({
        error: 'Too many requests. Please wait a few minutes and try again.',
      });
    }

    recent.push(now);
    hits.set(ip, recent);
    next();
  };
}

function sanitizeText(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  // Strip ASCII control characters except newline (\n) and tab (\t)
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim().slice(0, maxLen);
}

function sanitizeSingleLine(value: unknown, maxLen: number): string {
  return sanitizeText(value, maxLen).replace(/[\r\n\t]+/g, ' ');
}

function sanitizeHttpUrl(value: unknown): string {
  const raw = sanitizeSingleLine(value, 500);
  if (!raw) return '';
  try {
    const parsed = new URL(raw);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.toString().slice(0, 500);
    }
  } catch {
    // Reject non-HTTP(S) URLs
  }
  return '';
}

function sanitizeParamsMap(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const out: Record<string, string> = {};
  const entries = Object.entries(value as Record<string, unknown>).slice(0, 25);
  for (const [k, v] of entries) {
    const cleanKey = sanitizeSingleLine(k, 64).replace(/[^a-zA-Z0-9_.-]/g, '');
    if (!cleanKey || cleanKey === '__proto__' || cleanKey === 'constructor' || cleanKey === 'prototype') {
      continue;
    }
    out[cleanKey] = sanitizeSingleLine(v, 256);
  }
  return out;
}

function isValidEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isSafeRelativeRedirect(target: string): boolean {
  return target.startsWith('/') && !target.startsWith('//') && !target.startsWith('/\\');
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  // 0. Comprehensive HTTP Security Headers
  const cspDirectives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.google-analytics.com https://*.crownmoney.com.au https://*.posthog.com https://cdn.oncehub.com https://*.oncehub.com https://paperform.co https://*.paperform.co https://elfsightcdn.com https://*.elfsight.com https://*.elfsightcdn.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.oncehub.com https://*.paperform.co https://*.elfsight.com https://*.elfsightcdn.com",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob: https://storage.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com https://*.elfsight.com https://*.elfsightcdn.com https://*.oncehub.com",
    isProd ? "connect-src 'self' https: wss:" : "connect-src 'self' https: wss: ws:",
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.googletagmanager.com https://*.crownmoney.com.au https://*.oncehub.com https://go.oncehub.com https://paperform.co https://*.paperform.co https://*.elfsight.com",
    "frame-ancestors 'self' https://crownmoney.com.au https://*.crownmoney.com.au https://*.google.com https://*.googleapis.com https://*.googleusercontent.com",
    "form-action 'self' https://*.paperform.co https://*.oncehub.com",
    ...(isProd ? ['upgrade-insecure-requests'] : []),
  ].join('; ');

  app.use((_req, res, next) => {
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    res.setHeader('X-DNS-Prefetch-Control', 'on');
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
    );
    res.setHeader('Content-Security-Policy', cspDirectives);
    next();
  });

  // 0.5 Block requests to hidden dotfiles or internal server configuration files
  const blockedExactPaths = new Set([
    '/server.ts',
    '/package.json',
    '/package-lock.json',
    '/bun.lock',
    '/tsconfig.json',
    '/vite.config.ts',
    '/metadata.json',
  ]);

  app.use((req, res, next) => {
    const reqPath = (req.path || '/').toLowerCase();
    if (
      blockedExactPaths.has(reqPath) ||
      (/\/\.[^/]/.test(reqPath) && !reqPath.startsWith('/.well-known/'))
    ) {
      return res.status(404).type('text/plain').send('Not Found');
    }
    next();
  });

  app.use(
    '/.well-known',
    express.static(path.resolve(__dirname, isProd ? 'dist/.well-known' : 'public/.well-known'), {
      index: false,
      redirect: false,
      dotfiles: 'allow',
      maxAge: '7d',
    })
  );

  // 1. Secure Server-Side API Routes
  app.use('/api', express.json({ limit: '32kb', strict: true }));

  const chatRateLimiter = createRateLimiter({ windowMs: 5 * 60 * 1000, max: 20 });
  const leadRateLimiter = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 12 });

  app.post('/api/chat', chatRateLimiter, async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    const message = sanitizeText(req.body?.message, 1500);
    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'Assistant is temporarily unavailable. Please book a free strategy session on our Contact page.',
      });
    }

    const rawHistory = Array.isArray(req.body?.history) ? req.body.history.slice(-10) : [];
    const historyContents = rawHistory
      .filter((item: unknown) => item && typeof item === 'object')
      .map((item: { text?: unknown; isBot?: unknown }) => ({
        role: item.isBot ? 'model' : 'user',
        parts: [{ text: sanitizeText(item.text, 2000) }],
      }))
      .filter((item: { parts: { text: string }[] }) => item.parts[0].text.length > 0);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: [...historyContents, { role: 'user', parts: [{ text: message }] }],
        config: {
          systemInstruction: CROWN_ASSISTANT_SYSTEM_PROMPT,
        },
      });

      const reply =
        response.text?.trim() ||
        "I'm sorry, I couldn't generate a response right now. Please try again or book a free call with our team at /contact!";

      return res.status(200).json({ reply });
    } catch (err) {
      console.error('Gemini API error in /api/chat:', err instanceof Error ? err.message : 'Unknown error');
      return res.status(502).json({
        error: 'Unable to connect to the assistant right now. Please try again shortly or book a call with our team.',
      });
    }
  });

  app.post('/api/lead', leadRateLimiter, async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');

    // Honeypot anti-bot verification: silently accept without forwarding
    if (req.body?._honeypot && String(req.body._honeypot).trim().length > 0) {
      return res.status(200).json({ ok: true });
    }

    const leadType = req.body?.type as LeadType | undefined;
    if (!leadType || !Object.prototype.hasOwnProperty.call(ZAPIER_WEBHOOKS, leadType)) {
      return res.status(400).json({ error: 'Invalid submission type.' });
    }

    const email = sanitizeSingleLine(req.body?.email, 254);
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const sourceTracking = {
      landing_url: sanitizeHttpUrl(req.body?.landing_url),
      landing_params: sanitizeParamsMap(req.body?.landing_params),
      current_url: sanitizeHttpUrl(req.body?.current_url),
      current_params: sanitizeParamsMap(req.body?.current_params),
    };

    let upstreamUrl: string = ZAPIER_WEBHOOKS[leadType];
    let payload: Record<string, unknown>;

    switch (leadType) {
      case 'contact': {
        const firstName = sanitizeSingleLine(req.body?.firstName, 100);
        const mobile = sanitizeSingleLine(req.body?.mobile, 30);
        const postcode = sanitizeSingleLine(req.body?.postcode, 10);
        if (!firstName || !mobile || !postcode) {
          return res.status(400).json({ error: 'Please complete all required fields.' });
        }
        payload = {
          firstName,
          email,
          mobile,
          postcode,
          howDidYouHear: sanitizeSingleLine(req.body?.howDidYouHear, 80),
          referralSource: sanitizeSingleLine(req.body?.referralSource, 120),
          otherSource: sanitizeSingleLine(req.body?.otherSource, 120),
          existingClientDetails: sanitizeSingleLine(req.body?.existingClientDetails, 160),
          message: sanitizeText(req.body?.message, 2500),
          ...sourceTracking,
        };
        break;
      }

      case 'newsletter':
      case 'exit_popup': {
        const firstName = sanitizeSingleLine(req.body?.firstName, 100);
        if (!firstName) {
          return res.status(400).json({ error: 'First name is required.' });
        }
        payload = {
          firstName,
          email,
          source: leadType,
          ...sourceTracking,
        };
        break;
      }

      case 'chat_lead': {
        const name = sanitizeSingleLine(req.body?.name, 100) || 'Interested Client';
        const phone = sanitizeSingleLine(req.body?.phone, 30);
        if (!phone) {
          return res.status(400).json({ error: 'Phone number is required.' });
        }
        payload = {
          name,
          email,
          phone,
          message: sanitizeText(req.body?.message, 4000),
          ...sourceTracking,
        };
        break;
      }

      case 'bank_reconnect': {
        upstreamUrl = `${ZAPIER_WEBHOOKS.bank_reconnect}?email=${encodeURIComponent(email)}&source=bank_statement_error_reconnect`;
        payload = {
          email,
          Email: email,
          email_address: email,
          emailAddress: email,
          source: 'bank_statement_error_reconnect',
          page: '/error',
          timestamp: new Date().toISOString(),
          landing_url: sourceTracking.landing_url,
          current_url: sourceTracking.current_url,
        };
        break;
      }
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const upstreamRes = await fetch(upstreamUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!upstreamRes.ok) {
        return res.status(502).json({ error: 'Upstream submission failed. Please try again.' });
      }
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('Lead webhook proxy error:', err instanceof Error ? err.message : 'Unknown error');
      return res.status(502).json({ error: 'Unable to submit right now. Please try again.' });
    } finally {
      clearTimeout(timeout);
    }
  });

  app.all('/api/*', (_req, res) => {
    res.status(404).json({ error: 'API endpoint not found.' });
  });

  // 2. Canonical URL normalization & legacy 301 redirects (hardened against Open Redirects & CRLF)
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next();
    }

    const rawPath = req.path || '/';
    // Do not touch Vite internal, API, or file-extension asset requests
    if (
      rawPath.startsWith('/api/') ||
      rawPath.startsWith('/@') ||
      rawPath.startsWith('/src/') ||
      rawPath.startsWith('/node_modules/') ||
      /\.[a-zA-Z0-9]+$/.test(rawPath)
    ) {
      return next();
    }

    // Normalize multiple slashes and backslashes to prevent protocol-relative //evil.com open redirects
    const normalizedSlashes = rawPath
      .replace(/[\x00-\x1F\x7F]/g, '')
      .replace(/\\+/g, '/')
      .replace(/\/{2,}/g, '/');

    const cleanPath = normalizedSlashes === '/' ? '/' : normalizedSlashes.replace(/\/+$/, '');
    const lowerPath = cleanPath.toLowerCase();

    const rawQuery = req.url.includes('?') ? req.url.split('?').slice(1).join('?') : '';
    const safeQuery = rawQuery.replace(/[\r\n\x00-\x1F\x7F]/g, '').slice(0, 2048);
    const querySuffix = safeQuery ? `?${safeQuery}` : '';

    // Legacy 301 redirects
    if (LEGACY_REDIRECTS[lowerPath]) {
      const target = `${LEGACY_REDIRECTS[lowerPath]}${querySuffix}`;
      if (isSafeRelativeRedirect(target)) {
        return res.redirect(301, target);
      }
    }

    // Enforce canonical single-slash & no-trailing-slash URLs (e.g. //about/ or /about/ -> 301 -> /about)
    if (rawPath !== cleanPath && isSafeRelativeRedirect(cleanPath)) {
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
        dotfiles: 'deny',
        maxAge: '7d',
      })
    );

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      try {
        const rawUrlPath = req.originalUrl.split('?')[0] || '/';
        if (
          rawUrlPath.startsWith('/@') ||
          rawUrlPath.startsWith('/src/') ||
          rawUrlPath.startsWith('/node_modules/') ||
          /\.[a-zA-Z0-9]+$/.test(rawUrlPath)
        ) {
          return next();
        }

        const safeUrlPath = rawUrlPath
          .replace(/[\x00-\x1F\x7F]/g, '')
          .replace(/\\+/g, '/')
          .replace(/\/{2,}/g, '/');

        const rawTemplate = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        const transformedTemplate = await vite.transformIndexHtml(safeUrlPath, rawTemplate);
        const { status, redirectTo, html } = renderRouteHtml(transformedTemplate, safeUrlPath);

        if (status === 301 && redirectTo && isSafeRelativeRedirect(redirectTo)) {
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
    // Serve hashed Vite bundles in /assets with 1-year immutable cache lifetime
    app.use(
      '/assets',
      express.static(path.join(distPath, 'assets'), {
        index: false,
        redirect: false,
        dotfiles: 'deny',
        maxAge: '365d',
        immutable: true,
      })
    );
    // Serve other static assets (sitemap.xml, robots.txt, llms.txt, llms-full.txt)
    // CRITICAL: redirect: false prevents express.static from issuing 301 /about -> /about/
    app.use(
      express.static(distPath, {
        index: false,
        extensions: false,
        redirect: false,
        dotfiles: 'deny',
        maxAge: '1d',
      })
    );

    const cleanTemplatePath = path.join(distPath, '_template.html');
    const rawTemplate = fs.existsSync(cleanTemplatePath)
      ? fs.readFileSync(cleanTemplatePath, 'utf-8')
      : fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');

    app.get('*', (req, res) => {
      const safeUrlPath = (req.path || '/')
        .replace(/[\x00-\x1F\x7F]/g, '')
        .replace(/\\+/g, '/')
        .replace(/\/{2,}/g, '/');

      const { status, redirectTo, html } = renderRouteHtml(rawTemplate, safeUrlPath);

      if (status === 301 && redirectTo && isSafeRelativeRedirect(redirectTo)) {
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

  // Global error handler — never expose internal stack traces to clients
  app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled server error:', err instanceof Error ? err.message : 'Unknown error');
    if (res.headersSent) return;
    if (req.path.startsWith('/api/')) {
      res.status(500).json({ error: 'An unexpected server error occurred.' });
    } else {
      res.status(500).type('text/plain').send('Internal Server Error');
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Crown Money server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
