import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/base-ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/base-ui/avatar';
import { Carousel, CarouselContent, CarouselItem } from '@/components/base-ui/carousel';

type Testimonial = { name: string; role: string; avatar?: string; content: string };

/* TODO(owner): remplacer ces témoignages d'exemple par de vrais citations
   clients (nom, activité, quartier + url d'avatar si disponible). */
const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Fatou Kaboré',
    role: 'Restaurant Le Dapoya · Ouaga 2000',
    content:
      "Mes visuels partent chaque semaine sans que j'y pense. Mes clients commentent, et certains arrivent avec l'envie déjà prête.",
  },
  {
    name: 'Issouf Ouédraogo',
    role: 'Boutique Zaka · Rive Droite',
    content:
      "Les messages de mes clients sont suivis du matin au soir. Le bilan du dimanche me montre exactement ce qui a marché.",
  },
  {
    name: 'Mariam Compaoré',
    role: 'Institut de beauté · Tanghin',
    content:
      'Mes clientes entrent en citant mes publications. Le style a été validé dès la première semaine, et il me ressemble.',
  },
  {
    name: 'Boureima Sawadogo',
    role: 'Quincaillerie du Centre · Baskuy',
    content:
      "Entre la boutique et les livraisons, je n'avais jamais le temps pour les réseaux. Là, tout est publié et chaque demande reçoit une réponse.",
  },
  {
    name: 'Aminata Traoré',
    role: 'Parfumerie Éclat · Zone du Bois',
    content:
      "Photos, vidéos, textes : tout est dans le même ton, le mien. Et le paiement Mobile Money, c'est réglé en deux clics.",
  },
  {
    name: 'Dramane Zongo',
    role: 'Hôtel Les Collines · Bobo-Dioulasso',
    content:
      'Nos pages sont revenues à la vie en trois semaines. Les réservations suivent — nous, on reste concentrés sur les clients.',
  },
];

export default function Testimonials2() {
  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit:
          typeof window === 'undefined' ||
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      }),
    [],
  );

  return (
    <section
      aria-labelledby="temoignages-titre"
      className="border-t border-foreground/10 bg-background px-4 py-16 md:py-24"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col items-start space-y-4 text-left">
            <h2
              id="temoignages-titre"
              className="font-heading text-[28px] font-normal uppercase leading-tight tracking-[1px] text-foreground md:text-[40px]"
            >
              Ils nous confient leurs réseaux
            </h2>
            <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground md:text-[17px]">
              Vos visuels partent chaque semaine, vos clients reçoivent une réponse
              dans vos messages, et votre bilan arrive le dimanche. Vous, vous
              restez concentrés sur votre métier.
            </p>
          </div>

          <div className="relative h-[400px] w-full rounded-lg lg:h-[500px]">
            <div className="from-background pointer-events-none absolute top-0 right-0 left-0 z-10 h-20 bg-gradient-to-b to-transparent" />

            <Carousel
              orientation="vertical"
              opts={{
                loop: true,
                align: 'start',
              }}
              plugins={[plugin]}
              onMouseEnter={plugin.stop}
              onMouseLeave={() => plugin.reset()}
              className="h-full w-full [&_[data-slot=carousel-content]]:h-[400px] lg:[&_[data-slot=carousel-content]]:h-[500px]"
            >
              <CarouselContent className="-mt-4">
                {TESTIMONIALS.map((testimonial, index) => (
                  <CarouselItem key={index} className="basis-auto pt-4">
                    <Card className="rounded-[20px] bg-muted/50 transition-all duration-200">
                      <CardContent className="flex flex-col gap-4 p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="rounded-lg">
                              {testimonial.avatar && (
                                <AvatarImage
                                  src={testimonial.avatar}
                                  alt={testimonial.name}
                                />
                              )}
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {testimonial.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')
                                  .slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-foreground">
                                {testimonial.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {testimonial.role}
                              </span>
                            </div>
                          </div>
                          <Quote
                            className="h-5 w-5 shrink-0 fill-primary text-primary"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="text-sm leading-relaxed text-foreground">
                          « {testimonial.content} »
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-20 bg-gradient-to-t to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
