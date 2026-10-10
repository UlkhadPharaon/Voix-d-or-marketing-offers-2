/**
 * Analytics — configurable by env var, no-op when unconfigured.
 *
 *   VITE_ANALYTICS_PROVIDER = 'none' | 'plausible' | 'ga4'   (default 'none')
 *   VITE_ANALYTICS_DOMAIN   = Plausible domain (default: current hostname)
 *   VITE_GA4_ID             = GA4 measurement ID (G-XXXXXXXX)
 *
 * Events used across the site:
 * cta_click {location, label} · billing_toggle {period} ·
 * onboarding_started {} · onboarding_step {n} · onboarding_completed {plan, period} ·
 * whatsapp_opened {src, plan?} · showcase_item_opened {sector, id} ·
 * faq_opened {id} · lead_api_failed {step}
 */
type Provider = "none" | "plausible" | "ga4";

const PROVIDER = ((import.meta.env.VITE_ANALYTICS_PROVIDER as string) || "none").toLowerCase() as Provider;
const DOMAIN = (import.meta.env.VITE_ANALYTICS_DOMAIN as string) || window.location.hostname;
const GA_ID = (import.meta.env.VITE_GA4_ID as string) || "";

let loaded = false;

function ensureScript() {
  if (loaded || PROVIDER === "none" || typeof document === "undefined") return;
  loaded = true;
  if (PROVIDER === "plausible") {
    const s = document.createElement("script");
    s.defer = true;
    s.dataset.domain = DOMAIN;
    s.src = "https://plausible.io/js/script.js";
    document.head.appendChild(s);
  } else if (PROVIDER === "ga4" && GA_ID) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
    (window as unknown as { dataLayer: unknown[] }).dataLayer =
      (window as unknown as { dataLayer?: unknown[] }).dataLayer || [];
    const gtag = (...args: unknown[]) =>
      ((window as unknown as { dataLayer: unknown[] }).dataLayer.push(args));
    (window as unknown as { gtag: unknown }).gtag = gtag;
    (gtag as (...a: unknown[]) => void)("js", new Date());
    (gtag as (...a: unknown[]) => void)("config", GA_ID);
  }
}

export function track(event: string, props: Record<string, string | number> = {}) {
  try {
    if (PROVIDER === "none") return;
    ensureScript();
    if (PROVIDER === "plausible") {
      const p = (window as unknown as { plausible?: (e: string, o?: { props: typeof props }) => void }).plausible;
      if (p) p(event, { props });
    } else if (PROVIDER === "ga4") {
      const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
      if (gtag) gtag("event", event, props);
    }
  } catch {
    /* analytics must never break the site */
  }
}
