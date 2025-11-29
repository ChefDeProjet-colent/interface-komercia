import { useState, useEffect } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';
import AdBanner from '../../../components/feature/AdBanner';

interface StartupDashboardProps {
  onTabChange: (tab: string) => void;
}

export default function StartupDashboard({ onTabChange }: StartupDashboardProps) {
  const { trackAction } = useAdManager();
  const [stats, setStats] = useState({
    activeCommercials: 12,
    scheduledEvents: 5,
    positiveFeedback: 28,
    negativeFeedback: 4,
    suggestions: 15,
    totalRevenue: 45250,
    conversionRate: 18.5
  });

  const [notifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Nouveau commercial disponible',
      message: 'Sarah Martin, spécialiste SaaS, vient de rejoindre la plateforme',
      time: 'Il y a 2h',
      icon: 'ri-user-add-line'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Événement à venir',
      message: 'Démonstration produit prévue demain à 14h avec TechCorp',
      time: 'Il y a 4h',
      icon: 'ri-calendar-line'
    },
    {
      id: 3,
      type: 'info',
      title: 'Nouveaux retours clients',
      message: '3 nouveaux avis positifs sur votre dernière démo',
      time: 'Il y a 6h',
      icon: 'ri-feedback-line'
    }
  ]);

  useEffect(() => {
    trackAction('view-startup-dashboard');
  }, []);

  const handleQuickAction = (action: string, tab: string) => {
    trackAction(`startup-quick-${action}`);
    onTabChange(tab);
  };

  return (
    <div className="space-y-6">
      {/* Bannière publicitaire en haut */}
      <AdBanner 
        position="startup-dashboard-top" 
        format="banner"
        section="startup-dashboard"
        className="mb-6"
        userContext={{ section: 'dashboard', priority: 'high' }}
        targetCategories={['training', 'marketing', 'productivity']}
      />

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commerciaux Actifs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.activeCommercials}</p>
              <p className="text-sm text-green-600 mt-1">+3 cette semaine</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-star-line text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Événements Planifiés</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.scheduledEvents}</p>
              <p className="text-sm text-orange-600 mt-1">2 cette semaine</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-calendar-event-line text-orange-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Retours Positifs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.positiveFeedback}</p>
              <p className="text-sm text-green-600 mt-1">+5 ce mois</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-thumb-up-line text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux de Conversion</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.conversionRate}%</p>
              <p className="text-sm text-green-600 mt-1">+2.3% vs mois dernier</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-line-chart-line text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    notification.type === 'success' ? 'bg-green-100' :
                    notification.type === 'warning' ? 'bg-orange-100' : 'bg-blue-100'
                  }`}>
                    <i className={`${notification.icon} ${
                      notification.type === 'success' ? 'text-green-600' :
                      notification.type === 'warning' ? 'text-orange-600' : 'text-blue-600'
                    }`}></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Accès Rapide</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleQuickAction('commercials', 'commercials')}
                className="p-4 rounded-lg border-2 border-dashed transition-all hover:border-solid cursor-pointer border-blue-300 hover:border-blue-500 hover:bg-blue-50"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 bg-blue-100">
                  <i className="ri-user-star-line text-blue-600"></i>
                </div>
                <h4 className="font-medium text-gray-900 text-sm">Commerciaux</h4>
                <p className="text-xs text-gray-600 mt-1">Trouver des commerciaux</p>
              </button>

              <button
                onClick={() => handleQuickAction('events', 'events')}
                className="p-4 rounded-lg border-2 border-dashed transition-all hover:border-solid cursor-pointer border-orange-300 hover:border-orange-500 hover:bg-orange-50"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 bg-orange-100">
                  <i className="ri-calendar-event-line text-orange-600"></i>
                </div>
                <h4 className="font-medium text-gray-900 text-sm">Événements</h4>
                <p className="text-xs text-gray-600 mt-1">Organiser des démos</p>
              </button>

              <button
                onClick={() => handleQuickAction('feedback', 'feedback')}
                className="p-4 rounded-lg border-2 border-dashed transition-all hover:border-solid cursor-pointer border-green-300 hover:border-green-500 hover:bg-green-50"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 bg-green-100">
                  <i className="ri-feedback-line text-green-600"></i>
                </div>
                <h4 className="font-medium text-gray-900 text-sm">Retours Clients</h4>
                <p className="text-xs text-gray-600 mt-1">Analyser les avis</p>
              </button>

              <button
                onClick={() => handleQuickAction('reports', 'reports')}
                className="p-4 rounded-lg border-2 border-dashed transition-all hover:border-solid cursor-pointer border-purple-300 hover:border-purple-500 hover:bg-purple-50"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 bg-purple-100">
                  <i className="ri-file-chart-line text-purple-600"></i>
                </div>
                <h4 className="font-medium text-gray-900 text-sm">Rapports</h4>
                <p className="text-xs text-gray-600 mt-1">Analyser les performances</p>
              </button>
            </div>
          </div>

          {/* Bannière publicitaire intégrée */}
          <div className="mt-6">
            <AdBanner 
              position="startup-dashboard-actions" 
              format="banner"
              section="startup-dashboard"
              userContext={{ section: 'quick-actions', priority: 'medium' }}
              targetCategories={['automation', 'analytics', 'crm']}
            />
          </div>
        </div>
      </div>

      {/* Résumé des performances */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé des Performances</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-money-euro-circle-line text-white text-2xl"></i>
            </div>
            <h4 className="text-2xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()}€</h4>
            <p className="text-sm text-gray-600">Chiffre d'affaires généré</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-user-heart-line text-white text-2xl"></i>
            </div>
            <h4 className="text-2xl font-bold text-gray-900">{stats.positiveFeedback}</h4>
            <p className="text-sm text-gray-600">Retours positifs</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-lightbulb-line text-white text-2xl"></i>
            </div>
            <h4 className="text-2xl font-bold text-gray-900">{stats.suggestions}</h4>
            <p className="text-sm text-gray-600">Suggestions d'amélioration</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { StartupDashboard };
