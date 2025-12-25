import { useState } from 'react';
import { Card } from '../../../components/base/Card';
import { Button } from '../../../components/base/Button';
import { Badge } from '../../../components/base/Badge';

interface EndCustomerDashboardProps {
  onTabChange: (tab: string) => void;
}

const recentProducts = [
  {
    id: 1,
    name: "CRM Collaboratif Pro",
    category: "Gestion Client",
    price: "89€/mois",
    originalPrice: "120€/mois",
    image: "https://readdy.ai/api/search-image?query=modern%20collaborative%20CRM%20software%20interface%20with%20clean%20dashboard%2C%20professional%20business%20tools%2C%20blue%20and%20white%20color%20scheme%2C%20minimalist%20design%2C%20high-tech%20workspace&width=300&height=200&seq=crm-collab&orientation=landscape",
    status: "Consulté",
    lastViewed: "Il y a 2 heures",
    description: "Solution CRM complète pour optimiser vos relations clients et booster vos ventes",
    rating: 4.8,
    reviews: 156,
    badge: "Très populaire",
  },
  {
    id: 2,
    name: "Formation Prospection Commerciale",
    category: "Formation",
    price: "299€",
    image: "https://readdy.ai/api/search-image?query=professional%20sales%20training%20course%2C%20business%20people%20in%20modern%20conference%20room%2C%20presentation%20screens%2C%20collaborative%20learning%20environment%2C%20corporate%20training%20setup&width=300&height=200&seq=sales-training&orientation=landscape",
    status: "Ajouté au panier",
    lastViewed: "Hier",
    description: "Formation complète en techniques de prospection et négociation commerciale",
    rating: 4.9,
    reviews: 89,
    badge: "Certifiant",
  },
  {
    id: 3,
    name: "Analytics Business Intelligence",
    category: "Analyse",
    price: "149€/mois",
    originalPrice: "199€/mois",
    image: "https://readdy.ai/api/search-image?query=business%20intelligence%20analytics%20dashboard%20with%20charts%20graphs%20data%20visualization%2C%20modern%20office%20setting%2C%20professional%20analytics%20tools%2C%20blue%20purple%20gradient&width=300&height=200&seq=bi-analytics&orientation=landscape",
    status: "Essai gratuit actif",
    lastViewed: "Il y a 1 jour",
    description: "Plateforme d'analyse de données avec tableaux de bord interactifs et IA prédictive",
    rating: 4.7,
    reviews: 203,
    badge: "Recommandé",
  },
];

const promotionalSlides = [
  {
    title: "Jusqu'à -40% sur tous nos produits",
    description: "Profitez de nos offres exceptionnelles sur une sélection de produits premium",
    cta: "Découvrir les offres",
    image: "https://readdy.ai/api/search-image?query=modern%20e-commerce%20promotional%20banner%20with%20shopping%20cart%2C%20discount%20tags%2C%20vibrant%20teal%20and%20emerald%20colors%2C%20professional%20product%20display%2C%20clean%20minimalist%20design%2C%20bright%20lighting&width=1200&height=400&seq=promo-1&orientation=landscape",
    overlay: "bg-gradient-to-r from-teal-600/80 to-emerald-600/80"
  },
  {
    title: "Nouveautés 2025",
    description: "Découvrez nos derniers produits et services innovants pour booster votre activité",
    cta: "Voir les nouveautés",
    image: "https://readdy.ai/api/search-image?query=innovative%20technology%20products%20showcase%2C%20modern%20gadgets%20display%2C%20futuristic%20business%20tools%2C%20teal%20and%20white%20theme%2C%20professional%20photography%2C%20clean%20background&width=1200&height=400&seq=promo-2&orientation=landscape",
    overlay: "bg-gradient-to-r from-blue-600/80 to-teal-600/80"
  },
  {
    title: "Formations Certifiantes",
    description: "Développez vos compétences avec nos formations professionnelles reconnues",
    cta: "Explorer les formations",
    image: "https://readdy.ai/api/search-image?query=professional%20training%20classroom%2C%20business%20education%2C%20modern%20learning%20environment%2C%20people%20studying%2C%20emerald%20and%20teal%20colors%2C%20bright%20professional%20setting&width=1200&height=400&seq=promo-3&orientation=landscape",
    overlay: "bg-gradient-to-r from-emerald-600/80 to-teal-600/80"
  }
];

const notifications = [
  {
    id: 1,
    type: "warning",
    title: "Essai gratuit expire bientôt",
    message: "Votre essai gratuit Analytics expire dans 3 jours. Passez à un abonnement premium pour continuer.",
    time: "Il y a 2h",
    action: "Voir les offres",
    urgent: true,
  },
  {
    id: 2,
    type: "success",
    title: "Nouvelle fonctionnalité disponible",
    message: "Le module de reporting avancé est maintenant disponible dans votre CRM.",
    time: "Il y a 1j",
    action: "Découvrir",
    urgent: false,
  },
  {
    id: 3,
    type: "info",
    title: "Offre spéciale partenaire",
    message: "Bénéficiez de 30% de réduction sur tous nos modules complémentaires jusqu'au 31 janvier.",
    time: "Il y a 2j",
    action: "Profiter de l'offre",
    urgent: false,
  },
];

