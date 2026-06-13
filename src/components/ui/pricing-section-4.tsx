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
    name: "L'Assistant Standard",
    tier: "Tier 1",
    description: "Gère votre WhatsApp et vos réseaux Facebook principaux pendant que vous travaillez.",
    price: 50000,
    yearlyPrice: 42500,
    buttonText: "Choisir l'Assistant Standard",
    buttonVariant: "outline" as const,
    idealFor: "Idéal : Couturiers, Restaurants, Boutiques",
    includes: [
      "Inclus :",
      "Assistant WhatsApp 24h/24 réactif",
      "Capture & base de données clients",
      "12 publications Facebook / mois",
      "4 vidéos courtes impactantes (15s)",
      "Réponses aux commentaires FB",
      "Rapport d'activité mensuel complet",
      "Réponses ultra-rapides et intelligentes",
      "Générations d'images haute qualité"
    ],
  },
  {
    name: "L'Assistant Commercial",
    tier: "Tier 2",
    description: "Un département commercial complet gérant WhatsApp, FB, Instagram, TikTok et de la publicité.",
    price: 150000,
    yearlyPrice: 127500,
    buttonText: "Choisir l'Assistant Commercial",
    buttonVariant: "default" as const,
    popular: true,
    idealFor: "Idéal : Cliniques, Écoles, Immo, Grossistes",
    includes: [
      "Inclus : Toutes les capacités Tier 1",
      "Gestion complète 3 réseaux (FB, IG, TikTok)",
      "8 vidéos ultra-réalistes qualité TV",
      "Gestion automatisée de vos publicités",
      "Séquences de relances clients froides",
      "Assistant WhatsApp avec catalogue",
      "Rapport bimensuel de ROI chiffré",
      "Protection avancée de votre numéro"
    ],
  },
  {
    name: "Le Département Complet",
    tier: "Tier 3",
    description: "Un directeur, un commercial et un créatif digitaux pour propulser votre croissance.",
    price: 400000,
    yearlyPrice: 340000,
    buttonText: "Choisir le Département Complet",
    buttonVariant: "outline" as const,
    idealFor: "Idéal : Promoteurs, Hôtels, Cliniques d'élite",
    includes: [
      "Inclus : Toutes les capacités Tier 2",
      "40+ pièces de contenu premium / mois",
      "15 vidéos ultra-réalistes qualité TV",
      "Budget publicitaire 50 000 FCFA INCLUS",
      "Landing page marque créée & maintenue",
      "Analyse concurrentielle mensuelle",
      "Campagnes WhatsApp Broadcast",
      "Rapport hebdo + Call stratégique"
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
      <div className="relative z-10 mx-auto flex w-fit rounded-[4px] bg-card/90 dark:bg-foreground/10 backdrop-blur-md border border-foreground/10 p-1">
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
          color="#D4AF37"
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
            Que vous vouliez déléguer juste les bases ou confier toute votre stratégie, il y a un assistant conçu pour vous.
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={1}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
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
                  ? "bg-foreground/[0.05] backdrop-blur-2xl border-primary shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden" 
                  : "bg-foreground/[0.02] backdrop-blur-xl border-foreground/10 hover:border-foreground/20"
                )}
              >
                {plan.popular && (
                  <>
                    <div className="absolute top-[20px] right-[20px] bg-primary text-black-deep text-[11px] font-bold py-[4px] px-[12px] uppercase tracking-[1px] rounded-full z-20">
                      ⭐ Recommandé
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
                  
                  <div className="flex items-end gap-2 mt-6">
                    <span className="text-[36px] md:text-[44px] font-bold text-foreground flex items-end leading-none">
                      <NumberFlow
                        format={{ useGrouping: true }}
                        value={isYearly ? plan.yearlyPrice : plan.price}
                        className="text-[36px] md:text-[44px] font-bold leading-none"
                      />
                    </span>
                    <span className="text-[13px] font-normal text-gray-500 mb-2 uppercase tracking-wide">
                      FCFA/mo
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="p-[32px] md:p-[40px] pt-0 relative z-10 flex flex-col flex-grow">
                  <div className={cn("h-px my-6", plan.popular ? "bg-gradient-to-r from-transparent via-primary/30 to-transparent" : "bg-foreground/10")}></div>

                  <div className="space-y-4 flex-grow">
                    <ul className="space-y-3">
                      {plan.includes.slice(1).map((feature, featureIndex) => (
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
                      onClick={() => window.location.href = `/contact?offer=${plan.name.split(' ')[1].toLowerCase()}`}
                      className={cn("w-full py-[16px] text-center text-[13px] uppercase font-bold tracking-[1px] rounded-[4px] transition-all duration-300",
                        plan.buttonVariant === "default"
                          ? "bg-primary text-black-deep hover:bg-gold-accent hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                          : "border border-foreground/20 text-foreground hover:bg-white hover:text-black-deep bg-background/0"
                      )}
                    >
                      → {plan.buttonText}
                    </button>
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
