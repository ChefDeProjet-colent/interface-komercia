
import { useState } from 'react';
import { useAdManager } from '../../../components/feature/AdManager';

export default function MarketAnalysis() {
  const { getAds, recordImpression, recordClick } = useAdManager();
  const [selectedAnalysis, setSelectedAnalysis] = useState('opportunities');
  const [selectedRegion, setSelectedRegion] = useState('france');
  const [selectedScenario, setSelectedScenario] = useState('conservative');

  const analysisTypes = [
    { id: 'opportunities', name: 'Cartographie Opportunités', icon: 'ri-map-pin-line' },
    { id: 'competitive', name: 'Analyse Concurrentielle', icon: 'ri-sword-line' },
    { id: 'forecasts', name: 'Prévisions de Marché', icon: 'ri-line-chart-line' },
    { id: 'trends', name: 'Tendances Sectorielles', icon: 'ri-trending-up-line' },
    { id: 'risks', name: 'Analyse des Risques', icon: 'ri-shield-check-line' }
  ];

  // Cartographie des opportunités par région
  const geographicOpportunities = [
    {
      region: 'Île-de-France',
      potential: 'Très élevé',
      revenue: '€15.2M',
      growth: '+18%',
      sectors: ['FinTech', 'SaaS', 'E-commerce'],
      companies: 2847,
      competition: 'Élevée',
      description: 'Hub technologique majeur avec forte concentration d\'entreprises innovantes',
      keyFactors: ['Écosystème startup', 'Accès financement', 'Talents qualifiés'],
      barriers: ['Coûts élevés', 'Concurrence intense', 'Saturation marché']
    },
    {
      region: 'Auvergne-Rhône-Alpes',
      potential: 'Élevé',
      revenue: '€8.7M',
      growth: '+22%',
      sectors: ['Industrie 4.0', 'Cleantech', 'Biotechnologies'],
      companies: 1653,
      competition: 'Moyenne',
      description: 'Région industrielle en transformation digitale avec fort potentiel innovation',
      keyFactors: ['Industrie établie', 'R&D développée', 'Coûts compétitifs'],
      barriers: ['Résistance changement', 'Infrastructure', 'Compétences digitales']
    },
    {
      region: 'Nouvelle-Aquitaine',
      potential: 'Moyen',
      revenue: '€5.4M',
      growth: '+15%',
      sectors: ['AgriTech', 'Tourisme', 'Aéronautique'],
      companies: 987,
      competition: 'Faible',
      description: 'Marché émergent avec opportunités dans les secteurs traditionnels',
      keyFactors: ['Secteurs spécialisés', 'Faible concurrence', 'Soutien public'],
      barriers: ['Marché limité', 'Adoption lente', 'Ressources limitées']
    }
  ];

  // Segments de marché sous-exploités
  const underexploitedSegments = [
    {
      segment: 'PME Manufacturières',
      size: '€12.8M',
      penetration: '23%',
      opportunity: '€9.8M',
      timeline: '12-18 mois',
      difficulty: 'Moyenne',
      description: 'Digitalisation des processus de production et gestion',
      solutions: ['ERP adapté', 'IoT industriel', 'Analytics prédictive'],
      competitors: ['SAP', 'Microsoft', 'Oracle'],
      barriers: ['Budget limité', 'Résistance changement', 'Complexité technique']
    },
    {
      segment: 'Commerces de Proximité',
      size: '€8.3M',
      penetration: '15%',
      opportunity: '€7.1M',
      timeline: '6-12 mois',
      difficulty: 'Faible',
      description: 'Solutions e-commerce et gestion client pour petits commerces',
      solutions: ['E-commerce simple', 'CRM léger', 'Paiement mobile'],
      competitors: ['Shopify', 'WooCommerce', 'PrestaShop'],
      barriers: ['Compétences techniques', 'Investissement initial', 'Habitudes clients']
    },
    {
      segment: 'Services B2B Spécialisés',
      size: '€15.6M',
      penetration: '31%',
      opportunity: '€10.8M',
      timeline: '9-15 mois',
      difficulty: 'Élevée',
      description: 'Automatisation et optimisation des services professionnels',
      solutions: ['Automatisation workflow', 'BI avancée', 'Collaboration cloud'],
      competitors: ['Salesforce', 'HubSpot', 'Zendesk'],
      barriers: ['Personnalisation', 'Intégration', 'Formation utilisateurs']
    }
  ];

  // Analyse concurrentielle détaillée
  const competitiveAnalysis = [
    {
      competitor: 'TechLeader Corp',
      marketShare: '28%',
      revenue: '€45M',
      growth: '+12%',
      strengths: ['Leader marché', 'R&D importante', 'Réseau distribution étendu', 'Marque reconnue'],
      weaknesses: ['Prix élevés', 'Innovation lente', 'Service client perfectible', 'Rigidité organisationnelle'],
      threat: 'Élevée',
      strategy: 'Différenciation par l\'innovation et le service personnalisé',
      recentMoves: ['Acquisition startup IA', 'Nouveau centre R&D', 'Partenariat cloud'],
      vulnerabilities: ['Dépendance grands comptes', 'Coûts structure', 'Agilité limitée']
    },
    {
      competitor: 'InnovateNow SAS',
      marketShare: '15%',
      revenue: '€24M',
      growth: '+25%',
      strengths: ['Prix compétitifs', 'Agilité forte', 'Marketing digital efficace', 'Innovation rapide'],
      weaknesses: ['Qualité variable', 'Support limité', 'Couverture géographique', 'Ressources limitées'],
      threat: 'Moyenne',
      strategy: 'Focus sur la qualité et la fiabilité pour justifier premium',
      recentMoves: ['Levée fonds 15M€', 'Expansion Europe', 'Nouveau produit SaaS'],
      vulnerabilities: ['Dépendance fondateurs', 'Croissance non maîtrisée', 'Concurrence prix']
    },
    {
      competitor: 'SpecialistPro Ltd',
      marketShare: '12%',
      revenue: '€19M',
      growth: '+8%',
      strengths: ['Spécialisation niche', 'Expertise technique reconnue', 'Relations client excellentes', 'Marges élevées'],
      weaknesses: ['Taille limitée', 'Ressources contraintes', 'Scalabilité difficile', 'Dépendance expertise'],
      threat: 'Faible',
      strategy: 'Expansion géographique et diversification progressive',
      recentMoves: ['Ouverture filiale UK', 'Recrutement experts', 'Certification ISO'],
      vulnerabilities: ['Marché niche limité', 'Succession dirigeants', 'Évolution technologique']
    }
  ];

  // Prévisions de marché avec scénarios
  const marketForecasts = {
    conservative: {
      name: 'Scénario Conservateur',
      growth: '+8%',
      revenue2024: '€125M',
      revenue2025: '€135M',
      revenue2026: '€146M',
      assumptions: ['Croissance économique stable', 'Adoption technologique graduelle', 'Concurrence modérée'],
      risks: ['Ralentissement économique', 'Résistance au changement', 'Réglementation'],
      opportunities: ['Digitalisation PME', 'Optimisation coûts', 'Efficacité opérationnelle']
    },
    optimistic: {
      name: 'Scénario Optimiste',
      growth: '+18%',
      revenue2024: '€125M',
      revenue2025: '€147M',
      revenue2026: '€174M',
      assumptions: ['Forte croissance économique', 'Adoption rapide innovations', 'Expansion géographique'],
      risks: ['Surchauffe marché', 'Pénurie talents', 'Bulles technologiques'],
      opportunities: ['Nouveaux marchés', 'Innovation disruptive', 'Partenariats stratégiques']
    },
    pessimistic: {
      name: 'Scénario Pessimiste',
      growth: '-2%',
      revenue2024: '€125M',
      revenue2025: '€122M',
      revenue2026: '€120M',
      assumptions: ['Récession économique', 'Réduction investissements', 'Concurrence accrue'],
      risks: ['Crise économique', 'Disruption technologique', 'Guerre des prix'],
      opportunities: ['Consolidation marché', 'Solutions low-cost', 'Optimisation extrême']
    }
  };

  const sectorTrends = [
    {
      trend: 'Intelligence Artificielle Générative',
      impact: 'Très élevé',
      timeline: 'Court terme (6-12 mois)',
      adoption: '67%',
      description: 'Intégration massive de l\'IA générative dans les processus métier',
      opportunities: ['Automatisation contenu', 'Assistance intelligente', 'Personnalisation masse'],
      companies: ['TechCorp', 'InnovateSAS', 'StartupXYZ'],
      investmentRequired: '€2.5M',
      roi: '340%'
    },
    {
      trend: 'Durabilité et Économie Circulaire',
      impact: 'Élevé',
      timeline: 'Moyen terme (12-24 mois)',
      adoption: '45%',
      description: 'Transformation vers des modèles économiques durables et circulaires',
      opportunities: ['Solutions vertes', 'Reporting ESG', 'Économie circulaire', 'Supply chain durable'],
      companies: ['GlobalTrade', 'EcoInnovate'],
      investmentRequired: '€1.8M',
      roi: '220%'
    },
    {
      trend: 'Travail Hybride et Collaboration Digitale',
      impact: 'Élevé',
      timeline: 'Court terme (3-9 mois)',
      adoption: '78%',
      description: 'Évolution permanente vers des modèles de travail flexibles',
      opportunities: ['Outils collaboration', 'Gestion équipes distantes', 'Productivité digitale'],
      companies: ['TechCorp', 'CollabSoft'],
      investmentRequired: '€1.2M',
      roi: '280%'
    }
  ];

  const riskAnalysis = [
    {
      risk: 'Disruption Technologique IA',
      probability: 'Très élevée',
      impact: 'Très élevé',
      timeline: '6-18 mois',
      mitigation: 'Investissement R&D IA et formation équipes',
      status: 'Critique',
      companies: ['Toutes'],
      cost: '€3.5M',
      description: 'Risque d\'obsolescence rapide des solutions actuelles face à l\'IA'
    },
    {
      risk: 'Volatilité Économique Mondiale',
      probability: 'Élevée',
      impact: 'Élevé',
      timeline: '3-12 mois',
      mitigation: 'Diversification portefeuille clients et géographique',
      status: 'Surveillé',
      companies: ['Toutes'],
      cost: '€1.8M',
      description: 'Impact des incertitudes géopolitiques et économiques'
    },
    {
      risk: 'Pénurie Talents Spécialisés',
      probability: 'Élevée',
      impact: 'Moyen',
      timeline: '6-24 mois',
      mitigation: 'Programmes formation interne et partenariats écoles',
      status: 'Actif',
      companies: ['TechCorp', 'InnovateSAS'],
      cost: '€2.2M',
      description: 'Difficulté de recrutement dans les domaines techniques avancés'
    }
  ];

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'Très élevé': return 'bg-emerald-100 text-emerald-800';
      case 'Élevé': return 'bg-green-100 text-green-800';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800';
      case 'Faible': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Très élevé': return 'bg-red-100 text-red-800';
      case 'Élevé': return 'bg-orange-100 text-orange-800';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800';
      case 'Faible': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'Élevée': return 'bg-red-100 text-red-800';
      case 'Moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'Faible': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderContent = () => {
    switch (selectedAnalysis) {
      case 'opportunities':
        return (
          <div className="space-y-6">
            {/* Cartographie géographique */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Cartographie des Opportunités Géographiques</h3>
                <div className="flex items-center space-x-3">
                  <select 
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="france">France</option>
                    <option value="europe">Europe</option>
                    <option value="international">International</option>
                  </select>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap">
                    <i className="ri-download-line mr-2"></i>
                    Exporter Carte
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {geographicOpportunities.map((region, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{region.region}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPotentialColor(region.potential)}`}>
                        {region.potential}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Potentiel revenus</span>
                        <span className="font-semibold text-green-600">{region.revenue}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Croissance</span>
                        <span className="font-semibold text-blue-600">{region.growth}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Entreprises</span>
                        <span className="font-semibold text-gray-900">{region.companies.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Concurrence</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCompetitionColor(region.competition)}`}>
                          {region.competition}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mt-3 mb-3">{region.description}</p>

                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 mb-1">Secteurs clés</h5>
                        <div className="flex flex-wrap gap-1">
                          {region.sectors.map((sector, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {sector}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 mb-1">Facteurs favorables</h5>
                        <ul className="space-y-1">
                          {region.keyFactors.map((factor, idx) => (
                            <li key={idx} className="flex items-center text-xs text-gray-600">
                              <i className="ri-check-line text-green-600 mr-1"></i>
                              {factor}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-gray-900 mb-1">Barrières identifiées</h5>
                        <ul className="space-y-1">
                          {region.barriers.map((barrier, idx) => (
                            <li key={idx} className="flex items-center text-xs text-gray-600">
                              <i className="ri-alert-line text-orange-600 mr-1"></i>
                              {barrier}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Segments sous-exploités */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Segments de Marché Sous-Exploités</h3>
              
              <div className="space-y-4">
                {underexploitedSegments.map((segment, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{segment.segment}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            segment.difficulty === 'Élevée' ? 'bg-red-100 text-red-800' :
                            segment.difficulty === 'Moyenne' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            Difficulté {segment.difficulty}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{segment.description}</p>
                      </div>
                      <div className="text-right ml-6">
                        <div className="text-2xl font-bold text-green-600">{segment.opportunity}</div>
                        <div className="text-sm text-gray-500">Opportunité</div>
                        <div className="text-sm text-gray-500 mt-1">{segment.timeline}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-gray-900">{segment.size}</div>
                        <div className="text-sm text-gray-600">Taille marché</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-blue-600">{segment.penetration}</div>
                        <div className="text-sm text-gray-600">Pénétration actuelle</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-green-600">{segment.opportunity}</div>
                        <div className="text-sm text-gray-600">Potentiel restant</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-purple-600">{segment.timeline}</div>
                        <div className="text-sm text-gray-600">Délai capture</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Solutions recommandées</h5>
                        <div className="space-y-1">
                          {segment.solutions.map((solution, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <i className="ri-arrow-right-line text-blue-600 mr-2"></i>
                              {solution}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Concurrents principaux</h5>
                        <div className="flex flex-wrap gap-1">
                          {segment.competitors.map((competitor, idx) => (
                            <span key={idx} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                              {competitor}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Barrières à l'entrée</h5>
                        <div className="space-y-1">
                          {segment.barriers.map((barrier, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <i className="ri-alert-line text-orange-600 mr-2"></i>
                              {barrier}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'competitive':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Analyse Concurrentielle Détaillée</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap">
                  <i className="ri-download-line mr-2"></i>
                  Rapport Concurrence
                </button>
              </div>

              <div className="space-y-6">
                {competitiveAnalysis.map((analysis, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <h4 className="text-xl font-semibold text-gray-900">{analysis.competitor}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          analysis.threat === 'Élevée' ? 'bg-red-100 text-red-800' :
                          analysis.threat === 'Moyenne' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          Menace {analysis.threat}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{analysis.marketShare}</div>
                        <div className="text-sm text-gray-500">Part de marché</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">{analysis.revenue}</div>
                        <div className="text-sm text-gray-600">Chiffre d'affaires</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">{analysis.growth}</div>
                        <div className="text-sm text-gray-600">Croissance annuelle</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">{analysis.marketShare}</div>
                        <div className="text-sm text-gray-600">Position marché</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <i className="ri-add-circle-line text-green-600 mr-2"></i>
                          Forces
                        </h5>
                        <ul className="space-y-2">
                          {analysis.strengths.map((strength, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-700">
                              <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <i className="ri-subtract-line text-red-600 mr-2"></i>
                          Faiblesses
                        </h5>
                        <ul className="space-y-2">
                          {analysis.weaknesses.map((weakness, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-700">
                              <i className="ri-close-line text-red-600 mr-2 mt-0.5"></i>
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Mouvements récents</h5>
                        <ul className="space-y-2">
                          {analysis.recentMoves.map((move, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-700">
                              <i className="ri-arrow-right-line text-blue-600 mr-2 mt-0.5"></i>
                              {move}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Vulnérabilités identifiées</h5>
                        <ul className="space-y-2">
                          {analysis.vulnerabilities.map((vulnerability, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-700">
                              <i className="ri-alert-line text-orange-600 mr-2 mt-0.5"></i>
                              {vulnerability}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-semibold text-gray-900 mb-2">Stratégie Recommandée</h5>
                      <p className="text-sm text-gray-700">{analysis.strategy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'forecasts':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Prévisions de Marché et Scénarios</h3>
                <div className="flex items-center space-x-3">
                  <select 
                    value={selectedScenario}
                    onChange={(e) => setSelectedScenario(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="conservative">Conservateur</option>
                    <option value="optimistic">Optimiste</option>
                    <option value="pessimistic">Pessimiste</option>
                  </select>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap">
                    <i className="ri-download-line mr-2"></i>
                    Exporter Prévisions
                  </button>
                </div>
              </div>

              {/* Scénario sélectionné */}
              <div className="mb-8">
                {Object.entries(marketForecasts).map(([key, scenario]) => {
                  if (key !== selectedScenario) return null;
                  
                  return (
                    <div key={key} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xl font-semibold text-gray-900">{scenario.name}</h4>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className={`text-2xl font-bold ${
                              scenario.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {scenario.growth}
                            </div>
                            <div className="text-sm text-gray-500">Croissance prévue</div>
                          </div>
                        </div>
                      </div>

                      {/* Prévisions revenus */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-600">{scenario.revenue2024}</div>
                          <div className="text-sm text-gray-600">2024 (Actuel)</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-600">{scenario.revenue2025}</div>
                          <div className="text-sm text-gray-600">2025 (Prévision)</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-xl font-bold text-purple-600">{scenario.revenue2026}</div>
                          <div className="text-sm text-gray-600">2026 (Projection)</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Hypothèses clés</h5>
                          <ul className="space-y-2">
                            {scenario.assumptions.map((assumption, idx) => (
                              <li key={idx} className="flex items-start text-sm text-gray-700">
                                <i className="ri-checkbox-circle-line text-blue-600 mr-2 mt-0.5"></i>
                                {assumption}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Risques identifiés</h5>
                          <ul className="space-y-2">
                            {scenario.risks.map((risk, idx) => (
                              <li key={idx} className="flex items-start text-sm text-gray-700">
                                <i className="ri-alert-line text-red-600 mr-2 mt-0.5"></i>
                                {risk}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Opportunités</h5>
                          <ul className="space-y-2">
                            {scenario.opportunities.map((opportunity, idx) => (
                              <li key={idx} className="flex items-start text-sm text-gray-700">
                                <i className="ri-lightbulb-line text-green-600 mr-2 mt-0.5"></i>
                                {opportunity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Comparaison des scénarios */}
              <div className="border rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Comparaison des Scénarios</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Scénario</th>
                        <th className="text-center py-3 px-4">Croissance</th>
                        <th className="text-center py-3 px-4">2025</th>
                        <th className="text-center py-3 px-4">2026</th>
                        <th className="text-center py-3 px-4">Probabilité</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(marketForecasts).map(([key, scenario]) => (
                        <tr key={key} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{scenario.name}</td>
                          <td className={`py-3 px-4 text-center font-semibold ${
                            scenario.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {scenario.growth}
                          </td>
                          <td className="py-3 px-4 text-center">{scenario.revenue2025}</td>
                          <td className="py-3 px-4 text-center">{scenario.revenue2026}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              key === 'conservative' ? 'bg-blue-100 text-blue-800' :
                              key === 'optimistic' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {key === 'conservative' ? '60%' : key === 'optimistic' ? '25%' : '15%'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'trends':
        return (
          <div className="space-y-6">
            {sectorTrends.map((trend, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{trend.trend}</h3>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(trend.impact)}`}>
                      Impact {trend.impact}
                    </span>
                    <span className="text-sm text-gray-500">{trend.timeline}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{trend.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{trend.adoption}</div>
                    <div className="text-sm text-gray-600">Taux d'adoption</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{trend.investmentRequired}</div>
                    <div className="text-sm text-gray-600">Investissement requis</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{trend.roi}</div>
                    <div className="text-sm text-gray-600">ROI estimé</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">{trend.timeline.split(' ')[0]}</div>
                    <div className="text-sm text-gray-600">Délai impact</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Opportunités</h4>
                    <div className="flex flex-wrap gap-2">
                      {trend.opportunities.map((opp, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {opp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Entreprises concernées</h4>
                    <div className="flex flex-wrap gap-2">
                      {trend.companies.map((company, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'risks':
        return (
          <div className="space-y-6">
            {riskAnalysis.map((risk, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{risk.risk}</h3>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      risk.probability === 'Très élevée' ? 'bg-red-100 text-red-800' :
                      risk.probability === 'Élevée' ? 'bg-orange-100 text-orange-800' :
                      risk.probability === 'Moyenne' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      Probabilité {risk.probability}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(risk.impact)}`}>
                      Impact {risk.impact}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      risk.status === 'Critique' ? 'bg-red-100 text-red-800' :
                      risk.status === 'Actif' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {risk.status}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{risk.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-lg font-bold text-red-600">{risk.timeline}</div>
                    <div className="text-sm text-gray-600">Horizon temporel</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">{risk.cost}</div>
                    <div className="text-sm text-gray-600">Coût mitigation</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{risk.companies.length}</div>
                    <div className="text-sm text-gray-600">Entreprises affectées</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{risk.status}</div>
                    <div className="text-sm text-gray-600">Statut suivi</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Stratégie d'Atténuation</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{risk.mitigation}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Entreprises Affectées</h4>
                    <div className="flex flex-wrap gap-2">
                      {risk.companies.map((company, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  // Bannières publicitaires spécialisées
  const sidebarAds = getAds('consultants-analysis-sidebar', 1, { 
    targetAudience: ['consultant', 'analyst'],
    preferredCategories: ['analytics', 'market-research', 'business-intelligence'],
    userType: 'enterprise'
  });
  
  const footerAds = getAds('consultants-analysis-footer', 1, { 
    targetAudience: ['consultant', 'analyst'],
    preferredCategories: ['analytics', 'market-research', 'competitive-intelligence'],
    userType: 'enterprise'
  });

  const mapAds = getAds('consultants-map-analysis', 1, {
    targetAudience: ['consultant', 'analyst'],
    preferredCategories: ['market-research', 'geographic-analysis', 'business-intelligence'],
    userType: 'enterprise'
  });

  const handleAdClick = (ad: any, section: string) => {
    recordClick(ad.id, section, 'button', {
      userType: 'consultant',
      section: 'market-analysis',
      analysisType: selectedAnalysis
    });
    window.open(ad.link, '_blank');
  };

  const handleAdImpression = (ad: any, section: string) => {
    recordImpression(ad.id, section, {
      userType: 'consultant',
      section: 'market-analysis',
      analysisType: selectedAnalysis
    });
  };

  return (
    <div className="space-y-6">
      {/* Sélecteur d'analyse */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Outils d'Analyse de Marché Avancés</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            Exporter Analyse Complète
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {analysisTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedAnalysis(type.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedAnalysis === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <i className={`${type.icon} text-2xl mb-2 ${
                  selectedAnalysis === type.id ? 'text-blue-600' : 'text-gray-400'
                }`}></i>
                <p className={`text-sm font-medium ${
                  selectedAnalysis === type.id ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {type.name}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Contenu principal */}
        <div className="lg:col-span-3">
          {renderContent()}

          {/* Bannière publicitaire sous les cartes/graphiques */}
          {mapAds.length > 0 && selectedAnalysis === 'opportunities' && (
            <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <i className="ri-database-2-line text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{mapAds[0].title}</h3>
                    <p className="text-gray-600">{mapAds[0].description}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-green-600 font-medium">Base de données mondiale</span>
                      <span className="text-sm text-gray-500 ml-2">• Analyses géographiques</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <button 
                    onClick={() => handleAdClick(mapAds[0], 'consultants-map-analysis')}
                    onLoad={() => handleAdImpression(mapAds[0], 'consultants-map-analysis')}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                  >
                    Découvrir la base
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar droite */}
        <div className="space-y-6">
          {/* Bannière publicitaire latérale */}
          {sidebarAds.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="ri-brain-line text-white text-2xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{sidebarAds[0].title}</h3>
                <p className="text-sm text-gray-600 mb-4">{sidebarAds[0].description}</p>
                <button 
                  onClick={() => handleAdClick(sidebarAds[0], 'consultants-analysis-sidebar')}
                  onLoad={() => handleAdImpression(sidebarAds[0], 'consultants-analysis-sidebar')}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm whitespace-nowrap"
                >
                  Essayer l'IA
                </button>
              </div>
            </div>
          )}

          {/* Résumé des analyses */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Résumé Analyses</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Opportunités géographiques</span>
                  <span className="text-sm font-medium text-green-600">3 régions</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Segments sous-exploités</span>
                  <span className="text-sm font-medium text-blue-600">3 segments</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Concurrents analysés</span>
                  <span className="text-sm font-medium text-purple-600">3 acteurs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Scénarios prévisions</span>
                  <span className="text-sm font-medium text-orange-600">3 scénarios</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Risques surveillés</span>
                  <span className="text-sm font-medium text-red-600">3 risques</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tendances actives</span>
                  <span className="text-sm font-medium text-indigo-600">3 tendances</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions recommandées */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Actions Prioritaires</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-map-pin-line text-green-600 mr-2"></i>
                    <span className="text-sm font-medium text-green-800">Expansion Île-de-France</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Potentiel €15.2M identifié
                  </p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-target-line text-blue-600 mr-2"></i>
                    <span className="text-sm font-medium text-blue-800">Segment PME Manufacturières</span>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">
                    Opportunité €9.8M sous-exploitée
                  </p>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-robot-line text-purple-600 mr-2"></i>
                    <span className="text-sm font-medium text-purple-800">Investir dans l'IA</span>
                  </div>
                  <p className="text-xs text-purple-700 mt-1">
                    ROI 340% sur 18 mois
                  </p>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-shield-check-line text-red-600 mr-2"></i>
                    <span className="text-sm font-medium text-red-800">Mitiger risque IA</span>
                  </div>
                  <p className="text-xs text-red-700 mt-1">
                    Investissement R&D urgent
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Outils d'analyse */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Outils Complémentaires</h3>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <button className="w-full text-left p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <i className="ri-pie-chart-line text-blue-600 mr-3"></i>
                    <span className="text-sm font-medium text-gray-900">Analyse SWOT</span>
                  </div>
                </button>
                <button className="w-full text-left p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <i className="ri-compass-line text-green-600 mr-3"></i>
                    <span className="text-sm font-medium text-gray-900">Matrice BCG</span>
                  </div>
                </button>
                <button className="w-full text-left p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <i className="ri-target-line text-purple-600 mr-3"></i>
                    <span className="text-sm font-medium text-gray-900">Forces de Porter</span>
                  </div>
                </button>
                <button className="w-full text-left p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <i className="ri-line-chart-line text-orange-600 mr-3"></i>
                    <span className="text-sm font-medium text-gray-900">Analyse de Tendances</span>
                  </div>
                </button>
                <button className="w-full text-left p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <i className="ri-map-2-line text-indigo-600 mr-3"></i>
                    <span className="text-sm font-medium text-gray-900">Cartographie Concurrentielle</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bannière publicitaire pied de page */}
      {footerAds.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="ri-search-eye-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{footerAds[0].title}</h3>
                <p className="text-gray-600">{footerAds[0].description}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-indigo-600 font-medium">Veille concurrentielle 24/7</span>
                  <span className="text-sm text-gray-500 ml-2">• Alertes automatiques</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button 
                onClick={() => handleAdClick(footerAds[0], 'consultants-analysis-footer')}
                onLoad={() => handleAdImpression(footerAds[0], 'consultants-analysis-footer')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap"
              >
                Démarrer la veille
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add named export for compatibility
export { MarketAnalysis };
