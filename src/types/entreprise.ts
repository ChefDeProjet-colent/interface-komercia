// Interface conforme aux spécifications
export interface ContactPrincipal {
  nom: string;
  poste: string;
  email: string;
  telephone: string;
  code_pays?: string; // Code indicatif du pays
}

export interface AutreContact {
  nom: string;
  poste: string;
  email: string;
  telephone?: string;
  code_pays?: string; // Code indicatif du pays
}

export interface SecteurActivite {
  libelle: string;
  description?: string;
}

// Informations de pays avec code indicatif et drapeau
export interface PaysInfo {
  nom: string;
  code: string; // Code ISO
  indicatif: string; // Code téléphonique
  flag: string; // Emoji drapeau
}

export interface Entreprise {
  // Informations générales
  nom: string; // obligatoire
  logo?: string; // optionnel
  rccm?: File | string; // Document RCCM (file)
  nif?: string; // Numéro d'Identification Fiscale
  nif_document?: File | string; // Document NIF (file)
  secteur_activite: string; // obligatoire - Menu déroulante
  taille: "Micro (1-10 employés)" | "Petite (11-50)" | "Moyenne (51-250)" | "Grande (250+)"; // obligatoire
  
  // Localisation avec listes déroulantes
  pays: string; // obligatoire - Liste déroulante
  ville: string; // obligatoire - Liste déroulante
  localisation_principale: string; // obligatoire
  zones_operation?: string[]; // optionnel - Liste de régions ou pays
  
  // Contact téléphonique de l'entreprise
  telephone_entreprise?: string; // Téléphone principal de l'entreprise
  code_pays_entreprise?: string; // Code indicatif pour le téléphone de l'entreprise
  
  // Contacts principaux
  contact_principal: ContactPrincipal; // obligatoire
  autres_contacts?: AutreContact[]; // optionnel
  
  // Produits et services
  produits_services_principaux: string[]; // obligatoire - Liste de produits/services
  description_produits_services?: string; // optionnel
  prix_indicatifs?: string; // optionnel
  
  // Champs système (ne pas tenir compte)
  id?: number;
  code?: string;
  email?: string;
  nombre_employes?: number;
  chiffre_affaire?: number;
  description?: string;
  representant?: string;
  contact?: string;
  region?: string;
  besoins_commerciaux?: string;
  completion_profile?: boolean;
  is_validated?: boolean;
  created_at?: string;
  updated_at?: string;
  
  // Secteurs d'activité personnalisés
  secteurs_activite_personnalises?: SecteurActivite[];
}

export interface Produit {
  libelle: string; // obligatoire
  categorie?: string; // Ajouté pour conformité
  description?: string; // optionnel
  prix?: number; // optionnel (prix indicatif)
  images: File[];
  status: 'active' | 'inactive';
  
  // Champs système (ne pas tenir compte)
  // id?: number;
  // categorie_id?: number;
  // created_by_id?: number;
  // created_at?: string;
  // updated_at?: string;
}

// Liste des secteurs d'activité disponibles
export const SECTEURS_ACTIVITE = [
  'Technologie',
  'Agroalimentaire',
  'Santé',
  'Finance',
  'Commerce',
  'Services',
  'Industrie',
  'Construction',
  'Transport',
  'Éducation',
  'Tourisme',
  'Immobilier',
  'Énergie',
  'Télécommunications',
  'Autre'
];

// Liste des tailles d'entreprise
export const TAILLES_ENTREPRISE = [
  "Micro (1-10 employés)",
  "Petite (11-50)",
  "Moyenne (51-250)",
  "Grande (250+)"
] as const;

