import { useState, useEffect } from 'react';

// Types pour le système publicitaire avancé
interface AdCampaign {
  id: string;
  name: string;
  priority: number;
  startDate: string;
  endDate: string;
  budget: number;
  status: 'active' | 'paused' | 'completed';
}

interface AdAnalytics {
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  revenue: number;
  lastShown: string;
}

interface Advertisement {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  ctaText: string;
  targetUrl: string;
  category: string;
  targetAudience: string[];
  sections: string[];
  format: 'static' | 'animated' | 'video' | 'popup';
  size: 'horizontal' | 'vertical' | 'square' | 'banner';
  priority: number;
  campaign?: AdCampaign;
  analytics: AdAnalytics;
  isActive: boolean;
  tags: string[];
  userProfile?: string;
  actionContext?: string;
  sector?: string[];
}

interface UserProfile {
  id: string;
  role: string;
  sector: string;
  clientTypes: string[];
  interests: string[];
  activityHistory: string[];
}

interface AdTargeting {
  userProfile?: string;
  section?: string;
  actionContext?: string;
  timeOfDay?: string;
  dayOfWeek?: string;
  targetCategories?: string[];
  sector?: string;
}

// Base de données des publicités
class AdDatabase {
  private static instance: AdDatabase;
  private advertisements: Advertisement[] = [];
  private userProfiles: UserProfile[] = [];
  private campaigns: AdCampaign[] = [];

  private constructor() {
    this.initializeAds();
    this.initializeUserProfiles();
    this.initializeCampaigns();
  }

  static getInstance(): AdDatabase {
    if (!AdDatabase.instance) {
      AdDatabase.instance = new AdDatabase();
    }
    return AdDatabase.instance;
  }

  private initializeCampaigns(): void {
    this.campaigns = [
      {
        id: 'camp-1',
        name: 'Campagne Analytics Q1',
        priority: 10,
        startDate: '2024-01-01',
        endDate: '2024-03-31',
        budget: 50000,
        status: 'active'
      },
      {
        id: 'camp-2',
        name: 'Promotion Outils Collaboration',
        priority: 8,
        startDate: '2024-02-01',
        endDate: '2024-04-30',
        budget: 35000,
        status: 'active'
      },
      {
        id: 'camp-3',
        name: 'Formation Professionnelle',
        priority: 9,
        startDate: '2024-01-15',
        endDate: '2024-06-15',
        budget: 75000,
        status: 'active'
      }
    ];
  }

  private initializeUserProfiles(): void {
    this.userProfiles = [
      {
        id: 'commercial-1',
        role: 'commercial',
        sector: 'technology',
        clientTypes: ['startup', 'enterprise', 'sme'],
        interests: ['analytics', 'crm', 'automation'],
        activityHistory: ['lead-management', 'pipeline-tracking', 'reporting']
      },
      {
        id: 'manager-1',
        role: 'manager',
        sector: 'sales',
        clientTypes: ['enterprise', 'b2b'],
        interests: ['team-management', 'performance', 'analytics'],
        activityHistory: ['team-tracking', 'kpi-monitoring', 'reporting']
      }
    ];
  }

