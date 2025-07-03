import React from 'react';
import { User, CheckCircle, Circle } from 'lucide-react';

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
  children: React.ReactNode;
}

const steps = [
  'Business Profile',
  'Goals Assessment',
  'Leadership Style',
  'Resource Priorities'
];

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  currentStep,
  totalSteps,
  title,
  description,
  children
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">CoachPro</span>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="flex items-center justify-center">
            <ol className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <li key={index} className="flex items-center">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center">
                      {index + 1 < currentStep ? (
                        <CheckCircle className="h-6 w-6 text-indigo-600" />
                      ) : index + 1 === currentStep ? (
                        <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center">
                          <span className="text-white text-sm font-medium">{index + 1}</span>
                        </div>
                      ) : (
                        <Circle className="h-6 w-6 text-gray-300" />
                      )}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      index + 1 <= currentStep ? 'text-indigo-600' : 'text-gray-500'
                    }`}>
                      {step}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="ml-4 h-0.5 w-16 bg-gray-300" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-8 sm:px-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="mt-2 text-gray-600">{description}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};