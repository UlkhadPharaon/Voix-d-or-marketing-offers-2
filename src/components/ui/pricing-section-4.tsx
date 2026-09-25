"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const plans = [
  {
    name: "Essentials",
    tier: "Lancement",
    description: "Votre présence reste visible et active pendant que vous vous concentrez sur le business.",
    price: 15000,
    promoPrice: 15000,
    yearlyPrice: 15000,
    buttonText: "Choisir Essentials",
    buttonVariant: "outline" as const,
    idealFor: "Idéal : Boutiques, Restaurants, Commerces locaux",
    includes: [
      "90+ visuels commerciaux / mois",
      "Publication & organisation selon scope",
      "Réponses automatiques limitées",
      "Calendrier de contenu mensuel",
      "Rapport d'activité mensuel",
      "Diagnostic de présence digitale",
      "1 révision par lot de contenu",
      "Support WhatsApp"
    ],
  },
  {
    name: "Standard",
    tier: "Recommandé",
    description: "Essentials + la puissance vidéo pour tester les formats qui convertissent.",
    price: 25000,
    promoPrice: 25000,
    yearlyPrice: 25000,
    buttonText: "Choisir Standard",
    buttonVariant: "default" as const,
    popular: true,
    idealFor: "Idéal : Food, Beauty & Fashion, Éducation",
    includes: [
      "Tout Essentials inclus",
      "Jusqu'à 3 vidéos / semaine (15s max)",
      "Distribution FB, IG, TikTok",
      "Community management de base",
      "Test de formats vidéo mensuel",
      "Analyse concurrentielle mensuelle",
      "Rapport bimensuel chiffré",
      "Optimisation continue",
      "Support prioritaire",
      "Journal des apprentissages"
    ],
  },
  {
    name: "Business",
    tier: "Performance",
    description: "Le système complet pour les entreprises prêtes à accélérer avec la publicité.",
    price: 60000,
    promoPrice: 60000,
    yearlyPrice: 60000,
    buttonText: "Choisir Business",
    buttonVariant: "outline" as const,
    idealFor: "Idéal : Cliniques, Écoles, Hôtels, Promoteurs",
    includes: [
      "Tout Standard inclus",
      "Jusqu'à 5 vidéos / semaine (45s max)",
      "Gestion ads selon scope (budget média séparé)",
      "Séquences de relance prospects",
      "Base de données clients & qualification",
      "Landing page maintenue",
      "Analyse concurrentielle mensuelle",
      "Rapport hebdo de performance",
      "Stratégie & plan à 7 jours",
      "Onboarding 72h garanti",
      "Account manager dédié"
    ],
  },
];

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="relative z-10 mx-auto flex w-fit rounded-[4px] bg-card/90 dark:bg-foreground/10  border border-foreground/10 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10 rounded-[2px] sm:px-6 px-3 sm:py-2 py-1 uppercase tracking-[1px] text-[12px] font-bold transition-colors",
            selected === "0" ? "text-black-deep" : "text-gray-400 hover:text-foreground"
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-[2px] bg-primary"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Mensuel</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-[2px] sm:px-6 px-3 sm:py-2 py-1 uppercase tracking-[1px] text-[12px] font-bold transition-colors",
            selected === "1" ? "text-black-deep" : "text-gray-400 hover:text-foreground"
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-[2px] bg-primary"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            Annuel <span className="-mt-2 text-[10px] bg-white text-black-deep px-1 rounded-sm">-15%</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default function PricingSection4() {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  return (
    <div
      className="w-full relative bg-background/0 overflow-hidden pb-20"
      ref={pricingRef}
    >
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 h-full w-full overflow-hidden opacity-20 pointer-events-none"
        style={{ WebkitMaskImage: 'radial-gradient(100% 100% at 50% 0%, white, transparent)' }}
      >
        <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <Sparkles
          density={800}
          direction="top"
          speed={0.5}
          color="#28C2D3"
          className="absolute inset-x-0 top-0 h-full w-full"
          style={{ WebkitMaskImage: 'radial-gradient(100% 100% at 50% 0%, white, transparent 80%)' }}
        />
      </TimelineContent>

      <div className="relative z-50 container mx-auto px-4 max-w-[1200px]">
        <article className="text-center mb-16 pt-24 max-w-3xl mx-auto space-y-4">
          <h2 className="text-[28px] sm:text-[40px] lg:text-[48px] font-heading font-normal uppercase tracking-[1px] text-foreground leading-tight">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.1}
              staggerFrom="first"
              reverse={true}
              containerClassName="justify-center"
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 40,
              }}
            >
              Des offres claires.
