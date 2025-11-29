import { useState } from 'react';
import { Card } from '../../../components/base/Card';
import { Button } from '../../../components/base/Button';
import { LoadingButton } from '../../../components/base/LoadingButton';
import { AdBanner } from '../../../components/feature/AdBanner';

export default function ProductsServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: 'all', label: 'Tous les produits', icon: 'ri-apps-line' },
    { id: 'crm', label: 'CRM', icon: 'ri-contacts-line' },
    { id: 'marketing', label: 'Marketing', icon: 'ri-megaphone-line' },
    { id: 'ecommerce', label: 'E-commerce', icon: 'ri-shopping-cart-line' },
    { id: 'analytics', label: 'Analytics', icon: 'ri-bar-chart-line' }
  ];

  const products = [
    {
      id: 1,
      name: 'CRM Enterprise Pro',
      category: 'crm',
      description: 'Solution CRM complète pour grandes entreprises avec automation avancée',
      price: '299€/mois',
      trialDays: 14,
      features: ['Gestion contacts illimitée', 'Automation des ventes', 'Rapports avancés', 'API complète'],
      rating: 4.8,
      reviews: 234,
      image: 'https://readdy.ai/api/search-image?query=modern%20CRM%20dashboard%20interface%20on%20computer%20screen%2C%20professional%20business%20software%2C%20clean%20design%2C%20data%20visualization%20charts&width=400&height=300&seq=8&orientation=landscape',
      status: 'available',
      popularity: 'Très populaire'
    },
    {
      id: 2,
      name: 'Marketing Automation Suite',
      category: 'marketing',
      description: 'Automatisez vos campagnes marketing et optimisez votre ROI',
      price: '199€/mois',
      trialDays: 7,
      features: ['Email marketing', 'Lead scoring', 'A/B testing', 'Intégrations sociales'],
      rating: 4.6,
      reviews: 156,
      image: 'https://readdy.ai/api/search-image?query=marketing%20automation%20dashboard%20with%20email%20campaigns%20and%20analytics%2C%20modern%20interface%20design%2C%20professional%20workspace&width=400&height=300&seq=9&orientation=landscape',
      status: 'trial',
      popularity: 'Nouveau'
    },
    {
      id: 3,
      name: 'E-commerce Platform',
      category: 'ecommerce',
      description: 'Plateforme e-commerce complète avec paiements intégrés',
      price: '149€/mois',
      trialDays: 30,
      features: ['Boutique en ligne', 'Gestion stock', 'Paiements sécurisés', 'Multi-devises'],
      rating: 4.7,
      reviews: 189,
      image: 'https://readdy.ai/api/search-image?query=ecommerce%20platform%20dashboard%20showing%20online%20store%20management%2C%20product%20catalog%2C%20sales%20analytics%2C%20modern%20interface&width=400&height=300&seq=10&orientation=landscape',
      status: 'purchased',
      popularity: 'Recommandé'
    },
    {
      id: 4,
      name: 'Business Analytics Pro',
      category: 'analytics',
      description: 'Analysez vos données business avec des insights avancés',
      price: '249€/mois',
      trialDays: 14,
      features: ['Tableaux de bord', 'Prédictions IA', 'Rapports automatisés', 'Connecteurs data'],
      rating: 4.9,
      reviews: 98,
      image: 'https://readdy.ai/api/search-image?query=business%20analytics%20dashboard%20with%20charts%20graphs%20and%20data%20visualization%2C%20professional%20BI%20interface%2C%20modern%20design&width=400&height=300&seq=11&orientation=landscape',
      status: 'available',
      popularity: 'Premium'
    },
    {
      id: 5,
      name: 'Customer Support Hub',
      category: 'crm',
      description: 'Centre de support client avec chat et ticketing',
      price: '99€/mois',
      trialDays: 14,
      features: ['Chat en direct', 'Système de tickets', 'Base de connaissances', 'Satisfaction client'],
      rating: 4.5,
      reviews: 167,
      image: 'https://readdy.ai/api/search-image?query=customer%20support%20dashboard%20interface%20with%20chat%20system%20and%20ticket%20management%2C%20professional%20help%20desk%20software&width=400&height=300&seq=12&orientation=landscape',
      status: 'available',
      popularity: 'Essentiel'
    },
    {
      id: 6,
      name: 'Social Media Manager',
      category: 'marketing',
      description: 'Gérez tous vos réseaux sociaux depuis une interface unique',
      price: '79€/mois',
      trialDays: 7,
      features: ['Programmation posts', 'Analytics sociaux', 'Gestion communauté', 'Monitoring mentions'],
      rating: 4.4,
      reviews: 203,
      image: 'https://readdy.ai/api/search-image?query=social%20media%20management%20dashboard%20showing%20multiple%20social%20platforms%2C%20content%20scheduling%2C%20analytics%20charts&width=400&height=300&seq=13&orientation=landscape',
      status: 'trial',
      popularity: 'Tendance'
    }
  ];

  const purchaseHistory = [
    {
      id: 1,
      product: 'E-commerce Platform',
      date: '08 Nov 2024',
      amount: '149€',
      status: 'Actif',
      invoice: 'INV-2024-001'
    },
    {
      id: 2,
      product: 'CRM Enterprise Pro',
      date: '15 Oct 2024',
      amount: '299€',
      status: 'Actif',
      invoice: 'INV-2024-002'
    },
    {
      id: 3,
      product: 'Business Analytics Pro',
      date: '22 Sep 2024',
      amount: '249€',
      status: 'Expiré',
      invoice: 'INV-2024-003'
    }
  ];

  const activeTrials = [
    {
      id: 1,
      product: 'Marketing Automation Suite',
      daysLeft: 3,
      startDate: '09 Nov 2024',
      endDate: '16 Nov 2024'
    },
    {
      id: 2,
      product: 'Social Media Manager',
      daysLeft: 5,
      startDate: '11 Nov 2024',
      endDate: '18 Nov 2024'
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleStartTrial = async (product) => {
    setIsLoading(true);
    setSelectedProduct(product);
    setIsTrialModalOpen(true);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handlePurchase = async (product) => {
    setIsLoading(true);
    setSelectedProduct(product);
    setIsPurchaseModalOpen(true);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Filtres par catégorie */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Catégories</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <i className={`${category.icon} text-lg`}></i>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Catalogue des produits */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      product.popularity === 'Très populaire' ? 'bg-red-100 text-red-800' :
                      product.popularity === 'Nouveau' ? 'bg-green-100 text-green-800' :
                      product.popularity === 'Recommandé' ? 'bg-blue-100 text-blue-800' :
                      product.popularity === 'Premium' ? 'bg-purple-100 text-purple-800' :
                      product.popularity === 'Tendance' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {product.popularity}
                    </span>
                  </div>
                  {product.status === 'trial' && (
                    <div className="absolute top-2 left-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Essai en cours
                      </span>
                    </div>
                  )}
                  {product.status === 'purchased' && (
                    <div className="absolute top-2 left-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Acheté
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{product.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} text-yellow-400 text-sm`}></i>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <i className="ri-check-line text-green-600 text-sm"></i>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    {product.status === 'available' && (
                      <>
                        <LoadingButton
                          onClick={() => handleStartTrial(product)}
                          loading={isLoading && selectedProduct?.id === product.id}
                          variant="outline"
                          className="flex-1"
                        >
                          <i className="ri-timer-line mr-2"></i>
                          Essai {product.trialDays}j
                        </LoadingButton>
                        <LoadingButton
                          onClick={() => handlePurchase(product)}
                          loading={isLoading && selectedProduct?.id === product.id}
                          className="flex-1"
                        >
                          <i className="ri-shopping-cart-line mr-2"></i>
                          Acheter
                        </LoadingButton>
                      </>
                    )}
                    {product.status === 'trial' && (
                      <Button className="w-full" variant="outline">
                        <i className="ri-settings-line mr-2"></i>
                        Gérer l'essai
                      </Button>
                    )}
                    {product.status === 'purchased' && (
                      <Button className="w-full">
                        <i className="ri-external-link-line mr-2"></i>
                        Accéder
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar avec essais et historique */}
        <div className="space-y-6">
          {/* Essais actifs */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Essais Actifs</h3>
            <div className="space-y-4">
              {activeTrials.map((trial) => (
                <div key={trial.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-gray-900">{trial.product}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {trial.daysLeft} jours restants
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {trial.startDate} - {trial.endDate}
                  </p>
                  <Button size="sm" className="w-full mt-3">
                    Passer à l'abonnement
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Historique des achats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique des Achats</h3>
            <div className="space-y-4">
              {purchaseHistory.map((purchase) => (
                <div key={purchase.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{purchase.product}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      purchase.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {purchase.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{purchase.amount}</p>
                  <p className="text-xs text-gray-500 mt-1">{purchase.date}</p>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    <i className="ri-download-line mr-2"></i>
                    Télécharger facture
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Bannière publicitaire */}
          <AdBanner 
            placement="middle"
            userType="client"
            context="products-sidebar"
          />
        </div>
      </div>

      {/* Modal d'essai gratuit */}
      {isTrialModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Démarrer l'essai gratuit</h3>
              <button 
                onClick={() => setIsTrialModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-20 h-20 object-cover rounded-lg mx-auto mb-3"
                />
                <h4 className="font-semibold text-gray-900">{selectedProduct.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{selectedProduct.description}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">Votre essai gratuit inclut :</h5>
                <ul className="space-y-1">
                  {selectedProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-blue-800">
                      <i className="ri-check-line"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Essai gratuit de <strong>{selectedProduct.trialDays} jours</strong>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Aucune carte de crédit requise
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsTrialModalOpen(false)}
              >
                Annuler
              </Button>
              <LoadingButton 
                loading={isLoading}
                className="flex-1"
                onClick={() => {
                  setTimeout(() => {
                    setIsTrialModalOpen(false);
                    setIsLoading(false);
                  }, 2000);
                }}
              >
                Démarrer l'essai
              </LoadingButton>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'achat */}
      {isPurchaseModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Finaliser l'achat</h3>
              <button 
                onClick={() => setIsPurchaseModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-20 h-20 object-cover rounded-lg mx-auto mb-3"
                />
                <h4 className="font-semibold text-gray-900">{selectedProduct.name}</h4>
                <p className="text-2xl font-bold text-blue-600 mt-2">{selectedProduct.price}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">Récapitulatif :</h5>
                <div className="flex justify-between text-sm">
                  <span>Abonnement mensuel</span>
                  <span>{selectedProduct.price}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>TVA (20%)</span>
                  <span>{Math.round(parseInt(selectedProduct.price) * 0.2)}€</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{Math.round(parseInt(selectedProduct.price) * 1.2)}€</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mode de paiement</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                  <option>Carte de crédit ****1234</option>
                  <option>PayPal</option>
                  <option>Virement bancaire</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsPurchaseModalOpen(false)}
              >
                Annuler
              </Button>
              <LoadingButton 
                loading={isLoading}
                className="flex-1"
                onClick={() => {
                  setTimeout(() => {
                    setIsPurchaseModalOpen(false);
                    setIsLoading(false);
                  }, 2000);
                }}
              >
                Confirmer l'achat
              </LoadingButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add named export to fix import error
export { ProductsServicesSection };
