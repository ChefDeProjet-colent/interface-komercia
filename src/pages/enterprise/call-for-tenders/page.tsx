import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';
import Badge from '../../../components/base/Badge';

export default function EnterpriseCallForTendersPage() {
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Komercia</h1>
          <p className="text-sm text-gray-600">Interface Entreprise</p>
        </div>

        <nav className="flex-1 py-6">
          <div className="space-y-1 px-3">
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/enterprise')}
              className="w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <i className="ri-dashboard-line mr-3"></i>
              Tableau de bord
            </button>
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/enterprise')}
              className="w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <i className="ri-user-search-line mr-3"></i>
              Recrutement
            </button>
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/enterprise')}
              className="w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <i className="ri-file-list-line mr-3"></i>
              Contrats
            </button>
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/enterprise')}
              className="w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <i className="ri-bar-chart-box-line mr-3"></i>
              Performances
            </button>
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/enterprise')}
              className="w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <i className="ri-search-eye-line mr-3"></i>
              Prospection
            </button>
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/enterprise/profile')}
              className="w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <i className="ri-user-line mr-3"></i>
              Mon Profil
            </button>
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/enterprise/call-for-tenders')}
              className="w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors bg-blue-100 text-blue-700 cursor-pointer"
            >
              <i className="ri-megaphone-line mr-3"></i>
              Appels d'Offres
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <i className="ri-building-line text-sm text-white"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Entreprise Pro</p>
              <p className="text-xs text-gray-500">Compte actif</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => window.REACT_APP_NAVIGATE('/enterprise')}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-arrow-left-line text-xl text-gray-600"></i>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Appels d'Offres</h1>
                  <p className="text-sm text-gray-600">Recrutez les meilleurs commerciaux pour votre entreprise</p>
                </div>
              </div>
              <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                <i className="ri-add-line mr-2"></i>
                Créer un Appel d'Offre
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-file-list-line text-xl text-green-600"></i>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                <p className="text-sm text-gray-600">Offres Actives</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-draft-line text-xl text-yellow-600"></i>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
                <p className="text-sm text-gray-600">Brouillons</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-user-line text-xl text-blue-600"></i>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
                <p className="text-sm text-gray-600">Candidatures</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-briefcase-line text-xl text-purple-600"></i>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPositions}</p>
                <p className="text-sm text-gray-600">Postes Ouverts</p>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex gap-2 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-6 py-3 font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'active'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="ri-checkbox-circle-line mr-2"></i>
                Actifs ({stats.active})
              </button>
              <button
                onClick={() => setActiveTab('draft')}
                className={`px-6 py-3 font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'draft'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="ri-draft-line mr-2"></i>
                Brouillons ({stats.draft})
              </button>
              <button
                onClick={() => setActiveTab('closed')}
                className={`px-6 py-3 font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'closed'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="ri-close-circle-line mr-2"></i>
                Clôturés ({stats.closed})
              </button>
            </div>
          </div>

          {/* Liste des appels d'offres */}
          <div className="space-y-6">
            {filteredTenders.length === 0 ? (
              <Card>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-file-list-line text-2xl text-gray-400"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun appel d'offre</h3>
                  <p className="text-gray-600 mb-4">
                    {activeTab === 'active' && "Vous n'avez pas d'appel d'offre actif pour le moment"}
                    {activeTab === 'draft' && "Vous n'avez pas de brouillon enregistré"}
                    {activeTab === 'closed' && "Vous n'avez pas d'appel d'offre clôturé"}
                  </p>
                  <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                    <i className="ri-add-line mr-2"></i>
                    Créer un Appel d'Offre
                  </Button>
                </div>
              </Card>
            ) : (
              filteredTenders.map((tender) => (
                <Card key={tender.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{tender.title}</h3>
                        <Badge variant={getStatusColor(tender.status)}>
                          {getStatusLabel(tender.status)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{tender.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Postes</p>
                      <p className="text-lg font-bold text-gray-900">{tender.positions}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Budget</p>
                      <p className="text-sm font-bold text-gray-900">
                        {tender.budgetMin.toLocaleString()}€ - {tender.budgetMax.toLocaleString()}€
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Date limite</p>
                      <p className="text-sm font-medium text-gray-900">{tender.deadline}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Candidatures</p>
                      <p className="text-lg font-bold text-blue-600">{tender.applications}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Créé le</p>
                      <p className="text-sm font-medium text-gray-900">{tender.createdAt}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Exigences:</p>
                    <div className="flex flex-wrap gap-2">
                      {tender.requirements.slice(0, 3).map((req, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          {req}
                        </span>
                      ))}
                      {tender.requirements.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{tender.requirements.length - 3} autres
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Button variant="primary" size="sm" onClick={() => handleViewDetails(tender)}>
                      <i className="ri-eye-line mr-1"></i>
                      Voir les détails
                    </Button>
                    {tender.status === 'active' && (
                      <Button variant="outline" size="sm" onClick={() => handleViewApplications(tender)}>
                        <i className="ri-user-line mr-1"></i>
                        Voir les candidatures ({tender.applications})
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleEditTender(tender)}>
                      <i className="ri-edit-line mr-1"></i>
                      Modifier
                    </Button>
                    {tender.status === 'draft' && (
                      <Button variant="outline" size="sm" onClick={() => handlePublishDraft(tender.id)}>
                        <i className="ri-send-plane-line mr-1"></i>
                        Publier
                      </Button>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal Création */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Créer un Appel d'Offre</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleCreateTender(false); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre du poste *
                  </label>
                  <input
                    type="text"
                    value={newTender.title}
                    onChange={(e) => setNewTender({ ...newTender, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Commercial Senior - Secteur Technologie"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description du poste *
                  </label>
                  <textarea
                    value={newTender.description}
                    onChange={(e) => setNewTender({ ...newTender, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Décrivez le poste, les missions, l'environnement de travail..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de postes *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newTender.positions}
                      onChange={(e) => setNewTender({ ...newTender, positions: parseInt(e.target.value) || 1 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget min (€) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newTender.budgetMin}
                      onChange={(e) => setNewTender({ ...newTender, budgetMin: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="35000"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget max (€) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newTender.budgetMax}
                      onChange={(e) => setNewTender({ ...newTender, budgetMax: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="50000"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date limite de candidature *
                  </label>
                  <input
                    type="date"
                    value={newTender.deadline}
                    onChange={(e) => setNewTender({ ...newTender, deadline: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exigences et compétences requises
                  </label>
                  <div className="space-y-2">
                    {newTender.requirements.map((req, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={req}
                          onChange={(e) => handleRequirementChange(index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Ex: 5+ ans d'expérience en vente B2B"
                        />
                        {newTender.requirements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveRequirement(index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddRequirement}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
                    >
                      <i className="ri-add-line mr-1"></i>
                      Ajouter une exigence
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <Button type="submit" variant="primary" className="flex-1">
                    <i className="ri-send-plane-line mr-2"></i>
                    Publier l'appel d'offre
                  </Button>
                  <Button type="button" variant="outline" onClick={() => handleCreateTender(true)}>
                    <i className="ri-save-line mr-2"></i>
                    Enregistrer en brouillon
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)}>
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Modification */}
      {showEditModal && editingTender && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Modifier l'Appel d'Offre</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleUpdateTender(); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre du poste *
                  </label>
                  <input
                    type="text"
                    value={editingTender.title}
                    onChange={(e) => setEditingTender({ ...editingTender, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description du poste *
                  </label>
                  <textarea
                    value={editingTender.description}
                    onChange={(e) => setEditingTender({ ...editingTender, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de postes *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={editingTender.positions}
                      onChange={(e) => setEditingTender({ ...editingTender, positions: parseInt(e.target.value) || 1 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget min (€) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editingTender.budgetMin}
                      onChange={(e) => setEditingTender({ ...editingTender, budgetMin: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget max (€) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editingTender.budgetMax}
                      onChange={(e) => setEditingTender({ ...editingTender, budgetMax: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date limite de candidature *
                  </label>
                  <input
                    type="date"
                    value={editingTender.deadline}
                    onChange={(e) => setEditingTender({ ...editingTender, deadline: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exigences et compétences requises
                  </label>
                  <div className="space-y-2">
                    {editingTender.requirements.map((req, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={req}
                          onChange={(e) => {
                            const updated = [...editingTender.requirements];
                            updated[index] = e.target.value;
                            setEditingTender({ ...editingTender, requirements: updated });
                          }}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {editingTender.requirements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingTender.requirements.filter((_, i) => i !== index);
                              setEditingTender({ ...editingTender, requirements: updated });
                            }}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setEditingTender({ ...editingTender, requirements: [...editingTender.requirements, ''] })}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
                    >
                      <i className="ri-add-line mr-1"></i>
                      Ajouter une exigence
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <Button type="submit" variant="primary" className="flex-1">
                    <i className="ri-save-line mr-2"></i>
                    Enregistrer les modifications
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowEditModal(false)}>
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails */}
      {showDetailsModal && selectedTender && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedTender.title}</h3>
                  <Badge variant={getStatusColor(selectedTender.status)} className="mt-2">
                    {getStatusLabel(selectedTender.status)}
                  </Badge>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedTender.description}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Postes à pourvoir</p>
                    <p className="text-xl font-bold text-gray-900">{selectedTender.positions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Budget annuel</p>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedTender.budgetMin.toLocaleString()}€ - {selectedTender.budgetMax.toLocaleString()}€
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date limite</p>
                    <p className="text-lg font-medium text-gray-900">{selectedTender.deadline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Candidatures</p>
                    <p className="text-xl font-bold text-blue-600">{selectedTender.applications}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Exigences et compétences</h4>
                  <ul className="space-y-2">
                    {selectedTender.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start">
                        <i className="ri-checkbox-circle-fill text-green-600 mr-2 mt-1"></i>
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <i className="ri-information-line text-blue-600 text-xl mr-3 mt-1"></i>
                    <div>
                      <p className="font-medium text-blue-900 mb-1">Informations complémentaires</p>
                      <p className="text-sm text-blue-700">
                        Créé le {selectedTender.createdAt} • {selectedTender.applications} candidature(s) reçue(s)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200">
                {selectedTender.status === 'active' && (
                  <Button variant="primary" className="flex-1" onClick={() => {
                    setShowDetailsModal(false);
                    handleViewApplications(selectedTender);
                  }}>
                    <i className="ri-user-line mr-2"></i>
                    Voir les candidatures ({selectedTender.applications})
                  </Button>
                )}
                <Button variant="outline" onClick={() => {
                  setShowDetailsModal(false);
                  handleEditTender(selectedTender);
                }}>
                  <i className="ri-edit-line mr-2"></i>
                  Modifier
                </Button>
                <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Applications Modal */}
      {showApplicationsModal && selectedTender && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Candidatures</h2>
                <p className="text-teal-100 mt-1">{selectedTender.title} - {applications.length} candidatures</p>
              </div>
              <button
                onClick={() => setShowApplicationsModal(false)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors duration-200"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-4">
                {applications.map((application) => (
                  <div key={application.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-teal-300 transition-colors duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {application.candidateName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{application.candidateName}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span><i className="ri-mail-line mr-1"></i>{application.email}</span>
                            <span><i className="ri-phone-line mr-1"></i>{application.phone}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          application.status === 'Accepté' ? 'bg-green-100 text-green-700' :
                          application.status === 'Refusé' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {application.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-sm text-gray-600">Expérience</p>
                        <p className="font-semibold text-gray-900">{application.experience}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-sm text-gray-600">Date de candidature</p>
                        <p className="font-semibold text-gray-900">{new Date(application.appliedDate).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Compétences</p>
                      <div className="flex flex-wrap gap-2">
                        {application.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Lettre de motivation</p>
                      <p className="text-sm text-gray-600 bg-white rounded-lg p-3 border border-gray-200">
                        {application.coverLetter}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="flex-1 bg-white border-2 border-teal-600 text-teal-600 hover:bg-teal-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer">
                        <i className="ri-download-line mr-2"></i>
                        Télécharger CV
                      </button>
                      {application.status === 'En attente' && (
                        <>
                          <button
                            onClick={() => handleUpdateApplicationStatus(application.id, 'Accepté')}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer"
                          >
                            <i className="ri-check-line mr-2"></i>
                            Accepter
                          </button>
                          <button
                            onClick={() => handleUpdateApplicationStatus(application.id, 'Refusé')}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer"
                          >
                            <i className="ri-close-line mr-2"></i>
                            Refuser
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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