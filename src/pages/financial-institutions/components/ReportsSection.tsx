import { useState, useEffect } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';
import AdBanner from '../../../components/feature/AdBanner';
import LoadingButton from '../../../components/base/LoadingButton';

interface Report {
  id: string;
  title: string;
  type: 'financing' | 'performance' | 'campaigns' | 'risk-analysis';
  status: 'generated' | 'in-progress' | 'scheduled' | 'failed';
  createdDate: string;
  period: string;
  sector: string;
  financingType: string;
  size: string;
  downloads: number;
  lastDownload: string;
  description: string;
  author: string;
  tags: string[];
  metrics: {
    totalFinancing: number;
    approvalRate: number;
    averageAmount: number;
    riskScore: number;
  };
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: 'financing' | 'performance' | 'campaigns' | 'risk-analysis';
  sections: string[];
  estimatedTime: string;
  complexity: 'simple' | 'medium' | 'complex';
  icon: string;
}

export default function ReportsSection() {
  const { getAds, recordImpression, recordClick } = useAdManager();
  const [reports, setReports] = useState<Report[]>([]);
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Données exemple des rapports
  useEffect(() => {
    setReports([
      {
        id: 'rpt-001',
        title: 'Analyse des Financements Q4 2024',
        type: 'financing',
        status: 'generated',
        createdDate: '2024-01-15',
        period: 'Q4 2024',
        sector: 'Technology',
        financingType: 'Microcrédits',
        size: '2.4 MB',
        downloads: 47,
        lastDownload: '2024-01-20',
        description: 'Rapport détaillé sur les performances des microcrédits accordés aux entreprises technologiques',
        author: 'Marie Dubois',
        tags: ['microcrédits', 'tech', 'Q4', 'performance'],
        metrics: {
          totalFinancing: 2800000,
          approvalRate: 78.5,
          averageAmount: 45000,
          riskScore: 3.2
        }
      },
      {
        id: 'rpt-002',
        title: 'Performance des Campagnes Janvier',
        type: 'campaigns',
        status: 'generated',
        createdDate: '2024-01-10',
        period: 'Janvier 2024',
        sector: 'Industrie',
        financingType: 'Prêts Équipement',
        size: '1.8 MB',
        downloads: 32,
        lastDownload: '2024-01-18',
        description: 'Analyse des performances des campagnes promotionnelles pour les prêts équipement industriel',
        author: 'Pierre Martin',
        tags: ['campagnes', 'industrie', 'équipement', 'ROI'],
        metrics: {
          totalFinancing: 1950000,
          approvalRate: 82.1,
          averageAmount: 75000,
          riskScore: 2.8
        }
      },
      {
        id: 'rpt-003',
        title: 'Évaluation des Risques Secteur Innovation',
        type: 'risk-analysis',
        status: 'in-progress',
        createdDate: '2024-01-12',
        period: 'Décembre 2023',
        sector: 'Innovation',
        financingType: 'Capital Croissance',
        size: '3.1 MB',
        downloads: 15,
        lastDownload: '2024-01-16',
        description: 'Analyse approfondie des risques liés aux financements dans le secteur de l\'innovation',
        author: 'Sophie Chen',
        tags: ['risques', 'innovation', 'capital', 'analyse'],
        metrics: {
          totalFinancing: 4200000,
          approvalRate: 65.3,
          averageAmount: 120000,
          riskScore: 4.1
        }
      },
      {
        id: 'rpt-004',
        title: 'Performance Utilisateurs Décembre',
        type: 'performance',
        status: 'generated',
        createdDate: '2024-01-08',
        period: 'Décembre 2023',
        sector: 'Commerce',
        financingType: 'Microcrédits Express',
        size: '1.5 MB',
        downloads: 28,
        lastDownload: '2024-01-14',
        description: 'Rapport sur les performances des utilisateurs ayant bénéficié de microcrédits express',
        author: 'Thomas Leroy',
        tags: ['performance', 'commerce', 'express', 'utilisateurs'],
        metrics: {
          totalFinancing: 890000,
          approvalRate: 89.2,
          averageAmount: 25000,
          riskScore: 2.1
        }
      }
    ]);

    setTemplates([
      {
        id: 'tpl-001',
        name: 'Analyse de Financement Complète',
        description: 'Rapport détaillé incluant tous les aspects des financements accordés',
        type: 'financing',
        sections: ['Résumé exécutif', 'Métriques clés', 'Analyse par secteur', 'Évaluation des risques', 'Recommandations'],
        estimatedTime: '4-6 heures',
        complexity: 'complex',
        icon: 'ri-fund-line'
      },
      {
        id: 'tpl-002',
        name: 'Performance des Campagnes',
        description: 'Analyse des performances des campagnes promotionnelles et leur ROI',
        type: 'campaigns',
        sections: ['Vue d\'ensemble', 'Métriques de performance', 'Analyse ROI', 'Optimisations suggérées'],
        estimatedTime: '2-3 heures',
        complexity: 'medium',
        icon: 'ri-megaphone-line'
      },
      {
        id: 'tpl-003',
        name: 'Évaluation des Risques',
        description: 'Rapport spécialisé dans l\'analyse et l\'évaluation des risques financiers',
        type: 'risk-analysis',
        sections: ['Analyse des risques', 'Scoring détaillé', 'Recommandations de mitigation', 'Plan d\'action'],
        estimatedTime: '5-8 heures',
        complexity: 'complex',
        icon: 'ri-shield-check-line'
      },
      {
        id: 'tpl-004',
        name: 'Performance Utilisateurs',
        description: 'Rapport sur les performances et comportements des utilisateurs financés',
        type: 'performance',
        sections: ['Profils utilisateurs', 'Métriques de performance', 'Analyse comportementale', 'Insights'],
        estimatedTime: '1-2 heures',
        complexity: 'simple',
        icon: 'ri-user-star-line'
      }
    ]);
  }, []);

  const setLoading = (key: string, value: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: value }));
  };

  const handleCreateReport = async () => {
    setLoading('create-report', true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowCreateModal(false);
      // Logique de création de rapport
    } finally {
      setLoading('create-report', false);
    }
  };

  const handleExportReport = async (reportId: string, format: string) => {
    setLoading(`export-${reportId}-${format}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Logique d'export
    } finally {
      setLoading(`export-${reportId}-${format}`, false);
    }
  };

  const handleEmailReport = async (reportId: string) => {
    setLoading(`email-${reportId}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Logique d'envoi email
    } finally {
      setLoading(`email-${reportId}`, false);
    }
  };

  const handleDownloadReport = async (reportId: string) => {
    setLoading(`download-${reportId}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      // Logique de téléchargement
    } finally {
      setLoading(`download-${reportId}`, false);
    }
  };

  const handleUseTemplate = async (template: ReportTemplate) => {
    setLoading(`template-${template.id}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setSelectedTemplate(template);
      setShowCreateModal(true);
    } finally {
      setLoading(`template-${template.id}`, false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generated': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'financing': return 'bg-blue-100 text-blue-800';
      case 'performance': return 'bg-green-100 text-green-800';
      case 'campaigns': return 'bg-purple-100 text-purple-800';
      case 'risk-analysis': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'complex': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesStatus && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date': return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      case 'title': return a.title.localeCompare(b.title);
      case 'downloads': return b.downloads - a.downloads;
      case 'size': return parseFloat(b.size) - parseFloat(a.size);
      default: return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* En-tête avec actions principales */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Rapports et Statistiques</h2>
          <p className="text-gray-600 mt-1">Générez et gérez vos rapports financiers détaillés</p>
        </div>
        <div className="flex items-center space-x-3">
          <LoadingButton
            onClick={() => setShowTemplateModal(true)}
            loading={false}
            variant="outline"
            icon="ri-file-list-3-line"
            className="whitespace-nowrap"
          >
            Templates
          </LoadingButton>
          <LoadingButton
            onClick={() => setShowCreateModal(true)}
            loading={loadingStates['create-report']}
            loadingText="Création..."
            icon="ri-add-line"
            className="whitespace-nowrap"
          >
            Nouveau Rapport
          </LoadingButton>
        </div>
      </div>

      {/* Bannière publicitaire principale */}
      <AdBanner 
        position="financial-reports-header" 
        format="banner"
        section="financial-institutions"
        className="mb-6"
        priority="high"
        targetCategories={['reporting', 'financial-tools', 'analytics']}
      />

      {/* Statistiques des rapports */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <i className="ri-file-text-line text-2xl text-blue-600"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Rapports</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-xs text-green-600">+3 ce mois</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <i className="ri-download-line text-2xl text-green-600"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Téléchargements</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-xs text-green-600">+156 cette semaine</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <i className="ri-time-line text-2xl text-purple-600"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Temps Économisé</p>
              <p className="text-2xl font-bold text-gray-900">156h</p>
              <p className="text-xs text-green-600">vs création manuelle</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <i className="ri-user-line text-2xl text-orange-600"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Clients Analysés</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
              <p className="text-xs text-blue-600">Profils détaillés</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type de rapport</label>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tous les types</option>
              <option value="financing">Financements</option>
              <option value="performance">Performance</option>
              <option value="campaigns">Campagnes</option>
              <option value="risk-analysis">Analyse de risques</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="generated">Générés</option>
              <option value="in-progress">En cours</option>
              <option value="scheduled">Programmés</option>
              <option value="failed">Échoués</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trier par</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="date">Date de création</option>
              <option value="title">Titre</option>
              <option value="downloads">Téléchargements</option>
              <option value="size">Taille</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par titre, description ou tags..."
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des rapports */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status === 'generated' ? 'Généré' :
                     report.status === 'in-progress' ? 'En cours' :
                     report.status === 'scheduled' ? 'Programmé' : 'Échoué'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                    {report.type === 'financing' ? 'Financement' :
                     report.type === 'performance' ? 'Performance' :
                     report.type === 'campaigns' ? 'Campagnes' : 'Analyse de risques'}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{report.description}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center">
                    <i className="ri-calendar-line mr-1"></i>
                    Créé le {new Date(report.createdDate).toLocaleDateString('fr-FR')}
                  </span>
                  <span className="flex items-center">
                    <i className="ri-user-line mr-1"></i>
                    {report.author}
                  </span>
                  <span className="flex items-center">
                    <i className="ri-download-line mr-1"></i>
                    {report.downloads} téléchargements
                  </span>
                  <span className="flex items-center">
                    <i className="ri-file-line mr-1"></i>
                    {report.size}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  {report.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-2 ml-6">
                <LoadingButton
                  onClick={() => handleDownloadReport(report.id)}
                  loading={loadingStates[`download-${report.id}`]}
                  loadingText="Téléchargement..."
                  variant="primary"
                  size="sm"
                  icon="ri-download-line"
                  className="whitespace-nowrap"
                >
                  Télécharger
                </LoadingButton>
                <div className="flex space-x-1">
                  <LoadingButton
                    onClick={() => handleExportReport(report.id, 'pdf')}
                    loading={loadingStates[`export-${report.id}-pdf`]}
                    variant="outline"
                    size="sm"
                    icon="ri-file-pdf-line"
                    className="text-xs px-2"
                  >
                    PDF
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => handleExportReport(report.id, 'excel')}
                    loading={loadingStates[`export-${report.id}-excel`]}
                    variant="outline"
                    size="sm"
                    icon="ri-file-excel-line"
                    className="text-xs px-2"
                  >
                    Excel
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => handleExportReport(report.id, 'ppt')}
                    loading={loadingStates[`export-${report.id}-ppt`]}
                    variant="outline"
                    size="sm"
                    icon="ri-slideshow-line"
                    className="text-xs px-2"
                  >
                    PPT
                  </LoadingButton>
                </div>
                <LoadingButton
                  onClick={() => handleEmailReport(report.id)}
                  loading={loadingStates[`email-${report.id}`]}
                  loadingText="Envoi..."
                  variant="outline"
                  size="sm"
                  icon="ri-mail-line"
                  className="whitespace-nowrap"
                >
                  Envoyer par email
                </LoadingButton>
              </div>
            </div>

            {/* Métriques du rapport */}
            <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">Financement Total</p>
                <p className="text-lg font-semibold text-blue-600">€{report.metrics.totalFinancing.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Taux d'Approbation</p>
                <p className="text-lg font-semibold text-green-600">{report.metrics.approvalRate}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Montant Moyen</p>
                <p className="text-lg font-semibold text-purple-600">€{report.metrics.averageAmount.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Score de Risque</p>
                <p className={`text-lg font-semibold ${report.metrics.riskScore <= 3 ? 'text-green-600' : report.metrics.riskScore <= 4 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {report.metrics.riskScore}/5
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bannière publicitaire en bas */}
      <AdBanner 
        position="financial-reports-footer" 
        format="banner"
        section="financial-institutions"
        className="mt-8"
        priority="medium"
        targetCategories={['reporting', 'business-intelligence', 'financial-management']}
      />

      {/* Modal de création de rapport */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedTemplate ? `Créer un rapport : ${selectedTemplate.name}` : 'Créer un nouveau rapport'}
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
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre du rapport</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Entrez le titre du rapport"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type de rapport</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="financing">Financement</option>
                      <option value="performance">Performance</option>
                      <option value="campaigns">Campagnes</option>
                      <option value="risk-analysis">Analyse de risques</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Période</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="current-month">Mois en cours</option>
                      <option value="last-month">Mois dernier</option>
                      <option value="current-quarter">Trimestre en cours</option>
                      <option value="last-quarter">Trimestre dernier</option>
                      <option value="current-year">Année en cours</option>
                      <option value="custom">Période personnalisée</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secteur</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="all">Tous les secteurs</option>
                      <option value="technology">Technologie</option>
                      <option value="industry">Industrie</option>
                      <option value="commerce">Commerce</option>
                      <option value="innovation">Innovation</option>
                      <option value="services">Services</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type de financement</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="all">Tous les types</option>
                      <option value="microcredits">Microcrédits</option>
                      <option value="equipment-loans">Prêts Équipement</option>
                      <option value="growth-capital">Capital Croissance</option>
                      <option value="express-loans">Prêts Express</option>
                    </select>
                  </div>
                </div>
                {selectedTemplate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sections à inclure</label>
                    <div className="space-y-2">
                      {selectedTemplate.sections.map((section, index) => (
                        <label key={index} className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm text-gray-700">{section}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Description du rapport (optionnel)"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setSelectedTemplate(null);
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <LoadingButton
                onClick={handleCreateReport}
                loading={loadingStates['create-report']}
                loadingText="Création en cours..."
                icon="ri-file-add-line"
              >
                Créer le rapport
              </LoadingButton>
            </div>
          </div>
        </div>
      )}

      {/* Modal des templates */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Templates de Rapports</h3>
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <i className={`${template.icon} text-xl text-blue-600`}></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{template.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(template.type)}`}>
                              {template.type === 'financing' ? 'Financement' :
                               template.type === 'performance' ? 'Performance' :
                               template.type === 'campaigns' ? 'Campagnes' : 'Analyse de risques'}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(template.complexity)}`}>
                              {template.complexity === 'simple' ? 'Simple' :
                               template.complexity === 'medium' ? 'Moyen' : 'Complexe'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Sections incluses :</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {template.sections.map((section, index) => (
                          <li key={index} className="flex items-center">
                            <i className="ri-check-line text-green-500 mr-2"></i>
                            {section}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        <i className="ri-time-line mr-1"></i>
                        {template.estimatedTime}
                      </span>
                      <LoadingButton
                        onClick={() => handleUseTemplate(template)}
                        loading={loadingStates[`template-${template.id}`]}
                        loadingText="Chargement..."
                        size="sm"
                        icon="ri-play-line"
                      >
                        Utiliser
                      </LoadingButton>
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

export { ReportsSection };
