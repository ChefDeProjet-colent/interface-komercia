import { useState, useEffect } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';
import AdBanner from '../../../components/feature/AdBanner';

export default function EventPromotions() {
  const { trackAction } = useAdManager();
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [showCreateCampaignModal, setShowCreateCampaignModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedEventForShare, setSelectedEventForShare] = useState<number | null>(null);

  const [events] = useState([
    { id: 1, title: 'Salon Tech Innovation 2024', date: '2024-02-15', status: 'confirmed' },
    { id: 2, title: 'Webinaire Marketing Digital', date: '2024-02-18', status: 'confirmed' },
    { id: 3, title: 'Atelier Leadership Féminin', date: '2024-02-22', status: 'pending' },
    { id: 4, title: 'Conférence Intelligence Artificielle', date: '2024-02-25', status: 'confirmed' }
  ]);

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      eventId: 1,
      eventTitle: 'Salon Tech Innovation 2024',
      name: 'Campagne LinkedIn Tech',
      type: 'social-media',
      platform: 'LinkedIn',
      status: 'active',
      budget: 2500,
      spent: 1850,
      impressions: 45000,
      clicks: 1200,
      conversions: 89,
      ctr: 2.67,
      cpc: 1.54,
      startDate: '2024-01-10',
      endDate: '2024-02-10'
    },
    {
      id: 2,
      eventId: 1,
      eventTitle: 'Salon Tech Innovation 2024',
      name: 'Email Marketing Tech',
      type: 'email',
      platform: 'Email',
      status: 'active',
      budget: 800,
      spent: 650,
      impressions: 12000,
      clicks: 840,
      conversions: 156,
      ctr: 7.0,
      cpc: 0.77,
      startDate: '2024-01-15',
      endDate: '2024-02-15'
    },
    {
      id: 3,
      eventId: 2,
      eventTitle: 'Webinaire Marketing Digital',
      name: 'Google Ads Marketing',
      type: 'search-ads',
      platform: 'Google Ads',
      status: 'paused',
      budget: 1500,
      spent: 1200,
      impressions: 28000,
      clicks: 560,
      conversions: 67,
      ctr: 2.0,
      cpc: 2.14,
      startDate: '2024-01-20',
      endDate: '2024-02-18'
    },
    {
      id: 4,
      eventId: 3,
      eventTitle: 'Atelier Leadership Féminin',
      name: 'Facebook Ads Leadership',
      type: 'social-media',
      platform: 'Facebook',
      status: 'completed',
      budget: 1000,
      spent: 980,
      impressions: 35000,
      clicks: 875,
      conversions: 45,
      ctr: 2.5,
      cpc: 1.12,
      startDate: '2024-01-05',
      endDate: '2024-01-25'
    }
  ]);

  const [shareLinks] = useState([
    {
      id: 1,
      eventId: 1,
      platform: 'LinkedIn',
      url: 'https://linkedin.com/events/salon-tech-innovation-2024',
      clicks: 1250,
      shares: 89,
      generated: '2024-01-10'
    },
    {
      id: 2,
      eventId: 1,
      platform: 'Facebook',
      url: 'https://facebook.com/events/salon-tech-innovation-2024',
      clicks: 890,
      shares: 156,
      generated: '2024-01-10'
    },
    {
      id: 3,
      eventId: 1,
      platform: 'Twitter',
      url: 'https://twitter.com/events/salon-tech-innovation-2024',
      clicks: 567,
      shares: 234,
      generated: '2024-01-10'
    },
    {
      id: 4,
      eventId: 2,
      platform: 'LinkedIn',
      url: 'https://linkedin.com/events/webinaire-marketing-digital',
      clicks: 678,
      shares: 45,
      generated: '2024-01-15'
    }
  ]);

  const [newCampaign, setNewCampaign] = useState({
    eventId: '',
    name: '',
    type: 'social-media',
    platform: 'LinkedIn',
    budget: 1000,
    startDate: '',
    endDate: '',
    targetAudience: '',
    objectives: 'awareness'
  });

  useEffect(() => {
    trackAction('view-event-promotions', {
      section: 'promotions',
      timestamp: Date.now()
    });
  }, []);

  const handleCreateCampaign = () => {
    const campaign = {
      ...newCampaign,
      id: campaigns.length + 1,
      eventTitle: events.find(e => e.id === parseInt(newCampaign.eventId))?.title || '',
      status: 'draft',
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0,
      cpc: 0
    };
    
    setCampaigns([...campaigns, campaign]);
    setShowCreateCampaignModal(false);
    setNewCampaign({
      eventId: '',
      name: '',
      type: 'social-media',
      platform: 'LinkedIn',
      budget: 1000,
      startDate: '',
      endDate: '',
      targetAudience: '',
      objectives: 'awareness'
    });

    trackAction('create-promotion-campaign', {
      campaignType: newCampaign.type,
      platform: newCampaign.platform,
      budget: newCampaign.budget,
      timestamp: Date.now()
    });
  };

  const generateShareLink = (eventId: number, platform: string) => {
    trackAction('generate-share-link', {
      eventId,
      platform,
      timestamp: Date.now()
    });
    
    alert(`Lien de partage ${platform} généré avec succès !`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'LinkedIn': return 'ri-linkedin-line';
      case 'Facebook': return 'ri-facebook-line';
      case 'Twitter': return 'ri-twitter-line';
      case 'Google Ads': return 'ri-google-line';
      case 'Email': return 'ri-mail-line';
      default: return 'ri-global-line';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'LinkedIn': return 'text-blue-600';
      case 'Facebook': return 'text-blue-800';
      case 'Twitter': return 'text-blue-400';
      case 'Google Ads': return 'text-red-600';
      case 'Email': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredCampaigns = selectedEvent === 'all' 
    ? campaigns 
    : campaigns.filter(campaign => campaign.eventId === parseInt(selectedEvent));

  const filteredShareLinks = selectedEvent === 'all' 
    ? shareLinks 
    : shareLinks.filter(link => link.eventId === parseInt(selectedEvent));

  return (
    <div className="space-y-6">
      {/* En-tête avec actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              <i className="ri-megaphone-line text-purple-600 mr-3"></i>
              Promotion des Événements
            </h2>
            <p className="text-gray-600 mt-1">
              Créez et gérez vos campagnes de promotion pour maximiser la participation
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm pr-8"
            >
              <option value="all">Tous les événements</option>
              {events.map(event => (
                <option key={event.id} value={event.id.toString()}>
                  {event.title}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowCreateCampaignModal(true)}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Nouvelle Campagne
            </button>
          </div>
        </div>

        {/* Bannière publicitaire */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                <i className="ri-advertisement-line mr-2"></i>
                Services de Promotion d'Événements
              </h3>
              <p className="text-blue-100 mb-4">
                Maximisez votre audience avec nos outils de campagnes publicitaires et de gestion de réseaux sociaux
              </p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors whitespace-nowrap">
                <i className="ri-external-link-line mr-2"></i>
                Découvrir
              </button>
            </div>
            <div className="hidden lg:block">
              <i className="ri-megaphone-line text-6xl text-blue-200"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques des campagnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Campagnes Actives</p>
              <p className="text-3xl font-bold text-gray-900">
                {campaigns.filter(c => c.status === 'active').length}
              </p>
              <p className="text-sm text-green-600 mt-1">
                <i className="ri-arrow-up-line mr-1"></i>
                +2 cette semaine
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-play-circle-line text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Budget Total</p>
              <p className="text-3xl font-bold text-gray-900">
                {campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()} €
              </p>
              <p className="text-sm text-blue-600 mt-1">
                <i className="ri-wallet-line mr-1"></i>
                {campaigns.reduce((sum, c) => sum + c.spent, 0).toLocaleString()} € dépensés
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-money-euro-circle-line text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Impressions Totales</p>
              <p className="text-3xl font-bold text-gray-900">
                {(campaigns.reduce((sum, c) => sum + c.impressions, 0) / 1000).toFixed(0)}K
              </p>
              <p className="text-sm text-purple-600 mt-1">
                <i className="ri-eye-line mr-1"></i>
                Portée étendue
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-eye-line text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux de Conversion</p>
              <p className="text-3xl font-bold text-gray-900">
                {((campaigns.reduce((sum, c) => sum + c.conversions, 0) / campaigns.reduce((sum, c) => sum + c.clicks, 0)) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-green-600 mt-1">
                <i className="ri-arrow-up-line mr-1"></i>
                Performance excellente
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-line-chart-line text-orange-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campagnes publicitaires */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              <i className="ri-advertisement-line text-purple-600 mr-2"></i>
              Campagnes Publicitaires
            </h3>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              Voir toutes
            </button>
          </div>
          
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        campaign.platform === 'LinkedIn' ? 'bg-blue-100' :
                        campaign.platform === 'Facebook' ? 'bg-blue-100' :
                        campaign.platform === 'Twitter' ? 'bg-blue-100' :
                        campaign.platform === 'Google Ads' ? 'bg-red-100' :
                        'bg-green-100'
                      }`}>
                        <i className={`${getPlatformIcon(campaign.platform)} ${getPlatformColor(campaign.platform)}`}></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                        <p className="text-sm text-gray-600">{campaign.eventTitle}</p>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status === 'active' ? 'Active' :
                     campaign.status === 'paused' ? 'En pause' :
                     campaign.status === 'completed' ? 'Terminée' : 'Brouillon'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Budget:</span>
                    <span className="font-medium text-gray-900 ml-2">{campaign.budget} €</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Dépensé:</span>
                    <span className="font-medium text-gray-900 ml-2">{campaign.spent} €</span>
                  </div>
                  <div>
                    <span className="text-gray-500">CTR:</span>
                    <span className="font-medium text-gray-900 ml-2">{campaign.ctr}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Conversions:</span>
                    <span className="font-medium text-gray-900 ml-2">{campaign.conversions}</span>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">
                    {Math.round((campaign.spent / campaign.budget) * 100)}%
                  </span>
                </div>
                
                <div className="mt-3 flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    <i className="ri-edit-line mr-1"></i>
                    Modifier
                  </button>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    <i className="ri-play-line mr-1"></i>
                    {campaign.status === 'active' ? 'Pause' : 'Activer'}
                  </button>
                  <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    <i className="ri-bar-chart-line mr-1"></i>
                    Statistiques
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Liens de partage */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              <i className="ri-share-line text-purple-600 mr-2"></i>
              Liens de Partage
            </h3>
            <button
              onClick={() => setShowShareModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Générer Lien
            </button>
          </div>
          
          <div className="space-y-4">
            {filteredShareLinks.map((link) => (
              <div key={link.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                      link.platform === 'LinkedIn' ? 'bg-blue-100' :
                      link.platform === 'Facebook' ? 'bg-blue-100' :
                      'bg-blue-100'
                    }`}>
                      <i className={`${getPlatformIcon(link.platform)} ${getPlatformColor(link.platform)}`}></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{link.platform}</h4>
                      <p className="text-sm text-gray-600">
                        {events.find(e => e.id === link.eventId)?.title}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(link.url)}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    <i className="ri-file-copy-line mr-1"></i>
                    Copier
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded p-2 mb-3">
                  <p className="text-xs text-gray-600 truncate">{link.url}</p>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-500">
                      <i className="ri-mouse-line mr-1"></i>
                      {link.clicks} clics
                    </span>
                    <span className="text-gray-500">
                      <i className="ri-share-forward-line mr-1"></i>
                      {link.shares} partages
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Généré le {new Date(link.generated).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bannière publicitaire en bas */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              <i className="ri-global-line mr-2"></i>
              Outils de Gestion de Campagnes Publicitaires
            </h3>
            <p className="text-green-100 mb-4">
              Automatisez vos campagnes sur toutes les plateformes avec nos solutions d'intégration avancées
            </p>
            <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors whitespace-nowrap">
              <i className="ri-arrow-right-line mr-2"></i>
              En savoir plus
            </button>
          </div>
          <div className="hidden lg:block">
            <i className="ri-advertisement-line text-6xl text-green-200"></i>
          </div>
        </div>
      </div>

      {/* Modal de création de campagne */}
      {showCreateCampaignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  <i className="ri-add-circle-line text-purple-600 mr-2"></i>
                  Créer une Nouvelle Campagne
                </h3>
                <button
                  onClick={() => setShowCreateCampaignModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Événement *
                  </label>
                  <select
                    value={newCampaign.eventId}
                    onChange={(e) => setNewCampaign({...newCampaign, eventId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                  >
                    <option value="">Sélectionner un événement</option>
                    {events.map(event => (
                      <option key={event.id} value={event.id.toString()}>
                        {event.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de la campagne *
                  </label>
                  <input
                    type="text"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: Campagne LinkedIn Tech"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de campagne *
                  </label>
                  <select
                    value={newCampaign.type}
                    onChange={(e) => setNewCampaign({...newCampaign, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                  >
                    <option value="social-media">Réseaux sociaux</option>
                    <option value="search-ads">Publicité de recherche</option>
                    <option value="email">Email marketing</option>
                    <option value="display">Publicité display</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plateforme *
                  </label>
                  <select
                    value={newCampaign.platform}
                    onChange={(e) => setNewCampaign({...newCampaign, platform: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                  >
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget (€) *
                  </label>
                  <input
                    type="number"
                    value={newCampaign.budget}
                    onChange={(e) => setNewCampaign({...newCampaign, budget: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min="100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de début *
                  </label>
                  <input
                    type="date"
                    value={newCampaign.startDate}
                    onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de fin *
                  </label>
                  <input
                    type="date"
                    value={newCampaign.endDate}
                    onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Audience cible
                </label>
                <textarea
                  value={newCampaign.targetAudience}
                  onChange={(e) => setNewCampaign({...newCampaign, targetAudience: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Décrivez votre audience cible..."
                  maxLength={500}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Objectif de la campagne
                </label>
                <select
                  value={newCampaign.objectives}
                  onChange={(e) => setNewCampaign({...newCampaign, objectives: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                >
                  <option value="awareness">Notoriété</option>
                  <option value="traffic">Trafic</option>
                  <option value="conversions">Conversions</option>
                  <option value="engagement">Engagement</option>
                </select>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateCampaignModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateCampaign}
                disabled={!newCampaign.eventId || !newCampaign.name || !newCampaign.startDate || !newCampaign.endDate}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                <i className="ri-save-line mr-2"></i>
                Créer la Campagne
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de génération de liens */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  <i className="ri-share-line text-purple-600 mr-2"></i>
                  Générer un Lien de Partage
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sélectionner un événement
                </label>
                <select
                  value={selectedEventForShare || ''}
                  onChange={(e) => setSelectedEventForShare(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                >
                  <option value="">Choisir un événement</option>
                  {events.map(event => (
                    <option key={event.id} value={event.id}>
                      {event.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Plateformes de partage
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['LinkedIn', 'Facebook', 'Twitter', 'Email'].map((platform) => (
                    <button
                      key={platform}
                      onClick={() => selectedEventForShare && generateShareLink(selectedEventForShare, platform)}
                      disabled={!selectedEventForShare}
                      className="p-4 border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className={`${getPlatformIcon(platform)} text-2xl ${getPlatformColor(platform)} mb-2`}></i>
                      <div className="text-sm font-medium">{platform}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { EventPromotions };