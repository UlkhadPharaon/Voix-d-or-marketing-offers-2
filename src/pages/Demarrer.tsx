import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CalendarX,
  Check,
  ChevronDown,
  Crown,
  Eye,
  Gem,
  Image as ImageIcon,
  Megaphone,
  MessageCircle,
  Rocket,
  Shirt,
  ShoppingBag,
  Store,
  Users,
  UtensilsCrossed,
  GraduationCap,
  LayoutGrid,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { PageTransition } from "@/components/PageTransition";
import { track } from "@/lib/analytics";
import {
  GOALS,
  NETWORKS,
  PAINS,
  PLAN_NAMES,
  PLAN_PRICES,
  SECTORS,
  buildDossierId,
  buildWhatsAppUrl,
  normalisePhone,
  recommendPlan,
  type Lead,
  type PeriodKey,
  type PlanKey,
} from "@/lib/lead";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "nef-demarrer";
const TOTAL_STEPS = 6;

const SECTOR_ICONS: Record<string, typeof Store> = {
  restaurant: UtensilsCrossed,
  boutique: Shirt,
  beaute: Gem,
  commerce: Store,
  immo: Building2,
  sante: GraduationCap,
  autre: LayoutGrid,
};

const PAIN_ICONS = [CalendarX, ShoppingBag, MessageCircle, Megaphone, ImageIcon];
const GOAL_ICONS = [Users, Eye, Rocket, Crown];

const nf = new Intl.NumberFormat("fr-FR");
const fmt = (n: number) => nf.format(n).replace(/[  ]/g, " ");

interface Answers {
  sectorKey: string;
  sectorCustom: string;
  painKeys: string[];
  goalKey: string;
  networks: string[];
  pageUrl: string;
  plan: PlanKey;
  period: PeriodKey;
  firstName: string;
  business: string;
  phone: string;
  city: string;
}

const EMPTY: Answers = {
  sectorKey: "",
  sectorCustom: "",
  painKeys: [],
  goalKey: "",
  networks: [],
  pageUrl: "",
  plan: "essentials",
  period: "monthly",
  firstName: "",
  business: "",
  phone: "",
  city: "",
};

async function postLead(payload: object, timeoutMs: number): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timer);
    return res.ok;
  } catch {
    return false;
  }
}

