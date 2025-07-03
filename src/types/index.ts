export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'coach' | 'admin' | 'client';
  isOnboarded: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface BusinessProfile {
  companyName: string;
  industry: string;
  companySize: string;
  businessStage: string;
  website?: string;
  description?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  targetDate?: string;
  category: string;
}

export interface LeadershipStyle {
  dominantStyle: string;
  strengths: string[];
  developmentAreas: string[];
  communicationPreference: string;
}

export interface ResourcePriority {
  category: string;
  priority: number;
  reasoning: string;
}

export interface OnboardingData {
  businessProfile: BusinessProfile;
  goals: Goal[];
  leadershipStyle: LeadershipStyle;
  resourcePriorities: ResourcePriority[];
}

export interface CoachingSession {
  id: string;
  type: 'strategy-canvas' | 'goal-setting' | 'leadership' | 'team-alignment' | 'business-model';
  title: string;
  data: any;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}