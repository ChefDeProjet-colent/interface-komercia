import { useState, useEffect } from 'react';
import Card from '../../components/base/Card';
import Badge from '../../components/base/Badge';
import Button from '../../components/base/Button';
import Sidebar from '../../components/feature/Sidebar';

interface PipelineItem {
  id: string;
  company: string;
  contact: string;
  value: string;
  stage: 'prospection' | 'qualification' | 'proposition' | 'negociation' | 'signature';
  probability: number;
  nextAction: string;
  dueDate: string;
  notes: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

export default function PipelinePage() {
  const [pipelineData, setPipelineData] = useState<PipelineItem[]>([
    {
      id: '1',
      company: 'TechCorp Solutions',
      contact: 'Marie Dubois',
      value: '75,000€',
      stage: 'qualification',
      probability: 60,
      nextAction: 'Présentation produit',
      dueDate: '2024-01-15',
      notes: 'Très intéressés par la solution CRM',
      tasks: [
        { id: '1', title: 'Préparer présentation', completed: false, dueDate: '2024-01-14' },
        { id: '2', title: 'Envoyer documentation', completed: true, dueDate: '2024-01-10' }
      ]
    },
    {
      id: '2',
      company: 'InnovateSAS',
      contact: 'Pierre Martin',
      value: '120,000€',
      stage: 'proposition',
      probability: 80,
      nextAction: 'Envoi devis détaillé',
      dueDate: '2024-01-12',
      notes: 'Budget validé, attente proposition',
      tasks: [
        { id: '3', title: 'Finaliser devis', completed: false, dueDate: '2024-01-11' }
      ]
    },
    {
      id: '3',
      company: 'DataFlow Analytics',
      contact: 'Thomas Rousseau',
      value: '200,000€',
      stage: 'negociation',
      probability: 75,
      nextAction: 'Négociation prix',
      dueDate: '2024-01-18',
      notes: 'Demande réduction 10%',
      tasks: [
        { id: '4', title: 'Préparer contre-proposition', completed: false, dueDate: '2024-01-17' }
      ]
    },
    {
      id: '4',
      company: 'GreenTech Energy',
      contact: 'Sophie Laurent',
      value: '45,000€',
      stage: 'prospection',
      probability: 30,
      nextAction: 'Appel de qualification',
      dueDate: '2024-01-10',
      notes: 'Premier contact établi',
      tasks: [
        { id: '5', title: "Recherche sur l'entreprise", completed: true, dueDate: '2024-01-09' },
        { id: '6', title: 'Planifier appel', completed: false, dueDate: '2024-01-10' }
      ]
    },
    {
      id: '5',
      company: 'MedCare Solutions',
      contact: 'Dr. Anne Moreau',
      value: '85,000€',
      stage: 'signature',
      probability: 95,
      nextAction: 'Signature contrat',
      dueDate: '2024-01-08',
      notes: 'Contrat en cours de validation',
      tasks: [
        { id: '7', title: 'Relance pour signature', completed: false, dueDate: '2024-01-08' }
      ]
    },
    {
      id: '6',
      company: 'CloudSystems Pro',
      contact: 'Jean Dupont',
      value: '95,000€',
      stage: 'prospection',
      probability: 25,
      nextAction: 'Premier rendez-vous',
      dueDate: '2024-01-20',
      notes: 'Contact via LinkedIn',
      tasks: []
    },
    {
      id: '7',
      company: 'FinanceHub SA',
      contact: 'Claire Bernard',
      value: '150,000€',
      stage: 'qualification',
      probability: 55,
      nextAction: 'Démonstration technique',
      dueDate: '2024-01-16',
      notes: 'Besoin urgent de solution',
      tasks: [
        { id: '8', title: 'Préparer démo', completed: false, dueDate: '2024-01-15' }
      ]
    },
    {
      id: '8',
      company: 'RetailMax Group',
      contact: 'Marc Lefebvre',
      value: '65,000€',
      stage: 'proposition',
      probability: 70,
      nextAction: 'Présentation offre finale',
      dueDate: '2024-01-13',
      notes: 'Comparaison avec 2 concurrents',
      tasks: []
    },
    {
      id: '9',
      company: 'BioTech Innovations',
      contact: 'Isabelle Petit',
      value: '180,000€',
      stage: 'negociation',
      probability: 80,
      nextAction: 'Finalisation conditions',
      dueDate: '2024-01-19',
      notes: 'Négociation sur délais livraison',
      tasks: [
        { id: '9', title: 'Consulter équipe technique', completed: true, dueDate: '2024-01-17' }
      ]
    },
    {
      id: '10',
      company: 'EduLearn Platform',
      contact: 'François Roux',
      value: '55,000€',
      stage: 'signature',
      probability: 90,
      nextAction: 'Obtenir signature DG',
      dueDate: '2024-01-09',
      notes: 'Accord verbal obtenu',
      tasks: []
    },
    {
      id: '11',
      company: 'AutoParts Distribution',
      contact: 'Nathalie Girard',
      value: '40,000€',
      stage: 'prospection',
      probability: 35,
      nextAction: 'Qualification besoins',
      dueDate: '2024-01-22',
      notes: 'Recommandé par client existant',
      tasks: []
    },
    {
      id: '12',
      company: 'SmartHome Solutions',
      contact: 'Olivier Blanc',
      value: '110,000€',
      stage: 'qualification',
      probability: 65,
      nextAction: 'Audit technique',
      dueDate: '2024-01-17',
      notes: 'Projet de transformation digitale',
      tasks: [
        { id: '10', title: 'Planifier audit', completed: false, dueDate: '2024-01-16' }
      ]
    },
    {
      id: '13',
      company: 'LogiTrans Express',
      contact: 'Sylvie Mercier',
      value: '90,000€',
      stage: 'proposition',
      probability: 60,
      nextAction: 'Révision proposition',
      dueDate: '2024-01-14',
      notes: 'Demande ajustements tarifaires',
      tasks: []
    },
    {
      id: '14',
      company: 'MediaCom Agency',
      contact: 'Laurent Morel',
      value: '135,000€',
      stage: 'negociation',
      probability: 85,
      nextAction: 'Validation juridique',
      dueDate: '2024-01-21',
      notes: 'Derniers détails contractuels',
      tasks: [
        { id: '11', title: 'Révision contrat', completed: false, dueDate: '2024-01-20' }
      ]
    },
    {
      id: '15',
      company: 'HealthCare Plus',
      contact: 'Émilie Garnier',
      value: '170,000€',
      stage: 'signature',
      probability: 92,
      nextAction: 'Planifier kick-off',
      dueDate: '2024-01-10',
      notes: 'Contrat signé, attente paiement',
      tasks: []
    },
    {
      id: '16',
      company: 'FoodChain Logistics',
      contact: 'Philippe Durand',
      value: '78,000€',
      stage: 'prospection',
      probability: 40,
      nextAction: 'Rendez-vous découverte',
      dueDate: '2024-01-23',
      notes: 'Intérêt pour optimisation supply chain',
      tasks: []
    },
    {
      id: '17',
      company: 'TravelTech Solutions',
      contact: 'Caroline Faure',
      value: '105,000€',
      stage: 'qualification',
      probability: 50,
      nextAction: 'Analyse besoins détaillée',
      dueDate: '2024-01-18',
      notes: 'Projet multi-sites',
      tasks: []
    },
    {
      id: '18',
      company: 'SecureNet Systems',
      contact: 'Alain Perrin',
      value: '145,000€',
      stage: 'proposition',
      probability: 75,
      nextAction: 'Présentation solution sécurité',
      dueDate: '2024-01-15',
      notes: 'Priorité haute sécurité',
      tasks: [
        { id: '12', title: 'Préparer audit sécurité', completed: true, dueDate: '2024-01-13' }
      ]
    }
  ]);

  const [selectedLead, setSelectedLead] = useState<PipelineItem | null>(null);
  const [showAddOpportunityModal, setShowAddOpportunityModal] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [newTask, setNewTask] = useState('');
  const [newOpportunity, setNewOpportunity] = useState({
    company: '',
    contact: '',
    value: '',
    stage: 'prospection' as const,
    probability: 30,
    nextAction: '',
    dueDate: '',
    notes: ''
  });

  const getStageItems = (stageId: string) => {
    return pipelineData.filter(item => item.stage === stageId);
  };

  const getTotalValue = () => {
    return pipelineData.reduce((total, item) => {
      const value = parseInt(item.value.replace(/[€,]/g, ''));
      return total + (value * item.probability / 100);
    }, 0);
  };

  const moveToNextStage = (leadId: string) => {
    setPipelineData(prev => prev.map(item => {
      if (item.id === leadId) {
        const stageOrder = ['prospection', 'qualification', 'proposition', 'negociation', 'signature'];
        const currentIndex = stageOrder.indexOf(item.stage);
        if (currentIndex < stageOrder.length - 1) {
          return { ...item, stage: stageOrder[currentIndex + 1] as any };
        }
      }
      return item;
    }));
  };

  const addNote = (leadId: string) => {
    if (!newNote.trim()) return;
    setPipelineData(prev => prev.map(item => {
      if (item.id === leadId) {
        return { ...item, notes: item.notes + '\n' + newNote };
      }
      return item;
    }));
    setNewNote('');
  };

  const addTask = (leadId: string) => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      dueDate: new Date().toISOString().split('T')[0]
    };
    setPipelineData(prev => prev.map(item => {
      if (item.id === leadId) {
        return { ...item, tasks: [...item.tasks, task] };
      }
      return item;
    }));
    setNewTask('');
  };

  const toggleTask = (leadId: string, taskId: string) => {
    setPipelineData(prev => prev.map(item => {
      if (item.id === leadId) {
        return {
          ...item,
          tasks: item.tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      }
      return item;
    }));
  };

  const getUpcomingDeadlines = () => {
    const today = new Date();
    const upcoming = pipelineData.filter(item => {
      const dueDate = new Date(item.dueDate);
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 3 && diffDays >= 0;
    });
    return upcoming;
  };

  const addNewOpportunity = () => {
    if (!newOpportunity.company.trim() || !newOpportunity.contact.trim()) return;

    const opportunity: PipelineItem = {
      id: Date.now().toString(),
      company: newOpportunity.company,
      contact: newOpportunity.contact,
      value: newOpportunity.value || '0€',
      stage: newOpportunity.stage,
      probability: newOpportunity.probability,
      nextAction: newOpportunity.nextAction || 'Premier contact',
      dueDate: newOpportunity.dueDate || new Date().toISOString().split('T')[0],
      notes: newOpportunity.notes,
      tasks: []
    };

    setPipelineData(prev => [...prev, opportunity]);
    setNewOpportunity({
      company: '',
      contact: '',
      value: '',
      stage: 'prospection',
      probability: 30,
      nextAction: '',
      dueDate: '',
      notes: ''
    });
    setShowAddOpportunityModal(false);
  };

  const stages = [
    { id: 'prospection', label: 'Prospection', color: 'bg-gray-100' },
    { id: 'qualification', label: 'Qualification', color: 'bg-blue-100' },
    { id: 'proposition', label: 'Proposition', color: 'bg-yellow-100' },
    { id: 'negociation', label: 'Négociation', color: 'bg-orange-100' },
    { id: 'signature', label: 'Signature', color: 'bg-green-100' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <div className="flex-1 ml-64 p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Pipeline de Ventes</h1>
            <p className="text-gray-600 mt-1">Suivez vos opportunités commerciales</p>
          </div>

          {/* Notifications d'échéances */}
          {getUpcomingDeadlines().length > 0 && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center mb-2">
                <i className="ri-alarm-warning-line text-orange-600 mr-2"></i>
                <h3 className="font-semibold text-orange-800">Échéances à venir</h3>
              </div>
              <div className="space-y-1">
                {getUpcomingDeadlines().map(item => (
                  <p key={item.id} className="text-sm text-orange-700">
                    <strong>{item.company}</strong> - {item.nextAction} (échéance: {item.dueDate})
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Statistiques du pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{pipelineData.length}</p>
                <p className="text-sm text-gray-600">Opportunités actives</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{getTotalValue().toLocaleString()}€</p>
                <p className="text-sm text-gray-600">Valeur pondérée</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(pipelineData.reduce((sum, item) => sum + item.probability, 0) / pipelineData.length)}%
                </p>
                <p className="text-sm text-gray-600">Probabilité moyenne</p>
              </div>
            </Card>
            <Card>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {pipelineData.filter(item => item.stage === 'signature').length}
                </p>
                <p className="text-sm text-gray-600">Prêts à signer</p>
              </div>
            </Card>
          </div>

          {/* Pipeline Kanban */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {stages.map((stage) => {
              const stageItems = getStageItems(stage.id);
              const stageValue = stageItems.reduce((total, item) => {
                const value = parseInt(item.value.replace(/[€,]/g, ''));
                return total + value;
              }, 0);

              return (
                <div key={stage.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{stage.label}</h3>
                    <Badge variant="default">{stageItems.length}</Badge>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600">Valeur totale</p>
                    <p className="font-semibold text-gray-900">{stageValue.toLocaleString()}€</p>
                  </div>

                  <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
                    {stageItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedLead(item)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 text-sm">{item.company}</h4>
                          <span className="text-sm font-semibold text-green-600">{item.value}</span>
                        </div>

                        <p className="text-xs text-gray-600 mb-2">{item.contact}</p>

                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500">Probabilité</span>
                          <span className="text-xs font-medium">{item.probability}%</span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{ width: `${item.probability}%` }}
                          ></div>
                        </div>

                        <div className="text-xs text-gray-600 mb-1">
                          <i className="ri-calendar-line mr-1"></i>
                          {item.dueDate}
                        </div>

                        <p className="text-xs text-gray-700 font-medium">{item.nextAction}</p>

                        {/* Indicateur de tâches */}
                        {item.tasks.length > 0 && (
                          <div className="flex items-center mt-2">
                            <i className="ri-task-line text-xs text-gray-500 mr-1"></i>
                            <span className="text-xs text-gray-500">
                              {item.tasks.filter(t => t.completed).length}/{item.tasks.length} tâches
                            </span>
                          </div>
                        )}

                        <div className="flex gap-1 mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              moveToNextStage(item.id);
                            }}
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors whitespace-nowrap"
                          >
                            Avancer
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions rapides */}
          <Card className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="primary"
                className="flex items-center justify-center whitespace-nowrap"
                onClick={() => setShowAddOpportunityModal(true)}
              >
                <i className="ri-add-line mr-2"></i>
                Ajouter une opportunité
              </Button>
              <Button variant="outline" className="flex items-center justify-center whitespace-nowrap">
                <i className="ri-file-excel-line mr-2"></i>
                Exporter le pipeline
              </Button>
              <Button variant="outline" className="flex items-center justify-center whitespace-nowrap">
                <i className="ri-bar-chart-line mr-2"></i>
                Analyser les performances
              </Button>
            </div>
          </Card>

          {/* Modal d'ajout d'opportunité */}
          {showAddOpportunityModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Nouvelle Opportunité</h2>
                  <button
                    onClick={() => setShowAddOpportunityModal(false)}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Entreprise *
                      </label>
                      <input
                        type="text"
                        value={newOpportunity.company}
                        onChange={(e) => setNewOpportunity(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nom de l'entreprise"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contact *
                      </label>
                      <input
                        type="text"
                        value={newOpportunity.contact}
                        onChange={(e) => setNewOpportunity(prev => ({ ...prev, contact: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nom du contact"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Valeur estimée
                      </label>
                      <input
                        type="text"
                        value={newOpportunity.value}
                        onChange={(e) => setNewOpportunity(prev => ({ ...prev, value: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ex: 50,000€"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Étape initiale
                      </label>
                      <select
                        value={newOpportunity.stage}
                        onChange={(e) => setNewOpportunity(prev => ({ ...prev, stage: e.target.value as any }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8 cursor-pointer"
                      >
                        <option value="prospection">Prospection</option>
                        <option value="qualification">Qualification</option>
                        <option value="proposition">Proposition</option>
                        <option value="negociation">Négociation</option>
                        <option value="signature">Signature</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Probabilité (%)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={newOpportunity.probability}
                        onChange={(e) => setNewOpportunity(prev => ({ ...prev, probability: parseInt(e.target.value) }))}
                        className="w-full cursor-pointer"
                      />
                      <div className="text-center text-sm text-gray-600 mt-1">
                        {newOpportunity.probability}%
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date d'échéance
                      </label>
                      <input
                        type="date"
                        value={newOpportunity.dueDate}
                        onChange={(e) => setNewOpportunity(prev => ({ ...prev, dueDate: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prochaine action
                    </label>
                    <input
                      type="text"
                      value={newOpportunity.nextAction}
                      onChange={(e) => setNewOpportunity(prev => ({ ...prev, nextAction: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ex: Appel de qualification"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      value={newOpportunity.notes}
                      onChange={(e) => setNewOpportunity(prev => ({ ...prev, notes: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Informations complémentaires..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="primary"
                      onClick={addNewOpportunity}
                      className="flex-1 whitespace-nowrap"
                    >
                      <i className="ri-add-line mr-2"></i>
                      Créer l'opportunité
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowAddOpportunityModal(false)}
                      className="whitespace-nowrap"
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal de détails du lead */}
          {selectedLead && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{selectedLead.company}</h2>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Informations</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Contact</p>
                        <p className="font-medium">{selectedLead.contact}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Valeur</p>
                        <p className="font-medium">{selectedLead.value}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Probabilité</p>
                        <p className="font-medium">{selectedLead.probability}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Échéance</p>
                        <p className="font-medium">{selectedLead.dueDate}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Tâches</h3>
                    <div className="space-y-2">
                      {selectedLead.tasks.map(task => (
                        <div key={task.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(selectedLead.id, task.id)}
                            className="rounded cursor-pointer"
                          />
                          <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.title}
                          </span>
                          <span className="text-xs text-gray-500">({task.dueDate})</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Nouvelle tâche..."
                        className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => addTask(selectedLead.id)}
                        className="whitespace-nowrap"
                      >
                        Ajouter
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                    <div className="bg-gray-50 p-3 rounded text-sm whitespace-pre-wrap mb-3">
                      {selectedLead.notes}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Ajouter une note..."
                        className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => addNote(selectedLead.id)}
                        className="whitespace-nowrap"
                      >
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
