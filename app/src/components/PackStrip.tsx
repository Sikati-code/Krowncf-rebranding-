import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CREDIT_PACKS, formatNaira } from '../data/pricing';

/** Compact pack pricing shown under the download buttons on design pages. */
export default function PackStrip({ onSelect }: { onSelect: () => void }) {
  const { language, t } = useLanguage();

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <p className="text-xs font-semibold text-white/80">{t('packs.stripTitle')}</p>
        <Link to="/pricing" className="inline-flex items-center gap-1 text-xs text-krown-orange hover:underline">
          {t('packs.seePricing')}
          <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {CREDIT_PACKS.map((pack) => (
          <button
            key={pack.id}
            type="button"
            onClick={onSelect}
            className="relative min-h-[64px] rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-center hover:border-krown-orange/50 hover:bg-krown-orange/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-krown-orange"
          >
            {pack.badge && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-krown-orange px-1.5 py-px text-[9px] font-bold text-white">
                {pack.badge[language]}
              </span>
            )}
            <span className="block text-[11px] text-white/60 leading-tight">{pack.name[language]}</span>
            <span className="block text-sm font-bold text-white mt-0.5">{formatNaira(pack.price)}</span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-white/40 text-center">{t('packs.never')}</p>
    </div>
  );
}
