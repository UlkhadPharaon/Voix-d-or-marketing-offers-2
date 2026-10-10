/**
 * Lead schema + WhatsApp message builder (pure functions, no imports).
 * Shared by the /demarrer wizard and verified by a standalone check
 * (see scripts/check-lead.mjs note in README).
 */

export const WHATSAPP_NUMBER = "22605830599";

export type PlanKey = "essentials" | "standard" | "business";
export type PeriodKey = "monthly" | "annual";

export const PLAN_NAMES: Record<PlanKey, string> = {
  essentials: "Essentials",
  standard: "Standard",
  business: "Business",
};

export const PLAN_PRICES: Record<PlanKey, { monthly: number; annualMonthly: number }> = {
  essentials: { monthly: 30000, annualMonthly: 25500 },
  standard: { monthly: 60000, annualMonthly: 51000 },
  business: { monthly: 90000, annualMonthly: 76500 },
};

export interface CatalogItem {
  key: string;
  label: string;
}

export const SECTORS: CatalogItem[] = [
  { key: "restaurant", label: "Restaurant & Café" },
  { key: "boutique", label: "Boutique & Mode" },
  { key: "beaute", label: "Beauté, Parfum & Bijoux" },
  { key: "commerce", label: "Supermarché & Commerce" },
  { key: "immo", label: "Immobilier & BTP" },
  { key: "sante", label: "Santé, École & Hôtel" },
  { key: "autre", label: "Autre activité" },
];

export const PAINS: CatalogItem[] = [
  { key: "irregular", label: "Je ne publie pas régulièrement" },
  { key: "no-clients", label: "Mes publications ne ramènent pas de clients" },
  { key: "messages", label: "Mes messages restent sans réponse" },
  { key: "ads", label: "Mes pubs ne rapportent pas (ou je ne sais pas)" },
  { key: "image", label: "Mon image n'est pas à la hauteur" },
];

export const GOALS: CatalogItem[] = [
  { key: "clients", label: "Plus de clients / commandes sur WhatsApp" },
  { key: "visibilite", label: "Plus de visibilité" },
  { key: "lancement", label: "Lancer un produit" },
  { key: "premium", label: "Une image plus premium" },
];

export const NETWORKS = ["Facebook", "Instagram", "TikTok", "WhatsApp Business"];

export interface Lead {
  id: string;
  createdAt: string;
  step: number;
  business: string;
  firstName: string;
  whatsapp: string;
  city: string;
  sector: string;
  sectorKey: string;
  pains: string[];
  painKeys: string[];
  goal: string;
  goalKey: string;
  networks: string[];
  pageUrl: string;
  plan: PlanKey;
  period: PeriodKey;
  price: number;
  src: string;
  utm: { source: string; medium: string; campaign: string };
  recommendedPlan: PlanKey;
  completed: boolean;
}

/** Dossier id: NF-YYMMDD-XXXX (4 random alphanumerics). */
export function buildDossierId(now: Date = new Date(), random: () => number = Math.random): string {
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) suffix += alphabet[Math.floor(random() * alphabet.length)];
  return `NF-${yy}${mm}${dd}-${suffix}`;
}

/** Normalise a phone number to E.164. BF default (+226), accepts international. */
export function normalisePhone(raw: string, defaultCountry = "226"): string | null {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  let e164 = digits;
  if (digits.length === 8) e164 = defaultCountry + digits;
  if (e164.length < 8 || e164.length > 15) return null;
  return `+${e164}`;
}

const nf = new Intl.NumberFormat("fr-FR");
const fmt = (n: number): string => nf.format(n).replace(/[  ]/g, " ");

export function truncate(s: string, max: number): string {
  const t = (s || "").trim().replace(/\s+/g, " ");
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

/** Recommendation rule — always editable by the visitor in the wizard. */
export function recommendPlan(
  sectorKey: string,
  painKeys: string[]
): { plan: PlanKey; reason: string } {
  if (painKeys.includes("ads") || sectorKey === "sante" || sectorKey === "immo") {
    return {
      plan: "business",
      reason: "Pour transformer vos publicités et vos demandes en clients suivis.",
    };
  }
  if (painKeys.includes("messages") || painKeys.includes("no-clients")) {
    return {
      plan: "standard",
      reason: "Pour être vu en vidéo et ne plus laisser un message sans réponse.",
    };
  }
  return {
    plan: "essentials",
    reason: "Pour rester visible chaque semaine, sans y penser.",
  };
}

export interface MessageInput {
  id: string;
  business: string;
  firstName: string;
  sector: string;
  sectorKey: string;
  city: string;
  pains: string[];
  painKeys: string[];
  goal: string;
  goalKey: string;
  networks: string[];
  pageUrl: string;
  plan: PlanKey;
  period: PeriodKey;
  price: number;
  src: string;
}

/** Human-readable block + one machine-readable line. Keep under ~900 chars. */
export function buildWhatsAppMessage(input: MessageInput): string {
  const business = truncate(input.business, 60);
  const firstName = truncate(input.firstName, 40);
  const city = truncate(input.city, 40) || "—";
  const pageUrl = truncate(input.pageUrl, 120) || "—";
  const pains = input.pains.length > 0 ? truncate(input.pains.join(", "), 160) : "—";
  const networks = input.networks.length > 0 ? input.networks.join(", ") : "—";
  const periodLabel = input.period === "monthly" ? "Mensuel" : "Annuel";

  const lines = [
    "Bonjour NEFERTEM 👋 Je souhaite démarrer.",
    `*Dossier ${input.id}*`,
    `• Entreprise : ${business}`,
    `• Contact : ${firstName}`,
    `• Activité : ${input.sector}`,
    `• Ville : ${city}`,
    `• Ce qui me pèse : ${pains}`,
    `• Objectif 30 jours : ${input.goal}`,
    `• Réseaux : ${networks}`,
    `• Page : ${pageUrl}`,
    `• Offre : ${PLAN_NAMES[input.plan]} - ${periodLabel} - ${fmt(input.price)} FCFA/mois`,
    `• Source : ${input.src || "direct"}`,
    "Merci de me recontacter ✅",
    `[NF|v1|id=${input.id}|plan=${input.plan}|period=${input.period}|sector=${input.sectorKey}|goal=${input.goalKey}|pains=${input.painKeys.join("+") || "-"}|src=${input.src || "direct"}]`,
  ];
  return lines.join("\n");
}

export function buildWhatsAppUrl(input: MessageInput): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(input))}`;
}
