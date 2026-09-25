import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { SCROLL_OFFSET, getLenis, setLenis } from '@/lib/lenis';

/**
 * Mounts a single global Lenis smooth-scroll instance.
 * - autoRaf drives Lenis off its own requestAnimationFrame loop.
 * - anchors:true makes same-page #links glide instead of jumping
 *   (offset keeps targets clear of the 80px fixed navbar).
 * - respects prefers-reduced-motion out of the box (smoothing off, instant jumps).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (getLenis()) return;
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.15,
      anchors: { offset: SCROLL_OFFSET },
    });
    setLenis(lenis);
    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}

/**
 * Keeps scroll position correct across SPA navigation.
 * Must live inside <BrowserRouter>: on every route change it glides to
 * the #hash target (cross-page anchor links) or jumps back to top.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lenis = getLenis();
    // Let AnimatePresence/layout settle before measuring targets.
    const t = window.setTimeout(() => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          if (lenis) lenis.scrollTo(el as HTMLElement, { offset: SCROLL_OFFSET });
          else (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }, 100);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);

  return null;
}
