import { useState, useEffect } from 'react';
import { useAdManager, AdData } from './AdManager';

const adsDatabase = [
  // ... existing ads ...
  
  // Nouvelles publicités pour la section historique
  {
    id: 'hist-analytics-1',
    title: 'Analytics Historiques Avancés',
    description: 'Analysez vos données historiques avec des insights IA',
    image: 'https://readdy.ai/api/search-image?query=advanced%20analytics%20dashboard%20with%20historical%20data%20visualization%20charts%20graphs%20and%20AI%20insights%2C%20modern%20business%20intelligence%20interface%2C%20blue%20and%20white%20design&width=400&height=200&seq=histanalytics1&orientation=landscape',
    cta: 'Analyser mes données',
    category: 'history',
    targetAudience: 'client',
    placement: ['history-sidebar', 'recommendations-bottom'],
    metrics: { ctr: 8.2, revenue: 5400 }
  },
  {
    id: 'hist-backup-1',
    title: 'Sauvegarde Automatique Premium',
    description: 'Protégez votre historique avec nos sauvegardes cloud',
    image: 'https://readdy.ai/api/search-image?query=cloud%20backup%20and%20data%20protection%20service%20with%20secure%20servers%20and%20automatic%20synchronization%2C%20professional%20technology%20background%2C%20green%20and%20blue%20colors&width=400&height=200&seq=backup1&orientation=landscape',
    cta: 'Sécuriser mes données',
    category: 'history',
    targetAudience: 'client',
    placement: ['history-sidebar', 'downloads-section'],
    metrics: { ctr: 6.8, revenue: 3200 }
  },
  {
    id: 'hist-migration-1',
    title: 'Migration de Données Simplifiée',
    description: 'Transférez facilement vos données vers nos solutions',
    image: 'https://readdy.ai/api/search-image?query=data%20migration%20and%20transfer%20service%20with%20arrows%20showing%20data%20flow%20between%20systems%2C%20modern%20technology%20interface%2C%20purple%20and%20white%20theme&width=400&height=200&seq=migration1&orientation=landscape',
    cta: 'Migrer maintenant',
    category: 'history',
    targetAudience: 'client',
    placement: ['history-sidebar', 'recommendations-middle'],
    metrics: { ctr: 7.5, revenue: 4100 }
  },
  {
    id: 'hist-ai-recommendations-1',
    title: 'IA Recommandations Personnalisées',
    description: 'Découvrez des solutions adaptées à votre profil',
    image: 'https://readdy.ai/api/search-image?query=artificial%20intelligence%20recommendation%20engine%20with%20personalized%20suggestions%20and%20machine%20learning%20algorithms%2C%20futuristic%20interface%20design%2C%20orange%20and%20blue%20gradient&width=400&height=200&seq=airecom1&orientation=landscape',
    cta: 'Découvrir l\'IA',
    category: 'history',
    targetAudience: 'client',
    placement: ['recommendations-top', 'history-sidebar'],
    metrics: { ctr: 9.1, revenue: 6800 }
  },
  {
    id: 'hist-loyalty-1',
    title: 'Programme Fidélité Exclusif',
    description: 'Gagnez des points et débloquez des avantages',
    image: 'https://readdy.ai/api/search-image?query=customer%20loyalty%20program%20with%20rewards%20points%20and%20exclusive%20benefits%2C%20premium%20membership%20card%20design%2C%20gold%20and%20blue%20colors&width=400&height=200&seq=loyalty1&orientation=landscape',
    cta: 'Rejoindre le programme',
    category: 'history',
    targetAudience: 'client',
    placement: ['history-sidebar', 'recommendations-bottom'],
    metrics: { ctr: 11.3, revenue: 8900 }
  },
  {
    id: 'hist-automation-1',
    title: 'Automatisation Intelligente',
    description: 'Automatisez vos tâches répétitives avec l\'IA',
    image: 'https://readdy.ai/api/search-image?query=intelligent%20automation%20and%20workflow%20optimization%20with%20robotic%20process%20automation%2C%20modern%20business%20efficiency%2C%20teal%20and%20white%20interface&width=400&height=200&seq=automation1&orientation=landscape',
    cta: 'Automatiser maintenant',
    category: 'history',
    targetAudience: 'client',
    placement: ['recommendations-middle', 'history-sidebar'],
    metrics: { ctr: 7.9, revenue: 5200 }
  },
  {
    id: 'hist-integration-1',
    title: 'Intégrations Avancées',
    description: 'Connectez tous vos outils en un seul endroit',
    image: 'https://readdy.ai/api/search-image?query=software%20integration%20hub%20with%20multiple%20applications%20connected%20through%20APIs%2C%20centralized%20platform%20design%2C%20modern%20tech%20interface%2C%20blue%20and%20green%20colors&width=400&height=200&seq=integration1&orientation=landscape',
    cta: 'Voir les intégrations',
    category: 'history',
    targetAudience: 'client',
    placement: ['history-sidebar', 'downloads-section'],
    metrics: { ctr: 6.4, revenue: 3800 }
  },
  {
    id: 'hist-mobile-1',
    title: 'Applications Mobiles Natives',
    description: 'Accédez à vos données partout, tout le temps',
    image: 'https://readdy.ai/api/search-image?query=native%20mobile%20applications%20on%20smartphone%20and%20tablet%20with%20responsive%20design%2C%20business%20productivity%20apps%2C%20modern%20mobile%20interface%2C%20purple%20and%20white%20theme&width=400&height=200&seq=mobile1&orientation=landscape',
    cta: 'Télécharger l\'app',
    category: 'history',
    targetAudience: 'client',
    placement: ['downloads-section', 'history-sidebar'],
    metrics: { ctr: 8.7, revenue: 4600 }
  },
  {
    id: 'hist-training-1',
    title: 'Formation Personnalisée',
    description: 'Maîtrisez vos outils avec nos experts',
    image: 'https://readdy.ai/api/search-image?query=personalized%20training%20session%20with%20expert%20instructor%20teaching%20software%20usage%2C%20professional%20learning%20environment%2C%20modern%20classroom%20with%20technology&width=400&height=200&seq=training1&orientation=landscape',
    cta: 'Réserver une formation',
    category: 'history',
    targetAudience: 'client',
    placement: ['recommendations-bottom', 'history-sidebar'],
    metrics: { ctr: 9.8, revenue: 7200 }
  },
  {
    id: 'hist-promo-winter-1',
    title: 'Offre Hiver -50% sur tout',
    description: 'Profitez de nos tarifs exceptionnels jusqu\'au 31 janvier',
    image: 'https://readdy.ai/api/search-image?query=winter%20sale%20promotion%20banner%20with%2050%20percent%20discount%20offer%2C%20snow%20and%20ice%20theme%20with%20modern%20design%2C%20blue%20and%20white%20colors%20with%20sale%20badges&width=400&height=200&seq=wintersale1&orientation=landscape',
    cta: 'Profiter de l\'offre',
    category: 'history',
    targetAudience: 'client',
    placement: ['recommendations-top', 'history-sidebar', 'downloads-section'],
    metrics: { ctr: 15.2, revenue: 18500 }
  }
];

