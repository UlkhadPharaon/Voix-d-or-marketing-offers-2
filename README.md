<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/3717e368-c540-4ef1-84b8-4d96c1595c54

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Environment variables

Copy `.env.example` to `.env.local` and fill what you use. Every variable
is optional — the site works without any of them.

| Variable | Usage |
|---|---|
| `VITE_SITE_URL` | Canonical site URL for SEO (default `https://nefertem.africa`) |
| `VITE_ANALYTICS_PROVIDER` | `none` (default) \| `plausible` \| `ga4` |
| `VITE_ANALYTICS_DOMAIN` | Plausible domain (default: current hostname) |
| `VITE_GA4_ID` | GA4 measurement ID (`G-…`), required when provider is `ga4` |
| `LEAD_WEBHOOK_URL` | (server) destination webhook for `POST /api/lead` — Google Apps Script, Airtable, Supabase or n8n |
| `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` | (server) instant lead notification on Telegram |

## Lead API (`POST /api/lead`)

Vercel serverless function (`api/lead.ts`). It validates the payload with
zod, rejects bots via honeypot + a basic per-instance rate limit
(10 req/min/IP), and forwards to `LEAD_WEBHOOK_URL` and/or Telegram.
The client (`/demarrer` wizard) always calls it with a 1.5 s timeout and
opens WhatsApp regardless of the result — a lead is never lost because
the API failed. Failures are reported with the `lead_api_failed` event.

Lead schema: `{id, createdAt, step, business, firstName, whatsapp, city,
sector, pains[], goal, networks[], pageUrl, plan, period, price, src,
utm{source,medium,campaign}, recommendedPlan, completed}`. A partial lead
(`completed:false`) is saved after step 1 and updated at the end.

## Deployment

- **Vercel** : preset Vite, build `npm run build`, output `dist`.
  `vercel.json` rewrites everything to `/index.html` except `/api/*`.
- **Cloudflare Pages** : see `CLOUDFLARE.md`. Build `npm run build`,
  output `dist`, Node 20, `PUPPETEER_SKIP_DOWNLOAD=true`.
