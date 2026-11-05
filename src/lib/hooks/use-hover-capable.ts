import { useEffect, useState } from "react";

/**
 * True only on devices that can genuinely hover (mouse / pen).
 * Touch screens report phantom hover, which would leave tilt/particle
 * effects stuck, so they return false.
 */
export function useHoverCapable(): boolean {
  const [hoverable, setHoverable] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHoverable(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return hoverable;
}
