import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import * as THREE from 'three';
// @ts-ignore - vanta ships without type declarations
import NET from 'vanta/dist/vanta.net.min';

// NEFERTEM brand tokens (Brand Charter §4)
export const NEFERTEM = {
  obsidian: 0x07131f,
  deepTeal: 0x0e3a46,
  royalGold: 0xd4af37,
  limestone: 0xece4d6,
  lapis: 0x1e63a5,
  electricNile: 0x28c2d3,
} as const;

export type VantaEffectKind = 'net';

interface VantaBackgroundProps {
  effect?: VantaEffectKind;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** Extra / override options passed to the Vanta effect */
  options?: Record<string, unknown>;
}

const EFFECTS = { net: NET } as const;

function isDarkMode() {
  if (typeof document === 'undefined') return true;
  return document.documentElement.classList.contains('dark');
}

function optionsForTheme(dark: boolean, overrides: Record<string, unknown> = {}) {
  return {
    THREE,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200,
    minWidth: 200,
    scale: 1,
    scaleMobile: 1,
    // Brand mapping: gold network on obsidian (dark) / teal network on limestone (light)
    color: dark ? NEFERTEM.royalGold : NEFERTEM.deepTeal,
    backgroundColor: dark ? NEFERTEM.obsidian : NEFERTEM.limestone,
    points: 8,
    maxDistance: 24,
    spacing: 18,
    showDots: true,
    ...overrides,
  };
}

/**
 * Reusable Vanta.js animated background.
 * - Inits once per mount, destroys on unmount (StrictMode-safe).
 * - Skips WebGL entirely when the user prefers reduced motion (static brand fallback).
 * - Follows the light/dark theme via `setOptions` so the brand ratio holds in both modes.
 */
export function VantaBackground({
  effect = 'net',
  className,
  style,
  children,
  options,
}: VantaBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<{ setOptions: (o: object) => void; destroy: () => void } | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return; // static fallback background, no WebGL

    const init = EFFECTS[effect];
    effectRef.current = init({ el, ...optionsForTheme(isDarkMode(), optionsRef.current) });

    // Follow theme toggles without tearing down WebGL
    const observer = new MutationObserver(() => {
      effectRef.current?.setOptions(optionsForTheme(isDarkMode(), optionsRef.current));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, [effect]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ background: '#07131F', ...style }}
      aria-hidden={children ? true : undefined}
    >
      {children}
    </div>
  );
}
