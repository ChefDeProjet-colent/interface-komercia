import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/feature/Sidebar';

interface CallForTender {
  id: string;
  title: string;
  company: string;
  sector: string;
  location: string;
  type: string;
  deadline: string;
  budget: string;
  description: string;
  requirements: string[];
  status: 'open' | 'closed' | 'applied';
  postedDate: string;
}

const mockCallsForTenders: CallForTender[] = [
  {
    id: '1',
    title: 'Commercial Senior - Secteur Technologie',
    company: 'TechCorp Solutions',
    sector: 'Technologie',
    location: 'Abidjan, Plateau',
    type: 'CDI',
    deadline: '2024-02-15',
    budget: '800 000 - 1 200 000 FCFA',
    description: 'Nous recherchons un commercial senior pour développer notre portefeuille clients dans le secteur technologique. Vous serez en charge de la prospection, de la négociation et du closing de contrats B2B.',
    requirements: ['5+ ans d\'expérience en vente B2B', 'Maîtrise du CRM Salesforce', 'Excellentes compétences en négociation', 'Permis de conduire'],
    status: 'open',
    postedDate: '2024-01-10'
  },
];

const sectors = ['Tous', 'Technologie', 'Agroalimentaire', 'Santé', 'Finance', 'Agriculture', 'Banque'];
const types = ['Tous', 'CDI', 'CDD', 'Freelance'];
const statuses = ['Tous', 'Ouvert', 'Postulé', 'Fermé'];

