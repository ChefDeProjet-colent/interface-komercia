import { useState } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';

export default function ConsultantsDashboard() {
  const { getAds, recordImpression, recordClick } = useAdManager();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState('');

  // Données des projets
  const [projects] = useState([
    {
      id: 1,
      title: 'Optimisation Pipeline Commercial',
      company: 'TechCorp Solutions',
      status: 'En cours',
      progress: 75,
      deadline: '2024-02-15',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Stratégie Expansion Marché',
      company: 'InnovateSAS',
      status: 'En cours',
      progress: 45,
      deadline: '2024-02-28',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Analyse Performance Q4',
      company: 'StartupXYZ',
      status: 'À livrer',
      progress: 90,
      deadline: '2024-01-30',
      priority: 'high'
    },
    {
      id: 4,
      title: 'Audit Processus Vente',
      company: 'GlobalTrade Ltd',
      status: 'Planifié',
      progress: 10,
      deadline: '2024-03-15',
      priority: 'medium'
    }
  ]);

  // Données des entreprises
  const [companies] = useState([
    { id: 1, name: 'TechCorp Solutions', sector: 'Technology', employees: 250 },
    { id: 2, name: 'InnovateSAS', sector: 'Innovation', employees: 120 },
    { id: 3, name: 'StartupXYZ', sector: 'Startup', employees: 45 },
    { id: 4, name: 'GlobalTrade Ltd', sector: 'Commerce', employees: 380 }
  ]);

  // Données des commerciaux
  const [salespeople] = useState([
    { id: 1, name: 'Marie Dubois', company: 'TechCorp Solutions', performance: 85 },
    { id: 2, name: 'Pierre Martin', company: 'InnovateSAS', performance: 92 },
    { id: 3, name: 'Sophie Chen', company: 'StartupXYZ', performance: 78 },
    { id: 4, name: 'Thomas Leroy', company: 'GlobalTrade Ltd', performance: 88 }
  ]);

  // Données des opportunités
  const [opportunities] = useState([
    { id: 1, title: 'Expansion Europe', value: 250000, probability: 75 },
    { id: 2, title: 'Nouveau Produit', value: 180000, probability: 60 },
    { id: 3, title: 'Partenariat Stratégique', value: 320000, probability: 85 },
    { id: 4, title: 'Marché Asiatique', value: 450000, probability: 40 }
  ]);

  const [notifications] = useState([
    {
      id: 1,
      type: 'opportunity',
      title: 'Nouvelle opportunité détectée',
      message: 'TechCorp montre une baisse de 15% des conversions ce mois',
      time: 'Il y a 2h',
      priority: 'high'
    },
    {
      id: 2,
      type: 'meeting',
      title: 'Réunion stratégique prévue',
      message: 'Point mensuel avec InnovateSAS demain à 14h',
      time: 'Il y a 4h',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'report',
      title: 'Rapport à livrer',
      message: 'Analyse Q4 pour StartupXYZ due dans 3 jours',
      time: 'Il y a 6h',
      priority: 'high'
    },
    {
      id: 4,
      type: 'data',
      title: 'Nouvelles données disponibles',
      message: 'Performances commerciales mises à jour pour 5 entreprises',
      time: 'Il y a 1 jour',
      priority: 'low'
    }
  ]);

  const stats = [
    {
      title: 'Entreprises Suivies',
      value: '24',
      change: '+3',
      changeType: 'positive',
      icon: 'ri-building-line',
      color: 'blue'
    },
    {
      title: 'Commerciaux Analysés',
      value: '156',
      change: '+12',
      changeType: 'positive',
      icon: 'ri-user-star-line',
      color: 'green'
    },
    {
      title: 'Opportunités Identifiées',
      value: '18',
      change: '+5',
      changeType: 'positive',
      icon: 'ri-lightbulb-line',
      color: 'yellow'
    },
    {
      title: 'Taux Conversion Moyen',
      value: '23.5%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'ri-arrow-up-circle-line',
      color: 'purple'
    }
  ];

  const recentProjects = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      project: 'Optimisation Pipeline Commercial',
      status: 'En cours',
      progress: 75,
      deadline: '2024-02-15',
      priority: 'Élevée'
    },
    {
      id: 2,
      company: 'InnovateSAS',
      project: 'Stratégie Expansion Marché',
      status: 'En cours',
      progress: 45,
      deadline: '2024-02-28',
      priority: 'Moyenne'
    },
    {
      id: 3,
      company: 'StartupXYZ',
      project: 'Analyse Performance Q4',
      status: 'À livrer',
      progress: 90,
      deadline: '2024-01-30',
      priority: 'Urgente'
    },
    {
      id: 4,
      company: 'GlobalTrade Ltd',
      project: 'Audit Processus Vente',
      status: 'Planifié',
      progress: 10,
      deadline: '2024-03-15',
      priority: 'Moyenne'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'À livrer': return 'bg-orange-100 text-orange-800';
      case 'Planifié': return 'bg-gray-100 text-gray-800';
      case 'Terminé': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgente': return 'text-red-600';
      case 'Élevée': return 'text-orange-600';
      case 'Moyenne': return 'text-yellow-600';
      case 'Faible': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return 'ri-lightbulb-line text-yellow-500';
      case 'meeting': return 'ri-calendar-line text-blue-500';
      case 'report': return 'ri-file-text-line text-purple-500';
      case 'data': return 'ri-database-line text-green-500';
      default: return 'ri-notification-line text-gray-500';
    }
  };

  // Bannières publicitaires pour consultants
  const headerAds = getAds('consultants-header', 1, { 
    targetAudience: ['consultant', 'strategist', 'analyst'],
    preferredCategories: ['analytics', 'training', 'productivity'],
    userType: 'enterprise'
  });
  
  const sidebarAds = getAds('consultants-sidebar', 1, { 
    targetAudience: ['consultant', 'strategist'],
    preferredCategories: ['training', 'collaboration', 'analytics'],
    userType: 'enterprise'
  });
  
  const footerAds = getAds('consultants-footer', 1, { 
    targetAudience: ['consultant', 'strategist'],
    preferredCategories: ['training', 'productivity', 'analytics'],
    userType: 'enterprise'
  });

  const handleAdClick = (ad: any, section: string) => {
    recordClick(ad.id, section, 'button', {
      userType: 'consultant',
      section: 'consultants-dashboard'
    });
    window.open(ad.link, '_blank');
  };

  const handleAdImpression = (ad: any, section: string) => {
    recordImpression(ad.id, section, {
      userType: 'consultant',
      section: 'consultants-dashboard'
    });
  };

  // Gestion des actions avec états de chargement
  const handleNewProject = async () => {
    setLoadingAction('new-project');
    setIsLoading(true);
    try {
      // Simulation d'une action asynchrone
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowNewProjectModal(true);
    } finally {
      setIsLoading(false);
      setLoadingAction('');
    }
  };

  const handleExportData = async () => {
    setLoadingAction('export');
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Simulation d'export
      const data = {
        entreprises: companies.length,
        commerciaux: salespeople.length,
        opportunites: opportunities.length,
        date: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `donnees-consultants-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsLoading(false);
      setLoadingAction('');
    }
  };

  const handleGenerateReport = async () => {
    setLoadingAction('report');
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      // Redirection vers la section rapports
      window.location.hash = '#reports';
    } finally {
      setIsLoading(false);
      setLoadingAction('');
    }
  };

  const handleViewDetails = async (item, type) => {
    setLoadingAction(`details-${type}`);
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (type === 'project') {
        setSelectedProject(item);
      }
      // Autres actions selon le type
    } finally {
      setIsLoading(false);
      setLoadingAction('');
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    setLoadingAction(`notification-${notificationId}`);
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      // Marquer comme lu
    } finally {
      setIsLoading(false);
      setLoadingAction('');
    }
  };

  const handleQuickAction = async (action) => {
    setLoadingAction(action);
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      switch (action) {
        case 'schedule-meeting':
          // Ouvrir calendrier
          break;
        case 'send-report':
          // Ouvrir modal envoi
          break;
        case 'update-data':
          // Actualiser données
          break;
        default:
          break;
      }
    } finally {
      setIsLoading(false);
      setLoadingAction('');
    }
  };

  // Composant bouton avec état de chargement
  const LoadingButton = ({ onClick, loading, loadingText, children, className, variant = 'primary', disabled = false, icon = '' }) => {
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap flex items-center justify-center";
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 shadow-lg hover:shadow-xl",
      success: "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl",
      warning: "bg-yellow-600 text-white hover:bg-yellow-700 shadow-lg hover:shadow-xl",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl",
      outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
      ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    };

    return (
      <button
        onClick={onClick}
        disabled={loading || disabled}
        className={`${baseClasses} ${variants[variant]} ${loading || disabled ? 'opacity-50 cursor-not-allowed transform-none' : ''} ${className}`}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {loadingText}
          </>
        ) : (
          <>
            {icon && <i className={`${icon} mr-2`}></i>}
            {children}
          </>
        )}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec actions principales */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Tableau de Bord Consultants</h2>
            <p className="text-gray-600">Vue d'ensemble de vos activités de conseil stratégique</p>
          </div>
          <div className="flex items-center space-x-3">
            <LoadingButton
              onClick={handleExportData}
              loading={isLoading && loadingAction === 'export'}
              loadingText="Export..."
              variant="outline"
              icon="ri-download-line"
            >
              Exporter Données
            </LoadingButton>
            <LoadingButton
              onClick={handleGenerateReport}
              loading={isLoading && loadingAction === 'report'}
              loadingText="Génération..."
              variant="secondary"
              icon="ri-file-chart-line"
            >
              Générer Rapport
            </LoadingButton>
            <LoadingButton
              onClick={handleNewProject}
              loading={isLoading && loadingAction === 'new-project'}
              loadingText="Création..."
              variant="primary"
              icon="ri-add-line"
            >
              Nouveau Projet
            </LoadingButton>
          </div>
        </div>

        {/* Filtres avec boutons interactifs */}
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-sm font-medium text-gray-700">Filtrer par :</span>
          {[
            { id: 'all', label: 'Tout', icon: 'ri-apps-line' },
            { id: 'active', label: 'Projets Actifs', icon: 'ri-play-line' },
            { id: 'pending', label: 'En Attente', icon: 'ri-time-line' },
            { id: 'completed', label: 'Terminés', icon: 'ri-check-line' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap flex items-center ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i className={`${filter.icon} mr-2`}></i>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Statistiques avec actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Entreprises Suivies', value: '24', change: '+3', icon: 'ri-building-line', color: 'blue', action: 'view-companies' },
          { title: 'Commerciaux Analysés', value: '156', change: '+12', icon: 'ri-user-line', color: 'green', action: 'view-salespeople' },
          { title: 'Opportunités Identifiées', value: '18', change: '+5', icon: 'ri-lightbulb-line', color: 'yellow', action: 'view-opportunities' },
          { title: 'Taux Conversion Moyen', value: '23.5%', change: '+2.1%', icon: 'ri-line-chart-line', color: 'purple', action: 'view-analytics' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <i className={`${stat.icon} text-${stat.color}-600 text-xl`}></i>
              </div>
              <span className="text-green-600 text-sm font-medium bg-green-100 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm mb-3">{stat.title}</p>
            <LoadingButton
              onClick={() => handleQuickAction(stat.action)}
              loading={isLoading && loadingAction === stat.action}
              loadingText="Chargement..."
              variant="ghost"
              className="w-full text-sm"
              icon="ri-arrow-right-line"
            >
              Voir Détails
            </LoadingButton>
          </div>
        ))}
      </div>

      {/* Notifications avec actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Notifications Importantes</h3>
          <LoadingButton
            onClick={() => setShowNotificationModal(true)}
            variant="ghost"
            icon="ri-settings-line"
            className="text-sm"
          >
            Gérer
          </LoadingButton>
        </div>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  notification.priority === 'high' ? 'bg-red-100' :
                  notification.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <i className={`${getNotificationIcon(notification.type)} ${
                    notification.priority === 'high' ? 'text-red-600' :
                    notification.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                  }`}></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                  <p className="text-xs text-gray-600">{notification.message}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{notification.time}</span>
                <LoadingButton
                  onClick={() => handleMarkAsRead(notification.id)}
                  loading={isLoading && loadingAction === `notification-${notification.id}`}
                  loadingText=""
                  variant="ghost"
                  className="text-xs px-2 py-1"
                  icon="ri-check-line"
                >
                  Marquer lu
                </LoadingButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projets en cours avec actions détaillées */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Projets en Cours</h3>
          <div className="flex items-center space-x-2">
            <LoadingButton
              onClick={() => handleQuickAction('update-data')}
              loading={isLoading && loadingAction === 'update-data'}
              loadingText="Actualisation..."
              variant="ghost"
              icon="ri-refresh-line"
              className="text-sm"
            >
              Actualiser
            </LoadingButton>
            <LoadingButton
              onClick={() => handleQuickAction('schedule-meeting')}
              loading={isLoading && loadingAction === 'schedule-meeting'}
              loadingText="Planification..."
              variant="outline"
              icon="ri-calendar-event-line"
              className="text-sm"
            >
              Planifier Réunion
            </LoadingButton>
          </div>
        </div>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{project.title}</h4>
                  <p className="text-sm text-gray-600">{project.company}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.priority === 'high' ? 'bg-red-100 text-red-800' :
                    project.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {project.priority === 'high' ? 'Priorité Élevée' :
                     project.priority === 'medium' ? 'Priorité Moyenne' : 'Priorité Faible'}
                  </span>
                  <span className="text-sm font-medium text-blue-600">{project.progress}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Échéance: {project.deadline}</span>
                <div className="flex items-center space-x-2">
                  <LoadingButton
                    onClick={() => handleViewDetails(project, 'project')}
                    loading={isLoading && loadingAction === 'details-project'}
                    loadingText="Chargement..."
                    variant="ghost"
                    className="text-xs px-3 py-1"
                    icon="ri-eye-line"
                  >
                    Voir Détails
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => handleQuickAction('send-report')}
                    loading={isLoading && loadingAction === 'send-report'}
                    loadingText="Envoi..."
                    variant="outline"
                    className="text-xs px-3 py-1"
                    icon="ri-send-plane-line"
                  >
                    Envoyer Rapport
                  </LoadingButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { action: 'create-analysis', label: 'Nouvelle Analyse', icon: 'ri-bar-chart-box-line', color: 'blue' },
            { action: 'schedule-meeting', label: 'Planifier Réunion', icon: 'ri-calendar-event-line', color: 'green' },
            { action: 'send-report', label: 'Envoyer Rapport', icon: 'ri-mail-send-line', color: 'purple' },
            { action: 'update-data', label: 'Actualiser Données', icon: 'ri-refresh-line', color: 'orange' }
          ].map((item) => (
            <LoadingButton
              key={item.action}
              onClick={() => handleQuickAction(item.action)}
              loading={isLoading && loadingAction === item.action}
              loadingText="Traitement..."
              variant="outline"
              className={`p-4 h-20 flex-col border-2 border-${item.color}-200 text-${item.color}-600 hover:bg-${item.color}-50`}
              icon={item.icon}
            >
              <span className="text-sm font-medium mt-1">{item.label}</span>
            </LoadingButton>
          ))}
        </div>
      </div>

      {/* Bannières publicitaires avec boutons interactifs */}
      {headerAds.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-lightbulb-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{headerAds[0].title}</h3>
                <p className="text-gray-600">{headerAds[0].description}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-blue-600 font-medium">Analytics avancées</span>
                  <span className="text-sm text-gray-500 ml-2">• IA intégrée</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <LoadingButton
                onClick={() => {
                  recordClick(headerAds[0].id, 'consultants-dashboard-header', 'button', {
                    userType: 'consultant',
                    section: 'dashboard'
                  });
                  window.open(headerAds[0].link, '_blank');
                }}
                variant="primary"
                icon="ri-external-link-line"
                className="px-6 py-3"
              >
                Découvrir la solution
              </LoadingButton>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nouveau Projet</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom du projet</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>Sélectionner une entreprise</option>
                  <option>TechCorp Solutions</option>
                  <option>InnovateSAS</option>
                  <option>GlobalTrade Ltd</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de projet</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>Optimisation Pipeline</option>
                  <option>Analyse Marché</option>
                  <option>Audit Processus</option>
                  <option>Formation Équipe</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <LoadingButton
                onClick={() => setShowNewProjectModal(false)}
                variant="ghost"
              >
                Annuler
              </LoadingButton>
              <LoadingButton
                onClick={() => {
                  setShowNewProjectModal(false);
                  // Logique de création
                }}
                variant="primary"
                icon="ri-add-line"
              >
                Créer Projet
              </LoadingButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { ConsultantsDashboard };
