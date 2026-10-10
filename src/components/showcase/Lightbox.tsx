import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

/**
 * Lightbox for local image items — keyboard (Escape, arrows) + swipe.
 * Only used once local assets exist (see ASSETS.md).
 */
export function Lightbox({
  images,
  index,
  title,
  onClose,
  onNav,
}: {
  images: { src: string; label: string }[];
  index: number;
  title: string;
  onClose: () => void;
  onNav: (index: number) => void;
}) {
  const [touchX, setTouchX] = useState<number | null>(null);

  const prev = useCallback(() => onNav((index - 1 + images.length) % images.length), [index, images.length, onNav]);
  const next = useCallback(() => onNav((index + 1) % images.length), [index, images.length, onNav]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const current = images[index];
  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — ${current.label}`}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-background/95 p-4 backdrop-blur"
      onClick={onClose}
      onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (dx > 48) prev();
        else if (dx < -48) next();
        setTouchX(null);
      }}
    >
      <div className="relative max-h-full w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <img src={current.src} alt={current.label} className="max-h-[80vh] w-full rounded-[8px] object-contain" />
        <p className="mt-3 text-center text-[13px] text-muted-foreground">
          {current.label} · {index + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute -top-2 right-0 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-foreground/10 text-foreground"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Image précédente"
              className="absolute left-2 top-1/2 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-foreground/10 text-foreground"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Image suivante"
              className="absolute right-2 top-1/2 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-foreground/10 text-foreground"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