  private initializeAds(): void {
    this.advertisements = [
      // Publicités CRM et Gestion Commerciale
      {
        id: 'ad-crm-001',
        title: 'CRM Intelligence Artificielle',
        description: 'Automatisez votre gestion commerciale avec notre CRM dopé à l\'IA. Prédictions de ventes, scoring automatique des leads.',
        imageUrl: 'https://readdy.ai/api/search-image?query=modern%20AI-powered%20CRM%20dashboard%20with%20sales%20analytics%20charts%20graphs%20customer%20management%20interface%20professional%20business%20software&width=400&height=200&seq=crm001&orientation=landscape',
        ctaText: 'Essai Gratuit 30j',
        targetUrl: 'https://ai-crm.example.com',
        category: 'crm',
        targetAudience: ['commercial', 'manager'],
        sections: ['dashboard', 'leads', 'pipeline'],
        format: 'static',
        size: 'horizontal',
        priority: 9,
        campaign: this.campaigns[0],
        analytics: {
          impressions: 18500,
          clicks: 1295,
          ctr: 7.0,
          conversions: 185,
          revenue: 37000,
          lastShown: new Date().toISOString()
        },
        isActive: true,
        tags: ['crm', 'ai', 'automation', 'sales'],
        userProfile: 'commercial',
        actionContext: 'lead-management',
        sector: ['Technology', 'Sales', 'B2B']
      },
      {
        id: 'ad-automation-001',
        title: 'Automatisation Commerciale 360°',
        description: 'Gagnez 10h par semaine avec notre suite d\'automatisation : emails, relances, rapports, tout est automatisé.',
        imageUrl: 'https://readdy.ai/api/search-image?query=sales%20automation%20platform%20workflow%20management%20email%20automation%20business%20process%20optimization%20modern%20interface%20professional%20tools&width=400&height=200&seq=auto001&orientation=landscape',
        ctaText: 'Découvrir la Suite',
        targetUrl: 'https://sales-automation.example.com',
        category: 'automation',
        targetAudience: ['commercial', 'manager'],
        sections: ['dashboard', 'activities', 'pipeline'],
        format: 'animated',
        size: 'horizontal',
        priority: 8,
        campaign: this.campaigns[1],
        analytics: {
          impressions: 15200,
          clicks: 1064,
          ctr: 7.0,
          conversions: 152,
          revenue: 30400,
          lastShown: new Date().toISOString()
        },
        isActive: true,
        tags: ['automation', 'productivity', 'workflow', 'efficiency'],
        userProfile: 'commercial',
        actionContext: 'task-automation',
        sector: ['Sales', 'Productivity', 'Technology']
      },

      // Publicités pour l'analyse de données
      {
        id: 'ad-analytics-1',
        title: 'Suite Analytics Stratégique Pro',
        description: 'Tableaux de bord avancés et analyses prédictives pour consultants. Intégration IA et visualisations interactives.',
        imageUrl: 'https://readdy.ai/api/search-image?query=Professional%20business%20analytics%20dashboard%20with%20charts%20graphs%20data%20visualization%20modern%20interface%20consultant%20tools%20strategic%20analysis&width=400&height=200&seq=analytics1&orientation=landscape',
        ctaText: 'Découvrir la Suite',
        targetUrl: 'https://analytics-pro.example.com',
        category: 'analytics',
        targetAudience: ['consultant-strategy', 'data-analyst'],
        sections: ['consultants-header', 'consultants-data', 'consultants-analytics'],
        format: 'static',
        size: 'horizontal',
        priority: 9,
        campaign: this.campaigns[0],
        analytics: {
          impressions: 15420,
          clicks: 892,
          ctr: 5.8,
          conversions: 127,
          revenue: 25400,
          lastShown: '2024-01-15T10:30:00Z'
        },
        isActive: true,
        tags: ['analytics', 'dashboard', 'ai', 'visualization'],
        userProfile: 'consultant-strategy',
        actionContext: 'data-analysis'
      },
      {
        id: 'ad-market-analysis-1',
        title: 'IA Analyse de Marché',
        description: 'Détection automatique d\'opportunités et analyse concurrentielle en temps réel. Algorithmes prédictifs avancés.',
        imageUrl: 'https://readdy.ai/api/search-image?query=Artificial%20intelligence%20market%20analysis%20competitive%20intelligence%20business%20opportunities%20detection%20algorithms%20data%20mining%20consultant%20tools&width=300&height=400&seq=market1&orientation=portrait',
        ctaText: 'Essai Gratuit 30j',
        targetUrl: 'https://market-ai.example.com',
        category: 'market-analysis',
        targetAudience: ['consultant-strategy', 'market-researcher'],
        sections: ['consultants-sidebar', 'consultants-analytics'],
        format: 'animated',
        size: 'vertical',
        priority: 8,
        campaign: this.campaigns[0],
        analytics: {
          impressions: 12350,
          clicks: 741,
          ctr: 6.0,
          conversions: 98,
          revenue: 19600,
          lastShown: '2024-01-15T14:20:00Z'
        },
        isActive: true,
        tags: ['ai', 'market-analysis', 'competitive-intelligence', 'automation'],
        userProfile: 'consultant-strategy',
        actionContext: 'market-research'
      },
      {
        id: 'ad-collaboration-1',
        title: 'Plateforme Communication Unifiée',
        description: 'Messagerie, visioconférence et partage de documents intégrés. Collaboration temps réel avec vos clients.',
        imageUrl: 'https://readdy.ai/api/search-image?query=Unified%20communication%20platform%20video%20conferencing%20messaging%20document%20sharing%20collaboration%20tools%20business%20professional%20interface%20modern%20design&width=400&height=200&seq=collab1&orientation=landscape',
        ctaText: 'Démo Interactive',
        targetUrl: 'https://unified-comm.example.com',
        category: 'collaboration',
        targetAudience: ['consultant-strategy', 'project-manager'],
        sections: ['consultants-collaboration', 'consultants-footer'],
        format: 'static',
        size: 'horizontal',
        priority: 7,
        campaign: this.campaigns[1],
        analytics: {
          impressions: 9870,
          clicks: 592,
          ctr: 6.0,
          conversions: 89,
          revenue: 17800,
          lastShown: '2024-01-15T16:45:00Z'
        },
        isActive: true,
        tags: ['collaboration', 'communication', 'video', 'messaging'],
        userProfile: 'consultant-strategy',
        actionContext: 'client-communication'
      },
      {
        id: 'ad-reporting-1',
        title: 'Générateur Rapports IA',
        description: 'Création automatisée de rapports professionnels avec templates personnalisables et analyses intelligentes.',
        imageUrl: 'https://readdy.ai/api/search-image?query=AI%20report%20generator%20automated%20business%20reports%20professional%20templates%20data%20analysis%20charts%20graphs%20consultant%20documentation%20tools%20modern%20interface&width=400&height=300&seq=report1&orientation=landscape',
        ctaText: 'Créer un Rapport',
        targetUrl: 'https://ai-reports.example.com',
        category: 'reporting',
        targetAudience: ['consultant-strategy', 'business-analyst'],
        sections: ['consultants-reports', 'consultants-footer'],
        format: 'video',
        size: 'horizontal',
        priority: 8,
        campaign: this.campaigns[2],
        analytics: {
          impressions: 11200,
          clicks: 672,
          ctr: 6.0,
          conversions: 101,
          revenue: 20200,
          lastShown: '2024-01-15T11:15:00Z'
        },
        isActive: true,
        tags: ['ai', 'reporting', 'automation', 'templates'],
        userProfile: 'consultant-strategy',
        actionContext: 'report-creation'
      },
      {
        id: 'ad-training-1',
        title: 'Masterclass Stratégie Commerciale',
        description: 'Formation intensive avec experts internationaux. Certification reconnue et méthodes innovantes.',
        imageUrl: 'https://readdy.ai/api/search-image?query=Professional%20business%20strategy%20training%20masterclass%20expert%20instructors%20certification%20program%20commercial%20strategy%20consultant%20education%20modern%20classroom&width=300&height=400&seq=training1&orientation=portrait',
        ctaText: 'S\'inscrire',
        targetUrl: 'https://strategy-masterclass.example.com',
        category: 'training',
        targetAudience: ['consultant-strategy', 'business-developer'],
        sections: ['consultants-sidebar', 'consultants-header'],
        format: 'animated',
        size: 'vertical',
        priority: 9,
        campaign: this.campaigns[2],
        analytics: {
          impressions: 8950,
          clicks: 537,
          ctr: 6.0,
          conversions: 76,
          revenue: 38000,
          lastShown: '2024-01-15T09:30:00Z'
        },
        isActive: true,
        tags: ['training', 'certification', 'strategy', 'expert'],
        userProfile: 'consultant-strategy',
        actionContext: 'skill-development'
      },
      {
        id: 'ad-database-1',
        title: 'Base de Données Marché Mondiale',
        description: 'Accès à 50M+ d\'entreprises avec analyses géographiques et sectorielles détaillées.',
        imageUrl: 'https://readdy.ai/api/search-image?query=Global%20market%20database%20world%20map%20business%20data%20geographic%20analysis%20sector%20insights%20enterprise%20information%20consultant%20research%20tools&width=400&height=200&seq=database1&orientation=landscape',
        ctaText: 'Accès Premium',
        targetUrl: 'https://global-market-db.example.com',
        category: 'data',
        targetAudience: ['consultant-strategy', 'market-researcher'],
        sections: ['consultants-analytics', 'consultants-data'],
        format: 'static',
        size: 'horizontal',
        priority: 7,
        campaign: this.campaigns[0],
        analytics: {
          impressions: 7650,
          clicks: 459,
          ctr: 6.0,
          conversions: 65,
          revenue: 32500,
          lastShown: '2024-01-15T13:20:00Z'
        },
        isActive: true,
        tags: ['database', 'market-data', 'global', 'research'],
        userProfile: 'consultant-strategy',
        actionContext: 'market-research'
      },
      {
        id: 'ad-popup-special-1',
        title: 'Offre Spéciale - Suite Complète',
        description: 'Économisez 40% sur notre suite complète d\'outils pour consultants. Offre limitée jusqu\'au 31 mars.',
        imageUrl: 'https://readdy.ai/api/search-image?query=Special%20offer%20discount%20promotion%20business%20tools%20suite%20consultant%20software%20package%20deal%20limited%20time%20professional%20interface%20modern%20design&width=400&height=300&seq=popup1&orientation=landscape',
        ctaText: 'Profiter de l\'Offre',
        targetUrl: 'https://special-offer.example.com',
        category: 'promotion',
        targetAudience: ['consultant-strategy'],
        sections: ['consultants-popup'],
        format: 'popup',
        size: 'square',
        priority: 10,
        analytics: {
          impressions: 3200,
          clicks: 256,
          ctr: 8.0,
          conversions: 45,
          revenue: 22500,
          lastShown: '2024-01-15T15:10:00Z'
        },
        isActive: true,
        tags: ['promotion', 'discount', 'suite', 'limited-time'],
        userProfile: 'consultant-strategy',
        actionContext: 'special-offer'
      },
      {
        id: 'ad-bi-platform-1',
        title: 'Plateforme BI Consultants',
        description: 'Business Intelligence spécialisée pour consultants avec connecteurs 200+ sources de données.',
        imageUrl: 'https://readdy.ai/api/search-image?query=Business%20intelligence%20platform%20consultant%20dashboard%20data%20connectors%20analytics%20visualization%20professional%20interface%20modern%20design%20BI%20tools&width=300&height=400&seq=bi1&orientation=portrait',
        ctaText: 'Démo Personnalisée',
        targetUrl: 'https://bi-consultants.example.com',
        category: 'business-intelligence',
        targetAudience: ['consultant-strategy', 'data-analyst'],
        sections: ['consultants-sidebar', 'consultants-data'],
        format: 'animated',
        size: 'vertical',
        priority: 8,
        campaign: this.campaigns[0],
        analytics: {
          impressions: 6780,
          clicks: 407,
          ctr: 6.0,
          conversions: 58,
          revenue: 29000,
          lastShown: '2024-01-15T12:40:00Z'
        },
        isActive: true,
        tags: ['bi', 'business-intelligence', 'data-connectors', 'analytics'],
        userProfile: 'consultant-strategy',
        actionContext: 'data-analysis'
      },

      // Publicités pour formateurs - Section Statistiques
      {
        id: 'trainer-analytics-1',
        title: 'Analytics Pédagogiques Avancés',
        description: 'Analysez en profondeur les performances de vos apprenants avec des tableaux de bord interactifs et des rapports détaillés.',
        imageUrl: 'https://readdy.ai/api/search-image?query=advanced%20learning%20analytics%20dashboard%20with%20charts%20graphs%20student%20performance%20metrics%20educational%20data%20visualization%20modern%20interface&width=400&height=200&seq=trainer-analytics-1&orientation=landscape',
        link: 'https://learning-analytics.com/trainers',
        campaignType: 'premium',
        sector: ['education', 'analytics'],
        sections: ['trainers-statistics'],
        isActive: true,
        tags: ['analytics', 'learning-management', 'performance-tracking', 'education'],
        userProfile: 'trainer',
        actionContext: 'statistics-analysis',
        ctr: 6.2,
        impressions: 1850,
        clicks: 115,
        conversions: 23,
        revenue: 2875
      },
      {
        id: 'trainer-assessment-1',
        title: 'Outils d\'Évaluation Intelligents',
        description: 'Créez des quiz adaptatifs et des évaluations personnalisées avec correction automatique et feedback instantané.',
        imageUrl: 'https://readdy.ai/api/search-image?query=intelligent%20assessment%20tools%20quiz%20creation%20adaptive%20learning%20evaluation%20system%20educational%20technology%20modern%20clean%20interface&width=400&height=200&seq=trainer-assessment-1&orientation=landscape',
        link: 'https://smart-assessment.com/features',
        campaignType: 'standard',
        sector: ['education', 'assessment'],
        sections: ['trainers-statistics'],
        isActive: true,
        tags: ['assessment', 'quiz', 'evaluation', 'adaptive-learning'],
        userProfile: 'trainer',
        actionContext: 'learner-evaluation',
        ctr: 5.8,
        impressions: 1420,
        clicks: 82,
        conversions: 16,
        revenue: 1960
      },
      {
        id: 'trainer-reporting-1',
        title: 'Générateur de Rapports Pédagogiques',
        description: 'Créez automatiquement des rapports professionnels sur les progrès des apprenants avec graphiques et analyses.',
        imageUrl: 'https://readdy.ai/api/search-image?query=educational%20reporting%20tool%20automatic%20report%20generation%20student%20progress%20charts%20professional%20pedagogical%20reports%20modern%20interface&width=400&height=200&seq=trainer-reporting-1&orientation=landscape',
        link: 'https://edu-reports.com/generators',
        campaignType: 'premium',
        sector: ['education', 'reporting'],
        sections: ['trainers-statistics', 'trainers-reports'],
        isActive: true,
        tags: ['reporting', 'automation', 'progress-tracking', 'documentation'],
        userProfile: 'trainer',
        actionContext: 'report-generation',
        ctr: 7.1,
        impressions: 2100,
        clicks: 149,
        conversions: 31,
        revenue: 3720
      },

      // Publicités pour formateurs - Section Collaboration
      {
        id: 'trainer-collaboration-1',
        title: 'Plateforme Collaboration Entreprise',
        description: 'Facilitez vos échanges avec les entreprises : messagerie intégrée, planification automatique et suivi des projets.',
        imageUrl: 'https://readdy.ai/api/search-image?query=business%20collaboration%20platform%20messaging%20scheduling%20project%20management%20enterprise%20training%20coordination%20modern%20professional%20interface&width=400&height=200&seq=trainer-collaboration-1&orientation=landscape',
        link: 'https://bizcollab.com/trainers',
        campaignType: 'premium',
        sector: ['collaboration', 'business'],
        sections: ['trainers-collaboration'],
        isActive: true,
        tags: ['collaboration', 'messaging', 'scheduling', 'project-management'],
        userProfile: 'trainer',
        actionContext: 'business-collaboration',
        ctr: 6.8,
        impressions: 1750,
        clicks: 119,
        conversions: 24,
        revenue: 2880
      },
      {
        id: 'trainer-scheduling-1',
        title: 'Calendrier Intelligent Formation',
        description: 'Optimisez vos plannings de formation avec synchronisation automatique, rappels et gestion des disponibilités.',
        imageUrl: 'https://readdy.ai/api/search-image?query=intelligent%20training%20calendar%20scheduling%20system%20automatic%20synchronization%20availability%20management%20professional%20planning%20tool%20modern%20interface&width=400&height=200&seq=trainer-scheduling-1&orientation=landscape',
        link: 'https://smart-calendar.com/training',
        campaignType: 'standard',
        sector: ['scheduling', 'productivity'],
        sections: ['trainers-collaboration'],
        isActive: true,
        tags: ['scheduling', 'calendar', 'automation', 'time-management'],
        userProfile: 'trainer',
        actionContext: 'session-planning',
        ctr: 5.5,
        impressions: 1320,
        clicks: 73,
        conversions: 15,
        revenue: 1800
      },
      {
        id: 'trainer-communication-1',
        title: 'Suite Communication Professionnelle',
        description: 'Communiquez efficacement avec vos clients : visioconférence HD, partage d\'écran et enregistrement des sessions.',
        imageUrl: 'https://readdy.ai/api/search-image?query=professional%20communication%20suite%20video%20conferencing%20screen%20sharing%20session%20recording%20business%20meetings%20modern%20technology%20interface&width=400&height=200&seq=trainer-communication-1&orientation=landscape',
        link: 'https://procomm.com/trainers',
        campaignType: 'premium',
        sector: ['communication', 'technology'],
        sections: ['trainers-collaboration'],
        isActive: true,
        tags: ['communication', 'video-conferencing', 'screen-sharing', 'recording'],
        userProfile: 'trainer',
        actionContext: 'client-communication',
        ctr: 6.4,
        impressions: 1680,
        clicks: 108,
        conversions: 22,
        revenue: 2640
      },

      // Publicités pour formateurs - Section Rapports
      {
        id: 'trainer-reports-advanced-1',
        title: 'Rapports Avancés avec IA',
        description: 'Générez des rapports intelligents avec analyses prédictives, recommandations personnalisées et insights automatiques.',
        imageUrl: 'https://readdy.ai/api/search-image?query=advanced%20AI%20reporting%20system%20predictive%20analytics%20personalized%20recommendations%20automatic%20insights%20educational%20data%20intelligence%20modern%20interface&width=400&height=200&seq=trainer-reports-advanced-1&orientation=landscape',
        link: 'https://ai-reports.com/education',
        campaignType: 'premium',
        sector: ['ai', 'reporting'],
        sections: ['trainers-reports'],
        isActive: true,
        tags: ['ai', 'predictive-analytics', 'automation', 'insights'],
        userProfile: 'trainer',
        actionContext: 'advanced-reporting',
        ctr: 7.8,
        impressions: 2250,
        clicks: 176,
        conversions: 38,
        revenue: 4560
      },
      {
        id: 'trainer-export-tools-1',
        title: 'Outils d\'Export Professionnels',
        description: 'Exportez vos données dans tous les formats : PDF interactifs, Excel avec macros, PowerPoint automatisé.',
        imageUrl: 'https://readdy.ai/api/search-image?query=professional%20export%20tools%20PDF%20Excel%20PowerPoint%20data%20conversion%20interactive%20documents%20automated%20formatting%20business%20reports%20modern%20interface&width=400&height=200&seq=trainer-export-tools-1&orientation=landscape',
        link: 'https://export-pro.com/education',
        campaignType: 'standard',
        sector: ['productivity', 'tools'],
        sections: ['trainers-reports'],
        isActive: true,
        tags: ['export', 'pdf', 'excel', 'powerpoint', 'automation'],
        userProfile: 'trainer',
        actionContext: 'data-export',
        ctr: 5.9,
        impressions: 1580,
        clicks: 93,
        conversions: 19,
        revenue: 2280
      },
      {
        id: 'trainer-consulting-1',
        title: 'Conseil en Pédagogie Digitale',
        description: 'Bénéficiez de l\'expertise de consultants spécialisés pour optimiser vos méthodes et outils pédagogiques.',
        imageUrl: 'https://readdy.ai/api/search-image?query=digital%20pedagogy%20consulting%20educational%20expertise%20optimization%20teaching%20methods%20professional%20consultation%20modern%20learning%20technology&width=400&height=200&seq=trainer-consulting-1&orientation=landscape',
        link: 'https://pedagogy-consulting.com/services',
        campaignType: 'premium',
        sector: ['consulting', 'education'],
        sections: ['trainers-reports'],
        isActive: true,
        tags: ['consulting', 'pedagogy', 'optimization', 'expertise'],
        userProfile: 'trainer',
        actionContext: 'professional-development',
        ctr: 6.6,
        impressions: 1920,
        clicks: 127,
        conversions: 26,
        revenue: 3120
      },

      // Publicité popup spéciale pour formateurs
      {
        id: 'trainer-special-offer-1',
        title: 'Offre Spéciale Suite Formateur -50%',
        description: 'Accédez à tous nos outils premium : analytics, collaboration, rapports et support prioritaire. Offre limitée !',
        imageUrl: 'https://readdy.ai/api/search-image?query=special%20offer%20trainer%20suite%20premium%20tools%20analytics%20collaboration%20reports%20priority%20support%20limited%20time%20discount%20modern%20professional&width=400&height=300&seq=trainer-special-offer-1&orientation=landscape',
        link: 'https://trainer-suite.com/special-offer',
        campaignType: 'special',
        sector: ['education', 'tools'],
        sections: ['trainers-dashboard', 'trainers-modules', 'trainers-statistics', 'trainers-collaboration', 'trainers-reports'],
        isActive: true,
        tags: ['special-offer', 'discount', 'premium', 'suite', 'limited-time'],
        userProfile: 'trainer',
        actionContext: 'special-promotion',
        ctr: 12.5,
        impressions: 3200,
        clicks: 400,
        conversions: 85,
        revenue: 10200
      },
      
      // Nouvelles publicités pour les clients finaux
      {
        id: 'client-consulting-services',
        title: 'Services de Conseil Personnalisés',
        description: 'Bénéficiez de l\'expertise de nos consultants pour optimiser votre stratégie business',
        imageUrl: 'https://readdy.ai/api/search-image?query=professional%20business%20consulting%20services%2C%20expert%20advisors%20meeting%20with%20clients%2C%20modern%20office%20environment&width=400&height=200&seq=20&orientation=landscape',
        ctaText: 'Consulter un Expert',
        targetUrl: '#',
        category: 'consulting',
        userType: 'client',
        placement: ['header', 'middle'],
        metrics: {
          impressions: 8420,
          clicks: 573,
          ctr: 6.8,
          revenue: 4200
        }
      },
      {
        id: 'client-premium-support',
        title: 'Support Premium 24/7',
        description: 'Assistance prioritaire avec des experts dédiés pour tous vos besoins techniques',
        imageUrl: 'https://readdy.ai/api/search-image?query=premium%20customer%20support%20team%2C%2024%2F7%20technical%20assistance%2C%20professional%20help%20desk%20service&width=400&height=200&seq=21&orientation=landscape',
        ctaText: 'Découvrir Premium',
        targetUrl: '#',
        category: 'support',
        userType: 'client',
        placement: ['middle', 'footer'],
        metrics: {
          impressions: 6890,
          clicks: 379,
          ctr: 5.5,
          revenue: 2850
        }
      },
      {
        id: 'client-enterprise-solutions',
        title: 'Solutions Entreprise Avancées',
        description: 'Découvrez nos solutions sur-mesure pour les grandes entreprises et PME',
        imageUrl: 'https://readdy.ai/api/search-image?query=enterprise%20business%20solutions%2C%20advanced%20corporate%20software%2C%20professional%20technology%20platform&width=400&height=200&seq=22&orientation=landscape',
        ctaText: 'Voir les Solutions',
        targetUrl: '#',
        category: 'enterprise',
        userType: 'client',
        placement: ['header', 'middle'],
        metrics: {
          impressions: 9240,
          clicks: 647,
          ctr: 7.0,
          revenue: 5800
        }
      },
      {
        id: 'client-training-programs',
        title: 'Programmes de Formation Certifiants',
        description: 'Formez vos équipes avec nos programmes certifiants reconnus par l\'industrie',
        imageUrl: 'https://readdy.ai/api/search-image?query=professional%20training%20programs%2C%20certified%20business%20education%2C%20corporate%20learning%20solutions&width=400&height=200&seq=23&orientation=landscape',
        ctaText: 'Explorer les Formations',
        targetUrl: '#',
        category: 'training',
        userType: 'client',
        placement: ['middle', 'footer'],
        metrics: {
          impressions: 7560,
          clicks: 454,
          ctr: 6.0,
          revenue: 3200
        }
      },
      {
        id: 'client-analytics-tools',
        title: 'Outils d\'Analyse Avancés',
        description: 'Transformez vos données en insights actionnables avec nos outils BI',
        imageUrl: 'https://readdy.ai/api/search-image?query=advanced%20business%20analytics%20tools%2C%20data%20visualization%20dashboard%2C%20business%20intelligence%20software&width=400&height=200&seq=24&orientation=landscape',
        ctaText: 'Tester Gratuitement',
        targetUrl: '#',
        category: 'analytics',
        userType: 'client',
        placement: ['header', 'middle'],
        metrics: {
          impressions: 8100,
          clicks: 567,
          ctr: 7.0,
          revenue: 4500
        }
      },
      {
        id: 'client-automation-suite',
        title: 'Suite d\'Automatisation Complète',
        description: 'Automatisez vos processus métier et gagnez en efficacité avec notre suite intégrée',
        imageUrl: 'https://readdy.ai/api/search-image?query=business%20process%20automation%20suite%2C%20workflow%20management%20software%2C%20efficiency%20optimization%20tools&width=400&height=200&seq=25&orientation=landscape',
        ctaText: 'Automatiser Maintenant',
        targetUrl: '#',
        category: 'automation',
        userType: 'client',
        placement: ['middle', 'footer'],
        metrics: {
          impressions: 7890,
          clicks: 505,
          ctr: 6.4,
          revenue: 3900
        }
      },
      {
        id: 'client-security-solutions',
        title: 'Solutions de Sécurité Avancées',
        description: 'Protégez vos données et systèmes avec nos solutions de cybersécurité',
        imageUrl: 'https://readdy.ai/api/search-image?query=cybersecurity%20solutions%2C%20data%20protection%20services%2C%20advanced%20security%20systems%20for%20business&width=400&height=200&seq=26&orientation=landscape',
        ctaText: 'Sécuriser Maintenant',
        targetUrl: '#',
        category: 'security',
        userType: 'client',
        placement: ['header', 'middle'],
        metrics: {
          impressions: 9560,
          clicks: 669,
          ctr: 7.0,
          revenue: 6200
        }
      },
      {
        id: 'client-integration-services',
        title: 'Services d\'Intégration API',
        description: 'Connectez tous vos outils avec nos services d\'intégration personnalisés',
        imageUrl: 'https://readdy.ai/api/search-image?query=API%20integration%20services%2C%20software%20connectivity%20solutions%2C%20system%20integration%20platform&width=400&height=200&seq=27&orientation=landscape',
        ctaText: 'Intégrer Facilement',
        targetUrl: '#',
        category: 'integration',
        userType: 'client',
        placement: ['middle', 'footer'],
        metrics: {
          impressions: 6420,
          clicks: 353,
          ctr: 5.5,
          revenue: 2800
        }
      },
      {
        id: 'client-mobile-solutions',
        title: 'Solutions Mobiles Natives',
        description: 'Développez votre présence mobile avec nos applications natives performantes',
        imageUrl: 'https://readdy.ai/api/search-image?query=mobile%20app%20development%20solutions%2C%20native%20mobile%20applications%2C%20smartphone%20business%20apps&width=400&height=200&seq=28&orientation=landscape',
        ctaText: 'Créer une App',
        targetUrl: '#',
        category: 'mobile',
        userType: 'client',
        placement: ['header', 'middle'],
        metrics: {
          impressions: 8750,
          clicks: 595,
          ctr: 6.8,
          revenue: 4800
        }
      },
      {
        id: 'client-special-offer',
        title: 'Offre Spéciale Client -40%',
        description: 'Profitez de 40% de réduction sur tous nos services pendant ce mois !',
        imageUrl: 'https://readdy.ai/api/search-image?query=special%20discount%20offer%20banner%2C%2040%20percent%20off%20promotion%2C%20limited%20time%20business%20deal&width=400&height=200&seq=29&orientation=landscape',
        ctaText: 'Profiter de l\'Offre',
        targetUrl: '#',
        category: 'promotion',
        userType: 'client',
        placement: ['popup'],
        metrics: {
          impressions: 12400,
          clicks: 1736,
          ctr: 14.0,
          revenue: 12500
        }
      },

      // Nouvelles publicités pour les partenaires stratégiques
      {
        id: 'partners-api-integration',
        title: 'Solutions d\'Intégration API Avancées',
        description: 'Connectez vos services en quelques minutes avec notre plateforme d\'intégration',
        image: 'https://readdy.ai/api/search-image?query=advanced%20API%20integration%20platform%2C%20modern%20developer%20tools%2C%20professional%20software%20architecture%2C%20clean%20technical%20interface%20with%20code%20elements&width=300&height=200&seq=101&orientation=landscape',
        link: '#',
        category: 'integration',
        targetAudience: 'partners',
        placement: ['header', 'services-sidebar'],
        ctr: 7.8,
        revenue: 6200
      },
      {
        id: 'partners-b2b-marketing',
        title: 'Marketing B2B Intelligent',
        description: 'Optimisez vos campagnes avec notre IA de ciblage avancé',
        image: 'https://readdy.ai/api/search-image?query=B2B%20marketing%20automation%20platform%2C%20professional%20business%20intelligence%20dashboard%2C%20modern%20analytics%20interface%20with%20charts%20and%20targeting%20tools&width=300&height=200&seq=102&orientation=landscape',
        link: '#',
        category: 'marketing',
        targetAudience: 'partners',
        placement: ['promotions-sidebar', 'footer'],
        ctr: 6.9,
        revenue: 4800
      },
      {
        id: 'partners-data-analytics',
        title: 'Analytics Partenaires Premium',
        description: 'Analysez vos performances et découvrez de nouvelles opportunités',
        image: 'https://readdy.ai/api/search-image?query=premium%20business%20analytics%20platform%2C%20advanced%20data%20visualization%20tools%2C%20professional%20dashboard%20with%20partnership%20metrics%20and%20insights&width=300&height=200&seq=103&orientation=landscape',
        link: '#',
        category: 'analytics',
        targetAudience: 'partners',
        placement: ['data-sidebar', 'middle'],
        ctr: 8.4,
        revenue: 7100
      },
      {
        id: 'partners-collaboration-tools',
        title: 'Suite Collaboration Entreprise',
        description: 'Outils de gestion de partenariats et communication intégrée',
        image: 'https://readdy.ai/api/search-image?query=enterprise%20collaboration%20platform%2C%20professional%20team%20management%20tools%2C%20modern%20business%20communication%20interface%20with%20partnership%20features&width=300&height=200&seq=104&orientation=landscape',
        link: '#',
        category: 'collaboration',
        targetAudience: 'partners',
        placement: ['dashboard-sidebar', 'services-sidebar'],
        ctr: 7.2,
        revenue: 5400
      },
      {
        id: 'partners-reporting-advanced',
        title: 'Rapports Automatisés avec IA',
        description: 'Générez des rapports intelligents et des insights prédictifs',
        image: 'https://readdy.ai/api/search-image?query=AI-powered%20reporting%20system%2C%20automated%20business%20intelligence%20platform%2C%20professional%20report%20generation%20interface%20with%20predictive%20analytics&width=300&height=200&seq=105&orientation=landscape',
        link: '#',
        category: 'reporting',
        targetAudience: 'partners',
        placement: ['reports-sidebar', 'footer'],
        ctr: 9.1,
        revenue: 8300
      },
      {
        id: 'partners-security-compliance',
        title: 'Sécurité et Conformité Avancées',
        description: 'Protégez vos intégrations avec nos solutions de sécurité enterprise',
        image: 'https://readdy.ai/api/search-image?query=enterprise%20security%20platform%2C%20advanced%20cybersecurity%20dashboard%2C%20professional%20compliance%20management%20interface%20with%20security%20shields&width=300&height=200&seq=106&orientation=landscape',
        link: '#',
        category: 'security',
        targetAudience: 'partners',
        placement: ['services-sidebar', 'data-sidebar'],
        ctr: 6.7,
        revenue: 9200
      },
      {
        id: 'partners-marketplace-integration',
        title: 'Intégration Marketplace Globale',
        description: 'Connectez-vous aux principales plateformes e-commerce mondiales',
        image: 'https://readdy.ai/api/search-image?query=global%20marketplace%20integration%20platform%2C%20e-commerce%20connectivity%20hub%2C%20professional%20multi-platform%20interface%20with%20worldwide%20reach&width=300&height=200&seq=107&orientation=landscape',
        link: '#',
        category: 'marketplace',
        targetAudience: 'partners',
        placement: ['header', 'promotions-sidebar'],
        ctr: 8.0,
        revenue: 6800
      },
      {
        id: 'partners-white-label',
        title: 'Solutions White Label Premium',
        description: 'Personnalisez notre plateforme avec votre marque',
        image: 'https://readdy.ai/api/search-image?query=white%20label%20software%20platform%2C%20customizable%20business%20solution%20interface%2C%20professional%20branding%20tools%20with%20modern%20design%20elements&width=300&height=200&seq=108&orientation=landscape',
        link: '#',
        category: 'whitelabel',
        targetAudience: 'partners',
        placement: ['dashboard-sidebar', 'middle'],
        ctr: 7.6,
        revenue: 11500
      },
      {
        id: 'partners-consulting-services',
        title: 'Conseil Stratégique Partenariats',
        description: 'Expertise dédiée pour optimiser vos collaborations',
        image: 'https://readdy.ai/api/search-image?query=strategic%20business%20consulting%2C%20professional%20partnership%20advisory%20services%2C%20modern%20corporate%20meeting%20room%20with%20collaboration%20tools&width=300&height=200&seq=109&orientation=landscape',
        link: '#',
        category: 'consulting',
        targetAudience: 'partners',
        placement: ['footer', 'reports-sidebar'],
        ctr: 6.3,
        revenue: 12800
      },
      {
        id: 'partners-special-offer',
        title: 'Offre Partenaire Exclusive -60%',
        description: 'Accès privilégié à tous nos outils d\'intégration premium',
        image: 'https://readdy.ai/api/search-image?query=exclusive%20business%20partnership%20offer%2C%20premium%20discount%20promotion%2C%20professional%20special%20deal%20interface%20with%20partnership%20benefits&width=300&height=200&seq=110&orientation=landscape',
        link: '#',
        category: 'promotion',
        targetAudience: 'partners',
        placement: ['popup'],
        ctr: 16.8,
        revenue: 24500
      },

      // Publicités Analytics et Reporting
      {
        id: 'ad-analytics-001',
        title: 'Analytics Commerciales Avancées',
        description: 'Tableaux de bord temps réel, KPI personnalisés, prévisions IA. Prenez les bonnes décisions basées sur vos données.',
        imageUrl: 'https://readdy.ai/api/search-image?query=advanced%20sales%20analytics%20dashboard%20real-time%20KPI%20metrics%20business%20intelligence%20data%20visualization%20charts%20graphs%20professional%20interface&width=400&height=200&seq=analytics001&orientation=landscape',
        ctaText: 'Voir la Démo',
        targetUrl: 'https://sales-analytics.example.com',
        category: 'analytics',
        targetAudience: ['manager', 'commercial'],
        sections: ['analytics', 'dashboard', 'reports'],
        format: 'static',
        size: 'horizontal',
        priority: 9,
        campaign: this.campaigns[0],
        analytics: {
          impressions: 16800,
          clicks: 1176,
          ctr: 7.0,
          conversions: 168,
          revenue: 33600,
          lastShown: new Date().toISOString()
        },
        isActive: true,
        tags: ['analytics', 'reporting', 'bi', 'kpi'],
        userProfile: 'manager',
        actionContext: 'data-analysis',
        sector: ['Analytics', 'Business Intelligence', 'Sales']
      },

      // Publicités Formation et Développement
      {
        id: 'ad-training-001',
        title: 'Formation Techniques de Vente Modernes',
        description: 'Masterclass avec experts internationaux. Certification reconnue, méthodes éprouvées, ROI garanti.',
        imageUrl: 'https://readdy.ai/api/search-image?query=modern%20sales%20training%20masterclass%20professional%20education%20certification%20program%20expert%20instructors%20business%20development%20course&width=400&height=200&seq=training001&orientation=landscape',
        ctaText: 'S\'inscrire Maintenant',
        targetUrl: 'https://sales-training.example.com',
        category: 'training',
        targetAudience: ['commercial', 'manager'],
        sections: ['dashboard', 'activities'],
        format: 'video',
        size: 'horizontal',
        priority: 8,
        campaign: this.campaigns[2],
        analytics: {
          impressions: 12400,
          clicks: 868,
          ctr: 7.0,
          conversions: 124,
          revenue: 62000,
          lastShown: new Date().toISOString()
        },
        isActive: true,
        tags: ['training', 'certification', 'skills', 'development'],
        userProfile: 'commercial',
        actionContext: 'skill-development',
        sector: ['Education', 'Sales', 'Professional Development']
      },

      // Publicités Outils Collaboration
      {
        id: 'ad-collab-001',
        title: 'Plateforme Collaboration Équipe',
        description: 'Messagerie intégrée, partage de documents, visioconférence. Toute votre équipe connectée en temps réel.',
        imageUrl: 'https://readdy.ai/api/search-image?query=team%20collaboration%20platform%20messaging%20video%20conferencing%20document%20sharing%20unified%20communication%20business%20tools%20modern%20interface&width=400&height=200&seq=collab001&orientation=landscape',
        ctaText: 'Essayer Gratuitement',
        targetUrl: 'https://team-collab.example.com',
        category: 'collaboration',
        targetAudience: ['manager', 'commercial'],
        sections: ['dashboard', 'activities'],
        format: 'static',
        size: 'horizontal',
        priority: 7,
        campaign: this.campaigns[1],
        analytics: {
          impressions: 14600,
          clicks: 1022,
          ctr: 7.0,
          conversions: 146,
          revenue: 29200,
          lastShown: new Date().toISOString()
        },
        isActive: true,
        tags: ['collaboration', 'communication', 'teamwork', 'productivity'],
        userProfile: 'manager',
        actionContext: 'team-collaboration',
        sector: ['Collaboration', 'Communication', 'Productivity']
      },

      // Publicité Popup Spéciale
      {
        id: 'ad-popup-001',
        title: 'Offre Exclusive -50% Suite Complète',
        description: 'Profitez de 50% de réduction sur notre suite complète d\'outils commerciaux. Offre limitée jusqu\'au 31 mars !',
        imageUrl: 'https://readdy.ai/api/search-image?query=special%20offer%20discount%20promotion%2050%20percent%20off%20business%20software%20suite%20limited%20time%20deal%20exclusive%20offer%20modern%20design&width=400&height=300&seq=popup001&orientation=landscape',
        ctaText: 'Profiter de l\'Offre',
        targetUrl: 'https://special-offer.example.com',
        category: 'promotion',
        targetAudience: ['commercial', 'manager'],
        sections: ['popup'],
        format: 'popup',
        size: 'square',
        priority: 10,
        analytics: {
          impressions: 8500,
          clicks: 1020,
          ctr: 12.0,
          conversions: 255,
          revenue: 127500,
          lastShown: new Date().toISOString()
        },
        isActive: true,
        tags: ['promotion', 'discount', 'limited-time', 'special-offer'],
        userProfile: 'commercial',
        actionContext: 'special-offer',
        sector: ['Sales', 'Promotion']
      },

      // Publicités Prospection
      {
        id: 'ad-prospect-001',
        title: 'Base de Données B2B Premium',
        description: 'Accès à 20M+ entreprises qualifiées. Données enrichies, contacts vérifiés, exports illimités.',
        imageUrl: 'https://readdy.ai/api/search-image?query=B2B%20database%20platform%20business%20contacts%20lead%20generation%20data%20enrichment%20professional%20prospecting%20tools%20modern%20interface&width=400&height=200&seq=prospect001&orientation=landscape',
        ctaText: 'Accès Premium',
        targetUrl: 'https://b2b-database.example.com',
        category: 'prospection',
        targetAudience: ['commercial'],
        sections: ['leads', 'pipeline'],
        format: 'static',
        size: 'horizontal',
        priority: 8,
        campaign: this.campaigns[0],
        analytics: {
          impressions: 13200,
          clicks: 924,
          ctr: 7.0,
          conversions: 132,
          revenue: 66000,
          lastShown: new Date().toISOString()
        },
        isActive: true,
        tags: ['prospection', 'database', 'b2b', 'lead-generation'],
        userProfile: 'commercial',
        actionContext: 'prospecting',
        sector: ['Sales', 'B2B', 'Lead Generation']
      },

      // Publicités Gestion Commissions
      {
        id: 'ad-commission-001',
        title: 'Calcul Automatique des Commissions',
        description: 'Fini les erreurs de calcul ! Automatisez vos commissions avec règles personnalisables et transparence totale.',
        imageUrl: 'https://readdy.ai/api/search-image?query=automated%20commission%20calculation%20system%20sales%20compensation%20management%20transparent%20reporting%20financial%20tools%20professional%20interface&width=400&height=200&seq=commission001&orientation=landscape',
        ctaText: 'Calculer Maintenant',
        targetUrl: 'https://commission-calc.example.com',
        category: 'finance',
        targetAudience: ['commercial', 'manager'],
        sections: ['commissions', 'dashboard'],
        format: 'animated',
        size: 'horizontal',
        priority: 7,
        campaign: this.campaigns[1],
        analytics: {
          impressions: 11800,
          clicks: 826,
          ctr: 7.0,
          conversions: 118,
          revenue: 23600,
          lastShown: new Date().toISOString()
        },
        isActive: true,
        tags: ['commission', 'finance', 'automation', 'compensation'],
        userProfile: 'commercial',
        actionContext: 'commission-tracking',
        sector: ['Finance', 'Sales', 'HR']
      }
    ];
  }

