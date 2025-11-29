
import { useState } from 'react';
import { Card } from '../../../components/base/Card';
import { Button } from '../../../components/base/Button';
import { Badge } from '../../../components/base/Badge';

export const HistorySection = () => {
  return (
    <div className="space-y-8">
      {/* Bannière publicitaire en haut */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">📊 Historique & Recommandations</h3>
            <p className="text-orange-100">Consultez votre historique et découvrez nos recommandations personnalisées</p>
          </div>
          <Button variant="outline" className="bg-white text-orange-600 hover:bg-orange-50">
            Exporter Données
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Historique des interactions */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Historique des Interactions</h3>
              <div className="flex space-x-2">
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                  <option>Tous les types</option>
                  <option>Consultations</option>
                  <option>Commandes</option>
                  <option>Support</option>
                </select>
                <Button size="sm" variant="outline">
                  Exporter
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  type: "Commande",
                  title: "CRM Collaboratif Pro",
                  description: "Achat d'un abonnement mensuel au CRM collaboratif",
                  date: "15 Jan 2024, 14:30",
                  status: "Livré",
                  statusColor: "bg-green-100 text-green-800",
                  icon: "ri-shopping-bag-line",
                  color: "green",
                },
                {
                  type: "Consultation",
                  title: "Formation en Prospection Commerciale",
                  description: "Consultation avec Jean Dupont - Spécialiste CRM",
                  date: "12 Jan 2024, 10:15",
                  status: "Terminé",
                  statusColor: "bg-blue-100 text-blue-800",
                  icon: "ri-user-line",
                  color: "blue",
                },
                {
                  type: "Support",
                  title: "Problème de connexion CRM",
                  description: "Ticket #2024-001 - Résolution problème sync",
                  date: "10 Jan 2024, 16:45",
                  status: "Résolu",
                  statusColor: "bg-purple-100 text-purple-800",
                  icon: "ri-tools-line",
                  color: "purple",
                },
                {
                  type: "Essai",
                  title: "Analytics Business Intelligence",
                  description: "Activation essai gratuit 30 jours",
                  date: "08 Jan 2024, 09:20",
                  status: "En cours",
                  statusColor: "bg-orange-100 text-orange-800",
                  icon: "ri-bar-chart-line",
                  color: "orange",
                },
              ].map((interaction, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div
                    className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <i className={`${interaction.icon} text-blue-600`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 truncate">{interaction.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${interaction.statusColor}`}>
                        {interaction.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{interaction.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{interaction.date}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <i className="ri-eye-line mr-1"></i>
                    Voir
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Téléchargements et abonnements */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Téléchargements et Abonnements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "CRM Collaboratif",
                  type: "Abonnement Actif",
                  version: "v2.1.4",
                  size: "45 MB",
                  renewal: "15 Fév 2024",
                  status: "Actif",
                  statusColor: "bg-green-100 text-green-800",
                  icon: "ri-customer-service-2-line",
                  action: "Gérer",
                },
                {
                  name: "Analytics Dashboard",
                  type: "Application Installée",
                  version: "v1.8.3",
                  size: "32 MB",
                  renewal: "Mise à jour disponible",
                  status: "Installé",
                  statusColor: "bg-blue-100 text-blue-800",
                  icon: "ri-dashboard-line",
                  action: "Mettre à jour",
                },
                {
                  name: "Formation CRM",
                  type: "Contenu Téléchargé",
                  version: "v1.0",
                  size: "156 MB",
                  renewal: "Accès permanent",
                  status: "Téléchargé",
                  statusColor: "bg-purple-100 text-purple-800",
                  icon: "ri-book-line",
                  action: "Ouvrir",
                },
                {
                  name: "Module E-commerce",
                  type: "Essai Gratuit",
                  version: "v3.2.1",
                  size: "67 MB",
                  renewal: "Expire dans 12 jours",
                  status: "Essai",
                  statusColor: "bg-orange-100 text-orange-800",
                  icon: "ri-store-line",
                  action: "Acheter",
                },
              ].map((app, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <i className={`${app.icon} text-gray-600`}></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{app.name}</h4>
                        <p className="text-sm text-gray-600">{app.type}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${app.statusColor}`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Version:</span>
                      <span>{app.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taille:</span>
                      <span>{app.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Renouvellement:</span>
                      <span>{app.renewal}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <i className="ri-download-line mr-1"></i>
                      Télécharger
                    </Button>
                    <Button size="sm" className="flex-1">
                      {app.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recommandations personnalisées */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <i className="ri-star-line text-orange-500 mr-2"></i>
              Recommandations Personnalisées
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "Suite Comptabilité Pro",
                  description: "Complétez votre CRM avec notre solution comptable",
                  price: "149€/mois",
                  match: "95%",
                  image: "https://readdy.ai/api/search-image?query=modern%20accounting%20software%20interface%20with%20clean%20dashboard%20showing%20financial%20charts%20and%20invoice%20management%20on%20computer%20screen%2C%20professional%20business%20environment%20minimalist%20design%20blue%20and%20white%20color%20scheme&width=300&height=200&seq=acc1&orientation=landscape",
                  badge: "Recommandé",
                  color: "blue",
                },
                {
                  title: "Module RH Avancé",
                  description: "Gestion complète des ressources humaines",
                  price: "89€/mois",
                  match: "88%",
                  image: "https://readdy.ai/api/search-image?query=human%20resources%20management%20software%20dashboard%20with%20employee%20profiles%20and%20performance%20tracking%2C%20modern%20office%20setting%20clean%20interface%20design%20green%20and%20white%20colors&width=300&height=200&seq=hr1&orientation=landscape",
                  badge: "Populaire",
                  color: "green",
                },
                {
                  title: "Analytics BI Premium",
                  description: "Analyses avancées et rapports personnalisés",
                  price: "199€/mois",
                  match: "92%",
                  image: "https://readdy.ai/api/search-image?query=business%20intelligence%20analytics%20dashboard%20with%20advanced%20charts%20graphs%20and%20data%20visualization%20professional%20workspace%20modern%20design%20purple%20and%20white%20theme&width=300&height=200&seq=bi1&orientation=landscape",
                  badge: "Nouveau",
                  color: "purple",
                },
              ].map((recommendation, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={recommendation.image}
                      alt={recommendation.title}
                      className="w-full h-32 object-cover object-top"
                    />
                    <div className="absolute top-2 left-2 flex space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          recommendation.color === "blue"
                            ? "bg-blue-100 text-blue-800"
                            : recommendation.color === "green"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {recommendation.badge}
                      </span>
                      <span className="px-2 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-800">
                        {recommendation.match} compatible
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 mb-1">{recommendation.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{recommendation.price}</span>
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                        <i className="ri-add-line mr-1"></i>
                        Découvrir
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Notifications pour les renouvellements */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <i className="ri-notification-line text-red-500 mr-2"></i>
              Notifications Personnalisées
            </h3>
            <div className="space-y-3">
              {[
                {
                  type: "renewal",
                  title: "Renouvellement CRM",
                  message: "Votre abonnement expire dans 15 jours",
                  time: "2h",
                  icon: "ri-calendar-line",
                  color: "orange",
                },
                {
                  type: "update",
                  title: "Mise à jour disponible",
                  message: "Analytics Dashboard v1.8.3 est disponible",
                  time: "1j",
                  icon: "ri-download-cloud-line",
                  color: "blue",
                },
                {
                  type: "offer",
                  title: "Offre spéciale",
                  message: "30% de réduction sur le module RH",
                  time: "3j",
                  icon: "ri-price-tag-line",
                  color: "green",
                },
              ].map((notification, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <i className={`${notification.icon} text-blue-600 text-sm`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">{notification.time}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Bannière publicitaire sidebar */}
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="text-center">
              <h4 className="font-bold mb-2">📱 Solutions Mobiles Natives</h4>
              <p className="text-sm text-cyan-100 mb-4">Applications mobiles performantes</p>
              <Button variant="outline" size="sm" className="bg-white text-cyan-600 hover:bg-cyan-50">
                Développer App
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bannière publicitaire en bas */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">🎁 Offre Spéciale Client -40%</h3>
            <p className="text-pink-100">Promotion exceptionnelle sur tous nos services premium - Limitée dans le temps</p>
          </div>
          <Button variant="outline" className="bg-white text-pink-600 hover:bg-pink-50">
            Profiter de l'Offre
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HistorySection;
