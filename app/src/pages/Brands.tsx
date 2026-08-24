import { motion } from 'framer-motion';
import { ArrowLeft, Download, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingCTA from '../components/FloatingCTA';
import { brandLogos } from '../data/brandLogos';
import { useLanguage } from '../contexts/LanguageContext';

export default function Brands() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-custom text-white overflow-x-hidden" style={{ backgroundImage: 'url(/assets/background.png)' }}>
      <Header />
      <main className="relative z-10 px-4 pb-20 pt-32 sm:px-6 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-7xl">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 hover:text-krown-red">
            <ArrowLeft className="h-4 w-4" />
            {language === 'fr' ? 'Retour à l’accueil' : 'Back to home'}
          </Link>
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm uppercase tracking-wider text-krown-red">Brands We’ve Shaped</p>
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Logo Design Gallery</h1>
            <p className="mx-auto max-w-2xl text-white/60">{brandLogos.length} complete logo designs from the Krown Creative Factory portfolio.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {brandLogos.map((logo, index) => (
              <motion.article
                key={logo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.02 }}
                className="group overflow-hidden rounded-xl border border-white/10 bg-white/5"
              >
                <div className={`relative aspect-square bg-gradient-to-br ${logo.gradient} p-4`}>
                  <img src={logo.image} alt={logo.name} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" />
                  {logo.badge && <span className="absolute left-6 top-6 rounded-full bg-krown-red px-2 py-1 text-xs font-semibold">{logo.badge}</span>}
                </div>
                <div className="p-4">
                  <h2 className="truncate font-bold">{logo.name}</h2>
                  <p className="mt-1 text-sm text-white/50">{logo.category}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-white/60">
                    <span className="text-krown-red">{logo.price ?? 'Contact us'}</span>
                    {logo.downloads !== undefined && <span className="flex items-center gap-1"><Download className="h-4 w-4" />{logo.downloads}</span>}
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-xs text-white/50">
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /> Portfolio</span>
                    {logo.badge && <span className="flex items-center gap-1"><Sparkles className="h-3.5 w-3.5 text-krown-orange" /> Featured</span>}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
