# Showcase — fichiers à fournir par le propriétaire

Les exemples affichés sur `/exemples` viennent de `src/data/showcase.ts`.
Tout élément dont le fichier manque est **masqué automatiquement** : il n'y a
jamais de cadre vide ou noir. Ajoutez les fichiers ci-dessous puis déclarez
chaque élément dans `showcase.ts`.

## Dossier : `/public/showcase/<secteur>/`

Secteurs : `restauration/`, `commerce/`, `beaute/`, `mode/`, `immo/`, `sante/`.

## Spécifications

| Type | Fichiers | Contraintes |
|---|---|---|
| Image (`image`) | `nom.webp` + `nom-poster.jpg` | WebP ≤ 200 Ko, 1080×1350 ou 1080×1920 |
| Vidéo (`video`) | `nom.mp4` + `nom-poster.jpg` | MP4 H.264, 10–15 s, ≤ 3 Mo, 720×1280, muet de préférence + poster JPG |
| Avant/Après (`beforeAfter`) | `nom-avant.webp` + `nom-après.webp` | Même cadrage, même taille, WebP ≤ 200 Ko chacun |
| Pack semaine (`weekPack`) | 12 fichiers `s1.webp` … `s12.webp` | Carré 1080×1080, WebP ≤ 150 Ko chacun |

## Déclarer un élément (`src/data/showcase.ts`)

```ts
{
  id: "ma-boulangerie",
  sector: "Restauration",
  sectorKey: "restauration",
  type: "image", // 'image' | 'video' | 'beforeAfter' | 'weekPack'
  title: "Boulangerie du marché",
  caption: "Ce que nous avons créé : ...",
  plan: "Essentials", // 'Essentials' | 'Standard' | 'Business'
  src: "/showcase/restauration/boulangerie.webp",
  poster: "/showcase/restauration/boulangerie-poster.jpg",
}
```

Règles d'honnêteté : légende « Ce que nous avons créé » uniquement.
Pas de nom de client ni de résultat inventés.
