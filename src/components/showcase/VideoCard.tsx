import { useState } from "react";
import { Play } from "lucide-react";
import { track } from "@/lib/analytics";
import { youtubeEmbed, youtubeThumb, type ShowcaseItem } from "@/data/showcase";

/**
 * Click-to-load video facade — no iframe (and no black box) until the
 * visitor presses play. Poster from YouTube, embed via youtube-nocookie.
 */
export function VideoCard({ item }: { item: ShowcaseItem }) {
  const [loaded, setLoaded] = useState(false);
  const isPlaylist = (item.youtubeId || "").startsWith("PL");

  const play = () => {
    setLoaded(true);
    track("showcase_item_opened", { sector: item.sectorKey, id: item.id });
  };

  if (loaded && item.youtubeId) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-[8px] bg-foreground/5">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`${youtubeEmbed(item.youtubeId, isPlaylist)}?autoplay=1&rel=0`}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={play}
      aria-label={`Lire la vidéo : ${item.title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-[8px] border border-foreground/10 bg-foreground/[0.04] text-left"
    >
      {!isPlaylist && item.youtubeId ? (
        <img
          src={youtubeThumb(item.youtubeId)}
          alt=""
          width={480}
          height={360}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <span className="absolute inset-0 bg-gradient-to-br from-primary/30 via-foreground/10 to-teal-deep/40" aria-hidden="true" />
      )}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-black-deep shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-transform group-hover:scale-110">
          <Play className="ml-1 h-7 w-7 fill-black-deep" aria-hidden="true" />
        </span>
      </span>
      <span className="absolute bottom-3 left-3 rounded-sm bg-background/85 px-2 py-1 text-[10px] font-bold uppercase tracking-[1px] text-foreground backdrop-blur">
        {item.plan}
      </span>
    </button>
  );
}
