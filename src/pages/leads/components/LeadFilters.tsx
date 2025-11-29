
import { useState } from 'react';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';

interface FilterOptions {
  sector: string;
  location: string;
  priority: string;
  status: string;
  budget: string;
}

interface LeadFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
}

export default function LeadFilters({ onFiltersChange }: LeadFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    sector: '',
    location: '',
    priority: '',
    status: '',
    budget: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const sectors = [
    'Technologie',
    'Finance',
    'Santé',
    'Éducation',
    'Commerce',
    'Industrie',
    'Services'
  ];

  const locations = [
    'Paris',
    'Lyon',
    'Marseille',
    'Toulouse',
    'Nice',
    'Nantes',
    'Bordeaux'
  ];

  const priorities = [
    { value: 'high', label: 'Haute' },
    { value: 'medium', label: 'Moyenne' },
    { value: 'low', label: 'Basse' }
  ];

  const statuses = [
    { value: 'nouveau', label: 'Nouveau' },
    { value: 'en_cours', label: 'En cours' },
    { value: 'conclu', label: 'Conclu' },
    { value: 'perdu', label: 'Perdu' }
  ];

  const budgets = [
    '< 10k€',
    '10k€ - 50k€',
    '50k€ - 100k€',
    '100k€ - 500k€',
    '> 500k€'
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      sector: '',
      location: '',
      priority: '',
      status: '',
      budget: ''
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
          >
            Effacer
          </Button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <i className={`${isExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-lg`}></i>
          </button>
        </div>
      </div>

      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden'}`}>
        {/* Secteur */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Secteur</label>
          <div className="relative">
            <select
              value={filters.sector}
              onChange={(e) => handleFilterChange('sector', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="">Tous les secteurs</option>
              {sectors.map((sector) => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
            <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>
        </div>

        {/* Localisation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
          <div className="relative">
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="">Toutes les villes</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>
        </div>

        {/* Priorité */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
          <div className="relative">
            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="">Toutes les priorités</option>
              {priorities.map((priority) => (
                <option key={priority.value} value={priority.value}>{priority.label}</option>
              ))}
            </select>
            <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>
        </div>

        {/* Statut */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="">Tous les statuts</option>
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
            <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
          <div className="relative">
            <select
              value={filters.budget}
              onChange={(e) => handleFilterChange('budget', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="">Tous les budgets</option>
              {budgets.map((budget) => (
                <option key={budget} value={budget}>{budget}</option>
              ))}
            </select>
            <i className="ri-arrow-down-s-line absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>
        </div>
      </div>

      {/* Filtres rapides */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-2">Filtres rapides</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilterChange('priority', 'high')}
            className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors whitespace-nowrap"
          >
            Priorité haute
          </button>
          <button
            onClick={() => handleFilterChange('status', 'nouveau')}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors whitespace-nowrap"
          >
            Nouveaux leads
          </button>
          <button
            onClick={() => handleFilterChange('budget', '> 500k€')}
            className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors whitespace-nowrap"
          >
            Gros budgets
          </button>
        </div>
      </div>
    </Card>
  );
}