// Liste des pays africains avec codes indicatifs
export const PAYS_AFRIQUE: PaysInfo[] = [
  { nom: 'Côte d\'Ivoire', code: 'CI', indicatif: '+225', flag: '🇨🇮' },
  { nom: 'Sénégal', code: 'SN', indicatif: '+221', flag: '🇸🇳' },
  { nom: 'Mali', code: 'ML', indicatif: '+223', flag: '🇲🇱' },
  { nom: 'Burkina Faso', code: 'BF', indicatif: '+226', flag: '🇧🇫' },
  { nom: 'Bénin', code: 'BJ', indicatif: '+229', flag: '🇧🇯' },
  { nom: 'Togo', code: 'TG', indicatif: '+228', flag: '🇹🇬' },
  { nom: 'Niger', code: 'NE', indicatif: '+227', flag: '🇳🇪' },
  { nom: 'Guinée', code: 'GN', indicatif: '+224', flag: '🇬🇳' },
  { nom: 'Ghana', code: 'GH', indicatif: '+233', flag: '🇬🇭' },
  { nom: 'Nigeria', code: 'NG', indicatif: '+234', flag: '🇳🇬' },
  { nom: 'Cameroun', code: 'CM', indicatif: '+237', flag: '🇨🇲' },
  { nom: 'Gabon', code: 'GA', indicatif: '+241', flag: '🇬🇦' },
  { nom: 'Congo', code: 'CG', indicatif: '+242', flag: '🇨🇬' },
  { nom: 'RD Congo', code: 'CD', indicatif: '+243', flag: '🇨🇩' },
  { nom: 'Maroc', code: 'MA', indicatif: '+212', flag: '🇲🇦' },
  { nom: 'Algérie', code: 'DZ', indicatif: '+213', flag: '🇩🇿' },
  { nom: 'Tunisie', code: 'TN', indicatif: '+216', flag: '🇹🇳' },
  { nom: 'Égypte', code: 'EG', indicatif: '+20', flag: '🇪🇬' },
  { nom: 'Afrique du Sud', code: 'ZA', indicatif: '+27', flag: '🇿🇦' },
  { nom: 'Kenya', code: 'KE', indicatif: '+254', flag: '🇰🇪' },
  { nom: 'Tanzanie', code: 'TZ', indicatif: '+255', flag: '🇹🇿' },
  { nom: 'Ouganda', code: 'UG', indicatif: '+256', flag: '🇺🇬' },
  { nom: 'Rwanda', code: 'RW', indicatif: '+250', flag: '🇷🇼' },
  { nom: 'Éthiopie', code: 'ET', indicatif: '+251', flag: '🇪🇹' },
  { nom: 'Madagascar', code: 'MG', indicatif: '+261', flag: '🇲🇬' },
  { nom: 'Maurice', code: 'MU', indicatif: '+230', flag: '🇲🇺' },
];

// Villes par pays (principales villes)
export const VILLES_PAR_PAYS: Record<string, string[]> = {
  'Côte d\'Ivoire': ['Abidjan', 'Yamoussoukro', 'Bouaké', 'Daloa', 'San-Pédro', 'Korhogo', 'Man'],
  'Sénégal': ['Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor', 'Touba', 'Rufisque'],
  'Mali': ['Bamako', 'Sikasso', 'Mopti', 'Koutiala', 'Kayes', 'Ségou', 'Gao'],
  'Burkina Faso': ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou', 'Ouahigouya', 'Banfora', 'Dédougou'],
  'Bénin': ['Cotonou', 'Porto-Novo', 'Parakou', 'Djougou', 'Bohicon', 'Kandi', 'Abomey'],
  'Togo': ['Lomé', 'Sokodé', 'Kara', 'Atakpamé', 'Kpalimé', 'Dapaong', 'Tsévié'],
  'Niger': ['Niamey', 'Zinder', 'Maradi', 'Agadez', 'Tahoua', 'Dosso', 'Diffa'],
  'Guinée': ['Conakry', 'Nzérékoré', 'Kankan', 'Kindia', 'Labé', 'Mamou', 'Boké'],
  'Ghana': ['Accra', 'Kumasi', 'Tamale', 'Sekondi-Takoradi', 'Ashaiman', 'Sunyani', 'Cape Coast'],
  'Nigeria': ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Benin City', 'Kaduna'],
  'Cameroun': ['Yaoundé', 'Douala', 'Garoua', 'Bamenda', 'Bafoussam', 'Maroua', 'Ngaoundéré'],
  'Gabon': ['Libreville', 'Port-Gentil', 'Franceville', 'Oyem', 'Moanda', 'Mouila'],
  'Congo': ['Brazzaville', 'Pointe-Noire', 'Dolisie', 'Nkayi', 'Impfondo', 'Ouesso'],
  'RD Congo': ['Kinshasa', 'Lubumbashi', 'Mbuji-Mayi', 'Kananga', 'Kisangani', 'Goma', 'Bukavu'],
  'Maroc': ['Casablanca', 'Rabat', 'Fès', 'Marrakech', 'Agadir', 'Tanger', 'Meknès'],
  'Algérie': ['Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Sétif'],
  'Tunisie': ['Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte', 'Gabès', 'Ariana'],
  'Égypte': ['Le Caire', 'Alexandrie', 'Gizeh', 'Charm el-Cheikh', 'Louxor', 'Assouan', 'Port-Saïd'],
  'Afrique du Sud': ['Johannesburg', 'Le Cap', 'Durban', 'Pretoria', 'Port Elizabeth', 'Bloemfontein'],
  'Kenya': ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi'],
  'Tanzanie': ['Dar es Salaam', 'Dodoma', 'Mwanza', 'Arusha', 'Mbeya', 'Zanzibar', 'Tanga'],
  'Ouganda': ['Kampala', 'Gulu', 'Lira', 'Mbarara', 'Jinja', 'Mbale', 'Mukono'],
  'Rwanda': ['Kigali', 'Butare', 'Gitarama', 'Ruhengeri', 'Gisenyi', 'Byumba'],
  'Éthiopie': ['Addis-Abeba', 'Dire Dawa', 'Mekele', 'Gondar', 'Awasa', 'Bahir Dar', 'Dessie'],
  'Madagascar': ['Antananarivo', 'Toamasina', 'Antsirabe', 'Mahajanga', 'Fianarantsoa', 'Toliara'],
  'Maurice': ['Port-Louis', 'Beau Bassin-Rose Hill', 'Vacoas-Phoenix', 'Curepipe', 'Quatre Bornes'],
};

