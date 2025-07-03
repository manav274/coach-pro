import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Save, Download, Plus, X } from 'lucide-react';

interface CanvasSection {
  title: string;
  items: string[];
}

const initialCanvas: Record<string, CanvasSection> = {
  keyPartners: { title: 'Key Partners', items: [] },
  keyActivities: { title: 'Key Activities', items: [] },
  keyResources: { title: 'Key Resources', items: [] },
  valuePropositions: { title: 'Value Propositions', items: [] },
  customerRelationships: { title: 'Customer Relationships', items: [] },
  channels: { title: 'Channels', items: [] },
  customerSegments: { title: 'Customer Segments', items: [] },
  costStructure: { title: 'Cost Structure', items: [] },
  revenueStreams: { title: 'Revenue Streams', items: [] }
};

export const StrategyCanvas: React.FC = () => {
  const [canvas, setCanvas] = useState(initialCanvas);
  const [newItems, setNewItems] = useState<Record<string, string>>({});

  const addItem = (section: string) => {
    const newItem = newItems[section]?.trim();
    if (newItem) {
      setCanvas(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          items: [...prev[section].items, newItem]
        }
      }));
      setNewItems(prev => ({ ...prev, [section]: '' }));
    }
  };

  const removeItem = (section: string, index: number) => {
    setCanvas(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        items: prev[section].items.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSave = () => {
    const sessionData = {
      id: Date.now().toString(),
      type: 'strategy-canvas',
      title: 'Strategy Canvas Session',
      data: canvas,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const existingSessions = JSON.parse(localStorage.getItem('coach_pro_sessions') || '[]');
    localStorage.setItem('coach_pro_sessions', JSON.stringify([sessionData, ...existingSessions]));
    
    alert('Strategy canvas saved successfully!');
  };

  const CanvasSection: React.FC<{ sectionKey: string; section: CanvasSection }> = ({ sectionKey, section }) => (
    <Card className="h-full">
      <h3 className="font-semibold text-gray-900 mb-3 text-sm">{section.title}</h3>
      <div className="space-y-2 mb-3">
        {section.items.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
            <span>{item}</span>
            <button
              onClick={() => removeItem(sectionKey, index)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <Input
          placeholder="Add item..."
          value={newItems[sectionKey] || ''}
          onChange={(e) => setNewItems(prev => ({ ...prev, [sectionKey]: e.target.value }))}
          onKeyPress={(e) => e.key === 'Enter' && addItem(sectionKey)}
          className="text-sm"
        />
        <Button
          size="sm"
          onClick={() => addItem(sectionKey)}
          disabled={!newItems[sectionKey]?.trim()}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Business Model Canvas</h2>
          <p className="text-gray-600">Map out your business model visually</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Canvas
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 min-h-[600px]">
        {/* Left Column */}
        <div className="space-y-4">
          <CanvasSection sectionKey="keyPartners" section={canvas.keyPartners} />
          <CanvasSection sectionKey="keyActivities" section={canvas.keyActivities} />
          <CanvasSection sectionKey="keyResources" section={canvas.keyResources} />
        </div>

        {/* Second Column */}
        <div className="space-y-4">
          <CanvasSection sectionKey="valuePropositions" section={canvas.valuePropositions} />
        </div>

        {/* Third Column */}
        <div className="space-y-4">
          <CanvasSection sectionKey="customerRelationships" section={canvas.customerRelationships} />
          <CanvasSection sectionKey="channels" section={canvas.channels} />
        </div>

        {/* Fourth Column */}
        <div className="space-y-4">
          <CanvasSection sectionKey="customerSegments" section={canvas.customerSegments} />
        </div>

        {/* Bottom Row */}
        <div className="col-span-5 grid grid-cols-2 gap-4">
          <CanvasSection sectionKey="costStructure" section={canvas.costStructure} />
          <CanvasSection sectionKey="revenueStreams" section={canvas.revenueStreams} />
        </div>
      </div>
    </div>
  );
};