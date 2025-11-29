
import { useState } from 'react';
import { Card } from '../../components/base/Card';
import { Button } from '../../components/base/Button';
import { Badge } from '../../components/base/Badge';
import { AdBanner } from '../../components/feature/AdBanner';
import { StartupDashboard } from './components/StartupDashboard';
import { CommercialsSection } from './components/CommercialsSection';
import { EventsSection } from './components/EventsSection';
import { FeedbackSection } from './components/FeedbackSection';
import { ReportsSection } from './components/ReportsSection';

const StartupsPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: 'ri-dashboard-line', count: null },
    { id: 'commercials', label: 'Équipe Commerciale', icon: 'ri-user-star-line', count: 6 },
    { id: 'events', label: 'Événements', icon: 'ri-calendar-event-line', count: 4 },
    { id: 'feedback', label: 'Feedback Client', icon: 'ri-feedback-line', count: 12 },
    { id: 'reports', label: 'Rapports', icon: 'ri-file-chart-line', count: 3 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <StartupDashboard />;
      case 'commercials':
        return <CommercialsSection />;
      case 'events':
        return <EventsSection />;
      case 'feedback':
        return <FeedbackSection />;
      case 'reports':
        return <ReportsSection />;
      default:
        return <StartupDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Espace Startup</h1>
              <p className="text-gray-600 mt-1">Accélérez votre croissance commerciale</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="warning">Phase de Croissance</Badge>
              <Button variant="primary" size="sm">
                <i className="ri-rocket-line mr-2"></i>
                Booster Ventes
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
                {tab.count && (
                  <Badge variant="secondary" className="ml-2">
                    {tab.count}
                  </Badge>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Contenu principal */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>

          {/* Sidebar avec bannières publicitaires compactes */}
          <div className="lg:col-span-1 space-y-4">
            <AdBanner
              position="startups-sidebar"
              format="compact"
              section={`startups-${activeTab}`}
              userContext={{ userType: 'startup', section: activeTab }}
              priority="medium"
              targetCategories={['funding', 'investment', 'startup-services']}
            />
            
            <AdBanner
              position="startups-sidebar-secondary"
              format="compact"
              section={`startups-${activeTab}`}
              userContext={{ userType: 'startup', section: activeTab }}
              priority="low"
              targetCategories={['mentoring', 'accelerator', 'startup-resources']}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupsPage;
