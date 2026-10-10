import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const FEED_CARDS = [
  { emoji: "🍲", title: "Menu du jour", sub: "Plat + jus · 1 500 F", hue: "from-amber-500/40 to-orange-700/40" },
  { emoji: "✨", title: "Nouvelle collection", sub: "Disponible en boutique", hue: "from-fuchsia-500/40 to-purple-700/40" },
  { emoji: "🎥", title: "En cuisine ce matin", sub: "Vidéo 15 s", hue: "from-sky-500/40 to-blue-700/40" },
  { emoji: "🏷️", title: "-20 % ce week-end", sub: "Offre limitée", hue: "from-emerald-500/40 to-teal-700/40" },
  { emoji: "💬", title: "Ils nous ont choisis", sub: "Avis clients", hue: "from-yellow-500/40 to-amber-700/40" },
];

const NOTIFS = [
  { text: "Votre lot de la semaine est prêt", delay: "0.8s" },
  { text: "Un client vient d'être accueilli sur WhatsApp", delay: "2.2s" },
];

/**
 * Hero phone mockup — pure CSS illustration (no fake client photos).
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
    <div className="relative mx-auto w-[270px] sm:w-[300px]" aria-hidden="true">
      {/* Notifications */}
      {!staticMode ? (
        <div className="absolute -left-40 top-8 z-20 hidden w-44 flex-col gap-2 sm:flex">
          {NOTIFS.map((n) => (
            <div
              key={n.text}
              style={{ animationDelay: n.delay }}
              className="notif-in flex items-start gap-2 rounded-[8px] border border-primary/30 bg-background/95 p-3 shadow-xl backdrop-blur"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
              <p className="text-[11px] font-bold leading-snug text-foreground">{n.text}</p>
            </div>
          ))}
        </div>
      ) : null}

      {/* Phone frame */}
      <div className="rounded-[32px] border border-foreground/15 bg-background p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div className="overflow-hidden rounded-[24px] bg-foreground/[0.04]">
          {/* Notch */}
          <div className="flex justify-center pt-2">
            <div className="h-[18px] w-[90px] rounded-full bg-foreground/80" />
          </div>
          <p className="px-4 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[2px] text-muted-foreground">
            Votre page · cette semaine
          </p>
          <div className="h-[300px] overflow-hidden px-3 pb-3">
            <div className={cn(!staticMode && "feed-scroll flex flex-col gap-2")}>
              {[...FEED_CARDS, ...FEED_CARDS].map((c, i) => (
                <div
                  key={`${c.title}-${i}`}
                  className={cn(
                    "flex items-center gap-3 rounded-[12px] border border-foreground/10 bg-gradient-to-br p-3",
                    c.hue
                  )}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-background/70 text-xl">
                    {c.emoji}
                  </span>
                  <span>
                    <span className="block text-[12px] font-bold text-foreground">{c.title}</span>
                    <span className="block text-[11px] text-muted-foreground">{c.sub}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile notifications (below phone, static) */}
      <div className="mt-4 flex flex-col gap-2 sm:hidden">
        {NOTIFS.map((n) => (
          <div
            key={n.text}
            className="flex items-start gap-2 rounded-[8px] border border-primary/30 bg-background/95 p-3"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
            <p className="text-[11px] font-bold leading-snug text-foreground">{n.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