  // Méthodes de gestion des publicités
  getAdsByTargeting(targeting: AdTargeting): Advertisement[] {
    if (!targeting) {
      return [];
    }

    return this.advertisements.filter(ad => {
      if (!ad.isActive) return false;

      if (targeting.userProfile && ad.userProfile && ad.userProfile !== targeting.userProfile) {
        return false;
      }

      if (targeting.section && ad.sections && !ad.sections.includes(targeting.section)) {
        return false;
      }

      if (targeting.actionContext && ad.actionContext && ad.actionContext !== targeting.actionContext) {
        return false;
      }

      if (targeting.targetCategories && targeting.targetCategories.length > 0) {
        const hasMatchingCategory = targeting.targetCategories.some(category => 
          ad.tags && ad.tags.includes(category)
        );
        if (!hasMatchingCategory) return false;
      }

      if (targeting.sector && ad.sector && ad.sector.length > 0) {
        const hasMatchingSector = ad.sector.some(adSector => 
          adSector.toLowerCase().includes(targeting.sector!.toLowerCase())
        );
        if (!hasMatchingSector) return false;
      }

      return true;
    });
  }

  updateAdAnalytics(adId: string, type: 'impression' | 'click' | 'conversion', value: number = 1): void {
    const ad = this.advertisements.find(a => a.id === adId);
    if (ad) {
      switch (type) {
        case 'impression':
          ad.analytics.impressions += value;
          break;
        case 'click':
          ad.analytics.clicks += value;
          ad.analytics.ctr = (ad.analytics.clicks / ad.analytics.impressions) * 100;
          break;
        case 'conversion':
          ad.analytics.conversions += value;
          break;
      }
      ad.analytics.lastShown = new Date().toISOString();
    }
  }

