import { useState } from 'react';
import AdBanner from '../../../components/feature/AdBanner';

interface Report {
  id: string;
  name: string;
  type: 'sales' | 'events' | 'feedback' | 'commercials' | 'custom';
  period: string;
  createdAt: string;
  format: 'PDF' | 'Excel' | 'CSV';
  size: string;
  status: 'generated' | 'generating' | 'failed';
  description: string;
}

const mockReports: Report[] = [
  {
    id: 'rpt-001',
    name: 'Rapport Performance Commerciaux Q4 2024',
    type: 'commercials',
    period: 'Q4 2024',
    createdAt: '2024-12-15',
    format: 'PDF',
    size: '2.4 MB',
    status: 'generated',
    description: 'Analyse complète des performances des commerciaux avec métriques de vente et satisfaction client'
  },
  {
    id: 'rpt-002',
    name: 'Analyse Événements Promotionnels - Décembre',
    type: 'events',
    period: 'Décembre 2024',
    createdAt: '2024-12-10',
    format: 'Excel',
    size: '1.8 MB',
    status: 'generated',
    description: 'Statistiques détaillées sur les événements organisés, taux de participation et ROI'
  },
  {
    id: 'rpt-003',
    name: 'Retours Clients - Tendances Mensuelles',
    type: 'feedback',
    period: 'Novembre 2024',
    createdAt: '2024-12-05',
    format: 'CSV',
    size: '856 KB',
    status: 'generated',
    description: 'Compilation des retours clients avec analyse de sentiment et recommandations'
  },
  {
    id: 'rpt-004',
    name: 'Rapport Ventes Produits - Trimestre',
    type: 'sales',
    period: 'Q4 2024',
    createdAt: '2024-12-01',
    format: 'PDF',
    size: '3.1 MB',
    status: 'generating',
    description: 'Analyse des ventes par produit avec prévisions et recommandations stratégiques'
  },
  {
    id: 'rpt-005',
    name: 'Dashboard Exécutif - Synthèse Annuelle',
    type: 'custom',
    period: '2024',
    createdAt: '2024-11-28',
    format: 'PDF',
    size: '4.2 MB',
    status: 'generated',
    description: 'Rapport exécutif complet avec KPI, tendances et recommandations pour 2025'
  }
];

