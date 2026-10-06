import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  reason: string;
}

export default function UpgradeModal({ open, onClose, reason }: UpgradeModalProps) {
  const { language } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      previous?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="upgrade-title"
            aria-describedby="upgrade-reason"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-b from-krown-dark to-krown-black p-8 rounded-2xl max-w-md w-full border border-white/10 max-h-[90vh] overflow-y-auto"
          >
            <h2 id="upgrade-title" className="text-2xl font-bold text-white mb-2">
              {language === 'fr' ? '🚀 Passer à Pro' : '🚀 Upgrade to Pro'}
            </h2>
            <p id="upgrade-reason" className="text-white/80 mb-6">{reason}</p>

            <div className="space-y-4">
              {/* Free Tier */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="font-bold text-white">
                  {language === 'fr' ? 'Plan Gratuit' : 'Free Plan'}
                </h3>
                <p className="text-white/60 text-sm">
                  {language === 'fr' ? '12 téléchargements gratuits' : '12 free downloads'}
                </p>
                <p className="text-lg font-bold text-white">
                  {language === 'fr' ? 'Gratuit' : 'Free'}
                </p>
                <p className="text-xs text-white/40 mt-2">
                  ✅ {language === 'fr' ? '12 téléchargements inclus' : '12 downloads included'}
                </p>
                <p className="text-xs text-white/40">
                  💧 {language === 'fr' ? 'Fichiers avec filigrane Krown' : 'Krown-watermarked files'}
                </p>
              </div>

              {/* Pro Plan */}
              <div className="bg-white/5 p-4 rounded-xl border border-krown-red/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-krown-red px-3 py-1 text-xs font-bold rounded-bl-lg text-white">
                  POPULAR
                </div>
                <h3 className="font-bold text-white">
                  {language === 'fr' ? 'Plan Pro' : 'Pro Plan'}
                </h3>
                <p className="text-white/60 text-sm">
                  {language === 'fr' ? 'Téléchargements illimités' : 'Unlimited downloads'}
                </p>
                <p className="text-2xl font-bold text-krown-red">
                  {language === 'fr' ? '₦5,000/mois' : '₦5,000/month'}
                </p>
                <p className="text-xs text-white/40 mt-2">
                  ✅ {language === 'fr' ? 'Téléchargements illimités' : 'Unlimited downloads'}
                </p>
                <p className="text-xs text-white/40">
                  ✨ {language === 'fr' ? 'Fichiers sans filigrane, pleine résolution' : 'Clean, full-resolution files — no watermark'}
                </p>
                <p className="text-xs text-white/40">
                  ✅ {language === 'fr' ? 'Tous les designs débloqués' : 'All designs unlocked'}
                </p>
              </div>

              {/* Advanced Plan */}
              <div className="bg-white/5 p-4 rounded-xl border border-krown-orange/30">
                <h3 className="font-bold text-white">
                  {language === 'fr' ? 'Plan Avancé' : 'Advanced Plan'}
                </h3>
                <p className="text-white/60 text-sm">
                  {language === 'fr' ? 'Illimité + accès prioritaire' : 'Unlimited + priority access'}
                </p>
                <p className="text-2xl font-bold text-krown-orange">
                  {language === 'fr' ? '₦10,000/mois' : '₦10,000/month'}
                </p>
                <p className="text-xs text-white/40 mt-2">
                  ✅ {language === 'fr' ? 'Téléchargements illimités' : 'Unlimited downloads'}
                </p>
                <p className="text-xs text-white/40">
                  ✨ {language === 'fr' ? 'Fichiers sans filigrane, pleine résolution' : 'Clean, full-resolution files — no watermark'}
                </p>
                <p className="text-xs text-white/40">
                  ✅ {language === 'fr' ? 'Tous les designs débloqués' : 'All designs unlocked'}
                </p>
                <p className="text-xs text-white/40">
                  ✅ {language === 'fr' ? 'Support prioritaire' : 'Priority support'}
                </p>
              </div>
            </div>

            <button className="w-full mt-6 py-3 min-h-[48px] bg-gradient-to-r from-krown-red to-krown-orange rounded-xl font-bold text-white hover:scale-105 transition-transform">
              {language === 'fr' ? 'Passer à Pro' : 'Upgrade Now'}
            </button>

            <button
              ref={closeRef}
              onClick={onClose}
              className="w-full mt-2 py-2 min-h-[44px] text-white/60 hover:text-white transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              {language === 'fr' ? 'Peut-être plus tard' : 'Maybe later'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
