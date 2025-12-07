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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="enterprise" />
      
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Produits & Services</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Gérez votre catalogue de produits affiliés</p>
              </div>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="w-full sm:w-auto bg-teal-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base"
              >
                <i className="ri-add-line text-lg"></i>
                <span>Ajouter un produit</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200 overflow-x-auto">
            <nav className="flex px-4 sm:px-6 lg:px-8 min-w-max">
              {[
                { id: 'all', label: 'Tous les produits', icon: 'ri-apps-line' },
                { id: 'active', label: 'Actifs', icon: 'ri-checkbox-circle-line' },
                { id: 'draft', label: 'Brouillons', icon: 'ri-draft-line' },
                { id: 'archived', label: 'Archivés', icon: 'ri-archive-line' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-4 border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} text-base sm:text-lg`}></i>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {[
              { label: 'Total produits', value: '24', icon: 'ri-shopping-bag-line', color: 'bg-blue-500' },
              { label: 'Produits actifs', value: '18', icon: 'ri-checkbox-circle-line', color: 'bg-green-500' },
              { label: 'Ventes ce mois', value: '156', icon: 'ri-line-chart-line', color: 'bg-purple-500' },
              { label: 'Revenus', value: '12.5K€', icon: 'ri-money-euro-circle-line', color: 'bg-orange-500' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <i className={`${stat.icon} text-lg sm:text-xl text-white`}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters & Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <i className="ri-search-line absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-lg"></i>
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <select className="px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base">
                  <option>Toutes catégories</option>
                  <option>Électronique</option>
                  <option>Mode</option>
                  <option>Maison</option>
                </select>
                <button className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base">
                  <i className="ri-filter-line"></i>
                  <span>Filtres</span>
                </button>
                <button
                  onClick={handleExportCatalog}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base"
                >
                  <i className="ri-download-line"></i>
                  <span className="hidden sm:inline">Exporter</span>
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 sm:h-56 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'active' ? 'bg-green-100 text-green-700' :
                      product.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {product.status === 'active' ? 'Actif' : product.status === 'draft' ? 'Brouillon' : 'Archivé'}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2">{product.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-teal-600">{product.price}€</p>
                      <p className="text-xs text-gray-500">Commission: {product.commission}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs sm:text-sm text-gray-600">{product.sales} ventes</p>
                      <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap">
                      <i className="ri-edit-line mr-1"></i>
                      Modifier
                    </button>
                    <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                      <i className="ri-more-line text-base sm:text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Ajouter un produit</h3>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom du produit</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Ex: Smartphone XYZ"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Description détaillée du produit..."
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prix (€)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Commission (%)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base">
                    <option>Électronique</option>
                    <option>Mode</option>
                    <option>Maison</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image du produit</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-teal-500 transition-colors cursor-pointer">
                  <i className="ri-upload-cloud-line text-3xl sm:text-4xl text-gray-400 mb-2"></i>
                  <p className="text-sm sm:text-base text-gray-600">Cliquez ou glissez une image ici</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
              <button
                onClick={() => setShowAddProductModal(false)}
                className="flex-1 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Ajouter le produit
              </button>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base whitespace-nowrap"
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
