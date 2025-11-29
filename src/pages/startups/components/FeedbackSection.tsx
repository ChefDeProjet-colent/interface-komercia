import { useState, useEffect } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';
import AdBanner from '../../../components/feature/AdBanner';

interface Feedback {
  id: string;
  type: 'positive' | 'negative' | 'suggestion';
  title: string;
  content: string;
  rating: number;
  source: 'event' | 'product' | 'service' | 'survey';
  customer: {
    name: string;
    email: string;
    company: string;
    segment: string;
  };
  date: string;
  status: 'new' | 'reviewed' | 'implemented' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  tags: string[];
  assignedTo?: string;
  response?: string;
  actionTaken?: string;
  relatedEvent?: string;
  sentiment: number; // -1 à 1
}

interface FeedbackStats {
  total: number;
  positive: number;
  negative: number;
  suggestions: number;
  averageRating: number;
  responseRate: number;
  implementationRate: number;
  trends: {
    period: string;
    positive: number;
    negative: number;
    suggestions: number;
  }[];
}

export default function FeedbackSection() {
  const { trackAction } = useAdManager();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [showCreateSurvey, setShowCreateSurvey] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    trackAction('view-feedback-section');
    loadFeedbacks();
    loadStats();
  }, []);

  const loadFeedbacks = () => {
    const mockFeedbacks: Feedback[] = [
      {
        id: '1',
        type: 'positive',
        title: 'Excellente démonstration produit',
        content: 'La démonstration était très claire et a parfaitement répondu à nos besoins. L\'équipe commerciale était très professionnelle et a su adapter la présentation à notre contexte.',
        rating: 5,
        source: 'event',
        customer: {
          name: 'Jean Dupont',
          email: 'jean.dupont@techcorp.com',
          company: 'TechCorp Solutions',
          segment: 'Enterprise'
        },
        date: '2024-03-22',
        status: 'reviewed',
        priority: 'medium',
        category: 'Présentation',
        tags: ['démonstration', 'professionnel', 'adapté'],
        assignedTo: 'Sarah Martin',
        response: 'Merci pour ce retour positif ! Nous sommes ravis que la démonstration ait répondu à vos attentes.',
        relatedEvent: 'Démonstration Produit - TechCorp',
        sentiment: 0.9
      },
      {
        id: '2',
        type: 'negative',
        title: 'Problème technique durant la démo',
        content: 'La démonstration a été interrompue plusieurs fois par des problèmes techniques. Cela a nui à la compréhension du produit et a donné une impression peu professionnelle.',
        rating: 2,
        source: 'event',
        customer: {
          name: 'Marie Durand',
          email: 'marie.durand@innovate.com',
          company: 'InnovateDigital',
          segment: 'SMB'
        },
        date: '2024-03-20',
        status: 'implemented',
        priority: 'high',
        category: 'Technique',
        tags: ['problème technique', 'interruption', 'professionnalisme'],
        assignedTo: 'Thomas Dubois',
        response: 'Nous nous excusons pour ces problèmes techniques. Nous avons mis en place de nouveaux protocoles de test.',
        actionTaken: 'Mise en place de tests techniques systématiques avant chaque démonstration',
        sentiment: -0.7
      },
      {
        id: '3',
        type: 'suggestion',
        title: 'Améliorer la documentation API',
        content: 'Il serait utile d\'avoir une documentation API plus détaillée avec des exemples concrets d\'intégration. Cela faciliterait l\'évaluation technique.',
        rating: 4,
        source: 'product',
        customer: {
          name: 'Pierre Leroy',
          email: 'pierre.leroy@devstudio.fr',
          company: 'DevStudio',
          segment: 'Developer'
        },
        date: '2024-03-18',
        status: 'new',
        priority: 'medium',
        category: 'Documentation',
        tags: ['API', 'documentation', 'exemples', 'intégration'],
        sentiment: 0.3
      },
      {
        id: '4',
        type: 'positive',
        title: 'Service client réactif',
        content: 'L\'équipe support a été très réactive pour résoudre notre problème d\'intégration. Réponse en moins de 2 heures et solution efficace.',
        rating: 5,
        source: 'service',
        customer: {
          name: 'Sophie Bernard',
          email: 'sophie@startuphub.fr',
          company: 'StartupHub Paris',
          segment: 'Startup'
        },
        date: '2024-03-15',
        status: 'reviewed',
        priority: 'low',
        category: 'Support',
        tags: ['réactif', 'efficace', 'support'],
        assignedTo: 'Claire Moreau',
        response: 'Merci ! Nous nous efforçons de maintenir ce niveau de service.',
        sentiment: 0.8
      },
      {
        id: '5',
        type: 'suggestion',
        title: 'Interface mobile à améliorer',
        content: 'L\'interface mobile pourrait être plus intuitive. Certains boutons sont difficiles à atteindre sur smartphone et la navigation n\'est pas optimale.',
        rating: 3,
        source: 'product',
        customer: {
          name: 'Laurent Petit',
          email: 'laurent@mobileapp.com',
          company: 'MobileApp Solutions',
          segment: 'SMB'
        },
        date: '2024-03-12',
        status: 'reviewed',
        priority: 'high',
        category: 'UX/UI',
        tags: ['mobile', 'interface', 'navigation', 'ergonomie'],
        assignedTo: 'Design Team',
        sentiment: -0.2
      },
      {
        id: '6',
        type: 'negative',
        title: 'Tarification peu claire',
        content: 'La grille tarifaire n\'est pas assez transparente. Il est difficile de comprendre ce qui est inclus dans chaque forfait et les coûts additionnels.',
        rating: 2,
        source: 'survey',
        customer: {
          name: 'Anne Moreau',
          email: 'anne@budget.com',
          company: 'Budget Solutions',
          segment: 'SMB'
        },
        date: '2024-03-10',
        status: 'new',
        priority: 'urgent',
        category: 'Pricing',
        tags: ['tarification', 'transparence', 'forfait'],
        sentiment: -0.6
      }
    ];
    setFeedbacks(mockFeedbacks);
  };

  const loadStats = () => {
    const mockStats: FeedbackStats = {
      total: 156,
      positive: 89,
      negative: 34,
      suggestions: 33,
      averageRating: 4.2,
      responseRate: 87,
      implementationRate: 65,
      trends: [
        { period: 'Jan 2024', positive: 25, negative: 8, suggestions: 12 },
        { period: 'Fév 2024', positive: 32, negative: 12, suggestions: 9 },
        { period: 'Mar 2024', positive: 32, negative: 14, suggestions: 12 }
      ]
    };
    setStats(mockStats);
  };

  const handleCreateSurvey = () => {
    trackAction('create-feedback-survey');
    setShowCreateSurvey(true);
  };

  const handleCreateFeedbackForm = () => {
    trackAction('create-feedback-form');
    setShowFeedbackForm(true);
  };

  const handleViewFeedback = (feedback: Feedback) => {
    trackAction('view-feedback-details', { feedbackId: feedback.id });
    setSelectedFeedback(feedback);
  };

  const handleUpdateStatus = (feedbackId: string, newStatus: Feedback['status']) => {
    trackAction('update-feedback-status', { feedbackId, newStatus });
    setFeedbacks(prev => prev.map(f => 
      f.id === feedbackId ? { ...f, status: newStatus } : f
    ));
    alert(`Statut mis à jour vers "${newStatus}"`);
  };

  const handleAssignFeedback = (feedbackId: string, assignee: string) => {
    trackAction('assign-feedback', { feedbackId, assignee });
    setFeedbacks(prev => prev.map(f => 
      f.id === feedbackId ? { ...f, assignedTo: assignee } : f
    ));
    alert(`Retour assigné à ${assignee}`);
  };

  const handleSendResponse = (feedbackId: string, response: string) => {
    trackAction('send-feedback-response', { feedbackId });
    setFeedbacks(prev => prev.map(f => 
      f.id === feedbackId ? { ...f, response, status: 'reviewed' } : f
    ));
    alert('Réponse envoyée au client !');
  };

  const getTypeColor = (type: Feedback['type']) => {
    switch (type) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      case 'suggestion': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: Feedback['type']) => {
    switch (type) {
      case 'positive': return 'ri-thumb-up-line';
      case 'negative': return 'ri-thumb-down-line';
      case 'suggestion': return 'ri-lightbulb-line';
      default: return 'ri-chat-3-line';
    }
  };

  const getStatusColor = (status: Feedback['status']) => {
    switch (status) {
      case 'new': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'implemented': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Feedback['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (filter !== 'all' && feedback.type !== filter) return false;
    if (selectedCategory !== 'all' && feedback.category !== selectedCategory) return false;
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date': return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'rating': return b.rating - a.rating;
      case 'priority': 
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      default: return 0;
    }
  });

  const categories = [...new Set(feedbacks.map(f => f.category))];

  return (
    <div className="space-y-6">
      {/* Bannière publicitaire en haut */}
      <AdBanner 
        position="feedback-header" 
        format="banner"
        section="feedback"
        className="mb-6"
        userContext={{ section: 'feedback', priority: 'high' }}
        targetCategories={['analytics', 'customer-support', 'survey-tools']}
      />

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Suivi des Retours Clients</h2>
          <div className="flex space-x-3">
            <button
              onClick={handleCreateFeedbackForm}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-file-list-line mr-2"></i>
              Créer Formulaire
            </button>
            <button
              onClick={handleCreateSurvey}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-survey-line mr-2"></i>
              Créer Enquête
            </button>
          </div>
        </div>

        {/* Statistiques globales */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Retours</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <i className="ri-chat-3-line text-3xl text-blue-200"></i>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Retours Positifs</p>
                  <p className="text-3xl font-bold">{stats.positive}</p>
                  <p className="text-green-100 text-xs">{Math.round((stats.positive / stats.total) * 100)}% du total</p>
                </div>
                <i className="ri-thumb-up-line text-3xl text-green-200"></i>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Note Moyenne</p>
                  <p className="text-3xl font-bold">{stats.averageRating}/5</p>
                  <div className="flex space-x-1 mt-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <i key={star} className={`ri-star-${star <= Math.round(stats.averageRating) ? 'fill' : 'line'} text-orange-200`}></i>
                    ))}
                  </div>
                </div>
                <i className="ri-star-line text-3xl text-orange-200"></i>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Taux Réponse</p>
                  <p className="text-3xl font-bold">{stats.responseRate}%</p>
                  <p className="text-purple-100 text-xs">Implémentation: {stats.implementationRate}%</p>
                </div>
                <i className="ri-reply-line text-3xl text-purple-200"></i>
              </div>
            </div>
          </div>
        )}

        {/* Graphique des tendances */}
        {stats && (
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendances des Retours</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.trends.map((trend, index) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">{trend.period}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600">Positifs</span>
                      <span className="font-medium text-green-600">{trend.positive}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-red-600">Négatifs</span>
                      <span className="font-medium text-red-600">{trend.negative}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600">Suggestions</span>
                      <span className="font-medium text-blue-600">{trend.suggestions}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filtres et tri */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous ({feedbacks.length})
            </button>
            <button
              onClick={() => setFilter('positive')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'positive' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Positifs ({feedbacks.filter(f => f.type === 'positive').length})
            </button>
            <button
              onClick={() => setFilter('negative')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'negative' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Négatifs ({feedbacks.filter(f => f.type === 'negative').length})
            </button>
            <button
              onClick={() => setFilter('suggestion')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'suggestion' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Suggestions ({feedbacks.filter(f => f.type === 'suggestion').length})
            </button>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm pr-8"
          >
            <option value="all">Toutes catégories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm pr-8"
          >
            <option value="date">Trier par date</option>
            <option value="rating">Trier par note</option>
            <option value="priority">Trier par priorité</option>
          </select>
        </div>

        {/* Liste des retours */}
        <div className="space-y-4">
          {filteredFeedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <i className={`${getTypeIcon(feedback.type)} text-lg`}></i>
                    <h3 className="text-lg font-semibold text-gray-900">{feedback.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(feedback.type)}`}>
                      {feedback.type === 'positive' ? 'Positif' : 
                       feedback.type === 'negative' ? 'Négatif' : 'Suggestion'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                      {feedback.status === 'new' ? 'Nouveau' :
                       feedback.status === 'reviewed' ? 'Examiné' :
                       feedback.status === 'implemented' ? 'Implémenté' : 'Rejeté'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(feedback.priority)}`}>
                      {feedback.priority === 'urgent' ? 'Urgent' :
                       feedback.priority === 'high' ? 'Élevé' :
                       feedback.priority === 'medium' ? 'Moyen' : 'Faible'}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{feedback.content}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                    <div className="flex items-center space-x-2">
                      <i className="ri-user-line text-gray-400"></i>
                      <span>{feedback.customer.name} - {feedback.customer.company}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-calendar-line text-gray-400"></i>
                      <span>{new Date(feedback.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-star-line text-gray-400"></i>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <i key={star} className={`ri-star-${star <= feedback.rating ? 'fill' : 'line'} text-yellow-400`}></i>
                        ))}
                      </div>
                      <span>({feedback.rating}/5)</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm mb-3">
                    <div className="flex items-center space-x-2">
                      <i className="ri-price-tag-3-line text-gray-400"></i>
                      <span className="text-gray-600">Catégorie: <span className="font-medium">{feedback.category}</span></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-database-line text-gray-400"></i>
                      <span className="text-gray-600">Source: <span className="font-medium">{feedback.source}</span></span>
                    </div>
                    {feedback.assignedTo && (
                      <div className="flex items-center space-x-2">
                        <i className="ri-user-star-line text-gray-400"></i>
                        <span className="text-gray-600">Assigné à: <span className="font-medium">{feedback.assignedTo}</span></span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {feedback.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Réponse si disponible */}
                  {feedback.response && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <i className="ri-reply-line text-blue-600"></i>
                        <span className="text-sm font-medium text-blue-700">Réponse envoyée</span>
                      </div>
                      <p className="text-sm text-blue-800">{feedback.response}</p>
                    </div>
                  )}

                  {/* Action prise si disponible */}
                  {feedback.actionTaken && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <i className="ri-check-line text-green-600"></i>
                        <span className="text-sm font-medium text-green-700">Action implémentée</span>
                      </div>
                      <p className="text-sm text-green-800">{feedback.actionTaken}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => handleViewFeedback(feedback)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Détails
                  </button>
                  
                  {feedback.status === 'new' && (
                    <button
                      onClick={() => handleUpdateStatus(feedback.id, 'reviewed')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Examiner
                    </button>
                  )}
                  
                  {feedback.status === 'reviewed' && feedback.type === 'suggestion' && (
                    <button
                      onClick={() => handleUpdateStatus(feedback.id, 'implemented')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Implémenter
                    </button>
                  )}
                  
                  {!feedback.response && (
                    <button
                      onClick={() => {
                        const response = prompt('Votre réponse au client:');
                        if (response) handleSendResponse(feedback.id, response);
                      }}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-reply-line mr-1"></i>
                      Répondre
                    </button>
                  )}
                  
                  {!feedback.assignedTo && (
                    <button
                      onClick={() => {
                        const assignee = prompt('Assigner à:');
                        if (assignee) handleAssignFeedback(feedback.id, assignee);
                      }}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-user-add-line mr-1"></i>
                      Assigner
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFeedbacks.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-chat-3-line text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun retour trouvé</h3>
            <p className="text-gray-600">Créez une enquête pour commencer à collecter des retours</p>
          </div>
        )}
      </div>

      {/* Bannière publicitaire pour outils d'analyse de feedback */}
      <AdBanner 
        position="feedback-footer" 
        format="banner"
        section="feedback"
        userContext={{ section: 'feedback-analysis', priority: 'medium' }}
        targetCategories={['analytics', 'customer-support', 'survey-tools']}
      />

      {/* Modal de création d'enquête */}
      {showCreateSurvey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Créer une Enquête de Satisfaction</h2>
                <button
                  onClick={() => setShowCreateSurvey(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre de l'enquête</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Enquête de satisfaction post-démonstration"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Décrivez l'objectif de cette enquête..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type d'enquête</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                    <option value="post-event">Après événement</option>
                    <option value="post-purchase">Après achat</option>
                    <option value="periodic">Enquête périodique</option>
                    <option value="product-feedback">Retour produit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Questions à inclure</label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Note globale de satisfaction (1-5)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Qualité de la présentation</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Pertinence du contenu</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Probabilité de recommandation (NPS)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Commentaires libres</span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      trackAction('create-survey-form');
                      alert('Enquête créée avec succès !');
                      setShowCreateSurvey(false);
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Créer l'Enquête
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateSurvey(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de création de formulaire de retour */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Créer un Formulaire de Retour</h2>
                <button
                  onClick={() => setShowFeedbackForm(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom du formulaire</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Formulaire de retour produit"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Page de destination</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                    <option value="website">Site web principal</option>
                    <option value="product">Page produit</option>
                    <option value="support">Page support</option>
                    <option value="email">Email de suivi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Champs à inclure</label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Type de retour (positif/négatif/suggestion)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Note de satisfaction</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Commentaire détaillé</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Informations de contact</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Catégorie du retour</span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      trackAction('create-feedback-form');
                      alert('Formulaire de retour créé avec succès !');
                      setShowFeedbackForm(false);
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Créer le Formulaire
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFeedbackForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de détails du retour */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Détails du Retour Client</h2>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                {/* En-tête du retour */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <i className={`${getTypeIcon(selectedFeedback.type)} text-2xl`}></i>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedFeedback.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedFeedback.type)}`}>
                      {selectedFeedback.type === 'positive' ? 'Positif' : 
                       selectedFeedback.type === 'negative' ? 'Négatif' : 'Suggestion'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <i className="ri-star-line text-gray-400"></i>
                      <span>Note: {selectedFeedback.rating}/5</span>
                      <div className="flex space-x-1 ml-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <i key={star} className={`ri-star-${star <= selectedFeedback.rating ? 'fill' : 'line'} text-yellow-400`}></i>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-calendar-line text-gray-400"></i>
                      <span>{new Date(selectedFeedback.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </div>

                {/* Contenu du retour */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Commentaire</h4>
                  <p className="text-gray-700 bg-gray-50 rounded-lg p-4">{selectedFeedback.content}</p>
                </div>

                {/* Informations client */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Informations Client</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Nom:</span>
                        <p className="font-medium">{selectedFeedback.customer.name}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Email:</span>
                        <p className="font-medium">{selectedFeedback.customer.email}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Entreprise:</span>
                        <p className="font-medium">{selectedFeedback.customer.company}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Segment:</span>
                        <p className="font-medium">{selectedFeedback.customer.segment}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Métadonnées */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Détails</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <span className="text-sm text-gray-600">Catégorie</span>
                      <p className="font-medium">{selectedFeedback.category}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <span className="text-sm text-gray-600">Source</span>
                      <p className="font-medium">{selectedFeedback.source}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <span className="text-sm text-gray-600">Priorité</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedFeedback.priority)}`}>
                        {selectedFeedback.priority === 'urgent' ? 'Urgent' :
                         selectedFeedback.priority === 'high' ? 'Élevé' :
                         selectedFeedback.priority === 'medium' ? 'Moyen' : 'Faible'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFeedback.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      trackAction('contact-customer', { feedbackId: selectedFeedback.id });
                      window.location.href = `mailto:${selectedFeedback.customer.email}`;
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-mail-line mr-2"></i>
                    Contacter Client
                  </button>
                  <button
                    onClick={() => {
                      trackAction('create-task-from-feedback', { feedbackId: selectedFeedback.id });
                      alert('Tâche créée à partir de ce retour !');
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-task-line mr-2"></i>
                    Créer Tâche
                  </button>
                  <button
                    onClick={() => {
                      trackAction('export-feedback', { feedbackId: selectedFeedback.id });
                      alert('Retour exporté !');
                    }}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-download-line mr-2"></i>
                    Exporter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { FeedbackSection };