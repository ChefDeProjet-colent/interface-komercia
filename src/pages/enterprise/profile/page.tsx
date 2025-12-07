import { useState, useEffect } from 'react';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';

export default function EnterpriseProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('https://readdy.ai/api/search-image?query=Professional%20business%20office%20building%20modern%20corporate%20headquarters%2C%20clean%20architecture%2C%20professional%20photography&width=200&height=200&seq=enterprise1&orientation=squarish');
  
  const [profileData, setProfileData] = useState({
    // Informations personnelles
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@entreprise.fr',
    phone: '+33 6 12 34 56 78',
    
    // Informations professionnelles
    company: 'TechCorp Solutions',
    position: 'Directeur Commercial',
    website: 'www.techcorp-solutions.fr',
    linkedin: 'linkedin.com/in/jeandupont',
    
    // Adresse
    address: '123 Avenue des Champs-Élysées',
    city: 'Paris',
    postalCode: '75008',
    country: 'France',
    
    // Biographie
    bio: 'Directeur commercial passionné avec plus de 15 ans d\'expérience dans le secteur technologique. Spécialisé dans le développement de stratégies commerciales innovantes et la gestion d\'équipes performantes.'
  });

  const [tempData, setTempData] = useState(profileData);

  // Calculer le pourcentage de complétion
  const calculateCompletion = () => {
    const fields = Object.values(profileData);
    const filledFields = fields.filter(field => field && field.toString().trim() !== '').length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const completion = calculateCompletion();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setTempData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setTempData({ ...tempData, [field]: value });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="enterprise" />
      
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
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-xl shadow-lg border-4 border-white flex items-center justify-center">
                      {companyData.logo ? (
                        <img src={companyData.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
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
                        value={companyData.name}
                        onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                        className="text-2xl sm:text-3xl font-bold text-gray-900 border-b-2 border-teal-500 focus:outline-none w-full"
                      />
                    ) : (
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{companyData.name}</h2>
                    )}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-sm sm:text-base text-gray-600">
                      <span className="flex items-center gap-1">
                        <i className="ri-map-pin-line"></i>
                        {companyData.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-building-line"></i>
                        {companyData.industry}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-team-line"></i>
                        {companyData.size}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations générales */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <i className="ri-information-line text-teal-500"></i>
                Informations générales
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'entreprise</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={companyData.name}
                      onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 py-2 sm:py-3">{companyData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secteur d'activité</label>
                  {isEditing ? (
                    <select
                      value={companyData.industry}
                      onChange={(e) => setCompanyData({ ...companyData, industry: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option>Technologie</option>
                      <option>Finance</option>
                      <option>Santé</option>
                      <option>Commerce</option>
                      <option>Services</option>
                    </select>
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 py-2 sm:py-3">{companyData.industry}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={companyData.location}
                      onChange={(e) => setCompanyData({ ...companyData, location: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 py-2 sm:py-3">{companyData.location}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Taille de l'entreprise</label>
                  {isEditing ? (
                    <select
                      value={companyData.size}
                      onChange={(e) => setCompanyData({ ...companyData, size: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option>1-10 employés</option>
                      <option>11-50 employés</option>
                      <option>51-200 employés</option>
                      <option>201-500 employés</option>
                      <option>500+ employés</option>
                    </select>
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 py-2 sm:py-3">{companyData.size}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site web</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={companyData.website}
                      onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    />
                  ) : (
                    <a href={companyData.website} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base text-teal-600 hover:text-teal-700 py-2 sm:py-3 block break-all">
                      {companyData.website}
                    </a>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={companyData.email}
                      onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 py-2 sm:py-3 break-all">{companyData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={companyData.phone}
                      onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 py-2 sm:py-3">{companyData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Année de création</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={companyData.foundedYear}
                      onChange={(e) => setCompanyData({ ...companyData, foundedYear: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 py-2 sm:py-3">{companyData.foundedYear}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  {isEditing ? (
                    <textarea
                      value={companyData.description}
                      onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-700 py-2 sm:py-3">{companyData.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Domaines d'expertise */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-lightbulb-line text-teal-500"></i>
                  Domaines d'expertise
                </h3>
                {isEditing && (
                  <button
                    onClick={() => setShowAddSkillModal(true)}
                    className="w-full sm:w-auto bg-teal-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                  >
                    <i className="ri-add-line"></i>
                    Ajouter
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {companyData.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-50 text-teal-700 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => {
                          const newExpertise = companyData.expertise.filter((_, i) => i !== index);
                          setCompanyData({ ...companyData, expertise: newExpertise });
                        }}
                        className="hover:text-red-600 transition-colors"
                      >
                        <i className="ri-close-line"></i>
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Langues parlées */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-global-line text-teal-500"></i>
                  Langues parlées
                </h3>
                {isEditing && (
                  <button
                    onClick={() => setShowAddLanguageModal(true)}
                    className="w-full sm:w-auto bg-teal-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                  >
                    <i className="ri-add-line"></i>
                    Ajouter
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {companyData.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2"
                  >
                    {lang}
                    {isEditing && (
                      <button
                        onClick={() => {
                          const newLanguages = companyData.languages.filter((_, i) => i !== index);
                          setCompanyData({ ...companyData, languages: newLanguages });
                        }}
                        className="hover:text-red-600 transition-colors"
                      >
                        <i className="ri-close-line"></i>
                      </button>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-award-line text-teal-500"></i>
                  Certifications
                </h3>
                {isEditing && (
                  <button
                    onClick={() => setShowAddCertModal(true)}
                    className="w-full sm:w-auto bg-teal-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                  >
                    <i className="ri-add-line"></i>
                    Ajouter une certification
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {companyData.certifications.map((cert, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-teal-500 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{cert.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">{cert.issuer}</p>
                        <p className="text-xs text-gray-500">{cert.date}</p>
                        {cert.id && <p className="text-xs text-gray-500 mt-1 break-all">ID: {cert.id}</p>}
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => {
                            const newCerts = companyData.certifications.filter((_, i) => i !== index);
                            setCompanyData({ ...companyData, certifications: newCerts });
                          }}
                          className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                        >
                          <i className="ri-delete-bin-line text-lg"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddSkillModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Ajouter une compétence</h3>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Ex: Développement web"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4 text-sm sm:text-base"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  if (newSkill.trim()) {
                    setCompanyData({
                      ...companyData,
                      expertise: [...companyData.expertise, newSkill.trim()]
                    });
                    setNewSkill('');
                    setShowAddSkillModal(false);
                  }
                }}
                className="flex-1 bg-teal-500 text-white px-4 py-2.5 rounded-lg hover:bg-teal-600 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Ajouter
              </button>
              <button
                onClick={() => {
                  setNewSkill('');
                  setShowAddSkillModal(false);
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddLanguageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Ajouter une langue</h3>
            <input
              type="text"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="Ex: Anglais"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-4 text-sm sm:text-base"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  if (newLanguage.trim()) {
                    setCompanyData({
                      ...companyData,
                      languages: [...companyData.languages, newLanguage.trim()]
                    });
                    setNewLanguage('');
                    setShowAddLanguageModal(false);
                  }
                }}
                className="flex-1 bg-teal-500 text-white px-4 py-2.5 rounded-lg hover:bg-teal-600 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Ajouter
              </button>
              <button
                onClick={() => {
                  setNewLanguage('');
                  setShowAddLanguageModal(false);
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddCertModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Ajouter une certification</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la certification</label>
                <input
                  type="text"
                  value={newCert.name}
                  onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
                  placeholder="Ex: ISO 9001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organisme émetteur</label>
                <input
                  type="text"
                  value={newCert.issuer}
                  onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                  placeholder="Ex: Bureau Veritas"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date d'obtention</label>
                <input
                  type="text"
                  value={newCert.date}
                  onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                  placeholder="Ex: Janvier 2024"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ID de certification (optionnel)</label>
                <input
                  type="text"
                  value={newCert.id}
                  onChange={(e) => setNewCert({ ...newCert, id: e.target.value })}
                  placeholder="Ex: CERT-2024-001"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => {
                  if (newCert.name.trim() && newCert.issuer.trim() && newCert.date.trim()) {
                    setCompanyData({
                      ...companyData,
                      certifications: [...companyData.certifications, { ...newCert }]
                    });
                    setNewCert({ name: '', issuer: '', date: '', id: '' });
                    setShowAddCertModal(false);
                  }
                }}
                className="flex-1 bg-teal-500 text-white px-4 py-2.5 rounded-lg hover:bg-teal-600 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Ajouter
              </button>
              <button
                onClick={() => {
                  setNewCert({ name: '', issuer: '', date: '', id: '' });
                  setShowAddCertModal(false);
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
