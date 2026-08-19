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
  previewUrl?: string;
}

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  youtubeUrl: string;
}

const songs: Song[] = [
  {
    id: 1,
    title: 'Kinym',
    artist: 'Krown CF',
    cover: 'from-purple-600/40 to-blue-600/40',
    color: 'purple',
    previewUrl: '/assets/audio/kinym-preview.mp3',
  },
  {
    id: 2,
    title: 'Tripping (feat. Swinem & Boy Koli)',
    artist: 'Krown CF',
    cover: 'from-krown-red/40 to-red-600/40',
    color: 'red',
    previewUrl: '/assets/audio/tripping-preview.mp3',
  },
  {
    id: 3,
    title: 'Not Your Mate',
    artist: 'Reno Snr',
    cover: 'from-green-600/40 to-teal-600/40',
    color: 'green',
    previewUrl: '/assets/audio/not-your-mate-preview.mp3',
  },
  {
    id: 4,
    title: 'Creative Vibes',
    artist: 'KCF All Stars',
    cover: 'from-pink-600/40 to-rose-600/40',
    color: 'pink',
    previewUrl: '/assets/audio/creative-vibes-preview.mp3',
  },
];

const songStreamingLinks: Record<number, string> = {
  1: 'https://distrokid.com/hyperfollow/krowncf/kinym',
  2: 'https://distrokid.com/hyperfollow/krowncf/tripping-feat-swinem--boy-koli',
  3: 'https://ditto.fm/not-your-mate-reno-snr',
  4: 'https://youtube.com/@KrownCreativeFactory',
};

const videos: Video[] = [
  {
    id: 1,
    title: 'Krown CF - Video 1',
    thumbnail: 'https://img.youtube.com/vi/60gZ6lqZOE0/maxresdefault.jpg',
    youtubeUrl: 'https://youtu.be/60gZ6lqZOE0?si=v9jgQWUNZLgPZCoG',
  },
  {
    id: 3,
    title: 'Krown CF - Video 3',
    thumbnail: 'https://img.youtube.com/vi/zhKM4NL9Wi4/maxresdefault.jpg',
    youtubeUrl: 'https://youtu.be/zhKM4NL9Wi4?si=Z1dKIeNrPuSma6B9',
  },
  {
    id: 4,
    title: 'Krown CF - Video 4',
    thumbnail: 'https://img.youtube.com/vi/z4yG33Rc6yo/maxresdefault.jpg',
    youtubeUrl: 'https://youtu.be/z4yG33Rc6yo?si=qkg5tXtQpr7hhlMo',
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

          {song.previewUrl && (
            <audio
              controls
              preload="none"
              className="w-full h-8 mb-4 accent-krown-orange"
              aria-label={`Preview of ${song.title}`}
            >
              <source src={song.previewUrl} type="audio/mpeg" />
              Your browser does not support audio playback.
            </audio>
          )}

          {/* Streaming Links */}
          <div className="flex flex-wrap gap-1.5">
            <a
              href={songStreamingLinks[song.id]}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 text-white/40 text-xs transition-all duration-300 hover:text-[#1DB954] hover:bg-[#1DB954]/10"
            >
              <Play className="w-4 h-4" />
              <span className="hidden sm:inline">Listen Now</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function VideoCard({ video, index }: { video: Video; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="glass-card overflow-hidden hover-lift">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gradient-to-br from-krown-red/20 to-purple-600/20 flex items-center justify-center overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
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
        </div>

        {/* Video Info */}
        <div className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-krown-orange transition-colors">
            {video.title}
          </h3>
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-sm text-krown-red hover:text-krown-orange transition-colors"
          >
            <Play className="w-4 h-4" />
            Watch on YouTube
          </a>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-12">
            {songs.map((song, index) => (
              <SongCard key={song.id} song={song} index={index} />
            ))}
          </div>

          {/* Videos Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Latest Videos</h3>
          </motion.div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {videos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} />
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
