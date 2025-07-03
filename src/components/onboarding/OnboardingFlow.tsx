import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingLayout } from './OnboardingLayout';
import { BusinessProfileStep } from './BusinessProfileStep';
import { GoalsAssessmentStep } from './GoalsAssessmentStep';
import { LeadershipStyleStep } from './LeadershipStyleStep';
import { ResourcePriorityStep } from './ResourcePriorityStep';
import { useAuth } from '../../contexts/AuthContext';
import { authUtils } from '../../utils/auth';
import { OnboardingData } from '../../types';

export const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const handleBusinessProfile = (data: OnboardingData['businessProfile']) => {
    const updatedData = { ...onboardingData, businessProfile: data };
    setOnboardingData(updatedData);
    authUtils.saveOnboardingProgress(1, data);
    setCurrentStep(2);
  };

  const handleGoalsAssessment = (data: OnboardingData['goals']) => {
    const updatedData = { ...onboardingData, goals: data };
    setOnboardingData(updatedData);
    authUtils.saveOnboardingProgress(2, data);
    setCurrentStep(3);
  };

  const handleLeadershipStyle = (data: OnboardingData['leadershipStyle']) => {
    const updatedData = { ...onboardingData, leadershipStyle: data };
    setOnboardingData(updatedData);
    authUtils.saveOnboardingProgress(3, data);
    setCurrentStep(4);
  };

  const handleResourcePriorities = (data: OnboardingData['resourcePriorities']) => {
    const finalData = { ...onboardingData, resourcePriorities: data } as OnboardingData;
    
    // Save complete onboarding data
    localStorage.setItem('coach_pro_onboarding_complete', JSON.stringify(finalData));
    
    // Update user as onboarded
    if (user) {
      const updatedUser = { ...user, isOnboarded: true };
      updateUser(updatedUser);
    }
    
    // Clear onboarding progress
    authUtils.clearOnboardingProgress();
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const steps = [
    {
      title: 'Tell us about your business',
      description: 'Help us understand your company and industry so we can provide personalized coaching.',
      component: (
        <BusinessProfileStep
          onNext={handleBusinessProfile}
          initialData={onboardingData.businessProfile}
        />
      )
    },
    {
      title: 'What are your goals?',
      description: 'Define the key objectives you want to achieve with business coaching.',
      component: (
        <GoalsAssessmentStep
          onNext={handleGoalsAssessment}
          onBack={handleBack}
          initialData={onboardingData.goals}
        />
      )
    },
    {
      title: 'Assess your leadership style',
      description: 'Understanding your leadership approach helps us tailor our coaching methods.',
      component: (
        <LeadershipStyleStep
          onNext={handleLeadershipStyle}
          onBack={handleBack}
          initialData={onboardingData.leadershipStyle}
        />
      )
    },
    {
      title: 'Prioritize your resource needs',
      description: 'Rank these business areas by importance to focus your coaching sessions.',
      component: (
        <ResourcePriorityStep
          onComplete={handleResourcePriorities}
          onBack={handleBack}
          initialData={onboardingData.resourcePriorities}
        />
      )
    }
  ];

  const currentStepData = steps[currentStep - 1];

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={4}
      title={currentStepData.title}
      description={currentStepData.description}
    >
      {currentStepData.component}
    </OnboardingLayout>
  );
};