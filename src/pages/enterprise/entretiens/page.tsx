import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Entretien {
  id: string;
  candidat_nom: string;
  candidat_email: string;
  candidat_telephone: string;
  offre_titre: string;
  date: string;
  heure_debut: string;
  heure_fin: string;
  mode: 'En ligne' | 'En physique';
  plateforme?: 'Meet' | 'Zoom' | 'WhatsApp';
  lien_visio?: string;
  adresse?: string;
  latitude?: number;
  longitude?: number;
  statut: 'Planifié' | 'Confirmé' | 'Terminé' | 'Annulé';
  commentaire?: string;
  resultat?: 'En attente' | 'Positif' | 'Négatif';
}

export default function EntretiensPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState<string>('Tous');
  const [filterDate, setFilterDate] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackChoice, setFeedbackChoice] = useState<'reject' | 'accept' | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedEntretien, setSelectedEntretien] = useState<Entretien | null>(null);

  // Données mockées des entretiens
  const [entretiens, setEntretiens] = useState<Entretien[]>([
    {
      id: '1',
      candidat_nom: 'Alexandre Bernard',
      candidat_email: 'alexandre.bernard@email.com',
      candidat_telephone: '+225 0745678901',
      offre_titre: 'Recrutement de commerciaux B2B pour l\'Afrique de l\'Ouest',
      date: '2024-02-05',
      heure_debut: '14:00',
      heure_fin: '15:30',
      mode: 'En ligne',
      plateforme: 'Meet',
      lien_visio: 'https://meet.google.com/abc-defg-hij',
      statut: 'Confirmé',
      commentaire: 'Candidat très motivé, excellentes références',
      resultat: 'En attente'
    },
    {
      id: '2',
      candidat_nom: 'Isabelle Rousseau',
      candidat_email: 'isabelle.rousseau@email.com',
      candidat_telephone: '+225 0778901234',
      offre_titre: 'Commercial Senior - Secteur Technologie',
      date: '2024-02-08',
      heure_debut: '10:00',
      heure_fin: '11:30',
      mode: 'En physique',
      adresse: 'Immeuble Alpha 2000, 5ème étage, Avenue Chardy, Plateau, Abidjan',
      latitude: 5.316667,
      longitude: -4.033333,
      statut: 'Planifié',
      commentaire: 'Profil très prometteur, excellentes références'
    },
    {
      id: '3',
      candidat_nom: 'Sophie Martin',
      candidat_email: 'sophie.martin@email.com',
      candidat_telephone: '+225 0712345678',
      offre_titre: 'Recrutement de commerciaux B2B pour l\'Afrique de l\'Ouest',
      date: '2024-02-10',
      heure_debut: '15:30',
      heure_fin: '17:00',
      mode: 'En ligne',
      plateforme: 'Zoom',
      lien_visio: 'https://zoom.us/j/123456789',
      statut: 'Planifié'
    },
    {
      id: '4',
      candidat_nom: 'Thomas Dubois',
      candidat_email: 'thomas.dubois@email.com',
      candidat_telephone: '+225 0723456789',
      offre_titre: 'Recrutement de commerciaux B2B pour l\'Afrique de l\'Ouest',
      date: '2024-01-28',
      heure_debut: '11:00',
      heure_fin: '12:00',
      mode: 'En physique',
      adresse: 'Zone 4, Rue des Jardins, Marcory, Abidjan',
      latitude: 5.283333,
      longitude: -3.983333,
      statut: 'Terminé',
      commentaire: 'Entretien très positif, compétences solides',
      resultat: 'Positif'
    },
    {
      id: '5',
      candidat_nom: 'Marie Lefebvre',
      candidat_email: 'marie.lefebvre@email.com',
      candidat_telephone: '+225 0734567890',
      offre_titre: 'Recrutement de commerciaux B2B pour l\'Afrique de l\'Ouest',
      date: '2024-01-25',
      heure_debut: '09:00',
      heure_fin: '10:00',
      mode: 'En ligne',
      plateforme: 'WhatsApp',
      lien_visio: 'https://wa.me/2250734567890',
      statut: 'Annulé',
      commentaire: 'Candidat a décliné l\'offre'
    },
    {
      id: '6',
      candidat_nom: 'Pierre Durand',
      candidat_email: 'pierre.durand@email.com',
      candidat_telephone: '+225 0767890123',
      offre_titre: 'Commercial Senior - Secteur Technologie',
      date: '2024-02-12',
      heure_debut: '16:00',
      heure_fin: '17:30',
      mode: 'En ligne',
      plateforme: 'Meet',
      lien_visio: 'https://meet.google.com/xyz-abcd-efg',
      statut: 'Planifié'
    }
  ]);

  // Statistiques
  const stats = {
    total: entretiens.length,
    planifies: entretiens.filter(e => e.statut === 'Planifié').length,
    confirmes: entretiens.filter(e => e.statut === 'Confirmé').length,
    termines: entretiens.filter(e => e.statut === 'Terminé').length,
    annules: entretiens.filter(e => e.statut === 'Annulé').length
  };

  // Filtrage des entretiens
  const filteredEntretiens = entretiens.filter(e => {
    const matchSearch = e.candidat_nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       e.candidat_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       e.offre_titre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatut = filterStatut === 'Tous' || e.statut === filterStatut;
    const matchDate = !filterDate || e.date === filterDate;
    return matchSearch && matchStatut && matchDate;
  });

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Planifié': return 'bg-blue-100 text-blue-700';
      case 'Confirmé': return 'bg-green-100 text-green-700';
      case 'Terminé': return 'bg-gray-100 text-gray-700';
      case 'Annulé': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getResultatColor = (resultat?: string) => {
    switch (resultat) {
      case 'Positif': return 'bg-green-100 text-green-700';
      case 'Négatif': return 'bg-red-100 text-red-700';
      case 'En attente': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getModeIcon = (mode: string) => {
    return mode === 'En ligne' ? 'ri-vidicon-line' : 'ri-map-pin-line';
  };

  const getPlatformeIcon = (plateforme?: string) => {
    switch (plateforme) {
      case 'Meet': return 'ri-google-line';
      case 'Zoom': return 'ri-vidicon-line';
      case 'WhatsApp': return 'ri-whatsapp-line';
      default: return 'ri-vidicon-line';
    }
  };

  const handleSaveEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (selectedEntretien) {
      setEntretiens(prev =>
        prev.map(ent => ent.id === selectedEntretien.id ? {
          ...ent,
          date: formData.get('date') as string,
          heure: formData.get('heure') as string,
          lieu: formData.get('lieu') as string,
          statut: formData.get('statut') as any,
          notes: formData.get('notes') as string,
          resultat: formData.get('resultat') as any
        } : ent)
      );
      setShowEditModal(false);
      setSelectedEntretien(null);
    }
  };

  const handleCancelEntretien = () => {
    if (selectedEntretien) {
      setEntretiens(prev =>
        prev.map(e => e.id === selectedEntretien.id ? { ...e, statut: 'Annulé' } : e)
      );
      setShowCancelModal(false);
      setSelectedEntretien(null);
    }
  };

  const handleFeedbackSubmit = () => {
    if (feedbackChoice === 'reject') {
      if (rejectReason.length < 150) {
        alert('Le motif du rejet doit contenir au minimum 150 caractères.');
        return;
      }
      // Traiter le rejet
      console.log('Candidature rejetée:', rejectReason);
      setShowFeedbackModal(false);
      setFeedbackChoice(null);
      setRejectReason('');
      setSelectedEntretien(null);
    } else if (feedbackChoice === 'accept') {
      // Rediriger vers la page d'élaboration du contrat
      console.log('Redirection vers élaboration du contrat');
      // TODO: Navigation vers la page du contrat
      setShowFeedbackModal(false);
      setFeedbackChoice(null);
      setSelectedEntretien(null);
    }
  };

  const handleContinueToContract = (entretien: any) => {
    // Naviguer vers la page de création de contrat avec les données préremplies
    navigate('/enterprise/contrats', {
      state: {
        fromInterview: true,
        commercialName: entretien.candidat_nom,
        enterpriseName: 'Mon Entreprise', // Nom par défaut de l'entreprise
        interviewId: entretien.id
      }
    });
    setShowFeedbackModal(false);
    setSelectedEntretien(null);
  };

  const FeedbackModal = ({ entretien, onClose }: { entretien: Entretien; onClose: () => void }) => {
    const navigate = useNavigate();

    const handleContinueProcess = () => {
      // Redirection vers la page d'élaboration du contrat
      navigate('/enterprise/contrats');
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Feedback de l'entretien</h3>
            <button
              onClick={() => {
                setShowFeedbackModal(false);
                setFeedbackChoice(null);
                setRejectReason('');
                setSelectedEntretien(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">
                  {entretien.candidat_nom.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">{entretien.candidat_nom}</h4>
                <p className="text-sm text-gray-600">{entretien.offre_titre}</p>
              </div>
            </div>
          </div>

          {!feedbackChoice ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-6">Comment s'est passé l'entretien avec ce candidat ?</p>
              
              <button
                onClick={() => setFeedbackChoice('reject')}
                className="w-full bg-red-50 border-2 border-red-200 rounded-xl p-6 hover:bg-red-100 hover:border-red-300 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <i className="ri-close-circle-line text-2xl text-white"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Rejeter la candidature</h4>
                    <p className="text-sm text-gray-600">Le candidat ne correspond pas aux attentes ou l'entretien ne s'est pas bien passé.</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setFeedbackChoice('accept')}
                className="w-full bg-green-50 border-2 border-green-200 rounded-xl p-6 hover:bg-green-100 hover:border-green-300 transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <i className="ri-checkbox-circle-line text-2xl text-white"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Continuer le processus</h4>
                    <p className="text-sm text-gray-600">L'entretien s'est bien passé et vous souhaitez élaborer un contrat avec ce candidat.</p>
                  </div>
                </div>
              </button>
            </div>
          ) : feedbackChoice === 'reject' ? (
            <div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <i className="ri-error-warning-line text-red-600 text-xl flex-shrink-0 mt-0.5"></i>
                  <div>
                    <h4 className="text-sm font-bold text-red-900 mb-1">Rejet de la candidature</h4>
                    <p className="text-xs text-red-700">Veuillez expliquer les raisons du rejet (minimum 150 caractères).</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motif du rejet <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={6}
                  maxLength={500}
                  placeholder="Expliquez pourquoi ce candidat ne correspond pas au poste (compétences manquantes, expérience insuffisante, etc.)..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className={`text-xs ${rejectReason.length < 150 ? 'text-red-600' : 'text-green-600'}`}>
                    {rejectReason.length} / 150 caractères minimum
                  </p>
                  <p className="text-xs text-gray-500">{rejectReason.length} / 500</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleFeedbackSubmit}
                  disabled={rejectReason.length < 150}
                  className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Confirmer le rejet
                </button>
                <button
                  onClick={() => {
                    setFeedbackChoice(null);
                    setRejectReason('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
                >
                  Retour
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-checkbox-circle-line text-3xl text-white"></i>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Excellent !</h4>
                <p className="text-sm text-gray-600">Vous allez être redirigé vers la page d'élaboration du contrat pour finaliser le recrutement de ce candidat.</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleContinueToContract(selectedEntretien)}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <i className="ri-file-text-line text-2xl group-hover:scale-110 transition-transform"></i>
                  <div className="text-left">
                    <div className="font-semibold">Continuer le processus</div>
                    <div className="text-sm text-emerald-50">Élaborer le contrat</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setFeedbackChoice(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
                >
                  Retour
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Entretiens</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Gérez vos entretiens avec les candidats</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:px-8 lg:py-8 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {[
            { label: 'Total', value: stats.total, icon: 'ri-calendar-line', color: 'bg-blue-500' },
            { label: 'Planifiés', value: stats.planifies, icon: 'ri-calendar-event-line', color: 'bg-yellow-500' },
            { label: 'Confirmés', value: stats.confirmes, icon: 'ri-calendar-check-line', color: 'bg-green-500' },
            { label: 'Terminés', value: stats.termines, icon: 'ri-checkbox-circle-line', color: 'bg-gray-500' },
            { label: 'Annulés', value: stats.annules, icon: 'ri-close-circle-line', color: 'bg-red-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <i className={`${stat.icon} text-lg sm:text-xl text-white`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nom, email, offre..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select
                value={filterStatut}
                onChange={(e) => setFilterStatut(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              >
                <option value="Tous">Tous les statuts</option>
                <option value="Planifié">Planifiés</option>
                <option value="Confirmé">Confirmés</option>
                <option value="Terminé">Terminés</option>
                <option value="Annulé">Annulés</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Liste des entretiens */}
        <div className="space-y-4">
          {filteredEntretiens.map((entretien) => (
            <div key={entretien.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Info entretien */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-calendar-line text-white text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{entretien.candidat_nom}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutColor(entretien.statut)}`}>
                          {entretien.statut}
                        </span>
                        {entretien.resultat && (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getResultatColor(entretien.resultat)}`}>
                            {entretien.resultat}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        <i className="ri-briefcase-line mr-1"></i>
                        {entretien.offre_titre}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="ri-calendar-line text-teal-500"></i>
                      <span>{entretien.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="ri-time-line text-teal-500"></i>
                      <span>{entretien.heure_debut} - {entretien.heure_fin}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className={`${getModeIcon(entretien.mode)} text-teal-500`}></i>
                      <span>{entretien.mode}</span>
                      {entretien.mode === 'En ligne' && entretien.plateforme && (
                        <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded text-xs font-medium">
                          {entretien.plateforme}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="ri-phone-line text-teal-500"></i>
                      <span>{entretien.candidat_telephone}</span>
                    </div>
                  </div>

                  {entretien.commentaire && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-xs text-yellow-700 font-medium mb-1">
                        <i className="ri-sticky-note-line mr-1"></i>
                        Commentaire
                      </p>
                      <p className="text-sm text-yellow-900">{entretien.commentaire}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 lg:w-48">
                  <button
                    onClick={() => {
                      setSelectedEntretien(entretien);
                      setShowDetailsModal(true);
                    }}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors text-sm whitespace-nowrap flex items-center justify-center gap-2"
                  >
                    <i className="ri-eye-line"></i>
                    <span>Voir détails</span>
                  </button>
                  
                  {(entretien.statut === 'Planifié' || entretien.statut === 'Confirmé') && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedEntretien(entretien);
                          setShowEditModal(true);
                        }}
                        className="w-full bg-teal-500 text-white px-4 py-2.5 rounded-lg hover:bg-teal-600 transition-colors text-sm whitespace-nowrap flex items-center justify-center gap-2"
                      >
                        <i className="ri-edit-line"></i>
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEntretien(entretien);
                          setShowCancelModal(true);
                        }}
                        className="w-full bg-red-500 text-white px-4 py-2.5 rounded-lg hover:bg-red-600 transition-colors text-sm whitespace-nowrap flex items-center justify-center gap-2"
                      >
                        <i className="ri-close-circle-line"></i>
                        <span>Annuler</span>
                      </button>
                    </>
                  )}

                  {entretien.statut === 'Terminé' && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedEntretien(entretien);
                          setShowEditModal(true);
                        }}
                        className="w-full bg-blue-500 text-white px-4 py-2.5 rounded-lg hover:bg-blue-600 transition-colors text-sm whitespace-nowrap flex items-center justify-center gap-2"
                      >
                        <i className="ri-edit-line"></i>
                        <span>Ajouter résultat</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEntretien(entretien);
                          setShowFeedbackModal(true);
                        }}
                        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2.5 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-colors text-sm whitespace-nowrap flex items-center justify-center gap-2"
                      >
                        <i className="ri-feedback-line"></i>
                        <span>Feedback</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredEntretiens.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <i className="ri-calendar-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun entretien</h3>
              <p className="text-gray-600">Aucun entretien ne correspond à vos critères de recherche.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Feedback */}
      {showFeedbackModal && selectedEntretien && (
        <FeedbackModal
          entretien={selectedEntretien}
          onClose={() => {
            setShowFeedbackModal(false);
            setFeedbackChoice(null);
            setRejectReason('');
            setSelectedEntretien(null);
          }}
        />
      )}

      {/* Modal Détails */}
      {showDetailsModal && selectedEntretien && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Détails de l'entretien</h3>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedEntretien(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">
                    {selectedEntretien.candidat_nom.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedEntretien.candidat_nom}</h4>
                  <p className="text-sm text-gray-600">{selectedEntretien.candidat_email}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Offre</p>
                  <p className="text-sm font-medium text-gray-900">{selectedEntretien.offre_titre}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-medium text-gray-900">{selectedEntretien.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Horaire</p>
                    <p className="text-sm font-medium text-gray-900">{selectedEntretien.heure_debut} - {selectedEntretien.heure_fin}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Mode d'entretien</p>
                  <div className="flex items-center gap-2">
                    <i className={`${getModeIcon(selectedEntretien.mode)} text-teal-500`}></i>
                    <p className="text-sm font-medium text-gray-900">{selectedEntretien.mode}</p>
                  </div>
                </div>
                
                {selectedEntretien.mode === 'En ligne' && (
                  <>
                    {selectedEntretien.plateforme && (
                      <div>
                        <p className="text-xs text-gray-500">Plateforme</p>
                        <div className="flex items-center gap-2">
                          <i className={`${getPlatformeIcon(selectedEntretien.plateforme)} text-teal-500`}></i>
                          <p className="text-sm font-medium text-gray-900">{selectedEntretien.plateforme}</p>
                        </div>
                      </div>
                    )}
                    {selectedEntretien.lien_visio && (
                      <div>
                        <p className="text-xs text-gray-500">Lien de visioconférence</p>
                        <a
                          href={selectedEntretien.lien_visio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-teal-600 hover:text-teal-700 break-all"
                        >
                          {selectedEntretien.lien_visio}
                        </a>
                      </div>
                    )}
                  </>
                )}

                {selectedEntretien.mode === 'En physique' && (
                  <>
                    {selectedEntretien.adresse && (
                      <div>
                        <p className="text-xs text-gray-500">Adresse</p>
                        <p className="text-sm font-medium text-gray-900">{selectedEntretien.adresse}</p>
                      </div>
                    )}
                    {selectedEntretien.latitude && selectedEntretien.longitude && (
                      <div>
                        <p className="text-xs text-gray-500 mb-2">Localisation</p>
                        <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                          <iframe
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${selectedEntretien.latitude},${selectedEntretien.longitude}&zoom=15`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div>
                  <p className="text-xs text-gray-500">Téléphone</p>
                  <p className="text-sm font-medium text-gray-900">{selectedEntretien.candidat_telephone}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Statut</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatutColor(selectedEntretien.statut)}`}>
                      {selectedEntretien.statut}
                    </span>
                  </div>
                  {selectedEntretien.resultat && (
                    <div>
                      <p className="text-xs text-gray-500">Résultat</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getResultatColor(selectedEntretien.resultat)}`}>
                        {selectedEntretien.resultat}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {selectedEntretien.commentaire && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-yellow-700 mb-2">
                    <i className="ri-sticky-note-line mr-1"></i>
                    Commentaire
                  </p>
                  <p className="text-sm text-yellow-900 whitespace-pre-wrap">{selectedEntretien.commentaire}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedEntretien(null);
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Modifier */}
      {showEditModal && selectedEntretien && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Modifier l'entretien</h3>
            <p className="text-sm text-gray-600 mb-6">Candidat : {selectedEntretien.candidat_nom}</p>
            <form onSubmit={handleSaveEdit}>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    required
                    defaultValue={selectedEntretien.date}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heure</label>
                  <input
                    type="time"
                    name="heure"
                    required
                    defaultValue={selectedEntretien.heure_debut}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
                  <input
                    type="text"
                    name="lieu"
                    required
                    defaultValue={selectedEntretien.mode === 'En ligne' ? 'En ligne' : selectedEntretien.adresse}
                    placeholder="Ex: Visioconférence, Bureau, etc."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select
                    name="statut"
                    defaultValue={selectedEntretien.statut}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="Planifié">Planifié</option>
                    <option value="Confirmé">Confirmé</option>
                    <option value="Terminé">Terminé</option>
                    <option value="Annulé">Annulé</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Résultat</label>
                  <select
                    name="resultat"
                    defaultValue={selectedEntretien.resultat || 'En attente'}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="En attente">En attente</option>
                    <option value="Positif">Positif</option>
                    <option value="Négatif">Négatif</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    name="notes"
                    rows={4}
                    defaultValue={selectedEntretien.commentaire}
                    placeholder="Ajoutez vos notes..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors whitespace-nowrap"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedEntretien(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Annulation */}
      {showCancelModal && selectedEntretien && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-close-circle-line text-3xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Annuler l'entretien</h3>
              <p className="text-sm text-gray-600">
                Êtes-vous sûr de vouloir annuler l'entretien avec <strong>{selectedEntretien.candidat_nom}</strong> prévu le {selectedEntretien.date} à {selectedEntretien.heure_debut} ?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCancelEntretien}
                className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap"
              >
                Confirmer l'annulation
              </button>
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setSelectedEntretien(null);
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
              >
                Retour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
