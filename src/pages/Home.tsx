import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { ArrowDown, BadgeCheck, CalendarCheck, ChevronDown, Clock, HeartHandshake, Lock, MessageCircle, Play, ShieldCheck, Sparkles, TrendingUp, Wallet } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { PageTransition } from '@/components/PageTransition';
import { Spotlight } from "@/components/ui/spotlight";
import PricingSection4 from "@/components/ui/pricing-section-4";
import { PhoneFeedMockup } from '@/components/home/PhoneFeedMockup';
import { SHOWCASE_ITEMS } from '@/data/showcase';
import { VideoCard } from '@/components/showcase/VideoCard';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

/* Reveal on scroll — fade + 12px, once, 400ms. Disabled with reduced motion. */
function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[2px] text-primary">
      {children}
    </p>
  );
}

/* Animated number — counts once when visible, static with reduced motion. */
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      setDone(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done) {
          setDone(true);
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / 800, 1);
            setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, done]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

const PROOFS = [
  { icon: Sparkles, big: <CountUp to={90} suffix="+" />, label: "visuels par mois" },
  { icon: Clock, big: <CountUp to={72} suffix=" h" />, label: "pour votre premier lot" },
  { icon: HeartHandshake, big: "0", label: "engagement, résiliable à tout moment" },
  { icon: Wallet, big: "4", label: "moyens de paiement Mobile Money et virement" },
];

const PAINS = [
  {
    num: "01",
    title: "« Je disparais »",
    quote: "Je n'ai pas le temps de publier.",
    text: "Pendant ce temps, vos clients voient vos concurrents.",
  },
  {
    num: "02",
    title: "« Je publie dans le vide »",
    quote: "Personne ne réagit.",
    text: "Des visuels sans plan coûtent du temps et ne ramènent personne.",
  },
  {
    num: "03",
    title: "« Je perds des clients dans mes messages »",
    quote: "Je réponds trop tard.",
    text: "Un message sans réponse, c'est une vente qui part ailleurs.",
  },
];

const PROMISES = [
  { icon: Sparkles, title: "Vous êtes vu", text: "Des visuels qui donnent envie, chaque semaine." },
  { icon: MessageCircle, title: "Vous êtes choisi", text: "Vos clients sont accueillis dès le premier message." },
  { icon: TrendingUp, title: "Vous savez ce qui marche", text: "Un bilan simple, en français courant." },
];

const STEPS = [
  {
    num: "1",
    title: "Vous nous parlez de votre activité",
    text: "2 minutes, sur WhatsApp. On vous pose les bonnes questions.",
  },
  {
    num: "2",
    title: "Votre premier lot est prêt en 72 h",
    text: "Votre plan de 7 jours + vos premiers visuels à publier.",
  },
  {
    num: "3",
    title: "Chaque semaine, on s'occupe de tout",
    text: "On publie, on répond à vos clients, vous recevez le bilan.",
  },
];

const WEEK = [
  { days: "Lundi – Mardi", title: "On décide quoi dire", text: "On choisit les sujets de la semaine avec vous." },
  { days: "Mercredi – Jeudi", title: "Vos visuels sont créés", text: "Photos, vidéos courtes et textes, prêts à publier." },
  { days: "Vendredi – Samedi", title: "Tout est publié", text: "Vos pages restent actives et vos clients reçoivent une réponse." },
  { days: "Dimanche", title: "Vous recevez votre bilan", text: "Ce qui a marché, en une page simple." },
];

