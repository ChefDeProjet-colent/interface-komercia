import { useState } from 'react';
import { Sidebar } from '../../components/feature/Sidebar';

export default function AnalyticsPage() {
  const [selectedMetric, setSelectedMetric] = useState('ca');
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  const metrics = [
    { id: 'ca', label: 'Chiffre d\'affaires', color: 'bg-blue-500' },
    { id: 'contacts', label: 'Contacts', color: 'bg-purple-500' },
    { id: 'conversions', label: 'Conversions', color: 'bg-orange-500' },
    { id: 'rdv', label: 'Rendez-vous', color: 'bg-pink-500' }
  ];

  const performanceData = {
    ca: [
      { month: 'Jan', value: 42000, target: 40000 },
      { month: 'Fév', value: 45000, target: 42000 },
      { month: 'Mar', value: 48000, target: 45000 },
      { month: 'Avr', value: 52000, target: 48000 },
      { month: 'Mai', value: 49000, target: 50000 },
      { month: 'Juin', value: 49000, target: 50000 }
    ],
    contacts: [
      { month: 'Jan', value: 22, target: 20 },
      { month: 'Fév', value: 25, target: 23 },
      { month: 'Mar', value: 28, target: 25 },
      { month: 'Avr', value: 30, target: 28 },
      { month: 'Mai', value: 26, target: 30 },
      { month: 'Juin', value: 25, target: 30 }
    ],
    conversions: [
      { month: 'Jan', value: 5, target: 5 },
      { month: 'Fév', value: 6, target: 6 },
      { month: 'Mar', value: 7, target: 7 },
      { month: 'Avr', value: 9, target: 8 },
      { month: 'Mai', value: 7, target: 8 },
      { month: 'Juin', value: 8, target: 8 }
    ],
    rdv: [
      { month: 'Jan', value: 10, target: 10 },
      { month: 'Fév', value: 11, target: 11 },
      { month: 'Mar', value: 12, target: 12 },
      { month: 'Avr', value: 14, target: 13 },
      { month: 'Mai', value: 10, target: 12 },
      { month: 'Juin', value: 11, target: 12 }
    ]
  };

  const sourceData = [
    { name: 'Prospection directe', value: 35, color: '#3B82F6' },
    { name: 'Recommandations', value: 28, color: '#8B5CF6' },
    { name: 'Réseaux sociaux', value: 20, color: '#F59E0B' },
    { name: 'Événements', value: 12, color: '#EC4899' },
    { name: 'Site web', value: 5, color: '#10B981' }
  ];

  const conversionFunnel = [
    { stage: 'Prospects', count: 450, rate: 100 },
    { stage: 'Contacts qualifiés', count: 280, rate: 62.2 },
    { stage: 'Rendez-vous', count: 156, rate: 34.7 },
    { stage: 'Propositions', count: 89, rate: 19.8 },
    { stage: 'Négociations', count: 52, rate: 11.6 },
    { stage: 'Contrats signés', count: 42, rate: 9.3 }
  ];

  const sectorData = [
    { name: 'Technologie', ca: 85000, contacts: 45, conversions: 12 },
    { name: 'Finance', ca: 72000, contacts: 38, conversions: 10 },
    { name: 'Santé', ca: 58000, contacts: 32, conversions: 8 },
    { name: 'Commerce', ca: 45000, contacts: 25, conversions: 7 },
    { name: 'Industrie', ca: 25000, contacts: 16, conversions: 5 }
  ];

  const topClients = [
    { name: 'TechCorp Solutions', ca: 45000, deals: 8, growth: 24 },
    { name: 'FinanceGroup SA', ca: 38000, deals: 6, growth: 18 },
    { name: 'HealthCare Plus', ca: 32000, deals: 5, growth: 22 },
    { name: 'RetailMax', ca: 28000, deals: 7, growth: 15 },
    { name: 'IndustrialPro', ca: 25000, deals: 4, growth: 12 }
  ];

  const currentData = performanceData[selectedMetric as keyof typeof performanceData];
  const maxValue = Math.max(...currentData.map(d => Math.max(d.value, d.target)));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="commercial" />
      
      <div className="flex-1 ml-64">
        {/* Header avec fond blanc */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Performance Commerciale</h1>
                <p className="text-gray-600 mt-1">Suivez vos indicateurs clés et votre progression</p>
              </div>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 whitespace-nowrap">
                <i className="ri-download-line"></i>
                Exporter les données
              </button>
            </div>

            {/* KPIs Cards avec shadow */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-money-euro-circle-line text-xl text-blue-600"></i>
                  </div>
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <i className="ri-arrow-up-line"></i>
                    +16.3%
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">285 000€</div>
                <div className="text-sm text-gray-600">Chiffre d'affaires</div>
                <div className="mt-2 text-xs text-gray-500">Objectif: 300 000€</div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-user-add-line text-xl text-purple-600"></i>
                  </div>
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <i className="ri-arrow-up-line"></i>
                    +18.2%
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">156</div>
                <div className="text-sm text-gray-600">Nouveaux contacts</div>
                <div className="mt-2 text-xs text-gray-500">Objectif: 180</div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="ri-check-double-line text-xl text-green-600"></i>
                  </div>
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <i className="ri-arrow-up-line"></i>
                    +20%
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">42</div>
                <div className="text-sm text-gray-600">Conversions</div>
                <div className="mt-2 text-xs text-gray-500">Objectif: 50</div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <i className="ri-calendar-check-line text-xl text-orange-600"></i>
                  </div>
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <i className="ri-arrow-up-line"></i>
                    +17.2%
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">68</div>
                <div className="text-sm text-gray-600">Rendez-vous</div>
                <div className="mt-2 text-xs text-gray-500">Objectif: 75</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reste du contenu */}
        <div className="p-8">
          {/* Évolution des performances */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Évolution des performances</h2>
              <div className="flex gap-2">
                {metrics.map(metric => (
                  <button
                    key={metric.id}
                    onClick={() => setSelectedMetric(metric.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      selectedMetric === metric.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {metric.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Graphique */}
            <div className="space-y-4">
              {currentData.map((item, index) => {
                const valuePercentage = (item.value / maxValue) * 100;
                const targetPercentage = (item.target / maxValue) * 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700 w-12">{item.month}</span>
                      <div className="flex-1 mx-4 relative h-12">
                        {/* Barre objectif */}
                        <div 
                          className="absolute top-0 h-5 bg-gray-200 rounded-lg transition-all duration-500"
                          style={{ width: `${targetPercentage}%` }}
                        >
                          <span className="absolute right-2 top-0.5 text-xs text-gray-600">
                            Objectif: {item.target.toLocaleString()}
                          </span>
                        </div>
                        {/* Barre réalisé */}
                        <div 
                          className={`absolute top-6 h-5 bg-blue-500 rounded-lg transition-all duration-500 hover:bg-blue-600 cursor-pointer`}
                          style={{ width: `${valuePercentage}%` }}
                        >
                          <span className="absolute right-2 top-0.5 text-xs text-white font-medium">
                            {item.value.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <span className={`font-semibold w-16 text-right ${
                        item.value >= item.target ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        {item.value >= item.target ? '+' : ''}{((item.value / item.target - 1) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-600">Réalisé</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <span className="text-sm text-gray-600">Objectif</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Répartition par source */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Répartition par source</h2>
              <div className="space-y-4">
                {sourceData.map((source, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{source.name}</span>
                      <span className="text-sm font-bold text-gray-900">{source.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ width: `${source.value}%`, backgroundColor: source.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tunnel de conversion */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tunnel de conversion</h2>
              <div className="space-y-3">
                {conversionFunnel.map((stage, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-900">{stage.count}</span>
                        <span className="text-xs text-gray-500 w-12 text-right">{stage.rate.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                        style={{ width: `${stage.rate}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Performance par secteur */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Performance par secteur</h2>
              <div className="space-y-4">
                {sectorData.map((sector, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900">{sector.name}</h3>
                      <span className="text-lg font-bold text-blue-600">{sector.ca.toLocaleString()}€</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <i className="ri-user-line text-gray-400"></i>
                        <span className="text-gray-600">{sector.contacts} contacts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-check-line text-gray-400"></i>
                        <span className="text-gray-600">{sector.conversions} conversions</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top clients */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Top 5 clients</h2>
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full font-bold text-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{client.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{client.ca.toLocaleString()}€</span>
                        <span>•</span>
                        <span>{client.deals} deals</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-green-600 font-medium text-sm">
                        <i className="ri-arrow-up-line"></i>
                        <span>{client.growth}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}