  getAdAnalytics(adId: string): AdAnalytics | null {
    const ad = this.advertisements.find(a => a.id === adId);
    return ad ? ad.analytics : null;
  }

  getAllCampaigns(): AdCampaign[] {
    return this.campaigns;
  }

  getCampaignAnalytics(campaignId: string): any {
    const campaignAds = this.advertisements.filter(ad => ad.campaign?.id === campaignId);
    const totalImpressions = campaignAds.reduce((sum, ad) => sum + ad.analytics.impressions, 0);
    const totalClicks = campaignAds.reduce((sum, ad) => sum + ad.analytics.clicks, 0);
    const totalConversions = campaignAds.reduce((sum, ad) => sum + ad.analytics.conversions, 0);
    const totalRevenue = campaignAds.reduce((sum, ad) => sum + ad.analytics.revenue, 0);

    return {
      impressions: totalImpressions,
      clicks: totalClicks,
      conversions: totalConversions,
      revenue: totalRevenue,
      ctr: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
      conversionRate: totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
      adCount: campaignAds.length
    };
  }
}

// Système de rotation des publicités
class AdRotationSystem {
  private static instance: AdRotationSystem;
  private rotationHistory: Map<string, string[]> = new Map();
  private lastShownAds: Map<string, Map<string, number>> = new Map();

