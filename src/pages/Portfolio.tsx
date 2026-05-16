import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';

const SECTORS = ['Tout', 'Alimentation', 'Mode & Beauté', 'Services B2B', 'Santé', 'Éducation'];

const VIDEOS = [
  { id: 1, sector: 'Mode & Beauté', offer: 'PRO', duration: '15s', results: '+210lk vues', thumb: 'bg-rose-900', title: 'Nouvelle Collection Fêtes' },
  { id: 2, sector: 'Alimentation', offer: 'BASIC', duration: '8s', results: '+15% commandes', thumb: 'bg-orange-800', title: 'Lancement Menu Spécial' },
  { id: 3, sector: 'Services B2B', offer: 'BUSINESS', duration: '30s', results: '25 leads B2B', thumb: 'bg-blue-900', title: 'Présentation Solution Tech' },
  { id: 4, sector: 'Santé', offer: 'PRO', duration: '15s', results: '+40% prises rdv', thumb: 'bg-emerald-900', title: 'Prévention Santé Mentale' },
  { id: 5, sector: 'Éducation', offer: 'BASIC', duration: '8s', results: '+300 inscriptions', thumb: 'bg-purple-900', title: 'Inscriptions Ouvertes 2025' },
  { id: 6, sector: 'Mode & Beauté', offer: 'BUSINESS', duration: '15s', results: '+85% engagement', thumb: 'bg-pink-900', title: 'Tuto Routine Beauté' },
];

export function Portfolio() {
  const [filter, setFilter] = useState('Tout');

  const filteredVideos = filter === 'Tout' ? VIDEOS : VIDEOS.filter(v => v.sector === filter);

  return (
    <div className="min-h-screen bg-black-deep text-white pt-[120px] pb-24 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <div className="inline-flex self-center bg-primary/10 border border-primary text-primary px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
            Mur de vidéos
          </div>
          <h1 className="text-[40px] md:text-[48px] font-heading font-normal mb-[16px] uppercase tracking-[1px]">Exemples de vidéos</h1>
          <p className="text-gray-text text-[15px] max-w-[500px]">
            Découvrez nos productions de spots publicitaires et vidéos UGC pour nos clients à travers l'Afrique.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {SECTORS.map(sector => (
            <button
              key={sector}
              onClick={() => setFilter(sector)}
              className={`px-5 py-2 rounded-[2px] text-[11px] font-bold uppercase tracking-[1px] transition-all border ${
                filter === sector 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-white/10 bg-transparent text-gray-text hover:bg-white/5'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Wall */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredVideos.map((video) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-dark-accent border border-white/10 rounded-[4px] overflow-hidden group cursor-pointer h-full hover:border-primary/50 transition-colors p-[8px]">
                  <div className={`relative w-full aspect-[9/16] ${video.thumb} flex items-center justify-center overflow-hidden rounded-[2px]`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                    <div className="w-16 h-16 border border-white/20 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 ml-1 text-white" />
                    </div>
                    {/* Tags overlay */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-[2px] text-[10px] font-bold text-white uppercase tracking-[1px] border border-white/10">
                        {video.sector}
                      </span>
                      <span className="px-3 py-1 bg-primary text-black-deep rounded-[2px] text-[10px] font-bold uppercase tracking-[1px] self-start">
                        {video.offer}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-[2px] text-[10px] font-bold text-white border border-white/10">
                        ⏱ {video.duration}
                      </span>
                    </div>
                    {/* Bottom overlay info inside video thumb */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black-deep via-black-deep/80 to-transparent">
                      <h3 className="text-[18px] font-heading text-white mb-2 leading-tight">{video.title}</h3>
                      <div className="text-primary font-bold text-[11px] uppercase tracking-[1px]">🔥 Résultats : {video.results}</div>
                    </div>
                  </div>
                  
                  <CardContent className="p-[16px] text-center">
                    <Button onClick={() => window.location.href = '/contact'} variant="outline" className="w-full bg-transparent border-white/10 text-white rounded-[2px] hover:border-primary hover:bg-primary/5 hover:text-primary transition-all py-[12px] h-auto uppercase text-[11px] tracking-[1px] font-bold">
                      Des vidéos similaires
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredVideos.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            Aucune vidéo trouvée pour ce secteur.
          </div>
        )}

      </div>
    </div>
  );
}
