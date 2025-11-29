
import { useState } from 'react';
import { Card } from '../../../components/base/Card';
import { Button } from '../../../components/base/Button';
import { LoadingButton } from '../../../components/base/LoadingButton';
import { Badge } from '../../../components/base/Badge';
import { AdBanner } from '../../../components/feature/AdBanner';

export const PartnersDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: 'ri-dashboard-line', count: null },
    { id: 'integration', label: 'Services Intégrés', icon: 'ri-plug-line', count: 12 },
    { id: 'data', label: 'Données', icon: 'ri-bar-chart-line', count: null },
    { id: 'promotion', label: 'Promotions', icon: 'ri-megaphone-line', count: 8 },
    { id: 'reports', label: 'Rapports', icon: 'ri-file-chart-line', count: null }
  ];

  const handleAction = async (action: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    if (action === 'integration') setShowIntegrationModal(false);
    if (action === 'campaign') setShowCampaignModal(false);
    if (action === 'report') setShowReportModal(false);
    if (action === 'email') setShowEmailModal(false);
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Bannière publicitaire en-tête */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Solutions Complètes d'Intégration API</h3>
            <p className="text-indigo-100">Connectez vos services avec notre plateforme enterprise sécurisée</p>
          </div>
          <Button variant="outline" className="bg-white text-indigo-600 border-white hover:bg-indigo-50">
            Découvrir l'API Gateway
          </Button>
        </div>
      </div>

      {/* Résumé des activités */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <i className="ri-plug-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Services Intégrés</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs text-green-600">+2 ce mois</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <i className="ri-user-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Utilisateurs Actifs</p>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
              <p className="text-xs text-green-600">+156 cette semaine</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <i className="ri-star-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
              <p className="text-xs text-green-600">+2.1% vs mois dernier</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenus Mensuels</p>
              <p className="text-2xl font-bold text-gray-900">€45,2K</p>
              <p className="text-xs text-green-600">+8% ce trimestre</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Notifications */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
        <div className="space-y-4">
          {[
            {
              type: 'opportunity',
              icon: 'ri-lightbulb-line',
              title: 'Nouvelle opportunité de collaboration',
              message: 'TechCorp Solutions recherche une intégration API de paiement',
              time: '2h',
              priority: 'high',
              color: 'orange'
            },
            {
              type: 'update',
              icon: 'ri-refresh-line',
              title: 'Mise à jour requise',
              message: 'Service Analytics API v2.1 disponible avec nouvelles fonctionnalités',
              time: '4h',
              priority: 'medium',
              color: 'blue'
            },
            {
              type: 'promotion',
              icon: 'ri-megaphone-line',
              title: 'Promotion en cours',
              message: 'Campagne "API Gateway Pro" expire dans 3 jours',
              time: '1j',
              priority: 'medium',
              color: 'purple'
            }
          ].map((notification, index) => (
            <div key={index} className={`flex items-start p-4 rounded-lg border-l-4 ${
              notification.priority === 'high' ? 'bg-red-50 border-red-500' :
              notification.priority === 'medium' ? 'bg-yellow-50 border-yellow-500' :
              'bg-green-50 border-green-500'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                notification.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                notification.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                <i className={`${notification.icon} text-sm`}></i>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{notification.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <span className="text-xs text-gray-500 mt-2 block">{notification.time}</span>
              </div>
              <Button size="sm" variant="outline">
                Voir
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Accès rapide */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Accès Rapide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            onClick={() => setActiveTab('integration')}
            className="h-20 flex flex-col items-center justify-center"
          >
            <i className="ri-plug-line text-xl mb-2"></i>
            Services Intégrés
          </Button>
          <Button 
            onClick={() => setActiveTab('data')}
            className="h-20 flex flex-col items-center justify-center"
            variant="outline"
          >
            <i className="ri-bar-chart-line text-xl mb-2"></i>
            Données
          </Button>
          <Button 
            onClick={() => setActiveTab('promotion')}
            className="h-20 flex flex-col items-center justify-center"
            variant="outline"
          >
            <i className="ri-megaphone-line text-xl mb-2"></i>
            Promotions
          </Button>
          <Button 
            onClick={() => setActiveTab('reports')}
            className="h-20 flex flex-col items-center justify-center"
            variant="outline"
          >
            <i className="ri-file-chart-line text-xl mb-2"></i>
            Rapports
          </Button>
        </div>
      </Card>

      {/* Bannière publicitaire footer */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Outils de Gestion de Partenariats B2B</h3>
            <p className="text-green-100">Optimisez vos collaborations avec notre suite complète</p>
          </div>
          <Button variant="outline" className="bg-white text-green-600 border-white hover:bg-green-50">
            Découvrir les Outils
          </Button>
        </div>
      </div>
    </div>
  );

  const renderIntegrationSection = () => (
    <div className="space-y-8">
      {/* Bannière publicitaire en-tête */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Solutions d'Intégration API Enterprise</h3>
            <p className="text-green-100">Connectez vos services avec notre plateforme sécurisée</p>
          </div>
          <Button variant="outline" className="bg-white text-green-600 border-white hover:bg-green-50">
            Documentation API
          </Button>
        </div>
      </div>

      {/* Catalogue des services intégrés */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Catalogue des Services Intégrés</h3>
          <Button onClick={() => setShowIntegrationModal(true)}>
            <i className="ri-add-line mr-2"></i>
            Ajouter un Service
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'API Gateway Pro',
              description: 'Gestion avancée des API avec monitoring temps réel et sécurité enterprise',
              status: 'actif',
              users: 1247,
              transactions: '45.2K',
              feedback: 4.8,
              integration: 'REST API'
            },
            {
              name: 'Payment Processing',
              description: 'Solution de paiement sécurisée avec support multi-devises',
              status: 'actif',
              users: 892,
              transactions: '28.7K',
              feedback: 4.9,
              integration: 'Webhook'
            },
            {
              name: 'Analytics Suite',
              description: 'Plateforme d\'analyse de données avec IA intégrée',
              status: 'en_cours',
              users: 2156,
              transactions: '67.1K',
              feedback: 4.7,
              integration: 'SDK'
            },
            {
              name: 'CRM Enterprise',
              description: 'Solution CRM complète pour grandes entreprises',
              status: 'en_attente',
              users: 0,
              transactions: '0',
              feedback: 0,
              integration: 'GraphQL'
            },
            {
              name: 'Notification Service',
              description: 'Service de notifications push et email automatisées',
              status: 'actif',
              users: 567,
              transactions: '12.3K',
              feedback: 4.6,
              integration: 'REST API'
            },
            {
              name: 'Document Management',
              description: 'Gestion et stockage sécurisé de documents',
              status: 'actif',
              users: 334,
              transactions: '8.9K',
              feedback: 4.5,
              integration: 'SDK'
            }
          ].map((service, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{service.name}</h4>
                  <span className="text-sm text-gray-500">{service.integration}</span>
                </div>
                <Badge variant={
                  service.status === 'actif' ? 'success' :
                  service.status === 'en_cours' ? 'warning' :
                  'secondary'
                }>
                  {service.status === 'actif' ? 'Actif' :
                   service.status === 'en_cours' ? 'En cours' :
                   'En attente'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Utilisateurs:</span>
                  <span className="font-medium">{service.users.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transactions:</span>
                  <span className="font-medium">{service.transactions}</span>
                </div>
                {service.feedback > 0 && (
                  <div className="flex justify-between">
                    <span>Satisfaction:</span>
                    <span className="font-medium">{service.feedback}/5 ⭐</span>
                  </div>
                )}
              </div>
              <Button 
                className="w-full" 
                variant={service.status === 'actif' ? 'outline' : 'default'}
              >
                {service.status === 'actif' ? 'Gérer' : 
                 service.status === 'en_cours' ? 'Configurer' : 
                 'Intégrer'}
              </Button>
            </Card>
          ))}
        </div>
      </Card>

      {/* Outils d'intégration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Outils d'Intégration</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <i className="ri-code-line text-blue-600 mr-2"></i>
                <h4 className="font-medium text-gray-900">Documentation API</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Guide complet d'intégration avec exemples de code</p>
              <Button size="sm" variant="outline">
                Consulter la Doc
              </Button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center mb-2">
                <i className="ri-tools-line text-green-600 mr-2"></i>
                <h4 className="font-medium text-gray-900">SDK & Bibliothèques</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">SDKs pour JavaScript, Python, PHP, Java</p>
              <Button size="sm" variant="outline">
                Télécharger SDK
              </Button>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center mb-2">
                <i className="ri-customer-service-line text-purple-600 mr-2"></i>
                <h4 className="font-medium text-gray-900">Assistance Technique</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Support dédié pour vos intégrations</p>
              <Button size="sm" variant="outline">
                Contacter le Support
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Suivi des Performances</h3>
          <div className="space-y-4">
            {[
              { service: 'API Gateway Pro', uptime: '99.9%', latency: '45ms', calls: '1.2M' },
              { service: 'Payment Processing', uptime: '99.8%', latency: '32ms', calls: '890K' },
              { service: 'Analytics Suite', uptime: '99.7%', latency: '78ms', calls: '2.1M' },
              { service: 'Notification Service', uptime: '99.9%', latency: '23ms', calls: '567K' }
            ].map((perf, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{perf.service}</h4>
                  <span className="text-green-600 font-medium">{perf.uptime}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span>Latence: </span>
                    <span className="font-medium">{perf.latency}</span>
                  </div>
                  <div>
                    <span>Appels: </span>
                    <span className="font-medium">{perf.calls}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bannière publicitaire footer */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Solutions de Support Technique Avancé</h3>
            <p className="text-blue-100">Support 24/7 et assistance dédiée pour vos intégrations</p>
          </div>
          <Button variant="outline" className="bg-white text-blue-600 border-white hover:bg-blue-50">
            Contacter le Support
          </Button>
        </div>
      </div>
    </div>
  );

  const renderDataSection = () => (
    <div className="space-y-8">
      {/* Bannière publicitaire en-tête */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Analytics Partenaires Avancés avec IA</h3>
            <p className="text-teal-100">Analysez les performances de vos partenariats avec des insights intelligents</p>
          </div>
          <Button variant="outline" className="bg-white text-teal-600 border-white hover:bg-teal-50">
            Analyser les Performances
          </Button>
        </div>
      </div>

      {/* Tableaux de bord des données */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <i className="ri-user-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Utilisateurs Totaux</p>
              <p className="text-2xl font-bold text-gray-900">24,567</p>
              <p className="text-xs text-green-600">+12% ce mois</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <i className="ri-building-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Secteurs Actifs</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
              <p className="text-xs text-blue-600">+2 nouveaux</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <i className="ri-global-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Zones Géographiques</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
              <p className="text-xs text-green-600">+3 régions</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <i className="ri-trending-up-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Opportunités</p>
              <p className="text-2xl font-bold text-gray-900">127</p>
              <p className="text-xs text-orange-600">+15 nouvelles</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Données sur les utilisateurs */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Données Utilisateurs par Secteur</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <i className="ri-filter-line mr-2"></i>
                  Filtrer
                </Button>
                <Button variant="outline" size="sm">
                  <i className="ri-download-line mr-2"></i>
                  Exporter
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { sector: 'E-commerce', users: 8456, localisation: 'Europe', besoins: 'API Paiement', growth: '+12%', potential: 'Élevé' },
                { sector: 'Fintech', users: 6234, localisation: 'Amérique du Nord', besoins: 'Analytics', growth: '+18%', potential: 'Très Élevé' },
                { sector: 'SaaS', users: 4892, localisation: 'Asie-Pacifique', besoins: 'CRM Integration', growth: '+8%', potential: 'Moyen' },
                { sector: 'Santé', users: 3567, localisation: 'Europe', besoins: 'Sécurité', growth: '+25%', potential: 'Très Élevé' },
                { sector: 'Éducation', users: 1418, localisation: 'Global', besoins: 'Collaboration', growth: '+35%', potential: 'Élevé' }
              ].map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <i className="ri-building-line text-blue-600"></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{item.sector}</h4>
                        <p className="text-sm text-gray-600">{item.users.toLocaleString()} utilisateurs • {item.localisation}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-green-600 font-medium">{item.growth}</span>
                      <Badge variant={
                        item.potential === 'Très Élevé' ? 'danger' :
                        item.potential === 'Élevé' ? 'warning' :
                        'secondary'
                      }>
                        {item.potential}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Besoins principaux:</span> {item.besoins}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Analyse des opportunités */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Analyse des Opportunités</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Marché Asiatique - Fintech',
                  description: 'Zone géographique sous-exploitée avec forte demande pour solutions de paiement',
                  impact: 'Très Élevé',
                  effort: 'Moyen',
                  revenue: '€280K/an',
                  region: 'Asie-Pacifique',
                  sector: 'Fintech'
                },
                {
                  title: 'Secteur Santé - Europe',
                  description: 'Besoin croissant en solutions de sécurité et conformité RGPD',
                  impact: 'Élevé',
                  effort: 'Faible',
                  revenue: '€195K/an',
                  region: 'Europe',
                  sector: 'Santé'
                },
                {
                  title: 'PME E-commerce - Global',
                  description: 'Segment sous-exploité avec besoins en intégrations simplifiées',
                  impact: 'Élevé',
                  effort: 'Élevé',
                  revenue: '€320K/an',
                  region: 'Global',
                  sector: 'E-commerce'
                },
                {
                  title: 'Startups SaaS - Amérique du Nord',
                  description: 'Demande pour des API de collaboration et productivité',
                  impact: 'Moyen',
                  effort: 'Faible',
                  revenue: '€150K/an',
                  region: 'Amérique du Nord',
                  sector: 'SaaS'
                }
              ].map((opportunity, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{opportunity.title}</h4>
                    <span className="text-lg font-bold text-green-600">{opportunity.revenue}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{opportunity.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex space-x-2">
                      <Badge variant="secondary">{opportunity.region}</Badge>
                      <Badge variant="secondary">{opportunity.sector}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Badge variant={
                        opportunity.impact === 'Très Élevé' ? 'danger' :
                        opportunity.impact === 'Élevé' ? 'warning' :
                        'secondary'
                      }>
                        Impact: {opportunity.impact}
                      </Badge>
                      <Badge variant={
                        opportunity.effort === 'Faible' ? 'success' :
                        opportunity.effort === 'Moyen' ? 'warning' :
                        'danger'
                      }>
                        Effort: {opportunity.effort}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      Analyser
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Bannière publicitaire dans la section données */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Veille Stratégique Automatisée</h3>
                <p className="text-purple-100">Surveillez votre marché et identifiez les opportunités en temps réel</p>
              </div>
              <Button variant="outline" className="bg-white text-purple-600 border-white hover:bg-purple-50">
                Activer la Veille
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Services les plus utilisés */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Services les Plus Utilisés</h3>
            <div className="space-y-4">
              {[
                { service: 'API Gateway Pro', usage: 89, trend: '+12%' },
                { service: 'Payment Processing', usage: 76, trend: '+8%' },
                { service: 'Analytics Suite', usage: 68, trend: '+15%' },
                { service: 'CRM Integration', usage: 45, trend: '+25%' }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{item.service}</span>
                    <span className="text-sm text-green-600">{item.trend}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${item.usage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">{item.usage}% d'utilisation</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recommandations basées sur les tendances */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommandations IA</h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Cibler le secteur Fintech',
                  confidence: 92,
                  action: 'Développer une API spécialisée en paiements crypto'
                },
                {
                  title: 'Expansion géographique',
                  confidence: 87,
                  action: 'Localiser les services en Allemagne et Japon'
                },
                {
                  title: 'Partenariat stratégique',
                  confidence: 78,
                  action: 'Collaborer avec des intégrateurs cloud majeurs'
                }
              ].map((rec, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{rec.title}</h4>
                    <span className="text-sm font-medium text-blue-600">{rec.confidence}%</span>
                  </div>
                  <p className="text-sm text-gray-600">{rec.action}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Exportation des données */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exportation des Données</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <i className="ri-file-pdf-line mr-2 text-red-600"></i>
                Exporter en PDF
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <i className="ri-file-excel-line mr-2 text-green-600"></i>
                Exporter en Excel
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <i className="ri-file-text-line mr-2 text-blue-600"></i>
                Exporter en CSV
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderPromotionSection = () => (
    <div className="space-y-8">
      {/* Bannière publicitaire en-tête */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Gestion Campagnes Multi-Canal</h3>
            <p className="text-purple-100">Orchestrez vos campagnes sur tous les canaux depuis une interface unique</p>
          </div>
          <Button variant="outline" className="bg-white text-purple-600 border-white hover:bg-purple-50">
            Gérer les Campagnes
          </Button>
        </div>
      </div>

      {/* Métriques des campagnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <i className="ri-megaphone-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Campagnes Actives</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-xs text-green-600">+2 ce mois</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <i className="ri-eye-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Impressions</p>
              <p className="text-2xl font-bold text-gray-900">156K</p>
              <p className="text-xs text-green-600">+12% cette semaine</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <i className="ri-cursor-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Taux de Clic</p>
              <p className="text-2xl font-bold text-gray-900">7.2%</p>
              <p className="text-xs text-green-600">+0.8% vs moyenne</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <i className="ri-exchange-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Conversions</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-xs text-green-600">+15% ce mois</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Création de campagnes promotionnelles */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Mes Campagnes Promotionnelles</h3>
              <Button onClick={() => setShowCampaignModal(true)}>
                <i className="ri-add-line mr-2"></i>
                Créer une Campagne
              </Button>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  name: 'API Gateway Pro - Lancement Q1',
                  type: 'Intégration API',
                  status: 'active',
                  budget: '€8,000',
                  spent: '€5,200',
                  impressions: '67.2K',
                  clicks: '4,847',
                  conversions: '298',
                  ctr: '7.2%',
                  endDate: '28 Fév 2025',
                  targeting: 'E-commerce, Fintech'
                },
                {
                  name: 'Payment Solutions - Promotion Hiver',
                  type: 'Service Paiement',
                  status: 'active',
                  budget: '€12,000',
                  spent: '€8,100',
                  impressions: '89.5K',
                  clicks: '6,234',
                  conversions: '456',
                  ctr: '7.0%',
                  endDate: '15 Mars 2025',
                  targeting: 'SaaS, E-commerce'
                },
                {
                  name: 'Analytics Suite - Retargeting',
                  type: 'Analytics',
                  status: 'paused',
                  budget: '€5,500',
                  spent: '€4,200',
                  impressions: '34.8K',
                  clicks: '2,456',
                  conversions: '134',
                  ctr: '7.1%',
                  endDate: '10 Fév 2025',
                  targeting: 'Tous secteurs'
                }
              ].map((campaign, index) => (
                <div key={index} className="p-6 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                      <div className="flex items-center mt-2 space-x-4">
                        <Badge variant={campaign.status === 'active' ? 'success' : 'warning'}>
                          {campaign.status === 'active' ? 'Active' : 'En pause'}
                        </Badge>
                        <span className="text-sm text-gray-600">Type: {campaign.type}</span>
                        <span className="text-sm text-gray-600">Fin: {campaign.endDate}</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm text-gray-600">Ciblage: {campaign.targeting}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <i className="ri-edit-line mr-1"></i>
                        Modifier
                      </Button>
                      <Button size="sm" variant="outline">
                        <i className="ri-bar-chart-line mr-1"></i>
                        Stats
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Budget</p>
                      <p className="font-medium">{campaign.budget}</p>
                      <p className="text-xs text-gray-500">Dépensé: {campaign.spent}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Impressions</p>
                      <p className="font-medium">{campaign.impressions}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Clics</p>
                      <p className="font-medium">{campaign.clicks}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Conversions</p>
                      <p className="font-medium">{campaign.conversions}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">CTR</p>
                      <p className="font-medium">{campaign.ctr}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">CPC</p>
                      <p className="font-medium">€{(parseFloat(campaign.spent.replace('€', '').replace(',', '')) / parseInt(campaign.clicks.replace(',', ''))).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Gestion des campagnes */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Ciblage des Utilisateurs</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Secteur E-commerce',
                  users: '8,456 utilisateurs',
                  localisation: 'Europe, Amérique du Nord',
                  besoins: 'API Paiement, Analytics',
                  engagement: 'Élevé',
                  recommendation: 'Recommandé pour Payment Solutions'
                },
                {
                  title: 'Entreprises 50-200 employés',
                  users: '3,247 entreprises',
                  localisation: 'Global',
                  besoins: 'CRM, Intégrations',
                  engagement: 'Très Élevé',
                  recommendation: 'Idéal pour API Gateway Pro'
                },
                {
                  title: 'Startups Tech',
                  users: '12,890 startups',
                  localisation: 'Amérique du Nord, Asie',
                  besoins: 'Scalabilité, Analytics',
                  engagement: 'Moyen',
                  recommendation: 'Potentiel pour Analytics Suite'
                }
              ].map((segment, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{segment.title}</h4>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p>{segment.users}</p>
                    <p><span className="font-medium">Zone:</span> {segment.localisation}</p>
                    <p><span className="font-medium">Besoins:</span> {segment.besoins}</p>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={
                      segment.engagement === 'Très Élevé' ? 'success' :
                      segment.engagement === 'Élevé' ? 'warning' :
                      'secondary'
                    }>
                      {segment.engagement}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{segment.recommendation}</p>
                  <Button size="sm" className="w-full">
                    Cibler ce Segment
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Intégration publicitaire */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Intégration Publicitaire</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <i className="ri-advertisement-line text-blue-600 mr-2"></i>
                  <h4 className="font-medium text-gray-900">Bannières Publicitaires</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">Placement des offres dans les bannières de la plateforme</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Emplacements actifs:</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impressions/jour:</span>
                    <span className="font-medium">15.2K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CTR moyen:</span>
                    <span className="font-medium">6.8%</span>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-4">
                  Gérer les Bannières
                </Button>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <i className="ri-notification-line text-green-600 mr-2"></i>
                  <h4 className="font-medium text-gray-900">Notifications Push</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">Promotion via notifications push ciblées</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Notifications envoyées:</span>
                    <span className="font-medium">8.9K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taux d'ouverture:</span>
                    <span className="font-medium">23.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Conversions:</span>
                    <span className="font-medium">156</span>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-4">
                  Configurer Push
                </Button>
              </div>
            </div>
          </Card>

          {/* Bannière publicitaire dans la section promotion */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Plateforme Collaboration 360°</h3>
                <p className="text-orange-100">Centralisez tous vos outils de collaboration partenaires en un seul endroit</p>
              </div>
              <Button variant="outline" className="bg-white text-orange-600 border-white hover:bg-orange-50">
                Centraliser la Collaboration
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Performance en temps réel */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Temps Réel</h3>
            <div className="space-y-4">
              {[
                { metric: 'Impressions aujourd\'hui', value: '12,456', change: '+8.2%' },
                { metric: 'Clics aujourd\'hui', value: '892', change: '+12.5%' },
                { metric: 'Conversions aujourd\'hui', value: '47', change: '+15.3%' },
                { metric: 'Coût par conversion', value: '€68', change: '-5.2%' },
                { metric: 'ROI moyen', value: '340%', change: '+12.8%' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{item.metric}</p>
                    <p className="font-semibold text-gray-900">{item.value}</p>
                  </div>
                  <span className={`text-sm font-medium ${
                    item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Notifications campagnes */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications Campagnes</h3>
            <div className="space-y-3">
              {[
                {
                  type: 'warning',
                  message: 'Campagne "API Gateway Pro" expire dans 3 jours',
                  time: '2h'
                },
                {
                  type: 'success',
                  message: 'Objectif de conversions atteint pour "Payment Solutions"',
                  time: '4h'
                },
                {
                  type: 'info',
                  message: 'Nouveau segment disponible: "Startups IA"',
                  time: '1j'
                },
                {
                  type: 'warning',
                  message: 'Budget presque épuisé pour "Analytics Suite"',
                  time: '6h'
                }
              ].map((notif, index) => (
                <div key={index} className={`p-3 rounded-lg ${
                  notif.type === 'warning' ? 'bg-orange-50 border border-orange-200' :
                  notif.type === 'success' ? 'bg-green-50 border border-green-200' :
                  'bg-blue-50 border border-blue-200'
                }`}>
                  <div className="flex items-start">
                    <i className={`${
                      notif.type === 'warning' ? 'ri-alert-line text-orange-600' :
                      notif.type === 'success' ? 'ri-check-line text-green-600' :
                      'ri-information-line text-blue-600'
                    } mr-2 mt-0.5`}></i>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Suivi des performances */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Suivi des Performances</h3>
            <div className="space-y-4">
              {[
                { campaign: 'API Gateway Pro', performance: 'Excellent', ctr: '7.2%' },
                { campaign: 'Payment Solutions', performance: 'Très Bon', ctr: '7.0%' },
                { campaign: 'Analytics Suite', performance: 'Bon', ctr: '7.1%' }
              ].map((item, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 text-sm">{item.campaign}</span>
                    <span className="text-sm font-medium">{item.ctr}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant={
                      item.performance === 'Excellent' ? 'success' :
                      item.performance === 'Très Bon' ? 'warning' :
                      'secondary'
                    }>
                      {item.performance}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <i className="ri-eye-line mr-1"></i>
                      Voir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderReportsSection = () => (
    <div className="space-y-8">
      {/* Bannière publicitaire en-tête */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Rapports IA Personnalisés</h3>
            <p className="text-teal-100">Générez des rapports intelligents adaptés à vos besoins métier</p>
          </div>
          <Button variant="outline" className="bg-white text-teal-600 border-white hover:bg-teal-50">
            Créer des Rapports IA
          </Button>
        </div>
      </div>

      {/* Métriques des rapports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <i className="ri-file-chart-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rapports Générés</p>
              <p className="text-2xl font-bold text-gray-900">47</p>
              <p className="text-xs text-green-600">+8 ce mois</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <i className="ri-download-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Téléchargements</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-xs text-green-600">+23 cette semaine</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <i className="ri-mail-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Envois Email</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
              <p className="text-xs text-blue-600">+12 cette semaine</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Temps Économisé</p>
              <p className="text-2xl font-bold text-gray-900">156h</p>
              <p className="text-xs text-green-600">vs création manuelle</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Création de rapports personnalisés */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Créer un Rapport Personnalisé</h3>
              <Button onClick={() => setShowReportModal(true)}>
                <i className="ri-add-line mr-2"></i>
                Nouveau Rapport
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Rapport Services Intégrés',
                  description: 'Analyse détaillée de l\'utilisation et des performances par service',
                  icon: 'ri-plug-line',
                  color: 'blue',
                  sections: ['Utilisation des services', 'Performances des campagnes', 'Feedback des utilisateurs'],
                  time: '2-3h'
                },
                {
                  title: 'Rapport Campagnes Marketing',
                  description: 'Performance des campagnes promotionnelles et ROI détaillé',
                  icon: 'ri-megaphone-line',
                  color: 'purple',
                  sections: ['Métriques campagnes', 'Analyse ROI', 'Recommandations'],
                  time: '1-2h'
                },
                {
                  title: 'Rapport Opportunités Marché',
                  description: 'Analyse des tendances et opportunités de croissance',
                  icon: 'ri-trending-up-line',
                  color: 'green',
                  sections: ['Analyse marché', 'Opportunités identifiées', 'Stratégies recommandées'],
                  time: '3-4h'
                }
              ].map((template, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <div className={`w-12 h-12 bg-gradient-to-br ${
                    template.color === 'blue' ? 'from-blue-500 to-indigo-600' :
                    template.color === 'purple' ? 'from-purple-500 to-pink-600' :
                    'from-green-500 to-emerald-600'
                  } rounded-lg flex items-center justify-center mb-4`}>
                    <i className={`${template.icon} text-white text-xl`}></i>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">{template.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <div className="space-y-1 mb-4">
                    {template.sections.map((section, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-500">
                        <i className="ri-check-line mr-1"></i>
                        {section}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-500">Temps estimé: {template.time}</span>
                  </div>
                  <Button size="sm" className="w-full">
                    Utiliser ce Modèle
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Historique des rapports */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Historique des Rapports</h3>
              <div className="flex space-x-2">
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 pr-8">
                  <option>Tous les types</option>
                  <option>Services</option>
                  <option>Campagnes</option>
                  <option>Opportunités</option>
                </select>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 pr-8">
                  <option>Tous les statuts</option>
                  <option>Générés</option>
                  <option>En cours</option>
                  <option>Programmés</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  name: 'Performance Services Intégrés Q4 2024',
                  type: 'Services',
                  createdAt: '15 Jan 2025',
                  period: 'Q4 2024',
                  format: 'PDF',
                  size: '2.8 MB',
                  downloads: 15,
                  status: 'Généré'
                },
                {
                  name: 'Analyse Campagnes Marketing Décembre',
                  type: 'Campagnes',
                  createdAt: '08 Jan 2025',
                  period: 'Décembre 2024',
                  format: 'Excel',
                  size: '1.5 MB',
                  downloads: 8,
                  status: 'Généré'
                },
                {
                  name: 'Opportunités Marché 2025',
                  type: 'Opportunités',
                  createdAt: '03 Jan 2025',
                  period: '2025',
                  format: 'PowerPoint',
                  size: '5.4 MB',
                  downloads: 12,
                  status: 'En cours'
                },
                {
                  name: 'Rapport Feedback Utilisateurs',
                  type: 'Feedback',
                  createdAt: '28 Déc 2024',
                  period: 'Q4 2024',
                  format: 'PDF',
                  size: '3.2 MB',
                  downloads: 6,
                  status: 'Généré'
                }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                      <i className="ri-file-chart-line text-indigo-600"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{report.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{report.type}</span>
                        <span>{report.createdAt}</span>
                        <span>{report.period}</span>
                        <span>{report.format} • {report.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{report.downloads}</p>
                      <p className="text-xs text-gray-600">téléchargements</p>
                    </div>
                    <Badge variant={report.status === 'Généré' ? 'success' : 'warning'}>
                      {report.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <i className="ri-download-line mr-1"></i>
                        Télécharger
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedReport(report);
                          setShowEmailModal(true);
                        }}
                      >
                        <i className="ri-mail-line mr-1"></i>
                        Envoyer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Bannière publicitaire dans la section rapports */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Conseil Partenariats Stratégiques</h3>
                <p className="text-orange-100">Bénéficiez de l'expertise de nos consultants en développement partenaires</p>
              </div>
              <Button variant="outline" className="bg-white text-orange-600 border-white hover:bg-orange-50">
                Consulter les Experts
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Filtres pour génération de rapports */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtres de Rapport</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Période</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg pr-8">
                  <option>Derniers 30 jours</option>
                  <option>Dernier trimestre</option>
                  <option>Dernière année</option>
                  <option>Personnalisé</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secteur</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg pr-8">
                  <option>Tous les secteurs</option>
                  <option>E-commerce</option>
                  <option>Fintech</option>
                  <option>SaaS</option>
                  <option>Santé</option>
                  <option>Éducation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de Service</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg pr-8">
                  <option>Tous les services</option>
                  <option>API Gateway</option>
                  <option>Payment Processing</option>
                  <option>Analytics</option>
                  <option>CRM</option>
                  <option>Notifications</option>
                </select>
              </div>
              <Button className="w-full">
                Appliquer les Filtres
              </Button>
            </div>
          </Card>

          {/* Formats d'exportation */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Formats d'Exportation</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <i className="ri-file-pdf-line mr-2 text-red-600"></i>
                Exporter en PDF
                <span className="ml-auto text-xs text-gray-500">Recommandé</span>
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <i className="ri-file-excel-line mr-2 text-green-600"></i>
                Exporter en Excel
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <i className="ri-slideshow-line mr-2 text-orange-600"></i>
                Exporter en PowerPoint
              </Button>
            </div>
          </Card>

          {/* Statistiques avancées */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques Avancées</h3>
            <div className="space-y-4">
              {[
                { metric: 'Rapports créés', value: '47', period: 'ce trimestre' },
                { metric: 'Téléchargements totaux', value: '156', period: 'ce mois' },
                { metric: 'Temps économisé', value: '156h', period: 'vs manuel' },
                { metric: 'Satisfaction utilisateurs', value: '94%', period: 'moyenne' }
              ].map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.metric}</p>
                    <p className="text-xs text-gray-500">{stat.period}</p>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation par onglets */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
                {tab.count && (
                  <Badge variant="secondary" className="ml-2">
                    {tab.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'integration' && renderIntegrationSection()}
        {activeTab === 'data' && renderDataSection()}
        {activeTab === 'promotion' && renderPromotionSection()}
        {activeTab === 'reports' && renderReportsSection()}
      </div>

      {/* Modals */}
      {showIntegrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Intégrer un Nouveau Service</h3>
              <button onClick={() => setShowIntegrationModal(false)}>
                <i className="ri-close-line text-gray-400 hover:text-gray-600"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Service</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Mon Service API..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type d'Intégration</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg pr-8">
                  <option>REST API</option>
                  <option>Webhook</option>
                  <option>SDK</option>
                  <option>GraphQL</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL de l'API</label>
                <input type="url" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="https://api.monservice.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="w-full p-2 border border-gray-300 rounded-lg h-20" placeholder="Description du service..."></textarea>
              </div>
              <div className="flex space-x-3">
                <Button onClick={() => setShowIntegrationModal(false)} variant="outline" className="flex-1">
                  Annuler
                </Button>
                <LoadingButton 
                  onClick={() => handleAction('integration')}
                  isLoading={isLoading}
                  className="flex-1"
                >
                  Intégrer
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCampaignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Créer une Campagne Promotionnelle</h3>
              <button onClick={() => setShowCampaignModal(false)}>
                <i className="ri-close-line text-gray-400 hover:text-gray-600"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la Campagne</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Promotion Printemps 2025..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type de Service</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg pr-8">
                  <option>API Gateway</option>
                  <option>Payment Processing</option>
                  <option>Analytics Suite</option>
                  <option>CRM Integration</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget (€)</label>
                <input type="number" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="5000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ciblage</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg pr-8">
                  <option>E-commerce</option>
                  <option>Fintech</option>
                  <option>SaaS</option>
                  <option>Tous les secteurs</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Durée</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="30 jours" />
              </div>
              <div className="flex space-x-3">
                <Button onClick={() => setShowCampaignModal(false)} variant="outline" className="flex-1">
                  Annuler
                </Button>
                <LoadingButton 
                  onClick={() => handleAction('campaign')}
                  isLoading={isLoading}
                  className="flex-1"
                >
                  Créer
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Générer un Rapport Personnalisé</h3>
              <button onClick={() => setShowReportModal(false)}>
                <i className="ri-close-line text-gray-400 hover:text-gray-600"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type de Rapport</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg pr-8">
                  <option>Services Intégrés</option>
                  <option>Campagnes Marketing</option>
                  <option>Opportunités Marché</option>
                  <option>Feedback Utilisateurs</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Période</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg pr-8">
                  <option>Derniers 30 jours</option>
                  <option>Dernier trimestre</option>
                  <option>Dernière année</option>
                  <option>Personnalisé</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Secteur</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg pr-8">
                  <option>Tous les secteurs</option>
                  <option>E-commerce</option>
                  <option>Fintech</option>
                  <option>SaaS</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg pr-8">
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>PowerPoint</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <Button onClick={() => setShowReportModal(false)} variant="outline" className="flex-1">
                  Annuler
                </Button>
                <LoadingButton 
                  onClick={() => handleAction('report')}
                  isLoading={isLoading}
                  className="flex-1"
                >
                  Générer
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Envoyer le Rapport par Email</h3>
              <button onClick={() => setShowEmailModal(false)}>
                <i className="ri-close-line text-gray-400 hover:text-gray-600"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destinataires</label>
                <input type="email" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="email1@example.com, email2@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Objet</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" value={selectedReport ? `Rapport: ${selectedReport.name}` : ''} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (optionnel)</label>
                <textarea className="w-full p-2 border border-gray-300 rounded-lg h-20" placeholder="Message personnalisé..."></textarea>
              </div>
              <div className="flex space-x-3">
                <Button onClick={() => setShowEmailModal(false)} variant="outline" className="flex-1">
                  Annuler
                </Button>
                <LoadingButton 
                  onClick={() => handleAction('email')}
                  isLoading={isLoading}
                  className="flex-1"
                >
                  Envoyer
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnersDashboard;
