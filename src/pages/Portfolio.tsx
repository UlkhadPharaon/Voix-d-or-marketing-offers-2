import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

export function Portfolio() {
  return (
    <div className="min-h-screen bg-black-deep text-white pt-[120px] pb-24 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <div className="inline-flex self-center bg-primary/10 border border-primary text-primary px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
            Notre Showcase
          </div>
          <h1 className="text-[40px] md:text-[48px] font-heading font-normal mb-[16px] uppercase tracking-[1px]">Exemples de vidéos</h1>
          <p className="text-gray-text text-[15px] max-w-[500px]">
            Découvrez nos productions de spots publicitaires et vidéos UGC pour nos clients à travers l'Afrique.
          </p>
        </div>

        {/* Video Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative w-full aspect-video md:aspect-[21/9] lg:aspect-video overflow-hidden rounded-[8px] border border-primary/30 shadow-[0_0_50px_rgba(212,175,55,0.15)] bg-black-deep">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/videoseries?list=PL2QtNxnnsuX-3SU1j5AotUiZldOi5pU-Q"
              title="Studio Voix d'Or Showcase"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="mt-16 flex flex-col items-center">
            <h3 className="text-[24px] font-heading font-normal mb-6 uppercase tracking-[1px] text-center">Vous aimez ce que vous voyez ?</h3>
            <Button onClick={() => window.location.href = '/contact'} className="px-[32px] py-[16px] h-auto text-[14px] uppercase font-bold tracking-[1px] bg-primary text-black-deep rounded-[2px] hover:bg-gold-accent transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:-translate-y-1">
              Démarrer votre projet
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

