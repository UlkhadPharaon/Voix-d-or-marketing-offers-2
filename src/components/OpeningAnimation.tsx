import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
// @ts-ignore
import logoImg from '../../logo/logo studio voix d\'or.png';

export function OpeningAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Hide the animation after 1.5s
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="opening-animation"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex text-foreground items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, filter: "blur(10px)", opacity: 0 }}
              animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-primary flex items-center justify-center overflow-hidden bg-background shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                {!imgError ? (
                  <img 
                    src={logoImg} 
                    alt="Logo Studio Voix d'Or" 
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="font-bold text-5xl text-primary font-heading">V</span>
                )}
              </div>
              <div className="font-heading text-2xl sm:text-4xl py-2 px-6 uppercase tracking-widest text-primary">
                Studio Voix d'Or
              </div>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
              className="h-1 w-[80%] max-w-[300px] bg-primary mt-6 origin-left shadow-[0_0_20px_rgba(212,175,55,0.8)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
