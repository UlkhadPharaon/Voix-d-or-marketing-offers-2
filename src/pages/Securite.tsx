import { Link } from 'react-router-dom';
import { PageTransition } from '@/components/PageTransition';
import { SEO } from '@/components/SEO';
import { KeyRound, UserCheck, FolderLock } from 'lucide-react';

const BLOCKS = [
  {
    icon: UserCheck,
    title: "Vos conversations restent privées",
    text: "Ce que vous nous confiez sur WhatsApp sert uniquement à préparer votre dossier et vos contenus. Rien n'est revendu, rien n'est partagé.",
  },
  {
    icon: KeyRound,
    title: "Vos comptes restent à vous",
    text: "Vos pages Facebook, Instagram et TikTok restent votre propriété. Vous gardez tous les accès, tout le temps — même si vous partez.",
  },
  {
    icon: FolderLock,
    title: "Vos contenus sont votre propriété",
    text: "Chaque visuel et chaque vidéo créés pour vous vous appartiennent. Vous les gardez et les réutilisez comme vous voulez.",
  },
];

export function Securite() {
  return (
    <PageTransition className="min-h-screen bg-background/0 text-foreground pt-[100px] md:pt-[120px] pb-12 md:pb-24 border-t border-primary/20">
      <SEO
        title="Vos données, votre marque, en sécurité"
        description="Vos conversations restent privées, vos comptes et vos contenus restent votre propriété."
        path="/securite"
      />
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[2px] text-primary">
            Sécurité
          </p>
          <h1 className="mt-4 font-heading text-[28px] font-normal uppercase leading-tight tracking-[1px] text-foreground md:text-[44px]">
            Vos données, votre marque, en sécurité.
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Travailler avec nous ne vous fait rien perdre : ni vos accès, ni vos contenus, ni votre confidentialité.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {BLOCKS.map((b) => (
            <div key={b.title} className="rounded-[12px] border border-foreground/10 bg-foreground/[0.03] p-6">
              <b.icon className="h-7 w-7 text-primary" aria-hidden="true" />
              <h2 className="mt-4 text-[15px] font-bold uppercase tracking-[1px] text-foreground">{b.title}</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/demarrer?src=securite"
            className="inline-flex min-h-[56px] items-center justify-center rounded-[4px] bg-primary px-8 text-[13px] font-bold uppercase tracking-[1px] text-black-deep hover:bg-gold-accent"
          >
            → Recevoir mon diagnostic gratuit
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