export default function ReportsSection() {
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('PDF');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [newReport, setNewReport] = useState({
    name: '',
    type: 'sales',
    period: 'current-month',
    format: 'PDF',
    includeData: {
      sales: true,
      events: false,
      feedback: false,
      commercials: false
    },
    filters: {
      startDate: '',
      endDate: '',
      product: '',
      commercial: '',
      region: ''
    }
  });

  const filteredReports = mockReports.filter(report => {
    if (selectedReportType !== 'all' && report.type !== selectedReportType) return false;
    if (selectedPeriod !== 'all' && !report.period.toLowerCase().includes(selectedPeriod)) return false;
    return true;
  });

  const handleCreateReport = async () => {
    setIsGenerating(true);
    // Simulation de génération de rapport
    setTimeout(() => {
      setIsGenerating(false);
      setShowCreateModal(false);
      setNewReport({
        name: '',
        type: 'sales',
        period: 'current-month',
        format: 'PDF',
        includeData: {
          sales: true,
          events: false,
          feedback: false,
          commercials: false
        },
        filters: {
          startDate: '',
          endDate: '',
          product: '',
          commercial: '',
          region: ''
        }
      });
    }, 3000);
  };

  const handleDownload = (report: Report) => {
    // Simulation de téléchargement
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${report.name}.${report.format.toLowerCase()}`;
    link.click();
  };

  const handleEmailReport = () => {
    setShowEmailModal(false);
    setSelectedReport(null);
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'sales': return 'ri-line-chart-line';
      case 'events': return 'ri-calendar-event-line';
      case 'feedback': return 'ri-chat-3-line';
      case 'commercials': return 'ri-team-line';
      case 'custom': return 'ri-file-chart-line';
      default: return 'ri-file-line';
    }
  };

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case 'sales': return 'text-green-600 bg-green-100';
      case 'events': return 'text-blue-600 bg-blue-100';
      case 'feedback': return 'text-purple-600 bg-purple-100';
      case 'commercials': return 'text-orange-600 bg-orange-100';
      case 'custom': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'generated':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">✅ Généré</span>;
      case 'generating':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full animate-pulse">⏳ En cours</span>;
      case 'failed':
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">❌ Échec</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">❓ Inconnu</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec bannière publicitaire */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">📊 Rapports et Statistiques</h2>
            <p className="text-gray-600 mt-1">Générez et gérez vos rapports personnalisés</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap shadow-lg"
          >
            <i className="ri-add-line mr-2"></i>
            Créer un Rapport
          </button>
        </div>

        {/* Bannière publicitaire en en-tête */}
        <AdBanner 
          position="reports-header"
          format="banner"
          section="reports"
          userContext={{
            targetCategories: ['analytics', 'productivity', 'automation'],
            priority: 'high'
          }}
          className="mb-6"
        />
      </div>

      {/* Filtres */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 Filtres de Recherche</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type de Rapport</label>
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Tous les types</option>
              <option value="sales">Ventes</option>
              <option value="events">Événements</option>
              <option value="feedback">Retours Clients</option>
              <option value="commercials">Commerciaux</option>
              <option value="custom">Personnalisé</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Période</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">Toutes les périodes</option>
              <option value="2024">2024</option>
              <option value="q4">Q4</option>
              <option value="décembre">Décembre</option>
              <option value="novembre">Novembre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format par Défaut</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="PDF">PDF</option>
              <option value="Excel">Excel</option>
              <option value="CSV">CSV</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des rapports */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">📋 Historique des Rapports</h3>
          <p className="text-sm text-gray-600 mt-1">{filteredReports.length} rapport(s) trouvé(s)</p>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredReports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`p-3 rounded-lg ${getReportTypeColor(report.type)}`}>
                    <i className={`${getReportTypeIcon(report.type)} text-xl`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{report.name}</h4>
                      {getStatusBadge(report.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span className="flex items-center">
                        <i className="ri-calendar-line mr-1"></i>
                        {report.period}
                      </span>
                      <span className="flex items-center">
                        <i className="ri-time-line mr-1"></i>
                        {new Date(report.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="flex items-center">
                        <i className="ri-file-line mr-1"></i>
                        {report.format}
                      </span>
                      <span className="flex items-center">
                        <i className="ri-hard-drive-line mr-1"></i>
                        {report.size}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {report.status === 'generated' && (
                    <>
                      <button
                        onClick={() => handleDownload(report)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-download-line mr-2"></i>
                        Télécharger
                      </button>
                      <button
                        onClick={() => {
                          setSelectedReport(report);
                          setShowEmailModal(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-mail-line mr-2"></i>
                        Envoyer
                      </button>
                    </>
                  )}
                  {report.status === 'generating' && (
                    <div className="flex items-center text-yellow-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
                      <span className="text-sm">Génération...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bannière publicitaire en bas */}
      <AdBanner 
        position="reports-footer"
        format="animated"
        section="reports"
        userContext={{
          targetCategories: ['analytics', 'automation', 'productivity'],
          priority: 'medium'
        }}
      />

      {/* Modal de création de rapport */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">📊 Créer un Nouveau Rapport</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Informations de base */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom du Rapport</label>
                  <input
                    type="text"
                    value={newReport.name}
                    onChange={(e) => setNewReport({...newReport, name: e.target.value})}
                    placeholder="Ex: Rapport Performance Q1 2025"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type de Rapport</label>
                  <select
                    value={newReport.type}
                    onChange={(e) => setNewReport({...newReport, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="sales">Ventes</option>
                    <option value="events">Événements</option>
                    <option value="feedback">Retours Clients</option>
                    <option value="commercials">Commerciaux</option>
                    <option value="custom">Personnalisé</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Période</label>
                  <select
                    value={newReport.period}
                    onChange={(e) => setNewReport({...newReport, period: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="current-month">Mois en cours</option>
                    <option value="last-month">Mois dernier</option>
                    <option value="current-quarter">Trimestre en cours</option>
                    <option value="last-quarter">Trimestre dernier</option>
                    <option value="current-year">Année en cours</option>
                    <option value="custom">Période personnalisée</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format d'Export</label>
                  <select
                    value={newReport.format}
                    onChange={(e) => setNewReport({...newReport, format: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Excel">Excel</option>
                    <option value="CSV">CSV</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="normal">Normale</option>
                    <option value="high">Élevée</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
              </div>

              {/* Données à inclure */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">📋 Données à Inclure</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(newReport.includeData).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setNewReport({
                          ...newReport,
                          includeData: {...newReport.includeData, [key]: e.target.checked}
                        })}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm font-medium text-gray-700 capitalize">{key === 'sales' ? 'Ventes' : key === 'events' ? 'Événements' : key === 'feedback' ? 'Retours' : 'Commerciaux'}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtres avancés */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">🔍 Filtres Avancés</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date de Début</label>
                    <input
                      type="date"
                      value={newReport.filters.startDate}
                      onChange={(e) => setNewReport({
                        ...newReport,
                        filters: {...newReport.filters, startDate: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date de Fin</label>
                    <input
                      type="date"
                      value={newReport.filters.endDate}
                      onChange={(e) => setNewReport({
                        ...newReport,
                        filters: {...newReport.filters, endDate: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Produit Spécifique</label>
                    <select
                      value={newReport.filters.product}
                      onChange={(e) => setNewReport({
                        ...newReport,
                        filters: {...newReport.filters, product: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Tous les produits</option>
                      <option value="product-a">Produit A</option>
                      <option value="product-b">Produit B</option>
                      <option value="product-c">Produit C</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Commercial</label>
                    <select
                      value={newReport.filters.commercial}
                      onChange={(e) => setNewReport({
                        ...newReport,
                        filters: {...newReport.filters, commercial: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Tous les commerciaux</option>
                      <option value="marie-dubois">Marie Dubois</option>
                      <option value="pierre-martin">Pierre Martin</option>
                      <option value="sophie-bernard">Sophie Bernard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Région</label>
                    <select
                      value={newReport.filters.region}
                      onChange={(e) => setNewReport({
                        ...newReport,
                        filters: {...newReport.filters, region: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Toutes les régions</option>
                      <option value="ile-de-france">Île-de-France</option>
                      <option value="auvergne-rhone-alpes">Auvergne-Rhône-Alpes</option>
                      <option value="nouvelle-aquitaine">Nouvelle-Aquitaine</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <i className="ri-information-line mr-1"></i>
                La génération peut prendre quelques minutes selon la complexité
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreateReport}
                  disabled={isGenerating || !newReport.name}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                      Génération...
                    </>
                  ) : (
                    <>
                      <i className="ri-file-chart-line mr-2"></i>
                      Générer le Rapport
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'envoi par email */}
      {showEmailModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">📧 Envoyer par Email</h3>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destinataires</label>
                <input
                  type="email"
                  placeholder="email1@example.com, email2@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Objet</label>
                <input
                  type="text"
                  defaultValue={`Rapport: ${selectedReport.name}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Message personnalisé (optionnel)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <i className="ri-attachment-line"></i>
                  <span>Pièce jointe: {selectedReport.name}.{selectedReport.format.toLowerCase()} ({selectedReport.size})</span>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex space-x-3">
              <button
                onClick={() => setShowEmailModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Annuler
              </button>
              <button
                onClick={handleEmailReport}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-send-plane-line mr-2"></i>
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { ReportsSection };
