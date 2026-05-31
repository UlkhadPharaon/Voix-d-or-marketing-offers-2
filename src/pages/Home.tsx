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
import { Spotlight } from "@/components/ui/spotlight";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import PricingSection4 from "@/components/ui/pricing-section-4";
import { EcosystemRadar } from "@/components/ui/ecosystem-radar";

const timelineData = [
  {
    id: 1,
    title: "Audit & Analyse",
    date: "Lundi",
    content: "Le système analyse automatiquement les performances de la semaine pour identifier les posts performants et ajuster les heures de publication optimales.",
    category: "Analyse",
    icon: Calendar,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Apprentissage",
    date: "Mardi",
    content: "Ré-entraînement et mise à jour de sa base de connaissances : nouveaux produits, promotions, affinage des réponses WhatsApp.",
    category: "Système",
    icon: Lightbulb,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 3,
    title: "Production",
    date: "Mercredi",
    content: "Génération du pack de visuels premium, rédaction des publicités et préparation du plan de publication. Vous validez en 5 min.",
    category: "Design",
    icon: PenTool,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 95,
  },
  {
    id: 4,
    title: "Relation Client",
    date: "Jeu - Dim",
    content: "Publication autonome, réponses FB et surveillance active sur WhatsApp. Devis, proposition d'offres et rendez-vous.",
    category: "Ventes",
    icon: PhoneCall,
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
      q: "Comment fonctionne l'employé virtuel au quotidien ?",
      a: "Une fois configuré avec votre catalogue, vos prix et vos règles, il répond en temps réel à vos prospects sur WhatsApp. Parallèlement, il planifie de façon autonome vos publications sur Facebook, Instagram et TikTok."
    },
    {
      q: "N'y a-t-il pas un risque de réponse bizarre ou d'erreur ?",
      a: "Afin d'éviter toute déviation, notre assistant suit des règles strictes définies par vous. Il ne peut inventer aucune information qui ne figure pas dans sa base de connaissances approuvée. Si un client pose une question hors périmètre, l'assistant passe le relais à un humain."
    },
    {
      q: "Puis-je essayer et arrêter n'importe quand ?",
      a: "Absolument. Nos offres sont sans engagement de durée. Mieux encore, nous proposons un mois d'essai à moitié prix (25 000 FCFA pour l'offre de base), satisfait ou entièrement remboursé si le produit ne répond pas à vos attentes."
    },
    {
      q: "Comment garantissez-vous la qualité et la sécurité ?",
      a: "Nous utilisons le système officiel et sécurisé de WhatsApp pour protéger votre compte. Pour la création, notre technologie de pointe génère des visuels et vidéos d'un réalisme absolu, dignes des plus grands studios."
    },
    {
      q: "Comment démarrer ma première semaine de contenu ?",
      a: "Il vous suffit de remplir notre brief stratégique en 2 minutes en cliquant sur l'un de nos boutons d'action. Nous vous contactons sur WhatsApp dans l'heure pour finaliser la mise en route !"
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
        title="L'Employé Virtuel Permanent à 50 000 FCFA/mois | Studio Voix d'Or"
        description="Studio Voix d'Or déploie votre premier collaborateur virtuel 24h/24, 7j/7. Réponses aux clients sur WhatsApp en moins de 30s, création de visuels et vidéos de prestige, et génération automatique de prospects."
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Studio Voix d'Or",
            "image": "https://images.unsplash.com/photo-1601506521937-0121a7fc2b6b?q=80&w=2071&auto=format&fit=crop",
            "description": "L'Employé Virtuel Permanent à 50 000 FCFA/mo. Réponses WhatsApp < 30 sec et production marketing de prestige.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ouagadougou",
              "addressCountry": "Burkina Faso"
            },
            "telephone": "+22644906629"
          }
        ]}
      />

      {/* Background moved to Layout */}

      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex items-center justify-start bg-transparent overflow-hidden pt-32 pb-[140px] px-6 md:px-[40px]">
        {/* Spotlight Effect */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#D4AF37" />

        {/* splite 3D integration with proper z-index */}
        <div className="absolute inset-0 z-0 h-full w-full opacity-60">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black-deep/50 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-transparent to-black-deep pointer-events-none"></div>
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        </div>

        <div className="container relative z-10 mx-auto w-full flex flex-col md:flex-row items-center justify-between pointer-events-none">
          {/* Content */}
          <div className="flex flex-col items-start justify-center max-w-2xl mt-12 mb-8 pointer-events-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading text-[36px] sm:text-[46px] md:text-[52px] lg:text-[60px] font-normal leading-[1.1] mb-[28px] text-white shadow-black-deep drop-shadow-2xl"
            >
              Recrutez un <span className="text-primary italic font-serif">Employé Virtuel Permanent</span> <br className="hidden lg:block"/> pour seulement 50 000 FCFA/mois.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[15px] sm:text-[16px] md:text-[18px] text-gray-text max-w-[650px] leading-[1.6] mb-[40px] drop-shadow-md text-left"
            >
              Moins cher qu'un stagiaire. Il travaille 24h/24, répond à vos clients sur WhatsApp en moins de 30 secondes, génère vos contenus visuels de prestige et vous apporte des prospects qualifiés pendant que vous dormez.
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
              <Button onClick={() => window.location.href = '/portfolio'} className="w-full sm:w-auto flex items-center justify-center gap-3 px-[32px] py-[16px] h-auto text-[13px] uppercase font-bold tracking-[1px] border-b-2 border-transparent text-white bg-transparent rounded-none hover:border-primary hover:text-primary transition-colors">
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
          className="absolute bottom-0 left-0 w-full bg-black-deep/80 backdrop-blur-md border-t border-white/10 py-5"
        >
          <div className="container mx-auto px-6 md:px-[40px]">
            <div className="grid grid-cols-2 lg:flex lg:flex-row items-center justify-center lg:gap-[40px] max-w-6xl mx-auto gap-4 text-center">
              <span className="text-[12px] md:text-[14px] uppercase text-gray-text tracking-[1px] font-bold"><span className="text-primary hidden lg:inline">•</span> Réponse WhatsApp &lt; 30s</span>
              <span className="text-[12px] md:text-[14px] uppercase text-gray-text tracking-[1px] font-bold"><span className="text-primary hidden lg:inline">•</span> Disponible 24h / 24 &amp; 7j / 7</span>
              <span className="text-[12px] md:text-[14px] uppercase text-gray-text tracking-[1px] font-bold"><span className="text-primary hidden lg:inline">•</span> Métier de Marque &amp; Contenus Premium</span>
              <span className="text-[12px] md:text-[14px] uppercase text-gray-text tracking-[1px] font-bold"><span className="text-primary hidden lg:inline">•</span> Moins cher qu'un stagiaire</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Infinite Marquee Section */}
      <div className="relative z-10 pointer-events-auto">
        <InfiniteMarquee />
      </div>

      {/* SECTION 2: VOTRE SITUATION AUJOURD'HUI */}
      <section className="py-[60px] md:py-[120px] bg-white/[0.02] backdrop-blur-xl text-white relative border-t border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-center min-h-[80vh]">
        {/* Cyber Mannequin Background */}
        <div className="absolute md:top-0 md:right-0 inset-0 md:inset-auto md:w-[60vw] md:h-full z-0 opacity-40 md:opacity-50 flex items-end md:items-center justify-center md:justify-end translate-y-32 md:-translate-y-10 scale-125 md:scale-100">
          <SplineScene 
            scene="/cyber_mannequin.splinecode"
            className="w-full h-full"
          />
          {/* Gradient to blend with background seamlessly */}
          <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-transparent to-black-deep pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black-deep via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black-deep via-transparent to-transparent hidden md:block pointer-events-none"></div>
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
                  Pourquoi vos concurrents stagnent ?
                </h2>
                <p className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.8] mb-[32px] max-w-md">
                  Le commerce local est en pleine mutation. Vos clients sont plus exigeants, votre temps est limité et les standards de communication ont explosé. Rester inactif face à ces trois menaces est dangereux.
                </p>
                <div className="hidden lg:block w-full h-[1px] bg-gradient-to-r from-red-500/20 to-transparent"></div>
              </div>
            </div>

            {/* Right Column: Problem Cards */}
            <div className="lg:col-span-7 flex flex-col gap-6 pointer-events-auto">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
                <Card className="group bg-black/40 backdrop-blur-xl border border-white/5 rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-red-500/30 hover:bg-[#0a0000] hover:shadow-[0_0_40px_rgba(239,68,68,0.05)] transition-all overflow-hidden relative p-[32px] md:p-[40px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-[4px] h-0 bg-red-500 group-hover:h-full transition-all duration-500 ease-out"></div>
                  <CardContent className="p-0 relative z-10 flex flex-col sm:flex-row gap-6">
                    <div className="shrink-0">
                      <div className="w-14 h-14 rounded-full border border-red-500/20 bg-red-500/10 flex items-center justify-center text-red-500 font-heading text-[20px] shadow-[inset_0_0_20px_rgba(239,68,68,0.2)]">
                        01
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading uppercase tracking-[1px] text-[20px] mb-[12px] text-white">
                        Clients Disparus
                      </h3>
                      <p className="text-gray-400 text-[14px] leading-[1.7]">
                        Un client demande "Combien ça coûte ?" à 21h. Vous dormez. Le lendemain matin, vous répondez mais il a déjà commandé chez une boutique concurrente. Notre système répond en <strong className="text-white font-normal">30 secondes</strong> et boucle la vente, même la nuit.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: 0.1 }}>
                <Card className="group bg-black/40 backdrop-blur-xl border border-white/5 rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-red-500/30 hover:bg-[#0a0000] hover:shadow-[0_0_40px_rgba(239,68,68,0.05)] transition-all overflow-hidden relative p-[32px] md:p-[40px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-[4px] h-0 bg-red-500 group-hover:h-full transition-all duration-500 ease-out"></div>
                  <CardContent className="p-0 relative z-10 flex flex-col sm:flex-row gap-6">
                    <div className="shrink-0">
                      <div className="w-14 h-14 rounded-full border border-red-500/20 bg-red-500/10 flex items-center justify-center text-red-500 font-heading text-[20px] shadow-[inset_0_0_20px_rgba(239,68,68,0.2)]">
                        02
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading uppercase tracking-[1px] text-[20px] mb-[12px] text-white">
                        Contenu Amateur
                      </h3>
                      <p className="text-gray-400 text-[14px] leading-[1.7]">
                        Photos floues faites à la va-vite, visuels encombrés et pleins de coquilles. Cela détruit votre positionnement de marque haut de gamme. Notre technologie génère des <strong className="text-white font-normal">visuels photo-réalistes cinématiques</strong> qui captent l'attention.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: 0.2 }}>
                <Card className="group bg-black/40 backdrop-blur-xl border border-white/5 rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-red-500/30 hover:bg-[#0a0000] hover:shadow-[0_0_40px_rgba(239,68,68,0.05)] transition-all overflow-hidden relative p-[32px] md:p-[40px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-[4px] h-0 bg-red-500 group-hover:h-full transition-all duration-500 ease-out"></div>
                  <CardContent className="p-0 relative z-10 flex flex-col sm:flex-row gap-6">
                    <div className="shrink-0">
                      <div className="w-14 h-14 rounded-full border border-red-500/20 bg-red-500/10 flex items-center justify-center text-red-500 font-heading text-[20px] shadow-[inset_0_0_20px_rgba(239,68,68,0.2)]">
                        03
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading uppercase tracking-[1px] text-[20px] mb-[12px] text-white">
                        Gérant Surchargé
                      </h3>
                      <p className="text-gray-400 text-[14px] leading-[1.7]">
                        Vous gérez la boutique, vos fournisseurs, vos équipes... Trouver du temps pour imaginer, créer et poster des publications régulièrement sur les réseaux est infaisable. Notre collaborateur virtuel <strong className="text-white font-normal">gère cette charge à 100%</strong>.
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
            <p className="font-heading uppercase tracking-[1px] text-[24px] text-white mb-4 max-w-2xl">L'Employé Virtuel transforme ces problèmes en opportunités de croissance.</p>
            
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
      <section className="py-[60px] md:py-[120px] bg-black/20 backdrop-blur-3xl text-white relative border-t border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Robot Background */}
        <div className="absolute inset-0 z-0 h-full w-full opacity-30 md:opacity-50 flex items-center justify-center">
          <SplineScene 
            scene="/genkub_greeting_robot.splinecode"
            className="w-full h-full"
          />
          {/* Gradients pour fondre le robot dans le fond */}
          <div className="absolute inset-0 bg-transparent bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[#0a0a0a]/40 pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-20 pointer-events-none">
          <div className="text-center mb-10 md:mb-16 flex flex-col items-center pointer-events-auto">
            <div className="inline-flex self-center bg-transparent border border-white/20 text-gray-text px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
              Efficacité Systématique
            </div>
            <h2 className="text-[28px] sm:text-[40px] md:text-[48px] font-heading font-normal mb-[16px] uppercase tracking-[1px]">Le Planning de votre Employé Virtuel</h2>
            <p className="text-gray-text text-[15px] max-w-2xl mx-auto">
              Chaque semaine, l'assistant exécute de manière infatigable un cycle complet de suivi commercial et créations visuelles. Cliquez sur un axe pour l'explorer.
            </p>
          </div>
        </div>
        
        <div className="md:-my-[100px] xl:-my-[150px] relative z-10 w-full pointer-events-auto">
          {/* We import the new orbital timeline component here */}
          <RadialOrbitalTimeline timelineData={timelineData} />
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-20 pointer-events-none">
          <div className="mt-12 text-center border border-primary/30 bg-primary/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(212,175,55,0.1)] p-8 rounded-[8px] pointer-events-auto">
            <p className="text-[18px] md:text-[20px] font-heading uppercase tracking-[1px] text-primary mb-2">LA SÉCURITÉ CONTRACTUELLE :</p>
            <p className="text-white text-[15px] md:text-[17px] max-w-3xl mx-auto leading-relaxed">
              Pour garantir votre sérénité, nous verrouillons par écrit : des temps de réponse WhatsApp inférieurs à l'offre choisie, notre disponibilité absolue 24h/24 et la constitution complète de votre base de données cibles.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: COMMENT ÇA MARCHE / NOTRE DÉMO LIVE */}
      <section className="py-[60px] md:py-[120px] bg-white/[0.02] backdrop-blur-xl text-white relative border-t border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Futuristic Rays Background (Optimized) */}
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] mix-blend-screen"></div>
          {/* Gradients to fade blending with the section */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black-deep to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black-deep to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-20 pointer-events-none">
          <div className="mb-10 text-center flex flex-col items-center pointer-events-auto">
            <div className="inline-flex bg-transparent border border-white/20 text-gray-text px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
              La Méthodologie Imbattable
            </div>
            <h2 className="text-[28px] sm:text-[40px] md:text-[48px] font-heading font-normal mb-[16px] leading-tight uppercase tracking-[1px]">
              Notre Démo Live <br/> <span className="text-primary italic font-serif">Vaut 10 000 mots</span>
            </h2>
            <p className="text-gray-text text-[15px] max-w-2xl mx-auto">
              Pas de discours commerciaux. Nous basons notre relation sur des preuves directes pour éliminer toute hésitation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-[40px] pointer-events-auto">
            {[
              { num: 'I', title: 'Le Constat', desc: 'Combien de messages WhatsApp perdez-vous en soirée ? Près de 80% des entreprises perdent leurs prospects après la fermeture.' },
              { num: 'II', title: 'Démo Instantanée', desc: 'Vous nous donnez votre numéro. Notre collaborateur virtuel vous écrit et gère une conversation simulée de vente de manière parfaite.' },
              { num: 'III', title: 'Comparatif Direct', desc: 'Un employé classique au Burkina coûte 50 000 à 75 000 FCFA/mois — et il dort. Notre employé virtuel ne dort jamais et ne fait pas d\'erreur.' },
              { num: 'IV', title: 'Essai Garanti', desc: 'Lancez un mois complet d\'essai à moitié prix (25 000 FCFA). Si vous n\'êtes pas absolument conquis, vous êtes remboursé intégralement.' },
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-start border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] p-6 rounded-[8px] hover:border-primary/50 transition-colors"
              >
                <div className="font-heading text-[24px] text-primary mb-[16px]">
                  {step.num}
                </div>
                <h4 className="font-bold text-[13px] mb-[12px] uppercase tracking-[1px] text-white">{step.title}</h4>
                <p className="text-gray-text text-[13px] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PRICING */}
      <section id="offres" className="bg-black/20 backdrop-blur-3xl border-t border-primary/20 relative pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <PricingSection4 />

        <div className="bg-transparent relative pb-24 border-t border-white/5 pt-16">
          {/* Transparence Background (Optimized) */}
          <div className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-50">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-black-deep to-black-deep"></div>
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black-deep to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
          {/* Table of guarantees */}
          <div className="mt-20 max-w-[1000px] mx-auto hidden lg:block">
            <div className="text-center mb-8 flex flex-col items-center">
              <div className="inline-flex self-center bg-transparent border border-white/20 text-gray-text px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[16px]">
                Transparence
              </div>
              <h3 className="font-heading uppercase tracking-[1.5px] text-[28px] text-white">Comparaison Détaillée</h3>
              <p className="text-gray-text text-[14px] mt-3 max-w-2xl text-center">Détails des capacités, garanties contractuelles et fonctionnalités de votre Employé Virtuel selon le niveau d'offres.</p>
            </div>
            
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[12px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative ring-1 ring-white/5">
              <div className="absolute top-0 right-1/4 w-1/4 h-full bg-primary/[0.04] pointer-events-none shadow-[inset_0_0_40px_rgba(212,175,55,0.05)]"></div>
              <table className="w-full text-left border-collapse relative z-10">
                <thead>
                  <tr>
                    <th className="p-6 text-[13px] text-gray-400 uppercase tracking-[1px] font-bold border-b border-white/10 w-1/4 align-bottom bg-transparent">Garantie & Fonctionnalité</th>
                    <th className="p-6 text-[13px] text-white uppercase tracking-[1px] font-bold border-b border-white/10 text-center w-1/4 bg-white/[0.02] align-bottom">Tier 1 <span className="block text-[10px] text-gray-500 font-normal mt-1 normal-case tracking-normal">L'Employé de Base</span></th>
                    <th className="p-6 text-[13px] text-primary uppercase tracking-[1px] font-bold border-b border-primary/30 text-center relative w-1/4 bg-primary/[0.05] align-bottom shadow-[0_-20px_40px_-20px_rgba(212,175,55,0.1)_inset]">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
                      Tier 2 <span className="block text-[10px] text-primary/70 font-normal mt-1 normal-case tracking-normal">L'Employé Commercial</span>
                    </th>
                    <th className="p-6 text-[13px] text-white uppercase tracking-[1px] font-bold border-b border-white/10 text-center w-1/4 bg-white/[0.02] align-bottom">Tier 3 <span className="block text-[10px] text-gray-500 font-normal mt-1 normal-case tracking-normal">Le Département</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[14px]">
                  <tr className="hover:bg-white/[0.04] transition-colors duration-300 group">
                    <td className="p-4 pl-6 text-gray-300 font-medium group-hover:text-white transition-colors">Temps de Réponse WhatsApp</td>
                    <td className="p-4 text-center text-white bg-white/[0.01]">&lt; 60 sec</td>
                    <td className="p-4 text-center text-primary font-bold bg-primary/[0.02]">&lt; 30 sec</td>
                    <td className="p-4 text-center text-white bg-white/[0.01]">&lt; 15 sec</td>
                  </tr>
                  <tr className="hover:bg-white/[0.04] transition-colors duration-300 group">
                    <td className="p-4 pl-6 text-gray-300 font-medium group-hover:text-white transition-colors">Création de Contenus / Mois</td>
                    <td className="p-4 text-center text-white bg-white/[0.01]">12 visuels + 4 vidéos</td>
                    <td className="p-4 text-center text-primary font-bold bg-primary/[0.02]">20 visuels + 8 vidéos TV</td>
                    <td className="p-4 text-center text-white font-bold bg-white/[0.01]">40+ visuels + 15 vidéos TV</td>
                  </tr>
                  <tr className="hover:bg-white/[0.04] transition-colors duration-300 group">
                    <td className="p-4 pl-6 text-gray-300 font-medium group-hover:text-white transition-colors">Fréquence des Analyses</td>
                    <td className="p-4 text-center text-gray-400 bg-white/[0.01]">Mensuelle</td>
                    <td className="p-4 text-center text-white bg-white/[0.01]">Bimensuelle</td>
                    <td className="p-4 text-center text-white bg-white/[0.01]">Hebdomadaire + Visio</td>
                  </tr>
                  <tr className="hover:bg-white/[0.04] transition-colors duration-300 group">
                    <td className="p-4 pl-6 text-gray-300 font-medium group-hover:text-white transition-colors">Base de Données Clients</td>
                    <td className="p-4 text-center text-gray-400 bg-white/[0.01]">Simple (Capture)</td>
                    <td className="p-4 text-center text-white bg-white/[0.01]">Segmentée & Enrichie</td>
                    <td className="p-4 text-center text-primary font-bold bg-primary/[0.02]">Exploitation par Campagne</td>
                  </tr>
                  <tr className="hover:bg-white/[0.04] transition-colors duration-300 group">
                    <td className="p-4 pl-6 text-gray-300 font-medium group-hover:text-white transition-colors">Gestion Publicitaire (Ads)</td>
                    <td className="p-4 text-center text-gray-600 bg-white/[0.01]"><Minus className="w-5 h-5 mx-auto opacity-50" /></td>
                    <td className="p-4 text-center text-white bg-primary/[0.02]"><Check className="w-5 h-5 mx-auto text-primary" /> <span className="text-[12px] text-gray-400">Automatisée</span></td>
                    <td className="p-4 text-center text-white bg-white/[0.01]"><Check className="w-5 h-5 mx-auto text-primary" /> <span className="text-[12px] text-gray-400">Budget 50K Inclus</span></td>
                  </tr>
                  <tr className="hover:bg-white/[0.04] transition-colors duration-300 group">
                    <td className="p-4 pl-6 text-gray-300 font-medium group-hover:text-white transition-colors">Séquences de Relances Froids</td>
                    <td className="p-4 text-center text-gray-600 bg-white/[0.01]"><Minus className="w-5 h-5 mx-auto opacity-50" /></td>
                    <td className="p-4 text-center text-white bg-primary/[0.02]"><Check className="w-5 h-5 mx-auto text-primary" /></td>
                    <td className="p-4 text-center text-white bg-white/[0.01]"><Check className="w-5 h-5 mx-auto text-primary" /></td>
                  </tr>
                  <tr className="hover:bg-white/[0.04] transition-colors duration-300 group">
                    <td className="p-4 pl-6 text-gray-300 font-medium group-hover:text-white transition-colors">Landing Page Dédiée</td>
                    <td className="p-4 text-center text-gray-600 bg-white/[0.01]"><Minus className="w-5 h-5 mx-auto opacity-50" /></td>
                    <td className="p-4 text-center text-gray-600 bg-primary/[0.02]"><Minus className="w-5 h-5 mx-auto opacity-50" /></td>
                    <td className="p-4 text-center text-white bg-white/[0.01]"><Check className="w-5 h-5 mx-auto text-primary" /> <span className="text-[12px] text-gray-400">Maintenue</span></td>
                  </tr>
                </tbody>
              </table>
              <div className="bg-black/40 backdrop-blur-md p-5 text-center border-t border-white/5 relative z-10">
                <p className="text-[12px] text-gray-400 italic">Note : Nous garantissons par écrit la livraison parfaite de leads qualifiés et d'optimisations publicitaires. Les budgets d'acquisition (hors Tier 3) sont ajustés directement selon vos enjeux.</p>
              </div>
            </div>
          </div>

          {/* Mobile version of the table */}
          <div className="mt-16 lg:hidden max-w-lg mx-auto">
            <div className="text-center mb-8 flex flex-col items-center">
              <div className="inline-flex self-center bg-transparent border border-white/20 text-gray-text px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[16px]">
                Transparence
              </div>
              <h3 className="font-heading uppercase tracking-[1.5px] text-[24px] text-white">Comparaison</h3>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-[8px] overflow-hidden px-4">
                <AccordionTrigger className="text-white hover:no-underline hover:text-primary py-4 font-bold text-[14px]">Temps de Réponse WhatsApp</AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide">Tier 1</span> <span className="text-white">&lt; 60 sec</span></div>
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide text-primary">Tier 2</span> <span className="text-primary font-bold">&lt; 30 sec</span></div>
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide">Tier 3</span> <span className="text-white">&lt; 15 sec</span></div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-[8px] overflow-hidden px-4">
                <AccordionTrigger className="text-white hover:no-underline hover:text-primary py-4 font-bold text-[14px]">Création de Contenus / Mois</AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide">Tier 1</span> <span className="text-white text-right">12 visuels<br/>4 vidéos</span></div>
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide text-primary">Tier 2</span> <span className="text-primary font-bold text-right">20 visuels<br/>8 vidéos TV</span></div>
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide">Tier 3</span> <span className="text-white font-bold text-right">40+ visuels<br/>15 vidéos TV</span></div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-[8px] overflow-hidden px-4">
                <AccordionTrigger className="text-white hover:no-underline hover:text-primary py-4 font-bold text-[14px]">Gestion Publicitaire</AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide">Tier 1</span> <span><Minus className="w-4 h-4 opacity-50" /></span></div>
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide text-primary">Tier 2</span> <span className="text-white flex items-center gap-2">Automatisée <Check className="w-4 h-4 text-primary" /></span></div>
                  <div className="flex justify-between items-center"><span className="text-[13px] uppercase tracking-wide">Tier 3</span> <span className="text-white flex items-center gap-2">Budget Inclus <Check className="w-4 h-4 text-primary" /></span></div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="text-center mt-12 md:mt-16 flex flex-col items-center justify-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-[8px] sm:gap-[12px] bg-white/[0.05] backdrop-blur-2xl border border-white/10 px-[24px] py-[16px] text-[13px] text-gray-text rounded-[8px] shadow-[0_8px_32px_rgba(212,175,55,0.05)] text-center">
              <ShieldCheck className="w-5 h-5 text-primary" /> <span>Sans engagement. Évolutif ou résiliable à tout moment.</span>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* SECTION 6: LEAD MAGNET */}
      <section className="py-[60px] md:py-[120px] bg-white/[0.03] backdrop-blur-xl text-white border-t border-white/10 relative overflow-hidden pointer-events-none shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 blur-[80px] md:blur-[120px] pointer-events-none rounded-full"></div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10 pointer-events-auto">
          <Card className="bg-white/[0.05] backdrop-blur-3xl border border-primary/30 rounded-[8px] p-6 sm:p-8 md:p-[60px] text-center shadow-[0_8px_32px_rgba(212,175,55,0.15)] relative overflow-hidden">
            {/* Inner accent line */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            
            <h2 className="text-[24px] sm:text-[32px] md:text-[40px] font-heading font-normal mb-[20px] md:mb-[24px] uppercase tracking-[1px] leading-tight text-white drop-shadow-md">
              Recevez gratuitement notre analyse : <br/><span className="text-primary italic font-serif">"5 erreurs visuelles qui freinent les marques burkinabè"</span>
            </h2>
            
            <form className="flex flex-col sm:flex-row gap-[16px] max-w-lg mx-auto w-full mb-6 mt-8" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const phone = formData.get('whatsapp');
              if (phone) {
                window.location.href = `https://wa.me/22644906629?text=Bonjour,%20je%20souhaite%20recevoir%20l'analyse%20des%205%20erreurs%20visuelles.%20Mon%20numéro%20:%20${phone}`;
              }
            }}>
              <input 
                type="tel" 
                name="whatsapp"
                placeholder="Votre numéro WhatsApp..." 
                required
                className="flex-1 w-full bg-dark-accent border border-white/20 rounded-[4px] px-[24px] py-[16px] text-white text-[14px] outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-500 h-[56px]"
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
      <section id="faq" className="py-[60px] md:py-[120px] bg-black/20 backdrop-blur-3xl text-white border-t border-white/10 relative pointer-events-none shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
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
                className="w-full bg-white/[0.05] backdrop-blur-md border border-white/20 rounded-[8px] pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
              />
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10">
                  <AccordionTrigger className="text-left font-bold text-[14px] uppercase tracking-[1px] py-[24px] hover:text-primary transition-colors hover:no-underline text-white">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-text text-[14px] leading-relaxed pb-[24px]">
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
      <section className="py-[60px] md:py-[120px] relative overflow-hidden bg-white/[0.02] backdrop-blur-xl border-t border-primary/20 pointer-events-none shadow-[0_-8px_32px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 pointer-events-none z-0 opacity-10" 
             style={{ backgroundImage: 'repeating-linear-gradient(90deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 40px), repeating-linear-gradient(0deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 40px)' }}>
        </div>
        
        <div className="container relative mx-auto px-4 text-center z-10 flex flex-col items-center pointer-events-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full">
            <h2 className="text-[24px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-heading font-normal text-white mb-[16px] md:mb-[24px] uppercase tracking-[1px] max-w-4xl mx-auto leading-tight break-words">Pour 50 000 FCFA/mois, mettez votre acquisition clients en pilotage automatique.</h2>
            <p className="text-[15px] sm:text-[16px] md:text-[18px] text-gray-text max-w-3xl mx-auto mb-[40px] md:mb-[48px] leading-[1.6]">
              Configurez votre employé virtuel maintenant. <strong className="text-white block sm:inline mt-2 sm:mt-0">Démo gratuite en direct sous 20 minutes.</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-[15px] w-full max-w-sm sm:max-w-none mx-auto">
              <Button onClick={() => window.location.href = '/contact'} className="w-full sm:w-auto px-[24px] sm:px-[32px] py-[16px] h-auto text-[13px] sm:text-[14px] uppercase font-bold tracking-[1px] bg-primary text-black-deep rounded-[2px] hover:bg-gold-accent transition-colors relative overflow-hidden group shadow-[0_0_30px_rgba(212,175,55,0.4)] whitespace-normal min-h-[56px]">
                <span className="relative z-10 text-center">→ Remplir mon brief</span>
              </Button>
              <Button onClick={() => window.location.href = '/contact'} className="w-full sm:w-auto px-[24px] sm:px-[32px] py-[16px] h-auto text-[13px] sm:text-[14px] uppercase font-bold tracking-[1px] border border-white text-white bg-transparent rounded-[2px] hover:bg-white hover:text-black-deep transition-colors whitespace-normal min-h-[56px]">
                → Parler à un conseiller
              </Button>
            </div>
            
            <div className="mt-[48px] flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-[12px] text-white border border-white/10 bg-dark-accent p-4 sm:px-[24px] sm:py-[12px] rounded-[2px] w-full max-w-sm sm:max-w-max mx-auto">
              <span className="text-[#25D366] text-xl mb-1 sm:mb-0">📱</span>
              <span className="font-mono font-bold text-[14px] sm:text-[15px]">+226 44 90 66 29</span>
              <span className="text-gray-text text-[11px] sm:text-[12px] italic sm:ml-[8px] uppercase tracking-[1px] text-center mt-1 sm:mt-0">- Réponse en moins d'1 heure.</span>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
