"use client";
import { useId, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import {
  ChevronDown,
  Info,
  RefreshCcw,
  ShieldCheck,
  Timer,
  Wallet,
} from "lucide-react";

/* =====================================================================
   PRICING — single source of truth. No hard-coded prices in markup.
   ---------------------------------------------------------------------
   Règle prix de lancement : le tarif réduit s'applique aux 3 premiers
   mois de chaque nouvelle entreprise cliente, puis le tarif normal
   (50 000 / 90 000 / 120 000 FCFA) prend le relais. Cette règle est
   affichée en clair sous le toggle (LAUNCH_RULE) — ce n'est pas une
   fausse urgence, c'est une condition réelle de l'offre.
   ---------------------------------------------------------------------
   TODO(owner) — à confirmer avant publication :
   1. Fréquence de publication Essentials : "3 fois / semaine sur
      Facebook" — à confirmer (réseaux + rythme exacts).
   2. Garantie : le libellé "Premier lot refait gratuitement si non
      satisfait" (TRUST_ITEMS) doit être validé juridiquement.
   3. Témoignage : renseigner TESTIMONIAL pour afficher la citation.
      Laisser null tant qu'il n'y a aucun témoignage client.
   ===================================================================== */

const WHATSAPP_NUMBER = "22605830599";
const ANNUAL_DISCOUNT = 0.15;
const KEY_FEATURE_COUNT = 6;

/** Règle réelle du prix de lancement : 3 premiers mois, puis tarif normal. */
const LAUNCH_RULE =
  "Prix de lancement valable les 3 premiers mois, puis tarif normal (50 000 / 90 000 / 120 000 FCFA)";
/** Client testimonial slot — hidden until content is provided. */
const TESTIMONIAL: { quote: string; author: string } | null = null;

const nf = new Intl.NumberFormat("fr-FR");
/** fr-FR grouping with a non-breaking space (U+00A0) as separator. */
const fmtPrice = (n: number): string =>
  nf.format(n).replace(/[  ]/g, " ");

type Feature = {
  group: string;
  text: string;
  /** Bold differentiator vs the previous tier. */
  highlight?: boolean;
  /** Small info note with tooltip (Budget média, Business only). */
  info?: string;
};

type Plan = {
  id: string;
  name: string;
  tier: string;
  outcome: string;
  idealFor: string;
  normal: number;
  launch: number;
  agencyTotal: number;
  agencyLines: string[];
  features: Feature[];
  recommended?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "essentials",
    name: "Essentials",
    tier: "Lancement",
    outcome: "Restez visible chaque semaine, sans y penser.",
    idealFor: "Idéal : boutiques, restaurants, commerces locaux",
    normal: 50000,
    launch: 30000,
    agencyTotal: 250000,
    agencyLines: [
      "90 visuels × 2 000 FCFA = 180 000 FCFA",
      "Stratégie + calendrier + publication + reporting = 70 000 FCFA",
    ],
    features: [
      { group: "Contenu", text: "90+ visuels commerciaux / mois", highlight: true },
      { group: "Contenu", text: "1 révision par lot de contenu" },
      { group: "Distribution", text: "Publication Facebook, 3 fois / semaine" },
      {
        group: "Community",
        text: "Réponses automatiques aux commentaires Facebook (sans limite)",
      },
      { group: "Suivi", text: "Calendrier de contenu mensuel" },
      { group: "Suivi", text: "Rapport d'activité mensuel" },
      { group: "Démarrage", text: "Diagnostic de présence digitale offert" },
    ],
  },
  {
    id: "standard",
    name: "Standard",
    tier: "Croissance",
    outcome: "Ajoutez la vidéo pour trouver les formats qui vendent.",
    idealFor: "Idéal : food, beauté, mode, éducation",
    normal: 90000,
    launch: 60000,
    agencyTotal: 490000,
    agencyLines: [
      "90 visuels × 2 000 FCFA = 180 000 FCFA",
      "12 vidéos 15 s × 15 000 FCFA = 180 000 FCFA",
      "Stratégie + community + analyse + reporting = 130 000 FCFA",
    ],
    recommended: true,
    features: [
      { group: "Inclus", text: "Tout Essentials inclus", highlight: true },
      { group: "Vidéo", text: "12 vidéos 15 s / mois (3 / semaine)", highlight: true },
      { group: "Distribution", text: "Publication Facebook, Instagram, TikTok" },
      {
        group: "Community",
        text: "Réponses aux commentaires Instagram + Facebook (sans limite)",
      },
      { group: "Suivi", text: "1 nouveau format testé chaque mois" },
      { group: "Suivi", text: "Rapport chiffré toutes les 2 semaines", highlight: true },
      { group: "Suivi", text: "Ajustements chaque semaine selon vos résultats" },
      { group: "Suivi", text: "Rapport clair : quoi garder, quoi arrêter" },
    ],
  },
  {
    id: "business",
    name: "Business",
    tier: "Performance",
    outcome: "Le système complet pour accélérer avec la publicité.",
    idealFor: "Idéal : cliniques, écoles, hôtels, promoteurs",
    normal: 120000,
    launch: 90000,
    agencyTotal: 900000,
    agencyLines: [
      "90 visuels × 2 000 FCFA = 180 000 FCFA",
      "20 vidéos 45 s × 25 000 FCFA = 500 000 FCFA",
      "Gestion ads + landing + reporting hebdo + manager = 220 000 FCFA",
    ],
    features: [
      { group: "Inclus", text: "Tout Standard inclus", highlight: true },
      { group: "Vidéo", text: "20 vidéos 45 s / mois (5 / semaine)", highlight: true },
      {
        group: "Publicité",
        text: "Gestion de vos publicités",
        info: "Budget média séparé des honoraires : la somme versée à Meta, TikTok ou Google est en plus, estimée selon vos objectifs.",
      },
      { group: "Prospection", text: "Prospection & relance de vos prospects", highlight: true },
      { group: "Prospection", text: "Base clients exploitée par campagne" },
      { group: "Suivi", text: "Rapport de performance chaque semaine" },
      { group: "Support", text: "Support WhatsApp dédié", highlight: true },
      { group: "Support", text: "Onboarding en 72 h + account manager dédié" },
    ],
  },
];

