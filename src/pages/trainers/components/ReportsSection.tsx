
import { useState } from 'react';

export default function ReportsSection() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const reports = [
    {
      id: 1,
      title: 'Rapport de Performance Q1 2024',
      type: 'Performance',
      status: 'generated',
      date: '2024-03-01',
      period: 'Q1 2024',
      format: 'PDF',
      size: '2.8 MB',
      downloads: 15,
      description: 'Analyse complète des performances des apprenants au premier trimestre'
    },
    {
      id: 2,
      title: 'Analyse Taux de Complétion',
      type: 'Complétion',
      status: 'generated',
      date: '2024-02-28',
      period: 'Février 2024',
      format: 'Excel',
      size: '1.2 MB',
      downloads: 8,
      description: 'Statistiques détaillées sur les taux de complétion par module'
    },
    {
      id: 3,
      title: 'Feedback Apprenants',
      type: 'Feedback',
      status: 'generating',
      date: '2024-03-05',
      period: 'Mars 2024',
      format: 'PDF',
      size: '-',
      downloads: 0,
      description: 'Compilation des retours et suggestions des apprenants'
    },
    {
      id: 4,
      title: 'Rapport Entreprises Partenaires',
      type: 'Collaboration',
      status: 'generated',
      date: '2024-02-25',
      period: 'Février 2024',
      format: 'PowerPoint',
      size: '5.4 MB',
      downloads: 12,
      description: 'Bilan des collaborations avec les entreprises partenaires'
    }
  ];

  const templates = [
    {
      id: 1,
      name: 'Rapport de Performance',
      description: 'Analyse détaillée des performances des apprenants',
      sections: ['Statistiques globales', 'Performances par module', 'Apprenants en difficulté', 'Recommandations'],
      estimatedTime: '2-3h'
    },
    {
      id: 2,
      name: 'Analyse de Complétion',
      description: 'Taux de complétion et progression des formations',
      sections: ['Taux de complétion', 'Temps moyen', 'Modules populaires', 'Tendances'],
      estimatedTime: '1-2h'
    },
    {
      id: 3,
      name: 'Feedback Apprenants',
      description: 'Compilation des retours et évaluations',
      sections: ['Scores moyens', 'Commentaires', 'Suggestions', 'Points d\'amélioration'],
      estimatedTime: '2-3h'
    },
    {
      id: 4,
      name: 'Rapport Personnalisé',
      description: 'Créez un rapport sur mesure selon vos besoins',
      sections: ['Sections personnalisables'],
      estimatedTime: '3-5h'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generated':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'generating':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'generated':
        return 'Généré';
      case 'generating':
        return 'En cours';
      case 'scheduled':
        return 'Programmé';
      case 'failed':
        return 'Échoué';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Bannière Publicitaire En-tête */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Outils de Reporting Avancés</h3>
            <p className="text-teal-100 text-sm mb-4">Générez des rapports professionnels et exportez-les dans plusieurs formats</p>
            <button className="px-6 py-2 bg-white text-teal-600 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium whitespace-nowrap">
              Découvrir les Templates
            </button>
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <i className="ri-file-chart-line text-6xl opacity-20"></i>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Rapports et Statistiques</h2>
            <p className="text-sm text-gray-500 mt-1">Générez et exportez vos rapports de formation</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium whitespace-nowrap shadow-md"
          >
            <i className="ri-add-line mr-2"></i>
            Créer un Rapport
          </button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <i className="ri-file-chart-line text-2xl text-purple-600"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">24</p>
            <p className="text-sm text-gray-600">Rapports Créés</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <i className="ri-download-line text-2xl text-blue-600"></i>
              <span className="text-xs text-green-600 font-medium">+35 cette semaine</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">1,247</p>
            <p className="text-sm text-gray-600">Téléchargements</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <i className="ri-time-line text-2xl text-green-600"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">4.2h</p>
            <p className="text-sm text-gray-600">Temps Moyen</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <i className="ri-star-line text-2xl text-yellow-600"></i>
            </div>
            <p className="text-2xl font-bold text-gray-900">94%</p>
            <p className="text-sm text-gray-600">Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Templates de Rapports */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Templates de Rapports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">{template.name}</h4>
              <p className="text-xs text-gray-600 mb-3">{template.description}</p>
              <div className="mb-3">
                <p className="text-xs font-medium text-gray-700 mb-2">Sections incluses :</p>
                <div className="flex flex-wrap gap-2">
                  {template.sections.map((section, idx) => (
                    <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                      {section}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  <i className="ri-time-line mr-1"></i>
                  {template.estimatedTime}
                </span>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs font-medium whitespace-nowrap">
                  Utiliser ce Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historique des Rapports */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Historique des Rapports</h3>
          <div className="flex items-center space-x-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>Tous les types</option>
              <option>Performance</option>
              <option>Complétion</option>
              <option>Feedback</option>
              <option>Collaboration</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>Tous les statuts</option>
              <option>Générés</option>
              <option>En cours</option>
              <option>Programmés</option>
            </select>
          </div>
        </div>
        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50/50 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-sm font-semibold text-gray-900">{report.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                      {getStatusLabel(report.status)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{report.description}</p>
                  <div className="flex items-center space-x-6 text-xs text-gray-500">
                    <span>
                      <i className="ri-calendar-line mr-1"></i>
                      {new Date(report.date).toLocaleDateString('fr-FR')}
                    </span>
                    <span>
                      <i className="ri-time-line mr-1"></i>
                      {report.period}
                    </span>
                    <span>
                      <i className="ri-file-line mr-1"></i>
                      {report.format}
                    </span>
                    {report.size !== '-' && (
                      <span>
                        <i className="ri-hard-drive-line mr-1"></i>
                        {report.size}
                      </span>
                    )}
                    <span>
                      <i className="ri-download-line mr-1"></i>
                      {report.downloads} téléchargements
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {report.status === 'generated' && (
                    <>
                      <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium whitespace-nowrap">
                        <i className="ri-download-line mr-1"></i>
                        Télécharger
                      </button>
                      <button
                        onClick={() => {
                          setSelectedReport(report);
                          setShowEmailModal(true);
                        }}
                        className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium whitespace-nowrap"
                      >
                        <i className="ri-mail-line mr-1"></i>
                        Envoyer
                      </button>
                    </>
                  )}
                  {report.status === 'generating' && (
                    <div className="flex items-center space-x-2 text-sm text-blue-600">
                      <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                      <span>Génération en cours...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bannière Publicitaire Footer */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Suite Complète de Reporting</h3>
            <p className="text-orange-100 text-sm mb-4">Automatisez vos rapports et gagnez du temps avec nos templates professionnels</p>
            <button className="px-6 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium whitespace-nowrap">
              Essayer Gratuitement
            </button>
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <i className="ri-dashboard-line text-6xl opacity-20"></i>
          </div>
        </div>
      </div>

      {/* Modal Création Rapport */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Créer un Rapport</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de Rapport</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>Performance</option>
                  <option>Complétion</option>
                  <option>Feedback</option>
                  <option>Collaboration</option>
                  <option>Personnalisé</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre du Rapport</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: Rapport de Performance Q1 2024"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Période</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Ce mois</option>
                    <option>Mois dernier</option>
                    <option>Ce trimestre</option>
                    <option>Cette année</option>
                    <option>Personnalisée</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format d'Export</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>PDF (Recommandé)</option>
                    <option>Excel</option>
                    <option>PowerPoint</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Données à Inclure</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" defaultChecked />
                    <span className="text-sm text-gray-700">Progrès des apprenants</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" defaultChecked />
                    <span className="text-sm text-gray-700">Taux de complétion</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" defaultChecked />
                    <span className="text-sm text-gray-700">Feedback et évaluations</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" />
                    <span className="text-sm text-gray-700">Statistiques par module</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap"
              >
                Annuler
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium whitespace-nowrap">
                Générer le Rapport
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Envoi Email */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Envoyer par Email</h3>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destinataires</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="email@exemple.fr (séparez par des virgules)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message (optionnel)</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ajoutez un message personnalisé..."
                ></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap"
              >
                Annuler
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium whitespace-nowrap">
                <i className="ri-send-plane-fill mr-2"></i>
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