export const EndCustomerDashboard = ({ onTabChange }: EndCustomerDashboardProps) => {
  const [currentPromoSlide, setCurrentPromoSlide] = useState(0);

  const nextPromoSlide = () => {
    setCurrentPromoSlide((prev) => (prev + 1) % promotionalSlides.length);
  };

  const prevPromoSlide = () => {
    setCurrentPromoSlide((prev) => (prev - 1 + promotionalSlides.length) % promotionalSlides.length);
  };

  const experts = [
    {
      id: 1,
      name: 'Sophie Martin',
      role: 'Expert Commercial',
      specialization: 'Logiciels & Technologies',
      rating: 4.9,
      reviews: 127,
      image: 'https://readdy.ai/api/search-image?query=professional%20french%20businesswoman%20expert%20consultant%20smiling%20confident%20modern%20office%20background%20professional%20headshot%20portrait%20clean%20simple%20background&width=300&height=300&seq=exp1&orientation=squarish',
      availability: 'Disponible'
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      role: 'Conseiller Commercial',
      specialization: 'Formations Professionnelles',
      rating: 4.8,
      reviews: 98,
      image: 'https://readdy.ai/api/search-image?query=professional%20french%20businessman%20consultant%20expert%20smiling%20confident%20modern%20office%20background%20professional%20headshot%20portrait%20clean%20simple%20background&width=300&height=300&seq=exp2&orientation=squarish',
      availability: 'Disponible'
    },
    {
      id: 3,
      name: 'Marie Lefebvre',
      role: 'Expert Commercial',
      specialization: 'Services Financiers',
      rating: 5.0,
      reviews: 156,
      image: 'https://readdy.ai/api/search-image?query=professional%20french%20businesswoman%20financial%20expert%20consultant%20smiling%20confident%20modern%20office%20background%20professional%20headshot%20portrait%20clean%20simple%20background&width=300&height=300&seq=exp3&orientation=squarish',
      availability: 'Occupé'
    },
    {
      id: 4,
      name: 'Alexandre Rousseau',
      role: 'Conseiller Technique',
      specialization: 'Infrastructure IT',
      rating: 4.7,
      reviews: 84,
      image: 'https://readdy.ai/api/search-image?query=professional%20french%20businessman%20IT%20technical%20expert%20consultant%20smiling%20confident%20modern%20office%20background%20professional%20headshot%20portrait%20clean%20simple%20background&width=300&height=300&seq=exp4&orientation=squarish',
      availability: 'Disponible'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Bannière publicitaire en haut */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">🚀 Offres Spéciales Clients Finaux</h3>
            <p className="text-blue-100">Découvrez nos solutions premium avec 30% de réduction - Offre limitée !</p>
          </div>
          <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
            Découvrir
          </Button>
        </div>
      </div>

      {/* Experts Section */}
      <section id="commerciaux" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Nos Experts</h2>
              <p className="text-gray-600">Des professionnels qualifiés à votre service</p>
            </div>
            <button 
              onClick={() => window.REACT_APP_NAVIGATE('/end-customers/commercial')}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              Voir tous les experts
              <i className="ri-arrow-right-line ml-2"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experts.map((expert) => (
              <div
                key={expert.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <div className="w-full h-64 overflow-hidden">
                    <img
                      src={expert.image}
                      alt={expert.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                    expert.availability === 'Disponible' ? 'bg-green-500' : 'bg-orange-500'
                  } shadow-lg`}></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{expert.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{expert.role}</p>
                  <p className="text-sm text-teal-600 font-medium mb-3">{expert.specialization}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      <i className="ri-star-fill text-yellow-400"></i>
                      <span className="ml-1 text-sm font-semibold text-gray-900">{expert.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({expert.reviews} avis)</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 whitespace-nowrap">
                    <i className="ri-message-3-line mr-2"></i>
                    Contacter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Carousel */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative h-96">
              {promotionalSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    currentPromoSlide === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 ${slide.overlay}`}></div>
                  <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <div className="max-w-3xl">
                      <h2 className="text-5xl font-bold text-white mb-6">
                        {slide.title}
                      </h2>
                      <p className="text-xl text-white/90 mb-8">
                        {slide.description}
                      </p>
                      <button className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold hover:bg-teal-50 transition-all transform hover:scale-105 shadow-lg whitespace-nowrap">
                        {slide.cta}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevPromoSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all z-10 w-12 h-12 flex items-center justify-center"
            >
              <i className="ri-arrow-left-s-line text-2xl"></i>
            </button>
            <button
              onClick={nextPromoSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all z-10 w-12 h-12 flex items-center justify-center"
            >
              <i className="ri-arrow-right-s-line text-2xl"></i>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {promotionalSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPromoSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentPromoSlide === index
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EndCustomerDashboard;
