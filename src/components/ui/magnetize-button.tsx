"use client";

/**
 * MagnetizeButton — original by Sparkholic (shadcnspace), MIT.
 * Particles orbit the control and spring to its centre on hover/touch.
 *
 * Adapted for this codebase:
 * - renders the existing Base-UI `Button` (`@/components/ui/button`) instead
 *   of a second shadcn button, so `render`, `variant` and `size` keep working;
 * - brand-tinted gold (override with className if needed);
 * - optional `children` overrides the default "Hover me / Attracting" label —
 *   used so every important CTA can keep its real copy;
 * - attraction is wired with native listeners on a ref, so consumer event props
 *   (onClick, onMouseEnter, …) pass through untouched;
 * - `touch-pan-y` instead of `touch-none` so mobile page scrolling still works.
 */

import * as React from "react";
import { motion, useAnimation } from "motion/react";
import { Magnet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MagnetizeButtonProps = React.ComponentProps<typeof Button> & {
  particleCount?: number;
  attractRadius?: number;
};

/* Base-UI's `useButton` needs to know if the final element is a native
   <button>. Without `render`, the Button creates its own <button>; with
   `render`, it is usually a router <Link> (an <a>), which must be declared
   with `nativeButton={false}`. A custom function component can always force
   the right value by passing `nativeButton` explicitly. */
function resolveNativeButton(render: unknown): boolean {
  if (!React.isValidElement(render)) return true;
  return render.type === "button";
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

function MagnetizeButton({
  className,
  particleCount = 12,
  attractRadius = 50,
  children,
  ...props
}: MagnetizeButtonProps) {
  const nativeButton = props.nativeButton ?? resolveNativeButton(props.render);
  const [isAttracting, setIsAttracting] = React.useState(false);
  const [particles, setParticles] = React.useState<Particle[]>([]);
  const particlesControl = useAnimation();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 360 - 180,
      y: Math.random() * 360 - 180,
    }));
    setParticles(newParticles);
  }, [particleCount]);

  const runAttract = React.useCallback(async () => {
    setIsAttracting(true);
    await particlesControl.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 10 },
    });
  }, [particlesControl]);

  const runRelease = React.useCallback(async () => {
    if (!particles.length) return;
    setIsAttracting(false);
    await particlesControl.start((i) => ({
      x: particles[i]?.x ?? 0,
      y: particles[i]?.y ?? 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    }));
  }, [particlesControl, particles]);

  /* Native listeners keep the Base-UI event typing untouched. */
  React.useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const start = () => void runAttract();
    const end = () => void runRelease();
    el.addEventListener("mouseenter", start);
    el.addEventListener("mouseleave", end);
    el.addEventListener("touchstart", start, { passive: true });
    el.addEventListener("touchend", end);
    el.addEventListener("touchcancel", end);
    return () => {
      el.removeEventListener("mouseenter", start);
      el.removeEventListener("mouseleave", end);
      el.removeEventListener("touchstart", start);
      el.removeEventListener("touchend", end);
      el.removeEventListener("touchcancel", end);
    };
  }, [runAttract, runRelease]);

  const hasCustomContent = children !== undefined && children !== null;

  return (
    <Button
      ref={btnRef}
      nativeButton={nativeButton}
      className={cn(
        "relative min-w-40 touch-pan-y",
        "border border-primary/50 bg-primary text-primary-foreground hover:bg-gold-accent",
        "dark:border-primary/40 dark:bg-primary dark:text-black-deep dark:hover:bg-gold-accent",
        "transition-all duration-300",
        className
      )}
      {...props}
    >
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id || index}
          custom={index}
          initial={{ x: particle.x, y: particle.y }}
          animate={particlesControl}
          className={cn(
            "absolute h-1.5 w-1.5 rounded-full",
            "bg-primary dark:bg-primary",
            "transition-opacity duration-300",
            isAttracting ? "opacity-90" : "opacity-40"
          )}
        />
      ))}
      <span className="relative flex w-full items-center justify-center gap-2">
        {hasCustomContent ? (
          children
        ) : (
          <>
            <Magnet
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                isAttracting && "scale-110"
              )}
            />
            {isAttracting ? "Attracting" : "Hover me"}
          </>
        )}
      </span>
    </Button>
  );
}

export { MagnetizeButton };
