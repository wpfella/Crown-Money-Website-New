/**
 * Client & SSR security utilities:
 * - Safe JSON-LD serialization (prevents </script> and HTML comment injection)
 * - Safe Web Storage wrappers (prevents SecurityError in strict privacy/iframe sandboxes)
 * - Safe URL sanitization for Markdown links and resource downloads
 */

export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

export function safeLocalStorageGet(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function safeLocalStorageSet(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore quota or sandboxed storage errors
  }
}

export function safeSessionStorageGet(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function safeSessionStorageSet(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Ignore quota or sandboxed storage errors
  }
}

/**
 * Sanitizes URLs rendered inside Markdown or external links.
 * Strictly permits https:, mailto:, tel:, and single-slash internal paths (/...).
 */
export function sanitizeUrl(rawUrl?: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim();
  if (!trimmed) return '';

  // Allow safe internal paths (single leading slash, no protocol-relative // or backslash)
  if (trimmed.startsWith('/') && !trimmed.startsWith('//') && !trimmed.startsWith('/\\')) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'mailto:' || parsed.protocol === 'tel:') {
      return trimmed;
    }
  } catch {
    // Reject malformed or dangerous schemes (javascript:, data:, vbscript:, http:)
  }

  return '';
}

/**
 * Opens a trusted HTTPS PDF/resource safely via an anchor element with rel="noopener noreferrer"
 * instead of window.open, preventing reverse tabnabbing and popup-blocker failures.
 */
export function openSafeExternalResource(url: string): void {
  if (typeof document === 'undefined') return;
  const safe = sanitizeUrl(url);
  if (!safe || !safe.startsWith('https://')) return;

  const anchor = document.createElement('a');
  anchor.href = safe;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
