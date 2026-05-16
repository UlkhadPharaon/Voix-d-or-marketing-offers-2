import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function Contact() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission to WhatsApp logic here
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black-deep flex items-center justify-center pt-24 px-4 pb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="w-24 h-24 bg-primary text-black-deep rounded-full flex items-center justify-center mx-auto mb-8 text-5xl">
            ✓
          </div>
          <h2 className="text-4xl font-heading font-bold text-white mb-4">Demande reçue !</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Notre équipe analyse vos besoins et vous recontactera sur WhatsApp sous 1 heure.
          </p>
          <Button onClick={() => window.location.href = '/'} variant="outline" className="text-white border-gray-700 hover:bg-gray-800">
            Retour à l'accueil
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black-deep text-white pt-[120px] pb-24 border-t border-primary/20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="inline-flex self-center bg-primary/10 border border-primary text-primary px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
            Espace Créateur
          </div>
          <h1 className="text-[40px] md:text-[48px] font-heading font-normal text-white mb-[16px] uppercase tracking-[1px]">Démarrer votre projet</h1>
          <p className="text-gray-text text-[15px] max-w-[500px]">Configurez votre abonnement et recevez votre devis personnalisé.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            <span className={`text-[11px] font-bold uppercase tracking-[1px] ${step >= 1 ? 'text-primary' : 'text-gray-text'}`}>1. Entreprise</span>
            <span className={`text-[11px] font-bold uppercase tracking-[1px] ${step >= 2 ? 'text-primary' : 'text-gray-text'}`}>2. Besoin</span>
            <span className={`text-[11px] font-bold uppercase tracking-[1px] ${step >= 3 ? 'text-primary' : 'text-gray-text'}`}>3. Brief</span>
          </div>
          <div className="h-[2px] bg-white/10 flex overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
        </div>

        <Card className="bg-dark-accent border border-white/10 rounded-[4px] overflow-hidden">
          <CardContent className="p-0">
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-8 md:p-12 space-y-6"
                  >
                    <h2 className="text-[18px] font-heading uppercase tracking-[1px] mb-6">Parlez-nous de vous</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Nom de l'entreprise *</Label>
                        <Input required placeholder="Ex: Faso Tech" className="bg-black-deep border-white/10 text-white rounded-[2px]" />
                      </div>
                      <div className="space-y-3">
                        <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Votre prénom *</Label>
                        <Input required placeholder="Ex: Oumar" className="bg-black-deep border-white/10 text-white rounded-[2px]" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Votre numéro WhatsApp *</Label>
                      <Input required placeholder="+226 XX XX XX XX" type="tel" className="bg-black-deep border-white/10 text-white rounded-[2px]" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Secteur d'activité *</Label>
                        <Select required>
                          <SelectTrigger className="bg-black-deep border-white/10 rounded-[2px]">
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                          <SelectContent className="bg-dark-accent border-white/10">
                            <SelectItem value="commerce">E-commerce / Boutique</SelectItem>
                            <SelectItem value="sante">Santé / Beauté</SelectItem>
                            <SelectItem value="education">Éducation / Formation</SelectItem>
                            <SelectItem value="services">Services B2B</SelectItem>
                            <SelectItem value="restauration">Restauration</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Ville *</Label>
                        <Select required>
                          <SelectTrigger className="bg-black-deep border-white/10 rounded-[2px]">
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                          <SelectContent className="bg-dark-accent border-white/10">
                            <SelectItem value="ouaga">Ouagadougou</SelectItem>
                            <SelectItem value="bobo">Bobo-Dioulasso</SelectItem>
                            <SelectItem value="autre">Autre (Burkina Faso)</SelectItem>
                            <SelectItem value="international">International</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                      <Button type="button" onClick={nextStep} className="bg-primary text-black-deep rounded-[2px] hover:bg-gold-accent font-bold uppercase tracking-[1px] text-[12px] h-auto py-[12px] px-[24px]">
                        Suivant →
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-8 md:p-12 space-y-8"
                  >
                    <h2 className="text-[18px] font-heading uppercase tracking-[1px] mb-6">Votre besoin vidéo</h2>
                    
                    <div className="space-y-4">
                      <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Offre qui vous intéresse</Label>
                      <RadioGroup defaultValue="pro" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <RadioGroupItem value="basic" id="pkg-basic" className="peer sr-only" />
                          <Label htmlFor="pkg-basic" className="flex flex-col items-center justify-between rounded-[2px] border border-white/10 bg-black-deep p-4 hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer text-center">
                            <span className="font-heading uppercase tracking-[1px] mb-1">BASIC</span>
                            <span className="text-[11px] text-gray-text">20 vidéos/mois</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="pro" id="pkg-pro" className="peer sr-only" />
                          <Label htmlFor="pkg-pro" className="flex flex-col items-center justify-between rounded-[2px] border border-white/10 bg-black-deep p-4 hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer text-center relative overflow-hidden">
                            <span className="absolute top-0 right-0 bg-primary w-2 h-2 rounded-full m-2"></span>
                            <span className="font-heading uppercase tracking-[1px] mb-1 text-primary">PRO</span>
                            <span className="text-[11px] text-gray-text">28 vidéos/mois</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="business" id="pkg-biz" className="peer sr-only" />
                          <Label htmlFor="pkg-biz" className="flex flex-col items-center justify-between rounded-[2px] border border-white/10 bg-black-deep p-4 hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer text-center">
                            <span className="font-heading uppercase tracking-[1px] mb-1">BUSINESS</span>
                            <span className="text-[11px] text-gray-text">84 vidéos/mois</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-6 pt-4">
                      <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Réseaux cibles (Plusieurs choix possibles)</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['TikTok', 'Instagram Reels', 'Facebook', 'YouTube Shorts', 'WhatsApp Status'].map(network => (
                          <div key={network} className="flex items-center space-x-2">
                            <Checkbox id={`net-${network}`} className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:text-black-deep" />
                            <label htmlFor={`net-${network}`} className="text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-white">
                              {network}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Objectif principal</Label>
                      <Select required>
                        <SelectTrigger className="bg-black-deep border-white/10 rounded-[2px]">
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-accent border-white/10">
                          <SelectItem value="ventes">Générer des ventes (Direct-response)</SelectItem>
                          <SelectItem value="notoriete">Améliorer la notoriété de marque</SelectItem>
                          <SelectItem value="engagement">Créer une communauté / Engagement</SelectItem>
                          <SelectItem value="recrutement">Recrutement / Marque employeur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-6 flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep} className="border-white/10 text-white rounded-[2px] hover:bg-white/5 uppercase tracking-[1px] text-[12px] font-bold h-auto py-[12px]">
                        ← Retour
                      </Button>
                      <Button type="button" onClick={nextStep} className="bg-primary text-black-deep rounded-[2px] hover:bg-gold-accent uppercase tracking-[1px] text-[12px] font-bold h-auto py-[12px] px-[24px]">
                        Suivant →
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-8 md:p-12 space-y-6"
                  >
                    <h2 className="text-[18px] font-heading uppercase tracking-[1px] mb-6">Le brief initial</h2>
                    
                    <div className="space-y-3">
                      <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Décrivez votre produit, service ou marque en quelques phrases *</Label>
                      <Textarea required placeholder="Ex: Nous vendons des produits de beauté bio pour femmes..." className="h-32 bg-black-deep border-white/10 rounded-[2px]" />
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Avez-vous des exemples de vidéos que vous aimez ? (Optionnel)</Label>
                      <Input placeholder="Lien Instagram, TikTok..." className="bg-black-deep border-white/10 rounded-[2px]" />
                    </div>

                    <div className="space-y-3">
                      <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Comment avez-vous connu Studio Voix d'Or ?</Label>
                      <Select>
                        <SelectTrigger className="bg-black-deep border-white/10 rounded-[2px]">
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-accent border-white/10">
                          <SelectItem value="fb">Publicité Facebook / Instagram</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                          <SelectItem value="reco">Recommandation</SelectItem>
                          <SelectItem value="google">Recherche Google</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-6 flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep} className="border-white/10 text-white rounded-[2px] hover:bg-white/5 uppercase tracking-[1px] text-[12px] font-bold h-auto py-[12px]">
                        ← Retour
                      </Button>
                      <Button type="submit" className="bg-primary hover:bg-gold-accent text-black-deep font-bold px-[24px] uppercase tracking-[1px] text-[12px] rounded-[2px] h-auto py-[12px]">
                        Recevoir mon devis
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
