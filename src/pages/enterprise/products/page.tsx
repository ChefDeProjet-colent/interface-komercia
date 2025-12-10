import React, { useState } from 'react';
import Sidebar from '../../../components/feature/Sidebar';
import { Produit } from '../../../types/entreprise';

interface ProductExtended extends Produit {
  id?: string;
  sales?: number;
  revenue?: number;
  avgBasket?: number;
  assignedSales?: number;
  createdAt?: string;
}

export default function EnterpriseProductsPage() {
  const [products, setProducts] = useState<ProductExtended[]>([
    {
      id: '1',
      libelle: 'Solution CRM Enterprise',
      categorie: 'Logiciel',
      description: 'Plateforme complète de gestion de la relation client avec intelligence artificielle intégrée',
      prix: 299,
      status: 'active',
      images: [],
      sales: 145,
      revenue: 43355,
      avgBasket: 299,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      libelle: 'Service Consulting Digital',
      categorie: 'Service Conseil',
      description: 'Accompagnement stratégique pour la transformation digitale des entreprises',
      prix: 1500,
      status: 'active',
      images: [],
      sales: 28,
      revenue: 42000,
      avgBasket: 1500,
      createdAt: '2024-02-01'
    },
    {
      id: '3',
      libelle: 'Plateforme E-learning Pro',
      categorie: 'Formation',
      description: 'Solution complète de formation en ligne avec suivi des compétences',
      prix: 89,
      status: 'active',
      images: [],
      sales: 312,
      revenue: 27768,
      avgBasket: 89,
      createdAt: '2024-01-20'
    }
  ]);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductExtended | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  const [formData, setFormData] = useState<Partial<ProductExtended>>({
    libelle: '',
    categorie: '',
    description: '',
    prix: 0,
    images: [],
    status: 'active'
  });

  // Catégories disponibles
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

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: ProductExtended = {
      id: Date.now().toString(),
      libelle: formData.libelle || '',
      categorie: formData.categorie,
      description: formData.description,
      prix: formData.prix,
      images: formData.images || [],
      status: formData.status || 'active',
      sales: 0,
      revenue: 0,
      avgBasket: 0,
      assignedSales: 0,
      createdAt: new Date().toISOString()
    };

    setProducts([...products, newProduct]);
    setShowAddProductModal(false);
    setFormData({
      libelle: '',
      categorie: '',
      description: '',
      prix: 0,
      images: [],
      status: 'active'
    });
  };

  const handleEdit = (product: ProductExtended) => {
    setSelectedProduct(product);
    setFormData(product);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (selectedProduct) {
      setProducts(products.map(p => 
        p.id === selectedProduct.id ? { ...p, ...formData } : p
      ));
      setShowEditModal(false);
      setFormData({
        libelle: '',
        categorie: '',
        description: '',
        prix: 0,
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

  const handleExportCatalog = () => {
    console.log('Export catalogue');
  };

  // Filtres et recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    const matchesCategory = filterCategory === 'all' || product.categorie === filterCategory;
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && product.status === 'active') ||
                      (activeTab === 'draft' && product.status === 'inactive') ||
                      (activeTab === 'archived' && false);
    return matchesSearch && matchesCategory && matchesStatus && matchesTab;
  });

  const stats = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    draft: products.filter(p => p.status === 'inactive').length,
    archived: 0,
    totalSales: products.reduce((sum, p) => sum + (p.sales || 0), 0),
    totalRevenue: products.reduce((sum, p) => sum + (p.revenue || 0), 0)
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
                <p className="text-sm sm:text-base text-gray-600 mt-1">Gérez votre catalogue de produits</p>
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
              { label: 'Total produits', value: stats.total.toString(), icon: 'ri-shopping-bag-line', color: 'bg-blue-500' },
              { label: 'Produits actifs', value: stats.active.toString(), icon: 'ri-checkbox-circle-line', color: 'bg-green-500' },
              { label: 'Ventes ce mois', value: stats.totalSales.toString(), icon: 'ri-line-chart-line', color: 'bg-purple-500' },
              { label: 'Revenus', value: `${(stats.totalRevenue / 1000).toFixed(1)}K€`, icon: 'ri-money-euro-circle-line', color: 'bg-orange-500' }
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher un produit..."
                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="all">Toutes catégories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
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
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 sm:h-56 bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={URL.createObjectURL(product.images[0])}
                      alt={product.libelle}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <i className="ri-product-hunt-line text-6xl text-teal-300"></i>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'active' ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {product.status === 'active' ? 'Actif' : 'Brouillon'}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="mb-2">
                    {product.categorie && (
                      <span className="text-xs text-teal-600 font-medium">{product.categorie}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2">{product.libelle}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{product.description || 'Aucune description'}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {product.prix !== undefined && (
                        <p className="text-lg sm:text-xl font-bold text-teal-600">{product.prix}€</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs sm:text-sm text-gray-600">{product.sales || 0} ventes</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="flex-1 px-3 py-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap"
                    >
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

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">Aucun produit trouvé</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Ajouter un produit</h3>
            <form onSubmit={handleAddProduct} className="space-y-4 sm:space-y-6">
              {/* Libellé (obligatoire) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du produit <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.libelle}
                  onChange={(e) => setFormData({ ...formData, libelle: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Ex: CRM Premium"
                  required
                />
              </div>

              {/* Catégorie (optionnel) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                <select 
                  value={formData.categorie || ''}
                  onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Description (optionnel) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Description détaillée du produit..."
                />
              </div>

              {/* Prix (optionnel) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prix (€)</label>
                <input
                  type="number"
                  value={formData.prix || ''}
                  onChange={(e) => setFormData({ ...formData, prix: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Images du produit</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-teal-500 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="product-images"
                  />
                  <label htmlFor="product-images" className="cursor-pointer">
                    <i className="ri-upload-cloud-line text-3xl sm:text-4xl text-gray-400 mb-2 block"></i>
                    <p className="text-sm sm:text-base text-gray-600">Cliquez ou glissez des images ici</p>
                  </label>
                </div>
                {formData.images && formData.images.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                        <img src={URL.createObjectURL(img)} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Statut */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Brouillon</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
                <button
                  type="submit"
                  className="flex-1 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors text-sm sm:text-base whitespace-nowrap"
                >
                  Ajouter le produit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProductModal(false);
                    setFormData({
                      libelle: '',
                      categorie: '',
                      description: '',
                      prix: 0,
                      images: [],
                      status: 'active'
                    });
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base whitespace-nowrap"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Modifier le produit</h3>
            <div className="space-y-4 sm:space-y-6">
              {/* Libellé */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du produit <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.libelle}
                  onChange={(e) => setFormData({ ...formData, libelle: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {/* Catégorie */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                <select 
                  value={formData.categorie || ''}
                  onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {/* Prix */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prix (€)</label>
                <input
                  type="number"
                  value={formData.prix || ''}
                  onChange={(e) => setFormData({ ...formData, prix: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                  step="0.01"
                  min="0"
                />
              </div>

              {/* Statut */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Brouillon</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors text-sm sm:text-base whitespace-nowrap"
                >
                  Enregistrer
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedProduct(null);
                    setFormData({
                      libelle: '',
                      categorie: '',
                      description: '',
                      prix: 0,
                      images: [],
                      status: 'active'
                    });
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base whitespace-nowrap"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
