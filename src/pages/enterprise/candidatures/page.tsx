import { useState } from 'react';
import { type CandidatureCommercial } from '../../../types/entreprise';

export default function CandidaturesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState<string>('Tous');
  const [filterOffre, setFilterOffre] = useState<string>('Toutes');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEntretienModal, setShowEntretienModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedCandidat, setSelectedCandidat] = useState<CandidatureCommercial | null>(null);
  const [motifRejet, setMotifRejet] = useState('');

  // Nouveaux états pour le formulaire d'entretien
  const [entretienDate, setEntretienDate] = useState('');
  const [entretienHeureDebut, setEntretienHeureDebut] = useState('');
  const [entretienHeureFin, setEntretienHeureFin] = useState('');
  const [modeEntretien, setModeEntretien] = useState<'physique' | 'ligne' | ''>('');
  const [plateformeLigne, setPlateformeLigne] = useState<'meet' | 'zoom' | 'whatsapp' | ''>('');
  const [lienEntretien, setLienEntretien] = useState('');
  const [adressePhysique, setAdressePhysique] = useState('');
  const [positionGeo, setPositionGeo] = useState({ lat: 5.3599517, lng: -4.0082563 }); // Abidjan par défaut
  const [commentaireEntretien, setCommentaireEntretien] = useState('');

  // Données mockées des candidatures
  const [candidatures, setCandidatures] = useState<CandidatureCommercial[]>([
    {
      id: '1',
      offre_id: '1',
      offre_titre: 'Recrutement de commerciaux B2B pour l\'Afrique de l\'Ouest',
      nom_candidat: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      telephone: '0712345678',
      code_pays: '+225',
      competences_principales: ['Prospection', 'Négociation', 'CRM Salesforce', 'Vente B2B', 'Closing'],
      experience: '5 ans en prospection B2B',
      statut: 'En attente',
      date_candidature: '2024-01-15',
      lettre_motivation: 'Je suis très intéressée par ce poste de commercial. Avec 5 ans d\'expérience dans la vente B2B dans le secteur technologique, j\'ai développé des compétences solides en prospection, négociation et closing. J\'ai notamment réussi à augmenter le chiffre d\'affaires de mon entreprise actuelle de 40% en 2 ans.'
    },
    
  
    {
      id: '4',
      offre_id: '1',
      offre_titre: 'Recrutement de commerciaux B2B pour l\'Afrique de l\'Ouest',
      nom_candidat: 'Alexandre Bernard',
      email: 'alexandre.bernard@email.com',
      telephone: '0745678901',
      code_pays: '+225',
      competences_principales: ['Vente consultative', 'Account management', 'Négociation complexe', 'SaaS'],
      experience: '6 ans en tant que commercial senior',
      statut: 'Acceptée',
      date_candidature: '2024-01-18',
      entretien_planifie: {
        date: '2024-02-05',
        heure: '14:00',
        heure_fin: '15:30',
        lieu: 'Visioconférence'
      },
      notes: 'Excellent profil, entretien confirmé pour le 5 février'
    },
    
   
  ]);

  // Liste des offres pour le filtre
  const offres = Array.from(new Set(candidatures.map(c => c.offre_titre)));

  // Statistiques
  const stats = {
    total: candidatures.length,
    enAttente: candidatures.filter(c => c.statut === 'En attente').length,
    enEvaluation: candidatures.filter(c => c.statut === 'En cours d\'évaluation').length,
    acceptees: candidatures.filter(c => c.statut === 'Acceptée').length,
    rejetees: candidatures.filter(c => c.statut === 'Rejetée').length
  };

  // Filtrage des candidatures
  const filteredCandidatures = candidatures.filter(c => {
    const matchSearch = c.nom_candidat.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       c.competences_principales.some(comp => comp.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchStatut = filterStatut === 'Tous' || c.statut === filterStatut;
    const matchOffre = filterOffre === 'Toutes' || c.offre_titre === filterOffre;
    return matchSearch && matchStatut && matchOffre;
  });

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'En attente': return 'bg-blue-100 text-blue-700';
      case 'En cours d\'évaluation': return 'bg-yellow-100 text-yellow-700';
      case 'Acceptée': return 'bg-green-100 text-green-700';
      case 'Rejetée': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAccepter = (candidat: CandidatureCommercial) => {
    setSelectedCandidat(candidat);
    // Réinitialiser le formulaire
    setEntretienDate('');
    setEntretienHeureDebut('');
    setEntretienHeureFin('');
    setModeEntretien('');
    setPlateformeLigne('');
    setLienEntretien('');
    setAdressePhysique('');
    setCommentaireEntretien('');
    setShowEntretienModal(true);
  };

  const handleRejeter = (candidat: CandidatureCommercial) => {
    setSelectedCandidat(candidat);
    setMotifRejet('');
    setShowRejectModal(true);
  };

  const confirmRejet = () => {
    if (selectedCandidat && motifRejet.trim()) {
      setCandidatures(prev =>
        prev.map(c => c.id === selectedCandidat.id ? { 
          ...c, 
          statut: 'Rejetée',
          motif_rejet: motifRejet 
        } : c)
      );
      setShowRejectModal(false);
      setSelectedCandidat(null);
      setMotifRejet('');
    }
  };

  // Vérifier si un créneau horaire est déjà pris
  const isCreneauDisponible = (date: string, heureDebut: string, heureFin: string): boolean => {
    return !candidatures.some(c => 
      c.entretien_planifie && 
      c.entretien_planifie.date === date &&
      c.id !== selectedCandidat?.id &&
      (
        (heureDebut >= c.entretien_planifie.heure && heureDebut < (c.entretien_planifie.heure_fin || '23:59')) ||
        (heureFin > c.entretien_planifie.heure && heureFin <= (c.entretien_planifie.heure_fin || '23:59')) ||
        (heureDebut <= c.entretien_planifie.heure && heureFin >= (c.entretien_planifie.heure_fin || '23:59'))
      )
    );
  };

  const handleSaveEntretien = () => {
    if (!selectedCandidat) return;

    // Validation
    if (!entretienDate || !entretienHeureDebut || !entretienHeureFin || !modeEntretien) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (entretienHeureFin <= entretienHeureDebut) {
      alert('L\'heure de fin doit être après l\'heure de début');
      return;
    }

    // Vérifier la disponibilité du créneau
    if (!isCreneauDisponible(entretienDate, entretienHeureDebut, entretienHeureFin)) {
      alert('Ce créneau horaire est déjà réservé pour un autre entretien');
      return;
    }

    if (modeEntretien === 'ligne' && !lienEntretien.trim()) {
      alert('Veuillez fournir le lien de l\'entretien en ligne');
      return;
    }

    if (modeEntretien === 'physique' && !adressePhysique.trim()) {
      alert('Veuillez fournir l\'adresse du lieu de l\'entretien');
      return;
    }

    const lieuEntretien = modeEntretien === 'ligne' 
      ? `En ligne (${plateformeLigne}) - ${lienEntretien}`
      : `${adressePhysique}`;

    setCandidatures(prev =>
      prev.map(c => c.id === selectedCandidat.id ? {
        ...c,
        statut: 'Acceptée',
        entretien_planifie: { 
          date: entretienDate, 
          heure: entretienHeureDebut,
          heure_fin: entretienHeureFin,
          lieu: lieuEntretien,
          mode: modeEntretien,
          commentaire: commentaireEntretien,
          position_geo: modeEntretien === 'physique' ? positionGeo : undefined
        }
      } : c)
    );
    
    setShowEntretienModal(false);
    setSelectedCandidat(null);
  };

  // Fonction pour ouvrir la plateforme de visioconférence
  const ouvrirPlateforme = (plateforme: string) => {
    const urls: Record<string, string> = {
      meet: 'https://meet.google.com/',
      zoom: 'https://zoom.us/start/videomeeting',
      whatsapp: 'https://web.whatsapp.com/'
    };
    
    if (urls[plateforme]) {
      window.open(urls[plateforme], '_blank');
    }
  };

  // Fonction pour obtenir la position actuelle
  const obtenirPositionActuelle = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPositionGeo({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          alert('Impossible d\'obtenir votre position. Veuillez vérifier les autorisations.');
        }
      );
    } else {
      alert('La géolocalisation n\'est pas supportée par votre navigateur');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Candidatures</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Gérez les candidatures reçues pour vos offres</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:px-8 lg:py-8 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {[
            { label: 'Total', value: stats.total, icon: 'ri-user-line', color: 'bg-blue-500' },
            { label: 'En attente', value: stats.enAttente, icon: 'ri-time-line', color: 'bg-yellow-500' },
            { label: 'En évaluation', value: stats.enEvaluation, icon: 'ri-search-eye-line', color: 'bg-orange-500' },
            { label: 'Acceptées', value: stats.acceptees, icon: 'ri-checkbox-circle-line', color: 'bg-green-500' },
            { label: 'Rejetées', value: stats.rejetees, icon: 'ri-close-circle-line', color: 'bg-red-500' }
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
                  placeholder="Nom, email, compétences..."
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
                <option value="En attente">En attente</option>
                <option value="En cours d'évaluation">En évaluation</option>
                <option value="Acceptée">Acceptées</option>
                <option value="Rejetée">Rejetées</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Offre</label>
              <select
                value={filterOffre}
                onChange={(e) => setFilterOffre(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              >
                <option value="Toutes">Toutes les offres</option>
                {offres.map((offre, index) => (
                  <option key={index} value={offre}>{offre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Liste des candidatures */}
        <div className="space-y-4">
          {filteredCandidatures.map((candidat) => (
            <div key={candidat.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Info candidat */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {candidat.nom_candidat.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{candidat.nom_candidat}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutColor(candidat.statut)}`}>
                          {candidat.statut}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{candidat.experience}</p>
                      <p className="text-xs text-gray-500 mb-2">
                        <i className="ri-briefcase-line mr-1"></i>
                        {candidat.offre_titre}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-mail-line"></i>
                      <span className="truncate">{candidat.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-phone-line"></i>
                      <span>{candidat.code_pays} {candidat.telephone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-calendar-line"></i>
                      <span>Candidature: {candidat.date_candidature}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-2">Compétences :</p>
                    <div className="flex flex-wrap gap-2">
                      {candidat.competences_principales.map((comp, index) => (
                        <span key={index} className="px-2 py-1 bg-teal-50 text-teal-700 rounded-full text-xs">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {candidat.entretien_planifie && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                      <p className="text-xs text-green-700 font-medium mb-1">
                        <i className="ri-calendar-check-line mr-1"></i>
                        Entretien planifié
                      </p>
                      <p className="text-sm text-green-900">
                        {candidat.entretien_planifie.date} à {candidat.entretien_planifie.heure} - {candidat.entretien_planifie.lieu}
                      </p>
                    </div>
                  )}

                  {candidat.notes && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-xs text-yellow-700 font-medium mb-1">
                        <i className="ri-sticky-note-line mr-1"></i>
                        Notes
                      </p>
                      <p className="text-sm text-yellow-900">{candidat.notes}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 lg:w-48">
                  <button
                    onClick={() => {
                      setSelectedCandidat(candidat);
                      setShowDetailsModal(true);
                    }}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors text-sm whitespace-nowrap flex items-center justify-center gap-2"
                  >
                    <i className="ri-eye-line"></i>
                    <span>Voir détails</span>
                  </button>
                  
                  {candidat.statut === 'En attente' && (
                    <>
                      <button
                        onClick={() => handleAccepter(candidat)}
                        className="w-full bg-green-500 text-white px-4 py-2.5 rounded-lg hover:bg-green-600 transition-colors text-sm whitespace-nowrap flex items-center justify-center gap-2"
                      >
                        <i className="ri-checkbox-circle-line"></i>
                        <span>Accepter</span>
                      </button>
                      <button
                        onClick={() => handleRejeter(candidat)}
                        className="w-full bg-red-500 text-white px-4 py-2.5 rounded-lg hover:bg-red-600 transition-colors text-sm whitespace-nowrap flex items-center justify-center gap-2"
                      >
                        <i className="ri-close-circle-line"></i>
                        <span>Rejeter</span>
                      </button>
                    </>
                  )}

                  {candidat.statut === 'Acceptée' && (
                    <button
                      onClick={() => {
                        setSelectedCandidat(candidat);
                        // Pré-remplir les données si l'entretien existe déjà
                        if (candidat.entretien_planifie) {
                          setEntretienDate(candidat.entretien_planifie.date || '');
                          setEntretienHeureDebut(candidat.entretien_planifie.heure || '');
                          setEntretienHeureFin(candidat.entretien_planifie.heure_fin || '');
                          setModeEntretien(candidat.entretien_planifie.mode || '');
                          setCommentaireEntretien(candidat.entretien_planifie.commentaire || '');
                        }
                        setShowEntretienModal(true);
                      }}
                      className="w-full bg-blue-500 text-white px-4 py-2.5 rounded-lg hover:bg-blue-600 transition-colors text-sm whitespace-nowrap flex items-center justify-center gap-2"
                    >
                      <i className="ri-calendar-line"></i>
                      <span>Modifier entretien</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredCandidatures.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune candidature</h3>
              <p className="text-gray-600">Aucune candidature ne correspond à vos critères de recherche.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Détails */}
      {showDetailsModal && selectedCandidat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Détails de la candidature</h3>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedCandidat(null);
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
                    {selectedCandidat.nom_candidat.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedCandidat.nom_candidat}</h4>
                  <p className="text-sm text-gray-600">{selectedCandidat.experience}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{selectedCandidat.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Téléphone</p>
                  <p className="text-sm font-medium text-gray-900">{selectedCandidat.code_pays} {selectedCandidat.telephone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date de candidature</p>
                  <p className="text-sm font-medium text-gray-900">{selectedCandidat.date_candidature}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Offre</p>
                  <p className="text-sm font-medium text-gray-900">{selectedCandidat.offre_titre}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Compétences principales</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidat.competences_principales.map((comp, index) => (
                    <span key={index} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {selectedCandidat.lettre_motivation && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Lettre de motivation</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedCandidat.lettre_motivation}</p>
                  </div>
                </div>
              )}

              {selectedCandidat.entretien_planifie && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-700 mb-2">
                    <i className="ri-calendar-check-line mr-1"></i>
                    Entretien planifié
                  </p>
                  <p className="text-sm text-green-900">
                    <strong>Date :</strong> {selectedCandidat.entretien_planifie.date}<br />
                    <strong>Heure :</strong> {selectedCandidat.entretien_planifie.heure}<br />
                    <strong>Lieu :</strong> {selectedCandidat.entretien_planifie.lieu}
                  </p>
                </div>
              )}

              {selectedCandidat.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-yellow-700 mb-2">
                    <i className="ri-sticky-note-line mr-1"></i>
                    Notes
                  </p>
                  <p className="text-sm text-yellow-900">{selectedCandidat.notes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedCandidat(null);
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Planifier Entretien */}
      {showEntretienModal && selectedCandidat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Planifier un entretien</h3>
            <p className="text-sm text-gray-600 mb-6">Candidat : <strong>{selectedCandidat.nom_candidat}</strong></p>
            
            <div className="space-y-5">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de l'entretien <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={entretienDate}
                  onChange={(e) => setEntretienDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Heure de début et de fin */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heure de début <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={entretienHeureDebut}
                    onChange={(e) => setEntretienHeureDebut(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heure de fin <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={entretienHeureFin}
                    onChange={(e) => setEntretienHeureFin(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Mode d'entretien */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mode d'entretien <span className="text-red-500">*</span>
                </label>
                <select
                  value={modeEntretien}
                  onChange={(e) => {
                    setModeEntretien(e.target.value as 'physique' | 'ligne');
                    setPlateformeLigne('');
                    setLienEntretien('');
                    setAdressePhysique('');
                  }}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Sélectionnez un mode</option>
                  <option value="physique">En physique</option>
                  <option value="ligne">En ligne</option>
                </select>
              </div>

              {/* Si mode en ligne */}
              {modeEntretien === 'ligne' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plateforme <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={plateformeLigne}
                      onChange={(e) => {
                        const plateforme = e.target.value as 'meet' | 'zoom' | 'whatsapp';
                        setPlateformeLigne(plateforme);
                        if (plateforme) {
                          ouvrirPlateforme(plateforme);
                        }
                      }}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Sélectionnez une plateforme</option>
                      <option value="meet">Google Meet</option>
                      <option value="zoom">Zoom</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                    {plateformeLigne && (
                      <p className="text-xs text-blue-600 mt-2">
                        <i className="ri-information-line mr-1"></i>
                        La plateforme s'est ouverte dans un nouvel onglet. Créez votre lien et collez-le ci-dessous.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lien de l'entretien <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      value={lienEntretien}
                      onChange={(e) => setLienEntretien(e.target.value)}
                      placeholder="Collez le lien de la réunion ici"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}

              {/* Si mode physique */}
              {modeEntretien === 'physique' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse du lieu <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={adressePhysique}
                      onChange={(e) => setAdressePhysique(e.target.value)}
                      placeholder="Ex: 123 Avenue de la République, Abidjan"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position géographique
                    </label>
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={obtenirPositionActuelle}
                        className="w-full px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                      >
                        <i className="ri-map-pin-user-line"></i>
                        Partager ma position actuelle
                      </button>
                      
                      {/* Google Maps Embed */}
                      <div className="border border-gray-300 rounded-lg overflow-hidden">
                        <iframe
                          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${positionGeo.lat},${positionGeo.lng}&zoom=15`}
                          width="100%"
                          height="250"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Latitude</label>
                          <input
                            type="number"
                            step="any"
                            value={positionGeo.lat}
                            onChange={(e) => setPositionGeo({ ...positionGeo, lat: parseFloat(e.target.value) })}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Longitude</label>
                          <input
                            type="number"
                            step="any"
                            value={positionGeo.lng}
                            onChange={(e) => setPositionGeo({ ...positionGeo, lng: parseFloat(e.target.value) })}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Commentaire */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commentaire sur l'entretien
                </label>
                <textarea
                  value={commentaireEntretien}
                  onChange={(e) => setCommentaireEntretien(e.target.value)}
                  rows={3}
                  placeholder="Ajoutez des notes ou instructions pour l'entretien..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleSaveEntretien}
                className="flex-1 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors whitespace-nowrap font-medium"
              >
                <i className="ri-calendar-check-line mr-2"></i>
                Confirmer l'entretien
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowEntretienModal(false);
                  setSelectedCandidat(null);
                }}
                className="flex-1 bg-red-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap font-medium"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Rejet */}
      {showRejectModal && selectedCandidat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-close-circle-line text-3xl text-red-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rejeter la candidature</h3>
              <p className="text-sm text-gray-600 mb-4">
                Candidat : <strong>{selectedCandidat.nom_candidat}</strong>
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motif du rejet <span className="text-red-500">*</span>
              </label>
              <textarea
                value={motifRejet}
                onChange={(e) => setMotifRejet(e.target.value)}
                placeholder="Veuillez préciser la raison du rejet de cette candidature..."
                rows={4}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
              />
              {motifRejet.trim() === '' && (
                <p className="text-xs text-gray-500 mt-1">Ce champ est obligatoire</p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={confirmRejet}
                disabled={!motifRejet.trim()}
                className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Confirmer le rejet
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setSelectedCandidat(null);
                  setMotifRejet('');
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
