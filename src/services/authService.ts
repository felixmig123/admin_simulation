import type { LoginCredentials, RegisterCredentials, User, AuthResponse } from '../types/auth';

const STORAGE_KEY_USER = 'admin_sim_user';
const STORAGE_KEY_TOKEN = 'admin_sim_token';

// Mock delay to simulate network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(800);
    
    // DEMO Logic: Accept any login that matches 'admin' or has a valid format
    // In a real mock, we would check against 'users' in localStorage
    if (credentials.username.toLowerCase() === 'admin' || credentials.username === 'demo') {
        const user: User = {
            id: 'u-1',
            username: 'Admin User',
            email: 'admin@example.com',
            roleId: 'admin',
            avatarUrl: 'https://cdn.usegalileo.ai/sdxl10/60070502-39bd-4aff-b2e5-3924df502570.png'
        };
        
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
        localStorage.setItem(STORAGE_KEY_TOKEN, 'mock-jwt-token-12345');
        
        return { user, token: 'mock-jwt-token-12345' };
    }
    
    throw new Error('Invalid credentials');
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    await delay(1000);
    
    const user: User = {
        id: `u-${Date.now()}`,
        username: credentials.username,
        email: credentials.email,
        roleId: 'user', // Default role
        avatarUrl: `https://ui-avatars.com/api/?name=${credentials.username}&background=random`
    };

    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEY_TOKEN, `mock-jwt-token-${Date.now()}`);

    return { user, token: `mock-jwt-token-${Date.now()}` };
  },

  logout: async (): Promise<void> => {
    await delay(300);
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem(STORAGE_KEY_USER);
    if (!userStr) return null;
    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(STORAGE_KEY_TOKEN);
  }
};
