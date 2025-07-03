import React from 'react';
import { DashboardLayout } from './DashboardLayout';
import { WelcomeCard } from './WelcomeCard';
import { QuickActions } from './QuickActions';
import { RecentSessions } from './RecentSessions';
import { SavedOutputs } from './SavedOutputs';

export const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WelcomeCard />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <QuickActions />
          <RecentSessions />
        </div>
        
        <SavedOutputs />
      </div>
    </DashboardLayout>
  );
};