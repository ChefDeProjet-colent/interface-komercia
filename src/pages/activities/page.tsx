import { useState } from 'react';
import { Sidebar } from '../../components/feature/Sidebar';

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState<'agenda' | 'tasks' | 'objectives'>('agenda');
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showObjectiveModal, setShowObjectiveModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState<any>(null);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [editingObjective, setEditingObjective] = useState<any>(null);

  // Filtres
  const [agendaFilters, setAgendaFilters] = useState({
    type: 'Tous',
    priority: 'Tous',
    status: 'Tous',
    client: ''
  });

  const [taskFilters, setTaskFilters] = useState({
    category: 'Tous',
    priority: 'Tous',
    status: 'Tous'
  });

  const [objectiveFilters, setObjectiveFilters] = useState({
    type: 'Tous',
    status: 'Tous'
  });

  const [activities, setActivities] = useState([
    {
      id: '1',
      type: 'Rendez-vous',
      title: 'RDV avec TechCorp',
      description: 'Présentation de nos solutions SaaS',
      date: '2024-01-15',
      time: '09:00',
      duration: '1h30',
      location: 'Visioconférence',
      status: 'Planifié',
      priority: 'Haute',
      client: 'TechCorp',
      reminder: '30 min avant'
    },
    {
      id: '2',
      type: 'Appel',
      title: 'Appel de suivi - InnovateLab',
      description: 'Suivi de la proposition commerciale envoyée',
      date: '2024-01-15',
      time: '14:00',
      duration: '30min',
      status: 'Planifié',
      priority: 'Moyenne',
      client: 'InnovateLab',
      reminder: '15 min avant'
    },
    {
      id: '3',
      type: 'Email',
      title: 'Envoi proposition - DataFlow',
      description: 'Envoyer la proposition commerciale détaillée',
      date: '2024-01-15',
      time: '16:00',
      status: 'Planifié',
      priority: 'Haute',
      client: 'DataFlow',
      reminder: '1h avant'
    },
    {
      id: '4',
      type: 'Rendez-vous',
      title: 'Démo produit - CloudSystems',
      description: 'Démonstration complète de la plateforme',
      date: '2024-01-16',
      time: '10:00',
      duration: '2h',
      location: 'Bureaux client - Paris',
      status: 'Planifié',
      priority: 'Haute',
      client: 'CloudSystems',
      reminder: '1h avant'
    },
    {
      id: '5',
      type: 'Appel',
      title: 'Prospection - DigitalWave',
      description: 'Premier contact avec le directeur commercial',
      date: '2024-01-16',
      time: '15:00',
      duration: '45min',
      status: 'Planifié',
      priority: 'Moyenne',
      client: 'DigitalWave',
      reminder: '30 min avant'
    },
    {
      id: '6',
      type: 'Rendez-vous',
      title: 'Négociation contrat - SmartBiz',
      description: 'Discussion des termes du contrat annuel',
      date: '2024-01-17',
      time: '11:00',
      duration: '1h',
      location: 'Visioconférence',
      status: 'Planifié',
      priority: 'Haute',
      client: 'SmartBiz',
      reminder: '30 min avant'
    },
    {
      id: '7',
      type: 'Email',
      title: 'Relance - TechVision',
      description: 'Relance suite à la proposition envoyée il y a 1 semaine',
      date: '2024-01-17',
      time: '14:30',
      status: 'Planifié',
      priority: 'Moyenne',
      client: 'TechVision',
      reminder: '15 min avant'
    },
    {
      id: '8',
      type: 'Rendez-vous',
      title: 'Signature contrat - GlobalTech',
      description: 'Finalisation et signature du contrat',
      date: '2024-01-18',
      time: '09:30',
      duration: '1h',
      location: 'Bureaux GlobalTech',
      status: 'Planifié',
      priority: 'Haute',
      client: 'GlobalTech',
      reminder: '1h avant'
    },
    {
      id: '9',
      type: 'Appel',
      title: 'Suivi client - EcoSolutions',
      description: 'Point mensuel avec le client',
      date: '2024-01-18',
      time: '16:00',
      duration: '30min',
      status: 'Planifié',
      priority: 'Basse',
      client: 'EcoSolutions',
      reminder: '30 min avant'
    },
    {
      id: '10',
      type: 'Rendez-vous',
      title: 'Formation client - MediaPlus',
      description: 'Formation à l\'utilisation de la plateforme',
      date: '2024-01-19',
      time: '10:00',
      duration: '3h',
      location: 'Bureaux client',
      status: 'Planifié',
      priority: 'Moyenne',
      client: 'MediaPlus',
      reminder: '1h avant'
    },
    {
      id: '11',
      type: 'Email',
      title: 'Proposition - StartupHub',
      description: 'Envoi de la proposition personnalisée',
      date: '2024-01-19',
      time: '15:00',
      status: 'Planifié',
      priority: 'Haute',
      client: 'StartupHub',
      reminder: '30 min avant'
    },
    {
      id: '12',
      type: 'Appel',
      title: 'Qualification lead - InnoTech',
      description: 'Qualifier le besoin et le budget',
      date: '2024-01-22',
      time: '09:00',
      duration: '45min',
      status: 'Planifié',
      priority: 'Moyenne',
      client: 'InnoTech',
      reminder: '15 min avant'
    },
    {
      id: '13',
      type: 'Rendez-vous',
      title: 'RDV stratégique - MegaCorp',
      description: 'Discussion partenariat stratégique',
      date: '2024-01-22',
      time: '14:00',
      duration: '2h',
      location: 'Siège MegaCorp',
      status: 'Planifié',
      priority: 'Haute',
      client: 'MegaCorp',
      reminder: '1h avant'
    },
    {
      id: '14',
      type: 'Email',
      title: 'Devis - QuickStart',
      description: 'Envoi du devis détaillé',
      date: '2024-01-23',
      time: '10:00',
      status: 'Planifié',
      priority: 'Haute',
      client: 'QuickStart',
      reminder: '30 min avant'
    },
    {
      id: '15',
      type: 'Appel',
      title: 'Relance - FutureTech',
      description: 'Relance après démo produit',
      date: '2024-01-23',
      time: '16:30',
      duration: '30min',
      status: 'Planifié',
      priority: 'Moyenne',
      client: 'FutureTech',
      reminder: '15 min avant'
    }
  ]);

  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Préparer présentation TechCorp',
      description: 'Créer slides de présentation personnalisées',
      category: 'Préparation',
      priority: 'Haute',
      dueDate: '2024-01-14',
      status: 'En retard',
      progress: 60,
      estimatedTime: '3h'
    },
    {
      id: '2',
      title: 'Finaliser proposition DataFlow',
      description: 'Compléter la proposition commerciale avec les tarifs',
      category: 'Prospection',
      priority: 'Haute',
      dueDate: '2024-01-15',
      status: 'En cours',
      progress: 75,
      estimatedTime: '2h'
    },
    {
      id: '3',
      title: 'Relancer 5 prospects inactifs',
      description: 'Envoyer emails de relance personnalisés',
      category: 'Suivi',
      priority: 'Moyenne',
      dueDate: '2024-01-15',
      status: 'À faire',
      progress: 0,
      estimatedTime: '1h30'
    },
    {
      id: '4',
      title: 'Mettre à jour CRM',
      description: 'Saisir les comptes-rendus des RDV de la semaine',
      category: 'Admin',
      priority: 'Basse',
      dueDate: '2024-01-15',
      status: 'À faire',
      progress: 0,
      estimatedTime: '1h'
    },
    {
      id: '5',
      title: 'Préparer démo CloudSystems',
      description: 'Configurer environnement de démo personnalisé',
      category: 'Préparation',
      priority: 'Haute',
      dueDate: '2024-01-16',
      status: 'En cours',
      progress: 40,
      estimatedTime: '4h'
    },
    {
      id: '6',
      title: 'Recherche prospects secteur santé',
      description: 'Identifier 20 nouveaux prospects dans le secteur santé',
      category: 'Prospection',
      priority: 'Moyenne',
      dueDate: '2024-01-16',
      status: 'À faire',
      progress: 0,
      estimatedTime: '2h'
    },
    {
      id: '7',
      title: 'Analyser besoins DigitalWave',
      description: 'Étudier le site et les besoins avant l\'appel',
      category: 'Préparation',
      priority: 'Moyenne',
      dueDate: '2024-01-16',
      status: 'À faire',
      progress: 0,
      estimatedTime: '1h'
    },
    {
      id: '8',
      title: 'Préparer contrat SmartBiz',
      description: 'Rédiger le contrat avec les conditions négociées',
      category: 'Admin',
      priority: 'Haute',
      dueDate: '2024-01-17',
      status: 'À faire',
      progress: 0,
      estimatedTime: '2h'
    },
    {
      id: '9',
      title: 'Formation produit v2.0',
      description: 'Suivre la formation sur les nouvelles fonctionnalités',
      category: 'Formation',
      priority: 'Moyenne',
      dueDate: '2024-01-17',
      status: 'À faire',
      progress: 0,
      estimatedTime: '2h30'
    },
    {
      id: '10',
      title: 'Rapport hebdomadaire',
      description: 'Rédiger le rapport d\'activité de la semaine',
      category: 'Admin',
      priority: 'Basse',
      dueDate: '2024-01-19',
      status: 'À faire',
      progress: 0,
      estimatedTime: '1h'
    },
    {
      id: '11',
      title: 'Préparer formation MediaPlus',
      description: 'Créer supports de formation personnalisés',
      category: 'Préparation',
      priority: 'Haute',
      dueDate: '2024-01-18',
      status: 'En cours',
      progress: 30,
      estimatedTime: '3h'
    },
    {
      id: '12',
      title: 'Analyser concurrence',
      description: 'Étudier les offres des 3 principaux concurrents',
      category: 'Prospection',
      priority: 'Moyenne',
      dueDate: '2024-01-20',
      status: 'À faire',
      progress: 0,
      estimatedTime: '2h'
    },
    {
      id: '13',
      title: 'Suivi clients du mois',
      description: 'Appeler tous les clients pour satisfaction',
      category: 'Suivi',
      priority: 'Moyenne',
      dueDate: '2024-01-22',
      status: 'À faire',
      progress: 0,
      estimatedTime: '4h'
    },
    {
      id: '14',
      title: 'Préparer stratégie MegaCorp',
      description: 'Élaborer stratégie de partenariat',
      category: 'Préparation',
      priority: 'Haute',
      dueDate: '2024-01-21',
      status: 'À faire',
      progress: 0,
      estimatedTime: '3h'
    },
    {
      id: '15',
      title: 'Mettre à jour documentation',
      description: 'Actualiser les fiches produits',
      category: 'Admin',
      priority: 'Basse',
      dueDate: '2024-01-23',
      status: 'À faire',
      progress: 0,
      estimatedTime: '2h'
    },
    {
      id: '16',
      title: 'Prospection LinkedIn',
      description: 'Contacter 15 décideurs sur LinkedIn',
      category: 'Prospection',
      priority: 'Moyenne',
      dueDate: '2024-01-24',
      status: 'À faire',
      progress: 0,
      estimatedTime: '2h'
    },
    {
      id: '17',
      title: 'Préparer webinaire',
      description: 'Créer contenu pour webinaire de prospection',
      category: 'Préparation',
      priority: 'Moyenne',
      dueDate: '2024-01-25',
      status: 'À faire',
      progress: 0,
      estimatedTime: '5h'
    },
    {
      id: '18',
      title: 'Analyser pipeline Q1',
      description: 'Faire le point sur les opportunités du trimestre',
      category: 'Admin',
      priority: 'Haute',
      dueDate: '2024-01-26',
      status: 'À faire',
      progress: 0,
      estimatedTime: '2h'
    }
  ]);

  const [objectives, setObjectives] = useState([
    {
      id: '1',
      title: 'Chiffre d\'affaires',
      type: 'CA',
      target: 150000,
      current: 98500,
      unit: '€',
      deadline: '2024-01-31',
      status: 'En bonne voie',
      description: 'Objectif CA mensuel'
    },
    {
      id: '2',
      title: 'Nouveaux leads',
      type: 'Leads',
      target: 50,
      current: 42,
      unit: 'leads',
      deadline: '2024-01-31',
      status: 'Atteint',
      description: 'Génération de nouveaux leads qualifiés'
    },
    {
      id: '3',
      title: 'Conversions',
      type: 'Conversions',
      target: 15,
      current: 8,
      unit: 'clients',
      deadline: '2024-01-31',
      status: 'À risque',
      description: 'Conversion de prospects en clients'
    },
    {
      id: '4',
      title: 'Rendez-vous planifiés',
      type: 'RDV',
      target: 30,
      current: 27,
      unit: 'RDV',
      deadline: '2024-01-31',
      status: 'En bonne voie',
      description: 'Nombre de RDV commerciaux'
    },
    {
      id: '5',
      title: 'Taux de conversion',
      type: 'Taux',
      target: 25,
      current: 18,
      unit: '%',
      deadline: '2024-01-31',
      status: 'À risque',
      description: 'Taux de conversion leads → clients'
    },
    {
      id: '6',
      title: 'Appels de prospection',
      type: 'Appels',
      target: 100,
      current: 87,
      unit: 'appels',
      deadline: '2024-01-31',
      status: 'En bonne voie',
      description: 'Nombre d\'appels de prospection'
    },
    {
      id: '7',
      title: 'Emails envoyés',
      type: 'Emails',
      target: 200,
      current: 156,
      unit: 'emails',
      deadline: '2024-01-31',
      status: 'En bonne voie',
      description: 'Emails de prospection et suivi'
    },
    {
      id: '8',
      title: 'Propositions commerciales',
      type: 'Propositions',
      target: 20,
      current: 14,
      unit: 'propositions',
      deadline: '2024-01-31',
      status: 'En bonne voie',
      description: 'Propositions commerciales envoyées'
    },
    {
      id: '9',
      title: 'Contrats signés',
      type: 'Contrats',
      target: 12,
      current: 7,
      unit: 'contrats',
      deadline: '2024-01-31',
      status: 'À risque',
      description: 'Nombre de contrats signés'
    },
    {
      id: '10',
      title: 'Panier moyen',
      type: 'Panier',
      target: 10000,
      current: 12300,
      unit: '€',
      deadline: '2024-01-31',
      status: 'Atteint',
      description: 'Valeur moyenne des contrats'
    }
  ]);

  const handleEditActivity = (activity: any) => {
    setEditingActivity(activity);
    setShowActivityModal(true);
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleEditObjective = (objective: any) => {
    setEditingObjective(objective);
    setShowObjectiveModal(true);
  };

  const handleSaveActivity = (activityData: any) => {
    if (editingActivity) {
      setActivities(activities.map(a => 
        a.id === editingActivity.id ? { ...a, ...activityData } : a
      ));
    } else {
      setActivities([...activities, { 
        id: Date.now().toString(), 
        ...activityData,
        status: 'Planifié'
      }]);
    }
    setShowActivityModal(false);
    setEditingActivity(null);
  };

  const handleSaveTask = (taskData: any) => {
    if (editingTask) {
      setTasks(tasks.map(t => 
        t.id === editingTask.id ? { ...t, ...taskData } : t
      ));
    } else {
      setTasks([...tasks, { 
        id: Date.now().toString(), 
        ...taskData,
        status: 'À faire',
        progress: 0
      }]);
    }
    setShowTaskModal(false);
    setEditingTask(null);
  };

  const handleSaveObjective = (objectiveData: any) => {
    if (editingObjective) {
      setObjectives(objectives.map(o => 
        o.id === editingObjective.id ? { ...o, ...objectiveData } : o
      ));
    } else {
      const progress = (objectiveData.current / objectiveData.target) * 100;
      let status = 'En retard';
      if (progress >= 100) status = 'Atteint';
      else if (progress >= 80) status = 'En bonne voie';
      else if (progress >= 50) status = 'À risque';
      
      setObjectives([...objectives, { 
        id: Date.now().toString(), 
        ...objectiveData,
        status
      }]);
    }
    setShowObjectiveModal(false);
    setEditingObjective(null);
  };

  const handleDeleteActivity = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) {
      setActivities(activities.filter(a => a.id !== id));
    }
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const handleDeleteObjective = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet objectif ?')) {
      setObjectives(objectives.filter(o => o.id !== id));
    }
  };

  const handleCompleteTask = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, status: 'Terminée', progress: 100 } : t
    ));
  };

  const handleCancelTask = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, status: 'Annulée' } : t
    ));
  };

  const handleCompleteActivity = (id: string) => {
    setActivities(activities.map(a => 
      a.id === id ? { ...a, status: 'Terminé' } : a
    ));
  };

  const handleCancelActivity = (id: string) => {
    setActivities(activities.map(a => 
      a.id === id ? { ...a, status: 'Annulé' } : a
    ));
  };

  // Fonctions de filtrage
  const filteredActivities = activities.filter(activity => {
    if (agendaFilters.type !== 'Tous' && activity.type !== agendaFilters.type) return false;
    if (agendaFilters.priority !== 'Tous' && activity.priority !== agendaFilters.priority) return false;
    if (agendaFilters.status !== 'Tous' && activity.status !== agendaFilters.status) return false;
    if (agendaFilters.client && !activity.client?.toLowerCase().includes(agendaFilters.client.toLowerCase())) return false;
    return true;
  });

  const filteredTasks = tasks.filter(task => {
    if (taskFilters.category !== 'Tous' && task.category !== taskFilters.category) return false;
    if (taskFilters.priority !== 'Tous' && task.priority !== taskFilters.priority) return false;
    if (taskFilters.status !== 'Tous' && task.status !== taskFilters.status) return false;
    return true;
  });

  const filteredObjectives = objectives.filter(objective => {
    if (objectiveFilters.type !== 'Tous' && objective.type !== objectiveFilters.type) return false;
    if (objectiveFilters.status !== 'Tous' && objective.status !== objectiveFilters.status) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Mes Activités</h1>
              <p className="text-teal-100">Gérez votre agenda, vos tâches et vos objectifs</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditingActivity(null);
                  setShowActivityModal(true);
                }}
                className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <i className="ri-calendar-line text-xl"></i>
                Nouvelle activité
              </button>
              <button
                onClick={() => {
                  setEditingTask(null);
                  setShowTaskModal(true);
                }}
                className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <i className="ri-task-line text-xl"></i>
                Nouvelle tâche
              </button>
              <button
                onClick={() => {
                  setEditingObjective(null);
                  setShowObjectiveModal(true);
                }}
                className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <i className="ri-trophy-line text-xl"></i>
                Nouvel objectif
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm mb-1">Activités à venir</p>
                  <p className="text-3xl font-bold">{activities.filter(a => a.status === 'Planifié').length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <i className="ri-calendar-line text-2xl"></i>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm mb-1">Tâches en retard</p>
                  <p className="text-3xl font-bold text-red-300">{tasks.filter(t => t.status === 'En retard').length}</p>
                </div>
                <div className="w-12 h-12 bg-red-500/30 rounded-lg flex items-center justify-center">
                  <i className="ri-alarm-warning-line text-2xl"></i>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm mb-1">Tâches du jour</p>
                  <p className="text-3xl font-bold">{tasks.filter(t => t.dueDate === '2024-01-15' && t.status !== 'Terminée').length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <i className="ri-task-line text-2xl"></i>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm mb-1">Objectifs atteints</p>
                  <p className="text-3xl font-bold">{objectives.filter(o => o.status === 'Atteint').length}/{objectives.length}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <i className="ri-trophy-line text-2xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('agenda')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'agenda'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="ri-calendar-line mr-2"></i>
              Agenda
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'tasks'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="ri-task-line mr-2"></i>
              Tâches
              {tasks.filter(t => t.status === 'En retard').length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {tasks.filter(t => t.status === 'En retard').length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('objectives')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'objectives'
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="ri-trophy-line mr-2"></i>
              Objectifs du mois
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'agenda' && (
            <div>
              {/* Filtres Agenda */}
              <div className="bg-white rounded-lg border p-4 mb-6">
                <div className="flex items-center gap-4">
                  <i className="ri-filter-3-line text-xl text-gray-600"></i>
                  <div className="flex-1 grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                      <select
                        value={agendaFilters.type}
                        onChange={(e) => setAgendaFilters({ ...agendaFilters, type: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="Tous">Tous</option>
                        <option value="Rendez-vous">Rendez-vous</option>
                        <option value="Appel">Appel</option>
                        <option value="Email">Email</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Priorité</label>
                      <select
                        value={agendaFilters.priority}
                        onChange={(e) => setAgendaFilters({ ...agendaFilters, priority: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="Tous">Tous</option>
                        <option value="Haute">Haute</option>
                        <option value="Moyenne">Moyenne</option>
                        <option value="Basse">Basse</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Statut</label>
                      <select
                        value={agendaFilters.status}
                        onChange={(e) => setAgendaFilters({ ...agendaFilters, status: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="Tous">Tous</option>
                        <option value="Planifié">Planifié</option>
                        <option value="Terminé">Terminé</option>
                        <option value="Annulé">Annulé</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Client</label>
                      <input
                        type="text"
                        value={agendaFilters.client}
                        onChange={(e) => setAgendaFilters({ ...agendaFilters, client: e.target.value })}
                        placeholder="Rechercher un client..."
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setAgendaFilters({ type: 'Tous', priority: 'Tous', status: 'Tous', client: '' })}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 whitespace-nowrap"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredActivities.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed">
                    <i className="ri-calendar-line text-6xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500 mb-4">Aucune activité trouvée</p>
                  </div>
                ) : (
                  filteredActivities.map((activity) => (
                    <div key={activity.id} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                              activity.type === 'Rendez-vous' ? 'bg-blue-100 text-blue-700' :
                              activity.type === 'Appel' ? 'bg-green-100 text-green-700' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                              {activity.type}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                              activity.priority === 'Haute' ? 'bg-red-100 text-red-700' :
                              activity.priority === 'Moyenne' ? 'bg-orange-100 text-orange-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {activity.priority}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                              activity.status === 'Planifié' ? 'bg-blue-100 text-blue-700' :
                              activity.status === 'Terminé' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {activity.status}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{activity.title}</h3>
                          <p className="text-gray-600 mb-3">{activity.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <i className="ri-calendar-line"></i>
                              <span>{new Date(activity.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <i className="ri-time-line"></i>
                              <span>{activity.time} {activity.duration && `(${activity.duration})`}</span>
                            </div>
                            {activity.location && (
                              <div className="flex items-center gap-2">
                                <i className="ri-map-pin-line"></i>
                                <span>{activity.location}</span>
                              </div>
                            )}
                            {activity.client && (
                              <div className="flex items-center gap-2">
                                <i className="ri-building-line"></i>
                                <span>{activity.client}</span>
                              </div>
                            )}
                            {activity.reminder && (
                              <div className="flex items-center gap-2">
                                <i className="ri-notification-line"></i>
                                <span>Rappel: {activity.reminder}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {activity.status === 'Planifié' && (
                            <>
                              <button
                                onClick={() => handleCompleteActivity(activity.id)}
                                className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                title="Marquer comme terminé"
                              >
                                <i className="ri-check-line text-xl"></i>
                              </button>
                              <button
                                onClick={() => handleEditActivity(activity)}
                                className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                title="Modifier"
                              >
                                <i className="ri-edit-line text-xl"></i>
                              </button>
                              <button
                                onClick={() => handleCancelActivity(activity.id)}
                                className="w-10 h-10 flex items-center justify-center bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                                title="Annuler"
                              >
                                <i className="ri-close-line text-xl"></i>
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDeleteActivity(activity.id)}
                            className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="Supprimer"
                          >
                            <i className="ri-delete-bin-line text-xl"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div>
              {/* Filtres Tâches */}
              <div className="bg-white rounded-lg border p-4 mb-6">
                <div className="flex items-center gap-4">
                  <i className="ri-filter-3-line text-xl text-gray-600"></i>
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Catégorie</label>
                      <select
                        value={taskFilters.category}
                        onChange={(e) => setTaskFilters({ ...taskFilters, category: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="Tous">Tous</option>
                        <option value="Prospection">Prospection</option>
                        <option value="Suivi">Suivi</option>
                        <option value="Admin">Admin</option>
                        <option value="Préparation">Préparation</option>
                        <option value="Formation">Formation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Priorité</label>
                      <select
                        value={taskFilters.priority}
                        onChange={(e) => setTaskFilters({ ...taskFilters, priority: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="Tous">Tous</option>
                        <option value="Haute">Haute</option>
                        <option value="Moyenne">Moyenne</option>
                        <option value="Basse">Basse</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Statut</label>
                      <select
                        value={taskFilters.status}
                        onChange={(e) => setTaskFilters({ ...taskFilters, status: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="Tous">Tous</option>
                        <option value="En retard">En retard</option>
                        <option value="En cours">En cours</option>
                        <option value="À faire">À faire</option>
                        <option value="Terminée">Terminée</option>
                        <option value="Annulée">Annulée</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => setTaskFilters({ category: 'Tous', priority: 'Tous', status: 'Tous' })}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 whitespace-nowrap"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Tâches en retard */}
                {filteredTasks.filter(t => t.status === 'En retard').length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                      <i className="ri-alarm-warning-line"></i>
                      En retard ({filteredTasks.filter(t => t.status === 'En retard').length})
                    </h2>
                    <div className="space-y-3">
                      {filteredTasks.filter(t => t.status === 'En retard').map((task) => (
                        <TaskCard 
                          key={task.id} 
                          task={task} 
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                          onComplete={handleCompleteTask}
                          onCancel={handleCancelTask}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Tâches du jour */}
                {filteredTasks.filter(t => t.dueDate === '2024-01-15' && t.status !== 'Terminée' && t.status !== 'En retard').length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                      <i className="ri-calendar-today-line"></i>
                      Aujourd'hui ({filteredTasks.filter(t => t.dueDate === '2024-01-15' && t.status !== 'Terminée' && t.status !== 'En retard').length})
                    </h2>
                    <div className="space-y-3">
                      {filteredTasks.filter(t => t.dueDate === '2024-01-15' && t.status !== 'Terminée' && t.status !== 'En retard').map((task) => (
                        <TaskCard 
                          key={task.id} 
                          task={task}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                          onComplete={handleCompleteTask}
                          onCancel={handleCancelTask}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Tâches en cours */}
                {filteredTasks.filter(t => t.status === 'En cours').length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                      <i className="ri-loader-line"></i>
                      En cours ({filteredTasks.filter(t => t.status === 'En cours').length})
                    </h2>
                    <div className="space-y-3">
                      {filteredTasks.filter(t => t.status === 'En cours').map((task) => (
                        <TaskCard 
                          key={task.id} 
                          task={task}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                          onComplete={handleCompleteTask}
                          onCancel={handleCancelTask}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Tâches à venir */}
                {filteredTasks.filter(t => t.status === 'À faire' && t.dueDate !== '2024-01-15').length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                      <i className="ri-time-line"></i>
                      À venir ({filteredTasks.filter(t => t.status === 'À faire' && t.dueDate !== '2024-01-15').length})
                    </h2>
                    <div className="space-y-3">
                      {filteredTasks.filter(t => t.status === 'À faire' && t.dueDate !== '2024-01-15').map((task) => (
                        <TaskCard 
                          key={task.id} 
                          task={task}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                          onComplete={handleCompleteTask}
                          onCancel={handleCancelTask}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Tâches terminées */}
                {filteredTasks.filter(t => t.status === 'Terminée').length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
                      <i className="ri-checkbox-circle-line"></i>
                      Terminées ({filteredTasks.filter(t => t.status === 'Terminée').length})
                    </h2>
                    <div className="space-y-3">
                      {filteredTasks.filter(t => t.status === 'Terminée').map((task) => (
                        <TaskCard 
                          key={task.id} 
                          task={task}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                          onComplete={handleCompleteTask}
                          onCancel={handleCancelTask}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {filteredTasks.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed">
                    <i className="ri-task-line text-6xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500 mb-4">Aucune tâche trouvée</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'objectives' && (
            <div>
              {/* Filtres Objectifs */}
              <div className="bg-white rounded-lg border p-4 mb-6">
                <div className="flex items-center gap-4">
                  <i className="ri-filter-3-line text-xl text-gray-600"></i>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                      <select
                        value={objectiveFilters.type}
                        onChange={(e) => setObjectiveFilters({ ...objectiveFilters, type: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="Tous">Tous</option>
                        <option value="CA">Chiffre d'affaires</option>
                        <option value="Leads">Nouveaux leads</option>
                        <option value="Conversions">Conversions</option>
                        <option value="RDV">Rendez-vous</option>
                        <option value="Taux">Taux de conversion</option>
                        <option value="Appels">Appels</option>
                        <option value="Emails">Emails</option>
                        <option value="Propositions">Propositions</option>
                        <option value="Contrats">Contrats</option>
                        <option value="Panier">Panier moyen</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Statut</label>
                      <select
                        value={objectiveFilters.status}
                        onChange={(e) => setObjectiveFilters({ ...objectiveFilters, status: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="Tous">Tous</option>
                        <option value="Atteint">Atteint</option>
                        <option value="En bonne voie">En bonne voie</option>
                        <option value="À risque">À risque</option>
                        <option value="En retard">En retard</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => setObjectiveFilters({ type: 'Tous', status: 'Tous' })}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 whitespace-nowrap"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {filteredObjectives.length === 0 ? (
                  <div className="col-span-2 text-center py-12 bg-white rounded-lg border-2 border-dashed">
                    <i className="ri-trophy-line text-6xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500 mb-4">Aucun objectif trouvé</p>
                  </div>
                ) : (
                  filteredObjectives.map((objective) => (
                    <ObjectiveCard 
                      key={objective.id} 
                      objective={objective}
                      onEdit={handleEditObjective}
                      onDelete={handleDeleteObjective}
                    />
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        {showActivityModal && (
          <ActivityModal
            activity={editingActivity}
            onClose={() => {
              setShowActivityModal(false);
              setEditingActivity(null);
            }}
            onSave={handleSaveActivity}
          />
        )}

        {showTaskModal && (
          <TaskModal
            task={editingTask}
            onClose={() => {
              setShowTaskModal(false);
              setEditingTask(null);
            }}
            onSave={handleSaveTask}
          />
        )}

        {showObjectiveModal && (
          <ObjectiveModal
            objective={editingObjective}
            onClose={() => {
              setShowObjectiveModal(false);
              setEditingObjective(null);
            }}
            onSave={handleSaveObjective}
          />
        )}
      </div>
    </div>
  );
}

// TaskCard Component
function TaskCard({ task, onEdit, onDelete, onComplete, onCancel }: any) {
  return (
    <div className="bg-white rounded-lg border p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
              task.category === 'Prospection' ? 'bg-blue-100 text-blue-700' :
              task.category === 'Suivi' ? 'bg-green-100 text-green-700' :
              task.category === 'Admin' ? 'bg-gray-100 text-gray-700' :
              task.category === 'Préparation' ? 'bg-purple-100 text-purple-700' :
              'bg-orange-100 text-orange-700'
            }`}>
              {task.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
              task.priority === 'Haute' ? 'bg-red-100 text-red-700' :
              task.priority === 'Moyenne' ? 'bg-orange-100 text-orange-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {task.priority}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
              task.status === 'En retard' ? 'bg-red-100 text-red-700' :
              task.status === 'En cours' ? 'bg-blue-100 text-blue-700' :
              task.status === 'Terminée' ? 'bg-green-100 text-green-700' :
              task.status === 'Annulée' ? 'bg-gray-100 text-gray-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {task.status}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{task.title}</h3>
          <p className="text-gray-600 mb-3">{task.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-2">
              <i className="ri-calendar-line"></i>
              <span>Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-time-line"></i>
              <span>{task.estimatedTime}</span>
            </div>
          </div>
          {task.status !== 'Terminée' && task.status !== 'Annulée' && (
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Progression</span>
                <span className="font-semibold text-gray-900">{task.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    task.progress >= 75 ? 'bg-green-500' :
                    task.progress >= 50 ? 'bg-blue-500' :
                    task.progress >= 25 ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2 ml-4">
          {task.status !== 'Terminée' && task.status !== 'Annulée' && (
            <>
              <button
                onClick={() => onComplete(task.id)}
                className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                title="Marquer comme terminée"
              >
                <i className="ri-check-line text-xl"></i>
              </button>
              <button
                onClick={() => onEdit(task)}
                className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                title="Modifier"
              >
                <i className="ri-edit-line text-xl"></i>
              </button>
              <button
                onClick={() => onCancel(task.id)}
                className="w-10 h-10 flex items-center justify-center bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                title="Annuler"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            title="Supprimer"
          >
            <i className="ri-delete-bin-line text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

// ObjectiveCard Component
function ObjectiveCard({ objective, onEdit, onDelete }: any) {
  const progress = (objective.current / objective.target) * 100;
  
  return (
    <div className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-gray-900">{objective.title}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
              objective.status === 'Atteint' ? 'bg-green-100 text-green-700' :
              objective.status === 'En bonne voie' ? 'bg-blue-100 text-blue-700' :
              objective.status === 'À risque' ? 'bg-orange-100 text-orange-700' :
              'bg-red-100 text-red-700'
            }`}>
              {objective.status}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{objective.description}</p>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(objective)}
            className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
            title="Modifier"
          >
            <i className="ri-edit-line text-xl"></i>
          </button>
          <button
            onClick={() => onDelete(objective.id)}
            className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            title="Supprimer"
          >
            <i className="ri-delete-bin-line text-xl"></i>
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl font-bold text-gray-900">
            {objective.current.toLocaleString()} {objective.unit}
          </span>
          <span className="text-gray-500">
            / {objective.target.toLocaleString()} {objective.unit}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${
              progress >= 100 ? 'bg-green-500' :
              progress >= 80 ? 'bg-blue-500' :
              progress >= 50 ? 'bg-orange-500' :
              'bg-red-500'
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className="text-gray-600">{progress.toFixed(1)}% atteint</span>
          <span className="text-gray-500">
            <i className="ri-calendar-line mr-1"></i>
            {new Date(objective.deadline).toLocaleDateString('fr-FR')}
          </span>
        </div>
      </div>

      {progress < 100 && (
        <div className="text-sm text-gray-600">
          <i className="ri-arrow-up-line text-green-600 mr-1"></i>
          Encore {(objective.target - objective.current).toLocaleString()} {objective.unit} pour atteindre l'objectif
        </div>
      )}
    </div>
  );
}

// ActivityModal Component
function ActivityModal({ activity, onClose, onSave }: any) {
  const [formData, setFormData] = useState(activity || {
    type: 'Rendez-vous',
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    priority: 'Moyenne',
    client: '',
    reminder: '30 min avant'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {activity ? 'Modifier l\'activité' : 'Nouvelle activité'}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Type d'activité *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              >
                <option value="Rendez-vous">Rendez-vous</option>
                <option value="Appel">Appel</option>
                <option value="Email">Email</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Priorité *
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              >
                <option value="Haute">Haute</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Basse">Basse</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Titre *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Heure *
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Durée
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="Ex: 1h30"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Client
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lieu
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Ex: Visioconférence"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rappel
            </label>
            <select
              value={formData.reminder}
              onChange={(e) => setFormData({ ...formData, reminder: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="15 min avant">15 min avant</option>
              <option value="30 min avant">30 min avant</option>
              <option value="1h avant">1h avant</option>
              <option value="1 jour avant">1 jour avant</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors whitespace-nowrap"
            >
              {activity ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// TaskModal Component
function TaskModal({ task, onClose, onSave }: any) {
  const [formData, setFormData] = useState(task || {
    title: '',
    description: '',
    category: 'Prospection',
    priority: 'Moyenne',
    dueDate: '',
    estimatedTime: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {task ? 'Modifier la tâche' : 'Nouvelle tâche'}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Titre *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Catégorie *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              >
                <option value="Prospection">Prospection</option>
                <option value="Suivi">Suivi</option>
                <option value="Admin">Admin</option>
                <option value="Préparation">Préparation</option>
                <option value="Formation">Formation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Priorité *
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              >
                <option value="Haute">Haute</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Basse">Basse</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date d'échéance *
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Temps estimé
              </label>
              <input
                type="text"
                value={formData.estimatedTime}
                onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                placeholder="Ex: 2h30"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors whitespace-nowrap"
            >
              {task ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ObjectiveModal Component
function ObjectiveModal({ objective, onClose, onSave }: any) {
  const [formData, setFormData] = useState(objective || {
    title: '',
    type: 'CA',
    target: 0,
    current: 0,
    unit: '€',
    deadline: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {objective ? 'Modifier l\'objectif' : 'Nouvel objectif'}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Titre *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => {
                  const type = e.target.value;
                  let unit = '€';
                  if (type === 'Leads') unit = 'leads';
                  else if (type === 'Conversions' || type === 'Contrats') unit = 'clients';
                  else if (type === 'RDV') unit = 'RDV';
                  else if (type === 'Taux') unit = '%';
                  else if (type === 'Appels') unit = 'appels';
                  else if (type === 'Emails') unit = 'emails';
                  else if (type === 'Propositions') unit = 'propositions';
                  setFormData({ ...formData, type, unit });
                }}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              >
                <option value="CA">Chiffre d'affaires</option>
                <option value="Leads">Nouveaux leads</option>
                <option value="Conversions">Conversions</option>
                <option value="RDV">Rendez-vous</option>
                <option value="Taux">Taux de conversion</option>
                <option value="Appels">Appels de prospection</option>
                <option value="Emails">Emails envoyés</option>
                <option value="Propositions">Propositions commerciales</option>
                <option value="Contrats">Contrats signés</option>
                <option value="Panier">Panier moyen</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Unité *
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Objectif *
              </label>
              <input
                type="number"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Valeur actuelle *
              </label>
              <input
                type="number"
                value={formData.current}
                onChange={(e) => setFormData({ ...formData, current: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date limite *
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors whitespace-nowrap"
            >
              {objective ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}