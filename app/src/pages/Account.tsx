import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Coins, Download, Droplets, LogOut, Sparkles, UserRound } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingCTA from '../components/FloatingCTA';
import LoginModal from '../components/LoginModal';
import PackStrip from '../components/PackStrip';
import PacksModal from '../components/PacksModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { CREDIT_PACKS } from '../data/pricing';

export default function Account() {
  const { language, t } = useLanguage();
  const { user, signOut } = useUser();
  const [loginOpen, setLoginOpen] = useState(false);
  const [packsOpen, setPacksOpen] = useState(false);
  const dateFmt = new Intl.DateTimeFormat(language === 'fr' ? 'fr-FR' : 'en-GB', { dateStyle: 'medium' });

  return (
    <div className="min-h-screen bg-custom text-white overflow-x-hidden" style={{ backgroundImage: 'url(/assets/background.png)' }}>
      <Header />
      <main className="pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
            <span className="w-14 h-14 rounded-2xl bg-krown-red/20 flex items-center justify-center">
              <UserRound className="w-7 h-7 text-krown-red" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold truncate">
                {user.signedIn ? user.name : t('account.title')}
              </h1>
              <p className="text-sm text-white/50 truncate">{user.signedIn ? user.email : t('account.signedOut')}</p>
            </div>
          </motion.div>

          {!user.signedIn ? (
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className="w-full min-h-[48px] rounded-xl bg-krown-red font-bold hover:bg-krown-red-dark transition-colors"
            >
              {t('account.signIn')}
            </button>
          ) : (
            <>
              {/* Credit balance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1">
                  <p className="text-sm text-white/50">{t('account.credits')}</p>
                  <p className="text-4xl font-bold text-krown-orange flex items-center gap-2">
                    <Coins className="w-8 h-8" aria-hidden="true" />
                    {user.credits}
                  </p>
                  <p className="text-xs text-white/40 mt-1">{t('packs.never')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPacksOpen(true)}
                  className="min-h-[48px] px-6 rounded-xl bg-gradient-to-r from-krown-red to-krown-orange font-bold hover:scale-[1.02] transition-transform"
                >
                  {t('account.buyMore')}
                </button>
              </motion.div>

              <PackStrip onSelect={() => setPacksOpen(true)} />

              {/* Download history */}
              <section className="glass-card rounded-2xl p-6">
                <h2 className="font-bold mb-4">{t('account.history')}</h2>
                {user.downloadHistory.length === 0 ? (
                  <p className="text-sm text-white/50">
                    {t('account.noDownloads')}{' '}
                    <Link to="/#categories" className="text-krown-orange hover:underline">{t('account.browse')}</Link>
                  </p>
                ) : (
                  <ul className="divide-y divide-white/5">
                    {user.downloadHistory.slice(0, 30).map((d) => (
                      <li key={`${d.designId}-${d.downloadedAt}`} className="flex items-center gap-3 py-2.5 text-sm">
                        {d.watermarked ? (
                          <Droplets className="w-4 h-4 text-white/40 shrink-0" aria-hidden="true" />
                        ) : (
                          <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" aria-hidden="true" />
                        )}
                        <Link to={`/design/${d.designId}`} className="flex-1 min-w-0 truncate hover:text-krown-orange">
                          {d.title}
                        </Link>
                        <span className="text-xs text-white/40 shrink-0">
                          {d.watermarked ? t('account.watermarked') : t('account.clean')} · {dateFmt.format(new Date(d.downloadedAt))}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {user.ownedDesigns.length > 0 && (
                  <p className="mt-4 text-xs text-white/40 flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    {t('account.owned').replace('{count}', String(user.ownedDesigns.length))}
                  </p>
                )}
              </section>

              {/* Purchases */}
              {user.purchases.length > 0 && (
                <section className="glass-card rounded-2xl p-6">
                  <h2 className="font-bold mb-4">{t('account.purchases')}</h2>
                  <ul className="divide-y divide-white/5 text-sm">
                    {user.purchases.map((p) => (
                      <li key={p.purchasedAt} className="flex justify-between py-2.5">
                        <span>{CREDIT_PACKS.find((c) => c.id === p.packId)?.name[language] ?? p.packId}</span>
                        <span className="text-white/50">+{p.credits} · {dateFmt.format(new Date(p.purchasedAt))}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <button
                type="button"
                onClick={signOut}
                className="inline-flex items-center gap-2 min-h-[44px] text-sm text-white/50 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
                {t('account.signOut')}
              </button>
            </>
          )}
        </div>
      </main>
      <Footer />
      <FloatingCTA />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <PacksModal open={packsOpen} onClose={() => setPacksOpen(false)} reason={t('packs.reasonClean')} />
    </div>
  );
}
