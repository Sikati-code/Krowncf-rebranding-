import { motion } from 'framer-motion';

interface LogoSlideshowProps {
  className?: string;
}

export default function LogoSlideshow({ className = '' }: LogoSlideshowProps) {
  const logos = [
    { id: 1, variant: 'primary' },
    { id: 2, variant: 'secondary' },
    { id: 3, variant: 'tertiary' },
  ];

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {/* Rotating Container */}
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {logos.map((logo, index) => {
          const angle = (index / logos.length) * 360;
          const radius = 120;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <motion.div
              key={logo.id}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              }}
              animate={{ 
                rotate: -360,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                logo.variant === 'primary' 
                  ? 'bg-gradient-to-br from-krown-red to-krown-red-dark' 
                  : logo.variant === 'secondary'
                  ? 'bg-gradient-to-br from-krown-red-light to-krown-red'
                  : 'bg-gradient-to-br from-krown-red-dark to-krown-red'
              } shadow-glow`}>
                <img 
                  src="/assets/logo.png" 
                  alt="Krown Logo" 
                  className="w-8 h-8"
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Center Logo */}
      <motion.div
        className="absolute w-24 h-24 rounded-3xl bg-gradient-to-br from-krown-red to-krown-red-dark flex items-center justify-center shadow-glow-lg"
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 0 30px rgba(220, 38, 38, 0.3)',
            '0 0 60px rgba(220, 38, 38, 0.5)',
            '0 0 30px rgba(220, 38, 38, 0.3)',
          ]
        }}
        transition={{ 
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="text-center">
          <img 
            src="/assets/logo.png" 
            alt="Krown Logo" 
            className="w-12 h-12 mx-auto mb-1"
          />
          <div className="text-xs font-bold text-white tracking-wider">KROWN</div>
        </div>
      </motion.div>

      {/* Orbiting Rings */}
      <motion.div
        className="absolute w-64 h-64 border border-krown-red/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-80 h-80 border border-krown-red/10 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
