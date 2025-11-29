
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

      {/* Résumé des activités */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <i className="ri-shopping-bag-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Services Actifs</p>
              <p className="text-2xl font-bold text-blue-900">5</p>
              <p className="text-xs text-blue-500">+2 ce mois</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <i className="ri-time-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Essais en Cours</p>
              <p className="text-2xl font-bold text-green-900">2</p>
              <p className="text-xs text-green-500">Expire dans 12j</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <i className="ri-team-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">Consultations</p>
              <p className="text-2xl font-bold text-purple-900">8</p>
              <p className="text-xs text-purple-500">+3 cette semaine</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <i className="ri-customer-service-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-orange-600">Support Tickets</p>
              <p className="text-2xl font-bold text-orange-900">1</p>
              <p className="text-xs text-orange-500">En cours</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Applications/Services récemment consultés */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Applications/Services Récemment Consultés
              </h3>
              <Button variant="outline" size="sm" onClick={() => onTabChange("products")}>
                Voir tout
                <i className="ri-arrow-right-line ml-2"></i>
              </Button>
            </div>
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      {product.badge && (
                        <Badge variant="secondary" className="text-xs">{product.badge}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium text-blue-600">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                        )}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          product.status === "Consulté"
                            ? "bg-gray-100 text-gray-700"
                            : product.status === "Ajouté au panier"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.status}
                      </span>
                      <span className="text-xs text-gray-500">{product.lastViewed}</span>
                      {product.rating && (
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-yellow-500">★</span>
                          <span className="text-xs text-gray-600">{product.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Voir détails
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Historique des interactions avec les commerciaux */}
          <Card className="p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Historique des Interactions avec les Commerciaux</h3>
              <Button variant="outline" size="sm" onClick={() => onTabChange("history")}>
                Voir tout
                <i className="ri-arrow-right-line ml-2"></i>
              </Button>
            </div>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  commercial: "Jean Dupont",
                  type: "Consultation CRM",
                  date: "15 Jan 2024",
                  time: "14:30",
                  status: "Terminé",
                  duration: "45 min",
                  rating: 4.9,
                },
                {
                  id: 2,
                  commercial: "Marie Laurent",
                  type: "Démonstration Analytics",
                  date: "12 Jan 2024",
                  time: "10:00",
                  status: "Terminé",
                  duration: "60 min",
                  rating: 4.8,
                },
                {
                  id: 3,
                  commercial: "Sophie Dubois",
                  type: "Formation équipe",
                  date: "10 Jan 2024",
                  time: "09:00",
                  status: "Planifié",
                  duration: "120 min",
                  rating: null,
                },
              ].map((interaction) => (
                <div
                  key={interaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="ri-user-line text-blue-600"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{interaction.commercial}</h4>
                      <p className="text-sm text-gray-600">{interaction.type}</p>
                      <p className="text-xs text-gray-500">
                        {interaction.date} à {interaction.time} • {interaction.duration}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        interaction.status === "Terminé"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {interaction.status}
                    </span>
                    {interaction.rating && (
                      <div className="flex items-center justify-end space-x-1 mt-1">
                        <span className="text-xs text-yellow-500">★</span>
                        <span className="text-xs text-gray-600">{interaction.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar avec notifications et actions rapides */}
        <div className="space-y-6">
          {/* Notifications sur les offres ou promotions en cours */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    notification.type === "warning"
                      ? "bg-orange-50 border-orange-400"
                      : notification.type === "success"
                      ? "bg-green-50 border-green-400"
                      : "bg-blue-50 border-blue-400"
                  } ${notification.urgent ? "ring-2 ring-red-200" : ""}`}
                >
                  <div className="flex items-start">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        notification.type === "warning"
                          ? "bg-orange-100"
                          : notification.type === "success"
                          ? "bg-green-100"
                          : "bg-blue-100"
                      }`}
                    >
                      <i
                        className={`${
                          notification.type === "warning"
                            ? "ri-alert-line text-orange-600"
                            : notification.type === "success"
                            ? "ri-check-line text-green-600"
                            : "ri-information-line text-blue-600"
                        } text-sm`}
                      ></i>
                    </div>
                    <div className="ml-3 flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        <Button size="sm" variant="outline">
                          {notification.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Accès rapide */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Accès Rapide</h3>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => onTabChange("commercials")}
              >
                <i className="ri-team-line mr-3"></i>
                Contacter un Commercial
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => onTabChange("products")}
              >
                <i className="ri-shopping-bag-line mr-3"></i>
                Parcourir le Catalogue
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => onTabChange("support")}
              >
                <i className="ri-customer-service-line mr-3"></i>
                Ouvrir un Ticket
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => onTabChange("history")}
              >
                <i className="ri-file-text-line mr-3"></i>
                Mes Factures
              </Button>
            </div>
          </Card>

          {/* Bannière publicitaire sidebar */}
          <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-6 text-white">
            <div className="text-center">
              <h4 className="font-bold mb-2">🎯 Services de Conseil Personnalisés</h4>
              <p className="text-sm text-green-100 mb-4">Bénéficiez de l'expertise de nos consultants</p>
              <Button variant="outline" size="sm" className="bg-white text-green-600 hover:bg-green-50">
                Consulter un Expert
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bannière publicitaire en bas */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">💼 Solutions Entreprise Avancées</h3>
            <p className="text-purple-100">Des solutions sur-mesure pour les PME et grandes entreprises</p>
          </div>
          <Button variant="outline" className="bg-white text-purple-600 hover:bg-purple-50">
            Voir Solutions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EndCustomerDashboard;
