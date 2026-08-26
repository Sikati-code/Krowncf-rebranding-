import { useLanguage } from '../contexts/LanguageContext';

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  reason: string;
}

export default function UpgradeModal({ open, onClose, reason }: UpgradeModalProps) {
  const { language } = useLanguage();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-krown-dark to-krown-black p-8 rounded-2xl max-w-md w-full border border-white/10 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-2">
          {language === 'fr' ? '🚀 Passer à Pro' : '🚀 Upgrade to Pro'}
        </h2>
        <p className="text-white/80 mb-6">{reason}</p>
        
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
            <p className="text-2xl font-bold text-krown-red">₦5,000/month</p>
            <p className="text-xs text-white/40 mt-2">
              ✅ {language === 'fr' ? 'Téléchargements illimités' : 'Unlimited downloads'}
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
            <p className="text-2xl font-bold text-krown-orange">₦10,000/month</p>
            <p className="text-xs text-white/40 mt-2">
              ✅ {language === 'fr' ? 'Téléchargements illimités' : 'Unlimited downloads'}
            </p>
            <p className="text-xs text-white/40">
              ✅ {language === 'fr' ? 'Tous les designs débloqués' : 'All designs unlocked'}
            </p>
            <p className="text-xs text-white/40">
              ✅ {language === 'fr' ? 'Support prioritaire' : 'Priority support'}
            </p>
          </div>
        </div>

        <button className="w-full mt-6 py-3 bg-gradient-to-r from-krown-red to-krown-orange rounded-xl font-bold text-white hover:scale-105 transition-transform">
          {language === 'fr' ? 'Passer à Pro' : 'Upgrade Now'}
        </button>

        <button 
          onClick={onClose}
          className="w-full mt-2 py-2 text-white/60 hover:text-white transition-colors"
        >
          {language === 'fr' ? 'Peut-être plus tard' : 'Maybe later'}
        </button>
      </div>
    </div>
  );
}
