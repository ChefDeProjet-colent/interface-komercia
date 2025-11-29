import { useState, useEffect } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';
import AdBanner from '../../../components/feature/AdBanner';

interface Event {
  id: string;
  title: string;
  type: 'demo' | 'presentation' | 'workshop' | 'meeting';
  date: string;
  time: string;
  duration: number;
  location: string;
  attendees: number;
  maxAttendees: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  description: string;
  commercial?: string;
  client: string;
  objectives: string[];
  materials: string[];
  participants: Participant[];
  invitedCommercials: string[];
  invitedProspects: string[];
  statistics?: EventStatistics;
}

interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'confirmed' | 'pending' | 'declined';
  registrationDate: string;
}

interface EventStatistics {
  totalParticipants: number;
  confirmationRate: number;
  satisfactionScore: number;
  leadsGenerated: number;
  conversionRate: number;
}

export default function EventsSection() {
  const { trackAction } = useAdManager();
  const [events, setEvents] = useState<Event[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [filter, setFilter] = useState('all');
  const [calendarView, setCalendarView] = useState<'month' | 'week'>('month');

  useEffect(() => {
    trackAction('view-events-section');
    loadEvents();
  }, []);

  const loadEvents = () => {
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Démonstration Produit - TechCorp',
        type: 'demo',
        date: '2024-03-25',
        time: '14:00',
        duration: 60,
        location: 'Visioconférence',
        attendees: 5,
        maxAttendees: 10,
        status: 'scheduled',
        description: 'Présentation de notre nouvelle solution SaaS aux équipes techniques de TechCorp',
        commercial: 'Sarah Martin',
        client: 'TechCorp Solutions',
        objectives: ['Présenter les fonctionnalités clés', 'Démontrer l\'intégration API', 'Répondre aux questions techniques'],
        materials: ['Slides de présentation', 'Environnement de démo', 'Documentation API'],
        participants: [
          {
            id: '1',
            name: 'Jean Dupont',
            email: 'jean.dupont@techcorp.com',
            phone: '+33 1 23 45 67 89',
            company: 'TechCorp Solutions',
            status: 'confirmed',
            registrationDate: '2024-03-20'
          },
          {
            id: '2',
            name: 'Marie Durand',
            email: 'marie.durand@techcorp.com',
            phone: '+33 1 23 45 67 90',
            company: 'TechCorp Solutions',
            status: 'pending',
            registrationDate: '2024-03-21'
          }
        ],
        invitedCommercials: ['Sarah Martin', 'Pierre Leroy'],
        invitedProspects: ['TechCorp Solutions', 'InnovateDigital', 'CloudTech']
      },
      {
        id: '2',
        title: 'Workshop Innovation - StartupHub',
        type: 'workshop',
        date: '2024-03-28',
        time: '10:00',
        duration: 180,
        location: 'Station F, Paris',
        attendees: 25,
        maxAttendees: 30,
        status: 'scheduled',
        description: 'Atelier sur les dernières innovations en IA pour les startups',
        client: 'StartupHub Paris',
        objectives: ['Présenter nos solutions IA', 'Networking avec les startups', 'Identifier des partenariats'],
        materials: ['Stand d\'exposition', 'Brochures', 'Démos interactives'],
        participants: [
          {
            id: '3',
            name: 'Sophie Bernard',
            email: 'sophie@startuphub.fr',
            phone: '+33 1 34 56 78 90',
            company: 'StartupHub Paris',
            status: 'confirmed',
            registrationDate: '2024-03-18'
          }
        ],
        invitedCommercials: ['Thomas Dubois', 'Claire Moreau'],
        invitedProspects: ['StartupHub Paris', 'TechAccelerator', 'Innovation Lab']
      },
      {
        id: '3',
        title: 'Présentation Investisseurs - VentureFund',
        type: 'presentation',
        date: '2024-03-22',
        time: '16:30',
        duration: 45,
        location: 'Bureau VentureFund, La Défense',
        attendees: 8,
        maxAttendees: 8,
        status: 'completed',
        description: 'Pitch de notre solution devant le comité d\'investissement',
        client: 'VentureFund Capital',
        objectives: ['Présenter le business model', 'Démontrer la traction', 'Négocier le financement'],
        materials: ['Pitch deck', 'Métriques financières', 'Roadmap produit'],
        participants: [
          {
            id: '4',
            name: 'Laurent Petit',
            email: 'laurent@venturefund.com',
            phone: '+33 1 45 67 89 01',
            company: 'VentureFund Capital',
            status: 'confirmed',
            registrationDate: '2024-03-15'
          }
        ],
        invitedCommercials: ['Sarah Martin'],
        invitedProspects: ['VentureFund Capital'],
        statistics: {
          totalParticipants: 8,
          confirmationRate: 100,
          satisfactionScore: 4.8,
          leadsGenerated: 3,
          conversionRate: 37.5
        }
      }
    ];
    setEvents(mockEvents);
  };

  const handleViewParticipants = (event: Event) => {
    trackAction('view-event-participants', { eventId: event.id });
    setSelectedEvent(event);
    setShowParticipants(true);
  };

  const handleSendReminder = (eventId: string) => {
    trackAction('send-event-reminder', { eventId });
    alert('Rappels envoyés aux participants !');
  };

  const handleExportCalendar = (format: 'google' | 'outlook') => {
    trackAction('export-calendar', { format });
    alert(`Synchronisation avec ${format === 'google' ? 'Google Calendar' : 'Outlook'} initiée !`);
  };

  const getCalendarEvents = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    });
  };

  const renderCalendarView = () => {
    const calendarEvents = getCalendarEvents();
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];

    // Jours vides au début du mois
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>);
    }

    // Jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = calendarEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === day;
      });

      days.push(
        <div key={day} className="h-24 border border-gray-200 p-1 overflow-y-auto">
          <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
          {dayEvents.map(event => (
            <div
              key={event.id}
              className={`text-xs p-1 rounded mb-1 cursor-pointer ${getEventTypeColor(event.type)}`}
              onClick={() => handleViewEvent(event)}
            >
              <div className="font-medium truncate">{event.title}</div>
              <div>{event.time}</div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Calendrier - {new Date(currentYear, currentMonth).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => handleExportCalendar('google')}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-google-line mr-1"></i>
              Google Calendar
            </button>
            <button
              onClick={() => handleExportCalendar('outlook')}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-microsoft-line mr-1"></i>
              Outlook
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-0 mb-4">
          {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
            <div key={day} className="h-8 bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0">
          {days}
        </div>
      </div>
    );
  };

  // Existing helper functions from original code
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'demo': return 'bg-blue-100 text-blue-800';
      case 'presentation': return 'bg-purple-100 text-purple-800';
      case 'workshop': return 'bg-green-100 text-green-800';
      case 'meeting': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeText = (type: string) => {
    switch (type) {
      case 'demo': return 'Démonstration';
      case 'presentation': return 'Présentation';
      case 'workshop': return 'Atelier';
      case 'meeting': return 'Réunion';
      default: return 'Événement';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Planifié';
      case 'ongoing': return 'En cours';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      default: return 'Inconnu';
    }
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return event.status === filter;
  });

  const handleCreateEvent = () => {
    trackAction('create-event-click');
    setShowCreateForm(true);
  };

  const handleViewEvent = (event: Event) => {
    trackAction('view-event-details', { eventId: event.id, eventType: event.type });
    setSelectedEvent(event);
  };

  return (
    <div className="space-y-6">
      {/* Bannière publicitaire en haut */}
      <AdBanner 
        position="events-header" 
        format="banner"
        section="events"
        className="mb-6"
        userContext={{ section: 'events', priority: 'high' }}
        targetCategories={['productivity', 'marketing', 'automation']}
      />

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Gestion des Événements Promotionnels</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                showCalendar ? 'bg-purple-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <i className="ri-calendar-line mr-2"></i>
              {showCalendar ? 'Masquer Calendrier' : 'Voir Calendrier'}
            </button>
            <button
              onClick={handleCreateEvent}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Créer un Événement
            </button>
          </div>
        </div>

        {/* Vue Calendrier */}
        {showCalendar && (
          <div className="mb-6">
            {renderCalendarView()}
          </div>
        )}

        {/* Filtres */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tous ({events.length})
          </button>
          <button
            onClick={() => setFilter('scheduled')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'scheduled' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Planifiés ({events.filter(e => e.status === 'scheduled').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Terminés ({events.filter(e => e.status === 'completed').length})
          </button>
        </div>

        {/* Liste des événements */}
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                      {getEventTypeText(event.type)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {getStatusText(event.status)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div className="flex items-center space-x-2">
                      <i className="ri-calendar-line text-gray-400"></i>
                      <span>{new Date(event.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-time-line text-gray-400"></i>
                      <span>{event.time} ({event.duration}min)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-map-pin-line text-gray-400"></i>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-group-line text-gray-400"></i>
                      <span>{event.attendees}/{event.maxAttendees} participants</span>
                    </div>
                  </div>

                  {/* Participants confirmés */}
                  <div className="flex items-center space-x-4 text-sm mb-3">
                    <div className="flex items-center space-x-2">
                      <i className="ri-user-check-line text-green-600"></i>
                      <span className="text-green-600 font-medium">
                        {event.participants.filter(p => p.status === 'confirmed').length} confirmés
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="ri-user-unfollow-line text-orange-600"></i>
                      <span className="text-orange-600 font-medium">
                        {event.participants.filter(p => p.status === 'pending').length} en attente
                      </span>
                    </div>
                  </div>

                  {event.commercial && (
                    <div className="mt-3 flex items-center space-x-2 text-sm">
                      <i className="ri-user-star-line text-gray-400"></i>
                      <span className="text-gray-600">Commercial assigné: <span className="font-medium">{event.commercial}</span></span>
                    </div>
                  )}

                  {/* Statistiques pour les événements terminés */}
                  {event.status === 'completed' && event.statistics && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-green-700">{event.statistics.totalParticipants}</div>
                          <div className="text-green-600">Participants</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-green-700">{event.statistics.confirmationRate}%</div>
                          <div className="text-green-600">Taux confirmation</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-green-700">{event.statistics.satisfactionScore}/5</div>
                          <div className="text-green-600">Satisfaction</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-green-700">{event.statistics.leadsGenerated}</div>
                          <div className="text-green-600">Leads générés</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  <button
                    onClick={() => handleViewEvent(event)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Détails
                  </button>
                  <button
                    onClick={() => handleViewParticipants(event)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-group-line mr-1"></i>
                    Participants
                  </button>
                  {event.status === 'scheduled' && (
                    <>
                      <button
                        onClick={() => handleSendReminder(event.id)}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-notification-line mr-1"></i>
                        Rappel
                      </button>
                      <button
                        onClick={() => {
                          trackAction('edit-event', { eventId: event.id });
                          alert('Fonction d\'édition à implémenter');
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Modifier
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-calendar-line text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun événement trouvé</h3>
            <p className="text-gray-600">Créez votre premier événement pour commencer</p>
          </div>
        )}
      </div>

      {/* Bannière publicitaire pour outils de gestion d'événements */}
      <AdBanner 
        position="events-footer" 
        format="banner"
        section="events"
        userContext={{ section: 'events-management', priority: 'medium' }}
        targetCategories={['event-management', 'venue-rental', 'productivity']}
      />

      {/* Modal de gestion des participants */}
      {showParticipants && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Gestion des Participants - {selectedEvent.title}</h2>
                <button
                  onClick={() => setShowParticipants(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              {/* Statistiques des inscriptions */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedEvent.participants.length}</div>
                  <div className="text-sm text-blue-700">Total Inscrits</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {selectedEvent.participants.filter(p => p.status === 'confirmed').length}
                  </div>
                  <div className="text-sm text-green-700">Confirmés</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {selectedEvent.participants.filter(p => p.status === 'pending').length}
                  </div>
                  <div className="text-sm text-orange-700">En Attente</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{selectedEvent.maxAttendees - selectedEvent.participants.length}</div>
                  <div className="text-sm text-purple-700">Places Restantes</div>
                </div>
              </div>

              {/* Liste des participants */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Liste des Participants</h3>
                {selectedEvent.participants.map((participant) => (
                  <div key={participant.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{participant.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          participant.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          participant.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {participant.status === 'confirmed' ? 'Confirmé' :
                           participant.status === 'pending' ? 'En attente' : 'Refusé'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <i className="ri-mail-line text-gray-400"></i>
                          <span>{participant.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <i className="ri-phone-line text-gray-400"></i>
                          <span>{participant.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <i className="ri-building-line text-gray-400"></i>
                          <span>{participant.company}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Inscrit le {new Date(participant.registrationDate).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          trackAction('contact-participant', { participantId: participant.id });
                          window.location.href = `mailto:${participant.email}`;
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 cursor-pointer"
                      >
                        <i className="ri-mail-line"></i>
                      </button>
                      <button
                        onClick={() => {
                          trackAction('call-participant', { participantId: participant.id });
                          window.location.href = `tel:${participant.phone}`;
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 cursor-pointer"
                      >
                        <i className="ri-phone-line"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex space-x-4 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={() => {
                    trackAction('send-confirmation-emails', { eventId: selectedEvent.id });
                    alert('Emails de confirmation envoyés !');
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-mail-send-line mr-2"></i>
                  Envoyer Confirmations
                </button>
                <button
                  onClick={() => {
                    trackAction('export-participants', { eventId: selectedEvent.id });
                    alert('Liste des participants exportée !');
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-download-line mr-2"></i>
                  Exporter Liste
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de détails d'événement */}
      {selectedEvent && !showParticipants && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Détails de l'Événement</h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(selectedEvent.type)}`}>
                      {getEventTypeText(selectedEvent.type)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedEvent.status)}`}>
                      {getStatusText(selectedEvent.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{selectedEvent.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Informations Générales</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-3">
                        <i className="ri-calendar-line text-gray-400"></i>
                        <span>{new Date(selectedEvent.date).toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="ri-time-line text-gray-400"></i>
                        <span>{selectedEvent.time} - {selectedEvent.duration} minutes</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="ri-map-pin-line text-gray-400"></i>
                        <span>{selectedEvent.location}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="ri-group-line text-gray-400"></i>
                        <span>{selectedEvent.attendees}/{selectedEvent.maxAttendees} participants</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="ri-building-line text-gray-400"></i>
                        <span>{selectedEvent.client}</span>
                      </div>
                      {selectedEvent.commercial && (
                        <div className="flex items-center space-x-3">
                          <i className="ri-user-star-line text-gray-400"></i>
                          <span>{selectedEvent.commercial}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Objectifs</h4>
                    <ul className="space-y-2 text-sm">
                      {selectedEvent.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <i className="ri-check-line text-green-600 mt-0.5"></i>
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Matériel Nécessaire</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.materials.map((material, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {material}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-4 border-t border-gray-200">
                  {selectedEvent.status === 'scheduled' && (
                    <>
                      <button
                        onClick={() => {
                          trackAction('edit-event-modal', { eventId: selectedEvent.id });
                          alert('Fonction d\'édition à implémenter');
                        }}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-edit-line mr-2"></i>
                        Modifier l'Événement
                      </button>
                      <button
                        onClick={() => {
                          trackAction('cancel-event', { eventId: selectedEvent.id });
                          alert('Événement annulé');
                          setSelectedEvent(null);
                        }}
                        className="px-6 py-3 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-close-line mr-2"></i>
                        Annuler
                      </button>
                    </>
                  )}
                  {selectedEvent.status === 'completed' && (
                    <button
                      onClick={() => {
                        trackAction('view-event-report', { eventId: selectedEvent.id });
                        alert('Rapport d\'événement à implémenter');
                      }}
                      className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-file-chart-line mr-2"></i>
                      Voir le Rapport
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de création d'événement */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Créer un Nouvel Événement</h2>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Titre de l'événement</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ex: Démonstration produit..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type d'événement</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="demo">Démonstration</option>
                      <option value="presentation">Présentation</option>
                      <option value="workshop">Atelier</option>
                      <option value="meeting">Réunion</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Décrivez l'objectif et le contenu de l'événement..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Heure</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Durée (minutes)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Adresse ou lien visioconférence"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre max de participants</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10"
                    />
                  </div>
                </div>

                <div className="flex space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      trackAction('create-event-submit');
                      alert('Événement créé avec succès !');
                      setShowCreateForm(false);
                    }}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Créer l'Événement
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { EventsSection };
