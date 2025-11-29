
import { useState } from 'react';

export default function CollaborationSection() {
  const [activeTab, setActiveTab] = useState<'messages' | 'sessions' | 'content'>('messages');
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [showSessionModal, setShowSessionModal] = useState(false);

  const conversations = [
    {
      id: 1,
      company: 'TechCorp Solutions',
      contact: 'Sophie Martin',
      role: 'Responsable Formation',
      lastMessage: 'Parfait, nous confirmons la session du 15 mars',
      time: 'Il y a 2h',
      unread: 2,
      status: 'online',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20woman%20manager%20corporate%20headshot%20modern%20office%20background%20confident%20smile&width=100&height=100&seq=trainer_contact1&orientation=squarish'
    },
    {
      id: 2,
      company: 'InnovateSAS',
      contact: 'Thomas Dubois',
      role: 'Directeur RH',
      lastMessage: 'Pouvons-nous organiser une session sur le leadership ?',
      time: 'Il y a 4h',
      unread: 0,
      status: 'away',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20man%20executive%20corporate%20headshot%20modern%20office%20background%20professional%20attire&width=100&height=100&seq=trainer_contact2&orientation=squarish'
    },
    {
      id: 3,
      company: 'GlobalTrade Ltd',
      contact: 'Marie Laurent',
      role: 'Manager Formation',
      lastMessage: 'Merci pour les supports de formation',
      time: 'Il y a 1j',
      unread: 0,
      status: 'offline',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20woman%20hr%20manager%20corporate%20headshot%20modern%20office%20background%20friendly%20expression&width=100&height=100&seq=trainer_contact3&orientation=squarish'
    }
  ];

  const sessions = [
    {
      id: 1,
      title: 'Leadership et Management',
      company: 'TechCorp Solutions',
      date: '2024-03-15',
      time: '14:00',
      duration: '3h',
      format: 'Présentiel',
      location: 'Paris - Salle A',
      participants: 25,
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Communication Efficace',
      company: 'InnovateSAS',
      date: '2024-03-20',
      time: '10:00',
      duration: '2h',
      format: 'En ligne',
      location: 'Zoom',
      participants: 18,
      status: 'pending'
    },
    {
      id: 3,
      title: 'Gestion de Projet Agile',
      company: 'GlobalTrade Ltd',
      date: '2024-03-25',
      time: '09:00',
      duration: '4h',
      format: 'Hybride',
      location: 'Lyon - Salle B + Zoom',
      participants: 30,
      status: 'confirmed'
    }
  ];

  const sharedContent = [
    {
      id: 1,
      title: 'Guide Leadership Avancé',
      type: 'PDF',
      company: 'TechCorp Solutions',
      size: '2.5 MB',
      downloads: 45,
      date: '2024-03-01',
      icon: 'ri-file-pdf-line',
      color: 'text-red-600'
    },
    {
      id: 2,
      title: 'Présentation Communication',
      type: 'PowerPoint',
      company: 'InnovateSAS',
      size: '8.3 MB',
      downloads: 32,
      date: '2024-02-28',
      icon: 'ri-file-ppt-line',
      color: 'text-orange-600'
    },
    {
      id: 3,
      title: 'Vidéo Formation Agile',
      type: 'Vidéo',
      company: 'GlobalTrade Ltd',
      size: '125 MB',
      downloads: 28,
      date: '2024-02-25',
      icon: 'ri-video-line',
      color: 'text-blue-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getSessionStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Bannière Publicitaire En-tête */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Outils de Collaboration Professionnels</h3>
            <p className="text-indigo-100 text-sm mb-4">Communiquez efficacement avec les entreprises et organisez vos sessions de formation</p>
            <button className="px-6 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium whitespace-nowrap">
              Découvrir les Outils
            </button>
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <i className="ri-team-line text-6xl opacity-20"></i>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Collaboration avec les Entreprises</h2>
            <p className="text-sm text-gray-500 mt-1">Communiquez et organisez vos sessions de formation</p>
          </div>
          <button
            onClick={() => setShowSessionModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium whitespace-nowrap shadow-md"
          >
            <i className="ri-calendar-event-line mr-2"></i>
            Planifier une Session
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === 'messages'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="ri-message-3-line mr-2"></i>
            Messagerie
          </button>
          <button
            onClick={() => setActiveTab('sessions')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === 'sessions'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="ri-calendar-line mr-2"></i>
            Sessions Planifiées
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`pb-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === 'content'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="ri-folder-line mr-2"></i>
            Contenu Partagé
          </button>
        </div>
      </div>

      {/* Messagerie */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
            {/* Liste des conversations */}
            <div className="border-r border-gray-200 overflow-y-auto">
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Rechercher une conversation..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="divide-y divide-gray-200">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedConversation === conv.id ? 'bg-purple-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={conv.avatar}
                          alt={conv.contact}
                          className="w-12 h-12 rounded-full object-cover object-top"
                        />
                        <span className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(conv.status)} rounded-full border-2 border-white`}></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-semibold text-gray-900 truncate">{conv.company}</p>
                          {conv.unread > 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{conv.contact} - {conv.role}</p>
                        <p className="text-xs text-gray-600 truncate">{conv.lastMessage}</p>
                        <p className="text-xs text-gray-400 mt-1">{conv.time}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Zone de chat */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={conversations.find(c => c.id === selectedConversation)?.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover object-top"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {conversations.find(c => c.id === selectedConversation)?.company}
                      </p>
                      <p className="text-xs text-gray-500">
                        {conversations.find(c => c.id === selectedConversation)?.contact}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <i className="ri-phone-line"></i>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <i className="ri-vidicon-line"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="max-w-xs bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm text-gray-900">Bonjour, nous aimerions organiser une formation sur le leadership pour notre équipe.</p>
                      <p className="text-xs text-gray-400 mt-1">10:30</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-xs bg-purple-600 text-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm">Bonjour ! Je serais ravi de vous accompagner. Combien de participants prévoyez-vous ?</p>
                      <p className="text-xs text-purple-200 mt-1">10:32</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-xs bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm text-gray-900">Environ 25 personnes. Nous préférerions une session en présentiel.</p>
                      <p className="text-xs text-gray-400 mt-1">10:35</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-xs bg-purple-600 text-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm">Parfait ! Je vous propose le 15 mars à 14h. Je vous envoie le programme détaillé.</p>
                      <p className="text-xs text-purple-200 mt-1">10:38</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <i className="ri-attachment-line"></i>
                  </button>
                  <input
                    type="text"
                    placeholder="Écrivez votre message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium whitespace-nowrap">
                    <i className="ri-send-plane-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sessions Planifiées */}
      {activeTab === 'sessions' && (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{session.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSessionStatusColor(session.status)}`}>
                      {session.status === 'confirmed' ? 'Confirmée' : 'En Attente'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{session.company}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <i className="ri-calendar-line text-purple-600"></i>
                      <span>{new Date(session.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <i className="ri-time-line text-purple-600"></i>
                      <span>{session.time} ({session.duration})</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <i className="ri-map-pin-line text-purple-600"></i>
                      <span>{session.format}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <i className="ri-user-line text-purple-600"></i>
                      <span>{session.participants} participants</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    <i className="ri-map-pin-2-line mr-1"></i>
                    {session.location}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium whitespace-nowrap">
                    <i className="ri-edit-line mr-1"></i>
                    Modifier
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap">
                    <i className="ri-delete-bin-line mr-1"></i>
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contenu Partagé */}
      {activeTab === 'content' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Documents Partagés</h3>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium whitespace-nowrap">
              <i className="ri-upload-line mr-2"></i>
              Partager un Document
            </button>
          </div>
          <div className="space-y-3">
            {sharedContent.map((content) => (
              <div key={content.id} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50/50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`w-12 h-12 ${content.color} bg-opacity-10 rounded-lg flex items-center justify-center`}>
                      <i className={`${content.icon} text-2xl ${content.color}`}></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">{content.title}</h4>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{content.company}</span>
                        <span>•</span>
                        <span>{content.size}</span>
                        <span>•</span>
                        <span>{content.downloads} téléchargements</span>
                        <span>•</span>
                        <span>{new Date(content.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium whitespace-nowrap">
                      <i className="ri-download-line mr-1"></i>
                      Télécharger
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap">
                      <i className="ri-share-line mr-1"></i>
                      Partager
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bannière Publicitaire Footer */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Gestion de Formation en Entreprise</h3>
            <p className="text-green-100 text-sm mb-4">Optimisez la planification et le suivi de vos sessions de formation avec nos outils dédiés</p>
            <button className="px-6 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium whitespace-nowrap">
              Découvrir la Solution
            </button>
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <i className="ri-building-line text-6xl opacity-20"></i>
          </div>
        </div>
      </div>

      {/* Modal Planification Session */}
      {showSessionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Planifier une Session de Formation</h3>
                <button
                  onClick={() => setShowSessionModal(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre de la Session</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: Leadership et Management"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>TechCorp Solutions</option>
                  <option>InnovateSAS</option>
                  <option>GlobalTrade Ltd</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heure</label>
                  <input
                    type="time"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Durée</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: 3h"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Présentiel</option>
                    <option>En ligne</option>
                    <option>Hybride</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: Paris - Salle A ou Lien Zoom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de Participants</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="25"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowSessionModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap"
              >
                Annuler
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium whitespace-nowrap">
                Planifier la Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
