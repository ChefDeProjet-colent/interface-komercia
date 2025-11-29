import { useState, useEffect } from 'react';
import { useAdManager } from './AdManager';

export default function AdvancedAdAnalytics() {
  const { getAnalytics, getUserProfile } = useAdManager();
  const [analytics, setAnalytics] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedAdId, setSelectedAdId] = useState<string>('');

  useEffect(() => {
    setAnalytics(getAnalytics());
    setUserProfile(getUserProfile());
  }, []);

  const handleAdSelect = (adId: string) => {
    setSelectedAdId(adId);
    setAnalytics(getAnalytics(adId));
  };

  if (!analytics || !userProfile) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Vue d\'ensemble', icon: 'ri-dashboard-line' },
    { id: 'performance', name: 'Performances', icon: 'ri-bar-chart-line' },
    { id: 'audience', name: 'Audience', icon: 'ri-user-line' },
    { id: 'campaigns', name: 'Campagnes', icon: 'ri-megaphone-line' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Publicitaires Avancées
          </h1>
          <p className="text-gray-600 mt-1">
            Analyse détaillée des performances et du ciblage
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">
            <i className="ri-pulse-line mr-2"></i>
            Temps réel
          </span>
          <span className="text-sm text-gray-500">
            Dernière mise à jour: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                selectedTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenu des onglets */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Métriques principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <i className="ri-eye-line text-white text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-700">Impressions Totales</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {analytics.totalImpressions?.toLocaleString() || '0'}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    <i className="ri-arrow-up-line mr-1"></i>+12.5% vs période précédente
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <div className="flex items-center">
                <div className="p-3 bg-green-500 rounded-lg">
                  <i className="ri-cursor-line text-white text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-700">Clics Totaux</p>
                  <p className="text-2xl font-bold text-green-900">
                    {analytics.totalClicks?.toLocaleString() || '0'}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    <i className="ri-arrow-up-line mr-1"></i>+18.3% vs période précédente
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center">
                <div className="p-3 bg-purple-500 rounded-lg">
                  <i className="ri-percentage-line text-white text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-purple-700">CTR Global</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {analytics.globalCTR?.toFixed(2) || '0.00'}%
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    <i className="ri-arrow-up-line mr-1"></i>+5.2% vs période précédente
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
              <div className="flex items-center">
                <div className="p-3 bg-orange-500 rounded-lg">
                  <i className="ri-user-heart-line text-white text-xl"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-orange-700">Engagement</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {analytics.userEngagement?.engagementRate?.toFixed(1) || '0.0'}%
                  </p>
                  <p className="text-xs text-orange-600 mt-1">
                    <i className="ri-arrow-up-line mr-1"></i>+8.7% vs période précédente
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Top 5 publicités performantes */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🏆 Top 5 Publicités Performantes
            </h3>
            <div className="space-y-4">
              {analytics.topPerformingAds?.slice(0, 5).map((ad: any, index: number) => (
                <div key={ad.adId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                    }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Publicité #{ad.adId}</p>
                      <p className="text-sm text-gray-600">
                        {ad.impressions.toLocaleString()} impressions • {ad.clicks.toLocaleString()} clics
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{ad.ctr.toFixed(2)}%</p>
                    <p className="text-xs text-gray-500">CTR</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'performance' && (
        <div className="space-y-6">
          {/* Performances par section */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📊 Performances par Section
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analytics.sectionPerformance?.map((section: any) => (
                <div key={section.section} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2 capitalize">{section.section}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Impressions:</span>
                      <span className="font-medium">{section.impressions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Clics:</span>
                      <span className="font-medium">{section.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">CTR:</span>
                      <span className={`font-bold ${
                        section.ctr > 8 ? 'text-green-600' : 
                        section.ctr > 5 ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        {section.ctr.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          section.ctr > 8 ? 'bg-green-500' : 
                          section.ctr > 5 ? 'bg-blue-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${Math.min(section.ctr * 10, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Métriques d'engagement */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              👥 Métriques d'Engagement Utilisateur
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {analytics.userEngagement?.totalSessions || 0}
                </div>
                <div className="text-sm text-blue-700 mt-1">Sessions Totales</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {analytics.userEngagement?.activeSessions || 0}
                </div>
                <div className="text-sm text-green-700 mt-1">Sessions Actives</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {analytics.userEngagement?.averageImpressionPerSession?.toFixed(1) || '0.0'}
                </div>
                <div className="text-sm text-purple-700 mt-1">Impressions/Session</div>
              </div>
            </div>
          </div>

          {/* Efficacité des campagnes */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🎯 Efficacité des Campagnes
            </h3>
            <div className="space-y-4">
              {analytics.campaignEffectiveness?.map((campaign: any) => (
                <div key={campaign.campaign} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.campaign === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                      campaign.campaign === 'sponsored' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {campaign.campaign === 'premium' ? '⭐ Premium' :
                       campaign.campaign === 'sponsored' ? '🚀 Sponsorisé' :
                       '📢 Standard'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 capitalize">{campaign.campaign}</p>
                      <p className="text-sm text-gray-600">
                        {campaign.impressions.toLocaleString()} impressions • {campaign.clicks.toLocaleString()} clics
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{campaign.ctr.toFixed(2)}%</p>
                    <p className="text-xs text-gray-500">CTR</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'audience' && (
        <div className="space-y-6">
          {/* Profil de ciblage actuel */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🎯 Profil de Ciblage Actuel
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Type d'utilisateur:</span>
                  <span className="text-sm font-bold text-gray-900 capitalize bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {userProfile.userType}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Secteur:</span>
                  <span className="text-sm font-bold text-gray-900 capitalize bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    {userProfile.sector}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Localisation:</span>
                  <span className="text-sm font-bold text-gray-900 bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                    {userProfile.location}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Rôle:</span>
                  <span className="text-sm font-bold text-gray-900 capitalize bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                    {userProfile.role}
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Intérêts Détectés:</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {userProfile.interests?.map((interest: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Actions Récentes:</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {userProfile.recentActions?.slice(0, 8).map((action: string, index: number) => (
                    <div key={index} className="text-xs text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                      <i className="ri-arrow-right-s-line mr-1"></i>
                      {action}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Historique des publicités vues */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📈 Historique des Publicités Vues
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {userProfile.viewHistory?.slice(0, 10).map((view: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Publicité #{view.adId}</p>
                      <p className="text-xs text-gray-600">Section: {view.section}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(view.timestamp).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(view.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'campaigns' && (
        <div className="space-y-6">
          {/* Répartition par type de campagne */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-yellow-800">Campagnes Premium</h3>
                <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">⭐</span>
              </div>
              <div className="text-3xl font-bold text-yellow-900 mb-2">
                {analytics.campaignEffectiveness?.find((c: any) => c.campaign === 'premium')?.impressions?.toLocaleString() || '0'}
              </div>
              <p className="text-sm text-yellow-700">Impressions totales</p>
              <div className="mt-3">
                <div className="flex justify-between text-sm">
                  <span>CTR:</span>
                  <span className="font-bold">
                    {analytics.campaignEffectiveness?.find((c: any) => c.campaign === 'premium')?.ctr?.toFixed(2) || '0.00'}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-green-800">Campagnes Sponsorisées</h3>
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">🚀</span>
              </div>
              <div className="text-3xl font-bold text-green-900 mb-2">
                {analytics.campaignEffectiveness?.find((c: any) => c.campaign === 'sponsored')?.impressions?.toLocaleString() || '0'}
              </div>
              <p className="text-sm text-green-700">Impressions totales</p>
              <div className="mt-3">
                <div className="flex justify-between text-sm">
                  <span>CTR:</span>
                  <span className="font-bold">
                    {analytics.campaignEffectiveness?.find((c: any) => c.campaign === 'sponsored')?.ctr?.toFixed(2) || '0.00'}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-blue-800">Campagnes Standard</h3>
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">📢</span>
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">
                {analytics.campaignEffectiveness?.find((c: any) => c.campaign === 'standard')?.impressions?.toLocaleString() || '0'}
              </div>
              <p className="text-sm text-blue-700">Impressions totales</p>
              <div className="mt-3">
                <div className="flex justify-between text-sm">
                  <span>CTR:</span>
                  <span className="font-bold">
                    {analytics.campaignEffectiveness?.find((c: any) => c.campaign === 'standard')?.ctr?.toFixed(2) || '0.00'}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparaison des formats publicitaires */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🎨 Performance par Format Publicitaire
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { format: 'banner', name: 'Bannières', icon: 'ri-layout-line', color: 'blue' },
                { format: 'animated', name: 'Animées', icon: 'ri-movie-line', color: 'purple' },
                { format: 'video', name: 'Vidéos', icon: 'ri-video-line', color: 'red' },
                { format: 'popup', name: 'Pop-ups', icon: 'ri-window-line', color: 'orange' }
              ].map((item) => (
                <div key={item.format} className={`p-4 border border-${item.color}-200 rounded-lg bg-${item.color}-50`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className={`font-medium text-${item.color}-800`}>{item.name}</h4>
                    <i className={`${item.icon} text-${item.color}-600`}></i>
                  </div>
                  <div className={`text-2xl font-bold text-${item.color}-900 mb-1`}>
                    8.5%
                  </div>
                  <p className={`text-sm text-${item.color}-700`}>CTR Moyen</p>
                  <div className="mt-3">
                    <div className={`w-full bg-${item.color}-200 rounded-full h-2`}>
                      <div className={`w-4/5 h-2 bg-${item.color}-500 rounded-full`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}