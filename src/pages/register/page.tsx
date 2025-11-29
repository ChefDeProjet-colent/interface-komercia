import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AccountType = 'enterprise' | 'commercial' | 'financial' | 'consultant' | 'startup' | 'partner' | null;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<AccountType>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const accountTypes = [
    {
      id: 'enterprise' as AccountType,
      icon: 'ri-building-line',
      title: 'Entreprise',
      description: 'Pour les grandes entreprises et organisations',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'commercial' as AccountType,
      icon: 'ri-briefcase-line',
      title: 'Commercial',
      description: 'Pour les commerciaux et équipes de vente',
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'financial' as AccountType,
      icon: 'ri-bank-line',
      title: 'Institution Financière',
      description: 'Pour les banques et institutions financières',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'consultant' as AccountType,
      icon: 'ri-user-star-line',
      title: 'Consultant',
      description: 'Pour les consultants et experts',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'startup' as AccountType,
      icon: 'ri-rocket-line',
      title: 'Startup',
      description: 'Pour les startups et jeunes entreprises',
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'partner' as AccountType,
      icon: 'ri-team-line',
      title: 'Partenaire',
      description: 'Pour les partenaires commerciaux',
      color: 'from-green-500 to-green-600'
    }
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      alert('Veuillez accepter les conditions générales d\'utilisation');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    // Simulate registration
    navigate(`/verify-otp?email=${encodeURIComponent(formData.email)}&type=${selectedType}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-600 mb-2" style={{ fontFamily: '"Pacifico", serif' }}>
            KOMERCIA
          </h1>
          <p className="text-gray-600">Créez votre compte professionnel</p>
        </div>

        {!selectedType ? (
          <>
            {/* Account Type Selection */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Choisissez votre type de compte
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Sélectionnez le type de compte qui correspond le mieux à votre profil
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accountTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-teal-500 hover:shadow-lg transition-all duration-200">
                      <div className={`w-16 h-16 bg-gradient-to-br ${type.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <i className={`${type.icon} text-3xl text-white`}></i>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {type.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {type.description}
                      </p>
                      <div className="mt-4 flex items-center text-teal-600 font-medium">
                        <span className="text-sm">Sélectionner</span>
                        <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Back to Login */}
            <div className="text-center">
              <p className="text-gray-600">
                Vous avez déjà un compte ? 
                <a 
                  onClick={() => navigate('/login')}
                  className="text-teal-600 hover:text-teal-700 ml-1 cursor-pointer font-medium"
                >
                  Se connecter
                </a>
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Registration Form */}
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              {/* Selected Type Header */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className={`w-12 h-12 bg-gradient-to-br ${accountTypes.find(t => t.id === selectedType)?.color} rounded-lg flex items-center justify-center mr-4`}>
                    <i className={`${accountTypes.find(t => t.id === selectedType)?.icon} text-2xl text-white`}></i>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Compte {accountTypes.find(t => t.id === selectedType)?.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {accountTypes.find(t => t.id === selectedType)?.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedType(null)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-arrow-left-line text-xl"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email professionnel
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="votre.email@entreprise.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {selectedType === 'enterprise' ? 'Nom de l\'entreprise' : 
                     selectedType === 'financial' ? 'Nom de l\'institution' :
                     'Nom de l\'organisation'}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Nom de votre organisation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      minLength={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmer le mot de passe
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      minLength={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label className="ml-3 text-sm text-gray-600">
                    J'accepte les{' '}
                    <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
                      conditions générales d'utilisation
                    </a>{' '}
                    et la{' '}
                    <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
                      politique de confidentialité
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  Créer mon compte
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Vous avez déjà un compte ? 
                  <a 
                    onClick={() => navigate('/login')}
                    className="text-teal-600 hover:text-teal-700 ml-1 cursor-pointer font-medium"
                  >
                    Se connecter
                  </a>
                </p>
              </div>
            </div>
          </>
        )}

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a 
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}
