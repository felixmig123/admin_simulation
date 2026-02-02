import { mockRoles, mockUsers, mockCategories, mockProducts } from '../data/mockData';

export const STORAGE_KEYS = {
  USERS: 'admin_sim_users',
  ROLES: 'admin_sim_roles',
  CATEGORIES: 'admin_sim_categories',
  PRODUCTS: 'admin_sim_products',
};

// Generic type constraint for items with an ID attribute
interface Identifiable {
  id: string;
}

class LocalStorageService {
  
  // Initialize storage with mock data if empty
  initialize() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      this.setItem(STORAGE_KEYS.USERS, mockUsers);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ROLES)) {
      this.setItem(STORAGE_KEYS.ROLES, mockRoles);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      this.setItem(STORAGE_KEYS.CATEGORIES, mockCategories);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      this.setItem(STORAGE_KEYS.PRODUCTS, mockProducts);
    }
  }

  // --- Generic CRUD Operations ---

  getItem<T>(key: string): T[] {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (e) {
      console.error(`Error reading ${key} from localStorage`, e);
      return [];
    }
  }

  setItem<T>(key: string, value: T[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error writing ${key} to localStorage`, e);
    }
  }

  getAll<T>(key: string): T[] {
    return this.getItem<T>(key);
  }

  getById<T extends Identifiable>(key: string, id: string): T | undefined {
    const items = this.getItem<T>(key);
    return items.find((item) => item.id === id);
  }

  add<T extends Identifiable>(key: string, newItem: T): T {
    const items = this.getItem<T>(key);
    // Simple verification to prevent duplicates (optional)
    if (items.some((i) => i.id === newItem.id)) {
        throw new Error(`Item with id ${newItem.id} already exists`);
    }
    const updatedItems = [...items, newItem];
    this.setItem(key, updatedItems);
    return newItem;
  }

  update<T extends Identifiable>(key: string, id: string, updates: Partial<T>): T {
    const items = this.getItem<T>(key);
    const index = items.findIndex((item) => item.id === id);
    
    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }

    const updatedItem = { ...items[index], ...updates };
    items[index] = updatedItem;
    this.setItem(key, items);
    return updatedItem;
  }

  delete<T extends Identifiable>(key: string, id: string): void {
    const items = this.getItem<T>(key);
    const updatedItems = items.filter((item) => item.id !== id);
    this.setItem(key, updatedItems);
  }

  // --- Reset Functionality ---
  resetDatabase() {
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.ROLES);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    this.initialize();
  }
}

export const localStorageService = new LocalStorageService();
