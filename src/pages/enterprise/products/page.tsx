import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  commission: string;
  targetClients: string;
  documentation: string;
  specifications: string;
  advantages: string;
  requirements: string;
  images: File[];
  status: 'active' | 'inactive';
  sales?: number;
  revenue?: number;
  avgBasket?: number;
  assignedSales?: number;
  createdAt?: string;
}

export default function EnterpriseProductsPage() {
  // Définir les catégories disponibles
  const categories = [
    'Logiciel',
    'Service',
    'Logiciel SaaS',
    'Solution Cloud',
    'Service Conseil',
    'Formation',
    'Service Support',
    'Infrastructure',
    'Sécurité'
  ];

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Solution CRM Enterprise',
      category: 'Logiciel',
      description: 'Plateforme complète de gestion de la relation client avec intelligence artificielle intégrée',
      price: 299,
      commission: 15,
      status: 'active',
      targetClients: 'PME et grandes entreprises',
      documentation: 'Guide complet disponible en PDF et vidéos de formation',
      specifications: 'Cloud-based, API REST, intégration Salesforce, support 24/7',
      advantages: 'IA prédictive, automatisation avancée, ROI prouvé de 300%',
      requirements: 'Formation certifiante de 2 jours requise',
      images: [],
      sales: 145,
      revenue: 43355,
      avgBasket: 299,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Service Consulting Digital',
      category: 'Service Conseil',
      description: 'Accompagnement stratégique pour la transformation digitale des entreprises',
      price: 1500,
      commission: 20,
      status: 'active',
      targetClients: 'Grandes entreprises et groupes internationaux',
      documentation: 'Méthodologie propriétaire et cas clients',
      specifications: 'Audit initial, roadmap personnalisée, suivi mensuel',
      advantages: 'Expertise reconnue, résultats mesurables, accompagnement sur-mesure',
      requirements: 'Certification consultant senior',
      images: [],
      sales: 28,
      revenue: 42000,
      avgBasket: 1500,
      createdAt: '2024-02-01'
    },
    {
      id: '3',
      name: 'Plateforme E-learning Pro',
      category: 'Formation',
      description: 'Solution complète de formation en ligne avec suivi des compétences',
      price: 89,
      commission: 25,
      status: 'active',
      targetClients: 'Entreprises de toutes tailles',
      documentation: 'Bibliothèque de 500+ cours prêts à l\'emploi',
      specifications: 'LMS moderne, mobile-first, gamification, certificats',
      advantages: 'Taux de completion 85%, interface intuitive, analytics avancés',
      requirements: 'Aucune certification requise',
      images: [],
      sales: 312,
      revenue: 27768,
      avgBasket: 89,
      createdAt: '2024-01-20'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: '',
    description: '',
    price: '',
    commission: '',
    targetClients: '',
    documentation: '',
    specifications: '',
    advantages: '',
    requirements: '',
    images: [],
    status: 'active'
  });

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData(product);
    setShowEditForm(true);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const handleEditFromDetails = () => {
    setShowDetailsModal(false);
    setShowEditForm(true);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name || '',
      category: formData.category || '',
      description: formData.description || '',
      price: formData.price || '0',
      commission: formData.commission || '0',
      targetClients: formData.targetClients || '',
      documentation: formData.documentation || '',
      specifications: formData.specifications || '',
      advantages: formData.advantages || '',
      requirements: formData.requirements || '',
      images: formData.images || [],
      status: formData.status || 'active',
      sales: 0,
      revenue: 0,
      avgBasket: 0,
      assignedSales: 0,
      createdAt: new Date().toISOString()
    };

    setProducts([...products, newProduct]);
    setShowAddForm(false);
    setFormData({
      name: '',
      category: '',
      description: '',
      price: '',
      commission: '',
      targetClients: '',
      documentation: '',
      specifications: '',
      advantages: '',
      requirements: '',
      images: [],
      status: 'active'
    });
  };

  const handleSaveEdit = () => {
    if (selectedProduct) {
      setProducts(products.map(p => 
        p.id === selectedProduct.id ? { ...formData as Product, id: p.id } : p
      ));
      setShowEditForm(false);
      setFormData({
        name: '',
        category: '',
        description: '',
        price: '',
        commission: '',
        targetClients: '',
        documentation: '',
        specifications: '',
        advantages: '',
        requirements: '',
        images: [],
        status: 'active'
      });
      setSelectedProduct(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setFormData({ ...formData, images: [...(formData.images || []), ...newImages] });
    }
  };

  const removeImage = (index: number) => {
    const newImages = (formData.images || []).filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedProduct) {
      const updatedProducts = products.map(p => 
        p.id === selectedProduct.id 
          ? {
              ...p,
              ...formData
            }
          : p
      );
      
      setProducts(updatedProducts);
      setShowEditForm(false);
      setSelectedProduct(null);
      setFormData({
        name: '',
        category: '',
        description: '',
        price: '',
        commission: '',
        targetClients: '',
        documentation: '',
        specifications: '',
        advantages: '',
        requirements: '',
        images: [],
        status: 'active'
      });
    }
  };

  // Filtres et recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return parseFloat(b.price || '0') - parseFloat(a.price || '0');
        case 'commission':
          return parseFloat(b.commission || '0') - parseFloat(a.commission || '0');
        case 'sales':
          return (b.sales || 0) - (a.sales || 0);
        case 'revenue':
          return (b.revenue || 0) - (a.revenue || 0);
        case 'date':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        default:
          return 0;
      }
    });

  const stats = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    draft: products.filter(p => p.status === 'inactive').length,
    archived: 0,
    totalSales: products.reduce((sum, p) => sum + (p.sales || 0), 0),
    totalRevenue: products.reduce((sum, p) => sum + (p.revenue || 0), 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'inactive':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Logiciel SaaS':
        return 'ri-cloud-line';
      case 'Solution Cloud':
        return 'ri-server-line';
      case 'Service Conseil':
        return 'ri-lightbulb-line';
      case 'Formation':
        return 'ri-graduation-cap-line';
      case 'Service Support':
        return 'ri-customer-service-2-line';
      case 'Infrastructure':
        return 'ri-database-2-line';
      case 'Sécurité':
        return 'ri-shield-check-line';
      default:
        return 'ri-box-3-line';
    }
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
              className="w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer"
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
            <button
              onClick={() => window.REACT_APP_NAVIGATE('/enterprise/products')}
              className="w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors bg-blue-100 text-blue-700 cursor-pointer"
            >
              <i className="ri-shopping-bag-line mr-3"></i>
              Mes Produits
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
        {/* En-tête */}
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
                  <h1 className="text-2xl font-bold text-gray-900">Mes Produits & Services</h1>
                  <p className="text-sm text-gray-600">Gérez votre catalogue de produits et services commercialisables</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
              >
                <i className="ri-add-line text-xl"></i>
                <span className="font-semibold">Nouveau Produit</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
                  <i className="ri-box-3-line text-xl text-blue-600"></i>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-emerald-100 rounded-lg">
                  <i className="ri-checkbox-circle-line text-xl text-emerald-600"></i>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Actifs</p>
                  <p className="text-2xl font-bold text-emerald-600">{stats.active}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-lg">
                  <i className="ri-draft-line text-xl text-amber-600"></i>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Brouillons</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.draft}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-lg">
                  <i className="ri-archive-line text-xl text-slate-600"></i>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Archivés</p>
                  <p className="text-2xl font-bold text-slate-600">{stats.archived}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
                  <i className="ri-shopping-cart-line text-xl text-purple-600"></i>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Ventes</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalSales}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-teal-100 rounded-lg">
                  <i className="ri-money-euro-circle-line text-xl text-teal-600"></i>
                </div>
                <div>
                  <p className="text-sm text-slate-600">CA Total</p>
                  <p className="text-2xl font-bold text-teal-600">{stats.totalRevenue.toLocaleString()}€</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filtres et recherche */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Recherche */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <i className="ri-search-line mr-2"></i>Rechercher
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nom, description..."
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Filtre catégorie */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <i className="ri-filter-line mr-2"></i>Catégorie
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                >
                  <option value="all">Toutes</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Filtre statut */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <i className="ri-checkbox-circle-line mr-2"></i>Statut
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                >
                  <option value="all">Tous</option>
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>
            </div>

            {/* Tri */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-slate-700">
                  <i className="ri-sort-desc mr-2"></i>Trier par:
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'name', label: 'Nom', icon: 'ri-text' },
                    { value: 'price', label: 'Prix', icon: 'ri-money-euro-circle-line' },
                    { value: 'commission', label: 'Commission', icon: 'ri-percent-line' },
                    { value: 'sales', label: 'Ventes', icon: 'ri-shopping-cart-line' },
                    { value: 'revenue', label: 'CA', icon: 'ri-line-chart-line' },
                    { value: 'date', label: 'Date', icon: 'ri-calendar-line' }
                  ].map(sort => (
                    <button
                      key={sort.value}
                      onClick={() => setSortBy(sort.value)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                        sortBy === sort.value
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <i className={`${sort.icon} mr-1`}></i>
                      {sort.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Détails */}
          {showDetailsModal && selectedProduct && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl">
                      <i className={`${getCategoryIcon(selectedProduct.category)} text-3xl text-teal-600`}></i>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{selectedProduct.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">
                          {selectedProduct.category}
                        </span>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(selectedProduct.status)}`}>
                          {selectedProduct.status === 'active' ? 'Actif' : selectedProduct.status === 'draft' ? 'Brouillon' : 'Archivé'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Prix et Commission */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
                      <p className="text-sm text-teal-700 mb-1 font-medium">Prix de vente</p>
                      <p className="text-3xl font-bold text-teal-600">{selectedProduct.price}€</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <p className="text-sm text-green-700 mb-1 font-medium">Commission</p>
                      <p className="text-3xl font-bold text-green-600">{selectedProduct.commission}%</p>
                    </div>
                  </div>

                  {/* Statistiques */}
                  <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Ventes totales</p>
                      <p className="text-2xl font-bold text-slate-900">{selectedProduct.sales || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">CA Généré</p>
                      <p className="text-2xl font-bold text-teal-600">{(selectedProduct.revenue || 0).toLocaleString()}€</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Panier Moyen</p>
                      <p className="text-2xl font-bold text-slate-900">{(selectedProduct.avgBasket || 0).toLocaleString()}€</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Créé le</p>
                      <p className="text-lg font-bold text-slate-900">
                        {new Date(selectedProduct.createdAt || Date.now()).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="ri-file-text-line text-xl text-teal-600"></i>
                      <h3 className="text-lg font-bold text-slate-900">Description</h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  {/* Clients cibles */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="ri-user-star-line text-xl text-blue-600"></i>
                      <h3 className="text-lg font-bold text-slate-900">Clients cibles</h3>
                    </div>
                    <p className="text-slate-700">{selectedProduct.targetClients}</p>
                  </div>

                  {/* Spécifications techniques */}
                  <div className="mb-6 p-4 bg-slate-100 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="ri-settings-3-line text-xl text-slate-700"></i>
                      <h3 className="text-lg font-bold text-slate-900">Spécifications techniques</h3>
                    </div>
                    <p className="text-slate-700">{selectedProduct.specifications}</p>
                  </div>

                  {/* Avantages concurrentiels */}
                  <div className="mb-6 p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="ri-star-line text-xl text-teal-600"></i>
                      <h3 className="text-lg font-bold text-slate-900">Avantages concurrentiels</h3>
                    </div>
                    <p className="text-slate-700">{selectedProduct.advantages}</p>
                  </div>

                  {/* Documentation commerciale */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="ri-book-open-line text-xl text-purple-600"></i>
                      <h3 className="text-lg font-bold text-slate-900">Documentation commerciale</h3>
                    </div>
                    <p className="text-slate-700">{selectedProduct.documentation}</p>
                  </div>

                  {/* Exigences */}
                  <div className="mb-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="ri-shield-check-line text-xl text-orange-600"></i>
                      <h3 className="text-lg font-bold text-slate-900">Exigences</h3>
                    </div>
                    <p className="text-slate-700">{selectedProduct.requirements}</p>
                  </div>

                  {/* Images */}
                  {selectedProduct.images && selectedProduct.images.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <i className="ri-image-line text-xl text-pink-600"></i>
                        <h3 className="text-lg font-bold text-slate-900">Galerie d'images</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {selectedProduct.images.map((image, index) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden border-2 border-slate-200">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-6 py-2.5 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors font-medium whitespace-nowrap cursor-pointer"
                  >
                    Fermer
                  </button>
                  <button
                    onClick={handleEditFromDetails}
                    className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-edit-line"></i>
                    Modifier ce produit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Liste des produits */}
          <div className="grid gap-6">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
                <div className="w-20 h-20 flex items-center justify-center bg-slate-100 rounded-full mx-auto mb-4">
                  <i className="ri-inbox-line text-4xl text-slate-400"></i>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Aucun produit trouvé</h3>
                <p className="text-slate-600 mb-6">Essayez de modifier vos filtres ou ajoutez un nouveau produit</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-add-line mr-2"></i>
                  Ajouter un produit
                </button>
              </div>
            ) : (
              filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl">
                        <i className={`${getCategoryIcon(product.category)} text-2xl text-teal-600`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-slate-900">{product.name}</h3>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(product.status)}`}>
                            {product.status === 'active' ? 'Actif' : 'Inactif'}
                          </span>
                          <span className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                            {product.category}
                          </span>
                        </div>
                        <p className="text-slate-600 mb-3">{product.description}</p>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <i className="ri-price-tag-3-line text-teal-600"></i>
                            <span className="font-semibold text-slate-900">{parseFloat(product.price || '0').toLocaleString()}€</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="ri-percent-line text-emerald-600"></i>
                            <span className="font-semibold text-emerald-600">{product.commission}% commission</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="ri-user-line text-blue-600"></i>
                            <span className="text-slate-700">{product.assignedSales || 0} commerciaux</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Statistiques */}
                  <div className="grid grid-cols-4 gap-4 mb-4 p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Ventes</p>
                      <p className="text-lg font-bold text-slate-900">{product.sales || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">CA Généré</p>
                      <p className="text-lg font-bold text-teal-600">{(product.revenue || 0).toLocaleString()}€</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Panier Moyen</p>
                      <p className="text-lg font-bold text-slate-900">{(product.avgBasket || 0) > 0 ? (product.avgBasket || 0).toLocaleString() : '0'}€</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Créé le</p>
                      <p className="text-lg font-bold text-slate-900">{product.createdAt ? new Date(product.createdAt).toLocaleDateString('fr-FR') : '-'}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-edit-line"></i>
                      Modifier
                    </button>
                    <button 
                      onClick={() => handleViewDetails(product)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-eye-line"></i>
                      Détails
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm whitespace-nowrap cursor-pointer">
                      <i className="ri-user-add-line"></i>
                      Assigner
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm whitespace-nowrap cursor-pointer">
                      <i className="ri-file-copy-line"></i>
                      Dupliquer
                    </button>
                    {product.status === 'active' ? (
                      <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm whitespace-nowrap cursor-pointer">
                        <i className="ri-archive-line"></i>
                        Archiver
                      </button>
                    ) : (
                      <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm whitespace-nowrap cursor-pointer">
                        <i className="ri-checkbox-circle-line"></i>
                        Activer
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Nouveau Produit/Service</h2>
                  <p className="text-teal-100">Ajoutez un nouveau produit ou service à votre catalogue</p>
                </div>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            <form onSubmit={handleAddProduct} className="p-6 space-y-6">
              {/* Informations de base */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <i className="ri-information-line text-teal-600"></i>
                  Informations de base
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nom du produit/service *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Ex: Solution CRM Cloud"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Catégorie *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description détaillée *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    placeholder="Décrivez les fonctionnalités et avantages du produit..."
                  />
                </div>

                {/* Upload d'images */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <i className="ri-image-line mr-2"></i>
                    Images du produit/service
                  </label>
                  <div className="space-y-3">
                    {/* Zone de drop */}
                    <div className="relative">
                      <input
                        type="file"
                        id="imageUploadAdd"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="imageUploadAdd"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg hover:border-teal-500 hover:bg-teal-50/50 transition-all cursor-pointer"
                      >
                        <i className="ri-upload-cloud-2-line text-4xl text-slate-400 mb-2"></i>
                        <p className="text-sm font-medium text-slate-700">Cliquez pour ajouter des images</p>
                        <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP jusqu'à 10MB</p>
                      </label>
                    </div>

                    {/* Aperçu des images */}
                    {formData.images && formData.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-3">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden border-2 border-slate-200">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Aperçu ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                            >
                              <i className="ri-close-line text-sm"></i>
                            </button>
                            <div className="absolute bottom-2 left-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              {image.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex items-start gap-2 text-xs text-slate-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <i className="ri-information-line text-blue-600 flex-shrink-0 mt-0.5"></i>
                      <p>
                        Ajoutez plusieurs images pour présenter votre produit sous différents angles. 
                        La première image sera utilisée comme image principale.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Prix de vente (€) *
                    </label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="49.99"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Commission (%) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="100"
                      value={formData.commission}
                      onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="25"
                    />
                  </div>
                </div>
              </div>

              {/* Marché cible */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <i className="ri-user-star-line text-teal-600"></i>
                  Marché cible
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Clients cibles
                  </label>
                  <input
                    type="text"
                    value={formData.targetClients}
                    onChange={(e) => setFormData({ ...formData, targetClients: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Ex: PME, Startups, Grandes entreprises..."
                  />
                </div>
              </div>

              {/* Supports de vente */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <i className="ri-file-text-line text-teal-600"></i>
                  Supports de vente
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Documentation commerciale
                  </label>
                  <textarea
                    value={formData.documentation}
                    onChange={(e) => setFormData({ ...formData, documentation: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    placeholder="Brochures, présentations, vidéos de démonstration..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Spécifications techniques
                  </label>
                  <textarea
                    value={formData.specifications}
                    onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    placeholder="Caractéristiques techniques, prérequis, compatibilité..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Avantages concurrentiels
                  </label>
                  <textarea
                    value={formData.advantages}
                    onChange={(e) => setFormData({ ...formData, advantages: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    placeholder="Points forts par rapport à la concurrence..."
                  />
                </div>
              </div>

              {/* Exigences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <i className="ri-shield-check-line text-teal-600"></i>
                  Exigences
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Exigences et prérequis
                  </label>
                  <textarea
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    placeholder="Formation, certification, connaissances requises..."
                  />
                </div>
              </div>

              {/* Statut */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <i className="ri-checkbox-circle-line text-teal-600"></i>
                  Statut
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Statut du produit
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="active">Actif - Disponible pour la vente</option>
                    <option value="inactive">Inactif - Non disponible</option>
                  </select>
                </div>
              </div>

              {/* Conseil */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <i className="ri-lightbulb-line text-xl text-amber-600 flex-shrink-0"></i>
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-1">Conseil</h4>
                    <p className="text-sm text-amber-800">
                      Plus votre fiche produit est complète et détaillée, plus vos commerciaux seront efficaces pour le vendre. 
                      Pensez à ajouter tous les supports nécessaires et à définir clairement les avantages concurrentiels.
                    </p>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium whitespace-nowrap cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all font-semibold shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-add-line mr-2"></i>
                  Créer le produit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Modifier le Produit/Service</h2>
                  <p className="text-teal-100">Mettez à jour les informations du produit</p>
                </div>
                <button
                  onClick={() => {
                    setShowEditForm(false);
                    setSelectedProduct(null);
                  }}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-6">
              {/* Informations de base */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <i className="ri-information-line text-teal-600"></i>
                  Informations de base
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nom du produit/service *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Ex: Solution CRM Cloud"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Catégorie *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description détaillée *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    placeholder="Décrivez les fonctionnalités et avantages du produit..."
                  />
                </div>

                {/* Upload d'images */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <i className="ri-image-line mr-2"></i>
                    Images du produit/service
                  </label>
                  <div className="space-y-3">
                    {/* Zone de drop */}
                    <div className="relative">
                      <input
                        type="file"
                        id="imageUploadEdit"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="imageUploadEdit"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg hover:border-teal-500 hover:bg-teal-50/50 transition-all cursor-pointer"
                      >
                        <i className="ri-upload-cloud-2-line text-4xl text-slate-400 mb-2"></i>
                        <p className="text-sm font-medium text-slate-700">Cliquez pour ajouter des images</p>
                        <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP jusqu'à 10MB</p>
                      </label>
                    </div>

                    {/* Aperçu des images */}
                    {formData.images && formData.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-3">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden border-2 border-slate-200">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Aperçu ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                            >
                              <i className="ri-close-line text-sm"></i>
                            </button>
                            <div className="absolute bottom-2 left-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              {image.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex items-start gap-2 text-xs text-slate-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <i className="ri-information-line text-blue-600 flex-shrink-0 mt-0.5"></i>
                      <p>
                        Ajoutez plusieurs images pour présenter votre produit sous différents angles. 
                        La première image sera utilisée comme image principale.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Prix de vente (€) *
                    </label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="49.99"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Commission (%) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="100"
                      value={formData.commission}
                      onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="25"
                    />
                  </div>
                </div>
              </div>

              {/* Marché cible */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <i className="ri-user-star-line text-teal-600"></i>
                  Marché cible
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Clients cibles
                  </label>
                  <input
                    type="text"
                    value={formData.targetClients}
                    onChange={(e) => setFormData({ ...formData, targetClients: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Ex: PME, Startups, Grandes entreprises..."
                  />
                </div>
              </div>

              {/* Supports de vente */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <i className="ri-file-text-line text-teal-600"></i>
                  Supports de vente
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Documentation commerciale
                  </label>
                  <textarea
                    value={formData.documentation}
                    onChange={(e) => setFormData({ ...formData, documentation: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    placeholder="Brochures, présentations, vidéos de démonstration..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Spécifications techniques
                  </label>
                  <textarea
                    value={formData.specifications}
                    onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    placeholder="Caractéristiques techniques, prérequis, compatibilité..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Avantages concurrentiels
                  </label>
                  <textarea
                    value={formData.advantages}
                    onChange={(e) => setFormData({ ...formData, advantages: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    placeholder="Points forts par rapport à la concurrence..."
                  />
                </div>
              </div>

              {/* Exigences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <i className="ri-shield-check-line text-teal-600"></i>
                  Exigences
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Exigences et prérequis
                  </label>
                  <textarea
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    placeholder="Formation, certification, connaissances requises..."
                  />
                </div>
              </div>

              {/* Conseil */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <i className="ri-lightbulb-line text-xl text-amber-600 flex-shrink-0"></i>
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-1">Conseil</h4>
                    <p className="text-sm text-amber-800">
                      Plus votre fiche produit est complète et détaillée, plus vos commerciaux seront efficaces pour le vendre. 
                      Pensez à ajouter tous les supports nécessaires et à définir clairement les avantages concurrentiels.
                    </p>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditForm(false);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium whitespace-nowrap cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all font-semibold shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-save-line mr-2"></i>
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {selectedProduct.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedProduct.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedProduct.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              {/* Pricing Info */}
              <div className="grid grid-cols-2 gap-6 mb-8 p-6 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Prix</p>
                  <p className="text-2xl font-bold text-gray-900">{parseFloat(selectedProduct.price || '0').toLocaleString()}€</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Commission</p>
                  <p className="text-2xl font-bold text-teal-600">{selectedProduct.commission}%</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="ri-file-text-line text-teal-600"></i>
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">{selectedProduct.description}</p>
              </div>

              {/* Target Clients */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="ri-group-line text-teal-600"></i>
                  Clients Cibles
                </h3>
                <p className="text-gray-700">{selectedProduct.targetClients}</p>
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="ri-settings-3-line text-teal-600"></i>
                  Spécifications Techniques
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-line">{selectedProduct.specifications}</p>
                </div>
              </div>

              {/* Advantages */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="ri-star-line text-teal-600"></i>
                  Avantages Concurrentiels
                </h3>
                <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-line">{selectedProduct.advantages}</p>
                </div>
              </div>

              {/* Documentation */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="ri-book-line text-teal-600"></i>
                  Documentation Commerciale
                </h3>
                <p className="text-gray-700">{selectedProduct.documentation}</p>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="ri-shield-check-line text-teal-600"></i>
                  Exigences
                </h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-gray-700">{selectedProduct.requirements}</p>
                </div>
              </div>

              {/* Images */}
              {selectedProduct.images && selectedProduct.images.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <i className="ri-image-line text-teal-600"></i>
                    Images du Produit
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedProduct.images.map((image, index) => (
                      <div key={index} className="aspect-square rounded-lg border-2 border-gray-200 overflow-hidden">
                        <img 
                          src={URL.createObjectURL(image)} 
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleEdit(selectedProduct);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-edit-line"></i>
                  Modifier ce produit
                </button>
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium whitespace-nowrap cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
