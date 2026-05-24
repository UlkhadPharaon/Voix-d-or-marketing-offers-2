import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowDown, Play, Clock, Smartphone, Wallet, TrendingUp, Send, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

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
        {/* Background Video overlay */}
        <div className="absolute inset-0 z-0 bg-black-deep pointer-events-none overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 scale-[1.3] opacity-[0.25]"
            src="https://www.youtube.com/embed/videoseries?list=PL2QtNxnnsuX-3SU1j5AotUiZldOi5pU-Q&vq=hd1080&autoplay=1&mute=1&controls=0&disablekb=1&fs=0&modestbranding=1&playsinline=1&rel=0&loop=1"
            allow="autoplay; encrypted-media"
          ></iframe>
          <div className="absolute inset-0 bg-black-deep/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-transparent to-black-deep"></div>
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="container relative z-10 mx-auto w-full flex flex-col items-center justify-center">
          {/* Content */}
          <div className="flex flex-col items-center justify-center max-w-4xl text-center mt-12 mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading text-[40px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-normal leading-[1.05] mb-[32px] text-white shadow-black-deep drop-shadow-2xl"
            >
              Vos concurrents publient. Vous, vous <br className="hidden lg:block"/> <span className="text-primary italic font-serif">construisez une marque.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[15px] sm:text-[16px] md:text-[18px] text-gray-text max-w-[600px] leading-[1.6] mb-[48px] drop-shadow-md"
            >
              28 vidéos professionnelles par mois. Livrées en 48h. Sans tournage.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-[15px] w-full"
            >
              <Button onClick={() => window.location.href = '/#offres'} className="w-full sm:w-auto px-[32px] py-[16px] h-auto text-[13px] uppercase font-bold tracking-[1px] bg-primary text-black-deep rounded-[4px] shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] hover:-translate-y-1 transition-all">
                → Voir les offres
              </Button>
              <Button onClick={() => window.location.href = '/portfolio'} className="w-full sm:w-auto flex items-center justify-center gap-3 px-[32px] py-[16px] h-auto text-[13px] uppercase font-bold tracking-[1px] border-b-2 border-transparent text-white bg-transparent rounded-none hover:border-primary hover:text-primary transition-colors">
                → Voir des exemples
              </Button>
            </motion.div>
          </div>

          {/* 
            (Visual element removed)
          */}
        </div>

        {/* Proof Bar - Positioned at bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-0 left-0 w-full bg-black-deep/80 backdrop-blur-md border-t border-white/10 py-6"
        >
          <div className="container mx-auto px-6 md:px-[40px]">
            <div className="grid grid-cols-2 lg:flex lg:flex-row items-center justify-center lg:gap-[40px] max-w-6xl mx-auto gap-4 text-center">
              <span className="text-[12px] md:text-[14px] uppercase text-gray-text tracking-[1px] font-bold"><span className="text-primary hidden lg:inline">•</span> 28 vidéos / mois</span>
              <span className="text-[12px] md:text-[14px] uppercase text-gray-text tracking-[1px] font-bold"><span className="text-primary hidden lg:inline">•</span> 48h de délai</span>
              <span className="text-[12px] md:text-[14px] uppercase text-gray-text tracking-[1px] font-bold"><span className="text-primary hidden lg:inline">•</span> Zéro logistique</span>
              <span className="text-[12px] md:text-[14px] uppercase text-gray-text tracking-[1px] font-bold"><span className="text-primary hidden lg:inline">•</span> 100% identité visuelle</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: VOTRE SITUATION AUJOURD'HUI */}
      <section className="py-[60px] md:py-[120px] bg-black-deep text-white relative border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16 flex flex-col items-center">
            <div className="inline-flex self-center bg-transparent border border-white/20 text-gray-text px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
              Votre situation aujourd'hui
            </div>
            <h2 className="text-[28px] sm:text-[40px] md:text-[48px] font-heading font-normal mb-[16px] uppercase tracking-[1px]">Laquelle vous ressemble ?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Card className="h-full bg-dark-accent border border-white/10 rounded-[4px] shadow-none hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-2 transition-all">
                <CardContent className="p-[32px]">
                  <h3 className="font-heading uppercase tracking-[1px] text-[18px] mb-[12px] text-white flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" /> Vous ne publiez pas encore
                  </h3>
                  <p className="text-gray-text text-[15px] leading-relaxed">
                    Chaque semaine sans contenu = des clients qui cherchent sur Google et trouvent votre concurrent à la place.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Card className="h-full bg-dark-accent border border-white/10 rounded-[4px] shadow-none hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-2 transition-all">
                <CardContent className="p-[32px]">
                  <h3 className="font-heading uppercase tracking-[1px] text-[18px] mb-[12px] text-white flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-primary" /> Vous publiez déjà
                  </h3>
                  <p className="text-gray-text text-[15px] leading-relaxed">
                    Téléphone, CapCut, influenceur... Ça ramène des gens. Mais ça plafonne votre image. Vos clients voient une marque "sympa". Pas une référence.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="h-full bg-dark-accent border border-white/10 rounded-[4px] shadow-none hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-2 transition-all">
                <CardContent className="p-[32px]">
                  <h3 className="font-heading uppercase tracking-[1px] text-[18px] mb-[12px] text-white flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-primary" /> Vous avez essayé une agence
                  </h3>
                  <p className="text-gray-text text-[15px] leading-relaxed">
                    500 000 FCFA. 3 semaines d'attente. Une seule vidéo. On comprend que vous ayez arrêté.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
              <Card className="h-full bg-dark-accent border border-white/10 rounded-[4px] shadow-none hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-2 transition-all">
                <CardContent className="p-[32px]">
                  <h3 className="font-heading uppercase tracking-[1px] text-[18px] mb-[12px] text-white flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-primary" /> Vous voulez passer un niveau
                  </h3>
                  <p className="text-gray-text text-[15px] leading-relaxed">
                    Vous avez une base. Vous voulez l'image qui justifie des prix plus élevés et une clientèle plus qualifiée.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="mt-20 flex flex-col items-center justify-center text-center">
            <p className="font-heading uppercase tracking-[1px] text-[18px] text-primary mb-8 max-w-2xl">Dans tous les cas : on a construit l'offre pour vous.</p>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown className="text-primary w-8 h-8 opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CE QUE VOUS PERDEZ CHAQUE MOIS */}
      <section className="py-[60px] md:py-[120px] bg-[#0a0a0a] text-white relative border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
           <div className="text-center mb-10 md:mb-16 flex flex-col items-center">
            <div className="inline-flex self-center bg-transparent border border-white/20 text-gray-text px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
              Ce que vous perdez chaque mois sans nous
            </div>
            <h2 className="text-[28px] sm:text-[40px] md:text-[48px] font-heading font-normal mb-[16px] uppercase tracking-[1px]">Le vrai coût de l'inaction</h2>
          </div>

          <ul className="space-y-6 text-[16px] md:text-[18px] text-gray-text">
             <li className="flex gap-4 items-start bg-dark-accent p-6 border border-white/10 rounded-[4px]">
                <span className="text-red-500 font-bold mt-1">→</span>
                <div>
                  <strong className="text-white block mb-1">Sans contenu régulier</strong>
                  Invisible sur les réseaux. Vos concurrents prennent votre place.
                </div>
             </li>
             <li className="flex gap-4 items-start bg-dark-accent p-6 border border-white/10 rounded-[4px]">
                <span className="text-red-500 font-bold mt-1">→</span>
                <div>
                  <strong className="text-white block mb-1">Avec du contenu low-quality</strong>
                  Vous remplissez des tables. Vous ne construisez pas de marque.
                </div>
             </li>
             <li className="flex gap-4 items-start bg-dark-accent p-6 border border-white/10 rounded-[4px]">
                <span className="text-red-500 font-bold mt-1">→</span>
                <div>
                  <strong className="text-white block mb-1">Avec une agence classique</strong>
                  Vous attendez 3 semaines et videz votre budget sur une seule vidéo.
                </div>
             </li>
          </ul>

          <div className="mt-12 text-center border border-primary/30 bg-primary/5 p-8 rounded-[4px]">
            <p className="text-[18px] md:text-[20px] font-heading uppercase tracking-[1px] text-primary mb-2">La Solution Voix d'Or :</p>
            <p className="text-white text-[16px] md:text-[18px]">
              28 vidéos/mois pour 300 000 FCFA. <br/><span className="text-gray-400 text-[14px]">Soit 10 714 FCFA la vidéo professionnelle.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: COMMENT ÇA MARCHE */}
      <section className="py-[60px] md:py-[120px] bg-black-deep text-white relative border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-8 md:mb-12 flex flex-col items-start">
            <div className="inline-flex bg-transparent border border-white/20 text-gray-text px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
              Comment ça marche
            </div>
            <h2 className="text-[28px] sm:text-[40px] md:text-[56px] font-heading font-normal mb-[16px] md:mb-[24px] leading-tight uppercase tracking-[1px]">
              En 4 étapes. <br/> <span className="text-primary">Vous faites uniquement l'étape 1.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mb-[40px]">
            {[
              { num: 'I', title: 'Brief', desc: 'Vous nous envoyez votre produit, votre cible, votre message. WhatsApp suffit.' },
              { num: 'II', title: 'Stratégie', desc: 'On analyse ce qui performe dans votre secteur en temps réel. Automatique.' },
              { num: 'III', title: 'Production', desc: 'Vos vidéos sont générées avec votre logo, vos couleurs, votre identité.' },
              { num: 'IV', title: 'Livraison', desc: 'MP4 prêts à publier sur vos réseaux. En 48h. Chaque semaine.' },
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
        </div>
      </section>

      {/* SECTION 4: PRICING */}
      <section id="offres" className="py-[60px] md:py-24 bg-black-deep text-white border-t border-primary/20 relative">
        <div className="absolute inset-0 pointer-events-none z-0" 
             style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(212, 175, 55, 0.03) 0px, rgba(212, 175, 55, 0.03) 1px, transparent 1px, transparent 20px)' }}>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 flex flex-col items-center">
            <div className="inline-flex self-center bg-primary/10 border border-primary text-primary px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
              Tarifs
            </div>
            <h2 className="text-[28px] sm:text-[40px] lg:text-[48px] font-heading font-normal mb-[24px] uppercase tracking-[1px] px-4">Des offres claires. <br/>Pas de surprise.</h2>
            
            {/* INTERACTIVE BILLING TOGGLE */}
            <div className="flex bg-dark-accent p-1 rounded-[4px] border border-white/10 mt-[12px] w-[90%] sm:w-full max-w-md mx-auto">
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
            
            {/* STARTER */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="h-full">
              <Card className="bg-dark-accent border border-white/10 rounded-[8px] p-[32px] relative transition-all hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] h-full flex flex-col justify-between">
                <CardContent className="p-0">
                  <div className="mb-[24px]">
                    <div className="font-heading text-[20px] uppercase tracking-[1px] text-gray-400 mb-[8px]">Starter</div>
                    <div className="text-[12px] text-gray-text mb-[12px] h-[36px]">Pour les établissements qui veulent commencer à construire leur image</div>
                    <div className="text-[36px] font-bold text-white flex items-end gap-2">
                      {billingCycle === 'mensuel' ? '175 000' : '148 750'} 
                      <span className="text-[14px] font-normal text-gray-text mb-[8px]">FCFA/mo</span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-white/10 my-[24px]"></div>
                  
                  <ul className="list-none text-[14px] text-gray-text flex flex-col gap-[16px] mb-[32px]">
                    {['Vidéos / mois : 20', 'Durée max : 8 sec', 'Révisions : 1 round', 'Calendrier éditorial : -', 'Manager dédié : -'].map((item, i) => {
                      const isFeature = item.includes('-');
                      return (
                      <li key={i} className={`flex items-start gap-3 ${isFeature ? 'opacity-50' : 'text-white'}`}>
                        <span className="text-primary mt-[2px] shrink-0">{isFeature ? '—' : '✓'}</span> <span>{item}</span>
                      </li>
                      )
                    })}
                  </ul>
                </CardContent>
                <Button onClick={() => window.location.href = '/contact?offer=starter'} className="block w-full py-[16px] h-auto text-center text-[13px] uppercase font-bold tracking-[1px] border border-white/20 text-white rounded-[4px] bg-transparent hover:bg-white hover:text-black-deep transition-all">
                  → Commencer
                </Button>
              </Card>
            </motion.div>

            {/* PRO */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative z-10 lg:-mx-[10px] h-[105%]">
              <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-primary rounded-[8px] p-[40px] relative transition-transform hover:-translate-y-2 h-full flex flex-col justify-between shadow-[0_0_40px_rgba(212,175,55,0.15)] overflow-hidden">
                <div className="absolute top-[20px] right-[20px] bg-primary text-black-deep text-[11px] font-bold py-[4px] px-[12px] uppercase tracking-[1px] rounded-full">
                  ⭐ Le plus choisi
                </div>
                {/* Glow effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60%] bg-primary/5 blur-[50px] pointer-events-none"></div>

                <CardContent className="p-0 relative z-10">
                  <div className="mb-[24px]">
                    <div className="font-heading text-[24px] uppercase tracking-[1px] text-primary mb-[8px]">Pro</div>
                    <div className="text-[12px] text-gray-text mb-[12px] h-[36px]">Pour les marques qui veulent devenir la référence de leur secteur à Ouaga</div>
                    <div className="text-[48px] font-bold text-white flex items-end gap-2">
                      {billingCycle === 'mensuel' ? '300 000' : '255 000'} 
                      <span className="text-[14px] font-normal text-primary/70 mb-[12px]">FCFA/mo</span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-[24px]"></div>
                  
                  <ul className="list-none text-[15px] text-gray-200 flex flex-col gap-[16px] mb-[40px]">
                    {['Vidéos / mois : 28', 'Durée max : 15 sec', 'Révisions : 2 rounds', 'Calendrier éditorial : -', 'Manager dédié : -'].map((item, i) => {
                      const isFeature = item.includes('-');
                      return (
                      <li key={i} className={`flex items-start gap-3 ${isFeature ? 'opacity-50 text-gray-text' : 'text-white font-bold'}`}>
                        <span className="text-primary mt-[2px] shrink-0">{isFeature ? '—' : '✓'}</span> <span>{item}</span>
                      </li>
                      )
                    })}
                  </ul>
                </CardContent>
                <Button onClick={() => window.location.href = '/contact?offer=pro'} className="block w-full py-[16px] mt-auto h-auto text-center text-[13px] uppercase font-bold tracking-[1px] bg-primary text-black-deep rounded-[4px] hover:bg-gold-accent hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all relative z-10">
                  → Choisir Pro
                </Button>
              </Card>
            </motion.div>

            {/* BUSINESS */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="h-full">
              <Card className="bg-dark-accent border border-white/10 rounded-[8px] p-[32px] relative transition-all hover:-translate-y-2 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] h-full flex flex-col justify-between">
                <CardContent className="p-0">
                  <div className="mb-[24px]">
                    <div className="font-heading text-[20px] uppercase tracking-[1px] text-gray-400 mb-[8px]">Business</div>
                    <div className="text-[12px] text-gray-text mb-[12px] h-[36px]">Pour les établissements qui veulent dominer leur marché — pas juste y participer</div>
                    <div className="text-[36px] font-bold text-white flex items-end gap-2">
                      {billingCycle === 'mensuel' ? '750 000' : '637 500'} 
                      <span className="text-[14px] font-normal text-gray-text mb-[8px]">FCFA/mo</span>
                    </div>
                  </div>
                  
                  <div className="h-px bg-white/10 my-[24px]"></div>
                  
                  <ul className="list-none text-[14px] text-gray-text flex flex-col gap-[16px] mb-[32px]">
                    {['Vidéos / mois : 84', 'Durée max : 15 sec +', 'Révisions : Illimitées', 'Calendrier éditorial : ✓', 'Manager dédié : ✓'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-white">
                        <span className="text-primary mt-[2px] shrink-0">✓</span> <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <Button onClick={() => window.location.href = '/contact?offer=business'} className="block w-full py-[16px] h-auto text-center text-[13px] uppercase font-bold tracking-[1px] border border-white/20 text-white rounded-[4px] bg-transparent hover:bg-white hover:text-black-deep transition-all">
                  → Devenir la référence
                </Button>
              </Card>
            </motion.div>

          </div>

          <div className="text-center mt-10 md:mt-12 flex flex-col items-center justify-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-[8px] sm:gap-[12px] bg-dark-accent border border-white/10 px-[16px] sm:px-[24px] py-[12px] text-[12px] sm:text-[13px] text-gray-text rounded-[2px] shadow-sm text-center">
              <ShieldCheck className="w-5 h-5 text-primary" /> <span>Sans engagement. Résiliable à tout moment.</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: LEAD MAGNET */}
      <section className="py-[60px] md:py-[120px] bg-[#111] text-white border-t border-white/10 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 blur-[80px] md:blur-[120px] pointer-events-none rounded-full"></div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Card className="bg-black-deep border border-primary/30 rounded-[8px] p-6 sm:p-8 md:p-[60px] text-center shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden">
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
      <section id="faq" className="py-[60px] md:py-[120px] bg-black-deep text-white border-t border-white/10 relative">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center mb-[40px] md:mb-[80px] flex flex-col items-center">
            <div className="inline-flex self-center bg-primary/10 border border-primary text-primary px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
              FAQ
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "C'est vraiment de la qualité professionnelle ?",
                a: "Oui. Pas de mauvais éclairage, pas de bruit de fond. Standards internationaux, identité visuelle intégrée."
              },
              {
                q: "Quelle différence avec mon community manager actuel ?",
                a: "Il gère votre présence. Nous construisons votre image. Les deux se complètent."
              },
              {
                q: "Je peux tester avant de signer ?",
                a: "Oui. On produit une vidéo de votre marque en direct devant vous en 20 minutes. Gratuit. Sans engagement."
              },
              {
                 q: "Comment je paie ?",
                 a: "Orange Money, Moov Money ou virement. Mensuel, en avance."
              },
              {
                 q: "Vous travaillez hors de Ouaga ?",
                 a: "Oui. 100% digital. Burkina entier + Afrique de l'Ouest."
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

      {/* SECTION 8: CTA TOTAL */}
      <section className="py-[60px] md:py-[120px] relative overflow-hidden bg-black-deep border-t border-primary/20">
        <div className="absolute inset-0 pointer-events-none z-0 opacity-10" 
             style={{ backgroundImage: 'repeating-linear-gradient(90deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 40px), repeating-linear-gradient(0deg, #d4af37 0px, #d4af37 1px, transparent 1px, transparent 40px)' }}>
        </div>
        
        <div className="container relative mx-auto px-4 text-center z-10 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-[28px] sm:text-[40px] md:text-[48px] lg:text-[64px] font-heading font-normal text-white mb-[16px] md:mb-[24px] uppercase tracking-[1px] max-w-4xl mx-auto leading-tight">Dans 20 minutes, vous pouvez voir votre marque transformée.</h2>
            <p className="text-[16px] md:text-[18px] text-gray-text max-w-3xl mx-auto mb-[48px] leading-[1.6]">
              On produit une vidéo de votre établissement en direct. <strong className="text-white">Gratuit. Sans engagement.</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-[15px]">
              <Button onClick={() => window.location.href = '/contact'} className="w-full sm:w-auto px-[32px] py-[16px] h-auto text-[14px] uppercase font-bold tracking-[1px] bg-primary text-black-deep rounded-[2px] hover:bg-gold-accent transition-colors relative overflow-hidden group shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <span className="relative z-10">→ Réserver une démo gratuite</span>
              </Button>
              <Button onClick={() => window.location.href = '/contact'} className="w-full sm:w-auto px-[32px] py-[16px] h-auto text-[14px] uppercase font-bold tracking-[1px] border border-white text-white bg-transparent rounded-[2px] hover:bg-white hover:text-black-deep transition-colors">
                → Parler à un conseiller
              </Button>
            </div>
            
            <div className="mt-[48px] inline-flex items-center justify-center gap-[12px] text-white border border-white/10 bg-dark-accent px-[24px] py-[12px] rounded-[2px]">
              <span className="text-[#25D366]">📱</span>
              <span className="font-mono font-bold text-[14px]">+226 44 90 66 29</span>
              <span className="text-gray-text text-[12px] italic ml-[8px] uppercase tracking-[1px]">- Réponse en moins d'1 heure.</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
