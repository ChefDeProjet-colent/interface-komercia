
import { useEffect, useState } from 'react';
import StatsCard from './components/StatsCard';
import NotificationPanel from './components/NotificationPanel';
import QuickActions from './components/QuickActions';
import AdBanner from '../../components/feature/AdBanner';
import { useAdManager } from '../../components/feature/AdManager';
import Card from '../../components/base/Card';
import Badge from '../../components/base/Badge';
import Button from '../../components/base/Button';

interface DashboardProps {
  onSectionChange: (section: string) => void;
}

export default function DashboardPage({ onSectionChange }: DashboardProps) {
  const { trackAction } = useAdManager();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications] = useState([
    {
      id: '1',
      type: 'new-lead',
      title: 'Nouveau lead disponible',
      message: 'TechCorp Solutions recherche une solution CRM - Budget: 75,000€',
      time: 'Il y a 5 minutes',
      priority: 'high'
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Relance programmée',
      message: 'Rappeler Marie Dubois (InnovateSAS) pour la proposition',
      time: 'Dans 30 minutes',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'commission',
      title: 'Commission disponible',
      message: 'Votre commission de 6,750€ est prête au paiement',
      time: 'Il y a 2 heures',
      priority: 'low'
    }
  ]);

  // Données des commissions
  const [commissions] = useState([
    {
      id: '1',
      client: 'TechCorp Solutions',
      product: 'CRM Enterprise',
      saleAmount: 75000,
      commissionRate: 8,
      commissionAmount: 6000,
      status: 'paid',
      saleDate: '2024-01-05',
      paymentDate: '2024-01-10'
    },
    {
      id: '2',
      client: 'InnovateSAS',
      product: 'CRM Professional',
      saleAmount: 45000,
      commissionRate: 10,
      commissionAmount: 4500,
      status: 'processing',
      saleDate: '2024-01-08'
    },
    {
      id: '3',
      client: 'DataFlow Analytics',
      product: 'CRM Custom',
      saleAmount: 120000,
      commissionRate: 12,
      commissionAmount: 14400,
      status: 'pending',
      saleDate: '2024-01-12'
    },
    {
      id: '4',
      client: 'MedCare Solutions',
      product: 'CRM Healthcare',
      saleAmount: 85000,
      commissionRate: 9,
      commissionAmount: 7650,
      status: 'processing',
      saleDate: '2024-01-15'
    }
  ]);

  const [performanceData] = useState([
    { period: 'Semaine 1', sales: 3, leads: 15, conversionRate: 20, commissions: 8950 },
    { period: 'Semaine 2', sales: 5, leads: 22, conversionRate: 23, commissions: 12400 },
    { period: 'Semaine 3', sales: 4, leads: 18, conversionRate: 22, commissions: 9800 },
    { period: 'Semaine 4', sales: 6, leads: 25, conversionRate: 24, commissions: 15300 }
  ]);

  const [monthlyComparison] = useState([
    { month: 'Octobre', sales: 18, commissions: 42500, conversionRate: 22 },
    { month: 'Novembre', sales: 22, commissions: 51200, conversionRate: 25 },
    { month: 'Décembre', sales: 25, commissions: 58900, conversionRate: 28 },
    { month: 'Janvier', sales: 18, commissions: 46650, conversionRate: 23 }
  ]);

  const [selectedComparison, setSelectedComparison] = useState<'weekly' | 'monthly'>('weekly');
  const [showCommissionCalculator, setShowCommissionCalculator] = useState(false);
  const [calculatorAmount, setCalculatorAmount] = useState('');

  useEffect(() => {
    trackAction('view-dashboard');
  }, []);

  const getTotalCommissions = () => {
    return commissions.reduce((total, commission) => total + commission.commissionAmount, 0);
  };

  const getPaidCommissions = () => {
    return commissions
      .filter(c => c.status === 'paid')
      .reduce((total, commission) => total + commission.commissionAmount, 0);
  };

  const getPendingCommissions = () => {
    return commissions
      .filter(c => c.status === 'pending' || c.status === 'processing')
      .reduce((total, commission) => total + commission.commissionAmount, 0);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'processing': return 'warning';
      case 'pending': return 'info';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Payée';
      case 'processing': return 'En cours';
      case 'pending': return 'En attente';
      default: return status;
    }
  };

  const calculateCommissionByBareme = (saleAmount: number) => {
    if (saleAmount <= 25000) return saleAmount * 0.05;
    if (saleAmount <= 50000) return 25000 * 0.05 + (saleAmount - 25000) * 0.07;
    if (saleAmount <= 100000) return 25000 * 0.05 + 25000 * 0.07 + (saleAmount - 50000) * 0.10;
    return 25000 * 0.05 + 25000 * 0.07 + 50000 * 0.10 + (saleAmount - 100000) * 0.12;
  };

  const getCommissionBaremes = () => {
    return [
      { range: '0 - 25 000€', rate: 5, description: 'Taux de base' },
      { range: '25 001 - 50 000€', rate: 7, description: 'Taux intermédiaire' },
      { range: '50 001 - 100 000€', rate: 10, description: 'Taux élevé' },
      { range: '100 001€ +', rate: 12, description: 'Taux premium' }
    ];
  };

  const renderComparisonChart = () => {
    const data = selectedComparison === 'weekly' ? performanceData : monthlyComparison;
    const maxValue = Math.max(...data.map(d => d.commissions));

    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 w-20">
              {selectedComparison === 'weekly' ? item.period : item.month}
            </span>
            <div className="flex-1 mx-4">
              <div className="flex items-center space-x-2">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(item.commissions / maxValue) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-20 text-right">
                  {item.commissions.toLocaleString()}€
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{item.sales} ventes</span>
                <span>{item.conversionRate}% conversion</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Chiffre d'Affaires Généré"
          value="127,500€"
          change="+18% ce mois"
          changeType="positive"
          icon="ri-money-euro-circle-line"
          color="bg-green-600"
        />
        <StatsCard
          title="Leads Contactés"
          value="89"
          change="+12 cette semaine"
          changeType="positive"
          icon="ri-user-star-line"
          color="bg-blue-600"
        />
        <StatsCard
          title="Leads Convertis"
          value="23"
          change="+5 ce mois"
          changeType="positive"
          icon="ri-trophy-line"
          color="bg-purple-600"
        />
        <StatsCard
          title="Taux de Conversion Global"
          value="25.8%"
          change="+3.2% vs mois dernier"
          changeType="positive"
          icon="ri-line-chart-line"
          color="bg-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications et alertes */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                {notifications.filter(n => n.priority === 'high').length} urgent
              </span>
            </div>
            
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.priority === 'high' ? 'bg-red-500' :
                      notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                      <p className="text-gray-600 text-xs mt-1">{notification.message}</p>
                      <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rappels pour relances */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rappels Importants</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <i className="ri-alarm-warning-line text-orange-600 mr-3"></i>
                <div>
                  <p className="text-sm font-medium text-orange-800">Relance DataFlow Analytics</p>
                  <p className="text-xs text-orange-600">Négociation prix - Échéance: Aujourd'hui</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <i className="ri-calendar-line text-blue-600 mr-3"></i>
                <div>
                  <p className="text-sm font-medium text-blue-800">RDV MedCare Solutions</p>
                  <p className="text-xs text-blue-600">Signature contrat - Demain 14h00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accès rapide aux sections clés */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Accès Rapide</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => onSectionChange('leads')}
                className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200">
                    <i className="ri-user-star-line text-blue-600 text-xl"></i>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Leads Qualifiés</h4>
                    <p className="text-sm text-gray-600">15 nouveaux leads disponibles</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => onSectionChange('pipeline')}
                className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200">
                    <i className="ri-flow-chart text-purple-600 text-xl"></i>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Pipeline</h4>
                    <p className="text-sm text-gray-600">8 opportunités en cours</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('commissions')}
                className="p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200">
                    <i className="ri-wallet-line text-green-600 text-xl"></i>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Commissions</h4>
                    <p className="text-sm text-gray-600">6,750€ à recevoir</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => onSectionChange('analytics')}
                className="p-4 border-2 border-orange-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200">
                    <i className="ri-bar-chart-line text-orange-600 text-xl"></i>
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Rapports</h4>
                    <p className="text-sm text-gray-600">Analyser les performances</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Activité récente */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Activité Récente</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Vente conclue - MedCare Solutions</p>
                    <p className="text-xs text-gray-600">85,000€ - Commission: 7,650€</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="ri-phone-line text-blue-600 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Contact établi - TechCorp Solutions</p>
                    <p className="text-xs text-gray-600">Présentation produit programmée</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <i className="ri-file-text-line text-purple-600 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Proposition envoyée - InnovateSAS</p>
                    <p className="text-xs text-gray-600">Devis 120,000€ en attente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommissionsTab = () => (
    <div className="space-y-6">
      {/* Statistiques des commissions */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{getTotalCommissions().toLocaleString()}€</p>
            <p className="text-sm text-gray-600">Total commissions</p>
            <div className="flex items-center justify-center mt-1">
              <i className="ri-arrow-up-line text-xs text-green-500"></i>
              <span className="text-xs text-green-500">+12.5%</span>
            </div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{getPaidCommissions().toLocaleString()}€</p>
            <p className="text-sm text-gray-600">Commissions payées</p>
            <p className="text-xs text-gray-500 mt-1">
              {commissions.filter(c => c.status === 'paid').length} paiements
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{getPendingCommissions().toLocaleString()}€</p>
            <p className="text-sm text-gray-600">En attente</p>
            <p className="text-xs text-gray-500 mt-1">
              {commissions.filter(c => c.status !== 'paid').length} en cours
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(commissions.reduce((sum, c) => sum + c.commissionRate, 0) / commissions.length)}%
            </p>
            <p className="text-sm text-gray-600">Taux moyen</p>
            <div className="flex items-center justify-center mt-1">
              <i className="ri-trending-up-line text-xs text-green-500"></i>
              <span className="text-xs text-green-500">+2.1%</span>
            </div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">23%</p>
            <p className="text-sm text-gray-600">Taux conversion</p>
            <div className="flex items-center justify-center mt-1">
              <i className="ri-arrow-up-line text-xs text-green-500"></i>
              <span className="text-xs text-green-500">+1.8%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Barèmes et calculateur */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Barèmes de Commission</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCommissionCalculator(!showCommissionCalculator)}
            >
              <i className="ri-calculator-line mr-2"></i>
              Calculateur
            </Button>
          </div>

          <div className="space-y-3">
            {getCommissionBaremes().map((bareme, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{bareme.range}</p>
                  <p className="text-sm text-gray-600">{bareme.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{bareme.rate}%</p>
                </div>
              </div>
            ))}
          </div>

          {showCommissionCalculator && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Calculateur de Commission</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Montant de la vente (€)
                  </label>
                  <input
                    type="number"
                    value={calculatorAmount}
                    onChange={(e) => setCalculatorAmount(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: 75000"
                  />
                </div>
                
                {calculatorAmount && (
                  <div className="p-3 bg-white rounded-lg border">
                    <p className="text-sm text-gray-600 mb-2">Commission calculée :</p>
                    <p className="text-2xl font-bold text-green-600">
                      {calculateCommissionByBareme(parseFloat(calculatorAmount) || 0).toLocaleString()}€
                    </p>
                    <p className="text-sm text-gray-500">
                      Taux effectif : {((calculateCommissionByBareme(parseFloat(calculatorAmount) || 0) / (parseFloat(calculatorAmount) || 1)) * 100).toFixed(2)}%
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>

        {/* Graphique des performances */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Évolution des Commissions</h3>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedComparison('weekly')}
                className={`px-3 py-1 rounded text-sm whitespace-nowrap ${selectedComparison === 'weekly' ? 'bg-white shadow-sm' : ''}`}
              >
                Hebdomadaire
              </button>
              <button
                onClick={() => setSelectedComparison('monthly')}
                className={`px-3 py-1 rounded text-sm whitespace-nowrap ${selectedComparison === 'monthly' ? 'bg-white shadow-sm' : ''}`}
              >
                Mensuelle
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
            {renderComparisonChart()}
          </div>
        </Card>
      </div>

      {/* Liste des commissions récentes */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Commissions Récentes</h3>
          <Button variant="primary" size="sm">
            <i className="ri-add-line mr-2"></i>
            Nouvelle vente
          </Button>
        </div>

        <div className="space-y-4">
          {commissions.slice(0, 4).map((commission) => (
            <div
              key={commission.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{commission.client}</h4>
                  <p className="text-sm text-gray-600">{commission.product}</p>
                </div>
                <Badge variant={getStatusVariant(commission.status)}>
                  {getStatusLabel(commission.status)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Montant vente</p>
                  <p className="font-medium">{commission.saleAmount.toLocaleString()}€</p>
                </div>
                <div>
                  <p className="text-gray-600">Taux commission</p>
                  <p className="font-medium">{commission.commissionRate}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Commission</p>
                  <p className="font-medium text-green-600">{commission.commissionAmount.toLocaleString()}€</p>
                </div>
                <div>
                  <p className="text-gray-600">Date vente</p>
                  <p className="font-medium">{new Date(commission.saleDate).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>

              {commission.paymentDate && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    <i className="ri-check-line text-green-600 mr-1"></i>
                    Payée le {new Date(commission.paymentDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => onSectionChange('commissions')}>
            Voir toutes les commissions
          </Button>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-64 p-8">
        <div className="space-y-6">
          {/* Bannière publicitaire principale en haut */}
          <AdBanner 
            type="header"
            title="Formation CRM Avancée - Offre Spéciale"
            description="Augmentez vos ventes de 40% avec nos techniques de prospection avancées. Formation certifiante en ligne."
            buttonText="Découvrir l'offre"
            gradient="from-blue-600 to-purple-600"
            icon="ri-graduation-cap-line"
            className="mb-6"
          />
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord Commercial</h1>
            <p className="text-gray-600 mt-1">Bienvenue, Marc Dubois - Aperçu de vos performances commerciales</p>
          </div>

          {/* Navigation par onglets */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <i className="ri-dashboard-line mr-2"></i>
                  Vue d'Ensemble
                </button>
                <button
                  onClick={() => setActiveTab('commissions')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'commissions'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <i className="ri-wallet-line mr-2"></i>
                  Commissions & Performances
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && renderOverviewTab()}
              {activeTab === 'commissions' && renderCommissionsTab()}
            </div>
          </div>

          {/* Bannière publicitaire en bas */}
          {activeTab === 'commissions' && (
            <AdBanner
              type="footer"
              title="Solutions de Paiement Avancées"
              description="Optimisez vos processus de paiement et accélérez vos encaissements avec nos outils financiers intelligents"
              buttonText="Découvrir les solutions"
              gradient="from-green-600 to-teal-600"
              icon="ri-money-dollar-circle-line"
            />
          )}

          {activeTab === 'overview' && (
            <AdBanner
              type="footer"
              title="Base de Données Premium - Prospects Qualifiés"
              description="Accédez à 50,000+ entreprises qualifiées dans votre secteur. Augmentez votre prospection de 300%."
              buttonText="Essayer 7 jours gratuits"
              gradient="from-green-600 to-blue-600"
              icon="ri-database-line"
            />
          )}
        </div>
      </div>
    </div>
  );
}
