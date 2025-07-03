import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../dashboard/DashboardLayout';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Clock, 
  Download, 
  Eye, 
  MoreHorizontal,
  LayoutGrid,
  Target,
  Users,
  BarChart3,
  Lightbulb,
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';

interface Session {
  id: string;
  type: string;
  title: string;
  data: any;
  createdAt: string;
  updatedAt: string;
}

const getSessionIcon = (type: string) => {
  switch (type) {
    case 'strategy-canvas': return LayoutGrid;
    case 'goal-setting': return Target;
    case 'team-alignment': return Users;
    case 'business-model': return BarChart3;
    case 'leadership': return Lightbulb;
    case 'growth-planning': return TrendingUp;
    default: return LayoutGrid;
  }
};

const getSessionColor = (type: string) => {
  switch (type) {
    case 'strategy-canvas': return 'bg-blue-500';
    case 'goal-setting': return 'bg-green-500';
    case 'team-alignment': return 'bg-purple-500';
    case 'business-model': return 'bg-orange-500';
    case 'leadership': return 'bg-yellow-500';
    case 'growth-planning': return 'bg-pink-500';
    default: return 'bg-gray-500';
  }
};

export const SessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('coach_pro_sessions') || '[]');
    setSessions(savedSessions);
  }, []);

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || session.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const exportSession = (session: Session) => {
    const dataStr = JSON.stringify(session, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${session.title.replace(/\s+/g, '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const deleteSession = (sessionId: string) => {
    if (confirm('Are you sure you want to delete this session?')) {
      const updatedSessions = sessions.filter(s => s.id !== sessionId);
      setSessions(updatedSessions);
      localStorage.setItem('coach_pro_sessions', JSON.stringify(updatedSessions));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Session Management</h1>
            <p className="text-gray-600">View and manage your coaching sessions</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="strategy-canvas">Strategy Canvas</option>
              <option value="goal-setting">Goal Setting</option>
              <option value="team-alignment">Team Alignment</option>
              <option value="business-model">Business Model</option>
              <option value="leadership">Leadership</option>
              <option value="growth-planning">Growth Planning</option>
            </select>
          </div>
        </div>

        {filteredSessions.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSessions.map((session) => {
              const Icon = getSessionIcon(session.type);
              const colorClass = getSessionColor(session.type);
              
              return (
                <Card key={session.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${colorClass} text-white`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{session.title}</h3>
                        <p className="text-sm text-gray-500 capitalize">
                          {session.type.replace('-', ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{new Date(session.createdAt).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(session.createdAt).toLocaleTimeString()}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => exportSession(session)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteSession(session.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-12">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <LayoutGrid className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || filterType !== 'all' ? 'No sessions found' : 'No sessions yet'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start using coaching tools to create your first session'
              }
            </p>
            {!searchTerm && filterType === 'all' && (
              <Button onClick={() => window.location.href = '/tools'}>
                Explore Coaching Tools
              </Button>
            )}
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};