
import { useState, useEffect } from 'react';
import { useAdManager } from '../../components/feature/AdManager';
import AdBanner from '../../components/feature/AdBanner';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import Badge from '../../components/base/Badge';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  availability: 'en-stock' | 'rupture' | 'sur-commande';
  visibility: 'public' | 'prive';
  views: number;
  clicks: number;
  sales: number;
  category: string;
}

interface Commercial {
  id: string;
  name: string;
  specialization: string;
  location: string;
  rating: number;
  experience: string;
  avatar: string;
  status: 'disponible' | 'occupe';
  completedSales: number;
  description: string;
}

interface Sale {
  id: string;
  productName: string;
  amount: number;
  date: string;
  paymentStatus: 'recu' | 'en-attente' | 'echec';
  paymentMethod: 'especes' | 'mobile' | 'carte' | 'virement';
  customerName: string;
  quantity: number;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalPurchases: number;
  lastPurchase: string;
  notes: string;
  status: 'actif' | 'inactif';
}

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'haute' | 'moyenne' | 'basse';
  status: 'en-cours' | 'termine' | 'en-retard';
  type: 'rendez-vous' | 'relance' | 'livraison' | 'autre';
}

interface Notification {
  id: string;
  type: 'vente' | 'commercial' | 'stock' | 'paiement' | 'tache';
  title: string;
  message: string;
  time: string;
  isNew: boolean;
}

