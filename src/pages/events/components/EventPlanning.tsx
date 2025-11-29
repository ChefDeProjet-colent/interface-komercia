import { useState, useEffect } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';
import AdBanner from '../../../components/feature/AdBanner';

export default function EventPlanning() {
  const { trackAction } = useAdManager();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedView, setSelectedView] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Salon Tech Innovation 2024',
      description: 'Le plus grand salon technologique de France avec plus de 200 exposants',
      date: '2024-02-15',
      time: '09:00',
      endTime: '18:00',
      location: 'Paris Expo Porte de Versailles',
      format: 'physical',
      category: 'salon',
      capacity: 500,
      registered: 450,
      status: 'confirmed',
      organizer: 'Tech Events Pro',
      tags: ['technologie', 'innovation', 'startup', 'networking']
    },
    {
      id: 2,
      title: 'Webinaire Marketing Digital',
      description: 'Stratégies avancées pour optimiser votre présence en ligne',
      date: '2024-02-18',
      time: '14:00',
      endTime: '16:00',
      location: 'En ligne - Zoom',
      format: 'online',
      category: 'webinaire',
      capacity: 150,
      registered: 120,
      status: 'confirmed',
      organizer: 'Digital Marketing Hub',
      tags: ['marketing', 'digital', 'stratégie', 'formation']
    },
    {
      id: 3,
      title: 'Atelier Leadership Féminin',
      description: 'Développer ses compétences de leadership dans un environnement bienveillant',
      date: '2024-02-22',
      time: '10:00',
      endTime: '17:00',
      location: 'Lyon Centre des Congrès',
      format: 'physical',
      category: 'atelier',
      capacity: 40,
      registered: 35,
      status: 'pending',
      organizer: 'Women in Business',
      tags: ['leadership', 'femmes', 'développement', 'carrière']
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    endTime: '',
    location: '',
    format: 'physical',
    category: 'conference',
    capacity: 100,
    tags: []
  });

  const categories = [
    { value: 'conference', label: 'Conférence', icon: 'ri-presentation-line' },
    { value: 'salon', label: 'Salon', icon: 'ri-store-line' },
    { value: 'webinaire', label: 'Webinaire', icon: 'ri-video-line' },
    { value: 'atelier', label: 'Atelier', icon: 'ri-tools-line' },
    { value: 'networking', label: 'Networking', icon: 'ri-team-line' },
    { value: 'formation', label: 'Formation', icon: 'ri-book-line' }
  ];

  useEffect(() => {
    trackAction('view-event-planning', {
      section: 'planning',
      timestamp: Date.now()
    });
  }, []);

  const handleCreateEvent = () => {
    const event = {
      ...newEvent,
      id: events.length + 1,
      registered: 0,
      status: 'pending',
      organizer: 'Votre Organisation'
    };
    
    setEvents([...events, event]);
    setShowCreateModal(false);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      endTime: '',
      location: '',
      format: 'physical',
      category: 'conference',
      capacity: 100,
      tags: []
    });

    trackAction('create-event', {
      eventType: newEvent.category,
      format: newEvent.format,
      timestamp: Date.now()
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : 'ri-calendar-line';
  };

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dayEvents = events.filter(event => 
        new Date(event.date).toDateString() === current.toDateString()
      );
      
      days.push({
        date: new Date(current),
        isCurrentMonth: current.getMonth() === month,
        events: dayEvents
      });
      
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              <i className="ri-calendar-event-line text-purple-600 mr-3"></i>
              Planification des Événements
            </h2>
            <p className="text-gray-600 mt-1">
              Créez et gérez vos événements professionnels
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedView('calendar')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedView === 'calendar'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="ri-calendar-line mr-2"></i>
                Calendrier
              </button>
              <button
                onClick={() => setSelectedView('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedView === 'list'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="ri-list-check mr-2"></i>
                Liste
              </button>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Créer un Événement
            </button>
          </div>
        </div>

        {/* Bannière publicitaire */}
        <AdBanner
          position="event-planning-header"
          format="banner"
          section="event-planning"
          className="w-full mb-6"
          userContext={{
            userType: 'event-organizer',
            targetCategories: ['event-management', 'planning-tools', 'productivity'],
            priority: 'high'
          }}
        />
      </div>

      {/* Vue Calendrier */}
      {selectedView === 'calendar' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <i className="ri-arrow-left-line"></i>
              </button>
              <button
                onClick={() => setSelectedDate(new Date())}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
              >
                Aujourd'hui
              </button>
              <button
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
              <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 border-b border-gray-200">
                {day}
              </div>
            ))}
            
            {generateCalendarDays().map((day, index) => (
              <div
                key={index}
                className={`min-h-[120px] p-2 border border-gray-100 ${
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                } ${
                  day.date.toDateString() === new Date().toDateString() ? 'bg-purple-50 border-purple-200' : ''
                }`}
              >
                <div className={`text-sm font-medium mb-1 ${
                  day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                } ${
                  day.date.toDateString() === new Date().toDateString() ? 'text-purple-600' : ''
                }`}>
                  {day.date.getDate()}
                </div>
                <div className="space-y-1">
                  {day.events.slice(0, 2).map(event => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded truncate cursor-pointer ${
                        event.category === 'salon' ? 'bg-blue-100 text-blue-800' :
                        event.category === 'webinaire' ? 'bg-green-100 text-green-800' :
                        event.category === 'atelier' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}
                      title={event.title}
                    >
                      {event.time} {event.title}
                    </div>
                  ))}
                  {day.events.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{day.events.length - 2} autres
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vue Liste */}
      {selectedView === 'list' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            <i className="ri-list-check text-purple-600 mr-2"></i>
            Liste des Événements
          </h3>
          
          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <i className={`${getCategoryIcon(event.category)} text-purple-600`}></i>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.organizer}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <i className="ri-calendar-line mr-2 text-purple-600"></i>
                        {new Date(event.date).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="ri-time-line mr-2 text-purple-600"></i>
                        {event.time} - {event.endTime}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="ri-map-pin-line mr-2 text-purple-600"></i>
                        {event.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="ri-group-line mr-2 text-purple-600"></i>
                        {event.registered}/{event.capacity} participants
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status === 'confirmed' ? 'Confirmé' : 
                           event.status === 'pending' ? 'En attente' : 'Annulé'}
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {event.format === 'physical' ? 'Présentiel' : 'En ligne'}
                        </span>
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                          {categories.find(c => c.value === event.category)?.label}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                          <i className="ri-edit-line mr-1"></i>
                          Modifier
                        </button>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          <i className="ri-share-line mr-1"></i>
                          Partager
                        </button>
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                          <i className="ri-megaphone-line mr-1"></i>
                          Promouvoir
                        </button>
                      </div>
                    </div>
                    
                    {event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {event.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bannière publicitaire en bas */}
      <AdBanner
        position="event-planning-footer"
        format="animated"
        section="event-planning"
        className="w-full"
        userContext={{
          userType: 'event-organizer',
          targetCategories: ['promotion-tools', 'marketing', 'analytics'],
          priority: 'medium'
        }}
      />

      {/* Modal de création d'événement */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  <i className="ri-add-circle-line text-purple-600 mr-2"></i>
                  Créer un Nouvel Événement
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre de l'événement *
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: Conférence Innovation 2024"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie *
                  </label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Décrivez votre événement..."
                  maxLength={500}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heure de début *
                  </label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heure de fin
                  </label>
                  <input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Format *
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="physical"
                        checked={newEvent.format === 'physical'}
                        onChange={(e) => setNewEvent({...newEvent, format: e.target.value})}
                        className="mr-2"
                      />
                      <span className="text-sm">Présentiel</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="online"
                        checked={newEvent.format === 'online'}
                        onChange={(e) => setNewEvent({...newEvent, format: e.target.value})}
                        className="mr-2"
                      />
                      <span className="text-sm">En ligne</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacité maximale
                  </label>
                  <input
                    type="number"
                    value={newEvent.capacity}
                    onChange={(e) => setNewEvent({...newEvent, capacity: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min="1"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lieu *
                </label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={newEvent.format === 'online' ? 'Ex: Zoom, Teams, etc.' : 'Ex: Paris Expo Porte de Versailles'}
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateEvent}
                disabled={!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                <i className="ri-save-line mr-2"></i>
                Créer l'Événement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { EventPlanning };
