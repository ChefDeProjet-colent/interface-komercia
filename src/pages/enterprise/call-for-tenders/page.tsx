import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';
import Badge from '../../../components/base/Badge';
import {
  OffreRecrutement,
  CandidatureCommercial,
  TYPES_CONTRAT,
  DISPONIBILITES,
  MOBILITES,
  STATUTS_OFFRE,
  STATUTS_CANDIDATURE,
  COMPETENCES_SUGGESTIONS,
  LANGUES_DISPONIBLES,
  PAYS_AFRIQUE,
  TYPES_REMUNERATION,
  RemunerationDetails
} from '../../../types/entreprise';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function CallForTendersPage() {
  const [activeTab, setActiveTab] = useState<'ouverte' | 'fermee' | 'traitement'>('ouverte');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCandidaturesModal, setShowCandidaturesModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOffre, setSelectedOffre] = useState<OffreRecrutement | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOffre, setEditingOffre] = useState<OffreRecrutement | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showEntretienModal, setShowEntretienModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedCandidat, setSelectedCandidat] = useState<CandidatureCommercial | null>(null);

  // Produits/services mockés de l'entreprise (à remplacer par les vrais produits)
  const produitsEntreprise = [
    'CRM Premium',
    'Formation en prospection',
    'Solutions SaaS',
    'Services de consulting',
    'Solutions digitales pour PME',
    'Outils CRM avancés',
    'Formation commerciale',
    'Support technique'
  ];

  // État pour la nouvelle offre
  const [newOffre, setNewOffre] = useState<Partial<OffreRecrutement>>({
    titre: '',
    description: '',
    type_contrat: 'CDI',
    duree_contrat: '',
    remuneration: {
      type: 'Fixe',
      montant_fixe: undefined,
      taux_commission: undefined
    },
    experience_requise: '',
    competences_recherchees: [],
    langues_requises: [],
    disponibilite: 'Immédiate',
    mobilite_geographique: 'Locale',
    objectifs_vente: '',
    zone_intervention: [],
    produits_services_promouvoir: [],
    support_fourni: '',
    nombre_postes: 1,
    statut: 'Ouverte'
  });

  // Données mockées des offres
  const [offres, setOffres] = useState<OffreRecrutement[]>([
    {
      id: '1',
      titre: 'Recrutement de commerciaux B2B pour l\'Afrique de l\'Ouest',
      description: 'Nous recherchons des commerciaux expérimentés pour promouvoir nos solutions CRM auprès des PME en Afrique de l\'Ouest.',
      type_contrat: 'Freelance',
      duree_contrat: '6 mois renouvelables',
      remuneration: {
        type: 'Fixe+Commission',
        montant_fixe: 1000,
        taux_commission: 10
      },
      experience_requise: '3 ans minimum en prospection B2B',
      competences_recherchees: ['Négociation', 'Prospection', 'CRM', 'Closing'],
      langues_requises: ['Français', 'Anglais'],
      disponibilite: 'Immédiate',
      mobilite_geographique: 'Régionale',
      objectifs_vente: 'Atteindre un chiffre d\'affaires de 50 000 $ en 6 mois',
      zone_intervention: ['Côte d\'Ivoire', 'Sénégal', 'Ghana'],
      produits_services_promouvoir: ['CRM Premium', 'Formation en prospection'],
      support_fourni: 'Formation initiale, outils CRM, base de données prospects',
      nombre_postes: 5,
      statut: 'Ouverte',
      nombre_vues: 150,
      nombre_candidatures: 12,
      taux_conversion: 50,
      date_creation: '2024-01-10',
      date_limite: '2024-03-15'
    },
    {
      id: '2',
      titre: 'Commercial Senior - Secteur Technologie',
      description: 'Recherche commercial expérimenté pour développer notre activité dans le secteur technologique.',
      type_contrat: 'CDI',
      duree_contrat: '',
      remuneration: {
        type: 'Fixe+Commission',
        montant_fixe: 45000,
        taux_commission: 5
      },
      experience_requise: '5+ ans d\'expérience en vente B2B',
      competences_recherchees: ['Vente B2B', 'Négociation', 'CRM', 'Account management'],
      langues_requises: ['Français', 'Anglais'],
      disponibilite: 'Sous 1 mois',
      mobilite_geographique: 'Internationale',
      objectifs_vente: 'Générer 200 000 € de CA annuel',
      zone_intervention: ['Côte d\'Ivoire', 'Sénégal', 'Mali', 'Burkina Faso'],
      produits_services_promouvoir: ['Solutions SaaS', 'Services de consulting'],
      support_fourni: 'Formation complète, outils digitaux, accompagnement manager',
      nombre_postes: 2,
      statut: 'Ouverte',
      nombre_vues: 89,
      nombre_candidatures: 8,
      taux_conversion: 37.5,
      date_creation: '2024-01-15',
      date_limite: '2024-03-20'
    }
  ]);

  // Données mockées des candidatures
  const [candidatures, setCandidatures] = useState<CandidatureCommercial[]>([
    {
      id: '1',
      offre_id: '1',
      nom_candidat: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      telephone: '0712345678',
      code_pays: '+225',
      competences_principales: ['Prospection', 'Négociation', 'CRM Salesforce', 'Vente B2B', 'Closing'],
      experience: '5 ans en prospection B2B',
      statut: 'En attente',
      date_candidature: '2024-01-15',
      lettre_motivation: 'Je suis très intéressée par ce poste de commercial. Avec 5 ans d\'expérience dans la vente B2B dans le secteur technologique, j\'ai développé des compétences solides en prospection, négociation et closing.'
    },
    {
      id: '2',
      offre_id: '1',
      nom_candidat: 'Thomas Dubois',
      email: 'thomas.dubois@email.com',
      telephone: '0723456789',
      code_pays: '+225',
      competences_principales: ['Développement commercial', 'Management', 'Stratégie', 'Négociation'],
      experience: '7 ans en développement commercial',
      statut: 'En cours d\'évaluation',
      date_candidature: '2024-01-16',
      lettre_motivation: 'Fort de 7 années d\'expérience en développement commercial, je souhaite rejoindre votre équipe pour contribuer à votre croissance.',
      notes: 'Profil intéressant, expérience solide'
    },
    {
      id: '3',
      offre_id: '1',
      nom_candidat: 'Marie Lefebvre',
      email: 'marie.lefebvre@email.com',
      telephone: '0734567890',
      code_pays: '+225',
      competences_principales: ['Vente B2B', 'Relation client', 'Prospection digitale', 'CRM'],
      experience: '4 ans en vente B2B',
      statut: 'En attente',
      date_candidature: '2024-01-17'
    },
    {
      id: '4',
      offre_id: '1',
      nom_candidat: 'Alexandre Bernard',
      email: 'alexandre.bernard@email.com',
      telephone: '0745678901',
      code_pays: '+225',
      competences_principales: ['Vente consultative', 'Account management', 'Négociation complexe', 'SaaS'],
      experience: '6 ans en tant que commercial senior',
      statut: 'Acceptée',
      date_candidature: '2024-01-18',
      entretien_planifie: {
        date: '2024-02-05',
        heure: '14:00',
        lieu: 'Visioconférence'
      },
      notes: 'Excellent profil, entretien confirmé'
    },
    {
      id: '5',
      offre_id: '1',
      nom_candidat: 'Julie Moreau',
      email: 'julie.moreau@email.com',
      telephone: '0756789012',
      code_pays: '+225',
      competences_principales: ['Prospection', 'Relation client', 'Vente', 'Communication'],
      experience: '3 ans en vente',
      statut: 'Rejetée',
      date_candidature: '2024-01-19',
      notes: 'Expérience insuffisante pour le poste'
    }
  ]);

  // Statistiques
  const stats = {
    ouverte: offres.filter(o => o.statut === 'Ouverte').length,
    fermee: offres.filter(o => o.statut === 'Fermée').length,
    traitement: offres.filter(o => o.statut === 'En cours de traitement').length,
    totalCandidatures: offres.reduce((sum, o) => sum + (o.nombre_candidatures || 0), 0),
    totalPostes: offres.filter(o => o.statut === 'Ouverte').reduce((sum, o) => sum + o.nombre_postes, 0)
  };

  const filteredOffres = offres.filter(o => {
    if (activeTab === 'ouverte') return o.statut === 'Ouverte';
    if (activeTab === 'fermee') return o.statut === 'Fermée';
    if (activeTab === 'traitement') return o.statut === 'En cours de traitement';
    return true;
  });

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Ouverte': return 'bg-green-100 text-green-700';
      case 'Fermée': return 'bg-gray-100 text-gray-700';
      case 'En cours de traitement': return 'bg-yellow-100 text-yellow-700';
      case 'En attente': return 'bg-blue-100 text-blue-700';
      case 'En cours d\'évaluation': return 'bg-yellow-100 text-yellow-700';
      case 'Acceptée': return 'bg-green-100 text-green-700';
      case 'Rejetée': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCreateOffre = () => {
    const offre: OffreRecrutement = {
      id: Date.now().toString(),
      ...newOffre as OffreRecrutement,
      nombre_vues: 0,
      nombre_candidatures: 0,
      taux_conversion: 0,
      date_creation: new Date().toISOString().split('T')[0]
    };
    
    setOffres([offre, ...offres]);
    setShowCreateModal(false);
    resetNewOffre();
  };

  const resetNewOffre = () => {
    setNewOffre({
      titre: '',
      description: '',
      type_contrat: 'CDI',
      duree_contrat: '',
      remuneration: {
        type: 'Fixe',
        montant_fixe: undefined,
        taux_commission: undefined
      },
      experience_requise: '',
      competences_recherchees: [],
      langues_requises: [],
      disponibilite: 'Immédiate',
      mobilite_geographique: 'Locale',
      objectifs_vente: '',
      zone_intervention: [],
      produits_services_promouvoir: [],
      support_fourni: '',
      nombre_postes: 1,
      statut: 'Ouverte'
    });
  };

  const handleViewCandidatures = (offre: OffreRecrutement) => {
    setSelectedOffre(offre);
    setShowCandidaturesModal(true);
  };

  const handleUpdateCandidatureStatus = (candidatureId: string, newStatus: typeof STATUTS_CANDIDATURE[number]) => {
    setCandidatures(prev =>
      prev.map(c => c.id === candidatureId ? { ...c, statut: newStatus } : c)
    );
  };

  const getCandidaturesForOffre = (offreId: string) => {
    return candidatures.filter(c => c.offre_id === offreId);
  };

  const handleAddCompetence = (competence: string) => {
    if (competence && !newOffre.competences_recherchees?.includes(competence)) {
      setNewOffre({
        ...newOffre,
        competences_recherchees: [...(newOffre.competences_recherchees || []), competence]
      });
    }
  };

  const handleRemoveCompetence = (competence: string) => {
    setNewOffre({
      ...newOffre,
      competences_recherchees: newOffre.competences_recherchees?.filter(c => c !== competence) || []
    });
  };

  const handleAddLangue = (langue: string) => {
    if (langue && !newOffre.langues_requises?.includes(langue)) {
      setNewOffre({
        ...newOffre,
        langues_requises: [...(newOffre.langues_requises || []), langue]
      });
    }
  };

  const handleRemoveLangue = (langue: string) => {
    setNewOffre({
      ...newOffre,
      langues_requises: newOffre.langues_requises?.filter(l => l !== langue) || []
    });
  };

  const handleTogglePays = (pays: string) => {
    const zones = newOffre.zone_intervention || [];
    if (zones.includes(pays)) {
      setNewOffre({
        ...newOffre,
        zone_intervention: zones.filter(p => p !== pays)
      });
    } else {
      setNewOffre({
        ...newOffre,
        zone_intervention: [...zones, pays]
      });
    }
  };

  const handleToggleProduit = (produit: string) => {
    const produits = newOffre.produits_services_promouvoir || [];
    if (produits.includes(produit)) {
      setNewOffre({
        ...newOffre,
        produits_services_promouvoir: produits.filter(p => p !== produit)
      });
    } else {
      setNewOffre({
        ...newOffre,
        produits_services_promouvoir: [...produits, produit]
      });
    }
  };

  // Fonction d'export en PDF
  const exportToPDF = (offre: OffreRecrutement) => {
    const doc = new jsPDF();
    const candidaturesOffre = candidatures.filter(c => c.offre_id === offre.id);

    // En-tête du document
    doc.setFontSize(18);
    doc.setTextColor(20, 184, 166);
    doc.text('Rapport des Candidatures', 14, 20);

    // Informations de l'offre
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Offre: ${offre.titre}`, 14, 35);
    doc.setFontSize(10);
    doc.text(`Type de contrat: ${offre.type_contrat}`, 14, 42);
    doc.text(`Postes disponibles: ${offre.nombre_postes}`, 14, 48);
    doc.text(`Statut: ${offre.statut}`, 14, 54);

    // Statistiques
    const statsOffre = {
      total: candidaturesOffre.length,
      enAttente: candidaturesOffre.filter(c => c.statut === 'En attente').length,
      enEvaluation: candidaturesOffre.filter(c => c.statut === 'En cours d\'évaluation').length,
      acceptees: candidaturesOffre.filter(c => c.statut === 'Acceptée').length,
      rejetees: candidaturesOffre.filter(c => c.statut === 'Rejetée').length,
    };

    doc.text(`Total candidatures: ${statsOffre.total}`, 14, 60);
    doc.text(`En attente: ${statsOffre.enAttente} | En évaluation: ${statsOffre.enEvaluation} | Acceptées: ${statsOffre.acceptees} | Rejetées: ${statsOffre.rejetees}`, 14, 66);

    // Tableau des candidatures
    const tableData = candidaturesOffre.map(c => [
      c.nom_candidat,
      c.email,
      `${c.code_pays || ''} ${c.telephone}`,
      c.competences_principales.slice(0, 3).join(', '),
      c.experience,
      c.statut,
    ]);

    autoTable(doc, {
      startY: 75,
      head: [['Nom', 'Email', 'Téléphone', 'Compétences', 'Expérience', 'Statut']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [20, 184, 166],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 40 },
        2: { cellWidth: 25 },
        3: { cellWidth: 40 },
        4: { cellWidth: 25 },
        5: { cellWidth: 25 },
      },
    });

    // Pied de page
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(
        `Page ${i} sur ${pageCount} - Généré le ${new Date().toLocaleDateString('fr-FR')}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    // Téléchargement
    doc.save(`candidatures_${offre.titre.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Fonction d'export en Excel (CSV)
  const exportToExcel = (offre: OffreRecrutement) => {
    const candidaturesOffre = candidatures.filter(c => c.offre_id === offre.id);

    // Créer le contenu CSV
    const headers = ['Nom', 'Email', 'Téléphone', 'Compétences', 'Expérience', 'Statut', 'Lettre de motivation', 'Notes'];
    const rows = candidaturesOffre.map(c => [
      c.nom_candidat,
      c.email,
      `${c.code_pays || ''} ${c.telephone}`,
      c.competences_principales.join('; '),
      c.experience,
      c.statut,
      c.lettre_motivation || '',
      c.notes || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell.toString().replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    // Créer le blob et télécharger
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `candidatures_${offre.titre.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Fonction de partage d'offre
  const shareOffre = (offre: OffreRecrutement) => {
    const shareUrl = `${window.location.origin}/offres/${offre.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Lien de l\'offre copié dans le presse-papiers !');
    }).catch(() => {
      alert('Erreur lors de la copie du lien');
    });
  };

  const handlePartagerOffre = () => {
    const url = `${window.location.origin}/offres/${selectedOffre?.id}`;
    navigator.clipboard.writeText(url);
    alert('Lien copié dans le presse-papiers !');
  };

  const getRemunerationDisplay = (remuneration?: RemunerationDetails) => {
    if (!remuneration) return 'À négocier';
    
    if (remuneration.type === 'Fixe') {
      return `${remuneration.montant_fixe} $/mois`;
    } else if (remuneration.type === 'Commission') {
      return `${remuneration.taux_commission}% de commission`;
    } else {
      return `${remuneration.montant_fixe} $/mois + ${remuneration.taux_commission}% de commission`;
    }
  };

  const handleContactCandidat = (candidat: CandidatureCommercial) => {
    setSelectedCandidat(candidat);
    setShowContactModal(true);
  };

  const handlePlanifierEntretien = (candidat: CandidatureCommercial) => {
    setSelectedCandidat(candidat);
    setShowEntretienModal(true);
  };

  const handleAjouterNotes = (candidat: CandidatureCommercial) => {
    setSelectedCandidat(candidat);
    setShowNotesModal(true);
  };

  const handleSaveNotes = (notes: string) => {
    if (selectedCandidat) {
      setCandidatures(prev =>
        prev.map(c => c.id === selectedCandidat.id ? { ...c, notes } : c)
      );
      setShowNotesModal(false);
      setSelectedCandidat(null);
    }
  };

  const handleSaveEntretien = (date: string, heure: string, lieu: string) => {
    if (selectedCandidat) {
      setCandidatures(prev =>
        prev.map(c => c.id === selectedCandidat.id ? { 
          ...c, 
          entretien_planifie: { date, heure, lieu },
          statut: 'En cours d\'évaluation'
        } : c)
      );
      setShowEntretienModal(false);
      setSelectedCandidat(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Recrutement de Commerciaux</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Gérez vos offres de recrutement et candidatures</p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full sm:w-auto bg-teal-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 whitespace-nowrap text-sm sm:text-base"
              >
                <i className="ri-add-line text-lg"></i>
                <span>Créer une offre</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200 overflow-x-auto">
            <nav className="flex px-4 sm:px-6 lg:px-8 min-w-max">
              {[
                { id: 'ouverte', label: 'Ouvertes', icon: 'ri-door-open-line', count: stats.ouverte },
                { id: 'traitement', label: 'En traitement', icon: 'ri-time-line', count: stats.traitement },
                { id: 'fermee', label: 'Fermées', icon: 'ri-lock-line', count: stats.fermee }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-4 border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} text-base sm:text-lg`}></i>
                  <span>{tab.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    activeTab === tab.id ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {[
              { label: 'Offres ouvertes', value: stats.ouverte, icon: 'ri-door-open-line', color: 'bg-green-500' },
              { label: 'En traitement', value: stats.traitement, icon: 'ri-time-line', color: 'bg-yellow-500' },
              { label: 'Offres fermées', value: stats.fermee, icon: 'ri-lock-line', color: 'bg-gray-500' },
              { label: 'Total candidatures', value: stats.totalCandidatures, icon: 'ri-user-line', color: 'bg-blue-500' },
              { label: 'Postes disponibles', value: stats.totalPostes, icon: 'ri-briefcase-line', color: 'bg-purple-500' }
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

          {/* Offres List */}
          <div className="space-y-4 sm:space-y-6">
            {filteredOffres.map((offre) => (
              <div key={offre.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 sm:p-6 lg:p-8">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{offre.titre}</h3>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatutColor(offre.statut)}`}>
                          {offre.statut}
                        </span>
                        <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-700">
                          {offre.type_contrat}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">{offre.description}</p>
                    </div>
                    <div className="flex flex-col items-start lg:items-end gap-2">
                      <div className="text-left lg:text-right">
                        <p className="text-xl sm:text-2xl font-bold text-teal-600">{offre.nombre_postes}</p>
                        <p className="text-xs sm:text-sm text-gray-500">Poste{offre.nombre_postes > 1 ? 's' : ''} disponible{offre.nombre_postes > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  </div>

                  {/* Boutons d'export et partage */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <button
                      onClick={() => exportToPDF(offre)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm whitespace-nowrap"
                    >
                      <i className="ri-file-pdf-line"></i>
                      <span>Exporter en PDF</span>
                    </button>
                    <button
                      onClick={() => exportToExcel(offre)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm whitespace-nowrap"
                    >
                      <i className="ri-file-excel-line"></i>
                      <span>Exporter en Excel</span>
                    </button>
                    <button
                      onClick={() => shareOffre(offre)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
                    >
                      <i className="ri-share-line"></i>
                      <span>Partager l'offre</span>
                    </button>
                  </div>

                  {/* Compétences */}
                  <div className="mb-4">
                    <p className="text-xs sm:text-sm text-gray-500 mb-2">Compétences recherchées :</p>
                    <div className="flex flex-wrap gap-2">
                      {offre.competences_recherchees.map((comp, index) => (
                        <span key={index} className="px-2 sm:px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Statistiques */}
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{offre.nombre_vues || 0}</p>
                        <p className="text-xs text-gray-500">Vues</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{offre.nombre_candidatures || 0}</p>
                        <p className="text-xs text-gray-500">Candidatures</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{offre.taux_conversion || 0}%</p>
                        <p className="text-xs text-gray-500">Taux conversion</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => {
                          setSelectedOffre(offre);
                          setShowDetailsModal(true);
                        }}
                        className="flex-1 bg-gray-100 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
                      >
                        <i className="ri-eye-line"></i>
                        <span>Voir détails</span>
                      </button>
                      <button
                        onClick={() => handleViewCandidatures(offre)}
                        className="flex-1 bg-teal-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
                      >
                        <i className="ri-user-line"></i>
                        <span>Candidatures ({offre.nombre_candidatures || 0})</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedOffre(offre);
                          handlePartagerOffre();
                        }}
                        className="flex-1 bg-blue-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
                      >
                        <i className="ri-share-line"></i>
                        <span>Partager</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredOffres.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune offre</h3>
                <p className="text-gray-600 mb-6">Vous n'avez pas encore créé d'offre de recrutement dans cette catégorie.</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors inline-flex items-center gap-2"
                >
                  <i className="ri-add-line"></i>
                  <span>Créer une offre</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Création Offre */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Créer une offre de recrutement</h3>
            
            <div className="space-y-6">
              {/* Section 1: Informations Générales */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-file-list-line text-teal-500"></i>
                  Informations Générales
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre de l'offre <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newOffre.titre}
                      onChange={(e) => setNewOffre({ ...newOffre, titre: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Ex: Recrutement de commerciaux B2B pour l'Afrique de l'Ouest"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description de l'offre <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={newOffre.description}
                      onChange={(e) => setNewOffre({ ...newOffre, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Décrivez le poste et les missions..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de contrat <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={newOffre.type_contrat}
                        onChange={(e) => setNewOffre({ ...newOffre, type_contrat: e.target.value as any })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      >
                        {TYPES_CONTRAT.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Durée du contrat
                      </label>
                      <input
                        type="text"
                        value={newOffre.duree_contrat}
                        onChange={(e) => setNewOffre({ ...newOffre, duree_contrat: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="Ex: 6 mois renouvelables"
                      />
                    </div>
                  </div>

                  {/* Rémunération avec type et champs conditionnels */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de rémunération
                    </label>
                    <select
                      value={newOffre.remuneration?.type}
                      onChange={(e) => setNewOffre({ 
                        ...newOffre, 
                        remuneration: {
                          type: e.target.value as any,
                          montant_fixe: undefined,
                          taux_commission: undefined
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    >
                      {TYPES_REMUNERATION.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Champs conditionnels selon le type de rémunération */}
                  {newOffre.remuneration?.type && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(newOffre.remuneration.type === 'Fixe' || newOffre.remuneration.type === 'Fixe+Commission') && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Montant fixe ($/mois)
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={newOffre.remuneration.montant_fixe || ''}
                            onChange={(e) => setNewOffre({ 
                              ...newOffre, 
                              remuneration: {
                                ...newOffre.remuneration!,
                                montant_fixe: parseFloat(e.target.value) || undefined
                              }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                            placeholder="Ex: 1000"
                          />
                        </div>
                      )}
                      
                      {(newOffre.remuneration.type === 'Commission' || newOffre.remuneration.type === 'Fixe+Commission') && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Taux de commission (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            value={newOffre.remuneration.taux_commission || ''}
                            onChange={(e) => setNewOffre({ 
                              ...newOffre, 
                              remuneration: {
                                ...newOffre.remuneration!,
                                taux_commission: parseFloat(e.target.value) || undefined
                              }
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                            placeholder="Ex: 10"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Section 2: Critères de Recrutement */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-user-search-line text-teal-500"></i>
                  Critères de Recrutement
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expérience requise <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newOffre.experience_requise}
                      onChange={(e) => setNewOffre({ ...newOffre, experience_requise: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Ex: 3 ans minimum en prospection B2B"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Compétences recherchées <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {newOffre.competences_recherchees?.map((comp, index) => (
                        <span key={index} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                          {comp}
                        </span>
                      ))}
                    </div>
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          handleAddCompetence(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="">Sélectionner une compétence</option>
                      {COMPETENCES_SUGGESTIONS.map(comp => (
                        <option key={comp} value={comp}>{comp}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Langues requises
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {newOffre.langues_requises?.map((langue, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {langue}
                        </span>
                      ))}
                    </div>
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          handleAddLangue(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="">Sélectionner une langue</option>
                      {LANGUES_DISPONIBLES.map(langue => (
                        <option key={langue} value={langue}>{langue}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Disponibilité
                      </label>
                      <select
                        value={newOffre.disponibilite}
                        onChange={(e) => setNewOffre({ ...newOffre, disponibilite: e.target.value as any })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      >
                        {DISPONIBILITES.map(dispo => (
                          <option key={dispo} value={dispo}>{dispo}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobilité géographique
                      </label>
                      <select
                        value={newOffre.mobilite_geographique}
                        onChange={(e) => setNewOffre({ ...newOffre, mobilite_geographique: e.target.value as any })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      >
                        {MOBILITES.map(mob => (
                          <option key={mob} value={mob}>{mob}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Détails sur la Mission */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-target-line text-teal-500"></i>
                  Détails sur la Mission
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Objectifs de vente <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newOffre.objectifs_vente}
                      onChange={(e) => setNewOffre({ ...newOffre, objectifs_vente: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Ex: Atteindre un chiffre d'affaires de 50 000 $ en 6 mois"
                    />
                  </div>

                  {/* Zone d'intervention - Choix multiple de pays */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zone d'intervention (pays) <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {newOffre.zone_intervention?.map((pays, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {PAYS_AFRIQUE.find(p => p.nom === pays)?.flag} {pays}
                        </span>
                      ))}
                    </div>
                    <div className="border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
                      {PAYS_AFRIQUE.map((pays) => (
                        <label
                          key={pays.code}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={newOffre.zone_intervention?.includes(pays.nom) || false}
                            onChange={() => handleTogglePays(pays.nom)}
                            className="w-4 h-4 text-teal-500 rounded focus:ring-teal-500"
                          />
                          <span className="text-sm">
                            {pays.flag} {pays.nom}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Produits/Services - Choix multiple depuis les produits de l'entreprise */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Produits/Services à promouvoir <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {newOffre.produits_services_promouvoir?.map((prod, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          {prod}
                        </span>
                      ))}
                    </div>
                    <div className="border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
                      {produitsEntreprise.map((produit) => (
                        <label
                          key={produit}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={newOffre.produits_services_promouvoir?.includes(produit) || false}
                            onChange={() => handleToggleProduit(produit)}
                            className="w-4 h-4 text-teal-500 rounded focus:ring-teal-500"
                          />
                          <span className="text-sm">{produit}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Support fourni par l'entreprise
                    </label>
                    <textarea
                      value={newOffre.support_fourni}
                      onChange={(e) => setNewOffre({ ...newOffre, support_fourni: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Ex: Formation initiale, outils CRM, base de données prospects"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Gestion des Candidatures */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-settings-line text-teal-500"></i>
                  Gestion des Candidatures
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de postes disponibles <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newOffre.nombre_postes}
                      onChange={(e) => setNewOffre({ ...newOffre, nombre_postes: parseInt(e.target.value) || 1 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date limite de candidature
                    </label>
                    <input
                      type="date"
                      value={newOffre.date_limite}
                      onChange={(e) => setNewOffre({ ...newOffre, date_limite: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={handleCreateOffre}
                disabled={
                  !newOffre.titre || 
                  !newOffre.description || 
                  !newOffre.experience_requise || 
                  !newOffre.objectifs_vente || 
                  (newOffre.zone_intervention?.length || 0) === 0 || 
                  (newOffre.competences_recherchees?.length || 0) === 0 || 
                  (newOffre.produits_services_promouvoir?.length || 0) === 0
                }
                className="flex-1 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap"
              >
                Publier l'offre
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetNewOffre();
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Candidatures */}
      {showCandidaturesModal && selectedOffre && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Candidatures</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedOffre.titre}</p>
              </div>
              <button
                onClick={() => {
                  setShowCandidaturesModal(false);
                  setSelectedOffre(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            {/* Statistiques des candidatures */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total', value: getCandidaturesForOffre(selectedOffre.id!).length, color: 'bg-blue-500' },
                { label: 'En attente', value: getCandidaturesForOffre(selectedOffre.id!).filter(c => c.statut === 'En attente').length, color: 'bg-yellow-500' },
                { label: 'Acceptées', value: getCandidaturesForOffre(selectedOffre.id!).filter(c => c.statut === 'Acceptée').length, color: 'bg-green-500' },
                { label: 'Rejetées', value: getCandidaturesForOffre(selectedOffre.id!).filter(c => c.statut === 'Rejetée').length, color: 'bg-red-500' }
              ].map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className={`${stat.color} w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2`}>
                    <span className="text-white font-bold text-sm">{stat.value}</span>
                  </div>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Liste des candidatures */}
            <div className="space-y-4">
              {getCandidaturesForOffre(selectedOffre.id!).map((candidature) => (
                <div key={candidature.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-teal-300 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-teal-600 font-bold text-lg">
                              {candidature.nom_candidat.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900">{candidature.nom_candidat}</h4>
                            <p className="text-sm text-gray-600">{candidature.experience}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutColor(candidature.statut)}`}>
                            {candidature.statut}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <i className="ri-mail-line"></i>
                            <span>{candidature.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <i className="ri-phone-line"></i>
                            <span>{candidature.code_pays} {candidature.telephone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <i className="ri-calendar-line"></i>
                            <span>Candidature: {candidature.date_candidature}</span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-2">Compétences :</p>
                          <div className="flex flex-wrap gap-2">
                            {candidature.competences_principales.map((comp, index) => (
                              <span key={index} className="px-2 py-1 bg-teal-50 text-teal-700 rounded-full text-xs">
                                {comp}
                              </span>
                            ))}
                          </div>
                        </div>

                        {candidature.lettre_motivation && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-3">
                            <p className="text-xs text-gray-500 mb-1">Lettre de motivation :</p>
                            <p className="text-sm text-gray-700 line-clamp-2">{candidature.lettre_motivation}</p>
                          </div>
                        )}

                        {candidature.entretien_planifie && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                            <p className="text-xs text-green-700 font-medium mb-1">
                              <i className="ri-calendar-check-line mr-1"></i>
                              Entretien planifié
                            </p>
                            <p className="text-sm text-green-900">
                              {candidature.entretien_planifie.date} à {candidature.entretien_planifie.heure} - {candidature.entretien_planifie.lieu}
                            </p>
                          </div>
                        )}

                        {candidature.notes && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p className="text-xs text-yellow-700 font-medium mb-1">
                              <i className="ri-sticky-note-line mr-1"></i>
                              Notes
                            </p>
                            <p className="text-sm text-yellow-900">{candidature.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 lg:w-48">
                      <select
                        value={candidature.statut}
                        onChange={(e) => handleUpdateCandidatureStatus(candidature.id!, e.target.value as any)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        {STATUTS_CANDIDATURE.map(statut => (
                          <option key={statut} value={statut}>{statut}</option>
                        ))}
                      </select>
                      <button 
                        onClick={() => handleContactCandidat(candidature)}
                        className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors text-sm whitespace-nowrap"
                      >
                        <i className="ri-mail-line mr-1"></i>
                        Contacter
                      </button>
                      <button 
                        onClick={() => handlePlanifierEntretien(candidature)}
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm whitespace-nowrap"
                      >
                        <i className="ri-calendar-line mr-1"></i>
                        Planifier
                      </button>
                      <button 
                        onClick={() => handleAjouterNotes(candidature)}
                        className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm whitespace-nowrap"
                      >
                        <i className="ri-sticky-note-line mr-1"></i>
                        Notes
                      </button>
                      <button className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm whitespace-nowrap">
                        <i className="ri-file-download-line mr-1"></i>
                        CV
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {getCandidaturesForOffre(selectedOffre.id!).length === 0 && (
                <div className="text-center py-12">
                  <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-600">Aucune candidature pour le moment</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Contact Candidat */}
      {showContactModal && selectedCandidat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contacter {selectedCandidat.nom_candidat}</h3>
            <div className="space-y-3 mb-6">
              <a 
                href={`mailto:${selectedCandidat.email}`}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <i className="ri-mail-line text-teal-500 text-xl"></i>
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-xs text-gray-600">{selectedCandidat.email}</p>
                </div>
              </a>
              <a 
                href={`tel:${selectedCandidat.code_pays}${selectedCandidat.telephone}`}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <i className="ri-phone-line text-teal-500 text-xl"></i>
                <div>
                  <p className="text-sm font-medium text-gray-900">Téléphone</p>
                  <p className="text-xs text-gray-600">{selectedCandidat.code_pays} {selectedCandidat.telephone}</p>
                </div>
              </a>
            </div>
            <button
              onClick={() => {
                setShowContactModal(false);
                setSelectedCandidat(null);
              }}
              className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal Planifier Entretien */}
      {showEntretienModal && selectedCandidat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Planifier un entretien</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSaveEntretien(
                formData.get('date') as string,
                formData.get('heure') as string,
                formData.get('lieu') as string
              );
            }}>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    required
                    defaultValue={selectedCandidat.entretien_planifie?.date}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heure</label>
                  <input
                    type="time"
                    name="heure"
                    required
                    defaultValue={selectedCandidat.entretien_planifie?.heure}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lieu</label>
                  <input
                    type="text"
                    name="lieu"
                    required
                    defaultValue={selectedCandidat.entretien_planifie?.lieu}
                    placeholder="Ex: Visioconférence, Bureau, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEntretienModal(false);
                    setSelectedCandidat(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Ajouter Notes */}
      {showNotesModal && selectedCandidat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ajouter des notes</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSaveNotes(formData.get('notes') as string);
            }}>
              <div className="mb-6">
                <textarea
                  name="notes"
                  rows={6}
                  defaultValue={selectedCandidat.notes}
                  placeholder="Ajoutez vos notes sur ce candidat..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowNotesModal(false);
                    setSelectedCandidat(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Détails Offre */}
      {showDetailsModal && selectedOffre && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Détails de l'offre</h3>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedOffre(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              {/* Informations générales */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-file-list-line text-teal-500"></i>
                  Informations Générales
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Titre</p>
                    <p className="text-sm font-medium text-gray-900">{selectedOffre.titre}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Description</p>
                    <p className="text-sm text-gray-900">{selectedOffre.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Type de contrat</p>
                      <p className="text-sm font-medium text-gray-900">{selectedOffre.type_contrat}</p>
                    </div>
                    {selectedOffre.duree_contrat && (
                      <div>
                        <p className="text-xs text-gray-500">Durée</p>
                        <p className="text-sm font-medium text-gray-900">{selectedOffre.duree_contrat}</p>
                      </div>
                    )}
                  </div>
                  {selectedOffre.remuneration && (
                    <div>
                      <p className="text-xs text-gray-500">Rémunération</p>
                      <p className="text-sm font-medium text-gray-900">{getRemunerationDisplay(selectedOffre.remuneration)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Critères de recrutement */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-user-search-line text-teal-500"></i>
                  Critères de Recrutement
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Expérience requise</p>
                    <p className="text-sm font-medium text-gray-900">{selectedOffre.experience_requise}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Compétences recherchées</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedOffre.competences_recherchees.map((comp, index) => (
                        <span key={index} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedOffre.langues_requises && selectedOffre.langues_requises.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Langues requises</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedOffre.langues_requises.map((langue, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            {langue}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    {selectedOffre.disponibilite && (
                      <div>
                        <p className="text-xs text-gray-500">Disponibilité</p>
                        <p className="text-sm font-medium text-gray-900">{selectedOffre.disponibilite}</p>
                      </div>
                    )}
                    {selectedOffre.mobilite_geographique && (
                      <div>
                        <p className="text-xs text-gray-500">Mobilité</p>
                        <p className="text-sm font-medium text-gray-900">{selectedOffre.mobilite_geographique}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Détails sur la mission */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-target-line text-teal-500"></i>
                  Détails sur la Mission
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Objectifs de vente</p>
                    <p className="text-sm font-medium text-gray-900">{selectedOffre.objectifs_vente}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Zone d'intervention</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedOffre.zone_intervention.map((pays, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {PAYS_AFRIQUE.find(p => p.nom === pays)?.flag} {pays}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Produits/Services à promouvoir</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedOffre.produits_services_promouvoir.map((prod, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          {prod}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedOffre.support_fourni && (
                    <div>
                      <p className="text-xs text-gray-500">Support fourni</p>
                      <p className="text-sm text-gray-900">{selectedOffre.support_fourni}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Statistiques */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="ri-bar-chart-line text-teal-500"></i>
                  Statistiques
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{selectedOffre.nombre_postes}</p>
                    <p className="text-xs text-gray-500">Postes</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{selectedOffre.nombre_vues || 0}</p>
                    <p className="text-xs text-gray-500">Vues</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{selectedOffre.nombre_candidatures || 0}</p>
                    <p className="text-xs text-gray-500">Candidatures</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{selectedOffre.taux_conversion || 0}%</p>
                    <p className="text-xs text-gray-500">Taux conversion</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  handleViewCandidatures(selectedOffre);
                }}
                className="flex-1 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Voir les candidatures
              </button>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedOffre(null);
                }}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
