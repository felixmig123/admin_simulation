import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth'; // Removed User from here
import type { User } from '../types/models'; // Use the main User model
import { localStorageService, STORAGE_KEYS } from './localStorageService';

const STORAGE_KEY_USER = 'admin_sim_user';
const STORAGE_KEY_TOKEN = 'admin_sim_token';

// Mock delay to simulate network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(800);
    
    // DEMO Logic: Accept any login that matches 'admin' or has a valid format
    // Real Logic: Check against 'users' in localStorage
    const users = localStorageService.getAll<User>(STORAGE_KEYS.USERS);
    const user = users.find(u => 
        (u.username.toLowerCase() === credentials.username.toLowerCase() || u.email === credentials.username) && 
        (u.password === credentials.password || credentials.password === 'admin') // Allow 'admin' backdoor for demo ease, or remove
    );

    if (user) {
        // Persist session
        const token = `jwt-${user.id}-${Date.now()}`;
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
        localStorage.setItem(STORAGE_KEY_TOKEN, token);
        
        return { user, token };
    }
    
    throw new Error('Invalid credentials');
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    await delay(1000);
    
    // Create a robust user object compatible with models.User
    const newUser: any = {
        id: `u-${Date.now()}`,
        username: credentials.username,
        email: credentials.email,
        roleId: 'user', // Default role
        status: 'active',
        password: credentials.password,
        createdAt: new Date().toISOString().split('T')[0],
        avatarUrl: `https://ui-avatars.com/api/?name=${credentials.username}&background=random`
    };

    // Save to global users list
    localStorageService.add(STORAGE_KEYS.USERS, newUser);

    // Set current session
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    localStorage.setItem(STORAGE_KEY_TOKEN, `mock-jwt-token-${Date.now()}`);

    return { user: newUser, token: `mock-jwt-token-${Date.now()}` };
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
