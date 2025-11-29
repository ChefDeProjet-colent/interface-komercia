
import Card from '../../../components/base/Card';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
}

export default function StatsCard({ title, value, change, changeType, icon, color }: StatsCardProps) {
  const changeClasses = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className={`text-sm mt-1 ${changeClasses[changeType]}`}>
            <i className={`${changeType === 'positive' ? 'ri-arrow-up-line' : changeType === 'negative' ? 'ri-arrow-down-line' : 'ri-subtract-line'} mr-1`}></i>
            {change}
          </p>
        </div>
        <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center`}>
          <i className={`${icon} text-xl text-white`}></i>
        </div>
      </div>
    </Card>
  );
}
