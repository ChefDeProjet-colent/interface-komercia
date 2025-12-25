import { useState, useEffect } from 'react';
import Card from '../../components/base/Card';
import Badge from '../../components/base/Badge';
import Button from '../../components/base/Button';
import Sidebar from '../../components/feature/Sidebar';

export default function CommissionsPage() {
  // Données des contrats avec commissions
  const [contrats] = useState([
    {
      id: '1',
      entreprise: {
        nom: 'TechCorp Solutions',
        logo: 'https://readdy.ai/api/search-image?query=modern%20technology%20company%20logo%20with%20blue%20and%20white%20colors%20professional%20corporate%20branding%20minimalist%20design&width=100&height=100&seq=techcorp001&orientation=squarish',
        estVerifie: true,
        secteur: 'Technologie'
      },
      reference: 'CTR-2024-001',
      titre: 'Commercial CRM Enterprise',
      type: 'Commission',
      dateDebut: '2024-01-01',
      remuneration: {
        type: 'Commission',
        tauxCommission: 8,
        devise: 'EUR'
      },
      statut: 'Actif'
    },
    {
      id: '2',
      entreprise: {
        nom: 'InnovateSAS',
        logo: 'https://readdy.ai/api/search-image?query=innovative%20startup%20company%20logo%20with%20orange%20and%20gray%20colors%20modern%20tech%20branding%20creative%20design&width=100&height=100&seq=innovate002&orientation=squarish',
        estVerifie: true,
        secteur: 'Innovation'
      },
      reference: 'CTR-2024-002',
      titre: 'Commercial Solutions Digitales',
      type: 'Fixe + Commission',
      dateDebut: '2024-01-15',
      remuneration: {
        type: 'Fixe + Commission',
        salaireFixe: 2500,
        tauxCommission: 10,
        devise: 'EUR'
      },
      statut: 'Actif'
    },
    {
      id: '3',
      entreprise: {
        nom: 'DataFlow Analytics',
        logo: 'https://readdy.ai/api/search-image?query=data%20analytics%20company%20logo%20with%20purple%20and%20blue%20gradient%20colors%20professional%20tech%20branding%20modern%20design&width=100&height=100&seq=dataflow003&orientation=squarish',
        estVerifie: true,
        secteur: 'Data & Analytics'
      },
      reference: 'CTR-2024-003',
      titre: 'Commercial Solutions BI',
      type: 'Commission',
      dateDebut: '2023-12-01',
      remuneration: {
        type: 'Commission',
        tauxCommission: 12,
        devise: 'EUR'
      },
      statut: 'Actif'
    },
    {
      id: '4',
      entreprise: {
        nom: 'GreenTech Energy',
        logo: 'https://readdy.ai/api/search-image?query=green%20energy%20company%20logo%20with%20green%20and%20white%20colors%20eco%20friendly%20sustainable%20branding%20clean%20design&width=100&height=100&seq=greentech004&orientation=squarish',
        estVerifie: false,
        secteur: 'Énergie'
      },
      reference: 'CTR-2023-045',
      titre: 'Commercial Énergies Renouvelables',
      type: 'Fixe + Commission',
      dateDebut: '2023-11-01',
      remuneration: {
        type: 'Fixe + Commission',
        salaireFixe: 3000,
        tauxCommission: 6,
        devise: 'EUR'
      },
      statut: 'Actif'
    }
  ]);

  // Ventes réalisées par contrat
  const [ventes] = useState([
    // TechCorp Solutions
    { id: '1', contratId: '1', entreprise: 'TechCorp Solutions', client: 'Société ABC', produit: 'CRM Enterprise - Licence Annuelle', montant: 75000, tauxCommission: 8, commission: 6000, dateVente: '2024-01-05', statut: 'paid', datePaiement: '2024-01-10' },
    { id: '2', contratId: '1', entreprise: 'TechCorp Solutions', client: 'Entreprise XYZ', produit: 'CRM Enterprise - Pack Premium', montant: 95000, tauxCommission: 8, commission: 7600, dateVente: '2024-01-18', statut: 'processing', datePaiement: null },
    { id: '3', contratId: '1', entreprise: 'TechCorp Solutions', client: 'Groupe Delta', produit: 'CRM Enterprise - Solution Complète', montant: 120000, tauxCommission: 8, commission: 9600, dateVente: '2024-01-25', statut: 'pending', datePaiement: null },
    
    // InnovateSAS
    { id: '4', contratId: '2', entreprise: 'InnovateSAS', client: 'StartUp Innovante', produit: 'Solution Digitale Pro', montant: 45000, tauxCommission: 10, commission: 4500, dateVente: '2024-01-08', statut: 'processing', datePaiement: null },
    { id: '5', contratId: '2', entreprise: 'InnovateSAS', client: 'Tech Solutions Ltd', produit: 'Pack Transformation Digitale', montant: 68000, tauxCommission: 10, commission: 6800, dateVente: '2024-01-22', statut: 'paid', datePaiement: '2024-01-28' },
    
    // DataFlow Analytics
    { id: '6', contratId: '3', entreprise: 'DataFlow Analytics', client: 'Retail Plus', produit: 'Solution BI Avancée', montant: 85000, tauxCommission: 12, commission: 10200, dateVente: '2024-01-12', statut: 'pending', datePaiement: null },
    { id: '7', contratId: '3', entreprise: 'DataFlow Analytics', client: 'Finance Corp', produit: 'Analytics Dashboard Pro', montant: 110000, tauxCommission: 12, commission: 13200, dateVente: '2024-01-20', statut: 'processing', datePaiement: null },
    { id: '8', contratId: '3', entreprise: 'DataFlow Analytics', client: 'MedCare Solutions', produit: 'BI Healthcare Suite', montant: 95000, tauxCommission: 12, commission: 11400, dateVente: '2024-01-15', statut: 'paid', datePaiement: '2024-01-22' },
    
    // GreenTech Energy
    { id: '9', contratId: '4', entreprise: 'GreenTech Energy', client: 'Ville de Lyon', produit: 'Installation Solaire 500kW', montant: 250000, tauxCommission: 6, commission: 15000, dateVente: '2023-12-28', statut: 'paid', datePaiement: '2024-01-03' },
    { id: '10', contratId: '4', entreprise: 'GreenTech Energy', client: 'Industrie Verte SA', produit: 'Parc Éolien 2MW', montant: 450000, tauxCommission: 6, commission: 27000, dateVente: '2024-01-10', statut: 'processing', datePaiement: null },
    { id: '11', contratId: '4', entreprise: 'GreenTech Energy', client: 'EcoBuilding Group', produit: 'Solution Énergétique Complète', montant: 180000, tauxCommission: 6, commission: 10800, dateVente: '2024-01-16', statut: 'pending', datePaiement: null }
  ]);

  const [selectedContrat, setSelectedContrat] = useState<string>('all');
  const [selectedStatut, setSelectedStatut] = useState<string>('all');
  const [showCalculator, setShowCalculator] = useState(false);
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

  const getFilteredVentes = () => {
    return ventes.filter(vente => {
      const contratMatch = selectedContrat === 'all' || vente.contratId === selectedContrat;
      const statutMatch = selectedStatut === 'all' || vente.statut === selectedStatut;
      return contratMatch && statutMatch;
    });
  };

  const getTotalCommissions = () => {
    return getFilteredVentes().reduce((total, vente) => total + vente.commission, 0);
  };

  const getPaidCommissions = () => {
    return getFilteredVentes()
      .filter(v => v.statut === 'paid')
      .reduce((total, vente) => total + vente.commission, 0);
  };

  const getPendingCommissions = () => {
    return getFilteredVentes()
      .filter(v => v.statut === 'pending' || v.statut === 'processing')
      .reduce((total, vente) => total + vente.commission, 0);
  };

  const getCommissionsByContrat = (contratId: string) => {
    return ventes
      .filter(v => v.contratId === contratId)
      .reduce((total, vente) => total + vente.commission, 0);
  };

  const getVentesByContrat = (contratId: string) => {
    return ventes.filter(v => v.contratId === contratId).length;
  };

  const calculateCommission = () => {
    const amount = parseFloat(calculatorAmount) || 0;
    const rate = parseFloat(calculatorRate) || 0;
    return (amount * rate) / 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Sidebar />
      
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header avec gradient */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">💰 Mes Commissions</h1>
                  <p className="text-emerald-100 text-lg">Suivez vos gains par contrat et par entreprise</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold">{getTotalCommissions().toLocaleString()}€</div>
                  <div className="text-emerald-100 mt-1">Total des commissions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Commissions payées</p>
                  <p className="text-3xl font-bold text-green-600">{getPaidCommissions().toLocaleString()}€</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {getFilteredVentes().filter(v => v.statut === 'paid').length} paiements
                  </p>
                </div>
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <i className="ri-money-dollar-circle-line text-3xl text-white"></i>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">En attente</p>
                  <p className="text-3xl font-bold text-orange-600">{getPendingCommissions().toLocaleString()}€</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {getFilteredVentes().filter(v => v.statut !== 'paid').length} en cours
                  </p>
                </div>
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <i className="ri-time-line text-3xl text-white"></i>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Contrats actifs</p>
                  <p className="text-3xl font-bold text-blue-600">{contrats.length}</p>
                  <p className="text-xs text-gray-500 mt-1">Entreprises partenaires</p>
                </div>
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <i className="ri-file-text-line text-3xl text-white"></i>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Ventes totales</p>
                  <p className="text-3xl font-bold text-purple-600">{getFilteredVentes().length}</p>
                  <p className="text-xs text-gray-500 mt-1">Ce mois-ci</p>
                </div>
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                  <i className="ri-shopping-cart-line text-3xl text-white"></i>
                </div>
              </div>
            </Card>
          </div>

          {/* Mes contrats avec commissions */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">📋 Mes Contrats</h2>
                <p className="text-sm text-gray-600 mt-1">Vos contrats actifs avec taux de commission</p>
              </div>
              <Button
                variant="primary"
                onClick={() => setShowCalculator(!showCalculator)}
              >
                <i className="ri-calculator-line mr-2"></i>
                Calculateur
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contrats.map((contrat) => (
                <div
                  key={contrat.id}
                  className="relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg cursor-pointer group"
                  onClick={() => setSelectedContrat(contrat.id)}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 flex items-center justify-center">
                          <img
                            src={contrat.entreprise.logo}
                            alt={contrat.entreprise.nom}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-gray-900">{contrat.entreprise.nom}</h3>
                            {contrat.entreprise.estVerifie && (
                              <i className="ri-verified-badge-fill text-blue-500 text-lg"></i>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{contrat.reference}</p>
                        </div>
                      </div>
                      <Badge variant="success">{contrat.statut}</Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-600">Taux de commission</p>
                          <p className="text-2xl font-bold text-emerald-600">
                            {contrat.remuneration.tauxCommission}%
                          </p>
                        </div>
                        {contrat.remuneration.type === 'Fixe + Commission' && (
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Salaire fixe</p>
                            <p className="text-lg font-bold text-gray-900">
                              {contrat.remuneration.salaireFixe?.toLocaleString()}€
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Ventes réalisées</p>
                          <p className="text-xl font-bold text-blue-600">{getVentesByContrat(contrat.id)}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">Commissions gagnées</p>
                          <p className="text-xl font-bold text-green-600">
                            {getCommissionsByContrat(contrat.id).toLocaleString()}€
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          <i className="ri-calendar-line mr-1"></i>
                          Actif depuis le {new Date(contrat.dateDebut).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Calculateur de commission */}
          {showCalculator && (
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  <i className="ri-calculator-line mr-2 text-blue-600"></i>
                  Calculateur de Commission
                </h3>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant de la vente (€)
                  </label>
                  <input
                    type="number"
                    value={calculatorAmount}
                    onChange={(e) => setCalculatorAmount(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    placeholder="Ex: 75000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taux de commission (%)
                  </label>
                  <input
                    type="number"
                    value={calculatorRate}
                    onChange={(e) => setCalculatorRate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    placeholder="Ex: 8"
                  />
                </div>

                <div className="flex items-end">
                  <div className="w-full p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-white">
                    <p className="text-sm mb-1">Commission calculée</p>
                    <p className="text-3xl font-bold">
                      {calculateCommission().toLocaleString()}€
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Filtres et liste des ventes */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filtres */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  <i className="ri-filter-3-line mr-2 text-gray-600"></i>
                  Filtres
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Par contrat
                    </label>
                    <select
                      value={selectedContrat}
                      onChange={(e) => setSelectedContrat(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">Tous les contrats</option>
                      {contrats.map((contrat) => (
                        <option key={contrat.id} value={contrat.id}>
                          {contrat.entreprise.nom}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Par statut
                    </label>
                    <select
                      value={selectedStatut}
                      onChange={(e) => setSelectedStatut(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="paid">Payées</option>
                      <option value="processing">En cours</option>
                      <option value="pending">En attente</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Résultats filtrés</p>
                      <p className="text-2xl font-bold text-emerald-600">
                        {getFilteredVentes().length}
                      </p>
                      <p className="text-xs text-gray-500">ventes</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedContrat('all');
                      setSelectedStatut('all');
                    }}
                  >
                    <i className="ri-refresh-line mr-2"></i>
                    Réinitialiser
                  </Button>
                </div>
              </Card>
            </div>

            {/* Liste des ventes */}
            <div className="lg:col-span-3">
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">💼 Historique des Ventes</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {getFilteredVentes().length} vente{getFilteredVentes().length > 1 ? 's' : ''} • {getTotalCommissions().toLocaleString()}€ de commissions
                    </p>
                  </div>
                  <Button variant="outline">
                    <i className="ri-download-line mr-2"></i>
                    Exporter
                  </Button>
                </div>

                <div className="space-y-4">
                  {getFilteredVentes().map((vente) => {
                    const contrat = contrats.find(c => c.id === vente.contratId);
                    return (
                      <div
                        key={vente.id}
                        className="relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-md"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full -mr-12 -mt-12 opacity-30"></div>
                        
                        <div className="relative p-5">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 flex items-center justify-center">
                                <img
                                  src={contrat?.entreprise.logo}
                                  alt={vente.entreprise}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-bold text-gray-900">{vente.client}</h4>
                                  {contrat?.entreprise.estVerifie && (
                                    <i className="ri-verified-badge-fill text-blue-500"></i>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">{vente.entreprise}</p>
                                <p className="text-xs text-gray-500 mt-1">{vente.produit}</p>
                              </div>
                            </div>
                            <Badge variant={getStatusVariant(vente.statut)}>
                              {getStatusLabel(vente.statut)}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <p className="text-xs text-gray-600 mb-1">Montant vente</p>
                              <p className="text-lg font-bold text-blue-600">
                                {vente.montant.toLocaleString()}€
                              </p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                              <p className="text-xs text-gray-600 mb-1">Taux</p>
                              <p className="text-lg font-bold text-purple-600">
                                {vente.tauxCommission}%
                              </p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
                              <p className="text-xs text-gray-600 mb-1">Commission</p>
                              <p className="text-lg font-bold text-emerald-600">
                                {vente.commission.toLocaleString()}€
                              </p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-600 mb-1">Date vente</p>
                              <p className="text-sm font-medium text-gray-900">
                                {new Date(vente.dateVente).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          </div>

                          {vente.datePaiement && (
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <i className="ri-check-double-line text-green-600 text-xl"></i>
                                <span className="text-sm font-medium text-green-700">
                                  Payée le {new Date(vente.datePaiement).toLocaleDateString('fr-FR')}
                                </span>
                              </div>
                              <span className="text-sm text-green-600 font-bold">
                                +{vente.commission.toLocaleString()}€
                              </span>
                            </div>
                          )}

                          {!vente.datePaiement && (
                            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <i className="ri-time-line text-orange-600 text-xl"></i>
                                <span className="text-sm font-medium text-orange-700">
                                  {vente.statut === 'processing' ? 'Paiement en cours de traitement' : 'En attente de validation'}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {getFilteredVentes().length === 0 && (
                  <div className="text-center py-12">
                    <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500">Aucune vente trouvée avec ces filtres</p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
