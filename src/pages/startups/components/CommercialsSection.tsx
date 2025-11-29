import { useState, useEffect } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';
import AdBanner from '../../../components/feature/AdBanner';

interface Commercial {
  id: string;
  name: string;
  specialization: string;
  location: string;
  experience: number;
  rating: number;
  completedDeals: number;
  skills: string[];
  avatar: string;
  status: 'available' | 'busy' | 'offline';
  hourlyRate: number;
  description: string;
  recommendations: number;
}

export default function CommercialsSection() {
  const { trackAction } = useAdManager();
  const [commercials, setCommercials] = useState<Commercial[]>([]);
  const [filteredCommercials, setFilteredCommercials] = useState<Commercial[]>([]);
  const [selectedCommercial, setSelectedCommercial] = useState<Commercial | null>(null);
  const [filters, setFilters] = useState({
    specialization: '',
    location: '',
    availability: '',
    minRating: 0
  });

  useEffect(() => {
    trackAction('view-commercials-section');
    loadCommercials();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, commercials]);

  const loadCommercials = () => {
    const mockCommercials: Commercial[] = [
      {
        id: '1',
        name: 'Sarah Martin',
        specialization: 'SaaS & Technologies',
        location: 'Paris, France',
        experience: 5,
        rating: 4.9,
        completedDeals: 127,
        skills: ['SaaS', 'B2B', 'Négociation', 'Présentation'],
        avatar: 'https://readdy.ai/api/search-image?query=professional%20businesswoman%20portrait%2C%20confident%20sales%20expert%2C%20modern%20office%20background%2C%20professional%20headshot&width=100&height=100&seq=comm1&orientation=squarish',
        status: 'available',
        hourlyRate: 85,
        description: 'Experte en vente de solutions SaaS avec 5 ans d\'expérience. Spécialisée dans l\'accompagnement des startups technologiques.',
        recommendations: 45
      },
      {
        id: '2',
        name: 'Thomas Dubois',
        specialization: 'E-commerce & Retail',
        location: 'Lyon, France',
        experience: 7,
        rating: 4.8,
        completedDeals: 203,
        skills: ['E-commerce', 'Retail', 'Marketing Digital', 'Analytics'],
        avatar: 'https://readdy.ai/api/search-image?query=professional%20businessman%20portrait%2C%20experienced%20sales%20manager%2C%20modern%20corporate%20environment%2C%20confident%20expression&width=100&height=100&seq=comm2&orientation=squarish',
        status: 'available',
        hourlyRate: 95,
        description: 'Commercial senior spécialisé dans l\'e-commerce et le retail. Expert en stratégies de vente omnicanal.',
        recommendations: 62
      },
      {
        id: '3',
        name: 'Marie Leroy',
        specialization: 'Services Financiers',
        location: 'Marseille, France',
        experience: 4,
        rating: 4.7,
        completedDeals: 89,
        skills: ['Fintech', 'Services Financiers', 'Compliance', 'B2B'],
        avatar: 'https://readdy.ai/api/search-image?query=professional%20financial%20advisor%20portrait%2C%20expert%20saleswoman%2C%20banking%20environment%2C%20trustworthy%20appearance&width=100&height=100&seq=comm3&orientation=squarish',
        status: 'busy',
        hourlyRate: 90,
        description: 'Spécialiste des services financiers et fintech. Excellente connaissance des réglementations sectorielles.',
        recommendations: 38
      },
      {
        id: '4',
        name: 'Antoine Moreau',
        specialization: 'Santé & Biotechnologies',
        location: 'Toulouse, France',
        experience: 6,
        rating: 4.9,
        completedDeals: 156,
        skills: ['Santé', 'Biotechnologies', 'Médical', 'Réglementation'],
        avatar: 'https://readdy.ai/api/search-image?query=professional%20healthcare%20sales%20representative%2C%20medical%20industry%20expert%2C%20clean%20modern%20background%2C%20professional%20attire&width=100&height=100&seq=comm4&orientation=squarish',
        status: 'available',
        hourlyRate: 100,
        description: 'Expert en vente de solutions de santé et biotechnologies. Connaissance approfondie du secteur médical.',
        recommendations: 51
      },
      {
        id: '5',
        name: 'Camille Rousseau',
        specialization: 'EdTech & Formation',
        location: 'Bordeaux, France',
        experience: 3,
        rating: 4.6,
        completedDeals: 67,
        skills: ['EdTech', 'Formation', 'E-learning', 'Pédagogie'],
        avatar: 'https://readdy.ai/api/search-image?query=professional%20education%20technology%20specialist%2C%20young%20dynamic%20saleswoman%2C%20modern%20learning%20environment%2C%20innovative%20background&width=100&height=100&seq=comm5&orientation=squarish',
        status: 'available',
        hourlyRate: 75,
        description: 'Spécialisée dans les technologies éducatives et la formation. Passionnée par l\'innovation pédagogique.',
        recommendations: 29
      },
      {
        id: '6',
        name: 'Julien Bernard',
        specialization: 'Industrie & Manufacturing',
        location: 'Lille, France',
        experience: 8,
        rating: 4.8,
        completedDeals: 234,
        skills: ['Industrie 4.0', 'Manufacturing', 'IoT', 'Automation'],
        avatar: 'https://readdy.ai/api/search-image?query=professional%20industrial%20sales%20manager%2C%20manufacturing%20expert%2C%20industrial%20background%2C%20experienced%20professional&width=100&height=100&seq=comm6&orientation=squarish',
        status: 'offline',
        hourlyRate: 110,
        description: 'Expert en solutions industrielles et manufacturing. Spécialisé dans l\'Industrie 4.0 et l\'automatisation.',
        recommendations: 73
      }
    ];
    setCommercials(mockCommercials);
    setFilteredCommercials(mockCommercials);
  };

  const applyFilters = () => {
    let filtered = commercials;

    if (filters.specialization) {
      filtered = filtered.filter(c => 
        c.specialization.toLowerCase().includes(filters.specialization.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter(c => 
        c.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.availability) {
      filtered = filtered.filter(c => c.status === filters.availability);
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter(c => c.rating >= filters.minRating);
    }

    setFilteredCommercials(filtered);
  };

  const handleContactCommercial = (commercial: Commercial) => {
    trackAction('contact-commercial', { commercialId: commercial.id, specialization: commercial.specialization });
    // Ici on pourrait ouvrir une modal de contact ou rediriger vers une page de contact
    alert(`Contact initié avec ${commercial.name}. Un email de mise en relation va être envoyé.`);
  };

  const handleViewProfile = (commercial: Commercial) => {
    trackAction('view-commercial-profile', { commercialId: commercial.id });
    setSelectedCommercial(commercial);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-orange-100 text-orange-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'busy': return 'Occupé';
      case 'offline': return 'Hors ligne';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="space-y-6">
      {/* Bannière publicitaire en haut */}
      <AdBanner 
        position="commercials-header" 
        format="banner"
        section="commercials"
        className="mb-6"
        userContext={{ section: 'commercials', priority: 'high' }}
        targetCategories={['training', 'crm', 'hr']}
      />

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Accès aux Commerciaux</h2>
        
        {/* Filtres */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Spécialisation</label>
            <select
              value={filters.specialization}
              onChange={(e) => setFilters({...filters, specialization: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Toutes les spécialisations</option>
              <option value="SaaS">SaaS & Technologies</option>
              <option value="E-commerce">E-commerce & Retail</option>
              <option value="Financiers">Services Financiers</option>
              <option value="Santé">Santé & Biotechnologies</option>
              <option value="EdTech">EdTech & Formation</option>
              <option value="Industrie">Industrie & Manufacturing</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
            <select
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Toutes les villes</option>
              <option value="Paris">Paris</option>
              <option value="Lyon">Lyon</option>
              <option value="Marseille">Marseille</option>
              <option value="Toulouse">Toulouse</option>
              <option value="Bordeaux">Bordeaux</option>
              <option value="Lille">Lille</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Disponibilité</label>
            <select
              value={filters.availability}
              onChange={(e) => setFilters({...filters, availability: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Tous les statuts</option>
              <option value="available">Disponible</option>
              <option value="busy">Occupé</option>
              <option value="offline">Hors ligne</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Note minimum</label>
            <select
              value={filters.minRating}
              onChange={(e) => setFilters({...filters, minRating: Number(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value={0}>Toutes les notes</option>
              <option value={4}>4+ étoiles</option>
              <option value={4.5}>4.5+ étoiles</option>
              <option value={4.8}>4.8+ étoiles</option>
            </select>
          </div>
        </div>

        {/* Liste des commerciaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommercials.map((commercial) => (
            <div key={commercial.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={commercial.avatar}
                  alt={commercial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{commercial.name}</h3>
                  <p className="text-sm text-gray-600">{commercial.specialization}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(commercial.status)}`}>
                      {getStatusText(commercial.status)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Localisation:</span>
                  <span className="font-medium">{commercial.location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Expérience:</span>
                  <span className="font-medium">{commercial.experience} ans</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Note:</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">{commercial.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`ri-star-${i < Math.floor(commercial.rating) ? 'fill' : 'line'} text-yellow-400 text-xs`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Deals réalisés:</span>
                  <span className="font-medium">{commercial.completedDeals}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tarif:</span>
                  <span className="font-medium">{commercial.hourlyRate}€/h</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2">Compétences:</p>
                <div className="flex flex-wrap gap-1">
                  {commercial.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                  {commercial.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{commercial.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewProfile(commercial)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Voir Profil
                </button>
                <button
                  onClick={() => handleContactCommercial(commercial)}
                  disabled={commercial.status === 'offline'}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    commercial.status === 'offline'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Contacter
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCommercials.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-user-search-line text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun commercial trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>

      {/* Bannière publicitaire en bas */}
      <AdBanner 
        position="commercials-footer" 
        format="popup"
        section="commercials"
        userContext={{ section: 'commercials-list', priority: 'medium' }}
        targetCategories={['training', 'hr', 'crm']}
      />

      {/* Modal de profil détaillé */}
      {selectedCommercial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Profil Détaillé</h2>
                <button
                  onClick={() => setSelectedCommercial(null)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="flex items-center space-x-6 mb-6">
                <img
                  src={selectedCommercial.avatar}
                  alt={selectedCommercial.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedCommercial.name}</h3>
                  <p className="text-lg text-gray-600">{selectedCommercial.specialization}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedCommercial.status)}`}>
                      {getStatusText(selectedCommercial.status)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">{selectedCommercial.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`ri-star-${i < Math.floor(selectedCommercial.rating) ? 'fill' : 'line'} text-yellow-400`}
                          ></i>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({selectedCommercial.recommendations} avis)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Informations</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Localisation:</span>
                      <span>{selectedCommercial.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expérience:</span>
                      <span>{selectedCommercial.experience} ans</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deals réalisés:</span>
                      <span>{selectedCommercial.completedDeals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tarif horaire:</span>
                      <span className="font-medium">{selectedCommercial.hourlyRate}€/h</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Compétences</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCommercial.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600 leading-relaxed">{selectedCommercial.description}</p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleContactCommercial(selectedCommercial)}
                  disabled={selectedCommercial.status === 'offline'}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCommercial.status === 'offline'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <i className="ri-mail-line mr-2"></i>
                  Contacter par Email
                </button>
                <button
                  onClick={() => {
                    trackAction('schedule-call', { commercialId: selectedCommercial.id });
                    alert('Demande de rendez-vous envoyée');
                  }}
                  disabled={selectedCommercial.status === 'offline'}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCommercial.status === 'offline'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  <i className="ri-phone-line mr-2"></i>
                  Planifier un Appel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { CommercialsSection };
