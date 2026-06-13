const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/pages/Home.tsx',
  'src/pages/Portfolio.tsx',
  'src/pages/Contact.tsx',
  'src/pages/Securite.tsx',
  'src/components/ui/pricing-section-4.tsx',
  'src/components/ui/ecosystem-radar.tsx',
  'src/components/Layout.tsx'
];

const replacements = [
  [/L'Employé Virtuel Permanent à 50 000 FCFA\/mois/g, "Votre Assistant IA Permanent à 50 000 FCFA/mois"],
  [/L'Employé Virtuel Permanent/g, "Assistant IA Permanent"],
  [/Un employé classique au Burkina coûte 50 000 à 75 000 FCFA\/mois — et il dort\. Notre employé virtuel ne dort jamais et ne fait pas d'erreur\./g, "Une gestion manuelle est source de retards et pénalise votre Chiffre d'Affaires. Notre outil automatisé ne ferme jamais, allège votre charge et ne fait pas d'erreur."],
  [/Un employé classique au Burkina coûte 50 000 à 75 000 FCFA\/mo.*?\./g, "Une gestion manuelle est source de retards et pénalise votre Chiffre d'Affaires. Notre outil automatisé ne ferme jamais, allège votre charge et ne fait pas d'erreur."],
  [/employé virtuel/gi, "assistant IA"],
  [/Employé Virtuel/g, "Assistant IA"],
  [/votre premier collaborateur virtuel/gi, "votre outil automatisé IA"],
  [/collaborateur virtuel/gi, "assistant IA"],
  [/L'Employé de Base/g, "L'Assistant Standard"],
  [/l'Employé de Base/g, "l'Assistant Standard"],
  [/L'Employé Commercial/g, "L'Assistant Commercial"],
  [/l'Employé Commercial/g, "l'Assistant Commercial"],
  [/Moins cher qu'un stagiaire\. Il travaille 24h\/24/g, "Un outil indispensable pour augmenter votre productivité. Il fonctionne 24h/24"],
  [/Moins cher qu'un stagiaire/g, "Optimisez la productivité de votre équipe"],
  [/il y a un employé parfait pour vous/g, "il y a un assistant conçu pour vous"],
  [/Le Radar de L'Employé Virtuel/g, "Le Radar de l'Assistant IA"],
  [/Le Radar de l'Assistant IA Virtuel/g, "Le Radar de l'Assistant IA"],
  [/des employés virtuels/g, "des assistants IA"],
  [/employés virtuels/g, "assistants IA"],
  [/Employés Virtuels/g, "Assistants IA"],
  [/Recrutez un/g, "Adoptez un"],
  [/Votre premier employé virtuel/g, "Votre assistant IA"],
  [/le travail d'un employé/g, "vos tâches chronophages"]
];

for (const file of filesToUpdate) {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [regex, replacement] of replacements) {
    content = content.replace(regex, replacement);
  }
  fs.writeFileSync(filePath, content);
  console.log('Updated ' + file);
}
