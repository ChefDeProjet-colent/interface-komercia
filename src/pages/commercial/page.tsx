import { useState, useEffect } from 'react';
import StatsCard from '../dashboard/components/StatsCard';
import LeadCard from '../leads/components/LeadCard';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Badge from '../../components/base/Badge';
import AdBanner from '../../components/feature/AdBanner';
import { useAdManager } from '../../components/feature/AdManager';

interface Lead {
  id: string;
  company: string;
  contact: string;
  sector: string;
  location: string;
  budget: string;
  priority: 'high' | 'medium' | 'low';
  status: 'nouveau' | 'en_cours' | 'conclu' | 'perdu';
  description: string;
  lastContact: string;
  phone: string;
  email: string;
  potential: string;
  needs: string;
  history: string[];
  interactions: number;
  source: string;
}

interface PipelineItem {
  id: string;
  company: string;
  contact: string;
  value: string;
  stage: 'prospection' | 'qualification' | 'proposition' | 'negociation' | 'signature';
  probability: number;
  nextAction: string;
  dueDate: string;
  notes: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

interface Activity {
  id: string;
  title: string;
  type: 'meeting' | 'call' | 'email' | 'task';
  date: string;
  time: string;
  duration: number;
  leadId?: string;
  leadName?: string;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  description: string;
  location?: string;
  reminder: boolean;
  reminderTime?: string;
  attendees?: string[];
}

interface Commission {
  id: string;
  company: string;
  contact: string;
  saleAmount: number;
  commissionRate: number;
  commissionAmount: number;
  status: 'pending' | 'paid' | 'processing';
  saleDate: string;
  paymentDate?: string;
  quarter: string;
}

interface Notification {
  id: string;
  type: 'new-lead' | 'reminder' | 'commission' | 'task' | 'meeting';
  title: string;
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
  actionUrl?: string;
}

interface Objective {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  startDate: string;
  endDate: string;
  status: 'en_cours' | 'atteint' | 'echoue';
  category: 'ventes' | 'leads' | 'meetings' | 'revenue';
  priority: 'high' | 'medium' | 'low';
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  title: string;
  targetDate: string;
  completed: boolean;
  value: number;
}

interface AffiliatedProduct {
  id: string;
  name: string;
  company: string;
  category: string;
  description: string;
  price: number;
  commission: number;
  commissionType: 'percentage' | 'fixed';
  image: string;
  features: string[];
  targetMarket: string[];
  salesMaterials: SalesMaterial[];
  performance: ProductPerformance;
  status: 'active' | 'inactive';
}

interface SalesMaterial {
  id: string;
  type: 'brochure' | 'video' | 'demo' | 'presentation';
  title: string;
  url: string;
  size?: string;
}

interface ProductPerformance {
  totalSales: number;
  totalRevenue: number;
  totalCommission: number;
  conversionRate: number;
  averageOrderValue: number;
}

interface CallForTender {
  id: string;
  title: string;
  company: string;
  sector: string;
  budget: string;
  deadline: string;
  description: string;
  requirements: string[];
  status: 'open' | 'in_progress' | 'closed' | 'won' | 'lost';
  publishDate: string;
  location: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  documents: TenderDocument[];
  myApplication?: TenderApplication;
}

interface TenderDocument {
  id: string;
  name: string;
  type: string;
  url: string;
  size: string;
}

interface TenderApplication {
  id: string;
  tenderId: string;
  submittedDate: string;
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
  proposal: string;
  estimatedPrice: number;
  deliveryTime: string;
  documents: TenderDocument[];
}

interface CommercialProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  position: string;
  department: string;
  startDate: string;
  specializations: string[];
  languages: string[];
  certifications: Certification[];
  performance: PerformanceMetrics;
  preferences: ProfilePreferences;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
}

interface PerformanceMetrics {
  totalSales: number;
  totalRevenue: number;
  totalCommission: number;
  conversionRate: number;
  averageOrderValue: number;
  customerSatisfaction: number;
  leadsGenerated: number;
  dealsWon: number;
}

interface ProfilePreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  language: string;
  timezone: string;
  theme: 'light' | 'dark';
}