  private constructor() {}

  static getInstance(): AdRotationSystem {
    if (!AdRotationSystem.instance) {
      AdRotationSystem.instance = new AdRotationSystem();
    }
    return AdRotationSystem.instance;
  }

  selectAdsForRotation(ads: Advertisement[], section: string, count: number = 1): Advertisement[] {
    if (ads.length === 0) return [];

    const sectionHistory = this.rotationHistory.get(section) || [];
    const sectionLastShown = this.lastShownAds.get(section) || new Map();

    const sortedAds = ads.sort((a, b) => {
      const aLastShown = sectionLastShown.get(a.id) || 0;
      const bLastShown = sectionLastShown.get(b.id) || 0;
      const aRecentlyShown = sectionHistory.slice(-5).includes(a.id);
      const bRecentlyShown = sectionHistory.slice(-5).includes(b.id);

      if (aRecentlyShown && !bRecentlyShown) return 1;
      if (!aRecentlyShown && bRecentlyShown) return -1;

      if (a.priority !== b.priority) return b.priority - a.priority;

      return aLastShown - bLastShown;
    });

    const selectedAds = sortedAds.slice(0, count);

    selectedAds.forEach(ad => {
      sectionHistory.push(ad.id);
      sectionLastShown.set(ad.id, Date.now());
    });

    if (sectionHistory.length > 20) {
      sectionHistory.splice(0, sectionHistory.length - 20);
    }

    this.rotationHistory.set(section, sectionHistory);
    this.lastShownAds.set(section, sectionLastShown);

    return selectedAds;
  }