const FAQS = [
  {
    q: "Que fait NEFERTEM chaque semaine ?",
    a: "On crée vos visuels, on publie sur vos pages, on répond aux commentaires et aux messages, et on vous envoie un bilan simple. Chaque mois, on garde ce qui marche et on corrige le reste.",
  },
  {
    q: "Est-ce adapté à mon activité ?",
    a: "Oui, si vous vendez à des particuliers : restaurants, boutiques, supermarchés, beauté, parfum, bijoux, immobilier, cliniques, écoles, hôtels. Si votre cas est particulier, le diagnostic gratuit vous le dira franchement.",
  },
  {
    q: "Mes visuels vont-ils ressembler à ceux de tout le monde ?",
    a: "Non. Chaque lot est créé pour votre marque : vos couleurs, vos produits, votre ton. Vous validez le style dès la première semaine.",
  },
  {
    q: "Dois-je fournir mes photos et mes infos ?",
    a: "Envoyez ce que vous avez — les photos prises avec votre téléphone sont les bienvenues. S'il nous manque quelque chose, on crée quand même vos visuels et on vous dit quoi nous envoyer.",
  },
  {
    q: "En combien de temps je reçois mes premiers contenus ?",
    a: "72 heures après votre paiement : vous recevez votre plan de 7 jours et votre premier lot à publier. Ensuite, le rythme continue chaque semaine.",
  },
  {
    q: "Suis-je engagé ?",
    a: "Non. C'est sans engagement et résiliable à tout moment. Le prix de lancement s'applique à vos 3 premiers mois, puis le tarif normal prend le relais.",
  },
  {
    q: "Mes comptes et ma marque restent-ils à moi ?",
    a: "Oui, toujours. Vos pages, vos contenus, votre base clients : tout est à vous, même si vous partez.",
  },
  {
    q: "Comment payer ?",
    a: "Par Orange Money, Moov Money, Wave ou virement, chaque mois. Aucun paiement n'est demandé avant le diagnostic.",
  },
  {
    q: "Que se passe-t-il si je n'aime pas ?",
    // TODO(owner): valider le libellé de garantie.
    a: "Dites-le-nous vite : le premier lot est refait gratuitement, une fois, si le style ne vous convient pas.",
  },
  {
    q: "Budget publicitaire : comment ça marche ?",
    a: "Nos tarifs paient notre travail : visuels, publication, réponses et bilan. Le budget publicitaire, c'est l'argent versé à Meta, TikTok ou Google pour diffuser vos publicités. Il ne nous est pas versé. Après le diagnostic gratuit, on l'estime selon vos objectifs : on peut démarrer sans publicité pour être visible, ou prévoir un budget mensuel pour attirer des clients.",
  },
];