Pas de surprise.
            </VerticalCutReveal>
          </h2>

          <TimelineContent
            as="p"
            animationNum={0}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="text-muted-foreground text-[15px]"
          >
            Que vous vouliez prouver le système ou confier toute votre croissance, il y a un plan conçu pour votre étape.
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={1}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="flex flex-col items-center gap-4"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mt-4">
              🚀 Premier lot livré sous 72h
            </div>
            <PricingSwitch onSwitch={togglePricingPeriod} />
          </TimelineContent>
        </article>

        <div className="grid lg:grid-cols-3 max-w-6xl gap-6 mx-auto relative z-20">
          {plans.map((plan, index) => (
            <TimelineContent
              key={plan.name}
              as="div"
              animationNum={2 + index}
              timelineRef={pricingRef}
              customVariants={revealVariants}
              className={`flex h-full ${plan.popular ? 'lg:-mt-4 lg:mb-4 relative z-30' : 'relative z-10'}`}
            >
              <Card
                className={cn("w-full border rounded-[8px] flex flex-col justify-between transition-all duration-300", 
                  plan.popular 
                  ? "bg-foreground/[0.05]  border-primary shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden" 
                  : "bg-foreground/[0.02]  border-foreground/10 hover:border-foreground/20"
                )}
              >
                {plan.popular && (
                  <>
                    <div className="absolute top-[20px] right-[20px] bg-primary text-black-deep text-[11px] font-bold py-[4px] px-[12px] uppercase tracking-[1px] rounded-full z-20">
                      ⭐ Le Plus Populaire
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[200px] bg-primary/10 blur-[80px] pointer-events-none rounded-t-full"></div>
                  </>
                )}
                
                <CardHeader className="text-left p-[32px] md:p-[40px] relative z-10">
                  <div className="mb-2">
                    <span className={cn("font-heading text-[16px] uppercase tracking-[1px] mb-2 block", plan.popular ? "text-primary" : "text-gray-400")}>{plan.tier}</span>
                    <h3 className="text-[20px] md:text-[24px] uppercase tracking-[1px] text-foreground font-heading leading-tight">{plan.name}</h3>
                  </div>
                  <p className="text-[13px] text-muted-foreground min-h-[48px] mt-2 leading-relaxed">{plan.description}</p>
                  
                  <div className="flex flex-col items-start mt-6 min-h-[80px]">
                    {!isYearly && plan.promoPrice && (
                      <span className="text-gray-500 line-through text-[16px] font-medium mb-1">
                        {plan.price.toLocaleString('fr-FR')} FCFA
                      </span>
                    )}
                    <div className="flex items-end gap-2">
                      <span className={cn(
                        "text-[36px] md:text-[44px] font-bold flex items-end leading-none transition-colors",
                        !isYearly && plan.promoPrice ? "text-primary" : "text-foreground"
                      )}>
                        <NumberFlow
                          format={{ useGrouping: true }}
                          value={isYearly ? plan.yearlyPrice : (plan.promoPrice || plan.price)}
                          className="text-[36px] md:text-[44px] font-bold leading-none"
                        />
                      </span>
                      <span className="text-[13px] font-normal text-gray-500 mb-2 uppercase tracking-wide">
                        FCFA/mo
                      </span>
                    </div>
                    {!isYearly && plan.promoPrice && (
                      <span className="bg-primary border border-primary/80 text-background px-3 py-1.5 rounded-[4px] text-[11px] uppercase font-bold tracking-wider mt-3 shadow-sm inline-block">
                        Prix de lancement
                      </span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-[32px] md:p-[40px] pt-0 relative z-10 flex flex-col flex-grow">
                  <div className={cn("h-px my-6", plan.popular ? "bg-gradient-to-r from-transparent via-primary/30 to-transparent" : "bg-foreground/10")}></div>

                  <div className="space-y-4 flex-grow">
                    <ul className="space-y-3">
                      {plan.includes.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3"
                        >
                          <span className="text-primary mt-[2px] shrink-0">✓</span>
                          <span className={cn("text-[13px]", plan.popular ? "text-foreground font-bold" : "text-gray-300")}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 w-full">
                    <span className="text-[10px] uppercase text-gray-500 font-bold block mb-4 text-center tracking-wider">{plan.idealFor}</span>
                    <button
                      onClick={() => window.location.href = `/contact?offer=${plan.name.toLowerCase()}`}
                      className={cn("w-full py-[16px] text-center text-[13px] uppercase font-bold tracking-[1px] rounded-[4px] transition-all duration-300",
                        plan.buttonVariant === "default"
                          ? "bg-primary text-black-deep hover:bg-gold-accent hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                          : "border border-foreground/20 text-foreground hover:bg-white hover:text-black-deep bg-background/0"
                      )}
                    >
                      → {plan.buttonText}
                    </button>
                    <p className="text-center text-[11px] text-primary mt-3 uppercase tracking-wider font-bold">
                      Budget média séparé des honoraires
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TimelineContent>
          ))}
        </div>
      </div>
    </div>
  );
}
