import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router';
import { Compass, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useModalA11y } from '../hooks/use-modal-a11y';
import { NAV_ITEMS, isNavActive } from '../data/navigation';

// Pages that already have a floating button in the bottom-right corner: sit above it.
const OFFSETS: Record<string, string> = {
  '/': 'bottom-[5.5rem]',
  '/about': 'bottom-[5.5rem]',
  '/latest': 'bottom-[5.5rem]',
  '/pricing': 'bottom-[5.5rem]',
  '/account': 'bottom-[5.5rem]',
  '/contact': 'bottom-[10rem]',
};

/**
 * Phones and tablets: a small floating compass (bottom right) that opens a
 * mini-menu of every section. It appears once the user has scrolled a little,
 * which is exactly when the header has slid away.
 */
export default function QuickJump() {
  const { t } = useLanguage();
  const { pathname, hash } = useLocation();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Closes itself on navigation: it is only open for the page it was opened on.
  const open = openOn === pathname + hash;
  const close = () => setOpenOn(null);
  useModalA11y(open, close, panelRef, closeRef);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const offset = OFFSETS[pathname] ?? 'bottom-6';

  return (
    <div className="lg:hidden">
      <AnimatePresence>
        {(visible || open) && (
          <motion.button
            key="quick-jump-fab"
            type="button"
            onClick={() => setOpenOn(open ? null : pathname + hash)}
            initial={{ opacity: 0, scale: 0.6, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 12 }}
            whileTap={{ scale: 0.9 }}
            aria-label={t('nav.quickJump')}
            aria-expanded={open}
            aria-haspopup="dialog"
            className={`fixed right-6 ${offset} z-30 w-12 h-12 rounded-full bg-krown-dark/90 backdrop-blur-xl border border-krown-red/40 text-white shadow-glow flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-krown-red`}
          >
            <Compass className="w-5 h-5 text-krown-red" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && [
          <motion.div
            key="quick-jump-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />,
          <motion.div
            key="quick-jump-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-jump-title"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-x-0 bottom-0 z-[70] max-h-[85dvh] overflow-y-auto overscroll-contain rounded-t-3xl border-t border-white/10 bg-krown-dark/95 backdrop-blur-xl px-4 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 id="quick-jump-title" className="flex items-center gap-2 text-base font-bold text-white">
                <Compass className="w-5 h-5 text-krown-red" aria-hidden="true" />
                {t('nav.quickJump')}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label={t('nav.closeMenu')}
                className="min-w-[48px] min-h-[48px] -mr-2 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <ul className="grid grid-cols-3 gap-2">
              {NAV_ITEMS.map((item, i) => {
                const active = isNavActive(item, pathname, hash);
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * i }}
                  >
                    <Link
                      to={item.to}
                      onClick={close}
                      aria-current={active ? 'page' : undefined}
                      className={`flex h-full min-h-[76px] flex-col items-center justify-center gap-1.5 rounded-2xl border px-2 py-3 text-center transition-colors ${
                        active
                          ? 'border-krown-red/60 bg-krown-red/15 text-white'
                          : 'border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${active ? 'text-krown-red' : 'text-krown-orange'}`} aria-hidden="true" />
                      <span className="text-[11px] font-medium leading-tight">{t(item.labelKey)}</span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>,
        ]}
      </AnimatePresence>
    </div>
  );
}
