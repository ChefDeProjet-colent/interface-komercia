import { useState, useEffect } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';
import AdBanner from '../../../components/feature/AdBanner';

interface Report {
  id: number;
  title: string;
  type: 'performance' | 'sales' | 'team' | 'conversion';
  period: string;
  generatedDate: string;
  size: string;
  status: 'ready' | 'generating' | 'error';
  downloadCount: number;
}

export default function ReportsSection() {
  const { trackAction } = useAdManager();
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedType, setSelectedType] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      title: 'Rapport de Performance Équipe - Mars 2024',
      type: 'performance',
      period: 'Mars 2024',
      generatedDate: '2024-03-28',
      size: '2.4 MB',
      status: 'ready',
      downloadCount: 12
    },
    {
      id: 2,
      title: 'Analyse des Ventes - Q1 2024',
      type: 'sales',
      period: 'Q1 2024',
      generatedDate: '2024-03-25',
      size: '3.1 MB',
      status: 'ready',
      downloadCount: 8
    },
    {
      id: 3,
      title: 'Rapport Équipe Détaillé - Février 2024',
      type: 'team',
      period: 'Février 2024',
      generatedDate: '2024-02-29',
      size: '1.8 MB',
      status: 'ready',
      downloadCount: 15
    },
    {
      id: 4,
      title: 'Analyse Conversion - Semaine 12',
      type: 'conversion',
      period: 'Semaine 12',
      generatedDate: '2024-03-22',
      size: '956 KB',
      status: 'ready',
      downloadCount: 6
    },
    {
      id: 5,
      title: 'Rapport Performance - Semaine 13',
      type: 'performance',
      period: 'Semaine 13',
      generatedDate: '2024-03-29',
      size: '1.2 MB',
      status: 'generating',
      downloadCount: 0
    }
  ]);

  useEffect(() => {
    trackAction('view-reports-section');
  }, []);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    trackAction('generate-new-report');
    
    // Simulation de génération de rapport
    setTimeout(() => {
      const newReport: Report = {
        id: reports.length + 1,
        title: `Nouveau Rapport ${selectedType} - ${new Date().toLocaleDateString('fr-FR')}`,
        type: selectedType as any,
        period: selectedPeriod,
        generatedDate: new Date().toISOString().split('T')[0],
        size: '1.5 MB',
        status: 'ready',
        downloadCount: 0
      };
      setReports(prev => [newReport, ...prev]);
      setIsGenerating(false);
    }, 3000);
  };

  const handleDownload = (report: Report) => {
    trackAction('download-report', { reportType: report.type });
    setReports(prev => prev.map(r => 
      r.id === report.id ? { ...r, downloadCount: r.downloadCount + 1 } : r
    ));
    // Simulation du téléchargement
    console.log(`Téléchargement du rapport: ${report.title}`);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance': return 'ri-bar-chart-line';
      case 'sales': return 'ri-money-dollar-circle-line';
      case 'team': return 'ri-team-line';
      case 'conversion': return 'ri-exchange-line';
      default: return 'ri-file-chart-line';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'performance': return 'bg-blue-100 text-blue-800';
      case 'sales': return 'bg-green-100 text-green-800';
      case 'team': return 'bg-purple-100 text-purple-800';
      case 'conversion': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = reports.filter(report => 
    selectedType === 'all' || report.type === selectedType
  );

  return (
    <div className="space-y-6">
      {/* Générateur de Rapports */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Générateur de Rapports</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type de Rapport</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="performance">Performance Équipe</option>
              <option value="sales">Analyse des Ventes</option>
              <option value="team">Rapport Équipe Détaillé</option>
              <option value="conversion">Analyse de Conversion</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Période</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="weekly">Hebdomadaire</option>
              <option value="monthly">Mensuel</option>
              <option value="quarterly">Trimestriel</option>
              <option value="yearly">Annuel</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Génération...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <i className="ri-file-add-line mr-2"></i>
                  Générer Rapport
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <i className="ri-information-line text-blue-600 mt-0.5"></i>
            <div>
              <h4 className="font-medium text-blue-900">Formats d'Export Disponibles</h4>
              <p className="text-sm text-blue-700 mt-1">
                PDF (recommandé), Excel (.xlsx), CSV pour analyse de données
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bannière Publicitaire */}
      <AdBanner 
        position="manager-reports" 
        section="reports-section"
        format="banner"
        className="mb-6"
      />

      {/* Liste des Rapports */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Rapports Générés</h2>
          <div className="flex items-center space-x-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-8"
            >
              <option value="all">Tous les types</option>
              <option value="performance">Performance</option>
              <option value="sales">Ventes</option>
              <option value="team">Équipe</option>
              <option value="conversion">Conversion</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <i className={`${getTypeIcon(report.type)} text-xl text-gray-600`}></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{report.title}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                        {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        Généré le {new Date(report.generatedDate).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="text-sm text-gray-500">{report.size}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      {report.downloadCount} téléchargement{report.downloadCount !== 1 ? 's' : ''}
                    </div>
                    <div className={`text-xs font-medium ${
                      report.status === 'ready' ? 'text-green-600' :
                      report.status === 'generating' ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {report.status === 'ready' ? 'Prêt' :
                       report.status === 'generating' ? 'En cours...' : 'Erreur'}
                    </div>
                  </div>
                  
                  {report.status === 'ready' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDownload(report)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-download-line mr-1"></i>
                        Télécharger
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap">
                        <i className="ri-eye-line mr-1"></i>
                        Aperçu
                      </button>
                    </div>
                  )}
                  
                  {report.status === 'generating' && (
                    <div className="flex items-center text-orange-600">
                      <i className="ri-loader-4-line animate-spin mr-2"></i>
                      <span className="text-sm">Génération...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-file-chart-line text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun rapport trouvé</h3>
            <p className="text-gray-500">Générez votre premier rapport pour commencer l'analyse.</p>
          </div>
        )}
      </div>

      {/* Statistiques des Rapports */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rapports Générés</p>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            </div>
            <i className="ri-file-chart-line text-2xl text-blue-600"></i>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Téléchargements</p>
              <p className="text-2xl font-bold text-gray-900">
                {reports.reduce((sum, report) => sum + report.downloadCount, 0)}
              </p>
            </div>
            <i className="ri-download-line text-2xl text-green-600"></i>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taille Totale</p>
              <p className="text-2xl font-bold text-gray-900">9.8 MB</p>
            </div>
            <i className="ri-hard-drive-line text-2xl text-purple-600"></i>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Dernière Génération</p>
              <p className="text-2xl font-bold text-gray-900">Aujourd'hui</p>
            </div>
            <i className="ri-time-line text-2xl text-orange-600"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ReportsSection };
