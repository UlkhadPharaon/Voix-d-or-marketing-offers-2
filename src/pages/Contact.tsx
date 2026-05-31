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
import { SEO } from '@/components/SEO';
import { PageTransition } from '@/components/PageTransition';

export function Contact() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    company: '',
    decisionMaker: '',
    phone: '',
    sector: '',
    city: '',
    socialLink: '',
    manager: '',
    offer: '',
    coreProduct: '',
    networks: [] as string[],
    goal: '',
    discovery: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleNetworkChange = (network: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      networks: checked 
        ? [...prev.networks, network]
        : prev.networks.filter(n => n !== network)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Brief stratégique - Studio Voix d'Or 🚀

*[Étape 1. L'Entreprise]*
🏬 Établissement : ${formData.company}
👤 Décideur : ${formData.decisionMaker}
📍 Localisation : ${formData.city} (Secteur: ${formData.sector})
📱 WhatsApp : ${formData.phone}
🔗 Lien : ${formData.socialLink || 'Non fourni'}

*[Étape 2. La Situation]*
👨‍💻 Gestion actuelle : ${formData.manager}
💼 Offre intéressée : ${formData.offer}

*[Étape 3. Le Cœur du Réacteur]*
⭐ Produit/service phare : ${formData.coreProduct}
🎯 Réseaux ciblés : ${formData.networks.length > 0 ? formData.networks.join(', ') : 'Non spécifié'}
📈 Objectif (30j) : ${formData.goal}
🔍 Connu via : ${formData.discovery}

Merci !`;

    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/22644906629?text=${encodedMessage}`;
    
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <PageTransition className="min-h-screen bg-black-deep flex items-center justify-center pt-24 px-4 pb-12">
        <SEO title="Demande Envoyée" description="Votre demande a été envoyée avec succès." />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="w-24 h-24 bg-primary text-black-deep rounded-full flex items-center justify-center mx-auto mb-8 text-5xl">
            ✓
          </div>
          <h2 className="text-3xl font-heading font-bold text-white mb-4 uppercase tracking-[1px]">Brief Verrouillé.</h2>
          <p className="text-gray-300 mb-8 text-[15px] leading-relaxed">
            Votre demande est entre nos mains.<br/>
            Un membre de l'équipe vous contacte sur WhatsApp dans l'heure pour valider vos objectifs et planifier votre première semaine de production.
          </p>
          <Button onClick={() => window.location.href = '/'} variant="outline" className="text-white border-gray-700 hover:bg-gray-800">
            Retour à l'accueil
          </Button>
        </motion.div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-black-deep text-white pt-[100px] md:pt-[120px] pb-12 md:pb-24 border-t border-primary/20">
      <SEO 
        title="Démarrer votre projet | Studio Voix d'Or"
        description="Remplissez notre brief stratégique pour commencer à transformer l'image de votre marque sur les réseaux sociaux. Production en 48h."
      />
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8 md:mb-12 flex flex-col items-center">
          <div className="inline-flex self-center bg-primary/10 border border-primary text-primary px-[12px] py-[4px] font-bold text-[10px] tracking-[2px] uppercase mb-[24px]">
            Le Filtre
          </div>
          <h1 className="text-[28px] md:text-[48px] font-heading font-normal text-white mb-[16px] uppercase tracking-[1px] leading-tight">Configurez votre première semaine de contenu.</h1>
          <p className="text-gray-text text-[15px] max-w-[600px]">Ne nous dites pas ce que vous voulez comme vidéo. Dites-nous ce que vous voulez comme résultat. Remplissez ce brief. On s'occupe de la traduction visuelle.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            <span className={`text-[11px] font-bold uppercase tracking-[1px] ${step >= 1 ? 'text-primary' : 'text-gray-text'}`}>1. Établissement</span>
            <span className={`text-[11px] font-bold uppercase tracking-[1px] ${step >= 2 ? 'text-primary' : 'text-gray-text'}`}>2. Situation</span>
            <span className={`text-[11px] font-bold uppercase tracking-[1px] ${step >= 3 ? 'text-primary' : 'text-gray-text'}`}>3. Stratégie</span>
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
                    className="p-6 sm:p-8 md:p-12 space-y-6"
                  >
                    <h2 className="text-[18px] font-heading uppercase tracking-[1px] mb-6">Étape 1 : Vous & Votre Établissement</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Nom de l'établissement *</Label>
                        <Input required placeholder="Ex: Faso Restaurant" className="bg-black-deep border-white/10 text-white rounded-[2px]" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                        <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Votre prénom (le décideur) *</Label>
                        <Input required placeholder="Ex: Oumar Koné" className="bg-black-deep border-white/10 text-white rounded-[2px]" value={formData.decisionMaker} onChange={e => setFormData({...formData, decisionMaker: e.target.value})} />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Numéro WhatsApp *</Label>
                      <Input required placeholder="+226 XX XX XX XX" type="tel" className="bg-black-deep border-white/10 text-white rounded-[2px]" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Secteur *</Label>
                        <Select required value={formData.sector} onValueChange={val => setFormData({...formData, sector: val})}>
                          <SelectTrigger className="bg-black-deep border-white/10 rounded-[2px]">
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                          <SelectContent className="bg-dark-accent border-white/10">
                            <SelectItem value="Restauration">Restauration</SelectItem>
                            <SelectItem value="Bijouterie">Bijouterie</SelectItem>
                            <SelectItem value="Retail">Retail</SelectItem>
                            <SelectItem value="Autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Ville *</Label>
                        <Select required value={formData.city} onValueChange={val => setFormData({...formData, city: val})}>
                          <SelectTrigger className="bg-black-deep border-white/10 rounded-[2px]">
                            <SelectValue placeholder="Sélectionnez..." />
                          </SelectTrigger>
                          <SelectContent className="bg-dark-accent border-white/10">
                            <SelectItem value="Ouagadougou">Ouagadougou</SelectItem>
                            <SelectItem value="Bobo-Dioulasso">Bobo-Dioulasso</SelectItem>
                            <SelectItem value="Autre">Autre</SelectItem>
                            <SelectItem value="International">International</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Lien de votre page Instagram ou Facebook (Optionnel)</Label>
                      <Input placeholder="https://instagram.com/votre_page" className="bg-black-deep border-white/10 text-white rounded-[2px]" value={formData.socialLink} onChange={e => setFormData({...formData, socialLink: e.target.value})} />
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
                    className="p-6 sm:p-8 md:p-12 space-y-8"
                  >
                    <h2 className="text-[18px] font-heading uppercase tracking-[1px] mb-6">Étape 2 : Votre Situation</h2>
                    
                    <div className="space-y-3">
                      <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Qui gère vos publications actuellement ? *</Label>
                      <Select required value={formData.manager} onValueChange={val => setFormData({...formData, manager: val})}>
                        <SelectTrigger className="bg-black-deep border-white/10 rounded-[2px]">
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-accent border-white/10">
                          <SelectItem value="Moi-même">Moi-même</SelectItem>
                          <SelectItem value="Un CM junior">Un CM junior</SelectItem>
                          <SelectItem value="Personne">Personne</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4 pt-4">
                      <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Quelle offre vous intéresse le plus ? *</Label>
                      <RadioGroup required value={formData.offer} onValueChange={val => setFormData({...formData, offer: val})} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <RadioGroupItem value="Starter" id="pkg-starter" className="peer sr-only" />
                          <Label htmlFor="pkg-starter" className="flex flex-col items-center justify-between rounded-[2px] border border-white/10 bg-black-deep p-4 hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer text-center">
                            <span className="font-heading uppercase tracking-[1px] mb-1">Starter</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="Pro" id="pkg-pro" className="peer sr-only" />
                          <Label htmlFor="pkg-pro" className="flex flex-col items-center justify-between rounded-[2px] border border-white/10 bg-black-deep p-4 hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer text-center relative overflow-hidden">
                            <span className="font-heading uppercase tracking-[1px] mb-1 text-primary">Pro</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="Business" id="pkg-biz" className="peer sr-only" />
                          <Label htmlFor="pkg-biz" className="flex flex-col items-center justify-between rounded-[2px] border border-white/10 bg-black-deep p-4 hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer text-center">
                            <span className="font-heading uppercase tracking-[1px] mb-1">Business</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="Je ne sais pas encore" id="pkg-not-sure" className="peer sr-only" />
                          <Label htmlFor="pkg-not-sure" className="flex flex-col items-center justify-between rounded-[2px] border border-white/10 bg-black-deep p-4 hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer text-center">
                            <span className="font-heading uppercase tracking-[1px] mb-1">Je ne sais pas encore</span>
                          </Label>
                        </div>
                      </RadioGroup>
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
                    className="p-6 sm:p-8 md:p-12 space-y-6"
                  >
                    <h2 className="text-[18px] font-heading uppercase tracking-[1px] mb-6">Étape 3 : Le Cœur du Réacteur</h2>
                    
                    <div className="space-y-3">
                      <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Décrivez votre produit/service phare en 1 phrase : *</Label>
                      <Input required placeholder="Ex: Nos pizzas au feu de bois..." className="bg-black-deep border-white/10 text-white rounded-[2px]" value={formData.coreProduct} onChange={e => setFormData({...formData, coreProduct: e.target.value})} />
                    </div>

                    <div className="space-y-4 pt-4">
                      <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Sur quels réseaux voulez-vous cibler en priorité ? *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                        {['TikTok', 'Insta', 'WhatsApp', 'FB'].map(network => (
                          <div key={network} className="flex items-center space-x-2">
                            <Checkbox id={`net-${network}`} className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:text-black-deep" checked={formData.networks.includes(network)} onCheckedChange={(checked) => handleNetworkChange(network, checked as boolean)} />
                            <label htmlFor={`net-${network}`} className="text-[13px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-white tracking-[0.5px]">
                              {network}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Quel est l'objectif prioritaire de ces 30 prochains jours ? *</Label>
                      <Select required value={formData.goal} onValueChange={val => setFormData({...formData, goal: val})}>
                        <SelectTrigger className="bg-black-deep border-white/10 rounded-[2px]">
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-accent border-white/10">
                          <SelectItem value="Notoriété pure">Notoriété pure</SelectItem>
                          <SelectItem value="Conversion directe">Conversion directe</SelectItem>
                          <SelectItem value="Améliorer l'image">Améliorer l'image</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3 pt-4">
                      <Label className="uppercase text-[11px] text-gray-text tracking-[1px]">Comment avez-vous connu Studio Voix d'Or ?</Label>
                      <Input placeholder="Bouche à oreille, Instagram, etc." className="bg-black-deep border-white/10 text-white rounded-[2px]" value={formData.discovery} onChange={e => setFormData({...formData, discovery: e.target.value})} />
                    </div>

                    <div className="pt-6 flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep} className="border-white/10 text-white rounded-[2px] hover:bg-white/5 uppercase tracking-[1px] text-[12px] font-bold h-auto py-[12px]">
                        ← Retour
                      </Button>
                      <Button type="submit" className="bg-primary hover:bg-gold-accent text-black-deep font-bold px-[24px] uppercase tracking-[1px] text-[12px] rounded-[2px] h-auto py-[12px]">
                        Soumettre le Brief Stratégique
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