// TODO(owner): ajouter de vrais témoignages ici pour les afficher.
// const TESTIMONIALS: { quote: string; author: string }[] = [];
const TESTIMONIALS: { quote: string; author: string }[] = [];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="w-full">
      {FAQS.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.q} className="border-b border-foreground/10">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              id={`faq-button-${i}`}
              onClick={() => {
                setOpen(isOpen ? null : i);
                if (!isOpen) track("faq_opened", { id: `faq-${i}` });
              }}
              className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-bold text-foreground hover:text-primary"
            >
              {faq.q}
              <ChevronDown
                className={cn("h-5 w-5 shrink-0 text-primary transition-transform", isOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <p id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-button-${i}`} className="pb-6 text-[14px] leading-relaxed text-muted-foreground">
                {faq.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function BeforeAfter() {
  const [tab, setTab] = useState<"avant" | "apres">("avant");
  const avant = ["Des publications irrégulières, quand vous avez le temps.", "Des messages qui attendent le soir, sans réponse.", "Vous ne savez pas ce qui marche vraiment."];
  const apres = ["Des visuels soignés, publiés chaque semaine.", "Chaque message reçoit une réponse.", "Un bilan simple, chaque dimanche."];
  return (
    <div>
      {/* Mobile tabs */}
      <div className="mb-4 flex gap-2 md:hidden" role="tablist" aria-label="Avant et après NEFERTEM">
        {(["avant", "apres"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "min-h-[44px] flex-1 rounded-[4px] text-[13px] font-bold uppercase tracking-[1px]",
              tab === t ? "bg-primary text-black-deep" : "border border-foreground/15 text-muted-foreground"
            )}
          >
            {t === "avant" ? "Avant" : "Avec NEFERTEM"}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className={cn("rounded-[12px] border border-foreground/10 bg-foreground/[0.02] p-6 md:p-8", tab !== "avant" && "hidden md:block")}>
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[2px] text-muted-foreground">Avant</p>
          <ul className="space-y-3">
            {avant.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[14px] text-muted-foreground">
                <span aria-hidden="true" className="mt-0.5">✕</span> {t}
              </li>
            ))}
          </ul>
        </div>
        <div className={cn("rounded-[12px] border border-primary/40 bg-primary/[0.07] p-6 md:p-8", tab !== "apres" && "hidden md:block")}>
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[2px] text-primary">Avec NEFERTEM</p>
          <ul className="space-y-3">
            {apres.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[14px] font-bold text-foreground">
                <span aria-hidden="true" className="mt-0.5 text-primary">✓</span> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Home() {
  const [weekOpen, setWeekOpen] = useState(false);

  return (
    <PageTransition className="w-full relative">
      <SEO
        title="Votre marque reste visible, même quand vous êtes débordé"
        description="NEFERTEM crée vos visuels, publie, répond à vos clients et vous envoie un bilan clair chaque semaine. Dès 30 000 FCFA/mois. Premier lot en 72 h. Ouagadougou, Burkina Faso."
        path="/"
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "NEFERTEM - AI Growth Systems",
            description: "Abonnement marketing mensuel pour PME africaines : visuels, publication, réponses clients et bilan hebdomadaire.",
            address: { "@type": "PostalAddress", addressLocality: "Ouagadougou", addressCountry: "BF" },
            telephone: "+22605830599",
          },
        ]}
      />

      {/* S1 HERO */}
      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pt-36">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#D4AF37" />
        <div className="container relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="font-heading text-[36px] font-normal leading-[1.1] text-foreground sm:text-[46px] lg:text-[56px]">
              Votre marque reste visible, <span className="italic text-primary">même quand vous êtes débordé.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.7] text-muted-foreground md:text-[17px]">
              NEFERTEM crée vos visuels, publie, répond à vos clients et vous envoie un bilan
              clair chaque semaine. Premier lot prêt en 72 h.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/demarrer?src=hero"
                onClick={() => track("cta_click", { location: "hero", label: "diagnostic" })}
                className="inline-flex min-h-[52px] items-center justify-center rounded-[4px] bg-primary px-8 text-[13px] font-bold uppercase tracking-[1px] text-black-deep shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:bg-gold-accent"
              >
                → Recevoir mon diagnostic gratuit
              </Link>
              <Link
                to="/exemples"
                onClick={() => track("cta_click", { location: "hero", label: "exemples" })}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[4px] border border-foreground/20 px-8 text-[13px] font-bold uppercase tracking-[1px] text-foreground hover:border-primary hover:text-primary"
              >
                <Play className="h-4 w-4" aria-hidden="true" /> Voir ce que nous créons
              </Link>
            </div>
            <p className="mt-5 text-[12px] font-bold uppercase tracking-[1px] text-muted-foreground">
              Dès 30 000 FCFA/mois · Sans engagement · Paiement Mobile Money
            </p>
          </div>
          <PhoneFeedMockup />
        </div>
      </section>

      {/* S2 PROOF STRIP */}
      <section aria-label="NEFERTEM en chiffres" className="border-y border-primary/20 bg-primary/[0.07] py-6">
        <div className="container mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 lg:hidden">
          {PROOFS.map((p) => (
            <div key={p.label} className="flex items-center gap-3">
              <p.icon className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-[13px] leading-snug text-foreground">
                <span className="block text-[20px] font-bold text-primary">{p.big}</span>
                {p.label}
              </p>
            </div>
          ))}
        </div>
        <div className="relative hidden overflow-hidden lg:block" aria-hidden="true">
          <div className="drift flex w-max gap-16 pr-16">
            {[...PROOFS, ...PROOFS, ...PROOFS, ...PROOFS].map((p, i) => (
              <span key={i} className="flex items-center gap-3 whitespace-nowrap text-[14px] font-bold uppercase tracking-[1px] text-foreground">
                <p.icon className="h-5 w-5 text-primary" /> {p.big} {p.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* S3 PAIN */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl">
          <Reveal className="mb-10 text-center">
            <Eyebrow>Vous vous reconnaissez ?</Eyebrow>
            <h2 className="mt-4 font-heading text-[28px] font-normal uppercase leading-tight tracking-[1px] text-foreground md:text-[40px]">
              Vous gérez tout. Vos réseaux, eux, sont à l'arrêt.
            </h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {PAINS.map((pain, i) => (
              <Reveal key={pain.num} delay={i * 0.08}>
                <Card className="h-full rounded-[12px] border border-foreground/10 bg-foreground/[0.03] p-6 md:p-8">
                  <p className="font-heading text-[20px] text-primary">{pain.num}</p>
                  <h3 className="mt-2 font-heading text-[20px] uppercase tracking-[1px] text-foreground">{pain.title}</h3>
                  <p className="mt-3 text-[15px] italic text-foreground">« {pain.quote} »</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{pain.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <p className="font-heading text-[20px] uppercase tracking-[1px] text-primary md:text-[24px]">
              Chaque jour sans présence, un client choisit quelqu'un d'autre.
            </p>
          </Reveal>
        </div>
      </section>

      {/* S4 CURE */}
      <section className="border-t border-foreground/10 bg-foreground/[0.02] px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl">
          <Reveal className="mb-10 text-center">
            <h2 className="font-heading text-[28px] font-normal uppercase leading-tight tracking-[1px] text-foreground md:text-[40px]">
              Imaginez votre semaine, sans y penser.
            </h2>
          </Reveal>
          <Reveal>
            <BeforeAfter />
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {PROMISES.map((pr, i) => (
              <Reveal key={pr.title} delay={i * 0.08}>
                <div className="flex h-full items-start gap-4 rounded-[12px] border border-primary/25 bg-primary/[0.05] p-6">
                  <pr.icon className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <h3 className="text-[15px] font-bold uppercase tracking-[1px] text-foreground">{pr.title}</h3>
                    <p className="mt-1 text-[14px] text-muted-foreground">{pr.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* S5 HOW IT WORKS */}
      <section id="comment" className="scroll-mt-[96px] border-t border-foreground/10 px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl text-center">
          <Reveal>
            <Eyebrow>Simple comme bonjour</Eyebrow>
            <h2 className="mt-4 font-heading text-[28px] font-normal uppercase leading-tight tracking-[1px] text-foreground md:text-[40px]">
              Démarrer prend 2 minutes. Le reste, c'est nous.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08}>
                <div className="h-full rounded-[12px] border border-foreground/10 bg-foreground/[0.03] p-6">
                  <p className="font-heading text-[40px] leading-none text-primary">{s.num}</p>
                  <h3 className="mt-3 text-[15px] font-bold uppercase tracking-[1px] text-foreground">{s.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 text-left">
            <div className="rounded-[12px] border border-foreground/10 bg-foreground/[0.02] p-6">
              <button
                type="button"
                aria-expanded={weekOpen}
                aria-controls="semaine-type"
                onClick={() => setWeekOpen((v) => !v)}
                className="flex min-h-[44px] w-full items-center justify-between gap-3 text-left text-[14px] font-bold uppercase tracking-[1px] text-foreground"
              >
                Voir votre semaine type
                <ChevronDown className={cn("h-5 w-5 shrink-0 text-primary transition-transform", weekOpen && "rotate-180")} aria-hidden="true" />
              </button>
              {weekOpen && (
                <ul id="semaine-type" className="mt-4 space-y-4 border-t border-foreground/10 pt-4">
                  {WEEK.map((w) => (
                    <li key={w.days} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                      <span className="w-36 shrink-0 text-[12px] font-bold uppercase tracking-[1px] text-primary">{w.days}</span>
                      <span className="text-[14px] text-foreground">
                        <strong>{w.title} — </strong>
                        <span className="text-muted-foreground">{w.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* S6 SHOWCASE TEASER */}
      <section className="border-t border-foreground/10 bg-foreground/[0.02] px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <Reveal className="mb-10 text-center">
            <Eyebrow>Exemples de production</Eyebrow>
            <h2 className="mt-4 font-heading text-[28px] font-normal uppercase leading-tight tracking-[1px] text-foreground md:text-[40px]">
              Des visuels pensés pour votre secteur
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SHOWCASE_ITEMS.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06}>
                <article className="group h-full overflow-hidden rounded-[12px] border border-foreground/10 bg-background">
                  <VideoCard item={item} />
                  <div className="p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[2px] text-primary">{item.sector} · {item.plan}</p>
                    <h3 className="mt-1 font-heading text-[18px] uppercase tracking-[1px] text-foreground">{item.title}</h3>
                    <Link
                      to={`/demarrer?src=showcase&sector=${item.sectorKey}`}
                      onClick={() => track("cta_click", { location: "showcase_teaser", label: item.id })}
                      className="mt-2 inline-block min-h-[44px] text-[13px] font-bold uppercase tracking-[1px] text-primary hover:underline"
                    >
                      Je veux ça →
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/exemples"
              onClick={() => track("cta_click", { location: "showcase_teaser", label: "all" })}
              className="inline-flex min-h-[52px] items-center justify-center rounded-[4px] border border-primary/60 px-8 text-[13px] font-bold uppercase tracking-[1px] text-primary hover:bg-primary hover:text-black-deep"
            >
              → Voir tous les exemples
            </Link>
          </div>
        </div>
      </section>

      {/* S7 PRICING */}
      <section id="offres" className="scroll-mt-[96px] border-t border-primary/20 bg-card/90 pb-28 dark:bg-foreground/10">
        <PricingSection4 />
      </section>

      {/* S8 TRUST */}
      <section className="border-t border-foreground/10 px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl">
          <Reveal className="mb-8 text-center">
            <Eyebrow>En toute confiance</Eyebrow>
            <h2 className="mt-4 font-heading text-[28px] font-normal uppercase leading-tight tracking-[1px] text-foreground md:text-[40px]">
              Vous ne prenez aucun risque
            </h2>
          </Reveal>
          <Reveal>
            {/* TODO(owner): valider ce libellé de garantie avant publication. */}
            <div className="rounded-[12px] border border-primary/30 bg-primary/[0.06] p-6 text-center md:p-10">
              <ShieldCheck className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-[20px] uppercase tracking-[1px] text-foreground">Notre engagement</h3>
              <p className="mx-auto mt-2 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                Premier lot refait gratuitement, une fois, si le style ne vous convient pas.
              </p>
            </div>
          </Reveal>
          {TESTIMONIALS.length > 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {TESTIMONIALS.map((t) => (
                <figure key={t.author} className="rounded-[12px] border border-foreground/10 bg-foreground/[0.03] p-6">
                  <blockquote className="text-[14px] italic leading-relaxed text-foreground">« {t.quote} »</blockquote>
                  <figcaption className="mt-3 text-[12px] font-bold uppercase tracking-[1px] text-primary">— {t.author}</figcaption>
                </figure>
              ))}
            </div>
          )}
          <Reveal className="mt-6">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: Lock, text: "Vos conversations restent privées." },
                { icon: BadgeCheck, text: "Vos comptes et votre marque restent à vous." },
                { icon: CalendarCheck, text: "Vos contenus créés pour vous sont votre propriété." },
              ].map((s) => (
                <div key={s.text} className="flex items-start gap-3 rounded-[8px] border border-foreground/10 bg-foreground/[0.02] p-4">
                  <s.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-[13px] leading-snug text-foreground">{s.text}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-[13px] text-muted-foreground">
              <Link to="/securite" className="font-bold text-primary hover:underline">
                En savoir plus sur la sécurité →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* S9 FAQ */}
      <section id="faq" className="scroll-mt-[96px] border-t border-foreground/10 bg-card/90 px-4 py-16 dark:bg-foreground/10 md:py-24">
        <div className="container mx-auto max-w-3xl">
          <Reveal className="mb-8 text-center">
            <Eyebrow>Vos questions</Eyebrow>
            <h2 className="mt-4 font-heading text-[28px] font-normal uppercase leading-tight tracking-[1px] text-foreground md:text-[40px]">
              On vous dit tout
            </h2>
          </Reveal>
          <FaqSection />
        </div>
      </section>

      {/* S10 FINAL CTA */}
      <section className="relative overflow-hidden border-t border-primary/20 bg-foreground/[0.02] px-4 py-16 md:py-24">
        <div className="container relative z-10 mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="font-heading text-[28px] font-normal uppercase leading-tight tracking-[1px] text-foreground md:text-[44px]">
              Votre marque a des clients à rencontrer. Commençons aujourd'hui.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-[17px]">
              Diagnostic gratuit sous 24 h. Premier lot sous 72 h.
            </p>
            <div className="mx-auto mt-8 flex max-w-lg flex-col gap-3">
              <Link
                to="/demarrer?src=final"
                onClick={() => track("cta_click", { location: "final", label: "diagnostic" })}
                className="inline-flex min-h-[56px] items-center justify-center rounded-[4px] bg-primary px-8 text-[13px] font-bold uppercase tracking-[1px] text-black-deep shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:bg-gold-accent"
              >
                → Recevoir mon diagnostic gratuit
              </Link>
              <a
                href="https://wa.me/22605830599?text=Bonjour%20NEFERTEM%2C%20j%27ai%20une%20question."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_opened", { src: "final" })}
                className="inline-flex min-h-[48px] items-center justify-center text-[13px] font-bold uppercase tracking-[1px] text-primary hover:underline"
              >
                Ou écrivez-nous directement
              </a>
            </div>
            <p className="mt-6 font-mono text-[15px] font-bold text-foreground">+226 05 83 05 99</p>
            <p className="mt-1 text-[11px] uppercase tracking-[1px] text-muted-foreground">Réponse en moins d'1 heure</p>
          </Reveal>
        </div>
      </section>

      <div className="flex justify-center pb-10">
        <ArrowDown className="h-6 w-6 animate-bounce text-primary/50" aria-hidden="true" />
      </div>
    </PageTransition>
  );
}
