import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  LayoutGrid, 
  Target, 
  Users, 
  BarChart3, 
  Lightbulb,
  ArrowRight 
} from 'lucide-react';

const actions = [
  {
    title: 'Strategy Canvas',
    description: 'Map out your business model',
    icon: LayoutGrid,
    href: '/tools/strategy-canvas',
    color: 'bg-blue-500'
  },
  {
    title: 'Goal Setting',
    description: 'Define and track objectives',
    icon: Target,
    href: '/tools/goal-setting',
    color: 'bg-green-500'
  },
  {
    title: 'Team Alignment',
    description: 'Improve team collaboration',
    icon: Users,
    href: '/tools/team-alignment',
    color: 'bg-purple-500'
  },
  {
    title: 'Business Model',
    description: 'Analyze your business model',
    icon: BarChart3,
    href: '/tools/business-model',
    color: 'bg-orange-500'
  }
];

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/tools')}
          className="text-indigo-600 hover:text-indigo-500"
        >
          View all tools
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.title}
              onClick={() => navigate(action.href)}
              className="group text-left p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition-all"
            >
              <div className={`inline-flex p-2 rounded-lg ${action.color} text-white mb-3`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </Card>
  );
};