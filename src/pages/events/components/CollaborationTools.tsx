import { useState, useEffect } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';
import AdBanner from '../../../components/feature/AdBanner';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  recipientId: string;
  recipientName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  eventId?: string;
  eventName?: string;
  type: 'direct' | 'group' | 'announcement';
}

interface NetworkingGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  isPrivate: boolean;
  createdBy: string;
  createdAt: string;
  tags: string[];
  eventId?: string;
  eventName?: string;
}

interface SharedContent {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadedBy: string;
  uploadedAt: string;
  eventId: string;
  eventName: string;
  downloadCount: number;
  category: 'presentation' | 'document' | 'image' | 'video' | 'other';
}

interface ConnectionSuggestion {
  id: string;
  name: string;
  company: string;
  role: string;
  sector: string;
  commonInterests: string[];
  mutualConnections: number;
  profileImage: string;
  matchScore: number;
}

export default function CollaborationTools() {
  const { trackAction } = useAdManager();
  const [activeTab, setActiveTab] = useState('messaging');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showContentUpload, setShowContentUpload] = useState(false);

  // Données de démonstration - Messages
  const [messages] = useState<Message[]>([
    {
      id: 'msg-001',
      senderId: 'user-001',
      senderName: 'Marie Dubois',
      senderRole: 'Directrice Marketing',
      recipientId: 'org-001',
      recipientName: 'Équipe Organisation',
      content: 'Bonjour, pourriez-vous m\'envoyer le programme détaillé de la conférence de demain ?',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
      eventId: 'event-001',
      eventName: 'Conférence Innovation 2024',
      type: 'direct'
    },
    {
      id: 'msg-002',
      senderId: 'user-002',
      senderName: 'Pierre Martin',
      senderRole: 'CEO Startup',
      recipientId: 'org-001',
      recipientName: 'Équipe Organisation',
      content: 'Excellent événement ! Y aura-t-il une session de networking après les présentations ?',
      timestamp: '2024-01-15T09:15:00Z',
      isRead: true,
      eventId: 'event-002',
      eventName: 'Salon Entrepreneurs',
      type: 'direct'
    },
    {
      id: 'msg-003',
      senderId: 'org-001',
      senderName: 'Équipe Organisation',
      senderRole: 'Organisateur',
      recipientId: 'group-001',
      recipientName: 'Groupe Innovation Tech',
      content: 'Rappel : La session de brainstorming commence dans 30 minutes en salle B.',
      timestamp: '2024-01-15T08:45:00Z',
      isRead: true,
      eventId: 'event-001',
      eventName: 'Conférence Innovation 2024',
      type: 'announcement'
    },
    {
      id: 'msg-004',
      senderId: 'user-003',
      senderName: 'Sophie Laurent',
      senderRole: 'Consultante',
      recipientId: 'user-004',
      recipientName: 'Thomas Rousseau',
      content: 'Merci pour votre présentation inspirante ! Pourrions-nous échanger sur vos stratégies de croissance ?',
      timestamp: '2024-01-14T16:20:00Z',
      isRead: true,
      eventId: 'event-003',
      eventName: 'Workshop Stratégie',
      type: 'direct'
    }
  ]);

  // Données de démonstration - Groupes de réseautage
  const [networkingGroups] = useState<NetworkingGroup[]>([
    {
      id: 'group-001',
      name: 'Innovation Tech',
      description: 'Groupe dédié aux innovations technologiques et aux startups tech',
      category: 'Technologie',
      memberCount: 45,
      isPrivate: false,
      createdBy: 'Marie Dubois',
      createdAt: '2024-01-10T10:00:00Z',
      tags: ['innovation', 'technologie', 'startup', 'IA'],
      eventId: 'event-001',
      eventName: 'Conférence Innovation 2024'
    },
    {
      id: 'group-002',
      name: 'Marketing Digital',
      description: 'Échanges sur les stratégies et outils de marketing digital',
      category: 'Marketing',
      memberCount: 32,
      isPrivate: false,
      createdBy: 'Pierre Martin',
      createdAt: '2024-01-12T14:30:00Z',
      tags: ['marketing', 'digital', 'réseaux sociaux', 'SEO'],
      eventId: 'event-002',
      eventName: 'Salon Entrepreneurs'
    },
    {
      id: 'group-003',
      name: 'Financement Startup',
      description: 'Groupe privé pour les discussions sur le financement et les investissements',
      category: 'Finance',
      memberCount: 18,
      isPrivate: true,
      createdBy: 'Sophie Laurent',
      createdAt: '2024-01-08T09:15:00Z',
      tags: ['financement', 'investissement', 'levée de fonds', 'VC'],
      eventId: 'event-003',
      eventName: 'Workshop Stratégie'
    },
    {
      id: 'group-004',
      name: 'Développement Durable',
      description: 'Initiatives et projets pour un business plus responsable',
      category: 'Environnement',
      memberCount: 28,
      isPrivate: false,
      createdBy: 'Thomas Rousseau',
      createdAt: '2024-01-05T11:45:00Z',
      tags: ['développement durable', 'RSE', 'environnement', 'impact'],
      eventId: 'event-004',
      eventName: 'Forum RSE'
    }
  ]);

  // Données de démonstration - Contenu partagé
  const [sharedContent] = useState<SharedContent[]>([
    {
      id: 'content-001',
      title: 'Guide Innovation 2024',
      description: 'Guide complet des tendances innovation pour 2024',
      fileName: 'guide-innovation-2024.pdf',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      uploadedBy: 'Marie Dubois',
      uploadedAt: '2024-01-15T09:30:00Z',
      eventId: 'event-001',
      eventName: 'Conférence Innovation 2024',
      downloadCount: 127,
      category: 'document'
    },
    {
      id: 'content-002',
      title: 'Présentation Stratégie Marketing',
      description: 'Slides de la présentation sur les nouvelles stratégies marketing digital',
      fileName: 'strategie-marketing-2024.pptx',
      fileSize: '5.1 MB',
      fileType: 'PowerPoint',
      uploadedBy: 'Pierre Martin',
      uploadedAt: '2024-01-14T15:45:00Z',
      eventId: 'event-002',
      eventName: 'Salon Entrepreneurs',
      downloadCount: 89,
      category: 'presentation'
    },
    {
      id: 'content-003',
      title: 'Template Business Plan',
      description: 'Modèle de business plan pour startups avec exemples',
      fileName: 'template-business-plan.xlsx',
      fileSize: '1.8 MB',
      fileType: 'Excel',
      uploadedBy: 'Sophie Laurent',
      uploadedAt: '2024-01-13T11:20:00Z',
      eventId: 'event-003',
      eventName: 'Workshop Stratégie',
      downloadCount: 156,
      category: 'document'
    },
    {
      id: 'content-004',
      title: 'Vidéo Pitch Perfect',
      description: 'Masterclass sur l\'art du pitch en 5 minutes',
      fileName: 'masterclass-pitch.mp4',
      fileSize: '45.2 MB',
      fileType: 'Vidéo',
      uploadedBy: 'Thomas Rousseau',
      uploadedAt: '2024-01-12T16:10:00Z',
      eventId: 'event-004',
      eventName: 'Forum RSE',
      downloadCount: 203,
      category: 'video'
    }
  ]);

  // Données de démonstration - Suggestions de connexions
  const [connectionSuggestions] = useState<ConnectionSuggestion[]>([
    {
      id: 'suggestion-001',
      name: 'Amélie Moreau',
      company: 'TechVision',
      role: 'CTO',
      sector: 'Technologie',
      commonInterests: ['IA', 'Innovation', 'Startup'],
      mutualConnections: 5,
      profileImage: 'https://readdy.ai/api/search-image?query=professional%20woman%20CTO%20technology%20executive%20smiling%20confident%20business%20portrait&width=100&height=100&seq=profile001&orientation=squarish',
      matchScore: 92
    },
    {
      id: 'suggestion-002',
      name: 'Julien Petit',
      company: 'GreenStart',
      role: 'Fondateur',
      sector: 'Environnement',
      commonInterests: ['Développement durable', 'Innovation', 'Entrepreneuriat'],
      mutualConnections: 3,
      profileImage: 'https://readdy.ai/api/search-image?query=professional%20man%20founder%20entrepreneur%20environmental%20business%20portrait%20confident&width=100&height=100&seq=profile002&orientation=squarish',
      matchScore: 87
    },
    {
      id: 'suggestion-003',
      name: 'Camille Durand',
      company: 'MarketPro',
      role: 'Directrice Marketing',
      sector: 'Marketing',
      commonInterests: ['Marketing digital', 'Stratégie', 'Growth hacking'],
      mutualConnections: 8,
      profileImage: 'https://readdy.ai/api/search-image?query=professional%20woman%20marketing%20director%20business%20executive%20confident%20portrait&width=100&height=100&seq=profile003&orientation=squarish',
      matchScore: 89
    }
  ]);

  useEffect(() => {
    trackAction('view-collaboration-tools', {
      section: 'collaboration',
      timestamp: Date.now()
    });
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    trackAction('switch-collaboration-tab', { tab, timestamp: Date.now() });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      trackAction('send-message', {
        messageLength: newMessage.length,
        timestamp: Date.now()
      });
      setNewMessage('');
    }
  };

  const handleJoinGroup = (groupId: string) => {
    trackAction('join-networking-group', {
      groupId,
      timestamp: Date.now()
    });
  };

  const handleDownloadContent = (contentId: string) => {
    trackAction('download-shared-content', {
      contentId,
      timestamp: Date.now()
    });
  };

  const handleConnectSuggestion = (suggestionId: string) => {
    trackAction('connect-suggestion', {
      suggestionId,
      timestamp: Date.now()
    });
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return 'ri-file-pdf-line';
      case 'powerpoint': return 'ri-slideshow-line';
      case 'excel': return 'ri-file-excel-line';
      case 'vidéo': return 'ri-video-line';
      default: return 'ri-file-line';
    }
  };

  const getFileColor = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return 'text-red-600';
      case 'powerpoint': return 'text-orange-600';
      case 'excel': return 'text-green-600';
      case 'vidéo': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const filteredMessages = messages.filter(message =>
    message.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (message.eventName && message.eventName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredGroups = networkingGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredContent = sharedContent.filter(content =>
    content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* En-tête avec navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              <i className="ri-team-line text-blue-600 mr-3"></i>
              Outils de Collaboration et Réseautage
            </h2>
            <p className="text-gray-600 mt-1">
              Facilitez la collaboration et les connexions entre participants
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              <i className="ri-message-3-line mr-1"></i>
              {messages.filter(m => !m.isRead).length} nouveaux messages
            </span>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              <i className="ri-group-line mr-1"></i>
              {networkingGroups.length} groupes actifs
            </span>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'messaging', label: 'Messagerie', icon: 'ri-message-3-line' },
              { id: 'networking', label: 'Réseautage', icon: 'ri-group-line' },
              { id: 'content', label: 'Contenu Partagé', icon: 'ri-folder-shared-line' },
              { id: 'suggestions', label: 'Suggestions', icon: 'ri-user-add-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder={`Rechercher ${activeTab === 'messaging' ? 'des messages' : activeTab === 'networking' ? 'des groupes' : activeTab === 'content' ? 'du contenu' : 'des connexions'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Contenu selon l'onglet actif */}
      {activeTab === 'messaging' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste des conversations */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Conversations</h3>
              </div>
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedConversation(message.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === message.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {message.senderName.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {message.senderName}
                          </p>
                          {!message.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{message.senderRole}</p>
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {message.content}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">
                            {new Date(message.timestamp).toLocaleDateString('fr-FR')}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            message.type === 'direct' ? 'bg-blue-100 text-blue-800' :
                            message.type === 'group' ? 'bg-green-100 text-green-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {message.type === 'direct' ? 'Direct' :
                             message.type === 'group' ? 'Groupe' : 'Annonce'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Zone de conversation */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-96 flex flex-col">
              {selectedConversation ? (
                <>
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {messages.find(m => m.id === selectedConversation)?.senderName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {messages.find(m => m.id === selectedConversation)?.senderName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {messages.find(m => m.id === selectedConversation)?.senderRole}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      {messages
                        .filter(m => m.id === selectedConversation)
                        .map((message) => (
                          <div key={message.id} className="flex space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                                {message.senderName.charAt(0)}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="bg-gray-100 rounded-lg p-3">
                                <p className="text-sm text-gray-900">{message.content}</p>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(message.timestamp).toLocaleString('fr-FR')}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        placeholder="Tapez votre message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-send-plane-line mr-1"></i>
                        Envoyer
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <i className="ri-message-3-line text-4xl text-gray-400 mb-4"></i>
                    <p className="text-gray-500">Sélectionnez une conversation pour commencer</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'networking' && (
        <div className="space-y-6">
          {/* Actions rapides */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Groupes de Réseautage</h3>
              <button
                onClick={() => setShowNewGroupModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-add-line mr-2"></i>
                Créer un Groupe
              </button>
            </div>
          </div>

          {/* Liste des groupes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{group.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                  </div>
                  {group.isPrivate && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                      <i className="ri-lock-line mr-1"></i>
                      Privé
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Catégorie:</span>
                    <span className="font-medium text-gray-900">{group.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Membres:</span>
                    <span className="font-medium text-gray-900">{group.memberCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Créé par:</span>
                    <span className="font-medium text-gray-900">{group.createdBy}</span>
                  </div>
                  {group.eventName && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Événement:</span>
                      <span className="font-medium text-blue-600 truncate">{group.eventName}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {group.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                    {group.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{group.tags.length - 3}</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleJoinGroup(group.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-group-line mr-2"></i>
                    Rejoindre le Groupe
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* Actions rapides */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Contenu Partagé</h3>
              <button
                onClick={() => setShowContentUpload(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-upload-line mr-2"></i>
                Partager du Contenu
              </button>
            </div>
          </div>

          {/* Liste du contenu */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="space-y-4">
                {filteredContent.map((content) => (
                  <div key={content.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center ${getFileColor(content.fileType)}`}>
                          <i className={`${getFileIcon(content.fileType)} text-xl`}></i>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{content.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{content.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>
                                <i className="ri-file-line mr-1"></i>
                                {content.fileName}
                              </span>
                              <span>
                                <i className="ri-hard-drive-line mr-1"></i>
                                {content.fileSize}
                              </span>
                              <span>
                                <i className="ri-user-line mr-1"></i>
                                {content.uploadedBy}
                              </span>
                              <span>
                                <i className="ri-download-line mr-1"></i>
                                {content.downloadCount} téléchargements
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              content.category === 'document' ? 'bg-blue-100 text-blue-800' :
                              content.category === 'presentation' ? 'bg-orange-100 text-orange-800' :
                              content.category === 'video' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {content.category === 'document' ? 'Document' :
                               content.category === 'presentation' ? 'Présentation' :
                               content.category === 'video' ? 'Vidéo' : 'Autre'}
                            </span>
                            <button
                              onClick={() => handleDownloadContent(content.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-download-line mr-1"></i>
                              Télécharger
                            </button>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            <i className="ri-calendar-event-line mr-1"></i>
                            {content.eventName}
                          </span>
                          <span className="text-xs text-gray-500">
                            Partagé le {new Date(content.uploadedAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'suggestions' && (
        <div className="space-y-6">
          {/* En-tête suggestions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Suggestions de Connexions</h3>
            <p className="text-gray-600">Découvrez des professionnels qui partagent vos intérêts</p>
          </div>

          {/* Liste des suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectionSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-center">
                  <img
                    src={suggestion.profileImage}
                    alt={suggestion.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-gray-900 mb-1">{suggestion.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{suggestion.role}</p>
                  <p className="text-sm text-gray-500 mb-4">{suggestion.company}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Secteur:</span>
                      <span className="font-medium text-gray-900">{suggestion.sector}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Connexions mutuelles:</span>
                      <span className="font-medium text-gray-900">{suggestion.mutualConnections}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Score de compatibilité:</span>
                      <span className={`font-medium ${
                        suggestion.matchScore >= 90 ? 'text-green-600' :
                        suggestion.matchScore >= 80 ? 'text-blue-600' :
                        'text-orange-600'
                      }`}>
                        {suggestion.matchScore}%
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Intérêts communs:</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {suggestion.commonInterests.map((interest, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleConnectSuggestion(suggestion.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-user-add-line mr-2"></i>
                    Se Connecter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bannières publicitaires */}
      <div className="space-y-6">
        {/* Bannière en bas de la messagerie */}
        {activeTab === 'messaging' && (
          <AdBanner
            position="collaboration-messaging"
            format="banner"
            section="collaboration-tools"
            className="w-full"
            userContext={{
              userType: 'event-organizer',
              targetCategories: ['collaboration', 'communication', 'productivity'],
              priority: 'medium'
            }}
          />
        )}

        {/* Bannière à côté des groupes de réseautage */}
        {activeTab === 'networking' && (
          <AdBanner
            position="collaboration-networking"
            format="animated"
            section="collaboration-tools"
            className="w-full"
            userContext={{
              userType: 'event-organizer',
              targetCategories: ['networking', 'social-media', 'community'],
              priority: 'high'
            }}
          />
        )}

        {/* Bannière pour le contenu partagé */}
        {activeTab === 'content' && (
          <AdBanner
            position="collaboration-content"
            format="banner"
            section="collaboration-tools"
            className="w-full"
            userContext={{
              userType: 'event-organizer',
              targetCategories: ['document-management', 'cloud-storage', 'collaboration'],
              priority: 'medium'
            }}
          />
        )}

        {/* Bannière pour les suggestions */}
        {activeTab === 'suggestions' && (
          <AdBanner
            position="collaboration-suggestions"
            format="vertical"
            section="collaboration-tools"
            className="w-full"
            userContext={{
              userType: 'event-organizer',
              targetCategories: ['networking', 'crm', 'lead-generation'],
              priority: 'high'
            }}
          />
        )}
      </div>

      {/* Modals */}
      {showNewGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Créer un Nouveau Groupe</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nom du groupe"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="Description du groupe"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                <option>Sélectionner une catégorie</option>
                <option>Technologie</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>Environnement</option>
              </select>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowNewGroupModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Annuler
              </button>
              <button
                onClick={() => setShowNewGroupModal(false)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}

      {showContentUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Partager du Contenu</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Titre du contenu"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="Description"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <i className="ri-upload-cloud-line text-3xl text-gray-400 mb-2"></i>
                <p className="text-sm text-gray-600">Glissez-déposez vos fichiers ici ou cliquez pour sélectionner</p>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowContentUpload(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Annuler
              </button>
              <button
                onClick={() => setShowContentUpload(false)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                Partager
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { CollaborationTools };
