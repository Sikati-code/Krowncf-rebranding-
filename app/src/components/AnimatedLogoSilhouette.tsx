import { motion } from 'framer-motion';

interface AnimatedLogoSilhouetteProps {
  className?: string;
}

export default function AnimatedLogoSilhouette({ className = '' }: AnimatedLogoSilhouetteProps) {
  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }} // Reduced overall opacity for background integration
        transition={{ duration: 1 }}
        className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] pointer-events-none"
        style={{ filter: 'drop-shadow(0 0 15px rgba(255, 42, 63, 0.4))' }}
      >
        <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <motion.path
            strokeLinejoin="round"
            strokeLinecap="round"
            d="M 150, 450 L 150, 150 L 380, 150 L 300, 300 L 420, 450 Z"
            stroke="#ff2a3f"
            strokeWidth="6"
            initial={{ pathLength: 0, fill: 'rgba(255, 42, 63, 0)' }}
            animate={{
              pathLength: [0, 1, 1],
              fill: ['rgba(255, 42, 63, 0)', 'rgba(255, 42, 63, 0)', 'rgba(255, 42, 63, 0.35)']
            }}
            transition={{
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'loop',
              times: [0, 0.7, 1],
              repeatDelay: 0.2
            }}
            style={{
              filter: 'drop-shadow(0 0 10px rgba(255, 42, 63, 0.8)) drop-shadow(0 0 30px rgba(255, 42, 63, 0.6))'
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
