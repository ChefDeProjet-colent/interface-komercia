import { useState, useEffect } from 'react';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Adresse de livraison
    address: '',
    city: '',
    postalCode: '',
    country: 'Côte d\'Ivoire',
    // Informations de paiement
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    // Notes
    notes: ''
  });

  const [cart] = useState([
    {
      id: 1,
      name: 'Solution CRM Pro',
      company: 'TechSolutions Inc.',
      price: 299,
      quantity: 2,
      image: 'https://readdy.ai/api/search-image?query=modern%20professional%20crm%20software%20interface%20dashboard%20with%20clean%20design%20business%20analytics%20charts%20data%20visualization%20blue%20tones%20technology%20solution&width=400&height=300&seq=prod1&orientation=landscape'
    },
    {
      id: 2,
      name: 'Formation Marketing Digital',
      company: 'LearnPro Academy',
      price: 199,
      quantity: 1,
      image: 'https://readdy.ai/api/search-image?query=digital%20marketing%20training%20course%20concept%20with%20laptop%20showing%20social%20media%20analytics%20modern%20education%20professional%20learning%20environment%20bright%20colors&width=400&height=300&seq=prod2&orientation=landscape'
    }
  ]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Simuler le paiement
      setOrderPlaced(true);
      setTimeout(() => {
        window.REACT_APP_NAVIGATE('/end-customers/orders');
      }, 3000);
    }
  };

  const isStepValid = () => {
    if (step === 1) {
      return formData.firstName && formData.lastName && formData.email && formData.phone;
    }
    if (step === 2) {
      return formData.address && formData.city && formData.postalCode;
    }
    if (step === 3) {
      return formData.cardNumber && formData.cardName && formData.expiryDate && formData.cvv;
    }
    return false;
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-check-line text-4xl text-green-600"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Commande confirmée !</h2>
          <p className="text-gray-600 mb-6">
            Votre commande a été passée avec succès. Vous recevrez un email de confirmation sous peu.
          </p>
          <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-sm text-gray-500 mt-4">Redirection vers vos commandes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <i className="ri-phone-line"></i>
              +225 07 XX XX XX XX
            </span>
            <span className="flex items-center gap-2">
              <i className="ri-mail-line"></i>
              contact@komercia.com
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isNavbarScrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.REACT_APP_NAVIGATE('/end-customers')}>
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <i className="ri-store-3-fill text-white text-xl"></i>
              </div>
              <span className="text-2xl font-bold text-gray-900">Komercia</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a 
                onClick={() => window.REACT_APP_NAVIGATE('/end-customers')}
                className="font-medium text-gray-700 hover:text-teal-600 transition-colors cursor-pointer"
              >
                Accueil
              </a>
              <a 
                onClick={() => window.REACT_APP_NAVIGATE('/end-customers/produits')}
                className="font-medium text-gray-700 hover:text-teal-600 transition-colors cursor-pointer"
              >
                Produits
              </a>
              <a 
                onClick={() => window.REACT_APP_NAVIGATE('/end-customers/commercial')}
                className="font-medium text-gray-700 hover:text-teal-600 transition-colors cursor-pointer"
              >
                Nos Experts
              </a>
              <a 
                onClick={() => window.REACT_APP_NAVIGATE('/end-customers')}
                className="font-medium text-gray-700 hover:text-teal-600 transition-colors cursor-pointer"
              >
                Support
              </a>
              <a 
                onClick={() => window.REACT_APP_NAVIGATE('/end-customers/orders')}
                className="font-medium text-gray-700 hover:text-teal-600 transition-colors cursor-pointer"
              >
                Mes Commandes
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Finaliser votre commande</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {[
              { num: 1, label: 'Informations' },
              { num: 2, label: 'Livraison' },
              { num: 3, label: 'Paiement' }
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    step >= s.num 
                      ? 'bg-teal-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > s.num ? <i className="ri-check-line"></i> : s.num}
                  </div>
                  <span className={`text-sm mt-2 font-medium ${
                    step >= s.num ? 'text-teal-600' : 'text-gray-500'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className={`h-1 flex-1 mx-4 transition-all ${
                    step > s.num ? 'bg-teal-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations personnelles</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom <span className="text-red-500">*</span>
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
                        Nom <span className="text-red-500">*</span>
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="+225 XX XX XX XX XX"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Address */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Adresse de livraison</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse complète <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Rue, numéro, bâtiment..."
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ville <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Abidjan"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Code postal <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="00225"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pays <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes de livraison (optionnel)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                        maxLength={500}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                        placeholder="Instructions spéciales pour la livraison..."
                      ></textarea>
                      <p className="text-sm text-gray-500 mt-1">{formData.notes.length}/500 caractères</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de paiement</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de carte <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          maxLength={19}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                        />
                        <i className="ri-bank-card-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom sur la carte <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="JEAN DUPONT"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date d'expiration <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                          maxLength={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="MM/AA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          maxLength={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                      <i className="ri-shield-check-line text-blue-600 text-xl flex-shrink-0"></i>
                      <div>
                        <p className="text-sm font-medium text-blue-900">Paiement sécurisé</p>
                        <p className="text-sm text-blue-700">Vos informations sont cryptées et sécurisées</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium whitespace-nowrap"
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Retour
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!isStepValid()}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                    isStepValid()
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {step === 3 ? (
                    <>
                      <i className="ri-lock-line mr-2"></i>
                      Payer {total.toFixed(2)}€
                    </>
                  ) : (
                    <>
                      Continuer
                      <i className="ri-arrow-right-line ml-2"></i>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Récapitulatif</h3>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.company}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-600">Qté: {item.quantity}</span>
                        <span className="text-sm font-bold text-gray-900">{(item.price * item.quantity).toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span className="font-semibold">{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span className="font-semibold">{shipping.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>TVA (18%)</span>
                  <span className="font-semibold">{tax.toFixed(2)}€</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-teal-600">{total.toFixed(2)}€</span>
                </div>
              </div>

              <div className="mt-6 bg-teal-50 border border-teal-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <i className="ri-truck-line text-teal-600 text-xl flex-shrink-0"></i>
                  <div>
                    <p className="text-sm font-medium text-teal-900">Livraison estimée</p>
                    <p className="text-sm text-teal-700">3-5 jours ouvrables</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
