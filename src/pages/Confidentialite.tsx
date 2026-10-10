import { PageTransition } from '@/components/PageTransition';
import { SEO } from '@/components/SEO';

// TODO(owner): faire relire par un juriste — durées de conservation,
// sous-traitants et droits d'accès à compléter.
export function Confidentialite() {
  return (
    <PageTransition className="min-h-screen bg-background/0 text-foreground pt-[100px] md:pt-[120px] pb-12 md:pb-24 border-t border-primary/20">
      <SEO
        title="Politique de confidentialité"
        description="Comment NEFERTEM collecte et protège vos données."
        path="/confidentialite"
      />
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-[28px] md:text-[40px] font-heading font-normal uppercase tracking-[1px] mb-8 text-foreground">
          Politique de confidentialité
        </h1>
        <div className="space-y-6 text-[14px] leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-[16px] font-bold uppercase tracking-[1px] text-foreground mb-2">Ce que nous collectons</h2>
            <p>
              Quand vous remplissez notre parcours de démarrage, nous collectons uniquement ce
              dont nous avons besoin pour vous recontacter et préparer votre dossier : nom de
              votre entreprise, prénom, numéro WhatsApp, ville, activité, objectif et réseaux.
            </p>
          </section>
          <section>
            <h2 className="text-[16px] font-bold uppercase tracking-[1px] text-foreground mb-2">Ce que nous n'en faisons pas</h2>
            <p>
              Vos informations ne sont ni vendues, ni partagées avec des tiers à des fins
              publicitaires. Elles servent uniquement à vous accompagner.
            </p>
          </section>
          <section>
            <h2 className="text-[16px] font-bold uppercase tracking-[1px] text-foreground mb-2">Vos droits</h2>
            <p>
              Vous pouvez à tout moment demander à voir, corriger ou supprimer vos données en
              nous écrivant sur WhatsApp (+226 05 83 05 99) ou à contact@nefertem.africa.
            </p>
          </section>
          <section>
            <h2 className="text-[16px] font-bold uppercase tracking-[1px] text-foreground mb-2">Conservation</h2>
            {/* TODO(owner): durée de conservation des dossiers prospects/clients */}
            <p>Vos données sont conservées le temps nécessaire à notre relation commerciale.</p>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
