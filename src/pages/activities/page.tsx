
import { useState, useEffect } from 'react';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Badge from '../../components/base/Badge';
import AdBanner from '../../components/feature/AdBanner';
import { useAdManager } from '../../components/feature/AdManager';

export default function ActivitiesPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [showNewActivityModal, setShowNewActivityModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showCalendarSync, setShowCalendarSync] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'reminder',
      title: 'Rendez-vous TechCorp dans 1 heure',
      message: 'Présentation CRM prévue à 10h00',
      time: '09:00',
      priority: 'high',
      read: false
    },
    {
      id: '2',
      type: 'overdue',
      title: 'Tâche en retard',
      message: 'Préparation présentation non terminée',
      time: '08:30',
      priority: 'high',
      read: false
    },
    {
      id: '3',
      type: 'upcoming',
      title: 'Appel de suivi prévu',
      message: 'InnovateSAS - Suivi devis à 14h30',
      time: '14:00',
      priority: 'medium',
      read: true
    }
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Rendez-vous TechCorp',
      type: 'meeting',
      date: '2024-01-15',
      time: '10:00',
      duration: 60,
      leadId: '1',
      leadName: 'TechCorp Solutions',
      status: 'pending',
      priority: 'high',
      description: 'Présentation de la solution CRM Enterprise',
      location: 'Bureau client - 15 rue de la Tech, Paris',
      reminder: true,
      reminderTime: 60,
      attendees: ['jean.dupont@techcorp.com', 'marie.martin@techcorp.com']
    },
    {
      id: '2',
      title: 'Appel de suivi InnovateSAS',
      type: 'call',
      date: '2024-01-15',
      time: '14:30',
      duration: 30,
      leadId: '2',
      leadName: 'InnovateSAS',
      status: 'pending',
      priority: 'medium',
      description: 'Suivi après envoi du devis CRM Professional',
      reminder: true,
      reminderTime: 30,
      phoneNumber: '+33 1 23 45 67 89'
    },
    {
      id: '3',
      title: 'Email de relance DataFlow',
      type: 'email',
      date: '2024-01-16',
      time: '09:00',
      duration: 15,
      leadId: '3',
      leadName: 'DataFlow Analytics',
      status: 'pending',
      priority: 'medium',
      description: 'Relance pour négociation prix CRM Custom',
      reminder: false,
      emailTemplate: 'follow_up_pricing'
    },
    {
      id: '4',
      title: 'Préparation présentation TechCorp',
      type: 'task',
      date: '2024-01-14',
      time: '16:00',
      duration: 120,
      status: 'overdue',
      priority: 'high',
      description: 'Préparer slides de démonstration CRM',
      reminder: true,
      reminderTime: 120
    },
    {
      id: '5',
      title: 'Rendez-vous signature MedCare',
      type: 'meeting',
      date: '2024-01-17',
      time: '11:00',
      duration: 90,
      leadId: '5',
      leadName: 'MedCare Solutions',
      status: 'pending',
      priority: 'high',
      description: 'Signature du contrat CRM Healthcare',
      location: 'Siège MedCare - 42 avenue Médical, Lyon',
      reminder: true,
      reminderTime: 120,
      attendees: ['dr.bernard@medcare.fr', 'admin@medcare.fr']
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Recherche concurrents TechCorp',
      description: 'Analyser les solutions concurrentes pour mieux positionner notre offre CRM',
      leadId: '1',
      leadName: 'TechCorp Solutions',
      dueDate: '2024-01-16',
      priority: 'high',
      status: 'todo',
      category: 'meeting_prep',
      estimatedTime: 120,
      assignedTo: 'Moi'
    },
    {
      id: '2',
      title: 'Mise à jour CRM',
      description: 'Saisir les dernières interactions avec tous les prospects actifs',
      dueDate: '2024-01-15',
      priority: 'medium',
      status: 'overdue',
      category: 'admin',
      estimatedTime: 45,
      assignedTo: 'Moi'
    },
    {
      id: '3',
      title: 'Prospection secteur santé',
      description: 'Identifier 10 nouveaux prospects dans le secteur médical français',
      dueDate: '2024-01-18',
      priority: 'medium',
      status: 'in_progress',
      category: 'prospection',
      estimatedTime: 180,
      assignedTo: 'Moi',
      progress: 60
    },
    {
      id: '4',
      title: 'Relance GreenTech Energy',
      description: 'Appeler pour planifier un rendez-vous de qualification produit',
      leadId: '4',
      leadName: 'GreenTech Energy',
      dueDate: '2024-01-15',
      priority: 'high',
      status: 'todo',
      category: 'follow_up',
      estimatedTime: 30,
      assignedTo: 'Moi'
    },
    {
      id: '5',
      title: 'Préparation rapport mensuel',
      description: 'Compiler les résultats commerciaux du mois de janvier',
      dueDate: '2024-01-31',
      priority: 'low',
      status: 'todo',
      category: 'admin',
      estimatedTime: 90,
      assignedTo: 'Moi'
    }
  ]);

  const [calendarIntegrations] = useState([
    { name: 'Google Calendar', connected: true, lastSync: '2024-01-15 08:30' },
    { name: 'Outlook', connected: false, lastSync: null },
    { name: 'Apple Calendar', connected: false, lastSync: null }
  ]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'meeting': return 'ri-calendar-event-line';
      case 'call': return 'ri-phone-line';
      case 'email': return 'ri-mail-line';
      case 'task': return 'ri-task-line';
      case 'follow_up': return 'ri-refresh-line';
      default: return 'ri-calendar-line';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'text-blue-600 bg-blue-100';
      case 'call': return 'text-green-600 bg-green-100';
      case 'email': return 'text-purple-600 bg-purple-100';
      case 'task': return 'text-orange-600 bg-orange-100';
      case 'follow_up': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-blue-600 bg-blue-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      case 'in_progress': return 'text-orange-600 bg-orange-100';
      case 'todo': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTasksStats = () => {
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'completed').length,
      overdue: tasks.filter(t => t.status === 'overdue').length,
      today: tasks.filter(t => t.dueDate === new Date().toISOString().split('T')[0]).length
    };
  };

  const getUpcomingActivities = () => {
    const today = new Date().toISOString().split('T')[0];
    return activities.filter(activity => 
      activity.date >= today && activity.status === 'pending'
    ).slice(0, 5);
  };

  const getOverdueTasks = () => {
    return tasks.filter(task => task.status === 'overdue');
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const markTaskCompleted = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'completed' } : task
    ));
  };

  const markActivityCompleted = (activityId: string) => {
    setActivities(prev => prev.map(activity => 
      activity.id === activityId ? { ...activity, status: 'completed' } : activity
    ));
  };

  const { trackAction } = useAdManager();

  useEffect(() => {
    trackAction('view-activities');
  }, []);

  const handleScheduleActivity = () => {
    trackAction('schedule-activities');
  };

  const handleManageTask = () => {
    trackAction('manage-tasks');
  };

  const taskStats = getTasksStats();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder': return 'ri-alarm-line';
      case 'overdue': return 'ri-alarm-warning-line';
      case 'upcoming': return 'ri-calendar-event-line';
      case 'completed': return 'ri-check-line';
      default: return 'ri-notification-line';
    }
  };

  const getNotificationColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUpcomingActivitiesWithReminders = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    return activities.filter(activity => {
      if (activity.status !== 'pending') return false;
      
      const activityDateTime = new Date(`${activity.date}T${activity.time}`);
      const timeDiff = activityDateTime.getTime() - now.getTime();
      const minutesDiff = Math.floor(timeDiff / (1000 * 60));
      
      // Afficher les activités d'aujourd'hui et de demain
      return activity.date >= today && minutesDiff > -60;
    }).sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const getTasksByCategory = () => {
    const categories = {
      overdue: tasks.filter(t => t.status === 'overdue'),
      today: tasks.filter(t => t.dueDate === new Date().toISOString().split('T')[0] && t.status !== 'completed'),
      upcoming: tasks.filter(t => t.dueDate > new Date().toISOString().split('T')[0] && t.status !== 'completed'),
      completed: tasks.filter(t => t.status === 'completed')
    };
    return categories;
  };

  const generateAutomaticReminders = () => {
    const now = new Date();
    const reminders: Notification[] = [];

    activities.forEach(activity => {
      if (activity.reminder && activity.status === 'pending') {
        const activityDateTime = new Date(`${activity.date}T${activity.time}`);
        const timeDiff = activityDateTime.getTime() - now.getTime();
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));

        if (minutesDiff <= (activity.reminderTime || 60) && minutesDiff > 0) {
          reminders.push({
            id: `reminder-${activity.id}`,
            type: 'reminder',
            title: `${activity.title} dans ${minutesDiff} minutes`,
            message: activity.description || '',
            time: now.toTimeString().slice(0, 5),
            priority: activity.priority,
            read: false
          });
        }
      }
    });

    return reminders;
  };

  const syncWithExternalCalendar = (provider: string) => {
    // Simulation de synchronisation
    console.log(`Synchronisation avec ${provider}...`);
    // Ici on intégrerait l'API du calendrier externe
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const taskCategories = getTasksByCategory();
  const upcomingActivities = getUpcomingActivitiesWithReminders();
  const automaticReminders = generateAutomaticReminders();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-64 p-8">
        <div className="space-y-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Activités</h1>
            <p className="text-gray-600 mt-1">Planifiez et organisez vos tâches quotidiennes avec synchronisation calendrier</p>
          </div>

          {/* Notifications automatiques */}
          {(automaticReminders.length > 0 || notifications.filter(n => !n.read).length > 0) && (
            <Card className="mb-6 border-l-4 border-l-blue-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <i className="ri-notification-3-line text-blue-600 mr-2"></i>
                  Notifications ({notifications.filter(n => !n.read).length + automaticReminders.length})
                </h3>
                <Button variant="outline" size="sm">
                  <i className="ri-settings-line mr-1"></i>
                  Configurer
                </Button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {automaticReminders.map(reminder => (
                  <div key={reminder.id} className="flex items-start space-x-3 p-2 bg-blue-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getNotificationColor(reminder.priority)}`}>
                      <i className={`${getNotificationIcon(reminder.type)} text-sm`}></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{reminder.title}</p>
                      <p className="text-xs text-gray-600">{reminder.message}</p>
                    </div>
                    <span className="text-xs text-gray-500">{reminder.time}</span>
                  </div>
                ))}
                {notifications.filter(n => !n.read).map(notification => (
                  <div key={notification.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                       onClick={() => markNotificationAsRead(notification.id)}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getNotificationColor(notification.priority)}`}>
                      <i className={`${getNotificationIcon(notification.type)} text-sm`}></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                      <p className="text-xs text-gray-600">{notification.message}</p>
                    </div>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{upcomingActivities.length}</p>
                <p className="text-sm text-gray-600">Activités à venir</p>
                <p className="text-xs text-gray-500 mt-1">Aujourd'hui et demain</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{taskCategories.completed.length}</p>
                <p className="text-sm text-gray-600">Tâches terminées</p>
                <p className="text-xs text-gray-500 mt-1">Ce mois-ci</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{taskCategories.overdue.length}</p>
                <p className="text-sm text-gray-600">Tâches en retard</p>
                <p className="text-xs text-gray-500 mt-1">Action requise</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{taskCategories.today.length}</p>
                <p className="text-sm text-gray-600">À faire aujourd'hui</p>
                <p className="text-xs text-gray-500 mt-1">Priorité du jour</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(tasks.filter(t => t.progress).reduce((sum, t) => sum + (t.progress || 0), 0) / tasks.filter(t => t.progress).length || 0)}%
                </p>
                <p className="text-sm text-gray-600">Progression moyenne</p>
                <p className="text-xs text-gray-500 mt-1">Tâches en cours</p>
              </div>
            </Card>
          </div>

          {/* Bannière publicitaire pour outils de productivité */}
          <div className="mb-8">
            <AdBanner
              type="header"
              title="Optimisez votre Productivité Commerciale"
              description="Découvrez nos outils de gestion du temps et applications de productivité spécialement conçus pour les commerciaux performants"
              buttonText="Voir les outils"
              gradient="from-green-600 to-teal-600"
              icon="ri-time-line"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Agenda intégré */}
            <div className="lg:col-span-2">
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Agenda Intégré</h2>
                  <div className="flex items-center space-x-2">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('day')}
                        className={`px-3 py-1 rounded text-sm whitespace-nowrap ${viewMode === 'day' ? 'bg-white shadow-sm' : ''}`}
                      >
                        Jour
                      </button>
                      <button
                        onClick={() => setViewMode('week')}
                        className={`px-3 py-1 rounded text-sm whitespace-nowrap ${viewMode === 'week' ? 'bg-white shadow-sm' : ''}`}
                      >
                        Semaine
                      </button>
                      <button
                        onClick={() => setViewMode('month')}
                        className={`px-3 py-1 rounded text-sm whitespace-nowrap ${viewMode === 'month' ? 'bg-white shadow-sm' : ''}`}
                      >
                        Mois
                      </button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCalendarSync(true)}
                    >
                      <i className="ri-refresh-line mr-1"></i>
                      Sync
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => { setShowNewActivityModal(true); handleScheduleActivity(); }}
                    >
                      <i className="ri-add-line mr-1"></i>
                      Nouvelle activité
                    </Button>
                  </div>
                </div>

                {/* Navigation de date */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <i className="ri-arrow-left-line"></i>
                  </button>
                  <h3 className="text-lg font-medium">
                    {formatDate(currentDate.toISOString().split('T')[0])}
                  </h3>
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>

                {/* Synchronisation calendriers */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-900 flex items-center">
                        <i className="ri-calendar-line mr-2"></i>
                        Synchronisation Calendriers Externes
                      </h4>
                      <p className="text-sm text-blue-700 mt-1">
                        {calendarIntegrations.filter(c => c.connected).length} calendrier(s) connecté(s)
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {calendarIntegrations.map(integration => (
                        <Button
                          key={integration.name}
                          variant={integration.connected ? "primary" : "outline"}
                          size="sm"
                          onClick={() => syncWithExternalCalendar(integration.name)}
                        >
                          <i className={`ri-${integration.name.toLowerCase().includes('google') ? 'google' : integration.name.toLowerCase().includes('outlook') ? 'microsoft' : 'calendar'}-line mr-1`}></i>
                          {integration.name.split(' ')[0]}
                          {integration.connected && <i className="ri-check-line ml-1 text-green-600"></i>}
                        </Button>
                      ))}
                    </div>
                  </div>
                  {calendarIntegrations.some(c => c.connected) && (
                    <div className="mt-3 text-xs text-blue-600">
                      <i className="ri-information-line mr-1"></i>
                      Dernière synchronisation: {calendarIntegrations.find(c => c.connected)?.lastSync}
                    </div>
                  )}
                </div>

                {/* Liste des activités avec détails enrichis */}
                <div className="space-y-3">
                  {upcomingActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer"
                      onClick={() => setSelectedActivity(activity)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                            <i className={`${getActivityIcon(activity.type)} text-sm`}></i>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{activity.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                            
                            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                              <div className="space-y-1">
                                <div className="flex items-center">
                                  <i className="ri-calendar-line mr-1"></i>
                                  {new Date(activity.date).toLocaleDateString('fr-FR')}
                                </div>
                                <div className="flex items-center">
                                  <i className="ri-time-line mr-1"></i>
                                  {activity.time} ({activity.duration}min)
                                </div>
                              </div>
                              <div className="space-y-1">
                                {activity.location && (
                                  <div className="flex items-center">
                                    <i className="ri-map-pin-line mr-1"></i>
                                    <span className="truncate">{activity.location}</span>
                                  </div>
                                )}
                                {activity.leadName && (
                                  <div className="flex items-center">
                                    <i className="ri-building-line mr-1"></i>
                                    {activity.leadName}
                                  </div>
                                )}
                              </div>
                            </div>

                            {activity.attendees && activity.attendees.length > 0 && (
                              <div className="mt-2 flex items-center text-xs text-gray-500">
                                <i className="ri-group-line mr-1"></i>
                                {activity.attendees.length} participant(s)
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <Badge className={getPriorityColor(activity.priority)}>
                            {activity.priority === 'high' ? 'Haute' : activity.priority === 'medium' ? 'Moyenne' : 'Basse'}
                          </Badge>
                          {activity.reminder && (
                            <div className="flex items-center text-yellow-600">
                              <i className="ri-notification-3-line text-sm"></i>
                            </div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markActivityCompleted(activity.id);
                            }}
                            className="text-green-600 hover:text-green-700 p-1 rounded hover:bg-green-50"
                          >
                            <i className="ri-check-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {upcomingActivities.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <i className="ri-calendar-line text-4xl mb-2"></i>
                    <p>Aucune activité prévue</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => setShowNewActivityModal(true)}
                    >
                      Planifier une activité
                    </Button>
                  </div>
                )}
              </Card>

              {/* Bannière publicitaire en bas de l'agenda */}
              <div className="mt-6">
                <AdBanner
                  type="sidebar"
                  title="Applications de Gestion du Temps"
                  description="Synchronisez tous vos calendriers et optimisez votre planning commercial"
                  buttonText="Découvrir"
                  gradient="from-purple-600 to-indigo-600"
                  icon="ri-calendar-check-line"
                />
              </div>
            </div>

            {/* Tâches à réaliser avec catégories */}
            <div className="lg:col-span-1">
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Tâches à Réaliser</h2>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => { setShowNewTaskModal(true); handleManageTask(); }}
                  >
                    <i className="ri-add-line mr-1"></i>
                    Nouvelle tâche
                  </Button>
                </div>

                {/* Filtres de tâches avec compteurs */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center">
                      Toutes <span className="ml-1 bg-blue-200 px-1 rounded">{tasks.length}</span>
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      À faire
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      En cours
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      En retard
                    </button>
                  </div>
                </div>

                {/* Tâches en retard (priorité) */}
                {taskCategories.overdue.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-red-700 mb-3 flex items-center">
                      <i className="ri-alarm-warning-line mr-1"></i>
                      Tâches en retard ({taskCategories.overdue.length})
                    </h4>
                    <div className="space-y-2">
                      {taskCategories.overdue.map((task) => (
                        <div key={task.id} className="p-3 border border-red-200 bg-red-50 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-gray-900 text-sm">{task.title}</h5>
                            <Badge className="bg-red-100 text-red-700">En retard</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{task.description}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-red-600">
                              <i className="ri-calendar-line mr-1"></i>
                              Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                            </span>
                            <button
                              onClick={() => markTaskCompleted(task.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <i className="ri-check-line"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tâches du jour */}
                {taskCategories.today.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-orange-700 mb-3 flex items-center">
                      <i className="ri-today-line mr-1"></i>
                      À faire aujourd'hui ({taskCategories.today.length})
                    </h4>
                    <div className="space-y-2">
                      {taskCategories.today.map((task) => (
                        <div key={task.id} className="p-3 border border-orange-200 bg-orange-50 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-gray-900 text-sm">{task.title}</h5>
                            <Badge className={getStatusColor(task.status)}>
                              {task.status === 'todo' ? 'À faire' : 'En cours'}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{task.description}</p>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-500">
                                <i className="ri-time-line mr-1"></i>
                                {task.estimatedTime}min
                              </span>
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                              </Badge>
                            </div>
                            <button
                              onClick={() => markTaskCompleted(task.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <i className="ri-check-line"></i>
                            </button>
                          </div>
                          {task.progress && (
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progression</span>
                                <span>{task.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1">
                                <div
                                  className="bg-orange-600 h-1 rounded-full"
                                  style={{ width: `${task.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tâches à venir */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <i className="ri-calendar-todo-line mr-1"></i>
                    Prochaines tâches ({taskCategories.upcoming.length})
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {taskCategories.upcoming.slice(0, 5).map((task) => (
                      <div key={task.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium text-gray-900 text-sm">{task.title}</h5>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status === 'todo' ? 'À faire' : 'En cours'}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{task.description}</p>
                        
                        {task.leadName && (
                          <p className="text-xs text-blue-600 mb-2">
                            <i className="ri-building-line mr-1"></i>
                            {task.leadName}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-500">
                              <i className="ri-calendar-line mr-1"></i>
                              {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                            </span>
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <span className="text-gray-500">{task.estimatedTime}min</span>
                            <button
                              onClick={() => markTaskCompleted(task.id)}
                              className="text-green-600 hover:text-green-700 p-1 rounded hover:bg-green-50"
                            >
                              <i className="ri-check-line"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Bannière publicitaire verticale pour applications de productivité */}
              <div className="mt-6">
                <AdBanner
                  type="sidebar"
                  title="Apps Productivité Mobile"
                  description="Gérez vos tâches en déplacement avec nos applications mobiles"
                  buttonText="Télécharger"
                  gradient="from-purple-600 to-indigo-600"
                  icon="ri-smartphone-line"
                />
              </div>
            </div>
          </div>

          {/* Actions rapides enrichies */}
          <Card className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="primary" className="flex items-center justify-center whitespace-nowrap">
                <i className="ri-calendar-event-line mr-2"></i>
                Planifier RDV
              </Button>
              <Button variant="outline" className="flex items-center justify-center whitespace-nowrap">
                <i className="ri-phone-line mr-2"></i>
                Programmer appel
              </Button>
              <Button variant="outline" className="flex items-center justify-center whitespace-nowrap">
                <i className="ri-mail-line mr-2"></i>
                Envoyer email
              </Button>
              <Button variant="outline" className="flex items-center justify-center whitespace-nowrap">
                <i className="ri-task-line mr-2"></i>
                Créer tâche
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Button variant="outline" className="flex items-center justify-center whitespace-nowrap">
                <i className="ri-calendar-check-line mr-2"></i>
                Synchroniser calendriers
              </Button>
              <Button variant="outline" className="flex items-center justify-center whitespace-nowrap">
                <i className="ri-notification-3-line mr-2"></i>
                Configurer rappels
              </Button>
              <Button variant="outline" className="flex items-center justify-center whitespace-nowrap">
                <i className="ri-file-download-line mr-2"></i>
                Exporter planning
              </Button>
            </div>
          </Card>

          {/* Bannière publicitaire finale pour formations */}
          <div className="mt-8">
            <AdBanner
              type="footer"
              title="Formations Gestion du Temps pour Commerciaux"
              description="Maîtrisez les techniques de productivité et d'organisation pour maximiser vos performances commerciales"
              buttonText="S'inscrire aux formations"
              gradient="from-orange-600 to-red-600"
              icon="ri-graduation-cap-line"
            />
          </div>

          {/* Modal nouvelle activité */}
          {showNewActivityModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Nouvelle Activité</h3>
                  <button
                    onClick={() => setShowNewActivityModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Titre de l'activité"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-8">
                      <option value="meeting">Rendez-vous</option>
                      <option value="call">Appel</option>
                      <option value="email">Email</option>
                      <option value="task">Tâche</option>
                      <option value="follow_up">Relance</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                      <input
                        type="time"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      rows={3}
                      placeholder="Description de l'activité"
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="reminder" className="rounded" />
                    <label htmlFor="reminder" className="text-sm text-gray-700">Activer le rappel</label>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowNewActivityModal(false)}
                      className="flex-1"
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setShowNewActivityModal(false)}
                      className="flex-1"
                    >
                      Créer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal nouvelle tâche */}
          {showNewTaskModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Nouvelle Tâche</h3>
                  <button
                    onClick={() => setShowNewTaskModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Titre de la tâche"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      rows={3}
                      placeholder="Description de la tâche"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-8">
                      <option value="prospection">Prospection</option>
                      <option value="follow_up">Suivi</option>
                      <option value="admin">Administration</option>
                      <option value="meeting_prep">Préparation RDV</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Échéance</label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-8">
                        <option value="low">Basse</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Haute</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowNewTaskModal(false)}
                      className="flex-1"
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setShowNewTaskModal(false)}
                      className="flex-1"
                    >
                      Créer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal détails activité */}
          {selectedActivity && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{selectedActivity.title}</h3>
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(selectedActivity.type)}`}>
                      <i className={`${getActivityIcon(selectedActivity.type)} text-sm`}></i>
                    </div>
                    <div>
                      <p className="font-medium">{selectedActivity.type === 'meeting' ? 'Rendez-vous' : 
                        selectedActivity.type === 'call' ? 'Appel' :
                        selectedActivity.type === 'email' ? 'Email' :
                        selectedActivity.type === 'task' ? 'Tâche' : 'Relance'}</p>
                      <p className="text-sm text-gray-600">{selectedActivity.date} à {selectedActivity.time}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Description</p>
                    <p className="text-gray-900">{selectedActivity.description}</p>
                  </div>
                  
                  {selectedActivity.leadName && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Lead associé</p>
                      <p className="text-gray-900">{selectedActivity.leadName}</p>
                    </div>
                  )}
                  
                  {selectedActivity.location && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Lieu</p>
                      <p className="text-gray-900">{selectedActivity.location}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <Badge className={getPriorityColor(selectedActivity.priority)}>
                      Priorité {selectedActivity.priority === 'high' ? 'Haute' : selectedActivity.priority === 'medium' ? 'Moyenne' : 'Basse'}
                    </Badge>
                    {selectedActivity.reminder && (
                      <div className="flex items-center text-yellow-600">
                        <i className="ri-notification-3-line mr-1"></i>
                        <span className="text-sm">Rappel activé</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedActivity(null)}
                      className="flex-1"
                    >
                      Fermer
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        markActivityCompleted(selectedActivity.id);
                        setSelectedActivity(null);
                      }}
                      className="flex-1"
                    >
                      Marquer terminé
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bannière publicitaire pour outils de productivité */}
          <AdBanner 
            position="activities-main" 
            format="banner"
            section="activities"
            className="mb-6"
          />

        </div>
      </div>
    </div>
  );
}

// Types
interface Activity {
  id: string;
  title: string;
  type: 'meeting' | 'call' | 'email' | 'task' | 'follow_up';
  date: string;
  time: string;
  duration: number;
  leadId?: string;
  leadName?: string;
  status: 'pending' | 'completed' | 'cancelled' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  description?: string;
  location?: string;
  reminder: boolean;
  reminderTime?: number;
  attendees?: string[];
  phoneNumber?: string;
  emailTemplate?: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  leadId?: string;
  leadName?: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'completed' | 'overdue';
  category: 'prospection' | 'follow_up' | 'admin' | 'meeting_prep';
  estimatedTime?: number;
  assignedTo?: string;
  progress?: number;
}

interface Notification {
  id: string;
  type: 'reminder' | 'overdue' | 'upcoming' | 'completed';
  title: string;
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
}
