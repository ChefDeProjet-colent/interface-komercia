import { useState } from 'react';

interface Commercial {
  id: number;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  rating: number;
  reviews: number;
  image: string;
  availability: 'Disponible' | 'Occupé' | 'Hors ligne';
  languages: string[];
  expertise: string[];
  successRate: number;
  clients: number;
}

export default function CommercialPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedCommercial, setSelectedCommercial] = useState<Commercial | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const commercials: Commercial[] = [
    {
      id: 1,
      name: 'Sophie Martin',
      role: 'Expert Commercial Senior',
      specialization: 'Logiciels & Technologies',
      experience: '8 ans',
      rating: 4.9,
      reviews: 127,
      image: 'https://readdy.ai/api/search-image?query=professional%20french%20businesswoman%20expert%20consultant%20smiling%20confident%20modern%20office%20background%20professional%20headshot%20portrait%20clean%20simple%20background&width=400&height=400&seq=comm1&orientation=squarish',
      availability: 'Disponible',
      languages: ['Français', 'Anglais', 'Espagnol'],
      expertise: ['SaaS', 'Cloud Computing', 'Cybersécurité', 'IA & Machine Learning'],
      successRate: 96,
      clients: 234
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      role: 'Conseiller Commercial',
      specialization: 'Formations Professionnelles',
      experience: '6 ans',
      rating: 4.8,
      reviews: 98,
      image: 'https://readdy.ai/api/search-image?query=professional%20french%20businessman%20consultant%20expert%20smiling%20confident%20modern%20office%20background%20professional%20headshot%20portrait%20clean%20simple%20background&width=400&height=400&seq=comm2&orientation=squarish',
      availability: 'Disponible',
      languages: ['Français', 'Anglais'],
      expertise: ['Management', 'Leadership', 'Soft Skills', 'Digital Marketing'],
      successRate: 94,
      clients: 189
    },
    {
      id: 3,
      name: 'Marie Lefebvre',
      role: 'Expert Commercial',
      specialization: 'Services Financiers',
      experience: '10 ans',
      rating: 5.0,
      reviews: 156,
      image: 'https://readdy.ai/api/search-image?query=professional%20french%20businesswoman%20financial%20expert%20consultant%20smiling%20confident%20modern%20office%20background%20professional%20headshot%20portrait%20clean%20simple%20background&width=400&height=400&seq=comm3&orientation=squarish',
      availability: 'Occupé',
      languages: ['Français', 'Anglais', 'Allemand'],
      expertise: ['Comptabilité', 'Gestion Financière', 'Audit', 'Fiscalité'],
      successRate: 98,
      clients: 312
    },
    {
      id: 4,
      name: 'Alexandre Rousseau',
      role: 'Conseiller Technique',
      specialization: 'Infrastructure IT',
      experience: '7 ans',
      rating: 4.7,
      reviews: 84,
      image: 'https://readdy.ai/api/search-image?query=professional%20french%20businessman%20IT%20technical%20expert%20consultant%20smiling%20confident%20modern%20office%20background%20professional%20headshot%20portrait%20clean%20simple%20background&width=400&height=400&seq=comm4&orientation=squarish',
      availability: 'Disponible',
      languages: ['Français', 'Anglais'],
      expertise: ['Réseaux', 'Serveurs', 'Cloud Infrastructure', 'DevOps'],
      successRate: 92,
      clients: 167
    },
    {
      id: 5,
      name: 'Camille Bernard',
      role: 'Expert Commercial Senior',
      specialization: 'Marketing Digital',
      experience: '9 ans',
      rating: 4.9,
      reviews: 143,
      image: 'https://readdy.ai/api/search-image?query=professional%20french%20businesswoman%20marketing%20expert%20consultant%20smiling%20confident%20modern%20office%20background%20professional%20headshot%20portrait%20clean%20simple%20background&width=400&height=400&seq=comm5&orientation=squarish',
      availability: 'Disponible',
      languages: ['Français', 'Anglais', 'Italien'],
      expertise: ['SEO/SEM', 'Social Media', 'Content Marketing', 'Analytics'],
      successRate: 95,
      clients: 278
    },
    {
      id: 6,
      name: 'Lucas Moreau',
      role: 'Conseiller Commercial',
      specialization: 'E-commerce',
      experience: '5 ans',
      rating: 4.6,
      reviews: 72,
      image: 'https://readdy.ai/api/search-image?query=professional%20french%20businessman%20ecommerce%20expert%20consultant%20smiling%20confident%20modern%20office%20background%20professional%20headshot%20portrait%20clean%20simple%20background&width=400&height=400&seq=comm6&orientation=squarish',
      availability: 'Hors ligne',
      languages: ['Français', 'Anglais'],
      expertise: ['Shopify', 'WooCommerce', 'Marketplace', 'Logistique'],
      successRate: 90,
      clients: 145
    },
    {
      id: 7,
      name: 'Emma Petit',
      role: 'Expert Commercial',
      specialization: 'Ressources Humaines',
      experience: '8 ans',
      rating: 4.8,
      reviews: 119,
      image: 'https://readdy.ai/api/search-image?query=professional%20french%20businesswoman%20HR%20human%20resources%20expert%20consultant%20smiling%20confident%20modern%20office%20background%20professional%20headshot%20portrait%20clean%20simple%20background&width=400&height=400&seq=comm7&orientation=squarish',
      availability: 'Disponible',
      languages: ['Français', 'Anglais', 'Portugais'],
      expertise: ['Recrutement', 'Formation', 'Gestion des Talents', 'SIRH'],
      successRate: 93,
      clients: 201
    },
    {
      id: 8,
      name: 'Hugo Laurent',
      role: 'Conseiller Technique',
      specialization: 'Développement Web',
      experience: '6 ans',
      rating: 4.7,
      reviews: 91,
      image: 'https://readdy.ai/api/search-image?query=professional%20french%20businessman%20web%20developer%20expert%20consultant%20smiling%20confident%20modern%20office%20background%20professional%20headshot%20portrait%20clean%20simple%20background&width=400&height=400&seq=comm8&orientation=squarish',
      availability: 'Disponible',
      languages: ['Français', 'Anglais'],
      expertise: ['React', 'Node.js', 'Python', 'Mobile Apps'],
      successRate: 91,
      clients: 156
    },
    {
      id: 9,
      name: 'Léa Simon',
      role: 'Expert Commercial Senior',
      specialization: 'Consulting Stratégique',
      experience: '11 ans',
      rating: 5.0,
      reviews: 178,
      image: 'https://readdy.ai/api/search-image?query=professional%20french%20businesswoman%20strategy%20consultant%20expert%20smiling%20confident%20modern%20office%20background%20professional%20headshot%20portrait%20clean%20simple%20background&width=400&height=400&seq=comm9&orientation=squarish',
      availability: 'Occupé',
      languages: ['Français', 'Anglais', 'Chinois'],
      expertise: ['Transformation Digitale', 'Innovation', 'Business Model', 'Croissance'],
      successRate: 97,
      clients: 345
    }
  ];

  const filteredCommercials = commercials
    .filter(commercial => {
      const matchesSearch = commercial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          commercial.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialization = selectedSpecialization === 'all' || commercial.specialization === selectedSpecialization;
      const matchesAvailability = selectedAvailability === 'all' || commercial.availability === selectedAvailability;
      return matchesSearch && matchesSpecialization && matchesAvailability;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return parseInt(b.experience) - parseInt(a.experience);
      if (sortBy === 'clients') return b.clients - a.clients;
      return 0;
    });

  const specializations = Array.from(new Set(commercials.map(c => c.specialization)));

  const handleContact = (commercial: Commercial) => {
    setSelectedCommercial(commercial);
    setShowContactModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <i className="ri-phone-line"></i>
              +225 07 XX XX XX XX
            </span>
            <span className="flex items-center gap-2">
              <i className="ri-mail-line"></i>
              contact@komercia.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-teal-200 transition-colors">
              <i className="ri-facebook-fill text-lg"></i>
            </a>
            <a href="#" className="hover:text-teal-200 transition-colors">
              <i className="ri-twitter-fill text-lg"></i>
            </a>
            <a href="#" className="hover:text-teal-200 transition-colors">
              <i className="ri-instagram-line text-lg"></i>
            </a>
            <a href="#" className="hover:text-teal-200 transition-colors">
              <i className="ri-linkedin-fill text-lg"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              onClick={() => window.REACT_APP_NAVIGATE('/end-customers')}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <i className="ri-store-3-fill text-white text-xl"></i>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Komercia
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a 
                onClick={() => window.REACT_APP_NAVIGATE('/end-customers')}
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium cursor-pointer"
              >
                Accueil
              </a>
              <a 
                onClick={() => window.REACT_APP_NAVIGATE('/end-customers/produits')}
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium cursor-pointer"
              >
                Produits
              </a>
              <a 
                onClick={() => window.REACT_APP_NAVIGATE('/end-customers/commercial')}
                className="text-teal-600 font-semibold border-b-2 border-teal-600 pb-1 cursor-pointer"
              >
                Nos Experts
              </a>
              <a 
                onClick={() => window.REACT_APP_NAVIGATE('/end-customers')}
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium cursor-pointer"
              >
                Support
              </a>
              <a 
                onClick={() => window.REACT_APP_NAVIGATE('/end-customers/orders')}
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium cursor-pointer"
              >
                Mes Commandes
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-teal-600 transition-colors">
                <i className="ri-notification-3-line text-xl"></i>
              </button>
              <button className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-teal-600 transition-colors">
                <i className="ri-user-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Nos Experts Commerciaux</h1>
            <p className="text-lg text-teal-50 max-w-2xl mx-auto">
              Découvrez notre équipe d'experts qualifiés prêts à vous accompagner dans vos projets
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Filtres</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Rechercher
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Nom ou spécialisation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                  <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                </div>
              </div>

              {/* Specialization */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Spécialisation
                </label>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                >
                  <option value="all">Toutes les spécialisations</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Disponibilité
                </label>
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                >
                  <option value="all">Tous</option>
                  <option value="Disponible">Disponible</option>
                  <option value="Occupé">Occupé</option>
                  <option value="Hors ligne">Hors ligne</option>
                </select>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Trier par
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                >
                  <option value="rating">Meilleure note</option>
                  <option value="experience">Plus d'expérience</option>
                  <option value="clients">Plus de clients</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialization('all');
                  setSelectedAvailability('all');
                  setSortBy('rating');
                }}
                className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium whitespace-nowrap"
              >
                <i className="ri-refresh-line mr-2"></i>
                Réinitialiser
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-slate-600 text-sm">
                <strong className="text-slate-800">{filteredCommercials.length}</strong> experts trouvés
              </p>
            </div>

            {/* Commercials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCommercials.map(commercial => (
                <div
                  key={commercial.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="w-20 h-20 rounded-full overflow-hidden">
                          <img
                            src={commercial.image}
                            alt={commercial.name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                          commercial.availability === 'Disponible' ? 'bg-green-500' :
                          commercial.availability === 'Occupé' ? 'bg-orange-500' : 'bg-slate-400'
                        }`}></div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-800 mb-1">{commercial.name}</h3>
                        <p className="text-sm text-slate-600 mb-2">{commercial.role}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            <i className="ri-star-fill text-yellow-400 text-sm"></i>
                            <span className="text-sm font-semibold text-slate-800 ml-1">{commercial.rating}</span>
                            <span className="text-xs text-slate-500 ml-1">({commercial.reviews})</span>
                          </div>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-600">{commercial.experience} d'expérience</span>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center px-2 py-1 bg-teal-50 text-teal-700 rounded-md text-xs font-medium whitespace-nowrap">
                            <i className="ri-briefcase-line mr-1"></i>
                            {commercial.specialization}
                          </span>
                        </div>

                        {/* Languages */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {commercial.languages.map(lang => (
                            <span key={lang} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs whitespace-nowrap">
                              {lang}
                            </span>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <i className="ri-user-line text-slate-400 text-sm"></i>
                            <span className="text-xs text-slate-600">{commercial.clients} clients</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <i className="ri-check-line text-green-500 text-sm"></i>
                            <span className="text-xs text-slate-600">{commercial.successRate}% succès</span>
                          </div>
                        </div>

                        {/* Expertise Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {commercial.expertise.slice(0, 3).map(exp => (
                            <span key={exp} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs whitespace-nowrap">
                              {exp}
                            </span>
                          ))}
                          {commercial.expertise.length > 3 && (
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs whitespace-nowrap">
                              +{commercial.expertise.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleContact(commercial)}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-semibold whitespace-nowrap"
                          >
                            <i className="ri-message-3-line mr-2"></i>
                            Contacter
                          </button>
                          <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium whitespace-nowrap">
                            <i className="ri-eye-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && selectedCommercial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={selectedCommercial.image}
                      alt={selectedCommercial.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{selectedCommercial.name}</h3>
                    <p className="text-sm text-slate-600">{selectedCommercial.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    placeholder="Entrez votre nom"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Sujet
                  </label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm">
                    <option>Demande d'information</option>
                    <option>Consultation</option>
                    <option>Devis</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Décrivez votre besoin..."
                    maxLength={500}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none"
                  ></textarea>
                  <p className="text-xs text-slate-500 mt-1">Maximum 500 caractères</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold whitespace-nowrap"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold whitespace-nowrap"
                  >
                    <i className="ri-send-plane-fill mr-2"></i>
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
