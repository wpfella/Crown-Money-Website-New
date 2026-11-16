/**
 * Utility to track the user's initial landing URL and extract bounded, sanitized query parameters.
 */
import {
  safeLocalStorageGet,
  safeLocalStorageSet,
  safeSessionStorageGet,
  safeSessionStorageSet,
} from './security';

const MAX_URL_LENGTH = 1000;
const MAX_PARAM_COUNT = 25;
const MAX_KEY_LENGTH = 64;
const MAX_VALUE_LENGTH = 256;

const sanitizeTrackedUrl = (rawUrl: string): string => {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim().slice(0, MAX_URL_LENGTH);
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.toString().slice(0, MAX_URL_LENGTH);
    }
  } catch {
    // Ignore malformed URLs
  }
  return '';
};

// Initialize and save landing URL if not already set
export const initUrlTracker = () => {
  if (typeof window === 'undefined') return;

  const safeHref = sanitizeTrackedUrl(window.location.href);
  if (!safeHref) return;

  // Save landing URL in sessionStorage if it doesn't exist (per session)
  if (!safeSessionStorageGet('crown_landing_url')) {
    safeSessionStorageSet('crown_landing_url', safeHref);
  }

  // Also save in localStorage as backup/persistent first-touch across sessions
  if (!safeLocalStorageGet('crown_landing_url_backup')) {
    safeLocalStorageSet('crown_landing_url_backup', safeHref);
  }
};

// Parse parameters from any URL string as bounded, prototype-safe key-value pairs
export const parseUrlParams = (urlStr: string): Record<string, string> => {
  const populateSafeParams = (searchParams: URLSearchParams): Record<string, string> => {
    const params: Record<string, string> = {};
    let count = 0;
    searchParams.forEach((value, key) => {
      if (count >= MAX_PARAM_COUNT) return;
      const cleanKey = key.trim().slice(0, MAX_KEY_LENGTH).replace(/[^a-zA-Z0-9_.-]/g, '');
      if (!cleanKey || cleanKey === '__proto__' || cleanKey === 'constructor' || cleanKey === 'prototype') {
        return;
      }
      params[cleanKey] = value.replace(/[\x00-\x1F\x7F]/g, '').slice(0, MAX_VALUE_LENGTH);
      count += 1;
    });
    return params;
  };

  try {
    const url = new URL(urlStr);
    return populateSafeParams(url.searchParams);
  } catch {
    try {
      const search = urlStr.split('?')[1];
      if (!search) return {};
      return populateSafeParams(new URLSearchParams(search.slice(0, MAX_URL_LENGTH)));
    } catch {
      return {};
    }
  }
};

// Get the full tracking data to send with leads
export const getLeadSourceData = () => {
  if (typeof window === 'undefined') {
    return {
      landing_url: '',
      landing_params: {},
      current_url: '',
      current_params: {},
    };
  }

  const currentUrl = sanitizeTrackedUrl(window.location.href);
  const landingUrl =
    sanitizeTrackedUrl(safeSessionStorageGet('crown_landing_url') || '') ||
    sanitizeTrackedUrl(safeLocalStorageGet('crown_landing_url_backup') || '') ||
    currentUrl;

  return {
    landing_url: landingUrl,
    landing_params: parseUrlParams(landingUrl),
    current_url: currentUrl,
    current_params: parseUrlParams(currentUrl),
  };
};
