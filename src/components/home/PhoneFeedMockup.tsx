import { useEffect, useState } from "react";
import { BatteryMedium, CheckCircle2, Clapperboard, Signal, Sparkles, Star, Tag, UtensilsCrossed, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

const FEED_CARDS = [
  { Icon: UtensilsCrossed, title: "Menu du jour", sub: "Plat + jus · 1 500 F" },
  { Icon: Sparkles, title: "Nouvelle collection", sub: "Disponible en boutique" },
  { Icon: Clapperboard, title: "En cuisine ce matin", sub: "Vidéo 15 s" },
  { Icon: Tag, title: "-20 % ce week-end", sub: "Offre limitée" },
  { Icon: Star, title: "Ils nous ont choisis", sub: "Avis clients" },
];

const NOTIFS = [
  "Votre lot de la semaine est prêt",
  "Un client vient d'être accueilli sur WhatsApp",
];

/**
 * Luxury phone mockup — pure CSS illustration (no fake client photos,
 * no heavy 3D library: a static gold-edge frame with a subtle desktop
 * tilt, GPU-cheap and kind to low-bandwidth phones).
 * Feed auto-scrolls gently; notification cards appear in sequence.
 * Static poster when prefers-reduced-motion or Save-Data is on.
 */
export function PhoneFeedMockup() {
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const saveData = Boolean((navigator as any).connection?.saveData);
    setStaticMode(reduced || saveData);
  }, []);

  return (
    <div className="relative mx-auto w-[280px] sm:w-[310px]" aria-hidden="true">
      {/* Ambient gold glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[110%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[100px]" />

      {/* Desktop notifications */}
      {!staticMode && (
        <div className="absolute -left-44 top-10 z-20 hidden w-48 flex-col gap-2 sm:flex">
          {NOTIFS.map((text, i) => (
            <div
              key={text}
              style={{ animationDelay: `${0.8 + i * 1.4}s` }}
              className="notif-in flex items-start gap-2 rounded-[10px] border border-primary/30 bg-background/95 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-[11px] font-bold leading-snug text-foreground">{text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Phone — subtle 3D tilt on desktop, straight on mobile */}
      <div className="lg:[transform:perspective(1400px)_rotateY(-14deg)_rotateX(3deg)]">
        {/* Gold edge frame */}
        <div className="rounded-[3rem] bg-gradient-to-b from-primary/70 via-primary/20 to-primary/50 p-[2px] shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(212,175,55,0.15)]">
          <div className="relative rounded-[calc(3rem-2px)] bg-[#0B1C29] px-2 pb-3 pt-2">
            {/* Side buttons */}
            <span className="absolute -left-[3px] top-24 h-10 w-[3px] rounded-l bg-primary/50" />
            <span className="absolute -left-[3px] top-40 h-14 w-[3px] rounded-l bg-primary/30" />
            <span className="absolute -right-[3px] top-32 h-16 w-[3px] rounded-r bg-primary/30" />

            {/* Screen */}
            <div className="overflow-hidden rounded-[2.4rem] bg-foreground/[0.04]">
              {/* Dynamic island */}
              <div className="flex justify-center pt-2.5">
                <div className="h-[20px] w-[92px] rounded-full bg-black" />
              </div>
              {/* Status bar */}
              <div className="flex items-center justify-between px-5 pb-1 pt-1.5 text-foreground">
                <span className="text-[11px] font-bold tabular-nums">9:41</span>
                <span className="flex items-center gap-1.5">
                  <Signal className="h-3 w-3" />
                  <Wifi className="h-3 w-3" />
                  <BatteryMedium className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="px-4 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-[2px] text-primary">
                Votre page · cette semaine
              </p>
              <div className="h-[300px] overflow-hidden px-3 pb-4">
                <div className={cn(!staticMode && "feed-scroll flex flex-col gap-2")}>
                  {[...FEED_CARDS, ...FEED_CARDS].map((c, i) => (
                    <div
                      key={`${c.title}-${i}`}
                      className="flex items-center gap-3 rounded-[14px] border border-primary/15 bg-background/60 p-3 backdrop-blur"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary to-[#8a6d1c] shadow-[0_4px_12px_rgba(212,175,55,0.35)]">
                        <c.Icon className="h-5 w-5 text-black-deep" strokeWidth={2.2} />
                      </span>
                      <span>
                        <span className="block text-[12px] font-bold text-foreground">{c.title}</span>
                        <span className="block text-[11px] text-muted-foreground">{c.sub}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Home indicator */}
              <div className="flex justify-center pb-2">
                <div className="h-[4px] w-24 rounded-full bg-foreground/30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile notifications (below phone, static) */}
      <div className="mt-5 flex flex-col gap-2 sm:hidden">
        {NOTIFS.map((text) => (
          <div
            key={text}
            className="flex items-start gap-2 rounded-[10px] border border-primary/30 bg-background/95 p-3"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-[11px] font-bold leading-snug text-foreground">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
