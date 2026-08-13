import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mic, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const podcastPlatforms = [
  {
    name: 'Spotify',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
    href: 'https://open.spotify.com',
    color: 'hover:text-[#1DB954] hover:bg-[#1DB954]/10',
  },
  {
    name: 'Apple Podcasts',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor">
        <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm6.525 2.568c.516 0 .922.073 1.22.218.298.146.497.332.596.558l.137.346-.463 2.453c-.114.53-.335.937-.662 1.22-.328.284-.724.426-1.19.426-.346 0-.642-.084-.889-.252a1.42 1.42 0 01-.478-.567 1.79 1.79 0 01-.138-.694c0-.447.114-.85.342-1.21.228-.358.55-.64.965-.845.416-.205.872-.308 1.37-.308l-.184.01c-.397 0-.72.12-.967.36-.248.24-.39.562-.428.965l-.363 1.91c-.026.158-.086.28-.18.366a.435.435 0 01-.307.112.42.42 0 01-.308-.123.438.438 0 01-.135-.313c0-.09.016-.176.048-.26l.665-3.5a.834.834 0 01.165-.353.385.385 0 01.305-.13c.122 0 .22.044.294.13.073.087.11.2.11.34 0 .046-.006.096-.017.15l-.058.31c.3-.53.646-.917 1.037-1.16.39-.243.838-.364 1.342-.364zm-3.595 5.67c.447 0 .855.082 1.224.247.37.165.67.392.902.682.232.29.363.62.392.99H8.832c.073-.39.267-.703.582-.94.315-.236.69-.355 1.126-.355.158 0 .305.02.44.06.136-.22.305-.39.508-.51a1.26 1.26 0 01.668-.174zm6.653.108c.69 0 1.258.225 1.705.676.447.45.67 1.017.67 1.7 0 .682-.225 1.25-.676 1.7-.45.452-1.02.677-1.705.677-.69 0-1.26-.225-1.71-.676-.452-.45-.677-1.018-.677-1.7 0-.683.227-1.25.68-1.7.452-.452 1.023-.677 1.713-.677zm-6.567.95c-.346 0-.66.09-.94.27-.28.18-.478.418-.596.714h3.07c-.11-.296-.302-.534-.576-.714a1.524 1.524 0 00-.958-.27zm6.567.38c-.49 0-.895.17-1.214.51-.32.34-.478.76-.478 1.26s.16.92.48 1.26c.32.34.724.51 1.213.51.494 0 .9-.17 1.22-.51.318-.34.478-.76.478-1.26s-.16-.92-.48-1.26c-.32-.34-.725-.51-1.22-.51z"/>
      </svg>
    ),
    href: 'https://podcasts.apple.com',
    color: 'hover:text-[#9933FF] hover:bg-[#9933FF]/10',
  },
  {
    name: 'Google Podcasts',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor">
        <circle cx="12" cy="12" r="3.5"/>
        <circle cx="3.5" cy="12" r="1.5" fill="#EA4335"/>
        <circle cx="20.5" cy="12" r="1.5" fill="#34A853"/>
        <circle cx="12" cy="3.5" r="1.5" fill="#FAB908"/>
        <circle cx="12" cy="20.5" r="1.5" fill="#4285F4"/>
        <circle cx="6.05" cy="6.05" r="1.5" fill="#EA4335"/>
        <circle cx="17.95" cy="17.95" r="1.5" fill="#34A853"/>
        <circle cx="6.05" cy="17.95" r="1.5" fill="#FAB908"/>
        <circle cx="17.95" cy="6.05" r="1.5" fill="#4285F4"/>
      </svg>
    ),
    href: 'https://podcasts.google.com',
    color: 'hover:text-[#FAB908] hover:bg-[#FAB908]/10',
  },
  {
    name: 'Boomplay',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
      </svg>
    ),
    href: 'https://www.boomplay.com',
    color: 'hover:text-[#E85D04] hover:bg-[#E85D04]/10',
  },
];

export default function Podcasts() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="podcasts" className="relative py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-krown-black via-krown-dark/30 to-krown-black" />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-5xl mx-auto" ref={ref}>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 sm:mb-6 glass rounded-full"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Mic className="w-4 h-4 text-krown-red" />
              </motion.div>
              <span className="text-sm text-white/70">{t('podcasts.title')}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              {t('podcasts.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto px-4"
            >
              {t('podcasts.subtitle')}
            </motion.p>
          </motion.div>

          {/* Podcast Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Podcast Artwork */}
                <div className="relative lg:w-2/5 aspect-square lg:aspect-auto lg:min-h-[400px] bg-gradient-to-br from-krown-red/30 via-krown-dark to-krown-black flex items-center justify-center p-8 sm:p-12">
                  {/* Decorative Elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-krown-red/20 rounded-full blur-2xl" />
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-krown-red/10 rounded-full blur-3xl" />
                  </div>
                  
                  {/* Logo Container */}
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        '0 0 30px rgba(232, 93, 4, 0.2)',
                        '0 0 60px rgba(232, 93, 4, 0.4)',
                        '0 0 30px rgba(232, 93, 4, 0.2)',
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-br from-krown-orange to-krown-orange-dark flex items-center justify-center"
                  >
                    <div className="absolute inset-2 rounded-2xl bg-krown-black flex items-center justify-center">
                      <div className="text-center">
                        <Mic className="w-12 h-12 sm:w-16 sm:h-16 text-krown-orange mx-auto mb-2" />
                        <div className="text-lg sm:text-xl font-bold text-white">KCF</div>
                        <div className="text-[10px] sm:text-xs text-white/50 tracking-wider">PODCAST</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Sound Waves */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-1">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: [8, 20 + Math.random() * 20, 8],
                        }}
                        transition={{
                          duration: 1 + Math.random(),
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                        className="w-1 sm:w-1.5 bg-krown-orange/60 rounded-full"
                        style={{ height: 8 }}
                      />
                    ))}
                  </div>
                </div>

                {/* Podcast Info */}
                <div className="lg:w-3/5 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                      The KCF Podcast
                    </h3>
                    <p className="text-sm sm:text-base text-white/50 leading-relaxed">
                      Join us as we dive deep into the world of graphic design, creativity, 
                      and building successful creative businesses in Africa. Featuring interviews 
                      with top designers, entrepreneurs, and industry leaders.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6 sm:gap-8 mb-8">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-white">50+</div>
                      <div className="text-xs text-white/40">Episodes</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-white">10K+</div>
                      <div className="text-xs text-white/40">Listeners</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-white">Weekly</div>
                      <div className="text-xs text-white/40">New Episodes</div>
                    </div>
                  </div>

                  {/* Platform Links */}
                  <div>
                    <p className="text-xs sm:text-sm text-white/40 mb-3 uppercase tracking-wider">
                      Listen on
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {podcastPlatforms.map((platform) => (
                        <motion.a
                          key={platform.name}
                          href={platform.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 transition-all duration-300 ${platform.color}`}
                        >
                          {platform.icon}
                          <span className="text-xs sm:text-sm font-medium">{platform.name}</span>
                          <ExternalLink className="w-3 h-3 opacity-50" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
