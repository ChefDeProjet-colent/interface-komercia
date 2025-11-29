import { useState, useEffect } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';
import AdBanner from '../../../components/feature/AdBanner';

export default function ManagerDashboard() {
  const { trackAction } = useAdManager();
  const [timeRange, setTimeRange] = useState('month');
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    trackAction('view-manager-dashboard');
  }, []);

  // Données de performance globales
  const globalStats = {
    revenue: {
      current: 485000,
      previous: 420000,
      target: 500000
    },
    leadsConverted: {
      current: 156,
      previous: 142,
      target: 180
    },
    conversionRate: {
      current: 24.8,
      previous: 22.1,
      target: 25.0
    },
    activeTeams: 4,
    totalSalesReps: 18
  };

  const quickActions = [
    {
      title: 'Performances',
      description: 'Analyser les KPI équipes',
      icon: 'ri-bar-chart-line',
      color: 'blue',
      action: () => trackAction('quick-access-performance')
    },
    {
      title: 'Tâches',
      description: 'Planifier et répartir',
      icon: 'ri-task-line',
      color: 'green',
      action: () => trackAction('quick-access-tasks')
    },
    {
      title: 'Rapports',
      description: 'Générer et exporter',
      icon: 'ri-file-chart-line',
      color: 'purple',
      action: () => trackAction('quick-access-reports')
    },
    {
      title: 'Équipe',
      description: 'Gérer les commerciaux',
      icon: 'ri-team-line',
      color: 'orange',
      action: () => trackAction('quick-access-team')
    }
  ];

  const recentAlerts = [
    {
      type: 'warning',
      title: 'Objectif en retard',
      message: 'Équipe Paris - 75% de l\'objectif mensuel',
      time: '2h',
      priority: 'high'
    },
    {
      type: 'success',
      title: 'Objectif dépassé',
      message: 'Équipe Lyon - 115% de l\'objectif',
      time: '4h',
      priority: 'medium'
    },
    {
      type: 'info',
      title: 'Nouveau commercial',
      message: 'Marie Dubois a rejoint l\'équipe Marseille',
      time: '1j',
      priority: 'low'
    }
  ];

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Résumé des performances globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chiffre d'affaires */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <i className="ri-money-euro-circle-line text-green-600 text-xl"></i>
            </div>
            <span className={`text-sm font-medium px-2 py-1 rounded ${
              parseFloat(calculateGrowth(globalStats.revenue.current, globalStats.revenue.previous)) > 0
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              +{calculateGrowth(globalStats.revenue.current, globalStats.revenue.previous)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {globalStats.revenue.current.toLocaleString()}€
          </h3>
          <p className="text-sm text-gray-600 mb-3">Chiffre d'affaires équipe</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${getProgressPercentage(globalStats.revenue.current, globalStats.revenue.target)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">
            {getProgressPercentage(globalStats.revenue.current, globalStats.revenue.target).toFixed(1)}% de l'objectif ({globalStats.revenue.target.toLocaleString()}€)
          </p>
        </div>

        {/* Leads convertis */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <i className="ri-user-add-line text-blue-600 text-xl"></i>
            </div>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
              +{calculateGrowth(globalStats.leadsConverted.current, globalStats.leadsConverted.previous)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {globalStats.leadsConverted.current}
          </h3>
          <p className="text-sm text-gray-600 mb-3">Leads convertis</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${getProgressPercentage(globalStats.leadsConverted.current, globalStats.leadsConverted.target)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">
            {getProgressPercentage(globalStats.leadsConverted.current, globalStats.leadsConverted.target).toFixed(1)}% de l'objectif ({globalStats.leadsConverted.target})
          </p>
        </div>

        {/* Taux de conversion */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <i className="ri-percent-line text-purple-600 text-xl"></i>
            </div>
            <span className="bg-purple-100 text-purple-800 text-sm font-medium px-2 py-1 rounded">
              +{calculateGrowth(globalStats.conversionRate.current, globalStats.conversionRate.previous)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {globalStats.conversionRate.current}%
          </h3>
          <p className="text-sm text-gray-600 mb-3">Taux de conversion global</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: `${getProgressPercentage(globalStats.conversionRate.current, globalStats.conversionRate.target)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">
            {getProgressPercentage(globalStats.conversionRate.current, globalStats.conversionRate.target).toFixed(1)}% de l'objectif ({globalStats.conversionRate.target}%)
          </p>
        </div>
      </div>

      {/* Accès rapide et Alertes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accès rapide */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Accès Rapide</h3>
          {/* Actions Rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => setActiveTab('performances')}
              className="p-4 rounded-lg border-2 border-dashed transition-all hover:border-solid cursor-pointer border-blue-300 hover:border-blue-500 hover:bg-blue-50"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 bg-blue-100">
                <i className="ri-bar-chart-line text-blue-600"></i>
              </div>
              <h4 className="font-medium text-gray-900 text-sm">Performances</h4>
              <p className="text-xs text-gray-600 mt-1">Analyser les KPI équipes</p>
            </button>

            <button 
              onClick={() => setActiveTab('planning')}
              className="p-4 rounded-lg border-2 border-dashed transition-all hover:border-solid cursor-pointer border-green-300 hover:border-green-500 hover:bg-green-50"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 bg-green-100">
                <i className="ri-calendar-line text-green-600"></i>
              </div>
              <h4 className="font-medium text-gray-900 text-sm">Planification</h4>
              <p className="text-xs text-gray-600 mt-1">Gérer les tâches équipes</p>
            </button>

            <button 
              onClick={() => setActiveTab('reports')}
              className="p-4 rounded-lg border-2 border-dashed transition-all hover:border-solid cursor-pointer border-purple-300 hover:border-purple-500 hover:bg-purple-50"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 bg-purple-100">
                <i className="ri-file-chart-line text-purple-600"></i>
              </div>
              <h4 className="font-medium text-gray-900 text-sm">Rapports</h4>
              <p className="text-xs text-gray-600 mt-1">Générer analyses</p>
            </button>

            <button 
              onClick={() => setActiveTab('team')}
              className="p-4 rounded-lg border-2 border-dashed transition-all hover:border-solid cursor-pointer border-orange-300 hover:border-orange-500 hover:bg-orange-50"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 bg-orange-100">
                <i className="ri-team-line text-orange-600"></i>
              </div>
              <h4 className="font-medium text-gray-900 text-sm">Équipe</h4>
              <p className="text-xs text-gray-600 mt-1">Gérer les commerciaux</p>
            </button>
          </div>
        </div>

        {/* Alertes récentes */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Alertes Importantes</h3>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              {recentAlerts.filter(alert => alert.priority === 'high').length} urgentes
            </span>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'warning' ? 'border-orange-500 bg-orange-50' :
                  alert.type === 'success' ? 'border-green-500 bg-green-50' :
                  'border-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900 text-sm">{alert.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                        alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {alert.priority === 'high' ? 'Urgent' : 
                         alert.priority === 'medium' ? 'Moyen' : 'Info'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    <span className="text-xs text-gray-500 mt-2 block">Il y a {alert.time}</span>
                  </div>
                  <i className={`${
                    alert.type === 'warning' ? 'ri-alert-line text-orange-500' :
                    alert.type === 'success' ? 'ri-check-line text-green-500' :
                    'ri-information-line text-blue-500'
                  } text-lg`}></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bannière publicitaire */}
      <AdBanner 
        position="manager-dashboard-bottom" 
        section="manager-dashboard"
        className="mt-6"
      />

      {/* Aperçu des équipes */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Aperçu des Équipes</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{globalStats.activeTeams} équipes actives</span>
            <span className="text-sm text-gray-600">•</span>
            <span className="text-sm text-gray-600">{globalStats.totalSalesReps} commerciaux</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Équipe Paris', members: 6, performance: 75, status: 'warning' },
            { name: 'Équipe Lyon', members: 5, performance: 115, status: 'success' },
            { name: 'Équipe Marseille', members: 4, performance: 92, status: 'good' },
            { name: 'Équipe Toulouse', members: 3, performance: 88, status: 'good' }
          ].map((team, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{team.name}</h4>
                <span className={`w-3 h-3 rounded-full ${
                  team.status === 'success' ? 'bg-green-500' :
                  team.status === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                }`}></span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{team.members} commerciaux</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full ${
                    team.status === 'success' ? 'bg-green-500' :
                    team.status === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(team.performance, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">{team.performance}% de l'objectif</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Ajout de l'export nommé pour compatibilité
export { ManagerDashboard };
