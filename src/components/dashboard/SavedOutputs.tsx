import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Download, 
  Eye, 
  MoreHorizontal,
  FileText,
  Image,
  BarChart
} from 'lucide-react';

const savedOutputs = [
  {
    id: '1',
    title: 'Q1 Strategy Canvas',
    type: 'PDF',
    size: '2.4 MB',
    date: '2024-01-15',
    icon: FileText,
    preview: 'Strategy canvas with key partnerships and value propositions'
  },
  {
    id: '2',
    title: 'Leadership Assessment',
    type: 'Chart',
    size: '1.1 MB',
    date: '2024-01-12',
    icon: BarChart,
    preview: 'Comprehensive leadership style analysis and recommendations'
  },
  {
    id: '3',
    title: 'Team Alignment Matrix',
    type: 'Image',
    size: '896 KB',
    date: '2024-01-10',
    icon: Image,
    preview: 'Visual representation of team roles and responsibilities'
  }
];

export const SavedOutputs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Saved Outputs</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/sessions')}
        >
          Manage all outputs
        </Button>
      </div>

      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Output
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {savedOutputs.map((output) => {
              const Icon = output.icon;
              return (
                <tr key={output.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Icon className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {output.title}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {output.preview}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {output.type}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(output.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};