const TRUST_ITEMS = [
  { icon: ShieldCheck, text: "Sans engagement, résiliable à tout moment" },
  // TODO(owner) : valider le libellé de garantie avant publication.
  { icon: RefreshCcw, text: "Premier lot refait gratuitement si non satisfait" },
  { icon: Wallet, text: "Paiement : Orange Money, Moov Money, Wave, virement" },
  { icon: Timer, text: "Onboarding en 72 h" },
];

type Billing = "mensuel" | "annuel";

const derived = (plan: Plan) => {
  const annualMonthly = Math.round(plan.launch * (1 - ANNUAL_DISCOUNT));
  const annualTotal = annualMonthly * 12;
  const annualSavings = plan.launch * 12 - annualTotal;
  const launchPct = Math.round((1 - plan.launch / plan.normal) * 100);
  return { annualMonthly, annualTotal, annualSavings, launchPct };
};

const demarrerLink = (planId: string, billing: Billing) =>
  `/demarrer?plan=${planId}&period=${billing === "mensuel" ? "monthly" : "annual"}&src=pricing`;

function BillingToggle({
  billing,
  onChange,
}: {
  billing: Billing;
  onChange: (b: Billing) => void;
}) {
  const groupId = useId();
  const options: { value: Billing; label: string }[] = [
    { value: "mensuel", label: "Mensuel" },
    { value: "annuel", label: "Annuel" },
  ];
  const activeIndex = options.findIndex((o) => o.value === billing);

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (activeIndex + 1) % options.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (activeIndex - 1 + options.length) % options.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = options.length - 1;
    if (next !== null) {
      e.preventDefault();
      onChange(options[next].value);
      document.getElementById(`${groupId}-${options[next].value}`)?.focus();
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <div
        role="radiogroup"
        aria-label="Période de facturation"
        onKeyDown={onKeyDown}
        className="relative z-10 mx-auto flex w-fit rounded-[4px] bg-card border border-foreground/10 p-1"
      >
        {options.map((o) => {
          const active = billing === o.value;
          return (
            <button
              key={o.value}
              id={`${groupId}-${o.value}`}
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.value)}
              className={cn(
                "min-h-[44px] rounded-[2px] px-6 py-2 text-[12px] font-bold uppercase tracking-[1px] transition-colors",
                active ? "bg-primary text-black-deep" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="flex items-center gap-2">
                {o.label}
                {o.value === "annuel" && (
                  <span
                    className={cn(
                      "rounded-sm px-1.5 py-0.5 text-[10px]",
                      active ? "bg-black-deep/15 text-black-deep" : "bg-primary/15 text-primary"
                    )}
                  >
                    -15%
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const [agencyOpen, setAgencyOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const agencyId = useId();
  const featuresId = useId();
  const d = derived(plan);
  const annual = billing === "annuel";

  const shown = annual ? d.annualMonthly : plan.launch;
  const crossed = annual ? plan.launch : plan.normal;
  const agencySavings = plan.agencyTotal - shown;
  const keyFeatures = plan.features.slice(0, KEY_FEATURE_COUNT);
  const extraFeatures = plan.features.slice(KEY_FEATURE_COUNT);

  return (
    <Card
      className={cn(
        "flex h-full w-full flex-col rounded-[8px] border transition-all duration-300",
        plan.recommended
          ? "border-primary bg-foreground/[0.05] shadow-[0_0_50px_rgba(212,175,55,0.15)] lg:-translate-y-3"
          : "border-foreground/10 bg-foreground/[0.02] hover:border-foreground/20",
        plan.recommended && "order-first lg:order-none"
      )}
    >
      {plan.recommended && (
        <div className="flex justify-center pt-5">
          <span className="rounded-full bg-primary px-4 py-1 text-[11px] font-bold uppercase tracking-[1px] text-black-deep">
            Meilleur rapport
          </span>
        </div>
      )}

      <CardHeader className="p-8 text-left md:p-10 md:pb-0">
        <span className="mb-2 block font-heading text-[16px] uppercase tracking-[1px] text-muted-foreground">
          {plan.tier}
        </span>
        <h3 className="font-heading text-[20px] uppercase leading-tight tracking-[1px] text-foreground md:text-[24px]">
          {plan.name}
        </h3>
        <p className="mt-2 min-h-[44px] text-[13px] leading-relaxed text-muted-foreground">
          {plan.outcome}
        </p>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-[1px] text-muted-foreground">
          {plan.idealFor}
        </p>

        {/* Price block — fixed heights so the toggle never shifts layout */}
        <div className="mt-5 min-h-[176px]" aria-live="off">
          <p className="min-h-[24px] text-[16px] font-medium text-muted-foreground line-through tabular-nums">
            {fmtPrice(crossed)} FCFA
          </p>
          <p className="mt-1 flex items-end gap-2">
            <span
              key={shown}
              className="price-swap text-[36px] font-bold leading-none text-foreground tabular-nums md:text-[44px]"
            >
              {fmtPrice(shown)}
            </span>
            <span className="mb-1 text-[13px] font-normal uppercase tracking-wide text-muted-foreground">
              FCFA / mois
            </span>
          </p>
          <p className="mt-3">
            <span className="inline-block cursor-default rounded-[4px] border border-primary/40 bg-primary/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
              Prix de lancement -{d.launchPct}%
            </span>
          </p>
          <p className="mt-2 min-h-[40px] text-[12px] leading-snug text-muted-foreground">
            {annual &&
              `Facturé ${fmtPrice(d.annualTotal)} FCFA/an · vous économisez ${fmtPrice(d.annualSavings)} FCFA`}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-grow flex-col p-8 pt-0 md:p-10 md:pt-0">
        <div className="mt-2 w-full">
          <Link
            to={demarrerLink(plan.id, billing)}
            onClick={() => track("cta_click", { location: "pricing", label: plan.id })}
            className={cn(
              "flex min-h-[56px] w-full items-center justify-center rounded-[4px] px-4 py-[16px] text-center text-[13px] font-bold uppercase tracking-[1px] transition-all duration-300",
              plan.recommended
                ? "bg-primary text-black-deep hover:bg-gold-accent hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                : "border border-primary/60 text-primary hover:bg-primary hover:text-black-deep"
            )}
          >
            → Démarrer avec {plan.name}
          </Link>
        </div>

        {/* Agency comparison — collapsed by default */}
        <div className="mt-4 rounded-[8px] border border-foreground/10 bg-foreground/[0.03] p-4">
          <button
            type="button"
            aria-expanded={agencyOpen}
            aria-controls={agencyId}
            onClick={() => setAgencyOpen((v) => !v)}
            className="flex min-h-[44px] w-full items-center justify-between gap-2 text-left text-[12px] font-bold uppercase tracking-[1px] text-muted-foreground hover:text-foreground"
          >
            Voir l'équivalent agence
            <ChevronDown
              className={cn("h-4 w-4 shrink-0 transition-transform", agencyOpen && "rotate-180")}
              aria-hidden="true"
            />
          </button>
          {agencyOpen && (
            <div id={agencyId} className="mt-2">
              <ul className="space-y-1">
                {plan.agencyLines.map((line) => (
                  <li key={line} className="text-[12px] leading-snug text-muted-foreground tabular-nums">
                    • {line}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[12px] leading-snug text-muted-foreground">
                Base : 2 000 FCFA / visuel + frais stratégie, suivi et distribution en plus.
              </p>
              <p className="mt-2 text-[12px] font-bold leading-snug text-foreground tabular-nums">
                Équivalent agence : {fmtPrice(plan.agencyTotal)} FCFA / mois, vous économisez{" "}
                {fmtPrice(agencySavings)} FCFA
              </p>
            </div>
          )}
        </div>

        <div className="my-6 h-px bg-foreground/10" />

        {/* Features — 6 key items, rest behind an expander */}
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[2px] text-muted-foreground">
          Ce que vous gagnez
        </p>
        <ul id={featuresId} className="flex-grow space-y-3">
          {keyFeatures.map((f) => (
            <li key={f.text} className="flex items-start gap-3">
              <span className="mt-[2px] shrink-0 text-primary" aria-hidden="true">
                ✓
              </span>
              <span className="text-[13px] text-foreground">
                <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-[1px] text-muted-foreground">
                  {f.group}
                </span>
                <span className={cn(f.highlight && "font-bold")}>
                  {f.text}
                  {f.info && (
                    <span
                      className="ml-1 inline-flex items-center gap-1 align-middle text-[11px] font-normal text-muted-foreground"
                      title={f.info}
                    >
                      <Info className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only">{f.info}</span>
                      <span aria-hidden="true">(budget pub en plus)</span>
                    </span>
                  )}
                </span>
              </span>
            </li>
          ))}
          {expanded &&
            extraFeatures.map((f) => (
              <li key={f.text} className="flex items-start gap-3">
                <span className="mt-[2px] shrink-0 text-primary" aria-hidden="true">
                  ✓
                </span>
                <span className="text-[13px] text-foreground">
                  <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-[1px] text-muted-foreground">
                    {f.group}
                  </span>
                  <span className={cn(f.highlight && "font-bold")}>{f.text}</span>
                </span>
              </li>
            ))}
        </ul>
        {extraFeatures.length > 0 && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={featuresId}
            onClick={() => setExpanded((v) => !v)}
            className="mt-4 flex min-h-[44px] items-center gap-2 text-[12px] font-bold uppercase tracking-[1px] text-primary hover:underline"
          >
            <span>
              {expanded ? "Masquer les détails" : "Voir toutes les fonctionnalités"}
            </span>
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
              aria-hidden="true"
            />
          </button>
        )}

        <div className="mt-8 w-full pt-4" />
      </CardContent>
    </Card>
  );
}

export default function PricingSection4() {
  const [billing, setBilling] = useState<Billing>("mensuel");

  const liveSummary = PLANS.map((p) => {
    const d = derived(p);
    return `${p.name} ${fmtPrice(billing === "annuel" ? d.annualMonthly : p.launch)}`;
  }).join(", ");

  return (
    <div className="relative w-full overflow-hidden bg-background/0 pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] opacity-60 [mask-image:radial-gradient(100%_100%_at_50%_0%,white,transparent)]" />

      <div className="container relative z-10 mx-auto max-w-[1200px] px-4">
        <article className="mx-auto mb-12 max-w-3xl space-y-4 pt-24 text-center">
          <h2 className="font-heading text-[28px] font-normal uppercase leading-tight tracking-[1px] text-foreground sm:text-[40px] lg:text-[48px]">
            Des offres claires. Pas de surprise.
          </h2>
          <p className="text-[15px] text-muted-foreground">
            Que vous vouliez prouver le système ou confier toute votre croissance, il y a un plan
            conçu pour votre étape.
          </p>
          <div className="flex flex-col items-center gap-4">
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-primary">
              🚀 Premier lot livré sous 72h
            </p>
            <BillingToggle
              billing={billing}
              onChange={(b) => {
                setBilling(b);
                track("billing_toggle", { period: b });
              }}
            />
            <p aria-live="polite" className="sr-only">
              Facturation {billing === "mensuel" ? "mensuelle" : "annuelle"} : {liveSummary} FCFA
              par mois.
            </p>
            <p className="text-[13px] font-bold uppercase tracking-[1px] text-primary">
              {LAUNCH_RULE}
            </p>
          </div>
        </article>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} billing={billing} />
          ))}
        </div>

        {/* Trust row */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_ITEMS.map((t) => (
            <div
              key={t.text}
              className="flex items-center gap-3 rounded-[8px] border border-foreground/10 bg-foreground/[0.03] px-4 py-3"
            >
              <t.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-[12px] font-bold uppercase tracking-[1px] text-foreground">
                {t.text}
              </span>
            </div>
          ))}
        </div>

        {TESTIMONIAL !== null && (
          <figure className="mx-auto mt-8 max-w-2xl rounded-[8px] border border-primary/25 bg-primary/[0.05] p-6 text-center">
            <blockquote className="text-[15px] italic leading-relaxed text-foreground">
              « {TESTIMONIAL.quote} »
            </blockquote>
            <figcaption className="mt-3 text-[12px] font-bold uppercase tracking-[1px] text-primary">
              — {TESTIMONIAL.author}
            </figcaption>
          </figure>
        )}

        <p className="mt-10 text-center text-[14px] text-muted-foreground">
          Besoin d'un sur-mesure ?{" "}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Bonjour, j'ai besoin d'une offre sur-mesure. Pouvons-nous en discuter ?"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary hover:underline"
          >
            Parlons-en sur WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}
