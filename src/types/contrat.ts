export interface Contrat {
  id: string;
  titreContrat: string;
  typeContrat: 'prestation-service' | 'contrat-vente' | 'contrat-partenariat';
  
  // Parties impliquées
  nomEntreprise: string;
  nomCommercialClient: string;
  
  // Dates
  dateDebut: string;
  dateFin?: string;
  statutContrat: 'en-cours' | 'termine' | 'resilie' | 'attente-signature';
  
  // Détails
  objetContrat: string;
  clausesPrincipales: string[];
  montantContrat?: number;
  modePaiement?: 'virement-bancaire' | 'mobile-money' | 'cheque';
  echeancesPaiement?: {
    date: string;
    montant: number;
    statut: 'paye' | 'en-attente' | 'en-retard';
  }[];
  
  // Suivi
  progression: number;
  objectifsAtteints: string[];
  
  // Documents
  documentsAssocies: {
    nom: string;
    url: string;
    type: string;
    dateAjout: string;
  }[];
  
  // Historique
  historique: {
    date: string;
    champModifie: string;
    ancienneValeur: string;
    nouvelleValeur: string;
    auteur: string;
  }[];
  
  // Commentaires
  commentairesInternes: string;
  
  // Résiliation
  motifResiliation?: string;
  dateResiliation?: string;
  statutFinal?: 'termine-succes' | 'resilie' | 'non-conclu';
  
  // Métadonnées
  dateCreation: string;
  derniereMiseAJour: string;
}
