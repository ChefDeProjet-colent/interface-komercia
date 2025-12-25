import { useState, useEffect } from 'react';

export default function ProductsCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<Array<{id: number, quantity: number}>>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // All products
  const allProducts = [
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
      category: 'Logiciels',
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
      category: 'Formations',
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
      category: 'Services',
      description: 'Service de comptabilité mensuel pour votre entreprise',
      features: ['Gestion complète', 'Déclarations fiscales', 'Conseils experts', 'Rapport mensuel'],
      images: [
        'https://readdy.ai/api/search-image?query=professional%20accounting%20service%20concept%20with%20calculator%20financial%20documents%20charts%20modern%20office%20setting%20business%20finance%20management&width=400&height=300&seq=prod4&orientation=landscape',
        'https://readdy.ai/api/search-image?query=financial%20reports%20and%20analysis%20documents%20professional%20accounting%20work&width=400&height=300&seq=prod4b&orientation=landscape',
        'https://readdy.ai/api/search-image?query=tax%20declaration%20forms%20professional%20accounting%20service%20documentation&width=400&height=300&seq=prod4c&orientation=landscape'
      ]
    },
    {
      id: 5,
      name: 'Logiciel Gestion Stock',
      company: 'InventoryPro',
      price: 249,
      originalPrice: null,
      rating: 4.6,
      reviews: 134,
      image: 'https://readdy.ai/api/search-image?query=inventory%20management%20software%20interface%20warehouse%20stock%20tracking%20system%20modern%20dashboard%20professional%20business%20tool%20clean%20design&width=400&height=300&seq=prod5&orientation=landscape',
      badge: null,
      category: 'Logiciels',
      description: 'Gérez votre inventaire en temps réel avec notre solution complète',
      features: ['Suivi en temps réel', 'Alertes de stock', 'Rapports automatiques', 'Multi-entrepôts'],
      images: [
        'https://readdy.ai/api/search-image?query=inventory%20management%20software%20interface%20warehouse%20stock%20tracking%20system%20modern%20dashboard%20professional%20business%20tool%20clean%20design&width=400&height=300&seq=prod5&orientation=landscape',
        'https://readdy.ai/api/search-image?query=warehouse%20inventory%20tracking%20dashboard%20with%20real%20time%20data&width=400&height=300&seq=prod5b&orientation=landscape',
        'https://readdy.ai/api/search-image?query=stock%20management%20reports%20and%20analytics%20interface&width=400&height=300&seq=prod5c&orientation=landscape'
      ]
    },
    {
      id: 6,
      name: 'Formation Leadership',
      company: 'LearnPro Academy',
      price: 349,
      originalPrice: 449,
      rating: 4.8,
      reviews: 167,
      image: 'https://readdy.ai/api/search-image?query=leadership%20training%20course%20concept%20professional%20business%20coaching%20team%20management%20skills%20development%20modern%20education%20setting&width=400&height=300&seq=prod6&orientation=landscape',
      badge: '-22%',
      category: 'Formations',
      description: 'Développez vos compétences en leadership et management',
      features: ['15 modules', 'Coaching personnalisé', 'Certification reconnue', 'Accès à vie'],
      images: [
        'https://readdy.ai/api/search-image?query=leadership%20training%20course%20concept%20professional%20business%20coaching%20team%20management%20skills%20development%20modern%20education%20setting&width=400&height=300&seq=prod6&orientation=landscape',
        'https://readdy.ai/api/search-image?query=business%20coaching%20session%20professional%20leadership%20development&width=400&height=300&seq=prod6b&orientation=landscape',
        'https://readdy.ai/api/search-image?query=leadership%20certification%20achievement%20professional%20recognition&width=400&height=300&seq=prod6c&orientation=landscape'
      ]
    },
    {
      id: 7,
      name: 'Mobilier Bureau Premium',
      company: 'OfficePro Supplies',
      price: 899,
      originalPrice: null,
      rating: 4.9,
      reviews: 92,
      image: 'https://readdy.ai/api/search-image?query=premium%20office%20furniture%20set%20ergonomic%20desk%20chair%20modern%20workspace%20professional%20quality%20clean%20design%20comfortable%20business%20environment&width=400&height=300&seq=prod7&orientation=landscape',
      badge: 'Premium',
      category: 'Matériel',
      description: 'Ensemble de mobilier ergonomique haut de gamme',
      features: ['Bureau réglable', 'Chaise ergonomique', 'Garantie 5 ans', 'Livraison gratuite'],
      images: [
        'https://readdy.ai/api/search-image?query=premium%20office%20furniture%20set%20ergonomic%20desk%20chair%20modern%20workspace%20professional%20quality%20clean%20design%20comfortable%20business%20environment&width=400&height=300&seq=prod7&orientation=landscape',
        'https://readdy.ai/api/search-image?query=adjustable%20standing%20desk%20modern%20office%20furniture&width=400&height=300&seq=prod7b&orientation=landscape',
        'https://readdy.ai/api/search-image?query=ergonomic%20office%20chair%20premium%20quality%20comfortable%20design&width=400&height=300&seq=prod7c&orientation=landscape'
      ]
    },
    {
      id: 8,
      name: 'Conseil Stratégique',
      company: 'FinanceExperts Ltd',
      price: 399,
      originalPrice: null,
      rating: 4.7,
      reviews: 145,
      image: 'https://readdy.ai/api/search-image?query=business%20strategy%20consulting%20concept%20professional%20advisors%20meeting%20corporate%20planning%20modern%20office%20setting%20charts%20and%20documents&width=400&height=300&seq=prod8&orientation=landscape',
      badge: null,
      category: 'Services',
      description: 'Accompagnement stratégique personnalisé pour votre entreprise',
      features: ['Audit complet', 'Plan d\'action', 'Suivi mensuel', 'Expertise sectorielle'],
      images: [
        'https://readdy.ai/api/search-image?query=business%20strategy%20consulting%20concept%20professional%20advisors%20meeting%20corporate%20planning%20modern%20office%20setting%20charts%20and%20documents&width=400&height=300&seq=prod8&orientation=landscape',
        'https://readdy.ai/api/search-image?query=business%20audit%20analysis%20professional%20consulting%20work&width=400&height=300&seq=prod8b&orientation=landscape',
        'https://readdy.ai/api/search-image?query=strategic%20planning%20documents%20business%20roadmap%20professional&width=400&height=300&seq=prod8c&orientation=landscape'
      ]
    },
    {
      id: 9,
      name: 'Plateforme E-commerce',
      company: 'TechSolutions Inc.',
      price: 499,
      originalPrice: 699,
      rating: 4.8,
      reviews: 211,
      image: 'https://readdy.ai/api/search-image?query=ecommerce%20platform%20interface%20online%20store%20dashboard%20shopping%20cart%20system%20modern%20web%20design%20professional%20business%20solution&width=400&height=300&seq=prod9&orientation=landscape',
      badge: 'Bestseller',
      category: 'Logiciels',
      description: 'Solution e-commerce complète pour vendre en ligne',
      features: ['Boutique personnalisable', 'Paiement sécurisé', 'Gestion commandes', 'Marketing intégré'],
      images: [
        'https://readdy.ai/api/search-image?query=ecommerce%20platform%20interface%20online%20store%20dashboard%20shopping%20cart%20system%20modern%20web%20design%20professional%20business%20solution&width=400&height=300&seq=prod9&orientation=landscape',
        'https://readdy.ai/api/search-image?query=online%20store%20customization%20interface%20ecommerce%20design%20tools&width=400&height=300&seq=prod9b&orientation=landscape',
        'https://readdy.ai/api/search-image?query=ecommerce%20order%20management%20dashboard%20professional%20system&width=400&height=300&seq=prod9c&orientation=landscape'
      ]
    },
    {
      id: 10,
      name: 'Formation Excel Avancé',
      company: 'LearnPro Academy',
      price: 129,
      originalPrice: null,
      rating: 4.9,
      reviews: 289,
      image: 'https://readdy.ai/api/search-image?query=advanced%20excel%20training%20course%20spreadsheet%20data%20analysis%20professional%20education%20modern%20learning%20environment%20computer%20screen%20showing%20formulas&width=400&height=300&seq=prod10&orientation=landscape',
      badge: 'Populaire',
      category: 'Formations',
      description: 'Maîtrisez Excel et devenez expert en analyse de données',
      features: ['Formules avancées', 'Tableaux croisés', 'Macros VBA', 'Cas pratiques'],
      images: [
        'https://readdy.ai/api/search-image?query=advanced%20excel%20training%20course%20spreadsheet%20data%20analysis%20professional%20education%20modern%20learning%20environment%20computer%20screen%20showing%20formulas&width=400&height=300&seq=prod10&orientation=landscape',
        'https://readdy.ai/api/search-image?query=excel%20pivot%20tables%20advanced%20data%20analysis%20professional&width=400&height=300&seq=prod10b&orientation=landscape',
        'https://readdy.ai/api/search-image?query=excel%20vba%20macros%20programming%20professional%20training&width=400&height=300&seq=prod10c&orientation=landscape'
      ]
    },
    {
      id: 11,
      name: 'Imprimante Multifonction',
      company: 'OfficePro Supplies',
      price: 329,
      originalPrice: 429,
      rating: 4.6,
      reviews: 156,
      image: 'https://readdy.ai/api/search-image?query=professional%20multifunction%20printer%20office%20equipment%20modern%20device%20scanner%20copier%20clean%20design%20business%20technology&width=400&height=300&seq=prod11&orientation=landscape',
      badge: '-23%',
      category: 'Matériel',
      description: 'Imprimante professionnelle avec scanner et copieur intégrés',
      features: ['Impression recto-verso', 'Scanner haute résolution', 'WiFi intégré', 'Économie d\'encre'],
      images: [
        'https://readdy.ai/api/search-image?query=professional%20multifunction%20printer%20office%20equipment%20modern%20device%20scanner%20copier%20clean%20design%20business%20technology&width=400&height=300&seq=prod11&orientation=landscape',
        'https://readdy.ai/api/search-image?query=printer%20scanning%20function%20high%20resolution%20professional%20device&width=400&height=300&seq=prod11b&orientation=landscape',
        'https://readdy.ai/api/search-image?query=wireless%20printer%20connectivity%20modern%20office%20technology&width=400&height=300&seq=prod11c&orientation=landscape'
      ]
    },
    {
      id: 12,
      name: 'Support IT Mensuel',
      company: 'FinanceExperts Ltd',
      price: 199,
      originalPrice: null,
      rating: 4.8,
      reviews: 198,
      image: 'https://readdy.ai/api/search-image?query=it%20support%20service%20concept%20technical%20assistance%20computer%20maintenance%20professional%20help%20desk%20modern%20office%20technology%20support&width=400&height=300&seq=prod12&orientation=landscape',
      badge: null,
      category: 'Services',
      description: 'Support technique informatique pour votre entreprise',
      features: ['Assistance 24/7', 'Maintenance préventive', 'Résolution rapide', 'Conseils experts'],
      images: [
        'https://readdy.ai/api/search-image?query=it%20support%20service%20concept%20technical%20assistance%20computer%20maintenance%20professional%20help%20desk%20modern%20office%20technology%20support&width=400&height=300&seq=prod12&orientation=landscape',
        'https://readdy.ai/api/search-image?query=technical%20support%20team%20professional%20it%20assistance&width=400&height=300&seq=prod12b&orientation=landscape',
        'https://readdy.ai/api/search-image?query=computer%20maintenance%20service%20professional%20it%20work&width=400&height=300&seq=prod12c&orientation=landscape'
      ]
    }
  ];

  // Filter and sort products
  const filteredProducts = allProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = selectedPriceRange === 'all' ||
        (selectedPriceRange === '0-100' && product.price < 100) ||
        (selectedPriceRange === '100-200' && product.price >= 100 && product.price < 200) ||
        (selectedPriceRange === '200-400' && product.price >= 200 && product.price < 400) ||
        (selectedPriceRange === '400+' && product.price >= 400);
      
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviews - a.reviews; // popularity
    });

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

  const cartProducts = cart.map(item => {
    const product = allProducts.find(p => p.id === item.id);
    return { ...product, quantity: item.quantity };
  });

  const cartTotal = cartProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
        isNavbarScrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.REACT_APP_NAVIGATE('/end-customers')}>
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <i className="ri-store-3-fill text-white text-xl"></i>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Komercia
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a 
                onClick={() => window.REACT_APP_NAVIGATE('/end-customers')}
                className="font-medium text-gray-700 hover:text-teal-600 transition-colors cursor-pointer"
              >
                Accueil
              </a>
              <a 
                onClick={() => window.REACT_APP_NAVIGATE('/end-customers/produits')}
                className="font-medium text-teal-600 border-b-2 border-teal-600 pb-1 transition-colors cursor-pointer"
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

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2">
                <i className="ri-search-line text-gray-600 mr-2"></i>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none w-48 text-sm text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Favorites */}
              <button
                onClick={() => setIsFavoritesOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
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
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
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
                className="md:hidden p-2 text-gray-700"
              >
                <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="flex flex-col gap-3">
                <a 
                  onClick={() => window.REACT_APP_NAVIGATE('/end-customers')}
                  className="font-medium text-gray-700 hover:text-teal-600 transition-colors cursor-pointer"
                >
                  Accueil
                </a>
                <a 
                  onClick={() => window.REACT_APP_NAVIGATE('/end-customers/produits')}
                  className="font-medium text-teal-600 transition-colors cursor-pointer"
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
          )}
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/end-customers" className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors">
              <i className="ri-arrow-left-line text-xl"></i>
              <span className="font-medium">Retour</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Catalogue Produits</h1>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <i className="ri-heart-line text-2xl text-gray-700"></i>
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {favorites.length}
                  </span>
                )}
              </button>
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <i className="ri-shopping-cart-line text-2xl text-gray-700"></i>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Filtres</h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Nom, entreprise..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                  <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Catégories</label>
                <div className="space-y-2">
                  {selectedCategory === 'all' ? (
                    <button
                      key="all"
                      onClick={() => setSelectedCategory('all')}
                      className="w-full text-left px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-gray-700 hover:bg-gray-50"
                    >
                      Toutes les catégories
                    </button>
                  ) : (
                    <button
                      key="all"
                      onClick={() => setSelectedCategory('all')}
                      className="w-full text-left px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-gray-700 hover:bg-gray-50"
                    >
                      Toutes les catégories
                    </button>
                  )}
                  {selectedCategory === 'all' ? (
                    <button
                      key="logiciels"
                      onClick={() => setSelectedCategory('logiciels')}
                      className="w-full text-left px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-gray-700 hover:bg-gray-50"
                    >
                      Logiciels
                    </button>
                  ) : (
                    <button
                      key="logiciels"
                      onClick={() => setSelectedCategory('logiciels')}
                      className="w-full text-left px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-gray-700 hover:bg-gray-50"
                    >
                      Logiciels
                    </button>
                  )}
                  {selectedCategory === 'all' ? (
                    <button
                      key="formations"
                      onClick={() => setSelectedCategory('formations')}
                      className="w-full text-left px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-gray-700 hover:bg-gray-50"
                    >
                      Formations
                    </button>
                  ) : (
                    <button
                      key="formations"
                      onClick={() => setSelectedCategory('formations')}
                      className="w-full text-left px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-gray-700 hover:bg-gray-50"
                    >
                      Formations
                    </button>
                  )}
                  {selectedCategory === 'all' ? (
                    <button
                      key="services"
                      onClick={() => setSelectedCategory('services')}
                      className="w-full text-left px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-gray-700 hover:bg-gray-50"
                    >
                      Services
                    </button>
                  ) : (
                    <button
                      key="services"
                      onClick={() => setSelectedCategory('services')}
                      className="w-full text-left px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-gray-700 hover:bg-gray-50"
                    >
                      Services
                    </button>
                  )}
                  {selectedCategory === 'all' ? (
                    <button
                      key="matériel"
                      onClick={() => setSelectedCategory('matériel')}
                      className="w-full text-left px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-gray-700 hover:bg-gray-50"
                    >
                      Matériel
                    </button>
                  ) : (
                    <button
                      key="matériel"
                      onClick={() => setSelectedCategory('matériel')}
                      className="w-full text-left px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-gray-700 hover:bg-gray-50"
                    >
                      Matériel
                    </button>
                  )}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Prix</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedPriceRange('all')}
                    className="w-full text-left px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-gray-700 hover:bg-gray-50"
                  >
                    Tous les prix
                  </button>
                  <button
                    onClick={() => setSelectedPriceRange('0-100')}
                    className="w-full text-left px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-gray-700 hover:bg-gray-50"
                  >
                    Moins de 100€
                  </button>
                  <button
                    onClick={() => setSelectedPriceRange('100-200')}
                    className="w-full text-left px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-gray-700 hover:bg-gray-50"
                  >
                    100€ - 200€
                  </button>
                  <button
                    onClick={() => setSelectedPriceRange('200-400')}
                    className="w-full text-left px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-gray-700 hover:bg-gray-50"
                  >
                    200€ - 400€
                  </button>
                  <button
                    onClick={() => setSelectedPriceRange('400+')}
                    className="w-full text-left px-4 py-2 rounded-lg transition-colors whitespace-nowrap text-gray-700 hover:bg-gray-50"
                  >
                    Plus de 400€
                  </button>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedPriceRange('all');
                  setSearchQuery('');
                }}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium whitespace-nowrap"
              >
                Réinitialiser
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{filteredProducts.length}</span> produits trouvés
              </p>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Trier par:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                >
                  <option value="popularity">Popularité</option>
                  <option value="rating">Meilleures notes</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                </select>
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-teal-500 text-white text-xs font-semibold rounded-full">
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                        className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
                          favorites.includes(product.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-red-50'
                        }`}
                      >
                        <i className={favorites.includes(product.id) ? 'ri-heart-fill' : 'ri-heart-line'}></i>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product.id);
                        }}
                        className="w-9 h-9 flex items-center justify-center bg-white text-gray-700 rounded-full hover:bg-teal-50 transition-colors"
                      >
                        <i className="ri-shopping-cart-line"></i>
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs text-teal-600 font-medium mb-1">{product.company}</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-teal-600 transition-colors" onClick={() => setSelectedProduct(product)}>
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <i className="ri-star-fill text-yellow-400 text-sm"></i>
                        <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews} avis)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">{product.price}€</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">{product.originalPrice}€</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium text-sm whitespace-nowrap"
                      >
                        Voir détails
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-600">Essayez de modifier vos filtres de recherche</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900">Détails du produit</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              >
                <i className="ri-close-line text-2xl text-gray-600"></i>
              </button>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Images */}
                <div>
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    className="w-full h-80 object-cover rounded-xl mb-4"
                  />
                  <div className="grid grid-cols-3 gap-3">
                    {selectedProduct.images.slice(1).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${selectedProduct.name} ${idx + 2}`}
                        className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                      />
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <p className="text-sm text-teal-600 font-medium mb-2">{selectedProduct.company}</p>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h3>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-400"></i>
                      <span className="font-semibold text-gray-900">{selectedProduct.rating}</span>
                    </div>
                    <span className="text-gray-500">({selectedProduct.reviews} avis)</span>
                    {selectedProduct.badge && (
                      <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">
                        {selectedProduct.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{selectedProduct.description}</p>

                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3">Fonctionnalités:</h4>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-700">
                          <i className="ri-check-line text-teal-500"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl font-bold text-gray-900">{selectedProduct.price}€</span>
                    {selectedProduct.originalPrice && (
                      <span className="text-xl text-gray-400 line-through">{selectedProduct.originalPrice}€</span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        addToCart(selectedProduct.id);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors font-semibold whitespace-nowrap"
                    >
                      Ajouter au panier
                    </button>
                    <button
                      onClick={() => toggleFavorite(selectedProduct.id)}
                      className={`px-6 py-3 rounded-xl transition-colors font-semibold whitespace-nowrap ${
                        favorites.includes(selectedProduct.id)
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <i className={favorites.includes(selectedProduct.id) ? 'ri-heart-fill' : 'ri-heart-line'}></i>
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