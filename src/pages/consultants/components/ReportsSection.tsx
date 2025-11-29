import { useState } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';

export default function ReportsSection() {
  const { getAds, recordImpression, recordClick } = useAdManager();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState('');
  const [exportProgress, setExportProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const reportTypes = [
    { id: 'performance', name: 'Rapports Performance', icon: 'ri-bar-chart-line' },
    { id: 'strategic', name: 'Analyses Stratégiques', icon: 'ri-compass-line' },
    { id: 'competitive', name: 'Veille Concurrentielle', icon: 'ri-sword-line' },
    { id: 'custom', name: 'Rapports Personnalisés', icon: 'ri-settings-line' }
  ];

  const existingReports = [
    {
      id: 1,
      title: 'Analyse Performance Q4 2023 - TechCorp',
      type: 'Performance',
      client: 'TechCorp Solutions',
      createdDate: '2024-01-20',
      status: 'Finalisé',
      pages: 24,
      format: 'PDF',
      size: '3.2 MB',
      downloads: 8,
      description: 'Analyse complète des performances commerciales avec recommandations d\'optimisation'
    },
    {
      id: 2,
      title: 'Stratégie Expansion Marché - InnovateSAS',
      type: 'Stratégique',
      client: 'InnovateSAS',
      createdDate: '2024-01-18',
      status: 'En révision',
      pages: 32,
      format: 'PDF',
      size: '4.8 MB',
      downloads: 5,
      description: 'Plan stratégique d\'expansion avec analyse de marché et recommandations'
    },
    {
      id: 3,
      title: 'Benchmark Concurrentiel Secteur Tech',
      type: 'Concurrentiel',
      client: 'Plusieurs clients',
      createdDate: '2024-01-15',
      status: 'Finalisé',
      pages: 18,
      format: 'Excel',
      size: '2.1 MB',
      downloads: 12,
      description: 'Analyse comparative des acteurs majeurs du secteur technologique'
    },
    {
      id: 4,
      title: 'Audit Processus Vente - GlobalTrade',
      type: 'Performance',
      client: 'GlobalTrade Ltd',
      createdDate: '2024-01-12',
      status: 'Livré',
      pages: 28,
      format: 'PDF',
      size: '3.7 MB',
      downloads: 15,
      description: 'Audit complet des processus de vente avec plan d\'amélioration'
    }
  ];

  const reportTemplates = [
    {
      id: 1,
      name: 'Analyse Performance Commerciale',
      description: 'Template complet pour analyser les performances des équipes commerciales',
      sections: ['Résumé exécutif', 'KPIs', 'Analyse détaillée', 'Recommandations'],
      estimatedTime: '2-3 heures'
    },
    {
      id: 2,
      name: 'Étude de Marché Sectorielle',
      description: 'Framework pour analyser un marché et identifier les opportunités',
      sections: ['Vue d\'ensemble marché', 'Analyse concurrentielle', 'Tendances', 'Opportunités'],
      estimatedTime: '4-6 heures'
    },
    {
      id: 3,
      name: 'Plan Stratégique d\'Expansion',
      description: 'Structure pour élaborer une stratégie d\'expansion géographique ou produit',
      sections: ['Contexte', 'Analyse SWOT', 'Stratégie', 'Plan d\'action', 'Budget'],
      estimatedTime: '6-8 heures'
    },
    {
      id: 4,
      name: 'Audit Organisationnel',
      description: 'Cadre pour évaluer l\'efficacité organisationnelle et proposer des améliorations',
      sections: ['Diagnostic', 'Analyse processus', 'Recommandations', 'Roadmap'],
      estimatedTime: '3-5 heures'
    }
  ];

  // Fonction pour obtenir les couleurs de statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'finalise':
        return 'bg-green-100 text-green-800';
      case 'revision':
        return 'bg-yellow-100 text-yellow-800';
      case 'livre':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Fonction pour obtenir les couleurs de priorité
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'PDF': return 'ri-file-pdf-line text-red-600';
      case 'Excel': return 'ri-file-excel-line text-green-600';
      case 'Word': return 'ri-file-word-line text-blue-600';
      case 'PowerPoint': return 'ri-slideshow-line text-orange-600';
      default: return 'ri-file-line text-gray-600';
    }
  };

  // Gestion des actions avec états de chargement
  const handleCreateReport = async (reportData) => {
    setLoadingAction('create-report');
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      // Logique de création de rapport
      setShowCreateModal(false);
    } finally {
      setIsLoading(false);
      setLoadingAction('');
    }
  };

  const handleExportReport = async (reportId, format) => {
    setLoadingAction(`export-${reportId}-${format}`);
    setIsLoading(true);
    setExportProgress(0);
    
    try {
      // Simulation d'export avec progression
      for (let i = 0; i <= 100; i += 20) {
        setExportProgress(i);
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      const report = existingReports.find(r => r.id === reportId);
      if (report) {
        // Simulation de téléchargement
        const blob = new Blob([`Rapport: ${report.title} - Format: ${format}`], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${report.title.replace(/\s+/g, '_')}.${format}`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } finally {
      setIsLoading(false);
      setLoadingAction('');
      setExportProgress(0);
    }
  };

  const handleSendReport = async (reportId, recipients) => {
    setLoadingAction(`send-${reportId}`);
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Logique d'envoi par email
    } finally {
      setIsLoading(false);
      setLoadingAction('');
    }
  };

  const handleDuplicateReport = async (reportId) => {
    setLoadingAction(`duplicate-${reportId}`);
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Logique de duplication
    } finally {
      setIsLoading(false);
      setLoadingAction('');
    }
  };

  const handleDeleteReport = async (reportId) => {
    setLoadingAction(`delete-${reportId}`);
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Logique de suppression
    } finally {
      setIsLoading(false);
      setLoadingAction('');
    }
  };

  const handlePreviewReport = async (reportId) => {
    setLoadingAction(`preview-${reportId}`);
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      const report = existingReports.find(r => r.id === reportId);
      setSelectedReport(report);
    } finally {
      setIsLoading(false);
      setLoadingAction('');
    }
  };

  const handleUseTemplate = async (templateId) => {
    setLoadingAction(`template-${templateId}`);
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1800));
      const template = reportTemplates.find(t => t.id === templateId);
      setSelectedTemplate(template);
      setShowTemplateModal(false);
      setShowCreateModal(true);
    } finally {
      setIsLoading(false);
      setLoadingAction('');
    }
  };

  // Composant bouton avec état de chargement
  const LoadingButton = ({ onClick, loading, loadingText, children, className, variant = 'primary', disabled = false, icon = '', size = 'md', progress = null }) => {
    const baseClasses = "rounded-lg font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap flex items-center justify-center relative overflow-hidden";
    const sizes = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base"
    };
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
        className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${loading || disabled ? 'opacity-50 cursor-not-allowed transform-none' : ''} ${className}`}
      >
        {progress !== null && (
          <div 
            className="absolute inset-0 bg-white bg-opacity-20 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        )}
        <div className="relative z-10 flex items-center">
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {loadingText}
              {progress !== null && <span className="ml-2">{progress}%</span>}
            </>
          ) : (
            <>
              {icon && <i className={`${icon} mr-2`}></i>}
              {children}
            </>
          )}
        </div>
      </button>
    );
  };

  // Filtrer et trier les rapports
  const filteredReports = existingReports
    .filter(report => {
      if (activeFilter === 'all') return true;
      return report.status === activeFilter;
    })
    .filter(report => 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.client.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdDate) - new Date(a.createdDate);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'company':
          return a.client.localeCompare(b.client);
        case 'downloads':
          return b.downloads - a.downloads;
        default:
          return 0;
      }
    });

  // Bannières publicitaires
  const sidebarAds = getAds('consultants-reports-sidebar', 1, { 
    targetAudience: ['consultant', 'analyst'],
    preferredCategories: ['productivity', 'reporting'],
    userType: 'enterprise'
  });
  
  const footerAds = getAds('consultants-reports-footer', 1, { 
    targetAudience: ['consultant', 'analyst'],
    preferredCategories: ['productivity', 'reporting'],
    userType: 'enterprise'
  });

  const handleAdClick = (ad: any, section: string) => {
    recordClick(ad.id, section, 'button', {
      userType: 'consultant',
      section: 'reports-section'
    });
    window.open(ad.link, '_blank');
  };

  const handleAdImpression = (ad: any, section: string) => {
    recordImpression(ad.id, section, {
      userType: 'consultant',
      section: 'reports-section'
    });
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec actions principales */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Rapports et Statistiques</h2>
            <p className="text-gray-600">Créez et gérez vos rapports de conseil stratégique</p>
          </div>
          <div className="flex items-center space-x-3">
            <LoadingButton
              onClick={() => setShowTemplateModal(true)}
              variant="outline"
              icon="ri-layout-line"
            >
              Templates
            </LoadingButton>
            <LoadingButton
              onClick={() => setShowCreateModal(true)}
              variant="primary"
              icon="ri-add-line"
            >
              Nouveau Rapport
            </LoadingButton>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Filtrer :</span>
            {[
              { id: 'all', label: 'Tous', icon: 'ri-file-list-line' },
              { id: 'finalise', label: 'Finalisés', icon: 'ri-check-line' },
              { id: 'revision', label: 'En révision', icon: 'ri-edit-line' },
              { id: 'livre', label: 'Livrés', icon: 'ri-send-plane-line' },
              { id: 'brouillon', label: 'Brouillons', icon: 'ri-draft-line' }
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
          
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Rechercher un rapport..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="date">Trier par date</option>
              <option value="title">Trier par titre</option>
              <option value="company">Trier par entreprise</option>
              <option value="downloads">Trier par téléchargements</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des rapports avec boutons d'action */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status === 'finalise' ? 'Finalisé' :
                     report.status === 'revision' ? 'En révision' :
                     report.status === 'livre' ? 'Livré' : 'Brouillon'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                    {report.priority === 'high' ? 'Priorité haute' : 
                     report.priority === 'medium' ? 'Priorité moyenne' : 'Priorité faible'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{report.client}</p>
                <p className="text-gray-700 mb-3">{report.description}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center">
                    <i className="ri-calendar-line mr-1"></i>
                    Créé le {new Date(report.createdDate).toLocaleDateString('fr-FR')}
                  </span>
                  <span className="flex items-center">
                    <i className="ri-download-line mr-1"></i>
                    {report.downloads} téléchargements
                  </span>
                  <span className="flex items-center">
                    <i className="ri-share-line mr-1"></i>
                    {report.shares} partages
                  </span>
                  <span className="flex items-center">
                    <i className="ri-time-line mr-1"></i>
                    {report.estimatedTime}
                  </span>
                </div>
              </div>
              <div className="text-right ml-6">
                <div className="text-lg font-bold text-blue-600">{report.completionRate}%</div>
                <div className="text-sm text-gray-500">Complété</div>
                <div className="w-20 bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${report.completionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Actions du rapport */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2">
                <LoadingButton
                  onClick={() => handlePreviewReport(report.id)}
                  loading={isLoading && loadingAction === `preview-${report.id}`}
                  loadingText="Chargement..."
                  variant="ghost"
                  size="sm"
                  icon="ri-eye-line"
                >
                  Aperçu
                </LoadingButton>
                <LoadingButton
                  onClick={() => handleDuplicateReport(report.id)}
                  loading={isLoading && loadingAction === `duplicate-${report.id}`}
                  loadingText="Duplication..."
                  variant="ghost"
                  size="sm"
                  icon="ri-file-copy-line"
                >
                  Dupliquer
                </LoadingButton>
                <LoadingButton
                  onClick={() => handleSendReport(report.id, [])}
                  loading={isLoading && loadingAction === `send-${report.id}`}
                  loadingText="Envoi..."
                  variant="ghost"
                  size="sm"
                  icon="ri-mail-send-line"
                >
                  Envoyer
                </LoadingButton>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Boutons d'export avec progression */}
                <div className="flex items-center space-x-1">
                  {['pdf', 'excel', 'word', 'ppt'].map((format) => (
                    <LoadingButton
                      key={format}
                      onClick={() => handleExportReport(report.id, format)}
                      loading={isLoading && loadingAction === `export-${report.id}-${format}`}
                      loadingText=""
                      progress={loadingAction === `export-${report.id}-${format}` ? exportProgress : null}
                      variant="outline"
                      size="sm"
                      icon={`ri-file-${format === 'excel' ? 'excel' : format === 'word' ? 'word' : format === 'ppt' ? 'ppt' : 'pdf'}-line`}
                      className="px-2"
                    />
                  ))}
                </div>
                
                <LoadingButton
                  variant="ghost"
                  size="sm"
                  icon="ri-edit-line"
                >
                  Modifier
                </LoadingButton>
                
                <LoadingButton
                  onClick={() => handleDeleteReport(report.id)}
                  loading={isLoading && loadingAction === `delete-${report.id}`}
                  loadingText="Suppression..."
                  variant="danger"
                  size="sm"
                  icon="ri-delete-bin-line"
                >
                  Supprimer
                </LoadingButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Templates avec boutons d'action */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Templates Disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTemplates.map((template) => (
            <div key={template.id} className="border rounded-lg p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 bg-${template.color}-100 rounded-lg flex items-center justify-center`}>
                  <i className={`${template.icon} text-${template.color}-600 text-lg`}></i>
                </div>
                <span className="text-xs text-gray-500">{template.estimatedTime}</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{template.sections.length} sections</span>
                <LoadingButton
                  onClick={() => handleUseTemplate(template.id)}
                  loading={isLoading && loadingAction === `template-${template.id}`}
                  loadingText="Chargement..."
                  variant="primary"
                  size="sm"
                  icon="ri-add-line"
                >
                  Utiliser
                </LoadingButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistiques avec actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques des Rapports</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Rapports Créés', value: '24', icon: 'ri-file-list-line', color: 'blue', action: 'view-all-reports' },
            { title: 'Téléchargements Totaux', value: '156', icon: 'ri-download-line', color: 'green', action: 'view-downloads' },
            { title: 'Temps Moyen Création', value: '4.2h', icon: 'ri-time-line', color: 'yellow', action: 'view-time-stats' },
            { title: 'Taux Satisfaction', value: '94%', icon: 'ri-star-line', color: 'purple', action: 'view-feedback' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 bg-${stat.color}-100 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <i className={`${stat.icon} text-${stat.color}-600 text-2xl`}></i>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-3">{stat.title}</div>
              <LoadingButton
                onClick={() => handleQuickAction(stat.action)}
                variant="ghost"
                size="sm"
                icon="ri-arrow-right-line"
                className="text-xs"
              >
                Voir détails
              </LoadingButton>
            </div>
          ))}
        </div>
      </div>

      {/* Modals avec boutons améliorés */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedTemplate ? `Nouveau Rapport - ${selectedTemplate.name}` : 'Nouveau Rapport'}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setSelectedTemplate(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre du rapport</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Ex: Analyse Performance Q1 2024"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option value="high">Priorité haute</option>
                    <option value="medium">Priorité moyenne</option>
                    <option value="low">Priorité faible</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                  rows={3}
                  placeholder="Description du rapport et objectifs..."
                ></textarea>
              </div>
              
              {selectedTemplate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sections incluses</label>
                  <div className="space-y-2">
                    {selectedTemplate.sections.map((section, index) => (
                      <div key={index} className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-2" />
                        <span className="text-sm text-gray-700">{section}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <LoadingButton
                onClick={() => {
                  setShowCreateModal(false);
                  setSelectedTemplate(null);
                }}
                variant="ghost"
              >
                Annuler
              </LoadingButton>
              <LoadingButton
                onClick={() => handleCreateReport({})}
                loading={isLoading && loadingAction === 'create-report'}
                loadingText="Création en cours..."
                variant="primary"
                icon="ri-add-line"
              >
                Créer le Rapport
              </LoadingButton>
            </div>
          </div>
        </div>
      )}

      {/* Modal Templates */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Choisir un Template</h3>
              <button
                onClick={() => setShowTemplateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reportTemplates.map((template) => (
                <div key={template.id} className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-${template.color}-100 rounded-lg flex items-center justify-center`}>
                      <i className={`${template.icon} text-${template.color}-600 text-xl`}></i>
                    </div>
                    <span className="text-sm text-gray-500">{template.estimatedTime}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Sections incluses :</h5>
                    <div className="space-y-1">
                      {template.sections.map((section, index) => (
                        <div key={index} className="text-xs text-gray-600 flex items-center">
                          <i className="ri-check-line text-green-600 mr-1"></i>
                          {section}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{template.sections.length} sections</span>
                    <LoadingButton
                      onClick={() => handleUseTemplate(template.id)}
                      loading={isLoading && loadingAction === `template-${template.id}`}
                      loadingText="Chargement..."
                      variant="primary"
                      icon="ri-arrow-right-line"
                    >
                      Utiliser ce template
                    </LoadingButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bannière publicitaire latérale */}
      {sidebarAds.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <i className="ri-file-chart-line text-white text-2xl"></i>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{sidebarAds[0].title}</h3>
            <p className="text-sm text-gray-600 mb-4">{sidebarAds[0].description}</p>
            <button 
              onClick={() => handleAdClick(sidebarAds[0], 'consultants-reports-sidebar')}
              onLoad={() => handleAdImpression(sidebarAds[0], 'consultants-reports-sidebar')}
              className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm whitespace-nowrap"
            >
              Découvrir
            </button>
          </div>
        </div>
      )}

      {/* Bannière publicitaire pied de page */}
      {footerAds.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                <i className="ri-presentation-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{footerAds[0].title}</h3>
                <p className="text-gray-600">{footerAds[0].description}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-red-600 font-medium">Templates premium inclus</span>
                  <span className="text-sm text-gray-500 ml-2">• Automatisation complète</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button 
                onClick={() => handleAdClick(footerAds[0], 'consultants-reports-footer')}
                onLoad={() => handleAdImpression(footerAds[0], 'consultants-reports-footer')}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                Découvrir la suite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add named export for compatibility with named imports
export { ReportsSection };