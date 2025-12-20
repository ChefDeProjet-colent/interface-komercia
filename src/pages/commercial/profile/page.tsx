import { useState } from 'react';
import Sidebar from '../../../components/feature/Sidebar';

export default function CommercialProfilePage() {
  const [formData, setFormData] = useState({
    // Informations personnelles
    fullName: '',
    email: '',
    phone: '',
    address: '',
    profilePhoto: null as File | null,
    
    // Informations professionnelles
    sector: '',
    experience: '',
    languages: [] as string[],
    
    // Compétences
    skills: [] as { name: string; level: number; years: number; achievement: string; category: string }[],
    
    // Disponibilités
    availability: 'Disponible',
    workHours: '',
    
    // Réseaux sociaux
    linkedin: '',
    twitter: '',
    
    // Références
    references: [] as { name: string; company: string; contact: string }[],
    
    // Paramètres
    profileVisibility: 'Public',
    notifications: {
      newLeads: true,
      taskReminders: true,
      messages: true
    }
  });

  const [currentSkill, setCurrentSkill] = useState({
    name: '',
    level: 3,
    years: 0,
    achievement: '',
    category: 'Vente et Prospection'
  });

  const [currentReference, setCurrentReference] = useState({
    name: '',
    company: '',
    contact: ''
  });

  const sectors = [
    'Technologie',
    'Agroalimentaire',
    'Santé',
    'Finance',
    'Immobilier',
    'E-commerce',
    'Services',
    'Industrie',
    'Éducation',
    'Tourisme'
  ];

  const availableLanguages = [
    'Français',
    'Anglais',
    'Espagnol',
    'Allemand',
    'Arabe',
    'Chinois',
    'Italien',
    'Portugais'
  ];

  const skillCategories = [
    'Vente et Prospection',
    'Relation Client',
    'Techniques',
    'Sectorielles',
    'Formation et Leadership'
  ];

  const suggestedSkills = {
    'Vente et Prospection': ['Négociation', 'Prospection', 'Closing', 'Lead Qualification', 'Cold Calling'],
    'Relation Client': ['CRM', 'Fidélisation client', 'Gestion des réclamations', 'Service client', 'Account Management'],
    'Techniques': ['Analyse de données', 'Marketing digital', 'E-commerce', 'SEO/SEM', 'Social Selling'],
    'Sectorielles': ['Connaissance sectorielle', 'Réglementation', 'Veille concurrentielle', 'Expertise produit'],
    'Formation et Leadership': ['Formation d\'équipe', 'Leadership', 'Coaching', 'Mentorat', 'Gestion de projet']
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const addSkill = () => {
    if (currentSkill.name.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, { ...currentSkill }]
      }));
      setCurrentSkill({
        name: '',
        level: 3,
        years: 0,
        achievement: '',
        category: 'Vente et Prospection'
      });
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addReference = () => {
    if (currentReference.name.trim() && currentReference.company.trim()) {
      setFormData(prev => ({
        ...prev,
        references: [...prev.references, { ...currentReference }]
      }));
      setCurrentReference({ name: '', company: '', contact: '' });
    }
  };

  const removeReference = (index: number) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile data:', formData);
    // Logique de sauvegarde
  };

  const getLevelLabel = (level: number) => {
    const labels = ['Débutant', 'Intermédiaire', 'Confirmé', 'Avancé', 'Expert'];
    return labels[level - 1] || 'Intermédiaire';
  };

  const getSkillsByCategory = () => {
    const grouped: { [key: string]: typeof formData.skills } = {};
    formData.skills.forEach(skill => {
      if (!grouped[skill.category]) {
        grouped[skill.category] = [];
      }
      grouped[skill.category].push(skill);
    });
    return grouped;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="commercial" />
      
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Mon Profil</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Complétez votre profil pour améliorer votre visibilité</p>
              </div>
              <button 
                onClick={handleSubmit}
                className="w-full sm:w-auto bg-teal-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <i className="ri-save-line text-lg"></i>
                <span className="text-sm sm:text-base">Enregistrer le profil</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Grid Layout - 2 colonnes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Colonne Gauche */}
              <div className="space-y-6">
                {/* Section 1: Informations Personnelles */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <i className="ri-user-line text-xl text-teal-600"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Informations Personnelles</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Photo de profil */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Photo de profil <span className="text-gray-400">(optionnel)</span>
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                          {formData.fullName ? formData.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'JD'}
                        </div>
                        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap">
                          <i className="ri-upload-2-line"></i>
                          <span className="text-sm">Choisir une photo</span>
                          <input type="file" accept="image/*" className="hidden" />
                        </label>
                      </div>
                    </div>

                    {/* Nom complet */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="Ex: John Doe"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email professionnel <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john.doe@email.com"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Téléphone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+225 07 123 4567"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Adresse */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse <span className="text-gray-400">(optionnel)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Abidjan, Côte d'Ivoire"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Disponibilités */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className="ri-calendar-check-line text-xl text-green-600"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Disponibilités</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Statut */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Statut de disponibilité <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2">
                        {['Disponible', 'Occupé', 'En congé'].map((status) => (
                          <label key={status} className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="radio"
                              name="availability"
                              value={status}
                              checked={formData.availability === status}
                              onChange={(e) => handleInputChange('availability', e.target.value)}
                              className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900">{status}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Horaires */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Horaires de travail <span className="text-gray-400">(optionnel)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.workHours}
                        onChange={(e) => handleInputChange('workHours', e.target.value)}
                        placeholder="Ex: Lundi-Vendredi, 9h-18h"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 5: Réseaux et Références */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="ri-links-line text-xl text-blue-600"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Réseaux et Références</h2>
                  </div>

                  <div className="space-y-4">
                    {/* LinkedIn */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn <span className="text-gray-400">(optionnel)</span>
                      </label>
                      <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Twitter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Twitter <span className="text-gray-400">(optionnel)</span>
                      </label>
                      <input
                        type="url"
                        value={formData.twitter}
                        onChange={(e) => handleInputChange('twitter', e.target.value)}
                        placeholder="https://twitter.com/..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Références */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Références professionnelles <span className="text-gray-400">(optionnel)</span>
                      </label>
                      
                      {/* Liste des références */}
                      {formData.references.length > 0 && (
                        <div className="space-y-2 mb-3">
                          {formData.references.map((ref, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm">{ref.name}</p>
                                <p className="text-xs text-gray-600">{ref.company}</p>
                                <p className="text-xs text-gray-500">{ref.contact}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeReference(index)}
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <i className="ri-close-line text-lg"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Formulaire d'ajout */}
                      <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
                        <input
                          type="text"
                          value={currentReference.name}
                          onChange={(e) => setCurrentReference(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Nom de la référence"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <input
                          type="text"
                          value={currentReference.company}
                          onChange={(e) => setCurrentReference(prev => ({ ...prev, company: e.target.value }))}
                          placeholder="Entreprise"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <input
                          type="text"
                          value={currentReference.contact}
                          onChange={(e) => setCurrentReference(prev => ({ ...prev, contact: e.target.value }))}
                          placeholder="Contact"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <button
                          type="button"
                          onClick={addReference}
                          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                        >
                          + Ajouter une référence
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne Droite */}
              <div className="space-y-6">
                {/* Section 2: Informations Professionnelles */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="ri-briefcase-line text-xl text-purple-600"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Informations Professionnelles</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Secteur */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secteur d'activité <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.sector}
                        onChange={(e) => handleInputChange('sector', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      >
                        <option value="">Sélectionnez un secteur</option>
                        {sectors.map((sector) => (
                          <option key={sector} value={sector}>{sector}</option>
                        ))}
                      </select>
                    </div>

                    {/* Expérience */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expérience professionnelle <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        placeholder="Ex: 5 ans d'expérience en vente B2B"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Langues */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Langues parlées <span className="text-gray-400">(optionnel)</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {availableLanguages.map((language) => (
                          <label key={language} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={formData.languages.includes(language)}
                              onChange={() => handleLanguageToggle(language)}
                              className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900">{language}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Compétences Clés */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <i className="ri-tools-line text-xl text-orange-600"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Compétences Clés</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Formulaire d'ajout de compétence */}
                    <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                        <select
                          value={currentSkill.category}
                          onChange={(e) => setCurrentSkill(prev => ({ ...prev, category: e.target.value, name: '' }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          {skillCategories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Compétence</label>
                        <select
                          value={currentSkill.name}
                          onChange={(e) => setCurrentSkill(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="">Sélectionnez une compétence</option>
                          {suggestedSkills[currentSkill.category as keyof typeof suggestedSkills]?.map((skill) => (
                            <option key={skill} value={skill}>{skill}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Niveau de maîtrise: {getLevelLabel(currentSkill.level)}
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={currentSkill.level}
                          onChange={(e) => setCurrentSkill(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Débutant</span>
                          <span>Expert</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Années d'expérience</label>
                        <input
                          type="number"
                          min="0"
                          value={currentSkill.years}
                          onChange={(e) => setCurrentSkill(prev => ({ ...prev, years: parseInt(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Réalisation associée</label>
                        <textarea
                          value={currentSkill.achievement}
                          onChange={(e) => setCurrentSkill(prev => ({ ...prev, achievement: e.target.value }))}
                          placeholder="Ex: Implémentation de Salesforce pour une équipe de 20 commerciaux"
                          rows={2}
                          maxLength={500}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={addSkill}
                        className="w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                      >
                        + Ajouter la compétence
                      </button>
                    </div>

                    {/* Liste des compétences par catégorie */}
                    {Object.entries(getSkillsByCategory()).map(([category, skills]) => (
                      <div key={category} className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <i className="ri-folder-line text-teal-600"></i>
                          {category}
                        </h3>
                        <div className="space-y-2">
                          {skills.map((skill, index) => (
                            <div key={index} className="bg-white border border-gray-200 p-3 rounded-lg">
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-gray-900 text-sm">{skill.name}</span>
                                    <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs rounded-full font-medium">
                                      {getLevelLabel(skill.level)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-gray-600">
                                    <span className="flex items-center gap-1">
                                      <i className="ri-time-line"></i>
                                      {skill.years} {skill.years > 1 ? 'ans' : 'an'}
                                    </span>
                                  </div>
                                  {skill.achievement && (
                                    <p className="text-xs text-gray-600 mt-2 italic">{skill.achievement}</p>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeSkill(formData.skills.findIndex(s => s === skill))}
                                  className="text-red-500 hover:text-red-700 p-1"
                                >
                                  <i className="ri-close-line text-lg"></i>
                                </button>
                              </div>
                              {/* Barre de progression */}
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-gradient-to-r from-teal-500 to-teal-600 h-1.5 rounded-full"
                                  style={{ width: `${(skill.level / 5) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {formData.skills.length === 0 && (
                      <div className="text-center py-8 text-gray-500 text-sm">
                        <i className="ri-information-line text-2xl mb-2"></i>
                        <p>Aucune compétence ajoutée pour le moment</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 6: Paramètres de Confidentialité */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <i className="ri-shield-user-line text-xl text-red-600"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Paramètres de Confidentialité</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Visibilité */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Visibilité du profil <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2">
                        {['Public', 'Privé'].map((visibility) => (
                          <label key={visibility} className="flex items-start gap-3 cursor-pointer group">
                            <input
                              type="radio"
                              name="visibility"
                              value={visibility}
                              checked={formData.profileVisibility === visibility}
                              onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
                              className="w-4 h-4 text-teal-600 focus:ring-teal-500 mt-0.5"
                            />
                            <div>
                              <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium">{visibility}</span>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {visibility === 'Public' 
                                  ? 'Visible par tous les utilisateurs' 
                                  : 'Visible uniquement par les entreprises connectées'}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Notifications */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Notifications <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between cursor-pointer group">
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">Nouveaux leads</span>
                          <input
                            type="checkbox"
                            checked={formData.notifications.newLeads}
                            onChange={(e) => handleInputChange('notifications', {
                              ...formData.notifications,
                              newLeads: e.target.checked
                            })}
                            className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                          />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group">
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">Rappels de tâches</span>
                          <input
                            type="checkbox"
                            checked={formData.notifications.taskReminders}
                            onChange={(e) => handleInputChange('notifications', {
                              ...formData.notifications,
                              taskReminders: e.target.checked
                            })}
                            className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                          />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group">
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">Messages</span>
                          <input
                            type="checkbox"
                            checked={formData.notifications.messages}
                            onChange={(e) => handleInputChange('notifications', {
                              ...formData.notifications,
                              messages: e.target.checked
                            })}
                            className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton de soumission en bas */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <i className="ri-save-line"></i>
                Enregistrer le profil
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
