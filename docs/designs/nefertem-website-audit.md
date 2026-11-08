# NEFERTEM Website Audit

* **Author:** Jeremy (EGM Audit)
* **Date:** 2026-11-02
* **Repo:** https://github.com/UlkhadPharaon/Voix-d-or-marketing-offers-2.git
* **Local:** `F:\NEFERTEM\Website`

## Overview

This is a modern React marketing site for NEFERTEM. The stack is React 19 + Vite 6 + Tailwind CSS 4 + TypeScript. The site has a clear conversion funnel: home page → wizard (`/demarrer`) → WhatsApp. The visual direction is dark-mode-first with gold accents, glassmorphism, and motion. The codebase is structured, but several production blockers and technical debt items need resolution before the site can be considered reliable at scale.

## Analysis

### 🔴 Blockers

1. **Unfinished legal copy in production code**
   - `src/pages/MentionsLegales.tsx` contains explicit TODOs for legal review: corporate name, full address, publishing director, hosting provider. Publishing this as-is exposes the business to legal risk.
   - `src/components/ui/pricing-section-4.tsx` has a TODO that the guarantee wording must be legally validated before publication.
   - `src/pages/Home.tsx` has two open TODOs: testimonial validation and guarantee label validation.

2. **Empty social-proof slots**
   - `TESTIMONIALS` in `Home.tsx` is an empty array. The trust section renders nothing. Visitors see no testimonials.
   - `TESTIMONIAL` in `pricing-section-4.tsx` is `null`. The pricing testimonial slot is dead code.
   - `showcase.ts` data notes that assets are missing; items without assets are hidden. The showcase is currently YouTube-only and fragile.

3. **Hardcoded secrets / business data scattered across components**
   - WhatsApp number `22673764882` is hardcoded in `Layout.tsx`, `pricing-section-4.tsx`, `lead.ts`, and multiple CTAs. If the number changes, it requires a grep across the repo and risks missing a call site.
   - No environment-layer abstraction for business-critical constants.

4. **Lead API path is unverified in this audit**
   - `POST /api/lead` is referenced in `Demarrer.tsx` and `README.md`, but `api/lead.ts` was not inspected. If it is missing or misconfigured, leads are silently lost. The client swallows failures and only tracks `lead_api_failed`. There is no user-visible fallback if the API is down.

### 🟡 Major

1. **Performance risk on low-end devices**
   - `Layout.tsx` runs two infinite animated orbs (`duration: 20` and `25`, `repeat: Infinity`) plus an SVG noise overlay in the background layer. On mobile or low-end Windows laptops, this will consume GPU/CPU continuously.
   - `Home.tsx` uses `CountUp` with `requestAnimationFrame` and `whileInView` on multiple elements simultaneously. No throttling or prefers-reduced-motion guard beyond the initial check.

2. **Analytics is configured to `none` by default**
   - `analytics.ts` defaults to `none`. If the owner never sets `VITE_ANALYTICS_PROVIDER`, all funnel events (`onboarding_started`, `cta_click`, `onboarding_completed`) are silently dropped. There is no build-time warning or runtime log.

3. **Routing and SEO inconsistencies**
   - `App.tsx` maps `/contact` → `/demarrer` and `/portfolio` → `/exemples`, but there is no redirect in `vercel.json` or `_redirects` for legacy URLs. If external links point to `/contact`, they rely on client-side routing.
   - `SEO.tsx` uses `og:locale` as `fr_FR`. The target market is Burkina Faso. `fr_BF` would be more accurate, but the bigger issue is that `VITE_SITE_URL` defaults to `https://nefertem.africa` with a TODO to confirm the canonical domain.
   - `sitemap.xml` and `robots.txt` exist in `public/` but were not inspected for content accuracy.

4. **Accessibility gaps**
   - Mobile menu close button has no accessible name (`<button>` with only `<X size={24} />`, no `aria-label`).
   - `BeforeAfter` tabs use `role="tablist"` but the panels are not wired with `role="tabpanel"` and `aria-labelledby` relationships.
   - `PhoneFeedMockup` component was not fully inspected; if it contains video or animation, it needs `prefers-reduced-motion` handling.

5. **Error handling is thin**
   - `postLead` in `Demarrer.tsx` returns `boolean` but the caller only tracks failure. There is no retry, no queue, and no user feedback if the lead API is unreachable. The user is redirected to WhatsApp regardless, which is good for conversion but bad for data completeness.

### 🟢 Nits

1. **Package.json identity is boilerplate**
   - `name` is `react-example`. Should be `nefertem-website` or similar for clarity in CI/CD logs and dependency audits.

2. **Inconsistent spacing scale**
   - Mix of `px-4`, `px-6`, `md:px-10`, `md:px-[40px]`. A single spacing token system would reduce visual drift.

3. **Magic numbers in animations**
   - `Spotlight` fill `#D4AF37` is repeated inline. Should be a CSS variable or design token.
   - Multiple `duration`, `delay`, and shadow values are hardcoded across components.

4. **Missing alt text strategy**
   - `Logo` component has `alt="Logo NEFERTEM"`, but other images (if any are added later) have no enforced alt-text pattern.

5. **No CI/CD gate visible**
   - No `vercel.json` headers for caching, no `_headers` content inspected, no security headers (CSP, X-Frame-Options) verified.

## Goals vs. Non-Goals

* **In-Scope Goals:**
  * Fix legal TODOs before next deployment.
  * Replace hardcoded WhatsApp number with a single source of truth.
  * Add at least 3 real testimonials or remove the empty trust block.
  * Verify `api/lead.ts` exists, validates with zod, and has a fallback notification path.
  * Reduce background animation cost on low-end devices.
  * Harden accessibility on mobile menu and tabs.

* **Out-of-Scope Non-Goals:**
  * Redesign the visual direction (dark/gold is approved).
  * Migrate to a different framework or CMS.
  * Add a backend database or authentication system.

## Alternatives Weighed

1. **Static site generator (Astro/Next.js)**
   * Rejected: the current React + Vite setup already meets performance needs; migration cost outweighs benefit unless the site grows to 20+ pages.

2. **Headless CMS for legal pages**
   * Rejected: legal pages change rarely; a CMS adds attack surface and build complexity for no conversion gain.

3. **Third-party form service (Typeform, Tally)**
   * Rejected: the custom wizard captures richer data (UTM, source, plan recommendation) and keeps the user on-brand. A third-party form would break the session persistence and WhatsApp handoff flow.

## Key Decisions & Staging for Next Steps

1. **Legal copy must be reviewed by a jurist before deployment.** No exceptions.
2. **WhatsApp number → single source of truth** via `lead.ts` export + environment override for staging.
3. **Testimonials:** either populate the array with real client quotes + photos, or remove the trust block entirely. An empty block is worse than no block.
4. **Lead API:** confirm `api/lead.ts` exists and add a Telegram/webhook fallback that the client can verify.
5. **Performance:** add a `prefers-reduced-motion` media query that disables orbs and reduces animation count on mobile.
