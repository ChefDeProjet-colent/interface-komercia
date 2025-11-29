import { useState, useEffect } from 'react';
import LoadingButton from '../../../components/base/LoadingButton';

export default function UserDataAccess() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [filterRisk, setFilterRisk] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [users] = useState([
    {
      id: 1,
      name: 'Marie Dubois',
      company: 'TechCorp Solutions',
      type: 'Commercial',
      sector: 'Technology',
      revenue: 125000,
      conversionRate: 8.5,
      riskScore: 85,
      riskLevel: 'Faible',
      lastActivity: '2024-01-15',
      paymentHistory: 'Excellent',
      employees: 250
    },
    {
      id: 2,
      name: 'Pierre Martin',
      company: 'InnovateSAS',
      type: 'Entreprise',
      sector: 'Innovation',
      revenue: 89000,
      conversionRate: 12.3,
      riskScore: 72,
      riskLevel: 'Moyen',
      lastActivity: '2024-01-14',
      paymentHistory: 'Bon',
      employees: 120
    },
    {
      id: 3,
      name: 'Sophie Chen',
      company: 'StartupXYZ',
      type: 'Startup',
      sector: 'Tech',
      revenue: 45000,
      conversionRate: 15.8,
      riskScore: 45,
      riskLevel: 'Élevé',
      lastActivity: '2024-01-16',
      paymentHistory: 'Moyen',
      employees: 45
    },
    {
      id: 4,
      name: 'Thomas Leroy',
      company: 'GlobalTrade Ltd',
      type: 'Entreprise',
      sector: 'Commerce',
      revenue: 210000,
      conversionRate: 6.2,
      riskScore: 92,
      riskLevel: 'Faible',
      lastActivity: '2024-01-13',
      paymentHistory: 'Excellent',
      employees: 380
    }
  ]);

  const setLoading = (key: string, value: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = async (format: string) => {
    setLoading(`export-${format}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const filteredUsers = getFilteredUsers();
      let content = '';
      let filename = '';
      let mimeType = '';

      switch (format) {
        case 'pdf':
          content = `Rapport d'analyse des utilisateurs\n\n${filteredUsers.map(user => 
            `${user.name} - ${user.company}\nRevenu: €${user.revenue.toLocaleString()}\nScore de risque: ${user.riskScore}/100\n\n`
          ).join('')}`;
          filename = 'donnees-utilisateurs.pdf';
          mimeType = 'application/pdf';
          break;
        case 'excel':
          content = JSON.stringify(filteredUsers, null, 2);
          filename = 'donnees-utilisateurs.xlsx';
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          break;
        case 'csv':
          const headers = 'Nom,Entreprise,Type,Secteur,Revenu,Taux Conversion,Score Risque,Niveau Risque\n';
          content = headers + filteredUsers.map(user => 
            `${user.name},${user.company},${user.type},${user.sector},${user.revenue},${user.conversionRate}%,${user.riskScore},${user.riskLevel}`
          ).join('\n');
          filename = 'donnees-utilisateurs.csv';
          mimeType = 'text/csv';
          break;
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
    } finally {
      setLoading(`export-${format}`, false);
    }
  };

  const handleViewDetails = async (user: any) => {
    setLoading(`details-${user.id}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSelectedUser(user);
    } catch (error) {
      console.error('Erreur lors de l\'affichage:', error);
    } finally {
      setLoading(`details-${user.id}`, false);
    }
  };

  const handleAnalyzeRisk = async (userId: number) => {
    setLoading(`analyze-${userId}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`Analyse de risque lancée pour l'utilisateur ${userId}`);
    } catch (error) {
      console.error('Erreur lors de l\'analyse:', error);
    } finally {
      setLoading(`analyze-${userId}`, false);
    }
  };

  const handleContactUser = async (user: any) => {
    setLoading(`contact-${user.id}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.REACT_APP_NAVIGATE('/financial-institutions?tab=collaboration');
    } catch (error) {
      console.error('Erreur lors du contact:', error);
    } finally {
      setLoading(`contact-${user.id}`, false);
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getFilteredUsers = () => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRisk = filterRisk === 'all' || user.riskLevel === filterRisk;
      const matchesType = filterType === 'all' || user.type === filterType;
      
      return matchesSearch && matchesRisk && matchesType;
    });
  };

  const filteredUsers = getFilteredUsers();

  return (
    <div className="space-y-6">
      {/* En-tête avec filtres et actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Accès aux Données Utilisateurs</h2>
            <p className="text-gray-600">Analyse des performances et évaluation des risques</p>
          </div>
          <div className="flex items-center space-x-3">
            <LoadingButton
              onClick={() => handleExportData('pdf')}
              loading={loadingStates['export-pdf']}
              loadingText="Export PDF..."
              variant="outline"
              icon="ri-file-pdf-line"
              className="text-sm"
            >
              Export PDF
            </LoadingButton>
            <LoadingButton
              onClick={() => handleExportData('excel')}
              loading={loadingStates['export-excel']}
              loadingText="Export Excel..."
              variant="outline"
              icon="ri-file-excel-line"
              className="text-sm"
            >
              Export Excel
            </LoadingButton>
            <LoadingButton
              onClick={() => handleExportData('csv')}
              loading={loadingStates['export-csv']}
              loadingText="Export CSV..."
              variant="outline"
              icon="ri-file-text-line"
              className="text-sm"
            >
              Export CSV
            </LoadingButton>
          </div>
        </div>

        {/* Filtres */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nom ou entreprise..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Niveau de risque</label>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
            >
              <option value="all">Tous les niveaux</option>
              <option value="Faible">Risque faible</option>
              <option value="Moyen">Risque moyen</option>
              <option value="Élevé">Risque élevé</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type d'utilisateur</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
            >
              <option value="all">Tous les types</option>
              <option value="Commercial">Commercial</option>
              <option value="Entreprise">Entreprise</option>
              <option value="Startup">Startup</option>
            </select>
          </div>
          <div className="flex items-end">
            <LoadingButton
              onClick={() => {
                setSearchTerm('');
                setFilterRisk('all');
                setFilterType('all');
              }}
              variant="ghost"
              icon="ri-refresh-line"
              className="text-sm w-full"
            >
              Réinitialiser
            </LoadingButton>
          </div>
        </div>

        {/* Résultats */}
        <div className="text-sm text-gray-600 mb-4">
          {filteredUsers.length} utilisateur(s) trouvé(s) sur {users.length} total
        </div>
      </div>

      {/* Liste des utilisateurs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(user.riskLevel)}`}>
                    Risque {user.riskLevel}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{user.company}</p>
                <p className="text-xs text-gray-500">{user.type} • {user.sector} • {user.employees} employés</p>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getScoreColor(user.riskScore)}`}>
                  {user.riskScore}/100
                </div>
                <p className="text-xs text-gray-500">Score de risque</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">Revenus annuels</p>
                <p className="font-semibold text-green-600">€{user.revenue.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600">Taux de conversion</p>
                <p className="font-semibold text-blue-600">{user.conversionRate}%</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>Historique: {user.paymentHistory}</span>
              <span>Dernière activité: {new Date(user.lastActivity).toLocaleDateString('fr-FR')}</span>
            </div>

            <div className="flex items-center space-x-2">
              <LoadingButton
                onClick={() => handleViewDetails(user)}
                loading={loadingStates[`details-${user.id}`]}
                loadingText="Chargement..."
                variant="outline"
                size="sm"
                icon="ri-eye-line"
                className="text-xs flex-1"
              >
                Voir Détails
              </LoadingButton>
              <LoadingButton
                onClick={() => handleAnalyzeRisk(user.id)}
                loading={loadingStates[`analyze-${user.id}`]}
                loadingText="Analyse..."
                variant="primary"
                size="sm"
                icon="ri-line-chart-line"
                className="text-xs flex-1"
              >
                Analyser Risque
              </LoadingButton>
              <LoadingButton
                onClick={() => handleContactUser(user)}
                loading={loadingStates[`contact-${user.id}`]}
                loadingText="Contact..."
                variant="success"
                size="sm"
                icon="ri-message-line"
                className="text-xs flex-1"
              >
                Contacter
              </LoadingButton>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de détails */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Détails de {selectedUser.name}</h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Informations Générales</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Entreprise:</span>
                        <span className="font-medium">{selectedUser.company}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{selectedUser.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Secteur:</span>
                        <span className="font-medium">{selectedUser.sector}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Employés:</span>
                        <span className="font-medium">{selectedUser.employees}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Performances Financières</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Revenus annuels:</span>
                        <span className="font-medium text-green-600">€{selectedUser.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taux de conversion:</span>
                        <span className="font-medium text-blue-600">{selectedUser.conversionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Score de risque:</span>
                        <span className={`font-medium ${getScoreColor(selectedUser.riskScore)}`}>
                          {selectedUser.riskScore}/100
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Historique paiements:</span>
                        <span className="font-medium">{selectedUser.paymentHistory}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Actions Disponibles</h4>
                  <div className="flex items-center space-x-3">
                    <LoadingButton
                      onClick={() => handleAnalyzeRisk(selectedUser.id)}
                      loading={loadingStates[`analyze-${selectedUser.id}`]}
                      loadingText="Analyse en cours..."
                      variant="primary"
                      icon="ri-line-chart-line"
                      className="text-sm"
                    >
                      Lancer Analyse Complète
                    </LoadingButton>
                    <LoadingButton
                      onClick={() => handleContactUser(selectedUser)}
                      loading={loadingStates[`contact-${selectedUser.id}`]}
                      loadingText="Redirection..."
                      variant="success"
                      icon="ri-message-line"
                      className="text-sm"
                    >
                      Initier Contact
                    </LoadingButton>
                    <LoadingButton
                      onClick={() => handleExportData('pdf')}
                      loading={loadingStates['export-pdf']}
                      loadingText="Export..."
                      variant="outline"
                      icon="ri-download-line"
                      className="text-sm"
                    >
                      Exporter Profil
                    </LoadingButton>
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

export { UserDataAccess };
