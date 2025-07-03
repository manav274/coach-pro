import { CoachingSession, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'client',
    isOnboarded: true,
    createdAt: '2024-01-15T09:00:00Z',
    lastLogin: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    email: 'sarah.johnson@example.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'coach',
    isOnboarded: true,
    createdAt: '2024-01-10T10:15:00Z',
    lastLogin: '2024-01-20T09:45:00Z'
  },
  {
    id: '3',
    email: 'mike.chen@example.com',
    firstName: 'Mike',
    lastName: 'Chen',
    role: 'client',
    isOnboarded: false,
    createdAt: '2024-01-18T16:20:00Z'
  }
];

export const mockSessions: CoachingSession[] = [
  {
    id: '1',
    type: 'strategy-canvas',
    title: 'Q1 Strategy Planning',
    data: {
      keyPartners: ['Suppliers', 'Technology Partners'],
      keyActivities: ['Product Development', 'Marketing'],
      valuePropositions: ['Innovation', 'Customer Service'],
      customerRelationships: ['Personal Assistance'],
      customerSegments: ['SMB', 'Enterprise'],
      keyResources: ['Human Capital', 'Technology'],
      channels: ['Online', 'Direct Sales'],
      costStructure: ['Development Costs', 'Marketing'],
      revenueStreams: ['Subscription', 'Consulting']
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T11:30:00Z'
  },
  {
    id: '2',
    type: 'goal-setting',
    title: 'Q1 Goals Framework',
    data: {
      vision: 'Become the leading business coaching platform',
      objectives: [
        {
          title: 'Increase Revenue',
          description: 'Achieve 30% revenue growth',
          priority: 'high',
          targetDate: '2024-03-31',
          keyResults: ['$500K ARR', '100 new clients', '95% retention']
        }
      ]
    },
    createdAt: '2024-01-12T14:00:00Z',
    updatedAt: '2024-01-12T15:45:00Z'
  }
];

export const industryOptions = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Real Estate',
  'Consulting',
  'Other'
];

export const companySizeOptions = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '500+ employees'
];

export const businessStageOptions = [
  'Startup (0-2 years)',
  'Growth (3-5 years)',
  'Established (6-10 years)',
  'Mature (10+ years)'
];

export const leadershipStyleOptions = [
  'Transformational',
  'Transactional',
  'Servant',
  'Authentic',
  'Democratic',
  'Autocratic',
  'Laissez-faire'
];

export const resourceCategories = [
  'Financial Management',
  'Marketing & Sales',
  'Operations',
  'Human Resources',
  'Technology',
  'Product Development',
  'Customer Service',
  'Strategic Planning'
];