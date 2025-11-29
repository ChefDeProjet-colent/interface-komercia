import { useState, useEffect } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';
import AdBanner from '../../../components/feature/AdBanner';

interface Commercial {
  id: number;
  name: string;
  email: string;
  phone: string;
  zone: string;
  sector: string;
  avatar: string;
  status: 'active' | 'inactive' | 'vacation';
  performance: {
    sales: number;
    leads: number;
    conversion: number;
    objective: number;
    progress: number;
  };
  tasks: {
    total: number;
    completed: number;
    pending: number;
    overdue: number;
  };
  lastActivity: string;
  joinDate: string;
}

export default function TeamManagement() {
  const { trackAction } = useAdManager();
  const [selectedCommercial, setSelectedCommercial] = useState<Commercial | null>(null);
  const [filterZone, setFilterZone] = useState('all');
  const [filterSector, setFilterSector] = useState('all');
  const [filterPerformance, setFilterPerformance] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  
  const [commercials] = useState<Commercial[]>([
    {
      id: 1,
      name: 'Sophie Martin',
      email: 'sophie.martin@komercia.com',
      phone: '+33 6 12 34 56 78',
      zone: 'Paris Nord',
      sector: 'Technologie',
      avatar: 'SM',
      status: 'active',
      performance: {
        sales: 125000,
        leads: 45,
        conversion: 28.5,
        objective: 120000,
        progress: 104
      },
      tasks: {
        total: 24,
        completed: 18,
        pending: 4,
        overdue: 2
      },
      lastActivity: '2024-03-29T14:30:00',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Marc Dubois',
      email: 'marc.dubois@komercia.com',
      phone: '+33 6 23 45 67 89',
      zone: 'Lyon Centre',
      sector: 'Retail',
      avatar: 'MD',
      status: 'active',
      performance: {
        sales: 98000,
        leads: 38,
        conversion: 24.2,
        objective: 100000,
        progress: 98
      },
      tasks: {
        total: 20,
        completed: 16,
        pending: 3,
        overdue: 1
      },
      lastActivity: '2024-03-29T16:45:00',
      joinDate: '2022-09-10'
    },
    {
      id: 3,
      name: 'Julie Rousseau',
      email: 'julie.rousseau@komercia.com',
      phone: '+33 6 34 56 78 90',
      zone: 'Marseille Sud',
      sector: 'Services',
      avatar: 'JR',
      status: 'vacation',
      performance: {
        sales: 87000,
        leads: 32,
        conversion: 22.8,
        objective: 90000,
        progress: 97
      },
      tasks: {
        total: 18,
        completed: 15,
        pending: 2,
        overdue: 1
      },
      lastActivity: '2024-03-25T10:20:00',
      joinDate: '2023-03-20'
    },
    {
      id: 4,
      name: 'Thomas Leroy',
      email: 'thomas.leroy@komercia.com',
      phone: '+33 6 45 67 89 01',
      zone: 'Toulouse Ouest',
      sector: 'Industrie',
      avatar: 'TL',
      status: 'active',
      performance: {
        sales: 142000,
        leads: 52,
        conversion: 31.2,
        objective: 130000,
        progress: 109
      },
      tasks: {
        total: 28,
        completed: 22,
        pending: 5,
        overdue: 1
      },
      lastActivity: '2024-03-29T17:15:00',
      joinDate: '2022-06-05'
    },
    {
      id: 5,
      name: 'Emma Moreau',
      email: 'emma.moreau@komercia.com',
      phone: '+33 6 56 78 90 12',
      zone: 'Paris Sud',
      sector: 'Santé',
      avatar: 'EM',
      status: 'active',
      performance: {
        sales: 76000,
        leads: 28,
        conversion: 19.5,
        objective: 85000,
        progress: 89
      },
      tasks: {
        total: 22,
        completed: 14,
        pending: 6,
        overdue: 2
      },
      lastActivity: '2024-03-29T13:00:00',
      joinDate: '2023-08-12'
    },
    {
      id: 6,
      name: 'Pierre Durand',
      email: 'pierre.durand@komercia.com',
      phone: '+33 6 67 89 01 23',
      zone: 'Nice Est',
      sector: 'Immobilier',
      avatar: 'PD',
      status: 'inactive',
      performance: {
        sales: 45000,
        leads: 18,
        conversion: 15.2,
        objective: 80000,
        progress: 56
      },
      tasks: {
        total: 15,
        completed: 8,
        pending: 4,
        overdue: 3
      },
      lastActivity: '2024-03-27T09:30:00',
      joinDate: '2023-11-01'
    }
  ]);

  useEffect(() => {
    trackAction('view-team-management');
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'vacation': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'vacation': return 'Congés';
      default: return 'Inconnu';
    }
  };

  const getPerformanceColor = (progress: number) => {
    if (progress >= 100) return 'text-green-600';
    if (progress >= 80) return 'text-orange-600';
    return 'text-red-600';
  };

  const filteredCommercials = commercials
    .filter(commercial => {
      if (filterZone !== 'all' && !commercial.zone.toLowerCase().includes(filterZone.toLowerCase())) return false;
      if (filterSector !== 'all' && commercial.sector !== filterSector) return false;
      if (filterPerformance !== 'all') {
        if (filterPerformance === 'high' && commercial.performance.progress < 100) return false;
        if (filterPerformance === 'medium' && (commercial.performance.progress < 80 || commercial.performance.progress >= 100)) return false;
        if (filterPerformance === 'low' && commercial.performance.progress >= 80) return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'sales': return b.performance.sales - a.performance.sales;
        case 'conversion': return b.performance.conversion - a.performance.conversion;
        case 'progress': return b.performance.progress - a.performance.progress;
        default: return 0;
      }
    });

  const handleCommercialClick = (commercial: Commercial) => {
    setSelectedCommercial(commercial);
    trackAction('view-commercial-details', { commercialId: commercial.id });
  };

  return (
    <div className="space-y-6">
      {/* Filtres et Contrôles */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Gestion de l'Équipe</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zone</label>
            <select
              value={filterZone}
              onChange={(e) => setFilterZone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="all">Toutes les zones</option>
              <option value="paris">Paris</option>
              <option value="lyon">Lyon</option>
              <option value="marseille">Marseille</option>
              <option value="toulouse">Toulouse</option>
              <option value="nice">Nice</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secteur</label>
            <select
              value={filterSector}
              onChange={(e) => setFilterSector(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="all">Tous les secteurs</option>
              <option value="Technologie">Technologie</option>
              <option value="Retail">Retail</option>
              <option value="Services">Services</option>
              <option value="Industrie">Industrie</option>
              <option value="Santé">Santé</option>
              <option value="Immobilier">Immobilier</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Performance</label>
            <select
              value={filterPerformance}
              onChange={(e) => setFilterPerformance(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="all">Toutes performances</option>
              <option value="high">Excellente (≥100%)</option>
              <option value="medium">Bonne (80-99%)</option>
              <option value="low">À améliorer (&lt;80%)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trier par</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="name">Nom</option>
              <option value="sales">Chiffre d'affaires</option>
              <option value="conversion">Taux de conversion</option>
              <option value="progress">Progression objectif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des Commerciaux */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Équipe Commerciale ({filteredCommercials.length} commerciaux)
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commercial
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zone / Secteur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tâches
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCommercials.map((commercial) => (
                <tr key={commercial.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{commercial.avatar}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{commercial.name}</div>
                        <div className="text-sm text-gray-500">{commercial.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{commercial.zone}</div>
                    <div className="text-sm text-gray-500">{commercial.sector}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {commercial.performance.sales.toLocaleString()}€
                    </div>
                    <div className="text-sm text-gray-500">
                      {commercial.performance.leads} leads • {commercial.performance.conversion}% conv.
                    </div>
                    <div className={`text-sm font-medium ${getPerformanceColor(commercial.performance.progress)}`}>
                      {commercial.performance.progress}% objectif
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {commercial.tasks.completed}/{commercial.tasks.total} terminées
                    </div>
                    <div className="text-sm text-gray-500">
                      {commercial.tasks.pending} en cours
                      {commercial.tasks.overdue > 0 && (
                        <span className="text-red-600 ml-1">• {commercial.tasks.overdue} en retard</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(commercial.status)}`}>
                      {getStatusText(commercial.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleCommercialClick(commercial)}
                      className="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap"
                    >
                      Voir détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bannière Publicitaire */}
      <AdBanner 
        position="manager-team" 
        section="team-management"
        format="banner"
        className="mb-6"
      />

      {/* Détails du Commercial Sélectionné */}
      {selectedCommercial && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Détails - {selectedCommercial.name}
            </h3>
            <button
              onClick={() => setSelectedCommercial(null)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informations Personnelles */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Informations Personnelles</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <i className="ri-mail-line text-gray-400"></i>
                  <span className="text-sm text-gray-600">{selectedCommercial.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="ri-phone-line text-gray-400"></i>
                  <span className="text-sm text-gray-600">{selectedCommercial.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="ri-map-pin-line text-gray-400"></i>
                  <span className="text-sm text-gray-600">{selectedCommercial.zone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="ri-building-line text-gray-400"></i>
                  <span className="text-sm text-gray-600">{selectedCommercial.sector}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="ri-calendar-line text-gray-400"></i>
                  <span className="text-sm text-gray-600">
                    Embauché le {new Date(selectedCommercial.joinDate).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>

            {/* Performances Détaillées */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Performances Actuelles</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Objectif de Ventes</span>
                    <span className="font-medium">
                      {selectedCommercial.performance.sales.toLocaleString()}€ / {selectedCommercial.performance.objective.toLocaleString()}€
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        selectedCommercial.performance.progress >= 100 ? 'bg-green-600' :
                        selectedCommercial.performance.progress >= 80 ? 'bg-orange-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${Math.min(selectedCommercial.performance.progress, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium">Leads Convertis</div>
                    <div className="text-xl font-bold text-blue-900">{selectedCommercial.performance.leads}</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm text-green-600 font-medium">Taux de Conversion</div>
                    <div className="text-xl font-bold text-green-900">{selectedCommercial.performance.conversion}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gestion des Tâches */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">Gestion des Tâches</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedCommercial.tasks.total}</p>
                  </div>
                  <i className="ri-task-line text-2xl text-gray-600"></i>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Terminées</p>
                    <p className="text-2xl font-bold text-green-900">{selectedCommercial.tasks.completed}</p>
                  </div>
                  <i className="ri-checkbox-circle-line text-2xl text-green-600"></i>
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">En Cours</p>
                    <p className="text-2xl font-bold text-orange-900">{selectedCommercial.tasks.pending}</p>
                  </div>
                  <i className="ri-time-line text-2xl text-orange-600"></i>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600">En Retard</p>
                    <p className="text-2xl font-bold text-red-900">{selectedCommercial.tasks.overdue}</p>
                  </div>
                  <i className="ri-alarm-warning-line text-2xl text-red-600"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Rapides */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">Actions Rapides</h4>
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-message-line mr-2"></i>
                Envoyer Message
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-phone-line mr-2"></i>
                Appeler
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-calendar-event-line mr-2"></i>
                Planifier RDV
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-task-line mr-2"></i>
                Assigner Tâche
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-file-chart-line mr-2"></i>
                Voir Rapport
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistiques d'Équipe */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Performance Moyenne</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">CA Moyen</span>
              <span className="font-medium">
                {Math.round(commercials.reduce((sum, c) => sum + c.performance.sales, 0) / commercials.length).toLocaleString()}€
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Conversion Moyenne</span>
              <span className="font-medium">
                {(commercials.reduce((sum, c) => sum + c.performance.conversion, 0) / commercials.length).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Progression Moyenne</span>
              <span className="font-medium">
                {Math.round(commercials.reduce((sum, c) => sum + c.performance.progress, 0) / commercials.length)}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Répartition par Zone</h4>
          <div className="space-y-2">
            {['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'].map(zone => {
              const count = commercials.filter(c => c.zone.includes(zone)).length;
              return (
                <div key={zone} className="flex justify-between">
                  <span className="text-sm text-gray-600">{zone}</span>
                  <span className="font-medium">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">Statuts Équipe</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Actifs</span>
              <span className="font-medium text-green-600">
                {commercials.filter(c => c.status === 'active').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">En Congés</span>
              <span className="font-medium text-orange-600">
                {commercials.filter(c => c.status === 'vacation').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Inactifs</span>
              <span className="font-medium text-red-600">
                {commercials.filter(c => c.status === 'inactive').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add named export for compatibility
export { TeamManagement };
