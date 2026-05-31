import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { PageTransition } from '@/components/PageTransition';

export function Portfolio() {
  return (
    <PageTransition className="min-h-screen bg-transparent text-white pt-[100px] md:pt-[120px] pb-12 md:pb-24 border-t border-primary/20">
      <SEO 
        title="Portfolio & Exemples | Studio Voix d'Or"
        description="Découvrez nos réalisations vidéos conçues et gérées par nos employés virtuels pour différentes marques : gastronomie, supermarché, retail, parfumerie. La qualité d'une agence internationale, ici au Burkina."
      />
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 flex flex-col items-center">
          <div className="inline-flex self-center bg-transparent border border-white/20 text-gray-text px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
            La Preuve Irréfutable
          </div>
          <h1 className="text-[28px] sm:text-[40px] md:text-[48px] font-heading font-normal mb-[16px] uppercase tracking-[1px] leading-tight">
            Ce que "professionnel" <span className="text-primary italic font-serif">veut dire</span> pour nos Employés Virtuels
          </h1>
          <p className="text-gray-text text-[15px] max-w-[500px]">
            Ce ne sont pas des vidéos génériques et froides. Ce sont des marques locales sublimées avec les standards des grandes enseignes de la sous-région.
          </p>
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
                <span className="text-[12px] uppercase tracking-[1px] text-gray-500 font-bold block mt-1">Exemple de production - Tier 2 : L'Employé Commercial</span>
              </div>
              <div className="relative w-full aspect-video overflow-hidden rounded-[8px] border border-white/10 shadow-[0_0_20px_rgba(212,175,55,0.1)] bg-dark-accent mb-4 md:mb-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/yImx6vMXneI?si=gxx-izFssIEQ05gH&vq=hd1080"
                  title="Exemple Gastronomie"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col gap-4">
              <div className="text-center">
                <h3 className="font-heading uppercase tracking-[1px] text-[18px] text-primary">Supermarché</h3>
                <span className="text-[12px] uppercase tracking-[1px] text-gray-500 font-bold block mt-1">Exemple de production - Tier 1 : L'Employé de Base</span>
              </div>
              <div className="relative w-full aspect-video overflow-hidden rounded-[8px] border border-white/10 shadow-[0_0_20px_rgba(212,175,55,0.1)] bg-dark-accent mb-4 md:mb-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/j5ktRSbDMEU?si=XhSqVt8W_ospRwQH&vq=hd1080"
                  title="Exemple Supermarché"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col gap-4">
              <div className="text-center">
                <h3 className="font-heading uppercase tracking-[1px] text-[18px] text-primary">Retail & Commerce</h3>
                <span className="text-[12px] uppercase tracking-[1px] text-gray-500 font-bold block mt-1">Exemple de production - Tier 1 : L'Employé de Base</span>
              </div>
              <div className="relative w-full aspect-video overflow-hidden rounded-[8px] border border-white/10 shadow-[0_0_20px_rgba(212,175,55,0.1)] bg-dark-accent mb-4 md:mb-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/wLzagc6DvDE?si=V6uD7PsWi_bIsQWP&vq=hd1080"
                  title="Exemple Retail"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col gap-4">
              <div className="text-center mb-2">
                <h3 className="font-heading uppercase tracking-[1px] text-[20px] text-primary mb-2">Parfumerie et Luxe</h3>
                <span className="text-[12px] uppercase tracking-[1px] text-gray-500 font-bold block">La vitrine de prestige - Tier 3 : Le Département Complet</span>
              </div>
              <div className="relative w-full aspect-video overflow-hidden rounded-[8px] border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.15)] bg-black-deep">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/videoseries?list=PL2QtNxnnsuX-3SU1j5AotUiZldOi5pU-Q&vq=hd1080"
                  title="Studio Voix d'Or Showcase"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-8 flex flex-col items-center">
            <h3 className="text-[24px] sm:text-[32px] font-heading font-normal mb-8 uppercase tracking-[1px] text-center text-white">Vous voulez voir l'employé virtuel générer vos vidéos ?</h3>
            <Button onClick={() => window.location.href = '/contact'} className="px-[32px] py-[16px] h-auto text-[14px] uppercase font-bold tracking-[1px] bg-primary text-black-deep rounded-[2px] hover:bg-gold-accent transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:-translate-y-1">
              → Lancer votre Démo Instantanée
            </Button>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
