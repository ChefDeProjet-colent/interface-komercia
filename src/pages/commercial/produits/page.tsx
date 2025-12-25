import { useState } from 'react';
import { Sidebar } from '../../../components/feature/Sidebar';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  enterprise: {
    name: string;
    logo: string;
    sector: string;
  };
  contract: {
    id: string;
    name: string;
    status: 'En cours' | 'Signé' | 'En négociation';
    startDate: string;
    endDate: string;
  };
  stock: number;
  target: number;
  sold: number;
  commission: string;
}

export default function CommercialProduitsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Tous');
  const [filterStatus, setFilterStatus] = useState('Tous');

  const products: Product[] = [
    {
      id: 'P001',
      name: 'Solution CRM Enterprise',
      category: 'Logiciel',
      price: '15 000€',
      description: 'Plateforme CRM complète pour la gestion de la relation client',
      enterprise: {
        name: 'TechCorp Solutions',
        logo: 'TC',
        sector: 'Technologie'
      },
      contract: {
        id: 'C2024-001',
        name: 'Contrat Distribution Logiciels 2024',
        status: 'En cours',
        startDate: '01/01/2024',
        endDate: '31/12/2024'
      },
      stock: 50,
      target: 20,
      sold: 12,
      commission: '8%'
    },
    {
      id: 'P002',
      name: 'Pack Formation Leadership',
      category: 'Formation',
      price: '2 500€',
      description: 'Programme de formation au leadership pour managers',
      enterprise: {
        name: 'Excellence Training',
        logo: 'ET',
        sector: 'Formation'
      },
      contract: {
        id: 'C2024-015',
        name: 'Partenariat Formation Continue',
        status: 'Signé',
        startDate: '15/02/2024',
        endDate: '15/02/2025'
      },
      stock: 100,
      target: 30,
      sold: 28,
      commission: '12%'
    },
    {
      id: 'P003',
      name: 'Système de Sécurité Avancé',
      category: 'Matériel',
      price: '8 500€',
      description: 'Solution de sécurité complète avec caméras et alarmes',
      enterprise: {
        name: 'SecureMax Pro',
        logo: 'SM',
        sector: 'Sécurité'
      },
      contract: {
        id: 'C2024-008',
        name: 'Distribution Équipements Sécurité',
        status: 'En cours',
        startDate: '10/03/2024',
        endDate: '10/03/2025'
      },
      stock: 25,
      target: 15,
      sold: 9,
      commission: '10%'
    },
    {
      id: 'P004',
      name: 'Consulting Stratégique',
      category: 'Service',
      price: '12 000€',
      description: 'Accompagnement stratégique pour transformation digitale',
      enterprise: {
        name: 'Strategy Partners',
        logo: 'SP',
        sector: 'Conseil'
      },
      contract: {
        id: 'C2024-022',
        name: 'Accord Services Conseil',
        status: 'En négociation',
        startDate: '01/05/2024',
        endDate: '31/12/2024'
      },
      stock: 0,
      target: 10,
      sold: 5,
      commission: '15%'
    },
    {
      id: 'P005',
      name: 'Plateforme E-commerce Pro',
      category: 'Logiciel',
      price: '9 800€',
      description: 'Solution e-commerce complète avec gestion des stocks',
      enterprise: {
        name: 'Digital Commerce Inc',
        logo: 'DC',
        sector: 'Technologie'
      },
      contract: {
        id: 'C2024-012',
        name: 'Licence Distribution Logiciels',
        status: 'Signé',
        startDate: '20/01/2024',
        endDate: '20/01/2025'
      },
      stock: 75,
      target: 25,
      sold: 18,
      commission: '9%'
    },
    {
      id: 'P006',
      name: 'Équipement Bureautique Premium',
      category: 'Matériel',
      price: '3 200€',
      description: 'Pack complet d\'équipements bureautiques haut de gamme',
      enterprise: {
        name: 'Office Solutions',
        logo: 'OS',
        sector: 'Équipement'
      },
      contract: {
        id: 'C2024-019',
        name: 'Fourniture Matériel Bureau',
        status: 'En cours',
        startDate: '05/02/2024',
        endDate: '05/02/2025'
      },
      stock: 150,
      target: 40,
      sold: 35,
      commission: '7%'
    },
    {
      id: 'P007',
      name: 'Audit Financier Complet',
      category: 'Service',
      price: '18 500€',
      description: 'Audit financier approfondi et recommandations',
      enterprise: {
        name: 'Finance Experts Group',
        logo: 'FE',
        sector: 'Finance'
      },
      contract: {
        id: 'C2024-005',
        name: 'Prestations Services Financiers',
        status: 'Signé',
        startDate: '01/01/2024',
        endDate: '31/12/2024'
      },
      stock: 0,
      target: 8,
      sold: 6,
      commission: '18%'
    },
    {
      id: 'P008',
      name: 'Formation Cybersécurité',
      category: 'Formation',
      price: '1 800€',
      description: 'Formation complète aux bonnes pratiques de cybersécurité',
      enterprise: {
        name: 'CyberSafe Academy',
        logo: 'CA',
        sector: 'Formation'
      },
      contract: {
        id: 'C2024-028',
        name: 'Programme Formation Sécurité',
        status: 'En cours',
        startDate: '15/03/2024',
        endDate: '15/09/2024'
      },
      stock: 200,
      target: 50,
      sold: 42,
      commission: '11%'
    }
  ];

  const categories = ['Tous', 'Logiciel', 'Formation', 'Matériel', 'Service'];
  const statuses = ['Tous', 'En cours', 'Signé', 'En négociation'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.enterprise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.contract.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'Tous' || product.category === filterCategory;
    const matchesStatus = filterStatus === 'Tous' || product.contract.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours':
        return 'bg-blue-100 text-blue-700';
      case 'Signé':
        return 'bg-green-100 text-green-700';
      case 'En négociation':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    if (percentage >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Catalogue Produits</h1>
                <p className="text-gray-600 mt-1">Gérez tous les produits et services à commercialiser</p>
              </div>
              <div className="flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-lg">
                <i className="ri-shopping-bag-line text-teal-600 text-xl"></i>
                <div>
                  <p className="text-xs text-teal-600 font-medium">Total Produits</p>
                  <p className="text-lg font-bold text-teal-700">{products.length}</p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Rechercher un produit, entreprise ou contrat..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProducts.map((product) => {
              const progressPercentage = (product.sold / product.target) * 100;
              
              return (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  {/* Product Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                            {product.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{product.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-2xl font-bold text-teal-600">{product.price}</p>
                        <p className="text-xs text-gray-500 mt-1">Commission {product.commission}</p>
                      </div>
                    </div>

                    {/* Enterprise Info */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {product.enterprise.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{product.enterprise.name}</p>
                        <p className="text-xs text-gray-600">{product.enterprise.sector}</p>
                      </div>
                    </div>
                  </div>

                  {/* Contract Info */}
                  <div className="p-6 bg-gray-50 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <i className="ri-file-text-line text-gray-400"></i>
                          <p className="text-sm font-semibold text-gray-900">{product.contract.name}</p>
                        </div>
                        <p className="text-xs text-gray-600 ml-6">ID: {product.contract.id}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(product.contract.status)}`}>
                        {product.contract.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600 ml-6">
                      <div className="flex items-center gap-1">
                        <i className="ri-calendar-line"></i>
                        <span>{product.contract.startDate}</span>
                      </div>
                      <span>→</span>
                      <div className="flex items-center gap-1">
                        <i className="ri-calendar-check-line"></i>
                        <span>{product.contract.endDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-600 mb-1">Stock</p>
                        <p className="text-lg font-bold text-gray-900">{product.stock > 0 ? product.stock : 'Illimité'}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600 mb-1">Objectif</p>
                        <p className="text-lg font-bold text-gray-900">{product.target}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600 mb-1">Vendus</p>
                        <p className="text-lg font-bold text-teal-600">{product.sold}</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-700">Progression</span>
                        <span className="text-xs font-bold text-gray-900">{progressPercentage.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${getProgressColor(progressPercentage)}`}
                          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer">
                        <i className="ri-add-line mr-1"></i>
                        Créer une vente
                      </button>
                      <button 
                        onClick={() => window.REACT_APP_NAVIGATE(`/commercial/produits/details/${product.id}`)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-information-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-600">Essayez de modifier vos filtres de recherche</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
