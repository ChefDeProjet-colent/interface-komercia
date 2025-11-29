import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'ri-dashboard-line',
      title: 'Tableau de Bord Intelligent',
      description: 'Visualisez vos performances commerciales en temps réel avec des analytics avancés'
    },
    {
      icon: 'ri-team-line',
      title: 'Gestion d\'Équipes',
      description: 'Coordonnez vos équipes commerciales et suivez leurs performances individuelles'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Pipeline Commercial',
      description: 'Gérez votre pipeline de ventes de la prospection à la conclusion'
    },
    {
      icon: 'ri-customer-service-line',
      title: 'Gestion Clients',
      description: 'Centralisez toutes les informations de vos clients et prospects'
    },
    {
      icon: 'ri-money-dollar-circle-line',
      title: 'Suivi des Commissions',
      description: 'Calculez et suivez automatiquement les commissions de vos commerciaux'
    },
    {
      icon: 'ri-bar-chart-box-line',
      title: 'Analytics Avancés',
      description: 'Analysez vos données de vente avec des rapports détaillés'
    }
  ];

  const testimonials = [
    {
      name: 'Marie Kouassi',
      role: 'Directrice Commerciale',
      company: 'TechCorp Abidjan',
      content: 'KOMERCIA a révolutionné notre approche commerciale. Nos ventes ont augmenté de 40% en 6 mois.',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20African%20businesswoman%20in%20modern%20office%20setting%2C%20confident%20smile%2C%20business%20attire%2C%20corporate%20headshot%20style%2C%20clean%20background&width=80&height=80&seq=testimonial1&orientation=squarish'
    },
    {
      name: 'Amadou Traoré',
      role: 'Responsable Ventes',
      company: 'Commerce Plus',
      content: 'L\'interface intuitive et les outils de suivi nous font gagner un temps précieux au quotidien.',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20African%20businessman%20in%20suit%2C%20friendly%20expression%2C%20modern%20office%20background%2C%20corporate%20portrait%20style%2C%20clean%20lighting&width=80&height=80&seq=testimonial2&orientation=squarish'
    },
    {
      name: 'Fatou Diallo',
      role: 'Entrepreneur',
      company: 'StartUp Innovation',
      content: 'Parfait pour les petites entreprises. KOMERCIA s\'adapte à notre croissance et nos besoins.',
      avatar: 'https://readdy.ai/api/search-image?query=Young%20African%20female%20entrepreneur%2C%20professional%20headshot%2C%20modern%20workspace%2C%20confident%20pose%2C%20business%20casual%20attire%2C%20bright%20background&width=80&height=80&seq=testimonial3&orientation=squarish'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-teal-600" style={{ fontFamily: '"Pacifico", serif' }}>
                KOMERCIA
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">
                Fonctionnalités
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">
                Témoignages
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">
                Tarifs
              </a>
              <a href="#contact" className="text-gray-600 hover:text-teal-600 transition-colors cursor-pointer">
                Contact
              </a>
            </nav>
            <button
              onClick={() => navigate('/login')}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Se Connecter
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-br from-teal-50 to-blue-50 py-20"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20African%20business%20team%20collaborating%20in%20bright%20office%20space%2C%20diverse%20professionals%20working%20together%2C%20laptops%20and%20charts%20visible%2C%20contemporary%20workspace%20design%2C%20natural%20lighting%2C%20professional%20atmosphere%2C%20clean%20minimalist%20background&width=1200&height=600&seq=hero1&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              La Plateforme Commerciale
              <span className="text-teal-600 block">Nouvelle Génération</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              KOMERCIA révolutionne la gestion commerciale en Afrique. Gérez vos équipes, 
              suivez vos ventes et boostez vos performances avec notre solution tout-en-un.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Commencer Gratuitement
              </button>
              <button className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-50 transition-colors whitespace-nowrap cursor-pointer">
                Voir la Démo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités Puissantes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez tous les outils dont vous avez besoin pour optimiser 
              votre activité commerciale et développer votre entreprise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                  <i className={`${feature.icon} text-2xl text-teal-600`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-teal-100">Entreprises Clientes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-teal-100">Commerciaux Actifs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50M+</div>
              <div className="text-teal-100">FCFA de Ventes Gérées</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-teal-100">Satisfaction Client</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce Que Disent Nos Clients
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez comment KOMERCIA transforme les entreprises africaines
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-teal-600">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à Révolutionner Vos Ventes ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Rejoignez des centaines d'entreprises qui font confiance à KOMERCIA 
            pour développer leur activité commerciale.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            Commencer Maintenant
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: '"Pacifico", serif' }}>
                KOMERCIA
              </h3>
              <p className="text-gray-300">
                La plateforme commerciale qui accompagne la croissance des entreprises africaines.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Tarifs</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Sécurité</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Formation</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">À Propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Carrières</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-pointer">Partenaires</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 KOMERCIA. Tous droits réservés. | 
              <a href="https://readdy.ai/?origin=logo" className="text-teal-400 hover:text-teal-300 ml-2 cursor-pointer">
                Powered by Readdy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
