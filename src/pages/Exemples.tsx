import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { PageTransition } from "@/components/PageTransition";
import { SECTOR_TABS, SHOWCASE_ITEMS } from "@/data/showcase";
import { VideoCard } from "@/components/showcase/VideoCard";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Exemples() {
  const [sector, setSector] = useState("all");
  const items = SHOWCASE_ITEMS.filter((i) => sector === "all" || i.sectorKey === sector);

  return (
    <PageTransition className="min-h-screen bg-background/0 text-foreground pt-[100px] md:pt-[120px] pb-12 md:pb-24 border-t border-primary/20">
      <SEO
        title="Ce que NEFERTEM crée pour vous"
        description="Des visuels et des vidéos pensés pour votre secteur, prêts à publier. Exemples de production NEFERTEM."
        path="/exemples"
      />
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[2px] text-primary">
            Exemples de production
          </p>
          <h1 className="mt-4 font-heading text-[28px] font-normal uppercase leading-tight tracking-[1px] text-foreground sm:text-[40px] md:text-[48px]">
            Ce que NEFERTEM crée pour vous
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-muted-foreground">
            Des visuels et des vidéos pensés pour votre secteur, prêts à publier.
          </p>
        </div>

        {/* Sector tabs — sticky, scrollable on mobile */}
        <div className="sticky top-[80px] z-30 -mx-4 border-b border-foreground/10 bg-background/95 px-4 py-3 backdrop-blur-md">
          <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label="Filtrer par secteur">
            {SECTOR_TABS.map((t) => {
              const active = sector === t.key;
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSector(t.key)}
                  className={cn(
                    "min-h-[44px] shrink-0 rounded-full px-5 text-[12px] font-bold uppercase tracking-[1px]",
                    active
                      ? "bg-primary text-black-deep"
                      : "border border-foreground/15 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry grid */}
        {items.length > 0 ? (
          <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="break-inside-avoid overflow-hidden rounded-[12px] border border-foreground/10 bg-foreground/[0.02]"
              >
                <VideoCard item={item} />
                <div className="p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[2px] text-primary">
                    {item.sector} · {item.plan}
                  </p>
                  <h2 className="mt-1 font-heading text-[20px] uppercase tracking-[1px] text-foreground">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{item.caption}</p>
                  <Link
                    to={`/demarrer?src=showcase&sector=${item.sectorKey}`}
                    onClick={() => track("cta_click", { location: "showcase", label: item.id })}
                    className="mt-3 inline-block min-h-[44px] text-[13px] font-bold uppercase tracking-[1px] text-primary hover:underline"
                  >
                    Je veux ça →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-[15px] text-muted-foreground">
            D'autres exemples arrivent dans ce secteur — demandez votre diagnostic gratuit en attendant.
          </p>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/demarrer?src=showcase"
            onClick={() => track("cta_click", { location: "showcase", label: "diagnostic" })}
            className="inline-flex min-h-[56px] items-center justify-center rounded-[4px] bg-primary px-8 text-[13px] font-bold uppercase tracking-[1px] text-black-deep shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:bg-gold-accent"
          >
            → Recevoir mon diagnostic gratuit
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
