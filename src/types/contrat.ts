// ============================================
// INTERFACES POUR GESTION DES CONTRATS
// ============================================

export interface Clause {
  id?: string;
  description: string;
}

export interface EcheancePaiement {
  id?: string;
  date: string;
  montant: number;
  statut?: 'En attente' | 'Payé' | 'En retard';
}

export interface ObjectifContrat {
  id?: string;
  description: string;
  atteint: boolean;
  date_realisation?: string;
}

export interface ModificationContrat {
  id?: string;
  date: string;
  auteur: string;
  description: string;
  champs_modifies: string[];
}

export interface Contrat {
  id?: string;
  
  // Section 1: Informations Générales sur le Contrat
  titre: string; // obligatoire - Ex: "Contrat de prestation avec John Doe"
  type_contrat: 'Prestation de service' | 'Contrat de vente' | 'Contrat de partenariat'; // obligatoire
  
  // Parties impliquées
  nom_entreprise: string; // obligatoire
  nom_commercial_client: string; // obligatoire - Nom du commercial ou client
  email_commercial?: string;
  telephone_commercial?: string;
  code_pays_commercial?: string;
  
  date_debut: string; // obligatoire
  date_fin?: string; // optionnel
  statut: 'En cours' | 'Terminé' | 'Résilié' | 'En attente de signature'; // obligatoire
  
  // Section 2: Détails du Contrat
  objet_contrat: string; // obligatoire - Ex: "Prestation de services de prospection commerciale"
  clauses_principales: Clause[]; // obligatoire - Liste des clauses
  montant_contrat?: number; // optionnel
  mode_paiement?: 'Virement bancaire' | 'Mobile Money' | 'Chèque'; // optionnel
  echeances_paiement?: EcheancePaiement[]; // optionnel - Liste des échéances
  
  // Section 3: Suivi et Gestion des Contrats
  progression?: number; // Pourcentage 0-100
  objectifs?: ObjectifContrat[]; // Liste des objectifs
  
  // Notifications et rappels (gérés automatiquement)
  notifications_actives?: boolean;
  
  // Documents associés
  documents?: (File | string)[]; // PDF, Word, etc.
  
  // Section 4: Historique et Modifications
  historique_modifications?: ModificationContrat[];
  commentaires_internes?: string;
  
  // Section 5: Résiliation et Clôture
  motif_resiliation?: string;
  date_resiliation?: string;
  statut_final?: 'Terminé avec succès' | 'Résilié' | 'Non conclu';
  
  // Métadonnées
  date_creation?: string;
  created_by?: string;
  entreprise_id?: string;
}

// Constantes pour les listes déroulantes
export const TYPES_CONTRAT_GESTION = [
  'Prestation de service',
  'Contrat de vente',
  'Contrat de partenariat'
] as const;

export const STATUTS_CONTRAT = [
  'En cours',
  'Terminé',
  'Résilié',
  'En attente de signature'
] as const;

export const MODES_PAIEMENT = [
  'Virement bancaire',
  'Mobile Money',
  'Chèque'
] as const;

export const STATUTS_FINAUX = [
  'Terminé avec succès',
  'Résilié',
  'Non conclu'
] as const;

export const STATUTS_ECHEANCE = [
  'En attente',
  'Payé',
  'En retard'
] as const;
