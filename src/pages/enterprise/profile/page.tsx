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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Komercia</h1>
          <p className="text-sm text-gray-600">Interface Entreprise</p>
        </div>

        <nav className="flex-1 py-6">
          <div className="space-y-1 px-3">
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/enterprise')}
              className="w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <i className="ri-dashboard-line mr-3"></i>
              Tableau de bord
            </button>
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/enterprise')}
              className="w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <i className="ri-user-search-line mr-3"></i>
              Recrutement
            </button>
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/enterprise')}
              className="w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <i className="ri-file-list-line mr-3"></i>
              Contrats
            </button>
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/enterprise')}
              className="w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <i className="ri-bar-chart-box-line mr-3"></i>
              Performances
            </button>
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/enterprise')}
              className="w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <i className="ri-search-eye-line mr-3"></i>
              Prospection
            </button>
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/enterprise/profile')}
              className="w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors bg-blue-100 text-blue-700 cursor-pointer"
            >
              <i className="ri-user-line mr-3"></i>
              Mon Profil
            </button>
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/enterprise/call-for-tenders')}
              className="w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <i className="ri-megaphone-line mr-3"></i>
              Appels d'Offres
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <i className="ri-building-line text-sm text-white"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Entreprise Pro</p>
              <p className="text-xs text-gray-500">Compte actif</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => window.REACT_APP_NAVIGATE('/enterprise')}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-arrow-left-line text-xl text-gray-600"></i>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Mon Profil Entreprise</h1>
                  <p className="text-sm text-gray-600">Gérez vos informations professionnelles</p>
                </div>
              </div>
              {!isEditing ? (
                <Button variant="primary" onClick={handleEdit}>
                  <i className="ri-edit-line mr-2"></i>
                  Modifier le Profil
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="primary" onClick={handleSave}>
                    <i className="ri-save-line mr-2"></i>
                    Enregistrer
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <i className="ri-close-line mr-2"></i>
                    Annuler
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar - Photo et Complétion */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                {/* Photo de profil */}
                <Card>
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <img
                        src={profilePhoto}
                        alt="Photo de profil"
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
                      />
                      {isEditing && (
                        <label className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                          <i className="ri-camera-line text-white"></i>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {profileData.firstName} {profileData.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{profileData.position}</p>
                    <p className="text-sm text-gray-600">{profileData.company}</p>
                  </div>
                </Card>

                {/* Complétion du profil */}
                <Card>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    <i className="ri-checkbox-circle-line mr-2 text-blue-600"></i>
                    Complétion du Profil
                  </h4>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progression</span>
                      <span className="text-2xl font-bold text-blue-600">{completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${completion}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Informations personnelles</span>
                      <i className={`ri-checkbox-circle-${profileData.firstName && profileData.lastName && profileData.email && profileData.phone ? 'fill text-green-600' : 'line text-gray-400'}`}></i>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Informations professionnelles</span>
                      <i className={`ri-checkbox-circle-${profileData.company && profileData.position ? 'fill text-green-600' : 'line text-gray-400'}`}></i>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Adresse complète</span>
                      <i className={`ri-checkbox-circle-${profileData.address && profileData.city && profileData.country ? 'fill text-green-600' : 'line text-gray-400'}`}></i>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Biographie</span>
                      <i className={`ri-checkbox-circle-${profileData.bio ? 'fill text-green-600' : 'line text-gray-400'}`}></i>
                    </div>
                  </div>
                  {completion < 100 && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs text-yellow-800">
                        <i className="ri-information-line mr-1"></i>
                        Complétez votre profil à 100% pour maximiser votre visibilité
                      </p>
                    </div>
                  )}
                </Card>

                {/* Actions rapides */}
                <Card>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    <i className="ri-links-line mr-2 text-blue-600"></i>
                    Liens Rapides
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => window.REACT_APP_NAVIGATE('/enterprise/call-for-tenders')}
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center">
                        <i className="ri-megaphone-line text-blue-600 mr-3"></i>
                        <span className="text-sm font-medium text-gray-700">Mes Appels d'Offres</span>
                      </div>
                      <i className="ri-arrow-right-s-line text-gray-400"></i>
                    </button>
                    <button
                      onClick={() => window.REACT_APP_NAVIGATE('/enterprise')}
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center">
                        <i className="ri-dashboard-line text-blue-600 mr-3"></i>
                        <span className="text-sm font-medium text-gray-700">Tableau de Bord</span>
                      </div>
                      <i className="ri-arrow-right-s-line text-gray-400"></i>
                    </button>
                  </div>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informations personnelles */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="ri-user-line mr-2 text-blue-600"></i>
                  Informations Personnelles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={tempData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={tempData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.phone}</p>
                    )}
                  </div>
                </div>
              </Card>

              {/* Informations professionnelles */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="ri-briefcase-line mr-2 text-blue-600"></i>
                  Informations Professionnelles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.company}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Poste</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.position}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Web</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.website}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.linkedin}</p>
                    )}
                  </div>
                </div>
              </Card>

              {/* Adresse */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="ri-map-pin-line mr-2 text-blue-600"></i>
                  Adresse
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.address}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Code Postal</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.postalCode}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pays</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{profileData.country}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Biographie */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="ri-file-text-line mr-2 text-blue-600"></i>
                  À Propos
                </h3>
                {isEditing ? (
                  <textarea
                    value={tempData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Parlez de vous, votre expérience, vos compétences..."
                  ></textarea>
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg text-gray-700 leading-relaxed">
                    {profileData.bio || 'Aucune biographie renseignée'}
                  </p>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
