import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { BusinessProfile } from '../../types';
import { industryOptions, companySizeOptions, businessStageOptions } from '../../utils/mockData';

interface BusinessProfileStepProps {
  onNext: (data: BusinessProfile) => void;
  initialData?: Partial<BusinessProfile>;
}

export const BusinessProfileStep: React.FC<BusinessProfileStepProps> = ({
  onNext,
  initialData = {}
}) => {
  const [formData, setFormData] = useState<BusinessProfile>({
    companyName: initialData.companyName || '',
    industry: initialData.industry || '',
    companySize: initialData.companySize || '',
    businessStage: initialData.businessStage || '',
    website: initialData.website || '',
    description: initialData.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const isValid = formData.companyName && formData.industry && formData.companySize && formData.businessStage;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Company Name *"
          name="companyName"
          type="text"
          required
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Acme Corporation"
        />

        <Input
          label="Website"
          name="website"
          type="url"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://example.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry *
          </label>
          <select
            name="industry"
            required
            value={formData.industry}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select industry</option>
            {industryOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Size *
          </label>
          <select
            name="companySize"
            required
            value={formData.companySize}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select size</option>
            {companySizeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Stage *
          </label>
          <select
            name="businessStage"
            required
            value={formData.businessStage}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select stage</option>
            {businessStageOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company Description
        </label>
        <textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder="Tell us about your company, its mission, and what makes it unique..."
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="flex justify-end">
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