interface AdBannerProps {
  position: string;
  format?: 'banner' | 'popup' | 'video' | 'animated' | 'compact';
  className?: string;
  section?: string;
  limit?: number;
  userContext?: any;
  priority?: 'high' | 'medium' | 'low';
  targetCategories?: string[];
}

export default function AdBanner({ 
  position, 
  format = 'compact', 
  className = '', 
  section = 'default',
  limit = 1,
  userContext = {},
  priority = 'medium',
  targetCategories = []
}: AdBannerProps) {
  const { getAds, recordImpression, recordClick, trackAction } = useAdManager();
  const [ads, setAds] = useState<AdData[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const [animationState, setAnimationState] = useState('idle');

  useEffect(() => {
    const enrichedContext = {
      ...userContext,
      position,
      priority,
      targetCategories,
      timestamp: Date.now(),
      pageUrl: window.location.pathname,
      referrer: document.referrer,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      deviceType: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop'
    };

    const targetedAds = getAds(position, limit, enrichedContext);
    setAds(targetedAds);
    
    targetedAds.forEach(ad => {
      recordImpression(ad.id, section, enrichedContext);
    });

    if (targetedAds.length > 0) {
      trackAction('view-ads', { 
        position, 
        section, 
        adCount: targetedAds.length,
        formats: targetedAds.map(ad => ad.format)
      });
    }
  }, [position, limit, section]);

  useEffect(() => {
    if (ads.length > 1) {
      const rotationInterval = format === 'animated' ? 15000 : format === 'video' ? 25000 : 20000;
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % ads.length);
        setAnimationState('rotating');
        setTimeout(() => setAnimationState('idle'), 500);
      }, rotationInterval);
      return () => clearInterval(interval);
    }
  }, [ads.length, format]);

  useEffect(() => {
    if (format === 'popup' && ads.length > 0) {
      const delay = priority === 'high' ? 3000 : priority === 'medium' ? 8000 : 12000;
      const timer = setTimeout(() => {
        setShowPopup(true);
        trackAction('popup-shown', { 
          adId: ads[0].id, 
          section,
          delay: delay / 1000
        });
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [format, ads.length, priority]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !hasBeenViewed) {
          setHasBeenViewed(true);
          trackAction('ad-viewed', { 
            position, 
            section, 
            adId: ads[currentAdIndex]?.id,
            viewDuration: Date.now(),
            intersectionRatio: entry.intersectionRatio
          });
        }
      },
      { threshold: 0.6 }
    );

    const element = document.getElementById(`ad-banner-${position}-${section}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [position, section, ads, currentAdIndex, hasBeenViewed]);

  if (ads.length === 0) return null;

  const currentAd = ads[currentAdIndex];

  const handleClick = (ad: AdData, clickSource: string = 'button') => {
    const clickContext = {
      ...userContext,
      clickSource,
      adPosition: currentAdIndex,
      totalAdsShown: ads.length,
      timeOnAd: Date.now(),
      animationState,
      isVisible
    };

    recordClick(ad.id, section, clickSource, clickContext);
    trackAction('ad-clicked', { 
      adId: ad.id, 
      section, 
      position, 
      clickSource,
      campaignType: ad.campaignType,
      format: ad.format
    });
    
    window.open(ad.link, '_blank', 'noopener,noreferrer');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    trackAction('popup-closed', { 
      adId: currentAd.id, 
      section,
      timeShown: Date.now()
    });
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    trackAction('video-played', { 
      adId: currentAd.id, 
      section,
      timestamp: Date.now()
    });
  };

  const getCampaignBadge = (campaignType: string) => {
    switch (campaignType) {
      case 'premium':
        return (
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
            ⭐ Premium
          </span>
        );
      case 'sponsored':
        return (
          <span className="bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            🚀 Sponsorisé
          </span>
        );
      default:
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
            Publicité
          </span>
        );
    }
  };

  // Fonction utilitaire pour formater les valeurs numériques en toute sécurité
  const safeToFixed = (value: number | undefined, decimals: number = 1): string => {
    if (typeof value !== 'number' || isNaN(value)) {
      return '0.0';
    }
    return value.toFixed(decimals);
  };

  const safeToLocaleString = (value: number | undefined): string => {
    if (typeof value !== 'number' || isNaN(value)) {
      return '0';
    }
    return value.toLocaleString();
  };

  // Bannière compacte (nouveau format par défaut)
  if (format === 'compact') {
    return (
      <div 
        id={`ad-banner-${position}-${section}`}
        className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                Publicité
              </span>
              {currentAd.sector && (
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  {currentAd.sector[0]}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-sm">
              {currentAd.title}
            </h3>
            <p className="text-xs text-gray-600 mb-2 line-clamp-1">
              {currentAd.description}
            </p>
            <button
              onClick={() => handleClick(currentAd, 'compact-button')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              {currentAd.buttonText}
            </button>
          </div>
          {currentAd.image && (
            <div className="ml-3">
              <img
                src={currentAd.image}
                alt={currentAd.title}
                className="w-16 h-16 object-cover rounded cursor-pointer"
                onClick={() => handleClick(currentAd, 'image')}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Bannière statique réduite
  if (format === 'banner') {
    return (
      <div 
        id={`ad-banner-${position}-${section}`}
        className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                Publicité
              </span>
              {currentAd.sector && (
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  {currentAd.sector[0]}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-base">
              {currentAd.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {currentAd.description}
            </p>
            <button
              onClick={() => handleClick(currentAd, 'main-button')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              {currentAd.buttonText}
            </button>
          </div>
          {currentAd.image && (
            <div className="ml-4">
              <img
                src={currentAd.image}
                alt={currentAd.title}
                className="w-20 h-20 object-cover rounded cursor-pointer"
                onClick={() => handleClick(currentAd, 'image')}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Bannière animée ultra-dynamique
  if (format === 'animated') {
    return (
      <div 
        id={`ad-banner-${position}-${section}`}
        className={`relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 border-2 border-purple-200 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.03] ${className}`}
      >
        {/* Animations de fond */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 opacity-20 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-pulse"></div>
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute -bottom-5 -left-5 w-15 h-15 bg-gradient-to-br from-green-400 to-blue-400 rounded-full opacity-30 animate-pulse"></div>
        
        <div className="relative p-6">
          <div className="flex items-center space-x-3 mb-3">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-2 rounded-full animate-bounce shadow-lg">
              🎯 {getCampaignBadge(currentAd.campaignType).props.children}
            </span>
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-lg">
              ✨ Nouveau
            </span>
            <span className="bg-gradient-to-r from-green-400 to-blue-400 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
              🔥 Tendance
            </span>
          </div>
          <h3 className="font-black text-gray-900 mb-3 text-xl animate-pulse bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {currentAd.title}
          </h3>
          <p className="text-sm text-gray-700 mb-4 font-medium leading-relaxed">
            {currentAd.description}
          </p>
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleClick(currentAd, 'animated-button')}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-110 cursor-pointer whitespace-nowrap shadow-2xl animate-pulse"
            >
              <i className="ri-rocket-line mr-2"></i>
              {currentAd.buttonText} ✨
            </button>
            <div className="text-sm text-purple-700 font-bold animate-bounce bg-white px-3 py-2 rounded-lg shadow-lg">
              <i className="ri-fire-line mr-1 text-orange-500"></i>
              {safeToFixed(currentAd.ctr)}% CTR
            </div>
          </div>
          {currentAd.image && (
            <div className="mt-4">
              <img
                src={currentAd.image}
                alt={currentAd.title}
                className="w-full h-24 object-cover rounded-xl shadow-xl cursor-pointer transform hover:scale-105 transition-all duration-300"
                onClick={() => handleClick(currentAd, 'animated-image')}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Format vidéo professionnel
  if (format === 'video') {
    return (
      <div 
        id={`ad-banner-${position}-${section}`}
        className={`bg-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] ${className}`}
      >
        <div className="relative">
          <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 h-40 flex items-center justify-center relative overflow-hidden">
            {!isVideoPlaying ? (
              <div className="text-center">
                <button
                  onClick={handleVideoPlay}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full p-6 transition-all duration-300 transform hover:scale-125 cursor-pointer shadow-2xl mb-4"
                >
                  <i className="ri-play-fill text-3xl"></i>
                </button>
                <p className="text-white text-sm font-medium">Cliquez pour voir la démo</p>
              </div>
            ) : (
              <div className="text-white text-center animate-pulse">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm font-medium">EN DIRECT</span>
                </div>
                <i className="ri-video-line text-4xl mb-3"></i>
                <p className="text-sm font-medium">Démonstration en cours...</p>
                <div className="w-48 h-2 bg-gray-600 rounded-full mt-3 mx-auto">
                  <div className="w-1/3 h-2 bg-red-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}
            
            {/* Éléments décoratifs */}
            <div className="absolute top-3 left-3 flex space-x-2">
              {getCampaignBadge(currentAd.campaignType)}
            </div>
            <div className="absolute top-3 right-3">
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                <i className="ri-video-line mr-1"></i>Vidéo HD
              </span>
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                <i className="ri-time-line mr-1"></i>2:30
              </span>
            </div>
          </div>
        </div>
        <div className="p-5 bg-white">
          <h3 className="font-bold text-gray-900 mb-2 text-lg">{currentAd.title}</h3>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">{currentAd.description}</p>
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleClick(currentAd, 'video-button')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap shadow-lg"
            >
              <i className="ri-external-link-line mr-2"></i>
              {currentAd.buttonText}
            </button>
            <div className="text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
              <div className="flex items-center space-x-3">
                <span><i className="ri-eye-line mr-1"></i>{safeToLocaleString(currentAd.impressions)}</span>
                <span><i className="ri-thumb-up-line mr-1"></i>{safeToFixed(currentAd.ctr)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pop-up élégant et non intrusif
  if (format === 'popup' && showPopup) {
    return (
      <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-slide-up">
        <div className="bg-white border-2 border-orange-200 rounded-2xl shadow-2xl p-5 backdrop-blur-lg bg-opacity-95">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              {getCampaignBadge(currentAd.campaignType)}
              <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                🔥 Offre limitée
              </span>
            </div>
            <button
              onClick={handleClosePopup}
              className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors p-1 hover:bg-gray-100 rounded-full"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
          </div>
          
          {currentAd.image && (
            <img
              src={currentAd.image}
              alt={currentAd.title}
              className="w-full h-24 object-cover rounded-lg mb-3 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleClick(currentAd, 'popup-image')}
            />
          )}
          
          <h3 className="font-bold text-gray-900 mb-2 text-lg">{currentAd.title}</h3>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">{currentAd.description}</p>
          
          <div className="flex space-x-3 mb-3">
            <button
              onClick={() => handleClick(currentAd, 'popup-button')}
              className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap shadow-lg"
            >
              <i className="ri-gift-line mr-2"></i>
              {currentAd.buttonText}
            </button>
            <button
              onClick={handleClosePopup}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              Plus tard
            </button>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-200 pt-3">
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <i className="ri-star-line mr-1 text-yellow-500"></i>
                {safeToFixed(currentAd.ctr)}% CTR
              </span>
              <span className="flex items-center">
                <i className="ri-user-line mr-1 text-blue-500"></i>
                {safeToLocaleString(currentAd.clicks)} clics
              </span>
            </div>
            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">
              Popup
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Export nommé pour compatibilité
export { AdBanner };
