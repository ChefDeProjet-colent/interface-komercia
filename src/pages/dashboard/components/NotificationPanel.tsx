
import Card from '../../../components/base/Card';
import Badge from '../../../components/base/Badge';

interface Notification {
  id: string;
  type: 'lead' | 'reminder' | 'commission';
  title: string;
  message: string;
  time: string;
  isNew: boolean;
}

export default function NotificationPanel() {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'lead',
      title: 'Nouveau lead disponible',
      message: 'TechCorp recherche une solution CRM - Budget: 50k€',
      time: 'Il y a 5 min',
      isNew: true
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Relance programmée',
      message: 'Contacter M. Dubois (InnovateSAS) aujourd\'hui',
      time: 'Il y a 1h',
      isNew: true
    },
    {
      id: '3',
      type: 'commission',
      title: 'Commission versée',
      message: 'Vente DataFlow Solutions - 2,500€ crédités',
      time: 'Il y a 2h',
      isNew: false
    },
    {
      id: '4',
      type: 'lead',
      title: 'Lead mis à jour',
      message: 'GreenTech a modifié ses critères de recherche',
      time: 'Il y a 3h',
      isNew: false
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'lead': return 'ri-user-star-line';
      case 'reminder': return 'ri-alarm-line';
      case 'commission': return 'ri-money-euro-circle-line';
      default: return 'ri-notification-line';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'lead': return 'text-blue-600';
      case 'reminder': return 'text-orange-600';
      case 'commission': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        <Badge variant="info">{notifications.filter(n => n.isNew).length} nouvelles</Badge>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg border transition-colors hover:bg-gray-50 cursor-pointer ${
              notification.isNew ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                notification.isNew ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <i className={`${getNotificationIcon(notification.type)} ${getNotificationColor(notification.type)}`}></i>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                  {notification.isNew && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap">
          Voir toutes les notifications
        </button>
      </div>
    </Card>
  );
}
