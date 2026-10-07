// WhatsApp sharing helpers: canonical URLs, branded share messages, the instant
// native/WhatsApp share used on phones, and local share counts.

import { SITE_URL } from './og';

export { SITE_URL, BRAND_NAME } from './og';

type Lang = 'en' | 'fr';

export const designUrl = (id: string) => `${SITE_URL}/design/${encodeURIComponent(id)}`;

export const whatsappShareUrl = (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`;

const COPY = {
  en: {
    attribution: '🔥 Found this on Krown Creative Factory',
    cta: '👉 Check them out for premium African designs:',
  },
  fr: {
    attribution: '🔥 Trouvé sur Krown Creative Factory',
    cta: '👉 Découvrez leurs designs africains premium :',
  },
};

/** Every share message carries the title, a line, Krown attribution, the item link and krowncf.com. */
export function buildDesignMessage(lang: Lang, title: string, line: string, url: string) {
  const c = COPY[lang];
  return [`✨ *${title}*`, line, '', c.attribution, `${c.cta} ${url}`, '', `🌐 ${SITE_URL}`].join('\n');
}

/** Phones/tablets: share straight from the tap via the OS sheet or the WhatsApp app. */
export const isTouchDevice = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

let shareInFlight = false;

export type ShareResult = 'shared' | 'cancelled' | 'whatsapp' | 'needs-tap';

/**
 * Mobile share. Call from a tap handler. With a prepared `file` (the watermarked
 * preview) the OS share sheet attaches the image itself; without one it shares
 * text + link. If the browser has no Web Share API (in-app browsers) or the share
 * fails, it falls back to the WhatsApp deep link.
 * 'needs-tap' = the browser refused because the tap's user activation expired
 * (iOS, after waiting for the image) — ask the user to tap once more.
 */
export function shareInstantly(title: string, message: string, file?: File | null): Promise<ShareResult> {
  const openWhatsApp = () => {
    // Same-tab navigation: popups are blocked inside in-app browsers (Instagram, Facebook…).
    window.location.href = whatsappShareUrl(message);
    return 'whatsapp' as const;
  };

  if (shareInFlight) return Promise.resolve('cancelled'); // ignore double taps
  if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') {
    return Promise.resolve(openWhatsApp());
  }

  const data: ShareData = file ? { title, text: message, files: [file] } : { title, text: message };
  shareInFlight = true;
  let pending: Promise<void>;
  try {
    pending = navigator.share(data);
  } catch {
    shareInFlight = false;
    return Promise.resolve(openWhatsApp());
  }
  return pending
    .then(() => 'shared' as const)
    .catch((err: unknown) => {
      const name = (err as DOMException)?.name;
      if (name === 'AbortError') return 'cancelled' as const; // user closed the sheet
      if (name === 'NotAllowedError' && file) return 'needs-tap' as const;
      console.warn('Native share failed, using WhatsApp link:', err);
      return openWhatsApp();
    })
    .finally(() => {
      shareInFlight = false;
    });
}

// --- Share tracking -------------------------------------------------------
// Counts live in this browser only. Site-wide counts need a backend endpoint.

const SHARES_KEY = 'krown-shares';

function readShares(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(SHARES_KEY) || '{}') || {};
  } catch {
    return {};
  }
}

export function getShareCount(id: string) {
  return readShares()[id] ?? 0;
}

export function recordShare(id: string) {
  const shares = readShares();
  shares[id] = (shares[id] ?? 0) + 1;
  try {
    localStorage.setItem(SHARES_KEY, JSON.stringify(shares));
  } catch {
    // Storage unavailable — skip tracking.
  }
  window.dispatchEvent(new CustomEvent('krown:share', { detail: { id, count: shares[id] } }));
  return shares[id];
}
