/**
 * Showcase data — single source for the /exemples page and the Home teaser.
 *
 * Honest labelling only: "Exemples de production". No invented client
 * names, no invented results.
 *
 * TODO(owner): provide local assets per ASSETS.md (WebP images, MP4 videos,
 * before/after pairs, week packs) under /public/showcase/<sector>/, then add
 * items below with type 'image' | 'video' | 'beforeAfter' | 'weekPack'.
 * Items whose asset is missing are hidden automatically (never a black box).
 */

export type ShowcaseType = "youtube" | "image" | "video" | "beforeAfter" | "weekPack";

export interface ShowcaseItem {
  id: string;
  sector: string;
  sectorKey: string;
  type: ShowcaseType;
  title: string;
  caption: string;
  plan: string;
  /** YouTube video id (type 'youtube') */
  youtubeId?: string;
  /** Local asset paths (types 'image' | 'video' | 'beforeAfter' | 'weekPack') */
  src?: string;
  poster?: string;
  before?: string;
  after?: string;
}

export const SECTOR_TABS = [
  { key: "all", label: "Tout" },
  { key: "restauration", label: "Restauration" },
  { key: "commerce", label: "Commerce" },
  { key: "beaute", label: "Beauté & Parfum" },
  { key: "mode", label: "Mode & Bijoux" },
  { key: "immo", label: "Immobilier & BTP" },
  { key: "sante", label: "Santé & Éducation" },
];

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "gastronomie",
    sector: "Restauration",
    sectorKey: "restauration",
    type: "youtube",
    title: "Gastronomie",
    caption: "Ce que nous avons créé : une vidéo appétissante pour donner envie de commander.",
    plan: "Standard",
    youtubeId: "yImx6vMXneI",
  },
  {
    id: "supermarche",
    sector: "Commerce",
    sectorKey: "commerce",
    type: "youtube",
    title: "Supermarché",
    caption: "Ce que nous avons créé : des visuels réguliers qui mettent les promos en valeur.",
    plan: "Essentials",
    youtubeId: "j5ktRSbDMEU",
  },
  {
    id: "retail",
    sector: "Commerce",
    sectorKey: "commerce",
    type: "youtube",
    title: "Retail & Commerce",
    caption: "Ce que nous avons créé : un rythme de publications qui garde la boutique visible.",
    plan: "Essentials",
    youtubeId: "wLzagc6DvDE",
  },
  {
    id: "parfumerie",
    sector: "Beauté & Parfum",
    sectorKey: "beaute",
    type: "youtube",
    title: "Parfumerie et Luxe",
    caption: "Ce que nous avons créé : une campagne complète à l'image premium.",
    plan: "Business",
    youtubeId: "xyguAEQNeEg",
  },
];

export const youtubeThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
export const youtubeEmbed = (id: string, playlist: boolean) =>
  playlist
    ? `https://www.youtube-nocookie.com/embed/videoseries?list=${id}`
    : `https://www.youtube-nocookie.com/embed/${id}`;