  getRotationStats(section: string): any {
    const history = this.rotationHistory.get(section) || [];
    const lastShown = this.lastShownAds.get(section) || new Map();

    return {
      totalRotations: history.length,
      uniqueAds: new Set(history).size,
      recentAds: history.slice(-10),
      lastShownCount: lastShown.size
    };
  }
}

// Système de ciblage avancé
class AdTargetingSystem {
  private static instance: AdTargetingSystem;
  private userBehavior: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): AdTargetingSystem {
    if (!AdTargetingSystem.instance) {
      AdTargetingSystem.instance = new AdTargetingSystem();
    }
    return AdTargetingSystem.instance;
  }

  trackUserAction(userId: string, action: string, context: any): void {
    const userActions = this.userBehavior.get(userId) || {
      actions: [],
      preferences: {},
      lastActivity: null
    };

    userActions.actions.push({
      action,
      context,
      timestamp: Date.now()
    });

    if (userActions.actions.length > 100) {
      userActions.actions = userActions.actions.slice(-100);
    }

    userActions.lastActivity = Date.now();
    this.userBehavior.set(userId, userActions);
  }

  getPersonalizedAds(userId: string, section: string, ads: Advertisement[]): Advertisement[] {
    const userActions = this.userBehavior.get(userId);
    if (!userActions) return ads;

    const recentActions = userActions.actions.slice(-20);
    const actionCounts = new Map<string, number>();

    recentActions.forEach((action: any) => {
      const count = actionCounts.get(action.action) || 0;
      actionCounts.set(action.action, count + 1);
    });

    const scoredAds = ads.map(ad => {
      let score = ad.priority;

      if (ad.actionContext && actionCounts.has(ad.actionContext)) {
        score += actionCounts.get(ad.actionContext)! * 2;
      }

      ad.tags.forEach(tag => {
        if (actionCounts.has(tag)) {
          score += 1;
        }
      });

      return { ad, score };
    });

    return scoredAds
      .sort((a, b) => b.score - a.score)
      .map(item => item.ad);
  }

  getUserBehaviorStats(userId: string): any {
    const userActions = this.userBehavior.get(userId);
    if (!userActions) return null;

    const actionTypes = new Map<string, number>();
    userActions.actions.forEach((action: any) => {
      const count = actionTypes.get(action.action) || 0;
      actionTypes.set(action.action, count + 1);
    });

    return {
      totalActions: userActions.actions.length,
      actionTypes: Object.fromEntries(actionTypes),
      lastActivity: userActions.lastActivity,
      topActions: Array.from(actionTypes.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
    };
  }
}

