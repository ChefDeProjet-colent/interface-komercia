import { useState, useEffect } from 'react';
import LoadingButton from '../../../components/base/LoadingButton';
import { useAdManager } from '../../../components/feature/AdManager';

export default function FinancialDashboard() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'opportunity',
      title: 'Nouvelle opportunité de financement',
      message: 'TechCorp Solutions recherche un financement de 150K€',
      time: '5 min',
      priority: 'high',
      read: false
    },
    {
      id: 2,
      type: 'deadline',
      title: 'Échéance importante',
      message: 'StartupXYZ - Échéance de remboursement dans 3 jours',
      time: '1h',
      priority: 'medium',
      read: false
    },
    {
      id: 3,
      type: 'risk',
      title: 'Alerte risque',
      message: 'Baisse de performance détectée chez GlobalTrade Ltd',
      time: '2h',
      priority: 'high',
      read: true
    }
  ]);

  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      company: 'TechCorp Solutions',
      amount: 150000,
      type: 'Prêt équipement',
      status: 'En évaluation',
      risk: 'Faible',
      deadline: '2024-02-15'
    },
    {
      id: 2,
      company: 'InnovateSAS',
      amount: 75000,
      type: 'Microcrédit',
      status: 'Approuvé',
      risk: 'Faible',
      deadline: '2024-02-10'
    },
    {
      id: 3,
      company: 'StartupXYZ',
      amount: 200000,
      type: 'Capital croissance',
      status: 'En négociation',
      risk: 'Moyen',
      deadline: '2024-02-20'
    }
  ]);

  const { trackAction } = useAdManager();

  useEffect(() => {
    trackAction('view-financial-dashboard');
  }, []);

  const setLoading = (key: string, value: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = async () => {
    setLoading('export', true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Simulation du téléchargement
      const data = {
        clients: 247,
        financements: 2800000,
        tauxRemboursement: 94.2,
        risques: 18
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'donnees-financieres.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
    } finally {
      setLoading('export', false);
    }
  };

  const handleGenerateReport = async () => {
    setLoading('report', true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      window.REACT_APP_NAVIGATE('/financial-institutions?tab=reports');
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
    } finally {
      setLoading('report', false);
    }
  };

  const handleNewCampaign = async () => {
    setLoading('campaign', true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.REACT_APP_NAVIGATE('/financial-institutions?tab=promotion');
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setLoading('campaign', false);
    }
  };

  const handleMarkAsRead = async (notificationId: number) => {
    setLoading(`notification-${notificationId}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    } finally {
      setLoading(`notification-${notificationId}`, false);
    }
  };

  const handleViewOpportunity = async (opportunityId: number) => {
    setLoading(`opportunity-${opportunityId}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      // Redirection vers les détails de l'opportunité
      console.log(`Affichage des détails de l'opportunité ${opportunityId}`);
    } catch (error) {
      console.error('Erreur lors de l\'affichage:', error);
    } finally {
      setLoading(`opportunity-${opportunityId}`, false);
    }
  };

  const handleContactClient = async (company: string) => {
    setLoading(`contact-${company}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.REACT_APP_NAVIGATE('/financial-institutions?tab=collaboration');
    } catch (error) {
      console.error('Erreur lors du contact:', error);
    } finally {
      setLoading(`contact-${company}`, false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En évaluation': return 'bg-yellow-100 text-yellow-800';
      case 'Approuvé': return 'bg-green-100 text-green-800';
      case 'En négociation': return 'bg-blue-100 text-blue-800';
      case 'Rejeté': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Faible': return 'bg-green-100 text-green-800';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800';
      case 'Élevé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec actions principales */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Tableau de Bord Financier</h2>
            <p className="text-gray-600">Gestion des financements et évaluation des risques</p>
          </div>
          <div className="flex items-center space-x-3">
            <LoadingButton
              onClick={handleExportData}
              loading={loadingStates.export}
              loadingText="Export en cours..."
              variant="outline"
              icon="ri-download-line"
              className="text-sm"
            >
              Exporter Données
            </LoadingButton>
            <LoadingButton
              onClick={handleGenerateReport}
              loading={loadingStates.report}
              loadingText="Génération..."
              variant="primary"
              icon="ri-file-text-line"
              className="text-sm"
            >
              Générer Rapport
            </LoadingButton>
            <LoadingButton
              onClick={handleNewCampaign}
              loading={loadingStates.campaign}
              loadingText="Création..."
              variant="success"
              icon="ri-add-line"
              className="text-sm"
            >
              Nouvelle Campagne
            </LoadingButton>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Clients Potentiels</p>
                <p className="text-3xl font-bold text-blue-900">247</p>
                <p className="text-xs text-blue-700 mt-1">+12% vs mois dernier</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <i className="ri-user-line text-white text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Financements en Cours</p>
                <p className="text-3xl font-bold text-green-900">€2.8M</p>
                <p className="text-xs text-green-700 mt-1">+8% ce trimestre</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <i className="ri-money-euro-circle-line text-white text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Taux de Remboursement</p>
                <p className="text-3xl font-bold text-purple-900">94.2%</p>
                <p className="text-xs text-purple-700 mt-1">+2.1% amélioration</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <i className="ri-line-chart-line text-white text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Risques Identifiés</p>
                <p className="text-3xl font-bold text-orange-900">18</p>
                <p className="text-xs text-orange-700 mt-1">-5% vs mois dernier</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <i className="ri-alert-line text-white text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications et opportunités */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              {notifications.filter(n => !n.read).length} nouvelles
            </span>
          </div>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-4 rounded-lg border ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">{notification.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                        {notification.priority === 'high' ? 'Urgent' : notification.priority === 'medium' ? 'Important' : 'Normal'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <LoadingButton
                      onClick={() => handleMarkAsRead(notification.id)}
                      loading={loadingStates[`notification-${notification.id}`]}
                      loadingText="..."
                      variant="ghost"
                      size="sm"
                      icon="ri-check-line"
                      className="text-xs"
                    >
                      Marquer lu
                    </LoadingButton>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunités récentes */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Opportunités Récentes</h3>
            <LoadingButton
              onClick={() => window.REACT_APP_NAVIGATE('/financial-institutions?tab=data')}
              variant="outline"
              size="sm"
              icon="ri-eye-line"
              className="text-xs"
            >
              Voir tout
            </LoadingButton>
          </div>
          <div className="space-y-4">
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className="border rounded-lg p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{opportunity.company}</h4>
                    <p className="text-sm text-gray-600">{opportunity.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-green-600">€{opportunity.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Échéance: {new Date(opportunity.deadline).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(opportunity.status)}`}>
                      {opportunity.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(opportunity.risk)}`}>
                      Risque {opportunity.risk}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <LoadingButton
                      onClick={() => handleViewOpportunity(opportunity.id)}
                      loading={loadingStates[`opportunity-${opportunity.id}`]}
                      loadingText="..."
                      variant="outline"
                      size="sm"
                      icon="ri-eye-line"
                      className="text-xs"
                    >
                      Détails
                    </LoadingButton>
                    <LoadingButton
                      onClick={() => handleContactClient(opportunity.company)}
                      loading={loadingStates[`contact-${opportunity.company}`]}
                      loadingText="..."
                      variant="primary"
                      size="sm"
                      icon="ri-message-line"
                      className="text-xs"
                    >
                      Contacter
                    </LoadingButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { FinancialDashboard };
