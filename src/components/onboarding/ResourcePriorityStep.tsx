import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';
import { Button } from '../ui/Button';
import { ResourcePriority } from '../../types';
import { resourceCategories } from '../../utils/mockData';

interface ResourcePriorityStepProps {
  onComplete: (data: ResourcePriority[]) => void;
  onBack: () => void;
  initialData?: ResourcePriority[];
}

export const ResourcePriorityStep: React.FC<ResourcePriorityStepProps> = ({
  onComplete,
  onBack,
  initialData = []
}) => {
  const [priorities, setPriorities] = useState<ResourcePriority[]>(
    initialData.length > 0 ? initialData : 
    resourceCategories.map((category, index) => ({
      category,
      priority: index + 1,
      reasoning: ''
    }))
  );

  const movePriority = (fromIndex: number, toIndex: number) => {
    const newPriorities = [...priorities];
    const [moved] = newPriorities.splice(fromIndex, 1);
    newPriorities.splice(toIndex, 0, moved);
    
    // Update priority numbers
    const updatedPriorities = newPriorities.map((item, index) => ({
      ...item,
      priority: index + 1
    }));
    
    setPriorities(updatedPriorities);
  };

  const updateReasoning = (category: string, reasoning: string) => {
    setPriorities(prev => prev.map(item =>
      item.category === category ? { ...item, reasoning } : item
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(priorities);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <p className="text-gray-600">
          Drag and drop to rank these resource areas by priority for your business (1 = highest priority)
        </p>
      </div>

      <div className="space-y-3">
        {priorities.map((item, index) => (
          <div
            key={item.category}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
                  {item.priority}
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  {item.category}
                </h4>
                <textarea
                  rows={2}
                  value={item.reasoning}
                  onChange={(e) => updateReasoning(item.category, e.target.value)}
                  placeholder="Why is this priority level appropriate for your business? (optional)"
                  className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <button
                  type="button"
                  onClick={() => index > 0 && movePriority(index, index - 1)}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => index < priorities.length - 1 && movePriority(index, index + 1)}
                  disabled={index === priorities.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ↓
                </button>
              </div>
            </div>
          </div>
        ))}
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
          size="lg"
        >
          Complete Onboarding
        </Button>
      </div>
    </form>
  );
};