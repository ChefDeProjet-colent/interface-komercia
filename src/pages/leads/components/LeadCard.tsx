
import Card from '../../../components/base/Card';
import Badge from '../../../components/base/Badge';
import Button from '../../../components/base/Button';

interface Lead {
  id: string;
  company: string;
  contact: string;
  sector: string;
  location: string;
  budget: string;
  priority: 'high' | 'medium' | 'low';
  status: 'nouveau' | 'en_cours' | 'conclu' | 'perdu';
  description: string;
  lastContact: string;
  phone: string;
  email: string;
}

interface LeadCardProps {
  lead: Lead;
  onContact: (lead: Lead) => void;
  onViewDetails: (lead: Lead) => void;
}

export default function LeadCard({ lead, onContact, onViewDetails }: LeadCardProps) {
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'nouveau': return 'info';
      case 'en_cours': return 'warning';
      case 'conclu': return 'success';
      case 'perdu': return 'danger';
      default: return 'default';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Haute';
      case 'medium': return 'Moyenne';
      case 'low': return 'Basse';
      default: return priority;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'nouveau': return 'Nouveau';
      case 'en_cours': return 'En cours';
      case 'conclu': return 'Conclu';
      case 'perdu': return 'Perdu';
      default: return status;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{lead.company}</h3>
          <p className="text-gray-600">{lead.contact}</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant={getPriorityVariant(lead.priority)}>
            {getPriorityLabel(lead.priority)}
          </Badge>
          <Badge variant={getStatusVariant(lead.status)}>
            {getStatusLabel(lead.status)}
          </Badge>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <i className="ri-building-line mr-2"></i>
          <span>{lead.sector}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <i className="ri-map-pin-line mr-2"></i>
          <span>{lead.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <i className="ri-money-euro-circle-line mr-2"></i>
          <span>Budget: {lead.budget}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <i className="ri-time-line mr-2"></i>
          <span>Dernier contact: {lead.lastContact}</span>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{lead.description}</p>

      <div className="flex space-x-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() => onContact(lead)}
          className="flex-1"
        >
          <i className="ri-phone-line mr-2"></i>
          Contacter
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(lead)}
        >
          <i className="ri-eye-line mr-2"></i>
          Détails
        </Button>
      </div>
    </Card>
  );
}
