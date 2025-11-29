import { useState, useEffect } from 'react';
import LoadingButton from '../../../components/base/LoadingButton';

export default function ServicePromotion() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Microcrédits Entrepreneurs',
      type: 'Microcrédit',
      status: 'Active',
      budget: 15000,
      spent: 8500,
      impressions: 185000,
      clicks: 5480,
      conversions: 425,
      ctr: 2.9,
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      targetSectors: ['Tech', 'Innovation', 'Commerce']
    },
    {
      id: 2,
      name: 'Prêts Équipement PME',
      type: 'Prêt équipement',
      status: 'Active',
      budget: 25000,
      spent: 12300,
      impressions: 145000,
      clicks: 4200,
      conversions: 320,
      ctr: 2.8,
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      targetSectors: ['Industrie', 'Manufacturing']
    },
    {
      id: 3,
      name: 'Financement Croissance',
      type: 'Capital croissance',
      status: 'Terminée',
      budget: 30000,
      spent: 30000,
      impressions: 220000,
      clicks: 6800,
      conversions: 580,
      ctr: 3.1,
      startDate: '2023-10-01',
      endDate: '2023-12-31',
      targetSectors: ['Startup', 'Tech', 'Innovation']
    }
  ]);

  const [services] = useState([
    {
      id: 1,
      name: 'Microcrédit Express',
      type: 'Microcrédit',
      interestRate: 3.5,
      maxAmount: 50000,
      duration: '6-36 mois',
      requirements: 'Entreprise &gt; 2 ans',
      targetSectors: ['Commerce', 'Services', 'Artisanat'],
      active: true
    },
    {
      id: 2,
      name: 'Prêt Équipement Pro',
      type: 'Prêt équipement',
      interestRate: 2.8,
      maxAmount: 200000,
      duration: '12-84 mois',
      requirements: 'Garantie équipement',
      targetSectors: ['Industrie', 'Tech', 'Manufacturing'],
      active: true
    },
    {
      id: 3,
      name: 'Capital Croissance',
      type: 'Financement',
      interestRate: 4.2,
      maxAmount: 500000,
      duration: '24-120 mois',
      requirements: 'Business plan validé',
      targetSectors: ['Startup', 'Innovation', 'Tech'],
      active: false
    }
  ]);

  const setLoading = (key: string, value: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: value }));
  };

  const handleCreateCampaign = async (campaignData: any) => {
    setLoading('create-campaign', true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newCampaign = {
        id: campaigns.length + 1,
        ...campaignData,
        status: 'Active',
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        ctr: 0
      };
      setCampaigns(prev => [...prev, newCampaign]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setLoading('create-campaign', false);
    }
  };

  const handlePauseCampaign = async (campaignId: number) => {
    setLoading(`pause-${campaignId}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCampaigns(prev => 
        prev.map(campaign => 
          campaign.id === campaignId 
            ? { ...campaign, status: campaign.status === 'Active' ? 'En pause' : 'Active' }
            : campaign
        )
      );
    } catch (error) {
      console.error('Erreur lors de la pause:', error);
    } finally {
      setLoading(`pause-${campaignId}`, false);
    }
  };

  const handleViewStats = async (campaign: any) => {
    setLoading(`stats-${campaign.id}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSelectedCampaign(campaign);
    } catch (error) {
      console.error('Erreur lors de l\'affichage:', error);
    } finally {
      setLoading(`stats-${campaign.id}`, false);
    }
  };

  const handleEditCampaign = async (campaignId: number) => {
    setLoading(`edit-${campaignId}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`Édition de la campagne ${campaignId}`);
    } catch (error) {
      console.error('Erreur lors de l\'édition:', error);
    } finally {
      setLoading(`edit-${campaignId}`, false);
    }
  };

  const handleToggleService = async (serviceId: number) => {
    setLoading(`toggle-${serviceId}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log(`Service ${serviceId} activé/désactivé`);
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
    } finally {
      setLoading(`toggle-${serviceId}`, false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'En pause': return 'bg-yellow-100 text-yellow-800';
      case 'Terminée': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateROI = (campaign: any) => {
    if (campaign.spent === 0) return 0;
    const revenue = campaign.conversions * 1000; // Estimation €1000 par conversion
    return ((revenue - campaign.spent) / campaign.spent * 100);
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec actions principales */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Promotion des Services Financiers</h2>
            <p className="text-gray-600">Gestion des campagnes et promotion des offres</p>
          </div>
          <div className="flex items-center space-x-3">
            <LoadingButton
              onClick={() => setShowOfferModal(true)}
              variant="outline"
              icon="ri-service-line"
              className="text-sm"
            >
              Gérer Services
            </LoadingButton>
            <LoadingButton
              onClick={() => setShowCreateModal(true)}
              variant="primary"
              icon="ri-add-line"
              className="text-sm"
            >
              Nouvelle Campagne
            </LoadingButton>
          </div>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Campagnes Actives</p>
                <p className="text-3xl font-bold text-blue-900">{campaigns.filter(c => c.status === 'Active').length}</p>
                <p className="text-xs text-blue-700 mt-1">Sur {campaigns.length} total</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <i className="ri-megaphone-line text-white text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Budget Total</p>
                <p className="text-3xl font-bold text-green-900">€{campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}</p>
                <p className="text-xs text-green-700 mt-1">€{campaigns.reduce((sum, c) => sum + c.spent, 0).toLocaleString()} dépensé</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <i className="ri-money-euro-circle-line text-white text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Impressions Totales</p>
                <p className="text-3xl font-bold text-purple-900">{(campaigns.reduce((sum, c) => sum + c.impressions, 0) / 1000).toFixed(0)}K</p>
                <p className="text-xs text-purple-700 mt-1">Ce mois</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <i className="ri-eye-line text-white text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Conversions</p>
                <p className="text-3xl font-bold text-orange-900">{campaigns.reduce((sum, c) => sum + c.conversions, 0)}</p>
                <p className="text-xs text-orange-700 mt-1">CTR moyen: {(campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length).toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <i className="ri-target-line text-white text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des campagnes */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campagnes en Cours</h3>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="border rounded-lg p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{campaign.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {campaign.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Secteurs ciblés: {campaign.targetSectors.join(', ')}
                  </p>
                  <p className="text-xs text-gray-500">
                    Du {new Date(campaign.startDate).toLocaleDateString('fr-FR')} au {new Date(campaign.endDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {calculateROI(campaign).toFixed(1)}%
                  </div>
                  <p className="text-xs text-gray-500">ROI</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600">Budget</p>
                  <p className="font-semibold text-gray-900">€{campaign.budget.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">€{campaign.spent.toLocaleString()} dépensé</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600">Impressions</p>
                  <p className="font-semibold text-blue-600">{campaign.impressions.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600">Clics</p>
                  <p className="font-semibold text-purple-600">{campaign.clicks.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600">Conversions</p>
                  <p className="font-semibold text-green-600">{campaign.conversions}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600">CTR</p>
                  <p className="font-semibold text-orange-600">{campaign.ctr}%</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <LoadingButton
                  onClick={() => handleViewStats(campaign)}
                  loading={loadingStates[`stats-${campaign.id}`]}
                  loadingText="Chargement..."
                  variant="outline"
                  size="sm"
                  icon="ri-bar-chart-line"
                  className="text-xs"
                >
                  Statistiques
                </LoadingButton>
                <LoadingButton
                  onClick={() => handleEditCampaign(campaign.id)}
                  loading={loadingStates[`edit-${campaign.id}`]}
                  loadingText="Édition..."
                  variant="outline"
                  size="sm"
                  icon="ri-edit-line"
                  className="text-xs"
                >
                  Modifier
                </LoadingButton>
                <LoadingButton
                  onClick={() => handlePauseCampaign(campaign.id)}
                  loading={loadingStates[`pause-${campaign.id}`]}
                  loadingText={campaign.status === 'Active' ? 'Pause...' : 'Reprise...'}
                  variant={campaign.status === 'Active' ? 'warning' : 'success'}
                  size="sm"
                  icon={campaign.status === 'Active' ? 'ri-pause-line' : 'ri-play-line'}
                  className="text-xs"
                >
                  {campaign.status === 'Active' ? 'Mettre en pause' : 'Reprendre'}
                </LoadingButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de création de campagne */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Créer une Nouvelle Campagne</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                handleCreateCampaign({
                  name: formData.get('name'),
                  type: formData.get('type'),
                  budget: parseInt(formData.get('budget') as string),
                  startDate: formData.get('startDate'),
                  endDate: formData.get('endDate'),
                  targetSectors: (formData.get('sectors') as string).split(',').map(s => s.trim())
                });
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la campagne</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: Microcrédits Artisans 2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type de service</label>
                    <select
                      name="type"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="Microcrédit">Microcrédit</option>
                      <option value="Prêt équipement">Prêt équipement</option>
                      <option value="Capital croissance">Capital croissance</option>
                      <option value="Financement participatif">Financement participatif</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Budget (€)</label>
                      <input
                        type="number"
                        name="budget"
                        required
                        min="1000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="15000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Secteurs ciblés</label>
                      <input
                        type="text"
                        name="sectors"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tech, Commerce, Innovation"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date de début</label>
                      <input
                        type="date"
                        name="startDate"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date de fin</label>
                      <input
                        type="date"
                        name="endDate"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Annuler
                  </button>
                  <LoadingButton
                    type="submit"
                    loading={loadingStates['create-campaign']}
                    loadingText="Création en cours..."
                    variant="primary"
                    icon="ri-add-line"
                  >
                    Créer la Campagne
                  </LoadingButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de gestion des services */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Gestion des Services Financiers</h3>
                <button
                  onClick={() => setShowOfferModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{service.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${service.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {service.active ? 'Actif' : 'Inactif'}
                          </span>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                            {service.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Secteurs: {service.targetSectors.join(', ')}
                        </p>
                        <p className="text-xs text-gray-500">
                          Conditions: {service.requirements}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {service.interestRate}%
                        </div>
                        <p className="text-xs text-gray-500">Taux d'intérêt</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600">Montant maximum</p>
                        <p className="font-semibold text-green-600">€{service.maxAmount.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600">Durée</p>
                        <p className="font-semibold text-blue-600">{service.duration}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600">Taux</p>
                        <p className="font-semibold text-purple-600">{service.interestRate}%</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <LoadingButton
                        onClick={() => handleToggleService(service.id)}
                        loading={loadingStates[`toggle-${service.id}`]}
                        loadingText={service.active ? 'Désactivation...' : 'Activation...'}
                        variant={service.active ? 'warning' : 'success'}
                        size="sm"
                        icon={service.active ? 'ri-pause-line' : 'ri-play-line'}
                        className="text-xs"
                      >
                        {service.active ? 'Désactiver' : 'Activer'}
                      </LoadingButton>
                      <LoadingButton
                        onClick={() => console.log(`Édition du service ${service.id}`)}
                        variant="outline"
                        size="sm"
                        icon="ri-edit-line"
                        className="text-xs"
                      >
                        Modifier
                      </LoadingButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de statistiques détaillées */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Statistiques - {selectedCampaign.name}</h3>
                <button
                  onClick={() => setSelectedCampaign(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedCampaign.impressions.toLocaleString()}</div>
                    <div className="text-sm text-blue-700">Impressions</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{selectedCampaign.clicks.toLocaleString()}</div>
                    <div className="text-sm text-purple-700">Clics</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{selectedCampaign.conversions}</div>
                    <div className="text-sm text-green-700">Conversions</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">{calculateROI(selectedCampaign).toFixed(1)}%</div>
                    <div className="text-sm text-orange-700">ROI</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Détails de la Campagne</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <span className="ml-2 font-medium">{selectedCampaign.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Statut:</span>
                      <span className="ml-2 font-medium">{selectedCampaign.status}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Budget:</span>
                      <span className="ml-2 font-medium">€{selectedCampaign.budget.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Dépensé:</span>
                      <span className="ml-2 font-medium">€{selectedCampaign.spent.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">CTR:</span>
                      <span className="ml-2 font-medium">{selectedCampaign.ctr}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Secteurs:</span>
                      <span className="ml-2 font-medium">{selectedCampaign.targetSectors.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { ServicePromotion };
