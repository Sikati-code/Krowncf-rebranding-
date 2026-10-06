import { useState, type PointerEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppIcon from './icons/WhatsAppIcon';

interface WhatsAppShareButtonProps {
  label: string;
  onClick: () => void;
  /** 'solid' = WhatsApp-green primary; 'outline' = green outline for secondary placements. */
  variant?: 'solid' | 'outline';
  size?: 'lg' | 'md';
  className?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function WhatsAppShareButton({
  label,
  onClick,
  variant = 'solid',
  size = 'lg',
  className = '',
}: WhatsAppShareButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = (e: PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple = { id: Date.now() + Math.random(), x: e.clientX - rect.left, y: e.clientY - rect.top };
    setRipples((r) => [...r, ripple]);
  };

  const sizing = size === 'lg' ? 'min-h-[48px] py-4 text-base' : 'min-h-[44px] py-2.5 text-sm';
  const look =
    variant === 'solid'
      ? 'bg-[#25D366] text-white hover:bg-[#1EBE5A] shadow-[0_8px_24px_-12px_rgba(37,211,102,0.8)]'
      : 'border border-[#25D366]/50 text-[#25D366] bg-[#25D366]/5 hover:bg-[#25D366]/15 hover:border-[#25D366]';

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onPointerDown={addRipple}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      aria-haspopup="dialog"
      className={`relative overflow-hidden w-full ${sizing} ${look} font-bold rounded-xl transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-krown-black ${className}`}
    >
      <WhatsAppIcon className={size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      <span className="relative">{label}</span>
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.45 }}
            animate={{ scale: 6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => setRipples((all) => all.filter((x) => x.id !== r.id))}
            className="pointer-events-none absolute w-16 h-16 -ml-8 -mt-8 rounded-full bg-white"
            style={{ left: r.x, top: r.y }}
            aria-hidden="true"
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}

/**
 * Compact round share action for design cards. Always visible on touch screens;
 * revealed on hover / keyboard focus on devices with a mouse.
 */
export function CardShareButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.88 }}
      aria-label={label}
      aria-haspopup="dialog"
      title={label}
      className="absolute top-3 right-3 z-10 w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-black/30 transition-opacity duration-200 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <WhatsAppIcon className="w-5 h-5" />
    </motion.button>
  );
}
