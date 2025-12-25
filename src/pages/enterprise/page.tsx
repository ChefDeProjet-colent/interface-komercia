import { useState, useEffect } from 'react';
import Card from '../../components/base/Card';
import Badge from '../../components/base/Badge';
import Button from '../../components/base/Button';
import { useAdManager } from '../../components/feature/AdManager';

export default function EnterprisePage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedFilters, setSelectedFilters] = useState({
    sector: '',
    location: '',
    experience: '',
    specialization: ''
  });
  const [showContractModal, setShowContractModal] = useState(false);
  const [showProspectModal, setShowProspectModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showCrmModal, setShowCrmModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedCommercial, setSelectedCommercial] = useState<Commercial | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNegotiateModal, setShowNegotiateModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [showKpiModal, setShowKpiModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingSaved, setEditingSaved] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productSaved, setProductSaved] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    commission: '',
    targetMarket: '',
    salesMaterials: '',
    technicalSpecs: '',
    competitiveAdvantages: '',
    trainingRequired: false,
    certificationRequired: false
  });
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    contactMethod: 'email',
    urgency: 'normal'
  });
  const [contactSent, setContactSent] = useState(false);
  const [negotiationForm, setNegotiationForm] = useState({
    proposedRate: 0,
    proposedCommission: 0,
    contractDuration: '',
    exclusivity: false,
    territory: '',
    objectives: '',
    bonusStructure: '',
    additionalTerms: ''
  });
  const [negotiationSent, setNegotiationSent] = useState(false);
  const [renewalForm, setRenewalForm] = useState({
    newEndDate: '',
    duration: '12',
    adjustRate: false,
    newRate: 0,
    adjustCommission: false,
    newCommission: 0,
    newObjectives: '',
    autoRenewal: false,
    additionalClauses: ''
  });
  const [renewalSent, setRenewalSent] = useState(false);
  const [kpiForm, setKpiForm] = useState({
    salesTarget: true,
    revenueTarget: true,
    conversionRate: true,
    averageDealSize: false,
    salesCycle: false,
    leadResponse: false,
    customerRetention: false,
    marketShare: false,
    customKpi1Name: '',
    customKpi1Target: '',
    customKpi2Name: '',
    customKpi2Target: '',
    dashboardLayout: 'grid',
    refreshInterval: '5',
    emailReports: true,
    reportFrequency: 'weekly',
    alertThreshold: '80'
  });
  const [kpiSaved, setKpiSaved] = useState(false);

  const [commercials] = useState<Commercial[]>([
    {
      id: '1',
      name: 'Marie Dubois',
      email: 'marie.dubois@email.com',
      phone: '+33 6 12 34 56 78',
      location: 'Paris, France',
      specialization: ['SaaS', 'Technologie', 'B2B'],
      experience: 5,
      rating: 4.8,
      completedSales: 127,
      totalRevenue: 2450000,
      status: 'available',
      profileImage:
        'https://readdy.ai/api/search-image?query=Professional%20businesswoman%20with%20confident%20smile%2C%20modern%20office%20background%2C%20corporate%20headshot%20style%2C%20clean%20and%20professional%20lighting%2C%20business%20attire&width=400&height=400&seq=1&orientation=squarish',
      description:
        'Experte en vente de solutions technologiques avec une forte expertise dans le secteur SaaS. Spécialisée dans la prospection B2B et la négociation de contrats complexes.',
      sectors: ['Technologie', 'SaaS', 'Fintech'],
      languages: ['Français', 'Anglais', 'Espagnol'],
      certifications: ['Salesforce Certified', 'HubSpot Expert', 'Google Ads Certified'],
      responseTime: '< 2h',
      hourlyRate: 95,
      availability: 'Disponible immédiatement',
      recommendations: 45
    },
    {
      id: '2',
      name: 'Thomas Martin',
      email: 'thomas.martin@email.com',
      phone: '+33 6 23 45 67 89',
      location: 'Lyon, France',
      specialization: ['Industrie', 'Manufacturing', 'B2B'],
      experience: 8,
      rating: 4.9,
      completedSales: 203,
      totalRevenue: 3850000,
      status: 'available',
      profileImage:
        'https://readdy.ai/api/search-image?query=Professional%20businessman%20in%20suit%2C%20confident%20expression%2C%20modern%20corporate%20environment%2C%20executive%20headshot%20style%2C%20professional%20lighting&width=400&height=400&seq=2&orientation=squarish',
      description:
        'Commercial senior spécialisé dans le secteur industriel avec une expertise reconnue en négociation de gros contrats. Excellence dans la gestion de comptes stratégiques.',
      sectors: ['Industrie', 'Manufacturing', 'Énergie'],
      languages: ['Français', 'Anglais', 'Allemand'],
      certifications: ['Industrial Sales Expert', 'B2B Negotiation Master', 'Lean Six Sigma'],
      responseTime: '< 1h',
      hourlyRate: 110,
      availability: 'Disponible cette semaine',
      recommendations: 67
    },
    {
      id: '3',
      name: 'Sophie Laurent',
      email: 'sophie.laurent@email.com',
      phone: '+33 6 34 56 78 90',
      location: 'Marseille, France',
      specialization: ['Santé', 'Pharmaceutique', 'B2B'],
      experience: 6,
      rating: 4.7,
      completedSales: 156,
      totalRevenue: 2890000,
      status: 'busy',
      profileImage:
        'https://readdy.ai/api/search-image?query=Professional%20healthcare%20businesswoman%2C%20medical%20industry%20background%2C%20confident%20and%20approachable%2C%20modern%20office%20setting%2C%20professional%20attire&width=400&height=400&seq=3&orientation=squarish',
      description:
        'Spécialiste du secteur de la santé avec une connaissance approfondie des réglementations pharmaceutiques. Experte en vente consultative.',
      sectors: ['Santé', 'Pharmaceutique', 'Biotechnologie'],
      languages: ['Français', 'Anglais', 'Italien'],
      certifications: ['Healthcare Sales Certified', 'Pharma Compliance Expert', 'Medical Device Sales'],
      responseTime: '< 4h',
      hourlyRate: 120,
      availability: 'Disponible dans 2 semaines',
      recommendations: 52
    },
    {
      id: '4',
      name: 'Alexandre Petit',
      email: 'alexandre.petit@email.com',
      phone: '+33 6 45 67 89 01',
      location: 'Toulouse, France',
      specialization: ['Finance', 'Assurance', 'B2B'],
      experience: 7,
      rating: 4.6,
      completedSales: 189,
      totalRevenue: 3200000,
      status: 'available',
      profileImage:
        'https://readdy.ai/api/search-image?query=Professional%20financial%20advisor%2C%20banking%20industry%20background%2C%20trustworthy%20appearance%2C%20modern%20financial%20office%2C%20business%20suit&width=400&height=400&seq=4&orientation=squarish',
      description:
        "Expert en solutions financières et produits d'assurance. Spécialisé dans la vente de services financiers complexes aux entreprises.",
      sectors: ['Finance', 'Assurance', 'Banque'],
      languages: ['Français', 'Anglais'],
      certifications: ['Financial Services Expert', 'Insurance Specialist', 'Banking Solutions Certified'],
      responseTime: '< 3h',
      hourlyRate: 85,
      availability: 'Disponible immédiatement',
      recommendations: 38
    },
    {
      id: '5',
      name: 'Camille Moreau',
      email: 'camille.moreau@email.com',
      phone: '+33 6 56 78 90 12',
      location: 'Nantes, France',
      specialization: ['Retail', 'E-commerce', 'B2C'],
      experience: 4,
      rating: 4.5,
      completedSales: 98,
      totalRevenue: 1650000,
      status: 'available',
      profileImage:
        'https://readdy.ai/api/search-image?query=Young%20professional%20woman%20in%20retail%20environment%2C%20modern%20e-commerce%20office%2C%20energetic%20and%20dynamic%2C%20contemporary%20business%20setting&width=400&height=400&seq=5&orientation=squarish',
      description:
        "Spécialiste du commerce de détail et e-commerce avec une forte expertise en stratégies de vente omnicanal. Passionnée par l'innovation retail.",
      sectors: ['Retail', 'E-commerce', 'Mode'],
      languages: ['Français', 'Anglais'],
      certifications: ['E-commerce Expert', 'Digital Marketing Certified', 'Retail Management'],
      responseTime: '< 2h',
      hourlyRate: 75,
      availability: 'Disponible cette semaine',
      recommendations: 29
    },
    {
      id: '6',
      name: 'Julien Bernard',
      email: 'julien.bernard@email.com',
      phone: '+33 6 67 89 01 23',
      location: 'Bordeaux, France',
      specialization: ['Immobilier', 'Construction', 'B2B'],
      experience: 9,
      rating: 4.8,
      completedSales: 234,
      totalRevenue: 4100000,
      status: 'contracted',
      profileImage:
        'https://readdy.ai/api/search-image?query=Professional%20real%20estate%20agent%2C%20construction%20industry%20background%2C%20experienced%20and%20reliable%2C%20modern%20architectural%20office%20setting&width=400&height=400&seq=6&orientation=squarish',
      description:
        "Commercial expérimenté dans l'immobilier d'entreprise et la construction. Expert en négociation de projets de grande envergure.",
      sectors: ['Immobilier', 'Construction', 'BTP'],
      languages: ['Français', 'Anglais', 'Portugais'],
      certifications: ['Real Estate Professional', 'Construction Sales Expert', 'Project Management'],
      responseTime: '< 1h',
      hourlyRate: 130,
      availability: 'Sous contrat exclusif',
      recommendations: 78
    }
  ]);

  const [contracts] = useState<Contract[]>([
    {
      id: '1',
      commercialName: 'Marie Dubois',
      product: 'CRM Enterprise',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      commission: 8,
      status: 'active',
      performance: { sales: 15, leads: 67, revenue: 890000 },
      template: 'Contrat Commercial Standard',
      clauses: ['Commission progressive', 'Exclusivité territoriale', 'Objectifs trimestriels'],
      objectives: { salesTarget: 20, revenueTarget: 1200000, deadline: '2024-12-31' },
      signatureStatus: 'signed',
      renewalDate: '2024-11-01',
      territory: 'Île-de-France',
      bonusStructure: 'Bonus 2% si objectifs dépassés de 20%'
    },
    {
      id: '2',
      commercialName: 'Thomas Martin',
      product: 'Solution Industrielle',
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      commission: 12,
      status: 'active',
      performance: { sales: 8, leads: 34, revenue: 1200000 },
      template: 'Contrat Spécialisé Industrie',
      clauses: ['Commission fixe', 'Support technique inclus', 'Formation produit'],
      objectives: { salesTarget: 12, revenueTarget: 1500000, deadline: '2024-06-15' },
      signatureStatus: 'signed',
      renewalDate: '2024-05-15',
      territory: 'Région Auvergne-Rhône-Alpes',
      bonusStructure: 'Prime fixe 5000€ si objectifs atteints'
    },
    {
      id: '3',
      commercialName: 'Sophie Laurent',
      product: 'Logiciel Médical',
      startDate: '2024-02-01',
      endDate: '2024-08-01',
      commission: 10,
      status: 'pending',
      performance: { sales: 0, leads: 0, revenue: 0 },
      template: 'Contrat Secteur Santé',
      clauses: ['Conformité RGPD', 'Certification médicale', 'Support 24/7'],
      objectives: { salesTarget: 15, revenueTarget: 1000000, deadline: '2024-08-01' },
      signatureStatus: 'pending',
      renewalDate: '2024-07-01',
      territory: 'Région PACA',
      bonusStructure: 'Commission dégressive selon volume'
    },
    {
      id: '4',
      commercialName: 'Alexandre Petit',
      product: 'Solutions Financières',
      startDate: '2024-01-10',
      endDate: '2024-07-10',
      commission: 9,
      status: 'active',
      performance: { sales: 12, leads: 45, revenue: 1450000 },
      template: 'Contrat Finance & Assurance',
      clauses: ['Agrément bancaire requis', 'Commission dégressive', 'Audit trimestriel'],
      objectives: { salesTarget: 18, revenueTarget: 2000000, deadline: '2024-07-10' },
      signatureStatus: 'signed',
      renewalDate: '2024-06-10',
      territory: 'Région Occitanie',
      bonusStructure: 'Bonus progressif selon CA généré'
    },
    {
      id: '5',
      commercialName: 'Camille Moreau',
      product: 'Plateforme E-commerce',
      startDate: '2024-02-15',
      endDate: '2024-08-15',
      commission: 7,
      status: 'active',
      performance: { sales: 6, leads: 28, revenue: 450000 },
      template: 'Contrat E-commerce & Retail',
      clauses: ['Commission sur abonnements', 'Support marketing inclus', 'Formation équipe'],
      objectives: { salesTarget: 10, revenueTarget: 800000, deadline: '2024-08-15' },
      signatureStatus: 'signed',
      renewalDate: '2024-07-15',
      territory: 'Région Pays de la Loire',
      bonusStructure: 'Bonus récurrence sur abonnements'
    }
  ]);

  const [prospects] = useState<Prospect[]>([
    {
      id: '1',
      company: 'TechStart Innovation',
      contact: 'Jean Dupont',
      email: 'j.dupont@techstart.fr',
      phone: '+33 1 23 45 67 89',
      sector: 'Technologie',
      location: 'Paris',
      needs: ['CRM', 'Automatisation', 'Analytics'],
      status: 'qualified',
      lastContact: '2024-01-15',
      nextAction: 'Présentation produit',
      priority: 'high',
      estimatedValue: 75000,
      companySize: '50-100 employés',
      decisionMaker: 'Directeur IT',
      budget: '50-100k€',
      timeline: 'Q1 2024',
      source: 'Référencement naturel'
    },
    {
      id: '2',
      company: 'MedCare Plus',
      contact: 'Dr. Marie Leroy',
      email: 'm.leroy@medcare.fr',
      phone: '+33 2 34 56 78 90',
      sector: 'Santé',
      location: 'Lyon',
      needs: ['Gestion patients', 'Conformité RGPD', 'Télémédecine'],
      status: 'proposal',
      lastContact: '2024-01-12',
      nextAction: 'Négociation contrat',
      priority: 'high',
      estimatedValue: 120000,
      companySize: '200-500 employés',
      decisionMaker: 'Directeur Médical',
      budget: '100-150k€',
      timeline: 'Q2 2024',
      source: 'Salon professionnel'
    },
    {
      id: '3',
      company: 'GreenEnergy Solutions',
      contact: 'Pierre Moreau',
      email: 'p.moreau@greenenergy.fr',
      phone: '+33 3 45 67 89 01',
      sector: 'Énergie',
      location: 'Marseille',
      needs: ['Gestion projets', 'Suivi performance', 'Reporting'],
      status: 'contacted',
      lastContact: '2024-01-10',
      nextAction: 'Qualification besoins',
      priority: 'medium',
      estimatedValue: 45000,
      companySize: '20-50 employés',
      decisionMaker: 'CEO',
      budget: '30-60k€',
      timeline: 'Q3 2024',
      source: 'Campagne LinkedIn'
    },
    {
      id: '4',
      company: 'RetailMax',
      contact: 'Sophie Bernard',
      email: 's.bernard@retailmax.fr',
      phone: '+33 4 56 78 90 12',
      sector: 'Retail',
      location: 'Toulouse',
      needs: ['E-commerce', 'Inventory', 'Customer Analytics'],
      status: 'negotiation',
      lastContact: '2024-01-14',
      nextAction: 'Finalisation offre',
      priority: 'high',
      estimatedValue: 85000,
      companySize: '100-200 employés',
      decisionMaker: 'Directeur Commercial',
      budget: '70-100k€',
      timeline: 'Q1 2024',
      source: 'Recommandation client'
    },
    {
      id: '5',
      company: 'LogiFlow Transport',
      contact: 'Marc Dubois',
      email: 'm.dubois@logiflow.fr',
      phone: '+33 5 67 89 01 23',
      sector: 'Logistique',
      location: 'Bordeaux',
      needs: ['Tracking', 'Optimisation routes', 'Gestion flotte'],
      status: 'new',
      lastContact: '2024-01-08',
      nextAction: 'Premier contact',
      priority: 'medium',
      estimatedValue: 65000,
      companySize: '50-100 employés',
      decisionMaker: 'Directeur Logistique',
      budget: '50-80k€',
      timeline: 'Q2 2024',
      source: 'Prospection téléphonique'
    },
    {
      id: '6',
      company: 'FinanceSecure Pro',
      contact: 'Laurent Petit',
      email: 'l.petit@financesecure.fr',
      phone: '+33 1 78 90 12 34',
      sector: 'Finance',
      location: 'Paris',
      needs: ['Conformité', 'Audit automatisé', 'Reporting réglementaire'],
      status: 'qualified',
      lastContact: '2024-01-16',
      nextAction: 'Démonstration technique',
      priority: 'high',
      estimatedValue: 150000,
      companySize: '500+ employés',
      decisionMaker: 'Directeur Financier',
      budget: '120-200k€',
      timeline: 'Q1 2024',
      source: 'Partenaire commercial'
    }
  ]);

  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Campagne CRM Q1 2024',
      type: 'email',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      targets: 500,
      responses: 87,
      conversions: 23,
      budget: 15000,
      costPerLead: 652,
      roi: 245,
      channels: ['Email', 'LinkedIn'],
      targetSegments: ['PME Tech', 'Startups SaaS']
    },
    {
      id: '2',
      name: 'Prospection Secteur Santé',
      type: 'phone',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      targets: 150,
      responses: 45,
      conversions: 12,
      budget: 8000,
      costPerLead: 667,
      roi: 180,
      channels: ['Téléphone', 'Email de suivi'],
      targetSegments: ['Cliniques privées', 'Hôpitaux']
    },
    {
      id: '3',
      name: 'Visites Entreprises Industrielles',
      type: 'visit',
      status: 'completed',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      targets: 50,
      responses: 38,
      conversions: 15,
      budget: 12000,
      costPerLead: 800,
      roi: 320,
      channels: ['Visites terrain', 'Démonstrations'],
      targetSegments: ['Industrie manufacturière', 'Énergie']
    },
    {
      id: '4',
      name: 'Webinaires Solutions Finance',
      type: 'webinar',
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      targets: 300,
      responses: 156,
      conversions: 28,
      budget: 10000,
      costPerLead: 357,
      roi: 280,
      channels: ['Webinaires', 'Content marketing'],
      targetSegments: ['Banques', 'Assurances', 'Fintech']
    }
  ]);

  const { trackAction, setUserType } = useAdManager();

  useEffect(() => {
    // Définir le type d'utilisateur comme entreprise
    setUserType('enterprise', {
      sector: 'technology',
      companySize: 'pme',
      location: 'France'
    });

    // Tracker l'accès à la page entreprise
    trackAction('view-enterprise-dashboard');
  }, [setUserType, trackAction]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'busy':
        return 'warning';
      case 'contracted':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'busy':
        return 'Occupé';
      case 'contracted':
        return 'Sous contrat';
      default:
        return status;
    }
  };

  const getContractStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getContractStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'pending':
        return 'En attente';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  const getProspectStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'info';
      case 'contacted':
        return 'warning';
      case 'qualified':
        return 'success';
      case 'proposal':
        return 'info';
      case 'negotiation':
        return 'warning';
      case 'closed':
        return 'success';
      default:
        return 'default';
    }
  };

  const getProspectStatusLabel = (status: string) => {
    switch (status) {
      case 'new':
        return 'Nouveau';
      case 'contacted':
        return 'Contacté';
      case 'qualified':
        return 'Qualifié';
      case 'proposal':
        return 'Proposition';
      case 'negotiation':
        return 'Négociation';
      case 'closed':
        return 'Conclu';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  const getCampaignStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'default';
      case 'active':
        return 'success';
      case 'paused':
        return 'warning';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  const filteredCommercials = commercials.filter(commercial => {
    return (
      (!selectedFilters.location || commercial.location.includes(selectedFilters.location)) &&
      (!selectedFilters.specialization ||
        commercial.specialization.some(spec => spec.toLowerCase().includes(selectedFilters.specialization.toLowerCase()))) &&
      (!selectedFilters.experience || commercial.experience >= parseInt(selectedFilters.experience))
    );
  });

  const handleViewCommercials = () => {
    setActiveSection('commercials');
    trackAction('view-commercials');
  };

  const handleManageContracts = () => {
    setActiveSection('contracts');
    trackAction('manage-contracts');
  };

  const handleViewPerformance = () => {
    setActiveSection('performance');
    trackAction('view-performance');
  };

  const handleViewProspection = () => {
    setActiveSection('prospection');
    trackAction('view-prospects');
  };

  const handleDiscoverCrm = () => {
    setShowCrmModal(true);
    trackAction('discover-crm-solutions');
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(true);
    trackAction('upgrade-premium');
  };

  const handleLearnMore = () => {
    // Ouvrir une page d'information détaillée sur les outils de recrutement RH
    window.open('https://readdy.ai', '_blank');
    trackAction('learn-more-recruitment-tools');
  };

  const handleContactCommercial = (commercial: Commercial) => {
    setSelectedCommercial(commercial);
    setShowContactModal(true);
    setContactSent(false);
    setContactForm({
      subject: `Demande de collaboration - ${commercial.specialization[0]}`,
      message: `Bonjour ${commercial.name},\n\nNous sommes intéressés par vos services dans le domaine ${commercial.specialization.join(', ')}.\n\nNous aimerions discuter d'une éventuelle collaboration.\n\nCordialement,`,
      contactMethod: 'email',
      urgency: 'normal'
    });
    trackAction('contact-commercial', { commercialId: commercial.id, commercialName: commercial.name });
  };

  const handleViewProfile = (commercial: Commercial) => {
    setSelectedCommercial(commercial);
    setShowProfileModal(true);
    trackAction('view-commercial-profile', { commercialId: commercial.id, commercialName: commercial.name });
  };

  const handleSendContact = () => {
    if (!contactForm.subject || !contactForm.message) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Simuler l'envoi du message
    console.log('Message envoyé à', selectedCommercial?.name, contactForm);
    
    setContactSent(true);
    trackAction('send-contact-message', { 
      commercialId: selectedCommercial?.id,
      method: contactForm.contactMethod,
      urgency: contactForm.urgency
    });

    // Fermer le modal après 2 secondes
    setTimeout(() => {
      setShowContactModal(false);
      setContactSent(false);
    }, 2000);
  };

  const handleNegotiate = (contract: Contract) => {
    const commercial = commercials.find(c => c.name === contract.commercialName);
    if (commercial) {
      setSelectedCommercial(commercial);
      setSelectedContract(contract);
      setShowNegotiateModal(true);
      setNegotiationSent(false);
      
      // Pré-remplir le formulaire avec les données actuelles du contrat
      setNegotiationForm({
        proposedRate: commercial.hourlyRate,
        proposedCommission: contract.commission,
        contractDuration: `${contract.startDate} - ${contract.endDate}`,
        exclusivity: contract.clauses.includes('Exclusivité territoriale'),
        territory: contract.territory,
        objectives: `Ventes: ${contract.objectives.salesTarget}, CA: ${contract.objectives.revenueTarget}€`,
        bonusStructure: contract.bonusStructure,
        additionalTerms: ''
      });
      
      trackAction('negotiate-contract', { 
        contractId: contract.id, 
        commercialName: contract.commercialName 
      });
    }
  };

  const handleSendNegotiation = () => {
    if (!negotiationForm.proposedRate || !negotiationForm.proposedCommission) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Simuler l'envoi de la proposition de négociation
    console.log('Proposition de négociation envoyée:', negotiationForm);
    
    setNegotiationSent(true);
    trackAction('send-negotiation', { 
      contractId: selectedContract?.id,
      commercialId: selectedCommercial?.id,
      proposedRate: negotiationForm.proposedRate,
      proposedCommission: negotiationForm.proposedCommission
    });

    // Fermer le modal après 3 secondes
    setTimeout(() => {
      setShowNegotiateModal(false);
      setNegotiationSent(false);
    }, 3000);
  };

  const handleRenew = (contract: Contract) => {
    const commercial = commercials.find(c => c.name === contract.commercialName);
    if (commercial) {
      setSelectedCommercial(commercial);
      setSelectedContract(contract);
      setShowRenewModal(true);
      setRenewalSent(false);
      
      // Calculer la nouvelle date de fin basée sur 12 mois par défaut
      const currentEndDate = new Date(contract.endDate);
      const newEndDate = new Date(currentEndDate);
      newEndDate.setMonth(newEndDate.getMonth() + 12);
      
      // Pré-remplir le formulaire
      setRenewalForm({
        newEndDate: newEndDate.toISOString().split('T')[0],
        duration: '12',
        adjustRate: false,
        newRate: commercial.hourlyRate,
        adjustCommission: false,
        newCommission: contract.commission,
        newObjectives: `Ventes: ${contract.objectives.salesTarget}, CA: ${contract.objectives.revenueTarget}€`,
        autoRenewal: false,
        additionalClauses: ''
      });
      
      trackAction('renew-contract', { 
        contractId: contract.id, 
        commercialName: contract.commercialName 
      });
    }
  };

  const handleSendRenewal = () => {
    if (!renewalForm.newEndDate) {
      alert('Veuillez sélectionner une date de fin');
      return;
    }

    // Simuler l'envoi de la demande de renouvellement
    console.log('Demande de renouvellement envoyée:', renewalForm);
    
    setRenewalSent(true);
    trackAction('send-renewal', { 
      contractId: selectedContract?.id,
      commercialId: selectedCommercial?.id,
      duration: renewalForm.duration,
      autoRenewal: renewalForm.autoRenewal
    });

    // Fermer le modal après 3 secondes
    setTimeout(() => {
      setShowRenewModal(false);
      setRenewalSent(false);
    }, 3000);
  };

  const handleConfigureKpi = () => {
    setShowKpiModal(true);
    setKpiSaved(false);
    trackAction('configure-kpi');
  };

  const handleSaveKpi = () => {
    // Simuler la sauvegarde de la configuration KPI
    console.log('Configuration KPI sauvegardée:', kpiForm);
    
    setKpiSaved(true);
    trackAction('save-kpi-configuration', { 
      enabledKpis: Object.keys(kpiForm).filter(key => kpiForm[key as keyof typeof kpiForm] === true).length,
      customKpis: [kpiForm.customKpi1Name, kpiForm.customKpi2Name].filter(name => name).length
    });

    // Fermer le modal après 2 secondes
    setTimeout(() => {
      setShowKpiModal(false);
      setKpiSaved(false);
    }, 2000);
  };

  const handleViewDetails = (commercial: Commercial) => {
    setSelectedCommercial(commercial);
    setShowDetailsModal(true);
    trackAction('view-commercial-details', { commercialId: commercial.id, commercialName: commercial.name });
  };

  const handleEditContract = (contract: Contract) => {
    const commercial = commercials.find(c => c.name === contract.commercialName);
    if (commercial) {
      setSelectedCommercial(commercial);
      setSelectedContract(contract);
      setShowEditModal(true);
      setEditingSaved(false);
    }
  };

  const handleSaveEdit = () => {
    if (!selectedContract) {
      alert('Erreur lors de la sauvegarde');
      return;
    }

    // Simuler la sauvegarde des modifications
    console.log('Modifications sauvegardées pour le contrat:', selectedContract);
    
    setEditingSaved(true);
    trackAction('edit-contract', { 
      contractId: selectedContract.id,
      commercialName: selectedContract.commercialName
    });

    // Fermer le modal après 2 secondes
    setTimeout(() => {
      setShowEditModal(false);
      setEditingSaved(false);
    }, 2000);
  };

  const handleAddProduct = () => {
    setShowProductModal(true);
    setProductSaved(false);
    setProductForm({
      name: '',
      category: '',
      description: '',
      price: '',
      commission: '',
      targetMarket: '',
      salesMaterials: '',
      technicalSpecs: '',
      competitiveAdvantages: '',
      trainingRequired: false,
      certificationRequired: false
    });
    trackAction('add-product-service');
  };

  const handleSaveProduct = () => {
    if (!productForm.name || !productForm.category || !productForm.description) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Simuler la sauvegarde du produit
    console.log('Produit/Service ajouté:', productForm);
    
    setProductSaved(true);
    trackAction('save-product-service', { 
      productName: productForm.name,
      category: productForm.category
    });

    // Fermer le modal après 2 secondes
    setTimeout(() => {
      setShowProductModal(false);
      setProductSaved(false);
    }, 2000);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-user-line text-xl text-blue-600"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {commercials.filter(c => c.status === 'available').length}
            </p>
            <p className="text-sm text-gray-600">Commerciaux disponibles</p>
            <p className="text-xs text-blue-600 mt-1">+2 cette semaine</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-contract-line text-xl text-green-600"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {contracts.filter(c => c.status === 'active').length}
            </p>
            <p className="text-sm text-gray-600">Contrats actifs</p>
            <p className="text-xs text-green-600 mt-1">+1 ce mois</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-line-chart-line text-xl text-purple-600"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {contracts.reduce((sum, c) => sum + c.performance.sales, 0)}
            </p>
            <p className="text-sm text-gray-600">Ventes générées</p>
            <p className="text-xs text-purple-600 mt-1">+8% vs mois dernier</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-money-euro-circle-line text-xl text-orange-600"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {(contracts.reduce((sum, c) => sum + c.performance.revenue, 0) / 1000000).toFixed(1)}M€
            </p>
            <p className="text-sm text-gray-600">Chiffre d'affaires</p>
            <p className="text-xs text-orange-600 mt-1">+15% vs trimestre dernier</p>
          </div>
        </Card>
      </div>

      {/* Notifications et alertes */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          <i className="ri-notification-line mr-2"></i>
          Notifications et Alertes
        </h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <i className="ri-user-add-line text-blue-600"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">3 nouveaux commerciaux disponibles</p>
              <p className="text-xs text-blue-700">Spécialisés en technologie et SaaS - Voir les profils</p>
            </div>
            <Badge variant="info">Nouveau</Badge>
          </div>
          <div className="flex items-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
              <i className="ri-time-line text-orange-600"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-orange-900">Contrat avec Sophie Laurent expire dans 30 jours</p>
              <p className="text-xs text-orange-700">Logiciel Médical - Pensez à renouveler ou négocier une extension</p>
            </div>
            <Badge variant="warning">Urgent</Badge>
          </div>
          <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <i className="ri-trophy-line text-green-600"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-green-900">Performance exceptionnelle de Thomas Martin</p>
              <p className="text-xs text-green-700">+150% d'objectifs atteints ce mois - Bonus automatique déclenché</p>
            </div>
            <Badge variant="success">Succès</Badge>
          </div>
          <div className="flex items-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <i className="ri-mail-line text-purple-600"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-purple-900">Nouvelle demande de contact</p>
              <p className="text-xs text-purple-700">FinanceSecure Pro souhaite une démonstration - Prospect qualifié</p>
            </div>
            <Badge variant="info">Prospect</Badge>
          </div>
        </div>
      </Card>

      {/* Accès rapide */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          <i className="ri-dashboard-line mr-2"></i>
          Accès Rapide
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center hover:bg-blue-50 hover:border-blue-300"
            onClick={handleViewCommercials}
          >
            <i className="ri-user-search-line text-xl mb-2 text-blue-600"></i>
            <span className="text-sm font-medium">Recruter Commercial</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center hover:bg-green-50 hover:border-green-300"
            onClick={handleManageContracts}
          >
            <i className="ri-file-list-line text-xl mb-2 text-green-600"></i>
            <span className="text-sm font-medium">Gérer Contrats</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center hover:bg-purple-50 hover:border-purple-300"
            onClick={handleViewPerformance}
          >
            <i className="ri-bar-chart-box-line text-xl mb-2 text-purple-600"></i>
            <span className="text-sm font-medium">Voir Performances</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center hover:bg-orange-50 hover:border-orange-300"
            onClick={handleViewProspection}
          >
            <i className="ri-search-eye-line text-xl mb-2 text-orange-600"></i>
            <span className="text-sm font-medium">Outils Prospection</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center hover:bg-teal-50 hover:border-teal-300"
            onClick={handleAddProduct}
          >
            <i className="ri-add-box-line text-xl mb-2 text-teal-600"></i>
            <span className="text-sm font-medium">Ajouter Produit</span>
          </Button>
        </div>
      </Card>

      {/* Bannière publicitaire compacte */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <i className="ri-building-line text-xl"></i>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Solutions CRM Avancées</h4>
              <p className="text-xs opacity-90">Optimisez votre gestion commerciale avec l'IA</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white text-blue-600 border-white hover:bg-gray-100 whitespace-nowrap"
            onClick={handleDiscoverCrm}
          >
            Découvrir
          </Button>
        </div>
      </div>
    </div>
  );

  const renderCommercials = () => (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{commercials.filter(c => c.status === 'available').length}</p>
            <p className="text-sm text-gray-600">Disponibles</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{commercials.filter(c => c.status === 'busy').length}</p>
            <p className="text-sm text-gray-600">Occupés</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{commercials.filter(c => c.status === 'contracted').length}</p>
            <p className="text-sm text-gray-600">Sous contrat</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(commercials.reduce((sum, c) => sum + c.rating, 0) / commercials.length * 10) / 10}
            </p>
            <p className="text-sm text-gray-600">Note moyenne</p>
          </div>
        </Card>
      </div>

      {/* Filtres avancés */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          <i className="ri-filter-line mr-2"></i>
          Filtres de Recherche Avancés
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
            <div className="relative">
              <select
                value={selectedFilters.location}
                onChange={e => setSelectedFilters({ ...selectedFilters, location: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
              >
                <option value="">Toutes les villes</option>
                <option value="Paris">Paris</option>
                <option value="Lyon">Lyon</option>
                <option value="Marseille">Marseille</option>
                <option value="Toulouse">Toulouse</option>
                <option value="Nantes">Nantes</option>
                <option value="Bordeaux">Bordeaux</option>
              </select>
              <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secteur</label>
            <div className="relative">
              <select
                value={selectedFilters.sector}
                onChange={e => setSelectedFilters({ ...selectedFilters, sector: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
              >
                <option value="">Tous secteurs</option>
                <option value="Technologie">Technologie</option>
                <option value="Industrie">Industrie</option>
                <option value="Santé">Santé</option>
                <option value="Finance">Finance</option>
                <option value="Retail">Retail</option>
                <option value="Immobilier">Immobilier</option>
              </select>
              <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Spécialisation</label>
            <input
              type="text"
              placeholder="Ex: SaaS, B2B..."
              value={selectedFilters.specialization}
              onChange={e => setSelectedFilters({ ...selectedFilters, specialization: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expérience min.</label>
            <div className="relative">
              <select
                value={selectedFilters.experience}
                onChange={e => setSelectedFilters({ ...selectedFilters, experience: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
              >
                <option value="">Toute expérience</option>
                <option value="2">2+ ans</option>
                <option value="5">5+ ans</option>
                <option value="8">8+ ans</option>
              </select>
              <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>
          <div className="flex items-end">
            <Button variant="primary" className="w-full">
              <i className="ri-search-line mr-2"></i>
              Rechercher
            </Button>
          </div>
        </div>
      </Card>

      {/* Liste des commerciaux avec détails enrichis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCommercials.map(commercial => (
          <Card key={commercial.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <img src={commercial.profileImage} alt={commercial.name} className="w-20 h-20 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{commercial.name}</h4>
                    <p className="text-sm text-gray-600 flex items-center">
                      <i className="ri-map-pin-line mr-1"></i>
                      {commercial.location}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <i className="ri-time-line mr-1"></i>
                      {commercial.responseTime} • {commercial.availability}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={getStatusColor(commercial.status)}>
                      {getStatusLabel(commercial.status)}
                    </Badge>
                    <p className="text-sm font-medium text-gray-900 mt-1">{commercial.hourlyRate}€/h</p>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center mr-4">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`ri-star-${i < Math.floor(commercial.rating) ? 'fill' : 'line'} text-yellow-400 text-sm`}
                      ></i>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({commercial.rating})</span>
                  </div>
                  <span className="text-sm text-gray-600">{commercial.experience} ans d'exp.</span>
                  <span className="text-sm text-gray-600 ml-2">• {commercial.recommendations} recommandations</span>
                </div>

                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{commercial.description}</p>

                <div className="mb-3">
                  <p className="text-xs text-gray-600 mb-1">Spécialisations:</p>
                  <div className="flex flex-wrap gap-1">
                    {commercial.specialization.map((spec, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-gray-600 mb-1">Certifications:</p>
                  <div className="flex flex-wrap gap-1">
                    {commercial.certifications.slice(0, 2).map((cert, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        {cert}
                      </span>
                    ))}
                    {commercial.certifications.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{commercial.certifications.length - 2} autres
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{commercial.completedSales}</p>
                    <p className="text-xs text-gray-600">Ventes</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{(commercial.totalRevenue / 1000000).toFixed(1)}M€</p>
                    <p className="text-xs text-gray-600">CA généré</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{commercial.languages.length}</p>
                    <p className="text-xs text-gray-600">Langues</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="primary" size="sm" className="flex-1" onClick={() => handleContactCommercial(commercial)}>
                    <i className="ri-mail-line mr-1"></i>
                    Contacter
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleViewProfile(commercial)}>
                    <i className="ri-user-line mr-1"></i>
                    Profil
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleViewDetails(commercial)}>
                    <i className="ri-eye-line mr-1"></i>
                    Détails
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bannière publicitaire compacte */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <i className="ri-user-star-line text-xl"></i>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Outils de Recrutement RH</h4>
              <p className="text-xs opacity-90">Trouvez les meilleurs talents commerciaux</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white text-green-600 border-white hover:bg-gray-100 whitespace-nowrap"
            onClick={handleLearnMore}
          >
            En savoir plus
          </Button>
        </div>
      </div>
    </div>
  );

  const renderContracts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          <i className="ri-file-list-line mr-2"></i>
          Gestion des Contrats
        </h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <i className="ri-file-text-line mr-2"></i>
            Modèles
          </Button>
          <Button variant="outline" size="sm">
            <i className="ri-download-line mr-2"></i>
            Exporter
          </Button>
          <Button variant="primary" onClick={() => setShowContractModal(true)}>
            <i className="ri-add-line mr-2"></i>
            Nouveau contrat
          </Button>
        </div>
      </div>

      {/* Statistiques des contrats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{contracts.filter(c => c.status === 'active').length}</p>
            <p className="text-sm text-gray-600">Contrats actifs</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{contracts.filter(c => c.signatureStatus === 'pending').length}</p>
            <p className="text-sm text-gray-600">En attente signature</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {Math.round(contracts.reduce((sum, c) => sum + c.commission, 0) / contracts.length)}%
            </p>
            <p className="text-sm text-gray-600">Commission moyenne</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {contracts.filter(c => new Date(c.endDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length}
            </p>
            <p className="text-sm text-gray-600">Échéances 30j</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">
              {(contracts.reduce((sum, c) => sum + c.performance.revenue, 0) / 1000000).toFixed(1)}M€
            </p>
            <p className="text-sm text-gray-600">CA total généré</p>
          </div>
        </Card>
      </div>

      {/* Notifications contrats */}
      <Card>
        <h4 className="font-medium text-gray-900 mb-4">
          <i className="ri-notification-line mr-2"></i>
          Notifications Contrats
        </h4>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
              <i className="ri-time-line text-orange-600"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-orange-900">
                Contrat Sophie Laurent expire dans 30 jours
              </p>
              <p className="text-xs text-orange-700">
                Logiciel Médical - Échéance: 01/08/2024 - Territoire: Région PACA
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Renouveler
              </Button>
              <Button variant="outline" size="sm">
                Négocier
              </Button>
            </div>
          </div>
          <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <i className="ri-file-text-line text-blue-600"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">Contrat en attente de signature</p>
              <p className="text-xs text-blue-700">Sophie Laurent - Logiciel Médical - Envoyé il y a 5 jours</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Relancer
              </Button>
              <Button variant="outline" size="sm">
                Modifier
              </Button>
            </div>
          </div>
          <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <i className="ri-check-line text-green-600"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-green-900">Objectifs dépassés - Bonus automatique</p>
              <p className="text-xs text-green-700">Thomas Martin - Solution Industrielle - Bonus de 5000€ déclenché</p>
            </div>
            <Badge variant="success">Bonus</Badge>
          </div>
        </div>
      </Card>

      {/* Liste des contrats enrichie */}
      <div className="grid grid-cols-1 gap-6">
        {contracts.map(contract => (
          <Card key={contract.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">{contract.commercialName}</h4>
                <p className="text-sm text-gray-600">{contract.product}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Modèle: {contract.template} • Territoire: {contract.territory}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={getContractStatusColor(contract.status)}>
                  {getContractStatusLabel(contract.status)}
                </Badge>
                <Badge variant={contract.signatureStatus === 'signed' ? 'success' : 'warning'}>
                  {contract.signatureStatus === 'signed' ? 'Signé' : 'En attente'}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm mb-4">
              <div>
                <p className="text-gray-600">Début</p>
                <p className="font-medium">{contract.startDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Fin</p>
                <p className="font-medium">{contract.endDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Commission</p>
                <p className="font-medium">{contract.commission}%</p>
              </div>
              <div>
                <p className="text-gray-600">Objectif ventes</p>
                <p className="font-medium">{contract.objectives.salesTarget}</p>
              </div>
              <div>
                <p className="text-gray-600">Objectif CA</p>
                <p className="font-medium">{(contract.objectives.revenueTarget / 1000).toFixed(0)}k€</p>
              </div>
              <div>
                <p className="text-gray-600">Renouvellement</p>
                <p className="font-medium">{contract.renewalDate}</p>
              </div>
            </div>

            {/* Clauses contractuelles */}
            <div className="mb-4">
              <p className="text-xs text-gray-600 mb-2">Clauses spécifiques:</p>
              <div className="flex flex-wrap gap-1">
                {contract.clauses.map((clause, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {clause}
                  </span>
                ))}
              </div>
            </div>

            {/* Structure de bonus */}
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-600 mb-1">Structure de bonus:</p>
              <p className="text-sm text-blue-800">{contract.bonusStructure}</p>
            </div>

            {/* Performance actuelle avec barres de progression */}
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-900 mb-3">Performance actuelle</h5>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Ventes: {contract.performance.sales}/{contract.objectives.salesTarget}</span>
                    <span>{Math.round((contract.performance.sales / contract.objectives.salesTarget) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min((contract.performance.sales / contract.objectives.salesTarget) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CA: {(contract.performance.revenue / 1000).toFixed(0)}k€/{(contract.objectives.revenueTarget / 1000).toFixed(0)}k€</span>
                    <span>{Math.round((contract.performance.revenue / contract.objectives.revenueTarget) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${Math.min((contract.performance.revenue / contract.objectives.revenueTarget) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-sm pt-2">
                  <div>
                    <p className="font-medium text-gray-900">{contract.performance.sales}</p>
                    <p className="text-xs text-gray-600">Ventes réalisées</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{contract.performance.leads}</p>
                    <p className="text-xs text-gray-600">Leads générés</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{(contract.performance.revenue / 1000).toFixed(0)}k€</p>
                    <p className="text-xs text-gray-600">CA généré</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedContract(contract)}>
                <i className="ri-edit-line mr-1"></i>
                Modifier
              </Button>
              <Button variant="outline" size="sm">
                <i className="ri-eye-line mr-1"></i>
                Détails
              </Button>
              <Button variant="outline" size="sm">
                <i className="ri-download-line mr-1"></i>
                Télécharger
              </Button>
              <Button variant="outline" size="sm">
                <i className="ri-file-copy-line mr-1"></i>
                Dupliquer
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleRenew(contract)}>
                Renouveler
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleNegotiate(contract)}>
                Négocier
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Bannière publicitaire compacte */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <i className="ri-file-shield-line text-xl"></i>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Services Juridiques</h4>
              <p className="text-xs opacity-90">Sécurisez vos contrats avec nos experts</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="bg-white text-purple-600 border-white hover:bg-gray-100 whitespace-nowrap">
            Consulter
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          <i className="ri-bar-chart-box-line mr-2"></i>
          Suivi des Performances
        </h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <i className="ri-download-line mr-2"></i>
            Exporter rapport
          </Button>
          <Button variant="outline" size="sm">
            <i className="ri-calendar-line mr-2"></i>
            Période
          </Button>
          <Button variant="outline" size="sm" onClick={handleConfigureKpi}>
            <i className="ri-settings-line mr-2"></i>
            Configurer KPI
          </Button>
        </div>
      </div>

      {/* KPI Dashboard enrichi */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-money-euro-circle-line text-xl text-green-600"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {(contracts.reduce((sum, c) => sum + c.performance.revenue, 0) / 1000000).toFixed(1)}M€
            </p>
            <p className="text-sm text-gray-600">CA Total Généré</p>
            <div className="flex items-center justify-center mt-2">
              <i className="ri-arrow-up-line text-green-600 text-sm mr-1"></i>
              <p className="text-xs text-green-600">+15% vs mois dernier</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-percent-line text-xl text-blue-600"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(
                (contracts.reduce((sum, c) => sum + c.performance.sales, 0) /
                  contracts.reduce((sum, c) => sum + c.performance.leads, 0)) *
                  100
              )}
              %
            </p>
            <p className="text-sm text-gray-600">Taux Conversion Moyen</p>
            <div className="flex items-center justify-center mt-2">
              <i className="ri-arrow-up-line text-blue-600 text-sm mr-1"></i>
              <p className="text-xs text-blue-600">+3% vs mois dernier</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-shopping-cart-line text-xl text-purple-600"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">{contracts.reduce((sum, c) => sum + c.performance.sales, 0)}</p>
            <p className="text-sm text-gray-600">Ventes Totales</p>
            <div className="flex items-center justify-center mt-2">
              <i className="ri-arrow-up-line text-purple-600 text-sm mr-1"></i>
              <p className="text-xs text-purple-600">+8% vs mois dernier</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-time-line text-xl text-orange-600"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">32j</p>
            <p className="text-sm text-gray-600">Cycle Vente Moyen</p>
            <div className="flex items-center justify-center mt-2">
              <i className="ri-arrow-down-line text-orange-600 text-sm mr-1"></i>
              <p className="text-xs text-orange-600">-5j vs mois dernier</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Graphiques de performance enrichis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h4 className="font-medium text-gray-900 mb-4">
            <i className="ri-user-line mr-2"></i>
            Performance par Commercial
          </h4>
          <div className="space-y-4">
            {contracts.map(contract => {
              const progressSales = (contract.performance.sales / contract.objectives.salesTarget) * 100;
              const progressRevenue = (contract.performance.revenue / contract.objectives.revenueTarget) * 100;
              return (
                <div key={contract.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-900">{contract.commercialName}</p>
                      <p className="text-sm text-gray-600">{contract.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">{(contract.performance.revenue / 1000).toFixed(0)}k€</p>
                      <p className="text-sm text-gray-600">{contract.performance.sales} ventes</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Objectif ventes</span>
                        <span>{Math.round(progressSales)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${progressSales >= 100 ? 'bg-green-600' : progressSales >= 75 ? 'bg-blue-600' : 'bg-orange-600'}`}
                          style={{ width: `${Math.min(progressSales, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Objectif CA</span>
                        <span>{Math.round(progressRevenue)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${progressRevenue >= 100 ? 'bg-green-600' : progressRevenue >= 75 ? 'bg-blue-600' : 'bg-orange-600'}`}
                          style={{ width: `${Math.min(progressRevenue, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h4 className="font-medium text-gray-900 mb-4">
            <i className="ri-line-chart-line mr-2"></i>
            Évolution Mensuelle
          </h4>
          <div className="space-y-3">
            {[
              { month: 'Janvier', value: 85, revenue: '2.1M€', growth: '+12%' },
              { month: 'Février', value: 92, revenue: '2.3M€', growth: '+8%' },
              { month: 'Mars', value: 78, revenue: '1.9M€', growth: '-15%' },
              { month: 'Avril', value: 95, revenue: '2.4M€', growth: '+22%' }
            ].map((item, index) => (
              <div key={item.month} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.month}</span>
                    <div className="text-right">
                      <span className="text-sm font-medium">{item.revenue}</span>
                      <span className={`text-xs ml-2 ${item.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {item.growth}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.value}%` }}></div>
                    </div>
                    <span className="text-sm font-medium w-8">{item.value}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h4 className="font-medium text-gray-900 mb-4">
            <i className="ri-pie-chart-line mr-2"></i>
            Répartition par Secteur
          </h4>
          <div className="space-y-3">
            {[
              { sector: 'Technologie', percentage: 35, color: 'bg-blue-600', revenue: '1.2M€' },
              { sector: 'Industrie', percentage: 28, color: 'bg-green-600', revenue: '0.9M€' },
              { sector: 'Santé', percentage: 22, color: 'bg-purple-600', revenue: '0.7M€' },
              { sector: 'Finance', percentage: 15, color: 'bg-orange-600', revenue: '0.5M€' }
            ].map(item => (
              <div key={item.sector} className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <span className="text-sm text-gray-600 w-20">{item.sector}</span>
                  <div className="flex-1 mx-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium w-8">{item.percentage}%</span>
                    <span className="text-xs text-gray-500 ml-2">{item.revenue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h4 className="font-medium text-gray-900 mb-4">
            <i className="ri-target-line mr-2"></i>
            Objectifs vs Réalisations
          </h4>
          <div className="space-y-4">
            {contracts
              .filter(c => c.status === 'active')
              .map(contract => {
                const salesProgress = (contract.performance.sales / contract.objectives.salesTarget) * 100;
                const revenueProgress = (contract.performance.revenue / contract.objectives.revenueTarget) * 100;
                const isExceeding = salesProgress > 100 || revenueProgress > 100;
                return (
                  <div key={contract.id} className={`p-3 border rounded-lg ${isExceeding ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900">{contract.commercialName}</p>
                      {isExceeding && <Badge variant="success">Objectifs dépassés</Badge>}
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>
                            Ventes: {contract.performance.sales}/{contract.objectives.salesTarget}
                          </span>
                          <span>{Math.round(salesProgress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${salesProgress >= 100 ? 'bg-green-600' : 'bg-blue-600'}`}
                            style={{ width: `${Math.min(salesProgress, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>
                            CA: {(contract.performance.revenue / 1000).toFixed(0)}k€/
                            {(contract.objectives.revenueTarget / 1000).toFixed(0)}k€
                          </span>
                          <span>{Math.round(revenueProgress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${revenueProgress >= 100 ? 'bg-green-600' : 'bg-blue-600'}`}
                            style={{ width: `${Math.min(revenueProgress, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>
      </div>

      {/* Bannière publicitaire compacte */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <i className="ri-bar-chart-box-line text-xl"></i>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Outils d'Analyse Avancés</h4>
              <p className="text-xs opacity-90">Optimisez vos performances avec l'IA</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="bg-white text-teal-600 border-white hover:bg-gray-100 whitespace-nowrap">
            Essayer
          </Button>
        </div>
      </div>
    </div>
  );

  const renderProspection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          <i className="ri-search-eye-line mr-2"></i>
          Outils de Prospection
        </h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <i className="ri-download-line mr-2"></i>
            Exporter prospects
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowProspectModal(true)}>
            <i className="ri-add-line mr-2"></i>
            Nouveau prospect
          </Button>
          <Button variant="primary" size="sm" onClick={() => setShowCampaignModal(true)}>
            <i className="ri-megaphone-line mr-2"></i>
            Nouvelle campagne
          </Button>
        </div>
      </div>

      {/* Statistiques prospection enrichies */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{prospects.length}</p>
            <p className="text-sm text-gray-600">Prospects totaux</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{prospects.filter(p => p.status === 'qualified').length}</p>
            <p className="text-sm text-gray-600">Qualifiés</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{prospects.filter(p => p.priority === 'high').length}</p>
            <p className="text-sm text-gray-600">Priorité haute</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{campaigns.filter(c => c.status === 'active').length}</p>
            <p className="text-sm text-gray-600">Campagnes actives</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">
              {(prospects.reduce((sum, p) => sum + p.estimatedValue, 0) / 1000).toFixed(0)}k€
            </p>
            <p className="text-sm text-gray-600">Pipeline valeur</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-teal-600">
              {Math.round((campaigns.reduce((sum, c) => sum + c.conversions, 0) / campaigns.reduce((sum, c) => sum + c.responses, 0)) * 100)}%
            </p>
            <p className="text-sm text-gray-600">Taux conversion</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Base de données prospects enrichie */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">
                <i className="ri-database-line mr-2"></i>
                Base de Données Prospects
              </h4>
              <div className="flex space-x-2">
                <div className="relative">
                  <select className="p-2 border border-gray-300 rounded text-sm pr-8">
                    <option>Tous secteurs</option>
                    <option>Technologie</option>
                    <option>Santé</option>
                    <option>Énergie</option>
                    <option>Retail</option>
                    <option>Finance</option>
                    <option>Logistique</option>
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
                <div className="relative">
                  <select className="p-2 border border-gray-300 rounded text-sm pr-8">
                    <option>Toutes priorités</option>
                    <option>Haute</option>
                    <option>Moyenne</option>
                    <option>Basse</option>
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
                <div className="relative">
                  <select className="p-2 border border-gray-300 rounded text-sm pr-8">
                    <option>Tous statuts</option>
                    <option>Nouveau</option>
                    <option>Contacté</option>
                    <option>Qualifié</option>
                    <option>Proposition</option>
                    <option>Négociation</option>
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {prospects.map(prospect => (
                <div
                  key={prospect.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="font-medium text-gray-900">{prospect.company}</h5>
                      <p className="text-sm text-gray-600">
                        {prospect.contact} • {prospect.location} • {prospect.companySize}
                      </p>
                      <p className="text-xs text-gray-500">
                        {prospect.email} • {prospect.phone}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getPriorityColor(prospect.priority)}>
                        {prospect.priority === 'high'
                          ? 'Haute'
                          : prospect.priority === 'medium'
                          ? 'Moyenne'
                          : 'Basse'}
                      </Badge>
                      <Badge variant={getProspectStatusColor(prospect.status)}>
                        {getProspectStatusLabel(prospect.status)}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-600">Secteur</p>
                      <p className="font-medium">{prospect.sector}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Valeur estimée</p>
                      <p className="font-medium text-green-600">{prospect.estimatedValue.toLocaleString()}€</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Budget</p>
                      <p className="font-medium">{prospect.budget}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Timeline</p>
                      <p className="font-medium">{prospect.timeline}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-600">Dernier contact</p>
                      <p className="font-medium">{prospect.lastContact}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Prochaine action</p>
                      <p className="font-medium">{prospect.nextAction}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Source</p>
                      <p className="font-medium">{prospect.source}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1">Décideur: {prospect.decisionMaker}</p>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1">Besoins identifiés:</p>
                    <div className="flex flex-wrap gap-1">
                      {prospect.needs.map((need, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <i className="ri-mail-line mr-1"></i>
                      Email
                    </Button>
                    <Button variant="outline" size="sm">
                      <i className="ri-phone-line mr-1"></i>
                      Appeler
                    </Button>
                    <Button variant="outline" size="sm">
                      <i className="ri-calendar-line mr-1"></i>
                      RDV
                    </Button>
                    <Button variant="outline" size="sm">
                      <i className="ri-edit-line mr-1"></i>
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm">
                      <i className="ri-arrow-right-line mr-1"></i>
                      Qualifier
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Gestion des campagnes enrichie */}
        <div>
          <Card>
            <h4 className="font-medium text-gray-900 mb-4">
              <i className="ri-megaphone-line mr-2"></i>
              Campagnes de Prospection
            </h4>
            <div className="space-y-4">
              {campaigns.map(campaign => (
                <div key={campaign.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h5 className="font-medium text-gray-900 text-sm">{campaign.name}</h5>
                      <p className="text-xs text-gray-600">
                        {campaign.type === 'email'
                          ? 'Email'
                          : campaign.type === 'phone'
                          ? 'Téléphone'
                          : campaign.type === 'visit'
                          ? 'Visite'
                          : 'Webinaire'}
                      </p>
                    </div>
                    <Badge variant={getCampaignStatusColor(campaign.status)}>
                      {campaign.status === 'active'
                        ? 'Active'
                        : campaign.status === 'completed'
                        ? 'Terminée'
                        : campaign.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>
                      <p className="text-gray-600">Cibles</p>
                      <p className="font-medium">{campaign.targets}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Réponses</p>
                      <p className="font-medium">{campaign.responses}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Conversions</p>
                      <p className="font-medium text-green-600">{campaign.conversions}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Budget</p>
                      <p className="font-medium">{campaign.budget.toLocaleString()}€</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>ROI: {campaign.roi}%</span>
                      <span>Coût/Lead: {campaign.costPerLead}€</span>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Taux de réponse</span>
                      <span>{Math.round((campaign.responses / campaign.targets) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${(campaign.responses / campaign.targets) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-gray-600 mb-1">Canaux:</p>
                    <div className="flex flex-wrap gap-1">
                      {campaign.channels.map((channel, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      <i className="ri-edit-line mr-1"></i>
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      <i className="ri-bar-chart-line mr-1"></i>
                      Stats
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      <i className="ri-pause-line mr-1"></i>
                      Pause
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              <i className="ri-add-line mr-2"></i>
              Créer une campagne
            </Button>
          </Card>

          {/* Historique des interactions enrichi */}
          <Card className="mt-6">
            <h4 className="font-medium text-gray-900 mb-4">
              <i className="ri-history-line mr-2"></i>
              Historique Récent
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-mail-line text-blue-600 text-sm"></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Email de suivi envoyé</p>
                  <p className="text-xs text-gray-600">TechStart Innovation</p>
                  <p className="text-xs text-gray-500">Il y a 2h • Ouvert</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ri-phone-line text-green-600 text-sm"></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Appel de qualification</p>
                  <p className="text-xs text-gray-600">MedCare Plus</p>
                  <p className="text-xs text-gray-500">Hier • 15min • Qualifié</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <i className="ri-calendar-line text-purple-600 text-sm"></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">RDV démo planifié</p>
                  <p className="text-xs text-gray-600">RetailMax</p>
                  <p className="text-xs text-gray-500">Il y a 3j • Confirmé</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <i className="ri-file-text-line text-orange-600 text-sm"></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Proposition envoyée</p>
                  <p className="text-xs text-gray-600">FinanceSecure Pro</p>
                  <p className="text-xs text-gray-500">Il y a 5j • En attente</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bannière publicitaire compacte */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <i className="ri-database-line text-xl"></i>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Bases de Données Prospects</h4>
              <p className="text-xs opacity-90">Accédez à des millions de contacts qualifiés</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="bg-white text-orange-600 border-white hover:bg-gray-100 whitespace-nowrap">
            Découvrir
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'commercials' && renderCommercials()}
          {activeSection === 'contracts' && renderContracts()}
          {activeSection === 'performance' && renderPerformance()}
          {activeSection === 'prospection' && renderProspection()}
        </div>
      </div>

      {/* Modal Ajout Produit/Service */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {!productSaved ? (
              <>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mr-4">
                        <i className="ri-shopping-bag-line text-2xl text-white"></i>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Ajouter un Produit ou Service</h3>
                        <p className="text-sm text-gray-600">Créez une fiche complète pour vos commerciaux</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowProductModal(false)}
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <i className="ri-close-line text-2xl"></i>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <form className="space-y-6">
                    {/* Informations de base */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="ri-information-line mr-2 text-teal-600"></i>
                        Informations de Base
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="ri-product-hunt-line mr-1"></i>
                            Nom du produit/service <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={productForm.name}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            placeholder="Ex: CRM Enterprise Pro"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="ri-folder-line mr-1"></i>
                            Catégorie <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <select
                              value={productForm.category}
                              onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 pr-8"
                              required
                            >
                              <option value="">Sélectionner une catégorie</option>
                              <option value="Logiciel SaaS">Logiciel SaaS</option>
                              <option value="Solution Cloud">Solution Cloud</option>
                              <option value="Service Conseil">Service Conseil</option>
                              <option value="Formation">Formation</option>
                              <option value="Matériel">Matériel</option>
                              <option value="Maintenance">Maintenance</option>
                              <option value="Intégration">Intégration</option>
                              <option value="Support">Support</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-file-text-line mr-1"></i>
                          Description détaillée <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={productForm.description}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Décrivez en détail votre produit ou service, ses fonctionnalités principales, ses avantages..."
                          required
                        ></textarea>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="ri-money-euro-circle-line mr-1"></i>
                            Prix de vente (€)
                          </label>
                          <input
                            type="number"
                            value={productForm.price}
                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            placeholder="Ex: 5000"
                            min="0"
                            step="100"
                          />
                          <p className="text-xs text-gray-500 mt-1">Prix public conseillé ou fourchette de prix</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="ri-percent-line mr-1"></i>
                            Commission commerciale (%)
                          </label>
                          <input
                            type="number"
                            value={productForm.commission}
                            onChange={(e) => setProductForm({ ...productForm, commission: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            placeholder="Ex: 10"
                            min="0"
                            max="100"
                            step="0.5"
                          />
                          <p className="text-xs text-gray-500 mt-1">Taux de commission pour les commerciaux</p>
                        </div>
                      </div>
                    </div>

                    {/* Marché cible */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="ri-target-line mr-2 text-teal-600"></i>
                        Marché Cible
                      </h4>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-group-line mr-1"></i>
                          Clients cibles
                        </label>
                        <textarea
                          value={productForm.targetMarket}
                          onChange={(e) => setProductForm({ ...productForm, targetMarket: e.target.value })}
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Ex: PME de 50-200 employés, secteur technologie, décideurs IT..."
                        ></textarea>
                      </div>
                    </div>

                    {/* Supports de vente */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="ri-folder-open-line mr-2 text-teal-600"></i>
                        Supports de Vente
                      </h4>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-file-list-line mr-1"></i>
                          Documentation commerciale
                        </label>
                        <textarea
                          value={productForm.salesMaterials}
                          onChange={(e) => setProductForm({ ...productForm, salesMaterials: e.target.value })}
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Listez les supports disponibles: brochures, présentations, vidéos de démo, études de cas..."
                        ></textarea>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-settings-line mr-1"></i>
                          Spécifications techniques
                        </label>
                        <textarea
                          value={productForm.technicalSpecs}
                          onChange={(e) => setProductForm({ ...productForm, technicalSpecs: e.target.value })}
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Caractéristiques techniques, prérequis, compatibilité..."
                        ></textarea>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-trophy-line mr-1"></i>
                          Avantages concurrentiels
                        </label>
                        <textarea
                          value={productForm.competitiveAdvantages}
                          onChange={(e) => setProductForm({ ...productForm, competitiveAdvantages: e.target.value })}
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Points forts par rapport à la concurrence, USP, différenciateurs..."
                        ></textarea>
                      </div>
                    </div>

                    {/* Exigences */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="ri-checkbox-circle-line mr-2 text-teal-600"></i>
                        Exigences pour les Commerciaux
                      </h4>
                      
                      <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="checkbox"
                            checked={productForm.trainingRequired}
                            onChange={(e) => setProductForm({ ...productForm, trainingRequired: e.target.checked })}
                            className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer mt-0.5"
                          />
                          <div className="ml-3">
                            <span className="text-sm font-medium text-gray-700">
                              <i className="ri-book-open-line mr-1 text-teal-600"></i>
                              Formation obligatoire
                            </span>
                            <p className="text-xs text-gray-600 mt-1">
                              Les commerciaux devront suivre une formation avant de vendre ce produit
                            </p>
                          </div>
                        </label>

                        <label className="flex items-start cursor-pointer">
                          <input
                            type="checkbox"
                            checked={productForm.certificationRequired}
                            onChange={(e) => setProductForm({ ...productForm, certificationRequired: e.target.checked })}
                            className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500 cursor-pointer mt-0.5"
                          />
                          <div className="ml-3">
                            <span className="text-sm font-medium text-gray-700">
                              <i className="ri-medal-line mr-1 text-teal-600"></i>
                              Certification requise
                            </span>
                            <p className="text-xs text-gray-600 mt-1">
                              Une certification officielle est nécessaire pour commercialiser ce produit
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Conseils */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-3 flex items-center">
                        <i className="ri-lightbulb-line mr-2"></i>
                        Conseils pour une Fiche Produit Efficace
                      </h5>
                      <ul className="space-y-2 text-sm text-blue-800">
                        <li className="flex items-start">
                          <i className="ri-check-line text-blue-600 mr-2 mt-0.5"></i>
                          <span>Soyez précis et détaillé dans la description pour faciliter le travail des commerciaux</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-blue-600 mr-2 mt-0.5"></i>
                          <span>Mettez en avant les bénéfices clients plutôt que les caractéristiques techniques</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-blue-600 mr-2 mt-0.5"></i>
                          <span>Fournissez des arguments de vente concrets et des cas d'usage</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-blue-600 mr-2 mt-0.5"></i>
                          <span>Indiquez clairement les avantages concurrentiels pour se démarquer</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-blue-600 mr-2 mt-0.5"></i>
                          <span>Mettez à jour régulièrement les informations et les supports de vente</span>
                        </li>
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3 pt-6 border-t border-gray-200">
                      <Button 
                        variant="primary" 
                        className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                        onClick={handleSaveProduct}
                      >
                        <i className="ri-save-line mr-2"></i>
                        Enregistrer le produit/service
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowProductModal(false)}
                      >
                        <i className="ri-close-line mr-2"></i>
                        Annuler
                      </Button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-2">
                      <i className="ri-information-line mr-1"></i>
                      Ce produit sera visible par tous vos commerciaux et pourra être assigné dans les contrats
                    </p>
                  </form>
                </div>
              </>
            ) : (
              /* Message de confirmation */
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-check-line text-4xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Produit ajouté avec succès !</h3>
                <p className="text-gray-600 mb-6">
                  Votre produit/service a été enregistré dans votre catalogue
                </p>
                
                <div className="max-w-2xl mx-auto mb-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-left">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                      <i className="ri-checkbox-circle-line mr-2"></i>
                      Résumé du Produit
                    </h4>
                    <div className="space-y-2 text-sm text-green-800">
                      <div className="flex justify-between">
                        <span className="font-medium">Nom:</span>
                        <span>{productForm.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Catégorie:</span>
                        <span>{productForm.category}</span>
                      </div>
                      {productForm.price && (
                        <div className="flex justify-between">
                          <span className="font-medium">Prix:</span>
                          <span>{productForm.price}€</span>
                        </div>
                      )}
                      {productForm.commission && (
                        <div className="flex justify-between">
                          <span className="font-medium">Commission:</span>
                          <span>{productForm.commission}%</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-left mt-4">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                      <i className="ri-information-line mr-2"></i>
                      Prochaines Étapes
                    </h4>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start">
                        <i className="ri-check-line text-blue-600 mr-2 mt-0.5"></i>
                        <span>Le produit est maintenant visible dans votre catalogue</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-blue-600 mr-2 mt-0.5"></i>
                        <span>Vous pouvez l'assigner à vos commerciaux dans les contrats</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-blue-600 mr-2 mt-0.5"></i>
                        <span>Les commerciaux auront accès à toutes les informations de vente</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-blue-600 mr-2 mt-0.5"></i>
                        <span>Vous pouvez modifier ou supprimer ce produit à tout moment</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-center space-x-3">
                  <Button 
                    variant="primary"
                    onClick={handleAddProduct}
                  >
                    <i className="ri-add-line mr-2"></i>
                    Ajouter un autre produit
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowProductModal(false)}
                  >
                    <i className="ri-dashboard-line mr-2"></i>
                    Retour au tableau de bord
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      {showContractModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Nouveau Contrat</h3>
              <button
                onClick={() => setShowContractModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commercial</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>Sélectionner un commercial</option>
                    {commercials.filter(c => c.status === 'available').map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Produit/Service</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Nom du produit" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                  <input type="date" className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                  <input type="date" className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modèle de contrat</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Contrat Commercial Standard</option>
                  <option>Contrat Spécialisé Industrie</option>
                  <option>Contrat Secteur Santé</option>
                  <option>Contrat Finance & Assurance</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Taux de commission (%)</label>
                  <input type="number" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="8" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Objectif de ventes</label>
                  <input type="number" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="20" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Objectif de chiffre d'affaires (€)</label>
                <input type="number" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="1200000" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Clauses spécifiques</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Commission progressive</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Exclusivité territoriale</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Objectifs trimestriels</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Support technique inclus</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button variant="primary" className="flex-1">
                  Créer le contrat
                </Button>
                <Button variant="outline" onClick={() => setShowContractModal(false)}>
                  Annuler
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showProspectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Nouveau Prospect</h3>
              <button
                onClick={() => setShowProspectModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Nom de l'entreprise" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact principal</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Nom du contact" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="email@entreprise.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input type="tel" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="+33 1 23 45 67 89" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Secteur d'activité</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>Technologie</option>
                    <option>Santé</option>
                    <option>Énergie</option>
                    <option>Retail</option>
                    <option>Logistique</option>
                    <option>Finance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Ville, Région" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="high">Haute</option>
                    <option value="medium">Moyenne</option>
                    <option value="low">Basse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valeur estimée (€)</label>
                  <input type="number" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="75000" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Besoins identifiés</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="CRM, Automatisation, Analytics (séparés par des virgules)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prochaine action</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Premier contact, Présentation produit..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button variant="primary" className="flex-1">
                  Ajouter le prospect
                </Button>
                <Button variant="outline" onClick={() => setShowProspectModal(false)}>
                  Annuler
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCampaignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Nouvelle Campagne</h3>
              <button
                onClick={() => setShowCampaignModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la campagne</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Campagne CRM Q2 2024" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type de campagne</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="email">Email</option>
                    <option value="phone">Téléphone</option>
                    <option value="visit">Visite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget (€)</label>
                  <input type="number" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="15000" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                  <input type="date" className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                  <input type="date" className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de cibles</label>
                <input type="number" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Critères de ciblage</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Secteur Technologie</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Entreprises 50-200 employés</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Région Île-de-France</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Prospects qualifiés</span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button variant="primary" className="flex-1">
                  Lancer la campagne
                </Button>
                <Button variant="outline" onClick={() => setShowCampaignModal(false)}>
                  Annuler
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal CRM Solutions */}
      {showCrmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-building-line text-xl text-blue-600"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Solutions CRM Avancées</h3>
                  <p className="text-sm text-gray-600">Optimisez votre gestion commerciale avec l'intelligence artificielle</p>
                </div>
              </div>
              <button
                onClick={() => setShowCrmModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Fonctionnalités principales */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  <i className="ri-star-line mr-2 text-yellow-500"></i>
                  Fonctionnalités Principales
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="ri-robot-line text-blue-600"></i>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">IA Prédictive</h5>
                      <p className="text-sm text-gray-600">Prédiction des ventes et identification automatique des prospects les plus prometteurs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <i className="ri-mail-send-line text-green-600"></i>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Automatisation Marketing</h5>
                      <p className="text-sm text-gray-600">Campagnes email automatisées, scoring de leads et nurturing personnalisé</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <i className="ri-bar-chart-box-line text-purple-600"></i>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Analytics Avancés</h5>
                      <p className="text-sm text-gray-600">Tableaux de bord en temps réel, rapports personnalisés et KPI intelligents</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <i className="ri-team-line text-orange-600"></i>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Gestion d'Équipe</h5>
                      <p className="text-sm text-gray-600">Suivi des performances, attribution des leads et collaboration en temps réel</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Avantages business */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  <i className="ri-trophy-line mr-2 text-green-500"></i>
                  Avantages Business
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="ri-arrow-up-line text-green-600 mr-2"></i>
                      <span className="font-medium text-green-900">+45% de conversions</span>
                    </div>
                    <p className="text-sm text-green-700">Amélioration du taux de conversion grâce à l'IA prédictive</p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="ri-time-line text-blue-600 mr-2"></i>
                      <span className="font-medium text-blue-900">-60% de temps admin</span>
                    </div>
                    <p className="text-sm text-blue-700">Automatisation des tâches répétitives et saisie intelligente</p>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="ri-eye-line text-purple-600 mr-2"></i>
                      <span className="font-medium text-purple-900">Vision 360° client</span>
                    </div>
                    <p className="text-sm text-purple-700">Historique complet et insights comportementaux</p>
                  </div>
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="ri-money-euro-circle-line text-orange-600 mr-2"></i>
                      <span className="font-medium text-orange-900">ROI moyen 320%</span>
                    </div>
                    <p className="text-sm text-orange-700">Retour sur investissement prouvé en moins de 6 mois</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Plans tarifaires */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                <i className="ri-price-tag-3-line mr-2 text-indigo-500"></i>
                Plans Tarifaires
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-center mb-4">
                    <h5 className="font-semibold text-gray-900">Starter</h5>
                    <p className="text-2xl font-bold text-gray-900 mt-2">49€<span className="text-sm font-normal text-gray-600">/mois</span></p>
                    <p className="text-sm text-gray-600">Jusqu'à 5 utilisateurs</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>CRM de base</li>
                    <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Gestion contacts</li>
                    <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Rapports standards</li>
                    <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Support email</li>
                  </ul>
                </div>
                <div className="border-2 border-blue-500 rounded-lg p-4 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">Populaire</span>
                  </div>
                  <div className="text-center mb-4">
                    <h5 className="font-semibold text-gray-900">Professional</h5>
                    <p className="text-2xl font-bold text-gray-900 mt-2">149€<span className="text-sm font-normal text-gray-600">/mois</span></p>
                    <p className="text-sm text-gray-600">Jusqu'à 25 utilisateurs</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Toutes fonctionnalités Starter</li>
                    <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>IA prédictive</li>
                    <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Automatisation marketing</li>
                    <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Analytics avancés</li>
                    <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Support prioritaire</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-center mb-4">
                    <h5 className="font-semibold text-gray-900">Enterprise</h5>
                    <p className="text-2xl font-bold text-gray-900 mt-2">349€<span className="text-sm font-normal text-gray-600">/mois</span></p>
                    <p className="text-sm text-gray-600">Utilisateurs illimités</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Toutes fonctionnalités Pro</li>
                    <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>API complète</li>
                    <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Intégrations avancées</li>
                    <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Support dédié 24/7</li>
                    <li className="flex items-center"><i className="ri-check-line text-green-600 mr-2"></i>Formation personnalisée</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Témoignages clients */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                <i className="ri-chat-quote-line mr-2 text-blue-500"></i>
                Ce que disent nos clients
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-3">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Professional%20business%20executive%20smiling%20confidently%2C%20modern%20office%20background%2C%20corporate%20headshot%20style%2C%20clean%20professional%20lighting&width=40&height=40&seq=7&orientation=squarish" 
                      alt="Client" 
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Marie Dubois</p>
                      <p className="text-sm text-gray-600">Directrice Commerciale, TechCorp</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 italic">"Grâce à cette solution CRM, nous avons augmenté nos ventes de 40% en 6 mois. L'IA prédictive nous aide vraiment à prioriser nos efforts."</p>
                  <div className="flex mt-2">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-3">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Professional%20businessman%20in%20suit%2C%20confident%20expression%2C%20modern%20corporate%20environment%2C%20executive%20headshot%20style&width=40&height=40&seq=8&orientation=squarish" 
                      alt="Client" 
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Pierre Martin</p>
                      <p className="text-sm text-gray-600">CEO, InnovatePlus</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 italic">"L'automatisation nous fait gagner un temps précieux. Notre équipe peut se concentrer sur la relation client plutôt que sur les tâches administratives."</p>
                  <div className="flex mt-2">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <Button variant="primary" className="flex-1">
                <i className="ri-play-line mr-2"></i>
                Démarrer l'essai gratuit (14 jours)
              </Button>
              <Button variant="outline" className="flex-1">
                <i className="ri-calendar-line mr-2"></i>
                Planifier une démonstration
              </Button>
              <Button variant="outline" onClick={() => setShowCrmModal(false)}>
                <i className="ri-close-line mr-2"></i>
                Fermer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Upgrade Premium */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <i className="ri-vip-crown-line text-2xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Passez à la Version Premium</h3>
                  <p className="text-sm text-gray-600">Débloquez toutes les fonctionnalités avancées pour votre entreprise</p>
                </div>
              </div>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* Comparaison des plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Plan Gratuit */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Gratuit</h4>
                  <p className="text-3xl font-bold text-gray-900">0€<span className="text-sm font-normal text-gray-600">/mois</span></p>
                  <p className="text-sm text-gray-600 mt-2">Plan actuel</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700">Jusqu'à 3 commerciaux</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700">5 contrats maximum</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700">Rapports basiques</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700">50 prospects</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-close-line text-gray-400 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-400">Analytics avancés</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-close-line text-gray-400 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-400">IA prédictive</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-close-line text-gray-400 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-400">Automatisation</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-close-line text-gray-400 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-400">Support prioritaire</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" disabled>
                  Plan actuel
                </Button>
              </div>

              {/* Plan Premium */}
              <div className="border-2 border-indigo-500 rounded-lg p-6 relative bg-gradient-to-b from-indigo-50 to-white">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Recommandé
                  </span>
                </div>
                <div className="text-center mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Premium</h4>
                  <p className="text-3xl font-bold text-indigo-600">99€<span className="text-sm font-normal text-gray-600">/mois</span></p>
                  <p className="text-sm text-green-600 mt-2">Économisez 20% avec l'abonnement annuel</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <i className="ri-check-line text-indigo-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700 font-medium">Commerciaux illimités</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-indigo-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700 font-medium">Contrats illimités</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-indigo-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700 font-medium">Rapports avancés exportables</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-indigo-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700 font-medium">Prospects illimités</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-indigo-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700 font-medium">Analytics en temps réel</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-indigo-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700 font-medium">IA prédictive des ventes</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-indigo-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700 font-medium">Automatisation complète</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-indigo-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700 font-medium">Support prioritaire 24/7</span>
                  </li>
                </ul>
                <Button variant="primary" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                  <i className="ri-vip-crown-line mr-2"></i>
                  Passer à Premium
                </Button>
              </div>

              {/* Plan Enterprise */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Enterprise</h4>
                  <p className="text-3xl font-bold text-gray-900">Sur mesure</p>
                  <p className="text-sm text-gray-600 mt-2">Solutions personnalisées</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700">Tout Premium inclus</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700">API complète</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700">Intégrations personnalisées</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700">Formation dédiée</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700">Account manager dédié</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700">SLA garanti</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700">Hébergement dédié</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span className="text-sm text-gray-700">Conformité avancée</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  <i className="ri-phone-line mr-2"></i>
                  Nous contacter
                </Button>
              </div>
            </div>

            {/* Fonctionnalités Premium détaillées */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                <i className="ri-star-line mr-2 text-yellow-500"></i>
                Fonctionnalités Premium Exclusives
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="ri-robot-line text-2xl text-blue-600"></i>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">IA Prédictive</h5>
                  <p className="text-sm text-gray-600">Prédiction des ventes et scoring automatique des prospects</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="ri-flashlight-line text-2xl text-green-600"></i>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">Automatisation</h5>
                  <p className="text-sm text-gray-600">Workflows automatisés et campagnes intelligentes</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="ri-bar-chart-box-line text-2xl text-purple-600"></i>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">Analytics Avancés</h5>
                  <p className="text-sm text-gray-600">Tableaux de bord personnalisés et KPI en temps réel</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="ri-customer-service-line text-2xl text-orange-600"></i>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">Support 24/7</h5>
                  <p className="text-sm text-gray-600">Assistance prioritaire par chat, email et téléphone</p>
                </div>
              </div>
            </div>

            {/* Témoignages clients Premium */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                <i className="ri-chat-quote-line mr-2 text-indigo-500"></i>
                Ils ont choisi Premium
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                  <div className="flex items-center mb-3">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Professional%20female%20business%20executive%20smiling%20confidently%2C%20modern%20office%20background%2C%20corporate%20headshot%20style%2C%20clean%20professional%20lighting&width=50&height=50&seq=9&orientation=squarish" 
                      alt="Client" 
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Sophie Durand</p>
                      <p className="text-xs text-gray-600">CEO, TechVision</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 italic mb-3">"Le passage à Premium a transformé notre gestion commerciale. L'IA nous fait gagner un temps précieux !"</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                    ))}
                    <span className="text-xs text-gray-600 ml-2">+150% de ROI</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                  <div className="flex items-center mb-3">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Professional%20male%20business%20executive%20in%20suit%2C%20confident%20expression%2C%20modern%20corporate%20environment%2C%20executive%20headshot%20style&width=50&height=50&seq=10&orientation=squarish" 
                      alt="Client" 
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Marc Lefebvre</p>
                      <p className="text-xs text-gray-600">Directeur, InnoSales</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 italic mb-3">"Les analytics en temps réel nous permettent de prendre des décisions éclairées instantanément."</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                    ))}
                    <span className="text-xs text-gray-600 ml-2">+85% conversions</span>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                  <div className="flex items-center mb-3">
                    <img 
                      src="https://readdy.ai/api/search-image?query=Professional%20businesswoman%20with%20confident%20smile%2C%20modern%20office%20background%2C%20corporate%20headshot%20style%2C%20clean%20and%20professional%20lighting&width=50&height=50&seq=11&orientation=squarish" 
                      alt="Client" 
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Claire Moreau</p>
                      <p className="text-xs text-gray-600">DG, ProCommerce</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 italic mb-3">"L'automatisation nous a libérés des tâches répétitives. Notre équipe est plus productive."</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                    ))}
                    <span className="text-xs text-gray-600 ml-2">-70% temps admin</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Garanties et avantages */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-8 border border-green-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                <i className="ri-shield-check-line mr-2 text-green-600"></i>
                Nos Garanties Premium
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <i className="ri-time-line text-green-600"></i>
                  </div>
                  <p className="text-sm font-medium text-gray-900">14 jours d'essai</p>
                  <p className="text-xs text-gray-600">Satisfait ou remboursé</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <i className="ri-arrow-left-right-line text-green-600"></i>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Migration gratuite</p>
                  <p className="text-xs text-gray-600">Données transférées</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <i className="ri-lock-line text-green-600"></i>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Sécurité maximale</p>
                  <p className="text-xs text-gray-600">Données cryptées</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <i className="ri-close-circle-line text-green-600"></i>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Sans engagement</p>
                  <p className="text-xs text-gray-600">Résiliation à tout moment</p>
                </div>
              </div>
            </div>

            {/* Actions finales */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
              <Button 
                variant="primary" 
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 py-3"
              >
                <i className="ri-vip-crown-line mr-2"></i>
                Commencer l'essai gratuit Premium (14 jours)
              </Button>
              <Button variant="outline" className="flex-1 py-3">
                <i className="ri-calendar-line mr-2"></i>
                Planifier une démonstration
              </Button>
              <Button variant="outline" onClick={() => setShowUpgradeModal(false)} className="py-3">
                <i className="ri-close-line mr-2"></i>
                Plus tard
              </Button>
            </div>

            {/* Note de bas de page */}
            <p className="text-center text-xs text-gray-500 mt-6">
              <i className="ri-information-line mr-1"></i>
              Aucune carte bancaire requise pour l'essai gratuit • Annulation en un clic • Support disponible 24/7
            </p>
          </div>
        </div>
      )}

      {/* Modal Configuration KPI */}
      {showKpiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            {!kpiSaved ? (
              <>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                        <i className="ri-dashboard-line text-2xl text-white"></i>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Configuration des KPI</h3>
                        <p className="text-sm text-gray-600">Personnalisez vos indicateurs de performance et tableaux de bord</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowKpiModal(false)}
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <i className="ri-close-line text-2xl"></i>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <form className="space-y-6">
                    {/* KPI Standards */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="ri-line-chart-line mr-2 text-purple-600"></i>
                        Indicateurs de Performance Standards
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={kpiForm.salesTarget}
                            onChange={(e) => setKpiForm({ ...kpiForm, salesTarget: e.target.checked })}
                            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer mt-0.5"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900">Objectifs de Ventes</span>
                              <i className="ri-shopping-cart-line text-purple-600"></i>
                            </div>
                            <p className="text-sm text-gray-600">Suivi des ventes réalisées vs objectifs fixés</p>
                          </div>
                        </label>

                        <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={kpiForm.revenueTarget}
                            onChange={(e) => setKpiForm({ ...kpiForm, revenueTarget: e.target.checked })}
                            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer mt-0.5"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900">Chiffre d'Affaires</span>
                              <i className="ri-money-euro-circle-line text-green-600"></i>
                            </div>
                            <p className="text-sm text-gray-600">CA généré vs objectifs de revenus</p>
                          </div>
                        </label>

                        <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={kpiForm.conversionRate}
                            onChange={(e) => setKpiForm({ ...kpiForm, conversionRate: e.target.checked })}
                            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer mt-0.5"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900">Taux de Conversion</span>
                              <i className="ri-percent-line text-blue-600"></i>
                            </div>
                            <p className="text-sm text-gray-600">Pourcentage de leads convertis en clients</p>
                          </div>
                        </label>

                        <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={kpiForm.averageDealSize}
                            onChange={(e) => setKpiForm({ ...kpiForm, averageDealSize: e.target.checked })}
                            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer mt-0.5"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900">Panier Moyen</span>
                              <i className="ri-wallet-line text-orange-600"></i>
                            </div>
                            <p className="text-sm text-gray-600">Valeur moyenne des transactions</p>
                          </div>
                        </label>

                        <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={kpiForm.salesCycle}
                            onChange={(e) => setKpiForm({ ...kpiForm, salesCycle: e.target.checked })}
                            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer mt-0.5"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900">Cycle de Vente</span>
                              <i className="ri-time-line text-indigo-600"></i>
                            </div>
                            <p className="text-sm text-gray-600">Durée moyenne du processus de vente</p>
                          </div>
                        </label>

                        <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={kpiForm.leadResponse}
                            onChange={(e) => setKpiForm({ ...kpiForm, leadResponse: e.target.checked })}
                            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer mt-0.5"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900">Temps de Réponse</span>
                              <i className="ri-speed-line text-teal-600"></i>
                            </div>
                            <p className="text-sm text-gray-600">Délai moyen de réponse aux leads</p>
                          </div>
                        </label>

                        <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={kpiForm.customerRetention}
                            onChange={(e) => setKpiForm({ ...kpiForm, customerRetention: e.target.checked })}
                            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer mt-0.5"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900">Rétention Client</span>
                              <i className="ri-user-heart-line text-pink-600"></i>
                            </div>
                            <p className="text-sm text-gray-600">Taux de fidélisation des clients</p>
                          </div>
                        </label>

                        <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={kpiForm.marketShare}
                            onChange={(e) => setKpiForm({ ...kpiForm, marketShare: e.target.checked })}
                            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer mt-0.5"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900">Part de Marché</span>
                              <i className="ri-pie-chart-line text-purple-600"></i>
                            </div>
                            <p className="text-sm text-gray-600">Position sur le marché vs concurrents</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* KPI Personnalisés */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="ri-add-circle-line mr-2 text-indigo-600"></i>
                        Indicateurs Personnalisés
                      </h4>
                      <div className="space-y-4">
                        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <i className="ri-edit-line mr-1"></i>
                                Nom du KPI personnalisé 1
                              </label>
                              <input
                                type="text"
                                value={kpiForm.customKpi1Name}
                                onChange={(e) => setKpiForm({ ...kpiForm, customKpi1Name: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Ex: Taux de satisfaction client"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <i className="ri-target-line mr-1"></i>
                                Objectif cible
                              </label>
                              <input
                                type="text"
                                value={kpiForm.customKpi1Target}
                                onChange={(e) => setKpiForm({ ...kpiForm, customKpi1Target: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Ex: 95%"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <i className="ri-edit-line mr-1"></i>
                                Nom du KPI personnalisé 2
                              </label>
                              <input
                                type="text"
                                value={kpiForm.customKpi2Name}
                                onChange={(e) => setKpiForm({ ...kpiForm, customKpi2Name: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Ex: Nombre de rendez-vous qualifiés"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <i className="ri-target-line mr-1"></i>
                                Objectif cible
                              </label>
                              <input
                                type="text"
                                value={kpiForm.customKpi2Target}
                                onChange={(e) => setKpiForm({ ...kpiForm, customKpi2Target: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                placeholder="Ex: 50 par mois"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Configuration du Tableau de Bord */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="ri-layout-grid-line mr-2 text-blue-600"></i>
                        Configuration du Tableau de Bord
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="ri-layout-line mr-1"></i>
                            Disposition du tableau de bord
                          </label>
                          <div className="relative">
                            <select
                              value={kpiForm.dashboardLayout}
                              onChange={(e) => setKpiForm({ ...kpiForm, dashboardLayout: e.target.value })}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-8"
                            >
                              <option value="grid">Grille (4 colonnes)</option>
                              <option value="list">Liste verticale</option>
                              <option value="compact">Compact (6 colonnes)</option>
                              <option value="cards">Cartes détaillées</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="ri-refresh-line mr-1"></i>
                            Intervalle de rafraîchissement
                          </label>
                          <div className="relative">
                            <select
                              value={kpiForm.refreshInterval}
                              onChange={(e) => setKpiForm({ ...kpiForm, refreshInterval: e.target.value })}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-8"
                            >
                              <option value="1">Temps réel (1 min)</option>
                              <option value="5">5 minutes</option>
                              <option value="15">15 minutes</option>
                              <option value="30">30 minutes</option>
                              <option value="60">1 heure</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Alertes et Notifications */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="ri-notification-line mr-2 text-orange-600"></i>
                        Alertes et Notifications
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="ri-alarm-warning-line mr-1"></i>
                            Seuil d'alerte (% de l'objectif)
                          </label>
                          <div className="flex items-center space-x-4">
                            <input
                              type="range"
                              min="50"
                              max="100"
                              step="5"
                              value={kpiForm.alertThreshold}
                              onChange={(e) => setKpiForm({ ...kpiForm, alertThreshold: e.target.value })}
                              className="flex-1"
                            />
                            <span className="text-lg font-bold text-gray-900 w-16 text-center">
                              {kpiForm.alertThreshold}%
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Vous serez alerté lorsqu'un KPI descend en dessous de ce seuil
                          </p>
                        </div>

                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <label className="flex items-start cursor-pointer">
                            <input
                              type="checkbox"
                              checked={kpiForm.emailReports}
                              onChange={(e) => setKpiForm({ ...kpiForm, emailReports: e.target.checked })}
                              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer mt-0.5"
                            />
                            <div className="ml-3 flex-1">
                              <span className="font-medium text-blue-900">
                                <i className="ri-mail-send-line mr-1"></i>
                                Recevoir des rapports par email
                              </span>
                              <p className="text-sm text-blue-700 mt-1">
                                Recevez automatiquement des rapports détaillés de vos KPI
                              </p>
                            </div>
                          </label>

                          {kpiForm.emailReports && (
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-blue-900 mb-2">
                                Fréquence des rapports
                              </label>
                              <div className="relative">
                                <select
                                  value={kpiForm.reportFrequency}
                                  onChange={(e) => setKpiForm({ ...kpiForm, reportFrequency: e.target.value })}
                                  className="w-full p-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white pr-8"
                                >
                                  <option value="daily">Quotidien</option>
                                  <option value="weekly">Hebdomadaire</option>
                                  <option value="monthly">Mensuel</option>
                                  <option value="quarterly">Trimestriel</option>
                                </select>
                                <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Aperçu de la configuration */}
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg">
                      <h5 className="font-medium text-purple-900 mb-3 flex items-center">
                        <i className="ri-eye-line mr-2"></i>
                        Aperçu de votre Configuration
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-purple-600">
                            {Object.values(kpiForm).filter(v => v === true).length}
                          </p>
                          <p className="text-xs text-purple-700">KPI activés</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-indigo-600">
                            {[kpiForm.customKpi1Name, kpiForm.customKpi2Name].filter(name => name).length}
                          </p>
                          <p className="text-xs text-indigo-700">KPI personnalisés</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-blue-600">
                            {kpiForm.refreshInterval}min
                          </p>
                          <p className="text-xs text-blue-700">Rafraîchissement</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-orange-600">
                            {kpiForm.alertThreshold}%
                          </p>
                          <p className="text-xs text-orange-700">Seuil d'alerte</p>
                        </div>
                      </div>
                    </div>

                    {/* Conseils d'optimisation */}
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h5 className="font-medium text-yellow-900 mb-3 flex items-center">
                        <i className="ri-lightbulb-line mr-2"></i>
                        Conseils pour Optimiser vos KPI
                      </h5>
                      <ul className="space-y-2 text-sm text-yellow-800">
                        <li className="flex items-start">
                          <i className="ri-check-line text-yellow-600 mr-2 mt-0.5"></i>
                          <span>Sélectionnez 4 à 6 KPI principaux pour éviter la surcharge d'informations</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-yellow-600 mr-2 mt-0.5"></i>
                          <span>Définissez des objectifs SMART (Spécifiques, Mesurables, Atteignables, Réalistes, Temporels)</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-yellow-600 mr-2 mt-0.5"></i>
                          <span>Ajustez le seuil d'alerte en fonction de votre secteur et de vos objectifs</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-yellow-600 mr-2 mt-0.5"></i>
                          <span>Activez les rapports email pour suivre l'évolution dans le temps</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-yellow-600 mr-2 mt-0.5"></i>
                          <span>Révisez vos KPI trimestriellement pour vous adapter aux changements du marché</span>
                        </li>
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3 pt-6 border-t border-gray-200">
                      <Button 
                        variant="primary" 
                        className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        onClick={handleSaveKpi}
                      >
                        <i className="ri-save-line mr-2"></i>
                        Enregistrer la Configuration
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowKpiModal(false)}
                      >
                        <i className="ri-close-line mr-2"></i>
                        Annuler
                      </Button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-2">
                      <i className="ri-information-line mr-1"></i>
                      Vos modifications seront appliquées immédiatement à votre tableau de bord
                    </p>
                  </form>
                </div>
              </>
            ) : (
              /* Message de confirmation */
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-check-line text-4xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Configuration enregistrée !</h3>
                <p className="text-gray-600 mb-6">
                  Vos KPI ont été configurés avec succès
                </p>
                
                <div className="max-w-2xl mx-auto mb-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-left">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                      <i className="ri-checkbox-circle-line mr-2"></i>
                      Modifications Appliquées
                    </h4>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                        <span>
                          {Object.values(kpiForm).filter(v => v === true).length} indicateurs de performance activés
                        </span>
                      </li>
                      {[kpiForm.customKpi1Name, kpiForm.customKpi2Name].filter(name => name).length > 0 && (
                        <li className="flex items-start">
                          <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                          <span>
                            {[kpiForm.customKpi1Name, kpiForm.customKpi2Name].filter(name => name).length} KPI personnalisés créés
                          </span>
                        </li>
                      )}
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                        <span>Tableau de bord configuré en mode {kpiForm.dashboardLayout}</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                        <span>Rafraîchissement automatique toutes les {kpiForm.refreshInterval} minutes</span>
                      </li>
                      {kpiForm.emailReports && (
                        <li className="flex items-start">
                          <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                          <span>Rapports {kpiForm.reportFrequency === 'daily' ? 'quotidiens' : kpiForm.reportFrequency === 'weekly' ? 'hebdomadaires' : kpiForm.reportFrequency === 'monthly' ? 'mensuels' : 'trimestriels'} activés</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Contact Commercial */}
      {showContactModal && selectedCommercial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {!contactSent ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <img 
                      src={selectedCommercial.profileImage} 
                      alt={selectedCommercial.name} 
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Contacter {selectedCommercial.name}</h3>
                      <p className="text-sm text-gray-600">{selectedCommercial.location} • {selectedCommercial.specialization.join(', ')}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center mr-3">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`ri-star-${i < Math.floor(selectedCommercial.rating) ? 'fill' : 'line'} text-yellow-400 text-sm`}
                            ></i>
                          ))}
                          <span className="text-sm text-gray-600 ml-1">({selectedCommercial.rating})</span>
                        </div>
                        <span className="text-sm text-gray-600">{selectedCommercial.responseTime} de réponse</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>

                {/* Informations de contact */}
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-3">
                    <i className="ri-information-line mr-2"></i>
                    Informations de contact
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <i className="ri-mail-line text-blue-600"></i>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700">Email</p>
                        <p className="text-sm font-medium text-blue-900">{selectedCommercial.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <i className="ri-phone-line text-blue-600"></i>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700">Téléphone</p>
                        <p className="text-sm font-medium text-blue-900">{selectedCommercial.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <i className="ri-time-line text-blue-600"></i>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700">Disponibilité</p>
                        <p className="text-sm font-medium text-blue-900">{selectedCommercial.availability}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <i className="ri-money-euro-circle-line text-blue-600"></i>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700">Tarif horaire</p>
                        <p className="text-sm font-medium text-blue-900">{selectedCommercial.hourlyRate}€/h</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formulaire de contact */}
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <i className="ri-mail-line mr-1"></i>
                        Méthode de contact préférée
                      </label>
                      <div className="relative">
                        <select
                          value={contactForm.contactMethod}
                          onChange={(e) => setContactForm({ ...contactForm, contactMethod: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                        >
                          <option value="email">Email</option>
                          <option value="phone">Téléphone</option>
                          <option value="message">Messagerie interne</option>
                        </select>
                        <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <i className="ri-flag-line mr-1"></i>
                        Urgence
                      </label>
                      <div className="relative">
                        <select
                          value={contactForm.urgency}
                          onChange={(e) => setContactForm({ ...contactForm, urgency: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                        >
                          <option value="low">Basse - Réponse sous 48h</option>
                          <option value="normal">Normale - Réponse sous 24h</option>
                          <option value="high">Haute - Réponse sous 4h</option>
                          <option value="urgent">Urgente - Réponse immédiate</option>
                        </select>
                        <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="ri-text mr-1"></i>
                      Objet du message <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ex: Demande de collaboration pour projet CRM"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="ri-message-3-line mr-1"></i>
                      Votre message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      rows={8}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Décrivez votre projet, vos besoins et vos attentes..."
                      required
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">
                      <i className="ri-information-line mr-1"></i>
                      Soyez précis sur vos besoins pour obtenir une réponse adaptée
                    </p>
                  </div>

                  {/* Informations complémentaires */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-3">
                      <i className="ri-lightbulb-line mr-2 text-yellow-500"></i>
                      Conseils pour un premier contact réussi
                    </h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                        <span>Présentez brièvement votre entreprise et votre secteur d'activité</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                        <span>Précisez vos objectifs commerciaux et vos attentes</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                        <span>Indiquez votre budget et votre calendrier prévisionnel</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                        <span>Mentionnez vos disponibilités pour un premier échange</span>
                      </li>
                    </ul>
                  </div>

                  {/* Statistiques du commercial */}
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h5 className="font-medium text-green-900 mb-3">
                      <i className="ri-trophy-line mr-2"></i>
                      Performances de {selectedCommercial.name}
                    </h5>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">{selectedCommercial.completedSales}</p>
                        <p className="text-xs text-green-700">Ventes réalisées</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{(selectedCommercial.totalRevenue / 1000000).toFixed(1)}M€</p>
                        <p className="text-xs text-green-700">CA généré</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{selectedCommercial.recommendations}</p>
                        <p className="text-xs text-green-700">Recommandations</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    <Button 
                      variant="primary" 
                      className="flex-1"
                      onClick={handleSendContact}
                    >
                      <i className="ri-send-plane-line mr-2"></i>
                      Envoyer le message
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowContactModal(false)}
                    >
                      <i className="ri-close-line mr-2"></i>
                      Annuler
                    </Button>
                  </div>

                  <p className="text-center text-xs text-gray-500 mt-2">
                    <i className="ri-lock-line mr-1"></i>
                    Vos informations sont sécurisées et ne seront partagées qu'avec le commercial sélectionné
                  </p>
                </form>
              </>
            ) : (
              /* Message de confirmation */
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-check-line text-4xl text-green-600"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message envoyé avec succès !</h3>
                <p className="text-gray-600 mb-4">
                  Votre message a été transmis à {selectedCommercial.name}
                </p>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                  <p className="text-sm text-blue-900 mb-2">
                    <i className="ri-time-line mr-2"></i>
                    <strong>Temps de réponse estimé:</strong> {selectedCommercial.responseTime}
                  </p>
                  <p className="text-sm text-blue-900">
                    <i className="ri-mail-line mr-2"></i>
                    Vous recevrez une notification par email dès que {selectedCommercial.name} répondra
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">
                    <i className="ri-information-line mr-2 text-blue-600"></i>
                    En attendant, vous pouvez:
                  </p>
                  <div className="flex space-x-3">
                    <Button variant="outline" className="flex-1" onClick={() => setShowContactModal(false)}>
                      <i className="ri-user-search-line mr-2"></i>
                      Voir d'autres commerciaux
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => setShowContactModal(false)}>
                      <i className="ri-dashboard-line mr-2"></i>
                      Retour au tableau de bord
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Profil Commercial */}
      {showProfileModal && selectedCommercial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* En-tête du profil */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
              <button
                onClick={() => setShowProfileModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
              
              <div className="flex items-start gap-6">
                <img
                  src={selectedCommercial.profileImage}
                  alt={selectedCommercial.name}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white/20"
                />
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{selectedCommercial.name}</h2>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-300"></i>
                      <span className="font-semibold">{selectedCommercial.rating}</span>
                      <span className="text-white/80 text-sm">({selectedCommercial.recommendations} avis)</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/90">
                      <i className="ri-map-pin-line"></i>
                      <span>{selectedCommercial.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedCommercial.specialization.map((spec: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <i className="ri-time-line"></i>
                      <span>Répond en {selectedCommercial.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-calendar-line"></i>
                      <span>{selectedCommercial.availability}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu du profil */}
            <div className="p-8">
              {/* Statistiques clés */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                  <div className="text-2xl font-bold text-green-600 mb-1">{selectedCommercial.completedSales}</div>
                  <div className="text-sm text-gray-600">Ventes réalisées</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{(selectedCommercial.totalRevenue / 1000000).toFixed(1)}M€</div>
                  <div className="text-sm text-gray-600">CA généré</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-100">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{selectedCommercial.experience} ans</div>
                  <div className="text-sm text-gray-600">Expérience</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-100">
                  <div className="text-2xl font-bold text-orange-600 mb-1">{selectedCommercial.hourlyRate}€/h</div>
                  <div className="text-sm text-gray-600">Tarif horaire</div>
                </div>
              </div>

              {/* À propos */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-user-line text-blue-600"></i>
                  À propos
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedCommercial.description} Reconnu pour ma capacité à créer des relations 
                  durables avec les clients et à générer une croissance significative du chiffre d'affaires. 
                  Passionné par le développement commercial et l'atteinte des objectifs avec une approche 
                  consultative et orientée résultats.
                </p>
              </div>

              {/* Compétences */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-lightbulb-line text-blue-600"></i>
                  Compétences clés
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Prospection B2B',
                    'Négociation commerciale',
                    'Gestion de comptes clés',
                    'Closing de ventes',
                    'Développement commercial',
                    'Analyse de marché',
                    'Présentation produits',
                    'Relation client'
                  ].map((skill: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                      <i className="ri-checkbox-circle-fill text-green-500"></i>
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-award-line text-blue-600"></i>
                  Certifications
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedCommercial.certifications.map((cert: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100">
                      <i className="ri-medal-line text-blue-600"></i>
                      <span className="text-gray-700 font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secteurs d'expertise */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-briefcase-line text-blue-600"></i>
                  Secteurs d'expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCommercial.sectors.map((sector: string, idx: number) => (
                    <span key={idx} className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full text-sm font-medium border border-purple-100">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>

              {/* Langues */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-global-line text-blue-600"></i>
                  Langues parlées
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedCommercial.languages.map((lang: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                      <i className="ri-translate-2 text-gray-600"></i>
                      <span className="text-gray-700">{lang}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tarification */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-money-euro-circle-line text-blue-600"></i>
                  Tarification
                </h3>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold text-green-600 mb-1">{selectedCommercial.hourlyRate}€/h</div>
                      <div className="text-sm text-gray-600">Tarif horaire</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 mb-1">8-12%</div>
                      <div className="text-sm text-gray-600">Commission sur ventes</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <i className="ri-information-line text-green-600 mt-0.5"></i>
                    <span>Tarifs négociables selon le volume et la durée de la mission</span>
                  </div>
                </div>
              </div>

              {/* Avis clients */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-chat-quote-line text-blue-600"></i>
                  Avis clients ({selectedCommercial.recommendations})
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      author: "Marie Dubois",
                      company: "TechStart SAS",
                      rating: 5,
                      date: "Il y a 2 semaines",
                      comment: "Excellent commercial ! A dépassé nos objectifs de vente de 30% dès le premier trimestre. Très professionnel et à l'écoute."
                    },
                    {
                      author: "Pierre Martin",
                      company: "InnovateCorp",
                      rating: 5,
                      date: "Il y a 1 mois",
                      comment: "Collaboration très fructueuse. Compétences en négociation exceptionnelles et grande capacité d'adaptation."
                    },
                    {
                      author: "Sophie Laurent",
                      company: "Digital Solutions",
                      rating: 4,
                      date: "Il y a 2 mois",
                      comment: "Très bon commercial avec d'excellents résultats. Communication fluide et reporting régulier."
                    }
                  ].map((review, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold text-gray-900">{review.author}</div>
                          <div className="text-sm text-gray-600">{review.company}</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                            ))}
                          </div>
                          <div className="text-xs text-gray-500">{review.date}</div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    handleContactCommercial(selectedCommercial);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-mail-line"></i>
                  Contacter ce commercial
                </button>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Négociation */}
      {showNegotiateModal && selectedCommercial && selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {!negotiationSent ? (
              <>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                        <i className="ri-hand-coin-line text-2xl text-white"></i>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Négocier le Contrat</h3>
                        <p className="text-sm text-gray-600">
                          {selectedContract.product} - {selectedCommercial.name}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowNegotiateModal(false)}
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <i className="ri-close-line text-2xl"></i>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Informations actuelles du contrat */}
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <i className="ri-file-list-line mr-2"></i>
                      Conditions Actuelles du Contrat
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-blue-700">Tarif horaire</p>
                        <p className="text-lg font-bold text-blue-900">{selectedCommercial.hourlyRate}€/h</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700">Commission</p>
                        <p className="text-lg font-bold text-blue-900">{selectedContract.commission}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700">Durée</p>
                        <p className="text-sm font-medium text-blue-900">
                          {new Date(selectedContract.endDate).getTime() - new Date(selectedContract.startDate).getTime() > 180 * 24 * 60 * 60 * 1000 ? '6+ mois' : '< 6 mois'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700">Territoire</p>
                        <p className="text-sm font-medium text-blue-900">{selectedContract.territory}</p>
                      </div>
                    </div>
                  </div>

                  {/* Performances actuelles */}
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                      <i className="ri-line-chart-line mr-2"></i>
                      Performances Actuelles
                    </h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">{selectedContract.performance.sales}</p>
                        <p className="text-xs text-green-700">Ventes réalisées</p>
                        <p className="text-xs text-gray-600">
                          sur {selectedContract.objectives.salesTarget} objectif
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">
                          {(selectedContract.performance.revenue / 1000).toFixed(0)}k€
                        </p>
                        <p className="text-xs text-green-700">CA généré</p>
                        <p className="text-xs text-gray-600">
                          sur {(selectedContract.objectives.revenueTarget / 1000).toFixed(0)}k€ objectif
                        </p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">
                          {Math.round((selectedContract.performance.sales / selectedContract.objectives.salesTarget) * 100)}%
                        </p>
                        <p className="text-xs text-green-700">Taux d'atteinte</p>
                        <p className="text-xs text-gray-600">des objectifs</p>
                      </div>
                    </div>
                  </div>

                  {/* Formulaire de négociation */}
                  <form className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="ri-edit-line mr-2 text-indigo-600"></i>
                        Nouvelles Propositions
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="ri-money-euro-circle-line mr-1"></i>
                            Tarif horaire proposé (€/h) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            value={negotiationForm.proposedRate}
                            onChange={(e) => setNegotiationForm({ ...negotiationForm, proposedRate: parseFloat(e.target.value) })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="95"
                            min="0"
                            step="5"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Tarif actuel: {selectedCommercial.hourlyRate}€/h
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="ri-percent-line mr-1"></i>
                            Commission proposée (%) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            value={negotiationForm.proposedCommission}
                            onChange={(e) => setNegotiationForm({ ...negotiationForm, proposedCommission: parseFloat(e.target.value) })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="8"
                            min="0"
                            max="100"
                            step="0.5"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Commission actuelle: {selectedContract.commission}%
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-calendar-line mr-1"></i>
                          Durée du contrat proposée
                        </label>
                        <div className="relative">
                          <select
                            value={negotiationForm.contractDuration}
                            onChange={(e) => setNegotiationForm({ ...negotiationForm, contractDuration: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                          >
                            <option value="">Sélectionner une durée</option>
                            <option value="3 mois">3 mois</option>
                            <option value="6 mois">6 mois</option>
                            <option value="12 mois">12 mois (Recommandé)</option>
                            <option value="24 mois">24 mois</option>
                            <option value="Indéterminée">Durée indéterminée</option>
                          </select>
                          <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-map-pin-line mr-1"></i>
                          Territoire proposé
                        </label>
                        <input
                          type="text"
                          value={negotiationForm.territory}
                          onChange={(e) => setNegotiationForm({ ...negotiationForm, territory: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Ex: Île-de-France, National, International..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Territoire actuel: {selectedContract.territory}
                        </p>
                      </div>

                      <div className="mb-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={negotiationForm.exclusivity}
                            onChange={(e) => setNegotiationForm({ ...negotiationForm, exclusivity: e.target.checked })}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                          />
                          <span className="ml-3 text-sm font-medium text-gray-700">
                            <i className="ri-shield-check-line mr-1 text-blue-600"></i>
                            Clause d'exclusivité territoriale
                          </span>
                        </label>
                        <p className="text-xs text-gray-500 ml-8 mt-1">
                          Le commercial s'engage à ne pas travailler pour des concurrents directs sur le territoire défini
                        </p>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-target-line mr-1"></i>
                          Objectifs proposés
                        </label>
                        <textarea
                          value={negotiationForm.objectives}
                          onChange={(e) => setNegotiationForm({ ...negotiationForm, objectives: e.target.value })}
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Ex: 25 ventes par trimestre, 1.5M€ de CA annuel, 100 leads qualifiés..."
                        ></textarea>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-gift-line mr-1"></i>
                          Structure de bonus proposée
                        </label>
                        <textarea
                          value={negotiationForm.bonusStructure}
                          onChange={(e) => setNegotiationForm({ ...negotiationForm, bonusStructure: e.target.value })}
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Ex: Bonus de 3% si objectifs dépassés de 20%, Prime trimestrielle de 2000€ si 100% des objectifs..."
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">
                          Structure actuelle: {selectedContract.bonusStructure}
                        </p>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-file-text-line mr-1"></i>
                          Conditions supplémentaires
                        </label>
                        <textarea
                          value={negotiationForm.additionalTerms}
                          onChange={(e) => setNegotiationForm({ ...negotiationForm, additionalTerms: e.target.value })}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Ajoutez toute condition ou clause supplémentaire que vous souhaitez négocier..."
                        ></textarea>
                      </div>
                    </div>

                    {/* Conseils de négociation */}
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h5 className="font-medium text-yellow-900 mb-3 flex items-center">
                        <i className="ri-lightbulb-line mr-2"></i>
                        Conseils pour une négociation réussie
                      </h5>
                      <ul className="space-y-2 text-sm text-yellow-800">
                        <li className="flex items-start">
                          <i className="ri-check-line text-yellow-600 mr-2 mt-0.5"></i>
                          <span>Basez vos propositions sur les performances actuelles du commercial</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-yellow-600 mr-2 mt-0.5"></i>
                          <span>Proposez des objectifs ambitieux mais réalistes et mesurables</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-yellow-600 mr-2 mt-0.5"></i>
                          <span>Incluez des bonus motivants pour encourager le dépassement d'objectifs</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-yellow-600 mr-2 mt-0.5"></i>
                          <span>Soyez transparent sur vos attentes et vos contraintes budgétaires</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-yellow-600 mr-2 mt-0.5"></i>
                          <span>Prévoyez des clauses de révision pour ajuster le contrat si nécessaire</span>
                        </li>
                      </ul>
                    </div>

                    {/* Simulation financière */}
                    {negotiationForm.proposedRate > 0 && negotiationForm.proposedCommission > 0 && (
                      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                        <h5 className="font-medium text-indigo-900 mb-3 flex items-center">
                          <i className="ri-calculator-line mr-2"></i>
                          Simulation Financière
                        </h5>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-xs text-indigo-700 mb-1">Coût horaire mensuel</p>
                            <p className="text-xl font-bold text-indigo-900">
                              {(negotiationForm.proposedRate * 160).toLocaleString()}€
                            </p>
                            <p className="text-xs text-gray-600">(160h/mois)</p>
                          </div>
                          <div>
                            <p className="text-xs text-indigo-700 mb-1">Commission estimée</p>
                            <p className="text-xl font-bold text-indigo-900">
                              {((selectedContract.performance.revenue / 12) * (negotiationForm.proposedCommission / 100)).toLocaleString()}€
                            </p>
                            <p className="text-xs text-gray-600">(par mois)</p>
                          </div>
                          <div>
                            <p className="text-xs text-indigo-700 mb-1">Coût total estimé</p>
                            <p className="text-xl font-bold text-indigo-900">
                              {((negotiationForm.proposedRate * 160) + ((selectedContract.performance.revenue / 12) * (negotiationForm.proposedCommission / 100))).toLocaleString()}€
                            </p>
                            <p className="text-xs text-gray-600">(par mois)</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-3 pt-6 border-t border-gray-200">
                      <Button 
                        variant="primary" 
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        onClick={handleSendNegotiation}
                      >
                        <i className="ri-send-plane-line mr-2"></i>
                        Envoyer la proposition de négociation
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowNegotiateModal(false)}
                      >
                        <i className="ri-close-line mr-2"></i>
                        Annuler
                      </Button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-2">
                      <i className="ri-information-line mr-1"></i>
                      Le commercial recevra votre proposition et pourra l'accepter, la refuser ou faire une contre-proposition
                    </p>
                  </form>
                </div>
              </>
            ) : (
              /* Message de confirmation */
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-check-line text-4xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Proposition envoyée avec succès !</h3>
                <p className="text-gray-600 mb-6">
                  Votre proposition de négociation a été transmise à {selectedCommercial.name}
                </p>
                
                <div className="max-w-2xl mx-auto space-y-4 mb-6">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                      <i className="ri-file-list-line mr-2"></i>
                      Résumé de votre proposition
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-blue-700">Tarif horaire proposé</p>
                        <p className="font-bold text-blue-900">{negotiationForm.proposedRate}€/h</p>
                      </div>
                      <div>
                        <p className="text-blue-700">Commission proposée</p>
                        <p className="font-bold text-blue-900">{negotiationForm.proposedCommission}%</p>
                      </div>
                      {negotiationForm.contractDuration && (
                        <div>
                          <p className="text-blue-700">Durée</p>
                          <p className="font-bold text-blue-900">{negotiationForm.contractDuration}</p>
                        </div>
                      )}
                      {negotiationForm.territory && (
                        <div>
                          <p className="text-blue-700">Territoire</p>
                          <p className="font-bold text-blue-900">{negotiationForm.territory}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-left">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                      <i className="ri-time-line mr-2"></i>
                      Prochaines étapes
                    </h4>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li className="flex items-start">
                        <i className="ri-checkbox-circle-line text-green-600 mr-2 mt-0.5"></i>
                        <span>Le commercial examinera votre proposition sous 24-48h</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-checkbox-circle-line text-green-600 mr-2 mt-0.5"></i>
                        <span>Vous recevrez une notification par email de sa réponse</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-checkbox-circle-line text-green-600 mr-2 mt-0.5"></i>
                        <span>En cas d'accord, le contrat sera automatiquement mis à jour</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-checkbox-circle-line text-green-600 mr-2 mt-0.5"></i>
                        <span>En cas de contre-proposition, vous serez notifié pour poursuivre la négociation</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left">
                    <p className="text-sm text-yellow-800 flex items-start">
                      <i className="ri-information-line text-yellow-600 mr-2 mt-0.5"></i>
                      <span>
                        <strong>Délai de réponse estimé:</strong> {selectedCommercial.responseTime}. 
                        Vous pouvez suivre l'état de votre négociation dans la section "Contrats".
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-center space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowNegotiateModal(false);
                      setActiveSection('contracts');
                    }}
                  >
                    <i className="ri-file-list-line mr-2"></i>
                    Voir mes contrats
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNegotiateModal(false)}
                  >
                    <i className="ri-dashboard-line mr-2"></i>
                    Retour au tableau de bord
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Renouvellement */}
      {showRenewModal && selectedCommercial && selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {!renewalSent ? (
              <>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                        <i className="ri-refresh-line text-2xl text-white"></i>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Renouveler le Contrat</h3>
                        <p className="text-sm text-gray-600">
                          {selectedContract.product} - {selectedCommercial.name}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowRenewModal(false)}
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <i className="ri-close-line text-2xl"></i>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Informations du contrat actuel */}
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <i className="ri-file-list-line mr-2"></i>
                      Contrat Actuel
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-blue-700">Date de début</p>
                        <p className="text-sm font-bold text-blue-900">{selectedContract.startDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700">Date de fin</p>
                        <p className="text-sm font-bold text-blue-900">{selectedContract.endDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700">Tarif horaire</p>
                        <p className="text-sm font-bold text-blue-900">{selectedCommercial.hourlyRate}€/h</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700">Commission</p>
                        <p className="text-sm font-bold text-blue-900">{selectedContract.commission}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Performances du contrat */}
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                      <i className="ri-trophy-line mr-2"></i>
                      Bilan de Performance
                    </h4>
                    <div className="grid grid-cols-3 gap-4 text-center mb-3">
                      <div>
                        <p className="text-2xl font-bold text-green-600">{selectedContract.performance.sales}</p>
                        <p className="text-xs text-green-700">Ventes réalisées</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">
                          {(selectedContract.performance.revenue / 1000).toFixed(0)}k€
                        </p>
                        <p className="text-xs text-green-700">CA généré</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">
                          {Math.round((selectedContract.performance.sales / selectedContract.objectives.salesTarget) * 100)}%
                        </p>
                        <p className="text-xs text-green-700">Taux d'atteinte</p>
                      </div>
                    </div>
                    {selectedContract.performance.sales >= selectedContract.objectives.salesTarget && (
                      <div className="flex items-center justify-center p-2 bg-green-100 rounded-lg">
                        <i className="ri-check-line text-green-600 mr-2"></i>
                        <span className="text-sm font-medium text-green-800">
                          Objectifs atteints ! Excellent partenariat à renouveler
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Formulaire de renouvellement */}
                  <form className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="ri-calendar-check-line mr-2 text-green-600"></i>
                        Paramètres de Renouvellement
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="ri-time-line mr-1"></i>
                            Durée du renouvellement
                          </label>
                          <div className="relative">
                            <select
                              value={renewalForm.duration}
                              onChange={(e) => {
                                const months = parseInt(e.target.value);
                                const currentEndDate = new Date(selectedContract.endDate);
                                const newEndDate = new Date(currentEndDate);
                                newEndDate.setMonth(newEndDate.getMonth() + months);
                                setRenewalForm({ 
                                  ...renewalForm, 
                                  duration: e.target.value,
                                  newEndDate: newEndDate.toISOString().split('T')[0]
                                });
                              }}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-8"
                            >
                              <option value="3">3 mois</option>
                              <option value="6">6 mois</option>
                              <option value="12">12 mois (Recommandé)</option>
                              <option value="24">24 mois</option>
                              <option value="36">36 mois</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="ri-calendar-line mr-1"></i>
                            Nouvelle date de fin <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            value={renewalForm.newEndDate}
                            onChange={(e) => setRenewalForm({ ...renewalForm, newEndDate: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            min={new Date(selectedContract.endDate).toISOString().split('T')[0]}
                            required
                          />
                        </div>
                      </div>

                      {/* Ajustement du tarif */}
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <label className="flex items-center cursor-pointer mb-3">
                          <input
                            type="checkbox"
                            checked={renewalForm.adjustRate}
                            onChange={(e) => setRenewalForm({ ...renewalForm, adjustRate: e.target.checked })}
                            className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                          />
                          <span className="ml-3 text-sm font-medium text-gray-700">
                            <i className="ri-money-euro-circle-line mr-1 text-green-600"></i>
                            Ajuster le tarif horaire
                          </span>
                        </label>
                        {renewalForm.adjustRate && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nouveau tarif horaire (€/h)
                            </label>
                            <input
                              type="number"
                              value={renewalForm.newRate}
                              onChange={(e) => setRenewalForm({ ...renewalForm, newRate: parseFloat(e.target.value) })}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              min="0"
                              step="5"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Tarif actuel: {selectedCommercial.hourlyRate}€/h
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Ajustement de la commission */}
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <label className="flex items-center cursor-pointer mb-3">
                          <input
                            type="checkbox"
                            checked={renewalForm.adjustCommission}
                            onChange={(e) => setRenewalForm({ ...renewalForm, adjustCommission: e.target.checked })}
                            className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                          />
                          <span className="ml-3 text-sm font-medium text-gray-700">
                            <i className="ri-percent-line mr-1 text-green-600"></i>
                            Ajuster le taux de commission
                          </span>
                        </label>
                        {renewalForm.adjustCommission && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nouveau taux de commission (%)
                            </label>
                            <input
                              type="number"
                              value={renewalForm.newCommission}
                              onChange={(e) => setRenewalForm({ ...renewalForm, newCommission: parseFloat(e.target.value) })}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              min="0"
                              max="100"
                              step="0.5"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Commission actuelle: {selectedContract.commission}%
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Nouveaux objectifs */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-target-line mr-1"></i>
                          Nouveaux objectifs pour la période
                        </label>
                        <textarea
                          value={renewalForm.newObjectives}
                          onChange={(e) => setRenewalForm({ ...renewalForm, newObjectives: e.target.value })}
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Ex: 30 ventes, 2M€ de CA, 150 leads qualifiés..."
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">
                          Objectifs actuels: {selectedContract.objectives.salesTarget} ventes, {(selectedContract.objectives.revenueTarget / 1000).toFixed(0)}k€ de CA
                        </p>
                      </div>

                      {/* Renouvellement automatique */}
                      <div className="mb-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                        <label className="flex items-start cursor-pointer">
                          <input
                            type="checkbox"
                            checked={renewalForm.autoRenewal}
                            onChange={(e) => setRenewalForm({ ...renewalForm, autoRenewal: e.target.checked })}
                            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer mt-0.5"
                          />
                          <div className="ml-3">
                            <span className="text-sm font-medium text-gray-700">
                              <i className="ri-loop-right-line mr-1 text-indigo-600"></i>
                              Activer le renouvellement automatique
                            </span>
                            <p className="text-xs text-gray-600 mt-1">
                              Le contrat sera automatiquement renouvelé pour la même durée à chaque échéance, 
                              sauf résiliation 30 jours avant la fin. Vous recevrez une notification de rappel.
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* Clauses additionnelles */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-file-text-line mr-1"></i>
                          Clauses ou conditions supplémentaires
                        </label>
                        <textarea
                          value={renewalForm.additionalClauses}
                          onChange={(e) => setRenewalForm({ ...renewalForm, additionalClauses: e.target.value })}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Ajoutez toute clause ou condition spécifique pour le renouvellement..."
                        ></textarea>
                      </div>
                    </div>

                    {/* Avantages du renouvellement */}
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h5 className="font-medium text-green-900 mb-3 flex items-center">
                        <i className="ri-star-line mr-2"></i>
                        Avantages du Renouvellement
                      </h5>
                      <ul className="space-y-2 text-sm text-green-800">
                        <li className="flex items-start">
                          <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                          <span>Continuité de la relation commerciale établie</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                          <span>Pas de période d'adaptation, le commercial connaît déjà vos produits</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                          <span>Économie de temps et de coûts de recrutement</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                          <span>Possibilité de négocier de meilleures conditions basées sur les performances</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                          <span>Maintien du réseau de contacts et des relations clients établies</span>
                        </li>
                      </ul>
                    </div>

                    {/* Estimation financière */}
                    {(renewalForm.adjustRate || renewalForm.adjustCommission) && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h5 className="font-medium text-blue-900 mb-3 flex items-center">
                          <i className="ri-calculator-line mr-2"></i>
                          Estimation Financière du Renouvellement
                        </h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-blue-700 mb-1">Coût mensuel estimé</p>
                            <p className="text-xl font-bold text-blue-900">
                              {((renewalForm.adjustRate ? renewalForm.newRate : selectedCommercial.hourlyRate) * 160).toLocaleString()}€
                            </p>
                            <p className="text-xs text-gray-600">(160h/mois)</p>
                          </div>
                          <div>
                            <p className="text-xs text-blue-700 mb-1">Coût total période</p>
                            <p className="text-xl font-bold text-blue-900">
                              {(((renewalForm.adjustRate ? renewalForm.newRate : selectedCommercial.hourlyRate) * 160) * parseInt(renewalForm.duration)).toLocaleString()}€
                            </p>
                            <p className="text-xs text-gray-600">({renewalForm.duration} mois)</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-3 pt-6 border-t border-gray-200">
                      <Button 
                        variant="primary" 
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        onClick={handleSendRenewal}
                      >
                        <i className="ri-check-line mr-2"></i>
                        Confirmer le renouvellement
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowRenewModal(false)}
                      >
                        <i className="ri-close-line mr-2"></i>
                        Annuler
                      </Button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-2">
                      <i className="ri-information-line mr-1"></i>
                      Le commercial recevra votre demande de renouvellement et devra l'accepter pour finaliser le nouveau contrat
                    </p>
                  </form>
                </div>
              </>
            ) : (
              /* Message de confirmation */
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-check-line text-4xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Demande de renouvellement envoyée !</h3>
                <p className="text-gray-600 mb-6">
                  Votre demande de renouvellement a été transmise à {selectedCommercial.name}
                </p>
                
                <div className="max-w-2xl mx-auto space-y-4 mb-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-left">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                      <i className="ri-file-list-line mr-2"></i>
                      Résumé du Renouvellement
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-green-700">Durée</p>
                        <p className="font-bold text-green-900">{renewalForm.duration} mois</p>
                      </div>
                      <div>
                        <p className="text-green-700">Nouvelle date de fin</p>
                        <p className="font-bold text-green-900">{renewalForm.newEndDate}</p>
                      </div>
                      {renewalForm.adjustRate && (
                        <div>
                          <p className="text-green-700">Nouveau tarif</p>
                          <p className="font-bold text-green-900">{renewalForm.newRate}€/h</p>
                        </div>
                      )}
                      {renewalForm.adjustCommission && (
                        <div>
                          <p className="text-green-700">Nouvelle commission</p>
                          <p className="font-bold text-green-900">{renewalForm.newCommission}%</p>
                        </div>
                      )}
                      {renewalForm.autoRenewal && (
                        <div className="col-span-2">
                          <p className="text-green-700 flex items-center">
                            <i className="ri-loop-right-line mr-1"></i>
                            Renouvellement automatique activé
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                      <i className="ri-time-line mr-2"></i>
                      Prochaines Étapes
                    </h4>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start">
                        <i className="ri-checkbox-circle-line text-blue-600 mr-2 mt-0.5"></i>
                        <span>Le commercial examinera votre demande sous 24-48h</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-checkbox-circle-line text-blue-600 mr-2 mt-0.5"></i>
                        <span>Vous recevrez une notification par email de sa réponse</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-checkbox-circle-line text-blue-600 mr-2 mt-0.5"></i>
                        <span>En cas d'acceptation, le nouveau contrat sera généré automatiquement</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-checkbox-circle-line text-blue-600 mr-2 mt-0.5"></i>
                        <span>Les deux parties devront signer électroniquement le nouveau contrat</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-checkbox-circle-line text-blue-600 mr-2 mt-0.5"></i>
                        <span>Le contrat renouvelé prendra effet à la date de fin du contrat actuel</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left">
                    <p className="text-sm text-yellow-800 flex items-start">
                      <i className="ri-information-line text-yellow-600 mr-2 mt-0.5"></i>
                      <span>
                        <strong>Important:</strong> Le contrat actuel reste en vigueur jusqu'à sa date de fin ({selectedContract.endDate}). 
                        Le renouvellement ne sera effectif qu'après acceptation du commercial et signature des deux parties.
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-center space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowRenewModal(false);
                      setActiveSection('contracts');
                    }}
                  >
                    <i className="ri-file-list-line mr-2"></i>
                    Voir mes contrats
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowRenewModal(false)}
                  >
                    <i className="ri-dashboard-line mr-2"></i>
                    Retour au tableau de bord
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Détails Commercial */}
      {showDetailsModal && selectedCommercial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* En-tête */}
            <div className="relative bg-gradient-to-r from-teal-600 to-cyan-600 p-8 text-white">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
              
              <div className="flex items-start gap-6">
                <img
                  src={selectedCommercial.profileImage}
                  alt={selectedCommercial.name}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white/20"
                />
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{selectedCommercial.name}</h2>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-300"></i>
                      <span className="font-semibold">{selectedCommercial.rating}</span>
                      <span className="text-white/80 text-sm">({selectedCommercial.recommendations} avis)</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/90">
                      <i className="ri-map-pin-line"></i>
                      <span>{selectedCommercial.location}</span>
                    </div>
                    <Badge variant={getStatusColor(selectedCommercial.status)}>
                      {getStatusLabel(selectedCommercial.status)}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedCommercial.specialization.map((spec: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <i className="ri-time-line"></i>
                      <span>Répond en {selectedCommercial.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-calendar-line"></i>
                      <span>{selectedCommercial.availability}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-money-euro-circle-line"></i>
                      <span className="font-semibold">{selectedCommercial.hourlyRate}€/h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-8">
              {/* Statistiques clés */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                  <div className="text-2xl font-bold text-green-600 mb-1">{selectedCommercial.completedSales}</div>
                  <div className="text-sm text-gray-600">Ventes réalisées</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{(selectedCommercial.totalRevenue / 1000000).toFixed(1)}M€</div>
                  <div className="text-sm text-gray-600">CA généré</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-100">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{selectedCommercial.experience} ans</div>
                  <div className="text-sm text-gray-600">Expérience</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-100">
                  <div className="text-2xl font-bold text-orange-600 mb-1">{selectedCommercial.recommendations}</div>
                  <div className="text-sm text-gray-600">Recommandations</div>
                </div>
              </div>

              {/* Informations de contact */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-contacts-line text-teal-600"></i>
                  Coordonnées
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <i className="ri-mail-line text-teal-600"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{selectedCommercial.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <i className="ri-phone-line text-teal-600"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Téléphone</p>
                      <p className="font-medium text-gray-900">{selectedCommercial.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-file-text-line text-teal-600"></i>
                  Présentation
                </h3>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">
                  {selectedCommercial.description}
                </p>
              </div>

              {/* Secteurs et Langues */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-briefcase-line text-teal-600"></i>
                    Secteurs d'expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCommercial.sectors.map((sector: string, idx: number) => (
                      <span key={idx} className="px-4 py-2 bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 rounded-full text-sm font-medium border border-teal-100">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-global-line text-teal-600"></i>
                    Langues parlées
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedCommercial.languages.map((lang: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                        <i className="ri-translate-2 text-gray-600"></i>
                        <span className="text-gray-700">{lang}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-award-line text-teal-600"></i>
                  Certifications professionnelles
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedCommercial.certifications.map((cert: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg border border-teal-100">
                      <i className="ri-medal-line text-teal-600"></i>
                      <span className="text-gray-700 font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tarification détaillée */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-money-euro-circle-line text-teal-600"></i>
                  Tarification et conditions
                </h3>
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-100">
                  <div className="grid grid-cols-3 gap-6 mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-teal-600 mb-1">{selectedCommercial.hourlyRate}€/h</div>
                      <div className="text-sm text-gray-600">Tarif horaire</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-teal-600 mb-1">8-12%</div>
                      <div className="text-sm text-gray-600">Commission sur ventes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-teal-600 mb-1">{selectedCommercial.responseTime}</div>
                      <div className="text-sm text-gray-600">Temps de réponse</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600 bg-white/50 p-3 rounded-lg">
                    <i className="ri-information-line text-teal-600 mt-0.5"></i>
                    <span>Tarifs négociables selon le volume, la durée de la mission et les objectifs fixés. Possibilité de structure de bonus basée sur les performances.</span>
                  </div>
                </div>
              </div>

              {/* Disponibilité */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-calendar-check-line text-teal-600"></i>
                  Disponibilité
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <i className="ri-calendar-line text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-green-900 text-lg">{selectedCommercial.availability}</p>
                      <p className="text-sm text-green-700">Peut commencer une nouvelle mission rapidement</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Témoignages */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-chat-quote-line text-teal-600"></i>
                  Témoignages clients ({selectedCommercial.recommendations})
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      author: "Jean Dupont",
                      company: "TechVision SAS",
                      rating: 5,
                      date: "Il y a 3 semaines",
                      comment: "Excellent professionnel ! A largement dépassé nos attentes en termes de résultats. Très bon communicant et toujours disponible."
                    },
                    {
                      author: "Marie Lambert",
                      company: "InnoSolutions",
                      rating: 5,
                      date: "Il y a 1 mois",
                      comment: "Collaboration très enrichissante. Compétences commerciales solides et grande capacité d'adaptation à notre secteur d'activité."
                    },
                    {
                      author: "Pierre Moreau",
                      company: "Digital Pro",
                      rating: 4,
                      date: "Il y a 2 mois",
                      comment: "Très satisfait de notre collaboration. Résultats au rendez-vous et approche professionnelle. Je recommande vivement."
                    }
                  ].map((review, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold text-gray-900">{review.author}</div>
                          <div className="text-sm text-gray-600">{review.company}</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                            ))}
                          </div>
                          <div className="text-xs text-gray-500">{review.date}</div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleContactCommercial(selectedCommercial);
                  }}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-mail-line"></i>
                  Contacter ce commercial
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleViewProfile(selectedCommercial);
                  }}
                  className="px-6 py-3 border-2 border-teal-600 text-teal-600 hover:bg-teal-50 rounded-xl font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-user-line mr-2"></i>
                  Voir le profil complet
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Modification Contrat */}
      {showEditModal && selectedCommercial && selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {!editingSaved ? (
              <>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                        <i className="ri-edit-line text-2xl text-white"></i>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Modifier le Contrat</h3>
                        <p className="text-sm text-gray-600">
                          {selectedContract.product} - {selectedCommercial.name}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      <i className="ri-close-line text-2xl"></i>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Informations actuelles */}
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <i className="ri-information-line mr-2"></i>
                      Informations Actuelles
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-blue-700">Commercial</p>
                        <p className="text-sm font-bold text-blue-900">{selectedContract.commercialName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700">Produit</p>
                        <p className="text-sm font-bold text-blue-900">{selectedContract.product}</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700">Commission</p>
                        <p className="text-sm font-bold text-blue-900">{selectedContract.commission}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700">Statut</p>
                        <Badge variant={getContractStatusColor(selectedContract.status)}>
                          {getContractStatusLabel(selectedContract.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Formulaire de modification */}
                  <form className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <i className="ri-file-edit-line mr-2 text-indigo-600"></i>
                        Modifier les Informations
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="ri-shopping-bag-line mr-1"></i>
                            Nom du produit/service
                          </label>
                          <input
                            type="text"
                            defaultValue={selectedContract.product}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ex: CRM Enterprise"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="ri-percent-line mr-1"></i>
                            Taux de commission (%)
                          </label>
                          <input
                            type="number"
                            defaultValue={selectedContract.commission}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min="0"
                            max="100"
                            step="0.5"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="ri-calendar-line mr-1"></i>
                            Date de début
                          </label>
                          <input
                            type="date"
                            defaultValue={selectedContract.startDate}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="ri-calendar-check-line mr-1"></i>
                            Date de fin
                          </label>
                          <input
                            type="date"
                            defaultValue={selectedContract.endDate}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-map-pin-line mr-1"></i>
                          Territoire
                        </label>
                        <input
                          type="text"
                          defaultValue={selectedContract.territory}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Ex: Île-de-France, National..."
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-file-list-line mr-1"></i>
                          Modèle de contrat
                        </label>
                        <div className="relative">
                          <select
                            defaultValue={selectedContract.template}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                          >
                            <option>Contrat Commercial Standard</option>
                            <option>Contrat Spécialisé Industrie</option>
                            <option>Contrat Secteur Santé</option>
                            <option>Contrat Finance & Assurance</option>
                            <option>Contrat E-commerce & Retail</option>
                          </select>
                          <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-checkbox-multiple-line mr-1"></i>
                          Clauses contractuelles
                        </label>
                        <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                          {[
                            'Commission progressive',
                            'Exclusivité territoriale',
                            'Objectifs trimestriels',
                            'Support technique inclus',
                            'Formation produit',
                            'Conformité RGPD',
                            'Audit trimestriel'
                          ].map((clause, idx) => (
                            <label key={idx} className="flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                defaultChecked={selectedContract.clauses.includes(clause)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                              />
                              <span className="ml-2 text-sm text-gray-700">{clause}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="ri-target-line mr-1"></i>
                            Objectif de ventes
                          </label>
                          <input
                            type="number"
                            defaultValue={selectedContract.objectives.salesTarget}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="ri-money-euro-circle-line mr-1"></i>
                            Objectif de CA (€)
                          </label>
                          <input
                            type="number"
                            defaultValue={selectedContract.objectives.revenueTarget}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min="0"
                            step="1000"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-gift-line mr-1"></i>
                          Structure de bonus
                        </label>
                        <textarea
                          defaultValue={selectedContract.bonusStructure}
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Ex: Bonus de 2% si objectifs dépassés de 20%..."
                        ></textarea>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-calendar-event-line mr-1"></i>
                          Date de renouvellement
                        </label>
                        <input
                          type="date"
                          defaultValue={selectedContract.renewalDate}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Date à laquelle vous serez notifié pour le renouvellement du contrat
                        </p>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <i className="ri-toggle-line mr-1"></i>
                          Statut du contrat
                        </label>
                        <div className="relative">
                          <select
                            defaultValue={selectedContract.status}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                          >
                            <option value="active">Actif</option>
                            <option value="pending">En attente</option>
                            <option value="completed">Terminé</option>
                            <option value="cancelled">Annulé</option>
                          </select>
                          <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                        </div>
                      </div>
                    </div>

                    {/* Performances actuelles (lecture seule) */}
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h5 className="font-medium text-green-900 mb-3 flex items-center">
                        <i className="ri-line-chart-line mr-2"></i>
                        Performances Actuelles (lecture seule)
                      </h5>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-green-600">{selectedContract.performance.sales}</p>
                          <p className="text-xs text-green-700">Ventes réalisées</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">{selectedContract.performance.leads}</p>
                          <p className="text-xs text-green-700">Leads générés</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">
                            {(selectedContract.performance.revenue / 1000).toFixed(0)}k€
                          </p>
                          <p className="text-xs text-green-700">CA généré</p>
                        </div>
                      </div>
                    </div>

                    {/* Conseils */}
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h5 className="font-medium text-yellow-900 mb-3 flex items-center">
                        <i className="ri-lightbulb-line mr-2"></i>
                        Conseils de Modification
                      </h5>
                      <ul className="space-y-2 text-sm text-yellow-800">
                        <li className="flex items-start">
                          <i className="ri-check-line text-yellow-600 mr-2 mt-0.5"></i>
                          <span>Toute modification importante nécessitera l'accord du commercial</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-yellow-600 mr-2 mt-0.5"></i>
                          <span>Les modifications de commission ou d'objectifs peuvent impacter la motivation</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-yellow-600 mr-2 mt-0.5"></i>
                          <span>Pensez à documenter toutes les modifications pour la traçabilité</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-yellow-600 mr-2 mt-0.5"></i>
                          <span>Un avenant au contrat sera généré automatiquement après validation</span>
                        </li>
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3 pt-6 border-t border-gray-200">
                      <Button 
                        variant="primary" 
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                        onClick={handleSaveEdit}
                      >
                        <i className="ri-save-line mr-2"></i>
                        Enregistrer les modifications
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowEditModal(false)}
                      >
                        <i className="ri-close-line mr-2"></i>
                        Annuler
                      </Button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-2">
                      <i className="ri-information-line mr-1"></i>
                      Les modifications seront enregistrées et un avenant sera envoyé au commercial pour validation
                    </p>
                  </form>
                </div>
              </>
            ) : (
              /* Message de confirmation */
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-check-line text-4xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Modifications enregistrées !</h3>
                <p className="text-gray-600 mb-6">
                  Les modifications du contrat ont été sauvegardées avec succès
                </p>
                
                <div className="max-w-2xl mx-auto mb-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-left">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                      <i className="ri-checkbox-circle-line mr-2"></i>
                      Prochaines Étapes
                    </h4>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                        <span>Un avenant au contrat a été généré automatiquement</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                        <span>Le commercial {selectedCommercial.name} recevra une notification</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                        <span>Les modifications prendront effet après validation du commercial</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                        <span>Vous serez notifié par email de l'acceptation ou du refus</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface Commercial {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  specialization: string[];
  experience: number;
  rating: number;
  completedSales: number;
  totalRevenue: number;
  status: 'available' | 'busy' | 'contracted';
  profileImage: string;
  description: string;
  sectors: string[];
  languages: string[];
  certifications: string[];
  responseTime: string;
  hourlyRate: number;
  availability: string;
  recommendations: number;
}

interface Contract {
  id: string;
  commercialName: string;
  product: string;
  startDate: string;
  endDate: string;
  commission: number;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  performance: {
    sales: number;
    leads: number;
    revenue: number;
  };
  template: string;
  clauses: string[];
  objectives: {
    salesTarget: number;
    revenueTarget: number;
    deadline: string;
  };
  signatureStatus: 'signed' | 'pending';
  renewalDate: string;
  territory: string;
  bonusStructure: string;
}

interface Prospect {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  sector: string;
  location: string;
  needs: string[];
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
  lastContact: string;
  nextAction: string;
  priority: 'high' | 'medium' | 'low';
  estimatedValue: number;
  companySize: string;
  decisionMaker: string;
  budget: string;
  timeline: string;
  source: string;
}

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'phone' | 'visit' | 'webinar';
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  targets: number;
  responses: number;
  conversions: number;
  budget: number;
  costPerLead: number;
  roi: number;
  channels: string[];
  targetSegments: string[];
}
