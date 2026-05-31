import { motion } from 'motion/react';
import { ShieldCheck, Zap, PenTool, CheckCircle, TrendingUp, Clock } from 'lucide-react';

const marqueeItems = [
  { text: 'Images de Luxe', icon: PenTool },
  { text: 'Livrées en 48h', icon: Clock },
  { text: 'Qualité Agence', icon: ShieldCheck },
  { text: 'Aucun Tournage Requis', icon: Zap },
  { text: 'Abonnement Flexible', icon: CheckCircle },
  { text: 'Scaling Visuel', icon: TrendingUp },
];

export function InfiniteMarquee() {
  return (
    <div className="relative flex overflow-x-hidden bg-primary/10 border-y border-primary/20 py-4 h-[60px] whitespace-nowrap items-center w-full">
      <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-black-deep to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-black-deep to-transparent z-10 pointer-events-none"></div>
      <motion.div
        className="flex space-x-12 shrink-0 px-6 items-center"
        animate={{
          x: ['0%', '-100%'],
        }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {marqueeItems.concat(marqueeItems).map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center space-x-3">
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-[14px] uppercase tracking-[2px] font-bold text-white">{item.text}</span>
            </div>
          );
        })}
      </motion.div>
      <motion.div
        className="flex space-x-12 shrink-0 px-6 items-center absolute"
        animate={{
          x: ['100%', '0%'],
        }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {marqueeItems.concat(marqueeItems).map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center space-x-3">
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-[14px] uppercase tracking-[2px] font-bold text-white">{item.text}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
