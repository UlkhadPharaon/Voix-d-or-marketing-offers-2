import { useState } from "react";

/**
 * Before / after slider — rendered only when a before/after pair exists.
 * Keyboard operable (native range input) + pointer drag on the image.
 */
export function BeforeAfterSlider({
  before,
  after,
  title,
}: {
  before: string;
  after: string;
  title: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div>
      <div
        className="relative aspect-[4/5] w-full touch-none select-none overflow-hidden rounded-[8px] border border-foreground/10"
        onPointerDown={(e) => {
          const el = e.currentTarget;
          const set = (clientX: number) => {
            const rect = el.getBoundingClientRect();
            setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
          };
          set(e.clientX);
          const move = (ev: PointerEvent) => set(ev.clientX);
          const up = () => {
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", up);
          };
          window.addEventListener("pointermove", move);
          window.addEventListener("pointerup", up);
        }}
      >
        <img src={before} alt={`${title} — avant`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <img
          src={after}
          alt={`${title} — après`}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        />
        <span className="absolute left-3 top-3 rounded-sm bg-background/85 px-2 py-1 text-[10px] font-bold uppercase tracking-[1px] text-foreground">
          Avant
        </span>
        <span className="absolute right-3 top-3 rounded-sm bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-[1px] text-black-deep">
          Après
        </span>
        <span
          aria-hidden="true"
          className="absolute top-0 h-full w-[2px] bg-primary"
          style={{ left: `${pos}%` }}
        />
      </div>
      <label className="mt-3 block text-[12px] font-bold uppercase tracking-[1px] text-muted-foreground">
        Faites glisser pour comparer
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          className="mt-2 w-full accent-[#D4AF37]"
          aria-label={`Comparer avant et après : ${title}`}
        />
      </label>
    </div>
  );
}
