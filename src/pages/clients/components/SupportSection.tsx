import { useState } from 'react';
import { Card } from '../../../components/base/Card';
import { Button } from '../../../components/base/Button';
import { LoadingButton } from '../../../components/base/LoadingButton';
import { AdBanner } from '../../../components/feature/AdBanner';

export default function SupportSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      message: 'Bonjour ! Je suis Sarah, votre assistante support. Comment puis-je vous aider aujourd\'hui ?',
      time: '14:30'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const faqCategories = [
    { id: 'all', label: 'Toutes les catégories', icon: 'ri-question-line' },
    { id: 'account', label: 'Compte', icon: 'ri-user-line' },
    { id: 'billing', label: 'Facturation', icon: 'ri-bill-line' },
    { id: 'technical', label: 'Technique', icon: 'ri-tools-line' },
    { id: 'products', label: 'Produits', icon: 'ri-product-hunt-line' }
  ];

  const faqItems = [
    {
      id: 1,
      category: 'account',
      question: 'Comment modifier mes informations de profil ?',
      answer: 'Vous pouvez modifier vos informations en accédant à votre profil via l\'icône utilisateur en haut à droite, puis en cliquant sur "Paramètres du compte".',
      helpful: 24,
      views: 156
    },
    {
      id: 2,
      category: 'billing',
      question: 'Comment télécharger mes factures ?',
      answer: 'Rendez-vous dans la section "Historique des achats" de votre tableau de bord. Chaque achat dispose d\'un bouton "Télécharger facture".',
      helpful: 18,
      views: 89
    },
    {
      id: 3,
      category: 'technical',
      question: 'Problème de connexion à mon compte',
      answer: 'Vérifiez d\'abord votre connexion internet. Si le problème persiste, essayez de vider le cache de votre navigateur ou contactez notre support.',
      helpful: 31,
      views: 203
    },
    {
      id: 4,
      category: 'products',
      question: 'Comment prolonger mon essai gratuit ?',
      answer: 'Les essais gratuits ne peuvent pas être prolongés. Cependant, vous pouvez contacter notre équipe commerciale pour discuter d\'options spéciales.',
      helpful: 12,
      views: 67
    },
    {
      id: 5,
      category: 'billing',
      question: 'Comment annuler mon abonnement ?',
      answer: 'Vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord, section "Mes abonnements". L\'annulation prend effet à la fin de la période de facturation.',
      helpful: 45,
      views: 298
    },
    {
      id: 6,
      category: 'technical',
      question: 'L\'application est lente, que faire ?',
      answer: 'Vérifiez votre connexion internet et fermez les autres onglets. Si le problème persiste, contactez notre support technique avec les détails de votre navigateur.',
      helpful: 22,
      views: 134
    }
  ];

  const supportTickets = [
    {
      id: 'TK-2024-001',
      subject: 'Problème d\'intégration API',
      category: 'Technique',
      status: 'En cours',
      priority: 'Haute',
      created: '14 Nov 2024',
      lastUpdate: 'Il y a 2 heures',
      assignedTo: 'Marc Dupont'
    },
    {
      id: 'TK-2024-002',
      subject: 'Question sur la facturation',
      category: 'Facturation',
      status: 'Résolu',
      priority: 'Normale',
      created: '12 Nov 2024',
      lastUpdate: 'Il y a 1 jour',
      assignedTo: 'Julie Martin'
    },
    {
      id: 'TK-2024-003',
      subject: 'Demande de formation',
      category: 'Général',
      status: 'En attente',
      priority: 'Basse',
      created: '10 Nov 2024',
      lastUpdate: 'Il y a 3 jours',
      assignedTo: 'Sarah Johnson'
    }
  ];

  const filteredFAQ = faqItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        sender: 'user',
        message: newMessage,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages([...chatMessages, userMessage]);
      setNewMessage('');
      
      // Simulation de réponse automatique
      setTimeout(() => {
        const agentResponse = {
          id: chatMessages.length + 2,
          sender: 'agent',
          message: 'Merci pour votre message. Je vais examiner votre demande et vous répondre dans les plus brefs délais.',
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, agentResponse]);
      }, 1000);
    }
  };

  const handleCreateTicket = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsTicketModalOpen(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Centre d'aide - Recherche */}
      <Card className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Centre d'Aide</h2>
          <p className="text-gray-600">Trouvez rapidement des réponses à vos questions</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher dans la base de connaissances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Catégories et actions */}
        <div className="space-y-6">
          {/* Catégories FAQ */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Catégories</h3>
            <div className="space-y-2">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <i className={`${category.icon} text-lg`}></i>
                  <span className="text-sm">{category.label}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Actions rapides */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Direct</h3>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start"
                onClick={() => setIsChatOpen(true)}
              >
                <i className="ri-chat-3-line mr-3"></i>
                Chat en Direct
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setIsTicketModalOpen(true)}
              >
                <i className="ri-ticket-line mr-3"></i>
                Créer un Ticket
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <i className="ri-phone-line mr-3"></i>
                Demander un Rappel
              </Button>
            </div>
          </Card>

          {/* Bannière publicitaire */}
          <AdBanner 
            placement="middle"
            userType="client"
            context="support-sidebar"
          />
        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-3 space-y-8">
          {/* FAQ */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Questions Fréquentes</h3>
            <div className="space-y-4">
              {filteredFAQ.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                  <p className="text-sm text-gray-600 mb-3">{item.answer}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <i className="ri-thumb-up-line"></i>
                        <span>{item.helpful} utile</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <i className="ri-eye-line"></i>
                        <span>{item.views} vues</span>
                      </span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                      Cette réponse vous a-t-elle aidé ?
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Historique des tickets */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Mes Tickets de Support</h3>
              <Button 
                size="sm"
                onClick={() => setIsTicketModalOpen(true)}
              >
                <i className="ri-add-line mr-2"></i>
                Nouveau Ticket
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Ticket</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Sujet</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Statut</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Priorité</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Assigné à</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Dernière MAJ</th>
                  </tr>
                </thead>
                <tbody>
                  {supportTickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm text-blue-600">{ticket.id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{ticket.subject}</p>
                          <p className="text-xs text-gray-500">{ticket.category}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.status === 'Résolu' ? 'bg-green-100 text-green-800' :
                          ticket.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.priority === 'Haute' ? 'bg-red-100 text-red-800' :
                          ticket.priority === 'Normale' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{ticket.assignedTo}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">{ticket.lastUpdate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {/* Chat en direct */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border z-50">
          <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <i className="ri-customer-service-line"></i>
              </div>
              <div>
                <h4 className="font-medium">Support Client</h4>
                <p className="text-xs opacity-90">En ligne</p>
              </div>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
          
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p>{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Tapez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                maxLength={500}
              />
              <Button size="sm" onClick={handleSendMessage}>
                <i className="ri-send-plane-line"></i>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de création de ticket */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Créer un Ticket de Support</h3>
              <button 
                onClick={() => setIsTicketModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                  <option>Technique</option>
                  <option>Facturation</option>
                  <option>Compte</option>
                  <option>Produits</option>
                  <option>Général</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                  <option>Normale</option>
                  <option>Haute</option>
                  <option>Basse</option>
                  <option>Urgente</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                <input 
                  type="text" 
                  placeholder="Décrivez brièvement votre problème"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  rows={4}
                  placeholder="Décrivez votre problème en détail..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  maxLength={500}
                ></textarea>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsTicketModalOpen(false)}
              >
                Annuler
              </Button>
              <LoadingButton 
                loading={isLoading}
                className="flex-1"
                onClick={handleCreateTicket}
              >
                Créer le Ticket
              </LoadingButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add named export for compatibility with named imports
export { SupportSection };
