import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share, SquarePlus, X, Zap, WifiOff, Maximize } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';
import {
  clearInstallEvent,
  getInstallEvent,
  isIosSafari,
  isStandalone,
  onInstallAvailabilityChange,
} from '../lib/pwa';

const SNOOZE_KEY = 'krown-install-dismissed';
const SNOOZE_DAYS = 7;
const SHOW_AFTER_MS = 6000;
const SHOW_AFTER_SCROLL = 400;

function snoozed() {
  try {
    const at = Number(localStorage.getItem(SNOOZE_KEY) || 0);
    return Date.now() - at < SNOOZE_DAYS * 86_400_000;
  } catch {
    return false;
  }
}

const isPhoneLike = () => window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

/**
 * On-brand "Install the app" card for phones. Appears after a few seconds or a
 * bit of scrolling — never on first paint. Android/Chrome uses the captured
 * beforeinstallprompt event; iOS Safari gets Add-to-Home-Screen steps.
 */
export default function InstallPrompt() {
  const { t } = useLanguage();
  const installEvent = useSyncExternalStore(onInstallAvailabilityChange, getInstallEvent, () => null);
  const [ready, setReady] = useState(false); // delay / scroll condition met
  const [dismissed, setDismissed] = useState(() => snoozed());
  const [eligible] = useState(() => !isStandalone() && isPhoneLike());
  const [ios] = useState(() => isIosSafari());
  const installRef = useRef<HTMLButtonElement>(null);

  // Wait for a few seconds on the site or some scrolling, whichever comes first.
  useEffect(() => {
    if (!eligible || dismissed) return;
    const show = () => setReady(true);
    const timer = window.setTimeout(show, SHOW_AFTER_MS);
    const onScroll = () => {
      if (window.scrollY > SHOW_AFTER_SCROLL) show();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [eligible, dismissed]);

  useEffect(() => {
    const onInstalled = () => {
      setDismissed(true);
      toast.success(t('pwa.installed'));
    };
    window.addEventListener('appinstalled', onInstalled);
    return () => window.removeEventListener('appinstalled', onInstalled);
  }, [t]);

  const visible = eligible && ready && !dismissed && (!!installEvent || ios);

  const snooze = () => {
    try {
      localStorage.setItem(SNOOZE_KEY, String(Date.now()));
    } catch {
      // ignore
    }
    setDismissed(true);
  };

  const install = async () => {
    const event = getInstallEvent();
    if (!event) return;
    setDismissed(true); // hand over to the browser's own dialog immediately
    try {
      await event.prompt();
      const { outcome } = await event.userChoice;
      clearInstallEvent(); // the event can only be used once
      if (outcome === 'dismissed') snooze();
    } catch (err) {
      console.warn('Install prompt failed:', err);
      snooze();
    }
  };

  const perks = [
    { icon: Zap, label: t('pwa.perkFast') },
    { icon: Maximize, label: t('pwa.perkFull') },
    { icon: WifiOff, label: t('pwa.perkOffline') },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="install-title"
          aria-describedby="install-desc"
          initial={{ y: '120%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '120%', opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 240 }}
          onAnimationComplete={() => installRef.current?.focus({ preventScroll: true })}
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[55] mx-auto max-w-md"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-krown-dark/95 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
            <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-krown-red/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-krown-orange/15 blur-3xl" />

            <button
              type="button"
              onClick={snooze}
              aria-label={t('pwa.close')}
              className="absolute top-2 right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white/50 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="relative p-5">
              <div className="flex items-center gap-4 pr-8">
                <img src="/icons/icon-192.png" alt="" className="h-14 w-14 shrink-0 rounded-2xl shadow-lg shadow-krown-red/30" />
                <div className="min-w-0">
                  <h2 id="install-title" className="text-base font-bold leading-tight text-white">
                    {t('pwa.title')}
                  </h2>
                  <p className="mt-0.5 text-xs text-white/50">krowncf.com</p>
                </div>
              </div>

              <p id="install-desc" className="mt-3 text-sm text-white/70">
                {t('pwa.subtitle')}
              </p>

              <ul className="mt-3 flex flex-wrap gap-2">
                {perks.map((p) => (
                  <li key={p.label} className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                    <p.icon className="h-3.5 w-3.5 text-krown-orange" aria-hidden="true" />
                    {p.label}
                  </li>
                ))}
              </ul>

              {installEvent ? (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={snooze}
                    className="min-h-[48px] rounded-xl border border-white/15 bg-white/5 text-sm font-semibold text-white/80 hover:bg-white/10"
                  >
                    {t('pwa.notNow')}
                  </button>
                  <motion.button
                    ref={installRef}
                    type="button"
                    onClick={install}
                    whileTap={{ scale: 0.96 }}
                    className="min-h-[48px] rounded-xl bg-gradient-to-r from-krown-red to-krown-orange text-sm font-bold text-white shadow-glow"
                  >
                    {t('pwa.install')}
                  </motion.button>
                </div>
              ) : (
                <>
                  <ol className="mt-4 space-y-2 text-sm text-white/80">
                    <li className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
                        <Share className="h-4 w-4 text-[#0A84FF]" aria-hidden="true" />
                      </span>
                      {t('pwa.iosStep1')}
                    </li>
                    <li className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
                        <SquarePlus className="h-4 w-4 text-white" aria-hidden="true" />
                      </span>
                      {t('pwa.iosStep2')}
                    </li>
                  </ol>
                  <button
                    ref={installRef}
                    type="button"
                    onClick={snooze}
                    className="mt-4 min-h-[48px] w-full rounded-xl bg-gradient-to-r from-krown-red to-krown-orange text-sm font-bold text-white"
                  >
                    {t('pwa.gotIt')}
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
