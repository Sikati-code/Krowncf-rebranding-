import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Calendar, MapPin, Users, ChevronLeft, ChevronRight, Clapperboard, GraduationCap, Music } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface EventSlide {
  id: number;
  type: 'training-photo' | 'training-video' | 'festival-video';
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: string;
  gradient: string;
  icon: typeof GraduationCap;
  label: string;
}

const slides: EventSlide[] = [
  {
    id: 1,
    type: 'training-photo',
    title: 'Graphics Design Masterclass',
    description: 'Intensive 3-day workshop covering advanced design techniques, typography mastery, and brand identity creation with industry experts.',
    date: 'March 15-17, 2026',
    location: 'Lagos, Nigeria',
    attendees: '250+',
    gradient: 'from-krown-red/30 to-red-600/20',
    icon: GraduationCap,
    label: 'Training Photo',
  },
  {
    id: 2,
    type: 'training-video',
    title: 'Font Creation Workshop',
    description: 'Hands-on session teaching participants how to create professional fonts from sketch to digital format using industry-standard tools.',
    date: 'April 8, 2026',
    location: 'Abuja, Nigeria',
    attendees: '120+',
    gradient: 'from-blue-600/30 to-purple-600/20',
    icon: Clapperboard,
    label: 'Training Video',
  },
  {
    id: 3,
    type: 'festival-video',
    title: 'Krown Music Festival 2026',
    description: 'Annual music festival celebrating African creativity with live performances from top artists, design exhibitions, and networking opportunities.',
    date: 'May 20-22, 2026',
    location: 'Lagos, Nigeria',
    attendees: '5,000+',
    gradient: 'from-purple-600/30 to-pink-600/20',
    icon: Music,
    label: 'Music Festival',
  },
  {
    id: 4,
    type: 'training-photo',
    title: 'Brand Identity Bootcamp',
    description: 'Comprehensive training on building complete brand identity systems for businesses, from strategy to visual execution.',
    date: 'June 10-12, 2026',
    location: 'Port Harcourt, Nigeria',
    attendees: '180+',
    gradient: 'from-green-600/30 to-teal-600/20',
    icon: GraduationCap,
    label: 'Training Photo',
  },
  {
    id: 5,
    type: 'festival-video',
    title: 'Creative Africa Summit',
    description: 'Premier creative industry gathering featuring workshops, panel discussions, and showcases from Africa\'s finest designers and artists.',
    date: 'July 15-17, 2026',
    location: 'Accra, Ghana',
    attendees: '3,000+',
    gradient: 'from-yellow-600/30 to-krown-red/30',
    icon: Music,
    label: 'Music Festival',
  },
  {
    id: 6,
    type: 'training-video',
    title: 'Logo Design Intensive',
    description: 'Deep dive into professional logo creation, from concept sketching to final vector execution and client presentation skills.',
    date: 'August 5, 2026',
    location: 'Lagos, Nigeria',
    attendees: '200+',
    gradient: 'from-indigo-600/30 to-blue-600/20',
    icon: Clapperboard,
    label: 'Training Video',
  },
];

const SLIDE_INTERVAL = 180000; // 3 minutes in milliseconds

export default function Events() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const animationFrameRef = useRef<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-200px' });

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    let lastTime = document.timeline ? document.timeline.currentTime : performance.now();

    const animate = (time: number) => {
      if (time - (lastTime as number) >= SLIDE_INTERVAL) {
        nextSlide();
        lastTime = time;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (isAutoPlaying && isInView) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAutoPlaying, isInView, nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
    }),
  };

  const currentEvent = slides[currentSlide];

  return (
    <section id="events" className="relative py-20 sm:py-28 lg:py-32 overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-krown-black via-krown-dark to-krown-black" />

      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-krown-orange/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 sm:mb-6 glass rounded-full">
              <Calendar className="w-4 h-4 text-krown-orange" />
              <span className="text-sm text-white/70">{t('events.title')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t('events.title')}
            </h2>
            <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto px-4">
              {t('events.subtitle')}
            </p>
          </motion.div>

          {/* Slideshow Container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="glass-card overflow-hidden">
              <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.5/1] overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.4 },
                      scale: { duration: 0.4 },
                    }}
                    className="absolute inset-0"
                  >
                    {/* Slide Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${currentEvent.gradient}`} />
                    <div className="absolute inset-0 bg-krown-black/60" />

                    {/* Decorative Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                        backgroundSize: '32px 32px',
                      }} />
                    </div>

                    {/* Slide Content */}
                    <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center p-6 sm:p-10 lg:p-16 gap-6 lg:gap-12">
                      {/* Left: Visual */}
                      <div className="flex-shrink-0">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-2xl bg-gradient-to-br from-krown-orange/20 to-white/5 border border-white/10 flex items-center justify-center"
                        >
                          <currentEvent.icon className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-krown-orange" />
                        </motion.div>
                      </div>

                      {/* Right: Info */}
                      <div className="text-center lg:text-left max-w-xl">
                        {/* Label */}
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-krown-orange/20 text-krown-orange text-xs font-medium rounded-full mb-3"
                        >
                          <currentEvent.icon className="w-3 h-3" />
                          {currentEvent.label}
                        </motion.span>

                        {/* Title */}
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 }}
                          className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3"
                        >
                          {currentEvent.title}
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-sm sm:text-base text-white/60 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3"
                        >
                          {currentEvent.description}
                        </motion.p>

                        {/* Meta Info */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.45 }}
                          className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-white/50"
                        >
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-krown-orange" />
                            <span>{currentEvent.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-krown-orange" />
                            <span>{currentEvent.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-krown-orange" />
                            <span>{currentEvent.attendees} attendees</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 transition-all"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 transition-all"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`transition-all duration-500 rounded-full ${index === currentSlide
                          ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-krown-orange'
                          : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/30 hover:bg-white/50'
                        }`}
                    />
                  ))}
                </div>

                {/* Auto-play indicator */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
                  <div className={`flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 ${isAutoPlaying ? 'border-green-500/30' : ''}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`} />
                    <span className="text-[10px] sm:text-xs text-white/50">
                      {isAutoPlaying ? 'Auto' : 'Paused'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Slide Thumbnails - Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden lg:grid grid-cols-6 gap-3 mt-6"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`relative p-3 rounded-xl border transition-all duration-300 text-left ${index === currentSlide
                    ? 'border-krown-orange/50 bg-krown-orange/10'
                    : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <slide.icon className={`w-4 h-4 ${index === currentSlide ? 'text-krown-orange' : 'text-white/40'}`} />
                  <span className={`text-[10px] uppercase tracking-wider ${index === currentSlide ? 'text-krown-orange' : 'text-white/40'}`}>
                    {slide.label}
                  </span>
                </div>
                <p className={`text-xs font-medium line-clamp-1 ${index === currentSlide ? 'text-white' : 'text-white/60'}`}>
                  {slide.title}
                </p>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
