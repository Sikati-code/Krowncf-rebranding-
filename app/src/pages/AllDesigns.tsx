import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { brandLogos } from '../data/brandLogos';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';

export default function AllDesigns() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-krown-black via-krown-dark/50 to-krown-black">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/#portfolio"
              className="inline-flex items-center gap-2 text-krown-red hover:text-krown-orange transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === 'fr' ? 'Retour' : 'Back'}
            </Link>
            <p className="mb-2 text-sm uppercase tracking-wider text-krown-red">{t('portfolio.title')}</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
              {language === 'fr' ? 'Tous les Designs' : 'All Designs'}
            </h1>
            <p className="text-white/60 text-lg">
              {language === 'fr' 
                ? `${brandLogos.length} logos de marques créatifs` 
                : `${brandLogos.length} creative brand logos`}
            </p>
          </div>

          {/* Designs Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
          >
            {brandLogos.map((logo, index) => (
              <motion.div
                key={logo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link to={`/design/${logo.id}`}>
                  <div className="glass-card rounded-2xl p-4 hover:scale-105 transition-transform cursor-pointer border border-white/10 hover:border-krown-red/30">
                    <div className="design-image-wrapper light-bg aspect-square flex items-center justify-center mb-3 rounded-xl">
                      <img 
                        src={logo.image} 
                        alt={logo.name}
                        className="w-full h-full object-contain max-h-[120px]"
                      />
                    </div>
                    <h3 className="text-sm font-bold text-white truncate mb-1">{logo.name}</h3>
                    <p className="text-xs text-white/60 truncate">{logo.category}</p>
                    <p className="text-xs text-krown-red font-bold mt-1">{logo.price}</p>
                    {logo.badge && (
                      <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        logo.badge === 'Premium' ? 'bg-krown-orange text-white' : 'bg-krown-red text-white'
                      }`}>
                        {logo.badge}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
