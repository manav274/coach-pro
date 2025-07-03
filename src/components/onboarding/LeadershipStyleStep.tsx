import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { LeadershipStyle } from '../../types';
import { leadershipStyleOptions } from '../../utils/mockData';

interface LeadershipStyleStepProps {
  onNext: (data: LeadershipStyle) => void;
  onBack: () => void;
  initialData?: Partial<LeadershipStyle>;
}

const strengthOptions = [
  'Strategic Thinking',
  'Communication',
  'Team Building',
  'Decision Making',
  'Problem Solving',
  'Empathy',
  'Adaptability',
  'Vision Setting',
  'Delegation',
  'Conflict Resolution'
];

const developmentOptions = [
  'Public Speaking',
  'Delegation',
  'Time Management',
  'Emotional Intelligence',
  'Strategic Planning',
  'Financial Acumen',
  'Change Management',
  'Team Motivation',
  'Performance Management',
  'Innovation'
];

const communicationOptions = [
  'Direct and Concise',
  'Collaborative Discussion',
  'Written Communication',
  'Visual Presentations',
  'One-on-One Meetings',
  'Group Meetings',
  'Informal Check-ins'
];

export const LeadershipStyleStep: React.FC<LeadershipStyleStepProps> = ({
  onNext,
  onBack,
  initialData = {}
}) => {
  const [formData, setFormData] = useState<LeadershipStyle>({
    dominantStyle: initialData.dominantStyle || '',
    strengths: initialData.strengths || [],
    developmentAreas: initialData.developmentAreas || [],
    communicationPreference: initialData.communicationPreference || ''
  });

  const handleStyleChange = (style: string) => {
    setFormData(prev => ({ ...prev, dominantStyle: style }));
  };

  const handleStrengthToggle = (strength: string) => {
    setFormData(prev => ({
      ...prev,
      strengths: prev.strengths.includes(strength)
        ? prev.strengths.filter(s => s !== strength)
        : [...prev.strengths, strength]
    }));
  };

  const handleDevelopmentToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      developmentAreas: prev.developmentAreas.includes(area)
        ? prev.developmentAreas.filter(a => a !== area)
        : [...prev.developmentAreas, area]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const isValid = formData.dominantStyle && formData.strengths.length > 0 && 
                  formData.developmentAreas.length > 0 && formData.communicationPreference;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          What best describes your leadership style?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {leadershipStyleOptions.map(style => (
            <label
              key={style}
              className={`
                relative flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50
                ${formData.dominantStyle === style ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}
              `}
            >
              <input
                type="radio"
                name="dominantStyle"
                value={style}
                checked={formData.dominantStyle === style}
                onChange={(e) => handleStyleChange(e.target.value)}
                className="sr-only"
              />
              <span className="text-sm font-medium text-gray-900">{style}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Select your top strengths (choose 3-5)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {strengthOptions.map(strength => (
            <label
              key={strength}
              className={`
                relative flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50
                ${formData.strengths.includes(strength) ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}
              `}
            >
              <input
                type="checkbox"
                checked={formData.strengths.includes(strength)}
                onChange={() => handleStrengthToggle(strength)}
                className="sr-only"
              />
              <span className="text-sm text-gray-900">{strength}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Areas for development (choose 2-4)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {developmentOptions.map(area => (
            <label
              key={area}
              className={`
                relative flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50
                ${formData.developmentAreas.includes(area) ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}
              `}
            >
              <input
                type="checkbox"
                checked={formData.developmentAreas.includes(area)}
                onChange={() => handleDevelopmentToggle(area)}
                className="sr-only"
              />
              <span className="text-sm text-gray-900">{area}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Preferred communication style
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {communicationOptions.map(option => (
            <label
              key={option}
              className={`
                relative flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50
                ${formData.communicationPreference === option ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}
              `}
            >
              <input
                type="radio"
                name="communicationPreference"
                value={option}
                checked={formData.communicationPreference === option}
                onChange={(e) => setFormData(prev => ({ ...prev, communicationPreference: e.target.value }))}
                className="sr-only"
              />
              <span className="text-sm text-gray-900">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={!isValid}
          size="lg"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};