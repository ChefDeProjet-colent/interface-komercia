import { useState } from 'react';
import Sidebar from '../../../components/feature/Sidebar';

interface Entretien {
  id: string;
  entreprise_nom: string;
  entreprise_logo?: string;
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
  recruteur_nom: string;
  recruteur_fonction: string;
  recruteur_email: string;
  recruteur_telephone: string;
  statut: 'Planifié' | 'Confirmé' | 'Terminé' | 'Annulé';
  commentaire?: string;
}

export default function CommercialEntretiensPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState<string>('Tous');
  const [filterMode, setFilterMode] = useState<string>('Tous');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEntretien, setSelectedEntretien] = useState<Entretien | null>(null);

  // Données mockées des entretiens
  const entretiens: Entretien[] = [
    {
      id: '1',
      entreprise_nom: 'TechCorp Solutions',
      offre_titre: 'Recrutement de commerciaux B2B pour l\'Afrique de l\'Ouest',
      date: '2024-02-05',
      heure_debut: '14:00',
      heure_fin: '15:30',
      mode: 'En ligne',
      plateforme: 'Meet',
      lien_visio: 'https://meet.google.com/abc-defg-hij',
      recruteur_nom: 'Marie Kouassi',
      recruteur_fonction: 'Directrice RH',
      recruteur_email: 'marie.kouassi@techcorp.com',
      recruteur_telephone: '+225 0712345678',
      statut: 'Confirmé',
      commentaire: 'Préparer présentation des résultats commerciaux des 3 dernières années. Entretien avec la direction RH et le directeur commercial.'
    },
    {
      id: '2',
      entreprise_nom: 'Digital Innovations',
      offre_titre: 'Commercial Senior - Secteur Technologie',
      date: '2024-02-08',
      heure_debut: '10:00',
      heure_fin: '11:30',
      mode: 'En physique',
      adresse: 'Immeuble Alpha 2000, 5ème étage, Avenue Chardy, Plateau, Abidjan',
      latitude: 5.316667,
      longitude: -4.033333,
      recruteur_nom: 'Jean-Baptiste Traoré',
      recruteur_fonction: 'Responsable Recrutement',
      recruteur_email: 'jb.traore@digitalinnovations.ci',
      recruteur_telephone: '+225 0723456789',
      statut: 'Planifié',
      commentaire: 'Apporter CV papier et références professionnelles. Prévoir 1h30 pour l\'entretien.'
    },
    {
      id: '3',
      entreprise_nom: 'AfriTech Group',
      offre_titre: 'Responsable Développement Commercial',
      date: '2024-02-10',
      heure_debut: '15:30',
      heure_fin: '17:00',
      mode: 'En ligne',
      plateforme: 'Zoom',
      lien_visio: 'https://zoom.us/j/123456789',
      recruteur_nom: 'Aminata Diallo',
      recruteur_fonction: 'CEO',
      recruteur_email: 'a.diallo@afritech.com',
      recruteur_telephone: '+225 0734567890',
      statut: 'Planifié'
    },
    {
      id: '4',
      entreprise_nom: 'West Africa Trading',
      offre_titre: 'Commercial Export - Zone CEDEAO',
      date: '2024-01-28',
      heure_debut: '11:00',
      heure_fin: '12:00',
      mode: 'En physique',
      adresse: 'Zone 4, Rue des Jardins, Marcory, Abidjan',
      latitude: 5.283333,
      longitude: -3.983333,
      recruteur_nom: 'Kofi Mensah',
      recruteur_fonction: 'Directeur Commercial',
      recruteur_email: 'k.mensah@watrading.com',
      recruteur_telephone: '+225 0745678901',
      statut: 'Terminé',
      commentaire: 'Entretien très positif. Attente de retour sous 48h.'
    },
    {
      id: '5',
      entreprise_nom: 'Startup Hub CI',
      offre_titre: 'Business Developer',
      date: '2024-01-25',
      heure_debut: '09:00',
      heure_fin: '10:00',
      mode: 'En ligne',
      plateforme: 'WhatsApp',
      lien_visio: 'https://wa.me/2250756789012',
      recruteur_nom: 'Sophie Laurent',
      recruteur_fonction: 'Co-fondatrice',
      recruteur_email: 's.laurent@startuphub.ci',
      recruteur_telephone: '+225 0756789012',
      statut: 'Annulé',
      commentaire: 'Reporté à une date ultérieure suite à un imprévu.'
    },
    {
      id: '6',
      entreprise_nom: 'Global Services SARL',
      offre_titre: 'Chef des Ventes - Côte d\'Ivoire',
      date: '2024-02-12',
      heure_debut: '16:00',
      heure_fin: '17:30',
      mode: 'En ligne',
      plateforme: 'Meet',
      lien_visio: 'https://meet.google.com/xyz-abcd-efg',
      recruteur_nom: 'Ibrahim Sanogo',
      recruteur_fonction: 'DRH',
      recruteur_email: 'i.sanogo@globalservices.ci',
      recruteur_telephone: '+225 0767890123',
      statut: 'Planifié',
      commentaire: 'Entretien technique avec test de mise en situation commerciale.'
    }
  ];

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
    const matchSearch = e.entreprise_nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       e.offre_titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       e.recruteur_nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatut = filterStatut === 'Tous' || e.statut === filterStatut;
    const matchMode = filterMode === 'Tous' || e.mode === filterMode;
    return matchSearch && matchStatut && matchMode;
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

  const resetFilters = () => {
    setSearchTerm('');
    setFilterStatut('Tous');
    setFilterMode('Tous');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="commercial" />
      
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Mes Entretiens</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Consultez et gérez vos entretiens programmés</p>
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
                    placeholder="Entreprise, poste, recruteur..."
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                <select
                  value={filterMode}
                  onChange={(e) => setFilterMode(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                >
                  <option value="Tous">Tous les modes</option>
                  <option value="En ligne">En ligne</option>
                  <option value="En physique">En physique</option>
                </select>
              </div>
            </div>
            {(searchTerm || filterStatut !== 'Tous' || filterMode !== 'Tous') && (
              <div className="mt-4">
                <button
                  onClick={resetFilters}
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2"
                >
                  <i className="ri-refresh-line"></i>
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>

          {/* Liste des entretiens */}
          <div className="space-y-4">
            {filteredEntretiens.map((entretien) => (
              <div key={entretien.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Info entretien */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="ri-building-line text-white text-xl"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{entretien.entreprise_nom}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutColor(entretien.statut)}`}>
                            {entretien.statut}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          <i className="ri-briefcase-line mr-1"></i>
                          {entretien.offre_titre}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="ri-calendar-line text-teal-500"></i>
                        <span>{new Date(entretien.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
                        <i className="ri-user-line text-teal-500"></i>
                        <span>{entretien.recruteur_nom} - {entretien.recruteur_fonction}</span>
                      </div>
                    </div>

                    {entretien.commentaire && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs text-blue-700 font-medium mb-1">
                          <i className="ri-information-line mr-1"></i>
                          Informations importantes
                        </p>
                        <p className="text-sm text-blue-900">{entretien.commentaire}</p>
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
                    
                    {entretien.mode === 'En ligne' && entretien.lien_visio && (entretien.statut === 'Planifié' || entretien.statut === 'Confirmé') && (
                      <a
                        href={entretien.lien_visio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-teal-500 text-white px-4 py-2.5 rounded-lg hover:bg-teal-600 transition-colors text-sm whitespace-nowrap flex items-center justify-center gap-2"
                      >
                        <i className={getPlatformeIcon(entretien.plateforme)}></i>
                        <span>Rejoindre</span>
                      </a>
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
      </div>

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
              {/* Entreprise */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-building-line text-white text-2xl"></i>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedEntretien.entreprise_nom}</h4>
                  <p className="text-sm text-gray-600">{selectedEntretien.offre_titre}</p>
                </div>
              </div>

              {/* Informations de l'entretien */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h5 className="font-semibold text-gray-900 mb-3">Informations de l'entretien</h5>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(selectedEntretien.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Horaire</p>
                    <p className="text-sm font-medium text-gray-900">{selectedEntretien.heure_debut} - {selectedEntretien.heure_fin}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Mode d'entretien</p>
                  <div className="flex items-center gap-2">
                    <i className={`${getModeIcon(selectedEntretien.mode)} text-teal-500`}></i>
                    <p className="text-sm font-medium text-gray-900">{selectedEntretien.mode}</p>
                  </div>
                </div>

                {selectedEntretien.mode === 'En ligne' && (
                  <>
                    {selectedEntretien.plateforme && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Plateforme</p>
                        <div className="flex items-center gap-2">
                          <i className={`${getPlatformeIcon(selectedEntretien.plateforme)} text-teal-500`}></i>
                          <p className="text-sm font-medium text-gray-900">{selectedEntretien.plateforme}</p>
                        </div>
                      </div>
                    )}
                    {selectedEntretien.lien_visio && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Lien de visioconférence</p>
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
                        <p className="text-xs text-gray-500 mb-1">Adresse</p>
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
                  <p className="text-xs text-gray-500 mb-1">Statut</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatutColor(selectedEntretien.statut)}`}>
                    {selectedEntretien.statut}
                  </span>
                </div>
              </div>

              {/* Informations du recruteur */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h5 className="font-semibold text-gray-900 mb-3">Contact recruteur</h5>
                
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nom</p>
                  <p className="text-sm font-medium text-gray-900">{selectedEntretien.recruteur_nom}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Fonction</p>
                  <p className="text-sm font-medium text-gray-900">{selectedEntretien.recruteur_fonction}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <a href={`mailto:${selectedEntretien.recruteur_email}`} className="text-sm font-medium text-teal-600 hover:text-teal-700">
                    {selectedEntretien.recruteur_email}
                  </a>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Téléphone</p>
                  <a href={`tel:${selectedEntretien.recruteur_telephone}`} className="text-sm font-medium text-teal-600 hover:text-teal-700">
                    {selectedEntretien.recruteur_telephone}
                  </a>
                </div>
              </div>

              {/* Commentaire */}
              {selectedEntretien.commentaire && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-700 mb-2">
                    <i className="ri-information-line mr-1"></i>
                    Commentaire
                  </p>
                  <p className="text-sm text-blue-900 whitespace-pre-wrap">{selectedEntretien.commentaire}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              {selectedEntretien.mode === 'En ligne' && selectedEntretien.lien_visio && (selectedEntretien.statut === 'Planifié' || selectedEntretien.statut === 'Confirmé') && (
                <a
                  href={selectedEntretien.lien_visio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors whitespace-nowrap text-center flex items-center justify-center gap-2"
                >
                  <i className={getPlatformeIcon(selectedEntretien.plateforme)}></i>
                  Rejoindre la visioconférence
                </a>
              )}
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
    </div>
  );
}
