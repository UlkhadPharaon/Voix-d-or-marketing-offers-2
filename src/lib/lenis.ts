import type Lenis from 'lenis';

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}

/** Fixed navbar height — anchor targets stop just below it. */
export const SCROLL_OFFSET = -80;
