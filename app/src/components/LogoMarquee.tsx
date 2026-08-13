import { motion } from 'framer-motion';

interface LogoMarqueeProps {
  className?: string;
}

export default function LogoMarquee({ className = '' }: LogoMarqueeProps) {
  const logos = Array(8).fill(null).map((_, i) => ({
    id: i,
    variant: ['primary', 'secondary', 'tertiary'][i % 3] as 'primary' | 'secondary' | 'tertiary'
  }));

  return (
    <div className={`relative w-full py-12 sm:py-16 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-krown-black via-krown-dark/20 to-krown-black" />
      
      <div className="relative z-10">
        {/* Row 1 - Left to Right */}
        <div className="relative overflow-hidden mb-6">
          <motion.div
            className="flex gap-6 sm:gap-8"
            animate={{ x: [0, -1000, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <motion.div
                key={`${logo.id}-row1-${index}`}
                className="flex-shrink-0 w-32 sm:w-40 h-32 sm:h-40 glass-card rounded-2xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center ${
                  logo.variant === 'primary' 
                    ? 'bg-gradient-to-br from-krown-red to-krown-red-dark' 
                    : logo.variant === 'secondary'
                    ? 'bg-gradient-to-br from-krown-red-light to-krown-red'
                    : 'bg-gradient-to-br from-krown-red-dark to-krown-red'
                } shadow-glow`}>
                  <img 
                    src="/assets/logo.png" 
                    alt="Krown Logo" 
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 sm:gap-8"
            animate={{ x: [-1000, 0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <motion.div
                key={`${logo.id}-row2-${index}`}
                className="flex-shrink-0 w-32 sm:w-40 h-32 sm:h-40 glass-card rounded-2xl flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center ${
                  logo.variant === 'primary' 
                    ? 'bg-gradient-to-br from-krown-red to-krown-red-dark' 
                    : logo.variant === 'secondary'
                    ? 'bg-gradient-to-br from-krown-red-light to-krown-red'
                    : 'bg-gradient-to-br from-krown-red-dark to-krown-red'
                } shadow-glow`}>
                  <img 
                    src="/assets/logo.png" 
                    alt="Krown Logo" 
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
