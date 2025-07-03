import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DashboardLayout } from '../dashboard/DashboardLayout';
import { 
  LayoutGrid, 
  Target, 
  Users, 
  BarChart3, 
  Lightbulb,
  TrendingUp
} from 'lucide-react';

interface ToolsLayoutProps {
  children: React.ReactNode;
}

const tools = [
  {
    name: 'Strategy Canvas',
    href: '/tools/strategy-canvas',
    icon: LayoutGrid,
    description: 'Map out your business model'
  },
  {
    name: 'Goal Setting',
    href: '/tools/goal-setting',
    icon: Target,
    description: 'Define and track objectives'
  },
  {
    name: 'Team Alignment',
    href: '/tools/team-alignment',
    icon: Users,
    description: 'Improve team collaboration'
  },
  {
    name: 'Business Model',
    href: '/tools/business-model',
    icon: BarChart3,
    description: 'Analyze your business model'
  },
  {
    name: 'Leadership Assessment',
    href: '/tools/leadership',
    icon: Lightbulb,
    description: 'Evaluate leadership style'
  },
  {
    name: 'Growth Planning',
    href: '/tools/growth-planning',
    icon: TrendingUp,
    description: 'Plan strategic growth'
  }
];

export const ToolsLayout: React.FC<ToolsLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isToolsHome = location.pathname === '/tools';

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Coaching Tools</h1>
            <p className="text-gray-600">Professional tools to guide your business growth</p>
          </div>
        </div>

        {isToolsHome ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.name}
                  to={tool.href}
                  className="group bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                      <Icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-500">{tool.description}</p>
                    </div>
                  </div>
                  <div className="text-sm text-indigo-600 group-hover:text-indigo-700 font-medium">
                    Start session →
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          children
        )}
      </div>
    </DashboardLayout>
  );
};