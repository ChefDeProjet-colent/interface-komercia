
import { useState } from 'react';
import { Card } from '../../../components/base/Card';
import { Button } from '../../../components/base/Button';
import { Badge } from '../../../components/base/Badge';
import { LoadingButton } from '../../../components/base/LoadingButton';

const availableProducts = [
  {
    id: 1,
    name: "CRM Collaboratif Pro",
    category: "Gestion Client",
    price: "89€/mois",
    originalPrice: "120€/mois",
    image: "https://readdy.ai/api/search-image?query=advanced%20CRM%20software%20interface%20with%20customer%20management%20tools%2C%20sales%20pipeline%20and%20contact%20management%2C%20modern%20business%20application%20design%2C%20professional%20blue%20theme&width=400&height=250&seq=crm-pro&orientation=landscape",
    description: "Solution CRM complète pour optimiser vos relations clients et booster vos ventes avec des fonctionnalités avancées",
    features: ["Suivi des ventes", "Gestion des contacts", "Rapports automatisés", "Intégration email", "Support 24/7"],
    rating: 4.8,
    reviews: 156,
    badge: "Très populaire",
    trialDays: 14,
    category_filter: "crm",
  },
  {
    id: 2,
    name: "Formation Gestion d'Équipes",
    category: "Formation",
    price: "299€",
    image: "https://readdy.ai/api/search-image?query=team%20management%20training%20course%2C%20professional%20business%20coaching%2C%20leadership%20development%2C%20modern%20conference%20room%20with%20presentation%20screen%2C%20corporate%20learning%20environment&width=400&height=250&seq=team-mgmt&orientation=landscape",
    description: "Formation complète en gestion d'équipes et leadership pour managers et dirigeants avec certification",
    features: ["12 modules interactifs", "Certification incluse", "Support 24/7", "Accès à vie", "Coaching personnalisé"],
    rating: 4.9,
    reviews: 89,
    badge: "Certifiant",
    category_filter: "formation",
  },
  {
    id: 3,
    name: "Analytics Business Intelligence",
    category: "Analyse",
    price: "149€/mois",
    originalPrice: "199€/mois",
    image: "https://readdy.ai/api/search-image?query=business%20intelligence%20dashboard%20with%20data%20analytics%2C%20charts%20graphs%20and%20KPI%20metrics%2C%20modern%20data%20visualization%20interface%2C%20professional%20analytics%20platform%2C%20blue%20purple%20gradient&width=400&height=250&seq=analytics-bi&orientation=landscape",
    description: "Plateforme d'analyse de données avec tableaux de bord interactifs, insights IA et prédictions avancées",
    features: ["Tableaux de bord personnalisés", "IA prédictive", "Exports automatisés", "API complète", "Alertes intelligentes"],
    rating: 4.7,
    reviews: 203,
    badge: "Recommandé",
    trialDays: 30,
    category_filter: "analytics",
  },
  {
    id: 4,
    name: "E-commerce Suite Complète",
    category: "E-commerce",
    price: "199€/mois",
    image: "https://readdy.ai/api/search-image?query=e-commerce%20platform%20interface%20with%20online%20store%20management%2C%20product%20catalog%2C%20order%20processing%2C%20modern%20retail%20technology%2C%20professional%20commerce%20tools&width=400&height=250&seq=ecommerce-suite&orientation=landscape",
    description: "Solution e-commerce complète avec gestion des stocks, paiements sécurisés et livraisons optimisées",
    features: ["Boutique en ligne", "Gestion stocks", "Paiements sécurisés", "Multi-devises", "Marketing intégré"],
    rating: 4.6,
    reviews: 134,
    badge: "Premium",
    trialDays: 7,
    category_filter: "ecommerce",
  },
  {
    id: 5,
    name: "Marketing Automation Pro",
    category: "Marketing",
    price: "129€/mois",
    image: "https://readdy.ai/api/search-image?query=marketing%20automation%20platform%20with%20email%20campaigns%2C%20lead%20nurturing%2C%20customer%20journey%20mapping%2C%20modern%20marketing%20tools%20interface%2C%20professional%20design&width=400&height=250&seq=marketing-auto&orientation=landscape",
    description: "Automatisez vos campagnes marketing avec des workflows intelligents et un suivi avancé des performances",
    features: ["Email automation", "Lead scoring", "A/B testing", "Intégrations CRM", "Analytics avancés"],
    rating: 4.5,
    reviews: 178,
    badge: "Tendance",
    trialDays: 21,
    category_filter: "marketing",
  },
  {
    id: 6,
    name: "Comptabilité Simplifiée",
    category: "Finance",
    price: "79€/mois",
    image: "https://readdy.ai/api/search-image?query=accounting%20software%20interface%20with%20financial%20reports%2C%20invoice%20management%2C%20expense%20tracking%2C%20modern%20bookkeeping%20tools%2C%20professional%20finance%20application&width=400&height=250&seq=accounting-simple&orientation=landscape",
    description: "Gérez votre comptabilité facilement avec des outils automatisés et des rapports en temps réel",
    features: ["Facturation automatique", "Rapports financiers", "TVA automatisée", "Banque connectée", "Conformité légale"],
    rating: 4.4,
    reviews: 92,
    badge: "Essentiel",
    trialDays: 15,
    category_filter: "finance",
  },
];

