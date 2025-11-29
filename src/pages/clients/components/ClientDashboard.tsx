
import { useState } from 'react';
import { Card } from '../../../components/base/Card';
import { Button } from '../../../components/base/Button';
import { Badge } from '../../../components/base/Badge';
import { LoadingButton } from '../../../components/base/LoadingButton';

// Mock data pour les clients finaux
const recentProducts = [
  {
    id: 1,
    name: "CRM Collaboratif Pro",
    category: "Gestion Client",
    price: "89€/mois",
    originalPrice: "120€/mois",
    image: "https://readdy.ai/api/search-image?query=modern%20collaborative%20CRM%20software%20interface%20with%20clean%20dashboard%2C%20professional%20business%20tools%2C%20blue%20and%20white%20color%20scheme%2C%20minimalist%20design%2C%20high-tech%20workspace&width=300&height=200&seq=crm-collab&orientation=landscape",
    status: "Consulté",
    lastViewed: "Il y a 2 heures",
    description: "Solution CRM complète pour optimiser vos relations clients et booster vos ventes",
    rating: 4.8,
    reviews: 156,
    badge: "Très populaire",
    trialDays: 14,
  },
  {
    id: 2,
    name: "Formation Prospection Commerciale",
    category: "Formation",
    price: "299€",
    image: "https://readdy.ai/api/search-image?query=professional%20sales%20training%20course%2C%20business%20people%20in%20modern%20conference%20room%2C%20presentation%20screens%2C%20collaborative%20learning%20environment%2C%20corporate%20training%20setup&width=300&height=200&seq=sales-training&orientation=landscape",
    status: "Ajouté au panier",
    lastViewed: "Hier",
    description: "Formation complète en techniques de prospection et négociation commerciale",
    rating: 4.9,
    reviews: 89,
    badge: "Certifiant",
  },
  {
    id: 3,
    name: "Analytics Business Intelligence",
    category: "Analyse",
    price: "149€/mois",
    originalPrice: "199€/mois",
    image: "https://readdy.ai/api/search-image?query=business%20intelligence%20analytics%20dashboard%20with%20charts%20graphs%20data%20visualization%2C%20modern%20office%20setting%2C%20professional%20analytics%20tools%2C%20blue%20purple%20gradient&width=300&height=200&seq=bi-analytics&orientation=landscape",
    status: "Essai gratuit actif",
    lastViewed: "Il y a 1 jour",
    description: "Plateforme d'analyse de données avec tableaux de bord interactifs et IA prédictive",
    rating: 4.7,
    reviews: 203,
    badge: "Recommandé",
    trialDays: 30,
  },
];

const availableProducts = [
  {
    id: 1,
    name: "CRM Collaboratif Pro",
    category: "Gestion Client",
    price: "89€/mois",
    originalPrice: "120€/mois",
    image: "https://readdy.ai/api/search-image?query=advanced%20CRM%20software%20interface%20with%20customer%20management%20tools%2C%20sales%20pipeline%20and%20contact%20management%2C%20modern%20business%20application%20design%2C%20professional%20blue%20theme&width=400&height=250&seq=crm-pro&orientation=landscape",
    description: "Solution CRM complète pour optimiser vos relations clients et booster vos ventes avec des fonctionnalités avancées",
    features: ["Suivi des ventes", "Gestion des contacts", "Rapports automatisés", "Intégration email", "Support 24/7"],
    rating: 4.8,
    reviews: 156,
    badge: "Très populaire",
    trialDays: 14,
    category_filter: "crm",
  },
  {
    id: 2,
    name: "Formation Gestion d'Équipes",
    category: "Formation",
    price: "299€",
    image: "https://readdy.ai/api/search-image?query=team%20management%20training%20course%2C%20professional%20business%20coaching%2C%20leadership%20development%2C%20modern%20conference%20room%20with%20presentation%20screen%2C%20corporate%20learning%20environment&width=400&height=250&seq=team-mgmt&orientation=landscape",
    description: "Formation complète en gestion d'équipes et leadership pour managers et dirigeants avec certification",
    features: ["12 modules interactifs", "Certification incluse", "Support 24/7", "Accès à vie", "Coaching personnalisé"],
    rating: 4.9,
    reviews: 89,
    badge: "Certifiant",
    category_filter: "formation",
  },
  {
    id: 3,
    name: "Analytics Business Intelligence",
    category: "Analyse",
    price: "149€/mois",
    originalPrice: "199€/mois",
    image: "https://readdy.ai/api/search-image?query=business%20intelligence%20dashboard%20with%20data%20analytics%2C%20charts%20graphs%20and%20KPI%20metrics%2C%20modern%20data%20visualization%20interface%2C%20professional%20analytics%20platform%2C%20blue%20purple%20gradient&width=400&height=250&seq=analytics-bi&orientation=landscape",
    description: "Plateforme d'analyse de données avec tableaux de bord interactifs, insights IA et prédictions avancées",
    features: ["Tableaux de bord personnalisés", "IA prédictive", "Exports automatisés", "API complète", "Alertes intelligentes"],
    rating: 4.7,
    reviews: 203,
    badge: "Recommandé",
    trialDays: 30,
    category_filter: "analytics",
  },
  {
    id: 4,
    name: "E-commerce Suite Complète",
    category: "E-commerce",
    price: "199€/mois",
    image: "https://readdy.ai/api/search-image?query=e-commerce%20platform%20interface%20with%20online%20store%20management%2C%20product%20catalog%2C%20order%20processing%2C%20modern%20retail%20technology%2C%20professional%20commerce%20tools&width=400&height=250&seq=ecommerce-suite&orientation=landscape",
    description: "Solution e-commerce complète avec gestion des stocks, paiements sécurisés et livraisons optimisées",
    features: ["Boutique en ligne", "Gestion stocks", "Paiements sécurisés", "Multi-devises", "Marketing intégré"],
    rating: 4.6,
    reviews: 134,
    badge: "Premium",
    trialDays: 7,
    category_filter: "ecommerce",
  },
  {
    id: 5,
    name: "Marketing Automation Pro",
    category: "Marketing",
    price: "129€/mois",
    image: "https://readdy.ai/api/search-image?query=marketing%20automation%20platform%20with%20email%20campaigns%2C%20lead%20nurturing%2C%20customer%20journey%20mapping%2C%20modern%20marketing%20tools%20interface%2C%20professional%20design&width=400&height=250&seq=marketing-auto&orientation=landscape",
    description: "Automatisez vos campagnes marketing avec des workflows intelligents et un suivi avancé des performances",
    features: ["Email automation", "Lead scoring", "A/B testing", "Intégrations CRM", "Analytics avancés"],
    rating: 4.5,
    reviews: 178,
    badge: "Tendance",
    trialDays: 21,
    category_filter: "marketing",
  },
  {
    id: 6,
    name: "Comptabilité Simplifiée",
    category: "Finance",
    price: "79€/mois",
    image: "https://readdy.ai/api/search-image?query=accounting%20software%20interface%20with%20financial%20reports%2C%20invoice%20management%2C%20expense%20tracking%2C%20modern%20bookkeeping%20tools%2C%20professional%20finance%20application&width=400&height=250&seq=accounting-simple&orientation=landscape",
    description: "Gérez votre comptabilité facilement avec des outils automatisés et des rapports en temps réel",
    features: ["Facturation automatique", "Rapports financiers", "TVA automatisée", "Banque connectée", "Conformité légale"],
    rating: 4.4,
    reviews: 92,
    badge: "Essentiel",
    trialDays: 15,
    category_filter: "finance",
  },
];

