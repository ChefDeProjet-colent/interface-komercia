
import { useState } from 'react';
import { Card } from '../../../components/base/Card';
import { Button } from '../../../components/base/Button';
import { Badge } from '../../../components/base/Badge';
import { LoadingButton } from '../../../components/base/LoadingButton';

interface Commercial {
  id: number;
  name: string;
  specialty: string;
  zone: string;
  experience: string;
  rating: number;
  reviews: number;
  satisfaction: string;
  languages: string[];
  certifications: string[];
  availability: string;
  image: string;
  description: string;
  hourlyRate: string;
  responseTime: string;
}

const commercials: Commercial[] = [
  {
    id: 1,
    name: "Jean Dupont",
    specialty: "Spécialiste CRM & Ventes",
    zone: "France & Belgique",
    experience: "8 ans",
    rating: 4.9,
    reviews: 127,
    satisfaction: "98%",
    languages: ["Français", "Anglais"],
    certifications: ["Salesforce", "HubSpot", "Microsoft Dynamics"],
    availability: "Disponible",
    image: "https://readdy.ai/api/search-image?query=professional%20business%20consultant%20man%20in%20modern%20office%2C%20friendly%20expert%20advisor%2C%20business%20suit%2C%20confident%20smile%2C%20corporate%20headshot%20style%2C%20professional%20lighting&width=150&height=150&seq=jean-dupont&orientation=squarish",
    description: "Expert en solutions CRM avec une approche personnalisée pour chaque client. Spécialisé dans l'optimisation des processus de vente.",
    hourlyRate: "95€/h",
    responseTime: "< 2h",
  },
  {
    id: 2,
    name: "Marie Laurent",
    specialty: "Marketing Digital & Analytics",
    zone: "Europe",
    experience: "10 ans",
    rating: 4.8,
    reviews: 156,
    satisfaction: "97%",
    languages: ["Français", "Anglais", "Espagnol"],
    certifications: ["Google Ads", "Facebook Blueprint", "Google Analytics"],
    availability: "Occupée",
    image: "https://readdy.ai/api/search-image?query=professional%20business%20woman%20consultant%20in%20modern%20office%2C%20marketing%20expert%2C%20business%20attire%2C%20confident%20professional%2C%20corporate%20headshot%20style%2C%20friendly%20demeanor&width=150&height=150&seq=marie-laurent&orientation=squarish",
    description: "Spécialiste en stratégies marketing digitales et automation. Experte en analyse de données et optimisation ROI.",
    hourlyRate: "110€/h",
    responseTime: "< 4h",
  },
  {
    id: 3,
    name: "Pierre Martin",
    specialty: "E-commerce & Solutions Digitales",
    zone: "France",
    experience: "7 ans",
    rating: 4.7,
    reviews: 98,
    satisfaction: "96%",
    languages: ["Français", "Anglais"],
    certifications: ["Shopify Expert", "WooCommerce", "Magento"],
    availability: "Disponible",
    image: "https://readdy.ai/api/search-image?query=professional%20business%20consultant%20man%2C%20e-commerce%20expert%2C%20modern%20office%20background%2C%20business%20casual%20attire%2C%20approachable%20professional%2C%20corporate%20photography&width=150&height=150&seq=pierre-martin&orientation=squarish",
    description: "Expert en solutions e-commerce et transformation digitale. Accompagne les entreprises dans leur digitalisation.",
    hourlyRate: "85€/h",
    responseTime: "< 3h",
  },
  {
    id: 4,
    name: "Sophie Dubois",
    specialty: "Formation & Développement RH",
    zone: "International",
    experience: "12 ans",
    rating: 4.9,
    reviews: 203,
    satisfaction: "99%",
    languages: ["Français", "Anglais", "Allemand"],
    certifications: ["CIPD", "Scrum Master", "PMP"],
    availability: "Disponible",
    image: "https://readdy.ai/api/search-image?query=professional%20business%20woman%20trainer%2C%20corporate%20learning%20expert%2C%20modern%20training%20environment%2C%20professional%20attire%2C%20confident%20educator%2C%20business%20headshot&width=150&height=150&seq=sophie-dubois&orientation=squarish",
    description: "Experte en formation professionnelle et développement des compétences. Spécialisée dans la transformation RH.",
    hourlyRate: "120€/h",
    responseTime: "< 1h",
  },
];

