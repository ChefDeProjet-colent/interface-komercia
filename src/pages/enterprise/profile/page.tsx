import { useState, useEffect } from 'react';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';
import Sidebar from '../../../components/feature/Sidebar';
import { Entreprise, ContactPrincipal, AutreContact, SecteurActivite, SECTEURS_ACTIVITE, TAILLES_ENTREPRISE, PAYS_AFRIQUE, VILLES_PAR_PAYS, PaysInfo } from '../../../types/entreprise';

export default function EntrepriseProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showAddZoneModal, setShowAddZoneModal] = useState(false);
  const [showAddSecteurModal, setShowAddSecteurModal] = useState(false);
  const [newContact, setNewContact] = useState({ nom: '', poste: '', email: '', telephone: '', code_pays: '+225' });
  const [newZone, setNewZone] = useState('');
  const [newSecteur, setNewSecteur] = useState({ libelle: '', description: '' });
  const [rccmFile, setRccmFile] = useState<File | null>(null);
  const [nifFile, setNifFile] = useState<File | null>(null);

  const [companyData, setCompanyData] = useState<Entreprise>({
    // Informations générales
    nom: 'ABC Corp',
    logo: 'https://readdy.ai/api/search-image?query=Modern%20professional%20corporate%20logo%20design%2C%20minimalist%20business%20branding%2C%20clean%20geometric%20shapes%2C%20professional%20identity&width=200&height=200&seq=logo1&orientation=squarish',
    rccm: undefined,
    nif: 'CI-2024-123456',
    nif_document: undefined,
    secteur_activite: 'Technologie',
    taille: "Moyenne (51-250)",
    
    // Localisation avec listes déroulantes
    pays: 'Côte d\'Ivoire',
    ville: 'Abidjan',
    localisation_principale: 'Abidjan, Côte d\'Ivoire',
    zones_operation: ['Afrique de l\'Ouest', 'Europe'],
    
    // Contact téléphonique de l'entreprise
    telephone_entreprise: '07 123 4567',
    code_pays_entreprise: '+225',
    
    // Contacts principaux
    contact_principal: {
      nom: 'Jean Dupont',
      poste: 'Responsable des ventes',
      email: 'jean.dupont@abccorp.com',
      telephone: '07 123 4567',
      code_pays: '+225'
    },
    autres_contacts: [
      {
        nom: 'Marie Kouadio',
        poste: 'Responsable RH',
        email: 'marie.kouadio@abccorp.com',
        telephone: '05 987 6543',
        code_pays: '+225'
      }
    ],
    
    // Produits et services
    produits_services_principaux: ['CRM Premium', 'Formation en prospection'],
    description_produits_services: 'Solution CRM pour les PME, optimisée pour la gestion des leads',
    prix_indicatifs: 'À partir de 500 $/mois',
    
    // Secteurs d'activité personnalisés
    secteurs_activite_personnalises: []
  });

  // Calculer le pourcentage de complétion du profil
  const calculateProfileCompletion = (): number => {
    let totalFields = 0;
    let filledFields = 0;

    // Champs obligatoires
    const requiredFields = [
      companyData.nom,
      companyData.secteur_activite,
      companyData.taille,
      companyData.pays,
      companyData.ville,
      companyData.localisation_principale,
      companyData.contact_principal.nom,
      companyData.contact_principal.poste,
      companyData.contact_principal.email,
      companyData.contact_principal.telephone,
      companyData.produits_services_principaux.length > 0
    ];

    totalFields += requiredFields.length;
    filledFields += requiredFields.filter(field => field).length;

    // Champs optionnels
    const optionalFields = [
      companyData.logo,
      companyData.rccm,
      companyData.nif,
      companyData.nif_document,
      companyData.telephone_entreprise,
      companyData.zones_operation && companyData.zones_operation.length > 0,
      companyData.autres_contacts && companyData.autres_contacts.length > 0,
      companyData.description_produits_services,
      companyData.prix_indicatifs,
      companyData.secteurs_activite_personnalises && companyData.secteurs_activite_personnalises.length > 0
    ];

    totalFields += optionalFields.length;
    filledFields += optionalFields.filter(field => field).length;

    return Math.round((filledFields / totalFields) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  // Obtenir les villes disponibles selon le pays sélectionné
  const villesDisponibles = companyData.pays ? VILLES_PAR_PAYS[companyData.pays] || [] : [];

  // Obtenir les informations du pays sélectionné
  const getPaysInfo = (nomPays: string): PaysInfo | undefined => {
    return PAYS_AFRIQUE.find(p => p.nom === nomPays);
  };

  // Gérer le changement de pays
  const handlePaysChange = (nouveauPays: string) => {
    const paysInfo = getPaysInfo(nouveauPays);
    setCompanyData({
      ...companyData,
      pays: nouveauPays,
      ville: '', // Réinitialiser la ville
      code_pays_entreprise: paysInfo?.indicatif || '+225',
      contact_principal: {
        ...companyData.contact_principal,
        code_pays: paysInfo?.indicatif || '+225'
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="entreprise" />
      
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profil de l'entreprise</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Gérez les informations de votre entreprise</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base ${
                  isEditing
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-teal-500 text-white hover:bg-teal-600'
                }`}
              >
                <i className={`${isEditing ? 'ri-save-line' : 'ri-edit-line'} text-lg`}></i>
                <span>{isEditing ? 'Enregistrer' : 'Modifier le profil'}</span>
              </button>
            </div>

            {/* Barre de progression */}
            <div className="mt-4 sm:mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Complétion du profil</span>
                <span className={`text-sm font-bold ${
                  profileCompletion === 100 ? 'text-green-600' : 
                  profileCompletion >= 70 ? 'text-teal-600' : 
                  profileCompletion >= 40 ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {profileCompletion}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    profileCompletion === 100 ? 'bg-green-500' : 
                    profileCompletion >= 70 ? 'bg-teal-500' : 
                    profileCompletion >= 40 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${profileCompletion}%` }}
                ></div>
              </div>
              {profileCompletion < 100 && (
                <p className="text-xs text-gray-500 mt-2">
                  <i className="ri-information-line mr-1"></i>
                  Complétez votre profil pour améliorer votre visibilité
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <div className="space-y-6 sm:space-y-8">
            {/* Company Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-32 sm:h-40 bg-gradient-to-r from-teal-500 to-teal-600"></div>
              <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6 -mt-12 sm:-mt-16">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-xl shadow-lg border-4 border-white flex items-center justify-center overflow-hidden">
                      {companyData.logo ? (
                        <img src={companyData.logo} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <i className="ri-building-line text-4xl sm:text-5xl text-gray-400"></i>
                      )}
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-teal-500 text-white rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors shadow-lg">
                        <i className="ri-camera-line text-base sm:text-lg"></i>
                      </button>
                    )}
                  </div>
                  <div className="flex-1 w-full sm:w-auto">
                    {isEditing ? (
                      <input
                        type="text"
                        value={companyData.nom}
                        onChange={(e) => setCompanyData({ ...companyData, nom: e.target.value })}
                        className="text-2xl sm:text-3xl font-bold text-gray-900 border-b-2 border-teal-500 focus:outline-none w-full"
                      />
                    ) : (
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{companyData.nom}</h2>
                    )}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-sm sm:text-base text-gray-600">
                      <span className="flex items-center gap-1">
                        <span className="text-lg">{getPaysInfo(companyData.pays)?.flag}</span>
                        <i className="ri-map-pin-line"></i>
                        {companyData.ville}, {companyData.pays}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-building-line"></i>
                        {companyData.secteur_activite}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-team-line"></i>
                        {companyData.taille}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 1: Informations générales */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <i className="ri-information-line text-teal-500"></i>
                Informations générales
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Nom de l'entreprise (obligatoire) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'entreprise <span className="text-red-500">*</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={companyData.nom}
                      onChange={(e) => setCompanyData({ ...companyData, nom: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Ex: ABC Corp"
                      required
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 py-2 sm:py-3">{companyData.nom}</p>
                  )}
                </div>

                {/* NIF (Numéro d'Identification Fiscale) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIF (Numéro d'Identification Fiscale)
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={companyData.nif || ''}
                      onChange={(e) => setCompanyData({ ...companyData, nif: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Ex: CI-2024-123456"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 py-2 sm:py-3">{companyData.nif || 'Non renseigné'}</p>
                  )}
                </div>

                {/* RCCM (Document) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    RCCM (Document)
                  </label>
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setRccmFile(file);
                            setCompanyData({ ...companyData, rccm: file });
                          }
                        }}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      />
                      <p className="text-xs text-gray-500">Formats: PDF, JPG, PNG (Max 5MB)</p>
                      {rccmFile && (
                        <div className="flex items-center gap-2 text-sm text-teal-600">
                          <i className="ri-file-line"></i>
                          <span>{rccmFile.name}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-2">
                      {companyData.rccm ? (
                        <div className="flex items-center gap-2 text-sm text-teal-600">
                          <i className="ri-file-check-line"></i>
                          <span>Document RCCM téléchargé</span>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">Aucun document</p>
                      )}
                    </div>
                  )}
                </div>

                {/* NIF (Document) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIF (Document)
                  </label>
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setNifFile(file);
                            setCompanyData({ ...companyData, nif_document: file });
                          }
                        }}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      />
                      <p className="text-xs text-gray-500">Formats: PDF, JPG, PNG (Max 5MB)</p>
                      {nifFile && (
                        <div className="flex items-center gap-2 text-sm text-teal-600">
                          <i className="ri-file-line"></i>
                          <span>{nifFile.name}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-2">
                      {companyData.nif_document ? (
                        <div className="flex items-center gap-2 text-sm text-teal-600">
                          <i className="ri-file-check-line"></i>
                          <span>Document NIF téléchargé</span>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">Aucun document</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Secteur d'activité (obligatoire) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secteur d'activité <span className="text-red-500">*</span>
                  </label>
                  {isEditing ? (
                    <select
                      value={companyData.secteur_activite}
                      onChange={(e) => setCompanyData({ ...companyData, secteur_activite: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      required
                    >
                      {SECTEURS_ACTIVITE.map(secteur => (
                        <option key={secteur} value={secteur}>{secteur}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 py-2 sm:py-3">{companyData.secteur_activite}</p>
                  )}
                </div>

                {/* Taille de l'entreprise (obligatoire) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taille de l'entreprise <span className="text-red-500">*</span>
                  </label>
                  {isEditing ? (
                    <select
                      value={companyData.taille}
                      onChange={(e) => setCompanyData({ ...companyData, taille: e.target.value as any })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      required
                    >
                      {TAILLES_ENTREPRISE.map(taille => (
                        <option key={taille} value={taille}>{taille}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 py-2 sm:py-3">{companyData.taille}</p>
                  )}
                </div>

                {/* Pays (obligatoire - Liste déroulante) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pays <span className="text-red-500">*</span>
                  </label>
                  {isEditing ? (
                    <select
                      value={companyData.pays}
                      onChange={(e) => handlePaysChange(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      required
                    >
                      {PAYS_AFRIQUE.map(pays => (
                        <option key={pays.code} value={pays.nom}>
                          {pays.flag} {pays.nom}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 py-2 sm:py-3 flex items-center gap-2">
                      <span className="text-lg">{getPaysInfo(companyData.pays)?.flag}</span>
                      {companyData.pays}
                    </p>
                  )}
                </div>

                {/* Ville (obligatoire - Liste déroulante) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville <span className="text-red-500">*</span>
                  </label>
                  {isEditing ? (
                    <select
                      value={companyData.ville}
                      onChange={(e) => setCompanyData({ ...companyData, ville: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      required
                      disabled={!companyData.pays}
                    >
                      <option value="">Sélectionnez une ville</option>
                      {villesDisponibles.map(ville => (
                        <option key={ville} value={ville}>{ville}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 py-2 sm:py-3">{companyData.ville}</p>
                  )}
                </div>

                {/* Téléphone de l'entreprise */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone de l'entreprise
                  </label>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <select
                        value={companyData.code_pays_entreprise || '+225'}
                        onChange={(e) => setCompanyData({ ...companyData, code_pays_entreprise: e.target.value })}
                        className="w-32 px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      >
                        {PAYS_AFRIQUE.map(pays => (
                          <option key={pays.code} value={pays.indicatif}>
                            {pays.flag} {pays.indicatif}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        value={companyData.telephone_entreprise || ''}
                        onChange={(e) => setCompanyData({ ...companyData, telephone_entreprise: e.target.value })}
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="Ex: 07 123 4567"
                      />
                    </div>
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 py-2 sm:py-3 flex items-center gap-2">
                      <span className="text-lg">{getPaysInfo(companyData.pays)?.flag}</span>
                      {companyData.code_pays_entreprise} {companyData.telephone_entreprise || 'Non renseigné'}
                    </p>
                  )}
                </div>

                {/* Zones d'opération (optionnel) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zones d'opération
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {companyData.zones_operation?.map((zone, index) => (
                      <span
                        key={index}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2"
                      >
                        {zone}
                        {isEditing && (
                          <button
                            onClick={() => {
                              const newZones = companyData.zones_operation?.filter((_, i) => i !== index);
                              setCompanyData({ ...companyData, zones_operation: newZones });
                            }}
                            className="hover:text-red-600 transition-colors"
                          >
                            <i className="ri-close-line"></i>
                          </button>
                        )}
                      </span>
                    ))}
                    {isEditing && (
                      <button
                        onClick={() => setShowAddZoneModal(true)}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-50 text-teal-600 rounded-full text-xs sm:text-sm font-medium hover:bg-teal-100 transition-colors"
                      >
                        <i className="ri-add-line mr-1"></i>
                        Ajouter une zone
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">Ex: Afrique de l'Ouest, Europe</p>
                </div>
              </div>
            </div>

            {/* Section 2: Contacts Principaux */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <i className="ri-contacts-line text-teal-500"></i>
                Contacts Principaux
              </h3>
              
              {/* Contact principal (obligatoire) */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-user-star-line text-teal-500"></i>
                  Contact principal <span className="text-red-500">*</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={companyData.contact_principal.nom}
                        onChange={(e) => setCompanyData({
                          ...companyData,
                          contact_principal: { ...companyData.contact_principal, nom: e.target.value }
                        })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="Ex: Jean Dupont"
                        required
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-gray-900 py-2">{companyData.contact_principal.nom}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Poste</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={companyData.contact_principal.poste}
                        onChange={(e) => setCompanyData({
                          ...companyData,
                          contact_principal: { ...companyData.contact_principal, poste: e.target.value }
                        })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="Ex: Responsable des ventes"
                        required
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-gray-900 py-2">{companyData.contact_principal.poste}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={companyData.contact_principal.email}
                        onChange={(e) => setCompanyData({
                          ...companyData,
                          contact_principal: { ...companyData.contact_principal, email: e.target.value }
                        })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="Ex: jean.dupont@abccorp.com"
                        required
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-gray-900 py-2 break-all">{companyData.contact_principal.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    {isEditing ? (
                      <div className="flex gap-2">
                        <select
                          value={companyData.contact_principal.code_pays || '+225'}
                          onChange={(e) => setCompanyData({
                            ...companyData,
                            contact_principal: { ...companyData.contact_principal, code_pays: e.target.value }
                          })}
                          className="w-32 px-2 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                        >
                          {PAYS_AFRIQUE.map(pays => (
                            <option key={pays.code} value={pays.indicatif}>
                              {pays.flag} {pays.indicatif}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          value={companyData.contact_principal.telephone}
                          onChange={(e) => setCompanyData({
                            ...companyData,
                            contact_principal: { ...companyData.contact_principal, telephone: e.target.value }
                          })}
                          className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                          placeholder="Ex: 07 123 4567"
                          required
                        />
                      </div>
                    ) : (
                      <p className="text-sm sm:text-base text-gray-900 py-2 flex items-center gap-2">
                        <span className="text-lg">{PAYS_AFRIQUE.find(p => p.indicatif === companyData.contact_principal.code_pays)?.flag}</span>
                        {companyData.contact_principal.code_pays} {companyData.contact_principal.telephone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Autres contacts (optionnel) */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <i className="ri-team-line text-teal-500"></i>
                    Autres contacts
                  </h4>
                  {isEditing && (
                    <button
                      onClick={() => setShowAddContactModal(true)}
                      className="px-3 sm:px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-xs sm:text-sm whitespace-nowrap"
                    >
                      <i className="ri-add-line mr-1"></i>
                      Ajouter un contact
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {companyData.autres_contacts?.map((contact, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm sm:text-base">{contact.nom}</p>
                        <p className="text-xs sm:text-sm text-gray-600">{contact.poste}</p>
                        <p className="text-xs sm:text-sm text-teal-600 break-all">{contact.email}</p>
                        {contact.telephone && (
                          <p className="text-xs sm:text-sm text-gray-700 flex items-center gap-1 mt-1">
                            <span>{PAYS_AFRIQUE.find(p => p.indicatif === contact.code_pays)?.flag}</span>
                            {contact.code_pays} {contact.telephone}
                          </p>
                        )}
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => {
                            const newContacts = companyData.autres_contacts?.filter((_, i) => i !== index);
                            setCompanyData({ ...companyData, autres_contacts: newContacts });
                          }}
                          className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                        >
                          <i className="ri-delete-bin-line text-lg"></i>
                        </button>
                      )}
                    </div>
                  ))}
                  {(!companyData.autres_contacts || companyData.autres_contacts.length === 0) && (
                    <p className="text-sm text-gray-500 italic">Aucun autre contact ajouté</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Produits et Services */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <i className="ri-shopping-bag-line text-teal-500"></i>
                Produits et Services
              </h3>
              
              {/* Produits/Services principaux (obligatoire) */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Produits/Services principaux <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {companyData.produits_services_principaux.map((produit, index) => (
                    <span
                      key={index}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-50 text-teal-700 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2"
                    >
                      {produit}
                      {isEditing && (
                        <button
                          onClick={() => {
                            const newProduits = companyData.produits_services_principaux.filter((_, i) => i !== index);
                            setCompanyData({ ...companyData, produits_services_principaux: newProduits });
                          }}
                          className="hover:text-red-600 transition-colors"
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mb-2">Ex: CRM Premium, Formation en prospection</p>
              </div>

              {/* Description des produits/services (optionnel) */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description des produits/services
                </label>
                {isEditing ? (
                  <textarea
                    value={companyData.description_produits_services || ''}
                    onChange={(e) => setCompanyData({ ...companyData, description_produits_services: e.target.value })}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Ex: Solution CRM pour les PME, optimisée pour la gestion des leads"
                  />
                ) : (
                  <p className="text-sm sm:text-base text-gray-700 py-2">{companyData.description_produits_services || 'Non renseigné'}</p>
                )}
              </div>

              {/* Prix indicatifs (optionnel) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix indicatifs
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={companyData.prix_indicatifs || ''}
                    onChange={(e) => setCompanyData({ ...companyData, prix_indicatifs: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Ex: À partir de 500 $/mois"
                  />
                ) : (
                  <p className="text-sm sm:text-base text-gray-900 py-2">{companyData.prix_indicatifs || 'Non renseigné'}</p>
                )}
              </div>
            </div>

            {/* Secteurs d'activité personnalisés */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-briefcase-line text-teal-500"></i>
                  Secteurs d'activité personnalisés
                </h3>
                {isEditing && (
                  <button
                    onClick={() => setShowAddSecteurModal(true)}
                    className="w-full sm:w-auto bg-teal-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                  >
                    <i className="ri-add-line"></i>
                    Ajouter un secteur
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {companyData.secteurs_activite_personnalises?.map((secteur, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-teal-500 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{secteur.libelle}</h4>
                        {secteur.description && (
                          <p className="text-xs sm:text-sm text-gray-600">{secteur.description}</p>
                        )}
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => {
                            const newSecteurs = companyData.secteurs_activite_personnalises?.filter((_, i) => i !== index);
                            setCompanyData({ ...companyData, secteurs_activite_personnalises: newSecteurs });
                          }}
                          className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                        >
                          <i className="ri-delete-bin-line text-lg"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {(!companyData.secteurs_activite_personnalises || companyData.secteurs_activite_personnalises.length === 0) && (
                  <p className="text-sm text-gray-500 italic">Aucun secteur personnalisé ajouté</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Ajouter un contact */}
      {showAddContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Ajouter un contact</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  value={newContact.nom}
                  onChange={(e) => setNewContact({ ...newContact, nom: e.target.value })}
                  placeholder="Ex: Marie Kouadio"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Poste</label>
                <input
                  type="text"
                  value={newContact.poste}
                  onChange={(e) => setNewContact({ ...newContact, poste: e.target.value })}
                  placeholder="Ex: Responsable RH"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  placeholder="Ex: marie.kouadio@abccorp.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone (optionnel)</label>
                <div className="flex gap-2">
                  <select
                    value={newContact.code_pays}
                    onChange={(e) => setNewContact({ ...newContact, code_pays: e.target.value })}
                    className="w-32 px-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  >
                    {PAYS_AFRIQUE.map(pays => (
                      <option key={pays.code} value={pays.indicatif}>
                        {pays.flag} {pays.indicatif}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={newContact.telephone}
                    onChange={(e) => setNewContact({ ...newContact, telephone: e.target.value })}
                    placeholder="Ex: 05 987 6543"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => {
                  if (newContact.nom.trim() && newContact.poste.trim() && newContact.email.trim()) {
                    setCompanyData({
                      ...companyData,
                      autres_contacts: [...(companyData.autres_contacts || []), { ...newContact }]
                    });
                    setNewContact({ nom: '', poste: '', email: '', telephone: '', code_pays: '+225' });
                    setShowAddContactModal(false);
                  }
                }}
                className="flex-1 bg-teal-500 text-white px-4 py-2.5 rounded-lg hover:bg-teal-600 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Ajouter
              </button>
              <button
                onClick={() => {
                  setNewContact({ nom: '', poste: '', email: '', telephone: '', code_pays: '+225' });
                  setShowAddContactModal(false);
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Ajouter une zone */}
      {showAddZoneModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Ajouter une zone d'opération</h3>
            <input
              type="text"
              value={newZone}
              onChange={(e) => setNewZone(e.target.value)}
              placeholder="Ex: Afrique de l'Ouest"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4 text-sm sm:text-base"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  if (newZone.trim()) {
                    setCompanyData({
                      ...companyData,
                      zones_operation: [...(companyData.zones_operation || []), newZone.trim()]
                    });
                    setNewZone('');
                    setShowAddZoneModal(false);
                  }
                }}
                className="flex-1 bg-teal-500 text-white px-4 py-2.5 rounded-lg hover:bg-teal-600 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Ajouter
              </button>
              <button
                onClick={() => {
                  setNewZone('');
                  setShowAddZoneModal(false);
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Ajouter un secteur personnalisé */}
      {showAddSecteurModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Ajouter un secteur d'activité</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Libellé</label>
                <input
                  type="text"
                  value={newSecteur.libelle}
                  onChange={(e) => setNewSecteur({ ...newSecteur, libelle: e.target.value })}
                  placeholder="Ex: E-commerce"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (optionnel)</label>
                <textarea
                  value={newSecteur.description}
                  onChange={(e) => setNewSecteur({ ...newSecteur, description: e.target.value })}
                  rows={3}
                  placeholder="Description du secteur d'activité..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => {
                  if (newSecteur.libelle.trim()) {
                    setCompanyData({
                      ...companyData,
                      secteurs_activite_personnalises: [...(companyData.secteurs_activite_personnalises || []), { ...newSecteur }]
                    });
                    setNewSecteur({ libelle: '', description: '' });
                    setShowAddSecteurModal(false);
                  }
                }}
                className="flex-1 bg-teal-500 text-white px-4 py-2.5 rounded-lg hover:bg-teal-600 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Ajouter
              </button>
              <button
                onClick={() => {
                  setNewSecteur({ libelle: '', description: '' });
                  setShowAddSecteurModal(false);
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base whitespace-nowrap"
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
