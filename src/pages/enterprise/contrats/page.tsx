import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { Contrat } from '../../../types/contrat';

const ContratsPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'liste' | 'creer'>('liste');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState<string>('tous');
  const [selectedContrat, setSelectedContrat] = useState<Contrat | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [prefilledData, setPrefilledData] = useState<any>(null);

  // Vérifier si on vient d'un entretien
  useEffect(() => {
    if (location.state?.fromInterview) {
      setActiveTab('creer');
      setPrefilledData(location.state);
    }
  }, [location.state]);

  // Données mockées
  const contrats: Contrat[] = [
    {
      id: '1',
      titreContrat: 'Contrat de prestation avec John Doe',
      typeContrat: 'prestation-service',
      nomEntreprise: 'ABC Corp',
      nomCommercialClient: 'John Doe',
      dateDebut: '2025-09-01',
      dateFin: '2025-12-31',
      statutContrat: 'en-cours',
      objetContrat: 'Prestation de services de prospection commerciale pour la région Afrique de l\'Ouest',
      clausesPrincipales: [
        'Le commercial doit atteindre un chiffre d\'affaires de 50 000 $ en 6 mois',
        'Les commissions seront versées mensuellement à hauteur de 10 % des ventes réalisées',
        'Rapport mensuel obligatoire sur les activités commerciales'
      ],
      montantContrat: 10000,
      modePaiement: 'virement-bancaire',
      echeancesPaiement: [
        { date: '2025-10-01', montant: 2500, statut: 'paye' },
        { date: '2025-11-01', montant: 2500, statut: 'en-attente' },
        { date: '2025-12-01', montant: 2500, statut: 'en-attente' },
        { date: '2026-01-01', montant: 2500, statut: 'en-attente' }
      ],
      progression: 50,
      objectifsAtteints: [
        '25 000 $ de chiffre d\'affaires généré',
        '15 nouveaux clients acquis',
        '3 partenariats stratégiques établis'
      ],
      documentsAssocies: [
        {
          nom: 'Contrat_JohnDoe.pdf',
          url: '#',
          type: 'application/pdf',
          dateAjout: '2025-09-01'
        }
      ],
      historique: [
        {
          date: '2025-09-10',
          champModifie: 'Date de fin',
          ancienneValeur: '2025-12-31',
          nouvelleValeur: '2026-01-31',
          auteur: 'Marie Dupont'
        }
      ],
      commentairesInternes: 'Le client a demandé une extension de 1 mois pour atteindre les objectifs.',
      dateCreation: '2025-09-01',
      derniereMiseAJour: '2025-09-10'
    },
    {
      id: '2',
      titreContrat: 'Contrat de vente - Équipements Tech Solutions',
      typeContrat: 'contrat-vente',
      nomEntreprise: 'Tech Solutions SARL',
      nomCommercialClient: 'Sarah Martin',
      dateDebut: '2025-08-15',
      dateFin: '2025-11-15',
      statutContrat: 'en-cours',
      objetContrat: 'Vente d\'équipements informatiques et formation du personnel',
      clausesPrincipales: [
        'Livraison de 50 ordinateurs portables dans un délai de 30 jours',
        'Formation de 20 employés sur les nouveaux systèmes',
        'Garantie de 2 ans sur tous les équipements'
      ],
      montantContrat: 75000,
      modePaiement: 'virement-bancaire',
      echeancesPaiement: [
        { date: '2025-08-20', montant: 37500, statut: 'paye' },
        { date: '2025-11-20', montant: 37500, statut: 'en-attente' }
      ],
      progression: 65,
      objectifsAtteints: [
        '45 ordinateurs livrés sur 50',
        '15 employés formés sur 20',
        'Installation des systèmes complétée'
      ],
      documentsAssocies: [
        {
          nom: 'Contrat_TechSolutions.pdf',
          url: '#',
          type: 'application/pdf',
          dateAjout: '2025-08-15'
        },
        {
          nom: 'Bon_Livraison.pdf',
          url: '#',
          type: 'application/pdf',
          dateAjout: '2025-09-10'
        }
      ],
      historique: [],
      commentairesInternes: 'Livraison en cours, client très satisfait de la qualité des équipements.',
      dateCreation: '2025-08-15',
      derniereMiseAJour: '2025-09-15'
    },
    {
      id: '3',
      titreContrat: 'Partenariat stratégique - Innovation Hub',
      typeContrat: 'contrat-partenariat',
      nomEntreprise: 'Innovation Hub',
      nomCommercialClient: 'Pierre Kouassi',
      dateDebut: '2025-07-01',
      dateFin: '2026-07-01',
      statutContrat: 'en-cours',
      objetContrat: 'Partenariat pour le développement de solutions innovantes en Afrique',
      clausesPrincipales: [
        'Co-développement de 3 produits innovants par an',
        'Partage des revenus à hauteur de 40/60',
        'Accès exclusif aux ressources de l\'incubateur'
      ],
      montantContrat: 150000,
      modePaiement: 'virement-bancaire',
      echeancesPaiement: [
        { date: '2025-07-01', montant: 50000, statut: 'paye' },
        { date: '2025-10-01', montant: 50000, statut: 'paye' },
        { date: '2026-01-01', montant: 50000, statut: 'en-attente' }
      ],
      progression: 40,
      objectifsAtteints: [
        '2 produits en phase de développement',
        '5 événements co-organisés',
        '120 startups accompagnées'
      ],
      documentsAssocies: [
        {
          nom: 'Contrat_Partenariat.pdf',
          url: '#',
          type: 'application/pdf',
          dateAjout: '2025-07-01'
        }
      ],
      historique: [],
      commentairesInternes: 'Excellent partenariat, résultats au-delà des attentes.',
      dateCreation: '2025-07-01',
      derniereMiseAJour: '2025-09-20'
    }
  ];

  const filteredContrats = contrats.filter(contrat => {
    const matchSearch = contrat.titreContrat.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       contrat.nomCommercialClient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatut = filterStatut === 'tous' || contrat.statutContrat === filterStatut;
    return matchSearch && matchStatut;
  });

  const getStatutBadge = (statut: string) => {
    const styles = {
      'en-cours': 'bg-blue-100 text-blue-700',
      'termine': 'bg-green-100 text-green-700',
      'resilie': 'bg-red-100 text-red-700',
      'attente-signature': 'bg-yellow-100 text-yellow-700'
    };
    const labels = {
      'en-cours': 'En cours',
      'termine': 'Terminé',
      'resilie': 'Résilié',
      'attente-signature': 'En attente de signature'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[statut as keyof typeof styles]}`}>
        {labels[statut as keyof typeof labels]}
      </span>
    );
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      'prestation-service': 'Prestation de service',
      'contrat-vente': 'Contrat de vente',
      'contrat-partenariat': 'Contrat de partenariat'
    };
    return labels[type as keyof typeof labels];
  };

  const stats = {
    total: contrats.length,
    enCours: contrats.filter(c => c.statutContrat === 'en-cours').length,
    termines: contrats.filter(c => c.statutContrat === 'termine').length,
    enAttente: contrats.filter(c => c.statutContrat === 'attente-signature').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Contrats</h1>
              <p className="text-gray-600">Créez, gérez et suivez vos contrats commerciaux</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Contrats</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-file-list-3-line text-2xl text-blue-600"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">En Cours</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.enCours}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-time-line text-2xl text-blue-600"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Terminés</p>
                  <p className="text-2xl font-bold text-green-600">{stats.termines}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-checkbox-circle-line text-2xl text-green-600"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">En Attente</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.enAttente}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i className="ri-hourglass-line text-2xl text-yellow-600"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs - Only show Liste */}
          <div className="flex gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-100 w-fit">
            <button
              onClick={() => setActiveTab('liste')}
              className="px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
            >
              <i className="ri-list-check mr-2"></i>
              Liste des Contrats
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'liste' ? (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Rechercher un contrat..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <select
                  value={filterStatut}
                  onChange={(e) => setFilterStatut(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="en-cours">En cours</option>
                  <option value="termine">Terminé</option>
                  <option value="resilie">Résilié</option>
                  <option value="attente-signature">En attente de signature</option>
                </select>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatut('tous');
                  }}
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 whitespace-nowrap"
                >
                  <i className="ri-refresh-line mr-2"></i>
                  Réinitialiser
                </button>
              </div>
            </div>

            {/* Contrats List */}
            <div className="grid grid-cols-1 gap-4">
              {filteredContrats.map((contrat) => (
                <div
                  key={contrat.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedContrat(contrat);
                    setShowDetails(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{contrat.titreContrat}</h3>
                        {getStatutBadge(contrat.statutContrat)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{getTypeLabel(contrat.typeContrat)}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <i className="ri-building-line"></i>
                          {contrat.nomEntreprise}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-user-line"></i>
                          {contrat.nomCommercialClient}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-calendar-line"></i>
                          {new Date(contrat.dateDebut).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      {contrat.montantContrat && (
                        <p className="text-2xl font-bold text-blue-600 mb-1">
                          {contrat.montantContrat.toLocaleString('fr-FR')} $
                        </p>
                      )}
                      <p className="text-sm text-gray-500">Progression: {contrat.progression}%</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all"
                        style={{ width: `${contrat.progression}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-gray-600">
                        <i className="ri-file-text-line"></i>
                        {contrat.clausesPrincipales.length} clauses
                      </span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <i className="ri-attachment-line"></i>
                        {contrat.documentsAssocies.length} documents
                      </span>
                      {contrat.echeancesPaiement && (
                        <span className="flex items-center gap-1 text-gray-600">
                          <i className="ri-money-dollar-circle-line"></i>
                          {contrat.echeancesPaiement.filter(e => e.statut === 'paye').length}/{contrat.echeancesPaiement.length} paiements
                        </span>
                      )}
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap">
                      Voir les détails
                      <i className="ri-arrow-right-line ml-2"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <CreateContratForm onBack={() => setActiveTab('liste')} prefilledData={prefilledData} />
        )}
      </div>

      {/* Modal Détails */}
      {showDetails && selectedContrat && (
        <ContratDetailsModal
          contrat={selectedContrat}
          onClose={() => {
            setShowDetails(false);
            setSelectedContrat(null);
          }}
        />
      )}
    </div>
  );
};

