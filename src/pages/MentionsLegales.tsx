import { PageTransition } from '@/components/PageTransition';
import { SEO } from '@/components/SEO';

// TODO(owner): faire relire par un juriste — raison sociale, adresse,
// contacts, directeur de publication et hébergeur à compléter.
export function MentionsLegales() {
  return (
    <PageTransition className="min-h-screen bg-background/0 text-foreground pt-[100px] md:pt-[120px] pb-12 md:pb-24 border-t border-primary/20">
      <SEO
        title="Mentions légales"
        description="Mentions légales de NEFERTEM - AI Growth Systems."
        path="/mentions-legales"
      />
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-[28px] md:text-[40px] font-heading font-normal uppercase tracking-[1px] mb-8 text-foreground">
          Mentions légales
        </h1>
        <div className="space-y-6 text-[14px] leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-[16px] font-bold uppercase tracking-[1px] text-foreground mb-2">Éditeur du site</h2>
            <p>
              NEFERTEM - AI Growth Systems<br />
              Ouagadougou, Burkina Faso<br />
              {/* TODO(owner): raison sociale + adresse complète */}
              WhatsApp : +226 05 83 05 99<br />
              E-mail : contact@nefertem.africa
            </p>
          </section>
          <section>
            <h2 className="text-[16px] font-bold uppercase tracking-[1px] text-foreground mb-2">Directeur de publication</h2>
            {/* TODO(owner): nom du directeur de publication */}
            <p>Le responsable de la publication est le gérant de NEFERTEM.</p>
          </section>
          <section>
            <h2 className="text-[16px] font-bold uppercase tracking-[1px] text-foreground mb-2">Hébergement</h2>
            {/* TODO(owner): nom + adresse de l'hébergeur */}
            <p>Ce site est hébergé par un prestataire professionnel. Détails à compléter.</p>
          </section>
          <section>
            <h2 className="text-[16px] font-bold uppercase tracking-[1px] text-foreground mb-2">Propriété des contenus</h2>
            <p>
              Les visuels, vidéos et textes publiés sur ce site sont la propriété de NEFERTEM
              ou de ses clients. Les contenus créés pour vous dans le cadre de votre
              abonnement restent votre propriété.
            </p>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
