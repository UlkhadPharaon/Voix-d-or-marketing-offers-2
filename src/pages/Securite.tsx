import { PageTransition } from '@/components/PageTransition';
import { Card } from '@/components/ui/card';
import { Shield, Lock, Server, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export function Securite() {
  return (
    <PageTransition className="min-h-screen bg-background/0 text-foreground pt-[100px] md:pt-[120px] pb-12 md:pb-24 border-t border-primary/20">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-primary/10 border border-primary text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-[32px] md:text-[48px] font-heading font-normal text-foreground mb-[16px] uppercase tracking-[1px] leading-tight">
            Votre tranquillité d'esprit, <br className="hidden md:block" />notre priorité absolue.
          </h1>
          <p className="text-muted-foreground text-[14px] md:text-[16px] max-w-2xl mx-auto leading-relaxed">
            Nous savons que vos informations et celles de vos clients sont précieuses. C'est pourquoi nous nous appuyons sur les géants mondiaux de la technologie pour vous offrir un service non seulement performant, mais surtout impénétrable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
          >
            <Card className="bg-card/90 dark:bg-foreground/5 backdrop-blur-2xl border border-foreground/10 rounded-[8px] p-8 h-full shadow-xl hover:border-primary/50 transition-colors">
              <div className="mb-6 bg-foreground/[0.05] w-12 h-12 flex items-center justify-center rounded-full">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-heading uppercase tracking-wide mb-4">Une intelligence artificielle de confiance</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Pour faire fonctionner votre Employé Virtuel, nous utilisons les cerveaux numériques les plus avancés et les plus respectueux de la vie privée (comme ceux développés par les créateurs de ChatGPT ou Google). 
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-sm">Vos conversations ne sont <strong className="text-foreground font-bold">jamais</strong> utilisées pour entraîner des modèles publics.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-sm">Le secret de vos affaires reste entre vous et votre assistant.</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
          >
            <Card className="bg-card/90 dark:bg-foreground/5 backdrop-blur-2xl border border-foreground/10 rounded-[8px] p-8 h-full shadow-xl hover:border-primary/50 transition-colors">
              <div className="mb-6 bg-foreground/[0.05] w-12 h-12 flex items-center justify-center rounded-full">
                <Server className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-heading uppercase tracking-wide mb-4">Hébergement ultra-sécurisé</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Vos données ne flottent pas au hasard. Elles sont stockées et protégées par les leaders mondiaux de l'hébergement de sites web, tels que <strong>Google</strong> ou <strong>Hostinger</strong>.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-sm">Des coffres-forts numériques surveillés 24h/24 et 7j/7.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-sm">Des copies de secours automatiques pour ne jamais rien perdre.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-sm">Le même niveau de sécurité que les grandes applications que vous utilisez tous les jours.</span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-primary/5 border border-primary/20 rounded-[8px] p-8 md:p-12 text-center shadow-[0_0_40px_rgba(212,175,55,0.1)]"
        >
          <h3 className="text-2xl font-heading uppercase tracking-widest text-primary mb-4">En résumé</h3>
          <p className="text-foreground text-lg max-w-3xl mx-auto leading-relaxed font-light">
            Vous profitez de ce qui se fait de mieux en matière de technologie mondiale, directement au service de votre entreprise, sans avoir besoin de vous soucier de la technique. Nous verrouillons les portes pour vous.
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
