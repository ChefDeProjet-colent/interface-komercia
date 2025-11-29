
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';

interface QuickActionsProps {
  onSectionChange: (section: string) => void;
}

export default function QuickActions({ onSectionChange }: QuickActionsProps) {
  const actions = [
    {
      id: 'leads',
      title: 'Consulter les Leads',
      description: 'Voir les nouvelles opportunités',
      icon: 'ri-user-star-line',
      color: 'bg-blue-600',
      count: '12 nouveaux'
    },
    {
      id: 'pipeline',
      title: 'Gérer le Pipeline',
      description: 'Suivre vos prospects',
      icon: 'ri-flow-chart',
      color: 'bg-purple-600',
      count: '8 en cours'
    },
    {
      id: 'commissions',
      title: 'Voir Commissions',
      description: 'Consulter vos gains',
      icon: 'ri-money-euro-circle-line',
      color: 'bg-green-600',
      count: '2,500€ ce mois'
    },
    {
      id: 'reports',
      title: 'Rapports',
      description: 'Analyser vos performances',
      icon: 'ri-bar-chart-line',
      color: 'bg-orange-600',
      count: 'Mis à jour'
    }
  ];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Accès Rapide</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => (
          <div
            key={action.id}
            onClick={() => onSectionChange(action.id)}
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <i className={`${action.icon} text-white text-lg`}></i>
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {action.title}
                </h4>
                <p className="text-sm text-gray-600">{action.description}</p>
                <p className="text-xs text-blue-600 font-medium mt-1">{action.count}</p>
              </div>
              
              <i className="ri-arrow-right-line text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"></i>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
