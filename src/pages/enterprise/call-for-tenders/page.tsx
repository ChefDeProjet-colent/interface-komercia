import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';
import Badge from '../../../components/base/Badge';

export default function CallForTendersPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'draft' | 'closed'>('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTender, setEditingTender] = useState<Tender | null>(null);

  const [newTender, setNewTender] = useState({
    title: '',
    description: '',
    positions: 1,
    budgetMin: '',
    budgetMax: '',
    deadline: '',
    requirements: ['']
  });

  const [tenders, setTenders] = useState<Tender[]>([
    {
      id: '1',
      title: 'Commercial Senior - Secteur Technologie',
      description: 'Nous recherchons un commercial expérimenté pour développer notre activité dans le secteur technologique. Vous serez en charge de la prospection, de la négociation et du closing de contrats avec des clients B2B.',
      positions: 2,
      budgetMin: 45000,
      budgetMax: 65000,
      deadline: '2024-03-15',
      status: 'active',
      applications: 12,
      createdAt: '2024-01-10',
      requirements: [
        '5+ ans d\'expérience en vente B2B',
        'Connaissance du secteur technologique',
        'Maîtrise des techniques de négociation',
        'Excellentes compétences en communication',
        'Autonomie et sens de l\'organisation'
      ]
    },
    {
      id: '2',
      title: 'Responsable Développement Commercial',
      description: 'Poste stratégique pour piloter notre croissance commerciale. Vous définirez et mettrez en œuvre la stratégie de développement, encadrerez une équipe de commerciaux et gérerez les comptes clés.',
      positions: 1,
      budgetMin: 55000,
      budgetMax: 75000,
      deadline: '2024-03-20',
      status: 'active',
      applications: 8,
      createdAt: '2024-01-15',
      requirements: [
        '8+ ans d\'expérience dont 3 ans en management',
        'Expérience en développement de stratégie commerciale',
        'Leadership et capacité à fédérer une équipe',
        'Maîtrise des outils CRM',
        'Anglais courant'
      ]
    },
    {
      id: '3',
      title: 'Commercial Terrain - Région Île-de-France',
      description: 'Recherche commercial dynamique pour développer notre portefeuille clients en Île-de-France. Missions de prospection terrain, présentation de nos solutions et suivi client.',
      positions: 3,
      budgetMin: 35000,
      budgetMax: 50000,
      deadline: '2024-02-28',
      status: 'draft',
      applications: 0,
      createdAt: '2024-01-20',
      requirements: [
        '2+ ans d\'expérience en vente terrain',
        'Permis B obligatoire',
        'Connaissance de la région Île-de-France',
        'Aisance relationnelle',
        'Goût du challenge'
      ]
    },
    {
      id: '4',
      title: 'Business Developer - Startups & Scale-ups',
      description: 'Rejoignez notre équipe pour développer notre activité auprès des startups et scale-ups. Vous identifierez les opportunités, créerez des partenariats stratégiques et accompagnerez nos clients dans leur croissance.',
      positions: 1,
      budgetMin: 40000,
      budgetMax: 60000,
      deadline: '2024-01-31',
      status: 'closed',
      applications: 25,
      createdAt: '2023-12-15',
      requirements: [
        'Expérience dans l\'écosystème startup',
        'Compétences en business development',
        'Réseau dans le milieu entrepreneurial',
        'Créativité et esprit d\'initiative',
        'Maîtrise de l\'anglais'
      ]
    }
  ]);

  const stats = {
    active: tenders.filter(t => t.status === 'active').length,
    draft: tenders.filter(t => t.status === 'draft').length,
    closed: tenders.filter(t => t.status === 'closed').length,
    totalApplications: tenders.reduce((sum, t) => sum + t.applications, 0),
    totalPositions: tenders.filter(t => t.status === 'active').reduce((sum, t) => sum + t.positions, 0)
  };

  const filteredTenders = tenders.filter(t => t.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'draft':
        return 'warning';
      case 'closed':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'draft':
        return 'Brouillon';
      case 'closed':
        return 'Clôturé';
      default:
        return status;
    }
  };

  const handleAddRequirement = () => {
    setNewTender({
      ...newTender,
      requirements: [...newTender.requirements, '']
    });
  };

  const handleRemoveRequirement = (index: number) => {
    const updated = newTender.requirements.filter((_, i) => i !== index);
    setNewTender({ ...newTender, requirements: updated });
  };

  const handleRequirementChange = (index: number, value: string) => {
    const updated = [...newTender.requirements];
    updated[index] = value;
    setNewTender({ ...newTender, requirements: updated });
  };

  const handleCreateTender = (isDraft: boolean = false) => {
    const tender: Tender = {
      id: Date.now().toString(),
      title: newTender.title,
      description: newTender.description,
      positions: newTender.positions,
      budgetMin: Number(newTender.budgetMin),
      budgetMax: Number(newTender.budgetMax),
      deadline: newTender.deadline,
      status: isDraft ? 'draft' : 'active',
      applications: 0,
      createdAt: new Date().toISOString().split('T')[0],
      requirements: newTender.requirements.filter(r => r.trim() !== '')
    };
    
    setTenders([...tenders, tender]);
    setShowCreateModal(false);
    setNewTender({
      title: '',
      description: '',
      positions: 1,
      budgetMin: '',
      budgetMax: '',
      deadline: '',
      requirements: ['']
    });
  };

  const handleViewDetails = (tender: Tender) => {
    setSelectedTender(tender);
    setShowDetailsModal(true);
  };

  const handleEditTender = (tender: Tender) => {
    setEditingTender(tender);
    setShowEditModal(true);
  };

  const handleUpdateTender = () => {
    if (editingTender) {
      setTenders(tenders.map(t => t.id === editingTender.id ? editingTender : t));
      setShowEditModal(false);
      setEditingTender(null);
    }
  };

  const handlePublishDraft = (tenderId: string) => {
    setTenders(tenders.map(t => 
      t.id === tenderId ? { ...t, status: 'active' as const } : t
    ));
  };

  // Mock applications data
  const [applications, setApplications] = useState([
    {
      id: 1,
      candidateName: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      phone: '+33 6 12 34 56 78',
      experience: '5 ans',
      appliedDate: '2024-01-15',
      status: 'En attente',
      cv: 'cv-sophie-martin.pdf',
      coverLetter: 'Je suis très intéressée par ce poste de commercial senior. Avec 5 ans d\'expérience dans la vente B2B dans le secteur technologique, j\'ai développé des compétences solides en prospection, négociation et closing. J\'ai notamment augmenté le chiffre d\'affaires de mon entreprise actuelle de 45% en 2 ans.',
      skills: ['Prospection', 'Négociation', 'CRM Salesforce', 'Vente B2B', 'Closing']
    },
    {
      id: 2,
      candidateName: 'Thomas Dubois',
      email: 'thomas.dubois@email.com',
      phone: '+33 6 23 45 67 89',
      experience: '7 ans',
      appliedDate: '2024-01-16',
      status: 'En attente',
      cv: 'cv-thomas-dubois.pdf',
      coverLetter: 'Fort de 7 années d\'expérience en développement commercial, je souhaite rejoindre votre équipe pour contribuer à votre croissance. Ma connaissance approfondie du secteur technologique et mes résultats probants (120% des objectifs atteints en 2023) font de moi le candidat idéal.',
      skills: ['Développement commercial', 'Management', 'Stratégie', 'Négociation', 'Leadership']
    },
    {
      id: 3,
      candidateName: 'Marie Lefebvre',
      email: 'marie.lefebvre@email.com',
      phone: '+33 6 34 56 78 90',
      experience: '4 ans',
      appliedDate: '2024-01-17',
      status: 'En attente',
      cv: 'cv-marie-lefebvre.pdf',
      coverLetter: 'Passionnée par la vente et les nouvelles technologies, je souhaite mettre mes compétences au service de votre entreprise. Mon expérience en vente B2B et ma capacité à créer des relations durables avec les clients seront des atouts majeurs pour votre équipe.',
      skills: ['Vente B2B', 'Relation client', 'Prospection digitale', 'CRM', 'Communication']
    },
    {
      id: 4,
      candidateName: 'Alexandre Bernard',
      email: 'alexandre.bernard@email.com',
      phone: '+33 6 45 67 89 01',
      experience: '6 ans',
      appliedDate: '2024-01-18',
      status: 'Accepté',
      cv: 'cv-alexandre-bernard.pdf',
      coverLetter: 'Avec 6 ans d\'expérience en tant que commercial senior, j\'ai développé une expertise solide dans le secteur technologique. Mon approche consultative et ma capacité à comprendre les besoins clients m\'ont permis de générer plus de 2M€ de CA annuel.',
      skills: ['Vente consultative', 'Account management', 'Négociation complexe', 'SaaS', 'B2B']
    },
    {
      id: 5,
      candidateName: 'Julie Moreau',
      email: 'julie.moreau@email.com',
      phone: '+33 6 56 78 90 12',
      experience: '3 ans',
      appliedDate: '2024-01-19',
      status: 'Refusé',
      cv: 'cv-julie-moreau.pdf',
      coverLetter: 'Jeune commerciale dynamique et motivée, je souhaite évoluer dans le secteur technologique. Mes 3 années d\'expérience m\'ont permis de développer des compétences en prospection et en gestion de la relation client.',
      skills: ['Prospection', 'Relation client', 'Vente', 'Communication', 'Organisation']
    },
    {
      id: 6,
      candidateName: 'Pierre Rousseau',
      email: 'pierre.rousseau@email.com',
      phone: '+33 6 67 89 01 23',
      experience: '8 ans',
      appliedDate: '2024-01-20',
      status: 'En attente',
      cv: 'cv-pierre-rousseau.pdf',
      coverLetter: 'Expert en développement commercial avec 8 ans d\'expérience, je maîtrise l\'ensemble du cycle de vente B2B. Ma capacité à identifier de nouvelles opportunités et à conclure des deals complexes sera un atout majeur pour votre entreprise.',
      skills: ['Business development', 'Vente complexe', 'Stratégie commerciale', 'Management', 'Négociation']
    },
    {
      id: 7,
      candidateName: 'Camille Petit',
      email: 'camille.petit@email.com',
      phone: '+33 6 78 90 12 34',
      experience: '5 ans',
      appliedDate: '2024-01-21',
      status: 'En attente',
      cv: 'cv-camille-petit.pdf',
      coverLetter: 'Commerciale passionnée par le secteur tech, j\'ai développé une expertise en vente de solutions SaaS. Mon approche centrée sur le client et mes résultats constants (objectifs dépassés de 30% en moyenne) témoignent de mon engagement.',
      skills: ['SaaS', 'Vente B2B', 'Customer success', 'Prospection', 'Closing']
    },
    {
      id: 8,
      candidateName: 'Lucas Garnier',
      email: 'lucas.garnier@email.com',
      phone: '+33 6 89 01 23 45',
      experience: '4 ans',
      appliedDate: '2024-01-22',
      status: 'En attente',
      cv: 'cv-lucas-garnier.pdf',
      coverLetter: 'Commercial terrain expérimenté, je souhaite rejoindre une entreprise innovante dans le secteur technologique. Ma connaissance du marché et ma capacité à créer des opportunités seront des atouts pour votre développement.',
      skills: ['Vente terrain', 'Prospection', 'Négociation', 'Autonomie', 'Résultats']
    },
    {
      id: 9,
      candidateName: 'Emma Durand',
      email: 'emma.durand@email.com',
      phone: '+33 6 90 12 34 56',
      experience: '6 ans',
      appliedDate: '2024-01-23',
      status: 'Accepté',
      cv: 'cv-emma-durand.pdf',
      coverLetter: 'Avec 6 ans d\'expérience en vente B2B dans le secteur technologique, j\'ai développé une expertise reconnue. Mon approche stratégique et ma capacité à gérer des comptes clés m\'ont permis de fidéliser un portefeuille de clients à forte valeur ajoutée.',
      skills: ['Account management', 'Vente stratégique', 'Négociation', 'CRM', 'Leadership']
    },
    {
      id: 10,
      candidateName: 'Hugo Lambert',
      email: 'hugo.lambert@email.com',
      phone: '+33 6 01 23 45 67',
      experience: '5 ans',
      appliedDate: '2024-01-24',
      status: 'En attente',
      cv: 'cv-hugo-lambert.pdf',
      coverLetter: 'Commercial senior avec une forte orientation résultats, je souhaite contribuer à votre croissance. Mon expérience dans le secteur tech et ma maîtrise des outils CRM modernes seront des atouts pour votre équipe.',
      skills: ['Vente B2B', 'CRM', 'Prospection digitale', 'Closing', 'Analyse']
    },
    {
      id: 11,
      candidateName: 'Léa Fontaine',
      email: 'lea.fontaine@email.com',
      phone: '+33 6 12 34 56 78',
      experience: '7 ans',
      appliedDate: '2024-01-25',
      status: 'En attente',
      cv: 'cv-lea-fontaine.pdf',
      coverLetter: 'Experte en développement commercial avec 7 ans d\'expérience, je maîtrise l\'art de la vente consultative. Ma capacité à comprendre les enjeux business de mes clients et à proposer des solutions adaptées a fait mes preuves.',
      skills: ['Vente consultative', 'Business development', 'Stratégie', 'Négociation', 'Management']
    },
    {
      id: 12,
      candidateName: 'Nathan Mercier',
      email: 'nathan.mercier@email.com',
      phone: '+33 6 23 45 67 89',
      experience: '4 ans',
      appliedDate: '2024-01-26',
      status: 'En attente',
      cv: 'cv-nathan-mercier.pdf',
      coverLetter: 'Commercial dynamique et orienté résultats, je souhaite rejoindre votre équipe pour participer à votre développement. Mon expérience en vente B2B et ma connaissance du secteur technologique seront des atouts majeurs.',
      skills: ['Vente B2B', 'Prospection', 'Négociation', 'CRM', 'Communication']
    }
  ]);

  const handleViewApplications = (tender: Tender) => {
    setSelectedTender(tender);
    setShowApplicationsModal(true);
  };

  const handleUpdateApplicationStatus = (applicationId: number, newStatus: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="enterprise" />
      
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Appels d'offres</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Consultez et candidatez aux appels d'offres disponibles</p>
              </div>
              <button className="w-full sm:w-auto bg-teal-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base">
                <i className="ri-filter-line text-lg"></i>
                <span>Filtrer</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200 overflow-x-auto">
            <nav className="flex px-4 sm:px-6 lg:px-8 min-w-max">
              {[
                { id: 'all', label: 'Tous', icon: 'ri-file-list-line' },
                { id: 'open', label: 'Ouverts', icon: 'ri-door-open-line' },
                { id: 'applied', label: 'Candidatures', icon: 'ri-send-plane-line' },
                { id: 'closed', label: 'Clôturés', icon: 'ri-lock-line' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-4 border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} text-base sm:text-lg`}></i>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {[
              { label: 'Appels ouverts', value: '12', icon: 'ri-door-open-line', color: 'bg-blue-500' },
              { label: 'Mes candidatures', value: '5', icon: 'ri-send-plane-line', color: 'bg-green-500' },
              { label: 'En évaluation', value: '3', icon: 'ri-time-line', color: 'bg-yellow-500' },
              { label: 'Acceptées', value: '2', icon: 'ri-checkbox-circle-line', color: 'bg-purple-500' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <i className={`${stat.icon} text-lg sm:text-xl text-white`}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tenders List */}
          <div className="space-y-4 sm:space-y-6">
            {tenders.map((tender) => (
              <div key={tender.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{tender.title}</h3>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                          tender.status === 'open' ? 'bg-green-100 text-green-700' :
                          tender.status === 'applied' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {tender.status === 'open' ? 'Ouvert' : tender.status === 'applied' ? 'Candidature envoyée' : 'Clôturé'}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">{tender.description}</p>
                      <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <i className="ri-building-line"></i>
                          {tender.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-map-pin-line"></i>
                          {tender.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="ri-calendar-line"></i>
                          Date limite: {tender.deadline}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start lg:items-end gap-2">
                      <div className="text-left lg:text-right">
                        <p className="text-xl sm:text-2xl font-bold text-teal-600">{tender.budget}</p>
                        <p className="text-xs sm:text-sm text-gray-500">Budget estimé</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tender.requirements.map((req, index) => (
                        <span key={index} className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {req}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap">
                        <i className="ri-eye-line"></i>
                        <span>Voir les détails</span>
                      </button>
                      {tender.status === 'open' && (
                        <button
                          onClick={() => {
                            setSelectedTender(tender);
                            setShowApplicationModal(true);
                          }}
                          className="flex-1 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
                        >
                          <i className="ri-send-plane-line"></i>
                          <span>Candidater</span>
                        </button>
                      )}
                      {tender.status === 'applied' && tender.application && (
                        <div className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs sm:text-sm font-medium text-blue-900">Candidature envoyée</p>
                              <p className="text-xs text-blue-600">Statut: {
                                tender.application.status === 'submitted' ? 'Envoyée' :
                                tender.application.status === 'under_review' ? 'En évaluation' :
                                tender.application.status === 'accepted' ? 'Acceptée' :
                                'Refusée'
                              }</p>
                            </div>
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                              tender.application.status === 'accepted' ? 'bg-green-100 text-green-700' :
                              tender.application.status === 'under_review' ? 'bg-yellow-100 text-yellow-700' :
                              tender.application.status === 'rejected' ? 'bg-red-100 text-red-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {tender.application.status === 'submitted' ? 'Envoyée' :
                               tender.application.status === 'under_review' ? 'En cours' :
                               tender.application.status === 'accepted' ? 'Acceptée' :
                               'Refusée'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedTender && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Candidater à l'appel d'offres</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">{selectedTender.title}</p>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proposition commerciale <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={applicationData.proposal}
                  onChange={(e) => setApplicationData({ ...applicationData, proposal: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Décrivez votre proposition détaillée..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix proposé (€) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={applicationData.price}
                    onChange={(e) => setApplicationData({ ...applicationData, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Délai de livraison</label>
                  <input
                    type="text"
                    value={applicationData.deliveryTime}
                    onChange={(e) => setApplicationData({ ...applicationData, deliveryTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Ex: 2 semaines"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Documents justificatifs</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-teal-500 transition-colors cursor-pointer">
                  <i className="ri-upload-cloud-line text-3xl sm:text-4xl text-gray-400 mb-2"></i>
                  <p className="text-sm sm:text-base text-gray-600 mb-1">Cliquez ou glissez vos documents ici</p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 10MB)</p>
                </div>
                {applicationData.documents.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {applicationData.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <i className="ri-file-line text-gray-400"></i>
                          <span className="text-sm text-gray-700 truncate">{doc}</span>
                        </div>
                        <button
                          onClick={() => {
                            const newDocs = applicationData.documents.filter((_, i) => i !== index);
                            setApplicationData({ ...applicationData, documents: newDocs });
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
              <button
                onClick={handleSubmitApplication}
                disabled={!applicationData.proposal || !applicationData.price}
                className="flex-1 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap"
              >
                Envoyer la candidature
              </button>
              <button
                onClick={() => {
                  setShowApplicationModal(false);
                  setSelectedTender(null);
                  setApplicationData({ proposal: '', price: '', deliveryTime: '', documents: [] });
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface Tender {
  id: string;
  title: string;
  description: string;
  positions: number;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  status: 'active' | 'draft' | 'closed';
  applications: number;
  createdAt: string;
  requirements: string[];
}