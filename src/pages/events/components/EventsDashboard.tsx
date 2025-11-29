
import { useState, useEffect } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';
import AdBanner from '../../../components/feature/AdBanner';

export default function EventsDashboard() {
  const { trackAction } = useAdManager();
  const [stats, setStats] = useState({
    eventsPlanned: 24,
    totalParticipants: 1247,
    pastEventsParticipationRate: 78.5,
    pastEventsSatisfaction: 4.6,
    activeRegistrations: 156,
    completedEvents: 16,
    revenue: 89500,
    conversionRate: 78.5
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'urgent',
      title: 'Clôture des inscriptions',
      message: 'Salon Tech Innovation - Inscriptions ferment dans 2 jours (450 inscrits)',
      time: '2h',
      icon: 'ri-alarm-warning-line'
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Événement à venir',
      message: 'Webinaire Marketing Digital - Débute demain à 14h00 (120 participants)',
      time: '4h',
      icon: 'ri-calendar-line'
    },
    {
      id: 3,
      type: 'info',
      title: 'Nouvelles inscriptions',
      message: '15 nouvelles inscriptions pour l\'Atelier Leadership cette semaine',
      time: '6h',
      icon: 'ri-user-add-line'
    },
    {
      id: 4,
      type: 'success',
      title: 'Événement terminé',
      message: 'Conférence IA - 95% de satisfaction (280 participants présents)',
      time: '1j',
      icon: 'ri-check-line'
    }
  ]);

  const [quickActions] = useState([
    {
      id: 1,
      title: 'Événements',
      description: 'Planifier et gérer vos événements',
      icon: 'ri-calendar-event-line',
      color: 'blue',
      action: 'events'
    },
    {
      id: 2,
      title: 'Inscriptions',
      description: 'Gérer les participants',
      icon: 'ri-user-settings-line',
      color: 'green',
      action: 'inscriptions'
    },
    {
      id: 3,
      title: 'Statistiques',
      description: 'Analyser les performances',
      icon: 'ri-bar-chart-line',
      color: 'purple',
      action: 'statistiques'
    },
    {
      id: 4,
      title: 'Promotions',
      description: 'Promouvoir vos événements',
      icon: 'ri-megaphone-line',
      color: 'orange',
      action: 'promotions'
    }
  ]);

  const [upcomingEvents] = useState([
    {
      id: 1,
      title: 'Salon Tech Innovation 2024',
      date: '2024-02-15',
      time: '09:00',
      location: 'Paris Expo Porte de Versailles',
      type: 'Salon',
      participants: 450,
      status: 'confirmed',
      category: 'Technology',
      format: 'physical'
    },
    {
      id: 2,
      title: 'Webinaire Marketing Digital',
      date: '2024-02-18',
      time: '14:00',
      location: 'En ligne - Zoom',
      type: 'Webinaire',
      participants: 120,
      status: 'confirmed',
      category: 'Marketing',
      format: 'online'
    },
    {
      id: 3,
      title: 'Atelier Leadership Féminin',
      date: '2024-02-22',
      time: '10:00',
      location: 'Lyon Centre des Congrès',
      type: 'Atelier',
      participants: 35,
      status: 'pending',
      category: 'Leadership',
      format: 'physical'
    },
    {
      id: 4,
      title: 'Conférence Intelligence Artificielle',
      date: '2024-02-25',
      time: '13:30',
      location: 'Marseille Tech Hub',
      type: 'Conférence',
      participants: 200,
      status: 'confirmed',
      category: 'AI',
      format: 'physical'
    }
  ]);

  useEffect(() => {
    trackAction('view-events-dashboard', {
      section: 'dashboard',
      timestamp: Date.now()
    });
  }, []);

  const handleQuickAction = (action: string) => {
    trackAction('events-quick-action', { action, timestamp: Date.now() });
    // Navigation logic would go here
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'border-red-200 bg-red-50';
      case 'success': return 'border-green-200 bg-green-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      case 'reminder': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Bannière publicitaire principale */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              <i className="ri-megaphone-line mr-2"></i>
              Solutions de Gestion d'Événements Professionnels
            </h3>
            <p className="text-purple-100 mb-4">
              Optimisez vos événements avec nos outils de billetterie, marketing digital et solutions de promotion avancées
            </p>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors whitespace-nowrap">
              <i className="ri-external-link-line mr-2"></i>
              Découvrir
            </button>
          </div>
          <div className="hidden lg:block">
            <i className="ri-calendar-event-line text-6xl text-purple-200"></i>
          </div>
        </div>
      </div>

      {/* Statistiques principales - Résumé des activités */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Événements Planifiés</p>
              <p className="text-3xl font-bold text-gray-900">{stats.eventsPlanned}</p>
              <p className="text-sm text-green-600 mt-1">
                <i className="ri-arrow-up-line mr-1"></i>
                +12% ce mois
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-calendar-event-line text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Participants Inscrits</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalParticipants.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">
                <i className="ri-arrow-up-line mr-1"></i>
                +8% ce mois
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-group-line text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux de Participation</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pastEventsParticipationRate}%</p>
              <p className="text-sm text-green-600 mt-1">
                <i className="ri-arrow-up-line mr-1"></i>
                +3.2% vs événements passés
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-star-line text-yellow-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfaction Moyenne</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pastEventsSatisfaction}/5</p>
              <p className="text-sm text-green-600 mt-1">
                <i className="ri-star-line mr-1"></i>
                Excellent niveau
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-star-line text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Actions rapides */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              <i className="ri-flashlight-line text-purple-600 mr-2"></i>
              Accès Rapide
            </h3>
            <div className="space-y-3">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.action)}
                  className={`w-full p-4 rounded-lg border-2 border-dashed transition-all hover:border-solid cursor-pointer ${
                    action.color === 'blue' ? 'border-blue-300 hover:border-blue-500 hover:bg-blue-50' :
                    action.color === 'green' ? 'border-green-300 hover:border-green-500 hover:bg-green-50' :
                    action.color === 'purple' ? 'border-purple-300 hover:border-purple-500 hover:bg-purple-50' :
                    'border-orange-300 hover:border-orange-500 hover:bg-orange-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                      action.color === 'blue' ? 'bg-blue-100' :
                      action.color === 'green' ? 'bg-green-100' :
                      action.color === 'purple' ? 'bg-purple-100' :
                      'bg-orange-100'
                    }`}>
                      <i className={`${action.icon} ${
                        action.color === 'blue' ? 'text-blue-600' :
                        action.color === 'green' ? 'text-green-600' :
                        action.color === 'purple' ? 'text-purple-600' :
                        'text-orange-600'
                      }`}></i>
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-gray-900 text-sm">{action.title}</h4>
                      <p className="text-xs text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bannière publicitaire latérale */}
          <div className="mt-6 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg p-4 text-white">
            <h4 className="font-semibold mb-2">
              <i className="ri-tools-line mr-2"></i>
              Outils de Billetterie Avancés
            </h4>
            <p className="text-sm text-green-100 mb-3">
              Gérez vos inscriptions et paiements en ligne avec nos solutions intégrées
            </p>
            <button className="bg-white text-green-600 px-4 py-2 rounded text-sm font-medium hover:bg-green-50 transition-colors whitespace-nowrap">
              En savoir plus
            </button>
          </div>
        </div>

        {/* Notifications et événements à venir */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notifications - Alertes pour échéances importantes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                <i className="ri-notification-line text-purple-600 mr-2"></i>
                Notifications
              </h3>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                {notifications.filter(n => n.type === 'urgent').length} Urgent
              </span>
            </div>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${getNotificationColor(notification.type)}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <i className={`${notification.icon} text-lg ${
                        notification.type === 'urgent' ? 'text-red-600' :
                        notification.type === 'success' ? 'text-green-600' :
                        notification.type === 'info' ? 'text-blue-600' :
                        'text-yellow-600'
                      }`}></i>
                    </div>
                    <div className="ml-3 flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">Il y a {notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Événements à venir */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                <i className="ri-calendar-check-line text-purple-600 mr-2"></i>
                Événements à Venir
              </h3>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                Voir tout
              </button>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status === 'confirmed' ? 'Confirmé' : 
                           event.status === 'pending' ? 'En attente' : 'Annulé'}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <span>
                          <i className="ri-calendar-line mr-1"></i>
                          {new Date(event.date).toLocaleDateString('fr-FR')} à {event.time}
                        </span>
                        <span>
                          <i className="ri-map-pin-line mr-1"></i>
                          {event.location}
                        </span>
                        <span>
                          <i className="ri-group-line mr-1"></i>
                          {event.participants} participants
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2">
                          {event.type}
                        </span>
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mr-2">
                          {event.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          event.format === 'physical' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {event.format === 'physical' ? 'Présentiel' : 'En ligne'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bannière publicitaire en bas */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              <i className="ri-rocket-line mr-2"></i>
              Services de Marketing Digital pour Événements
            </h3>
            <p className="text-orange-100 mb-4">
              Boostez la visibilité de vos événements avec nos solutions de promotion et campagnes publicitaires ciblées
            </p>
            <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors whitespace-nowrap">
              <i className="ri-arrow-right-line mr-2"></i>
              Découvrir nos services
            </button>
          </div>
          <div className="hidden lg:block">
            <i className="ri-megaphone-line text-6xl text-orange-200"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export { EventsDashboard };
