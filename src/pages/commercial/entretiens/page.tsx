import { useState } from 'react';
import Sidebar from '../../../components/feature/Sidebar';

interface Interview {
  id: string;
  company: string;
  companyLogo: string;
  position: string;
  date: string;
  time: string;
  location: string;
  type: 'Visioconférence' | 'Bureau' | 'Téléphone' | 'Autre';
  status: 'Planifié' | 'Confirmé' | 'Terminé' | 'Annulé';
  interviewer: string;
  interviewerRole: string;
  notes?: string;
  address?: string;
  meetingLink?: string;
}

const mockInterviews: Interview[] = [
  {
    id: '1',
    company: 'TechCorp Solutions',
    companyLogo: 'https://readdy.ai/api/search-image?query=modern%20technology%20company%20logo%20with%20blue%20and%20white%20colors%20professional%20corporate%20branding&width=80&height=80&seq=techcorp-logo-001&orientation=squarish',
    position: 'Commercial Senior B2B',
    date: '2024-02-15',
    time: '10:00',
    location: 'Visioconférence',
    type: 'Visioconférence',
    status: 'Confirmé',
    interviewer: 'Marie Dubois',
    interviewerRole: 'Directrice des Ressources Humaines',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    notes: 'Préparer une présentation de vos réalisations commerciales des 2 dernières années'
  },
  {
    id: '2',
    company: 'InnovateLab',
    companyLogo: 'https://readdy.ai/api/search-image?query=innovative%20laboratory%20company%20logo%20with%20green%20and%20orange%20colors%20modern%20design%20professional%20branding&width=80&height=80&seq=innovate-logo-002&orientation=squarish',
    position: 'Responsable Développement Commercial',
    date: '2024-02-18',
    time: '14:30',
    location: 'Bureau',
    type: 'Bureau',
    status: 'Planifié',
    interviewer: 'Jean Martin',
    interviewerRole: 'Directeur Commercial',
    address: '45 Avenue des Champs-Élysées, 75008 Paris',
    notes: 'Entretien en présentiel avec l\'équipe commerciale'
  },
  {
    id: '3',
    company: 'GlobalTrade Inc',
    companyLogo: 'https://readdy.ai/api/search-image?query=global%20trading%20company%20logo%20with%20red%20and%20black%20colors%20international%20business%20professional%20branding&width=80&height=80&seq=global-logo-003&orientation=squarish',
    position: 'Business Developer',
    date: '2024-02-12',
    time: '11:00',
    location: 'Visioconférence',
    type: 'Visioconférence',
    status: 'Terminé',
    interviewer: 'Sophie Laurent',
    interviewerRole: 'CEO',
    meetingLink: 'https://zoom.us/j/123456789',
    notes: 'Entretien terminé - En attente de retour'
  },
  {
    id: '4',
    company: 'FinanceHub',
    companyLogo: 'https://readdy.ai/api/search-image?query=finance%20company%20logo%20with%20gold%20and%20navy%20blue%20colors%20banking%20professional%20corporate%20branding&width=80&height=80&seq=finance-logo-004&orientation=squarish',
    position: 'Chargé de Clientèle Entreprises',
    date: '2024-02-20',
    time: '09:00',
    location: 'Téléphone',
    type: 'Téléphone',
    status: 'Planifié',
    interviewer: 'Pierre Durand',
    interviewerRole: 'Responsable Recrutement',
    notes: 'Premier entretien téléphonique de présélection'
  },
  {
    id: '5',
    company: 'EcoSolutions',
    companyLogo: 'https://readdy.ai/api/search-image?query=eco%20friendly%20company%20logo%20with%20green%20and%20earth%20tones%20sustainable%20business%20professional%20branding&width=80&height=80&seq=eco-logo-005&orientation=squarish',
    position: 'Commercial Grands Comptes',
    date: '2024-02-08',
    time: '15:00',
    location: 'Bureau',
    type: 'Bureau',
    status: 'Annulé',
    interviewer: 'Claire Moreau',
    interviewerRole: 'Directrice Commerciale',
    address: '12 Rue de la Paix, 69002 Lyon',
    notes: 'Entretien annulé par l\'entreprise - Poste pourvu'
  },
  {
    id: '6',
    company: 'MediaPro Agency',
    companyLogo: 'https://readdy.ai/api/search-image?query=media%20agency%20logo%20with%20purple%20and%20pink%20colors%20creative%20professional%20branding%20modern%20design&width=80&height=80&seq=media-logo-006&orientation=squarish',
    position: 'Directeur Commercial Régional',
    date: '2024-02-22',
    time: '16:00',
    location: 'Visioconférence',
    type: 'Visioconférence',
    status: 'Confirmé',
    interviewer: 'Thomas Bernard',
    interviewerRole: 'Directeur Général',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/xyz',
    notes: 'Entretien final avec le comité de direction'
  }
];

