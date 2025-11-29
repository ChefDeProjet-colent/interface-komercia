
import { useState } from 'react';
import { Card } from '../../../components/base/Card';
import { Button } from '../../../components/base/Button';
import { LoadingButton } from '../../../components/base/LoadingButton';
import { AdBanner } from '../../../components/feature/AdBanner';

export default function SalesTeamSection() {
  const [selectedFilters, setSelectedFilters] = useState({
    specialization: '',
    location: '',
    availability: ''
  });
  const [selectedSalesperson, setSelectedSalesperson] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const salesTeam = [
    {
      id: 1,
      name: 'Marie Dubois',
      title: 'Spécialiste CRM & Automation',
      specialization: 'CRM',
      location: 'Paris, France',
      availability: 'Disponible',
      rating: 4.9,
      reviews: 127,
      experience: '8 ans d\'expérience',
      description: 'Experte en solutions CRM pour PME et grandes entreprises. Spécialisée dans l\'automatisation des processus de vente.',
      image: 'https://readdy.ai/api/search-image?query=professional%20business%20woman%20consultant%20smiling%20in%20modern%20office%2C%20CRM%20specialist%2C%20clean%20background%2C%20professional%20headshot%2C%20confident%20expression&width=300&height=300&seq=4&orientation=squarish',
      languages: ['Français', 'Anglais'],
      certifications: ['Salesforce Certified', 'HubSpot Expert']
    },
    {
      id: 2,
      name: 'Thomas Martin',
      title: 'Consultant Marketing Digital',
      specialization: 'Marketing',
      location: 'Lyon, France',
      availability: 'Occupé',
      rating: 4.7,
      reviews: 89,
      experience: '6 ans d\'expérience',
      description: 'Spécialiste en stratégies marketing digital et automation. Aide les entreprises à optimiser leur ROI publicitaire.',
      image: 'https://readdy.ai/api/search-image?query=professional%20business%20man%20consultant%20in%20modern%20office%2C%20marketing%20specialist%2C%20clean%20background%2C%20professional%20headshot%2C%20friendly%20smile&width=300&height=300&seq=5&orientation=squarish',
      languages: ['Français', 'Anglais', 'Espagnol'],
      certifications: ['Google Ads Certified', 'Facebook Blueprint']
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      title: 'Experte Solutions E-commerce',
      specialization: 'E-commerce',
      location: 'Bordeaux, France',
      availability: 'Disponible',
      rating: 4.8,
      reviews: 156,
      experience: '10 ans d\'expérience',
      description: 'Consultante senior en solutions e-commerce. Accompagne les entreprises dans leur transformation digitale.',
      image: 'https://readdy.ai/api/search-image?query=professional%20business%20woman%20consultant%20expert%20in%20ecommerce%2C%20modern%20office%20background%2C%20clean%20professional%20lighting%2C%20confident%20pose&width=300&height=300&seq=6&orientation=squarish',
      languages: ['Français', 'Anglais'],
      certifications: ['Shopify Expert', 'WooCommerce Specialist']
    },
    {
      id: 4,
      name: 'Pierre Leroy',
      title: 'Consultant Analytics & BI',
      specialization: 'Analytics',
      location: 'Lille, France',
      availability: 'Disponible',
      rating: 4.6,
      reviews: 73,
      experience: '5 ans d\'expérience',
      description: 'Spécialiste en business intelligence et analyse de données. Transforme vos données en insights actionnables.',
      image: 'https://readdy.ai/api/search-image?query=professional%20business%20man%20consultant%20analytics%20specialist%2C%20modern%20office%20with%20data%20screens%2C%20clean%20background%2C%20professional%20appearance&width=300&height=300&seq=7&orientation=squarish',
      languages: ['Français', 'Anglais'],
      certifications: ['Google Analytics Certified', 'Tableau Expert']
    }
  ];

  const interactions = [
    {
      id: 1,
      salesperson: 'Marie Dubois',
      type: 'Consultation',
      subject: 'Implémentation CRM',
      date: '15 Nov 2024',
      status: 'Terminé',
      duration: '45 min'
    },
    {
      id: 2,
      salesperson: 'Thomas Martin',
      type: 'Devis',
      subject: 'Campagne Marketing Automation',
      date: '12 Nov 2024',
      status: 'En attente',
      duration: '30 min'
    },
    {
      id: 3,
      salesperson: 'Sarah Johnson',
      type: 'Démonstration',
      subject: 'Solution E-commerce',
      date: '08 Nov 2024',
      status: 'Planifié',
      duration: '60 min'
    }
  ];

  const handleContact = async (salesperson) => {
    setIsLoading(true);
    setSelectedSalesperson(salesperson);
    setIsContactModalOpen(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const filteredSalesTeam = salesTeam.filter(person => {
    return (
      (!selectedFilters.specialization || person.specialization === selectedFilters.specialization) &&
      (!selectedFilters.location || person.location.includes(selectedFilters.location)) &&
      (!selectedFilters.availability || person.availability === selectedFilters.availability)
    );
  });

  return (
    <div className="space-y-8">
      {/* Filtres */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtrer les Commerciaux</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Spécialisation</label>
            <select 
              value={selectedFilters.specialization}
              onChange={(e) => setSelectedFilters({...selectedFilters, specialization: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            >
              <option value="">Toutes les spécialisations</option>
              <option value="CRM">CRM & Automation</option>
              <option value="Marketing">Marketing Digital</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Analytics">Analytics & BI</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
            <select 
              value={selectedFilters.location}
              onChange={(e) => setSelectedFilters({...selectedFilters, location: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            >
              <option value="">Toutes les villes</option>
              <option value="Paris">Paris</option>
              <option value="Lyon">Lyon</option>
              <option value="Bordeaux">Bordeaux</option>
              <option value="Lille">Lille</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Disponibilité</label>
            <select 
              value={selectedFilters.availability}
              onChange={(e) => setSelectedFilters({...selectedFilters, availability: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            >
              <option value="">Tous les statuts</option>
              <option value="Disponible">Disponible</option>
              <option value="Occupé">Occupé</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des commerciaux */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSalesTeam.map((person) => (
              <Card key={person.id} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <img 
                    src={person.image} 
                    alt={person.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">{person.name}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        person.availability === 'Disponible' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {person.availability}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{person.title}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`ri-star-${i < Math.floor(person.rating) ? 'fill' : 'line'} text-yellow-400 text-sm`}></i>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{person.rating} ({person.reviews} avis)</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{person.experience} • {person.location}</p>
                    <p className="text-sm text-gray-700 mb-4">{person.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex flex-wrap gap-1">
                        {person.languages.map((lang, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            {lang}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {person.certifications.map((cert, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <LoadingButton
                      onClick={() => handleContact(person)}
                      loading={isLoading && selectedSalesperson?.id === person.id}
                      className="w-full"
                      disabled={person.availability === 'Occupé'}
                    >
                      <i className="ri-message-line mr-2"></i>
                      Contacter
                    </LoadingButton>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Historique des interactions */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique des Interactions</h3>
            <div className="space-y-4">
              {interactions.map((interaction) => (
                <div key={interaction.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{interaction.salesperson}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      interaction.status === 'Terminé' ? 'bg-green-100 text-green-800' :
                      interaction.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {interaction.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{interaction.subject}</p>
                  <p className="text-xs text-gray-500">{interaction.type} • {interaction.duration}</p>
                  <p className="text-xs text-gray-500">{interaction.date}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <i className="ri-history-line mr-2"></i>
              Voir tout l'historique
            </Button>
          </Card>

          {/* Bannière publicitaire */}
          <AdBanner 
            placement="middle"
            userType="client"
            context="sales-team-sidebar"
          />
        </div>
      </div>

      {/* Modal de contact */}
      {isContactModalOpen && selectedSalesperson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Contacter {selectedSalesperson.name}</h3>
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                <input 
                  type="text" 
                  placeholder="Ex: Consultation CRM pour mon entreprise"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Décrivez vos besoins et vos objectifs..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  maxLength={500}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Préférence de contact</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                  <option>Email</option>
                  <option>Téléphone</option>
                  <option>Visioconférence</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsContactModalOpen(false)}
              >
                Annuler
              </Button>
              <LoadingButton 
                loading={isLoading}
                className="flex-1"
                onClick={() => {
                  setTimeout(() => {
                    setIsContactModalOpen(false);
                    setIsLoading(false);
                  }, 2000);
                }}
              >
                Envoyer
              </LoadingButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { SalesTeamSection };