// ============================================
// INTERFACES POUR RECRUTEMENT DE COMMERCIAUX
// ============================================

// Types de rémunération
export type TypeRemuneration = 'Fixe' | 'Commission' | 'Fixe+Commission';

export interface RemunerationDetails {
  type: TypeRemuneration;
  montant_fixe?: number; // Si type = 'Fixe' ou 'Fixe+Commission'
  taux_commission?: number; // Si type = 'Commission' ou 'Fixe+Commission' (en %)
}

export interface OffreRecrutement {
  id?: string;
  
  // Section 1: Informations Générales sur le Recrutement
  titre: string; // obligatoire
  description: string; // obligatoire
  type_contrat: 'CDI' | 'CDD' | 'Freelance' | 'Temps partiel'; // obligatoire
  duree_contrat?: string; // optionnel - Ex: "6 mois renouvelables"
  remuneration?: RemunerationDetails; // optionnel - Structure détaillée
  
  // Section 2: Critères de Recrutement
  experience_requise: string; // obligatoire - Ex: "3 ans minimum en prospection B2B"
  competences_recherchees: string[]; // obligatoire - Liste de mots-clés
  langues_requises?: string[]; // optionnel - Ex: ["Français", "Anglais"]
  disponibilite?: 'Immédiate' | 'Sous 1 mois' | 'Flexible'; // optionnel
  mobilite_geographique?: 'Locale' | 'Régionale' | 'Internationale'; // optionnel
  
  // Section 3: Détails sur la Mission
  objectifs_vente: string; // obligatoire - Ex: "Atteindre un CA de 50 000 $ en 6 mois"
  zone_intervention: string[]; // obligatoire - Liste des pays (choix multiple)
  produits_services_promouvoir: string[]; // obligatoire - Liste des produits/services de l'entreprise (choix multiple)
  support_fourni?: string; // optionnel - Ex: "Formation initiale, outils CRM, base prospects"
  
  // Section 4: Gestion des Candidatures
  nombre_postes: number; // obligatoire
  statut: 'Ouverte' | 'Fermée' | 'En cours de traitement'; // obligatoire
  
  // Section 5: Suivi et Analyse (calculés automatiquement)
  nombre_vues?: number;
  nombre_candidatures?: number;
  taux_conversion?: number;
  
  // Métadonnées
  date_creation?: string;
  date_limite?: string;
  entreprise_id?: string;
}

export interface CandidatureCommercial {
  id?: string;
  offre_id: string;
  
  // Informations du candidat
  nom_candidat: string;
  email: string;
  telephone: string;
  code_pays?: string;
  
  // Expérience et compétences
  competences_principales: string[];
  experience: string; // Ex: "5 ans en prospection B2B"
  cv?: File | string;
  lettre_motivation?: string;
  
  // Statut de la candidature
  statut: 'En attente' | 'En cours d\'évaluation' | 'Acceptée' | 'Rejetée';
  date_candidature: string;
  
  // Notes et actions
  notes?: string;
  entretien_planifie?: {
    date: string;
    heure: string;
    lieu: string;
  };
}

// Constantes pour les listes déroulantes
export const TYPES_CONTRAT = ['CDI', 'CDD', 'Freelance', 'Temps partiel'] as const;

export const TYPES_REMUNERATION: TypeRemuneration[] = ['Fixe', 'Commission', 'Fixe+Commission'];

export const DISPONIBILITES = ['Immédiate', 'Sous 1 mois', 'Flexible'] as const;

export const MOBILITES = ['Locale', 'Régionale', 'Internationale'] as const;

export const STATUTS_OFFRE = ['Ouverte', 'Fermée', 'En cours de traitement'] as const;

export const STATUTS_CANDIDATURE = [
  'En attente',
  'En cours d\'évaluation',
  'Acceptée',
  'Rejetée'
] as const;

export const COMPETENCES_SUGGESTIONS = [
  'Négociation',
  'Prospection',
  'CRM',
  'Closing',
  'Vente B2B',
  'Vente B2C',
  'Gestion de la relation client',
  'Développement commercial',
  'Marketing digital',
  'Réseautage',
  'Présentation commerciale',
  'Analyse de marché',
  'Gestion de pipeline',
  'Cold calling',
  'Lead generation',
  'Account management',
  'Vente consultative',
  'Cross-selling',
  'Up-selling',
  'Fidélisation client'
];

export const LANGUES_DISPONIBLES = [
  'Français',
  'Anglais',
  'Arabe',
  'Espagnol',
  'Portugais',
  'Allemand',
  'Chinois',
  'Swahili',
  'Wolof',
  'Bambara',
  'Lingala'
];
