import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowDown, Play, Clock, Smartphone, Wallet, TrendingUp, Send, ShieldCheck, Calendar, FileText, User as UserIcon, MessagesSquare, Lightbulb, PenTool, PhoneCall, Check, Minus, Zap, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SEO } from '@/components/SEO';
import { PageTransition } from '@/components/PageTransition';
import { InfiniteMarquee } from '@/components/InfiniteMarquee';
import { SplineScene } from "@/components/ui/splite";
import { VantaBackground } from "@/components/VantaBackground";
import { Spotlight } from "@/components/ui/spotlight";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import PricingSection4 from "@/components/ui/pricing-section-4";
import { EcosystemRadar } from "@/components/ui/ecosystem-radar";

const timelineData = [
  {
    id: 1,
    title: "Intelligence & Stratégie",
    date: "Lun - Mar",
    content: "Recherche marché, audience et concurrents. Hypothèses, mix de contenu et tests définis pour la semaine.",
    category: "Analyse",
    icon: Calendar,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Production Créative",
    date: "Mer - Jeu",
    content: "Concepts, scripts, génération IA et édition. Images, vidéos et motions validés avec vous en quelques minutes.",
    category: "Studio",
    icon: PenTool,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 3,
    title: "Distribution & Community",
    date: "Ven - Sam",
    content: "Planning, publication, repurposing. Commentaires, DMs et qualification traités chaque jour.",
    category: "Growth",
    icon: PhoneCall,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 95,
  },
  {
    id: 4,
    title: "Performance & Learning",
    date: "Dim",
    content: "KPIs, diagnostics, attribution honnête. Chaque cycle alimente la mémoire : ce qui marche est amplifié.",
    category: "Data",
    icon: Lightbulb,
    relatedIds: [1, 3],
    status: "pending" as const,
    energy: 100,
  },
];

