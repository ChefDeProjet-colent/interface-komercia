import { useState, useEffect } from 'react';
import { EndCustomerDashboard } from './components/EndCustomerDashboard';

export default function EndCustomersPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPromoSlide, setCurrentPromoSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<Array<{id: number, quantity: number}>>([]);

  // Hero slides
  const heroSlides = [
    {
      image: 'https://readdy.ai/api/search-image?query=modern%20professional%20business%20team%20collaboration%20in%20bright%20office%20space%20with%20technology%20devices%20laptops%20and%20digital%20screens%20showing%20data%20analytics%20clean%20minimalist%20corporate%20environment%20natural%20lighting%20contemporary%20workspace%20design&width=1920&height=1080&seq=hero1&orientation=landscape',
      title: 'Transformez votre entreprise avec nos solutions',
      description: 'Découvrez notre gamme complète de produits et services pour booster votre activité',
      cta: 'Découvrir maintenant'
    },
    {
      image: 'https://readdy.ai/api/search-image?query=innovative%20technology%20solutions%20digital%20transformation%20concept%20with%20futuristic%20interface%20holographic%20displays%20modern%20business%20tools%20clean%20professional%20setting%20bright%20colors%20high%20tech%20atmosphere&width=1920&height=1080&seq=hero2&orientation=landscape',
      title: 'Innovation et performance au rendez-vous',
      description: 'Des outils puissants pour développer votre business et atteindre vos objectifs',
      cta: 'En savoir plus'
    },
    {
      image: 'https://readdy.ai/api/search-image?query=successful%20business%20growth%20concept%20with%20upward%20trending%20graphs%20charts%20professional%20team%20celebrating%20achievement%20modern%20office%20bright%20positive%20atmosphere%20corporate%20success%20story&width=1920&height=1080&seq=hero3&orientation=landscape',
      title: 'Rejoignez des milliers d\'entreprises satisfaites',
      description: 'Faites confiance à Komercia pour accompagner votre croissance',
      cta: 'Commencer'
    }
  ];

  // Promotional slides
  const promoSlides = [
    {
      image: 'https://readdy.ai/api/search-image?query=exciting%20special%20offer%20promotion%20banner%20with%20vibrant%20colors%20discount%20sale%20concept%20modern%20clean%20design%20professional%20marketing%20visual%20attractive%20layout%20business%20deals&width=1200&height=400&seq=promo1&orientation=landscape',
      title: 'Offre spéciale : Jusqu\'à -40% sur une sélection',
      description: 'Profitez de nos promotions exceptionnelles sur les produits phares',
      cta: 'Voir les offres'
    },
    {
      image: 'https://readdy.ai/api/search-image?query=new%20product%20launch%20announcement%20banner%20modern%20innovative%20technology%20fresh%20design%20professional%20presentation%20clean%20background%20business%20marketing%20visual&width=1200&height=400&seq=promo2&orientation=landscape',
      title: 'Nouveautés : Découvrez nos derniers produits',
      description: 'Les innovations qui vont révolutionner votre façon de travailler',
      cta: 'Découvrir'
    },
    {
      image: 'https://readdy.ai/api/search-image?query=premium%20business%20services%20package%20deal%20professional%20corporate%20offer%20modern%20elegant%20design%20quality%20solutions%20clean%20presentation%20marketing%20banner&width=1200&height=400&seq=promo3&orientation=landscape',
      title: 'Pack Premium : Tout ce dont vous avez besoin',
      description: 'Économisez en optant pour nos offres groupées avantageuses',
      cta: 'En profiter'
    }
  ];

  // Popular products
  const popularProducts = [
    {
      id: 1,
      name: 'Solution CRM Pro',
      company: 'TechSolutions Inc.',
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      reviews: 156,
      image: 'https://readdy.ai/api/search-image?query=modern%20professional%20crm%20software%20interface%20dashboard%20with%20clean%20design%20business%20analytics%20charts%20data%20visualization%20blue%20tones%20technology%20solution&width=400&height=300&seq=prod1&orientation=landscape',
      badge: 'Bestseller',
      category: 'Logiciel',
      description: 'Solution CRM complète pour gérer vos relations clients efficacement',
      features: ['Gestion des contacts', 'Suivi des ventes', 'Rapports détaillés', 'Intégrations multiples'],
      images: [
        'https://readdy.ai/api/search-image?query=modern%20professional%20crm%20software%20interface%20dashboard%20with%20clean%20design%20business%20analytics%20charts%20data%20visualization%20blue%20tones%20technology%20solution&width=400&height=300&seq=prod1&orientation=landscape',
        'https://readdy.ai/api/search-image?query=crm%20analytics%20dashboard%20detailed%20view%20with%20graphs%20statistics%20modern%20interface%20professional%20business%20tool&width=400&height=300&seq=prod1b&orientation=landscape',
        'https://readdy.ai/api/search-image?query=crm%20contact%20management%20interface%20clean%20organized%20layout%20professional%20software%20design&width=400&height=300&seq=prod1c&orientation=landscape'
      ]
    },
    {
      id: 2,
      name: 'Formation Marketing Digital',
      company: 'LearnPro Academy',
      price: 199,
      originalPrice: null,
      rating: 4.9,
      reviews: 203,
      image: 'https://readdy.ai/api/search-image?query=digital%20marketing%20training%20course%20concept%20with%20laptop%20showing%20social%20media%20analytics%20modern%20education%20professional%20learning%20environment%20bright%20colors&width=400&height=300&seq=prod2&orientation=landscape',
      badge: 'Nouveau',
      category: 'Formation',
      description: 'Formation complète en marketing digital avec certification',
      features: ['12 modules vidéo', 'Exercices pratiques', 'Certification', 'Support 24/7'],
      images: [
        'https://readdy.ai/api/search-image?query=digital%20marketing%20training%20course%20concept%20with%20laptop%20showing%20social%20media%20analytics%20modern%20education%20professional%20learning%20environment%20bright%20colors&width=400&height=300&seq=prod2&orientation=landscape',
        'https://readdy.ai/api/search-image?query=online%20learning%20platform%20interface%20video%20courses%20modern%20education%20technology&width=400&height=300&seq=prod2b&orientation=landscape',
        'https://readdy.ai/api/search-image?query=digital%20marketing%20certification%20diploma%20professional%20achievement%20modern%20design&width=400&height=300&seq=prod2c&orientation=landscape'
      ]
    },
    {
      id: 3,
      name: 'Pack Matériel Bureau',
      company: 'OfficePro Supplies',
      price: 449,
      originalPrice: 599,
      rating: 4.7,
      reviews: 89,
      image: 'https://readdy.ai/api/search-image?query=modern%20office%20equipment%20setup%20with%20computer%20monitor%20keyboard%20mouse%20desk%20accessories%20professional%20workspace%20clean%20organized%20bright%20lighting&width=400&height=300&seq=prod3&orientation=landscape',
      badge: '-25%',
      category: 'Matériel',
      description: 'Pack complet d\'équipement de bureau professionnel',
      features: ['Écran 27 pouces', 'Clavier mécanique', 'Souris ergonomique', 'Accessoires inclus'],
      images: [
        'https://readdy.ai/api/search-image?query=modern%20office%20equipment%20setup%20with%20computer%20monitor%20keyboard%20mouse%20desk%20accessories%20professional%20workspace%20clean%20organized%20bright%20lighting&width=400&height=300&seq=prod3&orientation=landscape',
        'https://readdy.ai/api/search-image?query=professional%20computer%20monitor%20display%20high%20quality%20screen%20modern%20technology&width=400&height=300&seq=prod3b&orientation=landscape',
        'https://readdy.ai/api/search-image?query=ergonomic%20keyboard%20and%20mouse%20set%20professional%20office%20accessories&width=400&height=300&seq=prod3c&orientation=landscape'
      ]
    },
    {
      id: 4,
      name: 'Service Comptabilité',
      company: 'FinanceExperts Ltd',
      price: 149,
      originalPrice: null,
      rating: 4.9,
      reviews: 178,
      image: 'https://readdy.ai/api/search-image?query=professional%20accounting%20service%20concept%20with%20calculator%20financial%20documents%20charts%20modern%20office%20setting%20business%20finance%20management&width=400&height=300&seq=prod4&orientation=landscape',
      badge: 'Bestseller',
      category: 'Service',
      description: 'Service de comptabilité mensuel pour votre entreprise',
      features: ['Gestion complète', 'Déclarations fiscales', 'Conseils experts', 'Rapport mensuel'],
      images: [
        'https://readdy.ai/api/search-image?query=professional%20accounting%20service%20concept%20with%20calculator%20financial%20documents%20charts%20modern%20office%20setting%20business%20finance%20management&width=400&height=300&seq=prod4&orientation=landscape',
        'https://readdy.ai/api/search-image?query=financial%20reports%20and%20analysis%20documents%20professional%20accounting%20work&width=400&height=300&seq=prod4b&orientation=landscape',
        'https://readdy.ai/api/search-image?query=tax%20declaration%20forms%20professional%20accounting%20service%20documentation&width=400&height=300&seq=prod4c&orientation=landscape'
      ]
    }
  ];

  // Auto-slide for hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-slide for promo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromoSlide((prev) => (prev + 1) % promoSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== productId));
    } else {
      setCart(prev => 
        prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const cartProducts = cart.map(item => {
    const product = popularProducts.find(p => p.id === item.id);
    return { ...product, quantity: item.quantity };
  });

  const cartTotal = cartProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const proceedToCheckout = () => {
    setIsCartOpen(false);
    window.REACT_APP_NAVIGATE('/end-customers/checkout');
  };

  return (
    <div className="min-h-screen bg-white">
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
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-teal-200 transition-colors">
              <i className="ri-facebook-fill text-lg"></i>
            </a>
            <a href="#" className="hover:text-teal-200 transition-colors">
              <i className="ri-twitter-fill text-lg"></i>
            </a>
            <a href="#" className="hover:text-teal-200 transition-colors">
              <i className="ri-instagram-line text-lg"></i>
            </a>
            <a href="#" className="hover:text-teal-200 transition-colors">
              <i className="ri-linkedin-fill text-lg"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isNavbarScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <i className="ri-store-3-fill text-white text-xl"></i>
              </div>
              <span className={`text-2xl font-bold ${isNavbarScrolled ? 'text-gray-900' : 'text-white'}`}>
                Komercia
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#accueil" className={`font-medium hover:text-teal-600 transition-colors ${isNavbarScrolled ? 'text-gray-700' : 'text-white'}`}>
                Accueil
              </a>
              <a 
                onClick={() => window.REACT_APP_NAVIGATE('/end-customers/produits')}
                className={`font-medium hover:text-teal-600 transition-colors cursor-pointer ${isNavbarScrolled ? 'text-gray-700' : 'text-white'}`}
              >
                Produits
              </a>
              <a 
                onClick={() => window.REACT_APP_NAVIGATE('/end-customers/commercial')}
                className={`font-medium hover:text-teal-600 transition-colors cursor-pointer ${isNavbarScrolled ? 'text-gray-700' : 'text-white'}`}
              >
                Nos Experts
              </a>
              <a href="#support" className={`font-medium hover:text-teal-600 transition-colors ${isNavbarScrolled ? 'text-gray-700' : 'text-white'}`}>
                Support
              </a>
              <a 
                onClick={() => window.REACT_APP_NAVIGATE('/end-customers/orders')}
                className={`font-medium hover:text-teal-600 transition-colors cursor-pointer ${isNavbarScrolled ? 'text-gray-700' : 'text-white'}`}
              >
                Mes Commandes
              </a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden lg:flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <i className={`ri-search-line ${isNavbarScrolled ? 'text-gray-600' : 'text-white'} mr-2`}></i>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`bg-transparent border-none outline-none w-48 text-sm ${isNavbarScrolled ? 'text-gray-900 placeholder-gray-500' : 'text-white placeholder-white/70'}`}
                />
              </div>

              {/* Favorites */}
              <button
                onClick={() => setIsFavoritesOpen(true)}
                className={`relative p-2 hover:bg-white/10 rounded-full transition-colors ${isNavbarScrolled ? 'text-gray-700' : 'text-white'}`}
              >
                <i className="ri-heart-line text-xl"></i>
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2 hover:bg-white/10 rounded-full transition-colors ${isNavbarScrolled ? 'text-gray-700' : 'text-white'}`}
              >
                <i className="ri-shopping-cart-line text-xl"></i>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 ${isNavbarScrolled ? 'text-gray-700' : 'text-white'}`}
              >
                <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4">
              <div className="flex flex-col gap-3">
                <a href="#accueil" className={`font-medium hover:text-teal-600 transition-colors ${isNavbarScrolled ? 'text-gray-700' : 'text-white'}`}>
                  Accueil
                </a>
                <a 
                  onClick={() => window.REACT_APP_NAVIGATE('/end-customers/produits')}
                  className={`font-medium hover:text-teal-600 transition-colors cursor-pointer ${isNavbarScrolled ? 'text-gray-700' : 'text-white'}`}
                >
                  Produits
                </a>
                <a 
                  onClick={() => window.REACT_APP_NAVIGATE('/end-customers/commercial')}
                  className={`font-medium hover:text-teal-600 transition-colors cursor-pointer ${isNavbarScrolled ? 'text-gray-700' : 'text-white'}`}
                >
                  Nos Experts
                </a>
                <a href="#support" className={`font-medium hover:text-teal-600 transition-colors ${isNavbarScrolled ? 'text-gray-700' : 'text-white'}`}>
                  Support
                </a>
                <a 
                  onClick={() => window.REACT_APP_NAVIGATE('/end-customers/orders')}
                  className={`font-medium hover:text-teal-600 transition-colors cursor-pointer ${isNavbarScrolled ? 'text-gray-700' : 'text-white'}`}
                >
                  Mes Commandes
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Carousel - Full Screen */}
      <section id="accueil" className="relative h-screen">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="max-w-2xl text-white">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in-delay">
                    {slide.description}
                  </p>
                  <button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap">
                    {slide.cta}
                    <i className="ri-arrow-right-line ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300"
        >
          <i className="ri-arrow-left-s-line text-2xl"></i>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300"
        >
          <i className="ri-arrow-right-s-line text-2xl"></i>
        </button>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section id="produits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Produits Populaires</h2>
              <p className="text-gray-600">Découvrez nos meilleures ventes</p>
            </div>
            <button 
              onClick={() => window.REACT_APP_NAVIGATE('/end-customers/produits')}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              Voir tout
              <i className="ri-arrow-right-line ml-2"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        favorites.includes(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <i className={`${favorites.includes(product.id) ? 'ri-heart-fill' : 'ri-heart-line'} text-lg`}></i>
                    </button>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-10 h-10 bg-white/90 hover:bg-teal-500 text-gray-700 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
                    >
                      <i className="ri-shopping-cart-line text-lg"></i>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-teal-600 font-medium">{product.company}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      <i className="ri-star-fill text-yellow-400"></i>
                      <span className="ml-1 text-sm font-semibold text-gray-900">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} avis)</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{product.price}€</span>
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-400 line-through">{product.originalPrice}€</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full bg-gray-100 hover:bg-teal-500 text-gray-700 hover:text-white py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap"
                  >
                    <i className="ri-information-line mr-2"></i>
                    Voir les détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            {promoSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentPromoSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600/80 to-emerald-600/80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white max-w-3xl px-4">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-xl mb-8 text-white/90">
                      {slide.description}
                    </p>
                    <button className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap">
                      {slide.cta}
                      <i className="ri-arrow-right-line ml-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation */}
            <button
              onClick={() => setCurrentPromoSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300"
            >
              <i className="ri-arrow-left-s-line text-2xl"></i>
            </button>
            <button
              onClick={() => setCurrentPromoSlide((prev) => (prev + 1) % promoSlides.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300"
            >
              <i className="ri-arrow-right-s-line text-2xl"></i>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
              {promoSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPromoSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentPromoSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <EndCustomerDashboard />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <i className="ri-store-3-fill text-white text-xl"></i>
                </div>
                <span className="text-2xl font-bold">Komercia</span>
              </div>
              <p className="text-white/80 mb-4">
                Votre plateforme de commerce B2B de confiance
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">À propos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Qui sommes-nous</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Notre équipe</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Carrières</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Produits</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Logiciels</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Formations</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Services</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/80 text-sm">
              © 2024 Komercia. Tous droits réservés.
            </p>
            <a 
              href="https://readdy.ai/?ref=logo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white text-sm transition-colors"
            >
              Powered by Readdy
            </a>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Mon Panier ({cartItemsCount})</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
              >
                <i className="ri-close-line text-2xl text-gray-600"></i>
              </button>
            </div>
            <div className="p-6">
              {cartProducts.length === 0 ? (
                <div className="text-center py-12">
                  <i className="ri-shopping-cart-line text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500">Votre panier est vide</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartProducts.map((product) => (
                      <div key={product.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                        <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-bold text-gray-900">{product.name}</h3>
                              <p className="text-sm text-gray-600">{product.company}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <i className="ri-delete-bin-line text-xl"></i>
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateCartQuantity(product.id, product.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <i className="ri-subtract-line"></i>
                              </button>
                              <span className="text-lg font-semibold text-gray-900 w-8 text-center">{product.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(product.id, product.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <i className="ri-add-line"></i>
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">{product.price}€ × {product.quantity}</p>
                              <p className="text-lg font-bold text-teal-600">{(product.price * product.quantity).toFixed(2)}€</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-teal-600">{cartTotal.toFixed(2)}€</span>
                    </div>
                    <button 
                      onClick={proceedToCheckout}
                      className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 whitespace-nowrap"
                    >
                      Procéder au paiement
                      <i className="ri-arrow-right-line ml-2"></i>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Favorites Modal */}
      {isFavoritesOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Mes Favoris ({favorites.length})</h2>
              <button
                onClick={() => setIsFavoritesOpen(false)}
                className="w-10 h-10 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
              >
                <i className="ri-close-line text-2xl text-gray-600"></i>
              </button>
            </div>
            <div className="p-6">
              {favorites.length === 0 ? (
                <div className="text-center py-12">
                  <i className="ri-heart-line text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500">Aucun favori pour le moment</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popularProducts.filter(p => favorites.includes(p.id)).map((product) => (
                    <div key={product.id} className="bg-gray-50 rounded-xl p-4">
                      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-3" />
                      <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.company}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-teal-600">{product.price}€</span>
                        <button
                          onClick={() => addToCart(product.id)}
                          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors whitespace-nowrap"
                        >
                          <i className="ri-shopping-cart-line mr-1"></i>
                          Ajouter
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-gray-900">Détails du produit</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-10 h-10 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
              >
                <i className="ri-close-line text-2xl text-gray-600"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Images */}
                <div>
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    className="w-full h-96 object-cover rounded-2xl mb-4"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    {selectedProduct.images.map((img: string, idx: number) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${selectedProduct.name} ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                      />
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <div className="mb-4">
                    <span className="inline-block bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                      {selectedProduct.category}
                    </span>
                    {selectedProduct.badge && (
                      <span className="inline-block bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold ml-2">
                        {selectedProduct.badge}
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <i className="ri-building-line text-teal-600"></i>
                    <span className="text-lg text-teal-600 font-semibold">{selectedProduct.company}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center">
                      <i className="ri-star-fill text-yellow-400 text-xl"></i>
                      <span className="ml-1 text-lg font-bold text-gray-900">{selectedProduct.rating}</span>
                    </div>
                    <span className="text-gray-500">({selectedProduct.reviews} avis)</span>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-gray-900">{selectedProduct.price}€</span>
                      {selectedProduct.originalPrice && (
                        <span className="text-xl text-gray-400 line-through">{selectedProduct.originalPrice}€</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Fonctionnalités</h3>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-700">
                          <i className="ri-check-line text-teal-600"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        addToCart(selectedProduct.id);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 whitespace-nowrap"
                    >
                      <i className="ri-shopping-cart-line mr-2"></i>
                      Ajouter au panier
                    </button>
                    <button
                      onClick={() => toggleFavorite(selectedProduct.id)}
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        favorites.includes(selectedProduct.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <i className={`${favorites.includes(selectedProduct.id) ? 'ri-heart-fill' : 'ri-heart-line'} text-2xl`}></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
