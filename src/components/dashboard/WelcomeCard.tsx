import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../ui/Card';
import { TrendingUp, Target, Clock } from 'lucide-react';

export const WelcomeCard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="mt-2 text-indigo-100">
            Ready to achieve your business goals? Let's make today productive.
          </p>
        </div>
        <div className="hidden md:block">
          <div className="flex space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-lg mb-2">
                <Target className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm text-indigo-100">Active Goals</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-lg mb-2">
                <Clock className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-indigo-100">Sessions</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-lg mb-2">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold">85%</div>
              <div className="text-sm text-indigo-100">Progress</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};