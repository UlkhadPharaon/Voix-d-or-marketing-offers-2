# Déploiement Cloudflare Pages — NEFERTEM Website

Site statique Vite + React (SPA). Aucune variable d'environnement requise pour le build.

## Option recommandée : connecter GitHub (2 min)

1. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Sélectionner le repo `UlkhadPharaon/Voix-d-or-marketing-offers-2`, branche `main`.
3. Réglages de build :
   - **Framework preset** : `Vite`
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
   - **Node version** : `20` (fichier `.nvmrc` déjà présent)
4. Variables d'environnement (Build) :
   - `PUPPETEER_SKIP_DOWNLOAD=true` (évite le téléchargement Chrome de `puppeteer`, inutilisé au build)
5. **Save and Deploy**. Chaque `git push` sur `main` redéploie automatiquement.
   Les PR obtiennent une URL de prévisualisation.

## Déjà prêt dans le repo

- `public/_redirects` : `/* /index.html 200` → les routes `/contact`, `/portfolio`, `/securite` fonctionnent en SPA (sinon 404 au refresh).
- `public/_headers` : cache long sur `/assets/*` (fichiers hashés Vite), cache 24h sur `*.splinecode`, en-têtes de sécurité de base.
- `public/logo/nefertem-mark.png` + `nefertem-full.png` : favicon (`index.html`) et image SEO (`Home.tsx`) résolvaient vers `./logo/...` qui n'existait pas dans `dist` (seul `public/` est copié). Corrigé en dupliquant les fichiers dans `public/logo/`.
- `.nvmrc` : `20` (Vite 6 exige Node 20+).
- `vercel.json` conservé : sans effet sur Cloudflare.

## Domaine personnalisé

Pages → **Custom domains** → ajouter le domaine → Cloudflare crée le DNS automatiquement si la zone est chez Cloudflare.

## Dépannage

| Symptôme | Cause probable | Fix |
|---|---|---|
| 404 sur `/contact` au refresh | `_redirects` manquant | Vérifier `public/_redirects` déployé à la racine du `dist` |
| Favicon / image SEO cassés | assets hors `public/` | Remis dans `public/logo/` — ne pas référencer `logo/` racine en URL directe |
| Build error `esbuild` / Node | Mauvaise version Node | Forcer Node `20` dans les réglages Pages |
| Build lent / timeout Chrome | `puppeteer` postinstall | Env `PUPPETEER_SKIP_DOWNLOAD=true` |
| Page blanche | JS bloqué / cache | Rebuild + purge cache Pages, vérifier la console navigateur |
