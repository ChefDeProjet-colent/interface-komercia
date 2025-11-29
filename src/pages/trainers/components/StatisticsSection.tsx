
import { useState } from 'react';

export default function StatisticsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const learners = [
    {
      id: 1,
      name: 'Sophie Martin',
      email: 'sophie.martin@techcorp.fr',
      company: 'TechCorp',
      modules: 3,
      completion: 92,
      avgScore: 4.8,
      timeSpent: '24h',
      status: 'excellent'
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      email: 'thomas.dubois@innovate.fr',
      company: 'InnovateSAS',
      modules: 2,
      completion: 78,
      avgScore: 4.2,
      timeSpent: '16h',
      status: 'good'
    },
    {
      id: 3,
      name: 'Marie Laurent',
      email: 'marie.laurent@global.fr',
      company: 'GlobalTrade',
      modules: 4,
      completion: 45,
      avgScore: 3.5,
      timeSpent: '12h',
      status: 'difficulty'
    },
    {
      id: 4,
      name: 'Pierre Bernard',
      email: 'pierre.bernard@startup.fr',
      company: 'StartupXYZ',
      modules: 2,
      completion: 88,
      avgScore: 4.6,
      timeSpent: '20h',
      status: 'excellent'
    }
  ];

  const moduleStats = [
    {
      module: 'Leadership et Management',
      enrolled: 245,
      completed: 192,
      avgScore: 4.8,
      avgTime: '11.5h',
      completion: 78
    },
    {
      module: 'Communication Efficace',
      enrolled: 189,
      completed: 161,
      avgScore: 4.9,
      avgTime: '7.2h',
      completion: 85
    },
    {
      module: 'Gestion de Projet Agile',
      enrolled: 156,
      completed: 112,
      avgScore: 4.7,
      avgTime: '13.8h',
      completion: 72
    },
    {
      module: 'Vente et Négociation',
      enrolled: 203,
      completed: 164,
      avgScore: 4.6,
      avgTime: '9.3h',
      completion: 81
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'good':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'difficulty':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'Excellent';
      case 'good':
        return 'Bon';
      case 'difficulty':
        return 'En Difficulté';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Bannière Publicitaire En-tête */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Outils d'Analyse Pédagogique Avancés</h3>
            <p className="text-teal-100 text-sm mb-4">Suivez les progrès de vos apprenants avec des analytics détaillés et des rapports personnalisés</p>
            <button className="px-6 py-2 bg-white text-teal-600 rounded-lg hover:bg-teal-50 transition-colors text-sm font-medium whitespace-nowrap">
              Découvrir les Analytics
            </button>
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <i className="ri-line-chart-line text-6xl opacity-20"></i>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Statistiques des Apprenants</h2>
            <p className="text-sm text-gray-500 mt-1">Suivez les progrès et performances de vos apprenants</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
            </select>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium whitespace-nowrap">
              <i className="ri-download-line mr-2"></i>
              Exporter
            </button>
          </div>
        </div>

        {/* Statistiques Globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <i className="ri-user-line text-2xl text-purple-600"></i>
              <span className="text-xs text-green-600 font-medium">+12%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">1,247</p>
            <p className="text-sm text-gray-600">Apprenants Actifs</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <i className="ri-checkbox-circle-line text-2xl text-blue-600"></i>
              <span className="text-xs text-green-600 font-medium">+5.2%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">78.5%</p>
            <p className="text-sm text-gray-600">Taux de Complétion</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <i className="ri-star-line text-2xl text-green-600"></i>
              <span className="text-xs text-green-600 font-medium">Excellent</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">4.6/5</p>
            <p className="text-sm text-gray-600">Score Moyen</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <i className="ri-time-line text-2xl text-yellow-600"></i>
              <span className="text-xs text-blue-600 font-medium">+8%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">10.2h</p>
            <p className="text-sm text-gray-600">Temps Moyen</p>
          </div>
        </div>
      </div>

      {/* Tableau des Apprenants */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Performances des Apprenants</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Apprenant</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Entreprise</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Modules</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Complétion</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Score Moyen</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Temps Passé</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Statut</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {learners.map((learner) => (
                <tr key={learner.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{learner.name}</p>
                      <p className="text-xs text-gray-500">{learner.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-900">{learner.company}</p>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm font-semibold text-gray-900">{learner.modules}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center">
                      <div className="w-24">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold text-gray-900">{learner.completion}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              learner.completion >= 80
                                ? 'bg-green-500'
                                : learner.completion >= 60
                                ? 'bg-blue-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${learner.completion}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <i className="ri-star-fill text-yellow-400 text-sm"></i>
                      <span className="text-sm font-semibold text-gray-900">{learner.avgScore}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm text-gray-900">{learner.timeSpent}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(learner.status)}`}>
                      {getStatusLabel(learner.status)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors text-xs font-medium whitespace-nowrap">
                      Détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistiques par Module */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Performances par Module</h3>
        <div className="space-y-4">
          {moduleStats.map((stat, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50/50 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-900">{stat.module}</h4>
                <div className="flex items-center space-x-1">
                  <i className="ri-star-fill text-yellow-400 text-sm"></i>
                  <span className="text-sm font-semibold text-gray-900">{stat.avgScore}</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Inscrits</p>
                  <p className="text-sm font-semibold text-gray-900">{stat.enrolled}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Terminés</p>
                  <p className="text-sm font-semibold text-gray-900">{stat.completed}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Temps Moyen</p>
                  <p className="text-sm font-semibold text-gray-900">{stat.avgTime}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Complétion</p>
                  <p className="text-sm font-semibold text-gray-900">{stat.completion}%</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full"
                  style={{ width: `${stat.completion}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bannière Publicitaire Footer */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Services de Suivi des Apprenants</h3>
            <p className="text-orange-100 text-sm mb-4">Identifiez les apprenants en difficulté et personnalisez votre accompagnement</p>
            <button className="px-6 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium whitespace-nowrap">
              Optimiser le Suivi
            </button>
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <i className="ri-user-search-line text-6xl opacity-20"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
