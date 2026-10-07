import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

type Bar = { height: number; duration: number }

const INITIAL_BARS: Bar[] = Array.from({ length: 8 }).map(() => ({
  height: 8 + Math.random() * 20,
  duration: 1 + Math.random(),
}));
import { Mic, ExternalLink, Youtube } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Official podcast links. A platform without a URL is not shown.
const SPOTIFY_URL = 'https://open.spotify.com/show/5UBM3i3aFxAz4zYR1SW8Ef';
const YOUTUBE_URL = 'https://youtube.com/playlist?list=PLINg5DBWIOlk&si=c6fr_JtEtpIWj7eI';

const podcastPlatforms = [
  {
    key: 'spotify',
    labelKey: 'podcasts.spotify',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
    href: SPOTIFY_URL,
    color: 'hover:text-[#1DB954] hover:bg-[#1DB954]/10',
  },
  {
    key: 'youtube',
    labelKey: 'podcasts.youtube',
    icon: <Youtube className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />,
    href: YOUTUBE_URL,
    color: 'hover:text-[#FF0000] hover:bg-[#FF0000]/10',
  },
].filter((platform) => platform.href);

const PODCAST_NAME_PARTS = ['Kreativity=', 'Intelligence+', 'Fun'];

/** The podcast name has no spaces: allow line breaks after "=" and "+" so it wraps on phones. */
const breakable = (text: string) =>
  text.split(/(?<=[=+])/).map((part, i) => (
    <span key={i}>
      {i > 0 && <wbr />}
      {part}
    </span>
  ));

export default function Podcasts() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [bars] = useState<Bar[]>(() => INITIAL_BARS);

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
                        <div className="text-sm sm:text-base font-bold text-white leading-tight">
                          {PODCAST_NAME_PARTS.map((part) => (
                            <span key={part} className="block">{part}</span>
                          ))}
                        </div>
                        <div className="text-[10px] sm:text-xs text-white/50 tracking-wider">PODCAST</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Sound Waves */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-1">
                    {bars.map((b: Bar, i: number) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: [8, b.height, 8],
                        }}
                        transition={{
                          duration: b.duration,
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
                      {breakable(t('podcasts.showName'))}
                    </h3>
                    <p className="text-sm sm:text-base text-white/50 leading-relaxed">
                      {t('podcasts.description')}
                    </p>
                    <p className="mt-4 text-sm sm:text-base text-white/70 italic font-medium">
                      {t('podcasts.tagline')}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6 sm:gap-8 mb-8">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-white">50+</div>
                      <div className="text-xs text-white/40">{t('podcasts.episodes')}</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-white">10K+</div>
                      <div className="text-xs text-white/40">{t('podcasts.listeners')}</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-white">{t('podcasts.weekly')}</div>
                      <div className="text-xs text-white/40">{t('podcasts.newEpisodes')}</div>
                    </div>
                  </div>

                  {/* Platform Links */}
                  <div>
                    <p className="text-xs sm:text-sm text-white/40 mb-3 uppercase tracking-wider">
                      {t('podcasts.listenOn')}
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {podcastPlatforms.map((platform) => (
                        <motion.a
                          key={platform.key}
                          href={platform.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 transition-all duration-300 ${platform.color}`}
                        >
                          {platform.icon}
                          <span className="text-xs sm:text-sm font-medium">{t(platform.labelKey)}</span>
                          <ExternalLink className="w-3 h-3 opacity-50" aria-hidden="true" />
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
