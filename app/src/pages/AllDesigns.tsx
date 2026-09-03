import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { logos } from '../data/logos';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Sparkles } from 'lucide-react';

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
                ? `${logos.length} logos de marques créatifs` 
                : `${logos.length} creative brand logos`}
            </p>
          </div>

          {/* Designs Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
          >
            {logos.map((logo, index) => (
              <motion.div
                key={logo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link to={`/design/${logo.id}`}>
                  <div className="glass-card rounded-2xl p-4 hover:scale-105 transition-transform cursor-pointer border border-white/10 hover:border-krown-red/30">
                    <div className="bg-white aspect-square flex items-center justify-center mb-3 rounded-xl">
                      <img 
                        src={logo.image} 
                        alt={logo.name}
                        className="w-full h-full object-contain max-h-[120px]"
                      />
                    </div>
                    <h3 className="text-sm font-bold text-white truncate mb-1">{logo.name}</h3>
                    <p className="text-xs text-white/60 truncate">{logo.industry}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Need Branding CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16"
          >
            <div className="glass-card rounded-3xl p-8 sm:p-12 border border-krown-red/20 relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-krown-red/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-krown-orange/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 text-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-krown-red to-krown-red-dark mb-6"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {language === 'fr' ? 'Besoin d\'un logo personnalisé ?' : 'Need a Custom Logo?'}
                </h2>

                <p className="text-base sm:text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                  {language === 'fr'
                    ? 'Laissez nos experts créer une identité de marque unique qui se démarque. Transformez votre vision en réalité.'
                    : 'Let our experts create a unique brand identity that stands out. Transform your vision into reality.'}
                </p>

                <motion.a
                  href="/#branding"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-krown-red to-krown-orange text-white font-semibold rounded-xl hover:shadow-glow transition-all"
                  style={{ backgroundSize: '200% auto' }}
                >
                  <Sparkles className="w-5 h-5" />
                  {language === 'fr' ? 'Commencer Votre Projet' : 'Start Your Project'}
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
