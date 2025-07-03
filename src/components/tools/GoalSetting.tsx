import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Target, Calendar, Flag, Save } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  targetDate: string;
  progress: number;
  keyResults: string[];
}

export const GoalSetting: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium' as const,
    targetDate: '',
    keyResults: ['']
  });

  const addGoal = () => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      priority: formData.priority,
      targetDate: formData.targetDate,
      progress: 0,
      keyResults: formData.keyResults.filter(kr => kr.trim())
    };

    setGoals(prev => [newGoal, ...prev]);
    setFormData({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      targetDate: '',
      keyResults: ['']
    });
    setShowForm(false);
  };

  const updateProgress = (goalId: string, progress: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, progress } : goal
    ));
  };

  const addKeyResult = () => {
    setFormData(prev => ({
      ...prev,
      keyResults: [...prev.keyResults, '']
    }));
  };

  const updateKeyResult = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      keyResults: prev.keyResults.map((kr, i) => i === index ? value : kr)
    }));
  };

  const removeKeyResult = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keyResults: prev.keyResults.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    const sessionData = {
      id: Date.now().toString(),
      type: 'goal-setting',
      title: 'Goal Setting Session',
      data: { goals },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const existingSessions = JSON.parse(localStorage.getItem('coach_pro_sessions') || '[]');
    localStorage.setItem('coach_pro_sessions', JSON.stringify([sessionData, ...existingSessions]));
    
    alert('Goals saved successfully!');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Goal Setting Framework</h2>
          <p className="text-gray-600">Define and track your business objectives</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Session
          </Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <h3 className="text-lg font-semibold mb-4">Create New Goal</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Goal Title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Increase revenue by 30%"
              />
              <Input
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="Revenue, Operations, Team..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <Input
                label="Target Date"
                type="date"
                value={formData.targetDate}
                onChange={(e) => setFormData(prev => ({ ...prev, targetDate: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your goal and strategy..."
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Key Results</label>
              {formData.keyResults.map((kr, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <Input
                    value={kr}
                    onChange={(e) => updateKeyResult(index, e.target.value)}
                    placeholder="Measurable outcome..."
                  />
                  {formData.keyResults.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeKeyResult(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addKeyResult}>
                <Plus className="h-3 w-3 mr-1" />
                Add Key Result
              </Button>
            </div>

            <div className="flex space-x-3">
              <Button onClick={addGoal} disabled={!formData.title || !formData.description}>
                Create Goal
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <Card key={goal.id}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-indigo-600" />
                <h3 className="font-semibold text-gray-900">{goal.title}</h3>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(goal.priority)}`}>
                {goal.priority}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-3">{goal.description}</p>

            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center space-x-1">
                <Flag className="h-4 w-4" />
                <span>{goal.category}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(goal.targetDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={goal.progress}
                onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                className="w-full mt-2"
              />
            </div>

            {goal.keyResults.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Key Results:</h4>
                <ul className="space-y-1">
                  {goal.keyResults.map((kr, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                      <span>{kr}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>

      {goals.length === 0 && !showForm && (
        <Card className="text-center py-12">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No goals yet</h3>
          <p className="text-gray-600 mb-4">Start by creating your first business goal</p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Goal
          </Button>
        </Card>
      )}
    </div>
  );
};