
import { useState } from 'react';

export default function ModulesSection() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState<any>(null);

  const modules = [
    {
      id: 1,
      title: 'Leadership et Management',
      description: 'Développez vos compétences en leadership et gestion d\'équipe',
      status: 'active',
      chapters: 8,
      duration: '12h',
      enrolled: 245,
      completion: 78,
      rating: 4.8,
      category: 'Management',
      level: 'Intermédiaire',
      image: 'https://readdy.ai/api/search-image?query=professional%20business%20leadership%20training%20modern%20office%20environment%20with%20diverse%20team%20collaboration%20natural%20lighting%20corporate%20setting&width=400&height=250&seq=trainer_mod1&orientation=landscape'
    },
    {
      id: 2,
      title: 'Communication Efficace',
      description: 'Maîtrisez les techniques de communication professionnelle',
      status: 'active',
      chapters: 6,
      duration: '8h',
      enrolled: 189,
      completion: 85,
      rating: 4.9,
      category: 'Communication',
      level: 'Débutant',
      image: 'https://readdy.ai/api/search-image?query=professional%20communication%20training%20presentation%20skills%20business%20meeting%20modern%20conference%20room%20people%20engaged%20in%20discussion%20bright%20environment&width=400&height=250&seq=trainer_mod2&orientation=landscape'
    },
    {
      id: 3,
      title: 'Gestion de Projet Agile',
      description: 'Apprenez les méthodologies agiles pour gérer vos projets',
      status: 'revision',
      chapters: 10,
      duration: '15h',
      enrolled: 156,
      completion: 72,
      rating: 4.7,
      category: 'Gestion de Projet',
      level: 'Avancé',
      image: 'https://readdy.ai/api/search-image?query=agile%20project%20management%20scrum%20board%20kanban%20workflow%20modern%20office%20workspace%20team%20collaboration%20digital%20tools%20bright%20professional%20setting&width=400&height=250&seq=trainer_mod3&orientation=landscape'
    },
    {
      id: 4,
      title: 'Vente et Négociation',
      description: 'Techniques avancées de vente et négociation commerciale',
      status: 'active',
      chapters: 7,
      duration: '10h',
      enrolled: 203,
      completion: 81,
      rating: 4.6,
      category: 'Commercial',
      level: 'Intermédiaire',
      image: 'https://readdy.ai/api/search-image?query=sales%20negotiation%20training%20business%20professionals%20handshake%20deal%20closing%20modern%20office%20environment%20confident%20atmosphere%20professional%20setting&width=400&height=250&seq=trainer_mod4&orientation=landscape'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'revision':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'archived':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'revision':
        return 'En Révision';
      case 'archived':
        return 'Archivé';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Bannière Publicitaire En-tête */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Outils de Création de Contenu Avancés</h3>
            <p className="text-green-100 text-sm mb-4">Créez des modules interactifs avec vidéos HD, quiz dynamiques et évaluations personnalisées</p>
            <button className="px-6 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium whitespace-nowrap">
              Découvrir les Outils
            </button>
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <i className="ri-tools-line text-6xl opacity-20"></i>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Modules de Formation</h2>
            <p className="text-sm text-gray-500 mt-1">Créez et gérez vos modules de formation</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium whitespace-nowrap shadow-md"
          >
            <i className="ri-add-line mr-2"></i>
            Créer un Module
          </button>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option>Tous les statuts</option>
            <option>Actif</option>
            <option>En Révision</option>
            <option>Archivé</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option>Toutes les catégories</option>
            <option>Management</option>
            <option>Communication</option>
            <option>Gestion de Projet</option>
            <option>Commercial</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option>Tous les niveaux</option>
            <option>Débutant</option>
            <option>Intermédiaire</option>
            <option>Avancé</option>
          </select>
        </div>
      </div>

      {/* Liste des Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {modules.map((module) => (
          <div key={module.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <img
                src={module.image}
                alt={module.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(module.status)}`}>
                  {getStatusLabel(module.status)}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{module.title}</h3>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <i className="ri-book-2-line mr-1"></i>
                  {module.chapters} chapitres
                </span>
                <span className="flex items-center">
                  <i className="ri-time-line mr-1"></i>
                  {module.duration}
                </span>
                <span className="flex items-center">
                  <i className="ri-user-line mr-1"></i>
                  {module.enrolled}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Taux de complétion</span>
                  <span className="font-semibold text-gray-900">{module.completion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${module.completion}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-1">
                  <i className="ri-star-fill text-yellow-400"></i>
                  <span className="text-sm font-semibold text-gray-900">{module.rating}</span>
                  <span className="text-sm text-gray-500">/5</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedModule(module)}
                    className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    <i className="ri-eye-line mr-1"></i>
                    Voir
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap">
                    <i className="ri-edit-line mr-1"></i>
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bannière Publicitaire Footer */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">Services de Marketing pour Formateurs</h3>
            <p className="text-blue-100 text-sm mb-4">Promouvoir vos formations et atteindre plus d'apprenants avec nos outils marketing</p>
            <button className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium whitespace-nowrap">
              Booster ma Visibilité
            </button>
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <i className="ri-megaphone-line text-6xl opacity-20"></i>
          </div>
        </div>
      </div>

      {/* Modal Création Module */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Créer un Module de Formation</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre du Module</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: Leadership et Management"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Décrivez le contenu du module..."
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Management</option>
                    <option>Communication</option>
                    <option>Gestion de Projet</option>
                    <option>Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Débutant</option>
                    <option>Intermédiaire</option>
                    <option>Avancé</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de Chapitres</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="8"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Durée Estimée</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="12h"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Objectifs d'Apprentissage</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Listez les objectifs d'apprentissage..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prérequis</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Aucun prérequis ou listez-les"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap"
              >
                Annuler
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium whitespace-nowrap">
                Créer le Module
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails Module */}
      {selectedModule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <img
                src={selectedModule.image}
                alt={selectedModule.title}
                className="w-full h-full object-cover object-top"
              />
              <button
                onClick={() => setSelectedModule(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedModule.title}</h3>
                  <p className="text-gray-600">{selectedModule.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedModule.status)}`}>
                  {getStatusLabel(selectedModule.status)}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <i className="ri-book-2-line text-2xl text-purple-600 mb-2"></i>
                  <p className="text-sm text-gray-600">Chapitres</p>
                  <p className="text-lg font-bold text-gray-900">{selectedModule.chapters}</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <i className="ri-time-line text-2xl text-blue-600 mb-2"></i>
                  <p className="text-sm text-gray-600">Durée</p>
                  <p className="text-lg font-bold text-gray-900">{selectedModule.duration}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <i className="ri-user-line text-2xl text-green-600 mb-2"></i>
                  <p className="text-sm text-gray-600">Inscrits</p>
                  <p className="text-lg font-bold text-gray-900">{selectedModule.enrolled}</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <i className="ri-star-line text-2xl text-yellow-600 mb-2"></i>
                  <p className="text-sm text-gray-600">Note</p>
                  <p className="text-lg font-bold text-gray-900">{selectedModule.rating}/5</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium whitespace-nowrap">
                  <i className="ri-edit-line mr-2"></i>
                  Modifier le Module
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap">
                  <i className="ri-share-line mr-2"></i>
                  Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
