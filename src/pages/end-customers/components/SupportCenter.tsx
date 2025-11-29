
import { useState } from 'react';
import { Card } from '../../../components/base/Card';
import { Button } from '../../../components/base/Button';
import { LoadingButton } from '../../../components/base/LoadingButton';

const supportTickets = [
  {
    id: "TICK-2024-001",
    title: "Problème de connexion CRM",
    status: "En cours",
    priority: "Haute",
    created: "22 Jan 2024",
    lastUpdate: "Il y a 2h",
    assignedTo: "Support Technique",
    category: "Technique",
    description: "Impossible de se connecter au CRM depuis ce matin",
  },
  {
    id: "TICK-2024-002",
    title: "Question sur facturation",
    status: "Résolu",
    priority: "Normale",
    created: "20 Jan 2024",
    lastUpdate: "Hier",
    assignedTo: "Service Client",
    category: "Facturation",
    description: "Demande d'explication sur la facture de janvier",
  },
  {
    id: "TICK-2024-003",
    title: "Demande de formation",
    status: "En attente",
    priority: "Basse",
    created: "18 Jan 2024",
    lastUpdate: "Il y a 2j",
    assignedTo: "Équipe Formation",
    category: "Formation",
    description: "Souhait de formation sur les nouvelles fonctionnalités",
  },
];

const faqItems = [
  {
    id: 1,
    question: "Comment configurer votre CRM collaboratif ?",
    category: "Technique",
    views: 1250,
    helpful: 89,
  },
  {
    id: 2,
    question: "FAQ sur les abonnements et paiements",
    category: "Facturation",
    views: 980,
    helpful: 76,
  },
  {
    id: 3,
    question: "Comment accéder aux formations en ligne ?",
    category: "Formation",
    views: 756,
    helpful: 82,
  },
  {
    id: 4,
    question: "Résolution des problèmes de connexion",
    category: "Technique",
    views: 634,
    helpful: 71,
  },
];

export const SupportCenter = () => {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "agent",
      message: "Bonjour ! Je suis Sarah, votre assistante. Comment puis-je vous aider aujourd'hui ?",
      time: "Maintenant",
    },
  ]);

  const handleSubmitTicket = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowTicketModal(false);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { sender: "user", message: chatMessage, time: "Maintenant" },
        {
          sender: "agent",
          message: "Merci pour votre message. Un agent va vous répondre dans quelques instants.",
          time: "Maintenant",
        },
      ]);
      setChatMessage("");
    }
  };

  return (
    <div className="space-y-8">
      {/* Bannière publicitaire en haut */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">🆘 Centre d'Assistance</h3>
            <p className="text-purple-100">Support rapide et efficace pour tous vos besoins</p>
          </div>
          <Button variant="outline" className="bg-white text-purple-600 hover:bg-purple-50">
            Chat en Direct
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Centre d'aide et FAQ */}
        <div className="lg:col-span-2 space-y-6">
          {/* Centre d'aide */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Centre d'Aide</h3>
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Rechercher dans l'aide..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { icon: "ri-settings-line", title: "Configuration", count: 15, color: "blue" },
                { icon: "ri-question-line", title: "FAQ Générale", count: 28, color: "green" },
                { icon: "ri-tools-line", title: "Problèmes Techniques", count: 12, color: "orange" },
                { icon: "ri-credit-card-line", title: "Facturation", count: 8, color: "purple" },
              ].map((category, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className={`${category.icon} text-blue-600`}></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{category.title}</h4>
                      <p className="text-sm text-gray-600">{category.count} articles</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Articles Populaires</h4>
              {faqItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div>
                    <h5 className="font-medium text-gray-900">{item.question}</h5>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-600">Catégorie: {item.category}</span>
                      <span className="text-sm text-gray-600">{item.views} vues</span>
                      <span className="text-sm text-green-600">{item.helpful}% utile</span>
                    </div>
                  </div>
                  <i className="ri-arrow-right-line text-gray-400"></i>
                </div>
              ))}
            </div>
          </Card>

          {/* Historique des demandes */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Historique des Demandes</h3>
              <Button 
                size="sm" 
                onClick={() => setShowTicketModal(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <i className="ri-add-line mr-2"></i>
                Nouveau Ticket
              </Button>
            </div>
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        ticket.priority === "Haute"
                          ? "bg-red-100"
                          : ticket.priority === "Normale"
                          ? "bg-yellow-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <i
                        className={`ri-customer-service-line ${
                          ticket.priority === "Haute"
                            ? "text-red-600"
                            : ticket.priority === "Normale"
                            ? "text-yellow-600"
                            : "text-gray-600"
                        }`}
                      ></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{ticket.title}</h4>
                      <p className="text-sm text-gray-600">{ticket.description}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">#{ticket.id}</span>
                        <span className="text-xs text-gray-500">{ticket.created}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        ticket.status === "Résolu"
                          ? "bg-green-100 text-green-700"
                          : ticket.status === "En cours"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {ticket.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{ticket.lastUpdate}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Support en direct et sidebar */}
        <div className="space-y-6">
          {/* Chat en direct */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Support en Direct</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">En ligne</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 ${
                    message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "agent" ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <i
                      className={`${
                        message.sender === "agent"
                          ? "ri-customer-service-line text-blue-600"
                          : "ri-user-line text-gray-600"
                      } text-sm`}
                    ></i>
                  </div>
                  <div
                    className={`flex-1 p-3 rounded-lg ${
                      message.sender === "agent"
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm text-gray-900">{message.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button size="sm" onClick={handleSendMessage}>
                <i className="ri-send-plane-line"></i>
              </Button>
            </div>
          </Card>

          {/* Options de contact */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Autres Options de Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-phone-line text-blue-600"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Téléphone</h4>
                  <p className="text-sm text-gray-600">+33 1 23 45 67 89</p>
                  <p className="text-xs text-gray-500">Lun-Ven 9h-18h</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-mail-line text-green-600"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="text-sm text-gray-600">support@company.com</p>
                  <p className="text-xs text-gray-500">Réponse sous 24h</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Bannière publicitaire */}
          <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-6 text-white">
            <div className="text-center">
              <h4 className="font-bold mb-2">🔒 Solutions de Sécurité Avancées</h4>
              <p className="text-sm text-red-100 mb-4">Protégez vos données avec nos solutions</p>
              <Button variant="outline" size="sm" className="bg-white text-red-600 hover:bg-red-50">
                Sécuriser
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de création de ticket */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Créer un Ticket de Support</h2>
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                    <option>Technique</option>
                    <option>Facturation</option>
                    <option>Formation</option>
                    <option>Compte</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                    <option>Normale</option>
                    <option>Haute</option>
                    <option>Basse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                  <input
                    type="text"
                    placeholder="Décrivez brièvement votre problème"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Décrivez votre problème en détail..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={500}
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setShowTicketModal(false)}>
                    Annuler
                  </Button>
                  <LoadingButton
                    onClick={handleSubmitTicket}
                    isLoading={isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Créer le ticket
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

export default SupportCenter;
