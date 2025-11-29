
import { useState, useEffect } from 'react';
import Card from '../../components/base/Card';
import Badge from '../../components/base/Badge';
import Button from '../../components/base/Button';
import AdBanner from '../../components/feature/AdBanner';
import { useAdManager } from '../../components/feature/AdManager';

export default function CommissionsPage() {
  const [commissions] = useState<Commission[]>([
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
      client: 'GreenTech Energy',
      product: 'CRM Starter',
      saleAmount: 25000,
      commissionRate: 6,
      commissionAmount: 1500,
      status: 'paid',
      saleDate: '2023-12-28',
      paymentDate: '2024-01-03'
    },
    {
      id: '5',
      client: 'MedCare Solutions',
      product: 'CRM Healthcare',
      saleAmount: 85000,
      commissionRate: 9,
      commissionAmount: 7650,
      status: 'processing',
      saleDate: '2024-01-15'
    },
    {
      id: '6',
      client: 'RetailPlus',
      product: 'CRM Retail',
      saleAmount: 35000,
      commissionRate: 7,
      commissionAmount: 2450,
      status: 'paid',
      saleDate: '2023-12-20',
      paymentDate: '2023-12-28'
    },
    {
      id: '7',
      client: 'LogiFlow',
      product: 'CRM Logistics',
      saleAmount: 95000,
      commissionRate: 11,
      commissionAmount: 10450,
      status: 'pending',
      saleDate: '2024-01-18'
    }
  ]);

  const [performanceData] = useState<PerformanceData[]>([
    { period: 'Semaine 1', sales: 3, leads: 15, conversionRate: 20, commissions: 8950 },
    { period: 'Semaine 2', sales: 5, leads: 22, conversionRate: 23, commissions: 12400 },
    { period: 'Semaine 3', sales: 4, leads: 18, conversionRate: 22, commissions: 9800 },
    { period: 'Semaine 4', sales: 6, leads: 25, conversionRate: 24, commissions: 15300 }
  ]);

  const [monthlyComparison] = useState<MonthlyData[]>([
    { month: 'Octobre', sales: 18, commissions: 42500, conversionRate: 22 },
    { month: 'Novembre', sales: 22, commissions: 51200, conversionRate: 25 },
    { month: 'Décembre', sales: 25, commissions: 58900, conversionRate: 28 },
    { month: 'Janvier', sales: 18, commissions: 46650, conversionRate: 23 }
  ]);

  const [quarterlyComparison] = useState<QuarterlyData[]>([
    { quarter: 'Q3 2023', sales: 65, commissions: 145000, conversionRate: 24 },
    { quarter: 'Q4 2023', sales: 72, commissions: 168500, conversionRate: 26 },
    { quarter: 'Q1 2024', sales: 63, commissions: 152300, conversionRate: 25 }
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedComparison, setSelectedComparison] = useState<'weekly' | 'monthly' | 'quarterly'>('weekly');
  const [showPerformanceChart, setShowPerformanceChart] = useState(true);
  const [showCommissionCalculator, setShowCommissionCalculator] = useState(false);
  const [calculatorAmount, setCalculatorAmount] = useState('');
  const [calculatorRate, setCalculatorRate] = useState('');

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

  const getConversionRate = () => {
    const totalLeads = performanceData.reduce((sum, data) => sum + data.leads, 0);
    const totalSales = performanceData.reduce((sum, data) => sum + data.sales, 0);
    return totalLeads > 0 ? Math.round((totalSales / totalLeads) * 100) : 0;
  };

  const calculateCommission = (saleAmount: number, rate: number) => {
    return (saleAmount * rate) / 100;
  };

  const getCommissionBaremes = () => {
    return [
      { range: '0 - 25 000€', rate: 5, description: 'Taux de base' },
      { range: '25 001 - 50 000€', rate: 7, description: 'Taux intermédiaire' },
      { range: '50 001 - 100 000€', rate: 10, description: 'Taux élevé' },
      { range: '100 001€ +', rate: 12, description: 'Taux premium' }
    ];
  };

  const calculateCommissionByBareme = (saleAmount: number) => {
    if (saleAmount <= 25000) return saleAmount * 0.05;
    if (saleAmount <= 50000) return 25000 * 0.05 + (saleAmount - 25000) * 0.07;
    if (saleAmount <= 100000) return 25000 * 0.05 + 25000 * 0.07 + (saleAmount - 50000) * 0.10;
    return 25000 * 0.05 + 25000 * 0.07 + 50000 * 0.10 + (saleAmount - 100000) * 0.12;
  };

  const getPerformanceEvolution = () => {
    const currentMonth = monthlyComparison[monthlyComparison.length - 1];
    const previousMonth = monthlyComparison[monthlyComparison.length - 2];
    
    return {
      salesGrowth: ((currentMonth.sales - previousMonth.sales) / previousMonth.sales * 100).toFixed(1),
      commissionsGrowth: ((currentMonth.commissions - previousMonth.commissions) / previousMonth.commissions * 100).toFixed(1),
      conversionGrowth: ((currentMonth.conversionRate - previousMonth.conversionRate) / previousMonth.conversionRate * 100).toFixed(1)
    };
  };

  const renderComparisonChart = () => {
    let data: any[] = [];
    let maxValue = 0;

    switch (selectedComparison) {
      case 'weekly':
        data = performanceData;
        maxValue = Math.max(...data.map(d => d.commissions));
        break;
      case 'monthly':
        data = monthlyComparison;
        maxValue = Math.max(...data.map(d => d.commissions));
        break;
      case 'quarterly':
        data = quarterlyComparison;
        maxValue = Math.max(...data.map(d => d.commissions));
        break;
    }

    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 w-20">
              {selectedComparison === 'weekly' ? item.period : 
               selectedComparison === 'monthly' ? item.month : item.quarter}
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

  const { trackAction } = useAdManager();

  useEffect(() => {
    trackAction('view-commissions');
  }, []);

  const handleManageCommission = () => {
    trackAction('manage-commissions');
  };

  const evolution = getPerformanceEvolution();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-64 p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Commissions et Performances</h1>
            <p className="text-gray-600 mt-1">Suivez vos gains et analysez vos performances commerciales</p>
          </div>

          {/* Statistiques des commissions */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{getTotalCommissions().toLocaleString()}€</p>
                <p className="text-sm text-gray-600">Total commissions</p>
                <div className="flex items-center justify-center mt-1">
                  <i className={`ri-arrow-${evolution.commissionsGrowth.startsWith('-') ? 'down' : 'up'}-line text-xs ${evolution.commissionsGrowth.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}></i>
                  <span className={`text-xs ${evolution.commissionsGrowth.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                    {evolution.commissionsGrowth}%
                  </span>
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
                <p className="text-2xl font-bold text-indigo-600">{getConversionRate()}%</p>
                <p className="text-sm text-gray-600">Taux conversion</p>
                <div className="flex items-center justify-center mt-1">
                  <i className={`ri-arrow-${evolution.conversionGrowth.startsWith('-') ? 'down' : 'up'}-line text-xs ${evolution.conversionGrowth.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}></i>
                  <span className={`text-xs ${evolution.conversionGrowth.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                    {evolution.conversionGrowth}%
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Barèmes de commission */}
          <Card className="mb-8">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Grille Tarifaire</h4>
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
              </div>

              {showCommissionCalculator && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Calculateur de Commission</h4>
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
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
                        <p className="text-sm text-gray-600 mb-2">Commission calculée automatiquement :</p>
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
            </div>
          </Card>

          {/* Graphiques de performance avec comparaisons */}
          <Card className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Évolution des Performances</h3>
              <div className="flex items-center space-x-2">
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
                  <button
                    onClick={() => setSelectedComparison('quarterly')}
                    className={`px-3 py-1 rounded text-sm whitespace-nowrap ${selectedComparison === 'quarterly' ? 'bg-white shadow-sm' : ''}`}
                  >
                    Trimestrielle
                  </button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPerformanceChart(!showPerformanceChart)}
                >
                  <i className={`ri-${showPerformanceChart ? 'eye-off' : 'eye'}-line mr-2`}></i>
                  {showPerformanceChart ? 'Masquer' : 'Afficher'}
                </Button>
              </div>
            </div>

            {showPerformanceChart && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Graphique principal des commissions */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <i className="ri-money-dollar-circle-line text-green-600 mr-2"></i>
                    Commissions par {selectedComparison === 'weekly' ? 'semaine' : selectedComparison === 'monthly' ? 'mois' : 'trimestre'}
                  </h4>
                  {renderComparisonChart()}
                </div>

                {/* Graphique des ventes */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <i className="ri-line-chart-line text-blue-600 mr-2"></i>
                    Évolution des Ventes
                  </h4>
                  <div className="space-y-3">
                    {(selectedComparison === 'weekly' ? performanceData : 
                      selectedComparison === 'monthly' ? monthlyComparison : quarterlyComparison).map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {selectedComparison === 'weekly' ? data.period : 
                           selectedComparison === 'monthly' ? data.month : data.quarter}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                              style={{ width: `${(data.sales / Math.max(...(selectedComparison === 'weekly' ? performanceData : selectedComparison === 'monthly' ? monthlyComparison : quarterlyComparison).map(d => d.sales))) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-8">{data.sales}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Graphique du taux de conversion */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <i className="ri-percent-line text-orange-600 mr-2"></i>
                    Taux de Conversion
                  </h4>
                  <div className="space-y-3">
                    {(selectedComparison === 'weekly' ? performanceData : 
                      selectedComparison === 'monthly' ? monthlyComparison : quarterlyComparison).map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {selectedComparison === 'weekly' ? data.period : 
                           selectedComparison === 'monthly' ? data.month : data.quarter}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full"
                              style={{ width: `${(data.conversionRate / 30) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-8">{data.conversionRate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Graphique des leads contactés */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <i className="ri-contacts-line text-purple-600 mr-2"></i>
                    Leads Contactés
                  </h4>
                  <div className="space-y-3">
                    {(selectedComparison === 'weekly' ? performanceData : []).map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{data.period}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full"
                              style={{ width: `${(data.leads / 25) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-8">{data.leads}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Bannière publicitaire sous les graphiques de performance */}
          <div className="mb-8">
            <AdBanner
              type="header"
              title="Solutions de Paiement Avancées"
              description="Optimisez vos processus de paiement et accélérez vos encaissements avec nos outils financiers intelligents"
              buttonText="Découvrir les solutions"
              gradient="from-green-600 to-teal-600"
              icon="ri-money-dollar-circle-line"
            />
          </div>

          {/* Filtres et liste des commissions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Filtres */}
            <div className="lg:col-span-1">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtres et Outils</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Période d'analyse</label>
                    <div className="relative">
                      <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                      >
                        <option value="current-month">Mois en cours</option>
                        <option value="last-month">Mois dernier</option>
                        <option value="current-quarter">Trimestre en cours</option>
                        <option value="last-quarter">Trimestre dernier</option>
                        <option value="current-year">Année en cours</option>
                        <option value="last-year">Année dernière</option>
                      </select>
                      <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Statut des commissions</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded" defaultChecked />
                        <span className="text-sm">Payées ({commissions.filter(c => c.status === 'paid').length})</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded" defaultChecked />
                        <span className="text-sm">En cours ({commissions.filter(c => c.status === 'processing').length})</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded" defaultChecked />
                        <span className="text-sm">En attente ({commissions.filter(c => c.status === 'pending').length})</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Objectifs du mois</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Ventes</span>
                          <span>18/25</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Commissions</span>
                          <span>46 650€/60 000€</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
                  <Button variant="outline" className="w-full">
                    <i className="ri-download-line mr-2"></i>
                    Exporter les données
                  </Button>
                  <Button variant="outline" className="w-full">
                    <i className="ri-file-pdf-line mr-2"></i>
                    Rapport PDF
                  </Button>
                </div>
              </Card>
            </div>

            {/* Liste des commissions */}
            <div className="lg:col-span-2">
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Historique des Commissions</h3>
                  <Button variant="primary" size="sm" onClick={handleManageCommission}>
                    <i className="ri-add-line mr-2"></i>
                    Nouvelle vente
                  </Button>
                </div>

                <div className="space-y-4">
                  {commissions.map((commission) => (
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

                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Commission calculée selon barème automatique
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-700 text-sm">
                            <i className="ri-eye-line mr-1"></i>Détails
                          </button>
                          <button className="text-gray-600 hover:text-gray-700 text-sm">
                            <i className="ri-edit-line mr-1"></i>Modifier
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                  <Button variant="outline">
                    <i className="ri-refresh-line mr-2"></i>
                    Charger plus de commissions
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Bannière publicitaire pour outils d'analyse */}
          <div className="mt-8">
            <AdBanner
              type="footer"
              title="Outils d'Analyse de Performance Avancés"
              description="Analysez vos données de vente en profondeur avec nos tableaux de bord intelligents et rapports personnalisés"
              buttonText="Essayer gratuitement"
              gradient="from-indigo-600 to-blue-600"
              icon="ri-bar-chart-box-line"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Types
interface Commission {
  id: string;
  client: string;
  product: string;
  saleAmount: number;
  commissionRate: number;
  commissionAmount: number;
  status: 'pending' | 'paid' | 'processing';
  saleDate: string;
  paymentDate?: string;
}

interface PerformanceData {
  period: string;
  sales: number;
  leads: number;
  conversionRate: number;
  commissions: number;
}

interface MonthlyData {
  month: string;
  sales: number;
  commissions: number;
  conversionRate: number;
}

interface QuarterlyData {
  quarter: string;
  sales: number;
  commissions: number;
  conversionRate: number;
}
