import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Music, Play, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
  color: string;
}

const songs: Song[] = [
  {
    id: 1,
    title: 'Creative Vibes',
    artist: 'KCF All Stars',
    cover: 'from-purple-600/40 to-blue-600/40',
    color: 'purple',
  },
  {
    id: 2,
    title: 'Design Flow',
    artist: 'Krown Beats',
    cover: 'from-krown-red/40 to-red-600/40',
    color: 'red',
  },
  {
    id: 3,
    title: 'Pixel Dreams',
    artist: 'The Creatives',
    cover: 'from-green-600/40 to-teal-600/40',
    color: 'green',
  },
  {
    id: 4,
    title: 'Canvas Nights',
    artist: 'KCF Collective',
    cover: 'from-pink-600/40 to-rose-600/40',
    color: 'pink',
  },
];

const streamingLinks = [
  {
    name: 'Spotify',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
    href: 'https://open.spotify.com',
    color: 'hover:text-[#1DB954] hover:bg-[#1DB954]/10',
  },
  {
    name: 'Apple Music',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.535 10.535 0 00-1.142-.15c-.26-.03-.46-.042-.66-.047C17.051.01 14.051 0 12.04 0c-2.01 0-5.01.01-5.855.068-.2.005-.4.017-.66.047-.376.043-.78.09-1.142.15-.69.11-1.326.33-1.877.726-1.118.733-1.863 1.733-2.18 3.043a9.225 9.225 0 00-.24 2.19c-.01.56-.01 1.18-.01 1.876s0 1.316.01 1.876a9.223 9.223 0 00.24 2.19c.317 1.31 1.062 2.31 2.18 3.043.55.396 1.187.616 1.877.726.362.06.766.107 1.142.15.26.03.46.042.66.047C7.03 23.99 10.03 24 12.04 24c2.01 0 5.01-.01 5.855-.068.2-.005.4-.017.66-.047.376-.043.78-.09 1.142-.15.69-.11 1.326-.33 1.877-.726 1.118-.733 1.863-1.733 2.18-3.043a9.229 9.229 0 00.24-2.19c.01-.56.01-1.18.01-1.876s0-1.316-.01-1.876zM9.545 15.568V8.432L15.454 12l-5.91 3.568z"/>
      </svg>
    ),
    href: 'https://music.apple.com',
    color: 'hover:text-[#FA2D48] hover:bg-[#FA2D48]/10',
  },
  {
    name: 'Boomplay',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
      </svg>
    ),
    href: 'https://www.boomplay.com',
    color: 'hover:text-[#E85D04] hover:bg-[#E85D04]/10',
  },
  {
    name: 'YouTube Music',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"/>
      </svg>
    ),
    href: 'https://music.youtube.com',
    color: 'hover:text-[#FF0000] hover:bg-[#FF0000]/10',
  },
  {
    name: 'Albums',
    icon: <Music className="w-4 h-4" />,
    href: '#albums',
    color: 'hover:text-[#1DB954] hover:bg-[#1DB954]/10',
  },
  {
    name: 'Music Videos',
    icon: <Play className="w-4 h-4" />,
    href: 'https://youtube.com/@KrownCreativeFactory',
    color: 'hover:text-[#FF0000] hover:bg-[#FF0000]/10',
    external: true,
  },
];

function SongCard({ song, index }: { song: Song; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="glass-card overflow-hidden hover-lift">
        {/* Cover Art */}
        <div className={`relative aspect-square bg-gradient-to-br ${song.cover} flex items-center justify-center overflow-hidden`}>
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '20px 20px',
            }} />
          </div>
          
          {/* Center Icon */}
          <div className="relative z-10">
            <Music className="w-16 h-16 text-white/80" />
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-full bg-krown-orange flex items-center justify-center cursor-pointer shadow-glow"
            >
              <Play className="w-6 h-6 text-white ml-1" fill="white" />
            </motion.div>
          </div>

          {/* Floating particles */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full" />
          <div className="absolute bottom-6 left-6 w-3 h-3 bg-white/10 rounded-full" />
        </div>

        {/* Song Info */}
        <div className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-krown-orange transition-colors">
            {song.title}
          </h3>
          <p className="text-sm text-white/50 mb-4">{song.artist}</p>

          {/* Streaming Links */}
          <div className="flex flex-wrap gap-1.5">
            {streamingLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={(link as any).external ? '_blank' : undefined}
                rel={(link as any).external ? 'noopener noreferrer' : undefined}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 text-white/40 text-xs transition-all duration-300 ${link.color}`}
              >
                {link.icon}
                <span className="hidden sm:inline">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Entertainment() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="entertainment" className="relative py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-krown-black via-krown-dark/50 to-krown-black" />
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-krown-orange/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      
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
              <Music className="w-4 h-4 text-krown-orange" />
              <span className="text-sm text-white/70">{t('entertainment.title')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t('entertainment.title')}
            </h2>
            <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto px-4">
              {t('entertainment.subtitle')}
            </p>
          </motion.div>

          {/* Songs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {songs.map((song, index) => (
              <SongCard key={song.id} song={song} index={index} />
            ))}
          </div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-10 sm:mt-12"
          >
            <a
              href="#all-music"
              className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-sm text-white/60 hover:text-white hover:border-krown-orange/30 transition-all duration-300"
            >
              {t('entertainment.viewAll')}
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
