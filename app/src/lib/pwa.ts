// PWA plumbing: service-worker registration and capture of the browser's
// install event. Imported first thing in main.tsx so the early
// `beforeinstallprompt` event isn't missed before React mounts.

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let deferred: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((fn) => fn());

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // suppress the default mini-infobar; we show our own prompt
    deferred = e as BeforeInstallPromptEvent;
    notify();
  });
  window.addEventListener('appinstalled', () => {
    deferred = null;
    notify();
  });
}

export const getInstallEvent = () => deferred;
export const clearInstallEvent = () => {
  deferred = null;
  notify();
};
export function onInstallAvailabilityChange(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

/** iPhone/iPad Safari — no install event; users add via Share → Add to Home Screen. */
export function isIosSafari() {
  const ua = navigator.userAgent;
  const iOS = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const otherBrowser = /crios|fxios|edgios|opios|fban|fbav|instagram|line\//i.test(ua);
  return iOS && !otherBrowser;
}

export function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || !import.meta.env.PROD) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => console.warn('Service worker registration failed:', err));
  });
}