// Gestionnaire principal des publicités
export class AdManager {
  private database: AdDatabase;
  private rotationSystem: AdRotationSystem;
  private targetingSystem: AdTargetingSystem;
  private currentUserId: string = 'commercial-1';

  constructor() {
    this.database = AdDatabase.getInstance();
    this.rotationSystem = AdRotationSystem.getInstance();
    this.targetingSystem = AdTargetingSystem.getInstance();
  }

  getAds(targeting: AdTargeting, count: number = 1): Advertisement[] {
    if (!targeting) {
      return [];
    }

    let ads = this.database.getAdsByTargeting(targeting);

    if (targeting.userProfile && this.currentUserId) {
      ads = this.targetingSystem.getPersonalizedAds(this.currentUserId, targeting.section || '', ads);
    }

    if (targeting.section) {
      ads = this.rotationSystem.selectAdsForRotation(ads, targeting.section, count);
    } else {
      ads = ads.slice(0, count);
    }

    return ads;
  }

  recordImpression(adId: string, section: string): void {
    this.database.updateAdAnalytics(adId, 'impression');
    this.targetingSystem.trackUserAction(this.currentUserId, 'ad-impression', { adId, section });
  }

  recordClick(adId: string, section: string): void {
    this.database.updateAdAnalytics(adId, 'click');
    this.targetingSystem.trackUserAction(this.currentUserId, 'ad-click', { adId, section });
  }

