import { User, AuthState } from '../types';

const AUTH_KEY = 'coach_pro_auth';
const ONBOARDING_KEY = 'coach_pro_onboarding';

export const authUtils = {
  saveAuth: (user: User) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  },

  getAuth: (): User | null => {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  clearAuth: () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(ONBOARDING_KEY);
  },

  saveOnboardingProgress: (step: number, data: any) => {
    const existing = localStorage.getItem(ONBOARDING_KEY);
    const progress = existing ? JSON.parse(existing) : {};
    progress[step] = data;
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify(progress));
  },

  getOnboardingProgress: () => {
    const stored = localStorage.getItem(ONBOARDING_KEY);
    return stored ? JSON.parse(stored) : {};
  },

  clearOnboardingProgress: () => {
    localStorage.removeItem(ONBOARDING_KEY);
  }
};

export const validateInviteCode = (code: string): boolean => {
  // Mock validation - in production this would be an API call
  const validCodes = ['COACH2024', 'BETA2024', 'TRIAL2024'];
  return validCodes.includes(code.toUpperCase());
};

export const mockAuthApi = {
  login: async (email: string, password: string) => {
    // Mock API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'demo@coachpro.com' && password === 'demo123') {
      const user: User = {
        id: '1',
        email,
        firstName: 'Demo',
        lastName: 'User',
        role: 'client',
        isOnboarded: true,
        createdAt: new Date().toISOString()
      };
      return { data: user };
    }
    
    throw new Error('Invalid credentials');
  },

  signup: async (email: string, password: string, firstName: string, lastName: string, inviteCode: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!validateInviteCode(inviteCode)) {
      throw new Error('Invalid invite code');
    }
    
    const user: User = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      role: 'client',
      isOnboarded: false,
      createdAt: new Date().toISOString()
    };
    
    return { data: user };
  },

  resetPassword: async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { message: 'Password reset email sent' } };
  }
};