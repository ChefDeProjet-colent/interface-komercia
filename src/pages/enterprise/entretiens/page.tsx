import { useState } from 'react';

interface Entretien {
  id: string;
  candidat_nom: string;
  candidat_email: string;
  candidat_telephone: string;
  offre_titre: string;
  date: string;
  heure: string;
  lieu: string;
  statut: 'Planifié' | 'Confirmé' | 'Terminé' | 'Annulé';
  notes?: string;
  resultat?: 'En attente' | 'Positif' | 'Négatif';
}

export default function EntretiensPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState<string>('Tous');
  const [filterDate, setFilterDate] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
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
      heure: '14:00',
      lieu: 'Visioconférence',
      statut: 'Confirmé',
      notes: 'Candidat très motivé, excellentes références',
      resultat: 'En attente'
    },
    {
      id: '2',
      candidat_nom: 'Isabelle Rousseau',
      candidat_email: 'isabelle.rousseau@email.com',
      candidat_telephone: '+225 0778901234',
      offre_titre: 'Commercial Senior - Secteur Technologie',
      date: '2024-02-08',
      heure: '10:00',
      lieu: 'Bureau - Abidjan',
      statut: 'Planifié',
      notes: 'Profil très prometteur, excellentes références'
    },
    {
      id: '3',
      candidat_nom: 'Sophie Martin',
      candidat_email: 'sophie.martin@email.com',
      candidat_telephone: '+225 0712345678',
      offre_titre: 'Recrutement de commerciaux B2B pour l\'Afrique de l\'Ouest',
      date: '2024-02-10',
      heure: '15:30',
      lieu: 'Visioconférence',
      statut: 'Planifié'
    },
    {
      id: '4',
      candidat_nom: 'Thomas Dubois',
      candidat_email: 'thomas.dubois@email.com',
      candidat_telephone: '+225 0723456789',
      offre_titre: 'Recrutement de commerciaux B2B pour l\'Afrique de l\'Ouest',
      date: '2024-01-28',
      heure: '11:00',
      lieu: 'Bureau - Abidjan',
      statut: 'Terminé',
      notes: 'Entretien très positif, compétences solides',
      resultat: 'Positif'
    },
    {
      id: '5',
      candidat_nom: 'Marie Lefebvre',
      candidat_email: 'marie.lefebvre@email.com',
      candidat_telephone: '+225 0734567890',
      offre_titre: 'Recrutement de commerciaux B2B pour l\'Afrique de l\'Ouest',
      date: '2024-01-25',
      heure: '09:00',
      lieu: 'Visioconférence',
      statut: 'Annulé',
      notes: 'Candidat a décliné l\'offre'
    },
    {
      id: '6',
      candidat_nom: 'Pierre Durand',
      candidat_email: 'pierre.durand@email.com',
      candidat_telephone: '+225 0767890123',
      offre_titre: 'Commercial Senior - Secteur Technologie',
      date: '2024-02-12',
      heure: '16:00',
      lieu: 'Visioconférence',
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
                      <span>{entretien.heure}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="ri-map-pin-line text-teal-500"></i>
                      <span>{entretien.lieu}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="ri-phone-line text-teal-500"></i>
                      <span>{entretien.candidat_telephone}</span>
                    </div>
                  </div>

                  {entretien.notes && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-xs text-yellow-700 font-medium mb-1">
                        <i className="ri-sticky-note-line mr-1"></i>
                        Notes
                      </p>
                      <p className="text-sm text-yellow-900">{entretien.notes}</p>
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
                    <p className="text-xs text-gray-500">Heure</p>
                    <p className="text-sm font-medium text-gray-900">{selectedEntretien.heure}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Lieu</p>
                  <p className="text-sm font-medium text-gray-900">{selectedEntretien.lieu}</p>
                </div>
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

              {selectedEntretien.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-yellow-700 mb-2">
                    <i className="ri-sticky-note-line mr-1"></i>
                    Notes
                  </p>
                  <p className="text-sm text-yellow-900 whitespace-pre-wrap">{selectedEntretien.notes}</p>
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
                    defaultValue={selectedEntretien.heure}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
                  <input
                    type="text"
                    name="lieu"
                    required
                    defaultValue={selectedEntretien.lieu}
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
                    defaultValue={selectedEntretien.notes}
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
                Êtes-vous sûr de vouloir annuler l'entretien avec <strong>{selectedEntretien.candidat_nom}</strong> prévu le {selectedEntretien.date} à {selectedEntretien.heure} ?
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
