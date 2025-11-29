import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleHeaderLogin = () => {
    // Scroll to form if not filled, otherwise submit
    if (!email || !password) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.querySelector('input[type="email"]')?.focus();
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 
              onClick={() => navigate('/')}
              className="text-3xl font-bold text-teal-600 cursor-pointer" 
              style={{ fontFamily: '"Pacifico", serif' }}
            >
              KOMERCIA
            </h1>
            <button 
              onClick={handleHeaderLogin}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Se Connecter
            </button>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
            <p className="text-gray-600">Connectez-vous à votre espace</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-sm text-teal-600 hover:text-teal-700 cursor-pointer">
                  Mot de passe oublié ?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Se Connecter
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Pas encore de compte ? 
                <a 
                  onClick={() => navigate('/register')}
                  className="text-teal-600 hover:text-teal-700 ml-1 cursor-pointer font-medium"
                >
                  Créer un compte
                </a>
              </p>
            </div>
          </div>

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
    </div>
  );
}
