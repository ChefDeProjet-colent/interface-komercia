
import { useState } from 'react';
import AdAnalyticsDashboard from '../../components/feature/AdAnalyticsDashboard';
import Sidebar from '../../components/feature/Sidebar';

export default function AdAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64">
        <AdAnalyticsDashboard />
      </div>
    </div>
  );
}