export function Demarrer() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [dossierId] = useState(() => buildDossierId());
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [waUrl, setWaUrl] = useState("");
  const started = useRef(false);

  const src = params.get("src") || "direct";
  const utm = useMemo(
    () => ({
      source: params.get("utm_source") || "",
      medium: params.get("utm_medium") || "",
      campaign: params.get("utm_campaign") || "",
    }),
    [params]
  );
  const planLocked = params.get("plan") === "essentials" || params.get("plan") === "standard" || params.get("plan") === "business";
  const periodLocked = params.get("period") === "monthly" || params.get("period") === "annual";

  // Restore session (resume after refresh) + URL prefill.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { step: number; answers: Answers };
        setStep(saved.step);
        setAnswers({ ...EMPTY, ...saved.answers });
        return;
      }
    } catch {
      /* ignore */
    }
    setAnswers((a) => ({
      ...a,
      plan: (params.get("plan") as PlanKey) || "essentials",
      period: (params.get("period") as PeriodKey) || "monthly",
      sectorKey: SECTORS.some((s) => s.key === params.get("sector")) ? (params.get("sector") as string) : "",
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers }));
    } catch {
      /* ignore */
    }
  }, [step, answers]);

  useEffect(() => {
    if (!started.current) {
      started.current = true;
      track("onboarding_started", {});
    }
  }, []);

  const set = (patch: Partial<Answers>) => setAnswers((a) => ({ ...a, ...patch }));

  const sectorLabel =
    answers.sectorKey === "autre" && answers.sectorCustom.trim()
      ? answers.sectorCustom.trim()
      : SECTORS.find((s) => s.key === answers.sectorKey)?.label || "";
  const painLabels = PAINS.filter((p) => answers.painKeys.includes(p.key)).map((p) => p.label);
  const goalLabel = GOALS.find((g) => g.key === answers.goalKey)?.label || "";
  const reco = useMemo(
    () => recommendPlan(answers.sectorKey, answers.painKeys),
    [answers.sectorKey, answers.painKeys]
  );
  const price = answers.period === "monthly" ? PLAN_PRICES[answers.plan].monthly : PLAN_PRICES[answers.plan].annualMonthly;

  const buildPayload = (completed: boolean): Lead => ({
    id: dossierId,
    createdAt: new Date().toISOString(),
    step,
    business: answers.business.trim(),
    firstName: answers.firstName.trim(),
    whatsapp: normalisePhone(answers.phone) || answers.phone.trim(),
    city: answers.city.trim(),
    sector: sectorLabel,
    sectorKey: answers.sectorKey,
    pains: painLabels,
    painKeys: answers.painKeys,
    goal: goalLabel,
    goalKey: answers.goalKey,
    networks: answers.networks,
    pageUrl: answers.pageUrl.trim(),
    plan: answers.plan,
    period: answers.period,
    price,
    src,
    utm,
    recommendedPlan: reco.plan,
    completed,
  });

  const go = (n: number) => {
    const next = Math.max(1, Math.min(TOTAL_STEPS, n));
    setStep(next);
    track("onboarding_step", { n: next });
    // Partial lead (completed:false) saved from step 1 on.
    void postLead(buildPayload(false), 4000);
  };

  const togglePain = (key: string) => {
    setAnswers((a) => {
      if (a.painKeys.includes(key)) return { ...a, painKeys: a.painKeys.filter((k) => k !== key) };
      if (a.painKeys.length >= 2) return a;
      return { ...a, painKeys: [...a.painKeys, key] };
    });
  };

  const toggleNetwork = (n: string) => {
    setAnswers((a) => ({
      ...a,
      networks: a.networks.includes(n) ? a.networks.filter((x) => x !== n) : [...a.networks, n],
    }));
  };

  const submit = async () => {
    const e164 = normalisePhone(answers.phone);
    if (!answers.firstName.trim() || !answers.business.trim() || !e164) {
      setPhoneError(!e164 ? "Vérifiez votre numéro WhatsApp (ex : +226 70 00 00 00)." : "");
      return;
    }
    const payload = { ...buildPayload(true), whatsapp: e164 };
    const url = buildWhatsAppUrl({
      id: dossierId,
      business: payload.business || "—",
      firstName: payload.firstName,
      sector: sectorLabel || "—",
      sectorKey: answers.sectorKey || "autre",
      city: payload.city,
      pains: painLabels,
      painKeys: answers.painKeys,
      goal: goalLabel || "—",
      goalKey: answers.goalKey || "-",
      networks: answers.networks,
      pageUrl: payload.pageUrl,
      plan: answers.plan,
      period: answers.period,
      price,
      src,
    });
    // Lead API first (1.5s max), WhatsApp opens regardless.
    const ok = await postLead(payload, 1500);
    if (!ok) track("lead_api_failed", { step: 6 });
    track("onboarding_completed", { plan: answers.plan, period: answers.period });
    track("whatsapp_opened", { src, plan: answers.plan });
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setWaUrl(url);
    setSubmitted(true);
    window.location.href = url;
  };

  if (submitted) {
    return (
      <PageTransition className="flex min-h-screen items-center justify-center bg-background/0 px-4 pb-12 pt-24">
        <SEO title="Dossier envoyé" description="Votre dossier NEFERTEM est prêt, on vous répond en moins d'une heure." path="/demarrer" />
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-4xl text-black-deep">✓</div>
          <h1 className="font-heading text-[28px] uppercase leading-tight tracking-[1px] text-foreground">
            Merci {answers.firstName.trim()}, nous préparons le plan de {answers.business.trim()}.
          </h1>
          <ul className="mx-auto mt-8 max-w-md space-y-3 text-left">
            {["Réponse en moins d'1 heure sur WhatsApp.", "Diagnostic gratuit sous 24 h.", "Premier lot sous 72 h."].map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-[8px] border border-foreground/10 bg-foreground/[0.03] p-4 text-[14px] text-foreground">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-[4px] bg-[#25D366] px-8 text-[13px] font-bold uppercase tracking-[1px] text-white"
          >
            WhatsApp ne s'est pas ouvert ? Cliquez ici
          </a>
          <p className="mt-4">
            <Link to="/" className="text-[13px] font-bold uppercase tracking-[1px] text-muted-foreground hover:text-primary">
              Retour à l'accueil
            </Link>
          </p>
        </div>
      </PageTransition>
    );
  }

  const canNext =
    step === 1
      ? answers.sectorKey !== "" && (answers.sectorKey !== "autre" || answers.sectorCustom.trim() !== "")
      : step === 2
        ? answers.painKeys.length > 0
        : step === 3
          ? answers.goalKey !== ""
          : true;

  return (
    <PageTransition className="min-h-screen bg-background/0 px-4 pb-12 pt-[100px] text-foreground md:pt-[120px]">
      <SEO
        title="Recevez votre diagnostic gratuit"
        description="2 minutes pour nous parler de votre activité. Diagnostic gratuit sous 24 h, premier lot sous 72 h."
        path="/demarrer"
      />
      <div className="mx-auto w-full max-w-2xl">
        {/* Minimal header */}
        <p className="text-center text-[12px] font-bold uppercase tracking-[2px] text-primary">Diagnostic gratuit</p>
        <h1 className="mt-2 text-center font-heading text-[26px] font-normal uppercase leading-tight tracking-[1px] md:text-[36px]">
          Parlons de votre activité
        </h1>
        <p className="mt-2 text-center text-[13px] text-muted-foreground">
          Aucun paiement maintenant · Réponse en moins d'1 heure ·{" "}
          <a
            href="https://wa.me/22605830599?text=Bonjour%20NEFERTEM%2C%20j%27ai%20une%20question."
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary hover:underline"
          >
            Préférez-vous écrire directement ? Ouvrir WhatsApp
          </a>
        </p>

        {/* Progress */}
        <div className="mt-6">
          <div className="mb-2 flex justify-between text-[11px] font-bold uppercase tracking-[1px] text-muted-foreground">
            <span>Étape {step} / {TOTAL_STEPS}</span>
            <span>environ 1 minute</span>
          </div>
          <div className="h-[4px] overflow-hidden rounded-full bg-foreground/10" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={TOTAL_STEPS} aria-label={`Étape ${step} sur ${TOTAL_STEPS}`}>
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
          </div>
        </div>

        <div className="mt-6 rounded-[12px] border border-foreground/10 bg-foreground/[0.02] p-5 md:p-8">
          {/* STEP 1 — activity */}
          {step === 1 && (
            <fieldset>
              <legend className="font-heading text-[20px] uppercase tracking-[1px]">Quelle est votre activité ?</legend>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {SECTORS.map((s) => {
                  const Icon = SECTOR_ICONS[s.key] || LayoutGrid;
                  const active = answers.sectorKey === s.key;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        set({ sectorKey: s.key });
                        if (s.key !== "autre") go(2);
                      }}
                      className={cn(
                        "flex min-h-[60px] items-center gap-3 rounded-[8px] border p-4 text-left text-[14px] font-bold transition-colors",
                        active ? "border-primary bg-primary/10 text-foreground" : "border-foreground/15 text-foreground hover:border-primary/50"
                      )}
                    >
                      <Icon className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                      {s.label}
                    </button>
                  );
                })}
              </div>
              {answers.sectorKey === "autre" && (
                <input
                  type="text"
                  value={answers.sectorCustom}
                  onChange={(e) => set({ sectorCustom: e.target.value })}
                  placeholder="Précisez votre activité…"
                  aria-label="Précisez votre activité"
                  className="mt-3 w-full rounded-[4px] border border-foreground/20 bg-background px-4 py-3 text-[14px] text-foreground outline-none focus:border-primary"
                />
              )}
              {answers.sectorKey === "autre" && (
                <NavButtons onBack={null} onNext={() => go(2)} nextDisabled={!canNext} nextLabel="Continuer" />
              )}
            </fieldset>
          )}

          {/* STEP 2 — pains (multi, max 2) */}
          {step === 2 && (
            <fieldset>
              <legend className="font-heading text-[20px] uppercase tracking-[1px]">Qu'est-ce qui vous pèse le plus ?</legend>
              <p className="mt-1 text-[13px] text-muted-foreground">Choisissez 1 ou 2 réponses.</p>
              <div className="mt-4 grid grid-cols-1 gap-3">
                {PAINS.map((p, i) => {
                  const Icon = PAIN_ICONS[i];
                  const active = answers.painKeys.includes(p.key);
                  return (
                    <button
                      key={p.key}
                      type="button"
                      aria-pressed={active}
                      onClick={() => togglePain(p.key)}
                      className={cn(
                        "flex min-h-[60px] items-center gap-3 rounded-[8px] border p-4 text-left text-[14px] font-bold transition-colors",
                        active ? "border-primary bg-primary/10 text-foreground" : "border-foreground/15 text-foreground hover:border-primary/50"
                      )}
                    >
                      <Icon className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                      {p.label}
                      {active && <Check className="ml-auto h-5 w-5 shrink-0 text-primary" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
              <NavButtons onBack={() => go(1)} onNext={() => go(3)} nextDisabled={!canNext} nextLabel="Continuer" />
            </fieldset>
          )}

          {/* STEP 3 — goal (auto-advance) */}
          {step === 3 && (
            <fieldset>
              <legend className="font-heading text-[20px] uppercase tracking-[1px]">Quel résultat voulez-vous dans 30 jours ?</legend>
              <div className="mt-4 grid grid-cols-1 gap-3">
                {GOALS.map((g, i) => {
                  const Icon = GOAL_ICONS[i];
                  const active = answers.goalKey === g.key;
                  return (
                    <button
                      key={g.key}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        set({ goalKey: g.key });
                        setStep(4);
                        track("onboarding_step", { n: 4 });
                        void postLead(buildPayload(false), 4000);
                      }}
                      className={cn(
                        "flex min-h-[60px] items-center gap-3 rounded-[8px] border p-4 text-left text-[14px] font-bold transition-colors",
                        active ? "border-primary bg-primary/10 text-foreground" : "border-foreground/15 text-foreground hover:border-primary/50"
                      )}
                    >
                      <Icon className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                      {g.label}
                    </button>
                  );
                })}
              </div>
              <NavButtons onBack={() => go(2)} onNext={null} nextDisabled nextLabel="" />
            </fieldset>
          )}

          {/* STEP 4 — networks */}
          {step === 4 && (
            <fieldset>
              <legend className="font-heading text-[20px] uppercase tracking-[1px]">Où êtes-vous présent ?</legend>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {NETWORKS.map((n) => {
                  const active = answers.networks.includes(n);
                  return (
                    <button
                      key={n}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleNetwork(n)}
                      className={cn(
                        "flex min-h-[60px] items-center gap-3 rounded-[8px] border p-4 text-left text-[14px] font-bold transition-colors",
                        active ? "border-primary bg-primary/10 text-foreground" : "border-foreground/15 text-foreground hover:border-primary/50"
                      )}
                    >
                      {n}
                      {active && <Check className="ml-auto h-5 w-5 shrink-0 text-primary" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
              <input
                type="url"
                value={answers.pageUrl}
                onChange={(e) => set({ pageUrl: e.target.value })}
                placeholder="Lien de votre page (optionnel)"
                aria-label="Lien de votre page (optionnel)"
                className="mt-3 w-full rounded-[4px] border border-foreground/20 bg-background px-4 py-3 text-[14px] text-foreground outline-none focus:border-primary"
              />
              <NavButtons onBack={() => go(3)} onNext={() => go(5)} nextDisabled={false} nextLabel="Continuer" />
            </fieldset>
          )}

          {/* STEP 5 — recommended plan */}
          {step === 5 && (
            <div>
              <h2 className="font-heading text-[20px] uppercase tracking-[1px]">Votre offre recommandée</h2>
              {planLocked ? (
                <div className="mt-4 rounded-[8px] border border-primary/40 bg-primary/[0.07] p-5">
                  <p className="text-[12px] font-bold uppercase tracking-[1px] text-primary">Votre choix</p>
                  <p className="mt-1 font-heading text-[24px] uppercase text-foreground">{PLAN_NAMES[answers.plan]}</p>
                  <p className="mt-1 text-[15px] font-bold tabular-nums text-foreground">
                    {fmt(price)} FCFA/mois {answers.period === "annual" ? "(annuel, -15 %)" : "(mensuel)"}
                  </p>
                </div>
              ) : (
                <>
                  <div className="mt-4 rounded-[8px] border border-primary/40 bg-primary/[0.07] p-5">
                    <p className="text-[12px] font-bold uppercase tracking-[1px] text-primary">Recommandé pour vous : {PLAN_NAMES[reco.plan]}</p>
                    <p className="mt-1 text-[14px] text-muted-foreground">{reco.reason}</p>
                    {!showAllPlans && answers.plan !== reco.plan && (
                      <button
                        type="button"
                        onClick={() => set({ plan: reco.plan })}
                        className="mt-3 min-h-[44px] rounded-[4px] bg-primary px-5 text-[12px] font-bold uppercase tracking-[1px] text-black-deep"
                      >
                        Choisir {PLAN_NAMES[reco.plan]} — {fmt(PLAN_PRICES[reco.plan][answers.period === "monthly" ? "monthly" : "annualMonthly"])} FCFA/mois
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    aria-expanded={showAllPlans}
                    onClick={() => setShowAllPlans((v) => !v)}
                    className="mt-3 flex min-h-[44px] items-center gap-2 text-[12px] font-bold uppercase tracking-[1px] text-primary"
                  >
                    Changer
                    <ChevronDown className={cn("h-4 w-4 transition-transform", showAllPlans && "rotate-180")} aria-hidden="true" />
                  </button>
                  {showAllPlans && (
                    <div className="mt-2 grid gap-2" role="radiogroup" aria-label="Choisir une offre">
                      {(Object.keys(PLAN_NAMES) as PlanKey[]).map((k) => (
                        <button
                          key={k}
                          type="button"
                          role="radio"
                          aria-checked={answers.plan === k}
                          onClick={() => set({ plan: k })}
                          className={cn(
                            "flex min-h-[56px] items-center justify-between rounded-[8px] border p-4 text-left text-[14px] font-bold",
                            answers.plan === k ? "border-primary bg-primary/10 text-foreground" : "border-foreground/15 text-foreground"
                          )}
                        >
                          {PLAN_NAMES[k]}
                          <span className="tabular-nums text-primary">
                            {fmt(PLAN_PRICES[k][answers.period === "monthly" ? "monthly" : "annualMonthly"])} FCFA/mois
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  {answers.plan === reco.plan && !showAllPlans && (
                    <p className="mt-3 text-[13px] text-muted-foreground">
                      Offre : <strong className="text-foreground">{PLAN_NAMES[answers.plan]}</strong> — {fmt(price)} FCFA/mois
                      {answers.period === "annual" ? " (annuel, -15 %)" : " (mensuel)"}.
                    </p>
                  )}
                </>
              )}
              {/* Period toggle */}
              <div className="mt-4 flex gap-2" role="radiogroup" aria-label="Période de facturation">
                {(["monthly", "annual"] as PeriodKey[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    role="radio"
                    aria-checked={answers.period === p}
                    onClick={() => set({ period: p })}
                    className={cn(
                      "min-h-[48px] flex-1 rounded-[4px] text-[12px] font-bold uppercase tracking-[1px]",
                      answers.period === p ? "bg-primary text-black-deep" : "border border-foreground/15 text-muted-foreground"
                    )}
                  >
                    {p === "monthly" ? "Mensuel" : "Annuel -15 %"}
                  </button>
                ))}
              </div>
              {!periodLocked && planLocked && (
                <p className="mt-3 text-[13px] text-muted-foreground">
                  Offre : <strong className="text-foreground">{PLAN_NAMES[answers.plan]}</strong> — {fmt(price)} FCFA/mois
                  {answers.period === "annual" ? " (annuel, -15 %)" : " (mensuel)"}.
                </p>
              )}
              <NavButtons onBack={() => go(4)} onNext={() => go(6)} nextDisabled={false} nextLabel="Continuer" />
            </div>
          )}

          {/* STEP 6 — contact */}
          {step === 6 && (
            <div>
              <h2 className="font-heading text-[20px] uppercase tracking-[1px]">Où vous envoyer le plan ?</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="d-prenom" className="mb-1 block text-[11px] font-bold uppercase tracking-[1px] text-muted-foreground">Votre prénom *</label>
                  <input id="d-prenom" type="text" autoComplete="given-name" value={answers.firstName} onChange={(e) => set({ firstName: e.target.value })} placeholder="Ex : Awa" className="w-full rounded-[4px] border border-foreground/20 bg-background px-4 py-3 text-[15px] text-foreground outline-none focus:border-primary" />
                </div>
                <div>
                  <label htmlFor="d-biz" className="mb-1 block text-[11px] font-bold uppercase tracking-[1px] text-muted-foreground">Nom de l'entreprise *</label>
                  <input id="d-biz" type="text" autoComplete="organization" value={answers.business} onChange={(e) => set({ business: e.target.value })} placeholder="Ex : Chez Awa Traiteur" className="w-full rounded-[4px] border border-foreground/20 bg-background px-4 py-3 text-[15px] text-foreground outline-none focus:border-primary" />
                </div>
                <div>
                  <label htmlFor="d-phone" className="mb-1 block text-[11px] font-bold uppercase tracking-[1px] text-muted-foreground">Numéro WhatsApp *</label>
                  <input id="d-phone" type="tel" autoComplete="tel" inputMode="tel" value={answers.phone} onChange={(e) => { set({ phone: e.target.value }); setPhoneError(""); }} placeholder="+226 70 00 00 00" className="w-full rounded-[4px] border border-foreground/20 bg-background px-4 py-3 text-[15px] text-foreground outline-none focus:border-primary" />
                  {phoneError && <p role="alert" className="mt-1 text-[13px] text-red-500">{phoneError}</p>}
                </div>
                <div>
                  <label htmlFor="d-city" className="mb-1 block text-[11px] font-bold uppercase tracking-[1px] text-muted-foreground">Ville</label>
                  <input id="d-city" type="text" autoComplete="address-level2" value={answers.city} onChange={(e) => set({ city: e.target.value })} placeholder="Ex : Ouagadougou" className="w-full rounded-[4px] border border-foreground/20 bg-background px-4 py-3 text-[15px] text-foreground outline-none focus:border-primary" />
                </div>
                {/* Honeypot — invisible to humans */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" defaultValue="" />
              </div>
              <div className="mt-6 flex items-center justify-between gap-3">
                <button type="button" onClick={() => go(5)} className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-foreground/15 px-5 text-[12px] font-bold uppercase tracking-[1px] text-foreground">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Retour
                </button>
                <button
                  type="button"
                  onClick={submit}
                  disabled={!answers.firstName.trim() || !answers.business.trim() || !answers.phone.trim()}
                  className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-[4px] bg-primary px-5 text-[13px] font-bold uppercase tracking-[1px] text-black-deep hover:bg-gold-accent disabled:opacity-40"
                >
                  Ouvrir WhatsApp et envoyer mon dossier
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

function NavButtons({
  onBack,
  onNext,
  nextDisabled,
  nextLabel,
}: {
  onBack: (() => void) | null;
  onNext: (() => void) | null;
  nextDisabled: boolean;
  nextLabel: string;
}) {
  return (
    <div className="mt-6 flex items-center justify-between gap-3">
      {onBack ? (
        <button type="button" onClick={onBack} className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-foreground/15 px-5 text-[12px] font-bold uppercase tracking-[1px] text-foreground">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Retour
        </button>
      ) : (
        <span />
      )}
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-[4px] bg-primary px-5 text-[13px] font-bold uppercase tracking-[1px] text-black-deep hover:bg-gold-accent disabled:opacity-40 sm:flex-none sm:px-10"
        >
          {nextLabel} →
        </button>
      )}
    </div>
  );
}
