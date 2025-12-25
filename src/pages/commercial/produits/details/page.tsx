
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../../../components/feature/Sidebar';

interface ProductDetail {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  longDescription: string;
  enterprise: {
    name: string;
    logo: string;
    sector: string;
    contact: string;
    email: string;
  };
  contract: {
    id: string;
    name: string;
    status: 'En cours' | 'Signé' | 'En négociation';
    startDate: string;
    endDate: string;
    terms: string;
  };
  stock: number;
  target: number;
  sold: number;
  commission: string;
  images: string[];
  features: string[];
  specifications: { label: string; value: string }[];
  salesHistory: { month: string; sales: number; revenue: number }[];
}

export default function CommercialProduitsDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);

  // Données de démonstration - En production, ces données viendraient de l'API
  const productsData: { [key: string]: ProductDetail } = {
    'P001': {
      id: 'P001',
      name: 'Solution CRM Enterprise',
      category: 'Logiciel',
      price: '15 000€',
      description: 'Plateforme CRM complète pour la gestion de la relation client',
      longDescription: 'Notre solution CRM Enterprise est une plateforme complète et intuitive conçue pour optimiser la gestion de vos relations clients. Elle intègre des fonctionnalités avancées d\'automatisation, d\'analyse prédictive et de reporting en temps réel. Parfaite pour les entreprises de toutes tailles souhaitant améliorer leur efficacité commerciale et leur satisfaction client.',
      enterprise: {
        name: 'TechCorp Solutions',
        logo: 'TC',
        sector: 'Technologie',
        contact: '+33 1 23 45 67 89',
        email: 'contact@techcorp.fr'
      },
      contract: {
        id: 'C2024-001',
        name: 'Contrat Distribution Logiciels 2024',
        status: 'En cours',
        startDate: '01/01/2024',
        endDate: '31/12/2024',
        terms: 'Commission de 8% sur chaque vente. Objectif minimum de 20 licences par an. Support technique inclus.'
      },
      stock: 50,
      target: 20,
      sold: 12,
      commission: '8%',
      images: [
        'https://readdy.ai/api/search-image?query=modern%20professional%20CRM%20software%20dashboard%20interface%20with%20clean%20design%20showing%20customer%20data%20analytics%20charts%20graphs%20and%20sales%20pipeline%20on%20computer%20screen%20in%20bright%20office%20environment%20with%20blue%20and%20white%20color%20scheme&width=800&height=600&seq=crm001&orientation=landscape',
        'https://readdy.ai/api/search-image?query=business%20team%20using%20CRM%20software%20on%20laptop%20computer%20in%20modern%20office%20workspace%20with%20data%20visualization%20and%20customer%20management%20interface%20displayed%20on%20screen%20professional%20lighting&width=800&height=600&seq=crm002&orientation=landscape',
        'https://readdy.ai/api/search-image?query=close%20up%20view%20of%20CRM%20software%20interface%20showing%20contact%20management%20customer%20profiles%20and%20communication%20tools%20on%20tablet%20device%20with%20clean%20modern%20design%20and%20intuitive%20layout&width=800&height=600&seq=crm003&orientation=landscape'
      ],
      features: [
        'Gestion complète des contacts et leads',
        'Automatisation des processus de vente',
        'Tableau de bord analytique en temps réel',
        'Intégration email et calendrier',
        'Application mobile iOS et Android',
        'Rapports personnalisables',
        'Support client 24/7',
        'Formation incluse'
      ],
      specifications: [
        { label: 'Type de licence', value: 'Annuelle par utilisateur' },
        { label: 'Nombre d\'utilisateurs', value: 'Illimité' },
        { label: 'Stockage', value: '500 GB cloud' },
        { label: 'Support', value: '24/7 en français' },
        { label: 'Mises à jour', value: 'Automatiques incluses' },
        { label: 'Formation', value: '2 jours sur site' },
        { label: 'Garantie', value: '12 mois' },
        { label: 'Délai de livraison', value: '48h après commande' }
      ],
      salesHistory: [
        { month: 'Janvier', sales: 2, revenue: 30000 },
        { month: 'Février', sales: 3, revenue: 45000 },
        { month: 'Mars', sales: 2, revenue: 30000 },
        { month: 'Avril', sales: 5, revenue: 75000 }
      ]
    }
  };

  // Add error handling for missing product
  const product = productsData[id || 'P001'] || productsData['P001'];
  
  // Prevent division by zero
  const progressPercentage = product.target > 0 
    ? (product.sold / product.target) * 100 
    : 0;

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
    <>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        
        <div className="flex-1 lg:ml-64">
          <div className="p-6 lg:p-8">
            {/* Breadcrumb */}
            <div className="mb-6">
              <button
                onClick={() => navigate('/commercial/produits')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <i className="ri-arrow-left-line"></i>
                <span>Retour au catalogue</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Colonne principale */}
              <div className="lg:col-span-2 space-y-6">
                {/* Images du produit */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="mb-4">
                    <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={product.images[selectedImage]}
                        alt={product.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 overflow-x-auto">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          selectedImage === index ? 'border-teal-500' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover object-top" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description détaillée */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Description du produit</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">{product.longDescription}</p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Fonctionnalités principales</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <i className="ri-checkbox-circle-fill text-teal-500 mt-1 flex-shrink-0"></i>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spécifications techniques */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Spécifications techniques</h2>
                  <div className="space-y-3">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <span className="text-gray-600 font-medium">{spec.label}</span>
                        <span className="text-gray-900 font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Historique des ventes */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Historique des ventes</h2>
                  <div className="space-y-3">
                    {product.salesHistory.map((history, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">{history.month}</p>
                          <p className="text-sm text-gray-600">{history.sales} ventes</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-teal-600">{history.revenue.toLocaleString()}€</p>
                          <p className="text-xs text-gray-500">Chiffre d'affaires</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Colonne latérale */}
              <div className="space-y-6">
                {/* Informations principales */}
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      {product.category}
                    </span>
                  </div>
                  
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <p className="text-gray-600 mb-6">{product.description}</p>

                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-teal-600">{product.price}</span>
                      <span className="text-gray-500">/ licence</span>
                    </div>
                    <p className="text-sm text-gray-600">Commission: <span className="font-semibold text-teal-600">{product.commission}</span></p>
                  </div>

                  {/* Statistiques */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">Stock</p>
                      <p className="text-lg font-bold text-gray-900">{product.stock}</p>
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

                  {/* Barre de progression */}
                  <div className="mb-6">
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
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium whitespace-nowrap cursor-pointer">
                      <i className="ri-add-line mr-2"></i>
                      Créer une vente
                    </button>
                    <button 
                      onClick={() => setShowContactModal(true)}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-mail-line mr-2"></i>
                      Contacter l'entreprise
                    </button>
                  </div>
                </div>

                {/* Informations entreprise */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Entreprise</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                      {product.enterprise.logo}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{product.enterprise.name}</p>
                      <p className="text-sm text-gray-600">{product.enterprise.sector}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-phone-line"></i>
                      <span>{product.enterprise.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-mail-line"></i>
                      <span>{product.enterprise.email}</span>
                    </div>
                  </div>
                </div>

                {/* Informations contrat */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Contrat associé</h3>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900 text-sm">{product.contract.name}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.contract.status)}`}>
                        {product.contract.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">ID: {product.contract.id}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-calendar-line"></i>
                      <span>Début: {product.contract.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-calendar-check-line"></i>
                      <span>Fin: {product.contract.endDate}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-700 leading-relaxed">{product.contract.terms}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de contact */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Contacter l'entreprise</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                  {product.enterprise.logo}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{product.enterprise.name}</p>
                  <p className="text-sm text-gray-600">{product.enterprise.sector}</p>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`tel:${product.enterprise.contact}`}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <i className="ri-phone-line text-teal-600 text-lg"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Téléphone</p>
                    <p className="text-sm text-gray-600">{product.enterprise.contact}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${product.enterprise.email}`}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <i className="ri-mail-line text-teal-600 text-lg"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">{product.enterprise.email}</p>
                  </div>
                </a>
              </div>
            </div>

            <button
              onClick={() => setShowContactModal(false)}
              className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium whitespace-nowrap cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
