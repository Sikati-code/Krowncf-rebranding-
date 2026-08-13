import { motion } from 'framer-motion';
import { Search, Sparkles, ArrowRight, Zap, TrendingUp, Users, Layers } from 'lucide-react';
import AnimatedLogoSilhouette from '../components/AnimatedLogoSilhouette';
import { useLanguage } from '../contexts/LanguageContext';

const stats = [
  { icon: Layers, value: '15,000+', label: 'Designs' },
  { icon: TrendingUp, value: '125,000+', label: 'Downloads' },
  { icon: Users, value: '8,500+', label: 'Happy Clients' },
  { icon: Zap, value: '8', label: 'Categories' },
];

export default function Hero() {
  const { t } = useLanguage();

  // Custom radial gradient for background is implemented directly in the JSX

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at center, #1a0205 0%, #000 100%)' }}
      />

      {/* Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-krown-red/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Animated Logo Silhouette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <AnimatedLogoSilhouette />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 sm:py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 sm:mb-8 glass rounded-full"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-krown-red" />
            </motion.div>
            <span className="text-sm text-white/80">{t('hero.badge')}</span>
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-2 py-0.5 text-[10px] font-bold text-krown-black bg-krown-red rounded-full"
            >
              {t('hero.new')}
            </motion.span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight mb-4 sm:mb-6"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white"
            >
              {t('hero.title1')}
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-gradient"
            >
              {t('hero.title2')}
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8 sm:mb-10 px-4"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mx-auto mb-8 sm:mb-10"
          >
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder={t('hero.search')}
                className="w-full h-12 sm:h-14 pl-6 pr-32 sm:pr-36 bg-white/5 border border-white/10 rounded-full text-sm sm:text-base text-white placeholder:text-white/30 focus:outline-none focus:border-krown-red/50 focus:bg-white/10 focus:shadow-glow transition-all duration-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-9 sm:h-10 px-4 sm:px-6 flex items-center gap-2 bg-krown-red text-white text-sm font-medium rounded-full hover:bg-krown-red-dark transition-colors duration-300"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16"
          >
            <motion.a
              href="#categories"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#categories')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-krown-red text-white font-medium rounded-full hover:bg-krown-red-dark transition-all duration-300 hover:shadow-glow"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Designs
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.a>
            <motion.a
              href="#training"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#training')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View Courses
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.9 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-4 sm:p-5 hover-lift group"
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3 + index * 0.5,
                    ease: "easeInOut"
                  }}
                >
                  <stat.icon className="w-5 h-5 text-krown-red mb-2 mx-auto group-hover:scale-110 transition-transform" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-white"
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs sm:text-sm text-white/50 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-krown-black to-transparent pointer-events-none" />
    </section>
  );
}
