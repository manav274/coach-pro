import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Goal } from '../../types';

interface GoalsAssessmentStepProps {
  onNext: (data: Goal[]) => void;
  onBack: () => void;
  initialData?: Goal[];
}

export const GoalsAssessmentStep: React.FC<GoalsAssessmentStepProps> = ({
  onNext,
  onBack,
  initialData = []
}) => {
  const [goals, setGoals] = useState<Goal[]>(
    initialData.length > 0 ? initialData : [
      {
        id: '1',
        title: '',
        description: '',
        priority: 'medium',
        category: '',
        targetDate: ''
      }
    ]
  );

  const addGoal = () => {
    setGoals(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title: '',
        description: '',
        priority: 'medium',
        category: '',
        targetDate: ''
      }
    ]);
  };

  const removeGoal = (id: string) => {
    if (goals.length > 1) {
      setGoals(prev => prev.filter(goal => goal.id !== id));
    }
  };

  const updateGoal = (id: string, field: keyof Goal, value: string) => {
    setGoals(prev => prev.map(goal =>
      goal.id === id ? { ...goal, [field]: value } : goal
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validGoals = goals.filter(goal => goal.title.trim() && goal.description.trim());
    onNext(validGoals);
  };

  const isValid = goals.some(goal => goal.title.trim() && goal.description.trim());

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        {goals.map((goal, index) => (
          <div key={goal.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Goal {index + 1}</h3>
              {goals.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeGoal(goal.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Goal Title *"
                value={goal.title}
                onChange={(e) => updateGoal(goal.id, 'title', e.target.value)}
                placeholder="Increase revenue by 30%"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={goal.priority}
                  onChange={(e) => updateGoal(goal.id, 'priority', e.target.value as 'high' | 'medium' | 'low')}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Category"
                value={goal.category}
                onChange={(e) => updateGoal(goal.id, 'category', e.target.value)}
                placeholder="Revenue, Operations, Team..."
              />

              <Input
                label="Target Date"
                type="date"
                value={goal.targetDate}
                onChange={(e) => updateGoal(goal.id, 'targetDate', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                rows={3}
                value={goal.description}
                onChange={(e) => updateGoal(goal.id, 'description', e.target.value)}
                placeholder="Describe your goal and how you plan to achieve it..."
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={addGoal}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Another Goal</span>
        </Button>
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