export default function CommercialPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [calculatorAmount, setCalculatorAmount] = useState('');
  const [leadFilters, setLeadFilters] = useState({
    sector: '',
    location: '',
    priority: '',
    status: '',
    budget: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [showNewActivity, setShowNewActivity] = useState(false);
  const [showNewLead, setShowNewLead] = useState(false);
  const [newLead, setNewLead] = useState({
    company: '',
    contact: '',
    sector: '',
    location: '',
    budget: '',
    priority: 'medium',
    description: '',
    phone: '',
    email: '',
    source: 'Saisie manuelle',
    needs: ''
  });
  const [showLeadSuccessMessage, setShowLeadSuccessMessage] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: '',
    type: 'meeting',
    date: '',
    time: '',
    duration: 60,
    description: '',
    location: '',
    reminder: true,
    leadId: '',
    priority: 'medium'
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const { trackAction } = useAdManager();

  // Données des commissions
  const [commissions] = useState<Commission[]>([
    {
      id: '1',
      company: 'TechCorp Solutions',
      contact: 'Marie Dubois',
      saleAmount: 75000,
      commissionRate: 7,
      commissionAmount: 5250,
      status: 'paid',
      saleDate: '2024-01-15',
      paymentDate: '2024-01-30',
      quarter: 'Q1 2024'
    },
    {
      id: '2',
      company: 'InnovateSAS',
      contact: 'Pierre Martin',
      saleAmount: 120000,
      commissionRate: 10,
      commissionAmount: 12000,
      status: 'processing',
      saleDate: '2024-01-20',
      quarter: 'Q1 2024'
    },
    {
      id: '3',
      company: 'DataFlow Analytics',
      contact: 'Sophie Laurent',
      saleAmount: 200000,
      commissionRate: 12,
      commissionAmount: 24000,
      status: 'pending',
      saleDate: '2024-01-25',
      quarter: 'Q1 2024'
    },
    {
      id: '4',
      company: 'MedCare Solutions',
      contact: 'Thomas Rousseau',
      saleAmount: 85000,
      commissionRate: 7,
      commissionAmount: 5950,
      status: 'paid',
      saleDate: '2024-01-10',
      paymentDate: '2024-01-25',
      quarter: 'Q1 2024'
    },
    {
      id: '5',
      company: 'EcoTech Industries',
      contact: 'Julie Moreau',
      saleAmount: 45000,
      commissionRate: 5,
      commissionAmount: 2250,
      status: 'paid',
      saleDate: '2023-12-20',
      paymentDate: '2024-01-05',
      quarter: 'Q4 2023'
    }
  ]);

  // Données des notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'new-lead',
      title: 'Nouveau lead disponible',
      message: 'TechCorp Solutions recherche une solution CRM - Budget: 75,000€',
      time: 'Il y a 5 minutes',
      priority: 'high',
      read: false,
      actionUrl: '/commercial?tab=leads&id=1'
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Relance programmée',
      message: 'Rappeler Marie Dubois (InnovateSAS) pour la proposition',
      time: 'Dans 30 minutes',
      priority: 'medium',
      read: false
    },
    {
      id: '3',
      type: 'commission',
      title: 'Commission disponible',
      message: 'Votre commission de 6,750€ est prête au paiement',
      time: 'Il y a 2 heures',
      priority: 'low',
      read: true
    },
    {
      id: '4',
      type: 'task',
      title: 'Tâche en retard',
      message: 'Envoi du devis DataFlow Analytics (échéance dépassée)',
      time: 'Il y a 1 jour',
      priority: 'high',
      read: false
    },
    {
      id: '5',
      type: 'meeting',
      title: 'Rendez-vous dans 1h',
      message: 'Présentation produit chez TechCorp Solutions',
      time: 'Dans 1 heure',
      priority: 'high',
      read: false
    }
  ]);

  // Données des leads avec informations complètes
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      company: 'TechCorp Solutions',
      contact: 'Marie Dubois',
      sector: 'Technologie',
      location: 'Paris',
      budget: '50,000-100,000€',
      priority: 'high',
      status: 'nouveau',
      description: 'Recherche solution CRM pour équipe de 50 commerciaux avec intégration email et téléphonie',
      lastContact: '2024-01-20',
      phone: '+33 1 42 86 75 30',
      email: 'marie.dubois@techcorp.fr',
      potential: '75,000€',
      needs: 'CRM complet avec intégration email et téléphonie, formation équipe, migration données',
      history: [
        'Premier contact établi le 15/01/2024',
        'Besoins identifiés lors de l\'appel de qualification',
        'Budget confirmé : 50-100K€',
        'Présentation produit programmée pour le 22/01/2024'
      ],
      interactions: 3,
      source: 'Site web'
    },
    {
      id: '2',
      company: 'InnovateSAS',
      contact: 'Pierre Martin',
      sector: 'Services',
      location: 'Lyon',
      budget: '100,000-200,000€',
      priority: 'high',
      status: 'en_cours',
      description: 'Modernisation système commercial existant pour équipe de 80 personnes',
      lastContact: '2024-01-18',
      phone: '+33 4 78 92 15 67',
      email: 'p.martin@innovatesaas.com',
      potential: '120,000€',
      needs: 'Migration données + formation équipe + support technique 24/7',
      history: [
        'Audit système actuel réalisé',
        'Présentation solution effectuée',
        'Négociation en cours sur les tarifs',
        'Demande de références clients'
      ],
      interactions: 8,
      source: 'Recommandation'
    },
    {
      id: '3',
      company: 'DataFlow Analytics',
      contact: 'Sophie Laurent',
      sector: 'Data & Analytics',
      location: 'Toulouse',
      budget: '200,000€+',
      priority: 'high',
      status: 'en_cours',
      description: 'Solution BI intégrée pour analyse commerciale avec tableaux de bord personnalisés',
      lastContact: '2024-01-19',
      phone: '+33 5 61 23 45 78',
      email: 'sophie.laurent@dataflow.fr',
      potential: '200,000€',
      needs: 'BI + CRM + Analytics avancés + API personnalisées',
      history: [
        'Démonstration technique approuvée',
        'Validation budget confirmée',
        'Proposition détaillée envoyée',
        'Négociation sur les délais de livraison'
      ],
      interactions: 12,
      source: 'Salon professionnel'
    },
    {
      id: '4',
      company: 'HealthTech Pro',
      contact: 'Dr. Antoine Moreau',
      sector: 'Santé',
      location: 'Marseille',
      budget: '30,000-50,000€',
      priority: 'medium',
      status: 'nouveau',
      description: 'Solution CRM spécialisée pour cabinet médical multi-sites',
      lastContact: '2024-01-21',
      phone: '+33 4 91 55 33 22',
      email: 'a.moreau@healthtech-pro.fr',
      potential: '35,000€',
      needs: 'CRM médical + gestion rendez-vous + facturation',
      history: [
        'Premier contact via formulaire web',
        'Appel de qualification programmé'
      ],
      interactions: 1,
      source: 'Google Ads'
    },
    {
      id: '5',
      company: 'EcoGreen Solutions',
      contact: 'Lucie Bertrand',
      sector: 'Environnement',
      location: 'Nantes',
      budget: '15,000-25,000€',
      priority: 'low',
      status: 'nouveau',
      description: 'Startup environnementale cherchant CRM simple pour gestion prospects',
      lastContact: '2024-01-20',
      phone: '+33 2 40 12 34 56',
      email: 'l.bertrand@ecogreen.fr',
      potential: '18,000€',
      needs: 'CRM basique + automatisation email',
      history: [
        'Contact initial via LinkedIn',
        'Envoi de documentation produit'
      ],
      interactions: 2,
      source: 'LinkedIn'
    }
  ]);

  // Données du pipeline avec tâches
  const [pipelineData] = useState<PipelineItem[]>([
    {
      id: '1',
      company: 'TechCorp Solutions',
      contact: 'Marie Dubois',
      value: '75,000€',
      stage: 'qualification',
      probability: 60,
      nextAction: 'Présentation produit',
      dueDate: '2024-01-15',
      notes: 'Très intéressés par la solution CRM. Budget validé par la direction.',
      tasks: [
        { id: '1', title: 'Préparer présentation personnalisée', completed: true, dueDate: '2024-01-14', priority: 'high' },
        { id: '2', title: 'Envoyer documentation technique', completed: false, dueDate: '2024-01-16', priority: 'medium' }
      ]
    },
    {
      id: '2',
      company: 'InnovateSAS',
      contact: 'Pierre Martin',
      value: '120,000€',
      stage: 'proposition',
      probability: 80,
      nextAction: 'Envoi devis détaillé',
      dueDate: '2024-01-12',
      notes: 'Budget validé, attente proposition. Demande références clients similaires.',
      tasks: [
        { id: '3', title: 'Finaliser devis personnalisé', completed: false, dueDate: '2024-01-12', priority: 'high' },
        { id: '4', title: 'Préparer références clients', completed: true, dueDate: '2024-01-11', priority: 'medium' }
      ]
    },
    {
      id: '3',
      company: 'DataFlow Analytics',
      contact: 'Thomas Rousseau',
      value: '200,000€',
      stage: 'negociation',
      probability: 75,
      nextAction: 'Négociation prix',
      dueDate: '2024-01-18',
      notes: 'Demande réduction 10%. Possibilité de paiement échelonné.',
      tasks: [
        { id: '5', title: 'Préparer contre-proposition', completed: false, dueDate: '2024-01-17', priority: 'high' },
        { id: '6', title: 'Valider conditions paiement', completed: false, dueDate: '2024-01-18', priority: 'medium' }
      ]
    }
  ]);

  // Données des activités avec agenda intégré
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Rendez-vous TechCorp',
      type: 'meeting',
      date: '2024-01-15',
      time: '10:00',
      duration: 60,
      leadId: '1',
      leadName: 'TechCorp Solutions',
      status: 'pending',
      priority: 'high',
      description: 'Présentation de la solution CRM avec démonstration live',
      location: 'Bureau client - 15 rue de la Tech, Paris',
      reminder: true,
      reminderTime: '30min',
      attendees: ['Marie Dubois', 'Jean Dupont (DSI)']
    },
    {
      id: '2',
      title: 'Appel de suivi InnovateSAS',
      type: 'call',
      date: '2024-01-15',
      time: '14:30',
      duration: 30,
      leadId: '2',
      leadName: 'InnovateSAS',
      status: 'pending',
      priority: 'medium',
      description: 'Suivi après envoi du devis - négociation finale',
      reminder: true,
      reminderTime: '15min'
    },
    {
      id: '3',
      title: 'Email de relance DataFlow',
      type: 'email',
      date: '2024-01-16',
      time: '09:00',
      duration: 15,
      leadId: '3',
      leadName: 'DataFlow Analytics',
      status: 'pending',
      priority: 'medium',
      description: 'Relance pour négociation prix avec nouvelle proposition',
      reminder: false
    },
    {
      id: '4',
      title: 'Qualification HealthTech Pro',
      type: 'call',
      date: '2024-01-16',
      time: '11:00',
      duration: 45,
      leadId: '4',
      leadName: 'HealthTech Pro',
      status: 'pending',
      priority: 'medium',
      description: 'Appel de qualification - identifier besoins précis',
      reminder: true,
      reminderTime: '30min'
    },
    {
      id: '5',
      title: 'Suivi EcoGreen Solutions',
      type: 'email',
      date: '2024-01-17',
      time: '15:00',
      duration: 10,
      leadId: '5',
      leadName: 'EcoGreen Solutions',
      status: 'pending',
      priority: 'low',
      description: 'Envoi proposition commerciale adaptée startup',
      reminder: false
    }
  ]);

  useEffect(() => {
    trackAction('view-commercial-dashboard');
  }, []);

  // Fonctions utilitaires pour les commissions
  const calculateCommissionRate = (amount: number) => {
    if (amount >= 100000) return 12;
    if (amount >= 50000) return 10;
    if (amount >= 25000) return 7;
    return 5;
  };

  const calculateCommission = (amount: number) => {
    const rate = calculateCommissionRate(amount);
    return (amount * rate) / 100;
  };

  const getTotalCommissions = () => {
    return commissions.reduce((total, commission) => total + commission.commissionAmount, 0);
  };

  const getPaidCommissions = () => {
    return commissions
      .filter(c => c.status === 'paid')
      .reduce((total, commission) => total + commission.commissionAmount, 0);
  };

  const getPendingCommissions = () => {
    return commissions
      .filter(c => c.status === 'pending' || c.status === 'processing')
      .reduce((total, commission) => total + commission.commissionAmount, 0);
  };

  const getAverageCommissionRate = () => {
    const totalSales = commissions.reduce((total, commission) => total + commission.saleAmount, 0);
    const totalCommissions = getTotalCommissions();
    return totalSales > 0 ? (totalCommissions / totalSales) * 100 : 0;
  };

  const getStageItems = (stageId: string) => {
    return pipelineData.filter(item => item.stage === stageId);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'meeting': return 'ri-calendar-event-line';
      case 'call': return 'ri-phone-line';
      case 'email': return 'ri-mail-line';
      case 'task': return 'ri-task-line';
      default: return 'ri-calendar-line';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'text-blue-600 bg-blue-100';
      case 'call': return 'text-green-600 bg-green-100';
      case 'email': return 'text-purple-600 bg-purple-100';
      case 'task': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUpcomingActivities = () => {
    const today = new Date().toISOString().split('T')[0];
    return activities.filter(activity => 
      activity.date >= today && activity.status === 'pending'
    ).slice(0, 5);
  };

  const getUnreadNotifications = () => {
    return notifications.filter(n => !n.read);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  // Filtrage des leads
  const getFilteredLeads = () => {
    return leads.filter(lead => {
      if (leadFilters.sector && lead.sector !== leadFilters.sector) return false;
      if (leadFilters.location && lead.location !== leadFilters.location) return false;
      if (leadFilters.priority && lead.priority !== leadFilters.priority) return false;
      if (leadFilters.status && lead.status !== leadFilters.status) return false;
      return true;
    });
  };

  // Gestion des activités
  const handleCreateActivity = () => {
    if (!newActivity.title || !newActivity.date || !newActivity.time) {
      alert('Veuillez remplir tous les champs obligatoires (Titre, Date, Heure)');
      return;
    }

    const activity: Activity = {
      id: Date.now().toString(),
      title: newActivity.title,
      type: newActivity.type as 'meeting' | 'call' | 'email' | 'task',
      date: newActivity.date,
      time: newActivity.time,
      duration: newActivity.duration,
      description: newActivity.description,
      location: newActivity.location,
      status: 'pending',
      priority: newActivity.priority as 'high' | 'medium' | 'low',
      reminder: newActivity.reminder,
      reminderTime: newActivity.reminder ? '30min' : undefined,
      leadId: newActivity.leadId || undefined,
      leadName: newActivity.leadId ? leads.find(l => l.id === newActivity.leadId)?.company : undefined
    };
    
    setActivities(prev => [...prev, activity]);
    setShowNewActivity(false);
    setShowSuccessMessage(true);
    
    // Réinitialiser le formulaire
    setNewActivity({
      title: '',
      type: 'meeting',
      date: '',
      time: '',
      duration: 60,
      description: '',
      location: '',
      reminder: true,
      leadId: '',
      priority: 'medium'
    });
    
    trackAction('create-activity', { type: activity.type, priority: activity.priority });

    // Masquer le message de succès après 3 secondes
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // Gestion de la création de leads
  const handleCreateLead = () => {
    if (!newLead.company || !newLead.contact || !newLead.email || !newLead.phone) {
      alert('Veuillez remplir tous les champs obligatoires (Entreprise, Contact, Email, Téléphone)');
      return;
    }

    const lead: Lead = {
      id: Date.now().toString(),
      company: newLead.company,
      contact: newLead.contact,
      sector: newLead.sector,
      location: newLead.location,
      budget: newLead.budget,
      priority: newLead.priority as 'high' | 'medium' | 'low',
      status: 'nouveau',
      description: newLead.description,
      phone: newLead.phone,
      email: newLead.email,
      potential: newLead.budget.split('-')[0] || '0€',
      needs: newLead.needs,
      history: [
        `Lead créé le ${new Date().toLocaleDateString('fr-FR')}`,
        'En attente de premier contact'
      ],
      interactions: 0,
      source: newLead.source,
      lastContact: 'Jamais contacté'
    };
    
    setLeads(prev => [lead, ...prev]);
    setShowNewLead(false);
    setShowLeadSuccessMessage(true);
    
    // Réinitialiser le formulaire
    setNewLead({
      company: '',
      contact: '',
      sector: '',
      location: '',
      budget: '',
      priority: 'medium',
      description: '',
      phone: '',
      email: '',
      source: 'Saisie manuelle',
      needs: ''
    });
    
    trackAction('create-lead', { 
      sector: lead.sector, 
      priority: lead.priority,
      source: lead.source 
    });

    // Masquer le message de succès après 3 secondes
    setTimeout(() => {
      setShowLeadSuccessMessage(false);
    }, 3000);
  };

  const stages = [
    { id: 'prospection', label: 'Prospection', color: 'bg-gray-100' },
    { id: 'qualification', label: 'Qualification', color: 'bg-blue-100' },
    { id: 'proposition', label: 'Proposition', color: 'bg-yellow-100' },
    { id: 'negociation', label: 'Négociation', color: 'bg-orange-100' },
    { id: 'signature', label: 'Signature', color: 'bg-green-100' }
  ];

  const sectors = ['Technologie', 'Services', 'Santé', 'Environnement', 'Finance', 'Industrie'];
  const locations = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nantes', 'Bordeaux'];

  // Données du profil commercial
  const [profile, setProfile] = useState<CommercialProfile>({
    id: '1',
    firstName: 'Marc',
    lastName: 'Dubois',
    email: 'marc.dubois@komercia.fr',
    phone: '+33 6 12 34 56 78',
    avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20man%20portrait%20headshot%20suit%20confident%20smile%20office%20background%20corporate%20style%20modern%20clean&width=200&height=200&seq=profile-avatar-001&orientation=squarish',
    position: 'Commercial Senior',
    department: 'Ventes B2B',
    startDate: '2020-03-15',
    specializations: ['CRM', 'Solutions SaaS', 'Transformation Digitale', 'Vente Consultative'],
    languages: ['Français', 'Anglais', 'Espagnol'],
    certifications: [
      {
        id: '1',
        name: 'Certified Sales Professional',
        issuer: 'Sales Management Association',
        date: '2022-06-15',
        credentialId: 'CSP-2022-456789'
      },
      {
        id: '2',
        name: 'Advanced CRM Specialist',
        issuer: 'Salesforce',
        date: '2023-01-20',
        expiryDate: '2025-01-20',
        credentialId: 'SF-CRM-2023-123'
      }
    ],
    performance: {
      totalSales: 127,
      totalRevenue: 2450000,
      totalCommission: 185000,
      conversionRate: 28.5,
      averageOrderValue: 19291,
      customerSatisfaction: 4.7,
      leadsGenerated: 445,
      dealsWon: 127
    },
    preferences: {
      notifications: {
        email: true,
        sms: true,
        push: true
      },
      language: 'fr',
      timezone: 'Europe/Paris',
      theme: 'light'
    }
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  // Données des objectifs
  const [objectives, setObjectives] = useState<Objective[]>([
    {
      id: '1',
      title: 'Chiffre d\'affaires mensuel',
      description: 'Atteindre 150,000€ de CA ce mois',
      targetValue: 150000,
      currentValue: 127500,
      unit: '€',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'en_cours',
      category: 'revenue',
      priority: 'high',
      milestones: [
        { id: '1', title: '50K€', targetDate: '2024-01-10', completed: true, value: 50000 },
        { id: '2', title: '100K€', targetDate: '2024-01-20', completed: true, value: 100000 },
        { id: '3', title: '150K€', targetDate: '2024-01-31', completed: false, value: 150000 }
      ]
    },
    {
      id: '2',
      title: 'Nouveaux leads qualifiés',
      description: 'Générer 50 nouveaux leads qualifiés',
      targetValue: 50,
      currentValue: 42,
      unit: 'leads',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'en_cours',
      category: 'leads',
      priority: 'high',
      milestones: [
        { id: '1', title: '20 leads', targetDate: '2024-01-10', completed: true, value: 20 },
        { id: '2', title: '35 leads', targetDate: '2024-01-20', completed: true, value: 35 },
        { id: '3', title: '50 leads', targetDate: '2024-01-31', completed: false, value: 50 }
      ]
    },
    {
      id: '3',
      title: 'Rendez-vous clients',
      description: 'Réaliser 30 rendez-vous clients',
      targetValue: 30,
      currentValue: 28,
      unit: 'RDV',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'en_cours',
      category: 'meetings',
      priority: 'medium',
      milestones: [
        { id: '1', title: '10 RDV', targetDate: '2024-01-10', completed: true, value: 10 },
        { id: '2', title: '20 RDV', targetDate: '2024-01-20', completed: true, value: 20 },
        { id: '3', title: '30 RDV', targetDate: '2024-01-31', completed: false, value: 30 }
      ]
    },
    {
      id: '4',
      title: 'Taux de conversion',
      description: 'Maintenir un taux de conversion de 30%',
      targetValue: 30,
      currentValue: 28.5,
      unit: '%',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'en_cours',
      category: 'ventes',
      priority: 'medium',
      milestones: []
    }
  ]);

  const [showNewObjective, setShowNewObjective] = useState(false);
  const [newObjective, setNewObjective] = useState({
    title: '',
    description: '',
    targetValue: 0,
    unit: '€',
    endDate: '',
    category: 'revenue',
    priority: 'medium'
  });

  // Données des produits affiliés
  const [affiliatedProducts, setAffiliatedProducts] = useState<AffiliatedProduct[]>([
    {
      id: '1',
      name: 'CRM Pro Enterprise',
      company: 'TechCorp Solutions',
      category: 'CRM',
      description: 'Solution CRM complète pour grandes entreprises avec intégration email, téléphonie et analytics avancés',
      price: 75000,
      commission: 12,
      commissionType: 'percentage',
      image: 'https://readdy.ai/api/search-image?query=modern%20crm%20software%20dashboard%20interface%20professional%20business%20analytics%20charts%20clean%20design%20blue%20white%20technology&width=400&height=300&seq=product-crm-001&orientation=landscape',
      features: [
        'Gestion complète des contacts et leads',
        'Pipeline de ventes visuel',
        'Intégration email et calendrier',
        'Rapports et analytics en temps réel',
        'Application mobile iOS et Android',
        'Support 24/7'
      ],
      targetMarket: ['Grandes entreprises', 'PME', 'Startups en croissance'],
      salesMaterials: [
        { id: '1', type: 'brochure', title: 'Brochure produit CRM Pro', url: '#', size: '2.5 MB' },
        { id: '2', type: 'video', title: 'Démo vidéo 10 min', url: '#', size: '45 MB' },
        { id: '3', type: 'presentation', title: 'Présentation commerciale', url: '#', size: '8 MB' }
      ],
      performance: {
        totalSales: 23,
        totalRevenue: 1725000,
        totalCommission: 207000,
        conversionRate: 32.5,
        averageOrderValue: 75000
      },
      status: 'active'
    },
    {
      id: '2',
      name: 'Analytics BI Suite',
      company: 'DataFlow Analytics',
      category: 'Business Intelligence',
      description: 'Suite complète d\'analyse de données avec tableaux de bord personnalisables et IA prédictive',
      price: 120000,
      commission: 15,
      commissionType: 'percentage',
      image: 'https://readdy.ai/api/search-image?query=business%20intelligence%20analytics%20dashboard%20data%20visualization%20charts%20graphs%20modern%20interface%20professional%20technology&width=400&height=300&seq=product-bi-002&orientation=landscape',
      features: [
        'Tableaux de bord personnalisables',
        'IA prédictive et machine learning',
        'Intégration multi-sources',
        'Rapports automatisés',
        'Visualisations interactives',
        'API REST complète'
      ],
      targetMarket: ['Grandes entreprises', 'Secteur financier', 'E-commerce'],
      salesMaterials: [
        { id: '1', type: 'brochure', title: 'Guide Analytics BI', url: '#', size: '3.2 MB' },
        { id: '2', type: 'demo', title: 'Démo interactive', url: '#' },
        { id: '3', type: 'video', title: 'Cas d\'usage clients', url: '#', size: '67 MB' }
      ],
      performance: {
        totalSales: 12,
        totalRevenue: 1440000,
        totalCommission: 216000,
        conversionRate: 28.0,
        averageOrderValue: 120000
      },
      status: 'active'
    },
    {
      id: '3',
      name: 'Marketing Automation Pro',
      company: 'InnovateSAS',
      category: 'Marketing',
      description: 'Plateforme d\'automatisation marketing avec email, SMS, réseaux sociaux et scoring de leads',
      price: 45000,
      commission: 10,
      commissionType: 'percentage',
      image: 'https://readdy.ai/api/search-image?query=marketing%20automation%20software%20email%20campaigns%20social%20media%20management%20professional%20interface%20modern%20design&width=400&height=300&seq=product-marketing-003&orientation=landscape',
      features: [
        'Campagnes email automatisées',
        'Gestion réseaux sociaux',
        'Lead scoring intelligent',
        'A/B testing avancé',
        'Segmentation comportementale',
        'Intégration CRM'
      ],
      targetMarket: ['PME', 'Agences marketing', 'E-commerce'],
      salesMaterials: [
        { id: '1', type: 'brochure', title: 'Brochure Marketing Pro', url: '#', size: '1.8 MB' },
        { id: '2', type: 'presentation', title: 'Pitch deck', url: '#', size: '5 MB' }
      ],
      performance: {
        totalSales: 18,
        totalRevenue: 810000,
        totalCommission: 81000,
        conversionRate: 25.0,
        averageOrderValue: 45000
      },
      status: 'active'
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<AffiliatedProduct | null>(null);
  const [showProductDetails, setShowProductDetails] = useState(false);

  // Données des appels d'offres
  const [callsForTenders, setCallsForTenders] = useState<CallForTender[]>([
    {
      id: '1',
      title: 'Déploiement CRM pour groupe bancaire',
      company: 'Banque Nationale de France',
      sector: 'Finance',
      budget: '500,000 - 800,000€',
      deadline: '2024-02-15',
      description: 'Recherche solution CRM complète pour 500 utilisateurs avec intégration systèmes bancaires existants',
      requirements: [
        'Expérience secteur bancaire obligatoire',
        'Certification sécurité ISO 27001',
        'Support 24/7 en français',
        'Formation équipe incluse',
        'Migration données depuis système actuel'
      ],
      status: 'open',
      publishDate: '2024-01-10',
      location: 'Paris, France',
      contactPerson: 'Sophie Martin',
      contactEmail: 's.martin@bnf.fr',
      contactPhone: '+33 1 42 86 75 30',
      documents: [
        { id: '1', name: 'Cahier des charges.pdf', type: 'pdf', url: '#', size: '2.5 MB' },
        { id: '2', name: 'Spécifications techniques.pdf', type: 'pdf', url: '#', size: '1.8 MB' }
      ],
      myApplication: undefined
    },
    {
      id: '2',
      title: 'Solution BI pour réseau de distribution',
      company: 'RetailCorp International',
      sector: 'Distribution',
      budget: '300,000 - 500,000€',
      deadline: '2024-02-28',
      description: 'Mise en place solution Business Intelligence pour analyse ventes multi-magasins',
      requirements: [
        'Intégration systèmes de caisse',
        'Tableaux de bord temps réel',
        'Application mobile pour managers',
        'Formation utilisateurs',
        'Maintenance 3 ans incluse'
      ],
      status: 'in_progress',
      publishDate: '2024-01-05',
      location: 'Lyon, France',
      contactPerson: 'Pierre Rousseau',
      contactEmail: 'p.rousseau@retailcorp.fr',
      contactPhone: '+33 4 78 92 15 67',
      documents: [
        { id: '1', name: 'Appel d\'offres.pdf', type: 'pdf', url: '#', size: '3.2 MB' }
      ],
      myApplication: {
        id: '1',
        tenderId: '2',
        submittedDate: '2024-01-18',
        status: 'under_review',
        proposal: 'Proposition complète avec solution Analytics BI Suite adaptée au secteur retail',
        estimatedPrice: 380000,
        deliveryTime: '6 mois',
        documents: [
          { id: '1', name: 'Proposition commerciale.pdf', type: 'pdf', url: '#', size: '4.5 MB' },
          { id: '2', name: 'Planning projet.pdf', type: 'pdf', url: '#', size: '1.2 MB' }
        ]
      }
    },
    {
      id: '3',
      title: 'Plateforme marketing automation',
      company: 'EcoTech Industries',
      sector: 'Environnement',
      budget: '150,000 - 250,000€',
      deadline: '2024-03-15',
      description: 'Recherche plateforme marketing automation pour campagnes B2B et lead nurturing',
      requirements: [
        'Intégration CRM Salesforce',
        'Gestion multi-canaux',
        'Scoring de leads',
        'Rapports personnalisés',
        'Support en français'
      ],
      status: 'open',
      publishDate: '2024-01-15',
      location: 'Toulouse, France',
      contactPerson: 'Marie Dubois',
      contactEmail: 'm.dubois@ecotech.fr',
      contactPhone: '+33 5 61 23 45 78',
      documents: [
        { id: '1', name: 'Besoin client.pdf', type: 'pdf', url: '#', size: '1.5 MB' }
      ],
      myApplication: undefined
    }
  ]);

  const [selectedTender, setSelectedTender] = useState<CallForTender | null>(null);
  const [showTenderDetails, setShowTenderDetails] = useState(false);
  const [showTenderApplication, setShowTenderApplication] = useState(false);
  const [tenderApplication, setTenderApplication] = useState({
    proposal: '',
    estimatedPrice: 0,
    deliveryTime: '',
    documents: [] as File[]
  });

  // Fonctions pour les objectifs
  const getObjectiveProgress = (objective: Objective) => {
    return Math.min((objective.currentValue / objective.targetValue) * 100, 100);
  };

  const getObjectiveStatus = (objective: Objective) => {
    const progress = getObjectiveProgress(objective);
    const daysLeft = Math.ceil((new Date(objective.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    if (progress >= 100) return { label: 'Atteint', color: 'bg-green-100 text-green-800' };
    if (daysLeft < 0) return { label: 'Échoué', color: 'bg-red-100 text-red-800' };
    if (progress >= 80) return { label: 'En bonne voie', color: 'bg-blue-100 text-blue-800' };
    if (progress >= 50) return { label: 'En cours', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'À risque', color: 'bg-orange-100 text-orange-800' };
  };

  const handleCreateObjective = () => {
    if (!newObjective.title || !newObjective.targetValue || !newObjective.endDate) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const objective: Objective = {
      id: Date.now().toString(),
      title: newObjective.title,
      description: newObjective.description,
      targetValue: newObjective.targetValue,
      currentValue: 0,
      unit: newObjective.unit,
      startDate: new Date().toISOString().split('T')[0],
      endDate: newObjective.endDate,
      status: 'en_cours',
      category: newObjective.category as any,
      priority: newObjective.priority as any,
      milestones: []
    };

    setObjectives(prev => [objective, ...prev]);
    setShowNewObjective(false);
    setNewObjective({
      title: '',
      description: '',
      targetValue: 0,
      unit: '€',
      endDate: '',
      category: 'revenue',
      priority: 'medium'
    });

    trackAction('create-objective', { category: objective.category });
  };

  const handleUpdateObjectiveProgress = (objectiveId: string, newValue: number) => {
    setObjectives(prev => prev.map(obj => 
      obj.id === objectiveId ? { ...obj, currentValue: newValue } : obj
    ));
  };

  // Fonctions pour les appels d'offres
  const handleSubmitTenderApplication = () => {
    if (!selectedTender || !tenderApplication.proposal || !tenderApplication.estimatedPrice) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const application: TenderApplication = {
      id: Date.now().toString(),
      tenderId: selectedTender.id,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'submitted',
      proposal: tenderApplication.proposal,
      estimatedPrice: tenderApplication.estimatedPrice,
      deliveryTime: tenderApplication.deliveryTime,
      documents: []
    };

    setCallsForTenders(prev => prev.map(tender =>
      tender.id === selectedTender.id
        ? { ...tender, myApplication: application, status: 'in_progress' }
        : tender
    ));

    setShowTenderApplication(false);
    setTenderApplication({
      proposal: '',
      estimatedPrice: 0,
      deliveryTime: '',
      documents: []
    });

    trackAction('submit-tender-application', { tenderId: selectedTender.id });
  };

  const renderCommissions = () => (
    <div className="space-y-6">
      {/* Bannière publicitaire pour solutions de paiement */}
      <AdBanner 
        position="commercial-commissions-header"
        format="compact"
        section="commercial-commissions"
        userContext={{ userType: 'commercial', section: 'commissions' }}
        priority="medium"
        targetCategories={['payment-solutions', 'commission-tools']}
        className="mb-4"
      />

      {/* Statistiques des commissions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Commissions"
          value={`${getTotalCommissions().toLocaleString()}€`}
          change="+15% ce trimestre"
          changeType="positive"
          icon="ri-money-euro-circle-line"
          color="bg-green-600"
        />
        <StatsCard
          title="Commissions Payées"
          value={`${getPaidCommissions().toLocaleString()}€`}
          change="+8% ce mois"
          changeType="positive"
          icon="ri-check-double-line"
          color="bg-blue-600"
        />
        <StatsCard
          title="En Attente"
          value={`${getPendingCommissions().toLocaleString()}€`}
          change="2 paiements"
          changeType="neutral"
          icon="ri-time-line"
          color="bg-orange-600"
        />
        <StatsCard
          title="Taux Moyen"
          value={`${getAverageCommissionRate().toFixed(1)}%`}
          change="+0.5% vs trimestre dernier"
          changeType="positive"
          icon="ri-percent-line"
          color="bg-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculateur de commission */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculateur de Commission</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant de la vente (€)
                </label>
                <input
                  type="number"
                  value={calculatorAmount}
                  onChange={(e) => setCalculatorAmount(e.target.value)}
                  placeholder="Ex: 75000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {calculatorAmount && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Montant:</span>
                      <span className="font-medium">{parseInt(calculatorAmount).toLocaleString()}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Taux:</span>
                      <span className="font-medium">{calculateCommissionRate(parseInt(calculatorAmount))}%</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium text-gray-900">Commission:</span>
                      <span className="font-bold text-green-600">
                        {calculateCommission(parseInt(calculatorAmount)).toLocaleString()}€
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Barèmes de commission */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Barèmes de Commission</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">0 - 25K€:</span>
                    <span className="font-medium">5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">25K - 50K€:</span>
                    <span className="font-medium">7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">50K - 100K€:</span>
                    <span className="font-medium">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">100K€+:</span>
                    <span className="font-medium text-green-600">12%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Graphiques de performance */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Évolution des Performances</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Évolution mensuelle */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Commissions Mensuelles</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Octobre 2023</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-sm font-medium">18,500€</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Novembre 2023</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="text-sm font-medium">22,800€</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Décembre 2023</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-sm font-medium">14,200€</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Janvier 2024</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-green-600">32,550€</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparaison trimestrielle */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Comparaison Trimestrielle</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Q3 2023</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <span className="text-sm font-medium">45,200€</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Q4 2023</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-sm font-medium">55,500€</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Q1 2024</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                      <span className="text-sm font-medium text-green-600">47,200€</span>
                      <Badge className="text-green-600 bg-green-100">+15%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Liste des commissions */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Historique des Commissions</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <i className="ri-download-line mr-2"></i>
              Exporter
            </Button>
            <Button variant="outline" size="sm">
              <i className="ri-filter-line mr-2"></i>
              Filtrer
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Taux
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {commissions.map((commission) => (
                <tr key={commission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{commission.company}</div>
                      <div className="text-sm text-gray-500">{commission.contact}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {commission.saleAmount.toLocaleString()}€
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{commission.commissionRate}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600">
                      {commission.commissionAmount.toLocaleString()}€
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      commission.status === 'paid' ? 'bg-green-100 text-green-800' :
                      commission.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {commission.status === 'paid' ? 'Payée' :
                       commission.status === 'processing' ? 'En cours' : 'En attente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {commission.saleDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bannière publicitaire pour outils d'analyse */}
      <AdBanner 
        position="commercial-commissions-footer"
        format="compact"
        section="commercial-commissions"
        userContext={{ userType: 'commercial', section: 'commissions' }}
        priority="medium"
        targetCategories={['analytics', 'reporting', 'campaign-optimization']}
      />
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Bannière publicitaire principale */}
      <AdBanner 
        position="commercial-dashboard-header"
        format="compact"
        section="commercial-dashboard"
        userContext={{ userType: 'commercial', section: 'dashboard' }}
        priority="medium"
        targetCategories={['crm-tools', 'sales-training']}
        className="mb-4"
      />
      
      {/* Résumé des performances */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Chiffre d'Affaires Généré"
          value="127,500€"
          change="+18% ce mois"
          changeType="positive"
          icon="ri-money-euro-circle-line"
          color="bg-green-600"
        />
        <StatsCard
          title="Leads Contactés"
          value="89"
          change="+12 cette semaine"
          changeType="positive"
          icon="ri-user-star-line"
          color="bg-blue-600"
        />
        <StatsCard
          title="Leads Convertis"
          value="23"
          change="+5 ce mois"
          changeType="positive"
          icon="ri-trophy-line"
          color="bg-purple-600"
        />
        <StatsCard
          title="Taux de Conversion Global"
          value="25.8%"
          change="+3.2% vs mois dernier"
          changeType="positive"
          icon="ri-line-chart-line"
          color="bg-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications et alertes */}
        <div className="lg:col-span-1">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                {getUnreadNotifications().length} non lues
              </span>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {notifications.slice(0, 8).map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    notification.read ? 'border-gray-200 bg-gray-50' : 'border-blue-200 bg-blue-50'
                  }`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.priority === 'high' ? 'bg-red-500' :
                      notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <h4 className={`font-medium text-sm ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                        {notification.title}
                      </h4>
                      <p className={`text-xs mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-600'}`}>
                        {notification.message}
                      </p>
                      <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Accès rapide */}
            <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setActiveTab('leads')}
              >
                <i className="ri-user-star-line mr-2"></i>
                Nouveaux Leads ({leads.filter(l => l.status === 'nouveau').length})
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setActiveTab('commissions')}
              >
                <i className="ri-money-euro-circle-line mr-2"></i>
                Commissions ({getPendingCommissions().toLocaleString()}€)
              </Button>
            </div>
          </Card>
        </div>

        {/* Activité récente et accès rapide */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Activité Récente</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveTab('activities')}
              >
                Voir tout
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ri-check-line text-green-600 text-sm"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Vente conclue - MedCare Solutions</p>
                  <p className="text-xs text-gray-600">85,000€ - Commission: 7,650€</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-phone-line text-blue-600 text-sm"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Contact établi - TechCorp Solutions</p>
                  <p className="text-xs text-gray-600">Présentation produit programmée</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <i className="ri-file-text-line text-purple-600 text-sm"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Proposition envoyée - InnovateSAS</p>
                  <p className="text-xs text-gray-600">Devis 120,000€ en attente</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <i className="ri-calendar-event-line text-orange-600 text-sm"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">RDV programmé - HealthTech Pro</p>
                  <p className="text-xs text-gray-600">Demain 11h00 - Appel de qualification</p>
                </div>
              </div>
            </div>

            {/* Prochaines activités */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Prochaines Activités</h4>
              <div className="space-y-2">
                {getUpcomingActivities().slice(0, 3).map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <i className={`${getActivityIcon(activity.type)} text-sm text-gray-600`}></i>
                      <span className="text-sm text-gray-900">{activity.title}</span>
                    </div>
                    <span className="text-xs text-gray-500">{activity.date} {activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderLeads = () => (
    <div className="space-y-6">
      {/* Bannière publicitaire pour bases de données prospects */}
      <AdBanner 
        position="commercial-leads-header"
        format="compact"
        section="commercial-leads"
        userContext={{ userType: 'commercial', section: 'leads' }}
        priority="medium"
        targetCategories={['lead-generation', 'prospecting-tools']}
        className="mb-4"
      />

      {/* En-tête avec bouton Nouveau Lead */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Gestion des Leads</h2>
          <p className="text-sm text-gray-600 mt-1">Créez et gérez vos prospects commerciaux</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowNewLead(true)}
        >
          <i className="ri-add-line mr-2"></i>
          Nouveau Lead
        </Button>
      </div>

      {/* Filtres avancés */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filtres de Recherche</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="ri-filter-line mr-2"></i>
            {showFilters ? 'Masquer' : 'Afficher'} Filtres
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secteur</label>
              <select
                value={leadFilters.sector}
                onChange={(e) => setLeadFilters(prev => ({ ...prev, sector: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Tous les secteurs</option>
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
              <select
                value={leadFilters.location}
                onChange={(e) => setLeadFilters(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Toutes les villes</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
              <select
                value={leadFilters.priority}
                onChange={(e) => setLeadFilters(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Toutes priorités</option>
                <option value="high">Haute</option>
                <option value="medium">Moyenne</option>
                <option value="low">Basse</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select
                value={leadFilters.status}
                onChange={(e) => setLeadFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Tous les statuts</option>
                <option value="nouveau">Nouveau</option>
                <option value="en_cours">En cours</option>
                <option value="conclu">Conclu</option>
                <option value="perdu">Perdu</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setLeadFilters({ sector: '', location: '', priority: '', status: '', budget: '' })}
              >
                <i className="ri-refresh-line mr-2"></i>
                Réinitialiser
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Statistiques des leads */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{getFilteredLeads().length}</p>
            <p className="text-sm text-gray-600">Total leads</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{getFilteredLeads().filter(l => l.status === 'nouveau').length}</p>
            <p className="text-sm text-gray-600">Nouveaux</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{getFilteredLeads().filter(l => l.status === 'en_cours').length}</p>
            <p className="text-sm text-gray-600">En cours</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{getFilteredLeads().filter(l => l.status === 'conclu').length}</p>
            <p className="text-sm text-gray-600">Conclus</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {getFilteredLeads().reduce((total, lead) => {
                const potential = parseInt(lead.potential.replace(/[€,]/g, ''));
                return total + potential;
              }, 0).toLocaleString()}€
            </p>
            <p className="text-sm text-gray-600">Potentiel total</p>
          </div>
        </Card>
      </div>

      {/* Liste des leads avec détails complets */}
      <div className="space-y-4">
        {getFilteredLeads().map((lead) => (
          <Card key={lead.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{lead.company}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    lead.priority === 'high' ? 'bg-red-100 text-red-800' :
                    lead.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {lead.priority === 'high' ? 'Priorité haute' : 
                     lead.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    lead.status === 'nouveau' ? 'bg-blue-100 text-blue-800' :
                    lead.status === 'en_cours' ? 'bg-orange-100 text-orange-800' :
                    lead.status === 'conclu' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {lead.status === 'nouveau' ? 'Nouveau' :
                     lead.status === 'en_cours' ? 'En cours' :
                     lead.status === 'conclu' ? 'Conclu' : 'Perdu'}
                  </span>
                  <Badge variant="default">{lead.interactions} interactions</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="font-medium text-gray-900">{lead.contact}</p>
                    <p className="text-xs text-gray-500">{lead.phone}</p>
                    <p className="text-xs text-gray-500">{lead.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Entreprise</p>
                    <p className="font-medium text-gray-900">{lead.sector}</p>
                    <p className="text-xs text-gray-500">{lead.location}</p>
                    <p className="text-xs text-gray-500">Source: {lead.source}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="font-medium text-gray-900">{lead.budget}</p>
                    <p className="text-xs text-gray-500">Dernier contact: {lead.lastContact}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3">{lead.description}</p>
                
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-900 mb-1">Besoins identifiés:</p>
                  <p className="text-sm text-gray-600">{lead.needs}</p>
                </div>
              </div>
              
              <div className="text-right ml-6">
                <p className="text-2xl font-bold text-green-600">{lead.potential}</p>
                <p className="text-sm text-gray-600">Potentiel</p>
              </div>
            </div>

            {/* Historique des interactions */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900 mb-2">Historique des interactions:</p>
              <div className="space-y-1">
                {lead.history.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <p className="text-xs text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <Button variant="primary" size="sm" className="flex-1">
                <i className="ri-phone-line mr-2"></i>
                Appeler
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <i className="ri-mail-line mr-2"></i>
                Email
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => {
                  setSelectedLead(lead);
                  setShowLeadDetails(true);
                }}
              >
                <i className="ri-eye-line mr-2"></i>
                Détails complets
              </Button>
              <Button variant="outline" size="sm">
                <i className="ri-calendar-event-line mr-2"></i>
                RDV
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Bannière publicitaire pour outils de prospection */}
      <AdBanner 
        position="commercial-leads-footer"
        format="compact"
        section="commercial-leads"
        userContext={{ userType: 'commercial', section: 'leads' }}
        priority="medium"
        targetCategories={['prospecting-tools', 'lead-generation', 'sales-automation']}
      />
    </div>
  );

  const renderPipeline = () => (
    <div className="space-y-6">
      {/* Bannière publicitaire pour outils de gestion de pipeline */}
      <AdBanner 
        position="commercial-pipeline-header"
        format="compact"
        section="commercial-pipeline"
        userContext={{ userType: 'commercial', section: 'pipeline' }}
        priority="medium"
        targetCategories={['pipeline-management', 'sales-automation']}
        className="mb-4"
      />

      {/* Statistiques du pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{pipelineData.length}</p>
            <p className="text-sm text-gray-600">Opportunités actives</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {pipelineData.reduce((total, item) => {
                const value = parseInt(item.value.replace(/[€,]/g, ''));
                return total + value;
              }, 0).toLocaleString()}€
            </p>
            <p className="text-sm text-gray-600">Valeur pondérée</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {Math.round(pipelineData.reduce((sum, item) => sum + item.probability, 0) / pipelineData.length)}%
            </p>
            <p className="text-sm text-gray-600">Probabilité moyenne</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {pipelineData.filter(item => item.stage === 'signature').length}
            </p>
            <p className="text-sm text-gray-600">Prêts à signer</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {pipelineData.reduce((total, item) => total + item.tasks.filter(t => !t.completed).length, 0)}
            </p>
            <p className="text-sm text-gray-600">Tâches en attente</p>
          </div>
        </Card>
      </div>

      {/* Pipeline Kanban avec tâches */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {stages.map((stage) => {
          const stageItems = getStageItems(stage.id);
          const stageValue = stageItems.reduce((total, item) => {
            const value = parseInt(item.value.replace(/[€,]/g, ''));
            return total + value;
          }, 0);

          return (
            <div key={stage.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{stage.label}</h3>
                <Badge variant="default">{stageItems.length}</Badge>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">Valeur totale</p>
                <p className="font-semibold text-gray-900">{stageValue.toLocaleString()}€</p>
              </div>

              <div className="space-y-3">
                {stageItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{item.company}</h4>
                      <span className="text-sm font-semibold text-green-600">{item.value}</span>
                    </div>

                    <p className="text-xs text-gray-600 mb-2">{item.contact}</p>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">Probabilité</span>
                      <span className="text-xs font-medium">{item.probability}%</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${item.probability}%` }}
                      ></div>
                    </div>

                    <div className="text-xs text-gray-600 mb-1">
                      <i className="ri-calendar-line mr-1"></i>
                      {item.dueDate}
                    </div>

                    <p className="text-xs text-gray-700 font-medium mb-2">{item.nextAction}</p>

                    {/* Tâches associées */}
                    {item.tasks.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <p className="text-xs font-medium text-gray-700 mb-1">Tâches:</p>
                        <div className="space-y-1">
                          {item.tasks.map((task) => (
                            <div key={task.id} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={task.completed}
                                className="w-3 h-3 text-blue-600 rounded"
                                readOnly
                              />
                              <span className={`text-xs ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                {task.title}
                              </span>
                              <span className={`text-xs px-1 py-0.5 rounded ${
                                task.priority === 'high' ? 'bg-red-100 text-red-600' :
                                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                                'bg-green-100 text-green-600'
                              }`}>
                                {task.priority === 'high' ? 'H' : task.priority === 'medium' ? 'M' : 'L'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {item.notes && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <p className="text-xs text-gray-600">{item.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bannière publicitaire entre les colonnes */}
      <AdBanner 
        position="commercial-pipeline-horizontal"
        format="compact"
        section="commercial-pipeline"
        userContext={{ userType: 'commercial', section: 'pipeline' }}
        priority="medium"
        targetCategories={['pipeline-management', 'sales-automation']}
      />
    </div>
  );

  const renderActivities = () => (
    <div className="space-y-6">
      {/* Bannière publicitaire pour outils de productivité */}
      <AdBanner 
        position="commercial-activities-header"
        format="compact"
        section="commercial-activities"
        userContext={{ userType: 'commercial', section: 'activities' }}
        priority="medium"
        targetCategories={['productivity-tools', 'calendar-management']}
        className="mb-4"
      />

      {/* Statistiques des activités */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{getUpcomingActivities().length}</p>
            <p className="text-sm text-gray-600">À venir</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{activities.filter(a => a.type === 'meeting').length}</p>
            <p className="text-sm text-gray-600">Rendez-vous</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{activities.filter(a => a.type === 'call').length}</p>
            <p className="text-sm text-gray-600">Appels</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{activities.filter(a => a.type === 'email').length}</p>
            <p className="text-sm text-gray-600">Emails</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{activities.filter(a => a.status === 'overdue').length}</p>
            <p className="text-sm text-gray-600">En retard</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agenda intégré */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Agenda Intégré</h3>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowNewActivity(true)}
                >
                  <i className="ri-add-line mr-2"></i>
                  Nouvelle activité
                </Button>
                <Button variant="outline" size="sm">
                  <i className="ri-calendar-line mr-2"></i>
                  Synchroniser
                </Button>
              </div>
            </div>

            {/* Liste des activités avec détails complets */}
            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                        <i className={`${getActivityIcon(activity.type)} text-sm`}></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        
                        {activity.leadName && (
                          <p className="text-sm text-blue-600 mt-1">
                            <i className="ri-building-line mr-1"></i>
                            {activity.leadName}
                          </p>
                        )}
                        
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>
                            <i className="ri-calendar-line mr-1"></i>
                            {activity.date}
                          </span>
                          <span>
                            <i className="ri-time-line mr-1"></i>
                            {activity.time} ({activity.duration}min)
                          </span>
                          {activity.location && (
                            <span>
                              <i className="ri-map-pin-line mr-1"></i>
                              {activity.location}
                            </span>
                          )}
                        </div>

                        {activity.attendees && activity.attendees.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-500">Participants:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {activity.attendees.map((attendee, index) => (
                                <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  {attendee}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(activity.priority)}>
                        {activity.priority === 'high' ? 'Haute' : activity.priority === 'medium' ? 'Moyenne' : 'Basse'}
                      </Badge>
                      {activity.reminder && (
                        <div className="flex items-center space-x-1">
                          <i className="ri-notification-3-line text-yellow-600"></i>
                          <span className="text-xs text-gray-500">{activity.reminderTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Tâches à réaliser */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tâches à Réaliser</h3>
            
            <div className="space-y-3">
              {pipelineData.flatMap(item => 
                item.tasks.filter(task => !task.completed).map(task => ({
                  ...task,
                  company: item.company
                }))
              ).map((task) => (
                <div key={task.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority === 'high' ? 'H' : task.priority === 'medium' ? 'M' : 'L'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{task.company}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      <i className="ri-calendar-line mr-1"></i>
                      {task.dueDate}
                    </span>
                    <Button variant="outline" size="sm">
                      <i className="ri-check-line mr-1"></i>
                      Terminer
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Notifications automatiques */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Notifications Automatiques</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Rappels RDV</span>
                  <input type="checkbox" checked className="w-4 h-4 text-blue-600 rounded" readOnly />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Relances automatiques</span>
                  <input type="checkbox" checked className="w-4 h-4 text-blue-600 rounded" readOnly />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Tâches en retard</span>
                  <input type="checkbox" checked className="w-4 h-4 text-blue-600 rounded" readOnly />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bannière publicitaire pour applications de productivité */}
      <AdBanner 
        position="commercial-activities-footer"
        format="compact"
        section="commercial-activities"
        userContext={{ userType: 'commercial', section: 'activities' }}
        priority="medium"
        targetCategories={['productivity-tools', 'calendar-management']}
      />
    </div>
  );

  // Modal pour nouvelle activité
  const renderNewActivityModal = () => (
    showNewActivity && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Créer une Nouvelle Activité</h3>
              <p className="text-sm text-gray-600 mt-1">Planifiez vos rendez-vous, appels et tâches commerciales</p>
            </div>
            <button
              onClick={() => setShowNewActivity(false)}
              className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center cursor-pointer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>

          <div className="space-y-5">
            {/* Type d'activité - Sélection visuelle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Type d'activité</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setNewActivity(prev => ({ ...prev, type: 'meeting' }))}
                  className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
                    newActivity.type === 'meeting'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <i className={`ri-calendar-event-line text-2xl mb-2 ${
                    newActivity.type === 'meeting' ? 'text-blue-600' : 'text-gray-600'
                  }`}></i>
                  <p className={`text-sm font-medium ${
                    newActivity.type === 'meeting' ? 'text-blue-900' : 'text-gray-700'
                  }`}>Rendez-vous</p>
                </button>
                <button
                  onClick={() => setNewActivity(prev => ({ ...prev, type: 'call' }))}
                  className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
                    newActivity.type === 'call'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <i className={`ri-phone-line text-2xl mb-2 ${
                    newActivity.type === 'call' ? 'text-green-600' : 'text-gray-600'
                  }`}></i>
                  <p className={`text-sm font-medium ${
                    newActivity.type === 'call' ? 'text-green-900' : 'text-gray-700'
                  }`}>Appel</p>
                </button>
                <button
                  onClick={() => setNewActivity(prev => ({ ...prev, type: 'email' }))}
                  className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
                    newActivity.type === 'email'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <i className={`ri-mail-line text-2xl mb-2 ${
                    newActivity.type === 'email' ? 'text-purple-600' : 'text-gray-600'
                  }`}></i>
                  <p className={`text-sm font-medium ${
                    newActivity.type === 'email' ? 'text-purple-900' : 'text-gray-700'
                  }`}>Email</p>
                </button>
                <button
                  onClick={() => setNewActivity(prev => ({ ...prev, type: 'task' }))}
                  className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
                    newActivity.type === 'task'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <i className={`ri-task-line text-2xl mb-2 ${
                    newActivity.type === 'task' ? 'text-orange-600' : 'text-gray-600'
                  }`}></i>
                  <p className={`text-sm font-medium ${
                    newActivity.type === 'task' ? 'text-orange-900' : 'text-gray-700'
                  }`}>Tâche</p>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de l'activité <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newActivity.title}
                onChange={(e) => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Ex: Présentation produit chez TechCorp Solutions"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lead associé (optionnel)</label>
              <select
                value={newActivity.leadId}
                onChange={(e) => setNewActivity(prev => ({ ...prev, leadId: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
              >
                <option value="">Aucun lead associé</option>
                {leads.map(lead => (
                  <option key={lead.id} value={lead.id}>{lead.company} - {lead.contact}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={newActivity.date}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heure <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  value={newActivity.time}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Durée</label>
                <select
                  value={newActivity.duration}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 heure</option>
                  <option value="90">1h30</option>
                  <option value="120">2 heures</option>
                  <option value="180">3 heures</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                <select
                  value={newActivity.priority}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                >
                  <option value="low">🟢 Basse</option>
                  <option value="medium">🟡 Moyenne</option>
                  <option value="high">🔴 Haute</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newActivity.description}
                onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                rows={3}
                placeholder="Décrivez l'objectif et les détails de cette activité..."
              />
            </div>

            {newActivity.type === 'meeting' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="ri-map-pin-line mr-1"></i>
                  Lieu du rendez-vous
                </label>
                <input
                  type="text"
                  value={newActivity.location}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Adresse complète ou lieu du rendez-vous"
                />
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="reminder"
                  checked={newActivity.reminder}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, reminder: e.target.checked }))}
                  className="w-5 h-5 text-blue-600 rounded cursor-pointer mt-0.5"
                />
                <div className="flex-1">
                  <label htmlFor="reminder" className="text-sm font-medium text-blue-900 cursor-pointer block">
                    <i className="ri-notification-3-line mr-1"></i>
                    Activer les rappels automatiques
                  </label>
                  <p className="text-xs text-blue-700 mt-1">
                    Vous recevrez une notification 30 minutes avant le début de l'activité
                  </p>
                </div>
              </div>
            </div>

            {/* Conseils */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <i className="ri-lightbulb-line mr-2 text-yellow-600"></i>
                Conseils pour une activité réussie
              </h4>
              <ul className="space-y-1 text-xs text-gray-600">
                <li className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Préparez un ordre du jour clair avant chaque rendez-vous</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Associez toujours vos activités à un lead pour un meilleur suivi</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Activez les rappels pour ne jamais manquer une opportunité</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowNewActivity(false)}
            >
              <i className="ri-close-line mr-2"></i>
              Annuler
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleCreateActivity}
            >
              <i className="ri-add-line mr-2"></i>
              Créer l'activité
            </Button>
          </div>
        </div>
      </div>
    )
  );

  // Modal pour nouveau lead
  const renderNewLeadModal = () => (
    showNewLead && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <i className="ri-user-add-line text-white text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Créer un Nouveau Lead</h3>
                <p className="text-sm text-gray-600 mt-1">Ajoutez un nouveau prospect à votre pipeline commercial</p>
              </div>
            </div>
            <button
              onClick={() => setShowNewLead(false)}
              className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center cursor-pointer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>

          <div className="space-y-6">
            {/* Informations de l'entreprise */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
                <i className="ri-building-line mr-2"></i>
                Informations de l'Entreprise
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'entreprise <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newLead.company}
                    onChange={(e) => setNewLead(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Ex: TechCorp Solutions"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secteur d'activité</label>
                  <select
                    value={newLead.sector}
                    onChange={(e) => setNewLead(prev => ({ ...prev, sector: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                  >
                    <option value="">Sélectionner un secteur</option>
                    {sectors.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                  <select
                    value={newLead.location}
                    onChange={(e) => setNewLead(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                  >
                    <option value="">Sélectionner une ville</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget estimé</label>
                  <select
                    value={newLead.budget}
                    onChange={(e) => setNewLead(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                  >
                    <option value="">Sélectionner un budget</option>
                    <option value="15,000-25,000€">15,000-25,000€</option>
                    <option value="25,000-50,000€">25,000-50,000€</option>
                    <option value="50,000-100,000€">50,000-100,000€</option>
                    <option value="100,000-200,000€">100,000-200,000€</option>
                    <option value="200,000€+">200,000€+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Informations du contact */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-4 flex items-center">
                <i className="ri-user-line mr-2"></i>
                Contact Principal
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du contact <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newLead.contact}
                    onChange={(e) => setNewLead(prev => ({ ...prev, contact: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Ex: Marie Dubois"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Ex: marie.dubois@techcorp.fr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={newLead.phone}
                    onChange={(e) => setNewLead(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Ex: +33 1 42 34 56 78"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source du lead</label>
                  <select
                    value={newLead.source}
                    onChange={(e) => setNewLead(prev => ({ ...prev, source: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                  >
                    <option value="Saisie manuelle">Saisie manuelle</option>
                    <option value="Site web">Site web</option>
                    <option value="Recommandation">Recommandation</option>
                    <option value="Salon professionnel">Salon professionnel</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Appel à froid">Appel à froid</option>
                    <option value="Email marketing">Email marketing</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Détails du projet */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-4 flex items-center">
                <i className="ri-file-text-line mr-2"></i>
                Détails du Projet
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setNewLead(prev => ({ ...prev, priority: 'low' }))}
                      className={`p-3 border-2 rounded-lg transition-all cursor-pointer ${
                        newLead.priority === 'low'
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                          newLead.priority === 'low' ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                        <span className={`text-sm font-medium ${
                          newLead.priority === 'low' ? 'text-green-900' : 'text-gray-700'
                        }`}>Basse</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setNewLead(prev => ({ ...prev, priority: 'medium' }))}
                      className={`p-3 border-2 rounded-lg transition-all cursor-pointer ${
                        newLead.priority === 'medium'
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                          newLead.priority === 'medium' ? 'bg-yellow-500' : 'bg-gray-300'
                        }`}></div>
                        <span className={`text-sm font-medium ${
                          newLead.priority === 'medium' ? 'text-yellow-900' : 'text-gray-700'
                        }`}>Moyenne</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setNewLead(prev => ({ ...prev, priority: 'high' }))}
                      className={`p-3 border-2 rounded-lg transition-all cursor-pointer ${
                        newLead.priority === 'high'
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                          newLead.priority === 'high' ? 'bg-red-500' : 'bg-gray-300'
                        }`}></div>
                        <span className={`text-sm font-medium ${
                          newLead.priority === 'high' ? 'text-red-900' : 'text-gray-700'
                        }`}>Haute</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description du besoin</label>
                  <textarea
                    value={newLead.description}
                    onChange={(e) => setNewLead(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    rows={3}
                    placeholder="Décrivez brièvement le projet et les besoins du client..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Besoins spécifiques</label>
                  <textarea
                    value={newLead.needs}
                    onChange={(e) => setNewLead(prev => ({ ...prev, needs: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    rows={3}
                    placeholder="Ex: CRM avec intégration email, formation équipe, migration données..."
                  />
                </div>
              </div>
            </div>

            {/* Conseils */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <i className="ri-lightbulb-line mr-2 text-yellow-600"></i>
                Conseils pour un lead de qualité
              </h4>
              <ul className="space-y-1 text-xs text-gray-600">
                <li className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Renseignez un maximum d'informations pour faciliter la qualification</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Précisez la source pour analyser l'efficacité de vos canaux d'acquisition</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Définissez la priorité selon l'urgence et le potentiel du projet</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                  <span>Planifiez rapidement un premier contact après création du lead</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowNewLead(false)}
            >
              <i className="ri-close-line mr-2"></i>
              Annuler
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleCreateLead}
            >
              <i className="ri-add-line mr-2"></i>
              Créer le Lead
            </Button>
          </div>
        </div>
      </div>
    )
  );

  // Message de succès
  const renderSuccessMessage = () => (
    showSuccessMessage && (
      <div className="fixed top-6 right-6 z-50 animate-fade-in">
        <div className="bg-white rounded-lg shadow-xl border-l-4 border-green-500 p-4 max-w-md">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-check-line text-green-600 text-xl"></i>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">Activité créée avec succès !</h4>
              <p className="text-sm text-gray-600">
                Votre activité a été ajoutée à votre agenda. Vous recevrez un rappel 30 minutes avant.
              </p>
              <div className="mt-3 flex space-x-2">
                <button
                  onClick={() => setActiveTab('activities')}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                >
                  Voir l'agenda
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => setShowSuccessMessage(false)}
                  className="text-sm text-gray-600 hover:text-gray-700 cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    )
  );

  // Message de succès pour création de lead
  const renderLeadSuccessMessage = () => (
    showLeadSuccessMessage && (
      <div className="fixed top-6 right-6 z-50 animate-fade-in">
        <div className="bg-white rounded-lg shadow-xl border-l-4 border-green-500 p-4 max-w-md">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-user-add-line text-green-600 text-xl"></i>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">Lead créé avec succès !</h4>
              <p className="text-sm text-gray-600">
                Le nouveau prospect a été ajouté à votre liste. Pensez à programmer un premier contact.
              </p>
              <div className="mt-3 flex space-x-2">
                <button
                  onClick={() => {
                    setActiveTab('leads');
                    setShowLeadSuccessMessage(false);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                >
                  Voir les leads
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => {
                    setShowNewActivity(true);
                    setShowLeadSuccessMessage(false);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                >
                  Programmer un contact
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => setShowLeadSuccessMessage(false)}
                  className="text-sm text-gray-600 hover:text-gray-700 cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowLeadSuccessMessage(false)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    )
  );

  // Nouvelle section Publicité
  const renderPublicite = () => (
    <div className="space-y-6">
      {/* Bannière publicitaire pour solutions marketing */}
      <AdBanner 
        position="commercial-publicite-header"
        format="banner"
        section="commercial-publicite"
        userContext={{ userType: 'commercial', section: 'publicite' }}
        priority="high"
        targetCategories={['marketing-tools', 'advertising', 'lead-generation']}
        className="mb-6"
      />

      {/* Gestion des campagnes publicitaires */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Campagnes Actives"
          value="8"
          change="+2 ce mois"
          changeType="positive"
          icon="ri-advertisement-line"
          color="bg-purple-600"
        />
        <StatsCard
          title="Impressions"
          value="45.2K"
          change="+18% cette semaine"
          changeType="positive"
          icon="ri-eye-line"
          color="bg-blue-600"
        />
        <StatsCard
          title="Clics"
          value="1,247"
          change="+12% vs semaine dernière"
          changeType="positive"
          icon="ri-cursor-line"
          color="bg-green-600"
        />
        <StatsCard
          title="Taux de Conversion"
          value="3.2%"
          change="+0.5% amélioration"
          changeType="positive"
          icon="ri-line-chart-line"
          color="bg-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Créateur de campagnes */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Créateur de Campagnes Publicitaires</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la campagne</label>
                  <input
                    type="text"
                    placeholder="Ex: Campagne CRM Q1 2024"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                  <input
                    type="number"
                    placeholder="Ex: 5000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ciblage</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>Secteur d'activité</option>
                    <option>Technologie</option>
                    <option>Services</option>
                    <option>Industrie</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>Taille d'entreprise</option>
                    <option>1-10 employés</option>
                    <option>11-50 employés</option>
                    <option>50+ employés</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>Zone géographique</option>
                    <option>France</option>
                    <option>Europe</option>
                    <option>International</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message publicitaire</label>
                <textarea
                  rows={3}
                  placeholder="Rédigez votre message publicitaire..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="flex space-x-3">
                <Button variant="primary" className="flex-1">
                  <i className="ri-rocket-line mr-2"></i>
                  Lancer la campagne
                </Button>
                <Button variant="outline" className="flex-1">
                  <i className="ri-save-line mr-2"></i>
                  Sauvegarder brouillon
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Performances des campagnes */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performances en Temps Réel</h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-blue-900">Campagne CRM Pro</h4>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Active</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Impressions:</span>
                    <span className="font-medium">12,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Clics:</span>
                    <span className="font-medium">387</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">CTR:</span>
                    <span className="font-medium text-green-600">3.1%</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-purple-900">Formation Vente</h4>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Active</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-700">Impressions:</span>
                    <span className="font-medium">8,920</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Clics:</span>
                    <span className="font-medium">245</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">CTR:</span>
                    <span className="font-medium text-green-600">2.7%</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-orange-900">Analytics BI</h4>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">En pause</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-orange-700">Impressions:</span>
                    <span className="font-medium">5,670</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-700">Clics:</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-700">CTR:</span>
                    <span className="font-medium text-orange-600">2.8%</span>
                  </div>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4">
              <i className="ri-bar-chart-line mr-2"></i>
              Voir toutes les campagnes
            </Button>
          </Card>
        </div>
      </div>

      {/* Liste des campagnes */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Mes Campagnes Publicitaires</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <i className="ri-filter-line mr-2"></i>
              Filtrer
            </Button>
            <Button variant="primary" size="sm">
              <i className="ri-add-line mr-2"></i>
              Nouvelle campagne
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campagne
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impressions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CTR
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Campagne CRM Pro</div>
                    <div className="text-sm text-gray-500">Ciblage: PME Technologie</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5,000€</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">12,450</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">387</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">3.1%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">Modifier</button>
                    <button className="text-red-600 hover:text-red-900">Pause</button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Formation Vente</div>
                    <div className="text-sm text-gray-500">Ciblage: Commerciaux</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3,500€</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">8,920</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">245</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">2.7%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">Modifier</button>
                    <button className="text-red-600 hover:text-red-900">Pause</button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Analytics BI</div>
                    <div className="text-sm text-gray-500">Ciblage: Grandes entreprises</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">7,200€</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5,670</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">156</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">2.8%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    En pause
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">Modifier</button>
                    <button className="text-green-600 hover:text-green-900">Reprendre</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bannière publicitaire pour outils d'analyse */}
      <AdBanner 
        position="commercial-publicite-footer"
        format="compact"
        section="commercial-publicite"
        userContext={{ userType: 'commercial', section: 'publicite' }}
        priority="medium"
        targetCategories={['analytics', 'reporting', 'campaign-optimization']}
      />
    </div>
  );

  // Fonction pour afficher le profil commercial
  const renderProfile = () => (
    <div className="space-y-6">
      {/* Bannière publicitaire pour développement professionnel */}
      <AdBanner 
        position="commercial-profile-header"
        format="compact"
        section="commercial-profile"
        userContext={{ userType: 'commercial', section: 'profile' }}
        priority="medium"
        targetCategories={['professional-development', 'training', 'certification']}
        className="mb-4"
      />

      {/* En-tête du profil avec photo */}
      <Card>
        <div className="flex items-start space-x-6">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {isEditingProfile && (
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 cursor-pointer">
                <i className="ri-camera-line"></i>
              </button>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-600">{profile.position} - {profile.department}</p>
                <p className="text-sm text-gray-500 mt-1">
                  <i className="ri-calendar-line mr-1"></i>
                  Membre depuis {new Date(profile.startDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              <Button
                variant={isEditingProfile ? 'primary' : 'outline'}
                onClick={() => {
                  if (isEditingProfile) {
                    setProfile(editedProfile);
                  }
                  setIsEditingProfile(!isEditingProfile);
                }}
              >
                <i className={`${isEditingProfile ? 'ri-save-line' : 'ri-edit-line'} mr-2`}></i>
                {isEditingProfile ? 'Enregistrer' : 'Modifier le profil'}
              </Button>
            </div>

            {/* Statistiques de performance */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-600 font-medium">Ventes totales</p>
                <p className="text-2xl font-bold text-blue-900">{profile.performance.totalSales}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-sm text-green-600 font-medium">CA généré</p>
                <p className="text-2xl font-bold text-green-900">{(profile.performance.totalRevenue / 1000000).toFixed(1)}M€</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-sm text-purple-600 font-medium">Taux conversion</p>
                <p className="text-2xl font-bold text-purple-900">{profile.performance.conversionRate}%</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <p className="text-sm text-orange-600 font-medium">Satisfaction</p>
                <p className="text-2xl font-bold text-orange-900">{profile.performance.customerSatisfaction}/5</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations personnelles */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations Personnelles</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                <input
                  type="text"
                  value={isEditingProfile ? editedProfile.firstName : profile.firstName}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, firstName: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  value={isEditingProfile ? editedProfile.lastName : profile.lastName}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, lastName: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={isEditingProfile ? editedProfile.email : profile.email}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  value={isEditingProfile ? editedProfile.phone : profile.phone}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Poste</label>
                <input
                  type="text"
                  value={isEditingProfile ? editedProfile.position : profile.position}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, position: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Département</label>
                <input
                  type="text"
                  value={isEditingProfile ? editedProfile.department : profile.department}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, department: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-50"
                />
              </div>
            </div>
          </Card>

          {/* Compétences et langues */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compétences et Langues</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Domaines d'expertise</label>
                <div className="flex flex-wrap gap-2">
                  {profile.specializations.map((spec, index) => (
                    <div key={index} className="flex items-center space-x-1">
                      <Badge variant="info">{spec}</Badge>
                      {isEditingProfile && (
                        <button 
                          onClick={() => {
                            setProfile(prev => ({
                              ...prev,
                              specializations: prev.specializations.filter((_, i) => i !== index)
                            }));
                            setEditedProfile(prev => ({
                              ...prev,
                              specializations: prev.specializations.filter((_, i) => i !== index)
                            }));
                          }}
                          className="w-5 h-5 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-full cursor-pointer"
                        >
                          <i className="ri-close-line text-xs"></i>
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditingProfile && (
                    <button 
                      onClick={() => {
                        const newSpec = prompt('Ajouter une compétence:');
                        if (newSpec) {
                          setProfile(prev => ({
                            ...prev,
                            specializations: [...prev.specializations, newSpec]
                          }));
                          setEditedProfile(prev => ({
                            ...prev,
                            specializations: [...prev.specializations, newSpec]
                          }));
                        }
                      }}
                      className="px-3 py-1 border-2 border-dashed border-gray-300 rounded-full text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600 cursor-pointer"
                    >
                      <i className="ri-add-line mr-1"></i>
                      Ajouter
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Langues parlées</label>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((lang, index) => (
                    <div key={index} className="flex items-center space-x-1">
                      <Badge variant="success">{lang}</Badge>
                      {isEditingProfile && (
                        <button 
                          onClick={() => {
                            setProfile(prev => ({
                              ...prev,
                              languages: prev.languages.filter((_, i) => i !== index)
                            }));
                            setEditedProfile(prev => ({
                              ...prev,
                              languages: prev.languages.filter((_, i) => i !== index)
                            }));
                          }}
                          className="w-5 h-5 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-full cursor-pointer"
                        >
                          <i className="ri-close-line text-xs"></i>
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditingProfile && (
                    <button 
                      onClick={() => {
                        const newLang = prompt('Ajouter une langue:');
                        if (newLang) {
                          setProfile(prev => ({
                            ...prev,
                            languages: [...prev.languages, newLang]
                          }));
                          setEditedProfile(prev => ({
                            ...prev,
                            languages: [...prev.languages, newLang]
                          }));
                        }
                      }}
                      className="px-3 py-1 border-2 border-dashed border-gray-300 rounded-full text-sm text-gray-600 hover:border-blue-500 hover:text-blue-600 cursor-pointer"
                    >
                      <i className="ri-add-line mr-1"></i>
                      Ajouter
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Certifications */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications Professionnelles</h3>
            
            <div className="space-y-3">
              {profile.certifications.map((cert) => (
                <div key={cert.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{cert.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{cert.issuer}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>
                          <i className="ri-calendar-line mr-1"></i>
                          Obtenue le {new Date(cert.date).toLocaleDateString('fr-FR')}
                        </span>
                        {cert.expiryDate && (
                          <span>
                            <i className="ri-time-line mr-1"></i>
                            Expire le {new Date(cert.expiryDate).toLocaleDateString('fr-FR')}
                          </span>
                        )}
                      </div>
                      {cert.credentialId && (
                        <p className="text-xs text-gray-500 mt-1">ID: {cert.credentialId}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-medal-line text-2xl text-yellow-500"></i>
                      {isEditingProfile && (
                        <button 
                          onClick={() => {
                            setProfile(prev => ({
                              ...prev,
                              certifications: prev.certifications.filter(c => c.id !== cert.id)
                            }));
                            setEditedProfile(prev => ({
                              ...prev,
                              certifications: prev.certifications.filter(c => c.id !== cert.id)
                            }));
                          }}
                          className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-full cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isEditingProfile && (
                <button 
                  onClick={() => {
                    const name = prompt('Nom de la certification:');
                    if (!name) return;
                    const issuer = prompt('Organisme émetteur:');
                    if (!issuer) return;
                    const date = prompt('Date d\'obtention (YYYY-MM-DD):');
                    if (!date) return;
                    const credentialId = prompt('ID de certification (optionnel):');
                    
                    const newCert: Certification = {
                      id: Date.now().toString(),
                      name,
                      issuer,
                      date,
                      credentialId: credentialId || undefined
                    };
                    
                    setProfile(prev => ({
                      ...prev,
                      certifications: [...prev.certifications, newCert]
                    }));
                    setEditedProfile(prev => ({
                      ...prev,
                      certifications: [...prev.certifications, newCert]
                    }));
                  }}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 cursor-pointer"
                >
                  <i className="ri-add-line mr-2"></i>
                  Ajouter une certification
                </button>
              )}
            </div>
          </Card>
        </div>

        {/* Préférences et statistiques */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Préférences</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notifications</label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Email</span>
                    <input
                      type="checkbox"
                      checked={profile.preferences.notifications.email}
                      disabled={!isEditingProfile}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">SMS</span>
                    <input
                      type="checkbox"
                      checked={profile.preferences.notifications.sms}
                      disabled={!isEditingProfile}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Push</span>
                    <input
                      type="checkbox"
                      checked={profile.preferences.notifications.push}
                      disabled={!isEditingProfile}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
                <select
                  value={profile.preferences.language}
                  disabled={!isEditingProfile}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-50"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fuseau horaire</label>
                <select
                  value={profile.preferences.timezone}
                  disabled={!isEditingProfile}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-50"
                >
                  <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="America/New_York">America/New_York (GMT-5)</option>
                </select>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques Détaillées</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Leads générés</span>
                <span className="font-semibold text-gray-900">{profile.performance.leadsGenerated}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ventes conclues</span>
                <span className="font-semibold text-gray-900">{profile.performance.dealsWon}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Panier moyen</span>
                <span className="font-semibold text-gray-900">{profile.performance.averageOrderValue.toLocaleString()}€</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Commissions totales</span>
                <span className="font-semibold text-green-600">{profile.performance.totalCommission.toLocaleString()}€</span>
              </div>
            </div>
          </Card>

          {/* Bannière publicitaire pour formation */}
          <AdBanner 
            position="commercial-profile-sidebar"
            format="compact"
            section="commercial-profile"
            userContext={{ userType: 'commercial', section: 'profile' }}
            priority="medium"
            targetCategories={['training', 'certification', 'professional-development']}
          />
        </div>
      </div>

      {/* Bannière publicitaire en bas */}
      <AdBanner 
        position="commercial-profile-footer"
        format="compact"
        section="commercial-profile"
        userContext={{ userType: 'commercial', section: 'profile' }}
        priority="low"
        targetCategories={['career-development', 'coaching', 'mentoring']}
      />
    </div>
  );

  // Fonction pour afficher les objectifs
  const renderObjectives = () => (
    <div className="space-y-6">
      {/* Bannière publicitaire pour outils de suivi d'objectifs */}
      <AdBanner 
        position="commercial-objectives-header"
        format="compact"
        section="commercial-objectives"
        userContext={{ userType: 'commercial', section: 'objectives' }}
        priority="medium"
        targetCategories={['goal-tracking', 'performance-management', 'productivity-tools']}
        className="mb-4"
      />

      {/* En-tête avec bouton Nouvel Objectif */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Mes Objectifs Mensuels</h2>
          <p className="text-sm text-gray-600 mt-1">Suivez et atteignez vos objectifs commerciaux</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowNewObjective(true)}
        >
          <i className="ri-add-line mr-2"></i>
          Nouvel Objectif
        </Button>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{objectives.length}</p>
            <p className="text-sm text-gray-600">Objectifs actifs</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {objectives.filter(obj => getObjectiveProgress(obj) >= 100).length}
            </p>
            <p className="text-sm text-gray-600">Atteints</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {objectives.filter(obj => getObjectiveProgress(obj) < 100).length}
            </p>
            <p className="text-sm text-gray-600">En cours</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(objectives.reduce((sum, obj) => sum + getObjectiveProgress(obj), 0) / objectives.length)}%
            </p>
            <p className="text-sm text-gray-600">Progression moyenne</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {Math.ceil((new Date(objectives[0]?.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
            </p>
            <p className="text-sm text-gray-600">Jours restants</p>
          </div>
        </Card>
      </div>

      {/* Liste des objectifs */}
      <div className="space-y-4">
        {objectives.map((objective) => {
          const progress = getObjectiveProgress(objective);
          const status = getObjectiveStatus(objective);
          const daysLeft = Math.ceil((new Date(objective.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

          return (
            <Card key={objective.id}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{objective.title}</h3>
                    <Badge className={status.color}>{status.label}</Badge>
                    <Badge className={getPriorityColor(objective.priority)}>
                      {objective.priority === 'high' ? 'Priorité haute' : 
                       objective.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{objective.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Progression actuelle</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {objective.currentValue.toLocaleString()} {objective.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Objectif cible</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {objective.targetValue.toLocaleString()} {objective.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Temps restant</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {daysLeft > 0 ? `${daysLeft} jours` : 'Expiré'}
                      </p>
                    </div>
                  </div>

                  {/* Barre de progression */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progression</span>
                      <span className="text-sm font-bold text-blue-600">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          progress >= 100 ? 'bg-green-500' :
                          progress >= 80 ? 'bg-blue-500' :
                          progress >= 50 ? 'bg-yellow-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Jalons */}
                  {objective.milestones.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Jalons intermédiaires</p>
                      <div className="space-y-2">
                        {objective.milestones.map((milestone) => (
                          <div key={milestone.id} className="flex items-center space-x-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                            }`}>
                              {milestone.completed && <i className="ri-check-line text-white text-xs"></i>}
                            </div>
                            <span className={`text-sm ${milestone.completed ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                              {milestone.title} - {new Date(milestone.targetDate).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    const newValue = prompt(`Entrez la nouvelle valeur (actuelle: ${objective.currentValue})`);
                    if (newValue) {
                      handleUpdateObjectiveProgress(objective.id, parseFloat(newValue));
                    }
                  }}
                >
                  <i className="ri-refresh-line mr-2"></i>
                  Mettre à jour
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <i className="ri-edit-line mr-2"></i>
                  Modifier
                </Button>
                <Button variant="outline" size="sm">
                  <i className="ri-delete-bin-line mr-2"></i>
                  Supprimer
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Bannière publicitaire pour outils de gestion */}
      <AdBanner 
        position="commercial-objectives-footer"
        format="compact"
        section="commercial-objectives"
        userContext={{ userType: 'commercial', section: 'objectives' }}
        priority="medium"
        targetCategories={['goal-tracking', 'performance-management', 'analytics']}
      />
    </div>
  );

  // Fonction pour afficher les produits affiliés
  const renderAffiliatedProducts = () => (
    <div className="space-y-6">
      {/* Bannière publicitaire pour catalogues produits */}
      <AdBanner 
        position="commercial-products-header"
        format="compact"
        section="commercial-products"
        userContext={{ userType: 'commercial', section: 'affiliated-products' }}
        priority="medium"
        targetCategories={['product-catalogs', 'sales-materials', 'marketing-tools']}
        className="mb-4"
      />

      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Produits Affiliés</h2>
          <p className="text-sm text-gray-600 mt-1">Catalogue des produits que vous pouvez vendre</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <i className="ri-download-line mr-2"></i>
            Exporter le catalogue
          </Button>
          <Button variant="outline">
            <i className="ri-filter-line mr-2"></i>
            Filtrer
          </Button>
        </div>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{affiliatedProducts.length}</p>
            <p className="text-sm text-gray-600">Produits actifs</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {affiliatedProducts.reduce((sum, p) => sum + p.performance.totalSales, 0)}
            </p>
            <p className="text-sm text-gray-600">Ventes totales</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {(affiliatedProducts.reduce((sum, p) => sum + p.performance.totalRevenue, 0) / 1000000).toFixed(1)}M€
            </p>
            <p className="text-sm text-gray-600">CA généré</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {affiliatedProducts.reduce((sum, p) => sum + p.performance.totalCommission, 0).toLocaleString()}€
            </p>
            <p className="text-sm text-gray-600">Commissions</p>
          </div>
        </Card>
      </div>

      {/* Liste des produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {affiliatedProducts.map((product) => (
          <Card key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.company}</p>
                <Badge variant="info" className="mt-2">{product.category}</Badge>
              </div>
              <Badge className={product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                {product.status === 'active' ? 'Actif' : 'Inactif'}
              </Badge>
            </div>

            <p className="text-sm text-gray-700 mb-4 line-clamp-2">{product.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-600 font-medium">Prix de vente</p>
                <p className="text-lg font-bold text-blue-900">{product.price.toLocaleString()}€</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-green-600 font-medium">Commission</p>
                <p className="text-lg font-bold text-green-900">
                  {product.commissionType === 'percentage' ? `${product.commission}%` : `${product.commission}€`}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Ventes:</span>
                <span className="font-medium">{product.performance.totalSales}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">CA généré:</span>
                <span className="font-medium">{product.performance.totalRevenue.toLocaleString()}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taux conversion:</span>
                <span className="font-medium text-green-600">{product.performance.conversionRate}%</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={() => {
                  setSelectedProduct(product);
                  setShowProductDetails(true);
                }}
              >
                <i className="ri-eye-line mr-2"></i>
                Détails
              </Button>
              <Button variant="outline" size="sm">
                <i className="ri-download-line mr-2"></i>
                Supports
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal détails produit */}
      {showProductDetails && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h3>
              <button
                onClick={() => setShowProductDetails(false)}
                className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-700">{selectedProduct.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Fonctionnalités clés</h4>
                    <ul className="space-y-1">
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
                          <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Marchés cibles</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.targetMarket.map((market, index) => (
                        <Badge key={index} variant="info">{market}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Informations commerciales</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prix de vente:</span>
                      <span className="font-bold text-gray-900">{selectedProduct.price.toLocaleString()}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Commission:</span>
                      <span className="font-bold text-green-600">
                        {selectedProduct.commissionType === 'percentage' 
                          ? `${selectedProduct.commission}% (${(selectedProduct.price * selectedProduct.commission / 100).toLocaleString()}€)`
                          : `${selectedProduct.commission}€`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Entreprise:</span>
                      <span className="font-medium">{selectedProduct.company}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Catégorie:</span>
                      <span className="font-medium">{selectedProduct.category}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-3">Performances</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Ventes totales:</span>
                      <span className="font-bold text-blue-900">{selectedProduct.performance.totalSales}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">CA généré:</span>
                      <span className="font-bold text-blue-900">{selectedProduct.performance.totalRevenue.toLocaleString()}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Commissions gagnées:</span>
                      <span className="font-bold text-green-600">{selectedProduct.performance.totalCommission.toLocaleString()}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Taux de conversion:</span>
                      <span className="font-bold text-blue-900">{selectedProduct.performance.conversionRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Panier moyen:</span>
                      <span className="font-bold text-blue-900">{selectedProduct.performance.averageOrderValue.toLocaleString()}€</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Supports de vente</h4>
                  <div className="space-y-2">
                    {selectedProduct.salesMaterials.map((material) => (
                      <div key={material.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <i className={`${
                            material.type === 'brochure' ? 'ri-file-text-line' :
                            material.type === 'video' ? 'ri-video-line' :
                            material.type === 'demo' ? 'ri-play-circle-line' :
                            'ri-presentation-line'
                          } text-xl text-gray-600`}></i>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{material.title}</p>
                            {material.size && <p className="text-xs text-gray-500">{material.size}</p>}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <i className="ri-download-line"></i>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
              <Button variant="outline" className="flex-1" onClick={() => setShowProductDetails(false)}>
                Fermer
              </Button>
              <Button variant="primary" className="flex-1">
                <i className="ri-shopping-cart-line mr-2"></i>
                Créer une opportunité
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bannière publicitaire pour matériel de vente */}
      <AdBanner 
        position="commercial-products-footer"
        format="compact"
        section="commercial-products"
        userContext={{ userType: 'commercial', section: 'affiliated-products' }}
        priority="medium"
        targetCategories={['sales-materials', 'marketing-tools', 'product-catalogs']}
      />
    </div>
  );

  // Fonction pour afficher les appels d'offres
  const renderCallsForTenders = () => (
    <div className="space-y-6">
      {/* Bannière publicitaire pour gestion d'appels d'offres */}
      <AdBanner 
        position="commercial-tenders-header"
        format="compact"
        section="commercial-tenders"
        userContext={{ userType: 'commercial', section: 'call-for-tenders' }}
        priority="medium"
        targetCategories={['tender-management', 'proposal-tools', 'business-development']}
        className="mb-4"
      />

      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Appels d'Offres</h2>
          <p className="text-sm text-gray-600 mt-1">Consultez et candidatez aux appels d'offres disponibles</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <i className="ri-filter-line mr-2"></i>
            Filtrer
          </Button>
          <Button variant="outline">
            <i className="ri-notification-3-line mr-2"></i>
            Alertes
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{callsForTenders.length}</p>
            <p className="text-sm text-gray-600">Total offres</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {callsForTenders.filter(t => t.status === 'open').length}
            </p>
            <p className="text-sm text-gray-600">Ouvertes</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {callsForTenders.filter(t => t.myApplication).length}
            </p>
            <p className="text-sm text-gray-600">Mes candidatures</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {callsForTenders.filter(t => t.myApplication?.status === 'under_review').length}
            </p>
            <p className="text-sm text-gray-600">En évaluation</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {callsForTenders.filter(t => {
                const daysLeft = Math.ceil((new Date(t.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return daysLeft < 7 && t.status === 'open';
              }).length}
            </p>
            <p className="text-sm text-gray-600">Urgentes</p>
          </div>
        </Card>
      </div>

      {/* Liste des appels d'offres */}
      <div className="space-y-4">
        {callsForTenders.map((tender) => {
          const daysLeft = Math.ceil((new Date(tender.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          const isUrgent = daysLeft < 7 && tender.status === 'open';

          return (
            <Card key={tender.id} className={isUrgent ? 'border-2 border-red-500' : ''}>
              {isUrgent && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4">
                  <div className="flex items-center">
                    <i className="ri-alarm-warning-line text-red-600 text-xl mr-2"></i>
                    <p className="text-sm font-medium text-red-800">
                      Urgent ! Plus que {daysLeft} jour{daysLeft > 1 ? 's' : ''} pour candidater
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{tender.title}</h3>
                    <Badge className={
                      tender.status === 'open' ? 'bg-green-100 text-green-800' :
                      tender.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      tender.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                      tender.status === 'won' ? 'bg-purple-100 text-purple-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {tender.status === 'open' ? 'Ouvert' :
                       tender.status === 'in_progress' ? 'En cours' :
                       tender.status === 'closed' ? 'Fermé' :
                       tender.status === 'won' ? 'Gagné' : 'Perdu'}
                    </Badge>
                    {tender.myApplication && (
                      <Badge variant="info">Candidature envoyée</Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Entreprise</p>
                      <p className="font-medium text-gray-900">{tender.company}</p>
                      <p className="text-xs text-gray-500">{tender.sector}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Budget</p>
                      <p className="font-medium text-gray-900">{tender.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Échéance</p>
                      <p className="font-medium text-gray-900">{new Date(tender.deadline).toLocaleDateString('fr-FR')}</p>
                      <p className="text-xs text-gray-500">{daysLeft} jours restants</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Localisation</p>
                      <p className="font-medium text-gray-900">{tender.location}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{tender.description}</p>
                  
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-900 mb-2">Exigences:</p>
                    <ul className="space-y-1">
                      {tender.requirements.map((req, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-700">
                          <i className="ri-checkbox-circle-line text-blue-600 mr-2 mt-0.5"></i>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-900 mb-2">Contact:</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-700">
                      <span>
                        <i className="ri-user-line mr-1"></i>
                        {tender.contactPerson}
                      </span>
                      <span>
                        <i className="ri-mail-line mr-1"></i>
                        {tender.contactEmail}
                      </span>
                      <span>
                        <i className="ri-phone-line mr-1"></i>
                        {tender.contactPhone}
                      </span>
                    </div>
                  </div>

                  {tender.documents.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-900 mb-2">Documents:</p>
                      <div className="flex flex-wrap gap-2">
                        {tender.documents.map((doc) => (
                          <button key={doc.id} className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <i className="ri-file-text-line text-gray-600"></i>
                            <span className="text-sm text-gray-700">{doc.name}</span>
                            <span className="text-xs text-gray-500">({doc.size})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {tender.myApplication && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <h4 className="font-medium text-blue-900 mb-2">Ma candidature</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className="text-blue-700">Date d'envoi:</p>
                          <p className="font-medium text-blue-900">{new Date(tender.myApplication.submittedDate).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <div>
                          <p className="text-blue-700">Prix proposé:</p>
                          <p className="font-medium text-blue-900">{tender.myApplication.estimatedPrice.toLocaleString()}€</p>
                        </div>
                        <div>
                          <p className="text-blue-700">Statut:</p>
                          <Badge className={
                            tender.myApplication.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                            tender.myApplication.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                            tender.myApplication.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {tender.myApplication.status === 'submitted' ? 'Envoyée' :
                             tender.myApplication.status === 'under_review' ? 'En évaluation' :
                             tender.myApplication.status === 'accepted' ? 'Acceptée' : 'Refusée'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setSelectedTender(tender);
                    setShowTenderDetails(true);
                  }}
                >
                  <i className="ri-eye-line mr-2"></i>
                  Voir les détails
                </Button>
                {!tender.myApplication && tender.status === 'open' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setSelectedTender(tender);
                      setShowTenderApplication(true);
                    }}
                  >
                    <i className="ri-send-plane-line mr-2"></i>
                    Candidater
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <i className="ri-download-line mr-2"></i>
                  Documents
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Bannière publicitaire pour outils de proposition */}
      <AdBanner 
        position="commercial-tenders-footer"
        format="compact"
        section="commercial-tenders"
        userContext={{ userType: 'commercial', section: 'call-for-tenders' }}
        priority="medium"
        targetCategories={['proposal-tools', 'tender-management', 'business-development']}
      />
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: 'ri-dashboard-line', count: null },
    { id: 'profile', label: 'Mon Profil', icon: 'ri-user-line', count: null },
    { id: 'objectives', label: 'Objectifs', icon: 'ri-target-line', count: objectives.length },
    { id: 'affiliated-products', label: 'Produits Affiliés', icon: 'ri-shopping-bag-line', count: affiliatedProducts.length },
    { id: 'call-for-tenders', label: 'Appels d\'Offres', icon: 'ri-file-list-3-line', count: callsForTenders.filter(t => t.status === 'open').length },
    { id: 'leads', label: 'Leads Qualifiés', icon: 'ri-user-star-line', count: getFilteredLeads().length },
    { id: 'pipeline', label: 'Pipeline de Ventes', icon: 'ri-flow-chart', count: pipelineData.length },
    { id: 'commissions', label: 'Commissions', icon: 'ri-money-euro-circle-line', count: null },
    { id: 'activities', label: 'Activités', icon: 'ri-calendar-event-line', count: getUpcomingActivities().length },
    { id: 'publicite', label: 'Publicité', icon: 'ri-advertisement-line', count: 8 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Interface Commerciale</h1>
              <p className="text-gray-600 mt-1">Bienvenue, Marc Dubois - Gérez toutes vos activités commerciales</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="info">Commercial Actif</Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowNewLead(true)}
              >
                <i className="ri-user-add-line mr-2"></i>
                Nouveau Lead
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => {
                  setShowNewActivity(true);
                  trackAction('click-new-activity-header');
                }}
              >
                <i className="ri-add-line mr-2"></i>
                Nouvelle Activité
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 overflow-x-auto">
          <nav className="flex space-x-8 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
                {tab.count && (
                  <Badge variant="secondary" className="ml-2">
                    {tab.count}
                  </Badge>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Bannières publicitaires contextuelles pour chaque onglet */}
        <div className="mb-6">
          {activeTab === 'dashboard' && (
            <AdBanner
              position="commercial-dashboard-header"
              format="banner"
              section="commercial-dashboard"
              userContext={{ userType: 'commercial', section: 'dashboard' }}
              priority="high"
              targetCategories={['crm-tools', 'sales-training']}
              className="mb-4"
            />
          )}
          {activeTab === 'leads' && (
            <AdBanner
              position="commercial-leads-header"
              format="banner"
              section="commercial-leads"
              userContext={{ userType: 'commercial', section: 'leads' }}
              priority="high"
              targetCategories={['lead-generation', 'prospecting-tools']}
              className="mb-4"
            />
          )}
          {activeTab === 'pipeline' && (
            <AdBanner
              position="commercial-pipeline-header"
              format="banner"
              section="commercial-pipeline"
              userContext={{ userType: 'commercial', section: 'pipeline' }}
              priority="medium"
              targetCategories={['pipeline-management', 'sales-automation']}
              className="mb-4"
            />
          )}
          {activeTab === 'commissions' && (
            <AdBanner
              position="commercial-commissions-header"
              format="banner"
              section="commercial-commissions"
              userContext={{ userType: 'commercial', section: 'commissions' }}
              priority="medium"
              targetCategories={['payment-solutions', 'commission-tools']}
              className="mb-4"
            />
          )}
          {activeTab === 'activities' && (
            <AdBanner
              position="commercial-activities-header"
              format="banner"
              section="commercial-activities"
              userContext={{ userType: 'commercial', section: 'activities' }}
              priority="medium"
              targetCategories={['productivity-tools', 'calendar-management']}
              className="mb-4"
            />
          )}
          {activeTab === 'publicite' && (
            <AdBanner
              position="commercial-publicite-header"
              format="banner"
              section="commercial-publicite"
              userContext={{ userType: 'commercial', section: 'publicite' }}
              priority="high"
              targetCategories={['marketing-tools', 'advertising', 'lead-generation']}
              className="mb-4"
            />
          )}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Contenu principal */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'objectives' && renderObjectives()}
            {activeTab === 'affiliated-products' && renderAffiliatedProducts()}
            {activeTab === 'call-for-tenders' && renderCallsForTenders()}
            {activeTab === 'leads' && renderLeads()}
            {activeTab === 'pipeline' && renderPipeline()}
            {activeTab === 'commissions' && renderCommissions()}
            {activeTab === 'activities' && renderActivities()}
            {activeTab === 'publicite' && renderPublicite()}
          </div>

          {/* Sidebar avec bannières publicitaires */}
          <div className="lg:col-span-1 space-y-6">
            <AdBanner
              position="commercial-sidebar"
              format="banner"
              section={`commercial-${activeTab}`}
              userContext={{ userType: 'commercial', section: activeTab }}
              priority="medium"
              targetCategories={['sales-tools', 'crm-solutions', 'productivity']}
            />
            
            <AdBanner
              position="commercial-sidebar-secondary"
              format="animated"
              section={`commercial-${activeTab}`}
              userContext={{ userType: 'commercial', section: activeTab }}
              priority="low"
              targetCategories={['sales-training', 'consulting', 'automation']}
            />
          </div>
        </div>

        {/* Bannière publicitaire en bas de page */}
        <div className="mt-8">
          <AdBanner
            position="commercial-footer"
            format="banner"
            section={`commercial-${activeTab}`}
            userContext={{ userType: 'commercial', section: activeTab }}
            priority="medium"
            targetCategories={['sales-integration', 'support', 'enterprise-solutions']}
          />
        </div>
      </div>

      {/* Actions rapides flottantes */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
        <Button
          variant="primary"
          className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          title="Nouvelle activité"
          onClick={() => {
            setShowNewActivity(true);
            trackAction('click-new-activity-floating');
          }}
        >
          <i className="ri-add-line text-xl"></i>
        </Button>
        <Button
          variant="outline"
          className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg bg-white"
          title="Appel rapide"
        >
          <i className="ri-phone-line"></i>
        </Button>
        <Button
          variant="outline"
          className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg bg-white"
          title="Email rapide"
        >
          <i className="ri-mail-line"></i>
        </Button>
        <Button
          variant="outline"
          className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg bg-white"
          title="Synchroniser calendrier"
        >
          <i className="ri-refresh-line"></i>
        </Button>
      </div>

      {/* Modal nouveau lead */}
      {renderNewLeadModal()}

      {/* Modal nouvelle activité */}
      {renderNewActivityModal()}

      {/* Messages de succès */}
      {renderSuccessMessage()}
      {renderLeadSuccessMessage()}

      {/* Modal nouvel objectif */}
      {showNewObjective && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Créer un Nouvel Objectif</h3>
                <p className="text-sm text-gray-600 mt-1">Définissez un objectif mensuel à atteindre</p>
              </div>
              <button
                onClick={() => setShowNewObjective(false)}
                className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de l'objectif <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newObjective.title}
                  onChange={(e) => setNewObjective(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Ex: Atteindre 150,000€ de CA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newObjective.description}
                  onChange={(e) => setNewObjective(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows={3}
                  placeholder="Décrivez votre objectif..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                  <select
                    value={newObjective.category}
                    onChange={(e) => setNewObjective(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                  >
                    <option value="revenue">Chiffre d'affaires</option>
                    <option value="leads">Génération de leads</option>
                    <option value="meetings">Rendez-vous</option>
                    <option value="ventes">Ventes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                  <select
                    value={newObjective.priority}
                    onChange={(e) => setNewObjective(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                  >
                    <option value="low">🟢 Basse</option>
                    <option value="medium">🟡 Moyenne</option>
                    <option value="high">🔴 Haute</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valeur cible <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={newObjective.targetValue}
                    onChange={(e) => setNewObjective(prev => ({ ...prev, targetValue: parseFloat(e.target.value) }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Ex: 150000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unité</label>
                  <select
                    value={newObjective.unit}
                    onChange={(e) => setNewObjective(prev => ({ ...prev, unit: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                  >
                    <option value="€">€ (Euros)</option>
                    <option value="leads">Leads</option>
                    <option value="RDV">Rendez-vous</option>
                    <option value="%">% (Pourcentage)</option>
                    <option value="ventes">Ventes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d'échéance <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={newObjective.endDate}
                  onChange={(e) => setNewObjective(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowNewObjective(false)}
              >
                <i className="ri-close-line mr-2"></i>
                Annuler
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleCreateObjective}
              >
                <i className="ri-add-line mr-2"></i>
                Créer l'objectif
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal candidature appel d'offres */}
      {showTenderApplication && selectedTender && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Candidater à l'Appel d'Offres</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedTender.title}</p>
              </div>
              <button
                onClick={() => setShowTenderApplication(false)}
                className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proposition commerciale <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={tenderApplication.proposal}
                  onChange={(e) => setTenderApplication(prev => ({ ...prev, proposal: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows={6}
                  placeholder="Décrivez votre proposition détaillée..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix proposé (€) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={tenderApplication.estimatedPrice}
                    onChange={(e) => setTenderApplication(prev => ({ ...prev, estimatedPrice: parseFloat(e.target.value) }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Ex: 380000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Délai de livraison</label>
                  <input
                    type="text"
                    value={tenderApplication.deliveryTime}
                    onChange={(e) => setTenderApplication(prev => ({ ...prev, deliveryTime: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Ex: 6 mois"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Documents à joindre</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <i className="ri-upload-cloud-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-sm text-gray-600">Glissez-déposez vos fichiers ici ou cliquez pour parcourir</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX jusqu'à 10MB</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowTenderApplication(false)}
              >
                <i className="ri-close-line mr-2"></i>
                Annuler
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleSubmitTenderApplication}
              >
                <i className="ri-send-plane-line mr-2"></i>
                Envoyer la candidature
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