export default function CallForTendersPage() {
  const navigate = useNavigate();
  const [calls, setCalls] = useState<CallForTender[]>(mockCallsForTenders);
  const [selectedCall, setSelectedCall] = useState<CallForTender | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('Tous');
  const [selectedType, setSelectedType] = useState('Tous');
  const [selectedStatus, setSelectedStatus] = useState('Tous');

  // Application form
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [motivationLetter, setMotivationLetter] = useState('');

  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'Tous' || call.sector === selectedSector;
    const matchesType = selectedType === 'Tous' || call.type === selectedType;
    const matchesStatus = selectedStatus === 'Tous' || 
                         (selectedStatus === 'Ouvert' && call.status === 'open') ||
                         (selectedStatus === 'Postulé' && call.status === 'applied') ||
                         (selectedStatus === 'Fermé' && call.status === 'closed');
    
    return matchesSearch && matchesSector && matchesType && matchesStatus;
  });

  const handleApply = (call: CallForTender) => {
    setSelectedCall(call);
    setShowApplicationModal(true);
  };

  const handleCancelApplication = (call: CallForTender) => {
    setSelectedCall(call);
    setShowCancelModal(true);
  };

  const handleViewApplication = (offer: any) => {
    // Trouver la candidature correspondante
    const application = {
      id: offer.id,
      offer: offer,
      appliedDate: '15 janvier 2025',
      status: offer.myApplication,
      coverLetter: `Madame, Monsieur,

Je me permets de vous adresser ma candidature pour le poste de ${offer.title} au sein de votre entreprise ${offer.company}.

Fort de plusieurs années d'expérience dans le domaine commercial, j'ai développé une expertise solide en développement commercial, gestion de la relation client et négociation. Mon parcours m'a permis d'acquérir une connaissance approfondie du secteur ${offer.sector} et de ses enjeux.

Mes compétences principales incluent :
- Prospection et développement de nouveaux marchés
- Gestion et fidélisation d'un portefeuille clients
- Négociation et conclusion de contrats commerciaux
- Analyse des besoins clients et proposition de solutions adaptées
- Travail en équipe et collaboration inter-services

Je suis particulièrement motivé par l'opportunité de rejoindre ${offer.company}, une entreprise reconnue pour son excellence et son innovation dans le secteur ${offer.sector}.

Je reste à votre disposition pour un entretien afin de vous présenter plus en détail mon parcours et ma motivation.

Cordialement,
Jean Dupont`,
      cv: 'CV_Jean_Dupont.pdf',
      phone: '+33 6 12 34 56 78',
      email: 'jean.dupont@email.com',
      experience: '5 ans',
      skills: ['Prospection', 'Négociation', 'Gestion client', 'Analyse marché'],
      availability: 'Immédiate',
      expectedSalary: offer.salary,
      motivation: 'Très motivé',
      references: [
        { name: 'Marie Martin', company: 'TechCorp', position: 'Directrice Commerciale', phone: '+33 6 98 76 54 32' },
        { name: 'Pierre Dubois', company: 'InnoSolutions', position: 'Manager', phone: '+33 6 45 67 89 01' }
      ]
    };
    
    setSelectedApplication(application);
    setShowApplicationModal(true);
  };

  const handleViewDetails = (callId: string) => {
    navigate(`/commercial/call-for-tenders/details/${callId}`);
  };

  const submitApplication = () => {
    if (selectedCall && cvFile && motivationLetter.trim()) {
      setCalls(calls.map(call => 
        call.id === selectedCall.id ? { ...call, status: 'applied' } : call
      ));
      setShowApplicationModal(false);
      setCvFile(null);
      setMotivationLetter('');
      setSelectedCall(null);
    }
  };

  const confirmCancelApplication = () => {
    if (selectedCall) {
      setCalls(calls.map(call => 
        call.id === selectedCall.id ? { ...call, status: 'open' } : call
      ));
      setShowCancelModal(false);
      setSelectedCall(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">Ouvert</span>;
      case 'applied':
        return <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">Postulé</span>;
      case 'closed':
        return <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">Fermé</span>;
      default:
        return null;
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expiré';
    if (diffDays === 0) return 'Aujourd\'hui';
    if (diffDays === 1) return '1 jour restant';
    return `${diffDays} jours restants`;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="commercial" />
      
      <div className="flex-1 lg:ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Appels d'Offres</h1>
            <p className="text-gray-600">Découvrez et postulez aux opportunités commerciales</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Offres</p>
                  <p className="text-2xl font-bold text-gray-900">{calls.length}</p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
                  <i className="ri-file-list-3-line text-2xl text-blue-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Offres Ouvertes</p>
                  <p className="text-2xl font-bold text-emerald-600">{calls.filter(c => c.status === 'open').length}</p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-lg">
                  <i className="ri-door-open-line text-2xl text-emerald-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Candidatures</p>
                  <p className="text-2xl font-bold text-blue-600">{calls.filter(c => c.status === 'applied').length}</p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
                  <i className="ri-send-plane-line text-2xl text-blue-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Taux de Réponse</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {calls.filter(c => c.status === 'applied').length > 0 
                      ? Math.round((calls.filter(c => c.status === 'applied').length / calls.length) * 100) 
                      : 0}%
                  </p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-lg">
                  <i className="ri-pie-chart-line text-2xl text-purple-600"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <i className="ri-filter-3-line text-xl text-gray-700"></i>
              <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rechercher
                </label>
                <div className="relative">
                  <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Titre, entreprise, description..."
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Sector Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secteur
                </label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de Contrat
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Reset Filters */}
              <div className="md:col-span-2 flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSector('Tous');
                    setSelectedType('Tous');
                    setSelectedStatus('Tous');
                  }}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                >
                  <i className="ri-refresh-line mr-2"></i>
                  Réinitialiser les filtres
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>{filteredCalls.length}</strong> offre{filteredCalls.length > 1 ? 's' : ''} trouvée{filteredCalls.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Calls List */}
          <div className="space-y-4">
            {filteredCalls.map(call => (
              <div key={call.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{call.title}</h3>
                      {getStatusBadge(call.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <i className="ri-building-line"></i>
                        {call.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-map-pin-line"></i>
                        {call.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-briefcase-line"></i>
                        {call.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-money-dollar-circle-line"></i>
                        {call.budget}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {getDaysRemaining(call.deadline)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Échéance: {new Date(call.deadline).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{call.description}</p>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Exigences:</p>
                  <div className="flex flex-wrap gap-2">
                    {call.requirements.map((req, index) => (
                      <span key={index} className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Publié le {new Date(call.postedDate).toLocaleDateString('fr-FR')}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(call.id)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                    >
                      <i className="ri-eye-line mr-2"></i>
                      Voir les détails
                    </button>
                    {call.status === 'open' && (
                      <button
                        onClick={() => handleApply(call)}
                        className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-send-plane-line mr-2"></i>
                        Postuler
                      </button>
                    )}
                    {call.status === 'applied' && (
                      <>
                        <button 
                          onClick={() => handleViewApplication(call)}
                          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap"
                        >
                          <i className="ri-eye-line mr-2"></i>
                          Voir ma candidature
                        </button>
                        <button
                          onClick={() => handleCancelApplication(call)}
                          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors whitespace-nowrap"
                        >
                          <i className="ri-close-circle-line mr-2"></i>
                          Annuler
                        </button>
                      </>
                    )}
                    {call.status === 'closed' && (
                      <button disabled className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed whitespace-nowrap">
                        <i className="ri-lock-line mr-2"></i>
                        Fermé
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredCalls.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
                  <i className="ri-inbox-line text-4xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune offre trouvée</h3>
                <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedCall && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Postuler à l'offre</h2>
                <button
                  onClick={() => {
                    setShowApplicationModal(false);
                    setCvFile(null);
                    setMotivationLetter('');
                  }}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Offer Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{selectedCall.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <i className="ri-building-line"></i>
                    {selectedCall.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-map-pin-line"></i>
                    {selectedCall.location}
                  </span>
                </div>
              </div>

              {/* CV Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <i className="ri-file-text-line mr-2 text-teal-600"></i>
                  CV (obligatoire) *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer">
                    <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-lg mx-auto mb-3">
                      <i className="ri-upload-cloud-line text-2xl text-teal-600"></i>
                    </div>
                    {cvFile ? (
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">{cvFile.name}</p>
                        <p className="text-xs text-gray-500">Cliquez pour changer</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">Cliquez pour télécharger votre CV</p>
                        <p className="text-xs text-gray-500">PDF, DOC ou DOCX (max. 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Motivation Letter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <i className="ri-quill-pen-line mr-2 text-teal-600"></i>
                  Lettre de motivation (obligatoire) *
                </label>
                <textarea
                  value={motivationLetter}
                  onChange={(e) => setMotivationLetter(e.target.value)}
                  placeholder="Expliquez pourquoi vous êtes le candidat idéal pour ce poste..."
                  rows={8}
                  maxLength={2000}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500">
                    Décrivez vos compétences, votre expérience et votre motivation
                  </p>
                  <p className="text-xs text-gray-500">
                    {motivationLetter.length}/2000
                  </p>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <i className="ri-information-line text-blue-600 text-xl flex-shrink-0"></i>
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">Conseils pour votre candidature</p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Personnalisez votre lettre de motivation pour ce poste spécifique</li>
                      <li>• Mettez en avant vos réalisations concrètes</li>
                      <li>• Assurez-vous que votre CV est à jour</li>
                      <li>• Relisez votre candidature avant de l'envoyer</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowApplicationModal(false);
                    setCvFile(null);
                    setMotivationLetter('');
                  }}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                >
                  Annuler
                </button>
                <button
                  onClick={submitApplication}
                  disabled={!cvFile || !motivationLetter.trim()}
                  className="flex-1 px-4 py-3 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  <i className="ri-send-plane-line mr-2"></i>
                  Envoyer ma candidature
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Application Modal */}
      {showCancelModal && selectedCall && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-4">
                <i className="ri-alert-line text-3xl text-red-600"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
                Annuler la candidature ?
              </h2>
              <p className="text-sm text-gray-600 text-center mb-6">
                Êtes-vous sûr de vouloir annuler votre candidature pour <strong>{selectedCall.title}</strong> ? Cette action est irréversible.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                >
                  Non, garder
                </button>
                <button
                  onClick={confirmCancelApplication}
                  className="flex-1 px-4 py-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                >
                  Oui, annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails de la candidature */}
      {showApplicationModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Ma Candidature</h3>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Informations de l'offre */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={selectedApplication.offer.logo}
                    alt={selectedApplication.offer.company}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900">{selectedApplication.offer.title}</h4>
                    <p className="text-gray-600 mt-1">{selectedApplication.offer.company}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <i className="ri-map-pin-line"></i>
                        {selectedApplication.offer.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-briefcase-line"></i>
                        {selectedApplication.offer.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-money-euro-circle-line"></i>
                        {selectedApplication.offer.salary}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statut de la candidature */}
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-yellow-100 rounded-lg">
                    <i className="ri-time-line text-yellow-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Statut de la candidature</p>
                    <p className="text-sm text-gray-600">Candidature envoyée le {selectedApplication.appliedDate}</p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-medium text-sm">
                  En attente
                </span>
              </div>

              {/* Informations personnelles */}
              <div>
                <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-user-line text-blue-600"></i>
                  Informations personnelles
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-medium text-gray-900">{selectedApplication.email}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Téléphone</p>
                    <p className="font-medium text-gray-900">{selectedApplication.phone}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Expérience</p>
                    <p className="font-medium text-gray-900">{selectedApplication.experience}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Disponibilité</p>
                    <p className="font-medium text-gray-900">{selectedApplication.availability}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Salaire souhaité</p>
                    <p className="font-medium text-gray-900">{selectedApplication.expectedSalary}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Niveau de motivation</p>
                    <p className="font-medium text-gray-900">{selectedApplication.motivation}</p>
                  </div>
                </div>
              </div>

              {/* Compétences */}
              <div>
                <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-star-line text-blue-600"></i>
                  Compétences principales
                </h5>
                <div className="flex flex-wrap gap-2">
                  {selectedApplication.skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lettre de motivation */}
              <div>
                <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-file-text-line text-blue-600"></i>
                  Lettre de motivation
                </h5>
                <div className="p-6 bg-gray-50 rounded-xl">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {selectedApplication.coverLetter}
                  </p>
                </div>
              </div>

              {/* CV */}
              <div>
                <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-file-pdf-line text-blue-600"></i>
                  Curriculum Vitae
                </h5>
                <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-lg">
                      <i className="ri-file-pdf-line text-red-600 text-2xl"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{selectedApplication.cv}</p>
                      <p className="text-sm text-gray-600">Document PDF • 245 KB</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap">
                    <i className="ri-download-line mr-2"></i>
                    Télécharger
                  </button>
                </div>
              </div>

              {/* Références */}
              <div>
                <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-contacts-line text-blue-600"></i>
                  Références professionnelles
                </h5>
                <div className="space-y-3">
                  {selectedApplication.references.map((ref: any, index: number) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{ref.name}</p>
                          <p className="text-sm text-gray-600 mt-1">{ref.position} chez {ref.company}</p>
                          <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                            <i className="ri-phone-line"></i>
                            {ref.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowApplicationModal(false)}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