export const ProductsCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = availableProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category_filter === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleStartTrial = (product: any) => {
    setSelectedProduct(product);
    setShowTrialModal(true);
  };

  const handleSubmitTrial = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowTrialModal(false);
    } catch (error) {
      console.error("Error submitting trial:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Bannière publicitaire en haut */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">🛍️ Catalogue Produits & Services</h3>
            <p className="text-green-100">Découvrez nos solutions professionnelles avec essais gratuits</p>
          </div>
          <Button variant="outline" className="bg-white text-green-600 hover:bg-green-50">
            Essai Gratuit
          </Button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Rechercher des produits/services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            >
              <option value="all">Toutes catégories</option>
              <option value="crm">CRM</option>
              <option value="formation">Formation</option>
              <option value="analytics">Analytics</option>
              <option value="ecommerce">E-commerce</option>
              <option value="marketing">Marketing</option>
              <option value="finance">Finance</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Catalogue des produits/services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-product-shop>
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover object-top"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250'%3E%3Crect fill='%23f3f4f6' width='400' height='250'/%3E%3Ctext fill='%236b7280' font-family='sans-serif' font-size='16' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImage non disponible%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute top-4 left-4">
                {product.badge && (
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
                  <span className="text-yellow-500 text-sm">★</span>
                  <span className="text-sm font-medium text-gray-800">{product.rating}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <span className="text-xs text-gray-500">{product.category}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{product.description}</p>
              
              <div className="space-y-2 mb-4">
                {product.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <i className="ri-check-line text-green-500 text-sm"></i>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xl font-bold text-gray-900">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through ml-2">{product.originalPrice}</span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{product.reviews} avis</div>
                  {product.trialDays && (
                    <div className="text-xs text-blue-600">{product.trialDays} jours d'essai</div>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleViewProduct(product)}
                >
                  Voir détails
                </Button>
                {product.trialDays ? (
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleStartTrial(product)}
                  >
                    Essai gratuit
                  </Button>
                ) : (
                  <Button size="sm" className="flex-1">
                    Acheter
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal de détails produit */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{selectedProduct.name}</h2>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover object-top rounded-lg mb-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250'%3E%3Crect fill='%23f3f4f6' width='400' height='250'/%3E%3Ctext fill='%236b7280' font-family='sans-serif' font-size='16' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImage non disponible%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Fonctionnalités incluses :</h4>
                    {selectedProduct.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <i className="ri-check-line text-green-500"></i>
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-3xl font-bold text-gray-900">{selectedProduct.price}</span>
                        {selectedProduct.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">{selectedProduct.originalPrice}</span>
                        )}
                      </div>
                      {selectedProduct.trialDays && (
                        <p className="text-sm text-blue-600">{selectedProduct.trialDays} jours d'essai gratuit</p>
                      )}
                    </div>
                    <div className="space-y-3">
                      {selectedProduct.trialDays ? (
                        <Button
                          className="w-full"
                          onClick={() => {
                            setShowProductModal(false);
                            handleStartTrial(selectedProduct);
                          }}
                        >
                          <i className="ri-play-circle-line mr-2"></i>
                          Commencer l'essai gratuit
                        </Button>
                      ) : (
                        <Button className="w-full">
                          <i className="ri-shopping-cart-line mr-2"></i>
                          Acheter maintenant
                        </Button>
                      )}
                      <Button variant="outline" className="w-full">
                        <i className="ri-message-line mr-2"></i>
                        Contacter un commercial
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'essai gratuit */}
      {showTrialModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Essai Gratuit</h2>
                <button
                  onClick={() => setShowTrialModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-gift-line text-green-600 text-2xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{selectedProduct.name}</h3>
                <p className="text-gray-600">Essai gratuit de {selectedProduct.trialDays} jours</p>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Inclus dans votre essai :</h4>
                  <ul className="space-y-1">
                    {selectedProduct.features.slice(0, 3).map((feature: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-blue-800">
                        <i className="ri-check-line"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowTrialModal(false)}>
                    Annuler
                  </Button>
                  <LoadingButton
                    onClick={handleSubmitTrial}
                    isLoading={isLoading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Activer l'essai
                  </LoadingButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsCatalog;
