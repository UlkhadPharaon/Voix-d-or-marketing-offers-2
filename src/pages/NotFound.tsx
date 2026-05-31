import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { PageTransition } from '@/components/PageTransition';
import { SplineScene } from '@/components/ui/splite';

export function NotFound() {
  return (
    <PageTransition className="w-full relative min-h-screen">
      <SEO 
        title="Page Non Trouvée | Studio Voix d'Or"
        description="La page que vous recherchez n'existe pas ou a été déplacée."
      />
      
      {/* 404 3D Background */}
      <div className="fixed inset-0 z-0 h-full w-full opacity-70 flex items-center justify-center">
        <SplineScene 
          scene="/404_3_d.spline"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black-deep/40 pointer-events-none"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] max-w-lg w-full"
        >
          <div className="inline-flex bg-primary/10 border border-primary/30 text-primary px-[16px] py-[6px] font-bold text-[12px] tracking-[3px] uppercase mb-[24px] rounded-full">
            Erreur 404
          </div>
          
          <h1 className="text-[40px] md:text-[56px] font-heading font-normal text-white mb-[16px] uppercase tracking-[1px] leading-tight">
            Signal Perdu
          </h1>
          
          <p className="text-[16px] text-gray-400 mb-[40px] max-w-sm mx-auto leading-relaxed">
            La page que vous recherchez semble avoir disparu dans le cyberespace.
          </p>

          <Link to="/">
            <button className="group relative w-full inline-flex items-center justify-center gap-3 bg-white text-black-deep px-[24px] py-[20px] rounded-[4px] font-bold text-[13px] uppercase tracking-[2px] overflow-hidden transition-all hover:bg-gray-200">
              <Home className="w-5 h-5 text-black-deep" />
              <span className="relative z-10">Retour à l'Accueil</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
          </Link>
        </motion.div>
      </div>
    </PageTransition>
  );
}
