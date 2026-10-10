/**
 * WeekPack — "Votre mois en un coup d'œil" : a 12-post calendar mosaic.
 * Rendered only when week-pack assets exist (see ASSETS.md).
 */
export function WeekPack({ posts }: { posts: { src: string; label: string }[] }) {
  if (posts.length === 0) return null;
  return (
    <figure className="overflow-hidden rounded-[8px] border border-foreground/10 bg-foreground/[0.03]">
      <div className="grid grid-cols-3 gap-1 p-1 sm:grid-cols-4">
        {posts.slice(0, 12).map((p) => (
          <div key={p.src} className="relative aspect-square overflow-hidden rounded-[4px]">
            <img src={p.src} alt={p.label} loading="lazy" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <figcaption className="p-4 text-[13px] text-muted-foreground">
        Votre mois en un coup d'œil : 12 publications planifiées, créées et prêtes.
      </figcaption>
    </figure>
  );
}
