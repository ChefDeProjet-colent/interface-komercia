
import { useState } from 'react';
import { Card } from '../../components/base/Card';
import { Button } from '../../components/base/Button';
import { LoadingButton } from '../../components/base/LoadingButton';
import { AdBanner } from '../../components/feature/AdBanner';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: 'Disponible' | 'En rupture';
  category: string;
  visibility: 'Public' | 'Privé';
  views: number;
  clicks: number;
  sales: number;
  photos: string[];
  dateAdded: string;
}

interface Commercial {
  id: string;
  name: string;
  specialization: string;
  location: string;
  experience: string;
  rating: number;
  completedSales: number;
  recommendations: string[];
  status: 'Disponible' | 'Occupé' | 'Hors ligne';
  skills: string[];
}

interface Sale {
  id: string;
  clientName: string;
  product: string;
  quantity: number;
  amount: number;
  paymentMethod: 'Espèces' | 'M-Pesa' | 'Orange Money' | 'Carte bancaire';
  paymentStatus: 'Reçu' | 'En attente' | 'Échoué';
  date: string;
  isOffline: boolean;
}

interface Client {
  id: string;
  name: string;
  contact: string;
  location: string;
  totalPurchases: number;
  lastPurchase: string;
  notes: string;
  purchaseHistory: Array<{
    product: string;
    amount: number;
    date: string;
  }>;
}

interface Notification {
  id: string;
  type: 'commercial' | 'product' | 'payment' | 'reminder';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}

