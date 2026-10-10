/**
 * POST /api/lead — Lead API (Vercel serverless function).
 *
 * The client calls this FIRST with a 1.5s timeout, then opens WhatsApp
 * regardless of success — the redirect must never be blocked.
 *
 * Env vars (see README):
 *   LEAD_WEBHOOK_URL     destination webhook (Google Apps Script / Airtable /
 *                        Supabase / n8n). JSON POST. Optional but recommended.
 *   TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID  instant notification. Optional.
 */
import { z } from "zod";

const LeadSchema = z.object({
  id: z.string().max(32),
  createdAt: z.string().max(64),
  step: z.number().int().min(1).max(6),
  business: z.string().max(120).optional().default(""),
  firstName: z.string().max(80).optional().default(""),
  whatsapp: z.string().max(24).optional().default(""),
  city: z.string().max(80).optional().default(""),
  sector: z.string().max(80).optional().default(""),
  sectorKey: z.string().max(32).optional().default(""),
  pains: z.array(z.string().max(120)).max(5).optional().default([]),
  painKeys: z.array(z.string().max(32)).max(5).optional().default([]),
  goal: z.string().max(120).optional().default(""),
  goalKey: z.string().max(32).optional().default(""),
  networks: z.array(z.string().max(40)).max(8).optional().default([]),
  pageUrl: z.string().max(300).optional().default(""),
  plan: z.enum(["essentials", "standard", "business"]).optional().default("essentials"),
  period: z.enum(["monthly", "annual"]).optional().default("monthly"),
  price: z.number().int().min(0).max(10000000).optional().default(0),
  src: z.string().max(64).optional().default(""),
  utm: z
    .object({ source: z.string().max(64), medium: z.string().max(64), campaign: z.string().max(128) })
    .optional()
    .default({ source: "", medium: "", campaign: "" }),
  recommendedPlan: z.enum(["essentials", "standard", "business"]).optional(),
  completed: z.boolean().optional().default(false),
  // Honeypot — bots fill it, humans never see it.
  website: z.string().max(200).optional().default(""),
});

// Basic per-instance rate limit: 10 requests / minute / IP.
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - 60_000;
  const list = (hits.get(ip) || []).filter((t) => t > windowStart);
  list.push(now);
  hits.set(ip, list);
  return list.length > 10;
}

type Req = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  body?: unknown;
};
type Res = {
  status: (code: number) => { json: (data: unknown) => void };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  const request = req as Req;
  const response = res as Res;
  if (request.method !== "POST") {
    return response.status(405).json({ ok: false, error: "method_not_allowed" });
  }
  const forwarded = request.headers?.["x-forwarded-for"];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return response.status(429).json({ ok: false, error: "rate_limited" });
  }

  const parsed = LeadSchema.safeParse(request.body);
  if (!parsed.success) {
    return response.status(400).json({ ok: false, error: "invalid_payload" });
  }
  const lead = parsed.data;
  if (lead.website) {
    // Honeypot filled → pretend success, store nothing.
    return response.status(200).json({ ok: true });
  }

  const { website: _honeypot, ...payload } = lead;
  void _honeypot;

  const tasks: Promise<unknown>[] = [];
  if (process.env.LEAD_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, ip }),
      }).then((r) => {
        if (!r.ok) throw new Error(`webhook_${r.status}`);
      })
    );
  }
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    const text = [
      `🆕 Lead NEFERTEM ${payload.completed ? "(complet)" : `(étape ${payload.step})`}`,
      `Dossier : ${payload.id}`,
      `Entreprise : ${payload.business || "—"} (${payload.sector || "—"}, ${payload.city || "—"})`,
      `Contact : ${payload.firstName || "—"} — ${payload.whatsapp || "—"}`,
      `Offre : ${payload.plan} / ${payload.period} — ${payload.price} FCFA/mois`,
      `Source : ${payload.src || "direct"}`,
    ].join("\n");
    tasks.push(
      fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text }),
      }).then((r) => {
        if (!r.ok) throw new Error(`telegram_${r.status}`);
      })
    );
  }

  try {
    await Promise.all(tasks);
  } catch {
    // Webhook/Telegram down — the lead still reached us via WhatsApp.
    return response.status(200).json({ ok: true, stored: false });
  }
  return response.status(200).json({ ok: true, stored: tasks.length > 0 });
}
