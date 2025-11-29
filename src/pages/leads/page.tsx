
import { useState, useEffect } from 'react';
import LeadCard from './components/LeadCard';
import LeadFilters from './components/LeadFilters';
import AdBanner from '../../components/feature/AdBanner';
import { useAdManager } from '../../components/feature/AdManager';
import { mockLeads } from '../../mocks/leads';

interface Lead {
  id: string;
  company: string;
  contact: string;
  sector: string;
  location: string;
  budget: string;
  priority: 'high' | 'medium' | 'low';
  status: 'nouveau' | 'en_cours' | 'conclu' | 'perdu';
  description: string;
  lastContact: string;
  phone: string;
  email: string;
  potential: string;
  needs: string;
  history: string[];
}

interface FilterOptions {
  sector: string;
  location: string;
  priority: string;
  status: string;
  budget: string;
}

export default function LeadsPage() {
  const [leads] = useState<Lead[]>([
    {
      id: '1',
      company: 'TechCorp Solutions',
      contact: 'Marie Dubois',
      sector: 'Technologie',
      location: 'Paris',
      budget: '50,000-100,000€',
      priority: 'high',
      status: 'nouveau',
      description: 'Recherche solution CRM pour équipe de 50 commerciaux',
      lastContact: '2024-01-20',
      phone: '+33 1 42 86 75 30',
      email: 'marie.dubois@techcorp.fr',
      potential: '75,000€',
      needs: 'CRM complet avec intégration email et téléphonie',
      history: ['Premier contact établi', 'Besoins identifiés', 'Budget confirmé']
    },
    {
      id: '2',
      company: 'InnovateSAS',
      contact: 'Pierre Martin',
      sector: 'Services',
      location: 'Lyon',
      budget: '100,000-200,000€',
      priority: 'high',
      status: 'en_cours',
      description: 'Modernisation système commercial existant',
      lastContact: '2024-01-18',
      phone: '+33 4 78 92 15 67',
      email: 'p.martin@innovatesaas.com',
      potential: '120,000€',
      needs: 'Migration données + formation équipe',
      history: ['Audit système actuel', 'Présentation solution', 'Négociation en cours']
    },
    {
      id: '3',
      company: 'DataFlow Analytics',
      contact: 'Sophie Laurent',
      sector: 'Data & Analytics',
      location: 'Toulouse',
      budget: '200,000€+',
      priority: 'high',
      status: 'en_cours',
      description: 'Solution BI intégrée pour analyse commerciale',
      lastContact: '2024-01-19',
      phone: '+33 5 61 23 45 78',
      email: 'sophie.laurent@dataflow.fr',
      potential: '200,000€',
      needs: 'BI + CRM + Analytics avancés',
      history: ['Démonstration technique', 'Validation budget', 'Proposition envoyée']
    },
    {
      id: '4',
      company: 'GreenTech Energy',
      contact: 'Thomas Rousseau',
      sector: 'Énergie',
      location: 'Nantes',
      budget: '30,000-50,000€',
      priority: 'medium',
      status: 'nouveau',
      description: 'Gestion prospects secteur énergies renouvelables',
      lastContact: '2024-01-21',
      phone: '+33 2 40 12 34 56',
      email: 'thomas.rousseau@greentech.fr',
      potential: '45,000€',
      needs: 'CRM spécialisé énergie + géolocalisation',
      history: ['Contact initial', 'Qualification besoins']
    },
    {
      id: '5',
      company: 'MedCare Solutions',
      contact: 'Dr. Anne Moreau',
      sector: 'Santé',
      location: 'Marseille',
      budget: '50,000-100,000€',
      priority: 'medium',
      status: 'conclu',
      description: 'CRM pour cabinet médical multi-sites',
      lastContact: '2024-01-15',
      phone: '+33 4 91 55 67 89',
      email: 'a.moreau@medcare.fr',
      potential: '85,000€',
      needs: 'CRM RGPD + agenda patients',
      history: ['Audit besoins', 'Démonstration', 'Contrat signé']
    },
    {
      id: '6',
      company: 'RetailPlus Distribution',
      contact: 'Marc Leroy',
      sector: 'Commerce',
      location: 'Lille',
      budget: '20,000-50,000€',
      priority: 'low',
      status: 'nouveau',
      description: 'Gestion clientèle magasins de proximité',
      lastContact: '2024-01-22',
      phone: '+33 3 20 45 67 89',
      email: 'marc.leroy@retailplus.fr',
      potential: '35,000€',
      needs: 'CRM simple + fidélisation client',
      history: ['Premier appel', 'Envoi documentation']
    }
  ]);

  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(leads);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [contactNotes, setContactNotes] = useState('');
  
  const { trackAction } = useAdManager();

  useEffect(() => {
    trackAction('view-leads');
  }, []);

  const handleFiltersChange = (filters: FilterOptions) => {
    let filtered = leads;

    if (filters.sector) {
      filtered = filtered.filter(lead => lead.sector === filters.sector);
    }
    if (filters.location) {
      filtered = filtered.filter(lead => lead.location === filters.location);
    }
    if (filters.priority) {
      filtered = filtered.filter(lead => lead.priority === filters.priority);
    }
    if (filters.status) {
      filtered = filtered.filter(lead => lead.status === filters.status);
    }
    if (filters.budget) {
      filtered = filtered.filter(lead => lead.budget === filters.budget);
    }

    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLeads(filtered);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    let filtered = leads;

    if (term) {
      filtered = filtered.filter(lead =>
        lead.company.toLowerCase().includes(term.toLowerCase()) ||
        lead.contact.toLowerCase().includes(term.toLowerCase()) ||
        lead.description.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredLeads(filtered);
  };

  const handleContact = (lead: Lead) => {
    setSelectedLead(lead);
    setShowContactModal(true);
    trackAction('contact-lead', { leadId: lead.id, company: lead.company });
  };

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDetailsModal(true);
    trackAction('view-lead-details', { leadId: lead.id, company: lead.company });
  };

  const getStatusCounts = () => {
    return {
      total: filteredLeads.length,
      nouveau: filteredLeads.filter(l => l.status === 'nouveau').length,
      en_cours: filteredLeads.filter(l => l.status === 'en_cours').length,
      conclu: filteredLeads.filter(l => l.status === 'conclu').length,
      perdu: filteredLeads.filter(l => l.status === 'perdu').length
    };
  };

  const getTotalPotential = () => {
    return filteredLeads.reduce((total, lead) => {
      const value = parseInt(lead.potential.replace(/[€,]/g, ''));
      return total + value;
    }, 0);
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="ml-64 p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Leads Qualifiés</h1>
            <p className="text-gray-600 mt-1">Accédez à des opportunités commerciales qualifiées et gérez vos prospects</p>
          </div>

          {/* Statistiques des leads */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{statusCounts.total}</p>
                <p className="text-sm text-gray-600">Total leads</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{statusCounts.nouveau}</p>
                <p className="text-sm text-gray-600">Nouveaux</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{statusCounts.en_cours}</p>
                <p className="text-sm text-gray-600">En cours</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{statusCounts.conclu}</p>
                <p className="text-sm text-gray-600">Conclus</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">{getTotalPotential().toLocaleString()}€</p>
                <p className="text-sm text-gray-600">Potentiel total</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filtres */}
            <div className="lg:col-span-1">
              <LeadFilters onFiltersChange={handleFiltersChange} />
            </div>

            {/* Liste des leads */}
            <div className="lg:col-span-3">
              {/* Barre de recherche */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher par entreprise, contact ou description..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              {/* Bannière publicitaire pour bases de données */}
              <AdBanner 
                type="header"
                title="Base de Données Premium - Prospects Qualifiés"
                description="Accédez à 50,000+ entreprises qualifiées par secteur et région. Prospection ciblée garantie."
                buttonText="Découvrir l'offre"
                gradient="from-indigo-600 to-purple-600"
                icon="ri-database-2-line"
                className="mb-6"
              />

              {/* Grille des leads */}
              <div className="space-y-4">
                {filteredLeads.map((lead) => (
                  <div key={lead.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{lead.company}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            lead.priority === 'high' ? 'bg-red-100 text-red-800' :
                            lead.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {lead.priority === 'high' ? 'Priorité haute' : 
                             lead.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            lead.status === 'nouveau' ? 'bg-blue-100 text-blue-800' :
                            lead.status === 'en_cours' ? 'bg-orange-100 text-orange-800' :
                            lead.status === 'conclu' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {lead.status === 'nouveau' ? 'Nouveau' :
                             lead.status === 'en_cours' ? 'En cours' :
                             lead.status === 'conclu' ? 'Conclu' : 'Perdu'}
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Budget</p>
                        <p className="text-sm text-gray-900">{lead.budget}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Besoins</p>
                        <p className="text-sm text-gray-900">{lead.needs}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Dernier contact</p>
                        <p className="text-sm text-gray-900">{lead.lastContact}</p>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleContact(lead)}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-phone-line mr-2"></i>
                        Contacter
                      </button>
                      <button
                        onClick={() => handleViewDetails(lead)}
                        className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg text-center hover:bg-gray-700 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-eye-line mr-2"></i>
                        Voir détails
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredLeads.length === 0 && (
                <div className="text-center py-12">
                  <i className="ri-search-line text-4xl text-gray-400 mb-4"></i>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun lead trouvé</h3>
                  <p className="text-gray-600">Essayez de modifier vos filtres ou votre recherche</p>
                </div>
              )}

              {/* Bannière publicitaire en bas de la liste */}
              <div className="mt-8">
                <AdBanner
                  type="footer"
                  title="Outils de Prospection Avancés"
                  description="Automatisez votre prospection avec nos outils d'email marketing et de suivi des leads. Augmentez votre taux de conversion de 50%."
                  buttonText="Essayer gratuitement"
                  gradient="from-green-600 to-teal-600"
                  icon="ri-mail-send-line"
                />
              </div>
            </div>
          </div>

          {/* Modal de contact */}
          {showContactModal && selectedLead && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Contacter {selectedLead.company}</h3>
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Contact</p>
                    <p className="text-gray-900">{selectedLead.contact}</p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      <i className="ri-phone-line mr-2"></i>
                      Appeler
                    </a>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg text-center hover:bg-gray-700 transition-colors whitespace-nowrap"
                    >
                      <i className="ri-mail-line mr-2"></i>
                      Email
                    </a>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Notes de contact</p>
                    <textarea
                      value={contactNotes}
                      onChange={(e) => setContactNotes(e.target.value)}
                      placeholder="Ajouter des notes sur cet échange..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      rows={3}
                    ></textarea>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowContactModal(false);
                      setContactNotes('');
                    }}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                  >
                    Marquer comme contacté
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de détails */}
          {showDetailsModal && selectedLead && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Détails - {selectedLead.company}</h3>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Entreprise</p>
                      <p className="text-gray-900">{selectedLead.company}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Contact</p>
                      <p className="text-gray-900">{selectedLead.contact}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Secteur</p>
                      <p className="text-gray-900">{selectedLead.sector}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Localisation</p>
                      <p className="text-gray-900">{selectedLead.location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Budget</p>
                      <p className="text-gray-900">{selectedLead.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Potentiel</p>
                      <p className="text-gray-900 font-semibold text-green-600">{selectedLead.potential}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Description des besoins</p>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedLead.description}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Besoins spécifiques</p>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedLead.needs}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Historique des interactions</p>
                    <div className="space-y-2">
                      {selectedLead.history.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <p className="text-sm text-gray-900">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        handleContact(selectedLead);
                      }}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      <i className="ri-phone-line mr-2"></i>
                      Contacter maintenant
                    </button>
                    <button
                      onClick={() => setShowDetailsModal(false)}
                      className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
                    >
                      Fermer
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