// Composant Formulaire de Création
const CreateContratForm = ({ onBack, prefilledData }: { onBack: () => void; prefilledData?: any }) => {
  const fromInterview = prefilledData?.fromInterview || false;
  
  const [formData, setFormData] = useState({
    titreContrat: '',
    typeContrat: 'prestation-service',
    nomEntreprise: prefilledData?.nomEntreprise || '',
    nomCommercialClient: prefilledData?.nomCommercial || '',
    dateDebut: '',
    dateFin: '',
    objetContrat: '',
    clausesPrincipales: [''],
    montantContrat: '',
    modePaiement: 'virement-bancaire',
    commentairesInternes: ''
  });

  const [echeances, setEcheances] = useState<{ date: string; montant: string }[]>([
    { date: '', montant: '' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de soumission
    alert('Contrat créé avec succès !');
    onBack();
  };

  const addClause = () => {
    setFormData({
      ...formData,
      clausesPrincipales: [...formData.clausesPrincipales, '']
    });
  };

  const updateClause = (index: number, value: string) => {
    const newClauses = [...formData.clausesPrincipales];
    newClauses[index] = value;
    setFormData({ ...formData, clausesPrincipales: newClauses });
  };

  const removeClause = (index: number) => {
    const newClauses = formData.clausesPrincipales.filter((_, i) => i !== index);
    setFormData({ ...formData, clausesPrincipales: newClauses });
  };

  const addEcheance = () => {
    setEcheances([...echeances, { date: '', montant: '' }]);
  };

  const updateEcheance = (index: number, field: 'date' | 'montant', value: string) => {
    const newEcheances = [...echeances];
    newEcheances[index][field] = value;
    setEcheances(newEcheances);
  };

  const removeEcheance = (index: number) => {
    setEcheances(echeances.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Section 1: Informations Générales */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-file-list-3-line text-xl text-blue-600"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Informations Générales</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre du contrat <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.titreContrat}
                onChange={(e) => setFormData({ ...formData, titreContrat: e.target.value })}
                placeholder="Ex: Contrat de prestation avec John Doe"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de contrat <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.typeContrat}
                onChange={(e) => setFormData({ ...formData, typeContrat: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="prestation-service">Prestation de service</option>
                <option value="contrat-vente">Contrat de vente</option>
                <option value="contrat-partenariat">Contrat de partenariat</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de début <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.dateDebut}
                onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de fin (optionnel)
              </label>
              <input
                type="date"
                value={formData.dateFin}
                onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Détails du Contrat */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <i className="ri-file-text-line text-xl text-indigo-600"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Détails du Contrat</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objet du contrat <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.objetContrat}
                onChange={(e) => setFormData({ ...formData, objetContrat: e.target.value })}
                placeholder="Ex: Prestation de services de prospection commerciale pour la région Afrique de l'Ouest"
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Clauses principales <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={addClause}
                  className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap"
                >
                  <i className="ri-add-line mr-1"></i>
                  Ajouter une clause
                </button>
              </div>
              <div className="space-y-3">
                {formData.clausesPrincipales.map((clause, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={clause}
                      onChange={(e) => updateClause(index, e.target.value)}
                      placeholder={`Clause ${index + 1}`}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    {formData.clausesPrincipales.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeClause(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant du contrat (optionnel)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.montantContrat}
                    onChange={(e) => setFormData({ ...formData, montantContrat: e.target.value })}
                    placeholder="10000"
                    className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mode de paiement (optionnel)
                </label>
                <select
                  value={formData.modePaiement}
                  onChange={(e) => setFormData({ ...formData, modePaiement: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="virement-bancaire">Virement bancaire</option>
                  <option value="mobile-money">Mobile Money</option>
                  <option value="cheque">Chèque</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Échéances de paiement (optionnel)
                </label>
                <button
                  type="button"
                  onClick={addEcheance}
                  className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap"
                >
                  <i className="ri-add-line mr-1"></i>
                  Ajouter une échéance
                </button>
              </div>
              <div className="space-y-3">
                {echeances.map((echeance, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="date"
                      value={echeance.date}
                      onChange={(e) => updateEcheance(index, 'date', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <div className="relative flex-1">
                      <input
                        type="number"
                        value={echeance.montant}
                        onChange={(e) => updateEcheance(index, 'montant', e.target.value)}
                        placeholder="Montant"
                        className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                    </div>
                    {echeances.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEcheance(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Commentaires */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-chat-3-line text-xl text-purple-600"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Commentaires Internes</h2>
          </div>

          <textarea
            value={formData.commentairesInternes}
            onChange={(e) => setFormData({ ...formData, commentairesInternes: e.target.value })}
            placeholder="Ajoutez des notes ou observations internes..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium whitespace-nowrap"
        >
          <i className="ri-arrow-left-line mr-2"></i>
          Retour
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl font-medium whitespace-nowrap"
        >
          <i className="ri-save-line mr-2"></i>
          Créer le Contrat
        </button>
      </div>
    </form>
  );
};

// Composant Modal Détails
const ContratDetailsModal = ({ contrat, onClose }: { contrat: Contrat; onClose: () => void }) => {
  const [activeSection, setActiveSection] = useState<'general' | 'suivi' | 'documents' | 'historique'>('general');

  const getStatutBadge = (statut: string) => {
    const styles = {
      'en-cours': 'bg-blue-100 text-blue-700',
      'termine': 'bg-green-100 text-green-700',
      'resilie': 'bg-red-100 text-red-700',
      'attente-signature': 'bg-yellow-100 text-yellow-700'
    };
    const labels = {
      'en-cours': 'En cours',
      'termine': 'Terminé',
      'resilie': 'Résilié',
      'attente-signature': 'En attente de signature'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[statut as keyof typeof styles]}`}>
        {labels[statut as keyof typeof labels]}
      </span>
    );
  };

  const getPaymentStatutBadge = (statut: string) => {
    const styles = {
      'paye': 'bg-green-100 text-green-700',
      'en-attente': 'bg-yellow-100 text-yellow-700',
      'en-retard': 'bg-red-100 text-red-700'
    };
    const labels = {
      'paye': 'Payé',
      'en-attente': 'En attente',
      'en-retard': 'En retard'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[statut as keyof typeof styles]}`}>
        {labels[statut as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{contrat.titreContrat}</h2>
              <div className="flex items-center gap-3">
                {getStatutBadge(contrat.statutContrat)}
                <span className="text-blue-100 text-sm">
                  Créé le {new Date(contrat.dateCreation).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveSection('general')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeSection === 'general'
                  ? 'bg-white text-blue-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <i className="ri-file-list-3-line mr-2"></i>
              Général
            </button>
            <button
              onClick={() => setActiveSection('suivi')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeSection === 'suivi'
                  ? 'bg-white text-blue-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <i className="ri-line-chart-line mr-2"></i>
              Suivi
            </button>
            <button
              onClick={() => setActiveSection('documents')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeSection === 'documents'
                  ? 'bg-white text-blue-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <i className="ri-folder-line mr-2"></i>
              Documents
            </button>
            <button
              onClick={() => setActiveSection('historique')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeSection === 'historique'
                  ? 'bg-white text-blue-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <i className="ri-history-line mr-2"></i>
              Historique
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeSection === 'general' && (
            <div className="space-y-6">
              {/* Informations Générales */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-information-line text-blue-600"></i>
                  Informations Générales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Type de contrat</p>
                    <p className="font-medium text-gray-900">
                      {contrat.typeContrat === 'prestation-service' && 'Prestation de service'}
                      {contrat.typeContrat === 'contrat-vente' && 'Contrat de vente'}
                      {contrat.typeContrat === 'contrat-partenariat' && 'Contrat de partenariat'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Période</p>
                    <p className="font-medium text-gray-900">
                      {new Date(contrat.dateDebut).toLocaleDateString('fr-FR')}
                      {contrat.dateFin && ` - ${new Date(contrat.dateFin).toLocaleDateString('fr-FR')}`}
                    </p>
                  </div>
                  {contrat.montantContrat && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Montant</p>
                      <p className="font-medium text-blue-600 text-xl">
                        {contrat.montantContrat.toLocaleString('fr-FR')} $
                      </p>
                    </div>
                  )}
                  {contrat.modePaiement && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Mode de paiement</p>
                      <p className="font-medium text-gray-900">
                        {contrat.modePaiement === 'virement-bancaire' && 'Virement bancaire'}
                        {contrat.modePaiement === 'mobile-money' && 'Mobile Money'}
                        {contrat.modePaiement === 'cheque' && 'Chèque'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Objet du Contrat */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-file-text-line text-blue-600"></i>
                  Objet du Contrat
                </h3>
                <p className="text-gray-700 leading-relaxed">{contrat.objetContrat}</p>
              </div>

              {/* Clauses Principales */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-list-check text-blue-600"></i>
                  Clauses Principales
                </h3>
                <ul className="space-y-3">
                  {contrat.clausesPrincipales.map((clause, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 flex-1">{clause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Échéances de Paiement */}
              {contrat.echeancesPaiement && contrat.echeancesPaiement.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-money-dollar-circle-line text-blue-600"></i>
                    Échéances de Paiement
                  </h3>
                  <div className="space-y-3">
                    {contrat.echeancesPaiement.map((echeance, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i className="ri-calendar-line text-blue-600"></i>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {new Date(echeance.date).toLocaleDateString('fr-FR')}
                            </p>
                            <p className="text-sm text-gray-600">Échéance {index + 1}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-lg font-bold text-gray-900">
                            {echeance.montant.toLocaleString('fr-FR')} $
                          </p>
                          {getPaymentStatutBadge(echeance.statut)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Commentaires Internes */}
              {contrat.commentairesInternes && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-chat-3-line text-blue-600"></i>
                    Commentaires Internes
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{contrat.commentairesInternes}</p>
                </div>
              )}
            </div>
          )}

          {activeSection === 'suivi' && (
            <div className="space-y-6">
              {/* Progression */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-line-chart-line text-blue-600"></i>
                  Progression du Contrat
                </h3>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">État d'avancement</span>
                    <span className="text-2xl font-bold text-blue-600">{contrat.progression}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 h-4 rounded-full transition-all"
                      style={{ width: `${contrat.progression}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Objectifs Atteints */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-trophy-line text-blue-600"></i>
                  Objectifs Atteints
                </h3>
                <ul className="space-y-3">
                  {contrat.objectifsAtteints.map((objectif, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <i className="ri-checkbox-circle-fill text-green-500 text-xl flex-shrink-0"></i>
                      <span className="text-gray-700 flex-1">{objectif}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Notifications */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-notification-3-line text-orange-600"></i>
                  Notifications et Rappels
                </h3>
                <div className="space-y-3">
                  {contrat.echeancesPaiement?.filter(e => e.statut === 'en-attente').map((echeance, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <i className="ri-alarm-warning-line text-orange-500 text-xl flex-shrink-0"></i>
                      <div>
                        <p className="font-medium text-gray-900">Échéance de paiement</p>
                        <p className="text-sm text-gray-600">
                          Paiement de {echeance.montant.toLocaleString('fr-FR')} $ dû le{' '}
                          {new Date(echeance.date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  ))}
                  {contrat.dateFin && (
                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <i className="ri-calendar-event-line text-blue-500 text-xl flex-shrink-0"></i>
                      <div>
                        <p className="font-medium text-gray-900">Fin de contrat</p>
                        <p className="text-sm text-gray-600">
                          Le contrat se termine le {new Date(contrat.dateFin).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'documents' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <i className="ri-folder-line text-blue-600"></i>
                    Documents Associés
                  </h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap">
                    <i className="ri-upload-2-line mr-2"></i>
                    Ajouter un document
                  </button>
                </div>
                <div className="space-y-3">
                  {contrat.documentsAssocies.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <i className="ri-file-pdf-line text-2xl text-red-600"></i>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doc.nom}</p>
                          <p className="text-sm text-gray-600">
                            Ajouté le {new Date(doc.dateAjout).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center">
                          <i className="ri-eye-line"></i>
                        </button>
                        <button className="w-10 h-10 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center">
                          <i className="ri-download-line"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'historique' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-history-line text-blue-600"></i>
                  Historique des modifications
                </h3>
                {contrat.historique.length > 0 ? (
                  <div className="space-y-4">
                    {contrat.historique.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-white rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className="ri-edit-line text-blue-600"></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-gray-900">{item.champModifie}</p>
                            <span className="text-sm text-gray-500">
                              {new Date(item.date).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="px-2 py-1 bg-red-50 text-red-700 rounded">
                              {item.ancienneValeur}
                            </span>
                            <i className="ri-arrow-right-line text-gray-400"></i>
                            <span className="px-2 py-1 bg-green-50 text-green-700 rounded">
                              {item.nouvelleValeur}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">Par {item.auteur}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <i className="ri-history-line text-4xl text-gray-300 mb-2"></i>
                    <p className="text-gray-500">Aucune modification enregistrée</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-white transition-colors font-medium whitespace-nowrap"
            >
              Fermer
            </button>
            <div className="flex items-center gap-3">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl font-medium whitespace-nowrap">
                <i className="ri-edit-line mr-2"></i>
                Modifier
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl font-medium whitespace-nowrap">
                <i className="ri-download-line mr-2"></i>
                Exporter en PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContratsPage;
