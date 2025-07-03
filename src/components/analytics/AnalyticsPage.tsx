import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../dashboard/DashboardLayout';
import { Card } from '../ui/Card';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Users,
  BarChart3,
  Calendar,
  Award,
  Activity
} from 'lucide-react';

interface AnalyticsData {
  totalSessions: number;
  completedGoals: number;
  activeGoals: number;
  avgSessionDuration: number;
  weeklyProgress: number[];
  goalsByCategory: Record<string, number>;
  sessionsByType: Record<string, number>;
}

export const AnalyticsPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalSessions: 0,
    completedGoals: 0,
    activeGoals: 0,
    avgSessionDuration: 0,
    weeklyProgress: [65, 72, 68, 80, 75, 85, 90],
    goalsByCategory: {},
    sessionsByType: {}
  });

  useEffect(() => {
    // Calculate analytics from stored data
    const sessions = JSON.parse(localStorage.getItem('coach_pro_sessions') || '[]');
    const onboardingData = JSON.parse(localStorage.getItem('coach_pro_onboarding_complete') || '{}');
    
    const sessionsByType: Record<string, number> = {};
    sessions.forEach((session: any) => {
      sessionsByType[session.type] = (sessionsByType[session.type] || 0) + 1;
    });

    const goalsByCategory: Record<string, number> = {};
    if (onboardingData.goals) {
      onboardingData.goals.forEach((goal: any) => {
        goalsByCategory[goal.category] = (goalsByCategory[goal.category] || 0) + 1;
      });
    }

    setAnalytics({
      totalSessions: sessions.length,
      completedGoals: Math.floor(Math.random() * 5) + 2,
      activeGoals: onboardingData.goals?.length || 0,
      avgSessionDuration: 45,
      weeklyProgress: [65, 72, 68, 80, 75, 85, 90],
      goalsByCategory,
      sessionsByType
    });
  }, []);

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change?: string;
    icon: React.ComponentType<any>;
    color: string;
  }> = ({ title, value, change, icon: Icon, color }) => (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>
  );

  const ProgressChart: React.FC = () => (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h3>
      <div className="flex items-end space-x-2 h-32">
        {analytics.weeklyProgress.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-indigo-500 rounded-t"
              style={{ height: `${value}%` }}
            />
            <span className="text-xs text-gray-500 mt-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );

  const CategoryBreakdown: React.FC = () => (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals by Category</h3>
      <div className="space-y-3">
        {Object.entries(analytics.goalsByCategory).map(([category, count]) => (
          <div key={category} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{category}</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${(count / Math.max(...Object.values(analytics.goalsByCategory))) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900">{count}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  const SessionTypeChart: React.FC = () => (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Types</h3>
      <div className="space-y-3">
        {Object.entries(analytics.sessionsByType).map(([type, count]) => (
          <div key={type} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 capitalize">{type.replace('-', ' ')}</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(count / Math.max(...Object.values(analytics.sessionsByType))) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900">{count}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your coaching progress and insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Sessions"
            value={analytics.totalSessions}
            change="+12% from last week"
            icon={Activity}
            color="bg-blue-500"
          />
          <StatCard
            title="Active Goals"
            value={analytics.activeGoals}
            change="+2 this month"
            icon={Target}
            color="bg-green-500"
          />
          <StatCard
            title="Completed Goals"
            value={analytics.completedGoals}
            change="+1 this week"
            icon={Award}
            color="bg-purple-500"
          />
          <StatCard
            title="Avg Session Time"
            value={`${analytics.avgSessionDuration}m`}
            change="+5m improvement"
            icon={Clock}
            color="bg-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProgressChart />
          <CategoryBreakdown />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SessionTypeChart />
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Award className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-900">Goal Completed</p>
                  <p className="text-xs text-green-700">Increased team productivity by 25%</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Strategy Canvas Completed</p>
                  <p className="text-xs text-blue-700">Business model analysis finished</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-purple-900">Team Alignment Session</p>
                  <p className="text-xs text-purple-700">Improved communication protocols</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};