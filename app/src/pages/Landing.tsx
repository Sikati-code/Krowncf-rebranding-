import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type FloatingItem = {
  x: number;
  y: number;
  opacity: number;
  scale: number;
  left: string;
  top: string;
}

const INITIAL_FLOATING_ITEMS: FloatingItem[] = Array.from({ length: 6 }).map(() => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  opacity: 0.05,
  scale: Math.random() * 0.5 + 0.5,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
}));
import { useNavigate } from 'react-router';
import { Crown, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

interface MonthlyMessage {
  emoji: string;
  greeting: string;
  message: string;
  cta: string;
}

const monthlyMessages: Record<number, MonthlyMessage> = {
  0: { // January - New Year
    emoji: '🎆',
    greeting: 'Welcome to Krown Creative Factory',
    message: 'As we embrace a new year, we invite you to refresh your brand with bold visions and fresh perspectives. This January, let\'s create something extraordinary together.',
    cta: 'Start your creative journey with us this month.'
  },
  1: { // February - Youth Day (Feb 11)
    emoji: '🌟',
    greeting: 'Welcome to Krown Creative Factory',
    message: 'Celebrating the energy and innovation of youth this February. Let your brand shine with designs that capture the spirit of tomorrow\'s leaders.',
    cta: 'Empower your brand—get in touch this Youth Day month.'
  },
  2: { // March - Women's Month
    emoji: '💪',
    greeting: 'Welcome to Krown Creative Factory',
    message: 'Honoring women\'s leadership and empowerment this March. Let\'s create designs that celebrate strength, elegance, and the power of women.',
    cta: 'Celebrate women\'s excellence—reach out today.'
  },
  3: { // April - Rainy Season
    emoji: '🌧️',
    greeting: 'Welcome to Krown Creative Factory',
    message: 'As the rains refresh the land of Cameroon, we invite you to refresh your brand with designs that speak to the soul of Africa. This April, let growth and creativity flourish.',
    cta: 'Grow your brand with us this rainy season.'
  },
  4: { // May - Labor Day
    emoji: '🔨',
    greeting: 'Welcome to Krown Creative Factory',
    message: 'Celebrating the dignity of hard work and craftsmanship this May. Let\'s build brands that honor dedication and excellence in every detail.',
    cta: 'Craft excellence—let\'s work together.'
  },
  5: { // June - Summer/Exam Season
    emoji: '📚',
    greeting: 'Welcome to Krown Creative Factory',
    message: 'As focus and excellence define this season, let your brand stand out with designs that capture attention and inspire achievement.',
    cta: 'Achieve greatness—connect with our team.'
  },
  6: { // July - Rainy Season Peak
    emoji: '💧',
    greeting: 'Welcome to Krown Creative Factory',
    message: 'As the rains refresh the land of Cameroon, we invite you to refresh your brand with designs that speak to the soul of Africa. This July, let\'s create something extraordinary together.',
    cta: 'Get in touch with our outstanding design team this month.'
  },
  7: { // August - National Day (Aug 11)
    emoji: '🇨🇲',
    greeting: 'Welcome to Krown Creative Factory',
    message: 'This August, as Cameroon celebrates its National Day, we honor our roots with designs that tell Africa\'s stories. Let\'s build something bold and beautiful—together.',
    cta: 'Celebrate with us—get in touch this special month.'
  },
  8: { // September - Harvest/New Season
    emoji: '🌾',
    greeting: 'Welcome to Krown Creative Factory',
    message: 'Celebrating abundance and new beginnings this harvest season. Let your brand reap the rewards of exceptional design and creative excellence.',
    cta: 'Harvest success—start your project today.'
  },
  9: { // October - Festive Season Prep
    emoji: '🎉',
    greeting: 'Welcome to Krown Creative Factory',
    message: 'As celebration and joy fill the air, let your brand shine with vibrant designs that capture the heart of the festive season.',
    cta: 'Celebrate in style—reach out now.'
  },
  10: { // November - Dry Season Start
    emoji: '☀️',
    greeting: 'Welcome to Krown Creative Factory',
    message: 'As clarity defines the dry season, let\'s make bold moves with designs that stand out and make a lasting impression.',
    cta: 'Make a bold statement—contact us today.'
  },
  11: { // December - Festive Season
    emoji: '🎄',
    greeting: 'Welcome to Krown Creative Factory',
    message: 'As Africa celebrates the spirit of togetherness this December, let your brand shine with designs that capture the heart of the continent. From our family to yours, we wish you a season of creativity and joy.',
    cta: 'Let\'s craft your brand\'s best year yet—reach out today.'
  }
};

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentMonth] = useState(() => new Date().getMonth());
  const [isExiting, setIsExiting] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [floatingItems] = useState<FloatingItem[]>(() => INITIAL_FLOATING_ITEMS);

  useEffect(() => {
    // Check if user has already seen the landing page
    const hasSeenLanding = sessionStorage.getItem('hasSeenLanding');
    if (hasSeenLanding) {
      navigate('/home');
      return;
    }

    // Delay content reveal for dramatic effect
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleEnter = () => {
    setIsExiting(true);
    sessionStorage.setItem('hasSeenLanding', 'true');
    
    // Delay navigation for exit animation
    setTimeout(() => {
      navigate('/home');
    }, 800);
  };

  const message = monthlyMessages[currentMonth] || monthlyMessages[0];

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-custom text-white" style={{ backgroundImage: 'url(/assets/background.png)' }}>
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-krown-red/30 via-transparent to-krown-red-dark/20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: '400% 400%'
        }}
      />

      {/* Floating logo silhouettes in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {floatingItems.map((it: FloatingItem, i: number) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ x: it.x, y: it.y, opacity: it.opacity, scale: it.scale }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 5, -5, 0],
              opacity: [it.opacity, 0.1, it.opacity]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            style={{ left: it.left, top: it.top }}
          >
            <Crown className="w-16 h-16 text-krown-red" />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12"
          >
            {/* Language Toggle */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute top-6 right-6 sm:top-8 sm:right-8"
            >
              <LanguageToggle />
            </motion.div>

            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={showContent ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative mb-8 sm:mb-12"
            >
              {/* Glow effect behind logo */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-krown-red/40 to-krown-orange/40 rounded-full blur-3xl"
                style={{
                  width: '120%',
                  height: '120%',
                  left: '-10%',
                  top: '-10%'
                }}
              />

              {/* Full Logo */}
              <motion.img
                src="/assets/logo-full.jpg"
                alt="Krown Creative Factory"
                className="relative w-64 sm:w-80 md:w-96 lg:w-[500px] h-auto object-contain"
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Monthly Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={showContent ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1, type: "spring" }}
                className="text-4xl sm:text-5xl md:text-6xl mb-6"
              >
                {message.emoji}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={showContent ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
              >
                {message.greeting}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={showContent ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed mb-6 sm:mb-8 px-4"
              >
                {message.message}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={showContent ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="flex items-center justify-center gap-2 text-krown-orange text-sm sm:text-base"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">{message.cta}</span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </motion.div>

            {/* ENTER Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={showContent ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnter}
              className="relative group px-12 py-5 sm:px-16 sm:py-6 bg-gradient-to-r from-krown-red to-krown-red-dark text-white font-bold text-xl sm:text-2xl rounded-full overflow-hidden"
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-krown-orange/50 to-krown-red/50 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              />

              {/* Border glow */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-krown-orange/50 transition-colors"
                animate={{
                  boxShadow: ['0 0 0px rgba(220, 38, 38, 0)', '0 0 20px rgba(220, 38, 38, 0.5)', '0 0 0px rgba(220, 38, 38, 0)']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />

              <span className="relative z-10">ENTER</span>
            </motion.button>

            {/* Footer with dynamic location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={showContent ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.7 }}
              className="absolute bottom-6 sm:bottom-8 left-0 right-0 text-center"
            >
              <p className="text-xs sm:text-sm text-white/40">
                &copy; 2026 Krown Creative Factory. All rights reserved.
              </p>
              <p className="text-xs sm:text-sm text-white/50 mt-1">
                {t('location.full')} • {t('location.language')}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
