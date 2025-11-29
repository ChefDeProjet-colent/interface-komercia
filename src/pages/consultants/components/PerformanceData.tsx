import { useState } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';

export default function PerformanceData() {
  const { getAds, recordImpression, recordClick } = useAdManager();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const companies = [
    { id: 'all', name: 'Toutes les entreprises' },
    { id: 'techcorp', name: 'TechCorp Solutions' },
    { id: 'innovate', name: 'InnovateSAS' },
    { id: 'startup', name: 'StartupXYZ' },
    { id: 'global', name: 'GlobalTrade Ltd' }
  ];

  const periods = [
    { id: 'week', name: 'Cette semaine' },
    { id: 'month', name: 'Ce mois' },
    { id: 'quarter', name: 'Ce trimestre' },
    { id: 'year', name: 'Cette année' }
  ];

  const metrics = [
    { id: 'revenue', name: 'Chiffre d\'affaires', icon: 'ri-money-euro-circle-line' },
    { id: 'conversion', name: 'Taux de conversion', icon: 'ri-arrow-up-circle-line' },
    { id: 'leads', name: 'Leads générés', icon: 'ri-user-star-line' },
    { id: 'activities', name: 'Activités commerciales', icon: 'ri-calendar-check-line' }
  ];

  const performanceData = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      commercial: 'Marie Dubois',
      revenue: '€125,400',
      conversion: '23.5%',
      leads: 156,
      activities: 89,
      trend: 'up',
      change: '+12%',
      sector: 'Technologie',
      region: 'Île-de-France'
    },
    {
      id: 2,
      company: 'InnovateSAS',
      commercial: 'Pierre Martin',
      revenue: '€98,750',
      conversion: '19.2%',
      leads: 134,
      activities: 76,
      trend: 'up',
      change: '+8%',
      sector: 'Innovation',
      region: 'Rhône-Alpes'
    },
    {
      id: 3,
      company: 'StartupXYZ',
      commercial: 'Sophie Laurent',
      revenue: '€87,300',
      conversion: '25.8%',
      leads: 98,
      activities: 112,
      trend: 'up',
      change: '+25%',
      sector: 'Startup',
      region: 'PACA'
    },
    {
      id: 4,
      company: 'GlobalTrade Ltd',
      commercial: 'Jean Moreau',
      revenue: '€156,900',
      conversion: '18.7%',
      leads: 187,
      activities: 145,
      trend: 'down',
      change: '-5%',
      sector: 'Commerce',
      region: 'Nouvelle-Aquitaine'
    },
    {
      id: 5,
      company: 'TechCorp Solutions',
      commercial: 'Lucie Bernard',
      revenue: '€109,200',
      conversion: '21.4%',
      leads: 123,
      activities: 67,
      trend: 'up',
      change: '+15%',
      sector: 'Technologie',
      region: 'Île-de-France'
    }
  ];

  const summaryStats = [
    {
      title: 'CA Total Généré',
      value: '€577,550',
      change: '+11.2%',
      trend: 'up',
      icon: 'ri-money-euro-circle-line',
      color: 'green'
    },
    {
      title: 'Taux Conversion Moyen',
      value: '21.7%',
      change: '+2.3%',
      trend: 'up',
      icon: 'ri-arrow-up-circle-line',
      color: 'blue'
    },
    {
      title: 'Leads Totaux',
      value: '698',
      change: '+18%',
      trend: 'up',
      icon: 'ri-user-star-line',
      color: 'purple'
    },
    {
      title: 'Activités Réalisées',
      value: '489',
      change: '+7%',
      trend: 'up',
      icon: 'ri-calendar-check-line',
      color: 'orange'
    }
  ];

  const exportData = () => {
    // Simulation d'export
    alert('Export des données en cours...');
  };

  // Bannières publicitaires
  const sidebarAds = getAds('consultants-data-sidebar', 1, { 
    targetAudience: ['consultant', 'analyst'],
    preferredCategories: ['analytics', 'productivity'],
    userType: 'enterprise'
  });
  
  const footerAds = getAds('consultants-data-footer', 1, { 
    targetAudience: ['consultant', 'analyst'],
    preferredCategories: ['analytics', 'productivity'],
    userType: 'enterprise'
  });

  const handleAdClick = (ad: any, section: string) => {
    recordClick(ad.id, section, 'button', {
      userType: 'consultant',
      section: 'performance-data'
    });
    window.open(ad.link, '_blank');
  };

  const handleAdImpression = (ad: any, section: string) => {
    recordImpression(ad.id, section, {
      userType: 'consultant',
      section: 'performance-data'
    });
  };

  return (
    <div className="space-y-6">
      {/* Filtres et contrôles */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Période</label>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id}>{period.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
              <select 
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {companies.map(company => (
                  <option key={company.id} value={company.id}>{company.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Métrique</label>
              <select 
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {metrics.map(metric => (
                  <option key={metric.id} value={metric.id}>{metric.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={exportData}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm whitespace-nowrap"
            >
              <i className="ri-download-line mr-2"></i>
              Exporter
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap">
              <i className="ri-refresh-line mr-2"></i>
              Actualiser
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Contenu principal */}
        <div className="lg:col-span-3 space-y-6">
          {/* Statistiques résumées */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <i className={`ri-arrow-${stat.trend === 'up' ? 'up' : 'down'}-line text-sm mr-1 ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}></i>
                      <span className={`text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    stat.color === 'green' ? 'bg-green-100' :
                    stat.color === 'blue' ? 'bg-blue-100' :
                    stat.color === 'purple' ? 'bg-purple-100' :
                    'bg-orange-100'
                  }`}>
                    <i className={`${stat.icon} text-xl ${
                      stat.color === 'green' ? 'text-green-600' :
                      stat.color === 'blue' ? 'text-blue-600' :
                      stat.color === 'purple' ? 'text-purple-600' :
                      'text-orange-600'
                    }`}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tableau de performance détaillé */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Performance Détaillée par Commercial</h2>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <i className="ri-filter-line"></i>
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <i className="ri-sort-desc"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commercial / Entreprise
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chiffre d'Affaires
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Taux Conversion
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Leads
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activités
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Évolution
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Secteur
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {performanceData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.commercial}</div>
                          <div className="text-sm text-gray-500">{item.company}</div>
                          <div className="text-xs text-gray-400">{item.region}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.revenue}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.conversion}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.leads}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.activities}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <i className={`ri-arrow-${item.trend === 'up' ? 'up' : 'down'}-line mr-1 ${
                            item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}></i>
                          <span className={`text-sm font-medium ${
                            item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {item.change}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {item.sector}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Graphique de tendances */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Tendances de Performance</h2>
            </div>
            <div className="p-6">
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <i className="ri-line-chart-line text-4xl text-gray-400 mb-2"></i>
                  <p className="text-gray-500">Graphique des tendances de performance</p>
                  <p className="text-sm text-gray-400">Évolution du CA et des conversions sur la période sélectionnée</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar droite */}
        <div className="space-y-6">
          {/* Bannière publicitaire latérale */}
          {sidebarAds.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="ri-bar-chart-box-line text-white text-2xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{sidebarAds[0].title}</h3>
                <p className="text-sm text-gray-600 mb-4">{sidebarAds[0].description}</p>
                <button 
                  onClick={() => handleAdClick(sidebarAds[0], 'consultants-data-sidebar')}
                  onLoad={() => handleAdImpression(sidebarAds[0], 'consultants-data-sidebar')}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm whitespace-nowrap"
                >
                  Essayer gratuitement
                </button>
              </div>
            </div>
          )}

          {/* Comparaison périodes */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Comparaison Périodes</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ce mois vs mois dernier</span>
                  <span className="text-sm font-medium text-green-600">+11.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ce trimestre vs précédent</span>
                  <span className="text-sm font-medium text-green-600">+8.7%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cette année vs précédente</span>
                  <span className="text-sm font-medium text-green-600">+15.3%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top performers */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Top Performers</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-bold text-yellow-800">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Marie Dubois</p>
                      <p className="text-xs text-gray-500">TechCorp</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">€125,400</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-bold text-gray-600">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Jean Moreau</p>
                      <p className="text-xs text-gray-500">GlobalTrade</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">€156,900</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-bold text-orange-800">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Lucie Bernard</p>
                      <p className="text-xs text-gray-500">TechCorp</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">€109,200</span>
                </div>
              </div>
            </div>
          </div>

          {/* Données historiques */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Accès Données Historiques</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Données 2023</span>
                    <i className="ri-arrow-right-line text-gray-400"></i>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Performance annuelle complète</p>
                </button>
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Q4 2023</span>
                    <i className="ri-arrow-right-line text-gray-400"></i>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Dernier trimestre détaillé</p>
                </button>
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Tendances 5 ans</span>
                    <i className="ri-arrow-right-line text-gray-400"></i>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Analyse long terme</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bannière publicitaire pied de page */}
      {footerAds.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-lg flex items-center justify-center">
                <i className="ri-speed-up-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{footerAds[0].title}</h3>
                <p className="text-gray-600">{footerAds[0].description}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-blue-600 font-medium">Essai gratuit 30 jours</span>
                  <span className="text-sm text-gray-500 ml-2">• Sans engagement</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button 
                onClick={() => handleAdClick(footerAds[0], 'consultants-data-footer')}
                onLoad={() => handleAdImpression(footerAds[0], 'consultants-data-footer')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Commencer l'essai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { PerformanceData };