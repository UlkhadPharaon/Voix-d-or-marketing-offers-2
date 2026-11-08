# NEFERTEM Website Improvement Plan

* **Source:** `docs/designs/nefertem-website-audit.md`
* **Date:** 2026-11-02

## Priority 1 — Blockers (do before next deployment)

| # | Action | File(s) | Owner | Effort |
|---|--------|---------|-------|--------|
| 1.1 | Complete legal copy: raison sociale, adresse, directeur de publication, hébergeur. | `src/pages/MentionsLegales.tsx` | Owner + jurist | 30 min |
| 1.2 | Validate guarantee wording with jurist before publishing. | `src/components/ui/pricing-section-4.tsx`, `src/pages/Home.tsx` | Owner + jurist | 15 min |
| 1.3 | Remove empty `TESTIMONIALS` array and empty testimonial slot, OR add 3 real client quotes with names and photos. | `src/pages/Home.tsx`, `src/components/ui/pricing-section-4.tsx` | Owner | 1-2 h |
| 1.4 | Verify `api/lead.ts` exists, zod schema matches `Lead` type, and rate limit is active. Add Telegram notification if missing. | `api/lead.ts` | Dev | 1 h |
| 1.5 | Replace hardcoded WhatsApp number with a single constant exported from `src/lib/lead.ts` and consumed everywhere. | `src/lib/lead.ts`, `src/components/Layout.tsx`, `src/components/ui/pricing-section-4.tsx` | Dev | 30 min |

## Priority 2 — Major Improvements (next sprint)

| # | Action | File(s) | Owner | Effort |
|---|--------|---------|-------|--------|
| 2.1 | Add `prefers-reduced-motion` guard that disables background orbs and reduces `CountUp` instances on mobile. | `src/components/Layout.tsx`, `src/pages/Home.tsx` | Dev | 1 h |
| 2.2 | Add build-time warning or README note if `VITE_ANALYTICS_PROVIDER` is still `none` in production. | `src/lib/analytics.ts`, `README.md` | Dev | 15 min |
| 2.3 | Add `_redirects` or `vercel.json` rewrites for legacy paths (`/contact`, `/portfolio`) with 301. | `vercel.json`, `public/_redirects` | Dev | 15 min |
| 2.4 | Fix accessibility: add `aria-label` to mobile menu button, wire `role="tabpanel"` in `BeforeAfter`, audit `PhoneFeedMockup` for motion. | `src/components/Layout.tsx`, `src/pages/Home.tsx`, `src/components/home/PhoneFeedMockup.tsx` | Dev | 1 h |
| 2.5 | Confirm canonical domain and set `VITE_SITE_URL` in Vercel env. Update `og:locale` to `fr_BF` or keep `fr_FR` if targeting francophone Africa broadly. | `src/components/SEO.tsx`, Vercel env | Owner + Dev | 15 min |

## Priority 3 — Nits (polish, low urgency)

| # | Action | File(s) | Owner | Effort |
|---|--------|---------|-------|--------|
| 3.1 | Rename `package.json` `name` from `react-example` to `nefertem-website`. | `package.json` | Dev | 5 min |
| 3.2 | Consolidate spacing scale: replace `px-[40px]` and other magic values with Tailwind theme tokens or consistent utilities. | `src/components/Layout.tsx`, `src/pages/Home.tsx` | Dev | 30 min |
| 3.3 | Extract `#D4AF37` gold color into a CSS variable or Tailwind theme token; replace inline Spotlight fill. | `tailwind.config.*` or CSS variables, `src/pages/Home.tsx` | Dev | 20 min |
| 3.4 | Inspect `public/_headers` and add security headers (CSP, X-Frame-Options) if missing. | `public/_headers` | Dev | 15 min |
| 3.5 | Remove unused or placeholder scripts (`replace.ts`, `replace2.ts`, `replace3.ts`, `search.cjs`, `search2.cjs`, `search-src.cjs`, `fetch.mjs`, `check-spline.cjs`) if they are not part of the build. | repo root | Dev | 10 min |

## Execution Order

1. **Week 1:** Blockers 1.1 → 1.5 in order. Do not deploy until 1.1 and 1.2 are signed off.
2. **Week 2:** Major improvements 2.1 → 2.5.
3. **Week 3:** Nits 3.1 → 3.5.

## Risk Notes

* **Legal delay:** If the jurist review takes more than 48 h, deploy a temporary "Mentions légales en cours de validation" banner and pause public ads.
* **Lead API failure:** Until 1.4 is confirmed, monitor `lead_api_failed` events in analytics. If volume exceeds 5%, pause spend and investigate.
* **Showcase assets:** If local assets are not provided, the showcase remains YouTube-dependent. Consider removing the section until assets are ready rather than showing empty cards.