const commercials = [
  {
    id: 1,
    name: "Jean Dupont",
    specialty: "Spécialiste CRM & Ventes",
    zone: "France & Belgique",
    experience: "8 ans",
    rating: 4.9,
    reviews: 127,
    satisfaction: "98%",
    languages: ["Français", "Anglais"],
    certifications: ["Salesforce", "HubSpot", "Microsoft Dynamics"],
    availability: "Disponible",
    image: "https://readdy.ai/api/search-image?query=professional%20business%20consultant%20man%20in%20modern%20office%2C%20friendly%20expert%20advisor%2C%20business%20suit%2C%20confident%20smile%2C%20corporate%20headshot%20style%2C%20professional%20lighting&width=150&height=150&seq=jean-dupont&orientation=squarish",
    description: "Expert en solutions CRM avec une approche personnalisée pour chaque client. Spécialisé dans l'optimisation des processus de vente.",
    contact: "jean.dupont@company.com",
    phone: "+33 1 23 45 67 89",
    hourlyRate: "95€/h",
    responseTime: "< 2h",
  },
  {
    id: 2,
    name: "Marie Laurent",
    specialty: "Marketing Digital & Analytics",
    zone: "Europe",
    experience: "10 ans",
    rating: 4.8,
    reviews: 156,
    satisfaction: "97%",
    languages: ["Français", "Anglais", "Espagnol"],
    certifications: ["Google Ads", "Facebook Blueprint", "Google Analytics"],
    availability: "Occupée",
    image: "https://readdy.ai/api/search-image?query=professional%20business%20woman%20consultant%20in%20modern%20office%2C%20marketing%20expert%2C%20business%20attire%2C%20confident%20professional%2C%20corporate%20headshot%20style%2C%20friendly%20demeanor&width=150&height=150&seq=marie-laurent&orientation=squarish",
    description: "Spécialiste en stratégies marketing digitales et automation. Experte en analyse de données et optimisation ROI.",
    contact: "marie.laurent@company.com",
    phone: "+33 1 23 45 67 90",
    hourlyRate: "110€/h",
    responseTime: "< 4h",
  },
  {
    id: 3,
    name: "Pierre Martin",
    specialty: "E-commerce & Solutions Digitales",
    zone: "France",
    experience: "7 ans",
    rating: 4.7,
    reviews: 98,
    satisfaction: "96%",
    languages: ["Français", "Anglais"],
    certifications: ["Shopify Expert", "WooCommerce", "Magento"],
    availability: "Disponible",
    image: "https://readdy.ai/api/search-image?query=professional%20business%20consultant%20man%2C%20e-commerce%20expert%2C%20modern%20office%20background%2C%20business%20casual%20attire%2C%20approachable%20professional%2C%20corporate%20photography&width=150&height=150&seq=pierre-martin&orientation=squarish",
    description: "Expert en solutions e-commerce et transformation digitale. Accompagne les entreprises dans leur digitalisation.",
    contact: "pierre.martin@company.com",
    phone: "+33 1 23 45 67 91",
    hourlyRate: "85€/h",
    responseTime: "< 3h",
  },
  {
    id: 4,
    name: "Sophie Dubois",
    specialty: "Formation & Développement RH",
    zone: "International",
    experience: "12 ans",
    rating: 4.9,
    reviews: 203,
    satisfaction: "99%",
    languages: ["Français", "Anglais", "Allemand"],
    certifications: ["CIPD", "Scrum Master", "PMP"],
    availability: "Disponible",
    image: "https://readdy.ai/api/search-image?query=professional%20business%20woman%20trainer%2C%20corporate%20learning%20expert%2C%20modern%20training%20environment%2C%20professional%20attire%2C%20confident%20educator%2C%20business%20headshot&width=150&height=150&seq=sophie-dubois&orientation=squarish",
    description: "Experte en formation professionnelle et développement des compétences. Spécialisée dans la transformation RH.",
    contact: "sophie.dubois@company.com",
    phone: "+33 1 23 45 67 92",
    hourlyRate: "120€/h",
    responseTime: "< 1h",
  },
];

const supportTickets = [
  {
    id: "TICK-2024-001",
    title: "Problème de connexion CRM",
    status: "En cours",
    priority: "Haute",
    created: "22 Jan 2024",
    lastUpdate: "Il y a 2h",
    assignedTo: "Support Technique",
    category: "Technique",
    description: "Impossible de se connecter au CRM depuis ce matin",
  },
  {
    id: "TICK-2024-002",
    title: "Question sur facturation",
    status: "Résolu",
    priority: "Normale",
    created: "20 Jan 2024",
    lastUpdate: "Hier",
    assignedTo: "Service Client",
    category: "Facturation",
    description: "Demande d'explication sur la facture de janvier",
  },
  {
    id: "TICK-2024-003",
    title: "Demande de formation",
    status: "En attente",
    priority: "Basse",
    created: "18 Jan 2024",
    lastUpdate: "Il y a 2j",
    assignedTo: "Équipe Formation",
    category: "Formation",
    description: "Souhait de formation sur les nouvelles fonctionnalités",
  },
];

