import { useState } from 'react';
import Sidebar from '../../components/feature/Sidebar';

export default function CommercialPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Leads actifs', value: '47', icon: 'ri-user-star-line', color: 'bg-blue-500', change: '+12%' },
    { label: 'Conversions', value: '23', icon: 'ri-check-double-line', color: 'bg-green-500', change: '+8%' },
    { label: 'CA du mois', value: '45K€', icon: 'ri-money-euro-circle-line', color: 'bg-purple-500', change: '+15%' },
    { label: 'Taux de conversion', value: '48.9%', icon: 'ri-line-chart-line', color: 'bg-orange-500', change: '+5%' }
  ];

  const recentLeads = [
    { id: 1, name: 'Sophie Martin', company: 'TechCorp', status: 'Nouveau', value: '15K€', date: '2024-01-15', priority: 'high' },
    { id: 2, name: 'Marc Dubois', company: 'InnoStart', status: 'En cours', value: '8K€', date: '2024-01-14', priority: 'medium' },
    { id: 3, name: 'Julie Bernard', company: 'Digital Plus', status: 'Qualifié', value: '22K€', date: '2024-01-13', priority: 'high' },
    { id: 4, name: 'Pierre Leroy', company: 'WebSolutions', status: 'Nouveau', value: '12K€', date: '2024-01-12', priority: 'low' }
  ];

  const activities = [
    { id: 1, type: 'call', title: 'Appel avec Sophie Martin', time: 'Il y a 2h', status: 'completed' },
    { id: 2, type: 'meeting', title: 'Réunion TechCorp', time: 'Aujourd\'hui 15h', status: 'upcoming' },
    { id: 3, type: 'email', title: 'Proposition envoyée à Marc', time: 'Il y a 4h', status: 'completed' },
    { id: 4, type: 'task', title: 'Relance Julie Bernard', time: 'Demain 10h', status: 'pending' }
  ];

  const objectives = [
    { id: 1, title: 'CA mensuel', current: 45000, target: 60000, unit: '€' },
    { id: 2, title: 'Nouveaux clients', current: 8, target: 12, unit: '' },
    { id: 3, title: 'Taux de conversion', current: 48.9, target: 55, unit: '%' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nouveau': return 'bg-blue-100 text-blue-700';
      case 'En cours': return 'bg-yellow-100 text-yellow-700';
      case 'Qualifié': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return 'ri-phone-line';
      case 'meeting': return 'ri-calendar-event-line';
      case 'email': return 'ri-mail-line';
      case 'task': return 'ri-task-line';
      default: return 'ri-notification-line';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="commercial" />
      
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Espace Commercial</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Gérez vos leads et suivez vos performances</p>
              </div>
              <button className="w-full sm:w-auto bg-teal-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                <i className="ri-add-line text-lg"></i>
                <span className="text-sm sm:text-base">Nouveau Lead</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-t border-gray-200 overflow-x-auto">
            <nav className="flex px-4 sm:px-6 lg:px-8 min-w-max">
              {[
                { id: 'dashboard', label: 'Tableau de bord', icon: 'ri-dashboard-line' },
                { id: 'leads', label: 'Leads', icon: 'ri-user-star-line' },
                { id: 'pipeline', label: 'Pipeline', icon: 'ri-flow-chart' },
                { id: 'activities', label: 'Activités', icon: 'ri-calendar-check-line' },
                { id: 'objectives', label: 'Objectifs', icon: 'ri-target-line' },
                { id: 'reports', label: 'Rapports', icon: 'ri-file-chart-line' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-4 border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} text-base sm:text-lg`}></i>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 sm:space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                        <span className="inline-flex items-center text-xs sm:text-sm text-green-600 font-medium">
                          <i className="ri-arrow-up-line mr-1"></i>
                          {stat.change}
                        </span>
                      </div>
                      <div className={`${stat.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <i className={`${stat.icon} text-lg sm:text-xl text-white`}></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Leads & Activities */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Recent Leads */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-4 sm:p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900">Leads récents</h2>
                      <button className="text-sm text-teal-600 hover:text-teal-700 font-medium whitespace-nowrap">
                        Voir tout →
                      </button>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {recentLeads.map((lead) => (
                      <div key={lead.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-3 mb-2">
                              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                                {lead.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 truncate">{lead.name}</h3>
                                <p className="text-sm text-gray-600 truncate">{lead.company}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                              <span className={`px-2 py-1 rounded-full font-medium ${getStatusColor(lead.status)}`}>
                                {lead.status}
                              </span>
                              <span className={`px-2 py-1 rounded-full font-medium ${getPriorityColor(lead.priority)}`}>
                                {lead.priority === 'high' ? 'Haute' : lead.priority === 'medium' ? 'Moyenne' : 'Basse'}
                              </span>
                            </div>
                          </div>
                          <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
                            <span className="text-base sm:text-lg font-bold text-teal-600">{lead.value}</span>
                            <span className="text-xs text-gray-500">{lead.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activities */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-4 sm:p-6 border-b border-gray-100">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">Activités récentes</h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {activities.map((activity) => (
                      <div key={activity.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            activity.status === 'completed' ? 'bg-green-100' :
                            activity.status === 'upcoming' ? 'bg-blue-100' : 'bg-yellow-100'
                          }`}>
                            <i className={`${getActivityIcon(activity.type)} text-lg ${
                              activity.status === 'completed' ? 'text-green-600' :
                              activity.status === 'upcoming' ? 'text-blue-600' : 'text-yellow-600'
                            }`}></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{activity.title}</h3>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Objectives */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Objectifs du mois</h2>
                <div className="space-y-4 sm:space-y-6">
                  {objectives.map((obj) => {
                    const progress = (obj.current / obj.target) * 100;
                    return (
                      <div key={obj.id}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <span className="font-semibold text-gray-900 text-sm sm:text-base">{obj.title}</span>
                          <span className="text-sm sm:text-base text-gray-600">
                            {obj.current.toLocaleString()}{obj.unit} / {obj.target.toLocaleString()}{obj.unit}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3">
                          <div
                            className="bg-gradient-to-r from-teal-500 to-teal-600 h-2.5 sm:h-3 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">{progress.toFixed(1)}% atteint</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'dashboard' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-12 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-tools-line text-3xl sm:text-4xl text-gray-400"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Section en développement</h3>
              <p className="text-sm sm:text-base text-gray-600">Cette fonctionnalité sera bientôt disponible</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
