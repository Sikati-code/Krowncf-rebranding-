import { motion } from 'framer-motion';
import { Check, Coins, Eye, Infinity as InfinityIcon, Layers, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingCTA from '../components/FloatingCTA';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { CREDIT_PACKS, formatNaira, pricePerImage } from '../data/pricing';
import { startPackPurchase } from '../lib/purchase';

export default function Pricing() {
  const { language, t } = useLanguage();
  const { user } = useUser();

  const facts = [
    { icon: Sparkles, text: t('packs.benefitClean') },
    { icon: InfinityIcon, text: t('packs.never') },
    { icon: Layers, text: t('packs.allCategories') },
    { icon: Eye, text: t('pricing.previewFree') },
  ];

  return (
    <div className="min-h-screen bg-custom text-white overflow-x-hidden" style={{ backgroundImage: 'url(/assets/background.png)' }}>
      <Header />
      <main className="relative pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 glass rounded-full">
              <Coins className="w-4 h-4 text-krown-orange" aria-hidden="true" />
              <span className="text-sm text-white/70">{t('pricing.badge')}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">{t('pricing.title')}</h1>
            <p className="text-white/60 max-w-2xl mx-auto">{t('pricing.subtitle')}</p>
            {user.signedIn && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-yellow-400/10 border border-yellow-400/30 px-4 py-1.5 text-sm text-yellow-300">
                <Coins className="w-4 h-4" aria-hidden="true" />
                {t('packs.balance').replace('{count}', String(user.credits))}
              </p>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CREDIT_PACKS.map((pack, i) => {
              const featured = pack.id === 'pack10';
              return (
                <motion.div
                  key={pack.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className={`relative glass-card rounded-2xl p-6 flex flex-col ${featured ? 'border-krown-orange/50 shadow-glow' : ''}`}
                >
                  {pack.badge && (
                    <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-krown-red to-krown-orange px-3 py-1 text-xs font-bold">
                      {pack.badge[language]}
                    </span>
                  )}
                  <h2 className="text-xl font-bold">{pack.name[language]}</h2>
                  <p className="text-sm text-white/50 mt-1">{pack.blurb[language]}</p>
                  <p className="mt-5 text-4xl font-bold text-krown-orange">{formatNaira(pack.price)}</p>
                  <p className="text-xs text-white/40 mt-1">
                    {t('packs.perImage').replace('{price}', formatNaira(pricePerImage(pack)))}
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-white/70 flex-1">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-krown-orange shrink-0" aria-hidden="true" />
                      {pack.credits === 1 ? t('pricing.creditOne') : t('pricing.credits').replace('{count}', String(pack.credits))}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-krown-orange shrink-0" aria-hidden="true" />
                      {t('packs.benefitClean')}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-krown-orange shrink-0" aria-hidden="true" />
                      {t('packs.never')}
                    </li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => startPackPurchase(pack, language, user.email)}
                    className={`mt-6 min-h-[48px] rounded-xl font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                      featured ? 'bg-gradient-to-r from-krown-red to-krown-orange text-white' : 'border border-white/25 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {t('packs.buy')}
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {facts.map((f) => (
              <div key={f.text} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                <f.icon className="w-5 h-5 text-krown-orange shrink-0" aria-hidden="true" />
                {f.text}
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-white/40">{t('packs.paymentHint')}</p>
        </div>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
