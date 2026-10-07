import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Coins, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { useModalA11y } from '../hooks/use-modal-a11y';
import { CREDIT_PACKS, formatNaira, pricePerImage, type CreditPack } from '../data/pricing';
import { startPackPurchase } from '../lib/purchase';

interface PacksModalProps {
  open: boolean;
  onClose: () => void;
  reason: string;
}

/** Credit-pack picker (replaces the old monthly Pro/Advanced upgrade modal). */
export default function PacksModal({ open, onClose, reason }: PacksModalProps) {
  const { language, t } = useLanguage();
  const { user } = useUser();
  const [selected, setSelected] = useState<CreditPack['id']>('pack5');
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useModalA11y(open, onClose, panelRef, closeRef);

  const pack = CREDIT_PACKS.find((p) => p.id === selected) ?? CREDIT_PACKS[0];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 flex items-end sm:items-center justify-center z-[60] sm:p-4"
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="packs-title"
            aria-describedby="packs-reason"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-gradient-to-b from-krown-dark to-krown-black w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl border border-white/10 max-h-[92dvh] overflow-y-auto"
          >
            <div className="p-6 sm:p-8 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={t('packs.close')}
                className="absolute top-3 right-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <h2 id="packs-title" className="text-2xl font-bold text-white mb-2 pr-10 flex items-center gap-2">
                <Coins className="w-6 h-6 text-krown-orange" aria-hidden="true" />
                {t('packs.title')}
              </h2>
              <p id="packs-reason" className="text-white/70 text-sm mb-5">{reason}</p>

              {user.signedIn && (
                <p className="mb-4 text-xs text-white/50">
                  {t('packs.balance').replace('{count}', String(user.credits))}
                </p>
              )}

              <div role="radiogroup" aria-label={t('packs.title')} className="space-y-3">
                {CREDIT_PACKS.map((p) => {
                  const active = p.id === selected;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setSelected(p.id)}
                      className={`relative w-full text-left p-4 rounded-xl border-2 transition-all min-h-[72px] focus:outline-none focus-visible:ring-2 focus-visible:ring-krown-orange ${
                        active ? 'border-krown-orange bg-krown-orange/10' : 'border-white/10 bg-white/5 hover:border-white/30'
                      }`}
                    >
                      {p.badge && (
                        <span className="absolute top-0 right-0 bg-krown-red px-2.5 py-0.5 text-[10px] font-bold rounded-bl-lg rounded-tr-lg text-white">
                          {p.badge[language]}
                        </span>
                      )}
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            active ? 'border-krown-orange bg-krown-orange' : 'border-white/30'
                          }`}
                        >
                          {active && <Check className="w-3 h-3 text-white" aria-hidden="true" />}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white">{p.name[language]}</p>
                          <p className="text-xs text-white/50">{p.blurb[language]}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-lg font-bold text-krown-orange">{formatNaira(p.price)}</p>
                          <p className="text-[10px] text-white/40">
                            {t('packs.perImage').replace('{price}', formatNaira(pricePerImage(p)))}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <ul className="mt-5 space-y-1.5 text-xs text-white/50">
                <li>✨ {t('packs.benefitClean')}</li>
                <li>♾️ {t('packs.never')}</li>
                <li>🗂️ {t('packs.allCategories')}</li>
              </ul>

              <button
                type="button"
                onClick={() => startPackPurchase(pack, language, user.email)}
                className="w-full mt-6 min-h-[52px] py-3 bg-gradient-to-r from-krown-red to-krown-orange rounded-xl font-bold text-white hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
              >
                {t('packs.buyFor').replace('{pack}', pack.name[language]).replace('{price}', formatNaira(pack.price))}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <p className="mt-2 text-center text-[11px] text-white/40">{t('packs.paymentHint')}</p>

              <div className="mt-4 flex items-center justify-between text-sm">
                <Link to="/pricing" onClick={onClose} className="text-krown-orange hover:underline">
                  {t('packs.seePricing')}
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] px-2 text-white/60 hover:text-white transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  {t('packs.later')}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
