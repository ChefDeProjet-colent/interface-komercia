import { useState, useEffect } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';
import AdBanner from '../../../components/feature/AdBanner';

export default function PerformanceTracking() {
  const { trackAction } = useAdManager();
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [viewType, setViewType] = useState('individual');

  useEffect(() => {
    trackAction('view-performance-tracking');
  }, []);

  // Données KPI par commercial
  const salesRepData = [
    {
      id: 1,
      name: 'Sophie Martin',
      team: 'Paris',
      revenue: 85000,
      leadsConverted: 28,
      conversionRate: 32.1,
      totalLeads: 87,
      rank: 1,
      trend: 'up',
      avatar: 'SM'
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      team: 'Lyon',
      revenue: 78000,
      leadsConverted: 25,
      conversionRate: 29.8,
      totalLeads: 84,
      rank: 2,
      trend: 'up',
      avatar: 'TD'
    },
    {
      id: 3,
      name: 'Marie Leroy',
      team: 'Marseille',
      revenue: 72000,
      leadsConverted: 22,
      conversionRate: 27.5,
      totalLeads: 80,
      rank: 3,
      trend: 'stable',
      avatar: 'ML'
    },
    {
      id: 4,
      name: 'Pierre Moreau',
      team: 'Paris',
      revenue: 68000,
      leadsConverted: 20,
      conversionRate: 25.3,
      totalLeads: 79,
      rank: 4,
      trend: 'down',
      avatar: 'PM'
    },
    {
      id: 5,
      name: 'Julie Bernard',
      team: 'Toulouse',
      revenue: 65000,
      leadsConverted: 19,
      conversionRate: 24.1,
      totalLeads: 79,
      rank: 5,
      trend: 'up',
      avatar: 'JB'
    }
  ];

  // Données par équipe
  const teamData = [
    {
      name: 'Équipe Paris',
      revenue: 153000,
      leadsConverted: 48,
      conversionRate: 28.7,
      members: 6,
      performance: 75,
      trend: 'down'
    },
    {
      name: 'Équipe Lyon',
      revenue: 142000,
      leadsConverted: 45,
      conversionRate: 31.2,
      members: 5,
      performance: 115,
      trend: 'up'
    },
    {
      name: 'Équipe Marseille',
      revenue: 128000,
      leadsConverted: 38,
      conversionRate: 26.8,
      members: 4,
      performance: 92,
      trend: 'stable'
    },
    {
      name: 'Équipe Toulouse',
      revenue: 95000,
      leadsConverted: 28,
      conversionRate: 25.5,
      members: 3,
      performance: 88,
      trend: 'up'
    }
  ];

  // Données de tendances (simulation)
  const trendData = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    revenue: [95000, 108000, 125000, 142000],
    leads: [32, 38, 45, 52],
    conversion: [22.5, 24.8, 26.2, 28.1]
  };

  const getMetricValue = (item: any) => {
    switch (selectedMetric) {
      case 'revenue':
        return `${item.revenue.toLocaleString()}€`;
      case 'leads':
        return item.leadsConverted;
      case 'conversion':
        return `${item.conversionRate}%`;
      default:
        return item.revenue;
    }
  };

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'revenue':
        return 'Chiffre d\'affaires';
      case 'leads':
        return 'Leads convertis';
      case 'conversion':
        return 'Taux de conversion';
      default:
        return 'Chiffre d\'affaires';
    }
  };

  return (
    <div className="space-y-6">
      {/* Contrôles et filtres */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">Suivi des Performances</h2>
          
          <div className="flex items-center space-x-4">
            {/* Sélecteur de période */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
            </select>

            {/* Sélecteur de métrique */}
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="revenue">Chiffre d'affaires</option>
              <option value="leads">Leads convertis</option>
              <option value="conversion">Taux de conversion</option>
            </select>

            {/* Sélecteur de vue */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewType('individual')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  viewType === 'individual'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Individuel
              </button>
              <button
                onClick={() => setViewType('team')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  viewType === 'team'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Équipes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques de tendances */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendances de Performance</h3>
        
        {/* Simulation de graphique */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="h-32 bg-gradient-to-t from-blue-100 to-blue-50 rounded-lg flex items-end justify-center p-4 mb-2">
              <div className="flex items-end space-x-2">
                {trendData.revenue.map((value, index) => (
                  <div
                    key={index}
                    className="bg-blue-500 rounded-t"
                    style={{
                      height: `${(value / Math.max(...trendData.revenue)) * 80}px`,
                      width: '20px'
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <h4 className="font-medium text-gray-900">Chiffre d'affaires</h4>
            <p className="text-sm text-gray-600">+18% ce mois</p>
          </div>

          <div className="text-center">
            <div className="h-32 bg-gradient-to-t from-green-100 to-green-50 rounded-lg flex items-end justify-center p-4 mb-2">
              <div className="flex items-end space-x-2">
                {trendData.leads.map((value, index) => (
                  <div
                    key={index}
                    className="bg-green-500 rounded-t"
                    style={{
                      height: `${(value / Math.max(...trendData.leads)) * 80}px`,
                      width: '20px'
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <h4 className="font-medium text-gray-900">Leads Convertis</h4>
            <p className="text-sm text-gray-600">+62% ce mois</p>
          </div>

          <div className="text-center">
            <div className="h-32 bg-gradient-to-t from-purple-100 to-purple-50 rounded-lg flex items-end justify-center p-4 mb-2">
              <div className="flex items-end space-x-2">
                {trendData.conversion.map((value, index) => (
                  <div
                    key={index}
                    className="bg-purple-500 rounded-t"
                    style={{
                      height: `${(value / Math.max(...trendData.conversion)) * 80}px`,
                      width: '20px'
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <h4 className="font-medium text-gray-900">Taux de Conversion</h4>
            <p className="text-sm text-gray-600">+25% ce mois</p>
          </div>
        </div>

        {/* Bannière publicitaire */}
        <AdBanner 
          position="performance-charts" 
          section="performance-tracking"
          className="mb-6"
        />
      </div>

      {/* Classements */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Classement {viewType === 'individual' ? 'des Commerciaux' : 'des Équipes'} - {getMetricLabel()}
          </h3>
          <div className="flex items-center space-x-2">
            <i className="ri-trophy-line text-yellow-500"></i>
            <span className="text-sm text-gray-600">Top performers</span>
          </div>
        </div>

        {viewType === 'individual' ? (
          <div className="space-y-4">
            {salesRepData.map((rep, index) => (
              <div
                key={rep.id}
                className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                  index === 0 ? 'border-yellow-200 bg-yellow-50' :
                  index === 1 ? 'border-gray-300 bg-gray-50' :
                  index === 2 ? 'border-orange-200 bg-orange-50' :
                  'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-500 text-white' :
                        index === 2 ? 'bg-orange-500 text-white' :
                        'bg-blue-500 text-white'
                      }`}>
                        {index + 1}
                      </span>
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{rep.avatar}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{rep.name}</h4>
                      <p className="text-sm text-gray-600">{rep.team}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">
                        {rep.revenue.toLocaleString()}€
                      </p>
                      <p className="text-xs text-gray-600">CA généré</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{rep.leadsConverted}</p>
                      <p className="text-xs text-gray-600">Leads convertis</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{rep.conversionRate}%</p>
                      <p className="text-xs text-gray-600">Taux conversion</p>
                    </div>
                    <div className="flex items-center">
                      <i className={`text-lg ${
                        rep.trend === 'up' ? 'ri-arrow-up-line text-green-500' :
                        rep.trend === 'down' ? 'ri-arrow-down-line text-red-500' :
                        'ri-subtract-line text-gray-500'
                      }`}></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {teamData.map((team, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                  index === 0 ? 'border-yellow-200 bg-yellow-50' :
                  index === 1 ? 'border-gray-300 bg-gray-50' :
                  index === 2 ? 'border-orange-200 bg-orange-50' :
                  'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-gray-500 text-white' :
                      index === 2 ? 'bg-orange-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-medium text-gray-900">{team.name}</h4>
                      <p className="text-sm text-gray-600">{team.members} commerciaux</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">
                        {team.revenue.toLocaleString()}€
                      </p>
                      <p className="text-xs text-gray-600">CA équipe</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{team.leadsConverted}</p>
                      <p className="text-xs text-gray-600">Leads convertis</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{team.conversionRate}%</p>
                      <p className="text-xs text-gray-600">Taux conversion</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-lg font-bold ${
                        team.performance >= 100 ? 'text-green-600' :
                        team.performance >= 80 ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        {team.performance}%
                      </p>
                      <p className="text-xs text-gray-600">Objectif</p>
                    </div>
                    <div className="flex items-center">
                      <i className={`text-lg ${
                        team.trend === 'up' ? 'ri-arrow-up-line text-green-500' :
                        team.trend === 'down' ? 'ri-arrow-down-line text-red-500' :
                        'ri-subtract-line text-gray-500'
                      }`}></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bannière publicitaire en bas */}
      <AdBanner 
        position="performance-bottom" 
        section="performance-tracking"
        format="popup"
      />
    </div>
  );
}

export { PerformanceTracking };