export default function MerchantsPage() {
  const { trackAction } = useAdManager();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCommercialModal, setShowCommercialModal] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [selectedCommercial, setSelectedCommercial] = useState<Commercial | null>(null);

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      title: 'Bijoux Artisanaux',
      description: 'Colliers et bracelets faits main avec des perles locales',
      price: 25,
      image: 'https://readdy.ai/api/search-image?query=handmade%20jewelry%20colorful%20beads%20necklaces%20bracelets%20artisan%20craft%20simple%20white%20background%20studio%20lighting&width=300&height=200&seq=1&orientation=landscape',
      availability: 'en-stock',
      visibility: 'public',
      views: 156,
      clicks: 23,
      sales: 8,
      category: 'Artisanat'
    },
    {
      id: '2',
      title: 'Légumes Bio du Jardin',
      description: 'Tomates, courgettes et herbes fraîches cultivées sans pesticides',
      price: 15,
      image: 'https://readdy.ai/api/search-image?query=fresh%20organic%20vegetables%20tomatoes%20zucchini%20herbs%20garden%20produce%20clean%20white%20background%20natural%20lighting%20healthy%20food&width=300&height=200&seq=2&orientation=landscape',
      availability: 'en-stock',
      visibility: 'public',
      views: 89,
      clicks: 34,
      sales: 12,
      category: 'Alimentation'
    },
    {
      id: '3',
      title: 'Réparation Téléphones',
      description: 'Service de réparation rapide pour smartphones et tablettes',
      price: 45,
      image: 'https://readdy.ai/api/search-image?query=smartphone%20repair%20service%20tools%20screwdriver%20phone%20parts%20technical%20clean%20workspace%20white%20background%20professional%20lighting&width=300&height=200&seq=3&orientation=landscape',
      availability: 'sur-commande',
      visibility: 'public',
      views: 203,
      clicks: 67,
      sales: 15,
      category: 'Services'
    }
  ]);

  const [commercials] = useState<Commercial[]>([
    {
      id: '1',
      name: 'Sophie Martin',
      specialization: 'Produits Artisanaux',
      location: 'Paris 11ème',
      rating: 4.8,
      experience: '3 ans',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20young%20woman%20smiling%20friendly%20approachable%20business%20casual%20clothing%20clean%20background%20portrait%20photography&width=100&height=100&seq=4&orientation=squarish',
      status: 'disponible',
      completedSales: 127,
      description: 'Spécialisée dans la vente de produits artisanaux et créatifs. Excellente connaissance du marché local.'
    },
    {
      id: '2',
      name: 'Ahmed Benali',
      specialization: 'Alimentation Bio',
      location: 'Lyon 3ème',
      rating: 4.9,
      experience: '5 ans',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20middle-aged%20man%20confident%20smile%20business%20casual%20clothing%20clean%20background%20portrait%20photography%20diverse&width=100&height=100&seq=5&orientation=squarish',
      status: 'disponible',
      completedSales: 89,
      description: 'Expert en produits bio et locaux. Réseau étendu de clients soucieux de leur alimentation.'
    },
    {
      id: '3',
      name: 'Marie Dubois',
      specialization: 'Services Techniques',
      location: 'Marseille 2ème',
      rating: 4.7,
      experience: '4 ans',
      avatar: 'https://readdy.ai/api/search-image?query=professional%20woman%20technician%20confident%20smile%20work%20clothing%20clean%20background%20portrait%20photography%20skilled%20worker&width=100&height=100&seq=6&orientation=squarish',
      status: 'occupe',
      completedSales: 156,
      description: 'Spécialisée dans la promotion de services techniques et de réparation.'
    }
  ]);

  const [sales, setSales] = useState<Sale[]>([
    {
      id: '1',
      productName: 'Bijoux Artisanaux',
      amount: 25,
      date: '2024-01-15',
      paymentStatus: 'recu',
      paymentMethod: 'mobile',
      customerName: 'Marie Dupont',
      quantity: 1
    },
    {
      id: '2',
      productName: 'Légumes Bio du Jardin',
      amount: 45,
      date: '2024-01-14',
      paymentStatus: 'recu',
      paymentMethod: 'especes',
      customerName: 'Jean Martin',
      quantity: 3
    },
    {
      id: '3',
      productName: 'Réparation Téléphones',
      amount: 45,
      date: '2024-01-13',
      paymentStatus: 'en-attente',
      paymentMethod: 'virement',
      customerName: 'Sophie Leroy',
      quantity: 1
    },
    {
      id: '4',
      productName: 'Bijoux Artisanaux',
      amount: 50,
      date: '2024-01-12',
      paymentStatus: 'recu',
      paymentMethod: 'carte',
      customerName: 'Pierre Dubois',
      quantity: 2
    },
    {
      id: '5',
      productName: 'Légumes Bio du Jardin',
      amount: 30,
      date: '2024-01-11',
      paymentStatus: 'echec',
      paymentMethod: 'mobile',
      customerName: 'Claire Bernard',
      quantity: 2
    }
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Marie Dupont',
      phone: '06 12 34 56 78',
      email: 'marie.dupont@email.com',
      totalPurchases: 125,
      lastPurchase: '2024-01-15',
      notes: 'Cliente fidèle, préfère les bijoux colorés',
      status: 'actif'
    },
    {
      id: '2',
      name: 'Jean Martin',
      phone: '06 23 45 67 89',
      totalPurchases: 89,
      lastPurchase: '2024-01-14',
      notes: 'Achète régulièrement des légumes bio',
      status: 'actif'
    },
    {
      id: '3',
      name: 'Sophie Leroy',
      phone: '06 34 56 78 90',
      email: 'sophie.leroy@email.com',
      totalPurchases: 45,
      lastPurchase: '2024-01-13',
      notes: 'Réparation téléphone en cours',
      status: 'actif'
    },
    {
      id: '4',
      name: 'Pierre Dubois',
      phone: '06 45 67 89 01',
      totalPurchases: 156,
      lastPurchase: '2024-01-12',
      notes: 'Gros acheteur, commandes importantes',
      status: 'actif'
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Rendez-vous avec Marie Dupont',
      description: 'Présentation nouvelle collection bijoux',
      dueDate: '2024-01-20',
      priority: 'haute',
      status: 'en-cours',
      type: 'rendez-vous'
    },
    {
      id: '2',
      title: 'Relance paiement Sophie Leroy',
      description: 'Paiement réparation téléphone en attente',
      dueDate: '2024-01-18',
      priority: 'moyenne',
      status: 'en-cours',
      type: 'relance'
    },
    {
      id: '3',
      title: 'Livraison légumes bio',
      description: 'Livraison commande Jean Martin',
      dueDate: '2024-01-16',
      priority: 'haute',
      status: 'en-retard',
      type: 'livraison'
    },
    {
      id: '4',
      title: 'Mise à jour photos produits',
      description: 'Prendre nouvelles photos bijoux',
      dueDate: '2024-01-22',
      priority: 'basse',
      status: 'en-cours',
      type: 'autre'
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    availability: 'en-stock' as const
  });

  const [newSale, setNewSale] = useState({
    productName: '',
    amount: '',
    customerName: '',
    quantity: '1',
    paymentMethod: 'especes' as const
  });

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'moyenne' as const,
    type: 'autre' as const
  });

  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'vente',
      title: 'Nouvelle vente réalisée',
      message: 'Bijoux Artisanaux vendus à Marie Dupont - 25€',
      time: 'Il y a 5 min',
      isNew: true
    },
    {
      id: '2',
      type: 'commercial',
      title: 'Nouveau commercial disponible',
      message: 'Sophie Martin - Spécialiste Produits Artisanaux',
      time: 'Il y a 15 min',
      isNew: true
    },
    {
      id: '3',
      type: 'paiement',
      title: 'Paiement en attente',
      message: 'Réparation téléphone - Sophie Leroy - 45€',
      time: 'Il y a 1h',
      isNew: true
    },
    {
      id: '4',
      type: 'stock',
      title: 'Stock faible',
      message: 'Légumes Bio du Jardin - Plus que 2 unités',
      time: 'Il y a 2h',
      isNew: false
    },
    {
      id: '5',
      type: 'tache',
      title: 'Tâche en retard',
      message: 'Livraison légumes bio à Jean Martin',
      time: 'Il y a 3h',
      isNew: false
    },
    {
      id: '6',
      type: 'commercial',
      title: 'Message de commercial',
      message: 'Ahmed Benali souhaite promouvoir vos légumes bio',
      time: 'Hier',
      isNew: false
    }
  ]);

  useEffect(() => {
    trackAction('view-merchants-dashboard');
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    trackAction(`view-merchants-${tab}`);
  };

  const handleAddProduct = () => {
    if (newProduct.title && newProduct.description && newProduct.price) {
      const product: Product = {
        id: Date.now().toString(),
        title: newProduct.title,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        image: 'https://readdy.ai/api/search-image?query=product%20placeholder%20simple%20clean%20white%20background%20minimal%20design&width=300&height=200&seq=7&orientation=landscape',
        availability: newProduct.availability,
        visibility: 'public',
        views: 0,
        clicks: 0,
        sales: 0,
        category: newProduct.category
      };
      setProducts([...products, product]);
      setNewProduct({ title: '', description: '', price: '', category: '', availability: 'en-stock' });
      setShowProductModal(false);
      trackAction('add-product');
    }
  };

  const handleAddSale = () => {
    if (newSale.productName && newSale.amount && newSale.customerName) {
      const sale: Sale = {
        id: Date.now().toString(),
        productName: newSale.productName,
        amount: parseFloat(newSale.amount),
        date: new Date().toISOString().split('T')[0],
        paymentStatus: 'recu',
        paymentMethod: newSale.paymentMethod,
        customerName: newSale.customerName,
        quantity: parseInt(newSale.quantity)
      };
      setSales([sale, ...sales]);
      setNewSale({ productName: '', amount: '', customerName: '', quantity: '1', paymentMethod: 'especes' });
      setShowSaleModal(false);
      trackAction('add-sale');
    }
  };

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.phone) {
      const customer: Customer = {
        id: Date.now().toString(),
        name: newCustomer.name,
        phone: newCustomer.phone,
        email: newCustomer.email,
        totalPurchases: 0,
        lastPurchase: '',
        notes: newCustomer.notes,
        status: 'actif'
      };
      setCustomers([...customers, customer]);
      setNewCustomer({ name: '', phone: '', email: '', notes: '' });
      setShowCustomerModal(false);
      trackAction('add-customer');
    }
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.dueDate) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        status: 'en-cours',
        type: newTask.type
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '', dueDate: '', priority: 'moyenne', type: 'autre' });
      setShowTaskModal(false);
      trackAction('add-task');
    }
  };

  const handleContactCommercial = (commercial: Commercial) => {
    setSelectedCommercial(commercial);
    setShowCommercialModal(true);
    trackAction('contact-commercial');
  };

  const getAvailabilityBadge = (availability: string) => {
    const badges = {
      'en-stock': 'bg-green-100 text-green-800',
      'rupture': 'bg-red-100 text-red-800',
      'sur-commande': 'bg-orange-100 text-orange-800'
    };
    const labels = {
      'en-stock': 'En Stock',
      'rupture': 'Rupture',
      'sur-commande': 'Sur Commande'
    };
    return { class: badges[availability as keyof typeof badges], label: labels[availability as keyof typeof labels] };
  };

  const getPaymentStatusBadge = (status: string) => {
    const badges = {
      'recu': 'bg-green-100 text-green-800',
      'en-attente': 'bg-orange-100 text-orange-800',
      'echec': 'bg-red-100 text-red-800'
    };
    const labels = {
      'recu': 'Reçu',
      'en-attente': 'En Attente',
      'echec': 'Échec'
    };
    return { class: badges[status as keyof typeof badges], label: labels[status as keyof typeof labels] };
  };

  const getPaymentMethodIcon = (method: string) => {
    const icons = {
      'especes': 'ri-money-euro-circle-line',
      'mobile': 'ri-smartphone-line',
      'carte': 'ri-bank-card-line',
      'virement': 'ri-bank-line'
    };
    return icons[method as keyof typeof icons] || 'ri-money-euro-circle-line';
  };

  const getPriorityBadge = (priority: string) => {
    const badges = {
      'haute': 'bg-red-100 text-red-800',
      'moyenne': 'bg-orange-100 text-orange-800',
      'basse': 'bg-green-100 text-green-800'
    };
    const labels = {
      'haute': 'Haute',
      'moyenne': 'Moyenne',
      'basse': 'Basse'
    };
    return { class: badges[priority as keyof typeof badges], label: labels[priority as keyof typeof labels] };
  };

  const getTaskStatusBadge = (status: string) => {
    const badges = {
      'en-cours': 'bg-blue-100 text-blue-800',
      'termine': 'bg-green-100 text-green-800',
      'en-retard': 'bg-red-100 text-red-800'
    };
    const labels = {
      'en-cours': 'En Cours',
      'termine': 'Terminé',
      'en-retard': 'En Retard'
    };
    return { class: badges[status as keyof typeof badges], label: labels[status as keyof typeof labels] };
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'vente': return 'ri-shopping-cart-line';
      case 'commercial': return 'ri-team-line';
      case 'stock': return 'ri-archive-line';
      case 'paiement': return 'ri-money-euro-circle-line';
      case 'tache': return 'ri-task-line';
      default: return 'ri-notification-line';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'vente': return 'text-green-600';
      case 'commercial': return 'text-blue-600';
      case 'stock': return 'text-orange-600';
      case 'paiement': return 'text-purple-600';
      case 'tache': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleNotificationClick = () => {
    setShowNotificationPanel(true);
    trackAction('view-notifications');
  };

  const totalProducts = products.length;
  const totalViews = products.reduce((sum, p) => sum + p.views, 0);
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);
  const totalRevenue = products.reduce((sum, p) => sum + (p.sales * p.price), 0);
  const totalSalesAmount = sales.filter(s => s.paymentStatus === 'recu').reduce((sum, s) => sum + s.amount, 0);
  const pendingPayments = sales.filter(s => s.paymentStatus === 'en-attente').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation simplifiée */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <i className="ri-store-2-line text-2xl text-blue-600"></i>
                <span className="text-xl font-bold text-gray-900" style={{ fontFamily: '"Pacifico", serif' }}>Komercia</span>
              </div>
              <span className="text-sm text-gray-500">Espace Commerçants</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="outline" size="sm" onClick={handleNotificationClick}>
                  <i className="ri-notification-line mr-2"></i>
                  Notifications
                  {notifications.filter(n => n.isNew).length > 0 && (
                    <Badge variant="danger" className="ml-2">
                      {notifications.filter(n => n.isNew).length}
                    </Badge>
                  )}
                </Button>
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <i className="ri-user-line text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Tableau de Bord', icon: 'ri-dashboard-line' },
              { id: 'products', label: 'Mes Produits', icon: 'ri-shopping-bag-line' },
              { id: 'commercials', label: 'Commerciaux', icon: 'ri-team-line' },
              { id: 'sales', label: 'Ventes & Paiements', icon: 'ri-money-euro-circle-line' },
              { id: 'management', label: 'Gestion', icon: 'ri-settings-3-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bannière publicitaire principale */}
        <AdBanner 
          position="merchants-main" 
          format="banner"
          section="merchants"
          className="mb-8"
        />

        {/* Tableau de Bord Principal */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord</h1>
              <p className="text-gray-600 mt-1">Bienvenue dans votre espace commerçant</p>
            </div>

            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <i className="ri-shopping-bag-line text-white"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Produits</p>
                    <p className="text-2xl font-semibold text-gray-900">{totalProducts}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                      <i className="ri-eye-line text-white"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Vues Totales</p>
                    <p className="text-2xl font-semibold text-gray-900">{totalViews}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <i className="ri-shopping-cart-line text-white"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Ventes</p>
                    <p className="text-2xl font-semibold text-gray-900">{totalSales}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                      <i className="ri-money-euro-circle-line text-white"></i>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Revenus</p>
                    <p className="text-2xl font-semibold text-gray-900">{totalSalesAmount}€</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Notifications et accès rapide */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">Nouveau commercial disponible</p>
                      <p className="text-xs text-gray-500">Sophie Martin - Spécialiste Artisanat</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">Vente réalisée</p>
                      <p className="text-xs text-gray-500">Bijoux Artisanaux - 25€</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">Paiement en attente</p>
                      <p className="text-xs text-gray-500">{pendingPayments} paiement(s) à suivre</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Accès Rapide</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={() => handleTabChange('products')}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <i className="ri-add-line text-xl"></i>
                    <span className="text-sm">Ajouter Produit</span>
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleTabChange('commercials')}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <i className="ri-search-line text-xl"></i>
                    <span className="text-sm">Trouver Commercial</span>
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleTabChange('sales')}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <i className="ri-money-euro-circle-line text-xl"></i>
                    <span className="text-sm">Ventes & Paiements</span>
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleTabChange('management')}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <i className="ri-settings-3-line text-xl"></i>
                    <span className="text-sm">Gestion</span>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Section Produits et Services */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mes Produits et Services</h1>
                <p className="text-gray-600 mt-1">Gérez vos offres et suivez leurs performances</p>
              </div>
              <Button onClick={() => setShowProductModal(true)}>
                <i className="ri-add-line mr-2"></i>
                Ajouter un Produit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => {
                const badge = getAvailabilityBadge(product.availability);
                return (
                  <Card key={product.id} className="overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-48 object-cover object-top"
                    />
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{product.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${badge.class}`}>
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-blue-600">{product.price}€</span>
                        <span className="text-sm text-gray-500">{product.category}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center text-sm">
                        <div>
                          <p className="font-semibold text-gray-900">{product.views}</p>
                          <p className="text-gray-500">Vues</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{product.clicks}</p>
                          <p className="text-gray-500">Clics</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{product.sales}</p>
                          <p className="text-gray-500">Ventes</p>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <i className="ri-edit-line mr-1"></i>
                          Modifier
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <i className="ri-share-line mr-1"></i>
                          Partager
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Bannière publicitaire pour outils de création */}
            <AdBanner 
              position="merchants-products" 
              format="banner"
              section="products"
              className="mt-8"
            />
          </div>
        )}

        {/* Section Commerciaux */}
        {activeTab === 'commercials' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Commerciaux Disponibles</h1>
              <p className="text-gray-600 mt-1">Trouvez des commerciaux pour promouvoir vos produits</p>
            </div>

            {/* Filtres */}
            <Card className="p-4">
              <div className="flex flex-wrap gap-4">
                <select className="border border-gray-300 rounded-lg px-3 py-2 pr-8">
                  <option>Toutes spécialisations</option>
                  <option>Produits Artisanaux</option>
                  <option>Alimentation Bio</option>
                  <option>Services Techniques</option>
                </select>
                <select className="border border-gray-300 rounded-lg px-3 py-2 pr-8">
                  <option>Toutes localisations</option>
                  <option>Paris</option>
                  <option>Lyon</option>
                  <option>Marseille</option>
                </select>
                <select className="border border-gray-300 rounded-lg px-3 py-2 pr-8">
                  <option>Tous statuts</option>
                  <option>Disponible</option>
                  <option>Occupé</option>
                </select>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {commercials.map((commercial) => (
                <Card key={commercial.id} className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img 
                      src={commercial.avatar} 
                      alt={commercial.name}
                      className="w-16 h-16 rounded-full object-cover object-top"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{commercial.name}</h3>
                      <p className="text-sm text-gray-600">{commercial.specialization}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <i 
                              key={i} 
                              className={`ri-star-${i < Math.floor(commercial.rating) ? 'fill' : 'line'} text-yellow-400 text-sm`}
                            ></i>
                          ))}
                          <span className="text-sm text-gray-500 ml-1">{commercial.rating}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      commercial.status === 'disponible' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {commercial.status === 'disponible' ? 'Disponible' : 'Occupé'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-map-pin-line mr-2"></i>
                      {commercial.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-time-line mr-2"></i>
                      {commercial.experience} d'expérience
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="ri-trophy-line mr-2"></i>
                      {commercial.completedSales} ventes réalisées
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{commercial.description}</p>

                  <Button 
                    onClick={() => handleContactCommercial(commercial)}
                    disabled={commercial.status === 'occupe'}
                    className="w-full"
                  >
                    <i className="ri-message-line mr-2"></i>
                    {commercial.status === 'disponible' ? 'Contacter' : 'Non disponible'}
                  </Button>
                </Card>
              ))}
            </div>

            {/* Bannière publicitaire pour formations */}
            <AdBanner 
              position="merchants-commercials" 
              format="popup"
              section="commercials"
              className="mt-8"
            />
          </div>
        )}

        {/* Section Ventes et Paiements */}
        {activeTab === 'sales' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Ventes et Paiements</h1>
                <p className="text-gray-600 mt-1">Suivez vos ventes et gérez vos paiements</p>
              </div>
              <Button onClick={() => setShowSaleModal(true)}>
                <i className="ri-add-line mr-2"></i>
                Enregistrer une Vente
              </Button>
            </div>

            {/* Résumé des ventes et paiements */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-money-euro-circle-line text-white text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{totalSalesAmount}€</h3>
                <p className="text-gray-600">Revenus Totaux</p>
                <p className="text-sm text-green-600 mt-1">+15% ce mois</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-shopping-cart-line text-white text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{sales.length}</h3>
                <p className="text-gray-600">Ventes Totales</p>
                <p className="text-sm text-blue-600 mt-1">+3 cette semaine</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-time-line text-white text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{pendingPayments}</h3>
                <p className="text-gray-600">Paiements en Attente</p>
                <p className="text-sm text-orange-600 mt-1">À suivre</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-smartphone-line text-white text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {sales.filter(s => s.paymentMethod === 'mobile').length}
                </h3>
                <p className="text-gray-600">Paiements Mobiles</p>
                <p className="text-sm text-purple-600 mt-1">Mode moderne</p>
              </Card>
            </div>

            {/* Liste des ventes */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique des Ventes</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Produit</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Client</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Montant</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Paiement</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((sale) => {
                      const statusBadge = getPaymentStatusBadge(sale.paymentStatus);
                      return (
                        <tr key={sale.id} className="border-b border-gray-100">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-gray-900">{sale.productName}</p>
                              <p className="text-sm text-gray-500">Qté: {sale.quantity}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-900">{sale.customerName}</td>
                          <td className="py-3 px-4 font-semibold text-gray-900">{sale.amount}€</td>
                          <td className="py-3 px-4 text-gray-600">{sale.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <i className={`${getPaymentMethodIcon(sale.paymentMethod)} text-gray-600`}></i>
                              <span className="text-sm text-gray-600 capitalize">{sale.paymentMethod}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${statusBadge.class}`}>
                              {statusBadge.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Produits les plus vendus */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Produits les Plus Vendus</h3>
              <div className="space-y-4">
                {products
                  .sort((a, b) => b.sales - a.sales)
                  .slice(0, 3)
                  .map((product, index) => (
                    <div key={product.id} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                        }`}>
                          {index + 1}
                        </span>
                      </div>
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-12 h-12 rounded-lg object-cover object-top"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.title}</h4>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{product.sales} ventes</p>
                        <p className="text-sm text-gray-500">{product.sales * product.price}€</p>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>

            {/* Bannière publicitaire pour solutions de paiement */}
            <AdBanner 
              position="merchants-payments" 
              format="banner"
              section="payments"
              className="mt-8"
            />
          </div>
        )}

        {/* Section Outils de Gestion */}
        {activeTab === 'management' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Outils de Gestion Simplifiés</h1>
              <p className="text-gray-600 mt-1">Gérez votre activité avec des outils adaptés</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Agenda intégré */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Agenda et Tâches</h3>
                  <Button size="sm" onClick={() => setShowTaskModal(true)}>
                    <i className="ri-add-line mr-2"></i>
                    Ajouter Tâche
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {tasks.slice(0, 4).map((task) => {
                    const priorityBadge = getPriorityBadge(task.priority);
                    const statusBadge = getTaskStatusBadge(task.status);
                    return (
                      <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          <div className="flex space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${priorityBadge.class}`}>
                              {priorityBadge.label}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded ${statusBadge.class}`}>
                              {statusBadge.label}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2 text-gray-500">
                            <i className="ri-calendar-line"></i>
                            <span>{task.dueDate}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-500">
                            <i className="ri-bookmark-line"></i>
                            <span className="capitalize">{task.type}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Gestion des clients */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Mes Clients</h3>
                  <Button size="sm" onClick={() => setShowCustomerModal(true)}>
                    <i className="ri-add-line mr-2"></i>
                    Ajouter Client
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {customers.slice(0, 4).map((customer) => (
                    <div key={customer.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{customer.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          customer.status === 'actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {customer.status === 'actif' ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <i className="ri-phone-line"></i>
                          <span>{customer.phone}</span>
                        </div>
                        {customer.email && (
                          <div className="flex items-center space-x-2">
                            <i className="ri-mail-line"></i>
                            <span>{customer.email}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-medium text-gray-900">{customer.totalPurchases}€ d'achats</span>
                          {customer.lastPurchase && (
                            <span className="text-xs text-gray-500">Dernier achat: {customer.lastPurchase}</span>
                          )}
                        </div>
                      </div>
                      {customer.notes && (
                        <p className="text-sm text-gray-600 mt-2 italic">"{customer.notes}"</p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Rapports simplifiés */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rapports Simplifiés</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="ri-calendar-week-line text-white text-2xl"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900">Rapport Hebdomadaire</h4>
                  <p className="text-sm text-gray-600 mb-3">Ventes et performances de la semaine</p>
                  <Button size="sm" variant="outline">
                    <i className="ri-download-line mr-2"></i>
                    Télécharger
                  </Button>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="ri-calendar-month-line text-white text-2xl"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900">Rapport Mensuel</h4>
                  <p className="text-sm text-gray-600 mb-3">Analyse complète du mois</p>
                  <Button size="sm" variant="outline">
                    <i className="ri-download-line mr-2"></i>
                    Télécharger
                  </Button>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="ri-file-excel-line text-white text-2xl"></i>
                  </div>
                  <h4 className="font-semibold text-gray-900">Export Données</h4>
                  <p className="text-sm text-gray-600 mb-3">Toutes vos données en Excel</p>
                  <Button size="sm" variant="outline">
                    <i className="ri-download-line mr-2"></i>
                    Exporter
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Résumé de Performance</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{totalSalesAmount}€</p>
                    <p className="text-sm text-gray-600">Revenus ce mois</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{sales.length}</p>
                    <p className="text-sm text-gray-600">Ventes réalisées</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{customers.length}</p>
                    <p className="text-sm text-gray-600">Clients actifs</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{tasks.filter(t => t.status === 'en-cours').length}</p>
                    <p className="text-sm text-gray-600">Tâches en cours</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Bannière publicitaire pour outils de gestion */}
            <AdBanner 
              position="merchants-management" 
              format="animated"
              section="management"
              className="mt-8"
            />
          </div>
        )}
      </div>

      {/* Panneau de Notifications */}
      {showNotificationPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <Badge variant="info">{notifications.filter(n => n.isNew).length} nouvelles</Badge>
              </div>
              <button 
                onClick={() => setShowNotificationPanel(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-colors hover:bg-gray-50 cursor-pointer ${
                      notification.isNew ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notification.isNew ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <i className={`${getNotificationIcon(notification.type)} ${getNotificationColor(notification.type)} text-lg`}></i>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          {notification.isNew && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    // Marquer toutes comme lues
                    setShowNotificationPanel(false);
                  }}
                >
                  Marquer comme lues
                </Button>
                <Button 
                  size="sm"
                  className="flex-1"
                  onClick={() => setShowNotificationPanel(false)}
                >
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ajout Produit */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Ajouter un Produit</h3>
              <button 
                onClick={() => setShowProductModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input
                  type="text"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Nom de votre produit/service"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows={3}
                  placeholder="Décrivez votre produit/service"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8"
                  >
                    <option value="">Choisir</option>
                    <option value="Artisanat">Artisanat</option>
                    <option value="Alimentation">Alimentation</option>
                    <option value="Services">Services</option>
                    <option value="Mode">Mode</option>
                    <option value="Beauté">Beauté</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Disponibilité</label>
                <select
                  value={newProduct.availability}
                  onChange={(e) => setNewProduct({...newProduct, availability: e.target.value as any})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8"
                >
                  <option value="en-stock">En Stock</option>
                  <option value="rupture">Rupture</option>
                  <option value="sur-commande">Sur Commande</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowProductModal(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button 
                onClick={handleAddProduct}
                className="flex-1"
              >
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ajout Vente */}
      {showSaleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Enregistrer une Vente</h3>
              <button 
                onClick={() => setShowSaleModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Produit/Service</label>
                <select
                  value={newSale.productName}
                  onChange={(e) => setNewSale({...newSale, productName: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8"
                >
                  <option value="">Choisir un produit</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.title}>{product.title}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Client</label>
                <input
                  type="text"
                  value={newSale.customerName}
                  onChange={(e) => setNewSale({...newSale, customerName: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Nom du client"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Montant (€)</label>
                  <input
                    type="number"
                    value={newSale.amount}
                    onChange={(e) => setNewSale({...newSale, amount: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
                  <input
                    type="number"
                    value={newSale.quantity}
                    onChange={(e) => setNewSale({...newSale, quantity: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="1"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mode de Paiement</label>
                <select
                  value={newSale.paymentMethod}
                  onChange={(e) => setNewSale({...newSale, paymentMethod: e.target.value as any})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8"
                >
                  <option value="especes">Espèces</option>
                  <option value="mobile">Paiement Mobile</option>
                  <option value="carte">Carte Bancaire</option>
                  <option value="virement">Virement</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowSaleModal(false)}
                className="flex-1"
              >Annuler</Button>
              <Button 
                onClick={handleAddSale}
                className="flex-1"
              >Enregistrer</Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ajout Client */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Ajouter un Client</h3>
              <button 
                onClick={() => setShowCustomerModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Nom et prénom"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  type="tel"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="06 12 34 56 78"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (optionnel)</label>
                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="email@exemple.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer({...newCustomer, notes: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows={3}
                  placeholder="Préférences, remarques..."
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowCustomerModal(false)}
                className="flex-1"
              >Annuler</Button>
              <Button 
                onClick={handleAddCustomer}
                className="flex-1"
              >Ajouter</Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ajout Tâche */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Ajouter une Tâche</h3>
              <button 
                onClick={() => setShowTaskModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Titre de la tâche"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows={3}
                  placeholder="Description de la tâche"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date d'échéance</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value as any})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8"
                  >
                    <option value="basse">Basse</option>
                    <option value="moyenne">Moyenne</option>
                    <option value="haute">Haute</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={newTask.type}
                    onChange={(e) => setNewTask({...newTask, type: e.target.value as any})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8"
                  >
                    <option value="rendez-vous">Rendez-vous</option>
                    <option value="relance">Relance</option>
                    <option value="livraison">Livraison</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowTaskModal(false)}
                className="flex-1"
              >Annuler</Button>
              <Button 
                onClick={handleAddTask}
                className="flex-1"
              >Ajouter</Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Contact Commercial */}
      {showCommercialModal && selectedCommercial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Contacter {selectedCommercial.name}</h3>
              <button 
                onClick={() => setShowCommercialModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="text-center mb-6">
              <img 
                src={selectedCommercial.avatar} 
                alt={selectedCommercial.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover object-top"
              />
              <h4 className="font-semibold text-gray-900">{selectedCommercial.name}</h4>
              <p className="text-gray-600">{selectedCommercial.specialization}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Votre message</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows={4}
                  placeholder="Décrivez vos produits et vos besoins..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Votre téléphone</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="06 12 34 56 78"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowCommercialModal(false)}
                className="flex-1"
              >Annuler</Button>
              <Button className="flex-1">
                <i className="ri-send-plane-line mr-2"></i>
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