  recordConversion(adId: string, value: number = 1): void {
    this.database.updateAdAnalytics(adId, 'conversion', value);
    this.targetingSystem.trackUserAction(this.currentUserId, 'ad-conversion', { adId, value });
  }

  getAdStats(adId: string): AdAnalytics | null {
    return this.database.getAdAnalytics(adId);
  }

  getCampaignStats(campaignId: string): any {
    return this.database.getCampaignAnalytics(campaignId);
  }

  getAllCampaigns(): AdCampaign[] {
    return this.database.getAllCampaigns();
  }

  getRotationStats(section: string): any {
    return this.rotationSystem.getRotationStats(section);
  }

  getUserStats(): any {
    return this.targetingSystem.getUserBehaviorStats(this.currentUserId);
  }

  trackUserAction(action: string, context: any): void {
    this.targetingSystem.trackUserAction(this.currentUserId, action, context);
  }

  generateAdvertiserReport(campaignId?: string): any {
    if (campaignId) {
      const campaign = this.database.getAllCampaigns().find(c => c.id === campaignId);
      const stats = this.getCampaignStats(campaignId);
      return {
        campaign,
        stats,
        roi: stats.revenue / (campaign?.budget || 1),
        costPerClick: (campaign?.budget || 0) / stats.clicks,
        costPerConversion: (campaign?.budget || 0) / stats.conversions
      };
    } else {
      const campaigns = this.getAllCampaigns();
      const reports = campaigns.map(campaign => this.generateAdvertiserReport(campaign.id));
      return {
        totalCampaigns: campaigns.length,
        campaigns: reports,
        totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
        totalRevenue: reports.reduce((sum, r) => sum + r.stats.revenue, 0)
      };
    }
  }
}

// Hook React pour utiliser le gestionnaire de publicités
export function useAdManager() {
  const [, forceUpdate] = useState({});
  
  const adManager = new AdManager();

  const refresh = () => {
    forceUpdate({});
  };

  return {
    getAds: (targeting: AdTargeting, count?: number) => {
      if (!targeting) {
        return [];
      }
      return adManager.getAds(targeting, count);
    },
    recordImpression: (adId: string, section: string) => adManager.recordImpression(adId, section),
    recordClick: (adId: string, section: string) => adManager.recordClick(adId, section),
    recordConversion: (adId: string, value?: number) => adManager.recordConversion(adId, value),
    getAdStats: (adId: string) => adManager.getAdStats(adId),
    getCampaignStats: (campaignId: string) => adManager.getCampaignStats(campaignId),
    getAllCampaigns: () => adManager.getAllCampaigns(),
    getRotationStats: (section: string) => adManager.getRotationStats(section),
    getUserStats: () => adManager.getUserStats(),
    trackAction: (action: string, context?: any) => adManager.trackUserAction(action, context || {}),
    setUserType: (userType: string, profile?: any) => {
      // Fonction pour définir le type d'utilisateur
      adManager.currentUserId = userType;
      if (profile) {
        adManager.trackUserAction('set-user-type', { userType, profile });
      }
    },
    generateAdvertiserReport: (campaignId?: string) => adManager.generateAdvertiserReport(campaignId),
    refresh
  };
}

export default AdManager;
