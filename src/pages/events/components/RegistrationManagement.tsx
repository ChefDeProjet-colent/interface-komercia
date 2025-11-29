import { useState, useEffect } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';
import AdBanner from '../../../components/feature/AdBanner';

export default function RegistrationManagement() {
  const { trackAction } = useAdManager();
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);

  const [events] = useState([
    { id: 1, title: 'Salon Tech Innovation 2024', date: '2024-02-15' },
    { id: 2, title: 'Webinaire Marketing Digital', date: '2024-02-18' },
    { id: 3, title: 'Atelier Leadership Féminin', date: '2024-02-22' },
    { id: 4, title: 'Conférence Intelligence Artificielle', date: '2024-02-25' }
  ]);

  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: 'Marie Dubois',
      email: 'marie.dubois@techcorp.fr',
      phone: '+33 6 12 34 56 78',
      company: 'TechCorp Solutions',
      role: 'Directrice Marketing',
      eventId: 1,
      status: 'confirmed',
      registrationDate: '2024-01-15',
      category: 'commercial',
      notes: 'Intéressée par les solutions IA',
      attendance: null
    },
    {
      id: 2,
      name: 'Pierre Martin',
      email: 'p.martin@startup-innov.com',
      phone: '+33 6 98 76 54 32',
      company: 'Startup Innovation',
      role: 'CEO',
      eventId: 1,
      status: 'pending',
      registrationDate: '2024-01-20',
      category: 'entrepreneur',
      notes: 'Recherche des partenaires technologiques',
      attendance: null
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      email: 'sophie.laurent@digitalagency.fr',
      phone: '+33 6 45 67 89 12',
      company: 'Digital Agency Pro',
      role: 'Consultante Marketing',
      eventId: 2,
      status: 'confirmed',
      registrationDate: '2024-01-18',
      category: 'commercial',
      notes: 'Experte en marketing automation',
      attendance: 'present'
    },
    {
      id: 4,
      name: 'Thomas Rousseau',
      email: 'thomas.rousseau@freelance.com',
      phone: '+33 6 23 45 67 89',
      company: 'Freelance',
      role: 'Développeur Full-Stack',
      eventId: 2,
      status: 'waitlist',
      registrationDate: '2024-01-22',
      category: 'freelance',
      notes: 'Spécialisé en React et Node.js',
      attendance: null
    },
    {
      id: 5,
      name: 'Isabelle Moreau',
      email: 'i.moreau@womenintech.org',
      phone: '+33 6 87 65 43 21',
      company: 'Women in Tech',
      role: 'Présidente',
      eventId: 3,
      status: 'confirmed',
      registrationDate: '2024-01-10',
      category: 'association',
      notes: 'Militante pour la diversité en tech',
      attendance: null
    },
    {
      id: 6,
      name: 'Alexandre Durand',
      email: 'a.durand@airesearch.fr',
      phone: '+33 6 34 56 78 90',
      company: 'AI Research Lab',
      role: 'Chercheur Senior',
      eventId: 4,
      status: 'confirmed',
      registrationDate: '2024-01-25',
      category: 'recherche',
      notes: 'Expert en machine learning',
      attendance: null
    },
    {
      id: 7,
      name: 'Camille Bernard',
      email: 'camille.bernard@consulting.com',
      phone: '+33 6 56 78 90 12',
      company: 'Strategy Consulting',
      role: 'Senior Manager',
      eventId: 1,
      status: 'cancelled',
      registrationDate: '2024-01-12',
      category: 'consultant',
      notes: 'Annulation pour conflit d\'agenda',
      attendance: null
    },
    {
      id: 8,
      name: 'Julien Petit',
      email: 'julien.petit@ecommerce.fr',
      phone: '+33 6 78 90 12 34',
      company: 'E-commerce Solutions',
      role: 'CTO',
      eventId: 2,
      status: 'confirmed',
      registrationDate: '2024-01-16',
      category: 'entrepreneur',
      notes: 'Recherche des solutions de marketing digital',
      attendance: 'present'
    }
  ]);

  const [stats, setStats] = useState({
    totalRegistrations: 156,
    confirmedParticipants: 124,
    pendingApprovals: 18,
    waitlistCount: 14,
    cancellationRate: 8.5,
    attendanceRate: 92.3
  });

  useEffect(() => {
    trackAction('view-registration-management', {
      section: 'registrations',
      timestamp: Date.now()
    });
  }, []);

  const filteredParticipants = participants.filter(participant => {
    const matchesEvent = selectedEvent === 'all' || participant.eventId === parseInt(selectedEvent);
    const matchesStatus = selectedStatus === 'all' || participant.status === selectedStatus;
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesEvent && matchesStatus && matchesSearch;
  });

  const handleStatusChange = (participantId: number, newStatus: string) => {
    setParticipants(participants.map(p => 
      p.id === participantId ? { ...p, status: newStatus } : p
    ));
    
    trackAction('change-participant-status', {
      participantId,
      newStatus,
      timestamp: Date.now()
    });
  };

  const handleAttendanceChange = (participantId: number, attendance: string) => {
    setParticipants(participants.map(p => 
      p.id === participantId ? { ...p, attendance } : p
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'waitlist': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAttendanceColor = (attendance: string | null) => {
    switch (attendance) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'commercial': return 'ri-briefcase-line';
      case 'entrepreneur': return 'ri-rocket-line';
      case 'freelance': return 'ri-user-line';
      case 'association': return 'ri-team-line';
      case 'recherche': return 'ri-microscope-line';
      case 'consultant': return 'ri-lightbulb-line';
      default: return 'ri-user-line';
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedParticipants.length === 0) return;
    
    switch (action) {
      case 'approve':
        setParticipants(participants.map(p => 
          selectedParticipants.includes(p.id) ? { ...p, status: 'confirmed' } : p
        ));
        break;
      case 'reject':
        setParticipants(participants.map(p => 
          selectedParticipants.includes(p.id) ? { ...p, status: 'cancelled' } : p
        ));
        break;
      case 'notify':
        setShowNotificationModal(true);
        break;
    }
    
    trackAction('bulk-action', {
      action,
      participantCount: selectedParticipants.length,
      timestamp: Date.now()
    });
  };

  const exportParticipants = (format: string) => {
    trackAction('export-participants', {
      format,
      participantCount: filteredParticipants.length,
      timestamp: Date.now()
    });
    
    // Simulation d'export
    alert(`Export en ${format.toUpperCase()} de ${filteredParticipants.length} participants en cours...`);
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              <i className="ri-user-settings-line text-purple-600 mr-3"></i>
              Gestion des Inscriptions
            </h2>
            <p className="text-gray-600 mt-1">
              Gérez les participants et leurs inscriptions aux événements
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => exportParticipants('excel')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium whitespace-nowrap"
            >
              <i className="ri-file-excel-line mr-2"></i>
              Export Excel
            </button>
            <button
              onClick={() => exportParticipants('csv')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap"
            >
              <i className="ri-file-text-line mr-2"></i>
              Export CSV
            </button>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <i className="ri-user-add-line text-blue-600 text-xl mr-2"></i>
              <div>
                <p className="text-sm text-blue-600 font-medium">Total</p>
                <p className="text-lg font-bold text-blue-900">{stats.totalRegistrations}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <i className="ri-check-line text-green-600 text-xl mr-2"></i>
              <div>
                <p className="text-sm text-green-600 font-medium">Confirmés</p>
                <p className="text-lg font-bold text-green-900">{stats.confirmedParticipants}</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center">
              <i className="ri-time-line text-yellow-600 text-xl mr-2"></i>
              <div>
                <p className="text-sm text-yellow-600 font-medium">En attente</p>
                <p className="text-lg font-bold text-yellow-900">{stats.pendingApprovals}</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <i className="ri-list-check text-blue-600 text-xl mr-2"></i>
              <div>
                <p className="text-sm text-blue-600 font-medium">Liste d'attente</p>
                <p className="text-lg font-bold text-blue-900">{stats.waitlistCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center">
              <i className="ri-close-line text-red-600 text-xl mr-2"></i>
              <div>
                <p className="text-sm text-red-600 font-medium">Annulations</p>
                <p className="text-lg font-bold text-red-900">{stats.cancellationRate}%</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <i className="ri-user-star-line text-purple-600 text-xl mr-2"></i>
              <div>
                <p className="text-sm text-purple-600 font-medium">Présence</p>
                <p className="text-lg font-bold text-purple-900">{stats.attendanceRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bannière publicitaire */}
        <AdBanner
          position="registration-header"
          format="banner"
          section="registration-management"
          className="w-full"
          userContext={{
            userType: 'event-organizer',
            targetCategories: ['registration-tools', 'event-management', 'automation'],
            priority: 'high'
          }}
        />
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 flex-1">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rechercher</label>
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nom, entreprise, email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Événement</label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm pr-8"
              >
                <option value="all">Tous les événements</option>
                {events.map(event => (
                  <option key={event.id} value={event.id.toString()}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm pr-8"
              >
                <option value="all">Tous les statuts</option>
                <option value="confirmed">Confirmé</option>
                <option value="pending">En attente</option>
                <option value="waitlist">Liste d'attente</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>
          </div>
          
          {selectedParticipants.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedParticipants.length} sélectionné(s)
              </span>
              <button
                onClick={() => handleBulkAction('approve')}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors whitespace-nowrap"
              >
                <i className="ri-check-line mr-1"></i>
                Approuver
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                <i className="ri-close-line mr-1"></i>
                Refuser
              </button>
              <button
                onClick={() => handleBulkAction('notify')}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                <i className="ri-mail-line mr-1"></i>
                Notifier
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Liste des participants */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            <i className="ri-group-line text-purple-600 mr-2"></i>
            Participants ({filteredParticipants.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedParticipants(filteredParticipants.map(p => p.id));
                      } else {
                        setSelectedParticipants([]);
                      }
                    }}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entreprise & Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Événement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Présence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredParticipants.map((participant) => {
                const event = events.find(e => e.id === participant.eventId);
                return (
                  <tr key={participant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedParticipants.includes(participant.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedParticipants([...selectedParticipants, participant.id]);
                          } else {
                            setSelectedParticipants(selectedParticipants.filter(id => id !== participant.id));
                          }
                        }}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                          <i className={`${getCategoryIcon(participant.category)} text-purple-600`}></i>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{participant.name}</div>
                          <div className="text-sm text-gray-500">{participant.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{participant.company}</div>
                      <div className="text-sm text-gray-500">{participant.role}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{participant.email}</div>
                      <div className="text-sm text-gray-500">{participant.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{event?.title}</div>
                      <div className="text-sm text-gray-500">
                        {event && new Date(event.date).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={participant.status}
                        onChange={(e) => handleStatusChange(participant.id, e.target.value)}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${getStatusColor(participant.status)} pr-6`}
                      >
                        <option value="pending">En attente</option>
                        <option value="confirmed">Confirmé</option>
                        <option value="waitlist">Liste d'attente</option>
                        <option value="cancelled">Annulé</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      {participant.attendance ? (
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getAttendanceColor(participant.attendance)}`}>
                          {participant.attendance === 'present' ? 'Présent' : 'Absent'}
                        </span>
                      ) : (
                        <select
                          onChange={(e) => handleAttendanceChange(participant.id, e.target.value)}
                          className="text-xs px-2 py-1 border border-gray-300 rounded text-gray-600 pr-6"
                          defaultValue=""
                        >
                          <option value="">Non défini</option>
                          <option value="present">Présent</option>
                          <option value="absent">Absent</option>
                        </select>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-700 text-sm"
                          title="Voir détails"
                        >
                          <i className="ri-eye-line"></i>
                        </button>
                        <button
                          className="text-green-600 hover:text-green-700 text-sm"
                          title="Envoyer email"
                        >
                          <i className="ri-mail-line"></i>
                        </button>
                        <button
                          className="text-purple-600 hover:text-purple-700 text-sm"
                          title="Modifier"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredParticipants.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-user-search-line text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun participant trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos filtres de recherche</p>
          </div>
        )}
      </div>

      {/* Bannière publicitaire en bas */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <AdBanner
            position="registration-footer"
            format="banner"
            section="registration-management"
            className="w-full"
            userContext={{
              userType: 'event-organizer',
              targetCategories: ['ticketing-tools', 'crm', 'communication'],
              priority: 'medium'
            }}
          />
        </div>
        <div className="lg:w-1/3">
          <AdBanner
            position="registration-sidebar"
            format="vertical"
            section="registration-management"
            className="w-full"
            userContext={{
              userType: 'event-organizer',
              targetCategories: ['automation', 'notifications', 'analytics'],
              priority: 'low'
            }}
          />
        </div>
      </div>

      {/* Modal de notification */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  <i className="ri-mail-send-line text-purple-600 mr-2"></i>
                  Envoyer une Notification
                </h3>
                <button
                  onClick={() => setShowNotificationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de notification
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8">
                  <option>Confirmation d'inscription</option>
                  <option>Rappel d'événement</option>
                  <option>Informations pratiques</option>
                  <option>Annulation/Report</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message personnalisé
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Votre message..."
                  maxLength={500}
                />
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  <i className="ri-information-line mr-1"></i>
                  Cette notification sera envoyée à {selectedParticipants.length} participant(s) sélectionné(s).
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowNotificationModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  setShowNotificationModal(false);
                  setSelectedParticipants([]);
                  alert('Notifications envoyées avec succès !');
                }}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap"
              >
                <i className="ri-send-plane-line mr-2"></i>
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { RegistrationManagement };
