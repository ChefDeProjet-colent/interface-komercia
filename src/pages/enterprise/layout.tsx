import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/feature/Sidebar';

const EnterpriseLayout = () => {
  const menuItems = [
    { icon: 'ri-dashboard-line', label: 'Tableau de bord', path: '/enterprise' },
    { icon: 'ri-user-line', label: 'Mon Profil', path: '/enterprise/profile' },
    { icon: 'ri-shopping-bag-line', label: 'Produits/Services', path: '/enterprise/products' },
    { icon: 'ri-file-list-line', label: 'Appels d\'Offres', path: '/enterprise/call-for-tenders' },
    { icon: 'ri-file-user-line', label: 'Candidatures', path: '/enterprise/candidatures' },
    { icon: 'ri-calendar-event-line', label: 'Entretiens', path: '/enterprise/entretiens' },
    { icon: 'ri-file-text-line', label: 'Contrats', path: '/enterprise/contrats' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="enterprise" />
      
      <div className="flex-1 lg:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default EnterpriseLayout;
