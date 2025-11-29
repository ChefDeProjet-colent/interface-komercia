import { useState, useEffect } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';
import AdBanner from '../../../components/feature/AdBanner';

export default function EventStatistics() {
  const { trackAction } = useAdManager();
  const [selectedPeriod, setSelectedPeriod] = useState('last-3-months');
  const [selectedMetric, setSelectedMetric] = useState('participation');
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);

  const [overallStats] = useState({
    totalEvents: 24,
    totalParticipants: 1247,
    avgParticipationRate: 78.5,
    avgSatisfactionScore: 4.6,
    totalRevenue: 89500,
    conversionRate: 12.3,
    repeatAttendanceRate: 34.7,
    npsScore: 67
  });

  const [eventStats] = useState([
    {
      id: 1,
      title: 'Salon Tech Innovation 2024',
      date: '2024-01-15',
      type: 'Salon',
      registrations: 520,
      participants: 450,
      participationRate: 86.5,
      satisfactionScore: 4.7,
      revenue: 25000,
      leads: 89,
      conversionRate: 15.2,
      feedback: {
        positive: 78,
        neutral: 18,
        negative: 4
      },
      demographics: {
        entrepreneurs: 45,
        commerciaux: 30,
        consultants: 15,
        autres: 10
      }
    },
    {
      id: 2,
      title: 'Webinaire Marketing Digital',
      date: '2024-01-18',
      type: 'Webinaire',
      registrations: 180,
      participants: 150,
      participationRate: 83.3,
      satisfactionScore: 4.5,
      revenue: 8500,
      leads: 34,
      conversionRate: 18.9,
      feedback: {
        positive: 82,
        neutral: 15,
        negative: 3
      },
      demographics: {
        entrepreneurs: 35,
        commerciaux: 40,
        consultants: 20,
        autres: 5
      }
    },
    {
      id: 3,
      title: 'Atelier Leadership Féminin',
      date: '2024-01-22',
      type: 'Atelier',
      registrations: 45,
      participants: 40,
      participationRate: 88.9,
      satisfactionScore: 4.8,
      revenue: 6000,
      leads: 12,
      conversionRate: 25.0,
      feedback: {
        positive: 85,
        neutral: 12,
        negative: 3
      },
      demographics: {
        entrepreneurs: 60,
        commerciaux: 25,
        consultants: 10,
        autres: 5
      }
    },
    {
      id: 4,
      title: 'Conférence IA & Business',
      date: '2024-01-25',
      type: 'Conférence',
      registrations: 300,
      participants: 280,
      participationRate: 93.3,
      satisfactionScore: 4.9,
      revenue: 18000,
      leads: 67,
      conversionRate: 22.1,
      feedback: {
        positive: 88,
        neutral: 10,
        negative: 2
      },
      demographics: {
        entrepreneurs: 40,
        commerciaux: 35,
        consultants: 20,
        autres: 5
      }
    }
  ]);

  const [participationTrends] = useState([
    { month: 'Oct 2023', events: 6, participants: 420, satisfaction: 4.3 },
    { month: 'Nov 2023', events: 8, participants: 580, satisfaction: 4.4 },
    { month: 'Déc 2023', events: 5, participants: 380, satisfaction: 4.5 },
    { month: 'Jan 2024', events: 9, participants: 720, satisfaction: 4.6 },
    { month: 'Fév 2024', events: 7, participants: 650, satisfaction: 4.7 }
  ]);

  const [satisfactionData] = useState([
    { category: 'Contenu', score: 4.7, responses: 234 },
    { category: 'Organisation', score: 4.5, responses: 234 },
    { category: 'Intervenants', score: 4.8, responses: 234 },
    { category: 'Networking', score: 4.3, responses: 234 },
    { category: 'Logistique', score: 4.4, responses: 234 },
    { category: 'Valeur ajoutée', score: 4.6, responses: 234 }
  ]);

  useEffect(() => {
    trackAction('view-event-statistics', {
      section: 'statistics',
      timestamp: Date.now()
    });
  }, []);

  const generateReport = (format: string) => {
    const reportData = {
      period: selectedPeriod,
      events: selectedEvents.length > 0 ? selectedEvents : eventStats.map(e => e.id),
      format,
      timestamp: Date.now()
    };

    trackAction('generate-report', reportData);
    
    // Simulation de génération de rapport
    setTimeout(() => {
      alert(`Rapport ${format.toUpperCase()} généré avec succès ! Téléchargement en cours...`);
      setShowExportModal(false);
    }, 1500);
  };

  const sendReportByEmail = (email: string, format: string) => {
    trackAction('send-report-email', {
      email,
      format,
      timestamp: Date.now()
    });
    
    alert(`Rapport envoyé à ${email} avec succès !`);
    setShowExportModal(false);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Salon': return 'bg-blue-100 text-blue-800';
      case 'Webinaire': return 'bg-green-100 text-green-800';
      case 'Atelier': return 'bg-yellow-100 text-yellow-800';
      case 'Conférence': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSatisfactionColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec filtres */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              <i className="ri-bar-chart-line text-purple-600 mr-3"></i>
              Statistiques et Impact des Événements
            </h2>
            <p className="text-gray-600 mt-1">
              Analysez les performances et l'impact de vos événements
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm pr-8"
            >
              <option value="last-month">Dernier mois</option>
              <option value="last-3-months">3 derniers mois</option>
              <option value="last-6-months">6 derniers mois</option>
              <option value="last-year">Dernière année</option>
            </select>
            <button
              onClick={() => setShowExportModal(true)}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium whitespace-nowrap"
            >
              <i className="ri-download-line mr-2"></i>
              Exporter Rapport
            </button>
          </div>
        </div>

        {/* Bannière publicitaire */}
        <AdBanner
          position="statistics-header"
          format="banner"
          section="event-statistics"
          className="w-full"
          userContext={{
            userType: 'event-organizer',
            targetCategories: ['analytics-tools', 'business-intelligence', 'reporting'],
            priority: 'high'
          }}
        />
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Participants</p>
              <p className="text-3xl font-bold text-gray-900">{overallStats.totalParticipants.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">
                <i className="ri-arrow-up-line mr-1"></i>
                +15% vs période précédente
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-group-line text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux de Participation</p>
              <p className="text-3xl font-bold text-gray-900">{overallStats.avgParticipationRate}%</p>
              <p className="text-sm text-green-600 mt-1">
                <i className="ri-arrow-up-line mr-1"></i>
                +3.2% vs période précédente
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-star-line text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfaction Moyenne</p>
              <p className="text-3xl font-bold text-gray-900">{overallStats.avgSatisfactionScore}/5</p>
              <p className="text-sm text-green-600 mt-1">
                <i className="ri-star-line mr-1"></i>
                Excellent niveau
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-star-line text-yellow-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux de Conversion</p>
              <p className="text-3xl font-bold text-gray-900">{overallStats.conversionRate}%</p>
              <p className="text-sm text-green-600 mt-1">
                <i className="ri-arrow-up-line mr-1"></i>
                +2.1% vs période précédente
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-line-chart-line text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique des tendances */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              <i className="ri-line-chart-line text-purple-600 mr-2"></i>
              Tendances de Participation
            </h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm pr-8"
            >
              <option value="participation">Participation</option>
              <option value="satisfaction">Satisfaction</option>
              <option value="events">Nombre d'événements</option>
            </select>
          </div>
          
          <div className="space-y-4">
            {participationTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">{trend.month}</span>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {selectedMetric === 'participation' ? `${trend.participants} participants` :
                       selectedMetric === 'satisfaction' ? `${trend.satisfaction}/5` :
                       `${trend.events} événements`}
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-purple-600 h-2 rounded-full"
                        style={{
                          width: selectedMetric === 'participation' ? `${(trend.participants / 800) * 100}%` :
                                 selectedMetric === 'satisfaction' ? `${(trend.satisfaction / 5) * 100}%` :
                                 `${(trend.events / 10) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analyse de satisfaction */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            <i className="ri-emotion-happy-line text-purple-600 mr-2"></i>
            Analyse de Satisfaction
          </h3>
          
          <div className="space-y-4">
            {satisfactionData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    <span className={`text-sm font-bold ${getSatisfactionColor(item.score)}`}>
                      {item.score}/5
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.score >= 4.5 ? 'bg-green-500' :
                        item.score >= 4.0 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(item.score / 5) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.responses} réponses
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Détails par événement */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            <i className="ri-calendar-check-line text-purple-600 mr-2"></i>
            Performance par Événement
          </h3>
          <div className="flex items-center space-x-2">
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              <i className="ri-filter-line mr-1"></i>
              Filtrer
            </button>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              <i className="ri-sort-desc mr-1"></i>
              Trier
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Événement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Satisfaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenus
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Retours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {eventStats.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{event.title}</div>
                      <div className="flex items-center mt-1">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {new Date(event.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {event.participants}/{event.registrations}
                    </div>
                    <div className="text-xs text-gray-500">
                      {event.participationRate}% de taux
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${getSatisfactionColor(event.satisfactionScore)}`}>
                        {event.satisfactionScore}/5
                      </span>
                      <div className="ml-2 flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i
                            key={star}
                            className={`ri-star-${star <= Math.floor(event.satisfactionScore) ? 'fill' : 'line'} text-yellow-400 text-xs`}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {event.revenue.toLocaleString()} €
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round(event.revenue / event.participants)} €/participant
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{event.conversionRate}%</div>
                    <div className="text-xs text-gray-500">{event.leads} leads</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" title={`${event.feedback.positive}% positifs`}></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" title={`${event.feedback.neutral}% neutres`}></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full" title={`${event.feedback.negative}% négatifs`}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {event.feedback.positive}% positifs
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        <i className="ri-eye-line"></i>
                      </button>
                      <button className="text-purple-600 hover:text-purple-700 text-sm">
                        <i className="ri-download-line"></i>
                      </button>
                      <button className="text-green-600 hover:text-green-700 text-sm">
                        <i className="ri-share-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bannières publicitaires en bas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdBanner
          position="statistics-footer-left"
          format="animated"
          section="event-statistics"
          className="w-full"
          userContext={{
            userType: 'event-organizer',
            targetCategories: ['data-analysis', 'consulting', 'optimization'],
            priority: 'medium'
          }}
        />
        <AdBanner
          position="statistics-footer-right"
          format="banner"
          section="event-statistics"
          className="w-full"
          userContext={{
            userType: 'event-organizer',
            targetCategories: ['advanced-analytics', 'business-intelligence', 'reporting-tools'],
            priority: 'medium'
          }}
        />
      </div>

      {/* Modal d'export */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  <i className="ri-download-line text-purple-600 mr-2"></i>
                  Exporter le Rapport
                </h3>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sélectionner les événements
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedEvents.length === eventStats.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEvents(eventStats.map(event => event.id));
                        } else {
                          setSelectedEvents([]);
                        }
                      }}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2"
                    />
                    <span className="text-sm font-medium">Tous les événements</span>
                  </label>
                  {eventStats.map(event => (
                    <label key={event.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(event.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEvents([...selectedEvents, event.id]);
                          } else {
                            setSelectedEvents(selectedEvents.filter(id => id !== event.id));
                          }
                        }}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mr-2"
                      />
                      <span className="text-sm">{event.title}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Format d'export
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => generateReport('pdf')}
                    className="p-4 border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center"
                  >
                    <i className="ri-file-pdf-line text-2xl text-red-600 mb-2"></i>
                    <div className="text-sm font-medium">PDF</div>
                  </button>
                  <button
                    onClick={() => generateReport('excel')}
                    className="p-4 border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center"
                  >
                    <i className="ri-file-excel-line text-2xl text-green-600 mb-2"></i>
                    <div className="text-sm font-medium">Excel</div>
                  </button>
                  <button
                    onClick={() => generateReport('csv')}
                    className="p-4 border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center"
                  >
                    <i className="ri-file-text-line text-2xl text-blue-600 mb-2"></i>
                    <div className="text-sm font-medium">CSV</div>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Envoyer par email (optionnel)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="email@exemple.com"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      if (input.value) {
                        sendReportByEmail(input.value, 'pdf');
                      }
                    }}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm whitespace-nowrap"
                  >
                    <i className="ri-mail-send-line mr-1"></i>
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { EventStatistics };