export default function CommercialEntretiens() {
  const [interviews] = useState<Interview[]>(mockInterviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Statistiques
  const stats = {
    total: interviews.length,
    planifies: interviews.filter(i => i.status === 'Planifié').length,
    confirmes: interviews.filter(i => i.status === 'Confirmé').length,
    termines: interviews.filter(i => i.status === 'Terminé').length,
    annules: interviews.filter(i => i.status === 'Annulé').length
  };

  // Filtrage
  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = 
      interview.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.interviewer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || interview.status === statusFilter;
    const matchesType = typeFilter === 'all' || interview.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planifié': return 'bg-blue-100 text-blue-700';
      case 'Confirmé': return 'bg-green-100 text-green-700';
      case 'Terminé': return 'bg-gray-100 text-gray-700';
      case 'Annulé': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Visioconférence': return 'ri-vidicon-line';
      case 'Bureau': return 'ri-building-line';
      case 'Téléphone': return 'ri-phone-line';
      default: return 'ri-map-pin-line';
    }
  };

  const handleViewDetails = (interview: Interview) => {
    setSelectedInterview(interview);
    setShowDetailsModal(true);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Entretiens</h1>
          <p className="text-gray-600">Consultez et gérez vos entretiens planifiés</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-calendar-line text-2xl text-purple-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Planifiés</p>
                <p className="text-2xl font-bold text-blue-600">{stats.planifies}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-2xl text-blue-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Confirmés</p>
                <p className="text-2xl font-bold text-green-600">{stats.confirmes}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-2xl text-green-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Terminés</p>
                <p className="text-2xl font-bold text-gray-600">{stats.termines}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <i className="ri-check-double-line text-2xl text-gray-600"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Annulés</p>
                <p className="text-2xl font-bold text-red-600">{stats.annules}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-close-circle-line text-2xl text-red-600"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="ri-search-line mr-2"></i>
                Rechercher
              </label>
              <input
                type="text"
                placeholder="Entreprise, poste, recruteur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="ri-filter-line mr-2"></i>
                Statut
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              >
                <option value="all">Tous les statuts</option>
                <option value="Planifié">Planifié</option>
                <option value="Confirmé">Confirmé</option>
                <option value="Terminé">Terminé</option>
                <option value="Annulé">Annulé</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="ri-map-pin-line mr-2"></i>
                Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              >
                <option value="all">Tous les types</option>
                <option value="Visioconférence">Visioconférence</option>
                <option value="Bureau">Bureau</option>
                <option value="Téléphone">Téléphone</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
          </div>

          {(searchTerm || statusFilter !== 'all' || typeFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}
              className="mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium whitespace-nowrap"
            >
              <i className="ri-refresh-line mr-1"></i>
              Réinitialiser les filtres
            </button>
          )}
        </div>

        {/* Liste des entretiens */}
        <div className="space-y-4">
          {filteredInterviews.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-calendar-line text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun entretien trouvé</h3>
              <p className="text-gray-600">Aucun entretien ne correspond à vos critères de recherche.</p>
            </div>
          ) : (
            filteredInterviews.map((interview) => (
              <div
                key={interview.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <img
                      src={interview.companyLogo}
                      alt={interview.company}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {interview.position}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">{interview.company}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(interview.status)}`}>
                          {interview.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <i className="ri-calendar-line mr-2 text-purple-600"></i>
                          <span>{formatDate(interview.date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <i className="ri-time-line mr-2 text-purple-600"></i>
                          <span>{interview.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <i className={`${getTypeIcon(interview.type)} mr-2 text-purple-600`}></i>
                          <span>{interview.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <i className="ri-user-line mr-2 text-purple-600"></i>
                          <span>{interview.interviewer}</span>
                        </div>
                      </div>

                      {interview.notes && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                          <p className="text-sm text-amber-800">
                            <i className="ri-information-line mr-2"></i>
                            {interview.notes}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleViewDetails(interview)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium whitespace-nowrap"
                        >
                          <i className="ri-eye-line mr-2"></i>
                          Voir les détails
                        </button>

                        {interview.meetingLink && interview.status !== 'Annulé' && interview.status !== 'Terminé' && (
                          <a
                            href={interview.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium whitespace-nowrap"
                          >
                            <i className="ri-vidicon-line mr-2"></i>
                            Rejoindre
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Modal Détails */}
      {showDetailsModal && selectedInterview && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Détails de l'entretien</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Entreprise */}
              <div className="flex items-center space-x-4 pb-6 border-b border-gray-200">
                <img
                  src={selectedInterview.companyLogo}
                  alt={selectedInterview.company}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{selectedInterview.company}</h4>
                  <p className="text-gray-600">{selectedInterview.position}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(selectedInterview.status)}`}>
                    {selectedInterview.status}
                  </span>
                </div>
              </div>

              {/* Informations */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date et heure</label>
                  <div className="flex items-center text-gray-900">
                    <i className="ri-calendar-line mr-2 text-purple-600"></i>
                    <span>{formatDate(selectedInterview.date)} à {selectedInterview.time}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type d'entretien</label>
                  <div className="flex items-center text-gray-900">
                    <i className={`${getTypeIcon(selectedInterview.type)} mr-2 text-purple-600`}></i>
                    <span>{selectedInterview.type}</span>
                  </div>
                </div>

                {selectedInterview.address && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    <div className="flex items-start text-gray-900">
                      <i className="ri-map-pin-line mr-2 text-purple-600 mt-1"></i>
                      <span>{selectedInterview.address}</span>
                    </div>
                  </div>
                )}

                {selectedInterview.meetingLink && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lien de visioconférence</label>
                    <a
                      href={selectedInterview.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-purple-600 hover:text-purple-700"
                    >
                      <i className="ri-vidicon-line mr-2"></i>
                      <span className="underline">{selectedInterview.meetingLink}</span>
                    </a>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recruteur</label>
                  <div className="text-gray-900">
                    <div className="flex items-center">
                      <i className="ri-user-line mr-2 text-purple-600"></i>
                      <span className="font-medium">{selectedInterview.interviewer}</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">{selectedInterview.interviewerRole}</p>
                  </div>
                </div>

                {selectedInterview.notes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes importantes</label>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm text-amber-800">
                        <i className="ri-information-line mr-2"></i>
                        {selectedInterview.notes}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              {selectedInterview.meetingLink && selectedInterview.status !== 'Annulé' && selectedInterview.status !== 'Terminé' && (
                <div className="pt-4 border-t border-gray-200">
                  <a
                    href={selectedInterview.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center whitespace-nowrap"
                  >
                    <i className="ri-vidicon-line mr-2"></i>
                    Rejoindre l'entretien
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}