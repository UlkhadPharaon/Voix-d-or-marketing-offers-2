import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowDown, Play } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

export function Home() {
  const [billingCycle, setBillingCycle] = useState<'mensuel' | 'trimestriel'>('mensuel');

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
    <div className="w-full">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex items-center justify-start bg-black-deep overflow-hidden pt-32 pb-20 px-6 md:px-[40px]">
        {/* Background image & gradient overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1601506521937-0121a7fc2b6b?q=80&w=2071&auto=format&fit=crop" alt="Cinematic studio" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black-deep via-black-deep/90 to-black-deep/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-transparent to-black-deep"></div>
        </div>

        <div className="container relative z-10 mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-[60px]">
          {/* Left Content */}
          <div className="flex-1 flex flex-col justify-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="self-start inline-flex items-center gap-[12px] bg-primary/10 border border-primary text-primary px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[32px]"
            >
              ✦ Studio de production cinématographique et artistique
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-[40px] sm:text-[48px] md:text-[72px] lg:text-[84px] font-normal leading-[1.05] mb-[32px] text-white text-left shadow-black-deep drop-shadow-2xl"
            >
              Savoir rêver grand <br className="hidden md:block"/>
              <span className="text-primary italic font-serif">et l'accomplir.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[15px] sm:text-[16px] md:text-[18px] text-gray-text max-w-[600px] leading-[1.6] mb-[48px] text-left drop-shadow-md"
            >
              Nous élevons vos visuels aux <strong className="text-white">standards internationaux</strong> pour faire de vous le leader de votre secteur. Spots publicitaires, vidéos UGC et storytelling émotionnel pour toucher et fidéliser votre cible.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-start gap-[15px]"
            >
              <Button onClick={() => window.location.href = '/#offres'} className="w-full sm:w-auto px-[32px] py-[16px] h-auto text-[13px] uppercase font-bold tracking-[1px] bg-primary text-black-deep rounded-[4px] shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] hover:-translate-y-1 transition-all">
                Voir les offres
              </Button>
              <Button onClick={() => window.location.href = '/portfolio'} className="w-full sm:w-auto flex items-center justify-center gap-3 px-[32px] py-[16px] h-auto text-[13px] uppercase font-bold tracking-[1px] border-b-2 border-transparent text-white bg-transparent rounded-none hover:border-primary hover:text-primary transition-colors">
                <Play className="w-4 h-4" /> Portfolio
              </Button>
            </motion.div>
          </div>

          {/* Right Visual Element */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex-1 hidden lg:flex justify-end relative"
          >
            {/* Minimalist abstract reel or play element */}
            <div className="w-[450px] justify-end flex relative">
               <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
               <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop" alt="Director's view" className="w-[80%] aspect-[3/4] object-cover rounded-[4px] border border-white/10 shadow-2xl relative z-10 filter grayscale hover:grayscale-0 transition-all duration-700" />
               <div className="absolute -bottom-10 -left-10 w-[60%] aspect-square object-cover rounded-[4px] border border-white/10 shadow-2xl z-20 overflow-hidden bg-black-deep flex items-center justify-center group cursor-pointer" onClick={() => window.location.href = '/portfolio'}>
                 <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop" alt="BTS" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                 <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/50 text-primary z-30 group-hover:scale-110 transition-transform">
                   <Play className="w-6 h-6 ml-1" />
                 </div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Proof Bar - Positioned at bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-0 left-0 w-full bg-black-deep/80 backdrop-blur-md border-t border-white/10 py-6"
        >
          <div className="container mx-auto px-6 md:px-[40px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px] max-w-6xl mx-auto">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="font-heading text-[24px] md:text-[32px] text-primary mb-[4px] drop-shadow-md">500+</span>
                <span className="text-[10px] md:text-[11px] uppercase text-gray-text tracking-[1px]">Vidéos<br className="hidden md:block"/> Produits</span>
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="font-heading text-[24px] md:text-[32px] text-primary mb-[4px] drop-shadow-md">100%</span>
                <span className="text-[10px] md:text-[11px] uppercase text-gray-text tracking-[1px]">Qualité<br className="hidden md:block"/> Studio</span>
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="font-heading text-[24px] md:text-[32px] text-primary mb-[4px] drop-shadow-md">48h</span>
                <span className="text-[10px] md:text-[11px] uppercase text-gray-text tracking-[1px]">Délai<br className="hidden md:block"/> Max</span>
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="font-heading text-[24px] md:text-[32px] text-primary mb-[4px] drop-shadow-md">100%</span>
                <span className="text-[10px] md:text-[11px] uppercase text-gray-text tracking-[1px]">Satisfaction<br className="hidden md:block"/> Client</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="py-[120px] bg-black-deep text-white relative border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="inline-flex self-center bg-transparent border border-white/20 text-gray-text px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
              Le Problème
            </div>
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-heading font-normal mb-[16px] uppercase tracking-[1px]">La réalité du marché</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Card className="h-full bg-dark-accent border border-white/10 rounded-[4px] shadow-none hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-2 transition-all">
                <CardContent className="p-[32px]">
                  <span className="text-[32px] mb-[24px] block">💰</span>
                  <h3 className="font-heading uppercase tracking-[1px] text-[18px] mb-[12px] text-white">La qualité hors de prix</h3>
                  <p className="text-gray-text text-[15px] leading-relaxed">
                    "Les visuels aux standards internationaux sont souvent inaccessibles pour la plupart des entreprises locales."
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Card className="h-full bg-dark-accent border border-white/10 rounded-[4px] shadow-none hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-2 transition-all">
                <CardContent className="p-[32px]">
                  <span className="text-[32px] mb-[24px] block">📉</span>
                  <h3 className="font-heading uppercase tracking-[1px] text-[18px] mb-[12px] text-white">Une image banale</h3>
                  <p className="text-gray-text text-[15px] leading-relaxed">
                    "Sans identité visuelle unique ni storytelling émotionnel, il devient difficile de se démarquer et fidéliser sa cible."
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="h-full bg-dark-accent border border-white/10 rounded-[4px] shadow-none hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-2 transition-all">
                <CardContent className="p-[32px]">
                  <span className="text-[32px] mb-[24px] block">🌍</span>
                  <h3 className="font-heading uppercase tracking-[1px] text-[18px] mb-[12px] text-white">Le besoin de contenu</h3>
                  <p className="text-gray-text text-[15px] leading-relaxed">
                    "Les réseaux sociaux exigent un volume de production élevé, souvent au détriment de l'image de marque."
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mt-20 flex flex-col items-center justify-center text-center">
            <p className="font-heading uppercase tracking-[1px] text-[18px] text-primary mb-8">Nous avons la solution</p>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown className="text-primary w-8 h-8 opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE SOLUTION */}
      <section className="py-[120px] bg-black-deep text-white relative border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-20 flex flex-col items-start">
            <div className="inline-flex bg-transparent border border-white/20 text-gray-text px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
              La Solution
            </div>
            <h2 className="text-[32px] sm:text-[40px] md:text-[56px] font-heading font-normal mb-[24px] leading-tight uppercase tracking-[1px]">
              L'Usine à Contenu Vidéo, <br/>
              <span className="text-primary">innovante et rapide</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mb-[80px]">
            {[
              { num: 'I', title: 'Le Brief', desc: 'Vous nous partagez votre produit, votre cible, votre message via un formulaire simple.' },
              { num: 'II', title: 'Analyse Stratégique', desc: 'Nos experts scannent les tendances virales de votre secteur en temps réel.' },
              { num: 'III', title: 'Production', desc: 'Notre workflow interne génère vos vidéos avec des visuels ultra-réalistes et une voix off captivante.' },
              { num: 'IV', title: 'Livraison', desc: 'Vous recevez vos vidéos MP4 prêtes à publier sur vos réseaux sociaux dans un délai de 48h.' },
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-start border border-white/10 bg-dark-accent p-[24px] rounded-[4px] hover:border-primary/50 transition-colors"
              >
                <div className="font-heading text-[24px] text-primary mb-[16px]">
                  {step.num}
                </div>
                <h4 className="font-bold text-[13px] mb-[12px] uppercase tracking-[1px] text-white">{step.title}</h4>
                <p className="text-gray-text text-[13px] leading-relaxed max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-dark-accent border border-white/10 rounded-[4px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
            <div>
              <div className="text-6xl md:text-8xl font-heading font-normal text-primary mb-2">100%</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 uppercase tracking-[1px]">Engagement & Qualité</h3>
              <p className="text-gray-text text-[15px]">Nous allions stratégie et technique pour un résultat optimal.</p>
            </div>
            <div className="w-full md:w-1/3">
              <div className="h-[2px] w-full bg-white/10 overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }} 
                  whileInView={{ width: '100%' }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute left-0 top-0 bottom-0 bg-primary"
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PRICING */}
      <section id="offres" className="py-24 bg-black-deep text-white border-t border-primary/20 relative">
        <div className="absolute inset-0 pointer-events-none z-0" 
             style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(212, 175, 55, 0.03) 0px, rgba(212, 175, 55, 0.03) 1px, transparent 1px, transparent 20px)' }}>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center">
            <div className="inline-flex self-center bg-primary/10 border border-primary text-primary px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
              Tarification Transparente
            </div>
            <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-heading font-normal mb-[24px] uppercase tracking-[1px] px-4">Des offres adaptées à vos ambitions</h2>
            
            {/* INTERACTIVE BILLING TOGGLE */}
            <div className="flex bg-dark-accent p-1 rounded-[4px] border border-white/10 mt-[12px] mb-[48px] w-[90%] sm:w-full max-w-md mx-auto">
              <button 
                onClick={() => setBillingCycle('mensuel')} 
                className={`flex-1 px-[8px] sm:px-[32px] py-[12px] text-[11px] sm:text-[13px] font-bold uppercase tracking-[1px] transition-colors rounded-[2px] ${billingCycle === 'mensuel' ? 'bg-primary text-black-deep' : 'text-gray-text hover:text-white'}`}
              >
                Mensuel
              </button>
              <button 
                onClick={() => setBillingCycle('trimestriel')} 
                className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-[8px] sm:px-[32px] py-[12px] text-[11px] sm:text-[13px] font-bold uppercase tracking-[1px] transition-colors rounded-[2px] ${billingCycle === 'trimestriel' ? 'bg-primary text-black-deep' : 'text-gray-text hover:text-white'}`}
              >
                <span>Trimestriel</span> <span className="bg-[#25D366]/20 text-[#25D366] px-[4px] sm:px-[6px] py-[2px] rounded-[2px] font-bold text-[9px] sm:text-[10px] leading-none">-15%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px] max-w-6xl mx-auto items-center">
            
            {/* BASIC */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="h-full">
              <Card className="bg-dark-accent border border-white/10 rounded-[8px] p-[32px] relative transition-all hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] h-full flex flex-col justify-between">
                <CardContent className="p-0">
                  <div className="mb-[24px]">
                    <div className="font-heading text-[20px] uppercase tracking-[1px] text-gray-400 mb-[8px]">Basic</div>
                    <div className="text-[36px] font-bold text-white flex items-end gap-2">
                      {billingCycle === 'mensuel' ? '150K' : '127.5K'} 
                      <span className="text-[14px] font-normal text-gray-text mb-[8px]">/MOIS</span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-white/10 my-[24px]"></div>
                  
                  <ul className="list-none text-[14px] text-gray-text flex flex-col gap-[16px] mb-[32px]">
                    {['20 Vidéos par mois', 'Format 8 Secondes', 'Script complet', '1 round de révision', 'Livraison MP4 en 48h'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-primary mt-[2px] shrink-0">✓</span> <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <Button onClick={() => window.location.href = '/contact'} className="block w-full py-[16px] h-auto text-center text-[13px] uppercase font-bold tracking-[1px] border border-white/20 text-white rounded-[4px] bg-transparent hover:bg-white hover:text-black-deep transition-all">
                  Commencer
                </Button>
              </Card>
            </motion.div>

            {/* PRO */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative z-10 lg:-mx-[10px] h-[105%]">
              <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-primary rounded-[8px] p-[40px] relative transition-transform hover:-translate-y-2 h-full flex flex-col justify-between shadow-[0_0_40px_rgba(212,175,55,0.15)] overflow-hidden">
                <div className="absolute top-[20px] right-[20px] bg-primary text-black-deep text-[11px] font-bold py-[4px] px-[12px] uppercase tracking-[1px] rounded-full">
                  Populaire
                </div>
                {/* Glow effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60%] bg-primary/5 blur-[50px] pointer-events-none"></div>

                <CardContent className="p-0 relative z-10">
                  <div className="mb-[24px]">
                    <div className="font-heading text-[24px] uppercase tracking-[1px] text-primary mb-[8px]">Pro</div>
                    <div className="text-[48px] font-bold text-white flex items-end gap-2">
                      {billingCycle === 'mensuel' ? '200K' : '170K'} 
                      <span className="text-[14px] font-normal text-primary/70 mb-[12px]">/MOIS</span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-[24px]"></div>
                  
                  <ul className="list-none text-[15px] text-gray-200 flex flex-col gap-[16px] mb-[40px]">
                    {['28 Vidéos par mois', 'Format 15 Secondes', 'Script + Analyse stratégique', '2 rounds de révision', 'Version courte 8s offerte', 'Livraison MP4 prioritaire'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-primary mt-[2px] shrink-0 font-bold">✓</span> <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <Button onClick={() => window.location.href = '/contact'} className="block w-full py-[16px] mt-auto h-auto text-center text-[13px] uppercase font-bold tracking-[1px] bg-primary text-black-deep rounded-[4px] hover:bg-gold-accent hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all relative z-10">
                  Choisir l'offre Pro
                </Button>
              </Card>
            </motion.div>

            {/* BUSINESS */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="h-full">
              <Card className="bg-dark-accent border border-white/10 rounded-[8px] p-[32px] relative transition-all hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] h-full flex flex-col justify-between">
                <CardContent className="p-0">
                  <div className="mb-[24px]">
                    <div className="font-heading text-[20px] uppercase tracking-[1px] text-gray-400 mb-[8px]">Business</div>
                    <div className="text-[36px] font-bold text-white flex items-end gap-2">
                      {billingCycle === 'mensuel' ? '450K' : '382.5K'} 
                      <span className="text-[14px] font-normal text-gray-text mb-[8px]">/MOIS</span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-white/10 my-[24px]"></div>
                  
                  <ul className="list-none text-[14px] text-gray-text flex flex-col gap-[16px] mb-[32px]">
                    {['84 Vidéos par mois', 'Multi-formats', 'Manager Dédié', 'Calendrier éditorial', 'Révisions illimitées', 'Rapport de performance'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-primary mt-[2px] shrink-0">✓</span> <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <Button onClick={() => window.location.href = '/contact'} className="block w-full py-[16px] h-auto text-center text-[13px] uppercase font-bold tracking-[1px] border border-white/20 text-white rounded-[4px] bg-transparent hover:bg-white hover:text-black-deep transition-all">
                  Devenir Leader
                </Button>
              </Card>
            </motion.div>

          </div>

          <div className="text-center mt-12 flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-[12px] bg-dark-accent border border-white/10 px-[24px] py-[12px] text-[13px] text-gray-text rounded-[2px] shadow-sm">
              <span className="text-[18px]">🛡️</span> Pas de contrat long terme. Abonnement mensuel, résiliable à tout moment.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: LEAD MAGNET */}
      <section className="py-[120px] bg-[#111] text-white border-t border-white/10 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] pointer-events-none rounded-full"></div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Card className="bg-black-deep border border-primary/30 rounded-[8px] p-8 md:p-[60px] text-center shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden">
            {/* Inner accent line */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            
            <div className="inline-flex self-center bg-primary/10 border border-primary text-primary px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
              Ressource Gratuite
            </div>
            <h2 className="text-[32px] md:text-[48px] font-heading font-normal mb-[24px] uppercase tracking-[1px] leading-tight text-white drop-shadow-md">
              Téléchargez notre Guide Stratégique
            </h2>
            <p className="text-gray-text text-[15px] md:text-[18px] max-w-2xl mx-auto mb-[40px] leading-relaxed">
              Laissez-nous votre numéro WhatsApp pour recevoir immédiatement notre document PDF reprenant <strong className="text-white">les 5 secrets d'une vidéo qui convertit</strong>. Découvrez comment les leaders de l'industrie structurent leurs publicités.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-[16px] max-w-lg mx-auto w-full" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const phone = formData.get('whatsapp');
              if (phone) {
                window.location.href = `https://wa.me/22644906629?text=Bonjour,%20je%20souhaite%20recevoir%20le%20guide%20PDF%20gratuit%20sur%20les%20vidéos%20qui%20convertissent.%20Mon%20numéro%20:%20${phone}`;
              }
            }}>
              <input 
                type="tel" 
                name="whatsapp"
                placeholder="+226 XX XX XX XX" 
                required
                className="flex-1 w-full bg-dark-accent border border-white/20 rounded-[4px] px-[24px] py-[16px] text-white text-[14px] outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-500 h-[56px]"
              />
              <Button type="submit" className="w-full sm:w-auto h-[56px] px-[32px] text-[13px] uppercase font-bold tracking-[1px] bg-primary text-black-deep rounded-[4px] shadow-none hover:bg-gold-accent hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all shrink-0">
                Recevoir le PDF
              </Button>
            </form>
            <p className="text-[11px] text-gray-text mt-[24px] uppercase tracking-[1px] flex gap-2 justify-center items-center">
              <span className="text-primary">🔒</span> 100% Confidentiel. Envoi direct sur WhatsApp.
            </p>
          </Card>
        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section id="faq" className="py-[120px] bg-black-deep text-white border-t border-white/10 relative">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center mb-[80px] flex flex-col items-center">
            <div className="inline-flex self-center bg-primary/10 border border-primary text-primary px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
              Support
            </div>
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-heading font-normal mb-[16px] uppercase tracking-[1px]">Questions Fréquentes</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "La qualité des vidéos est-elle au rendez-vous ?",
                a: "Oui. Nous utilisons les dernières technologies pour générer des animations et des rendus visuels d'une qualité identique à un tournage professionnel."
              },
              {
                q: "Combien de temps pour recevoir mes vidéos ?",
                a: "48 heures après validation du brief. Pour les urgences, une livraison en 24h est disponible (pack Rush, 50 000 FCFA)."
              },
              {
                q: "Puis-je personnaliser les vidéos avec mon logo et mes couleurs ?",
                a: "Absolument. Chaque vidéo intègre votre identité visuelle (logo, couleurs, police de caractères)."
              },
              {
                q: "Comment fonctionne le paiement ?",
                a: "Paiement mensuel en avance via Orange Money, Moov Money, ou virement bancaire. Pas de carte bancaire requise."
              },
              {
                q: "Que se passe-t-il si je ne suis pas satisfait d'une vidéo ?",
                a: "Vous avez droit aux rounds de révision inclus dans votre offre. Nous retravaillons jusqu'à votre satisfaction dans ce quota."
              },
              {
                q: "Travaillez-vous avec des entreprises hors de Ouagadougou ?",
                a: "Oui. Notre service est 100% digital — nous travaillons avec toute entreprise au Burkina Faso et en Afrique de l'Ouest."
              }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10">
                <AccordionTrigger className="text-left font-bold text-[14px] uppercase tracking-[1px] py-[24px] hover:text-primary transition-colors hover:no-underline text-white">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-text text-[14px] leading-relaxed pb-[24px]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="py-[120px] relative overflow-hidden bg-black-deep border-t border-primary/20">
        <div className="absolute inset-0 pointer-events-none z-0 opacity-10" 
             style={{ backgroundImage: 'repeating-linear-gradient(90deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 40px), repeating-linear-gradient(0deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 40px)' }}>
        </div>
        
        <div className="container relative mx-auto px-4 text-center z-10 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] font-heading font-normal text-white mb-[24px] uppercase tracking-[1px] max-w-4xl mx-auto">Prêt à dominer vos réseaux sociaux ?</h2>
            <p className="text-[16px] md:text-[18px] text-gray-text max-w-2xl mx-auto mb-[48px] leading-[1.6]">
              Rejoignez les entreprises burkinabè qui ont choisi notre production vidéo pour booster leur visibilité.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-[15px]">
              <Button onClick={() => window.location.href = '/contact'} className="w-full sm:w-auto px-[32px] py-[16px] h-auto text-[14px] uppercase font-bold tracking-[1px] bg-primary text-black-deep rounded-[2px] hover:bg-gold-accent transition-colors relative overflow-hidden group shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <span className="relative z-10">Commencer maintenant</span>
              </Button>
              <Button onClick={() => window.location.href = 'https://wa.me/22644906629'} className="w-full sm:w-auto px-[32px] py-[16px] h-auto text-[14px] uppercase font-bold tracking-[1px] border border-white text-white bg-transparent rounded-[2px] hover:bg-white hover:text-black-deep transition-colors">
                Parler à un conseiller
              </Button>
            </div>
            
            <div className="mt-[48px] inline-flex items-center gap-[12px] text-white border border-white/10 bg-dark-accent px-[24px] py-[12px] rounded-[2px]">
              <span className="text-[#25D366]">📱</span>
              <span className="font-mono font-bold text-[14px]">+226 44 90 66 29</span>
              <span className="text-gray-text text-[12px] italic ml-[8px] uppercase tracking-[1px]">- (Réponse en 1H)</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
