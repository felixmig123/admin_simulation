export type Permission = 
  | 'users.view' | 'users.create' | 'users.edit' | 'users.delete'
  | 'roles.view' | 'roles.create' | 'roles.edit' | 'roles.delete'
  | 'products.view' | 'products.create' | 'products.edit' | 'products.delete'
  | 'categories.view' | 'categories.create' | 'categories.edit' | 'categories.delete'
  | 'database.view' | 'database.manage';

export interface User {
  id: string;
  username: string;
  email: string;
  roleId: string;
  status: 'active' | 'inactive' | 'offline';
  lastActive?: string;
  avatarUrl?: string;
  password?: string;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  userCount: number;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  productCount: number;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  categoryId: string;
  imageUrl?: string;
  createdAt?: string;
}
