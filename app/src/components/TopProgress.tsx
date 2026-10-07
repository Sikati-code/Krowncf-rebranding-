import { useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useLocation } from 'react-router';

/**
 * Two thin bars pinned to the top of the viewport:
 * - scroll progress: fills as the user reads down the page;
 * - route progress: a quick NProgress-style sweep on every page change.
 */
export default function TopProgress() {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });

  // No sweep on the first page load — only on navigation.
  const [initialPath] = useState(pathname);
  const [navigated, setNavigated] = useState(false);
  if (!navigated && pathname !== initialPath) setNavigated(true);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 z-[55] h-[2px] origin-left bg-gradient-to-r from-krown-red to-krown-orange pointer-events-none"
      />
      {navigated && !reduceMotion && (
        <motion.div
          key={pathname}
          aria-hidden="true"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: [0, 0.7, 1], opacity: [1, 1, 0] }}
          transition={{ duration: 0.75, times: [0, 0.55, 1], ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-[56] h-[3px] origin-left bg-krown-red shadow-glow pointer-events-none"
        />
      )}
    </>
  );
}
