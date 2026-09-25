import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { PageTransition } from '@/components/PageTransition';
import { Eye, EyeOff } from 'lucide-react';

export function Portfolio() {
  const [hideUI, setHideUI] = useState(false);
  
  const uiParams = hideUI ? "&controls=0&modestbranding=1&rel=0" : "&controls=1";

  return (
    <PageTransition className="min-h-screen bg-background/0 text-foreground pt-[100px] md:pt-[120px] pb-12 md:pb-24 border-t border-primary/20">
      <SEO 
        title="Réalisations & Systèmes"
        description="Contenu, distribution et optimisation pour marques locales : food, retail, beauty, éducation. Produit par NEFERTEM Studio."
      />
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 flex flex-col items-center">
          <div className="inline-flex self-center bg-background/0 border border-foreground/20 text-muted-foreground px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
            La Preuve Irréfutable
          </div>
          <h1 className="text-[28px] sm:text-[40px] md:text-[48px] font-heading font-normal mb-[16px] uppercase tracking-[1px] leading-tight">
            Ce que "système" <span className="text-primary italic font-serif">veut dire</span> pour vos marques
          </h1>
          <p className="text-muted-foreground text-[15px] max-w-[500px]">
            Pas du volume sans apprentissage : des marques locales sublimées, testées et optimisées chaque mois.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <Button 
            variant="outline" 
            onClick={() => setHideUI(!hideUI)}
            className="border-primary/30 hover:border-primary/80 hover:bg-primary/10 text-foreground transition-all"
          >
            {hideUI ? (
              <><Eye className="w-4 h-4 mr-2" /> Réactiver l'interface vidéo</>
            ) : (
              <><EyeOff className="w-4 h-4 mr-2" /> Masquer l'interface vidéo (Mode fluide)</>
            )}
          </Button>
        </div>

        {/* Video Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Liste des secteurs */}
          <div className="flex flex-col gap-16 mb-20">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col gap-4">
              <div className="text-center">
                <h3 className="font-heading uppercase tracking-[1px] text-[18px] text-primary">Gastronomie</h3>
                <span className="text-[12px] uppercase tracking-[1px] text-gray-500 font-bold block mt-1">Système Standard · vidéo</span>
              </div>
              <div className="relative w-full aspect-video overflow-hidden rounded-[8px] border border-foreground/10 shadow-[0_0_20px_rgba(212,175,55,0.1)] bg-card mb-4 md:mb-0 transform-gpu">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/yImx6vMXneI?si=gxx-izFssIEQ05gH${uiParams}`}
                  title="Exemple Gastronomie"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col gap-4">
              <div className="text-center">
                <h3 className="font-heading uppercase tracking-[1px] text-[18px] text-primary">Supermarché</h3>
                <span className="text-[12px] uppercase tracking-[1px] text-gray-500 font-bold block mt-1">Système Essentials · contenu</span>
              </div>
              <div className="relative w-full aspect-video overflow-hidden rounded-[8px] border border-foreground/10 shadow-[0_0_20px_rgba(212,175,55,0.1)] bg-card mb-4 md:mb-0 transform-gpu">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/j5ktRSbDMEU?si=XhSqVt8W_ospRwQH${uiParams}`}
                  title="Exemple Supermarché"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col gap-4">
              <div className="text-center">
                <h3 className="font-heading uppercase tracking-[1px] text-[18px] text-primary">Retail & Commerce</h3>
                <span className="text-[12px] uppercase tracking-[1px] text-gray-500 font-bold block mt-1">Système Essentials · contenu</span>
              </div>
              <div className="relative w-full aspect-video overflow-hidden rounded-[8px] border border-foreground/10 shadow-[0_0_20px_rgba(212,175,55,0.1)] bg-card mb-4 md:mb-0 transform-gpu">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/wLzagc6DvDE?si=V6uD7PsWi_bIsQWP${uiParams}`}
                  title="Exemple Retail"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col gap-4">
              <div className="text-center mb-2">
                <h3 className="font-heading uppercase tracking-[1px] text-[20px] text-primary mb-2">Parfumerie et Luxe</h3>
                <span className="text-[12px] uppercase tracking-[1px] text-gray-500 font-bold block">Système Business · campagne complète</span>
              </div>
              <div className="relative w-full aspect-video overflow-hidden rounded-[8px] border border-foreground/10 shadow-[0_0_50px_rgba(212,175,55,0.15)] bg-background transform-gpu">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/videoseries?list=PL2QtNxnnsuX-3SU1j5AotUiZldOi5pU-Q${uiParams}`}
                  title="NEFERTEM Studio Showcase"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-8 flex flex-col items-center">
            <h3 className="text-[24px] sm:text-[32px] font-heading font-normal mb-8 uppercase tracking-[1px] text-center text-foreground">Vous voulez voir le système tourner pour vous ?</h3>
            <Button onClick={() => window.location.href = '/contact'} className="px-[32px] py-[16px] h-auto text-[14px] uppercase font-bold tracking-[1px] bg-primary text-black-deep rounded-[2px] hover:bg-gold-accent transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:-translate-y-1">
              → Demander votre diagnostic gratuit
            </Button>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
