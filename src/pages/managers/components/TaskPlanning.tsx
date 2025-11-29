import { useState, useEffect } from 'react';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';
import Badge from '../../../components/base/Badge';
import AdBanner from '../../../components/feature/AdBanner';
import { useAdManager } from '../../../components/feature/AdManager';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedToName: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  dueDate: string;
  dueTime: string;
  category: 'prospection' | 'follow_up' | 'meeting' | 'admin' | 'training' | 'reporting';
  createdBy: string;
  createdAt: string;
  completedAt?: string;
  estimatedDuration: number; // en minutes
  tags: string[];
  notes?: string;
}

interface Commercial {
  id: string;
  name: string;
  zone: string;
  sector: string;
  workload: number; // pourcentage de charge de travail
  availability: 'available' | 'busy' | 'unavailable';
}

export default function TaskPlanning() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Prospection secteur technologie',
      description: 'Identifier et contacter 15 nouveaux prospects dans le secteur technologique',
      assignedTo: 'sophie-martin',
      assignedToName: 'Sophie Martin',
      priority: 'high',
      status: 'in_progress',
      dueDate: '2024-01-18',
      dueTime: '17:00',
      category: 'prospection',
      createdBy: 'Manager',
      createdAt: '2024-01-15',
      estimatedDuration: 240,
      tags: ['technologie', 'b2b', 'prospection']
    },
    {
      id: '2',
      title: 'Suivi leads TechCorp',
      description: 'Relancer les 5 leads chauds de TechCorp et planifier les rendez-vous',
      assignedTo: 'marc-dubois',
      assignedToName: 'Marc Dubois',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-01-16',
      dueTime: '14:00',
      category: 'follow_up',
      createdBy: 'Manager',
      createdAt: '2024-01-14',
      estimatedDuration: 120,
      tags: ['techcorp', 'leads-chauds', 'rdv']
    },
    {
      id: '3',
      title: 'Préparation présentation client',
      description: 'Préparer la présentation pour le client MedCare Solutions',
      assignedTo: 'julie-rousseau',
      assignedToName: 'Julie Rousseau',
      priority: 'medium',
      status: 'completed',
      dueDate: '2024-01-15',
      dueTime: '10:00',
      category: 'meeting',
      createdBy: 'Manager',
      createdAt: '2024-01-13',
      completedAt: '2024-01-15',
      estimatedDuration: 180,
      tags: ['medcare', 'présentation', 'client']
    },
    {
      id: '4',
      title: 'Rapport mensuel activités',
      description: 'Rédiger le rapport mensuel des activités commerciales',
      assignedTo: 'thomas-leroy',
      assignedToName: 'Thomas Leroy',
      priority: 'medium',
      status: 'overdue',
      dueDate: '2024-01-14',
      dueTime: '18:00',
      category: 'reporting',
      createdBy: 'Manager',
      createdAt: '2024-01-10',
      estimatedDuration: 90,
      tags: ['rapport', 'mensuel', 'activités']
    },
    {
      id: '5',
      title: 'Formation CRM avancé',
      description: 'Suivre la formation sur les fonctionnalités avancées du CRM',
      assignedTo: 'emma-moreau',
      assignedToName: 'Emma Moreau',
      priority: 'low',
      status: 'pending',
      dueDate: '2024-01-20',
      dueTime: '09:00',
      category: 'training',
      createdBy: 'Manager',
      createdAt: '2024-01-15',
      estimatedDuration: 300,
      tags: ['formation', 'crm', 'avancé']
    },
    {
      id: '6',
      title: 'Mise à jour base prospects',
      description: 'Nettoyer et mettre à jour la base de données prospects',
      assignedTo: 'pierre-durand',
      assignedToName: 'Pierre Durand',
      priority: 'medium',
      status: 'in_progress',
      dueDate: '2024-01-17',
      dueTime: '16:00',
      category: 'admin',
      createdBy: 'Manager',
      createdAt: '2024-01-14',
      estimatedDuration: 150,
      tags: ['base-données', 'prospects', 'nettoyage']
    }
  ]);

  const [commercials] = useState<Commercial[]>([
    { id: 'sophie-martin', name: 'Sophie Martin', zone: 'Paris Nord', sector: 'Technologie', workload: 85, availability: 'busy' },
    { id: 'marc-dubois', name: 'Marc Dubois', zone: 'Lyon Centre', sector: 'Retail', workload: 70, availability: 'available' },
    { id: 'julie-rousseau', name: 'Julie Rousseau', zone: 'Marseille Sud', sector: 'Services', workload: 60, availability: 'available' },
    { id: 'thomas-leroy', name: 'Thomas Leroy', zone: 'Toulouse Ouest', sector: 'Industrie', workload: 90, availability: 'busy' },
    { id: 'emma-moreau', name: 'Emma Moreau', zone: 'Paris Sud', sector: 'Santé', workload: 45, availability: 'available' },
    { id: 'pierre-durand', name: 'Pierre Durand', zone: 'Nice Est', sector: 'Immobilier', workload: 30, availability: 'available' }
  ]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    dueDate: '',
    dueTime: '',
    category: 'prospection' as Task['category'],
    estimatedDuration: 60,
    tags: [] as string[]
  });

  const { trackAction } = useAdManager();

  useEffect(() => {
    trackAction('view-task-planning');
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'prospection': return 'ri-search-line';
      case 'follow_up': return 'ri-refresh-line';
      case 'meeting': return 'ri-calendar-event-line';
      case 'admin': return 'ri-file-list-line';
      case 'training': return 'ri-graduation-cap-line';
      case 'reporting': return 'ri-bar-chart-line';
      default: return 'ri-task-line';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-orange-600 bg-orange-100';
      case 'unavailable': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getWorkloadColor = (workload: number) => {
    if (workload >= 90) return 'bg-red-500';
    if (workload >= 70) return 'bg-orange-500';
    if (workload >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      if (filterStatus !== 'all' && task.status !== filterStatus) return false;
      if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
      if (filterAssignee !== 'all' && task.assignedTo !== filterAssignee) return false;
      return true;
    });
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in_progress').length;
    const overdue = tasks.filter(t => t.status === 'overdue').length;
    const pending = tasks.filter(t => t.status === 'pending').length;

    return { total, completed, inProgress, overdue, pending };
  };

  const getUpcomingTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return tasks.filter(task => 
      task.dueDate >= today && (task.status === 'pending' || task.status === 'in_progress')
    ).slice(0, 5);
  };

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.assignedTo || !newTask.dueDate) return;

    const assignedCommercial = commercials.find(c => c.id === newTask.assignedTo);
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      assignedTo: newTask.assignedTo,
      assignedToName: assignedCommercial?.name || '',
      priority: newTask.priority,
      status: 'pending',
      dueDate: newTask.dueDate,
      dueTime: newTask.dueTime,
      category: newTask.category,
      createdBy: 'Manager',
      createdAt: new Date().toISOString().split('T')[0],
      estimatedDuration: newTask.estimatedDuration,
      tags: newTask.tags
    };

    setTasks(prev => [task, ...prev]);
    setShowNewTaskModal(false);
    setNewTask({
      title: '',
      description: '',
      assignedTo: '',
      priority: 'medium',
      dueDate: '',
      dueTime: '',
      category: 'prospection',
      estimatedDuration: 60,
      tags: []
    });
    
    trackAction('create-task');
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: newStatus,
            completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined
          }
        : task
    ));
    
    trackAction('update-task-status');
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`;
    }
    return `${mins}min`;
  };

  const taskStats = getTaskStats();
  const filteredTasks = getFilteredTasks();

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Planification des Tâches</h2>
          <p className="text-gray-600 mt-1">Organisez et répartissez les tâches entre vos commerciaux</p>
        </div>
        <Button
          variant="primary"
          onClick={() => { setShowNewTaskModal(true); trackAction('open-new-task-modal'); }}
        >
          <i className="ri-add-line mr-2"></i>
          Nouvelle tâche
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{taskStats.total}</p>
            <p className="text-sm text-gray-600">Total tâches</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{taskStats.completed}</p>
            <p className="text-sm text-gray-600">Terminées</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{taskStats.inProgress}</p>
            <p className="text-sm text-gray-600">En cours</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{taskStats.pending}</p>
            <p className="text-sm text-gray-600">En attente</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{taskStats.overdue}</p>
            <p className="text-sm text-gray-600">En retard</p>
          </div>
        </Card>
      </div>

      {/* Alertes pour tâches en retard */}
      {taskStats.overdue > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center mb-2">
            <i className="ri-alarm-warning-line text-red-600 mr-2"></i>
            <h3 className="font-semibold text-red-800">Tâches en retard</h3>
          </div>
          <div className="space-y-1">
            {tasks.filter(t => t.status === 'overdue').map(task => (
              <p key={task.id} className="text-sm text-red-700">
                <strong>{task.title}</strong> - Assignée à {task.assignedToName} - Échéance: {task.dueDate}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section principale des tâches */}
        <div className="lg:col-span-3">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Gestion des Tâches</h3>
              <div className="flex items-center space-x-2">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1 rounded text-sm ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <i className="ri-list-check mr-1"></i>
                    Liste
                  </button>
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`px-3 py-1 rounded text-sm ${viewMode === 'calendar' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <i className="ri-calendar-line mr-1"></i>
                    Calendrier
                  </button>
                </div>
              </div>
            </div>

            {/* Filtres */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-8"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="in_progress">En cours</option>
                    <option value="completed">Terminées</option>
                    <option value="overdue">En retard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                  <select 
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-8"
                  >
                    <option value="all">Toutes priorités</option>
                    <option value="high">Haute</option>
                    <option value="medium">Moyenne</option>
                    <option value="low">Basse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commercial</label>
                  <select 
                    value={filterAssignee}
                    onChange={(e) => setFilterAssignee(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm pr-8"
                  >
                    <option value="all">Tous les commerciaux</option>
                    {commercials.map(commercial => (
                      <option key={commercial.id} value={commercial.id}>
                        {commercial.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilterStatus('all');
                      setFilterPriority('all');
                      setFilterAssignee('all');
                    }}
                    className="w-full"
                  >
                    <i className="ri-refresh-line mr-1"></i>
                    Réinitialiser
                  </Button>
                </div>
              </div>
            </div>

            {/* Vue Liste */}
            {viewMode === 'list' && (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setShowTaskDetails(task)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getPriorityColor(task.priority)}`}>
                          <i className={`${getCategoryIcon(task.category)} text-sm`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-gray-900">{task.title}</h4>
                            <Badge className={getStatusColor(task.status)}>
                              {task.status === 'pending' ? 'En attente' :
                               task.status === 'in_progress' ? 'En cours' :
                               task.status === 'completed' ? 'Terminée' : 'En retard'}
                            </Badge>
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority === 'high' ? 'Haute' : 
                               task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>
                              <i className="ri-user-line mr-1"></i>
                              {task.assignedToName}
                            </span>
                            <span>
                              <i className="ri-calendar-line mr-1"></i>
                              {formatDate(task.dueDate)} à {task.dueTime}
                            </span>
                            <span>
                              <i className="ri-time-line mr-1"></i>
                              {formatDuration(task.estimatedDuration)}
                            </span>
                          </div>
                          {task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {task.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {task.status !== 'completed' && (
                          <div className="flex space-x-1">
                            {task.status === 'pending' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUpdateTaskStatus(task.id, 'in_progress');
                                }}
                                className="text-blue-600 hover:text-blue-700 p-1"
                                title="Démarrer"
                              >
                                <i className="ri-play-line"></i>
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateTaskStatus(task.id, 'completed');
                              }}
                              className="text-green-600 hover:text-green-700 p-1"
                              title="Marquer terminé"
                            >
                              <i className="ri-check-line"></i>
                            </button>
                          </div>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTask(task);
                          }}
                          className="text-gray-600 hover:text-gray-700 p-1"
                          title="Modifier"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Vue Calendrier */}
            {viewMode === 'calendar' && (
              <div className="space-y-4">
                {/* Navigation calendrier */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000))}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <i className="ri-arrow-left-line"></i>
                  </button>
                  <h3 className="text-lg font-medium">
                    {currentDate.toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </h3>
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000))}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>

                {/* Synchronisation calendriers */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-900">Synchronisation calendriers</h4>
                      <p className="text-sm text-blue-700">Connectez Google Calendar ou Outlook pour synchroniser vos tâches</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <i className="ri-google-line mr-1"></i>
                        Google Calendar
                      </Button>
                      <Button variant="outline" size="sm">
                        <i className="ri-microsoft-line mr-1"></i>
                        Outlook
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Grille calendrier simplifiée */}
                <div className="grid grid-cols-7 gap-2">
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                    <div key={day} className="p-2 text-center font-medium text-gray-700 bg-gray-50 rounded">
                      {day}
                    </div>
                  ))}
                  
                  {/* Jours du mois avec tâches */}
                  {Array.from({ length: 31 }, (_, i) => {
                    const day = i + 1;
                    const dayTasks = filteredTasks.filter(task => {
                      const taskDate = new Date(task.dueDate);
                      return taskDate.getDate() === day;
                    });
                    
                    return (
                      <div key={day} className="p-2 border border-gray-200 rounded min-h-[80px]">
                        <div className="font-medium text-sm text-gray-900 mb-1">{day}</div>
                        <div className="space-y-1">
                          {dayTasks.slice(0, 2).map(task => (
                            <div
                              key={task.id}
                              className={`text-xs p-1 rounded cursor-pointer ${getStatusColor(task.status)}`}
                              onClick={() => setShowTaskDetails(task)}
                              title={task.title}
                            >
                              {task.title.substring(0, 15)}...
                            </div>
                          ))}
                          {dayTasks.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{dayTasks.length - 2} autres
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>

          {/* Bannière publicitaire pour outils de gestion de projet */}
          <div className="mt-6">
            <AdBanner
              position="task-planning-main"
              format="banner"
              section="task-planning"
              className="mb-6"
            />
          </div>
        </div>

        {/* Sidebar avec charge de travail des commerciaux */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Charge de Travail</h3>
            <div className="space-y-4">
              {commercials.map((commercial) => {
                const commercialTasks = tasks.filter(t => 
                  t.assignedTo === commercial.id && 
                  (t.status === 'pending' || t.status === 'in_progress')
                );
                
                return (
                  <div key={commercial.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm text-gray-900">{commercial.name}</h4>
                      <Badge className={getAvailabilityColor(commercial.availability)}>
                        {commercial.availability === 'available' ? 'Disponible' :
                         commercial.availability === 'busy' ? 'Occupé' : 'Indisponible'}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2">{commercial.zone} - {commercial.sector}</p>
                    
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Charge de travail</span>
                        <span>{commercial.workload}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getWorkloadColor(commercial.workload)}`}
                          style={{ width: `${Math.min(commercial.workload, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-600">
                      <span className="font-medium">{commercialTasks.length}</span> tâches actives
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Tâches à venir */}
          <Card className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tâches à Venir</h3>
            <div className="space-y-3">
              {getUpcomingTasks().map((task) => (
                <div key={task.id} className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-sm text-gray-900 mb-1">{task.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{task.assignedToName}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {formatDate(task.dueDate)}
                    </span>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority === 'high' ? 'Haute' : 
                       task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Bannière publicitaire verticale */}
          <div className="mt-6">
            <AdBanner
              position="task-planning-sidebar"
              format="animated"
              section="task-planning"
            />
          </div>
        </div>
      </div>

      {/* Modal nouvelle tâche */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Créer une Nouvelle Tâche</h3>
              <button
                onClick={() => setShowNewTaskModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre de la tâche</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Prospection secteur technologie"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Décrivez la tâche en détail..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigner à</label>
                  <select 
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask(prev => ({ ...prev, assignedTo: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                  >
                    <option value="">Sélectionner un commercial</option>
                    {commercials.map(commercial => (
                      <option key={commercial.id} value={commercial.id}>
                        {commercial.name} ({commercial.zone})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <select 
                    value={newTask.category}
                    onChange={(e) => setNewTask(prev => ({ ...prev, category: e.target.value as Task['category'] }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                  >
                    <option value="prospection">Prospection</option>
                    <option value="follow_up">Suivi</option>
                    <option value="meeting">Rendez-vous</option>
                    <option value="admin">Administration</option>
                    <option value="training">Formation</option>
                    <option value="reporting">Rapport</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                  <select 
                    value={newTask.priority}
                    onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as 'high' | 'medium' | 'low' }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durée estimée (minutes)</label>
                  <input
                    type="number"
                    value={newTask.estimatedDuration}
                    onChange={(e) => setNewTask(prev => ({ ...prev, estimatedDuration: parseInt(e.target.value) || 60 }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="15"
                    step="15"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date d'échéance</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heure d'échéance</label>
                  <input
                    type="time"
                    value={newTask.dueTime}
                    onChange={(e) => setNewTask(prev => ({ ...prev, dueTime: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowNewTaskModal(false)}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  variant="primary"
                  onClick={handleCreateTask}
                  className="flex-1"
                  disabled={!newTask.title || !newTask.assignedTo || !newTask.dueDate}
                >
                  Créer la tâche
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal détails tâche */}
      {showTaskDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">{showTaskDetails.title}</h3>
              <button
                onClick={() => setShowTaskDetails(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getPriorityColor(showTaskDetails.priority)}`}>
                  <i className={`${getCategoryIcon(showTaskDetails.category)} text-lg`}></i>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge className={getStatusColor(showTaskDetails.status)}>
                      {showTaskDetails.status === 'pending' ? 'En attente' :
                       showTaskDetails.status === 'in_progress' ? 'En cours' :
                       showTaskDetails.status === 'completed' ? 'Terminée' : 'En retard'}
                    </Badge>
                    <Badge className={getPriorityColor(showTaskDetails.priority)}>
                      Priorité {showTaskDetails.priority === 'high' ? 'Haute' : 
                                showTaskDetails.priority === 'medium' ? 'Moyenne' : 'Basse'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {showTaskDetails.category === 'prospection' ? 'Prospection' :
                     showTaskDetails.category === 'follow_up' ? 'Suivi' :
                     showTaskDetails.category === 'meeting' ? 'Rendez-vous' :
                     showTaskDetails.category === 'admin' ? 'Administration' :
                     showTaskDetails.category === 'training' ? 'Formation' : 'Rapport'}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700">{showTaskDetails.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Assignée à</h4>
                  <p className="text-gray-700">{showTaskDetails.assignedToName}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Durée estimée</h4>
                  <p className="text-gray-700">{formatDuration(showTaskDetails.estimatedDuration)}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Échéance</h4>
                  <p className="text-gray-700">{formatDate(showTaskDetails.dueDate)} à {showTaskDetails.dueTime}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Créée le</h4>
                  <p className="text-gray-700">{formatDate(showTaskDetails.createdAt)}</p>
                </div>
              </div>
              
              {showTaskDetails.tags.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {showTaskDetails.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {showTaskDetails.completedAt && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Terminée le</h4>
                  <p className="text-green-700">{formatDate(showTaskDetails.completedAt)}</p>
                </div>
              )}
              
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowTaskDetails(null)}
                  className="flex-1"
                >
                  Fermer
                </Button>
                {showTaskDetails.status !== 'completed' && (
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleUpdateTaskStatus(showTaskDetails.id, 'completed');
                      setShowTaskDetails(null);
                    }}
                    className="flex-1"
                  >
                    Marquer terminée
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { TaskPlanning };
