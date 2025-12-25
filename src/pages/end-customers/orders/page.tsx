import { useState, useEffect } from 'react';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    id: number;
    name: string;
    company: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export default function OrdersPage() {
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'CMD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 797,
      items: [
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
      ],
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-01-20'
    },
    {
      id: 'CMD-2024-002',
      date: '2024-01-18',
      status: 'shipped',
      total: 449,
      items: [
        {
          id: 3,
          name: 'Pack Matériel Bureau',
          company: 'OfficePro Supplies',
          price: 449,
          quantity: 1,
          image: 'https://readdy.ai/api/search-image?query=modern%20office%20equipment%20setup%20with%20computer%20monitor%20keyboard%20mouse%20desk%20accessories%20professional%20workspace%20clean%20organized%20bright%20lighting&width=400&height=300&seq=prod3&orientation=landscape'
        }
      ],
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-01-23'
    },
    {
      id: 'CMD-2024-003',
      date: '2024-01-20',
      status: 'processing',
      total: 648,
      items: [
        {
          id: 4,
          name: 'Service Comptabilité',
          company: 'FinanceExperts Ltd',
          price: 149,
          quantity: 1,
          image: 'https://readdy.ai/api/search-image?query=professional%20accounting%20service%20concept%20with%20calculator%20financial%20documents%20charts%20modern%20office%20setting%20business%20finance%20management&width=400&height=300&seq=prod4&orientation=landscape'
        },
        {
          id: 9,
          name: 'Plateforme E-commerce',
          company: 'TechSolutions Inc.',
          price: 499,
          quantity: 1,
          image: 'https://readdy.ai/api/search-image?query=ecommerce%20platform%20interface%20online%20store%20dashboard%20shopping%20cart%20system%20modern%20web%20design%20professional%20business%20solution&width=400&height=300&seq=prod9&orientation=landscape'
        }
      ],
      estimatedDelivery: '2024-01-27'
    },
    {
      id: 'CMD-2024-004',
      date: '2024-01-22',
      status: 'pending',
      total: 328,
      items: [
        {
          id: 10,
          name: 'Formation Excel Avancé',
          company: 'LearnPro Academy',
          price: 129,
          quantity: 1,
          image: 'https://readdy.ai/api/search-image?query=advanced%20excel%20training%20course%20spreadsheet%20data%20analysis%20professional%20education%20modern%20learning%20environment%20computer%20screen%20showing%20formulas&width=400&height=300&seq=prod10&orientation=landscape'
        },
        {
          id: 12,
          name: 'Support IT Mensuel',
          company: 'FinanceExperts Ltd',
          price: 199,
          quantity: 1,
          image: 'https://readdy.ai/api/search-image?query=it%20support%20service%20concept%20technical%20assistance%20computer%20maintenance%20professional%20help%20desk%20modern%20office%20technology%20support&width=400&height=300&seq=prod12&orientation=landscape'
        }
      ],
      estimatedDelivery: '2024-01-29'
    },
    {
      id: 'CMD-2024-005',
      date: '2024-01-10',
      status: 'cancelled',
      total: 249,
      items: [
        {
          id: 5,
          name: 'Logiciel Gestion Stock',
          company: 'InventoryPro',
          price: 249,
          quantity: 1,
          image: 'https://readdy.ai/api/search-image?query=inventory%20management%20software%20interface%20warehouse%20stock%20tracking%20system%20modern%20dashboard%20professional%20business%20tool%20clean%20design&width=400&height=300&seq=prod5&orientation=landscape'
        }
      ]
    }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getStatusInfo = (status: string) => {
    const statusMap = {
      pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700', icon: 'ri-time-line' },
      processing: { label: 'En préparation', color: 'bg-blue-100 text-blue-700', icon: 'ri-loader-4-line' },
      shipped: { label: 'Expédiée', color: 'bg-purple-100 text-purple-700', icon: 'ri-truck-line' },
      delivered: { label: 'Livrée', color: 'bg-green-100 text-green-700', icon: 'ri-check-double-line' },
      cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-700', icon: 'ri-close-circle-line' }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pending;
  };

  const canCancelOrder = (status: string) => {
    return status === 'pending' || status === 'processing';
  };

  const handleCancelOrder = (orderId: string) => {
    setOrderToCancel(orderId);
    setShowCancelModal(true);
  };

  const confirmCancelOrder = () => {
    if (orderToCancel) {
      setOrders(orders.map(order => 
        order.id === orderToCancel 
          ? { ...order, status: 'cancelled' as const }
          : order
      ));
      setShowCancelModal(false);
      setOrderToCancel(null);
      if (selectedOrder?.id === orderToCancel) {
        setSelectedOrder({ ...selectedOrder, status: 'cancelled' as const });
      }
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

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
                className="font-medium text-teal-600 border-b-2 border-teal-600 pb-1 transition-colors cursor-pointer"
              >
                Mes Commandes
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Commandes</h1>
          <p className="text-gray-600">Suivez et gérez toutes vos commandes</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                filterStatus === 'all'
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Toutes ({orders.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                filterStatus === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              En attente ({orders.filter(o => o.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilterStatus('processing')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                filterStatus === 'processing'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              En préparation ({orders.filter(o => o.status === 'processing').length})
            </button>
            <button
              onClick={() => setFilterStatus('shipped')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                filterStatus === 'shipped'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Expédiées ({orders.filter(o => o.status === 'shipped').length})
            </button>
            <button
              onClick={() => setFilterStatus('delivered')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                filterStatus === 'delivered'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Livrées ({orders.filter(o => o.status === 'delivered').length})
            </button>
            <button
              onClick={() => setFilterStatus('cancelled')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                filterStatus === 'cancelled'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Annulées ({orders.filter(o => o.status === 'cancelled').length})
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <i className="ri-shopping-bag-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune commande</h3>
              <p className="text-gray-600 mb-6">Vous n'avez pas encore passé de commande</p>
              <button
                onClick={() => window.REACT_APP_NAVIGATE('/end-customers/produits')}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all whitespace-nowrap"
              >
                Découvrir nos produits
              </button>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              return (
                <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                          <p className="text-sm text-gray-500">
                            Commandé le {new Date(order.date).toLocaleDateString('fr-FR', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${statusInfo.color}`}>
                          <i className={statusInfo.icon}></i>
                          {statusInfo.label}
                        </span>
                        <span className="text-xl font-bold text-gray-900">{order.total.toFixed(2)}€</span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h4>
                            <p className="text-xs text-gray-500 truncate">{item.company}</p>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-gray-600">Qté: {item.quantity}</span>
                              <span className="text-sm font-bold text-teal-600">{(item.price * item.quantity).toFixed(2)}€</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tracking Info */}
                    {order.trackingNumber && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-3">
                          <i className="ri-map-pin-line text-blue-600 text-xl"></i>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-blue-900">Numéro de suivi</p>
                            <p className="text-sm text-blue-700 font-mono">{order.trackingNumber}</p>
                          </div>
                          {order.estimatedDelivery && (
                            <div className="text-right">
                              <p className="text-xs text-blue-600">Livraison estimée</p>
                              <p className="text-sm font-semibold text-blue-900">
                                {new Date(order.estimatedDelivery).toLocaleDateString('fr-FR', { 
                                  day: 'numeric', 
                                  month: 'short' 
                                })}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium whitespace-nowrap"
                      >
                        <i className="ri-eye-line mr-2"></i>
                        Voir les détails
                      </button>
                      {canCancelOrder(order.status) && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium whitespace-nowrap"
                        >
                          <i className="ri-close-circle-line mr-2"></i>
                          Annuler la commande
                        </button>
                      )}
                      {order.status === 'delivered' && (
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium whitespace-nowrap">
                          <i className="ri-repeat-line mr-2"></i>
                          Recommander
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900">Détails de la commande</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              >
                <i className="ri-close-line text-2xl text-gray-600"></i>
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedOrder.id}</h3>
                    <p className="text-gray-600">
                      {new Date(selectedOrder.date).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusInfo(selectedOrder.status).color}`}>
                    <i className={getStatusInfo(selectedOrder.status).icon}></i>
                    {getStatusInfo(selectedOrder.status).label}
                  </span>
                </div>

                {selectedOrder.trackingNumber && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-blue-900 mb-1">Numéro de suivi</p>
                    <p className="text-lg text-blue-700 font-mono">{selectedOrder.trackingNumber}</p>
                    {selectedOrder.estimatedDelivery && (
                      <p className="text-sm text-blue-600 mt-2">
                        Livraison estimée le {new Date(selectedOrder.estimatedDelivery).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-4">Produits commandés</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900">{item.name}</h5>
                        <p className="text-sm text-gray-600">{item.company}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-600">Quantité: {item.quantity}</span>
                          <span className="text-lg font-bold text-teal-600">{(item.price * item.quantity).toFixed(2)}€</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-teal-600">{selectedOrder.total.toFixed(2)}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-error-warning-line text-3xl text-red-600"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Annuler la commande ?</h3>
            <p className="text-gray-600 text-center mb-6">
              Êtes-vous sûr de vouloir annuler cette commande ? Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium whitespace-nowrap"
              >
                Non, garder
              </button>
              <button
                onClick={confirmCancelOrder}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium whitespace-nowrap"
              >
                Oui, annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
