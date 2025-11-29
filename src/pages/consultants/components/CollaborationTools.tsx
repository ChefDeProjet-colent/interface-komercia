
import { useState } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';

export default function CollaborationTools() {
  const { getAds, recordImpression, recordClick } = useAdManager();
  const [activeTab, setActiveTab] = useState('messaging');
  const [selectedConversation, setSelectedConversation] = useState('techcorp');
  const [newMessage, setNewMessage] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'messaging', name: 'Messagerie', icon: 'ri-message-3-line' },
    { id: 'documents', name: 'Documents Partagés', icon: 'ri-file-text-line' },
    { id: 'recommendations', name: 'Suivi Recommandations', icon: 'ri-lightbulb-line' },
    { id: 'meetings', name: 'Réunions', icon: 'ri-calendar-event-line' }
  ];

  // Conversations de messagerie
  const conversations = [
    {
      id: 'techcorp',
      company: 'TechCorp Solutions',
      contact: 'Marie Dubois',
      role: 'Directrice Commerciale',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20woman%20director%20smiling%20confident%20corporate%20headshot&width=40&height=40&seq=marie-dubois&orientation=squarish',
      lastMessage: 'Merci pour l\'analyse détaillée. Pouvons-nous programmer une réunion pour discuter des recommandations ?',
      timestamp: '2024-01-15 14:30',
      unread: 2,
      status: 'online',
      priority: 'high'
    },
    {
      id: 'innovatesas',
      company: 'InnovateSAS',
      contact: 'Pierre Martin',
      role: 'CEO',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20man%20CEO%20confident%20executive%20headshot%20suit&width=40&height=40&seq=pierre-martin&orientation=squarish',
      lastMessage: 'Les KPI du Q4 sont disponibles. Je vous envoie le rapport dans la journée.',
      timestamp: '2024-01-15 11:15',
      unread: 0,
      status: 'away',
      priority: 'medium'
    },
    {
      id: 'globaltrade',
      company: 'GlobalTrade Ltd',
      contact: 'Sophie Chen',
      role: 'VP Sales',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20woman%20VP%20sales%20asian%20confident%20corporate%20headshot&width=40&height=40&seq=sophie-chen&orientation=squarish',
      lastMessage: 'La stratégie d\'expansion européenne avance bien. Résultats prometteurs !',
      timestamp: '2024-01-14 16:45',
      unread: 1,
      status: 'offline',
      priority: 'low'
    },
    {
      id: 'startupxyz',
      company: 'StartupXYZ',
      contact: 'Thomas Leroy',
      role: 'Fondateur',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20man%20startup%20founder%20young%20entrepreneur%20confident%20headshot&width=40&height=40&seq=thomas-leroy&orientation=squarish',
      lastMessage: 'Besoin d\'aide pour optimiser notre processus de vente. Disponible cette semaine ?',
      timestamp: '2024-01-14 09:20',
      unread: 3,
      status: 'online',
      priority: 'high'
    }
  ];

  // Messages pour la conversation sélectionnée
  const messages = {
    techcorp: [
      {
        id: 1,
        sender: 'Marie Dubois',
        content: 'Bonjour, j\'ai bien reçu votre rapport d\'analyse. Les insights sont très pertinents.',
        timestamp: '2024-01-15 09:15',
        type: 'received',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20woman%20director%20smiling%20confident%20corporate%20headshot&width=32&height=32&seq=marie-msg&orientation=squarish'
      },
      {
        id: 2,
        sender: 'Consultant',
        content: 'Merci Marie. J\'ai identifié 3 axes d\'amélioration majeurs pour votre équipe commerciale. Souhaitez-vous que nous les détaillions ensemble ?',
        timestamp: '2024-01-15 09:45',
        type: 'sent'
      },
      {
        id: 3,
        sender: 'Marie Dubois',
        content: 'Absolument ! Particulièrement intéressée par l\'optimisation du pipeline. Nos taux de conversion stagnent depuis 6 mois.',
        timestamp: '2024-01-15 10:30',
        type: 'received',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20woman%20director%20smiling%20confident%20corporate%20headshot&width=32&height=32&seq=marie-msg2&orientation=squarish'
      },
      {
        id: 4,
        sender: 'Consultant',
        content: 'Parfait. J\'ai préparé une présentation avec des recommandations spécifiques et des benchmarks sectoriels. Je vous l\'envoie dans l\'onglet Documents.',
        timestamp: '2024-01-15 11:00',
        type: 'sent'
      },
      {
        id: 5,
        sender: 'Marie Dubois',
        content: 'Merci pour l\'analyse détaillée. Pouvons-nous programmer une réunion pour discuter des recommandations ?',
        timestamp: '2024-01-15 14:30',
        type: 'received',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20woman%20director%20smiling%20confident%20corporate%20headshot&width=32&height=32&seq=marie-msg3&orientation=squarish'
      }
    ]
  };

  // Documents partagés
  const sharedDocuments = [
    {
      id: 1,
      name: 'Analyse Performance Q4 2024 - TechCorp',
      type: 'pdf',
      size: '2.4 MB',
      company: 'TechCorp Solutions',
      uploadedBy: 'Consultant Expert',
      uploadDate: '2024-01-15',
      downloads: 12,
      comments: 3,
      status: 'final',
      description: 'Analyse complète des performances commerciales Q4 avec recommandations stratégiques',
      tags: ['Performance', 'Q4', 'Stratégie', 'Recommandations']
    },
    {
      id: 2,
      name: 'Stratégie Expansion Européenne - GlobalTrade',
      type: 'pptx',
      size: '5.1 MB',
      company: 'GlobalTrade Ltd',
      uploadedBy: 'Sophie Chen',
      uploadDate: '2024-01-14',
      downloads: 8,
      comments: 5,
      status: 'review',
      description: 'Présentation détaillée de la stratégie d\'expansion sur les marchés européens',
      tags: ['Expansion', 'Europe', 'Stratégie', 'International']
    },
    {
      id: 3,
      name: 'Benchmark Concurrentiel - InnovateSAS',
      type: 'xlsx',
      size: '1.8 MB',
      company: 'InnovateSAS',
      uploadedBy: 'Consultant Expert',
      uploadDate: '2024-01-13',
      downloads: 15,
      comments: 2,
      status: 'final',
      description: 'Analyse comparative détaillée avec les principaux concurrents du secteur',
      tags: ['Benchmark', 'Concurrence', 'Analyse', 'Marché']
    },
    {
      id: 4,
      name: 'Plan Optimisation Processus - StartupXYZ',
      type: 'pdf',
      size: '3.2 MB',
      company: 'StartupXYZ',
      uploadedBy: 'Consultant Expert',
      uploadDate: '2024-01-12',
      downloads: 6,
      comments: 8,
      status: 'draft',
      description: 'Recommandations pour l\'optimisation des processus de vente et de gestion client',
      tags: ['Processus', 'Optimisation', 'Vente', 'CRM']
    }
  ];

  // Recommandations et leur suivi
  const recommendations = [
    {
      id: 1,
      title: 'Optimisation Pipeline Commercial',
      company: 'TechCorp Solutions',
      description: 'Mise en place d\'un système de scoring automatisé des leads et révision des étapes de qualification',
      status: 'en-cours',
      priority: 'high',
      assignedTo: 'Marie Dubois',
      createdDate: '2024-01-10',
      dueDate: '2024-02-15',
      progress: 65,
      impact: 'Augmentation prévue de 25% du taux de conversion',
      tasks: [
        { id: 1, name: 'Audit processus actuel', completed: true },
        { id: 2, name: 'Définition critères scoring', completed: true },
        { id: 3, name: 'Configuration CRM', completed: false },
        { id: 4, name: 'Formation équipes', completed: false },
        { id: 5, name: 'Tests et ajustements', completed: false }
      ],
      comments: [
        { author: 'Marie Dubois', date: '2024-01-14', content: 'L\'audit est terminé. Résultats très instructifs !' },
        { author: 'Consultant Expert', date: '2024-01-15', content: 'Parfait. Je prépare la configuration CRM pour la semaine prochaine.' }
      ]
    },
    {
      id: 2,
      title: 'Stratégie Expansion Géographique',
      company: 'GlobalTrade Ltd',
      description: 'Développement d\'une stratégie d\'expansion sur 3 nouveaux marchés européens avec analyse de faisabilité',
      status: 'implemente',
      priority: 'medium',
      assignedTo: 'Sophie Chen',
      createdDate: '2024-01-05',
      dueDate: '2024-01-30',
      progress: 100,
      impact: 'Ouverture de 3 nouveaux marchés, potentiel +40% CA',
      tasks: [
        { id: 1, name: 'Étude de marché', completed: true },
        { id: 2, name: 'Analyse concurrentielle', completed: true },
        { id: 3, name: 'Plan d\'entrée', completed: true },
        { id: 4, name: 'Validation direction', completed: true },
        { id: 5, name: 'Lancement pilote', completed: true }
      ],
      comments: [
        { author: 'Sophie Chen', date: '2024-01-28', content: 'Stratégie validée et mise en œuvre. Premiers résultats encourageants !' }
      ]
    },
    {
      id: 3,
      title: 'Digitalisation Processus Vente',
      company: 'StartupXYZ',
      description: 'Automatisation des tâches répétitives et mise en place d\'outils de suivi performance en temps réel',
      status: 'en-attente',
      priority: 'high',
      assignedTo: 'Thomas Leroy',
      createdDate: '2024-01-08',
      dueDate: '2024-02-20',
      progress: 20,
      impact: 'Gain de productivité estimé à 30% et amélioration suivi',
      tasks: [
        { id: 1, name: 'Audit processus manuels', completed: true },
        { id: 2, name: 'Sélection outils', completed: false },
        { id: 3, name: 'Intégration systèmes', completed: false },
        { id: 4, name: 'Formation utilisateurs', completed: false },
        { id: 5, name: 'Déploiement progressif', completed: false }
      ],
      comments: [
        { author: 'Thomas Leroy', date: '2024-01-12', content: 'Audit terminé. En attente de validation budget pour les outils.' },
        { author: 'Consultant Expert', date: '2024-01-13', content: 'J\'ai préparé 3 options avec différents budgets. Disponible pour présentation.' }
      ]
    },
    {
      id: 4,
      title: 'Amélioration Formation Commerciale',
      company: 'InnovateSAS',
      description: 'Programme de formation avancée pour l\'équipe commerciale sur les techniques de vente consultative',
      status: 'implemente',
      priority: 'medium',
      assignedTo: 'Pierre Martin',
      createdDate: '2024-01-03',
      dueDate: '2024-01-25',
      progress: 100,
      impact: 'Amélioration des compétences équipe et standardisation approche',
      tasks: [
        { id: 1, name: 'Évaluation besoins formation', completed: true },
        { id: 2, name: 'Conception programme', completed: true },
        { id: 3, name: 'Sessions formation', completed: true },
        { id: 4, name: 'Évaluation résultats', completed: true },
        { id: 5, name: 'Plan suivi', completed: true }
      ],
      comments: [
        { author: 'Pierre Martin', date: '2024-01-26', content: 'Formation terminée avec succès. Équipe très satisfaite des nouvelles méthodes.' }
      ]
    }
  ];

  // Réunions planifiées
  const meetings = [
    {
      id: 1,
      title: 'Revue Stratégique Q1 2024',
      company: 'TechCorp Solutions',
      participants: ['Marie Dubois', 'Consultant Expert', 'Équipe Direction'],
      date: '2024-01-18',
      time: '14:00',
      duration: '2h',
      type: 'visioconference',
      status: 'confirmed',
      agenda: [
        'Présentation résultats Q4',
        'Analyse recommandations implémentées',
        'Définition objectifs Q1',
        'Plan d\'action détaillé'
      ],
      location: 'Zoom - Lien envoyé par email',
      notes: 'Préparer slides avec KPI actualisés'
    },
    {
      id: 2,
      title: 'Point d\'avancement Expansion',
      company: 'GlobalTrade Ltd',
      participants: ['Sophie Chen', 'Consultant Expert'],
      date: '2024-01-19',
      time: '10:30',
      duration: '1h',
      type: 'presentiel',
      status: 'confirmed',
      agenda: [
        'Bilan premiers résultats',
        'Ajustements stratégie',
        'Prochaines étapes'
      ],
      location: 'Bureaux GlobalTrade - Salle de réunion A',
      notes: 'Apporter rapport détaillé des métriques'
    },
    {
      id: 3,
      title: 'Cadrage Projet Digitalisation',
      company: 'StartupXYZ',
      participants: ['Thomas Leroy', 'Consultant Expert', 'CTO'],
      date: '2024-01-20',
      time: '16:00',
      duration: '1h30',
      type: 'hybride',
      status: 'en-attente',
      agenda: [
        'Validation budget et timeline',
        'Sélection finale outils',
        'Plan de déploiement',
        'Définition jalons'
      ],
      location: 'Bureaux StartupXYZ + Visio pour consultant',
      notes: 'Attente confirmation budget de la direction'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en-cours': return 'bg-blue-100 text-blue-800';
      case 'implemente': return 'bg-green-100 text-green-800';
      case 'en-attente': return 'bg-yellow-100 text-yellow-800';
      case 'final': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return 'ri-file-pdf-line text-red-600';
      case 'xlsx': case 'xls': return 'ri-file-excel-line text-green-600';
      case 'pptx': case 'ppt': return 'ri-slideshow-line text-orange-600';
      case 'docx': case 'doc': return 'ri-file-word-line text-blue-600';
      default: return 'ri-file-line text-gray-600';
    }
  };

  // Gestion des actions avec états de chargement
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    setLoadingAction('send-message');
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Ajouter le message à la conversation
      setNewMessage('');
    } finally {
      setIsLoading(false);
      setLoadingAction('');
    }
  };

  const handleFileUpload = async (file) => {
    setLoadingAction('upload');
    setIsLoading(true);
    setUploadProgress(0);
    
    try {
      // Simulation d'upload avec progression
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      // Logique d'upload réelle ici
    } finally {
      setIsLoading(false);
      setLoadingAction('');
      setUploadProgress(0);
    }
  };

  const handleDownloadDocument = async (docId) => {
    setLoadingAction(`download-${docId}`);
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Simulation de téléchargement
      const doc = sharedDocuments.find(d => d.id === docId);
      if (doc) {
        // Créer un lien de téléchargement simulé
        const blob = new Blob([`Document: ${doc.name}`], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.name;
        a.click();
        URL.revokeObjectURL(url);
      }
    } finally {
      setIsLoading(false);
      setLoadingAction('');
    }
  };

  const handleCreateRecommendation = async (formData) => {
    setLoadingAction('create-recommendation');
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Logique de création de recommandation
      setShowRecommendationModal(false);
    } finally {
      setIsLoading(false);
      setLoadingAction('');
    }
  };

  const handleUpdateProgress = async (recId, newProgress) => {
    setLoadingAction(`progress-${recId}`);
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mettre à jour la progression
    } finally {
      setIsLoading(false);
      setLoadingAction('');
    }
  };

  const handleScheduleMeeting = async (meetingData) => {
    setLoadingAction('schedule-meeting');
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1800));
      // Planifier la réunion
    } finally {
      setIsLoading(false);
      setLoadingAction('');
    }
  };

  // Composant bouton avec état de chargement
  const LoadingButton = ({ onClick, loading, loadingText, children, className, variant = 'primary', disabled = false, icon = '', size = 'md' }) => {
    const baseClasses = "rounded-lg font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap flex items-center justify-center";
    const sizes = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base"
    };
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 shadow-lg hover:shadow-xl",
      success: "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl",
      warning: "bg-yellow-600 text-white hover:bg-yellow-700 shadow-lg hover:shadow-xl",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl",
      outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
      ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    };

    return (
      <button
        onClick={onClick}
        disabled={loading || disabled}
        className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${loading || disabled ? 'opacity-50 cursor-not-allowed transform-none' : ''} ${className}`}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            {loadingText}
          </>
        ) : (
          <>
            {icon && <i className={`${icon} mr-2`}></i>}
            {children}
          </>
        )}
      </button>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'messaging':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
            {/* Liste des conversations avec boutons d'action */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Conversations</h3>
                  <LoadingButton
                    onClick={() => setSearchQuery('')}
                    variant="ghost"
                    size="sm"
                    icon="ri-search-line"
                  >
                    Rechercher
                  </LoadingButton>
                </div>
                <input
                  type="text"
                  placeholder="Rechercher une conversation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="overflow-y-auto h-80">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <img
                          src={conversation.avatar}
                          alt={conversation.contact}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          conversation.status === 'online' ? 'bg-green-500' :
                          conversation.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {conversation.contact}
                          </p>
                          {conversation.unread > 0 && (
                            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{conversation.company}</p>
                        <p className="text-xs text-gray-600 mt-1 truncate">
                          {conversation.lastMessage}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">
                            {new Date(conversation.timestamp).toLocaleTimeString('fr-FR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                          <div className="flex items-center space-x-1">
                            <LoadingButton
                              onClick={(e) => {
                                e.stopPropagation();
                                handleScheduleMeeting({ conversationId: conversation.id });
                              }}
                              loading={isLoading && loadingAction === 'schedule-meeting'}
                              variant="ghost"
                              size="sm"
                              icon="ri-calendar-line"
                              className="p-1"
                            />
                            <LoadingButton
                              onClick={(e) => {
                                e.stopPropagation();
                                // Marquer comme important
                              }}
                              variant="ghost"
                              size="sm"
                              icon="ri-star-line"
                              className="p-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone de conversation avec boutons améliorés */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border flex flex-col">
              {selectedConversation && (
                <>
                  {/* En-tête conversation avec actions */}
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={conversations.find(c => c.id === selectedConversation)?.avatar}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {conversations.find(c => c.id === selectedConversation)?.contact}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {conversations.find(c => c.id === selectedConversation)?.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <LoadingButton
                          onClick={() => handleScheduleMeeting({ type: 'call' })}
                          loading={isLoading && loadingAction === 'schedule-meeting'}
                          variant="ghost"
                          size="sm"
                          icon="ri-phone-line"
                        />
                        <LoadingButton
                          onClick={() => handleScheduleMeeting({ type: 'video' })}
                          loading={isLoading && loadingAction === 'schedule-meeting'}
                          variant="ghost"
                          size="sm"
                          icon="ri-video-line"
                        />
                        <LoadingButton
                          variant="ghost"
                          size="sm"
                          icon="ri-more-line"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages[selectedConversation]?.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                          message.type === 'sent' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          {message.type === 'received' && (
                            <img
                              src={message.avatar}
                              alt=""
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                          <div className={`px-4 py-2 rounded-lg ${
                            message.type === 'sent'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.type === 'sent' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {new Date(message.timestamp).toLocaleTimeString('fr-FR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Zone de saisie améliorée */}
                  <div className="p-4 border-t">
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            handleFileUpload(e.target.files[0]);
                          }
                        }}
                      />
                      <LoadingButton
                        onClick={() => document.getElementById('file-upload').click()}
                        loading={isLoading && loadingAction === 'upload'}
                        loadingText={`${uploadProgress}%`}
                        variant="ghost"
                        size="sm"
                        icon="ri-attachment-line"
                      />
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Tapez votre message..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                      />
                      <LoadingButton
                        onClick={handleSendMessage}
                        loading={isLoading && loadingAction === 'send-message'}
                        loadingText="Envoi..."
                        variant="primary"
                        size="sm"
                        icon="ri-send-plane-line"
                        disabled={!newMessage.trim()}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Documents Partagés</h3>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Rechercher un document..."
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <LoadingButton
                  onClick={() => setShowDocumentModal(true)}
                  loading={isLoading && loadingAction === 'upload'}
                  loadingText="Préparation..."
                  variant="primary"
                  icon="ri-upload-line"
                >
                  Partager Document
                </LoadingButton>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sharedDocuments.map((doc) => (
                <div key={doc.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <i className={`${getFileIcon(doc.type)} text-2xl`}></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{doc.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.company}</span>
                          <span>•</span>
                          <span>{new Date(doc.uploadDate).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status === 'final' ? 'Final' : 
                       doc.status === 'review' ? 'En révision' : 'Brouillon'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {doc.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <i className="ri-download-line mr-1"></i>
                        {doc.downloads}
                      </span>
                      <span className="flex items-center">
                        <i className="ri-message-line mr-1"></i>
                        {doc.comments}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <LoadingButton
                        onClick={() => handleDownloadDocument(doc.id)}
                        loading={isLoading && loadingAction === `download-${doc.id}`}
                        loadingText="Téléchargement..."
                        variant="ghost"
                        size="sm"
                        icon="ri-download-line"
                      >
                        Télécharger
                      </LoadingButton>
                      <LoadingButton
                        onClick={() => setSelectedDocument(doc)}
                        variant="ghost"
                        size="sm"
                        icon="ri-message-line"
                      >
                        Commenter
                      </LoadingButton>
                      <LoadingButton
                        variant="ghost"
                        size="sm"
                        icon="ri-share-line"
                      >
                        Partager
                      </LoadingButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'recommendations':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Suivi des Recommandations</h3>
              <LoadingButton
                onClick={() => setShowRecommendationModal(true)}
                variant="primary"
                icon="ri-add-line"
              >
                Nouvelle Recommandation
              </LoadingButton>
            </div>

            <div className="space-y-6">
              {recommendations.map((rec) => (
                <div key={rec.id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{rec.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rec.status)}`}>
                          {rec.status === 'en-cours' ? 'En cours' :
                           rec.status === 'implemente' ? 'Implémenté' : 'En attente'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                          {rec.priority === 'high' ? 'Priorité haute' : 
                           rec.priority === 'medium' ? 'Priorité moyenne' : 'Priorité faible'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{rec.company}</p>
                      <p className="text-gray-700 mb-3">{rec.description}</p>
                      <p className="text-sm text-green-700 bg-green-50 p-2 rounded-lg">{rec.impact}</p>
                    </div>
                    <div className="text-right ml-6">
                      <div className="text-2xl font-bold text-blue-600">{rec.progress}%</div>
                      <div className="text-sm text-gray-500">Progression</div>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${rec.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-3">Tâches</h5>
                      <div className="space-y-2">
                        {rec.tasks.map((task) => (
                          <div key={task.id} className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                              task.completed 
                                ? 'bg-green-600 border-green-600' 
                                : 'border-gray-300'
                            }`}>
                              {task.completed && (
                                <i className="ri-check-line text-white text-xs"></i>
                              )}
                            </div>
                            <span className={`text-sm ${
                              task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                            }`}>
                              {task.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-900 mb-3">Informations</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Assigné à:</span>
                          <span className="text-gray-900">{rec.assignedTo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Créé le:</span>
                          <span className="text-gray-900">{new Date(rec.createdDate).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Échéance:</span>
                          <span className="text-gray-900">{new Date(rec.dueDate).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {rec.comments.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-3">Commentaires récents</h5>
                      <div className="space-y-2">
                        {rec.comments.slice(-2).map((comment, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                              <span className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString('fr-FR')}</span>
                            </div>
                            <p className="text-sm text-gray-700">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Boutons d'action pour les recommandations */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-3">
                      <LoadingButton
                        onClick={() => handleUpdateProgress(rec.id, rec.progress + 10)}
                        loading={isLoading && loadingAction === `progress-${rec.id}`}
                        loadingText="Mise à jour..."
                        variant="outline"
                        size="sm"
                        icon="ri-arrow-up-line"
                      >
                        Mettre à jour
                      </LoadingButton>
                      <LoadingButton
                        onClick={() => setShowRecommendationModal(true)}
                        variant="ghost"
                        size="sm"
                        icon="ri-message-line"
                      >
                        Commenter
                      </LoadingButton>
                    </div>
                    <div className="flex items-center space-x-2">
                      <LoadingButton
                        onClick={() => setShowRecommendationModal(true)}
                        variant="ghost"
                        size="sm"
                        icon="ri-edit-line"
                      >
                        Modifier
                      </LoadingButton>
                      <LoadingButton
                        variant="ghost"
                        size="sm"
                        icon="ri-share-line"
                      >
                        Partager
                      </LoadingButton>
                      <LoadingButton
                        variant="success"
                        size="sm"
                        icon="ri-check-line"
                        disabled={rec.status === 'implemente'}
                      >
                        Marquer terminé
                      </LoadingButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'meetings':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Réunions Planifiées</h3>
              <LoadingButton
                onClick={() => handleScheduleMeeting({})}
                loading={isLoading && loadingAction === 'schedule-meeting'}
                loadingText="Planification..."
                variant="primary"
                icon="ri-calendar-event-line"
              >
                Planifier Réunion
              </LoadingButton>
            </div>

            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{meeting.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                          {meeting.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          meeting.type === 'visioconference' ? 'bg-blue-100 text-blue-800' :
                          meeting.type === 'presentiel' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {meeting.type === 'visioconference' ? 'Visio' :
                           meeting.type === 'presentiel' ? 'Présentiel' : 'Hybride'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{meeting.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <i className="ri-calendar-line mr-1"></i>
                          {new Date(meeting.date).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="flex items-center">
                          <i className="ri-time-line mr-1"></i>
                          {meeting.time}
                        </span>
                        <span className="flex items-center">
                          <i className="ri-timer-line mr-1"></i>
                          {meeting.duration}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        <i className="ri-map-pin-line mr-1"></i>
                        {meeting.location}
                      </p>
                      {meeting.notes && (
                        <p className="text-sm text-blue-700 bg-blue-50 p-2 rounded-lg">
                          <i className="ri-information-line mr-1"></i>
                          {meeting.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Participants</h5>
                      <div className="space-y-1">
                        {meeting.participants.map((participant, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-700">
                            <i className="ri-user-line mr-2 text-gray-400"></i>
                            {participant}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Ordre du jour</h5>
                      <div className="space-y-1">
                        {meeting.agenda.map((item, index) => (
                          <div key={index} className="flex items-start text-sm text-gray-700">
                            <span className="text-blue-600 mr-2 mt-1">•</span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t">
                    <LoadingButton
                      variant="ghost"
                      size="sm"
                      icon="ri-edit-line"
                    >
                      Modifier
                    </LoadingButton>
                    <LoadingButton
                      variant="success"
                      size="sm"
                      icon="ri-video-line"
                    >
                      Rejoindre
                    </LoadingButton>
                    <LoadingButton
                      variant="outline"
                      size="sm"
                      icon="ri-calendar-line"
                    >
                      Reprogrammer
                    </LoadingButton>
                    <LoadingButton
                      variant="danger"
                      size="sm"
                      icon="ri-close-line"
                    >
                      Annuler
                    </LoadingButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Bannières publicitaires spécialisées
  const messagingAds = getAds('consultants-collaboration-messaging', 1, {
    targetAudience: ['consultant', 'business-advisor'],
    preferredCategories: ['collaboration', 'communication', 'productivity'],
    userType: 'enterprise'
  });

  const documentsAds = getAds('consultants-collaboration-documents', 1, {
    targetAudience: ['consultant', 'business-advisor'],
    preferredCategories: ['document-management', 'collaboration', 'productivity'],
    userType: 'enterprise'
  });

  const footerAds = getAds('consultants-collaboration-footer', 1, {
    targetAudience: ['consultant', 'business-advisor'],
    preferredCategories: ['collaboration', 'project-management', 'consulting-tools'],
    userType: 'enterprise'
  });

  const handleAdClick = (ad: any, section: string) => {
    recordClick(ad.id, section, 'button', {
      userType: 'consultant',
      section: 'collaboration-tools',
      activeTab: activeTab
    });
    window.open(ad.link, '_blank');
  };

  const handleAdImpression = (ad: any, section: string) => {
    recordImpression(ad.id, section, {
      userType: 'consultant',
      section: 'collaboration-tools',
      activeTab: activeTab
    });
  };

  return (
    <div className="space-y-6">
      {/* Navigation par onglets avec indicateurs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors relative ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.name}
                {/* Indicateurs de notifications */}
                {tab.id === 'messaging' && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                )}
                {tab.id === 'recommendations' && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>

      {/* Bannières publicitaires contextuelles */}
      {activeTab === 'messaging' && messagingAds.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <i className="ri-message-3-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{messagingAds[0].title}</h3>
                <p className="text-gray-600">{messagingAds[0].description}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-blue-600 font-medium">Communication unifiée</span>
                  <span className="text-sm text-gray-500 ml-2">• Intégrations CRM</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button 
                onClick={() => handleAdClick(messagingAds[0], 'consultants-collaboration-messaging')}
                onLoad={() => handleAdImpression(messagingAds[0], 'consultants-collaboration-messaging')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Découvrir la solution
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && documentsAds.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <i className="ri-folder-cloud-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{documentsAds[0].title}</h3>
                <p className="text-gray-600">{documentsAds[0].description}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-green-600 font-medium">Stockage sécurisé</span>
                  <span className="text-sm text-gray-500 ml-2">• Collaboration temps réel</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button 
                onClick={() => handleAdClick(documentsAds[0], 'consultants-collaboration-documents')}
                onLoad={() => handleAdImpression(documentsAds[0], 'consultants-collaboration-documents')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
              >
                Essayer gratuitement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bannière publicitaire pied de page */}
      {footerAds.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <i className="ri-team-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{footerAds[0].title}</h3>
                <p className="text-gray-600">{footerAds[0].description}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-purple-600 font-medium">Gestion projets avancée</span>
                  <span className="text-sm text-gray-500 ml-2">• Suivi temps réel</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button 
                onClick={() => handleAdClick(footerAds[0], 'consultants-collaboration-footer')}
                onLoad={() => handleAdImpression(footerAds[0], 'consultants-collaboration-footer')}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
              >
                Voir la démo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showDocumentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Partager un Document</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fichier</label>
                <input type="file" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>TechCorp Solutions</option>
                  <option>InnovateSAS</option>
                  <option>GlobalTrade Ltd</option>
                  <option>StartupXYZ</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3}></textarea>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowDocumentModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Partager
              </button>
            </div>
          </div>
        </div>
      )}

      {showRecommendationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nouvelle Recommandation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>TechCorp Solutions</option>
                  <option>InnovateSAS</option>
                  <option>GlobalTrade Ltd</option>
                  <option>StartupXYZ</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3}></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option value="high">Haute</option>
                    <option value="medium">Moyenne</option>
                    <option value="low">Faible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Échéance</label>
                  <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowRecommendationModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Créer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add named export for compatibility with named imports
export { CollaborationTools };