const faqItems = [
  {
    id: 1,
    question: "Comment configurer votre CRM collaboratif ?",
    category: "Technique",
    views: 1250,
    helpful: 89,
    answer: "Guide complet de configuration en 5 étapes simples",
  },
  {
    id: 2,
    question: "FAQ sur les abonnements et paiements",
    category: "Facturation",
    views: 980,
    helpful: 76,
    answer: "Toutes les informations sur nos plans tarifaires",
  },
  {
    id: 3,
    question: "Comment accéder aux formations en ligne ?",
    category: "Formation",
    views: 756,
    helpful: 82,
    answer: "Accès direct depuis votre espace client",
  },
  {
    id: 4,
    question: "Résolution des problèmes de connexion",
    category: "Technique",
    views: 634,
    helpful: 71,
    answer: "Solutions aux problèmes de connexion les plus fréquents",
  },
  {
    id: 5,
    question: "Gestion des utilisateurs et permissions",
    category: "Compte",
    views: 523,
    helpful: 85,
    answer: "Comment gérer les accès et permissions de votre équipe",
  },
  {
    id: 6,
    question: "Intégrations avec d'autres outils",
    category: "Technique",
    views: 445,
    helpful: 78,
    answer: "Liste des intégrations disponibles et guides d'installation",
  },
];

