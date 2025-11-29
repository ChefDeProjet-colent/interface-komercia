
import { useState } from 'react';

export default function TrainersDashboard() {
  const [notifications] = useState([
    {
      id: 1,
      type: 'inscription',
      title: 'Nouvelle inscription',
      message: '15 nouveaux apprenants inscrits au module "Leadership Avancé"',
      time: 'Il y a 2h',
      priority: 'info',
      icon: 'ri-user-add-line'
    },
    {
      id: 2,
      type: 'update',
      title: 'Module à mettre à jour',
      message: 'Le module "Gestion de Projet" nécessite une mise à jour de contenu',
      time: 'Il y a 4h',
      priority: 'warning',
      icon: 'ri-alert-line'
    },
    {
      id: 3,
      type: 'session',
      title: 'Session de formation demain',
      message: 'Formation "Communication Efficace" - TechCorp - 14h00',
      time: 'Il y a 6h',
      priority: 'urgent',
      icon: 'ri-calendar-event-line'
    },
    {
      id: 4,
      type: 'feedback',
      title: 'Nouveaux retours',
      message: '8 nouveaux avis positifs sur vos modules de formation',
      time: 'Il y a 1j',
      priority: 'success',
      icon: 'ri-star-line'
    }
  ]);

  const stats = [
    {
      label: 'Modules Publiés',
      value: '24',
      change: '+3 ce mois',
      trend: 'up',
      icon: 'ri-book-2-line',
      color: 'from-purple-600 to-indigo-600'
    },
    {
      label: 'Apprenants Inscrits',
      value: '1,247',
      change: '+156 cette semaine',
      trend: 'up',
      icon: 'ri-user-line',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      label: 'Taux de Complétion',
      value: '78.5%',
      change: '+5.2% vs mois dernier',
      trend: 'up',
      icon: 'ri-checkbox-circle-line',
      color: 'from-green-600 to-emerald-600'
    },
    {
      label: 'Score Moyen',
      value: '4.6/5',
      change: 'Excellent niveau',
      trend: 'stable',
      icon: 'ri-star-line',
      color: 'from-yellow-600 to-orange-600'
    }
  ];

  const quickActions = [
    {
      title: 'Modules',
      description: 'Créer et gérer vos modules',
      icon: 'ri-book-2-line',
      color: 'bg-purple-100 text-purple-600',
      action: 'modules'
    },
    {
      title: 'Statistiques',
      description: 'Analyser les progrès',
      icon: 'ri-bar-chart-box-line',
      color: 'bg-blue-100 text-blue-600',
      action: 'statistics'
    },
    {
      title: 'Collaboration',
      description: 'Organiser des sessions',
      icon: 'ri-team-line',
      color: 'bg-green-100 text-green-600',
      action: 'collaboration'
    },
    {
      title: 'Rapports',
      description: 'Générer des rapports',
      icon: 'ri-file-chart-line',
      color: 'bg-orange-100 text-orange-600',
      action: 'reports'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-600 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'success':
        return 'bg-green-100 text-green-600 border-green-200';
      default:
        return 'bg-blue-100 text-blue-600 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Bannière Publicitaire En-tête */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Plateforme de Formation Complète</h3>
            <p className="text-purple-100 text-sm mb-4">Créez, diffusez et suivez vos formations avec des outils professionnels</p>
            <button className="px-6 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium whitespace-nowrap">
              Découvrir
            </button>
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <i className="ri-graduation-cap-line text-6xl opacity-20"></i>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                <i className={`${stat.icon} text-white text-xl`}></i>
              </div>
              {stat.trend === 'up' && (
                <span className="text-green-600 text-sm font-medium">
                  <i className="ri-arrow-up-line"></i>
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
            <p className="text-xs text-green-600 font-medium">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium whitespace-nowrap">
              Tout marquer comme lu
            </button>
          </div>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${getPriorityColor(notification.priority)} hover:shadow-md transition-shadow cursor-pointer`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <i className={`${notification.icon} text-xl`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold mb-1">{notification.title}</p>
                    <p className="text-sm opacity-90 mb-2">{notification.message}</p>
                    <p className="text-xs opacity-75">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accès Rapide */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Accès Rapide</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="w-full p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <i className={`${action.icon} text-lg`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{action.title}</p>
                    <p className="text-xs text-gray-500">{action.description}</p>
                  </div>
                  <i className="ri-arrow-right-line text-gray-400 group-hover:text-purple-600 transition-colors"></i>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bannière Publicitaire Latérale */}
      <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Outils de Création de Contenu</h3>
            <p className="text-green-100 text-sm mb-4">Créez des modules interactifs avec vidéos, quiz et évaluations</p>
            <button className="px-6 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium whitespace-nowrap">
              Essai Gratuit 30 Jours
            </button>
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <i className="ri-video-line text-6xl opacity-20"></i>
          </div>
        </div>
      </div>

      {/* Bannière Publicitaire Footer */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Certifications Professionnelles</h3>
            <p className="text-orange-100 text-sm mb-4">Obtenez des certifications reconnues pour valoriser votre expertise</p>
            <button className="px-6 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium whitespace-nowrap">
              En Savoir Plus
            </button>
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <i className="ri-medal-line text-6xl opacity-20"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