export const CommercialsSection = () => {
  const [selectedCommercial, setSelectedCommercial] = useState<Commercial | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });

  const handleContactCommercial = (commercial: Commercial) => {
    setSelectedCommercial(commercial);
    setShowContactModal(true);
    // Reset form when opening modal
    setFormData({ subject: '', message: '' });
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCommercial || !formData.subject.trim() || !formData.message.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Here you would normally send the data to your backend
      console.log('Contact form submitted:', {
        commercial: selectedCommercial.name,
        subject: formData.subject,
        message: formData.message
      });
      
      setIsLoading(false);
      setShowContactModal(false);
      setFormData({ subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setIsLoading(false);
      // You could show an error message to the user here
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-8">
      {/* Bannière publicitaire en haut */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">👥 Nos Experts à Votre Service</h3>
            <p className="text-indigo-100">Consultations personnalisées avec nos spécialistes certifiés</p>
          </div>
          <Button variant="outline" className="bg-white text-indigo-600 hover:bg-indigo-50">
            Réserver une Consultation
          </Button>
        </div>
      </div>

      {/* Statistiques commerciaux */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Commerciaux Disponibles</p>
              <p className="text-2xl font-bold text-blue-900">4</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <i className="ri-user-line text-white text-xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Consultations ce Mois</p>
              <p className="text-2xl font-bold text-green-900">8</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <i className="ri-calendar-check-line text-white text-xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Satisfaction Moyenne</p>
              <p className="text-2xl font-bold text-purple-900">4.8★</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <i className="ri-star-line text-white text-xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Temps de Réponse</p>
              <p className="text-2xl font-bold text-orange-900">&lt; 2h</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <i className="ri-time-line text-white text-xl"></i>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des commerciaux disponibles */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Commerciaux Disponibles</h3>
              <div className="flex space-x-2">
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                  <option>Toutes spécialités</option>
                  <option>CRM & Ventes</option>
                  <option>Marketing Digital</option>
                  <option>E-commerce</option>
                  <option>Formation</option>
                </select>
              </div>
            </div>
            <div className="space-y-6">
              {commercials.map((commercial) => (
                <div
                  key={commercial.id}
                  className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={commercial.image}
                    alt={commercial.name}
                    className="w-20 h-20 rounded-lg object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/150?text=Avatar';
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-medium text-gray-900">{commercial.name}</h4>
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          commercial.availability === "Disponible"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {commercial.availability}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-blue-600 mb-2">{commercial.specialty}</p>
                    <p className="text-sm text-gray-600 mb-3">{commercial.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <i className="ri-map-pin-line text-gray-400 text-sm"></i>
                          <span className="text-sm text-gray-600">{commercial.zone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <i className="ri-time-line text-gray-400 text-sm"></i>
                          <span className="text-sm text-gray-600">{commercial.experience} d'expérience</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <i className="ri-star-line text-yellow-500 text-sm"></i>
                          <span className="text-sm text-gray-600">{commercial.rating}★ ({commercial.reviews} avis)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <i className="ri-money-euro-circle-line text-gray-400 text-sm"></i>
                          <span className="text-sm text-gray-600">{commercial.hourlyRate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        size="sm"
                        onClick={() => handleContactCommercial(commercial)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <i className="ri-message-line mr-2"></i>
                        Contacter
                      </Button>
                      <Button size="sm" variant="outline">
                        <i className="ri-calendar-line mr-2"></i>
                        Planifier RDV
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Commercial Recommandé</h3>
            <div className="text-center">
              <img
                src={commercials[0].image}
                alt={commercials[0].name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/150?text=Avatar';
                }}
              />
              <h4 className="font-medium text-gray-900 mb-1">{commercials[0].name}</h4>
              <p className="text-sm text-blue-600 mb-2">{commercials[0].specialty}</p>
              <div className="flex items-center justify-center space-x-1 mb-3">
                <span className="text-yellow-500">★</span>
                <span className="text-sm text-gray-600">{commercials[0].rating}</span>
                <span className="text-xs text-gray-500">({commercials[0].reviews} avis)</span>
              </div>
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => handleContactCommercial(commercials[0])}
              >
                Contacter maintenant
              </Button>
            </div>
          </Card>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white">
            <div className="text-center">
              <h4 className="font-bold mb-2">📞 Support Premium 24/7</h4>
              <p className="text-sm text-orange-100 mb-4">Assistance prioritaire avec nos experts</p>
              <Button variant="outline" size="sm" className="bg-white text-orange-600 hover:bg-orange-50">
                Découvrir Premium
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de contact */}
      {showContactModal && selectedCommercial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Contacter {selectedCommercial.name}</h2>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={selectedCommercial.image}
                  alt={selectedCommercial.name}
                  className="w-16 h-16 rounded-lg object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/150?text=Avatar';
                  }}
                />
                <div>
                  <h3 className="font-medium text-gray-900">{selectedCommercial.name}</h3>
                  <p className="text-sm text-blue-600">{selectedCommercial.specialty}</p>
                </div>
              </div>
              <form onSubmit={handleSubmitContact} className="space-y-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Ex: Consultation CRM pour mon entreprise"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-gray-500">({formData.message.length}/500)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Décrivez vos besoins..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={500}
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowContactModal(false)}>
                    Annuler
                  </Button>
                  <LoadingButton
                    type="submit"
                    isLoading={isLoading}
                    disabled={!formData.subject.trim() || !formData.message.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Envoyer le message
                  </LoadingButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommercialsSection;