export default function InformalMerchantsPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCommercial, setSelectedCommercial] = useState<Commercial | null>(null);
  const [productFilter, setProductFilter] = useState('all');
  const [commercialFilter, setCommercialFilter] = useState('all');

  // Données simulées
  const stats = {
    totalProducts: 25,
    totalClients: 150,
    totalSales: 45,
    offlineSales: 12
  };

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'commercial',
      title: 'Nouveau commercial disponible',
      message: 'Marie Diallo, spécialiste en cosmétiques, est maintenant disponible dans votre région',
      date: '2025-01-15',
      isRead: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'product',
      title: 'Mise à jour produit recommandée',
      message: 'Votre produit "Savon artisanal" n\'a pas été mis à jour depuis 30 jours',
      date: '2025-01-14',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Relance client',
      message: 'Rappel : contacter Jean Kouassi pour sa commande en attente',
      date: '2025-01-13',
      isRead: true,
      priority: 'medium'
    }
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Savon artisanal au karité',
      description: 'Savon naturel fabriqué à base de beurre de karité pur, idéal pour tous types de peau',
      price: 2500,
      stock: 50,
      status: 'Disponible',
      category: 'Cosmétiques',
      visibility: 'Public',
      views: 245,
      clicks: 32,
      sales: 18,
      photos: ['https://readdy.ai/api/search-image?query=handmade%20shea%20butter%20soap%20natural%20organic%20cosmetics%20simple%20white%20background%20artisanal%20african%20beauty%20product%20clean%20minimal%20photography&width=300&height=300&seq=soap1&orientation=squarish'],
      dateAdded: '2025-01-01'
    },
    {
      id: '2',
      name: 'Huile de palme rouge pure',
      description: 'Huile de palme rouge traditionnelle, extraite artisanalement, riche en vitamines',
      price: 3500,
      stock: 30,
      status: 'Disponible',
      category: 'Alimentaire',
      visibility: 'Public',
      views: 189,
      clicks: 28,
      sales: 15,
      photos: ['https://readdy.ai/api/search-image?query=red%20palm%20oil%20traditional%20african%20cooking%20oil%20bottle%20glass%20container%20natural%20organic%20food%20product%20simple%20white%20background%20clean%20photography&width=300&height=300&seq=oil1&orientation=squarish'],
      dateAdded: '2025-01-05'
    },
    {
      id: '3',
      name: 'Tissu Wax authentique',
      description: 'Tissu Wax traditionnel aux motifs colorés, 100% coton, idéal pour confection',
      price: 8500,
      stock: 0,
      status: 'En rupture',
      category: 'Textile',
      visibility: 'Public',
      views: 156,
      clicks: 19,
      sales: 8,
      photos: ['https://readdy.ai/api/search-image?query=authentic%20african%20wax%20fabric%20colorful%20traditional%20patterns%20textile%20cotton%20material%20folded%20simple%20white%20background%20vibrant%20colors%20clean%20photography&width=300&height=300&seq=fabric1&orientation=squarish'],
      dateAdded: '2025-01-03'
    },
    {
      id: '4',
      name: 'Bijoux en perles traditionnels',
      description: 'Colliers et bracelets en perles colorées, fabriqués selon les techniques ancestrales',
      price: 4500,
      stock: 25,
      status: 'Disponible',
      category: 'Artisanat',
      visibility: 'Public',
      views: 98,
      clicks: 15,
      sales: 6,
      photos: ['https://readdy.ai/api/search-image?query=traditional%20african%20beaded%20jewelry%20colorful%20necklace%20bracelet%20handmade%20artisan%20craft%20simple%20white%20background%20cultural%20accessories%20clean%20photography&width=300&height=300&seq=jewelry1&orientation=squarish'],
      dateAdded: '2025-01-08'
    }
  ];

  const commercials: Commercial[] = [
    {
      id: '1',
      name: 'Marie Diallo',
      specialization: 'Cosmétiques et produits de beauté',
      location: 'Abidjan, Côte d\'Ivoire',
      experience: '5 ans',
      rating: 4.8,
      completedSales: 156,
      recommendations: [
        'Excellente connaissance des produits cosmétiques naturels',
        'Très bonne relation client',
        'Ponctuelle et professionnelle'
      ],
      status: 'Disponible',
      skills: ['Vente directe', 'Démonstration produit', 'Conseil beauté']
    },
    {
      id: '2',
      name: 'Amadou Traoré',
      specialization: 'Produits alimentaires traditionnels',
      location: 'Bamako, Mali',
      experience: '8 ans',
      rating: 4.9,
      completedSales: 203,
      recommendations: [
        'Expert en produits alimentaires locaux',
        'Réseau de distribution étendu',
        'Négociateur habile'
      ],
      status: 'Disponible',
      skills: ['Vente en gros', 'Distribution', 'Négociation']
    },
    {
      id: '3',
      name: 'Fatou Sow',
      specialization: 'Textile et mode',
      location: 'Dakar, Sénégal',
      experience: '6 ans',
      rating: 4.7,
      completedSales: 134,
      recommendations: [
        'Spécialiste des tissus Wax',
        'Créative et innovante',
        'Bonne connaissance des tendances'
      ],
      status: 'Occupé',
      skills: ['Conseil mode', 'Vente détail', 'Stylisme']
    }
  ];

  const sales: Sale[] = [
    {
      id: '1',
      clientName: 'Aïcha Koné',
      product: 'Savon artisanal au karité',
      quantity: 5,
      amount: 12500,
      paymentMethod: 'M-Pesa',
      paymentStatus: 'Reçu',
      date: '2025-01-15',
      isOffline: false
    },
    {
      id: '2',
      clientName: 'Ibrahim Diarra',
      product: 'Huile de palme rouge pure',
      quantity: 2,
      amount: 7000,
      paymentMethod: 'Espèces',
      paymentStatus: 'Reçu',
      date: '2025-01-14',
      isOffline: true
    },
    {
      id: '3',
      clientName: 'Mariam Touré',
      product: 'Bijoux en perles traditionnels',
      quantity: 1,
      amount: 4500,
      paymentMethod: 'Orange Money',
      paymentStatus: 'En attente',
      date: '2025-01-13',
      isOffline: false
    }
  ];

  const clients: Client[] = [
    {
      id: '1',
      name: 'Aïcha Koné',
      contact: '+225 07 12 34 56 78',
      location: 'Abidjan, Cocody',
      totalPurchases: 25000,
      lastPurchase: '2025-01-15',
      notes: 'Cliente fidèle, préfère les produits cosmétiques naturels',
      purchaseHistory: [
        { product: 'Savon artisanal', amount: 12500, date: '2025-01-15' },
        { product: 'Huile de karité', amount: 8000, date: '2025-01-10' },
        { product: 'Savon artisanal', amount: 4500, date: '2025-01-05' }
      ]
    },
    {
      id: '2',
      name: 'Ibrahim Diarra',
      contact: '+223 76 54 32 10',
      location: 'Bamako, Hippodrome',
      totalPurchases: 18500,
      lastPurchase: '2025-01-14',
      notes: 'Intéressé par les produits alimentaires en gros',
      purchaseHistory: [
        { product: 'Huile de palme', amount: 7000, date: '2025-01-14' },
        { product: 'Huile de palme', amount: 11500, date: '2025-01-08' }
      ]
    },
    {
      id: '3',
      name: 'Mariam Touré',
      contact: '+221 77 89 12 34',
      location: 'Dakar, Plateau',
      totalPurchases: 12000,
      lastPurchase: '2025-01-13',
      notes: 'Collectionneuse de bijoux traditionnels',
      purchaseHistory: [
        { product: 'Bijoux perles', amount: 4500, date: '2025-01-13' },
        { product: 'Bijoux perles', amount: 7500, date: '2025-01-06' }
      ]
    }
  ];

  const handleAddProduct = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowProductModal(false);
    }, 1500);
  };

  const handleAddSale = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSaleModal(false);
    }, 1500);
  };

  const handleContactCommercial = (commercial: Commercial) => {
    setSelectedCommercial(commercial);
    setShowAppointmentModal(true);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Bannière publicitaire principale */}
      <AdBanner
        title="Solutions de Paiement Mobile Simplifiées"
        description="Acceptez M-Pesa, Orange Money et plus encore. Configuration en 5 minutes !"
        buttonText="Découvrir"
        imageUrl="https://readdy.ai/api/search-image?query=mobile%20payment%20solutions%20african%20merchants%20simple%20interface%20smartphone%20money%20transfer%20digital%20banking%20colorful%20modern%20design%20clean%20background&width=800&height=200&seq=payment1&orientation=landscape"
        onClick={() => console.log('Bannière paiement mobile cliquée')}
        className="mb-6"
      />

      {/* Résumé des activités */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-store-2-line text-2xl text-blue-600"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Produits/Services</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              <p className="text-xs text-green-600">+3 ce mois</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-user-3-line text-2xl text-green-600"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Clients Contactés</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalClients}</p>
              <p className="text-xs text-green-600">+12 cette semaine</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-2xl text-yellow-600"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ventes Réalisées</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSales}</p>
              <p className="text-xs text-blue-600">{stats.offlineSales} hors ligne</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-wifi-off-line text-2xl text-purple-600"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Mode Hors Ligne</p>
              <p className="text-2xl font-bold text-green-600">Actif</p>
              <p className="text-xs text-gray-500">Sync automatique</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Notifications */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="ri-notification-line w-6 h-6 flex items-center justify-center mr-3 text-orange-600"></i>
          Notifications
        </h3>
        <div className="space-y-3">
          {notifications.slice(0, 3).map((notification) => (
            <div key={notification.id} className={`p-4 rounded-lg border ${
              !notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      notification.priority === 'high' ? 'bg-red-500' :
                      notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></span>
                    <h4 className="font-medium text-gray-900">{notification.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                </div>
                {!notification.isRead && (
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Accès rapide */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Accès Rapide</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={() => setActiveTab('products')}
            className="h-20 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 flex flex-col items-center justify-center"
          >
            <i className="ri-store-line text-2xl mb-1"></i>
            <span className="text-sm">Produits/Services</span>
          </Button>
          <Button
            onClick={() => setActiveTab('commercials')}
            className="h-20 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 flex flex-col items-center justify-center"
          >
            <i className="ri-team-line text-2xl mb-1"></i>
            <span className="text-sm">Commerciaux</span>
          </Button>
          <Button
            onClick={() => setActiveTab('sales')}
            className="h-20 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border border-yellow-200 flex flex-col items-center justify-center"
          >
            <i className="ri-money-dollar-circle-line text-2xl mb-1"></i>
            <span className="text-sm">Ventes</span>
          </Button>
          <Button
            onClick={() => setActiveTab('management')}
            className="h-20 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 flex flex-col items-center justify-center"
          >
            <i className="ri-settings-line text-2xl mb-1"></i>
            <span className="text-sm">Gestion</span>
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Produits et Services</h2>
        <Button 
          onClick={() => setShowProductModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <i className="ri-add-line mr-2"></i>
          Ajouter un Produit
        </Button>
      </div>

      {/* Filtres */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <select 
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
          >
            <option value="all">Toutes les catégories</option>
            <option value="Cosmétiques">Cosmétiques</option>
            <option value="Alimentaire">Alimentaire</option>
            <option value="Textile">Textile</option>
            <option value="Artisanat">Artisanat</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
            <option value="all">Tous les statuts</option>
            <option value="available">Disponible</option>
            <option value="out-of-stock">En rupture</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
            <option value="all">Toutes les visibilités</option>
            <option value="public">Public</option>
            <option value="private">Privé</option>
          </select>
        </div>
      </Card>

      {/* Liste des produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products
          .filter(product => productFilter === 'all' || product.category === productFilter)
          .map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src={product.photos[0]} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  product.status === 'Disponible' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Prix:</span>
                  <span className="text-sm font-medium text-gray-900">{product.price.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Stock:</span>
                  <span className="text-sm font-medium text-gray-900">{product.stock} unités</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Catégorie:</span>
                  <span className="text-sm font-medium text-gray-900">{product.category}</span>
                </div>
              </div>

              {/* Statistiques du produit */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Statistiques</h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{product.views}</div>
                    <div className="text-xs text-gray-500">Vues</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{product.clicks}</div>
                    <div className="text-xs text-gray-500">Clics</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">{product.sales}</div>
                    <div className="text-xs text-gray-500">Ventes</div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700">
                  <i className="ri-edit-line mr-1"></i>
                  Modifier
                </Button>
                <Button className="bg-blue-100 hover:bg-blue-200 text-blue-700">
                  <i className="ri-eye-line"></i>
                </Button>
                <Button className="bg-red-100 hover:bg-red-200 text-red-700">
                  <i className="ri-delete-bin-line"></i>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bannière publicitaire */}
      <AdBanner
        title="Améliorez vos Photos Produits"
        description="Outils de photographie professionnelle pour mettre en valeur vos créations"
        buttonText="En savoir plus"
        imageUrl="https://readdy.ai/api/search-image?query=professional%20product%20photography%20tools%20camera%20lighting%20equipment%20simple%20setup%20clean%20white%20background%20modern%20photography%20studio%20accessories&width=600&height=150&seq=photo1&orientation=landscape"
        onClick={() => console.log('Bannière photographie cliquée')}
        className="mt-6"
      />
    </div>
  );

  const renderCommercials = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Accès aux Commerciaux</h2>
        <div className="flex space-x-2">
          <select 
            value={commercialFilter}
            onChange={(e) => setCommercialFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
          >
            <option value="all">Toutes les spécialisations</option>
            <option value="Cosmétiques">Cosmétiques</option>
            <option value="Alimentaire">Alimentaire</option>
            <option value="Textile">Textile</option>
            <option value="Artisanat">Artisanat</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
            <option value="all">Toutes les localisations</option>
            <option value="Abidjan">Abidjan</option>
            <option value="Bamako">Bamako</option>
            <option value="Dakar">Dakar</option>
          </select>
        </div>
      </div>

      {/* Liste des commerciaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {commercials.map((commercial) => (
          <Card key={commercial.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-xl text-blue-600"></i>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">{commercial.name}</h3>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`ri-star-${i < Math.floor(commercial.rating) ? 'fill' : 'line'} text-sm`}></i>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">({commercial.rating})</span>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                commercial.status === 'Disponible' ? 'bg-green-100 text-green-800' :
                commercial.status === 'Occupé' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {commercial.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <span className="text-sm font-medium text-gray-700">Spécialisation:</span>
                <p className="text-sm text-gray-600">{commercial.specialization}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Localisation:</span>
                <p className="text-sm text-gray-600">{commercial.location}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Expérience:</span>
                <p className="text-sm text-gray-600">{commercial.experience}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Ventes réalisées:</span>
                <p className="text-sm text-gray-600">{commercial.completedSales} ventes</p>
              </div>
            </div>

            {/* Compétences */}
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-700 mb-2 block">Compétences:</span>
              <div className="flex flex-wrap gap-1">
                {commercial.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommandations */}
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-700 mb-2 block">Recommandations:</span>
              <div className="space-y-1">
                {commercial.recommendations.slice(0, 2).map((rec, index) => (
                  <p key={index} className="text-xs text-gray-600 italic">• {rec}</p>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={() => handleContactCommercial(commercial)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={commercial.status !== 'Disponible'}
              >
                <i className="ri-phone-line mr-1"></i>
                Contacter
              </Button>
              <Button className="bg-gray-100 hover:bg-gray-200 text-gray-700">
                <i className="ri-eye-line"></i>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Bannière publicitaire */}
      <AdBanner
        title="Formations en Techniques de Vente"
        description="Améliorez vos compétences commerciales avec nos formations spécialisées"
        buttonText="Découvrir"
        imageUrl="https://readdy.ai/api/search-image?query=sales%20training%20business%20education%20african%20professionals%20learning%20commercial%20skills%20modern%20classroom%20setting%20clean%20background&width=600&height=150&seq=training1&orientation=landscape"
        onClick={() => console.log('Bannière formation cliquée')}
        className="mt-6"
      />
    </div>
  );

  const renderSales = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Gestion des Ventes et Paiements</h2>
        <Button 
          onClick={() => setShowSaleModal(true)}
          className="bg-green-600 hover:green-blue-700 text-white"
        >
          <i className="ri-add-line mr-2"></i>
          Enregistrer une Vente
        </Button>
      </div>

      {/* Statistiques des ventes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-2xl text-green-600"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ventes Totales</p>
              <p className="text-2xl font-bold text-gray-900">24 000 FCFA</p>
              <p className="text-xs text-green-600">+15% ce mois</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-smartphone-line text-2xl text-blue-600"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Paiements Mobiles</p>
              <p className="text-2xl font-bold text-gray-900">16 500 FCFA</p>
              <p className="text-xs text-blue-600">69% du total</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-wifi-off-line text-2xl text-purple-600"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ventes Hors Ligne</p>
              <p className="text-2xl font-bold text-gray-900">7 500 FCFA</p>
              <p className="text-xs text-purple-600">Sync en attente</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Suivi des ventes */}
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Suivi des Ventes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paiement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{sale.clientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{sale.product}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{sale.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{sale.amount.toLocaleString()} FCFA</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      sale.paymentMethod === 'M-Pesa' || sale.paymentMethod === 'Orange Money'
                        ? 'bg-blue-100 text-blue-800'
                        : sale.paymentMethod === 'Espèces'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {sale.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        sale.paymentStatus === 'Reçu' ? 'bg-green-100 text-green-800' :
                        sale.paymentStatus === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {sale.paymentStatus}
                      </span>
                      {sale.isOffline && (
                        <i className="ri-wifi-off-line text-purple-600 ml-2" title="Vente hors ligne"></i>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{sale.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button className="bg-gray-100 hover:bg-gray-200 text-gray-700 mr-2">
                      <i className="ri-eye-line"></i>
                    </Button>
                    <Button className="bg-blue-100 hover:bg-blue-200 text-blue-700">
                      <i className="ri-edit-line"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mode hors ligne */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="ri-wifi-off-line w-6 h-6 flex items-center justify-center mr-3 text-purple-600"></i>
          Mode Hors Ligne
        </h3>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-800 font-medium">Synchronisation automatique activée</p>
              <p className="text-purple-600 text-sm">Les ventes hors ligne seront synchronisées dès la reconnexion</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <i className="ri-refresh-line mr-2"></i>
              Synchroniser maintenant
            </Button>
          </div>
        </div>
      </Card>

      {/* Bannière publicitaire */}
      <AdBanner
        title="Solutions de Gestion Financière"
        description="Outils simples pour gérer vos finances et optimiser vos revenus"
        buttonText="Découvrir"
        imageUrl="https://readdy.ai/api/search-image?query=financial%20management%20tools%20simple%20accounting%20software%20mobile%20banking%20african%20small%20business%20money%20management%20clean%20modern%20interface&width=600&height=150&seq=finance1&orientation=landscape"
        onClick={() => console.log('Bannière gestion financière cliquée')}
        className="mt-6"
      />
    </div>
  );

  const renderManagement = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Outils de Gestion Simplifiés</h2>

      {/* Agenda intégré */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="ri-calendar-line w-6 h-6 flex items-center justify-center mr-3 text-blue-600"></i>
          Agenda Intégré
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rendez-vous du jour */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Rendez-vous d'aujourd'hui</h4>
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-blue-900">Livraison - Aïcha Koné</span>
                  <span className="text-sm text-blue-600">14:00</span>
                </div>
                <p className="text-sm text-blue-700">5 savons artisanaux - Cocody</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-green-900">Relance - Ibrahim Diarra</span>
                  <span className="text-sm text-green-600">16:30</span>
                </div>
                <p className="text-sm text-green-700">Suivi commande huile de palme</p>
              </div>
            </div>
          </div>

          {/* Notifications importantes */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Notifications importantes</h4>
            <div className="space-y-3">
              <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                <div className="flex items-center">
                  <i className="ri-alarm-line w-5 h-5 flex items-center justify-center mr-2 text-yellow-600"></i>
                  <span className="text-yellow-800 font-medium">Stock faible : Tissu Wax (0 unités)</span>
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                <div className="flex items-center">
                  <i className="ri-time-line w-5 h-5 flex items-center justify-center mr-2 text-orange-600"></i>
                  <span className="text-orange-800 font-medium">Relance prévue dans 2 heures</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <i className="ri-add-line mr-2"></i>
            Nouveau Rendez-vous
          </Button>
          <Button className="bg-gray-100 hover:bg-gray-200 text-gray-700">
            <i className="ri-calendar-2-line mr-2"></i>
            Voir Calendrier Complet
          </Button>
        </div>
      </Card>

      {/* Gestion des clients */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <i className="ri-user-3-line w-6 h-6 flex items-center justify-center mr-3 text-green-600"></i>
            Gestion des Clients
          </h3>
          <Button 
            onClick={() => setShowClientModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <i className="ri-add-line mr-2"></i>
            Nouveau Client
          </Button>
        </div>

        <div className="space-y-4">
          {clients.map((client) => (
            <div key={client.id} className="bg-gray-50 rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-green-600"></i>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-900">{client.name}</h4>
                    <p className="text-sm text-gray-600">{client.contact}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{client.totalPurchases.toLocaleString()} FCFA</p>
                  <p className="text-xs text-gray-500">Total achats</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-sm text-gray-600">Localisation:</span>
                  <p className="text-sm font-medium text-gray-900">{client.location}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Dernier achat:</span>
                  <p className="text-sm font-medium text-gray-900">{client.lastPurchase}</p>
                </div>
              </div>

              {client.notes && (
                <div className="mb-3">
                  <span className="text-sm text-gray-600">Notes:</span>
                  <p className="text-sm text-gray-700 italic">{client.notes}</p>
                </div>
              )}

              <div className="flex space-x-2">
                <Button className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm">
                  <i className="ri-phone-line mr-1"></i>
                  Appeler
                </Button>
                <Button className="bg-green-100 hover:bg-green-200 text-green-700 text-sm">
                  <i className="ri-message-line mr-1"></i>
                  Message
                </Button>
                <Button className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">
                  <i className="ri-eye-line mr-1"></i>
                  Historique
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Rapports simplifiés */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="ri-file-chart-line w-6 h-6 flex items-center justify-center mr-3 text-purple-600"></i>
          Rapports Simplifiés
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Rapport Hebdomadaire</h4>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Ventes cette semaine:</span>
                  <span className="text-sm font-medium text-gray-900">8 ventes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Chiffre d'affaires:</span>
                  <span className="text-sm font-medium text-gray-900">24 000 FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Nouveaux clients:</span>
                  <span className="text-sm font-medium text-gray-900">3 clients</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Produit le plus vendu:</span>
                  <span className="text-sm font-medium text-gray-900">Savon artisanal</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Rapport Mensuel</h4>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Ventes ce mois:</span>
                  <span className="text-sm font-medium text-gray-900">32 ventes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Chiffre d'affaires:</span>
                  <span className="text-sm font-medium text-gray-900">95 500 FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Croissance:</span>
                  <span className="text-sm font-medium text-green-600">+15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Taux de fidélisation:</span>
                  <span className="text-sm font-medium text-gray-900">78%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <i className="ri-download-line mr-2"></i>
            Exporter Rapport Hebdomadaire
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <i className="ri-download-line mr-2"></i>
            Exporter Rapport Mensuel
          </Button>
        </div>
      </Card>

      {/* Bannière publicitaire */}
      <AdBanner
        title="Formations en Gestion d'Entreprise"
        description="Apprenez les bases de la gestion d'entreprise adaptées aux petits commerçants"
        buttonText="Découvrir"
        imageUrl="https://readdy.ai/api/search-image?query=business%20management%20training%20small%20entrepreneurs%20african%20business%20education%20simple%20tools%20learning%20modern%20classroom%20clean%20background&width=600&height=150&seq=management1&orientation=landscape"
        onClick={() => console.log('Bannière gestion d\'entreprise cliquée')}
        className="mt-6"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Petits Commerçants & Entrepreneurs</h1>
              <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <i className="ri-wifi-off-line mr-1"></i>
                Mode Hors Ligne Actif
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <i className="ri-refresh-line mr-2"></i>
                Synchroniser
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Tableau de Bord', icon: 'ri-dashboard-line' },
              { id: 'products', label: 'Produits/Services', icon: 'ri-store-line' },
              { id: 'commercials', label: 'Commerciaux', icon: 'ri-team-line' },
              { id: 'sales', label: 'Ventes/Paiements', icon: 'ri-money-dollar-circle-line' },
              { id: 'management', label: 'Gestion', icon: 'ri-settings-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`${tab.icon} w-5 h-5 flex items-center justify-center mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'commercials' && renderCommercials()}
        {activeTab === 'sales' && renderSales()}
        {activeTab === 'management' && renderManagement()}
      </div>

      {/* Modals */}
      {/* Modal Ajouter Produit */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ajouter un Produit/Service</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du produit/service *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Savon artisanal au karité"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Description détaillée du produit/service"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix (FCFA) *
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock *
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie *
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
                  <option value="">Sélectionner une catégorie</option>
                  <option value="Cosmétiques">Cosmétiques</option>
                  <option value="Alimentaire">Alimentaire</option>
                  <option value="Textile">Textile</option>
                  <option value="Artisanat">Artisanat</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Disponibilité *
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
                  <option value="Disponible">Disponible</option>
                  <option value="En rupture">En rupture de stock</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visibilité *
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
                  <option value="Public">Public</option>
                  <option value="Privé">Privé</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photos du produit
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <i className="ri-image-line text-2xl text-gray-400 mb-2"></i>
                  <p className="text-sm text-gray-500">Cliquez pour ajouter des photos</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Annuler
                </Button>
                <LoadingButton
                  onClick={handleAddProduct}
                  loading={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Ajouter le Produit
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Enregistrer Vente */}
      {showSaleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Enregistrer une Vente</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du client *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: Aïcha Koné"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Produit/Service vendu *
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-8">
                  <option value="">Sélectionner un produit</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name} - {product.price.toLocaleString()} FCFA
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantité *
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Montant Total (FCFA)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    placeholder="Calculé automatiquement"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mode de paiement *
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-8">
                  <option value="">Sélectionner un mode</option>
                  <option value="Espèces">Espèces</option>
                  <option value="M-Pesa">M-Pesa</option>
                  <option value="Orange Money">Orange Money</option>
                  <option value="Carte bancaire">Carte bancaire</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de la vente *
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="offline-sale"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="offline-sale" className="ml-2 block text-sm text-gray-700">
                  Vente effectuée hors ligne
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setShowSaleModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Annuler
                </Button>
                <LoadingButton
                  onClick={handleAddSale}
                  loading={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Enregistrer la Vente
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Nouveau Client */}
      {showClientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nouveau Client</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: Aïcha Koné"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact *
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: +225 07 12 34 56 78"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Localisation
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: Abidjan, Cocody"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes et rappels
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                  placeholder="Informations importantes sur le client..."
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setShowClientModal(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Annuler
                </Button>
                <LoadingButton
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      setShowClientModal(false);
                    }, 1500);
                  }}
                  loading={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Ajouter le Client
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Contacter Commercial */}
      {showAppointmentModal && selectedCommercial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contacter {selectedCommercial.name}
            </h3>
            <form className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-blue-600"></i>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-blue-900">{selectedCommercial.name}</h4>
                    <p className="text-sm text-blue-700">{selectedCommercial.specialization}</p>
                  </div>
                </div>
                <p className="text-sm text-blue-600">{selectedCommercial.location}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de collaboration *
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
                  <option value="">Sélectionner le type</option>
                  <option value="vente-directe">Vente directe</option>
                  <option value="distribution">Distribution</option>
                  <option value="conseil">Conseil et formation</option>
                  <option value="partenariat">Partenariat long terme</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Produits concernés
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
                  <option value="">Sélectionner un produit</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Décrivez votre demande et vos attentes..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mode de contact préféré *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="contact-method" value="phone" className="mr-2" />
                    <span className="text-sm">Appel téléphonique</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="contact-method" value="email" className="mr-2" />
                    <span className="text-sm">Email</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="contact-method" value="whatsapp" className="mr-2" />
                    <span className="text-sm">WhatsApp</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  onClick={() => {
                    setShowAppointmentModal(false);
                    setSelectedCommercial(null);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Annuler
                </Button>
                <LoadingButton
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      setShowAppointmentModal(false);
                      setSelectedCommercial(null);
                    }, 1500);
                  }}
                  loading={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Envoyer la Demande
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
