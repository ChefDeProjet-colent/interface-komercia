import React, { useState } from 'react';
import { Card } from '../../components/base/Card';
import { Button } from '../../components/base/Button';
import { LoadingButton } from '../../components/base/LoadingButton';
import { Badge } from '../../components/base/Badge';
import { AdBanner } from '../../components/feature/AdBanner';

const KomerciaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showInformalModal, setShowInformalModal] = useState(false);
  const [showMarketplaceModal, setShowMarketplaceModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showObjectiveModal, setShowObjectiveModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [showWhiteZoneModal, setShowWhiteZoneModal] = useState(false);
  const [showCollaborationModal, setShowCollaborationModal] = useState(false);
  const [showBundleModal, setShowBundleModal] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [showProspectModal, setShowProspectModal] = useState(false);
  const [selectedCommercial, setSelectedCommercial] = useState<any>(null);
  const [selectedProspect, setSelectedProspect] = useState<any>(null);

  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: 'ri-dashboard-line', count: null },
    { id: 'commerciaux', label: 'Commerciaux', icon: 'ri-user-line', count: 24 },
    { id: 'prospects', label: 'Prospects', icon: 'ri-contacts-line', count: 156 },
    { id: 'pipeline', label: 'Pipeline', icon: 'ri-flow-chart', count: 45 },
    { id: 'performances', label: 'Performances', icon: 'ri-bar-chart-line', count: null },
    { id: 'equipes', label: 'Équipes', icon: 'ri-team-line', count: 8 },
    { id: 'reseautage', label: 'Réseautage', icon: 'ri-links-line', count: 12 },
    { id: 'commissions', label: 'Commissions', icon: 'ri-money-dollar-circle-line', count: null },
    { id: 'territoires', label: 'Territoires', icon: 'ri-map-pin-line', count: 6 },
    { id: 'encheres', label: 'Enchères', icon: 'ri-auction-line', count: 18 },
    { id: 'ressources', label: 'Ressources', icon: 'ri-folder-line', count: 42 },
    { id: 'dormants', label: 'Prospects Dormants', icon: 'ri-alarm-warning-line', count: 23 },
    { id: 'crise', label: 'Gestion Crise', icon: 'ri-alert-line', count: 5 },
    { id: 'paiements', label: 'Paiements', icon: 'ri-wallet-line', count: 67 },
    { id: 'informel', label: 'Secteur Informel', icon: 'ri-store-line', count: 89 },
    { id: 'marketplace', label: 'Marketplace', icon: 'ri-shopping-bag-line', count: 34 },
    { id: 'creation-comptes', label: 'Création Comptes', icon: 'ri-user-add-line', count: 156 },
    { id: 'demo', label: 'Comptes Démo', icon: 'ri-test-tube-line', count: 28 },
    { id: 'partenariats', label: 'Partenariats', icon: 'ri-handshake-line', count: 15 },
    { id: 'abonnements', label: 'Abonnements', icon: 'ri-vip-crown-line', count: 203 },
    { id: 'recompenses', label: 'Récompenses', icon: 'ri-trophy-line', count: 47 },
    { id: 'produits', label: 'Produits', icon: 'ri-product-hunt-line', count: 125 },
    { id: 'evenements', label: 'Événements', icon: 'ri-calendar-event-line', count: 12 },
    { id: 'objectifs', label: 'Objectifs', icon: 'ri-target-line', count: 67 },
    { id: 'reclamations', label: 'Réclamations', icon: 'ri-customer-service-line', count: 18 },
    { id: 'formation', label: 'Formation', icon: 'ri-graduation-cap-line', count: 34 },
    { id: 'zones-blanches', label: 'Zones Blanches', icon: 'ri-map-2-line', count: 8 },
    { id: 'collaboration', label: 'Collaboration', icon: 'ri-group-line', count: 25 },
    { id: 'offres-groupees', label: 'Offres Groupées', icon: 'ri-gift-line', count: 19 },
    { id: 'essais-gratuits', label: 'Essais Gratuits', icon: 'ri-time-line', count: 42 },
    { id: 'publicite', label: 'Publicité', icon: 'ri-advertisement-line', count: 156 }
  ];

  const commerciaux = [
    {
      id: 1,
      nom: 'Jean Kouassi',
      specialite: 'Vente B2B Tech',
      experience: '8 ans',
      note: 4.9,
      clients: 52,
      territoire: 'Abidjan',
      statut: 'Disponible',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20African%20businessman%20in%20modern%20office%20setting%2C%20confident%20smile%2C%20business%20suit%2C%20corporate%20headshot%20style%2C%20clean%20background%2C%20high%20quality%20portrait%20photography&width=400&height=400&seq=commercial1&orientation=squarish'
    },
    {
      id: 2,
      nom: 'Marie Diabaté',
      specialite: 'Commerce International',
      experience: '6 ans',
      note: 4.8,
      clients: 38,
      territoire: 'Bouaké',
      statut: 'En mission',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20African%20businesswoman%20in%20elegant%20office%20environment%2C%20warm%20smile%2C%20professional%20attire%2C%20corporate%20headshot%20style%2C%20neutral%20background%2C%20high%20quality%20portrait%20photography&width=400&height=400&seq=commercial2&orientation=squarish'
    },
    {
      id: 3,
      nom: 'Amadou Traoré',
      specialite: 'Vente Retail',
      experience: '5 ans',
      note: 4.7,
      clients: 41,
      territoire: 'Yamoussoukro',
      statut: 'Disponible',
      photo: 'https://readdy.ai/api/search-image?query=Professional%20African%20businessman%20in%20contemporary%20office%20space%2C%20friendly%20expression%2C%20business%20casual%20attire%2C%20corporate%20headshot%20style%2C%20minimalist%20background%2C%20high%20quality%20portrait%20photography&width=400&height=400&seq=commercial3&orientation=squarish'
    }
  ];

  const prospects = [
    {
      id: 1,
      entreprise: 'TechCorp Abidjan',
      contact: 'Koffi Assouan',
      secteur: 'Technologie',
      taille: 'PME',
      region: 'Abidjan',
      valeur: '2.5M FCFA',
      priorite: 'Haute',
      statut: 'Prospection',
      derniereInteraction: '2024-01-15'
    },
    {
      id: 2,
      entreprise: 'Commerce Plus',
      contact: 'Aya Coulibaly',
      secteur: 'Commerce',
      taille: 'Grande entreprise',
      region: 'Bouaké',
      valeur: '5.2M FCFA',
      priorite: 'Moyenne',
      statut: 'Négociation',
      derniereInteraction: '2024-01-14'
    },
    {
      id: 3,
      entreprise: 'StartUp Innovation',
      contact: 'Ibrahim Sanogo',
      secteur: 'Services',
      taille: 'Startup',
      region: 'Yamoussoukro',
      valeur: '1.8M FCFA',
      priorite: 'Basse',
      statut: 'Conclusion',
      derniereInteraction: '2024-01-13'
    }
  ];

  const reseaux = [
    {
      id: 1,
      nom: 'Cercle Tech Abidjan',
      membres: 45,
      opportunites: 12,
      secteur: 'Technologie',
      region: 'Abidjan',
      createur: 'Jean Kouassi',
      description: 'Réseau professionnel pour les commerciaux spécialisés en solutions technologiques'
    },
    {
      id: 2,
      nom: 'Commerce International CI',
      membres: 32,
      opportunites: 8,
      secteur: 'Import/Export',
      region: 'National',
      createur: 'Marie Diabaté',
      description: 'Plateforme d\'échange pour les professionnels du commerce international'
    },
    {
      id: 3,
      nom: 'Retail Network',
      membres: 28,
      opportunites: 15,
      secteur: 'Retail',
      region: 'Multi-régions',
      createur: 'Amadou Traoré',
      description: 'Communauté des experts en vente retail et distribution'
    }
  ];

  const commissions = [
    {
      commercial: 'Jean Kouassi',
      janvier: '850K FCFA',
      fevrier: '920K FCFA',
      mars: '1.1M FCFA',
      total: '2.87M FCFA',
      taux: '12%',
      statut: 'Payé'
    },
    {
      commercial: 'Marie Diabaté',
      janvier: '720K FCFA',
      fevrier: '840K FCFA',
      mars: '950K FCFA',
      total: '2.51M FCFA',
      taux: '10%',
      statut: 'En attente'
    },
    {
      commercial: 'Amadou Traoré',
      janvier: '680K FCFA',
      fevrier: '750K FCFA',
      mars: '820K FCFA',
      total: '2.25M FCFA',
      taux: '11%',
      statut: 'Payé'
    }
  ];

  const territoires = [
    {
      zone: 'Abidjan Centre',
      commercial: 'Jean Kouassi',
      couverture: '85%',
      prospects: 45,
      clients: 32,
      potentiel: 'Élevé',
      statut: 'Optimisé'
    },
    {
      zone: 'Bouaké Nord',
      commercial: 'Marie Diabaté',
      couverture: '72%',
      prospects: 28,
      clients: 19,
      potentiel: 'Moyen',
      statut: 'En développement'
    },
    {
      zone: 'Yamoussoukro',
      commercial: 'Amadou Traoré',
      couverture: '68%',
      prospects: 22,
      clients: 15,
      potentiel: 'Élevé',
      statut: 'Sous-exploité'
    },
    {
      zone: 'San-Pédro',
      commercial: 'Non assigné',
      couverture: '0%',
      prospects: 0,
      clients: 0,
      potentiel: 'Très élevé',
      statut: 'Non couvert'
    }
  ];

  const encheres = [
    {
      id: 1,
      projet: 'Système CRM Entreprise',
      entreprise: 'TechCorp Solutions',
      budget: '15M FCFA',
      deadline: '2024-02-15',
      candidats: 8,
      statut: 'Ouvert',
      secteur: 'Technologie'
    },
    {
      id: 2,
      projet: 'Formation Équipe Commerciale',
      entreprise: 'Commerce Plus',
      budget: '8M FCFA',
      deadline: '2024-02-20',
      candidats: 12,
      statut: 'En cours',
      secteur: 'Formation'
    },
    {
      id: 3,
      projet: 'Expansion Marché Régional',
      entreprise: 'Distribution CI',
      budget: '25M FCFA',
      deadline: '2024-03-01',
      candidats: 15,
      statut: 'Clôturé',
      secteur: 'Distribution'
    }
  ];

  const ressources = [
    {
      id: 1,
      titre: 'Guide Prospection B2B',
      type: 'PDF',
      auteur: 'Jean Kouassi',
      telechargements: 156,
      note: 4.8,
      categorie: 'Prospection'
    },
    {
      id: 2,
      titre: 'Techniques de Négociation',
      type: 'Vidéo',
      auteur: 'Marie Diabaté',
      telechargements: 203,
      note: 4.9,
      categorie: 'Négociation'
    },
    {
      id: 3,
      titre: 'Étude de Cas TechCorp',
      type: 'Présentation',
      auteur: 'Amadou Traoré',
      telechargements: 89,
      note: 4.7,
      categorie: 'Études de cas'
    },
    {
      id: 4,
      titre: 'Témoignage Client Satisfait',
      type: 'Vidéo',
      auteur: 'Client TechCorp',
      telechargements: 245,
      note: 4.9,
      categorie: 'Témoignages'
    }
  ];

  const handleContactCommercial = (commercial: any) => {
    setSelectedCommercial(commercial);
    setShowContactModal(true);
  };

  const handleProspectDetails = (prospect: any) => {
    setSelectedProspect(prospect);
    setShowProspectModal(true);
  };

  const handleSubmitContact = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setShowContactModal(false);
    setSelectedCommercial(null);
  };

  const handleJoinNetwork = () => {
    setShowNetworkModal(true);
  };

  const handleSubmitProject = () => {
    setShowProjectModal(true);
  };

  const handleDownloadResource = () => {
    setShowResourceModal(true);
  };

  const renderProspects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Base de Prospects</h2>
        <Button>Ajouter Prospect</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prospects.map((prospect) => (
          <Card key={prospect.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">{prospect.entreprise}</h3>
                <p className="text-sm text-gray-600">{prospect.contact}</p>
              </div>
              <Badge variant={prospect.priorite === 'Haute' ? 'danger' : prospect.priorite === 'Moyenne' ? 'warning' : 'secondary'}>
                {prospect.priorite}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Secteur:</span>
                <span className="text-sm font-medium">{prospect.secteur}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Valeur:</span>
                <span className="text-sm font-medium">{prospect.valeur}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Région:</span>
                <span className="text-sm font-medium">{prospect.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Statut:</span>
                <Badge variant="primary">{prospect.statut}</Badge>
              </div>
            </div>

            <Button
              onClick={() => handleProspectDetails(prospect)}
              className="w-full"
              variant="primary"
            >
              Voir Détails
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPipeline = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Pipeline Commercial</h2>
        <Button>Nouvelle Opportunité</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4 text-blue-600">Prospection</h3>
          <div className="space-y-3">
            {prospects.filter(p => p.statut === 'Prospection').map((prospect) => (
              <div key={prospect.id} className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-sm">{prospect.entreprise}</h4>
                <p className="text-xs text-gray-600">{prospect.valeur}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4 text-yellow-600">Négociation</h3>
          <div className="space-y-3">
            {prospects.filter(p => p.statut === 'Négociation').map((prospect) => (
              <div key={prospect.id} className="p-3 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-sm">{prospect.entreprise}</h4>
                <p className="text-xs text-gray-600">{prospect.valeur}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4 text-green-600">Conclusion</h3>
          <div className="space-y-3">
            {prospects.filter(p => p.statut === 'Conclusion').map((prospect) => (
              <div key={prospect.id} className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-sm">{prospect.entreprise}</h4>
                <p className="text-xs text-gray-600">{prospect.valeur}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4 text-purple-600">Gagné</h3>
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-sm">Digital Solutions</h4>
              <p className="text-xs text-gray-600">3.2M FCFA</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderPerformances = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Analyses de Performance</h2>
        <Button>Exporter Rapport</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Performance Mensuelle</h3>
          <div className="space-y-4">
            {commerciaux.map((commercial, index) => (
              <div key={commercial.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{commercial.nom}</p>
                    <p className="text-sm text-gray-500">{commercial.clients} clients</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{commercial.note}/5</p>
                  <p className="text-sm text-gray-500">{commercial.territoire}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Objectifs vs Réalisé</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Ventes (15M FCFA)</span>
                <span>12.5M / 15M</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '83%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Prospects (50)</span>
                <span>42 / 50</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '84%'}}></div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Tendances</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Conversion</span>
              <span className="text-sm font-medium text-green-600">+8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Temps de cycle</span>
              <span className="text-sm font-medium text-blue-600">-12%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Satisfaction client</span>
              <span className="text-sm font-medium text-purple-600">+15%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderEquipes = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gestion des Équipes</h2>
        <Button>Créer Équipe</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Équipe Tech</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <img src={commerciaux[0].photo} alt="Jean" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-medium">{commerciaux[0].nom}</p>
                <p className="text-sm text-gray-600">Chef d'équipe</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <img src={commerciaux[1].photo} alt="Marie" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-medium">{commerciaux[1].nom}</p>
                <p className="text-sm text-gray-600">Commercial senior</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Équipe Retail</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <img src={commerciaux[2].photo} alt="Amadou" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-medium">{commerciaux[2].nom}</p>
                <p className="text-sm text-gray-600">Chef d'équipe</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Chiffre d'Affaires</p>
              <p className="text-2xl font-bold text-blue-900">12.5M FCFA</p>
              <p className="text-xs text-blue-500">+15% ce mois</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-white text-xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Taux de Conversion</p>
              <p className="text-2xl font-bold text-green-900">68%</p>
              <p className="text-xs text-green-500">+8% ce mois</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <i className="ri-line-chart-line text-white text-xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Prospects Actifs</p>
              <p className="text-2xl font-bold text-purple-900">156</p>
              <p className="text-xs text-purple-500">+12 cette semaine</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <i className="ri-user-search-line text-white text-xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Commerciaux Actifs</p>
              <p className="text-2xl font-bold text-orange-900">24</p>
              <p className="text-xs text-orange-500">+3 ce mois</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <i className="ri-team-line text-white text-xl"></i>
            </div>
          </div>
        </Card>
      </div>

      {/* Graphiques de Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Évolution du CA</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Janvier</span>
              <span className="font-medium">8.2M FCFA</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{width: '65%'}}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Février</span>
              <span className="font-medium">10.8M FCFA</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Mars</span>
              <span className="font-medium">12.5M FCFA</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{width: '100%'}}></div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Commerciaux</h3>
          <div className="space-y-4">
            {commerciaux.map((commercial, index) => (
              <div key={commercial.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{commercial.nom}</p>
                    <p className="text-sm text-gray-500">{commercial.clients} clients</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{commercial.note}/5</p>
                  <p className="text-sm text-gray-500">{commercial.territoire}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Publicités KOMERCIA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdBanner
          title="CRM Avancé pour Commerciaux"
          description="Optimisez votre pipeline de ventes avec notre CRM intelligent"
          ctr="7.2%"
          revenue="€4.8K"
          buttonText="Découvrir"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
        />
        <AdBanner
          title="Formation Vente Certifiante"
          description="Développez vos compétences commerciales avec nos experts"
          ctr="6.8%"
          revenue="€3.2K"
          buttonText="S'inscrire"
          className="bg-gradient-to-r from-green-500 to-green-600 text-white"
        />
      </div>
    </div>
  );

  const renderCommerciaux = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Commerciaux Disponibles</h2>
        <Button>Ajouter Commercial</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {commerciaux.map((commercial) => (
          <Card key={commercial.id} className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={commercial.photo}
                alt={commercial.nom}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{commercial.nom}</h3>
                <p className="text-sm text-gray-600">{commercial.specialite}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant={commercial.statut === 'Disponible' ? 'success' : 'warning'}>
                    {commercial.statut}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Expérience:</span>
                <span className="text-sm font-medium">{commercial.experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Note:</span>
                <span className="text-sm font-medium">{commercial.note}/5 ⭐</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Clients:</span>
                <span className="text-sm font-medium">{commercial.clients}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Territoire:</span>
                <span className="text-sm font-medium">{commercial.territoire}</span>
              </div>
            </div>

            <Button
              onClick={() => handleContactCommercial(commercial)}
              className="w-full"
              variant="primary"
            >
              Contacter
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderReseautage = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Réseaux Professionnels</h2>
        <Button onClick={handleJoinNetwork}>Créer un Réseau</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reseaux.map((reseau) => (
          <Card key={reseau.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{reseau.nom}</h3>
                <p className="text-sm text-gray-600">Créé par {reseau.createur}</p>
              </div>
              <Badge variant="primary">{reseau.secteur}</Badge>
            </div>

            <p className="text-gray-700 mb-4">{reseau.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{reseau.membres}</p>
                <p className="text-xs text-gray-500">Membres</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{reseau.opportunites}</p>
                <p className="text-xs text-gray-500">Opportunités</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-purple-600">{reseau.region}</p>
                <p className="text-xs text-gray-500">Région</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="primary" className="flex-1">Rejoindre</Button>
              <Button variant="outline" className="flex-1">Voir Détails</Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Marketplace Collaborative</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <i className="ri-exchange-line text-3xl text-blue-600 mb-2"></i>
            <h4 className="font-medium">Échange de Leads</h4>
            <p className="text-sm text-gray-600">Partagez vos prospects qualifiés</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <i className="ri-share-line text-3xl text-green-600 mb-2"></i>
            <h4 className="font-medium">Ressources Partagées</h4>
            <p className="text-sm text-gray-600">Accédez aux outils collaboratifs</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <i className="ri-team-line text-3xl text-purple-600 mb-2"></i>
            <h4 className="font-medium">Projets Collaboratifs</h4>
            <p className="text-sm text-gray-600">Travaillez ensemble sur des projets</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderCommissions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gestion des Commissions</h2>
        <Button>Exporter Rapport</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Total Commissions</p>
              <p className="text-2xl font-bold text-green-900">7.63M FCFA</p>
              <p className="text-xs text-green-500">Ce trimestre</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-white text-xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Commissions Payées</p>
              <p className="text-2xl font-bold text-blue-900">5.12M FCFA</p>
              <p className="text-xs text-blue-500">67% du total</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <i className="ri-check-double-line text-white text-xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">En Attente</p>
              <p className="text-2xl font-bold text-orange-900">2.51M FCFA</p>
              <p className="text-xs text-orange-500">33% du total</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-white text-xl"></i>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Tableau des Gains par Commercial</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Commercial</th>
                <th className="text-left py-3">Janvier</th>
                <th className="text-left py-3">Février</th>
                <th className="text-left py-3">Mars</th>
                <th className="text-left py-3">Total</th>
                <th className="text-left py-3">Taux</th>
                <th className="text-left py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {commissions.map((commission, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 font-medium">{commission.commercial}</td>
                  <td className="py-3">{commission.janvier}</td>
                  <td className="py-3">{commission.fevrier}</td>
                  <td className="py-3">{commission.mars}</td>
                  <td className="py-3 font-semibold">{commission.total}</td>
                  <td className="py-3">{commission.taux}</td>
                  <td className="py-3">
                    <Badge variant={commission.statut === 'Payé' ? 'success' : 'warning'}>
                      {commission.statut}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdBanner
          title="Géolocalisation Équipes"
          description="Suivez vos équipes terrain en temps réel"
          ctr="8.1%"
          revenue="€5.6K"
          buttonText="Activer"
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white"
        />
        <AdBanner
          title="Analytics Performances"
          description="Tableaux de bord KPI avancés pour managers"
          ctr="7.9%"
          revenue="€4.2K"
          buttonText="Analyser"
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white"
        />
      </div>
    </div>
  );

  const renderTerritoires = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gestion des Territoires</h2>
        <Button>Définir Nouvelle Zone</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Zones de Responsabilité</h3>
          <div className="space-y-4">
            {territoires.map((territoire, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{territoire.zone}</h4>
                    <p className="text-sm text-gray-600">{territoire.commercial}</p>
                  </div>
                  <Badge variant={
                    territoire.statut === 'Optimisé' ? 'success' :
                    territoire.statut === 'En développement' ? 'warning' :
                    territoire.statut === 'Sous-exploité' ? 'secondary' : 'danger'
                  }>
                    {territoire.statut}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Couverture</p>
                    <p className="font-medium">{territoire.couverture}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Potentiel</p>
                    <p className="font-medium">{territoire.potentiel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Prospects</p>
                    <p className="font-medium">{territoire.prospects}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Clients</p>
                    <p className="font-medium">{territoire.clients}</p>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      territoire.statut === 'Optimisé' ? 'bg-green-500' :
                      territoire.statut === 'En développement' ? 'bg-yellow-500' :
                      territoire.statut === 'Sous-exploité' ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{width: territoire.couverture}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Analyse de Couverture</h3>
          <div className="space-y-6">
            <div className="text-center p-6 bg-red-50 rounded-lg">
              <i className="ri-map-pin-line text-4xl text-red-600 mb-3"></i>
              <h4 className="font-medium text-red-800">Zone Non Couverte</h4>
              <p className="text-sm text-red-600">San-Pédro nécessite un commercial</p>
              <Button variant="danger" className="mt-3">Assigner Commercial</Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">75%</p>
                <p className="text-sm text-green-600">Couverture Moyenne</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">95</p>
                <p className="text-sm text-blue-600">Total Prospects</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Zones à Optimiser</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                  <span className="text-sm">Bouaké Nord</span>
                  <span className="text-sm font-medium text-yellow-600">72% couverture</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                  <span className="text-sm">Yamoussoukro</span>
                  <span className="text-sm font-medium text-orange-600">68% couverture</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderEncheres = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Enchères Commerciales</h2>
        <Button onClick={handleSubmitProject}>Soumettre Projet</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {encheres.map((enchere) => (
          <Card key={enchere.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">{enchere.projet}</h3>
                <p className="text-sm text-gray-600">{enchere.entreprise}</p>
              </div>
              <Badge variant={
                enchere.statut === 'Ouvert' ? 'success' :
                enchere.statut === 'En cours' ? 'warning' : 'secondary'
              }>
                {enchere.statut}
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Budget:</span>
                <span className="font-medium">{enchere.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Deadline:</span>
                <span className="font-medium">{enchere.deadline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Candidats:</span>
                <span className="font-medium">{enchere.candidats}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Secteur:</span>
                <span className="font-medium">{enchere.secteur}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                variant="primary" 
                className="flex-1"
                disabled={enchere.statut === 'Clôturé'}
              >
                {enchere.statut === 'Clôturé' ? 'Terminé' : 'Candidater'}
              </Button>
              <Button variant="outline" className="flex-1">Détails</Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Critères de Sélection</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <i className="ri-star-line text-3xl text-blue-600 mb-2"></i>
            <h4 className="font-medium">Note Minimum</h4>
            <p className="text-2xl font-bold text-blue-600">4.5/5</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <i className="ri-time-line text-3xl text-green-600 mb-2"></i>
            <h4 className="font-medium">Expérience</h4>
            <p className="text-2xl font-bold text-green-600">3+ ans</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <i className="ri-user-line text-3xl text-purple-600 mb-2"></i>
            <h4 className="font-medium">Clients Actifs</h4>
            <p className="text-2xl font-bold text-purple-600">20+</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <i className="ri-trophy-line text-3xl text-orange-600 mb-2"></i>
            <h4 className="font-medium">Taux Succès</h4>
            <p className="text-2xl font-bold text-orange-600">80%+</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderRessources = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Bibliothèque de Ressources</h2>
        <Button onClick={handleDownloadResource}>Ajouter Ressource</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ressources.map((ressource) => (
          <Card key={ressource.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  ressource.type === 'PDF' ? 'bg-red-100' :
                  ressource.type === 'Vidéo' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  <i className={`text-xl ${
                    ressource.type === 'PDF' ? 'ri-file-pdf-line text-red-600' :
                    ressource.type === 'Vidéo' ? 'ri-video-line text-blue-600' : 'ri-presentation-line text-green-600'
                  }`}></i>
                </div>
                <div>
                  <h3 className="font-semibold">{ressource.titre}</h3>
                  <p className="text-sm text-gray-600">{ressource.auteur}</p>
                </div>
              </div>
              <Badge variant="secondary">{ressource.type}</Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Téléchargements:</span>
                <span className="font-medium">{ressource.telechargements}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Note:</span>
                <span className="font-medium">{ressource.note}/5 ⭐</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Catégorie:</span>
                <span className="font-medium">{ressource.categorie}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="primary" className="flex-1">
                {ressource.type === 'Vidéo' ? 'Regarder' : 'Télécharger'}
              </Button>
              <Button variant="outline" className="flex-1">Partager</Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Témoignages Clients</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20African%20business%20client%20in%20modern%20office%2C%20satisfied%20expression%2C%20business%20attire%2C%20testimonial%20photo%20style%2C%20clean%20background%2C%20high%20quality%20portrait&width=400&height=400&seq=client1&orientation=squarish"
                alt="Client satisfait"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">Koffi Assouan</h4>
                <p className="text-sm text-gray-600">Directeur TechCorp</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"Grâce à KOMERCIA, nous avons trouvé les meilleurs commerciaux pour notre expansion. Notre chiffre d'affaires a augmenté de 40% en 6 mois."</p>
            <div className="flex items-center mt-3">
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="ml-2 text-sm text-gray-600">5/5</span>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20African%20businesswoman%20client%20in%20corporate%20environment%2C%20happy%20expression%2C%20professional%20attire%2C%20testimonial%20photo%20style%2C%20neutral%20background%2C%20high%20quality%20portrait&width=400&height=400&seq=client2&orientation=squarish"
                alt="Cliente satisfaite"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">Aya Coulibaly</h4>
                <p className="text-sm text-gray-600">PDG Commerce Plus</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"La plateforme KOMERCIA nous a permis d'optimiser notre réseau commercial. Les outils de suivi sont exceptionnels et très intuitifs."</p>
            <div className="flex items-center mt-3">
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="ml-2 text-sm text-gray-600">5/5</span>
            </div>
          </div>
        </div>
      </Card>

      <AdBanner
        title="Gamification Commerciale"
        description="Motivez vos équipes avec notre système de récompenses"
        ctr="9.3%"
        revenue="€6.8K"
        buttonText="Motiver"
        className="bg-gradient-to-r from-pink-500 to-pink-600 text-white"
      />
    </div>
  );

  const renderDormantProspects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Prospects Dormants</h2>
        <Button onClick={() => setShowProspectModal(true)} className="bg-orange-600 hover:bg-orange-700">
          <i className="ri-alarm-line mr-2"></i>
          Configurer Alertes
        </Button>
      </div>

      {/* Statistiques Prospects Dormants */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Prospects Inactifs</p>
              <p className="text-2xl font-bold text-red-700">23</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-unfollow-line text-xl text-red-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-lg border border-yellow-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Relances Envoyées</p>
              <p className="text-2xl font-bold text-yellow-700">47</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-mail-send-line text-xl text-yellow-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Réactivés</p>
              <p className="text-2xl font-bold text-green-700">12</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-add-line text-xl text-green-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Taux Réactivation</p>
              <p className="text-2xl font-bold text-blue-700">26%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-line-chart-line text-xl text-blue-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des Prospects Dormants */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Prospects Inactifs (+ de 30 jours)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prospect</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dernière Interaction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valeur Potentielle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priorité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: 'TechCorp Solutions', lastContact: '45 jours', value: '2.5M FCFA', priority: 'Haute', status: 'critical' },
                { name: 'Commerce Digital', lastContact: '38 jours', value: '1.8M FCFA', priority: 'Moyenne', status: 'warning' },
                { name: 'Innovation Labs', lastContact: '52 jours', value: '3.2M FCFA', priority: 'Haute', status: 'critical' },
                { name: 'StartUp Abidjan', lastContact: '33 jours', value: '950K FCFA', priority: 'Basse', status: 'normal' }
              ].map((prospect, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{prospect.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{prospect.lastContact}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{prospect.value}</td>
                  <td className="px-6 py-4">
                    <Badge variant={prospect.status === 'critical' ? 'destructive' : prospect.status === 'warning' ? 'secondary' : 'default'}>
                      {prospect.priority}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <i className="ri-mail-line mr-1"></i>
                        Relancer
                      </Button>
                      <Button size="sm" variant="outline">
                        <i className="ri-phone-line mr-1"></i>
                        Appeler
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modèles de Relance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Modèles de Messages de Relance</h3>
        </div>
        <div className="p-6 space-y-4">
          {[
            { title: 'Relance Douce', content: 'Bonjour [Nom], j\'espère que vous allez bien. Je souhaitais faire le point sur votre projet...', usage: '12 utilisations' },
            { title: 'Offre Spéciale', content: 'Bonjour [Nom], nous avons une offre spéciale qui pourrait vous intéresser...', usage: '8 utilisations' },
            { title: 'Rappel Urgent', content: 'Bonjour [Nom], votre projet est important pour nous. Pouvons-nous programmer un appel...', usage: '15 utilisations' }
          ].map((template, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{template.title}</h4>
                <span className="text-xs text-gray-500">{template.usage}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{template.content}</p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">Utiliser</Button>
                <Button size="sm" variant="outline">Modifier</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCrisisManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Crises</h2>
        <Button onClick={() => setShowCrisisModal(true)} className="bg-red-600 hover:bg-red-700">
          <i className="ri-alarm-warning-line mr-2"></i>
          Nouveau Plan d'Urgence
        </Button>
      </div>

      {/* Alertes en Temps Réel */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
            <i className="ri-alert-line text-xl text-red-600"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-800">Alertes Actives</h3>
            <p className="text-sm text-red-600">5 événements nécessitent votre attention</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { type: 'Économique', message: 'Fluctuation du taux de change FCFA/EUR (+3%)', severity: 'Moyenne', time: 'Il y a 2h' },
            { type: 'Politique', message: 'Nouvelles réglementations import/export', severity: 'Haute', time: 'Il y a 4h' },
            { type: 'Social', message: 'Manifestations prévues centre-ville Abidjan', severity: 'Basse', time: 'Il y a 6h' }
          ].map((alert, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-red-100">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <Badge variant={alert.severity === 'Haute' ? 'destructive' : alert.severity === 'Moyenne' ? 'secondary' : 'default'} className="mr-2">
                      {alert.type}
                    </Badge>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                  <p className="text-sm text-gray-800">{alert.message}</p>
                </div>
                <Button size="sm" variant="outline">
                  <i className="ri-eye-line mr-1"></i>
                  Voir
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plans d'Urgence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Plans d'Urgence Actifs</h3>
          </div>
          <div className="p-6 space-y-4">
            {[
              { name: 'Plan Crise Économique', status: 'Actif', contacts: 12, lastUpdate: '2 jours' },
              { name: 'Plan Urgence Sanitaire', status: 'Standby', contacts: 8, lastUpdate: '1 semaine' },
              { name: 'Plan Crise Politique', status: 'Actif', contacts: 15, lastUpdate: '3 jours' }
            ].map((plan, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{plan.name}</h4>
                  <Badge variant={plan.status === 'Actif' ? 'destructive' : 'default'}>
                    {plan.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><i className="ri-team-line mr-1"></i>{plan.contacts} contacts d'urgence</p>
                  <p><i className="ri-time-line mr-1"></i>Mis à jour il y a {plan.lastUpdate}</p>
                </div>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm" variant="outline">Activer</Button>
                  <Button size="sm" variant="outline">Modifier</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Contacts d'Urgence</h3>
          </div>
          <div className="p-6 space-y-4">
            {[
              { name: 'Direction Générale', contact: 'Jean Kouassi', phone: '+225 07 123 456', role: 'Décisionnaire' },
              { name: 'Responsable Sécurité', contact: 'Marie Diabaté', phone: '+225 05 987 654', role: 'Sécurité' },
              { name: 'Communication Crise', contact: 'Amadou Traoré', phone: '+225 01 456 789', role: 'Communication' }
            ].map((contact, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{contact.name}</h4>
                    <p className="text-sm text-gray-600">{contact.contact}</p>
                  </div>
                  <Badge variant="outline">{contact.role}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{contact.phone}</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <i className="ri-phone-line"></i>
                    </Button>
                    <Button size="sm" variant="outline">
                      <i className="ri-message-line"></i>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Paiements</h2>
        <Button onClick={() => setShowPaymentModal(true)} className="bg-green-600 hover:bg-green-700">
          <i className="ri-wallet-line mr-2"></i>
          Nouveau Paiement
        </Button>
      </div>

      {/* Statistiques Paiements */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Revenus Totaux</p>
              <p className="text-2xl font-bold text-green-700">45.2M FCFA</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-xl text-green-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Paiements en Attente</p>
              <p className="text-2xl font-bold text-blue-700">67</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-xl text-blue-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Orange Money</p>
              <p className="text-2xl font-bold text-purple-700">28.5M FCFA</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-smartphone-line text-xl text-purple-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-lg border border-yellow-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Commissions</p>
              <p className="text-2xl font-bold text-yellow-700">7.8M FCFA</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-hand-coin-line text-xl text-yellow-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Portefeuille Numérique */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Portefeuille Numérique</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-orange-100">Solde Disponible</p>
                  <p className="text-2xl font-bold">12.5M FCFA</p>
                </div>
                <i className="ri-wallet-3-line text-2xl text-orange-100"></i>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-orange-100">Orange Money</span>
                <span className="text-sm text-orange-100">**** 4567</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Transactions Récentes</h4>
              {[
                { type: 'Réception', amount: '+2.5M FCFA', from: 'TechCorp Solutions', time: 'Il y a 2h' },
                { type: 'Commission', amount: '+450K FCFA', from: 'Vente CRM', time: 'Il y a 5h' },
                { type: 'Retrait', amount: '-1M FCFA', from: 'Orange Money', time: 'Hier' }
              ].map((transaction, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{transaction.type}</p>
                    <p className="text-sm text-gray-500">{transaction.from}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Méthodes de Paiement</h3>
          </div>
          <div className="p-6 space-y-4">
            {[
              { name: 'Orange Money', number: '**** 4567', status: 'Actif', icon: 'ri-smartphone-line', color: 'orange' },
              { name: 'MTN Mobile Money', number: '**** 8901', status: 'Actif', icon: 'ri-phone-line', color: 'yellow' },
              { name: 'Virement Bancaire', number: 'CI**** 2345', status: 'Actif', icon: 'ri-bank-line', color: 'blue' },
              { name: 'Carte Visa', number: '**** 6789', status: 'Inactif', icon: 'ri-bank-card-line', color: 'gray' }
            ].map((method, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 bg-${method.color}-100 rounded-lg flex items-center justify-center mr-3`}>
                      <i className={`${method.icon} text-${method.color}-600`}></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{method.name}</p>
                      <p className="text-sm text-gray-500">{method.number}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={method.status === 'Actif' ? 'default' : 'secondary'}>
                      {method.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <i className="ri-settings-line"></i>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <i className="ri-add-line mr-2"></i>
              Ajouter une Méthode
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInformalSector = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Secteur Informel</h2>
        <Button onClick={() => setShowInformalModal(true)} className="bg-purple-600 hover:bg-purple-700">
          <i className="ri-store-line mr-2"></i>
          Nouveau Profil Simplifié
        </Button>
      </div>

      {/* Statistiques Secteur Informel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-lg border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Commerçants Inscrits</p>
              <p className="text-2xl font-bold text-purple-700">89</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-store-2-line text-xl text-purple-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Ventes Locales</p>
              <p className="text-2xl font-bold text-green-700">156</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-shopping-bag-line text-xl text-green-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Mode Hors Ligne</p>
              <p className="text-2xl font-bold text-blue-700">34</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-wifi-off-line text-xl text-blue-600"></i>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Promotions Actives</p>
              <p className="text-2xl font-bold text-orange-700">23</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-megaphone-line text-xl text-orange-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Profils Simplifiés */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Profils Simplifiés Actifs</h3>
          </div>
          <div className="p-6 space-y-4">
            {[
              { name: 'Boutique Aya', type: 'Alimentation', location: 'Adjamé', sales: '45 ventes', status: 'En ligne' },
              { name: 'Atelier Koffi', type: 'Réparation', location: 'Yopougon', sales: '23 ventes', status: 'Hors ligne' },
              { name: 'Salon Marie', type: 'Beauté', location: 'Cocody', sales: '67 ventes', status: 'En ligne' },
              { name: 'Garage Moussa', type: 'Automobile', location: 'Abobo', sales: '34 ventes', status: 'Hors ligne' }
            ].map((profile, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{profile.name}</h4>
                    <p className="text-sm text-gray-600">{profile.type} • {profile.location}</p>
                  </div>
                  <Badge variant={profile.status === 'En ligne' ? 'default' : 'secondary'}>
                    {profile.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{profile.sales}</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <i className="ri-eye-line mr-1"></i>
                      Voir
                    </Button>
                    <Button size="sm" variant="outline">
                      <i className="ri-edit-line mr-1"></i>
                      Modifier
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Promotions Locales</h3>
          </div>
          <div className="p-6 space-y-4">
            {[
              { title: 'Réduction Alimentaire', discount: '-20%', merchant: 'Boutique Aya', radius: '500m', views: '234 vues' },
              { title: 'Service Beauté', discount: '-15%', merchant: 'Salon Marie', radius: '1km', views: '156 vues' },
              { title: 'Réparation Auto', discount: '-25%', merchant: 'Garage Moussa', radius: '2km', views: '89 vues' }
            ].map((promo, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{promo.title}</h4>
                    <p className="text-sm text-gray-600">{promo.merchant}</p>
                  </div>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {promo.discount}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span><i className="ri-map-pin-line mr-1"></i>Rayon {promo.radius}</span>
                  <span>{promo.views}</span>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <i className="ri-add-line mr-2"></i>
              Créer une Promotion
            </Button>
          </div>
        </div>
      </div>

      {/* Mode Hors Ligne */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Gestion Mode Hors Ligne</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-download-cloud-line text-2xl text-blue-600"></i>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Données Synchronisées</h4>
              <p className="text-sm text-gray-600">34 profils avec données locales</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-refresh-line text-2xl text-green-600"></i>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Auto-Synchronisation</h4>
              <p className="text-sm text-gray-600">Mise à jour automatique</p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-smartphone-line text-2xl text-purple-600"></i>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Version Mobile</h4>
              <p className="text-sm text-gray-600">Interface optimisée</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarketplace = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Marketplace de Solutions</h2>
        <Button onClick={() => setShowMarketplaceModal(true)} className="whitespace-nowrap">
          <i className="ri-add-line mr-2"></i>
          Nouvelle Offre
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Offres Groupées</p>
              <p className="text-3xl font-bold">34</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-group-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Expositions Virtuelles</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-presentation-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Démonstrations Live</p>
              <p className="text-3xl font-bold">8</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-live-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Ventes Générées</p>
              <p className="text-3xl font-bold">28.5M</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-2xl"></i>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Offres de Services Groupés</h3>
          <div className="space-y-4">
            {[
              { name: 'Pack CRM + Formation', partners: 3, price: '15M FCFA', status: 'Actif' },
              { name: 'Solution E-commerce Complète', partners: 5, price: '25M FCFA', status: 'Actif' },
              { name: 'Analytics + Consulting', partners: 2, price: '8M FCFA', status: 'En cours' },
              { name: 'Formation + Certification', partners: 4, price: '12M FCFA', status: 'Actif' }
            ].map((offer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{offer.name}</h4>
                  <p className="text-sm text-gray-600">{offer.partners} partenaires • {offer.price}</p>
                </div>
                <Badge variant={offer.status === 'Actif' ? 'success' : 'warning'}>
                  {offer.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Expositions Virtuelles</h3>
          <div className="space-y-4">
            {[
              { name: 'Salon CRM Abidjan 2024', visitors: 1250, demos: 45, date: '15-17 Mars' },
              { name: 'Tech Business Expo', visitors: 890, demos: 32, date: '22-24 Mars' },
              { name: 'Formation Digitale Fair', visitors: 650, demos: 28, date: '5-7 Avril' },
              { name: 'E-commerce Summit', visitors: 1100, demos: 38, date: '12-14 Avril' }
            ].map((expo, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{expo.name}</h4>
                  <span className="text-sm text-gray-600">{expo.date}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span><i className="ri-user-line mr-1"></i>{expo.visitors} visiteurs</span>
                  <span><i className="ri-presentation-line mr-1"></i>{expo.demos} démos</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderAccountCreation = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Création de Comptes Assistée</h2>
        <Button onClick={() => setShowAccountModal(true)} className="whitespace-nowrap">
          <i className="ri-user-add-line mr-2"></i>
          Nouveau Compte
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100">Comptes Créés</p>
              <p className="text-3xl font-bold">156</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-user-add-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Taux d'Activation</p>
              <p className="text-3xl font-bold">87%</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-check-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">En Attente</p>
              <p className="text-3xl font-bold">23</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-time-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Conversions Payantes</p>
              <p className="text-3xl font-bold">134</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-2xl"></i>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Comptes Récemment Créés</h3>
          <div className="space-y-4">
            {[
              { name: 'Jean Kouassi', company: 'TechCorp Solutions', date: '2024-03-15', status: 'Actif', commercial: 'Marie Diabaté' },
              { name: 'Aya Coulibaly', company: 'Commerce Plus', date: '2024-03-14', status: 'En attente', commercial: 'Jean Kouassi' },
              { name: 'Koffi Assouan', company: 'Innovation Labs', date: '2024-03-13', status: 'Actif', commercial: 'Amadou Traoré' },
              { name: 'Fatou Diallo', company: 'Digital Services', date: '2024-03-12', status: 'Actif', commercial: 'Marie Diabaté' }
            ].map((account, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{account.name}</h4>
                  <p className="text-sm text-gray-600">{account.company} • Assisté par {account.commercial}</p>
                  <p className="text-xs text-gray-500">{account.date}</p>
                </div>
                <Badge variant={account.status === 'Actif' ? 'success' : 'warning'}>
                  {account.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Formulaire Simplifié</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-medium text-blue-900">Mode Création Assistée</h4>
              <p className="text-sm text-blue-700 mt-1">Interface collaborative pour guider l'utilisateur étape par étape</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm">Informations de base</span>
                <Badge variant="success">Complété</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm">Profil professionnel</span>
                <Badge variant="success">Complété</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm">Préférences</span>
                <Badge variant="warning">En cours</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="text-sm">Validation</span>
                <Badge variant="secondary">En attente</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderDemoAccounts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Comptes Démo et Essais</h2>
        <Button onClick={() => setShowDemoModal(true)} className="whitespace-nowrap">
          <i className="ri-test-tube-line mr-2"></i>
          Créer Démo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-100">Comptes Démo</p>
              <p className="text-3xl font-bold">28</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-test-tube-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Taux de Conversion</p>
              <p className="text-3xl font-bold">72%</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-arrow-up-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Essais Actifs</p>
              <p className="text-3xl font-bold">15</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-time-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Conversions</p>
              <p className="text-3xl font-bold">20</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-check-double-line text-2xl"></i>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Essais Gratuits Actifs</h3>
          <div className="space-y-4">
            {[
              { user: 'Koffi Yao', product: 'CRM Pro', remaining: 12, total: 30, commercial: 'Jean Kouassi' },
              { user: 'Aminata Sow', product: 'Analytics Plus', remaining: 8, total: 14, commercial: 'Marie Diabaté' },
              { user: 'Ibrahim Cissé', product: 'E-commerce Suite', remaining: 25, total: 30, commercial: 'Amadou Traoré' },
              { user: 'Fatoumata Keita', product: 'Formation CRM', remaining: 5, total: 21, commercial: 'Jean Kouassi' }
            ].map((trial, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{trial.user}</h4>
                  <Badge variant={trial.remaining > 7 ? 'success' : 'warning'}>
                    {trial.remaining} jours restants
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{trial.product} • Commercial: {trial.commercial}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${((trial.total - trial.remaining) / trial.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Conversions Récentes</h3>
          <div className="space-y-4">
            {[
              { user: 'Seydou Traoré', product: 'CRM Enterprise', value: '2.5M FCFA', date: '2024-03-15' },
              { user: 'Mariam Koné', product: 'Analytics Pro', value: '1.8M FCFA', date: '2024-03-14' },
              { user: 'Ousmane Diallo', product: 'Formation Avancée', value: '950K FCFA', date: '2024-03-13' },
              { user: 'Aissata Camara', product: 'E-commerce Plus', value: '3.2M FCFA', date: '2024-03-12' }
            ].map((conversion, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div>
                  <h4 className="font-medium text-green-900">{conversion.user}</h4>
                  <p className="text-sm text-green-700">{conversion.product}</p>
                  <p className="text-xs text-green-600">{conversion.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-900">{conversion.value}</p>
                  <Badge variant="success">Converti</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderPartnerships = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Partenariats</h2>
        <Button onClick={() => setShowPartnershipModal(true)} className="whitespace-nowrap">
          <i className="ri-handshake-line mr-2"></i>
          Nouveau Partenariat
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Partenariats Actifs</p>
              <p className="text-3xl font-bold">15</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-handshake-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Ventes Générées</p>
              <p className="text-3xl font-bold">45.8M</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Leads Partagés</p>
              <p className="text-3xl font-bold">234</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-share-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">À Renouveler</p>
              <p className="text-3xl font-bold">3</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-refresh-line text-2xl"></i>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Partenariats Stratégiques</h3>
          <div className="space-y-4">
            {[
              { partner: 'TechSolutions CI', type: 'Distributeur', revenue: '15.2M FCFA', leads: 45, status: 'Actif', renewal: '2024-12-15' },
              { partner: 'Formation Pro', type: 'Formateur', revenue: '8.5M FCFA', leads: 32, status: 'Actif', renewal: '2024-09-30' },
              { partner: 'Digital Marketing', type: 'Marketing', revenue: '12.1M FCFA', leads: 67, status: 'Actif', renewal: '2024-11-20' },
              { partner: 'Consulting Plus', type: 'Consultant', revenue: '10.0M FCFA', leads: 28, status: 'À renouveler', renewal: '2024-04-15' }
            ].map((partnership, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{partnership.partner}</h4>
                  <Badge variant={partnership.status === 'Actif' ? 'success' : 'warning'}>
                    {partnership.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{partnership.type} • Renouvellement: {partnership.renewal}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span><i className="ri-money-dollar-circle-line mr-1"></i>{partnership.revenue}</span>
                  <span><i className="ri-user-line mr-1"></i>{partnership.leads} leads</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performance des Partenariats</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900">Top Performer</h4>
              <p className="text-sm text-blue-700">Digital Marketing - 67 leads générés</p>
            </div>
            <div className="space-y-3">
              {[
                { metric: 'Revenus moyens par partenaire', value: '11.45M FCFA' },
                { metric: 'Leads moyens par mois', value: '43 leads' },
                { metric: 'Taux de conversion moyen', value: '68%' },
                { metric: 'Durée moyenne partenariat', value: '18 mois' }
              ].map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm">{stat.metric}</span>
                  <span className="font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderSubscriptions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Abonnements</h2>
        <Button onClick={() => setShowSubscriptionModal(true)} className="whitespace-nowrap">
          <i className="ri-vip-crown-line mr-2"></i>
          Nouvel Abonnement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100">Abonnements Actifs</p>
              <p className="text-3xl font-bold">203</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-vip-crown-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Revenus Mensuels</p>
              <p className="text-3xl font-bold">28.5M</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Expirations</p>
              <p className="text-3xl font-bold">15</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-alarm-warning-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Taux de Rétention</p>
              <p className="text-3xl font-bold">89%</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-heart-line text-2xl"></i>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Abonnements par Forfait</h3>
          <div className="space-y-4">
            {[
              { plan: 'CRM Starter', users: 89, price: '50K FCFA/mois', revenue: '4.45M FCFA' },
              { plan: 'CRM Professional', users: 67, price: '150K FCFA/mois', revenue: '10.05M FCFA' },
              { plan: 'CRM Enterprise', users: 32, price: '350K FCFA/mois', revenue: '11.2M FCFA' },
              { plan: 'Formation Premium', users: 15, price: '200K FCFA/mois', revenue: '3.0M FCFA' }
            ].map((plan, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{plan.plan}</h4>
                  <span className="text-sm font-medium text-green-600">{plan.revenue}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span><i className="ri-user-line mr-1"></i>{plan.users} utilisateurs</span>
                  <span><i className="ri-price-tag-line mr-1"></i>{plan.price}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Renouvellements à Venir</h3>
          <div className="space-y-4">
            {[
              { client: 'TechCorp Solutions', plan: 'CRM Enterprise', date: '2024-03-25', value: '350K FCFA', priority: 'Haute' },
              { client: 'Commerce Plus', plan: 'CRM Professional', date: '2024-03-28', value: '150K FCFA', priority: 'Moyenne' },
              { client: 'Innovation Labs', plan: 'Formation Premium', date: '2024-04-02', value: '200K FCFA', priority: 'Haute' },
              { client: 'Digital Services', plan: 'CRM Starter', date: '2024-04-05', value: '50K FCFA', priority: 'Basse' }
            ].map((renewal, index) => (
              <div key={index} className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-yellow-900">{renewal.client}</h4>
                  <Badge variant={renewal.priority === 'Haute' ? 'danger' : renewal.priority === 'Moyenne' ? 'warning' : 'secondary'}>
                    {renewal.priority}
                  </Badge>
                </div>
                <p className="text-sm text-yellow-700 mb-1">{renewal.plan} • {renewal.value}</p>
                <p className="text-xs text-yellow-600">Expiration: {renewal.date}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Système de Récompenses</h2>
        <Button onClick={() => setShowRewardModal(true)} className="whitespace-nowrap">
          <i className="ri-gift-line mr-2"></i>
          Nouvelle Récompense
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Points Distribués</p>
              <p className="text-3xl font-bold">47K</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-coin-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Récompenses Échangées</p>
              <p className="text-3xl font-bold">156</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-gift-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Participants Actifs</p>
              <p className="text-3xl font-bold">89</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-user-star-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Valeur Échangée</p>
              <p className="text-3xl font-bold">12.5M</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-2xl"></i>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Classement des Commerciaux</h3>
          <div className="space-y-4">
            {[
              { name: 'Jean Kouassi', points: 2850, level: 'Diamant', rewards: 12, position: 1 },
              { name: 'Marie Diabaté', points: 2340, level: 'Platine', rewards: 9, position: 2 },
              { name: 'Amadou Traoré', points: 1980, level: 'Or', rewards: 7, position: 3 },
              { name: 'Fatou Diallo', points: 1650, level: 'Argent', rewards: 5, position: 4 }
            ].map((commercial, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    commercial.position === 1 ? 'bg-yellow-500' : 
                    commercial.position === 2 ? 'bg-gray-400' : 
                    commercial.position === 3 ? 'bg-orange-600' : 'bg-blue-500'
                  }`}>
                    {commercial.position}
                  </div>
                  <div>
                    <h4 className="font-medium">{commercial.name}</h4>
                    <p className="text-sm text-gray-600">{commercial.points} points • Niveau {commercial.level}</p>
                  </div>
                </div>
                <Badge variant="success">{commercial.rewards} récompenses</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Catalogue de Récompenses</h3>
          <div className="space-y-4">
            {[
              { item: 'Smartphone Samsung Galaxy', points: 1500, stock: 5, category: 'Électronique' },
              { item: 'Formation Leadership', points: 800, stock: 'Illimité', category: 'Formation' },
              { item: 'Bon d\'achat 100K FCFA', points: 1000, stock: 20, category: 'Shopping' },
              { item: 'Weekend Assinie', points: 1200, stock: 3, category: 'Voyage' }
            ].map((reward, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{reward.item}</h4>
                  <span className="text-sm font-bold text-blue-600">{reward.points} pts</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span><i className="ri-price-tag-line mr-1"></i>{reward.category}</span>
                  <span><i className="ri-stack-line mr-1"></i>Stock: {reward.stock}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Produits</h2>
        <Button onClick={() => setShowProductModal(true)} className="whitespace-nowrap">
          <i className="ri-add-box-line mr-2"></i>
          Nouveau Produit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100">Produits Actifs</p>
              <p className="text-3xl font-bold">125</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-product-hunt-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-500 to-teal-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Ventes Totales</p>
              <p className="text-3xl font-bold">89.2M</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Ruptures de Stock</p>
              <p className="text-3xl font-bold">8</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-alarm-warning-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Nouveaux ce Mois</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-add-circle-line text-2xl"></i>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Produits</h3>
          <div className="space-y-4">
            {[
              { name: 'CRM Professional', sales: '25.5M FCFA', units: 67, growth: '+15%', category: 'Logiciel' },
              { name: 'Formation Vente Avancée', sales: '18.2M FCFA', units: 89, growth: '+22%', category: 'Formation' },
              { name: 'Analytics Dashboard', sales: '15.8M FCFA', units: 45, growth: '+8%', category: 'Logiciel' },
              { name: 'Consulting CRM', sales: '12.3M FCFA', units: 23, growth: '+12%', category: 'Service' }
            ].map((product, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{product.name}</h4>
                  <Badge variant="success">{product.growth}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span><i className="ri-money-dollar-circle-line mr-1"></i>{product.sales}</span>
                  <span><i className="ri-shopping-cart-line mr-1"></i>{product.units} ventes</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Alertes Produits</h3>
          <div className="space-y-4">
            {[
              { product: 'Formation Excel Avancée', issue: 'Rupture de stock', priority: 'Haute', action: 'Réapprovisionner' },
              { product: 'CRM Starter', issue: 'Mise à jour requise', priority: 'Moyenne', action: 'Planifier MAJ' },
              { product: 'Analytics Pro', issue: 'Retours clients', priority: 'Haute', action: 'Analyser feedback' },
              { product: 'Consulting Premium', issue: 'Performance faible', priority: 'Basse', action: 'Réviser stratégie' }
            ].map((alert, index) => (
              <div key={index} className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-red-900">{alert.product}</h4>
                  <Badge variant={alert.priority === 'Haute' ? 'danger' : alert.priority === 'Moyenne' ? 'warning' : 'secondary'}>
                    {alert.priority}
                  </Badge>
                </div>
                <p className="text-sm text-red-700 mb-1">{alert.issue}</p>
                <p className="text-xs text-red-600">Action: {alert.action}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Événements</h2>
        <Button onClick={() => setShowEventModal(true)} className="whitespace-nowrap">
          <i className="ri-calendar-event-line mr-2"></i>
          Nouvel Événement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100">Événements Actifs</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-calendar-event-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Participants Inscrits</p>
              <p className="text-3xl font-bold">1,245</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-user-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Revenus Générés</p>
              <p className="text-3xl font-bold">15.8M</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-500 to-violet-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Taux de Participation</p>
              <p className="text-3xl font-bold">87%</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-bar-chart-line text-2xl"></i>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Événements à Venir</h3>
          <div className="space-y-4">
            {[
              { name: 'Webinaire CRM 2024', date: '2024-03-25', time: '14:00', participants: 156, type: 'Webinaire' },
              { name: 'Salon Tech Abidjan', date: '2024-04-05', time: '09:00', participants: 450, type: 'Salon' },
              { name: 'Formation Vente B2B', date: '2024-04-12', time: '10:00', participants: 89, type: 'Formation' },
              { name: 'Démonstration Analytics', date: '2024-04-18', time: '15:30', participants: 67, type: 'Démonstration' }
            ].map((event, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{event.name}</h4>
                  <Badge variant="primary">{event.type}</Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <span><i className="ri-calendar-line mr-1"></i>{event.date}</span>
                  <span><i className="ri-time-line mr-1"></i>{event.time}</span>
                </div>
                <p className="text-sm text-gray-600">
                  <i className="ri-user-line mr-1"></i>{event.participants} participants inscrits
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performance des Événements</h3>
          <div className="space-y-4">
            {[
              { event: 'Formation CRM Janvier', participants: 234, satisfaction: '4.8/5', leads: 45, revenue: '3.2M FCFA' },
              { event: 'Webinaire Analytics', participants: 189, satisfaction: '4.6/5', leads: 32, revenue: '1.8M FCFA' },
              { event: 'Salon Commerce Digital', participants: 567, satisfaction: '4.9/5', leads: 89, revenue: '8.5M FCFA' },
              { event: 'Démonstration E-commerce', participants: 123, satisfaction: '4.7/5', leads: 28, revenue: '2.3M FCFA' }
            ].map((performance, index) => (
              <div key={index} className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-medium text-green-900 mb-2">{performance.event}</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-green-700">
                  <span><i className="ri-user-line mr-1"></i>{performance.participants} participants</span>
                  <span><i className="ri-star-line mr-1"></i>{performance.satisfaction}</span>
                  <span><i className="ri-user-add-line mr-1"></i>{performance.leads} leads</span>
                  <span><i className="ri-money-dollar-circle-line mr-1"></i>{performance.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderObjectivesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Suivi des Objectifs</h2>
        <Button onClick={() => setShowObjectiveModal(true)} className="whitespace-nowrap">
          <i className="ri-add-line mr-2"></i>
          Nouvel Objectif
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Objectifs Mensuels</h3>
            <Badge variant="primary">Mars 2024</Badge>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Ventes (15M FCFA)</span>
                <span>12.5M / 15M</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '83%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Prospects (50)</span>
                <span>42 / 50</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Rendez-vous (30)</span>
                <span>28 / 30</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '93%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Performance Équipe</h3>
            <Badge variant="secondary">8 Commerciaux</Badge>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Jean Kouassi</span>
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
                <span className="text-xs text-gray-600">95%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Marie Diabaté</span>
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
                <span className="text-xs text-gray-600">87%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Amadou Traoré</span>
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <span className="text-xs text-gray-600">78%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Alertes Objectifs</h3>
            <Badge variant="warning">5 Alertes</Badge>
          </div>
          <div className="space-y-3">
            <div className="flex items-center p-2 bg-yellow-50 rounded-lg">
              <i className="ri-alarm-warning-line text-yellow-600 mr-2"></i>
              <div className="text-sm">
                <div className="font-medium">Objectif Ventes</div>
                <div className="text-gray-600">Reste 7 jours</div>
              </div>
            </div>
            <div className="flex items-center p-2 bg-red-50 rounded-lg">
              <i className="ri-error-warning-line text-red-600 mr-2"></i>
              <div className="text-sm">
                <div className="font-medium">Prospects Retard</div>
                <div className="text-gray-600">8 prospects</div>
              </div>
            </div>
            <div className="flex items-center p-2 bg-blue-50 rounded-lg">
              <i className="ri-information-line text-blue-600 mr-2"></i>
              <div className="text-sm">
                <div className="font-medium">Nouveau Trimestre</div>
                <div className="text-gray-600">Définir objectifs</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Objectifs Individuels</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Commercial</th>
                <th className="text-left py-3 px-4">Objectif</th>
                <th className="text-left py-3 px-4">Réalisé</th>
                <th className="text-left py-3 px-4">Progression</th>
                <th className="text-left py-3 px-4">Échéance</th>
                <th className="text-left py-3 px-4">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Jean Kouassi</td>
                <td className="py-3 px-4">5M FCFA</td>
                <td className="py-3 px-4">4.2M FCFA</td>
                <td className="py-3 px-4">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </td>
                <td className="py-3 px-4">31 Mars</td>
                <td className="py-3 px-4">
                  <Badge variant="primary">En cours</Badge>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Marie Diabaté</td>
                <td className="py-3 px-4">20 Prospects</td>
                <td className="py-3 px-4">18 Prospects</td>
                <td className="py-3 px-4">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </td>
                <td className="py-3 px-4">25 Mars</td>
                <td className="py-3 px-4">
                  <Badge variant="secondary">Proche</Badge>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Amadou Traoré</td>
                <td className="py-3 px-4">15 RDV</td>
                <td className="py-3 px-4">12 RDV</td>
                <td className="py-3 px-4">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </td>
                <td className="py-3 px-4">30 Mars</td>
                <td className="py-3 px-4">
                  <Badge variant="warning">Retard</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderComplaintsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Réclamations</h2>
        <Button onClick={() => setShowComplaintModal(true)} className="whitespace-nowrap">
          <i className="ri-add-line mr-2"></i>
          Nouvelle Réclamation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-error-warning-line text-red-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">18</p>
              <p className="text-sm text-gray-600">Réclamations Ouvertes</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-time-line text-yellow-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">En Traitement</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-check-line text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-600">Résolues ce Mois</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-timer-line text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">2.5h</p>
              <p className="text-sm text-gray-600">Temps Moyen</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Réclamations Récentes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">Client</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Description</th>
                <th className="text-left py-3 px-4">Priorité</th>
                <th className="text-left py-3 px-4">Statut</th>
                <th className="text-left py-3 px-4">Assigné à</th>
                <th className="text-left py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">#REC-001</td>
                <td className="py-3 px-4">TechCorp Solutions</td>
                <td className="py-3 px-4">Bug CRM</td>
                <td className="py-3 px-4">Erreur synchronisation données</td>
                <td className="py-3 px-4">
                  <Badge variant="warning">Haute</Badge>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="primary">En cours</Badge>
                </td>
                <td className="py-3 px-4">Jean Kouassi</td>
                <td className="py-3 px-4">20 Mars</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">#REC-002</td>
                <td className="py-3 px-4">Commerce Digital</td>
                <td className="py-3 px-4">Facturation</td>
                <td className="py-3 px-4">Erreur calcul commission</td>
                <td className="py-3 px-4">
                  <Badge variant="secondary">Moyenne</Badge>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="warning">Nouveau</Badge>
                </td>
                <td className="py-3 px-4">Marie Diabaté</td>
                <td className="py-3 px-4">19 Mars</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">#REC-003</td>
                <td className="py-3 px-4">Innovation Labs</td>
                <td className="py-3 px-4">Formation</td>
                <td className="py-3 px-4">Accès module formation</td>
                <td className="py-3 px-4">
                  <Badge variant="primary">Basse</Badge>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="secondary">Résolu</Badge>
                </td>
                <td className="py-3 px-4">Amadou Traoré</td>
                <td className="py-3 px-4">18 Mars</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Types de Réclamations</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Bug Technique</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <span className="text-xs text-gray-600">8</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Facturation</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <span className="text-xs text-gray-600">6</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Formation</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
                <span className="text-xs text-gray-600">4</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Temps de Résolution</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Priorité Haute</span>
              <span className="text-sm font-medium">1.2h moyenne</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Priorité Moyenne</span>
              <span className="text-sm font-medium">4.5h moyenne</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Priorité Basse</span>
              <span className="text-sm font-medium">12h moyenne</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Satisfaction Client</span>
                <span className="text-sm font-bold text-green-600">94%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderTrainingTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Formation Commerciaux</h2>
        <Button onClick={() => setShowTrainingModal(true)} className="whitespace-nowrap">
          <i className="ri-add-line mr-2"></i>
          Nouveau Module
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-book-line text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">34</p>
              <p className="text-sm text-gray-600">Modules Disponibles</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-user-line text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-600">Participants Actifs</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-medal-line text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">89</p>
              <p className="text-sm text-gray-600">Certifications</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-star-line text-yellow-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-sm text-gray-600">Note Moyenne</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Techniques de Vente Avancées</h3>
            <Badge variant="primary">Populaire</Badge>
          </div>
          <img 
            src="https://readdy.ai/api/search-image?query=Professional%20sales%20training%20session%20with%20diverse%20business%20people%20in%20modern%20conference%20room%2C%20interactive%20presentation%20on%20sales%20techniques%2C%20charts%20and%20graphs%20on%20screen%2C%20engaging%20atmosphere%2C%20corporate%20learning%20environment%2C%20high%20quality%20business%20photography&width=400&height=200&seq=training1&orientation=landscape" 
            alt="Formation Vente" 
            className="w-full h-32 object-cover rounded-lg mb-4"
          />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span>67 participants</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm text-gray-600">8 modules • 12h</span>
              <div className="flex items-center">
                <i className="ri-star-fill text-yellow-500 text-sm mr-1"></i>
                <span className="text-sm">4.9</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">CRM et Gestion Client</h3>
            <Badge variant="secondary">Nouveau</Badge>
          </div>
          <img 
            src="https://readdy.ai/api/search-image?query=Modern%20CRM%20software%20training%20workshop%2C%20business%20professionals%20learning%20customer%20relationship%20management%2C%20computer%20screens%20showing%20CRM%20dashboard%2C%20collaborative%20learning%20environment%2C%20professional%20development%20setting&width=400&height=200&seq=training2&orientation=landscape" 
            alt="Formation CRM" 
            className="w-full h-32 object-cover rounded-lg mb-4"
          />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span>45 participants</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '56%' }}></div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm text-gray-600">6 modules • 8h</span>
              <div className="flex items-center">
                <i className="ri-star-fill text-yellow-500 text-sm mr-1"></i>
                <span className="text-sm">4.7</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Négociation Commerciale</h3>
            <Badge variant="warning">Certifiant</Badge>
          </div>
          <img 
            src="https://readdy.ai/api/search-image?query=Business%20negotiation%20training%20seminar%2C%20professional%20facilitator%20teaching%20negotiation%20strategies%2C%20participants%20engaged%20in%20role-playing%20exercises%2C%20modern%20training%20facility%2C%20interactive%20business%20education&width=400&height=200&seq=training3&orientation=landscape" 
            alt="Formation Négociation" 
            className="w-full h-32 object-cover rounded-lg mb-4"
          />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span>34 participants</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '89%' }}></div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm text-gray-600">10 modules • 16h</span>
              <div className="flex items-center">
                <i className="ri-star-fill text-yellow-500 text-sm mr-1"></i>
                <span className="text-sm">4.8</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Progression des Commerciaux</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Commercial</th>
                <th className="text-left py-3 px-4">Modules Complétés</th>
                <th className="text-left py-3 px-4">Heures Formation</th>
                <th className="text-left py-3 px-4">Certifications</th>
                <th className="text-left py-3 px-4">Note Moyenne</th>
                <th className="text-left py-3 px-4">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Jean Kouassi</td>
                <td className="py-3 px-4">12/15</td>
                <td className="py-3 px-4">48h</td>
                <td className="py-3 px-4">3</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <i className="ri-star-fill text-yellow-500 text-sm mr-1"></i>
                    <span>4.9</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="primary">Expert</Badge>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Marie Diabaté</td>
                <td className="py-3 px-4">8/15</td>
                <td className="py-3 px-4">32h</td>
                <td className="py-3 px-4">2</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <i className="ri-star-fill text-yellow-500 text-sm mr-1"></i>
                    <span>4.7</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="secondary">Avancé</Badge>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Amadou Traoré</td>
                <td className="py-3 px-4">5/15</td>
                <td className="py-3 px-4">20h</td>
                <td className="py-3 px-4">1</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <i className="ri-star-fill text-yellow-500 text-sm mr-1"></i>
                    <span>4.5</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="warning">Intermédiaire</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderWhiteZonesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Zones Blanches</h2>
        <Button onClick={() => setShowWhiteZoneModal(true)} className="whitespace-nowrap">
          <i className="ri-add-line mr-2"></i>
          Analyser Zone
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-map-2-line text-red-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">Zones Non Couvertes</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-focus-line text-yellow-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">15</p>
              <p className="text-sm text-gray-600">Zones Sous-exploitées</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-treasure-map-line text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">45M</p>
              <p className="text-sm text-gray-600">Potentiel FCFA</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-check-line text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Zones Optimisées</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cartographie des Zones</h3>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
            <div className="text-center">
              <i className="ri-map-pin-line text-4xl text-gray-400 mb-2"></i>
              <p className="text-gray-600">Carte Interactive des Zones</p>
              <p className="text-sm text-gray-500">Cliquez pour voir les détails</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm">
              <i className="ri-zoom-in-line mr-2"></i>
              Zoom
            </Button>
            <Button variant="outline" size="sm">
              <i className="ri-filter-line mr-2"></i>
              Filtrer
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Zones Prioritaires</h3>
          <div className="space-y-4">
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Man - Centre Ville</h4>
                <Badge variant="warning">Haute Priorité</Badge>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Potentiel: 8.5M FCFA • 0 Commercial
              </div>
              <div className="flex justify-between text-xs">
                <span>Population: 45K</span>
                <span>Entreprises: 234</span>
              </div>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Daloa - Zone Industrielle</h4>
                <Badge variant="secondary">Moyenne Priorité</Badge>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Potentiel: 6.2M FCFA • 0 Commercial
              </div>
              <div className="flex justify-between text-xs">
                <span>Population: 32K</span>
                <span>Entreprises: 156</span>
              </div>
            </div>

            <div className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Korhogo - Nord</h4>
                <Badge variant="primary">Basse Priorité</Badge>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Potentiel: 4.1M FCFA • 0 Commercial
              </div>
              <div className="flex justify-between text-xs">
                <span>Population: 28K</span>
                <span>Entreprises: 89</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analyse Détaillée des Zones</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Zone</th>
                <th className="text-left py-3 px-4">Statut</th>
                <th className="text-left py-3 px-4">Commercial Assigné</th>
                <th className="text-left py-3 px-4">Couverture</th>
                <th className="text-left py-3 px-4">Potentiel</th>
                <th className="text-left py-3 px-4">Entreprises</th>
                <th className="text-left py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Man - Centre</td>
                <td className="py-3 px-4">
                  <Badge variant="warning">Non Couvert</Badge>
                </td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">0%</td>
                <td className="py-3 px-4">8.5M FCFA</td>
                <td className="py-3 px-4">234</td>
                <td className="py-3 px-4">
                  <Button size="sm" variant="outline">Assigner</Button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Daloa - Industrielle</td>
                <td className="py-3 px-4">
                  <Badge variant="warning">Non Couvert</Badge>
                </td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">0%</td>
                <td className="py-3 px-4">6.2M FCFA</td>
                <td className="py-3 px-4">156</td>
                <td className="py-3 px-4">
                  <Button size="sm" variant="outline">Assigner</Button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Bouaké - Sud</td>
                <td className="py-3 px-4">
                  <Badge variant="secondary">Sous-exploité</Badge>
                </td>
                <td className="py-3 px-4">Marie Diabaté</td>
                <td className="py-3 px-4">35%</td>
                <td className="py-3 px-4">4.8M FCFA</td>
                <td className="py-3 px-4">189</td>
                <td className="py-3 px-4">
                  <Button size="sm" variant="outline">Optimiser</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderCollaborationTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Collaboration Inter-Équipe</h2>
        <Button onClick={() => setShowCollaborationModal(true)} className="whitespace-nowrap">
          <i className="ri-add-line mr-2"></i>
          Nouveau Projet
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-group-line text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">25</p>
              <p className="text-sm text-gray-600">Projets Collaboratifs</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-share-line text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-600">Leads Partagés</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-team-line text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">67</p>
              <p className="text-sm text-gray-600">Commerciaux Actifs</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-trophy-line text-yellow-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">89%</p>
              <p className="text-sm text-gray-600">Taux de Réussite</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Projets en Cours</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Expansion TechCorp</h4>
                <Badge variant="primary">En cours</Badge>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                Valeur: 25M FCFA • 3 Commerciaux
              </div>
              <div className="flex -space-x-2 mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">JK</div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">MD</div>
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">AT</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Formation Équipe Commerce+</h4>
                <Badge variant="secondary">Planifié</Badge>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                Valeur: 12M FCFA • 2 Commerciaux
              </div>
              <div className="flex -space-x-2 mb-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">MD</div>
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs">ST</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads Partagés Récents</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">Innovation Labs</div>
                <div className="text-xs text-gray-600">Partagé par Jean → Marie</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">3.2M FCFA</div>
                <div className="text-xs text-gray-600">Il y a 2h</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">StartUp Digital</div>
                <div className="text-xs text-gray-600">Partagé par Marie → Amadou</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">1.8M FCFA</div>
                <div className="text-xs text-gray-600">Il y a 5h</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">Commerce Export</div>
                <div className="text-xs text-gray-600">Partagé par Amadou → Jean</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">5.1M FCFA</div>
                <div className="text-xs text-gray-600">Hier</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique des Collaborations</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Projet</th>
                <th className="text-left py-3 px-4">Équipe</th>
                <th className="text-left py-3 px-4">Valeur</th>
                <th className="text-left py-3 px-4">Contribution</th>
                <th className="text-left py-3 px-4">Résultat</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Expansion TechCorp</td>
                <td className="py-3 px-4">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">J</div>
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">M</div>
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">A</div>
                  </div>
                </td>
                <td className="py-3 px-4">25M FCFA</td>
                <td className="py-3 px-4">Jean: 60%, Marie: 25%, Amadou: 15%</td>
                <td className="py-3 px-4">
                  <Badge variant="primary">Gagné</Badge>
                </td>
                <td className="py-3 px-4">15 Mars</td>
                <td className="py-3 px-4">
                  <Badge variant="secondary">Terminé</Badge>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Formation Commerce+</td>
                <td className="py-3 px-4">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">M</div>
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs">S</div>
                  </div>
                </td>
                <td className="py-3 px-4">12M FCFA</td>
                <td className="py-3 px-4">Marie: 70%, Seydou: 30%</td>
                <td className="py-3 px-4">
                  <Badge variant="warning">En négociation</Badge>
                </td>
                <td className="py-3 px-4">10 Mars</td>
                <td className="py-3 px-4">
                  <Badge variant="primary">En cours</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderBundleOffersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Offres Groupées</h2>
        <Button onClick={() => setShowBundleModal(true)} className="whitespace-nowrap">
          <i className="ri-add-line mr-2"></i>
          Nouvelle Offre
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-gift-line text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">19</p>
              <p className="text-sm text-gray-600">Offres Actives</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-money-dollar-circle-line text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">67.8M</p>
              <p className="text-sm text-gray-600">Revenus FCFA</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-shopping-cart-line text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">234</p>
              <p className="text-sm text-gray-600">Ventes Réalisées</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-percent-line text-yellow-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">23%</p>
              <p className="text-sm text-gray-600">Réduction Moyenne</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pack CRM Complet</h3>
            <Badge variant="primary">Populaire</Badge>
          </div>
          <img 
            src="https://readdy.ai/api/search-image?query=Professional%20business%20software%20bundle%20package%20with%20CRM%20dashboard%2C%20analytics%20charts%2C%20and%20training%20materials%20displayed%20on%20modern%20computer%20screens%2C%20clean%20office%20environment%2C%20business%20productivity%20concept&width=400&height=200&seq=bundle1&orientation=landscape" 
            alt="Pack CRM" 
            className="w-full h-32 object-cover rounded-lg mb-4"
          />
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">CRM Professional</span>
              <span className="text-sm line-through text-gray-500">8M FCFA</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Formation Avancée</span>
              <span className="text-sm line-through text-gray-500">3M FCFA</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Support Premium</span>
              <span className="text-sm line-through text-gray-500">2M FCFA</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center font-bold">
                <span>Prix Bundle</span>
                <span className="text-green-600">10M FCFA</span>
              </div>
              <div className="text-center">
                <Badge variant="secondary">Économie: 3M FCFA (23%)</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Solution E-commerce</h3>
            <Badge variant="warning">Nouveau</Badge>
          </div>
          <img 
            src="https://readdy.ai/api/search-image?query=Complete%20e-commerce%20solution%20package%20with%20online%20store%20interface%2C%20payment%20systems%2C%20inventory%20management%2C%20and%20marketing%20tools%2C%20modern%20digital%20business%20setup%2C%20professional%20presentation&width=400&height=200&seq=bundle2&orientation=landscape" 
            alt="Pack E-commerce" 
            className="w-full h-32 object-cover rounded-lg mb-4"
          />
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Plateforme E-commerce</span>
              <span className="text-sm line-through text-gray-500">12M FCFA</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Paiement Mobile</span>
              <span className="text-sm line-through text-gray-500">4M FCFA</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Marketing Digital</span>
              <span className="text-sm line-through text-gray-500">5M FCFA</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center font-bold">
                <span>Prix Bundle</span>
                <span className="text-green-600">16M FCFA</span>
              </div>
              <div className="text-center">
                <Badge variant="secondary">Économie: 5M FCFA (24%)</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pack Analytics Pro</h3>
            <Badge variant="secondary">Certifiant</Badge>
          </div>
          <img 
            src="https://readdy.ai/api/search-image?query=Advanced%20business%20analytics%20package%20with%20data%20visualization%20dashboards%2C%20reporting%20tools%2C%20and%20business%20intelligence%20software%2C%20professional%20data%20analysis%20environment%2C%20modern%20office%20setting&width=400&height=200&seq=bundle3&orientation=landscape" 
            alt="Pack Analytics" 
            className="w-full h-32 object-cover rounded-lg mb-4"
          />
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Analytics Dashboard</span>
              <span className="text-sm line-through text-gray-500">6M FCFA</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Rapports Avancés</span>
              <span className="text-sm line-through text-gray-500">3M FCFA</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Consulting Data</span>
              <span className="text-sm line-through text-gray-500">4M FCFA</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center font-bold">
                <span>Prix Bundle</span>
                <span className="text-green-600">10M FCFA</span>
              </div>
              <div className="text-center">
                <Badge variant="secondary">Économie: 3M FCFA (23%)</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance des Offres Groupées</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Offre</th>
                <th className="text-left py-3 px-4">Composants</th>
                <th className="text-left py-3 px-4">Prix Original</th>
                <th className="text-left py-3 px-4">Prix Bundle</th>
                <th className="text-left py-3 px-4">Économie</th>
                <th className="text-left py-3 px-4">Ventes</th>
                <th className="text-left py-3 px-4">Revenus</th>
                <th className="text-left py-3 px-4">Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Pack CRM Complet</td>
                <td className="py-3 px-4">3 produits</td>
                <td className="py-3 px-4">13M FCFA</td>
                <td className="py-3 px-4">10M FCFA</td>
                <td className="py-3 px-4">23%</td>
                <td className="py-3 px-4">89</td>
                <td className="py-3 px-4">89M FCFA</td>
                <td className="py-3 px-4">
                  <Badge variant="primary">Actif</Badge>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Solution E-commerce</td>
                <td className="py-3 px-4">3 produits</td>
                <td className="py-3 px-4">21M FCFA</td>
                <td className="py-3 px-4">16M FCFA</td>
                <td className="py-3 px-4">24%</td>
                <td className="py-3 px-4">67</td>
                <td className="py-3 px-4">107.2M FCFA</td>
                <td className="py-3 px-4">
                  <Badge variant="primary">Actif</Badge>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Pack Analytics Pro</td>
                <td className="py-3 px-4">3 produits</td>
                <td className="py-3 px-4">13M FCFA</td>
                <td className="py-3 px-4">10M FCFA</td>
                <td className="py-3 px-4">23%</td>
                <td className="py-3 px-4">45</td>
                <td className="py-3 px-4">45M FCFA</td>
                <td className="py-3 px-4">
                  <Badge variant="secondary">Nouveau</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderFreeTrialsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Suivi des Essais Gratuits</h2>
        <Button onClick={() => setShowTrialModal(true)} className="whitespace-nowrap">
          <i className="ri-add-line mr-2"></i>
          Nouvel Essai
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-time-line text-blue-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">42</p>
              <p className="text-sm text-gray-600">Essais Actifs</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-check-line text-green-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">78%</p>
              <p className="text-sm text-gray-600">Taux Conversion</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-alarm-warning-line text-yellow-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">15</p>
              <p className="text-sm text-gray-600">Expirent Bientôt</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <i className="ri-money-dollar-circle-line text-purple-600 text-xl"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">34.5M</p>
              <p className="text-sm text-gray-600">Revenus Potentiels</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Essais par Statut</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Actifs (1-15 jours)</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-xs text-gray-600">27</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Expirent bientôt (16-30 jours)</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
                <span className="text-xs text-gray-600">15</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Convertis ce mois</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <span className="text-xs text-gray-600">32</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Prioritaires</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-red-50 rounded-lg">
              <i className="ri-alarm-warning-line text-red-600 mr-3"></i>
              <div className="text-sm">
                <div className="font-medium">8 essais expirent dans 3 jours</div>
                <div className="text-gray-600">Relancer immédiatement</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <i className="ri-time-line text-yellow-600 mr-3"></i>
              <div className="text-sm">
                <div className="font-medium">7 essais à mi-parcours</div>
                <div className="text-gray-600">Proposer démonstration</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <i className="ri-phone-line text-blue-600 mr-3"></i>
              <div className="text-sm">
                <div className="font-medium">12 prospects à contacter</div>
                <div className="text-gray-600">Suivi personnalisé</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Essais Gratuits en Cours</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Entreprise</th>
                <th className="text-left py-3 px-4">Produit</th>
                <th className="text-left py-3 px-4">Commercial</th>
                <th className="text-left py-3 px-4">Début</th>
                <th className="text-left py-3 px-4">Fin</th>
                <th className="text-left py-3 px-4">Jours Restants</th>
                <th className="text-left py-3 px-4">Utilisation</th>
                <th className="text-left py-3 px-4">Statut</th>
                <th className="text-left py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">TechStart CI</td>
                <td className="py-3 px-4">CRM Professional</td>
                <td className="py-3 px-4">Jean Kouassi</td>
                <td className="py-3 px-4">10 Mars</td>
                <td className="py-3 px-4">25 Mars</td>
                <td className="py-3 px-4">
                  <Badge variant="warning">3 jours</Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="primary">Actif</Badge>
                </td>
                <td className="py-3 px-4">
                  <Button size="sm" variant="outline">Relancer</Button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Commerce Plus</td>
                <td className="py-3 px-4">E-commerce Suite</td>
                <td className="py-3 px-4">Marie Diabaté</td>
                <td className="py-3 px-4">5 Mars</td>
                <td className="py-3 px-4">20 Mars</td>
                <td className="py-3 px-4">
                  <Badge variant="secondary">8 jours</Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="primary">Actif</Badge>
                </td>
                <td className="py-3 px-4">
                  <Button size="sm" variant="outline">Démo</Button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Digital Innovation</td>
                <td className="py-3 px-4">Analytics Pro</td>
                <td className="py-3 px-4">Amadou Traoré</td>
                <td className="py-3 px-4">1 Mars</td>
                <td className="py-3 px-4">16 Mars</td>
                <td className="py-3 px-4">
                  <Badge variant="primary">12 jours</Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="secondary">Faible usage</Badge>
                </td>
                <td className="py-3 px-4">
                  <Button size="sm" variant="outline">Former</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'commerciaux':
        return renderCommerciaux();
      case 'prospects':
        return renderProspects();
      case 'pipeline':
        return renderPipeline();
      case 'performances':
        return renderPerformances();
      case 'equipes':
        return renderEquipes();
      case 'reseautage':
        return renderReseautage();
      case 'commissions':
        return renderCommissions();
      case 'territoires':
        return renderTerritoires();
      case 'encheres':
        return renderEncheres();
      case 'ressources':
        return renderRessources();
      case 'dormants':
        return renderDormantProspects();
      case 'crise':
        return renderCrisisManagement();
      case 'paiements':
        return renderPayments();
      case 'informel':
        return renderInformalSector();
      case 'marketplace':
        return renderMarketplace();
      case 'creation-comptes':
        return renderAccountCreation();
      case 'demo':
        return renderDemoAccounts();
      case 'partenariats':
        return renderPartnerships();
      case 'abonnements':
        return renderSubscriptions();
      case 'recompenses':
        return renderRewards();
      case 'produits':
        return renderProducts();
      case 'evenements':
        return renderEvents();
      case 'objectifs':
        return renderObjectivesTab();
      case 'reclamations':
        return renderComplaintsTab();
      case 'formation':
        return renderTrainingTab();
      case 'zones-blanches':
        return renderWhiteZonesTab();
      case 'collaboration':
        return renderCollaborationTab();
      case 'offres-groupees':
        return renderBundleOffersTab();
      case 'essais-gratuits':
        return renderFreeTrialsTab();
      case 'publicite':
        return renderAdvertisingTab();
      default:
        return renderDashboard();
    }
  };

  // Modal for Objectives
  const ObjectiveModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Nouvel Objectif</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Commercial</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
              <option>Jean Kouassi</option>
              <option>Marie Diabaté</option>
              <option>Amadou Traoré</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type d'objectif</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
              <option>Chiffre d'affaires</option>
              <option>Nombre de prospects</option>
              <option>Rendez-vous</option>
              <option>Conversions</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valeur cible</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Ex: 5M FCFA ou 20 prospects" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Échéance</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20" placeholder="Détails de l'objectif..." maxLength={500}></textarea>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowObjectiveModal(false)}>Annuler</Button>
            <LoadingButton>Créer Objectif</LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );

  // Modal for Complaints
  const ComplaintModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Nouvelle Réclamation</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Nom de l'entreprise" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type de réclamation</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
              <option>Bug technique</option>
              <option>Problème facturation</option>
              <option>Accès formation</option>
              <option>Support client</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
              <option>Haute</option>
              <option>Moyenne</option>
              <option>Basse</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigner à</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
              <option>Jean Kouassi</option>
              <option>Marie Diabaté</option>
              <option>Amadou Traoré</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20" placeholder="Détails de la réclamation..." maxLength={500}></textarea>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowComplaintModal(false)}>Annuler</Button>
            <LoadingButton>Créer Réclamation</LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );

  // Modal for Training
  const TrainingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Nouveau Module Formation</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre du module</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Ex: Techniques de vente avancées" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
              <option>Vente</option>
              <option>CRM</option>
              <option>Négociation</option>
              <option>Leadership</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Durée (heures)</label>
            <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Ex: 8" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
              <option>Débutant</option>
              <option>Intermédiaire</option>
              <option>Avancé</option>
              <option>Expert</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20" placeholder="Objectifs et contenu du module..." maxLength={500}></textarea>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowTrainingModal(false)}>Annuler</Button>
            <LoadingButton>Créer Module</LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );

  // Modal for White Zones
  const WhiteZoneModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Analyser Nouvelle Zone</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la zone</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Ex: Gagnoa - Centre Ville" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Région</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
              <option>Abidjan</option>
              <option>Bouaké</option>
              <option>Yamoussoukro</option>
              <option>San-Pédro</option>
              <option>Man</option>
              <option>Daloa</option>
              <option>Korhogo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Population estimée</label>
            <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Ex: 45000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre d'entreprises</label>
            <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Ex: 234" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Potentiel estimé (FCFA)</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Ex: 8.5M FCFA" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20" placeholder="Observations sur la zone..." maxLength={500}></textarea>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowWhiteZoneModal(false)}>Annuler</Button>
            <LoadingButton>Analyser Zone</LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );

  // Modal for Collaboration
  const CollaborationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Nouveau Projet Collaboratif</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom du projet</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Ex: Expansion TechCorp" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valeur estimée</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Ex: 25M FCFA" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Commerciaux participants</label>
            <select multiple className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20">
              <option>Jean Kouassi</option>
              <option>Marie Diabaté</option>
              <option>Amadou Traoré</option>
              <option>Seydou Traoré</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Échéance</label>
            <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20" placeholder="Objectifs et détails du projet..." maxLength={500}></textarea>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowCollaborationModal(false)}>Annuler</Button>
            <LoadingButton>Créer Projet</LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );

  // Modal for Bundle Offers
  const BundleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Nouvelle Offre Groupée</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'offre</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Ex: Pack CRM Complet" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Produits inclus</label>
            <select multiple className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20">
              <option>CRM Professional</option>
              <option>Formation Avancée</option>
              <option>Support Premium</option>
              <option>Analytics Dashboard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix original total</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Ex: 13M FCFA" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix de l'offre groupée</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Ex: 10M FCFA" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20" placeholder="Avantages de l'offre groupée..." maxLength={500}></textarea>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowBundleModal(false)}>Annuler</Button>
            <LoadingButton>Créer Offre</LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );

  // Modal for Free Trials
  const TrialModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Nouvel Essai Gratuit</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Nom de l'entreprise" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
              <option>CRM Professional</option>
              <option>E-commerce Suite</option>
              <option>Analytics Pro</option>
              <option>Formation Avancée</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Commercial assigné</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
              <option>Jean Kouassi</option>
              <option>Marie Diabaté</option>
              <option>Amadou Traoré</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Durée (jours)</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
              <option>15 jours</option>
              <option>30 jours</option>
              <option>45 jours</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
            <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="email@entreprise.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20" placeholder="Informations complémentaires..." maxLength={500}></textarea>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowTrialModal(false)}>Annuler</Button>
            <LoadingButton>Créer Essai</LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );

  // Modal pour nouvelle publicité
  const [showAdModal, setShowAdModal] = useState(false);

  const AdModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Nouvelle Publicité</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Titre de la publicité" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
                <option>CRM</option>
                <option>Analytics</option>
                <option>Formation</option>
                <option>Automation</option>
                <option>Promotion</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} maxLength={500} placeholder="Description de la publicité..."></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
                <option>Bannière statique</option>
                <option>Bannière animée</option>
                <option>Vidéo</option>
                <option>Pop-up</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
                <option>10 - Très haute</option>
                <option>9 - Haute</option>
                <option>8 - Moyenne-haute</option>
                <option>7 - Moyenne</option>
                <option>6 - Basse</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ciblage Utilisateur</label>
            <select multiple className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24">
              <option>Commerciaux</option>
              <option>Managers</option>
              <option>Consultants</option>
              <option>Formateurs</option>
              <option>Clients</option>
              <option>Partenaires</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sections d'affichage</label>
            <select multiple className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24">
              <option>Dashboard</option>
              <option>Leads</option>
              <option>Pipeline</option>
              <option>Analytics</option>
              <option>Sidebar</option>
              <option>Footer</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL de l'image</label>
              <input type="url" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL de destination</label>
              <input type="url" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="https://..." />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Texte du bouton</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Ex: Découvrir, Essayer gratuitement..." />
          </div>

          <div className="flex space-x-3 pt-4">
            <LoadingButton type="submit" className="flex-1 whitespace-nowrap">
              Créer la Publicité
            </LoadingButton>
            <Button type="button" variant="secondary" onClick={() => setShowAdModal(false)} className="whitespace-nowrap">
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderAdvertisingTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Publicités</h2>
        <Button onClick={() => setShowAdModal(true)} className="whitespace-nowrap">
          <i className="ri-add-line mr-2"></i>
          Nouvelle Publicité
        </Button>
      </div>

      {/* Statistiques Globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Publicités Actives</p>
              <p className="text-3xl font-bold">156</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-advertisement-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Impressions Totales</p>
              <p className="text-3xl font-bold">2.4M</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-eye-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Taux de Clic Moyen</p>
              <p className="text-3xl font-bold">7.2%</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-cursor-line text-2xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Revenus Générés</p>
              <p className="text-3xl font-bold">€458K</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-2xl"></i>
            </div>
          </div>
        </Card>
      </div>

      {/* Base de Données des Publicités */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Base de Données des Publicités</h3>
        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            placeholder="Rechercher une publicité..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Toutes les catégories</option>
            <option>CRM</option>
            <option>Analytics</option>
            <option>Formation</option>
            <option>Automation</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Tous les formats</option>
            <option>Bannière statique</option>
            <option>Bannière animée</option>
            <option>Vidéo</option>
            <option>Pop-up</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Publicité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Format</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ciblage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Impressions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clics</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CTR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenus</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { id: 1, title: 'CRM Intelligence IA', category: 'CRM', format: 'Statique', target: 'Commerciaux', impressions: '18.5K', clicks: '1.3K', ctr: '7.0%', revenue: '€37K', status: 'Actif' },
                { id: 2, title: 'Automation 360°', category: 'Automation', format: 'Animée', target: 'Managers', impressions: '15.2K', clicks: '1.1K', ctr: '7.0%', revenue: '€30K', status: 'Actif' },
                { id: 3, title: 'Analytics Pro', category: 'Analytics', format: 'Statique', target: 'Consultants', impressions: '15.4K', clicks: '892', ctr: '5.8%', revenue: '€25K', status: 'Actif' },
                { id: 4, title: 'Formation Vente', category: 'Formation', format: 'Vidéo', target: 'Commerciaux', impressions: '12.4K', clicks: '868', ctr: '7.0%', revenue: '€62K', status: 'Actif' },
                { id: 5, title: 'Offre Spéciale -50%', category: 'Promotion', format: 'Pop-up', target: 'Tous', impressions: '8.5K', clicks: '1.0K', ctr: '12.0%', revenue: '€128K', status: 'Actif' }
              ].map((ad) => (
                <tr key={ad.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{ad.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="primary">{ad.category}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{ad.format}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{ad.target}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{ad.impressions}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{ad.clicks}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-green-600">{ad.ctr}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{ad.revenue}</td>
                  <td className="px-6 py-4">
                    <Badge variant={ad.status === 'Actif' ? 'success' : 'secondary'}>{ad.status}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <i className="ri-edit-line"></i>
                      </Button>
                      <Button size="sm" variant="outline">
                        <i className="ri-bar-chart-line"></i>
                      </Button>
                      <Button size="sm" variant="outline">
                        <i className="ri-pause-line"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Système de Rotation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Système de Rotation</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-blue-900">Rotation Automatique</h4>
                <Badge variant="success">Activé</Badge>
              </div>
              <p className="text-sm text-blue-700 mb-3">Les publicités sont affichées de manière dynamique pour éviter la répétition</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Fréquence de rotation:</span>
                  <span className="font-medium">15 secondes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Historique conservé:</span>
                  <span className="font-medium">20 dernières rotations</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Priorité:</span>
                  <span className="font-medium">Score + Récence</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-3">Règles de Priorisation</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white rounded">
                  <span className="text-sm">Campagnes Premium</span>
                  <Badge variant="primary">Priorité 10</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded">
                  <span className="text-sm">Promotions Limitées</span>
                  <Badge variant="warning">Priorité 9</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded">
                  <span className="text-sm">Publicités Standard</span>
                  <Badge variant="secondary">Priorité 7-8</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ciblage Avancé</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-3">Ciblage par Profil Utilisateur</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white rounded">
                  <span className="text-sm">Commerciaux</span>
                  <span className="text-sm font-medium text-green-600">67 publicités</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded">
                  <span className="text-sm">Managers</span>
                  <span className="text-sm font-medium text-green-600">45 publicités</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded">
                  <span className="text-sm">Consultants</span>
                  <span className="text-sm font-medium text-green-600">34 publicités</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-900 mb-3">Ciblage Contextuel</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white rounded">
                  <span className="text-sm">Section Dashboard</span>
                  <span className="text-sm font-medium text-orange-600">23 publicités</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded">
                  <span className="text-sm">Section Leads</span>
                  <span className="text-sm font-medium text-orange-600">18 publicités</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded">
                  <span className="text-sm">Section Analytics</span>
                  <span className="text-sm font-medium text-orange-600">15 publicités</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <h4 className="font-medium text-indigo-900 mb-3">Personnalisation IA</h4>
              <p className="text-sm text-indigo-700 mb-2">Algorithme d'apprentissage basé sur le comportement utilisateur</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">Précision du ciblage:</span>
                <span className="text-sm font-bold text-indigo-600">94.5%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Suivi des Clics et Analytics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Suivi des Clics et Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-eye-line text-2xl text-blue-600"></i>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Impressions</h4>
            <p className="text-3xl font-bold text-blue-600">2.4M</p>
            <p className="text-sm text-gray-600 mt-1">+15% ce mois</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-cursor-line text-2xl text-green-600"></i>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Clics Totaux</h4>
            <p className="text-3xl font-bold text-green-600">172K</p>
            <p className="text-sm text-gray-600 mt-1">+22% ce mois</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-shopping-cart-line text-2xl text-purple-600"></i>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Conversions</h4>
            <p className="text-3xl font-bold text-purple-600">12.4K</p>
            <p className="text-sm text-gray-600 mt-1">+18% ce mois</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source de Clic</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre de Clics</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taux de Conversion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenus</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { source: 'Bouton Principal', clicks: '89.2K', conversion: '8.5%', revenue: '€245K', roi: '385%' },
                { source: 'Image Publicité', clicks: '45.8K', conversion: '6.2%', revenue: '€128K', roi: '312%' },
                { source: 'Pop-up', clicks: '24.6K', conversion: '12.3%', revenue: '€85K', roi: '425%' },
                { source: 'Bannière Animée', clicks: '12.4K', conversion: '7.8%', revenue: '€42K', roi: '298%' }
              ].map((source, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{source.source}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{source.clicks}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-green-600">{source.conversion}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{source.revenue}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-blue-600">{source.roi}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Rapports pour Annonceurs */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rapports pour Annonceurs</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg">
              <h4 className="font-semibold mb-3">Campagne Analytics Q1</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-blue-100 text-sm">Budget</p>
                  <p className="text-2xl font-bold">€50K</p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Dépensé</p>
                  <p className="text-2xl font-bold">€42K</p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Revenus</p>
                  <p className="text-2xl font-bold">€156K</p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">ROI</p>
                  <p className="text-2xl font-bold">371%</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg">
              <h4 className="font-semibold mb-3">Campagne Collaboration</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-green-100 text-sm">Budget</p>
                  <p className="text-2xl font-bold">€35K</p>
                </div>
                <div>
                  <p className="text-green-100 text-sm">Dépensé</p>
                  <p className="text-2xl font-bold">€28K</p>
                </div>
                <div>
                  <p className="text-green-100 text-sm">Revenus</p>
                  <p className="text-2xl font-bold">€98K</p>
                </div>
                <div>
                  <p className="text-green-100 text-sm">ROI</p>
                  <p className="text-2xl font-bold">350%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Métriques Clés</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Coût par Clic (CPC)</span>
                  <span className="font-medium">€0.24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Coût par Conversion</span>
                  <span className="font-medium">€3.38</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Valeur par Conversion</span>
                  <span className="font-medium">€12.58</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Taux de Conversion Moyen</span>
                  <span className="font-medium text-green-600">7.2%</span>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Performance par Format</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pop-up</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                    <span className="text-sm font-medium">12.0%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Vidéo</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '70%'}}></div>
                    </div>
                    <span className="text-sm font-medium">7.0%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Animée</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '65%'}}></div>
                    </div>
                    <span className="text-sm font-medium">6.5%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Statique</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{width: '58%'}}></div>
                    </div>
                    <span className="text-sm font-medium">5.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">KOMERCIA</h1>
          <p className="text-gray-600">Plateforme de gestion commerciale et mise en relation</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
                {tab.count && (
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {renderContent()}

        {/* Contact Commercial Modal */}
        {showContactModal && selectedCommercial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">
                Contacter {selectedCommercial.nom}
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Votre nom complet"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    maxLength={500}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Décrivez votre projet ou vos besoins..."
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">Maximum 500 caractères</p>
                </div>
                <div className="flex space-x-3">
                  <LoadingButton
                    onClick={handleSubmitContact}
                    loading={loading}
                    className="flex-1"
                  >
                    Envoyer
                  </LoadingButton>
                  <Button
                    variant="outline"
                    onClick={() => setShowContactModal(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Network Modal */}
        {showNetworkModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Créer un Réseau Professionnel</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du réseau
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Cercle Tech Abidjan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Secteur d'activité
                  </label>
                  <select className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Technologie</option>
                    <option>Commerce</option>
                    <option>Services</option>
                    <option>Finance</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    maxLength={500}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Décrivez l'objectif de votre réseau..."
                  ></textarea>
                </div>
                <div className="flex space-x-3">
                  <Button variant="primary" className="flex-1">
                    Créer Réseau
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowNetworkModal(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Project Modal */}
        {showProjectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Soumettre un Projet</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du projet
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Système CRM Entreprise"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget estimé
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 15M FCFA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date limite
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    maxLength={500}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Décrivez votre projet en détail..."
                  ></textarea>
                </div>
                <div className="flex space-x-3">
                  <Button variant="primary" className="flex-1">
                    Publier Projet
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowProjectModal(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Resource Modal */}
        {showResourceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Ajouter une Ressource</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre de la ressource
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Guide Prospection B2B"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de ressource
                  </label>
                  <select className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>PDF</option>
                    <option>Vidéo</option>
                    <option>Présentation</option>
                    <option>Audio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <select className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Prospection</option>
                    <option>Négociation</option>
                    <option>Études de cas</option>
                    <option>Témoignages</option>
                    <option>Formation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fichier
                  </label>
                  <input
                    type="file"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button variant="primary" className="flex-1">
                    Ajouter Ressource
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowResourceModal(false)}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Configuration Alertes Prospects Dormants */}
        {showProspectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration des Alertes</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Délai d'inactivité (jours)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="30"
                    defaultValue="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fréquence des alertes
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Quotidienne</option>
                    <option>Hebdomadaire</option>
                    <option>Mensuelle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priorité minimum
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Toutes</option>
                    <option>Moyenne et plus</option>
                    <option>Haute uniquement</option>
                  </select>
                </div>
                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowProspectModal(false)}
                  >
                    Annuler
                  </Button>
                  <LoadingButton className="flex-1">
                    Configurer
                  </LoadingButton>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Plan d'Urgence */}
        {showCrisisModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nouveau Plan d'Urgence</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du plan
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Plan Crise Économique"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de crise
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option>Économique</option>
                    <option>Politique</option>
                    <option>Sanitaire</option>
                    <option>Sociale</option>
                    <option>Naturelle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    rows={3}
                    placeholder="Décrivez les actions à prendre..."
                    maxLength={500}
                  ></textarea>
                </div>
                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowCrisisModal(false)}
                  >
                    Annuler
                  </Button>
                  <LoadingButton className="flex-1 bg-red-600 hover:bg-red-700">
                    Créer Plan
                  </LoadingButton>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Nouveau Paiement */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nouveau Paiement</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Montant (FCFA)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="500000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Méthode de paiement
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option>Orange Money</option>
                    <option>MTN Mobile Money</option>
                    <option>Virement Bancaire</option>
                    <option>Carte Bancaire</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destinataire
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Nom du commercial"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Commission vente CRM"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowPaymentModal(false)}
                  >
                    Annuler
                  </Button>
                  <LoadingButton className="flex-1 bg-green-600 hover:bg-green-700">
                    Envoyer Paiement
                  </LoadingButton>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Profil Simplifié */}
        {showInformalModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nouveau Profil Simplifié</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du commerce
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Boutique Aya"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type d'activité
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Alimentation</option>
                    <option>Beauté</option>
                    <option>Réparation</option>
                    <option>Automobile</option>
                    <option>Textile</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Localisation
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Adjamé</option>
                    <option>Yopougon</option>
                    <option>Cocody</option>
                    <option>Abobo</option>
                    <option>Marcory</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="+225 07 123 456 78"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowInformalModal(false)}
                  >
                    Annuler
                  </Button>
                  <LoadingButton className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Créer Profil
                  </LoadingButton>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Marketplace Modal */}
        {showMarketplaceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Nouvelle Offre Groupée</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'offre</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Ex: Pack CRM + Formation" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
                    <option>Offre groupée</option>
                    <option>Exposition virtuelle</option>
                    <option>Démonstration live</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix (FCFA)</label>
                  <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="15000000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} maxLength={500} placeholder="Description de l'offre..."></textarea>
                </div>
                <div className="flex space-x-3">
                  <LoadingButton type="submit" className="flex-1 whitespace-nowrap">
                    Créer l'Offre
                  </LoadingButton>
                  <Button type="button" variant="secondary" onClick={() => setShowMarketplaceModal(false)} className="whitespace-nowrap">
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Account Creation Modal */}
        {showAccountModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Création Assistée de Compte</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Jean Dupont" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="jean.dupont@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="TechCorp Solutions" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Secteur d'activité</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
                    <option>Technologie</option>
                    <option>Commerce</option>
                    <option>Services</option>
                    <option>Finance</option>
                  </select>
                </div>
                <div className="flex space-x-3">
                  <LoadingButton type="submit" className="flex-1 whitespace-nowrap">
                    Créer le Compte
                  </LoadingButton>
                  <Button type="button" variant="secondary" onClick={() => setShowAccountModal(false)} className="whitespace-nowrap">
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Demo Account Modal */}
        {showDemoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Créer Compte Démo</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Utilisateur</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Nom de l'utilisateur" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
                    <option>CRM Pro</option>
                    <option>Analytics Plus</option>
                    <option>E-commerce Suite</option>
                    <option>Formation CRM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durée d'essai (jours)</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
                    <option>14 jours</option>
                    <option>21 jours</option>
                    <option>30 jours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commercial assigné</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
                    <option>Jean Kouassi</option>
                    <option>Marie Diabaté</option>
                    <option>Amadou Traoré</option>
                  </select>
                </div>
                <div className="flex space-x-3">
                  <LoadingButton type="submit" className="flex-1 whitespace-nowrap">
                    Créer Démo
                  </LoadingButton>
                  <Button type="button" variant="secondary" onClick={() => setShowDemoModal(false)} className="whitespace-nowrap">
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Partnership Modal */}
        {showPartnershipModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Nouveau Partenariat</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom du partenaire</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="TechSolutions CI" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type de partenariat</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
                    <option>Distributeur</option>
                    <option>Formateur</option>
                    <option>Marketing</option>
                    <option>Consultant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de renouvellement</label>
                  <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} maxLength={500} placeholder="Détails du partenariat..."></textarea>
                </div>
                <div className="flex space-x-3">
                  <LoadingButton type="submit" className="flex-1 whitespace-nowrap">
                    Créer Partenariat
                  </LoadingButton>
                  <Button type="button" variant="secondary" onClick={() => setShowPartnershipModal(false)} className="whitespace-nowrap">
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Subscription Modal */}
        {showSubscriptionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Nouvel Abonnement</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Nom du client" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Forfait</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
                    <option>CRM Starter - 50K FCFA/mois</option>
                    <option>CRM Professional - 150K FCFA/mois</option>
                    <option>CRM Enterprise - 350K FCFA/mois</option>
                    <option>Formation Premium - 200K FCFA/mois</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                  <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durée</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
                    <option>1 mois</option>
                    <option>3 mois</option>
                    <option>6 mois</option>
                    <option>12 mois</option>
                  </select>
                </div>
                <div className="flex space-x-3">
                  <LoadingButton type="submit" className="flex-1 whitespace-nowrap">
                    Créer Abonnement
                  </LoadingButton>
                  <Button type="button" variant="secondary" onClick={() => setShowSubscriptionModal(false)} className="whitespace-nowrap">
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reward Modal */}
        {showRewardModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Nouvelle Récompense</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la récompense</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Smartphone Samsung Galaxy" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
                    <option>Électronique</option>
                    <option>Formation</option>
                    <option>Shopping</option>
                    <option>Voyage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Points requis</label>
                  <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="1500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock disponible</label>
                  <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="5" />
                </div>
                <div className="flex space-x-3">
                  <LoadingButton type="submit" className="flex-1 whitespace-nowrap">
                    Ajouter Récompense
                  </LoadingButton>
                  <Button type="button" variant="secondary" onClick={() => setShowRewardModal(false)} className="whitespace-nowrap">
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Product Modal */}
        {showProductModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Nouveau Produit</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="CRM Professional" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
                    <option>Logiciel</option>
                    <option>Formation</option>
                    <option>Service</option>
                    <option>Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix (FCFA)</label>
                  <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="150000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} maxLength={500} placeholder="Description du produit..."></textarea>
                </div>
                <div className="flex space-x-3">
                  <LoadingButton type="submit" className="flex-1 whitespace-nowrap">
                    Ajouter Produit
                  </LoadingButton>
                  <Button type="button" variant="secondary" onClick={() => setShowProductModal(false)} className="whitespace-nowrap">
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Nouvel Événement</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'événement</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Webinaire CRM 2024" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8">
                    <option>Webinaire</option>
                    <option>Salon</option>
                    <option>Formation</option>
                    <option>Démonstration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                  <input type="time" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} maxLength={500} placeholder="Description de l'événement..."></textarea>
                </div>
                <div className="flex space-x-3">
                  <LoadingButton type="submit" className="flex-1 whitespace-nowrap">
                    Créer Événement
                  </LoadingButton>
                  <Button type="button" variant="secondary" onClick={() => setShowEventModal(false)} className="whitespace-nowrap">
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modals */}
        {showContactModal && <ContactModal />}
        {showNetworkModal && <NetworkModal />}
        {showProjectModal && <ProjectModal />}
        {showResourceModal && <ResourceModal />}
        {showAlertModal && <AlertModal />}
        {showCrisisModal && <CrisisModal />}
        {showPaymentModal && <PaymentModal />}
        {showInformalModal && <InformalModal />}
        {showMarketplaceModal && <MarketplaceModal />}
        {showAccountModal && <AccountModal />}
        {showDemoModal && <DemoModal />}
        {showPartnershipModal && <PartnershipModal />}
        {showSubscriptionModal && <SubscriptionModal />}
        {showRewardModal && <RewardModal />}
        {showProductModal && <ProductModal />}
        {showEventModal && <EventModal />}
        {showObjectiveModal && <ObjectiveModal />}
        {showComplaintModal && <ComplaintModal />}
        {showTrainingModal && <TrainingModal />}
        {showWhiteZoneModal && <WhiteZoneModal />}
        {showCollaborationModal && <CollaborationModal />}
        {showBundleModal && <BundleModal />}
        {showTrialModal && <TrialModal />}
        {showAdModal && <AdModal />}
      </div>
    </div>
  );
};

export default KomerciaPage;
