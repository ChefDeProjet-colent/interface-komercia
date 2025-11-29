import { useState, useEffect } from 'react';
import LoadingButton from '../../../components/base/LoadingButton';

export default function SalesCollaboration() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState('messages');
  const [newMessage, setNewMessage] = useState('');
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const [conversations] = useState([
    {
      id: 1,
      name: 'Marie Dubois',
      company: 'TechCorp Solutions',
      avatar: 'MD',
      lastMessage: 'J\'ai identifié une opportunité de financement pour un client...',
      time: '5 min',
      unread: 2,
      online: true,
      role: 'Commercial Senior'
    },
    {
      id: 2,
      name: 'Pierre Martin',
      company: 'InnovateSAS',
      avatar: 'PM',
      lastMessage: 'Le dossier de StartupXYZ est prêt pour évaluation',
      time: '1h',
      unread: 0,
      online: false,
      role: 'Directeur Commercial'
    },
    {
      id: 3,
      name: 'Sophie Chen',
      company: 'StartupXYZ',
      avatar: 'SC',
      lastMessage: 'Merci pour l\'analyse de risque, très détaillée',
      time: '3h',
      unread: 1,
      online: true,
      role: 'Responsable Développement'
    }
  ]);

  const [leads] = useState([
    {
      id: 1,
      company: 'TechStart Innovation',
      contact: 'Jean Dupont',
      email: 'j.dupont@techstart.com',
      phone: '+33 1 23 45 67 89',
      amount: 50000,
      type: 'Microcrédit',
      sector: 'Technology',
      priority: 'Haute',
      status: 'Nouveau',
      assignedTo: 'Marie Dubois',
      description: 'Startup tech recherchant financement pour développement produit IA'
    },
    {
      id: 2,
      company: 'InnoLab Solutions',
      contact: 'Sarah Martin',
      email: 's.martin@innovlab.fr',
      phone: '+33 1 34 56 78 90',
      amount: 75000,
      type: 'Prêt équipement',
      sector: 'Innovation',
      priority: 'Moyenne',
      status: 'Contacté',
      assignedTo: 'Pierre Martin',
      description: 'Laboratoire d\'innovation nécessitant équipements spécialisés'
    },
    {
      id: 3,
      company: 'DigitalCorp',
      contact: 'Marc Leroy',
      email: 'm.leroy@digitalcorp.com',
      phone: '+33 1 45 67 89 01',
      amount: 120000,
      type: 'Capital croissance',
      sector: 'Digital',
      priority: 'Haute',
      status: 'Qualifié',
      assignedTo: 'Sophie Chen',
      description: 'Entreprise digitale en phase d\'expansion internationale'
    }
  ]);

  const [collaborations] = useState([
    {
      id: 1,
      partner: 'Marie Dubois',
      company: 'TechCorp Solutions',
      project: 'Financement Startup Tech',
      status: 'En cours',
      progress: 75,
      amount: 250000,
      startDate: '2024-01-15',
      expectedClose: '2024-02-28'
    },
    {
      id: 2,
      partner: 'Pierre Martin',
      company: 'InnovateSAS',
      project: 'Microcrédits PME',
      status: 'Finalisé',
      progress: 100,
      amount: 180000,
      startDate: '2023-12-01',
      expectedClose: '2024-01-31'
    },
    {
      id: 3,
      partner: 'Sophie Chen',
      company: 'StartupXYZ',
      project: 'Prêts Équipement',
      status: 'En cours',
      progress: 45,
      amount: 320000,
      startDate: '2024-01-20',
      expectedClose: '2024-03-15'
    }
  ]);

  const setLoading = (key: string, value: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: value }));
  };

  const handleSendMessage = async (conversationId: number) => {
    if (!newMessage.trim()) return;
    
    setLoading(`send-${conversationId}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Message envoyé à la conversation ${conversationId}: ${newMessage}`);
      setNewMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
    } finally {
      setLoading(`send-${conversationId}`, false);
    }
  };

  const handleCallContact = async (conversationId: number) => {
    setLoading(`call-${conversationId}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log(`Appel initié avec la conversation ${conversationId}`);
    } catch (error) {
      console.error('Erreur lors de l\'appel:', error);
    } finally {
      setLoading(`call-${conversationId}`, false);
    }
  };

  const handleVideoCall = async (conversationId: number) => {
    setLoading(`video-${conversationId}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Visioconférence initiée avec la conversation ${conversationId}`);
    } catch (error) {
      console.error('Erreur lors de la visio:', error);
    } finally {
      setLoading(`video-${conversationId}`, false);
    }
  };

  const handleScheduleMeeting = async (conversationId: number) => {
    setLoading(`meeting-${conversationId}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      console.log(`Réunion planifiée avec la conversation ${conversationId}`);
    } catch (error) {
      console.error('Erreur lors de la planification:', error);
    } finally {
      setLoading(`meeting-${conversationId}`, false);
    }
  };

  const handleViewLead = async (lead: any) => {
    setLoading(`lead-${lead.id}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      setSelectedLead(lead);
    } catch (error) {
      console.error('Erreur lors de l\'affichage:', error);
    } finally {
      setLoading(`lead-${lead.id}`, false);
    }
  };

  const handleAssignLead = async (leadId: number, assignee: string) => {
    setLoading(`assign-${leadId}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Lead ${leadId} assigné à ${assignee}`);
    } catch (error) {
      console.error('Erreur lors de l\'assignation:', error);
    } finally {
      setLoading(`assign-${leadId}`, false);
    }
  };

  const handleContactLead = async (leadId: number) => {
    setLoading(`contact-lead-${leadId}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log(`Contact initié avec le lead ${leadId}`);
    } catch (error) {
      console.error('Erreur lors du contact:', error);
    } finally {
      setLoading(`contact-lead-${leadId}`, false);
    }
  };

  const handleUpdateCollaboration = async (collaborationId: number) => {
    setLoading(`update-${collaborationId}`, true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Collaboration ${collaborationId} mise à jour`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    } finally {
      setLoading(`update-${collaborationId}`, false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute': return 'bg-red-100 text-red-800';
      case 'Moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'Basse': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nouveau': return 'bg-blue-100 text-blue-800';
      case 'Contacté': return 'bg-yellow-100 text-yellow-800';
      case 'Qualifié': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-purple-100 text-purple-800';
      case 'Finalisé': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec navigation par onglets */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Collaboration avec les Commerciaux</h2>
            <p className="text-gray-600">Communication et partage d'opportunités</p>
          </div>
          <div className="flex items-center space-x-3">
            <LoadingButton
              onClick={() => console.log('Nouveau lead')}
              variant="outline"
              icon="ri-user-add-line"
              className="text-sm"
            >
              Nouveau Lead
            </LoadingButton>
            <LoadingButton
              onClick={() => console.log('Nouvelle collaboration')}
              variant="primary"
              icon="ri-team-line"
              className="text-sm"
            >
              Nouvelle Collaboration
            </LoadingButton>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'messages'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-message-line mr-2"></i>
            Messagerie
            {conversations.reduce((sum, conv) => sum + conv.unread, 0) > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {conversations.reduce((sum, conv) => sum + conv.unread, 0)}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'leads'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-user-star-line mr-2"></i>
            Leads Partagés
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-1">
              {leads.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('collaborations')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'collaborations'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-handshake-line mr-2"></i>
            Collaborations
            <span className="ml-2 bg-green-100 text-green-800 text-xs rounded-full px-2 py-1">
              {collaborations.filter(c => c.status === 'En cours').length}
            </span>
          </button>
        </div>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'messages' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste des conversations */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversations</h3>
            <div className="space-y-3">
              {conversations.map((conversation) => (
                <div key={conversation.id} className="p-4 rounded-lg border hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {conversation.avatar}
                      </div>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900 truncate">{conversation.name}</h4>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{conversation.company} • {conversation.role}</p>
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <span className="inline-block mt-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                          {conversation.unread} nouveau(x)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Zone de messagerie */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Conversation avec Marie Dubois</h3>
              <div className="flex items-center space-x-2">
                <LoadingButton
                  onClick={() => handleCallContact(1)}
                  loading={loadingStates['call-1']}
                  loadingText="Appel..."
                  variant="outline"
                  size="sm"
                  icon="ri-phone-line"
                  className="text-xs"
                >
                  Appeler
                </LoadingButton>
                <LoadingButton
                  onClick={() => handleVideoCall(1)}
                  loading={loadingStates['video-1']}
                  loadingText="Connexion..."
                  variant="outline"
                  size="sm"
                  icon="ri-video-line"
                  className="text-xs"
                >
                  Visio
                </LoadingButton>
                <LoadingButton
                  onClick={() => handleScheduleMeeting(1)}
                  loading={loadingStates['meeting-1']}
                  loadingText="Planification..."
                  variant="outline"
                  size="sm"
                  icon="ri-calendar-event-line"
                  className="text-xs"
                >
                  Planifier
                </LoadingButton>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  MD
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-900">Bonjour, j'ai identifié une excellente opportunité de financement pour TechStart Innovation. Ils recherchent 50K€ pour développer leur solution IA.</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Il y a 5 minutes</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 justify-end">
                <div className="flex-1 text-right">
                  <div className="bg-blue-500 text-white rounded-lg p-3 inline-block">
                    <p className="text-sm">Merci Marie ! Pouvez-vous m'envoyer leur dossier complet ? Je vais analyser leur profil de risque.</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Il y a 3 minutes</p>
                </div>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  IF
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  MD
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-900">Parfait ! Je vous envoie le dossier par email dans les 10 minutes. Ils ont un excellent historique et une croissance de 40% cette année.</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Il y a 1 minute</p>
                </div>
              </div>
            </div>

            {/* Zone de saisie */}
            <div className="border-t pt-4">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage(1);
                    }
                  }}
                />
                <LoadingButton
                  onClick={() => handleSendMessage(1)}
                  loading={loadingStates['send-1']}
                  loadingText="Envoi..."
                  variant="primary"
                  icon="ri-send-plane-line"
                  className="text-sm"
                  disabled={!newMessage.trim()}
                >
                  Envoyer
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'leads' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Leads Partagés</h3>
            <div className="text-sm text-gray-600">
              {leads.length} lead(s) disponible(s)
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {leads.map((lead) => (
              <div key={lead.id} className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{lead.company}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(lead.priority)}`}>
                        {lead.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{lead.contact}</p>
                    <p className="text-xs text-gray-500">{lead.sector} • {lead.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">€{lead.amount.toLocaleString()}</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{lead.description}</p>

                <div className="space-y-2 mb-4 text-xs text-gray-600">
                  <div className="flex items-center">
                    <i className="ri-mail-line mr-2"></i>
                    {lead.email}
                  </div>
                  <div className="flex items-center">
                    <i className="ri-phone-line mr-2"></i>
                    {lead.phone}
                  </div>
                  <div className="flex items-center">
                    <i className="ri-user-line mr-2"></i>
                    Assigné à: {lead.assignedTo}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <LoadingButton
                    onClick={() => handleViewLead(lead)}
                    loading={loadingStates[`lead-${lead.id}`]}
                    loadingText="Chargement..."
                    variant="outline"
                    size="sm"
                    icon="ri-eye-line"
                    className="text-xs flex-1"
                  >
                    Détails
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => handleContactLead(lead.id)}
                    loading={loadingStates[`contact-lead-${lead.id}`]}
                    loadingText="Contact..."
                    variant="primary"
                    size="sm"
                    icon="ri-message-line"
                    className="text-xs flex-1"
                  >
                    Contacter
                  </LoadingButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'collaborations' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Suivi des Collaborations</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{collaborations.filter(c => c.status === 'En cours').length} en cours</span>
              <span>€{collaborations.reduce((sum, c) => sum + c.amount, 0).toLocaleString()} volume total</span>
              <span>{Math.round(collaborations.reduce((sum, c) => sum + c.progress, 0) / collaborations.length)}% progression moyenne</span>
            </div>
          </div>

          <div className="space-y-6">
            {collaborations.map((collaboration) => (
              <div key={collaboration.id} className="border rounded-lg p-6 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{collaboration.project}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(collaboration.status)}`}>
                        {collaboration.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Partenaire: {collaboration.partner} ({collaboration.company})</p>
                    <p className="text-xs text-gray-500">
                      Début: {new Date(collaboration.startDate).toLocaleDateString('fr-FR')} • 
                      Fin prévue: {new Date(collaboration.expectedClose).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">€{collaboration.amount.toLocaleString()}</div>
                    <p className="text-xs text-gray-500">Volume</p>
                  </div>
                </div>

                {/* Barre de progression */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progression</span>
                    <span className="text-sm text-gray-600">{collaboration.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        collaboration.progress === 100 ? 'bg-green-500' : 
                        collaboration.progress >= 75 ? 'bg-blue-500' :
                        collaboration.progress >= 50 ? 'bg-yellow-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${collaboration.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <LoadingButton
                    onClick={() => handleUpdateCollaboration(collaboration.id)}
                    loading={loadingStates[`update-${collaboration.id}`]}
                    loadingText="Mise à jour..."
                    variant="outline"
                    size="sm"
                    icon="ri-refresh-line"
                    className="text-xs"
                  >
                    Mettre à jour
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => console.log(`Voir détails ${collaboration.id}`)}
                    variant="outline"
                    size="sm"
                    icon="ri-eye-line"
                    className="text-xs"
                  >
                    Voir détails
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => console.log(`Contacter ${collaboration.partner}`)}
                    variant="primary"
                    size="sm"
                    icon="ri-message-line"
                    className="text-xs"
                  >
                    Contacter partenaire
                  </LoadingButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de détails du lead */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Détails du Lead - {selectedLead.company}</h3>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Informations Contact</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contact:</span>
                        <span className="font-medium">{selectedLead.contact}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{selectedLead.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Téléphone:</span>
                        <span className="font-medium">{selectedLead.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Secteur:</span>
                        <span className="font-medium">{selectedLead.sector}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Détails Financement</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Montant:</span>
                        <span className="font-medium text-green-600">€{selectedLead.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{selectedLead.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Priorité:</span>
                        <span className={`font-medium px-2 py-1 rounded-full text-xs ${getPriorityColor(selectedLead.priority)}`}>
                          {selectedLead.priority}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Statut:</span>
                        <span className={`font-medium px-2 py-1 rounded-full text-xs ${getStatusColor(selectedLead.status)}`}>
                          {selectedLead.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{selectedLead.description}</p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Actions</h4>
                  <div className="flex items-center space-x-3">
                    <LoadingButton
                      onClick={() => handleContactLead(selectedLead.id)}
                      loading={loadingStates[`contact-lead-${selectedLead.id}`]}
                      loadingText="Contact en cours..."
                      variant="primary"
                      icon="ri-message-line"
                      className="text-sm"
                    >
                      Contacter le Lead
                    </LoadingButton>
                    <LoadingButton
                      onClick={() => handleAssignLead(selectedLead.id, 'Nouveau commercial')}
                      loading={loadingStates[`assign-${selectedLead.id}`]}
                      loadingText="Assignation..."
                      variant="outline"
                      icon="ri-user-add-line"
                      className="text-sm"
                    >
                      Réassigner
                    </LoadingButton>
                    <LoadingButton
                      onClick={() => console.log('Analyse de risque')}
                      variant="outline"
                      icon="ri-line-chart-line"
                      className="text-sm"
                    >
                      Analyser Risque
                    </LoadingButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { SalesCollaboration };
