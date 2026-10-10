import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
// @ts-ignore
import logoImg from '../../logo/nefertem-full.png';

const SHOWN_KEY = 'nef-opening-shown';

/**
 * Brand splash — once per session, max ~0.8s total, pointer-events-none
 * so it never blocks interaction. Skipped on mobile / coarse pointers
 * and when the user prefers reduced motion.
 */
export function OpeningAnimation() {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      if (sessionStorage.getItem(SHOWN_KEY)) return false;
    } catch {
      return false;
    }
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (window.matchMedia('(pointer: coarse)').matches) return false;
    return true;
  });
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem(SHOWN_KEY, '1');
      } catch {
        /* ignore */
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="opening-animation"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[100] flex text-foreground items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center">
            <div className="w-64 sm:w-96 max-w-[80vw] flex items-center justify-center">
              {!imgError ? (
                <img
                  src={logoImg}
                  alt=""
                  width={384}
                  height={96}
                  className="w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]"
                  onError={() => setImgError(true)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="font-bold text-5xl text-primary font-heading">N</span>
              )}
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="h-1 w-[80%] max-w-[300px] bg-primary mt-6 origin-left shadow-[0_0_20px_rgba(212,175,55,0.8)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
