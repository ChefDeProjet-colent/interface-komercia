import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../../../components/feature/Sidebar';

interface Product {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  specifications?: string;
}

interface CallForTenderDetails {
  id: string;
  title: string;
  reference: string;
  company: {
    name: string;
    logo?: string;
    sector: string;
    location: string;
    email: string;
    phone: string;
    website?: string;
    isVerified: boolean;
  };
  description: string;
  objectives: string[];
  products: Product[];
  requirements: string[];
  type: string;
  budget: string;
  deadline: string;
  postedDate: string;
  status: 'open' | 'closed' | 'applied';
  documents?: {
    name: string;
    url: string;
    size: string;
  }[];
  contactPerson: {
    name: string;
    position: string;
    email: string;
    phone: string;
  };
}

export default function CallForTenderDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [motivationLetter, setMotivationLetter] = useState('');

  // Données mockées de l'appel d'offre
  const callDetails: CallForTenderDetails = {
    id: id || '1',
    title: 'Commercial Senior - Secteur Technologie',
    reference: 'AO-2024-001',
    company: {
      name: 'TechCorp Solutions',
      logo: 'https://readdy.ai/api/search-image?query=modern%20technology%20company%20logo%20with%20blue%20and%20white%20colors%20professional%20corporate%20branding%20minimalist%20design&width=200&height=200&seq=techcorp-logo-001&orientation=squarish',
      sector: 'Technologie',
      location: 'Abidjan, Plateau',
      email: 'contact@techcorp-solutions.ci',
      phone: '+225 27 20 12 34 56',
      website: 'www.techcorp-solutions.ci',
      isVerified: true
    },
    description: 'TechCorp Solutions, leader dans le secteur technologique en Côte d\'Ivoire, recherche un commercial senior expérimenté pour renforcer son équipe de vente. Le candidat retenu sera responsable du développement commercial dans le secteur B2B, de la prospection à la conclusion de contrats avec des clients entreprises.',
    objectives: [
      'Développer et gérer un portefeuille de clients entreprises',
      'Atteindre et dépasser les objectifs de vente trimestriels',
      'Identifier de nouvelles opportunités commerciales',
      'Maintenir des relations durables avec les clients existants',
      'Représenter l\'entreprise lors d\'événements professionnels'
    ],
    products: [
      {
        id: '1',
        name: 'Solutions Cloud Computing',
        description: 'Infrastructure cloud pour entreprises',
        quantity: 50,
        unit: 'licences',
        specifications: 'Solutions évolutives avec support 24/7'
      },
      {
        id: '2',
        name: 'Logiciels de Gestion',
        description: 'Suite complète de gestion d\'entreprise',
        quantity: 30,
        unit: 'licences',
        specifications: 'ERP, CRM, et outils de collaboration'
      },
      {
        id: '3',
        name: 'Services de Cybersécurité',
        description: 'Protection et sécurisation des données',
        quantity: 20,
        unit: 'contrats',
        specifications: 'Audit, monitoring et protection avancée'
      },
      {
        id: '4',
        name: 'Formation Technique',
        description: 'Formation des équipes IT',
        quantity: 100,
        unit: 'heures',
        specifications: 'Formation sur site ou en ligne'
      }
    ],
    requirements: [
      'Minimum 5 ans d\'expérience en vente B2B dans le secteur technologique',
      'Diplôme universitaire en commerce, marketing ou domaine connexe',
      'Excellentes compétences en négociation et closing',
      'Maîtrise du CRM Salesforce ou équivalent',
      'Capacité à travailler de manière autonome et en équipe',
      'Excellente présentation et communication',
      'Permis de conduire catégorie B',
      'Maîtrise du français et de l\'anglais (écrit et oral)',
      'Connaissance du marché ivoirien et ouest-africain',
      'Disponibilité pour déplacements fréquents'
    ],
    type: 'CDI',
    budget: '800 000 - 1 200 000 FCFA',
    deadline: '2024-02-15',
    postedDate: '2024-01-10',
    status: 'open',
    documents: [
      {
        name: 'Cahier des charges détaillé',
        url: '#',
        size: '2.5 MB'
      },
      {
        name: 'Présentation de l\'entreprise',
        url: '#',
        size: '1.8 MB'
      },
      {
        name: 'Grille d\'évaluation des candidatures',
        url: '#',
        size: '450 KB'
      }
    ],
    contactPerson: {
      name: 'Marie Kouassi',
      position: 'Directrice des Ressources Humaines',
      email: 'marie.kouassi@techcorp-solutions.ci',
      phone: '+225 07 12 34 56 78'
    }
  };

  const handleApply = () => {
    setShowApplicationModal(true);
  };

  const submitApplication = () => {
    if (cvFile && motivationLetter.trim()) {
      // Traiter la candidature
      console.log('Candidature soumise');
      setShowApplicationModal(false);
      setCvFile(null);
      setMotivationLetter('');
      navigate('/commercial/call-for-tenders');
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Expiré', color: 'text-red-600' };
    if (diffDays === 0) return { text: 'Aujourd\'hui', color: 'text-orange-600' };
    if (diffDays === 1) return { text: '1 jour restant', color: 'text-orange-600' };
    if (diffDays <= 7) return { text: `${diffDays} jours restants`, color: 'text-orange-600' };
    return { text: `${diffDays} jours restants`, color: 'text-green-600' };
  };

  const remaining = getDaysRemaining(callDetails.deadline);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="commercial" />
      
      <div className="flex-1 lg:ml-64">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header avec bouton retour */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/commercial/call-for-tenders')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <i className="ri-arrow-left-line text-xl"></i>
              <span className="font-medium">Retour aux appels d'offres</span>
            </button>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{callDetails.title}</h1>
                <p className="text-sm text-gray-600">Référence: {callDetails.reference}</p>
              </div>
              {callDetails.status === 'open' && (
                <button
                  onClick={handleApply}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap flex items-center gap-2"
                >
                  <i className="ri-send-plane-line"></i>
                  Postuler maintenant
                </button>
              )}
            </div>
          </div>

          {/* Alerte deadline */}
          <div className={`bg-gradient-to-r ${remaining.color === 'text-red-600' ? 'from-red-50 to-red-100 border-red-200' : remaining.color === 'text-orange-600' ? 'from-orange-50 to-orange-100 border-orange-200' : 'from-green-50 to-green-100 border-green-200'} border rounded-xl p-4 mb-6`}>
            <div className="flex items-center gap-3">
              <i className={`ri-time-line text-2xl ${remaining.color}`}></i>
              <div>
                <p className={`font-bold ${remaining.color}`}>{remaining.text}</p>
                <p className="text-sm text-gray-600">Date limite de candidature: {new Date(callDetails.deadline).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informations de l'entreprise */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-building-line text-teal-600"></i>
                  Entreprise
                </h2>
                <div className="flex items-start gap-4">
                  {callDetails.company.logo && (
                    <img
                      src={callDetails.company.logo}
                      alt={callDetails.company.name}
                      className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{callDetails.company.name}</h3>
                      {callDetails.company.isVerified ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                          <i className="ri-verified-badge-line"></i>
                          Vérifié
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium flex items-center gap-1">
                          <i className="ri-error-warning-line"></i>
                          Non vérifié
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <i className="ri-building-2-line text-teal-500"></i>
                        {callDetails.company.sector}
                      </p>
                      <p className="flex items-center gap-2">
                        <i className="ri-map-pin-line text-teal-500"></i>
                        {callDetails.company.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <i className="ri-mail-line text-teal-500"></i>
                        <a href={`mailto:${callDetails.company.email}`} className="text-teal-600 hover:text-teal-700">
                          {callDetails.company.email}
                        </a>
                      </p>
                      <p className="flex items-center gap-2">
                        <i className="ri-phone-line text-teal-500"></i>
                        <a href={`tel:${callDetails.company.phone}`} className="text-teal-600 hover:text-teal-700">
                          {callDetails.company.phone}
                        </a>
                      </p>
                      {callDetails.company.website && (
                        <p className="flex items-center gap-2">
                          <i className="ri-global-line text-teal-500"></i>
                          <a href={`https://${callDetails.company.website}`} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700">
                            {callDetails.company.website}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-file-text-line text-teal-600"></i>
                  Description du poste
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{callDetails.description}</p>
              </div>

              {/* Objectifs */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-target-line text-teal-600"></i>
                  Objectifs du poste
                </h2>
                <ul className="space-y-3">
                  {callDetails.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 flex items-center justify-center bg-teal-100 rounded-full flex-shrink-0 mt-0.5">
                        <i className="ri-check-line text-teal-600 text-sm"></i>
                      </div>
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Produits/Services */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-shopping-bag-line text-teal-600"></i>
                  Produits et Services à Commercialiser
                </h2>
                <div className="space-y-4">
                  {callDetails.products.map((product) => (
                    <div key={product.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-gray-900">{product.name}</h3>
                        <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium whitespace-nowrap">
                          {product.quantity} {product.unit}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                      {product.specifications && (
                        <p className="text-xs text-gray-500 flex items-start gap-2">
                          <i className="ri-information-line text-teal-500 mt-0.5"></i>
                          {product.specifications}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Exigences */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-list-check text-teal-600"></i>
                  Exigences et Qualifications
                </h2>
                <ul className="space-y-3">
                  {callDetails.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full flex-shrink-0 mt-0.5">
                        <i className="ri-star-line text-blue-600 text-sm"></i>
                      </div>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents */}
              {callDetails.documents && callDetails.documents.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-folder-line text-teal-600"></i>
                    Documents à télécharger
                  </h2>
                  <div className="space-y-3">
                    {callDetails.documents.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.url}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-lg">
                            <i className="ri-file-pdf-line text-red-600 text-xl"></i>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.size}</p>
                          </div>
                        </div>
                        <i className="ri-download-line text-gray-400 group-hover:text-teal-600 text-xl"></i>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Colonne latérale */}
            <div className="space-y-6">
              {/* Informations clés */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Informations clés</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Type de contrat</p>
                    <p className="font-medium text-gray-900">{callDetails.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Rémunération</p>
                    <p className="font-medium text-gray-900">{callDetails.budget}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Date de publication</p>
                    <p className="font-medium text-gray-900">
                      {new Date(callDetails.postedDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Date limite</p>
                    <p className={`font-medium ${remaining.color}`}>
                      {new Date(callDetails.deadline).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Localisation</p>
                    <p className="font-medium text-gray-900">{callDetails.company.location}</p>
                  </div>
                </div>

                {callDetails.status === 'open' && (
                  <button
                    onClick={handleApply}
                    className="w-full mt-6 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap flex items-center justify-center gap-2"
                  >
                    <i className="ri-send-plane-line"></i>
                    Postuler maintenant
                  </button>
                )}
              </div>

              {/* Personne de contact */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-user-line text-teal-600"></i>
                  Contact
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Nom</p>
                    <p className="font-medium text-gray-900">{callDetails.contactPerson.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Fonction</p>
                    <p className="font-medium text-gray-900">{callDetails.contactPerson.position}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <a href={`mailto:${callDetails.contactPerson.email}`} className="font-medium text-teal-600 hover:text-teal-700 text-sm break-all">
                      {callDetails.contactPerson.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Téléphone</p>
                    <a href={`tel:${callDetails.contactPerson.phone}`} className="font-medium text-teal-600 hover:text-teal-700">
                      {callDetails.contactPerson.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de candidature */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Postuler à l'offre</h2>
                <button
                  onClick={() => {
                    setShowApplicationModal(false);
                    setCvFile(null);
                    setMotivationLetter('');
                  }}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Résumé de l'offre */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{callDetails.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <i className="ri-building-line"></i>
                    {callDetails.company.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-map-pin-line"></i>
                    {callDetails.company.location}
                  </span>
                </div>
              </div>

              {/* Upload CV */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <i className="ri-file-text-line mr-2 text-teal-600"></i>
                  CV (obligatoire) *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer">
                    <div className="w-12 h-12 flex items-center justify-center bg-teal-100 rounded-lg mx-auto mb-3">
                      <i className="ri-upload-cloud-line text-2xl text-teal-600"></i>
                    </div>
                    {cvFile ? (
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">{cvFile.name}</p>
                        <p className="text-xs text-gray-500">Cliquez pour changer</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">Cliquez pour télécharger votre CV</p>
                        <p className="text-xs text-gray-500">PDF, DOC ou DOCX (max. 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Lettre de motivation */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  <i className="ri-quill-pen-line mr-2 text-teal-600"></i>
                  Lettre de motivation (obligatoire) *
                </label>
                <textarea
                  value={motivationLetter}
                  onChange={(e) => setMotivationLetter(e.target.value)}
                  placeholder="Expliquez pourquoi vous êtes le candidat idéal pour ce poste..."
                  rows={8}
                  maxLength={2000}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500">
                    Décrivez vos compétences, votre expérience et votre motivation
                  </p>
                  <p className="text-xs text-gray-500">
                    {motivationLetter.length}/2000
                  </p>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <i className="ri-information-line text-blue-600 text-xl flex-shrink-0"></i>
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">Conseils pour votre candidature</p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Personnalisez votre lettre de motivation pour ce poste spécifique</li>
                      <li>• Mettez en avant vos réalisations concrètes</li>
                      <li>• Assurez-vous que votre CV est à jour</li>
                      <li>• Relisez votre candidature avant de l'envoyer</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowApplicationModal(false);
                    setCvFile(null);
                    setMotivationLetter('');
                  }}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                >
                  Annuler
                </button>
                <button
                  onClick={submitApplication}
                  disabled={!cvFile || !motivationLetter.trim()}
                  className="flex-1 px-4 py-3 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  <i className="ri-send-plane-line mr-2"></i>
                  Envoyer ma candidature
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