export function Home() {
  const [billingCycle, setBillingCycle] = useState<'mensuel' | 'trimestriel'>('mensuel');
  const [faqSearchQuery, setFaqSearchQuery] = useState('');

  const faqs = [
    {
      q: "Que fait concrètement NEFERTEM chaque semaine ?",
      a: "Nous opérons votre système marketing : recherche, stratégie, création de contenu, publication, community management et analyse. Chaque mois, nous testons, mesurons et ajustons ce qui fonctionne pour votre marché."
    },
    {
      q: "En quoi êtes-vous différents d'une agence classique ?",
      a: "Nous ne vendons pas des posts. Nous sommes le système marketing qui tourne chaque semaine pour votre entreprise. La stratégie décide, l'IA exécute, la donnée arbitre. Vous restez visible et actif pendant que vous vous concentrez sur le business."
    },
    {
      q: "Quels sont vos prix et que comprennent-ils ?",
      a: "Essentials à 15 000 FCFA/mois (90+ visuels, publication, réponses auto limitées), Standard à 25 000 FCFA/mois (+ jusqu'à 3 vidéos/semaine 15s), Business à 60 000 FCFA/mois (+ jusqu'à 5 vidéos/semaine 45s et gestion ads). Le budget média est toujours séparé des honoraires."
    },
    {
      q: "En combien de temps je reçois mes premiers contenus ?",
      a: "De la signature au premier livrable : 72 heures. T+0 paiement, T+24h intake business & marque, T+48h stratégie & plan à 7 jours, T+72h premier lot livré. Puis un cycle mensuel continu."
    },
    {
      q: "Comment démarrer ?",
      a: "Remplissez notre brief en 2 minutes. Nous vous contactons sur WhatsApp dans l'heure pour l'intake et le lancement."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(faqSearchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(faqSearchQuery.toLowerCase())
  );

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <PageTransition className="w-full relative">
      <SEO 
        title="NEFERTEM - AI Growth Systems | La croissance devient un système"
        description="NEFERTEM construit et opère votre système marketing : contenu, distribution, conversations et optimisation. 90+ visuels/mois dès 15 000 FCFA. Premier lot sous 72h. Ouagadougou, Burkina Faso."
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "NEFERTEM - AI Growth Systems",
            "image": "./logo/nefertem-full.png",
            "description": "AI Growth Systems for African Businesses. Système marketing continu : contenu, distribution, conversations et optimisation.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ouagadougou",
              "addressCountry": "Burkina Faso"
            },
            "telephone": "+22657265915"
          }
        ]}
      />

      {/* Background moved to Layout */}

      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex items-center justify-start bg-background/0 overflow-hidden pt-32 pb-[140px] px-6 md:px-[40px]">
        {/* Spotlight Effect */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#D4AF37" />

        {/* Vanta NET — agent-network backdrop in brand tokens (gold on obsidian) */}
        <VantaBackground
          effect="net"
          className="absolute inset-0 z-0 h-full w-full opacity-80 pointer-events-none"
          options={{ points: 9, maxDistance: 26, spacing: 20 }}
        >
          <div className="absolute inset-0 bg-background/40 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none"></div>
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        </VantaBackground>

        <div className="container relative z-10 mx-auto w-full flex flex-col md:flex-row items-center justify-between pointer-events-none">
          {/* Content */}
          <div className="flex flex-col items-start justify-center max-w-2xl mt-12 mb-8 pointer-events-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading text-[36px] sm:text-[46px] md:text-[52px] lg:text-[60px] font-normal leading-[1.1] mb-[28px] text-foreground shadow-black-deep drop-shadow-2xl"
            >
              Adoptez votre <span className="text-primary italic font-serif">système marketing complet</span> <br className="hidden lg:block"/> dès 15 000 FCFA/mois.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[15px] sm:text-[16px] md:text-[18px] text-muted-foreground max-w-[650px] leading-[1.6] mb-[40px] drop-shadow-md text-left"
            >
              Votre entreprise reste visible et active pendant que vous vous concentrez sur le business. NEFERTEM combine IA, contenu, distribution, community management et analyse continue. Chaque mois, nous testons, mesurons et ajustons ce qui fonctionne pour votre marché.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start justify-start gap-[15px] w-full"
            >
              <Button onClick={() => window.location.href = '/#offres'} className="w-full sm:w-auto px-[32px] py-[16px] h-auto text-[13px] uppercase font-bold tracking-[1px] bg-primary text-black-deep rounded-[4px] shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] hover:-translate-y-1 transition-all">
                → Voir les offres
              </Button>
              <Button onClick={() => window.location.href = '/portfolio'} className="w-full sm:w-auto flex items-center justify-center gap-3 px-[32px] py-[16px] h-auto text-[13px] uppercase font-bold tracking-[1px] border-b-2 border-transparent text-foreground bg-background/0 rounded-none hover:border-primary hover:text-primary transition-colors">
                → Voir des exemples
              </Button>
            </motion.div>
          </div>
          
          <div className="hidden lg:block flex-1">
             {/* Spline area */}
          </div>
        </div>

        {/* Proof Bar - Positioned at bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-0 left-0 w-full bg-background/80  border-t border-foreground/10 py-5"
        >
          <div className="container mx-auto px-6 md:px-[40px]">
            <div className="grid grid-cols-2 lg:flex lg:flex-row items-center justify-center lg:gap-[40px] max-w-6xl mx-auto gap-4 text-center">
              <span className="text-[12px] md:text-[14px] uppercase text-muted-foreground tracking-[1px] font-bold"><span className="text-primary hidden lg:inline">•</span> 90+ visuels / mois</span>
              <span className="text-[12px] md:text-[14px] uppercase text-muted-foreground tracking-[1px] font-bold"><span className="text-primary hidden lg:inline">•</span> Premier lot sous 72h</span>
              <span className="text-[12px] md:text-[14px] uppercase text-muted-foreground tracking-[1px] font-bold"><span className="text-primary hidden lg:inline">•</span> Contenu + Distribution + Community</span>
              <span className="text-[12px] md:text-[14px] uppercase text-muted-foreground tracking-[1px] font-bold"><span className="text-primary hidden lg:inline">•</span> La donnée arbitre</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Infinite Marquee Section */}
      <div className="relative z-10 pointer-events-auto">
        <InfiniteMarquee />
      </div>

      {/* SECTION 2: VOTRE SITUATION AUJOURD'HUI */}
      <section className="py-[60px] md:py-[120px] bg-foreground/[0.02]  text-foreground relative border-t border-foreground/10 shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-center min-h-[80vh]">
        {/* Cyber Mannequin Background removed for performance */}
        <div className="absolute md:top-0 md:right-0 inset-0 md:inset-auto md:w-[60vw] md:h-full z-0 opacity-40 md:opacity-50 flex items-end md:items-center justify-center md:justify-end translate-y-32 md:-translate-y-10 scale-125 md:scale-100">
          {/* Gradient to blend with background seamlessly */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent hidden md:block pointer-events-none"></div>
        </div>

        {/* Background glow */}
        <div className="absolute top-1/4 -left-[20%] w-[50%] h-[50%] rounded-full bg-red-900/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-[20%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 max-w-7xl mx-auto">
            {/* Left Column: Context */}
            <div className="lg:col-span-5 flex flex-col justify-center pointer-events-auto">
              <div className="sticky top-32">
                <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px] rounded-full">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Le Constat
                </div>
                <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-heading font-normal mb-[24px] uppercase tracking-[1px] leading-[1.1]">
                  Ce que vivent la plupart des PME
                </h2>
                <p className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.8] mb-[32px] max-w-md">
                  Ni temps, ni équipe, ni système marketing continu. Publier sans apprendre, payer sans mesurer, répondre tard aux messages : c'est ce chaos que NEFERTEM transforme en système de croissance.
                </p>
                <div className="hidden lg:block w-full h-[1px] bg-gradient-to-r from-red-500/20 to-transparent"></div>
              </div>
            </div>

            {/* Right Column: Problem Cards */}
            <div className="lg:col-span-7 flex flex-col gap-6 pointer-events-auto">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
                <Card className="group bg-card/90 dark:bg-foreground/10  border border-foreground/5 rounded-[12px] shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-red-500/30 hover:bg-background hover:shadow-[0_0_40px_rgba(239,68,68,0.05)] transition-all overflow-hidden relative p-[32px] md:p-[40px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-[4px] h-0 bg-red-500 group-hover:h-full transition-all duration-500 ease-out"></div>
                  <CardContent className="p-0 relative z-10 flex flex-col sm:flex-row gap-6">
                    <div className="shrink-0">
                      <div className="w-14 h-14 rounded-full border border-red-500/20 bg-red-500/10 flex items-center justify-center text-red-500 font-heading text-[20px] shadow-[inset_0_0_20px_rgba(239,68,68,0.2)]">
                        01
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading uppercase tracking-[1px] text-[20px] mb-[12px] text-foreground">
                        Présence irrégulière
                      </h3>
                      <p className="text-gray-400 text-[14px] leading-[1.7]">
                        « Je manque de temps pour publier. » « Je ne sais pas quoi poster. » Sans calendrier ni production continue, votre marque disparaît des fils pendant que vous gérez le business.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: 0.1 }}>
                <Card className="group bg-card/90 dark:bg-foreground/10  border border-foreground/5 rounded-[12px] shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-red-500/30 hover:bg-background hover:shadow-[0_0_40px_rgba(239,68,68,0.05)] transition-all overflow-hidden relative p-[32px] md:p-[40px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-[4px] h-0 bg-red-500 group-hover:h-full transition-all duration-500 ease-out"></div>
                  <CardContent className="p-0 relative z-10 flex flex-col sm:flex-row gap-6">
                    <div className="shrink-0">
                      <div className="w-14 h-14 rounded-full border border-red-500/20 bg-red-500/10 flex items-center justify-center text-red-500 font-heading text-[20px] shadow-[inset_0_0_20px_rgba(239,68,68,0.2)]">
                        02
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading uppercase tracking-[1px] text-[20px] mb-[12px] text-foreground">
                        Contenu sans effet
                      </h3>
                      <p className="text-gray-400 text-[14px] leading-[1.7]">
                        « Je publie, mais personne ne réagit. » « Je paie des visuels sans savoir si cela apporte des clients. » Du volume sans apprentissage : chaque publication faible devrait devenir une <strong className="text-foreground font-normal">information exploitable</strong>.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: 0.2 }}>
                <Card className="group bg-card/90 dark:bg-foreground/10  border border-foreground/5 rounded-[12px] shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-red-500/30 hover:bg-background hover:shadow-[0_0_40px_rgba(239,68,68,0.05)] transition-all overflow-hidden relative p-[32px] md:p-[40px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-[4px] h-0 bg-red-500 group-hover:h-full transition-all duration-500 ease-out"></div>
                  <CardContent className="p-0 relative z-10 flex flex-col sm:flex-row gap-6">
                    <div className="shrink-0">
                      <div className="w-14 h-14 rounded-full border border-red-500/20 bg-red-500/10 flex items-center justify-center text-red-500 font-heading text-[20px] shadow-[inset_0_0_20px_rgba(239,68,68,0.2)]">
                        03
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading uppercase tracking-[1px] text-[20px] mb-[12px] text-foreground">
                        Messages & pubs sans pilotage
                      </h3>
                      <p className="text-gray-400 text-[14px] leading-[1.7]">
                        « Mon équipe répond tard aux messages. » « Je fais des pubs, mais je ne sais pas ce qui marche. » NEFERTEM <strong className="text-foreground font-normal">opère le cycle complet</strong> : contenu, distribution, conversations, analyse et apprentissage.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          <div className="mt-24 flex flex-col items-center justify-center text-center pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-[12px] font-bold uppercase tracking-[1px] text-primary">La Solution Intelligente</span>
            </div>
            <p className="font-heading uppercase tracking-[1px] text-[24px] text-foreground mb-4 max-w-2xl">Nous ne sommes pas une usine à posts. Nous sommes le système marketing qui tourne chaque semaine pour votre entreprise.</p>
            
            <EcosystemRadar />

            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-12"
            >
              <ArrowDown className="text-primary w-8 h-8 opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CALENDRIER OPERATOIRE DE L'ASSISTANT */}
      <section className="py-[60px] md:py-[120px] bg-card/90 dark:bg-foreground/10  text-foreground relative border-t border-foreground/10 shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Robot Background */}
        <div className="absolute inset-0 z-0 h-full w-full opacity-30 md:opacity-50 flex items-center justify-center pointer-events-none">
          <SplineScene 
            scene="/genkub_greeting_robot.splinecode"
            className="w-full h-full pointer-events-none"
          />
          {/* Gradients pour fondre le robot dans le fond */}
          <div className="absolute inset-0 bg-background/0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none"></div>
          <div className="absolute inset-0 bg-background/40 pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-20 pointer-events-none">
          <div className="text-center mb-10 md:mb-16 flex flex-col items-center pointer-events-auto">
            <div className="inline-flex self-center bg-background/0 border border-foreground/20 text-muted-foreground px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
              Efficacité Systématique
            </div>
            <h2 className="text-[28px] sm:text-[40px] md:text-[48px] font-heading font-normal mb-[16px] uppercase tracking-[1px]">Le système NEFERTEM, chaque semaine</h2>
            <p className="text-muted-foreground text-[15px] max-w-2xl mx-auto">
              La stratégie décide. L'IA exécute. La donnée arbitre. Cliquez sur un axe pour explorer le cycle continu.
            </p>
          </div>
        </div>
        
        <div className="md:-my-[100px] xl:-my-[150px] relative z-10 w-full pointer-events-auto">
          {/* We import the new orbital timeline component here */}
          <RadialOrbitalTimeline timelineData={timelineData} />
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-20 pointer-events-none">
          <div className="mt-12 text-center border border-primary/30 bg-primary/10  shadow-[0_8px_32px_rgba(212,175,55,0.1)] p-8 rounded-[8px] pointer-events-auto">
            <p className="text-[18px] md:text-[20px] font-heading uppercase tracking-[1px] text-primary mb-2">NOS PRINCIPES :</p>
            <p className="text-foreground text-[15px] md:text-[17px] max-w-3xl mx-auto leading-relaxed">
              Donnée avant intuition. Une tendance est une piste, pas une stratégie. Nous ne promettons jamais la viralité et n'inventons aucune preuve : chaque expérience a un objectif et un signal mesuré.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: COMMENT ÇA MARCHE / NOTRE DÉMO LIVE */}
      <section className="py-[60px] md:py-[120px] bg-foreground/[0.02]  text-foreground relative border-t border-foreground/10 shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Futuristic Rays Background (Optimized) */}
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] mix-blend-screen"></div>
          {/* Gradients to fade blending with the section */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-20 pointer-events-none">
          <div className="mb-10 text-center flex flex-col items-center pointer-events-auto">
            <div className="inline-flex bg-background/0 border border-foreground/20 text-muted-foreground px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
              La Méthodologie Imbattable
            </div>
            <h2 className="text-[28px] sm:text-[40px] md:text-[48px] font-heading font-normal mb-[16px] leading-tight uppercase tracking-[1px]">
              Notre Diagnostic <br/> <span className="text-primary italic font-serif">Vaut 10 000 mots</span>
            </h2>
            <p className="text-muted-foreground text-[15px] max-w-2xl mx-auto">
              Pas de discours commerciaux. Des systèmes visibles : calendrier, dashboards, experiments et apprentissages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-[40px] pointer-events-auto">
            {[
              { num: 'I', title: 'Le Constat', desc: 'Temps manquant, présence irrégulière, contenu inefficace, messages sans suivi, pubs sans mesure. Diagnostic en 24h.' },
              { num: 'II', title: 'Le Diagnostic', desc: 'Intake business et marque, stratégie et plan à 7 jours, puis premier lot livré sous 72h.' },
              { num: 'III', title: 'Votre Croissance', desc: 'Presence active + apprentissage + conversations. Votre marque reste votre propriete.' },
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-start border border-foreground/10 bg-foreground/[0.03]  shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-6 rounded-[8px] hover:border-primary/50 transition-colors"
              >
                <div className="font-heading text-[24px] text-primary mb-[16px]">
                  {step.num}
                </div>
                <h4 className="font-bold text-[13px] mb-[12px] uppercase tracking-[1px] text-foreground">{step.title}</h4>
                <p className="text-muted-foreground text-[13px] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PRICING */}
      <section id="offres" className="bg-card/90 dark:bg-foreground/10  border-t border-primary/20 relative pointer-events-auto shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <PricingSection4 />

        <div className="bg-background/0 relative pb-24 border-t border-foreground/5 pt-16">
          {/* Transparence Background (Optimized) */}
          <div className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-50">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
          {/* Table of guarantees */}
          <div className="mt-20 max-w-[1000px] mx-auto hidden lg:block">
            <div className="text-center mb-8 flex flex-col items-center">
              <div className="inline-flex self-center bg-background/0 border border-foreground/20 text-muted-foreground px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[16px]">
                Transparence
              </div>
              <h3 className="font-heading uppercase tracking-[1.5px] text-[28px] text-foreground">Détail de nos formules</h3>
              <p className="text-muted-foreground text-[14px] mt-3 max-w-2xl text-center">Contenu, vidéos, distribution et pilotage selon chaque formule NEFERTEM.</p>
            </div>
            
            <div className="bg-foreground/[0.02]  border border-foreground/10 rounded-[12px] overflow-hidden shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative ring-1 ring-white/5">
              <div className="absolute top-0 right-1/4 w-1/4 h-full bg-primary/[0.04] pointer-events-none shadow-[inset_0_0_40px_rgba(212,175,55,0.05)]"></div>
              <table className="w-full text-left border-collapse relative z-10">
                <thead>
                  <tr>
                    <th className="p-6 text-[13px] text-gray-400 uppercase tracking-[1px] font-bold border-b border-foreground/10 w-1/4 align-bottom bg-background/0">Contenu & Pilotage</th>
                    <th className="p-6 text-[13px] text-foreground uppercase tracking-[1px] font-bold border-b border-foreground/10 text-center w-1/4 bg-foreground/[0.02] align-bottom">Essentials <span className="block text-[10px] text-gray-500 font-normal mt-1 normal-case tracking-normal">Essentials</span></th>
                    <th className="p-6 text-[13px] text-primary uppercase tracking-[1px] font-bold border-b border-primary/30 text-center relative w-1/4 bg-primary/[0.05] align-bottom shadow-[0_-20px_40px_-20px_rgba(212,175,55,0.1)_inset]">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
                      Standard <span className="block text-[10px] text-primary/70 font-normal mt-1 normal-case tracking-normal">Standard</span>
                    </th>
                    <th className="p-6 text-[13px] text-foreground uppercase tracking-[1px] font-bold border-b border-foreground/10 text-center w-1/4 bg-foreground/[0.02] align-bottom">Business <span className="block text-[10px] text-gray-500 font-normal mt-1 normal-case tracking-normal">Business</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[14px]">
                  <tr className="hover:bg-foreground/[0.04] transition-colors duration-300 group">
                    <td className="p-4 pl-6 text-gray-300 font-medium group-hover:text-foreground transition-colors">Relance & Conversations</td>
                    <td className="p-4 text-center text-foreground bg-foreground/[0.01]">Réponses auto limitées</td>
                    <td className="p-4 text-center text-primary font-bold bg-primary/[0.02]">Séquences + qualification</td>
                    <td className="p-4 text-center text-foreground bg-foreground/[0.01]">Relance multicanale + ads</td>
                  </tr>
                  <tr className="hover:bg-foreground/[0.04] transition-colors duration-300 group">
                    <td className="p-4 pl-6 text-gray-300 font-medium group-hover:text-foreground transition-colors">Production / mois</td>
                    <td className="p-4 text-center text-foreground bg-foreground/[0.01]">90+ visuels</td>
                    <td className="p-4 text-center text-primary font-bold bg-primary/[0.02]">90+ visuels + 12 vidéos 15s</td>
                    <td className="p-4 text-center text-foreground font-bold bg-foreground/[0.01]">90+ visuels + 20 vidéos 45s</td>
                  </tr>
                  <tr className="hover:bg-foreground/[0.04] transition-colors duration-300 group">
                    <td className="p-4 pl-6 text-gray-300 font-medium group-hover:text-foreground transition-colors">Pilotage & reporting</td>
                    <td className="p-4 text-center text-gray-400 bg-foreground/[0.01]">Mensuelle</td>
                    <td className="p-4 text-center text-foreground bg-foreground/[0.01]">Bimensuel chiffré</td>
                    <td className="p-4 text-center text-foreground bg-foreground/[0.01]">Hebdo + visio</td>
                  </tr>
                  <tr className="hover:bg-foreground/[0.04] transition-colors duration-300 group">
                    <td className="p-4 pl-6 text-gray-300 font-medium group-hover:text-foreground transition-colors">Base de Données Clients</td>
                    <td className="p-4 text-center text-gray-400 bg-foreground/[0.01]">Capture + base clients</td>
                    <td className="p-4 text-center text-foreground bg-foreground/[0.01]">Segmentée & enrichie</td>
                    <td className="p-4 text-center text-primary font-bold bg-primary/[0.02]">Exploitation par campagne</td>
                  </tr>
                  <tr className="hover:bg-foreground/[0.04] transition-colors duration-300 group">
                    <td className="p-4 pl-6 text-gray-300 font-medium group-hover:text-foreground transition-colors">Gestion publicitaire</td>
                    <td className="p-4 text-center text-gray-600 bg-foreground/[0.01]"><Minus className="w-5 h-5 mx-auto opacity-50" /></td>
                    <td className="p-4 text-center text-foreground bg-primary/[0.02]"><Check className="w-5 h-5 mx-auto text-primary" /> <span className="text-[12px] text-gray-400">Selon scope</span></td>
                    <td className="p-4 text-center text-foreground bg-foreground/[0.01]"><Check className="w-5 h-5 mx-auto text-primary" /> <span className="text-[12px] text-gray-400">Selon scope</span></td>
                  </tr>
                  <tr className="hover:bg-foreground/[0.04] transition-colors duration-300 group">
                    <td className="p-4 pl-6 text-gray-300 font-medium group-hover:text-foreground transition-colors">Experiments mensuels</td>
                    <td className="p-4 text-center text-gray-600 bg-foreground/[0.01]"><Minus className="w-5 h-5 mx-auto opacity-50" /></td>
                    <td className="p-4 text-center text-foreground bg-primary/[0.02]"><Check className="w-5 h-5 mx-auto text-primary" /></td>
                    <td className="p-4 text-center text-foreground bg-foreground/[0.01]"><Check className="w-5 h-5 mx-auto text-primary" /></td>
                  </tr>
                  <tr className="hover:bg-foreground/[0.04] transition-colors duration-300 group">
                    <td className="p-4 pl-6 text-gray-300 font-medium group-hover:text-foreground transition-colors">Landing page</td>
                    <td className="p-4 text-center text-gray-600 bg-foreground/[0.01]"><Minus className="w-5 h-5 mx-auto opacity-50" /></td>
                    <td className="p-4 text-center text-gray-600 bg-primary/[0.02]"><Minus className="w-5 h-5 mx-auto opacity-50" /></td>
                    <td className="p-4 text-center text-foreground bg-foreground/[0.01]"><Check className="w-5 h-5 mx-auto text-primary" /> <span className="text-[12px] text-gray-400">Maintenue</span></td>
                  </tr>
                </tbody>
              </table>
              <div className="bg-card/90 dark:bg-foreground/10  p-5 text-center border-t border-foreground/5 relative z-10">
                <p className="text-[12px] text-gray-400 italic">Note : Le budget média est séparé des honoraires. Vidéos, volumes et révisions limités par formule.</p>
              </div>
            </div>
          </div>

          {/* Mobile version of the table */}
          <div className="mt-16 lg:hidden max-w-lg mx-auto">
            <div className="text-center mb-8 flex flex-col items-center">
              <div className="inline-flex self-center bg-background/0 border border-foreground/20 text-muted-foreground px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[16px]">
                Transparence
              </div>
              <h3 className="font-heading uppercase tracking-[1.5px] text-[24px] text-foreground">Détail des formules</h3>
            </div>
            
            <Accordion className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-foreground/10 bg-foreground/[0.03]  shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-[8px] overflow-hidden px-4">
                <AccordionTrigger className="text-foreground hover:no-underline hover:text-primary py-4 font-bold text-[14px]">Stratégie de Relance</AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide">Essentials</span> <span className="text-foreground">Réponses auto limitées</span></div>
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide text-primary">Standard</span> <span className="text-primary font-bold">Séquences + qualif.</span></div>
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide">Business</span> <span className="text-foreground">Multicanal + ads</span></div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-foreground/10 bg-foreground/[0.03]  shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-[8px] overflow-hidden px-4">
                <AccordionTrigger className="text-foreground hover:no-underline hover:text-primary py-4 font-bold text-[14px]">Production / mois</AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide">Essentials</span> <span className="text-foreground text-right">90+ visuels</span></div>
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide text-primary">Standard</span> <span className="text-primary font-bold text-right">90+ visuels<br/>12 vidéos</span></div>
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide">Business</span> <span className="text-foreground font-bold text-right">90+ visuels<br/>20 vidéos</span></div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-foreground/10 bg-foreground/[0.03]  shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-[8px] overflow-hidden px-4">
                <AccordionTrigger className="text-foreground hover:no-underline hover:text-primary py-4 font-bold text-[14px]">Gestion Publicitaire</AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide">Essentials</span> <span><Minus className="w-4 h-4 opacity-50" /></span></div>
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide text-primary">Standard</span> <span className="text-foreground flex items-center gap-2">Selon scope <Check className="w-4 h-4 text-primary" /></span></div>
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide">Business</span> <span className="text-foreground flex items-center gap-2">Selon scope <Check className="w-4 h-4 text-primary" /></span></div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="text-center mt-12 md:mt-16 flex flex-col items-center justify-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-[8px] sm:gap-[12px] bg-foreground/[0.05]  border border-foreground/10 px-[24px] py-[16px] text-[13px] text-muted-foreground rounded-[8px] shadow-[0_8px_32px_rgba(212,175,55,0.05)] text-center">
              <ShieldCheck className="w-5 h-5 text-primary" /> <span><strong>Premier lot sous 72h.</strong> Sans engagement. Évolutif ou résiliable à tout moment.</span>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* SECTION 6: LEAD MAGNET */}
      <section className="py-[60px] md:py-[120px] bg-foreground/[0.03]  text-foreground border-t border-foreground/10 relative overflow-hidden pointer-events-none shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 blur-[80px] md:blur-[120px] pointer-events-none rounded-full"></div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10 pointer-events-auto">
          <Card className="bg-foreground/[0.05]  border border-primary/30 rounded-[8px] p-6 sm:p-8 md:p-[60px] text-center shadow-[0_8px_32px_rgba(212,175,55,0.15)] relative overflow-hidden">
            {/* Inner accent line */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            
            <h2 className="text-[20px] sm:text-[24px] md:text-[30px] font-heading font-normal mb-[20px] md:mb-[24px] uppercase tracking-[1px] leading-tight text-foreground drop-shadow-md">
              Recevez notre diagnostic gratuit : <br/>
              <span className="text-primary italic font-serif leading-snug block mt-4 mb-2">"Le Système NEFERTEM en 7 Jours : contenu, distribution, conversations"</span>
              <span className="text-sm sm:text-base font-sans tracking-widest opacity-80 block my-2">&</span>
              <span className="text-primary italic font-serif leading-snug block mt-2">"Pourquoi Votre Présence Stagne (Et Comment La Transformer En Système)"</span>
            </h2>

            <div className="bg-primary/10 border border-primary/20 rounded-[8px] p-4 my-6 inline-block">
              <span className="text-primary font-bold uppercase tracking-[1px] text-[13px] block mb-1">🎁 Bonus Inclus</span>
              <span className="text-foreground text-[14px]">Le plan de vos 7 premiers jours + la grille Essentials / Standard / Business !</span>
            </div>
            
            <form className="flex flex-col sm:flex-row gap-[16px] max-w-lg mx-auto w-full mb-6 mt-4" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const phone = formData.get('whatsapp');
              if (phone) {
                window.location.href = `https://wa.me/22657265915?text=Bonjour,%20je%20souhaite%20recevoir%20vos%20guides%20gratuits%20et%20le%20bonus.%20Mon%20numéro%20:%20${phone}`;
              }
            }}>
              <input 
                type="tel" 
                name="whatsapp"
                placeholder="Votre numéro WhatsApp..." 
                required
                className="flex-1 w-full bg-card border border-foreground/20 rounded-[4px] px-[24px] py-[16px] text-foreground text-[14px] outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-500 h-[56px]"
              />
              <Button type="submit" className="w-full sm:w-auto h-[56px] px-[32px] text-[13px] uppercase font-bold tracking-[1px] bg-primary text-black-deep rounded-[4px] shadow-none hover:bg-gold-accent hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all shrink-0">
                → Envoyer
              </Button>
            </form>
            <div className="text-[12px] text-gray-500 flex justify-center gap-4 uppercase tracking-[1px] font-bold mt-8">
               <span>✓ Envoi immédiat</span>
               <span>✓ Zéro spam</span>
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section id="faq" className="py-[60px] md:py-[120px] bg-card/90 dark:bg-foreground/10  text-foreground border-t border-foreground/10 relative pointer-events-none shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto px-4 max-w-4xl relative z-10 pointer-events-auto">
          <div className="text-center mb-[40px] md:mb-[60px] flex flex-col items-center">
            <div className="inline-flex self-center bg-primary/10 border border-primary text-primary px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
              FAQ
            </div>
            
            <div className="w-full max-w-md relative mt-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Rechercher une question..."
                value={faqSearchQuery}
                onChange={(e) => setFaqSearchQuery(e.target.value)}
                className="w-full bg-foreground/[0.05]  border border-foreground/20 rounded-[8px] pl-12 pr-4 py-3 text-foreground placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
              />
            </div>
          </div>

          <Accordion className="w-full">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-foreground/10">
                  <AccordionTrigger className="text-left font-bold text-[14px] uppercase tracking-[1px] py-[24px] hover:text-primary transition-colors hover:no-underline text-foreground">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-[14px] leading-relaxed pb-[24px]">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                Aucune réponse trouvée pour "{faqSearchQuery}". N'hésitez pas à nous contacter directement.
              </div>
            )}
          </Accordion>
        </div>
      </section>

      {/* SECTION 8: CTA TOTAL */}
      <section className="py-[60px] md:py-[120px] relative overflow-hidden bg-foreground/[0.02]  border-t border-primary/20 pointer-events-none shadow-[0_-8px_32px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 pointer-events-none z-0 opacity-10" 
             style={{ backgroundImage: 'repeating-linear-gradient(90deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 40px), repeating-linear-gradient(0deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 40px)' }}>
        </div>
        
        <div className="container relative mx-auto px-4 text-center z-10 flex flex-col items-center pointer-events-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full">
            <h2 className="text-[24px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-heading font-normal text-foreground mb-[16px] md:mb-[24px] uppercase tracking-[1px] max-w-4xl mx-auto leading-tight break-words">Dès 15 000 FCFA/mois, votre marketing devient un système.</h2>
            <p className="text-[15px] sm:text-[16px] md:text-[18px] text-muted-foreground max-w-3xl mx-auto mb-[40px] md:mb-[48px] leading-[1.6]">
              Construisons votre système. <strong className="text-foreground block sm:inline mt-2 sm:mt-0">Diagnostic gratuit sous 24h. Premier lot sous 72h.</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-[15px] w-full max-w-sm sm:max-w-none mx-auto">
              <Button onClick={() => window.location.href = '/contact'} className="w-full sm:w-auto px-[24px] sm:px-[32px] py-[16px] h-auto text-[13px] sm:text-[14px] uppercase font-bold tracking-[1px] bg-primary text-black-deep rounded-[2px] hover:bg-gold-accent transition-colors relative overflow-hidden group shadow-[0_0_30px_rgba(212,175,55,0.4)] whitespace-normal min-h-[56px]">
                <span className="relative z-10 text-center">→ Remplir mon brief</span>
              </Button>
              <Button onClick={() => window.location.href = '/contact'} className="w-full sm:w-auto px-[24px] sm:px-[32px] py-[16px] h-auto text-[13px] sm:text-[14px] uppercase font-bold tracking-[1px] border border-foreground text-foreground bg-background/0 rounded-[2px] hover:bg-white hover:text-black-deep transition-colors whitespace-normal min-h-[56px]">
                → Parler à un conseiller
              </Button>
            </div>
            
            <div className="mt-[48px] flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-[12px] text-foreground border border-foreground/10 bg-card p-4 sm:px-[24px] sm:py-[12px] rounded-[2px] w-full max-w-sm sm:max-w-max mx-auto">
              <span className="text-[#25D366] text-xl mb-1 sm:mb-0">📱</span>
              <span className="font-mono font-bold text-[14px] sm:text-[15px]">+226 57 26 59 15</span>
              <span className="text-muted-foreground text-[11px] sm:text-[12px] italic sm:ml-[8px] uppercase tracking-[1px] text-center mt-1 sm:mt-0">- Réponse en moins d'1 heure.</span>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
