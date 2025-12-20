import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/feature/Sidebar';

export default function EnterpriseLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole="enterprise" />
      
      <div className="flex-1 lg:ml-64">
        <Outlet />
      </div>
    </div>
  );
}
