import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Clock, 
  ArrowRight,
  LayoutGrid,
  Target,
  Users,
  BarChart3
} from 'lucide-react';

const recentSessions = [
  {
    id: '1',
    type: 'strategy-canvas',
    title: 'Q1 Strategy Planning',
    date: '2024-01-15',
    time: '2 hours ago',
    icon: LayoutGrid,
    color: 'bg-blue-500'
  },
  {
    id: '2',
    type: 'goal-setting',
    title: 'Revenue Goals',
    date: '2024-01-12',
    time: '3 days ago',
    icon: Target,
    color: 'bg-green-500'
  },
  {
    id: '3',
    type: 'team-alignment',
    title: 'Team Sync Workshop',
    date: '2024-01-10',
    time: '5 days ago',
    icon: Users,
    color: 'bg-purple-500'
  }
];

export const RecentSessions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Sessions</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/sessions')}
          className="text-indigo-600 hover:text-indigo-500"
        >
          View all
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {recentSessions.map((session) => {
          const Icon = session.icon;
          return (
            <div
              key={session.id}
              className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => navigate(`/sessions/${session.id}`)}
            >
              <div className={`flex-shrink-0 p-2 rounded-lg ${session.color} text-white`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {session.title}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {session.time}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
          );
        })}
      </div>
    </Card>
  );
};