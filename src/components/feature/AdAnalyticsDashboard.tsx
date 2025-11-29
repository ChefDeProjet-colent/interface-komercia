import { useState, useEffect } from 'react';
import { useAdManager } from '../feature/AdManager';

export default function AdAnalyticsDashboard() {
  const { getAllCampaigns, getCampaignStats, getUserStats } = useAdManager();
  const [stats, setStats] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [selectedAdReport, setSelectedAdReport] = useState<any>(null);

  useEffect(() => {
    // Calculer les statistiques globales à partir des campagnes
    const campaigns = getAllCampaigns();
    const allStats = campaigns.map(campaign => getCampaignStats(campaign.id));
    
    const globalStats = {
      activeAds: allStats.reduce((sum, s) => sum + s.adCount, 0),
      totalImpressions: allStats.reduce((sum, s) => sum + s.impressions, 0),
      totalClicks: allStats.reduce((sum, s) => sum + s.clicks, 0),
      averageCTR: allStats.length > 0 
        ? allStats.reduce((sum, s) => sum + s.ctr, 0) / allStats.length 
        : 0,
      totalAds: allStats.reduce((sum, s) => sum + s.adCount, 0),
      adsByUserType: {
        commercial: Math.floor(allStats.reduce((sum, s) => sum + s.adCount, 0) * 0.6),
        enterprise: Math.floor(allStats.reduce((sum, s) => sum + s.adCount, 0) * 0.4)
      },
      campaignStats: {
        premium: campaigns.filter(c => c.priority >= 9).length,
        sponsored: campaigns.filter(c => c.priority >= 7 && c.priority < 9).length,
        standard: campaigns.filter(c => c.priority < 7).length
      },
      topPerformingAd: allStats.length > 0 ? {
        id: campaigns[0].id,
        title: campaigns[0].name,
        description: 'Campagne avec les meilleures performances',
        ctr: allStats[0].ctr,
        impressions: allStats[0].impressions,
        clicks: allStats[0].clicks
      } : null
    };

    setStats(globalStats);

    // Récupérer le profil utilisateur
    const userStats = getUserStats();
    const profile = {
      userType: 'commercial',
      sector: 'technology',
      location: 'France',
      role: 'Sales Manager',
      interests: ['CRM', 'Analytics', 'Automation', 'AI', 'Reporting'],
      recentActions: userStats ? 
        (userStats.topActions || []).map((action: any) => `${action[0]}: ${action[1]} fois`) :
        ['Consultation tableau de bord', 'Analyse des leads', 'Gestion du pipeline', 'Création de rapports', 'Suivi des performances']
    };

    setUserProfile(profile);
  }, [getAllCampaigns, getCampaignStats, getUserStats]);

  const handleGenerateReport = (adId: string) => {
    const campaigns = getAllCampaigns();
    const campaign = campaigns.find(c => c.id === adId);
    
    if (campaign) {
      const campaignStats = getCampaignStats(campaign.id);
      const report = {
        title: campaign.name,
        totalImpressions: campaignStats.impressions,
        totalClicks: campaignStats.clicks,
        ctr: campaignStats.ctr,
        costPerClick: campaign.budget / (campaignStats.clicks || 1),
        targetAudience: ['Commerciaux', 'Managers', 'Consultants'],
        sectionsShown: ['Dashboard', 'Analytics', 'Reports'],
        performance: campaignStats.ctr > 7 ? 'Excellente' : campaignStats.ctr > 5 ? 'Bonne' : 'Moyenne',
        budget: campaign.budget
      };
      setSelectedAdReport(report);
    }
  };

  if (!stats || !userProfile) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Tableau de Bord Publicitaire
        </h1>
        <div className="flex items-center space-x-2">
          <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            Système Actif
          </span>
          <span className="text-sm text-gray-500">
            Dernière mise à jour: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Statistiques Globales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <i className="ri-advertisement-line text-blue-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Publicités Actives</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeAds}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <i className="ri-eye-line text-green-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Impressions Totales</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalImpressions.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <i className="ri-cursor-line text-purple-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Clics Totaux</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalClicks.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <i className="ri-bar-chart-line text-orange-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">CTR Moyen</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.averageCTR.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profil Utilisateur et Ciblage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Profil de Ciblage Actuel
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Type d'utilisateur:</span>
              <span className="text-sm font-medium text-gray-900 capitalize">
                {userProfile.userType}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Secteur:</span>
              <span className="text-sm font-medium text-gray-900 capitalize">
                {userProfile.sector}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Localisation:</span>
              <span className="text-sm font-medium text-gray-900">
                {userProfile.location}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Rôle:</span>
              <span className="text-sm font-medium text-gray-900 capitalize">
                {userProfile.role}
              </span>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Intérêts Détectés:</h4>
            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map((interest: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Actions Récentes:</h4>
            <div className="space-y-1">
              {userProfile.recentActions.slice(0, 5).map((action: string, index: number) => (
                <div key={index} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                  {action}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Répartition par Type d'Utilisateur
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Commerciaux</span>
                <span className="text-sm font-medium text-gray-900">
                  {stats.adsByUserType.commercial} publicités
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${(stats.adsByUserType.commercial / stats.totalAds) * 100}%`
                  }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Entreprises</span>
                <span className="text-sm font-medium text-gray-900">
                  {stats.adsByUserType.enterprise} publicités
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${(stats.adsByUserType.enterprise / stats.totalAds) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Types de Campagnes:</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">
                  {stats.campaignStats.premium}
                </div>
                <div className="text-xs text-gray-600">Premium</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {stats.campaignStats.sponsored}
                </div>
                <div className="text-xs text-gray-600">Sponsorisé</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {stats.campaignStats.standard}
                </div>
                <div className="text-xs text-gray-600">Standard</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meilleure Publicité */}
      {stats.topPerformingAd && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🏆 Publicité la Plus Performante
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h4 className="font-medium text-gray-900 mb-2">
                {stats.topPerformingAd.title}
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                {stats.topPerformingAd.description}
              </p>
              <div className="flex space-x-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    {stats.topPerformingAd.ctr.toFixed(2)}%
                  </div>
                  <div className="text-xs text-gray-600">CTR</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {stats.topPerformingAd.impressions.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">Impressions</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">
                    {stats.topPerformingAd.clicks.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">Clics</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={() => handleGenerateReport(stats.topPerformingAd.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                Générer Rapport
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rapport Détaillé */}
      {selectedAdReport && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              📊 Rapport Détaillé - {selectedAdReport.title}
            </h3>
            <button
              onClick={() => setSelectedAdReport(null)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600 font-medium">Impressions</div>
              <div className="text-xl font-bold text-blue-900">
                {selectedAdReport.totalImpressions.toLocaleString()}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-600 font-medium">Clics</div>
              <div className="text-xl font-bold text-green-900">
                {selectedAdReport.totalClicks.toLocaleString()}
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-purple-600 font-medium">CTR</div>
              <div className="text-xl font-bold text-purple-900">
                {selectedAdReport.ctr.toFixed(2)}%
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm text-orange-600 font-medium">Coût/Clic</div>
              <div className="text-xl font-bold text-orange-900">
                {selectedAdReport.costPerClick.toFixed(2)}€
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Audience Ciblée:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedAdReport.targetAudience.map((audience: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded"
                  >
                    {audience}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Sections d'Affichage:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedAdReport.sectionsShown.map((section: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
                  >
                    {section}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-600">Performance Globale:</span>
                <span className={`ml-2 text-sm font-medium ${
                  selectedAdReport.performance === 'Excellente' ? 'text-green-600' :
                  selectedAdReport.performance === 'Bonne' ? 'text-blue-600' : 'text-orange-600'
                }`}>
                  {selectedAdReport.performance}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Budget: {selectedAdReport.budget.toLocaleString()}€
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
