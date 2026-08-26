import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Crown } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { brandLogos } from '../data/brandLogos';

const rowOneLogos = brandLogos.filter((_, index) => index % 2 === 0);
const rowTwoLogos = brandLogos.filter((_, index) => index % 2 === 1);

export default function LogoPortfolio() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="portfolio" className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-krown-black via-krown-dark/30 to-krown-black" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto" ref={ref}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 sm:mb-6 glass rounded-full">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Crown className="w-4 h-4 text-krown-red" />
              </motion.div>
              <span className="text-sm text-white/70">{t('portfolio.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t('portfolio.title')}
            </h2>
            <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto px-4">
              {t('portfolio.subtitle')}
            </p>
            <p className="mt-3 text-sm text-white/40">{brandLogos.length} logos displayed</p>
          </motion.div>

          {/* Row 1 - Left to Right */}
          <div className="relative overflow-hidden mb-6">
            <motion.div
              className="flex gap-6 sm:gap-8 will-change-transform"
              animate={{ x: [0, -1000, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              {[...rowOneLogos, ...rowOneLogos].map((logo, index) => (
                <Link key={`${logo.id}-row1-${index}`} to={`/design/${logo.id}`}>
                  <motion.div
                    className="flex-shrink-0 w-32 sm:w-40 h-32 sm:h-40 glass-card rounded-2xl flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                  <div className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${logo.gradient} flex items-center justify-center p-4 overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                        backgroundSize: '20px 20px',
                      }} />
                    </div>

                    {/* Logo Image */}
                    <motion.div
                      className="relative w-full h-full rounded-xl design-image-wrapper light-bg border border-white/20 flex items-center justify-center backdrop-blur-sm overflow-hidden p-2"
                      whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <img 
                        src={logo.image} 
                        alt={logo.name} 
                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-110 design-image-shadow" 
                      />
                    </motion.div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-krown-red/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                      <div className="w-full">
                        <h3 className="text-xs font-bold text-white mb-0.5 truncate">{logo.name}</h3>
                        <p className="text-[10px] text-white/80 truncate">{logo.category}</p>
                      </div>
                    </div>
                    {logo.badge && (
                      <span className="absolute top-2 left-2 rounded-full bg-krown-red px-2 py-1 text-[9px] font-semibold text-white">
                        {logo.badge}
                      </span>
                    )}
                  </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Row 2 - Right to Left */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-6 sm:gap-8 will-change-transform"
              animate={{ x: [-1000, 0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...rowTwoLogos, ...rowTwoLogos].map((logo, index) => (
                <Link key={`${logo.id}-row2-${index}`} to={`/design/${logo.id}`}>
                  <motion.div
                    className="flex-shrink-0 w-32 sm:w-40 h-32 sm:h-40 glass-card rounded-2xl flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                  <div className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${logo.gradient} flex items-center justify-center p-4 overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                        backgroundSize: '20px 20px',
                      }} />
                    </div>

                    {/* Logo Image */}
                    <motion.div
                      className="relative w-full h-full rounded-xl design-image-wrapper light-bg border border-white/20 flex items-center justify-center backdrop-blur-sm overflow-hidden p-2"
                      whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <img 
                        src={logo.image} 
                        alt={logo.name} 
                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-110 design-image-shadow" 
                      />
                    </motion.div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-krown-red/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                      <div className="w-full">
                        <h3 className="text-xs font-bold text-white mb-0.5 truncate">{logo.name}</h3>
                        <p className="text-[10px] text-white/80 truncate">{logo.category}</p>
                      </div>
                    </div>
                    {logo.badge && (
                      <span className="absolute top-2 left-2 rounded-full bg-krown-red px-2 py-1 text-[9px] font-semibold text-white">
                        {logo.badge}
                      </span>
                    )}
                  </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12 sm:mt-16 flex justify-center"
          >
            <Link to="/all-designs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-krown-red to-krown-red-dark text-white font-medium rounded-full hover:shadow-glow transition-all"
              >
                {t('portfolio.cta')}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
