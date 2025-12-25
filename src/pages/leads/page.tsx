import { useState, useEffect } from 'react';
import Sidebar from '../../components/feature/Sidebar';

interface Lead {
  id: string;
  company: string;
  contact: string;
  sector: string;
  location: string;
  budget: string;
  priority: 'high' | 'medium' | 'low';
  status: 'lead' | 'prospect' | 'negociation' | 'client' | 'perdu';
  description: string;
  lastContact: string;
  phone: string;
  email: string;
  potential: string;
  needs: string;
  history: Array<{
    date: string;
    action: string;
    notes: string;
  }>;
  relances: Array<{
    date: string;
    type: string;
    notes: string;
  }>;
  createdAt: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      company: 'TechCorp Solutions',
      contact: 'Marie Dubois',
      sector: 'Technologie',
      location: 'Paris',
      budget: '50,000-100,000€',
      priority: 'high',
      status: 'lead',
      description: 'Recherche solution CRM pour équipe de 50 commerciaux',
      lastContact: '2024-01-20',
      phone: '+33 1 42 86 75 30',
      email: 'marie.dubois@techcorp.fr',
      potential: '75,000€',
      needs: 'CRM complet avec intégration email et téléphonie',
      history: [
        { date: '2024-01-20', action: 'Premier contact', notes: 'Contact établi par email' }
      ],
      relances: [],
      createdAt: '2024-01-20'
    },
    {
      id: '2',
      company: 'InnovateSAS',
      contact: 'Pierre Martin',
      sector: 'Services',
      location: 'Lyon',
      budget: '100,000-200,000€',
      priority: 'high',
      status: 'prospect',
      description: 'Modernisation système commercial existant',
      lastContact: '2024-01-18',
      phone: '+33 4 78 92 15 67',
      email: 'p.martin@innovatesaas.com',
      potential: '120,000€',
      needs: 'Migration données + formation équipe',
      history: [
        { date: '2024-01-15', action: 'Premier contact', notes: 'Appel téléphonique' },
        { date: '2024-01-18', action: 'Conversion en prospect', notes: 'Besoins qualifiés' }
      ],
      relances: [
        { date: '2024-01-16', type: 'Email', notes: 'Envoi documentation' }
      ],
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      company: 'DataFlow Analytics',
      contact: 'Sophie Laurent',
      sector: 'Data & Analytics',
      location: 'Toulouse',
      budget: '200,000€+',
      priority: 'high',
      status: 'negociation',
      description: 'Solution BI intégrée pour analyse commerciale',
      lastContact: '2024-01-19',
      phone: '+33 5 61 23 45 78',
      email: 'sophie.laurent@dataflow.fr',
      potential: '200,000€',
      needs: 'BI + CRM + Analytics avancés',
      history: [
        { date: '2024-01-10', action: 'Premier contact', notes: 'Rencontre salon professionnel' },
        { date: '2024-01-12', action: 'Conversion en prospect', notes: 'Budget confirmé' },
        { date: '2024-01-19', action: 'En négociation', notes: 'Proposition commerciale envoyée' }
      ],
      relances: [
        { date: '2024-01-11', type: 'Email', notes: 'Suivi post-salon' },
        { date: '2024-01-17', type: 'Appel', notes: 'Relance proposition' }
      ],
      createdAt: '2024-01-10'
    }
  ]);

  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(leads);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRelanceModal, setShowRelanceModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Formulaire nouveau lead
  const [newLead, setNewLead] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    sector: '',
    location: '',
    budget: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    description: '',
    needs: '',
    potential: ''
  });

  // Formulaire relance
  const [relanceForm, setRelanceForm] = useState({
    type: 'Email',
    notes: ''
  });

  // Formulaire conversion
  const [convertForm, setConvertForm] = useState({
    newStatus: 'prospect' as 'prospect' | 'negociation' | 'client',
    notes: ''
  });

  useEffect(() => {
    filterLeads();
  }, [searchTerm, activeFilter, leads]);

  const filterLeads = () => {
    let filtered = leads;

    // Filtre par statut
    if (activeFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === activeFilter);
    }

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLeads(filtered);
  };

  const handleAddLead = () => {
    const lead: Lead = {
      id: Date.now().toString(),
      ...newLead,
      status: 'lead',
      lastContact: new Date().toISOString().split('T')[0],
      history: [
        {
          date: new Date().toISOString().split('T')[0],
          action: 'Lead créé',
          notes: 'Nouveau lead ajouté au système'
        }
      ],
      relances: [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setLeads([...leads, lead]);
    setShowAddModal(false);
    setNewLead({
      company: '',
      contact: '',
      email: '',
      phone: '',
      sector: '',
      location: '',
      budget: '',
      priority: 'medium',
      description: '',
      needs: '',
      potential: ''
    });
  };

  const handleAddRelance = () => {
    if (!selectedLead) return;

    const updatedLeads = leads.map(lead => {
      if (lead.id === selectedLead.id) {
        return {
          ...lead,
          relances: [
            ...lead.relances,
            {
              date: new Date().toISOString().split('T')[0],
              type: relanceForm.type,
              notes: relanceForm.notes
            }
          ],
          lastContact: new Date().toISOString().split('T')[0],
          history: [
            ...lead.history,
            {
              date: new Date().toISOString().split('T')[0],
              action: `Relance ${relanceForm.type}`,
              notes: relanceForm.notes
            }
          ]
        };
      }
      return lead;
    });

    setLeads(updatedLeads);
    setShowRelanceModal(false);
    setRelanceForm({ type: 'Email', notes: '' });
  };

  const handleConvert = () => {
    if (!selectedLead) return;

    const statusLabels = {
      prospect: 'Converti en prospect',
      negociation: 'En négociation',
      client: 'Converti en client'
    };

    const updatedLeads = leads.map(lead => {
      if (lead.id === selectedLead.id) {
        return {
          ...lead,
          status: convertForm.newStatus,
          lastContact: new Date().toISOString().split('T')[0],
          history: [
            ...lead.history,
            {
              date: new Date().toISOString().split('T')[0],
              action: statusLabels[convertForm.newStatus],
              notes: convertForm.notes
            }
          ]
        };
      }
      return lead;
    });

    setLeads(updatedLeads);
    setShowConvertModal(false);
    setShowDetailsModal(false);
    setConvertForm({ newStatus: 'prospect', notes: '' });
  };

  const handleMarkAsLost = (leadId: string, reason: string) => {
    const updatedLeads = leads.map(lead => {
      if (lead.id === leadId) {
        return {
          ...lead,
          status: 'perdu' as const,
          lastContact: new Date().toISOString().split('T')[0],
          history: [
            ...lead.history,
            {
              date: new Date().toISOString().split('T')[0],
              action: 'Marqué comme perdu',
              notes: reason
            }
          ]
        };
      }
      return lead;
    });

    setLeads(updatedLeads);
    setShowDetailsModal(false);
  };

  const getStatusCounts = () => {
    return {
      total: leads.length,
      lead: leads.filter(l => l.status === 'lead').length,
      prospect: leads.filter(l => l.status === 'prospect').length,
      negociation: leads.filter(l => l.status === 'negociation').length,
      client: leads.filter(l => l.status === 'client').length,
      perdu: leads.filter(l => l.status === 'perdu').length
    };
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      lead: 'Lead',
      prospect: 'Prospect',
      negociation: 'Négociation',
      client: 'Client',
      perdu: 'Perdu'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      lead: 'bg-blue-100 text-blue-800',
      prospect: 'bg-yellow-100 text-yellow-800',
      negociation: 'bg-orange-100 text-orange-800',
      client: 'bg-green-100 text-green-800',
      perdu: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Leads</h1>
              <p className="text-gray-600 mt-1">Gérez vos leads et suivez leur progression jusqu'à la conversion</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap flex items-center"
            >
              <i className="ri-add-line mr-2"></i>
              Nouveau Lead
            </button>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <p className="text-2xl font-bold text-blue-600">{statusCounts.lead}</p>
              <p className="text-sm text-gray-600">Leads</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.prospect}</p>
              <p className="text-sm text-gray-600">Prospects</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <p className="text-2xl font-bold text-orange-600">{statusCounts.negociation}</p>
              <p className="text-sm text-gray-600">Négociation</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <p className="text-2xl font-bold text-green-600">{statusCounts.client}</p>
              <p className="text-sm text-gray-600">Clients</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <p className="text-2xl font-bold text-gray-600">{statusCounts.perdu}</p>
              <p className="text-sm text-gray-600">Perdus</p>
            </div>
          </div>

          {/* Filtres rapides */}
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 overflow-x-auto">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeFilter === 'all' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tous ({statusCounts.total})
              </button>
              <button
                onClick={() => setActiveFilter('lead')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeFilter === 'lead' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Leads ({statusCounts.lead})
              </button>
              <button
                onClick={() => setActiveFilter('prospect')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeFilter === 'prospect' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Prospects ({statusCounts.prospect})
              </button>
              <button
                onClick={() => setActiveFilter('negociation')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeFilter === 'negociation' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Négociation ({statusCounts.negociation})
              </button>
              <button
                onClick={() => setActiveFilter('client')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeFilter === 'client' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Clients ({statusCounts.client})
              </button>
              <button
                onClick={() => setActiveFilter('perdu')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeFilter === 'perdu' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Perdus ({statusCounts.perdu})
              </button>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher par entreprise, contact ou description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
              />
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Liste des leads */}
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{lead.company}</h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                        {getStatusLabel(lead.status)}
                      </span>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(lead.priority)}`}>
                        {lead.priority === 'high' ? 'Priorité haute' : 
                         lead.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{lead.contact} • {lead.sector} • {lead.location}</p>
                    <p className="text-gray-700 mb-3">{lead.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{lead.potential}</p>
                    <p className="text-sm text-gray-600">Potentiel</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Budget</p>
                    <p className="text-sm text-gray-900">{lead.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Dernier contact</p>
                    <p className="text-sm text-gray-900">{lead.lastContact}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Relances</p>
                    <p className="text-sm text-gray-900">{lead.relances.length} relance(s)</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Créé le</p>
                    <p className="text-sm text-gray-900">{lead.createdAt}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedLead(lead);
                      setShowDetailsModal(true);
                    }}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap text-sm"
                  >
                    <i className="ri-eye-line mr-2"></i>
                    Voir détails
                  </button>
                  <button
                    onClick={() => {
                      setSelectedLead(lead);
                      setShowRelanceModal(true);
                    }}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors whitespace-nowrap text-sm"
                  >
                    <i className="ri-notification-line mr-2"></i>
                    Relancer
                  </button>
                  {lead.status !== 'client' && lead.status !== 'perdu' && (
                    <button
                      onClick={() => {
                        setSelectedLead(lead);
                        setShowConvertModal(true);
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap text-sm"
                    >
                      <i className="ri-arrow-right-line mr-2"></i>
                      Convertir
                    </button>
                  )}
                  <a
                    href={`tel:${lead.phone}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap text-sm"
                  >
                    <i className="ri-phone-line mr-2"></i>
                    Appeler
                  </a>
                  <a
                    href={`mailto:${lead.email}`}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap text-sm"
                  >
                    <i className="ri-mail-line mr-2"></i>
                    Email
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <i className="ri-inbox-line text-6xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun lead trouvé</h3>
              <p className="text-gray-600 mb-4">Commencez par ajouter votre premier lead</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
              >
                <i className="ri-add-line mr-2"></i>
                Ajouter un lead
              </button>
            </div>
          )}

          {/* Modal Ajout Lead */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Nouveau Lead</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise *</label>
                      <input
                        type="text"
                        value={newLead.company}
                        onChange={(e) => setNewLead({...newLead, company: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Nom de l'entreprise"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact *</label>
                      <input
                        type="text"
                        value={newLead.contact}
                        onChange={(e) => setNewLead({...newLead, contact: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Nom du contact"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={newLead.email}
                        onChange={(e) => setNewLead({...newLead, email: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="email@exemple.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                      <input
                        type="tel"
                        value={newLead.phone}
                        onChange={(e) => setNewLead({...newLead, phone: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="+33 X XX XX XX XX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Secteur *</label>
                      <input
                        type="text"
                        value={newLead.sector}
                        onChange={(e) => setNewLead({...newLead, sector: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Ex: Technologie, Finance..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Localisation *</label>
                      <input
                        type="text"
                        value={newLead.location}
                        onChange={(e) => setNewLead({...newLead, location: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Ville"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Budget estimé</label>
                      <input
                        type="text"
                        value={newLead.budget}
                        onChange={(e) => setNewLead({...newLead, budget: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Ex: 50,000-100,000€"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Potentiel</label>
                      <input
                        type="text"
                        value={newLead.potential}
                        onChange={(e) => setNewLead({...newLead, potential: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Ex: 75,000€"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                    <select
                      value={newLead.priority}
                      onChange={(e) => setNewLead({...newLead, priority: e.target.value as 'high' | 'medium' | 'low'})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="low">Basse</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Haute</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      value={newLead.description}
                      onChange={(e) => setNewLead({...newLead, description: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      rows={3}
                      placeholder="Décrivez le besoin du lead..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Besoins spécifiques</label>
                    <textarea
                      value={newLead.needs}
                      onChange={(e) => setNewLead({...newLead, needs: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      rows={2}
                      placeholder="Détaillez les besoins..."
                    ></textarea>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleAddLead}
                      disabled={!newLead.company || !newLead.contact || !newLead.email || !newLead.phone || !newLead.description}
                      className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      Ajouter le lead
                    </button>
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Détails */}
          {showDetailsModal && selectedLead && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedLead.company}</h3>
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mt-2 ${getStatusColor(selectedLead.status)}`}>
                      {getStatusLabel(selectedLead.status)}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Informations de contact</h4>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="font-medium">Contact:</span> {selectedLead.contact}</p>
                      <p className="text-sm"><span className="font-medium">Email:</span> {selectedLead.email}</p>
                      <p className="text-sm"><span className="font-medium">Téléphone:</span> {selectedLead.phone}</p>
                      <p className="text-sm"><span className="font-medium">Secteur:</span> {selectedLead.sector}</p>
                      <p className="text-sm"><span className="font-medium">Localisation:</span> {selectedLead.location}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Informations commerciales</h4>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="font-medium">Budget:</span> {selectedLead.budget}</p>
                      <p className="text-sm"><span className="font-medium">Potentiel:</span> <span className="text-green-600 font-semibold">{selectedLead.potential}</span></p>
                      <p className="text-sm"><span className="font-medium">Priorité:</span> {selectedLead.priority === 'high' ? 'Haute' : selectedLead.priority === 'medium' ? 'Moyenne' : 'Basse'}</p>
                      <p className="text-sm"><span className="font-medium">Dernier contact:</span> {selectedLead.lastContact}</p>
                      <p className="text-sm"><span className="font-medium">Créé le:</span> {selectedLead.createdAt}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedLead.description}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Besoins spécifiques</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedLead.needs}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Historique des actions ({selectedLead.history.length})</h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {selectedLead.history.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-gray-900">{item.action}</p>
                            <p className="text-xs text-gray-500">{item.date}</p>
                          </div>
                          <p className="text-sm text-gray-600">{item.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Relances ({selectedLead.relances.length})</h4>
                  <div className="space-y-3 max-h-40 overflow-y-auto">
                    {selectedLead.relances.length > 0 ? (
                      selectedLead.relances.map((relance, index) => (
                        <div key={index} className="flex items-start space-x-3 bg-orange-50 p-3 rounded-lg">
                          <i className="ri-notification-line text-orange-600 mt-1"></i>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium text-gray-900">{relance.type}</p>
                              <p className="text-xs text-gray-500">{relance.date}</p>
                            </div>
                            <p className="text-sm text-gray-600">{relance.notes}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">Aucune relance effectuée</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setShowRelanceModal(true);
                    }}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors whitespace-nowrap"
                  >
                    <i className="ri-notification-line mr-2"></i>
                    Ajouter une relance
                  </button>
                  {selectedLead.status !== 'client' && selectedLead.status !== 'perdu' && (
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        setShowConvertModal(true);
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                    >
                      <i className="ri-arrow-right-line mr-2"></i>
                      Convertir
                    </button>
                  )}
                  {selectedLead.status !== 'perdu' && selectedLead.status !== 'client' && (
                    <button
                      onClick={() => {
                        const reason = prompt('Raison de la perte :');
                        if (reason) {
                          handleMarkAsLost(selectedLead.id, reason);
                        }
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                    >
                      <i className="ri-close-circle-line mr-2"></i>
                      Marquer comme perdu
                    </button>
                  )}
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Relance */}
          {showRelanceModal && selectedLead && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Ajouter une relance</h3>
                  <button
                    onClick={() => setShowRelanceModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Lead: {selectedLead.company}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type de relance</label>
                    <select
                      value={relanceForm.type}
                      onChange={(e) => setRelanceForm({...relanceForm, type: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="Email">Email</option>
                      <option value="Appel">Appel téléphonique</option>
                      <option value="SMS">SMS</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                      value={relanceForm.notes}
                      onChange={(e) => setRelanceForm({...relanceForm, notes: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      rows={4}
                      placeholder="Détails de la relance..."
                    ></textarea>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleAddRelance}
                      disabled={!relanceForm.notes}
                      className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      Enregistrer la relance
                    </button>
                    <button
                      onClick={() => setShowRelanceModal(false)}
                      className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Conversion */}
          {showConvertModal && selectedLead && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Convertir le lead</h3>
                  <button
                    onClick={() => setShowConvertModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Lead: {selectedLead.company}</p>
                    <p className="text-sm text-gray-600">Statut actuel: <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedLead.status)}`}>{getStatusLabel(selectedLead.status)}</span></p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau statut</label>
                    <select
                      value={convertForm.newStatus}
                      onChange={(e) => setConvertForm({...convertForm, newStatus: e.target.value as 'prospect' | 'negociation' | 'client'})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      {selectedLead.status === 'lead' && <option value="prospect">Prospect</option>}
                      {(selectedLead.status === 'lead' || selectedLead.status === 'prospect') && <option value="negociation">Négociation</option>}
                      <option value="client">Client</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes de conversion</label>
                    <textarea
                      value={convertForm.notes}
                      onChange={(e) => setConvertForm({...convertForm, notes: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      rows={4}
                      placeholder="Détails de la conversion..."
                    ></textarea>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleConvert}
                      disabled={!convertForm.notes}
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      Confirmer la conversion
                    </button>
                    <button
                      onClick={() => setShowConvertModal(false)}
                      className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
