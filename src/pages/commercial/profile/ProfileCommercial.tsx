// ==================== PARTIE 1/3 ====================
// Copiez cette partie et les deux suivantes ensemble

import { useState } from 'react';
import Sidebar from '../../../components/feature/Sidebar';

// Types
interface Notifications {
  nouveauxLeads: boolean;
  rappelsTaches: boolean;
  messages: boolean;
}

interface Competence {
  nom: string;
  niveau: number;
  annees: number;
  realisation: string;
  categorie: string;
}

interface Reference {
  nom: string;
  entreprise: string;
  contact: string;
}

interface DonneesFormulaire {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  photoProfile: File | null;
  secteur: string;
  experience: string;
  langues: string[];
  competences: Competence[];
  disponibilite: string;
  horaireTravail: string;
  linkedin: string;
  twitter: string;
  references: Reference[];
  visibiliteProfile: string;
  notifications: Notifications;
}

// Composant Sidebar

export default function CommercialProfilePage() {
  const [donneesFormulaire, setDonneesFormulaire] = useState<DonneesFormulaire>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    photoProfile: null,
    secteur: '',
    experience: '',
    langues: [],
    competences: [],
    disponibilite: 'Disponible',
    horaireTravail: '',
    linkedin: '',
    twitter: '',
    references: [],
    visibiliteProfile: 'Public',
    notifications: {
      nouveauxLeads: true,
      rappelsTaches: true,
      messages: true
    }
  });

  const [competenceActuelle, setCompetenceActuelle] = useState<Competence>({
    nom: '',
    niveau: 3,
    annees: 0,
    realisation: '',
    categorie: 'Vente et Prospection'
  });

  const [referenceActuelle, setReferenceActuelle] = useState<Reference>({
    nom: '',
    entreprise: '',
    contact: ''
  });

  const secteurs: string[] = [
    'Technologie',
    'Agroalimentaire',
    'Santé',
    'Finance',
    'Immobilier',
    'E-commerce',
    'Services',
    'Industrie',
    'Éducation',
    'Tourisme'
  ];

  const languesDisponibles: string[] = [
    'Français',
    'Anglais',
    'Espagnol',
    'Allemand',
    'Arabe',
    'Chinois',
    'Italien',
    'Portugais'
  ];

  const categoriesCompetences: string[] = [
    'Vente et Prospection',
    'Relation Client',
    'Techniques',
    'Sectorielles',
    'Formation et Leadership'
  ];

  const competencesSuggeres: Record<string, string[]> = {
    'Vente et Prospection': ['Négociation', 'Prospection', 'Closing', 'Lead Qualification', 'Cold Calling'],
    'Relation Client': ['CRM', 'Fidélisation client', 'Gestion des réclamations', 'Service client', 'Account Management'],
    'Techniques': ['Analyse de données', 'Marketing digital', 'E-commerce', 'SEO/SEM', 'Social Selling'],
    'Sectorielles': ['Connaissance sectorielle', 'Réglementation', 'Veille concurrentielle', 'Expertise produit'],
    'Formation et Leadership': ['Formation d\'équipe', 'Leadership', 'Coaching', 'Mentorat', 'Gestion de projet']
  };

  const gererChangementChamp = <K extends keyof DonneesFormulaire>(
    champ: K,
    valeur: DonneesFormulaire[K]
  ): void => {
    setDonneesFormulaire(prev => ({ ...prev, [champ]: valeur }));
  };

  const basculerLangue = (langue: string): void => {
    setDonneesFormulaire(prev => ({
      ...prev,
      langues: prev.langues.includes(langue)
        ? prev.langues.filter(l => l !== langue)
        : [...prev.langues, langue]
    }));
  };

  const ajouterCompetence = (): void => {
    if (competenceActuelle.nom.trim()) {
      setDonneesFormulaire(prev => ({
        ...prev,
        competences: [...prev.competences, { ...competenceActuelle }]
      }));
      setCompetenceActuelle({
        nom: '',
        niveau: 3,
        annees: 0,
        realisation: '',
        categorie: 'Vente et Prospection'
      });
    }
  };

  const supprimerCompetence = (index: number): void => {
    setDonneesFormulaire(prev => ({
      ...prev,
      competences: prev.competences.filter((_, i) => i !== index)
    }));
  };

  const ajouterReference = (): void => {
    if (referenceActuelle.nom.trim() && referenceActuelle.entreprise.trim()) {
      setDonneesFormulaire(prev => ({
        ...prev,
        references: [...prev.references, { ...referenceActuelle }]
      }));
      setReferenceActuelle({ nom: '', entreprise: '', contact: '' });
    }
  };

  const supprimerReference = (index: number): void => {
    setDonneesFormulaire(prev => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index)
    }));
  };

  const gererSoumission = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Données du profil:', donneesFormulaire);
  };

  const obtenirLibelleNiveau = (niveau: number): string => {
    const libelles: string[] = ['Débutant', 'Intermédiaire', 'Confirmé', 'Avancé', 'Expert'];
    return libelles[niveau - 1] || 'Intermédiaire';
  };

  const obtenirCompetencesParCategorie = (): Record<string, Competence[]> => {
    const groupes: Record<string, Competence[]> = {};
    donneesFormulaire.competences.forEach(competence => {
      if (!groupes[competence.categorie]) {
        groupes[competence.categorie] = [];
      }
      groupes[competence.categorie].push(competence);
    });
    return groupes;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="commercial" />
      
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Mon Profil</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Complétez votre profil pour améliorer votre visibilité</p>
              </div>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  gererSoumission(e as any);
                }}
                className="w-full sm:w-auto bg-teal-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <i className="ri-save-line text-lg"></i>
                <span className="text-sm sm:text-base">Enregistrer le profil</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <form onSubmit={gererSoumission} className="space-y-6">
            {/* Grid Layout - 2 colonnes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Colonne Gauche */}
              <div className="space-y-6">
                {/* Section 1: Informations Personnelles */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <i className="ri-user-line text-xl text-teal-600"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Informations Personnelles</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Photo de profil */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Photo de profil <span className="text-gray-400">(optionnel)</span>
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                          {donneesFormulaire.nom ? donneesFormulaire.nom.split(' ').map(n => n[0]).join('').toUpperCase() : 'JD'}
                        </div>
                        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap">
                          <i className="ri-upload-2-line"></i>
                          <span className="text-sm">Choisir une photo</span>
                          <input type="file" accept="image/*" className="hidden" />
                        </label>
                      </div>
                    </div>

                    {/* Nom  */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom  <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={donneesFormulaire.nom}
                        onChange={(e) => gererChangementChamp('nom', e.target.value)}
                        placeholder="Ex: Diallo"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>
                    {/* Prenom  */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prenom  <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={donneesFormulaire.prenom}
                        onChange={(e) => gererChangementChamp('prenom', e.target.value)}
                        placeholder="Ex: Elhadj lama"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email professionnel <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={donneesFormulaire.email}
                        onChange={(e) => gererChangementChamp('email', e.target.value)}
                        placeholder="elama@email.com"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Téléphone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={donneesFormulaire.telephone}
                        onChange={(e) => gererChangementChamp('telephone', e.target.value)}
                        placeholder="+225 07 123 4567"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Adresse */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse <span className="text-gray-400">(optionnel)</span>
                      </label>
                      <input
                        type="text"
                        value={donneesFormulaire.adresse}
                        onChange={(e) => gererChangementChamp('adresse', e.target.value)}
                        placeholder="Abidjan, Côte d'Ivoire"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Disponibilités */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className="ri-calendar-check-line text-xl text-green-600"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Disponibilités</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Statut */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Statut de disponibilité <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2">
                        {['Disponible', 'Occupé', 'En congé'].map((statut) => (
                          <label key={statut} className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="radio"
                              name="disponibilite"
                              value={statut}
                              checked={donneesFormulaire.disponibilite === statut}
                              onChange={(e) => gererChangementChamp('disponibilite', e.target.value)}
                              className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900">{statut}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Horaires */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Horaires de travail <span className="text-gray-400">(optionnel)</span>
                      </label>
                      <input
                        type="text"
                        value={donneesFormulaire.horaireTravail}
                        onChange={(e) => gererChangementChamp('horaireTravail', e.target.value)}
                        placeholder="Ex: Lundi-Vendredi, 9h-18h"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 5: Réseaux et Références */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="ri-links-line text-xl text-blue-600"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Réseaux et Références</h2>
                  </div>

                  <div className="space-y-4">
                    {/* LinkedIn */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn <span className="text-gray-400">(optionnel)</span>
                      </label>
                      <input
                        type="url"
                        value={donneesFormulaire.linkedin}
                        onChange={(e) => gererChangementChamp('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Twitter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Twitter <span className="text-gray-400">(optionnel)</span>
                      </label>
                      <input
                        type="url"
                        value={donneesFormulaire.twitter}
                        onChange={(e) => gererChangementChamp('twitter', e.target.value)}
                        placeholder="https://twitter.com/..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Références */}
                    <div>
                      {/* <label className="block text-sm font-medium text-gray-700 mb-3">
                        Références professionnelles <span className="text-gray-400">(optionnel)</span>
                      </label> */}
                      
{/*                    
                      {donneesFormulaire.references.length > 0 && (
                        <div className="space-y-2 mb-3">
                          {donneesFormulaire.references.map((ref, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm">{ref.nom}</p>
                                <p className="text-xs text-gray-600">{ref.entreprise}</p>
                                <p className="text-xs text-gray-500">{ref.contact}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => supprimerReference(index)}
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <i className="ri-close-line text-lg"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      )} */}

                      {/* Formulaire d'ajout */}
                      {/* <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                        <input
                          type="text"
                          value={referenceActuelle.nom}
                          onChange={(e) => setReferenceActuelle(prev => ({ ...prev, nom: e.target.value }))}
                          placeholder="Nom de la référence"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <input
                          type="text"
                          value={referenceActuelle.entreprise}
                          onChange={(e) => setReferenceActuelle(prev => ({ ...prev, entreprise: e.target.value }))}
                          placeholder="Entreprise"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <input
                          type="text"
                          value={referenceActuelle.contact}
                          onChange={(e) => setReferenceActuelle(prev => ({ ...prev, contact: e.target.value }))}
                          placeholder="Contact"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <button
                          type="button"
                          onClick={ajouterReference}
                          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                        >
                          + Ajouter une référence
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne Droite */}
              <div className="space-y-6">
                {/* Section 2: Informations Professionnelles */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="ri-briefcase-line text-xl text-purple-600"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Informations Professionnelles</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Secteur */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secteur d'activité <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={donneesFormulaire.secteur}
                        onChange={(e) => gererChangementChamp('secteur', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      >
                        <option value="">Sélectionnez un secteur</option>
                        {secteurs.map((secteur) => (
                          <option key={secteur} value={secteur}>{secteur}</option>
                        ))}
                      </select>
                    </div>

                    {/* Expérience */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expérience professionnelle <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={donneesFormulaire.experience}
                        onChange={(e) => gererChangementChamp('experience', e.target.value)}
                        placeholder="Ex: 5 ans d'expérience en vente B2B"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Langues */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Langues parlées <span className="text-gray-400">(optionnel)</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {languesDisponibles.map((langue) => (
                          <label key={langue} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={donneesFormulaire.langues.includes(langue)}
                              onChange={() => basculerLangue(langue)}
                              className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900">{langue}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* // ==================== FIN PARTIE 2/3 ==================== */}

                {/* Section 3: Compétences Clés */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <i className="ri-tools-line text-xl text-orange-600"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Compétences Clés</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Formulaire d'ajout de compétence */}
                    <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                        <select
                          value={competenceActuelle.categorie}
                          onChange={(e) => setCompetenceActuelle(prev => ({ ...prev, categorie: e.target.value, nom: '' }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          {categoriesCompetences.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Compétence</label>
                        <select
                          value={competenceActuelle.nom}
                          onChange={(e) => setCompetenceActuelle(prev => ({ ...prev, nom: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="">Sélectionnez une compétence</option>
                          {competencesSuggeres[competenceActuelle.categorie]?.map((comp) => (
                            <option key={comp} value={comp}>{comp}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Niveau de maîtrise: {obtenirLibelleNiveau(competenceActuelle.niveau)}
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={competenceActuelle.niveau}
                          onChange={(e) => setCompetenceActuelle(prev => ({ ...prev, niveau: parseInt(e.target.value) }))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Débutant</span>
                          <span>Expert</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Années d'expérience</label>
                        <input
                          type="number"
                          min="0"
                          value={competenceActuelle.annees}
                          onChange={(e) => setCompetenceActuelle(prev => ({ ...prev, annees: parseInt(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Réalisation associée</label>
                        <textarea
                          value={competenceActuelle.realisation}
                          onChange={(e) => setCompetenceActuelle(prev => ({ ...prev, realisation: e.target.value }))}
                          placeholder="Ex: Implémentation de Salesforce pour une équipe de 20 commerciaux"
                          rows={2}
                          maxLength={500}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={ajouterCompetence}
                        className="w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                      >
                        + Ajouter la compétence
                      </button>
                    </div>

                    {/* Liste des compétences par catégorie */}
                    {Object.entries(obtenirCompetencesParCategorie()).map(([categorie, competences]) => (
                      <div key={categorie} className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <i className="ri-folder-line text-teal-600"></i>
                          {categorie}
                        </h3>
                        <div className="space-y-2">
                          {competences.map((competence, index) => (
                            <div key={index} className="bg-white border border-gray-200 p-3 rounded-lg">
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-gray-900 text-sm">{competence.nom}</span>
                                    <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs rounded-full font-medium">
                                      {obtenirLibelleNiveau(competence.niveau)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-gray-600">
                                    <span className="flex items-center gap-1">
                                      <i className="ri-time-line"></i>
                                      {competence.annees} {competence.annees > 1 ? 'ans' : 'an'}
                                    </span>
                                  </div>
                                  {competence.realisation && (
                                    <p className="text-xs text-gray-600 mt-2 italic">{competence.realisation}</p>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => supprimerCompetence(donneesFormulaire.competences.findIndex(s => s === competence))}
                                  className="text-red-500 hover:text-red-700 p-1"
                                >
                                  <i className="ri-close-line text-lg"></i>
                                </button>
                              </div>
                              {/* Barre de progression */}
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-gradient-to-r from-teal-500 to-teal-600 h-1.5 rounded-full"
                                  style={{ width: `${(competence.niveau / 5) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {donneesFormulaire.competences.length === 0 && (
                      <div className="text-center py-8 text-gray-500 text-sm">
                        <i className="ri-information-line text-2xl mb-2"></i>
                        <p>Aucune compétence ajoutée pour le moment</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 6: Paramètres de Confidentialité */}
                {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <i className="ri-shield-user-line text-xl text-red-600"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Paramètres de Confidentialité</h2>
                  </div>

                  <div className="space-y-4">
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Visibilité du profil <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2">
                        {['Public', 'Privé'].map((visibilite) => (
                          <label key={visibilite} className="flex items-start gap-3 cursor-pointer group">
                            <input
                              type="radio"
                              name="visibilite"
                              value={visibilite}
                              checked={donneesFormulaire.visibiliteProfile === visibilite}
                              onChange={(e) => gererChangementChamp('visibiliteProfile', e.target.value)}
                              className="w-4 h-4 text-teal-600 focus:ring-teal-500 mt-0.5"
                            />
                            <div>
                              <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium">{visibilite}</span>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {visibilite === 'Public' 
                                  ? 'Visible par tous les utilisateurs' 
                                  : 'Visible uniquement par les entreprises connectées'}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                 
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Notifications <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between cursor-pointer group">
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">Nouveaux leads</span>
                          <input
                            type="checkbox"
                            checked={donneesFormulaire.notifications.nouveauxLeads}
                            onChange={(e) => gererChangementChamp('notifications', {
                              ...donneesFormulaire.notifications,
                              nouveauxLeads: e.target.checked
                            })}
                            className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                          />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group">
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">Rappels de tâches</span>
                          <input
                            type="checkbox"
                            checked={donneesFormulaire.notifications.rappelsTaches}
                            onChange={(e) => gererChangementChamp('notifications', {
                              ...donneesFormulaire.notifications,
                              rappelsTaches: e.target.checked
                            })}
                            className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                          />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group">
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">Messages</span>
                          <input
                            type="checkbox"
                            checked={donneesFormulaire.notifications.messages}
                            onChange={(e) => gererChangementChamp('notifications', {
                              ...donneesFormulaire.notifications,
                              messages: e.target.checked
                            })}
                            className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Bouton de soumission en bas */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <i className="ri-save-line"></i>
                Enregistrer le profil
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==================== FIN PARTIE 3/3 ====================