const notifications = [
  {
    id: 1,
    type: "warning",
    title: "Essai gratuit expire bientôt",
    message: "Votre essai gratuit Analytics expire dans 3 jours. Passez à un abonnement premium pour continuer.",
    time: "Il y a 2h",
    action: "Voir les offres",
    urgent: true,
  },
  {
    id: 2,
    type: "success",
    title: "Nouvelle fonctionnalité disponible",
    message: "Le module de reporting avancé est maintenant disponible dans votre CRM.",
    time: "Il y a 1j",
    action: "Découvrir",
    urgent: false,
  },
  {
    id: 3,
    type: "info",
    title: "Offre spéciale partenaire",
    message: "Bénéficiez de 30% de réduction sur tous nos modules complémentaires jusqu'au 31 janvier.",
    time: "Il y a 2j",
    action: "Profiter de l'offre",
    urgent: false,
  },
  {
    id: 4,
    type: "info",
    title: "Nouveau commercial disponible",
    message: "Sarah Martin, spécialiste SaaS, est maintenant disponible pour des consultations.",
    time: "Il y a 3j",
    action: "Contacter",
    urgent: false,
  },
];

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedCommercial, setSelectedCommercial] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "agent",
      message: "Bonjour ! Je suis Sarah, votre assistante. Comment puis-je vous aider aujourd'hui ?",
      time: "Maintenant",
    },
  ]);

  const tabs = [
    { id: "dashboard", label: "Tableau de Bord", icon: "ri-dashboard-line", count: 0 },
    { id: "commercials", label: "Nos Commerciaux", icon: "ri-team-line", count: 4 },
    { id: "products", label: "Produits & Services", icon: "ri-shopping-bag-line", count: 6 },
    { id: "support", label: "Assistance", icon: "ri-customer-service-line", count: 1 },
    { id: "history", label: "Historique", icon: "ri-history-line", count: 8 },
  ];

  const handleContactCommercial = (commercial: any) => {
    setSelectedCommercial(commercial);
    setShowContactModal(true);
  };

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleStartTrial = (product: any) => {
    setSelectedProduct(product);
    setShowTrialModal(true);
  };

  const handlePurchase = (product: any) => {
    setSelectedProduct(product);
    setShowPurchaseModal(true);
  };

  const handleSubmitContact = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowContactModal(false);
    alert("Message envoyé avec succès !");
  };

  const handleSubmitTrial = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowTrialModal(false);
    alert("Essai gratuit activé !");
  };

  const handleSubmitPurchase = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowPurchaseModal(false);
    alert("Commande confirmée !");
  };

  const handleSubmitTicket = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setShowTicketModal(false);
    alert("Ticket créé avec succès !");
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { sender: "user", message: chatMessage, time: "Maintenant" },
        {
          sender: "agent",
          message: "Merci pour votre message. Un agent va vous répondre dans quelques instants.",
          time: "Maintenant",
        },
      ]);
      setChatMessage("");
    }
  };

  const filteredProducts = availableProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category_filter === categoryFilter;
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "low" && parseInt(product.price) < 100) ||
      (priceFilter === "medium" &&
        parseInt(product.price) >= 100 &&
        parseInt(product.price) < 200) ||
      (priceFilter === "high" && parseInt(product.price) >= 200);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // A. Tableau de Bord Principal
  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Bannière publicitaire en haut */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">🚀 Offres Spéciales Clients Finaux</h3>
            <p className="text-blue-100">Découvrez nos solutions premium avec 30% de réduction - Offre limitée !</p>
          </div>
          <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
            Découvrir
          </Button>
        </div>
      </div>

      {/* Résumé des activités */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <i className="ri-shopping-bag-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Services Actifs</p>
              <p className="text-2xl font-bold text-blue-900">5</p>
              <p className="text-xs text-blue-500">+2 ce mois</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <i className="ri-time-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Essais en Cours</p>
              <p className="text-2xl font-bold text-green-900">2</p>
              <p className="text-xs text-green-500">Expire dans 12j</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <i className="ri-team-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">Consultations</p>
              <p className="text-2xl font-bold text-purple-900">8</p>
              <p className="text-xs text-purple-500">+3 cette semaine</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <i className="ri-customer-service-line text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-orange-600">Support Tickets</p>
              <p className="text-2xl font-bold text-orange-900">1</p>
              <p className="text-xs text-orange-500">En cours</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Applications/Services récemment consultés */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Applications/Services Récemment Consultés
              </h3>
              <Button variant="outline" size="sm" onClick={() => setActiveTab("products")}>
                Voir tout
                <i className="ri-arrow-right-line ml-2"></i>
              </Button>
            </div>
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleViewProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      {product.badge && (
                        <Badge variant="secondary" className="text-xs">{product.badge}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium text-blue-600">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                        )}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          product.status === "Consulté"
                            ? "bg-gray-100 text-gray-700"
                            : product.status === "Ajouté au panier"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.status}
                      </span>
                      <span className="text-xs text-gray-500">{product.lastViewed}</span>
                      {product.rating && (
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-yellow-500">★</span>
                          <span className="text-xs text-gray-600">{product.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Voir détails
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Historique des interactions avec les commerciaux */}
          <Card className="p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Historique des Interactions avec les Commerciaux</h3>
              <Button variant="outline" size="sm" onClick={() => setActiveTab("history")}>
                Voir tout
                <i className="ri-arrow-right-line ml-2"></i>
              </Button>
            </div>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  commercial: "Jean Dupont",
                  type: "Consultation CRM",
                  date: "15 Jan 2024",
                  time: "14:30",
                  status: "Terminé",
                  duration: "45 min",
                  rating: 4.9,
                },
                {
                  id: 2,
                  commercial: "Marie Laurent",
                  type: "Démonstration Analytics",
                  date: "12 Jan 2024",
                  time: "10:00",
                  status: "Terminé",
                  duration: "60 min",
                  rating: 4.8,
                },
                {
                  id: 3,
                  commercial: "Sophie Dubois",
                  type: "Formation équipe",
                  date: "10 Jan 2024",
                  time: "09:00",
                  status: "Planifié",
                  duration: "120 min",
                  rating: null,
                },
              ].map((interaction) => (
                <div
                  key={interaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="ri-user-line text-blue-600"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{interaction.commercial}</h4>
                      <p className="text-sm text-gray-600">{interaction.type}</p>
                      <p className="text-xs text-gray-500">
                        {interaction.date} à {interaction.time} • {interaction.duration}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        interaction.status === "Terminé"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {interaction.status}
                    </span>
                    {interaction.rating && (
                      <div className="flex items-center justify-end space-x-1 mt-1">
                        <span className="text-xs text-yellow-500">★</span>
                        <span className="text-xs text-gray-600">{interaction.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar avec notifications et actions rapides */}
        <div className="space-y-6">
          {/* Notifications sur les offres ou promotions en cours */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    notification.type === "warning"
                      ? "bg-orange-50 border-orange-400"
                      : notification.type === "success"
                      ? "bg-green-50 border-green-400"
                      : "bg-blue-50 border-blue-400"
                  } ${notification.urgent ? "ring-2 ring-red-200" : ""}`}
                >
                  <div className="flex items-start">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        notification.type === "warning"
                          ? "bg-orange-100"
                          : notification.type === "success"
                          ? "bg-green-100"
                          : "bg-blue-100"
                      }`}
                    >
                      <i
                        className={`${
                          notification.type === "warning"
                            ? "ri-alert-line text-orange-600"
                            : notification.type === "success"
                            ? "ri-check-line text-green-600"
                            : "ri-information-line text-blue-600"
                        } text-sm`}
                      ></i>
                    </div>
                    <div className="ml-3 flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        <Button size="sm" variant="outline">
                          {notification.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Accès rapide */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Accès Rapide</h3>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setActiveTab("commercials")}
              >
                <i className="ri-team-line mr-3"></i>
                Contacter un Commercial
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setActiveTab("products")}
              >
                <i className="ri-shopping-bag-line mr-3"></i>
                Parcourir le Catalogue
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setActiveTab("support")}
              >
                <i className="ri-customer-service-line mr-3"></i>
                Ouvrir un Ticket
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setActiveTab("history")}
              >
                <i className="ri-file-text-line mr-3"></i>
                Mes Factures
              </Button>
            </div>
          </Card>

          {/* Bannière publicitaire sidebar */}
          <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-6 text-white">
            <div className="text-center">
              <h4 className="font-bold mb-2">🎯 Services de Conseil Personnalisés</h4>
              <p className="text-sm text-green-100 mb-4">Bénéficiez de l'expertise de nos consultants</p>
              <Button variant="outline" size="sm" className="bg-white text-green-600 hover:bg-green-50">
                Consulter un Expert
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bannière publicitaire en bas */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">💼 Solutions Entreprise Avancées</h3>
            <p className="text-purple-100">Des solutions sur-mesure pour les PME et grandes entreprises</p>
          </div>
          <Button variant="outline" className="bg-white text-purple-600 hover:bg-purple-50">
            Voir Solutions
          </Button>
        </div>
      </div>
    </div>
  );

  // B. Section "Accès aux Commerciaux"
  const renderCommercialsSection = () => (
    <div className="space-y-8">
      {/* Bannière publicitaire en haut */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">👥 Nos Experts à Votre Service</h3>
            <p className="text-indigo-100">Consultations personnalisées avec nos spécialistes certifiés</p>
          </div>
          <Button variant="outline" className="bg-white text-indigo-600 hover:bg-indigo-50">
            Réserver une Consultation
          </Button>
        </div>
      </div>

      {/* Statistiques commerciaux */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Commerciaux Disponibles</p>
              <p className="text-2xl font-bold text-blue-900">4</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <i className="ri-user-line text-white text-xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Consultations ce Mois</p>
              <p className="text-2xl font-bold text-green-900">8</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <i className="ri-calendar-check-line text-white text-xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Satisfaction Moyenne</p>
              <p className="text-2xl font-bold text-purple-900">4.8★</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
              <i className="ri-star-line text-white text-xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Temps de Réponse</p>
              <p className="text-2xl font-bold text-orange-900">&lt; 2h</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <i className="ri-time-line text-white text-xl"></i>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des commerciaux disponibles */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Commerciaux Disponibles</h3>
              <div className="flex space-x-2">
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                  <option>Toutes spécialités</option>
                  <option>CRM & Ventes</option>
                  <option>Marketing Digital</option>
                  <option>E-commerce</option>
                  <option>Formation</option>
                </select>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                  <option>Toutes zones</option>
                  <option>France</option>
                  <option>Europe</option>
                  <option>International</option>
                </select>
              </div>
            </div>
            <div className="space-y-6">
              {commercials.map((commercial) => (
                <div
                  key={commercial.id}
                  className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={commercial.image}
                    alt={commercial.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-medium text-gray-900">{commercial.name}</h4>
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          commercial.availability === "Disponible"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {commercial.availability}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-blue-600 mb-2">{commercial.specialty}</p>
                    <p className="text-sm text-gray-600 mb-3">{commercial.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <i className="ri-map-pin-line text-gray-400 text-sm"></i>
                          <span className="text-sm text-gray-600">{commercial.zone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <i className="ri-time-line text-gray-400 text-sm"></i>
                          <span className="text-sm text-gray-600">{commercial.experience} d'expérience</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <i className="ri-money-euro-circle-line text-gray-400 text-sm"></i>
                          <span className="text-sm text-gray-600">{commercial.hourlyRate}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <i className="ri-star-line text-yellow-500 text-sm"></i>
                          <span className="text-sm text-gray-600">{commercial.rating}★ ({commercial.reviews} avis)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <i className="ri-heart-line text-red-500 text-sm"></i>
                          <span className="text-sm text-gray-600">{commercial.satisfaction} satisfaction</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <i className="ri-timer-line text-blue-500 text-sm"></i>
                          <span className="text-sm text-gray-600">Répond en {commercial.responseTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      <div>
                        <span className="text-xs text-gray-500">Langues: </span>
                        <span className="text-xs text-gray-700">{commercial.languages.join(", ")}</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Certifications: </span>
                        <span className="text-xs text-gray-700">{commercial.certifications.join(", ")}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        size="sm"
                        onClick={() => handleContactCommercial(commercial)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <i className="ri-message-line mr-2"></i>
                        Contacter
                      </Button>
                      <Button size="sm" variant="outline">
                        <i className="ri-phone-line mr-2"></i>
                        Appeler
                      </Button>
                      <Button size="sm" variant="outline">
                        <i className="ri-calendar-line mr-2"></i>
                        Planifier RDV
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Suivi des interactions */}
          <Card className="p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Suivi des Interactions</h3>
              <Button variant="outline" size="sm">
                Voir tout
                <i className="ri-arrow-right-line ml-2"></i>
              </Button>
            </div>
            <div className="space-y-4">
              {[
                {
                  commercial: "Jean Dupont",
                  type: "Consultation CRM",
                  date: "15 Jan 2024",
                  status: "Terminé",
                  result: "Devis envoyé",
                  nextAction: "Suivi dans 3 jours",
                },
                {
                  commercial: "Marie Laurent",
                  type: "Démonstration Analytics",
                  date: "12 Jan 2024",
                  status: "Terminé",
                  result: "Essai activé",
                  nextAction: "Formation prévue",
                },
                {
                  commercial: "Sophie Dubois",
                  type: "Formation équipe",
                  date: "10 Jan 2024",
                  status: "Planifié",
                  result: "En attente",
                  nextAction: "RDV confirmé",
                },
              ].map((interaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{interaction.commercial}</h4>
                    <p className="text-sm text-gray-600">{interaction.type} • {interaction.date}</p>
                    <p className="text-xs text-gray-500">Résultat: {interaction.result}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        interaction.status === "Terminé"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {interaction.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{interaction.nextAction}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Détails d'un commercial (si sélectionné) */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Commercial Recommandé</h3>
            <div className="text-center">
              <img
                src={commercials[0].image}
                alt={commercials[0].name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="font-medium text-gray-900 mb-1">{commercials[0].name}</h4>
              <p className="text-sm text-blue-600 mb-2">{commercials[0].specialty}</p>
              <div className="flex items-center justify-center space-x-1 mb-3">
                <span className="text-yellow-500">★</span>
                <span className="text-sm text-gray-600">{commercials[0].rating}</span>
                <span className="text-xs text-gray-500">({commercials[0].reviews} avis)</span>
              </div>
              <p className="text-xs text-gray-600 mb-4">{commercials[0].description}</p>
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => handleContactCommercial(commercials[0])}
              >
                Contacter maintenant
              </Button>
            </div>
          </Card>

          {/* Bannière publicitaire */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white">
            <div className="text-center">
              <h4 className="font-bold mb-2">📞 Support Premium 24/7</h4>
              <p className="text-sm text-orange-100 mb-4">Assistance prioritaire avec nos experts</p>
              <Button variant="outline" size="sm" className="bg-white text-orange-600 hover:bg-orange-50">
                Découvrir Premium
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bannière publicitaire en bas */}
      <div className="bg-gradient-to-r from-teal-600 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">🎓 Programmes de Formation Certifiants</h3>
            <p className="text-teal-100">Formez vos équipes avec nos programmes certifiés par des experts</p>
          </div>
          <Button variant="outline" className="bg-white text-teal-600 hover:bg-teal-50">
            Voir Formations
          </Button>
        </div>
      </div>
    </div>
  );

  // C. Section "Produits et Services"
  const renderProductsSection = () => (
    <div className="space-y-8">
      {/* Bannière publicitaire en haut */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">🛍️ Catalogue Produits & Services</h3>
            <p className="text-green-100">Découvrez nos solutions professionnelles avec essais gratuits</p>
          </div>
          <Button variant="outline" className="bg-white text-green-600 hover:bg-green-50">
            Essai Gratuit
          </Button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Rechercher des produits/services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            >
              <option value="all">Toutes catégories</option>
              <option value="crm">CRM</option>
              <option value="formation">Formation</option>
              <option value="analytics">Analytics</option>
              <option value="ecommerce">E-commerce</option>
              <option value="marketing">Marketing</option>
              <option value="finance">Finance</option>
            </select>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
            >
              <option value="all">Tous les prix</option>
              <option value="low">&lt; 100€</option>
              <option value="medium">100€ - 200€</option>
              <option value="high">&gt; 200€</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Catalogue des produits/services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                {product.badge && (
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
                  <span className="text-yellow-500 text-sm">★</span>
                  <span className="text-sm font-medium text-gray-800">{product.rating}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <span className="text-xs text-gray-500">{product.category}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{product.description}</p>
              
              <div className="space-y-2 mb-4">
                {product.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <i className="ri-check-line text-green-500 text-sm"></i>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xl font-bold text-gray-900">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through ml-2">{product.originalPrice}</span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{product.reviews} avis</div>
                  {product.trialDays && (
                    <div className="text-xs text-blue-600">{product.trialDays} jours d'essai</div>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleViewProduct(product)}
                >
                  Voir détails
                </Button>
                {product.trialDays ? (
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleStartTrial(product)}
                  >
                    Essai gratuit
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handlePurchase(product)}
                  >
                    Acheter
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Essais gratuits en cours */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Essais Gratuits en Cours</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: "Analytics Business Intelligence",
              daysLeft: 12,
              totalDays: 30,
              usage: 65,
              features: ["Tableaux de bord", "Rapports", "API"],
            },
            {
              name: "Marketing Automation Pro",
              daysLeft: 8,
              totalDays: 21,
              usage: 45,
              features: ["Email automation", "Lead scoring"],
            },
          ].map((trial, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{trial.name}</h4>
                <span className="text-sm text-orange-600 font-medium">
                  {trial.daysLeft} jours restants
                </span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Période d'essai</span>
                    <span className="text-gray-900">{trial.daysLeft}/{trial.totalDays} jours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${((trial.totalDays - trial.daysLeft) / trial.totalDays) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Utilisation</span>
                    <span className="text-gray-900">{trial.usage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${trial.usage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {trial.features.map((feature, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" className="flex-1">
                    Passer à Premium
                  </Button>
                  <Button size="sm" variant="outline">
                    Prolonger
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Historique des achats */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Historique des Achats</h3>
          <Button variant="outline" size="sm">
            Télécharger factures
            <i className="ri-download-line ml-2"></i>
          </Button>
        </div>
        <div className="space-y-4">
          {[
            {
              id: "CMD-2024-001",
              product: "CRM Collaboratif Pro",
              amount: "89€",
              status: "Actif",
              date: "15 Jan 2024",
              type: "Abonnement mensuel",
              nextBilling: "15 Fév 2024",
            },
            {
              id: "CMD-2024-002",
              product: "Formation Gestion d'Équipes",
              amount: "299€",
              status: "Terminé",
              date: "10 Jan 2024",
              type: "Achat unique",
              nextBilling: null,
            },
            {
              id: "CMD-2024-003",
              product: "Analytics BI (Essai)",
              amount: "0€",
              status: "En cours",
              date: "20 Jan 2024",
              type: "Essai gratuit",
              nextBilling: "20 Fév 2024",
            },
          ].map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-gray-900">{order.product}</h4>
                <p className="text-sm text-gray-600">
                  {order.type} • {order.date}
                </p>
                <p className="text-sm text-gray-500">Commande #{order.id}</p>
                {order.nextBilling && (
                  <p className="text-xs text-blue-600">Prochaine facturation: {order.nextBilling}</p>
                )}
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{order.amount}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    order.status === "Actif"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Terminé"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {order.status}
                </span>
                <div className="flex space-x-1 mt-2">
                  <Button size="sm" variant="outline">
                    <i className="ri-file-text-line"></i>
                  </Button>
                  <Button size="sm" variant="outline">
                    <i className="ri-download-line"></i>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Bannière publicitaire en bas */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">🔧 Outils d'Analyse Avancés</h3>
            <p className="text-blue-100">Business Intelligence et insights pour optimiser vos performances</p>
          </div>
          <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
            Analyser Maintenant
          </Button>
        </div>
      </div>
    </div>
  );

  // D. Section "Assistance et Support"
  const renderSupportSection = () => (
    <div className="space-y-8">
      {/* Bannière publicitaire en haut */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">🆘 Centre d'Assistance</h3>
            <p className="text-purple-100">Support rapide et efficace pour tous vos besoins</p>
          </div>
          <Button variant="outline" className="bg-white text-purple-600 hover:bg-purple-50">
            Chat en Direct
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Centre d'aide et FAQ */}
        <div className="lg:col-span-2 space-y-6">
          {/* Centre d'aide */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Centre d'Aide</h3>
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Rechercher dans l'aide..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { icon: "ri-settings-line", title: "Configuration", count: 15, color: "blue" },
                { icon: "ri-question-line", title: "FAQ Générale", count: 28, color: "green" },
                { icon: "ri-tools-line", title: "Problèmes Techniques", count: 12, color: "orange" },
                { icon: "ri-credit-card-line", title: "Facturation", count: 8, color: "purple" },
              ].map((category, index) => (
                <div
                  key={index}
                  className={`p-4 border border-gray-200 rounded-lg hover:border-${category.color}-300 transition-colors cursor-pointer`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-${category.color}-100 rounded-lg flex items-center justify-center`}>
                      <i className={`${category.icon} text-${category.color}-600`}></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{category.title}</h4>
                      <p className="text-sm text-gray-600">{category.count} articles</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Articles Populaires</h4>
              {faqItems.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div>
                    <h5 className="font-medium text-gray-900">{item.question}</h5>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-600">Catégorie: {item.category}</span>
                      <span className="text-sm text-gray-600">{item.views} vues</span>
                      <span className="text-sm text-green-600">{item.helpful}% utile</span>
                    </div>
                  </div>
                  <i className="ri-arrow-right-line text-gray-400"></i>
                </div>
              ))}
            </div>
          </Card>

          {/* Historique des demandes */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Historique des Demandes</h3>
              <Button 
                size="sm" 
                onClick={() => setShowTicketModal(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <i className="ri-add-line mr-2"></i>
                Nouveau Ticket
              </Button>
            </div>
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        ticket.priority === "Haute"
                          ? "bg-red-100"
                          : ticket.priority === "Normale"
                          ? "bg-yellow-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <i
                        className={`ri-customer-service-line ${
                          ticket.priority === "Haute"
                            ? "text-red-600"
                            : ticket.priority === "Normale"
                            ? "text-yellow-600"
                            : "text-gray-600"
                        }`}
                      ></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{ticket.title}</h4>
                      <p className="text-sm text-gray-600">{ticket.description}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">#{ticket.id}</span>
                        <span className="text-xs text-gray-500">{ticket.created}</span>
                        <span className="text-xs text-gray-500">Assigné à: {ticket.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        ticket.status === "Résolu"
                          ? "bg-green-100 text-green-700"
                          : ticket.status === "En cours"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {ticket.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{ticket.lastUpdate}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                        ticket.priority === "Haute"
                          ? "bg-red-100 text-red-700"
                          : ticket.priority === "Normale"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Support en direct et sidebar */}
        <div className="space-y-6">
          {/* Chat en direct */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Support en Direct</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">En ligne</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 ${
                    message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "agent" ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    <i
                      className={`${
                        message.sender === "agent"
                          ? "ri-customer-service-line text-blue-600"
                          : "ri-user-line text-gray-600"
                      } text-sm`}
                    ></i>
                  </div>
                  <div
                    className={`flex-1 p-3 rounded-lg ${
                      message.sender === "agent"
                        ? "bg-blue-50 border border-blue-200"
                        : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm text-gray-900">{message.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button size="sm" onClick={handleSendMessage}>
                <i className="ri-send-plane-line"></i>
              </Button>
            </div>
          </Card>

          {/* Options de contact */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Autres Options de Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-phone-line text-blue-600"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Téléphone</h4>
                  <p className="text-sm text-gray-600">+33 1 23 45 67 89</p>
                  <p className="text-xs text-gray-500">Lun-Ven 9h-18h</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-mail-line text-green-600"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="text-sm text-gray-600">support@company.com</p>
                  <p className="text-xs text-gray-500">Réponse sous 24h</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-calendar-line text-purple-600"></i>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Rendez-vous</h4>
                  <p className="text-sm text-gray-600">Consultation personnalisée</p>
                  <p className="text-xs text-gray-500">Sur rendez-vous</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Bannière publicitaire */}
          <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl p-6 text-white">
            <div className="text-center">
              <h4 className="font-bold mb-2">🔒 Solutions de Sécurité Avancées</h4>
              <p className="text-sm text-red-100 mb-4">Protégez vos données avec nos solutions</p>
              <Button variant="outline" size="sm" className="bg-white text-red-600 hover:bg-red-50">
                Sécuriser
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bannière publicitaire en bas */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">🔗 Services d'Intégration API</h3>
            <p className="text-indigo-100">Connectez tous vos outils avec nos services d'intégration</p>
          </div>
          <Button variant="outline" className="bg-white text-indigo-600 hover:bg-indigo-50">
            Intégrer
          </Button>
        </div>
      </div>
    </div>
  );

  // E. Section "Historique et Recommandations"
  const renderHistorySection = () => (
    <div className="space-y-8">
      {/* Bannière publicitaire en haut */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">📊 Historique & Recommandations</h3>
            <p className="text-orange-100">Consultez votre historique et découvrez nos recommandations personnalisées</p>
          </div>
          <Button variant="outline" className="bg-white text-orange-600 hover:bg-orange-50">
            Exporter Données
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Historique des interactions */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Historique des Interactions</h3>
              <div className="flex space-x-2">
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                  <option>Tous les types</option>
                  <option>Consultations</option>
                  <option>Commandes</option>
                  <option>Support</option>
                </select>
                <Button size="sm" variant="outline">
                  Exporter
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  type: "Commande",
                  title: "CRM Collaboratif Pro",
                  description: "Achat d'un abonnement mensuel au CRM collaboratif",
                  date: "15 Jan 2024, 14:30",
                  status: "Livré",
                  statusColor: "bg-green-100 text-green-800",
                  icon: "ri-shopping-bag-line",
                  color: "green",
                },
                {
                  type: "Consultation",
                  title: "Formation en Prospection Commerciale",
                  description: "Consultation avec Jean Dupont - Spécialiste CRM",
                  date: "12 Jan 2024, 10:15",
                  status: "Terminé",
                  statusColor: "bg-blue-100 text-blue-800",
                  icon: "ri-user-line",
                  color: "blue",
                },
                {
                  type: "Support",
                  title: "Problème de connexion CRM",
                  description: "Ticket #2024-001 - Résolution problème sync",
                  date: "10 Jan 2024, 16:45",
                  status: "Résolu",
                  statusColor: "bg-purple-100 text-purple-800",
                  icon: "ri-tools-line",
                  color: "purple",
                },
                {
                  type: "Essai",
                  title: "Analytics Business Intelligence",
                  description: "Activation essai gratuit 30 jours",
                  date: "08 Jan 2024, 09:20",
                  status: "En cours",
                  statusColor: "bg-orange-100 text-orange-800",
                  icon: "ri-bar-chart-line",
                  color: "orange",
                },
                {
                  type: "Démonstration",
                  title: "Module E-commerce Avancé",
                  description: "Démonstration personnalisée avec Marie Martin",
                  date: "05 Jan 2024, 11:00",
                  status: "Planifié",
                  statusColor: "bg-yellow-100 text-yellow-800",
                  icon: "ri-presentation-line",
                  color: "yellow",
                },
              ].map((interaction, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={`w-10 h-10 bg-${interaction.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <i className={`${interaction.icon} text-${interaction.color}-600`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 truncate">{interaction.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${interaction.statusColor}`}>
                        {interaction.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{interaction.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{interaction.date}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <i className="ri-eye-line mr-1"></i>
                    Voir
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Téléchargements et abonnements */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Téléchargements et Abonnements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "CRM Collaboratif",
                  type: "Abonnement Actif",
                  version: "v2.1.4",
                  size: "45 MB",
                  renewal: "15 Fév 2024",
                  status: "Actif",
                  statusColor: "bg-green-100 text-green-800",
                  icon: "ri-customer-service-2-line",
                  action: "Gérer",
                },
                {
                  name: "Analytics Dashboard",
                  type: "Application Installée",
                  version: "v1.8.3",
                  size: "32 MB",
                  renewal: "Mise à jour disponible",
                  status: "Installé",
                  statusColor: "bg-blue-100 text-blue-800",
                  icon: "ri-dashboard-line",
                  action: "Mettre à jour",
                },
                {
                  name: "Formation CRM",
                  type: "Contenu Téléchargé",
                  version: "v1.0",
                  size: "156 MB",
                  renewal: "Accès permanent",
                  status: "Téléchargé",
                  statusColor: "bg-purple-100 text-purple-800",
                  icon: "ri-book-line",
                  action: "Ouvrir",
                },
                {
                  name: "Module E-commerce",
                  type: "Essai Gratuit",
                  version: "v3.2.1",
                  size: "67 MB",
                  renewal: "Expire dans 12 jours",
                  status: "Essai",
                  statusColor: "bg-orange-100 text-orange-800",
                  icon: "ri-store-line",
                  action: "Acheter",
                },
              ].map((app, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <i className={`${app.icon} text-gray-600`}></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{app.name}</h4>
                        <p className="text-sm text-gray-600">{app.type}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${app.statusColor}`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Version:</span>
                      <span>{app.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taille:</span>
                      <span>{app.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Renouvellement:</span>
                      <span>{app.renewal}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <i className="ri-download-line mr-1"></i>
                      Télécharger
                    </Button>
                    <Button size="sm" className="flex-1">
                      {app.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recommandations personnalisées */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <i className="ri-star-line text-orange-500 mr-2"></i>
              Recommandations Personnalisées
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "Suite Comptabilité Pro",
                  description: "Complétez votre CRM avec notre solution comptable",
                  price: "149€/mois",
                  match: "95%",
                  image: "https://readdy.ai/api/search-image?query=modern%20accounting%20software%20interface%20with%20clean%20dashboard%20showing%20financial%20charts%20and%20invoice%20management%20on%20computer%20screen%2C%20professional%20business%20environment%20minimalist%20design%20blue%20and%20white%20color%20scheme&width=300&height=200&seq=acc1&orientation=landscape",
                  badge: "Recommandé",
                  color: "blue",
                },
                {
                  title: "Module RH Avancé",
                  description: "Gestion complète des ressources humaines",
                  price: "89€/mois",
                  match: "88%",
                  image: "https://readdy.ai/api/search-image?query=human%20resources%20management%20software%20dashboard%20with%20employee%20profiles%20and%20performance%20tracking%2C%20modern%20office%20setting%20clean%20interface%20design%20green%20and%20white%20colors&width=300&height=200&seq=hr1&orientation=landscape",
                  badge: "Populaire",
                  color: "green",
                },
                {
                  title: "Analytics BI Premium",
                  description: "Analyses avancées et rapports personnalisés",
                  price: "199€/mois",
                  match: "92%",
                  image: "https://readdy.ai/api/search-image?query=business%20intelligence%20analytics%20dashboard%20with%20advanced%20charts%20graphs%20and%20data%20visualization%20professional%20workspace%20modern%20design%20purple%20and%20white%20theme&width=300&height=200&seq=bi1&orientation=landscape",
                  badge: "Nouveau",
                  color: "purple",
                },
              ].map((recommendation, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={recommendation.image}
                      alt={recommendation.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 left-2 flex space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          recommendation.color === "blue"
                            ? "bg-blue-100 text-blue-800"
                            : recommendation.color === "green"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {recommendation.badge}
                      </span>
                      <span className="px-2 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-800">
                        {recommendation.match} compatible
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 mb-1">{recommendation.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{recommendation.price}</span>
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                        <i className="ri-add-line mr-1"></i>
                        Découvrir
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Notifications pour les renouvellements ou mises à jour */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <i className="ri-notification-line text-red-500 mr-2"></i>
              Notifications Personnalisées
            </h3>
            <div className="space-y-3">
              {[
                {
                  type: "renewal",
                  title: "Renouvellement CRM",
                  message: "Votre abonnement expire dans 15 jours",
                  time: "2h",
                  icon: "ri-calendar-line",
                  color: "orange",
                },
                {
                  type: "update",
                  title: "Mise à jour disponible",
                  message: "Analytics Dashboard v1.8.3 est disponible",
                  time: "1j",
                  icon: "ri-download-cloud-line",
                  color: "blue",
                },
                {
                  type: "offer",
                  title: "Offre spéciale",
                  message: "30% de réduction sur le module RH",
                  time: "3j",
                  icon: "ri-price-tag-line",
                  color: "green",
                },
              ].map((notification, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`w-8 h-8 bg-${notification.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <i className={`${notification.icon} text-${notification.color}-600 text-sm`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">{notification.time}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Bannière publicitaire sidebar */}
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="text-center">
              <h4 className="font-bold mb-2">📱 Solutions Mobiles Natives</h4>
              <p className="text-sm text-cyan-100 mb-4">Applications mobiles performantes</p>
              <Button variant="outline" size="sm" className="bg-white text-cyan-600 hover:bg-cyan-50">
                Développer App
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bannière publicitaire en bas */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">🎁 Offre Spéciale Client -40%</h3>
            <p className="text-pink-100">Promotion exceptionnelle sur tous nos services premium - Limitée dans le temps</p>
          </div>
          <Button variant="outline" className="bg-white text-pink-600 hover:bg-pink-50">
            Profiter de l'Offre
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* En-tête */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Interface Clients Finaux</h1>
              <p className="text-gray-600">Accédez à nos solutions et services professionnels</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="success">Compte Actif</Badge>
              <Button variant="primary" size="sm">
                <i className="ri-settings-line mr-2"></i>
                Paramètres
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {tab.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "commercials" && renderCommercialsSection()}
        {activeTab === "products" && renderProductsSection()}
        {activeTab === "support" && renderSupportSection()}
        {activeTab === "history" && renderHistorySection()}
      </div>

      {/* Modals */}
      {/* Modal de contact commercial */}
      {showContactModal && selectedCommercial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Contacter {selectedCommercial.name}</h2>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={selectedCommercial.image}
                  alt={selectedCommercial.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{selectedCommercial.name}</h3>
                  <p className="text-sm text-blue-600">{selectedCommercial.specialty}</p>
                  <p className="text-sm text-gray-600">{selectedCommercial.hourlyRate} • Répond en {selectedCommercial.responseTime}</p>
                </div>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                  <input
                    type="text"
                    placeholder="Ex: Consultation CRM pour mon entreprise"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Décrivez vos besoins et vos objectifs..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Préférence de contact</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                    <option>Email</option>
                    <option>Téléphone</option>
                    <option>Visioconférence</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setShowContactModal(false)}>
                    Annuler
                  </Button>
                  <LoadingButton
                    onClick={handleSubmitContact}
                    isLoading={isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Envoyer le message
                  </LoadingButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de détails produit */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{selectedProduct.name}</h2>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium">{selectedProduct.rating}</span>
                      <span className="text-gray-500">({selectedProduct.reviews} avis)</span>
                    </div>
                    {selectedProduct.badge && (
                      <Badge variant="secondary">{selectedProduct.badge}</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Fonctionnalités incluses :</h4>
                    {selectedProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <i className="ri-check-line text-green-500"></i>
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-3xl font-bold text-gray-900">{selectedProduct.price}</span>
                        {selectedProduct.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">{selectedProduct.originalPrice}</span>
                        )}
                      </div>
                      {selectedProduct.trialDays && (
                        <p className="text-sm text-blue-600">{selectedProduct.trialDays} jours d'essai gratuit</p>
                      )}
                    </div>
                    <div className="space-y-3">
                      {selectedProduct.trialDays ? (
                        <Button
                          className="w-full"
                          onClick={() => {
                            setShowProductModal(false);
                            handleStartTrial(selectedProduct);
                          }}
                        >
                          <i className="ri-play-circle-line mr-2"></i>
                          Commencer l'essai gratuit
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          onClick={() => {
                            setShowProductModal(false);
                            handlePurchase(selectedProduct);
                          }}
                        >
                          <i className="ri-shopping-cart-line mr-2"></i>
                          Acheter maintenant
                        </Button>
                      )}
                      <Button variant="outline" className="w-full">
                        <i className="ri-message-line mr-2"></i>
                        Contacter un commercial
                      </Button>
                      <Button variant="outline" className="w-full">
                        <i className="ri-play-line mr-2"></i>
                        Voir la démonstration
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'essai gratuit */}
      {showTrialModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Essai Gratuit</h2>
                <button
                  onClick={() => setShowTrialModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-gift-line text-green-600 text-2xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{selectedProduct.name}</h3>
                <p className="text-gray-600">Essai gratuit de {selectedProduct.trialDays} jours</p>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Inclus dans votre essai :</h4>
                  <ul className="space-y-1">
                    {selectedProduct.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-blue-800">
                        <i className="ri-check-line"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowTrialModal(false)}>
                    Annuler
                  </Button>
                  <LoadingButton
                    onClick={handleSubmitTrial}
                    isLoading={isLoading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Activer l'essai
                  </LoadingButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'achat */}
      {showPurchaseModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Finaliser l'achat</h2>
                <button
                  onClick={() => setShowPurchaseModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{selectedProduct.name}</h3>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">{selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">{selectedProduct.originalPrice}</span>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Récapitulatif :</h4>
                  <div className="flex justify-between text-sm">
                    <span>{selectedProduct.name}</span>
                    <span>{selectedProduct.price}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>TVA (20%)</span>
                    <span>Incluse</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{selectedProduct.price}</span>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowPurchaseModal(false)}>
                    Annuler
                  </Button>
                  <LoadingButton
                    onClick={handleSubmitPurchase}
                    isLoading={isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Confirmer l'achat
                  </LoadingButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de création de ticket */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Créer un Ticket de Support</h2>
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                    <option>Technique</option>
                    <option>Facturation</option>
                    <option>Formation</option>
                    <option>Compte</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                    <option>Normale</option>
                    <option>Haute</option>
                    <option>Basse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                  <input
                    type="text"
                    placeholder="Décrivez brièvement votre problème"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Décrivez votre problème en détail..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setShowTicketModal(false)}>
                    Annuler
                  </Button>
                  <LoadingButton
                    onClick={handleSubmitTicket}
                    isLoading={isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Créer le ticket
                  </LoadingButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Export nommé pour la compatibilité
export { ClientDashboard };
