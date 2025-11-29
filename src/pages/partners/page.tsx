
import { PartnersDashboard } from './components/PartnersDashboard';

const PartnersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Interface Partenaires Stratégiques</h1>
              <p className="text-gray-600 mt-2">Intégrez vos services, accédez aux données et maximisez vos collaborations</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Partenaires Actifs</p>
                <p className="text-2xl font-bold text-indigo-600">24</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <PartnersDashboard />
    </div>
  );
};

export default PartnersPage;
