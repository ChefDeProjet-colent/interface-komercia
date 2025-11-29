import React, { useState } from 'react';
import { Button } from '../../../components/base/Button';
import { LoadingButton } from '../../../components/base/LoadingButton';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  experience: number;
  achievements: string;
}

interface Reference {
  id: string;
  name: string;
  company: string;
  contact: string;
}

const CommercialProfileForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Données pré-remplies selon l'exemple fourni
  const [formData, setFormData] = useState({
    // Informations personnelles
    fullName: 'John Doe',
    profilePhoto: null as File | null,
    email: 'john.doe@email.com',
    phone: '+225 07 123 4567',
    address: 'Abidjan, Côte d\'Ivoire',
    
    // Informations professionnelles
    sector: 'Technologie',
    experience: '5 ans',
    languages: ['Français', 'Anglais'],
    
    // Disponibilités
    status: 'Disponible',
    workHours: 'Lundi-Vendredi, 9h-18h',
    
    // Réseaux sociaux
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: '',
    
    // Paramètres
    visibility: 'Public',
    notifications: {
      leads: true,
      reminders: true,
      emails: true
    }
  });

  // Compétences pré-remplies selon l'exemple
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: '1',
      name: 'Négociation',
      category: 'Vente et Prospection',
      level: 5,
      experience: 5,
      achievements: 'Négociation de contrats de plus de 50M FCFA avec des entreprises technologiques majeures'
    },
    {
      id: '2',
      name: 'CRM',
      category: 'Relation Client',
      level: 4,
      experience: 4,
      achievements: 'Implémentation de Salesforce pour une équipe de 20 commerciaux, augmentation de 35% des conversions'
    },
    {
      id: '3',
      name: 'Prospection',
      category: 'Vente et Prospection',
      level: 3,
      experience: 3,
      achievements: 'Génération de 200+ leads qualifiés par mois via LinkedIn et cold calling'
    }
  ]);

  // Références pré-remplies selon l'exemple
  const [references, setReferences] = useState<Reference[]>([
    {
      id: '1',
      name: 'Jane Smith',
      company: 'ABC Corp',
      contact: '+225 07 987 6543'
    }
  ]);

  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Vente et Prospection',
    level: 1,
    experience: 1,
    achievements: ''
  });

  const [newReference, setNewReference] = useState({
    name: '',
    company: '',
    contact: ''
  });

  const sectors = [
    'Technologie', 'Agroalimentaire', 'Santé', 'Finance', 'Éducation',
    'Commerce', 'Industrie', 'Services', 'Immobilier', 'Transport'
  ];

  const experienceLevels = [
    'Moins de 1 an', '1-2 ans', '3-5 ans', '5-10 ans', 'Plus de 10 ans'
  ];

  const availableLanguages = [
    'Français', 'Anglais', 'Espagnol', 'Allemand', 'Italien', 
    'Portugais', 'Arabe', 'Chinois'
  ];

  const skillCategories = [
    'Vente et Prospection',
    'Relation Client',
    'Techniques',
    'Sectorielles',
    'Formation et Leadership'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleNotificationChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type as keyof typeof prev.notifications]
      }
    }));
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        ...newSkill
      };
      setSkills(prev => [...prev, skill]);
      setNewSkill({
        name: '',
        category: 'Vente et Prospection',
        level: 1,
        experience: 1,
        achievements: ''
      });
      setShowSkillModal(false);
    }
  };

  const removeSkill = (id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };

  const addReference = () => {
    if (newReference.name.trim() && newReference.company.trim()) {
      const reference: Reference = {
        id: Date.now().toString(),
        ...newReference
      };
      setReferences(prev => [...prev, reference]);
      setNewReference({
        name: '',
        company: '',
        contact: ''
      });
      setShowReferenceModal(false);
    }
  };

  const removeReference = (id: string) => {
    setReferences(prev => prev.filter(ref => ref.id !== id));
  };

  const getSkillColor = (level: number) => {
    if (level >= 4) return 'bg-green-100 text-green-800 border-green-200';
    if (level >= 3) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (level >= 2) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getLevelText = (level: number) => {
    const levels = ['Débutant', 'Débutant', 'Intermédiaire', 'Avancé', 'Expert'];
    return levels[level] || 'Débutant';
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulation de sauvegarde
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    alert('Profil sauvegardé avec succès !');
  };

  const handlePublish = async () => {
    setIsLoading(true);
    // Simulation de publication
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    alert('Profil publié avec succès !');
  };

  // Graphique radar pour les compétences
  const RadarChart = () => {
    const categories = ['Vente', 'Relation Client', 'Techniques', 'Sectorielles', 'Leadership'];
    const values = categories.map(cat => {
      const categorySkills = skills.filter(skill => 
        skill.category.includes(cat) || 
        (cat === 'Vente' && skill.category.includes('Prospection')) ||
        (cat === 'Leadership' && skill.category.includes('Formation'))
      );
      return categorySkills.length > 0 
        ? categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length 
        : 0;
    });

    const size = 200;
    const center = size / 2;
    const radius = 70;
    const angleStep = (2 * Math.PI) / categories.length;

    const points = values.map((value, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const r = (value / 5) * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="flex flex-col items-center">
        <svg width={size} height={size} className="mb-4">
          {/* Grille */}
          {[1, 2, 3, 4, 5].map(level => (
            <polygon
              key={level}
              points={categories.map((_, index) => {
                const angle = index * angleStep - Math.PI / 2;
                const r = (level / 5) * radius;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Axes */}
          {categories.map((_, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <line
                key={index}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            );
          })}
          
          {/* Données */}
          <polygon
            points={points}
            fill="rgba(59, 130, 246, 0.3)"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          
          {/* Points */}
          {values.map((value, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const r = (value / 5) * radius;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#3b82f6"
              />
            );
          })}
          
          {/* Labels */}
          {categories.map((category, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const x = center + (radius + 20) * Math.cos(angle);
            const y = center + (radius + 20) * Math.sin(angle);
            return (
              <text
                key={index}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium fill-gray-600"
              >
                {category}
              </text>
            );
          })}
        </svg>
        
        <div className="text-center">
          <h4 className="font-semibold text-gray-900 mb-2">Niveau de Compétences</h4>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Niveau actuel</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const steps = [
    'Informations Personnelles',
    'Informations Professionnelles', 
    'Compétences Clés',
    'Disponibilités',
    'Réseaux et Références',
    'Paramètres de Confidentialité'
  ];

  if (showPreview) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Aperçu du Profil Commercial</h2>
          <Button
            onClick={() => setShowPreview(false)}
            className="bg-gray-500 hover:bg-gray-600"
          >
            Retour à l'édition
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* En-tête profil */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {formData.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{formData.fullName}</h3>
                  <p className="text-blue-600 font-medium">{formData.sector}</p>
                  <p className="text-gray-600">{formData.experience} d'expérience</p>
                  <div className="flex items-center mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      formData.status === 'Disponible' ? 'bg-green-100 text-green-800' :
                      formData.status === 'Occupé' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {formData.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compétences */}
            <div className="bg-white p-6 rounded-lg border">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Compétences Clés</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map(skill => (
                  <div key={skill.id} className={`p-4 rounded-lg border ${getSkillColor(skill.level)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{skill.name}</h5>
                      <span className="text-sm font-medium">{getLevelText(skill.level)}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex-1 bg-white bg-opacity-50 rounded-full h-2">
                        <div 
                          className="bg-current h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">{skill.level}/5</span>
                    </div>
                    <p className="text-sm opacity-80">{skill.experience} ans d'expérience</p>
                    {skill.achievements && (
                      <p className="text-sm mt-2 opacity-90">{skill.achievements}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Informations de contact */}
            <div className="bg-white p-6 rounded-lg border">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Informations de Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Téléphone</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Adresse</p>
                  <p className="font-medium">{formData.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Horaires</p>
                  <p className="font-medium">{formData.workHours}</p>
                </div>
              </div>
            </div>

            {/* Références */}
            {references.length > 0 && (
              <div className="bg-white p-6 rounded-lg border">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Références Professionnelles</h4>
                <div className="space-y-3">
                  {references.map(ref => (
                    <div key={ref.id} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium">{ref.name}</p>
                      <p className="text-sm text-gray-600">{ref.company}</p>
                      <p className="text-sm text-blue-600">{ref.contact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Graphique radar */}
            <div className="bg-white p-6 rounded-lg border">
              <RadarChart />
            </div>

            {/* Langues */}
            <div className="bg-white p-6 rounded-lg border">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Langues Parlées</h4>
              <div className="flex flex-wrap gap-2">
                {formData.languages.map(lang => (
                  <span key={lang} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Réseaux sociaux */}
            {(formData.linkedin || formData.twitter) && (
              <div className="bg-white p-6 rounded-lg border">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Réseaux Sociaux</h4>
                <div className="space-y-2">
                  {formData.linkedin && (
                    <a href={formData.linkedin} className="flex items-center text-blue-600 hover:text-blue-800">
                      <i className="ri-linkedin-fill mr-2"></i>
                      LinkedIn
                    </a>
                  )}
                  {formData.twitter && (
                    <a href={formData.twitter} className="flex items-center text-blue-600 hover:text-blue-800">
                      <i className="ri-twitter-fill mr-2"></i>
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <LoadingButton
            onClick={handleSave}
            isLoading={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            Sauvegarder Brouillon
          </LoadingButton>
          <LoadingButton
            onClick={handlePublish}
            isLoading={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
          >
            Publier le Profil
          </LoadingButton>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Fiche Profil Commercial</h2>
        <p className="text-gray-600">Complétez votre profil pour optimiser vos opportunités commerciales</p>
      </div>

      {/* Barre de progression */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Étape {currentStep} sur {steps.length}</span>
          <span className="text-sm text-gray-500">{Math.round((currentStep / steps.length) * 100)}% complété</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <span 
              key={index}
              className={`text-xs ${index + 1 <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-400'}`}
            >
              {step}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne gauche - Informations personnelles */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center mb-4">
                <i className="ri-user-line text-xl text-blue-600 mr-2"></i>
                <h3 className="text-lg font-semibold text-gray-900">Informations Personnelles</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Photo de profil
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      {formData.profilePhoto ? (
                        <img src={URL.createObjectURL(formData.profilePhoto)} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
                      ) : (
                        <i className="ri-camera-line text-gray-400 text-xl"></i>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleInputChange('profilePhoto', e.target.files?.[0] || null)}
                      className="text-sm text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email professionnel <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john.doe@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro de téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+225 07 123 4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Abidjan, Côte d'Ivoire"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center mb-4">
                <i className="ri-briefcase-line text-xl text-blue-600 mr-2"></i>
                <h3 className="text-lg font-semibold text-gray-900">Informations Professionnelles</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Secteur d'activité <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => handleInputChange('sector', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  >
                    {sectors.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expérience professionnelle <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  >
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Langues parlées
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableLanguages.map(language => (
                      <label key={language} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.languages.includes(language)}
                          onChange={() => handleLanguageToggle(language)}
                          className="mr-2"
                        />
                        <span className="text-sm">{language}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center mb-4">
                <i className="ri-calendar-line text-xl text-blue-600 mr-2"></i>
                <h3 className="text-lg font-semibold text-gray-900">Disponibilités</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statut de disponibilité <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {['Disponible', 'Occupé', 'En congé'].map(status => (
                      <label key={status} className="flex items-center">
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          checked={formData.status === status}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Horaires de travail
                  </label>
                  <input
                    type="text"
                    value={formData.workHours}
                    onChange={(e) => handleInputChange('workHours', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Lundi-Vendredi, 9h-18h"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center mb-4">
                <i className="ri-links-line text-xl text-blue-600 mr-2"></i>
                <h3 className="text-lg font-semibold text-gray-900">Réseaux et Références</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://linkedin.com/in/johndoe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Twitter
                  </label>
                  <input
                    type="url"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://twitter.com/johndoe"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Références professionnelles
                    </label>
                    <Button
                      onClick={() => setShowReferenceModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 whitespace-nowrap"
                    >
                      <i className="ri-add-line mr-1"></i>
                      Ajouter
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {references.map(ref => (
                      <div key={ref.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{ref.name}</p>
                          <p className="text-xs text-gray-600">{ref.company} - {ref.contact}</p>
                        </div>
                        <button
                          onClick={() => removeReference(ref.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center mb-4">
                <i className="ri-shield-line text-xl text-blue-600 mr-2"></i>
                <h3 className="text-lg font-semibold text-gray-900">Paramètres de Confidentialité</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Visibilité du profil <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {['Public', 'Privé'].map(visibility => (
                      <label key={visibility} className="flex items-center">
                        <input
                          type="radio"
                          name="visibility"
                          value={visibility}
                          checked={formData.visibility === visibility}
                          onChange={(e) => handleInputChange('visibility', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm">{visibility}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notifications <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.notifications.leads}
                        onChange={() => handleNotificationChange('leads')}
                        className="mr-2"
                      />
                      <span className="text-sm">Recevoir des alertes pour de nouveaux leads</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.notifications.reminders}
                        onChange={() => handleNotificationChange('reminders')}
                        className="mr-2"
                      />
                      <span className="text-sm">Rappels de tâches</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.notifications.emails}
                        onChange={() => handleNotificationChange('emails')}
                        className="mr-2"
                      />
                      <span className="text-sm">Notifications par email</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Colonne droite - Compétences et aperçu */}
        <div className="space-y-6">
          {currentStep === 3 && (
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <i className="ri-tools-line text-xl text-blue-600 mr-2"></i>
                  <h3 className="text-lg font-semibold text-gray-900">Compétences Clés</h3>
                </div>
                <Button
                  onClick={() => setShowSkillModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 whitespace-nowrap"
                >
                  <i className="ri-add-line mr-1"></i>
                  Ajouter
                </Button>
              </div>
              
              <div className="space-y-3 mb-6">
                {skills.map(skill => (
                  <div key={skill.id} className={`p-3 rounded-lg border ${getSkillColor(skill.level)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{skill.name}</h4>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>{skill.category}</span>
                      <span>{getLevelText(skill.level)} ({skill.level}/5)</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="flex-1 bg-white bg-opacity-50 rounded-full h-2">
                        <div 
                          className="bg-current h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs">{skill.experience} ans</span>
                    </div>
                  </div>
                ))}
              </div>

              {skills.length > 0 && (
                <div className="mt-6">
                  <RadarChart />
                </div>
              )}
            </div>
          )}

          {/* Aperçu du profil */}
          {currentStep !== 3 && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Aperçu du Profil</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {formData.fullName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{formData.fullName}</p>
                    <p className="text-sm text-gray-600">{formData.sector}</p>
                  </div>
                </div>
                <div className="text-sm space-y-1">
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Téléphone:</strong> {formData.phone}</p>
                  <p><strong>Expérience:</strong> {formData.experience}</p>
                  <p><strong>Statut:</strong> {formData.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Compétences ({skills.length})</p>
                  <div className="flex flex-wrap gap-1">
                    {skills.slice(0, 3).map(skill => (
                      <span key={skill.id} className={`px-2 py-1 rounded text-xs ${getSkillColor(skill.level)}`}>
                        {skill.name}
                      </span>
                    ))}
                    {skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{skills.length - 3} autres
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conseils */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-start">
              <i className="ri-lightbulb-line text-yellow-600 text-lg mr-2 mt-0.5"></i>
              <div>
                <h4 className="font-medium text-yellow-800 mb-1">Conseils</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Complétez toutes les sections pour maximiser vos opportunités</li>
                  <li>• Ajoutez des compétences spécifiques à votre secteur</li>
                  <li>• Incluez des réalisations concrètes pour chaque compétence</li>
                  <li>• Maintenez votre profil à jour régulièrement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t">
        <Button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          <i className="ri-arrow-left-line mr-1"></i>
          Précédent
        </Button>

        <div className="flex space-x-3">
          <Button
            onClick={() => setShowPreview(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 whitespace-nowrap"
          >
            <i className="ri-eye-line mr-1"></i>
            Aperçu
          </Button>
          
          {currentStep < steps.length ? (
            <Button
              onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 whitespace-nowrap"
            >
              Suivant
              <i className="ri-arrow-right-line ml-1"></i>
            </Button>
          ) : (
            <LoadingButton
              onClick={handlePublish}
              isLoading={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 whitespace-nowrap"
            >
              <i className="ri-check-line mr-1"></i>
              Publier
            </LoadingButton>
          )}
        </div>
      </div>

      {/* Modal Compétences */}
      {showSkillModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Ajouter une Compétence</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la compétence</label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Négociation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  {skillCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Niveau de maîtrise</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={newSkill.level}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-16">{getLevelText(newSkill.level)} ({newSkill.level}/5)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Années d'expérience</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={newSkill.experience}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, experience: parseInt(e.target.value) || 1 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Réalisations associées</label>
                <textarea
                  value={newSkill.achievements}
                  onChange={(e) => setNewSkill(prev => ({ ...prev, achievements: e.target.value.slice(0, 500) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Décrivez vos réalisations liées à cette compétence..."
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{newSkill.achievements.length}/500 caractères</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                onClick={() => setShowSkillModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 whitespace-nowrap"
              >
                Annuler
              </Button>
              <Button
                onClick={addSkill}
                disabled={!newSkill.name.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Références */}
      {showReferenceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Ajouter une Référence</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={newReference.name}
                  onChange={(e) => setNewReference(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                <input
                  type="text"
                  value={newReference.company}
                  onChange={(e) => setNewReference(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ABC Corp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <input
                  type="text"
                  value={newReference.contact}
                  onChange={(e) => setNewReference(prev => ({ ...prev, contact: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+225 07 987 6543"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                onClick={() => setShowReferenceModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 whitespace-nowrap"
              >
                Annuler
              </Button>
              <Button
                onClick={addReference}
                disabled={!newReference.name.trim() || !newReference.company.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommercialProfileForm;

// Ajout de l'export nommé pour la compatibilité avec l'import
export { CommercialProfileForm };
