import type { User, Role, Category, Product } from '../types/models';

export const mockRoles: Role[] = [
  {
    id: 'role-admin',
    name: 'Administrator',
    description: 'Full access to all system resources',
    permissions: [
      'users.view', 'users.create', 'users.edit', 'users.delete',
      'roles.view', 'roles.create', 'roles.edit', 'roles.delete',
      'products.view', 'products.create', 'products.edit', 'products.delete',
      'categories.view', 'categories.create', 'categories.edit', 'categories.delete',
      'database.view', 'database.manage'
    ],
    userCount: 2,
    updatedAt: '2023-11-01'
  },
  {
    id: 'role-editor',
    name: 'Editor',
    description: 'Can manage content but not users or system settings',
    permissions: [
      'products.view', 'products.create', 'products.edit',
      'categories.view', 'categories.create', 'categories.edit'
    ],
    userCount: 5,
    updatedAt: '2023-10-28'
  },
  {
    id: 'role-viewer',
    name: 'Viewer',
    description: 'Read-only access',
    permissions: [
      'products.view', 'categories.view'
    ],
    userCount: 12,
    updatedAt: '2023-10-15'
  }
];

export const mockUsers: User[] = [
  {
    id: 'u-1',
    username: 'admin',
    email: 'admin@example.com',
    roleId: 'role-admin',
    status: 'active',
    lastActive: 'Now',
    avatarUrl: 'https://ui-avatars.com/api/?name=Admin+User&background=11d4b4&color=fff',
    password: 'admin',
    createdAt: '2023-01-01'
  },
  {
    id: 'u-2',
    username: 'jdoe',
    email: 'john.doe@example.com',
    roleId: 'role-editor',
    status: 'offline',
    lastActive: '2 hours ago',
    avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
    password: 'user',
    createdAt: '2023-05-12'
  },
  {
    id: 'u-3',
    username: 'asmith',
    email: 'alice.smith@example.com',
    roleId: 'role-viewer',
    status: 'active',
    lastActive: '5 mins ago',
    avatarUrl: 'https://ui-avatars.com/api/?name=Alice+Smith&background=random',
    password: 'user',
    createdAt: '2023-06-20'
  }
];

export const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Electronics', productCount: 120, createdAt: '2023-01-15' },
  { id: 'cat-2', name: 'Clothing', productCount: 350, createdAt: '2023-02-10' },
  { id: 'cat-3', name: 'Home & Garden', productCount: 85, createdAt: '2023-03-05' },
  { id: 'cat-4', name: 'Books', productCount: 210, createdAt: '2023-01-20' },
  { id: 'cat-5', name: 'Toys', productCount: 95, createdAt: '2023-04-12' }
];

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Wireless Headphones',
    description: 'High quality noise cancelling headphones',
    price: 199.99,
    stock: 45,
    status: 'in_stock',
    categoryId: 'cat-1',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    createdAt: '2023-08-01'
  },
  {
    id: 'prod-2',
    name: 'Cotton T-Shirt',
    description: '100% Organic Cotton basic tee',
    price: 24.50,
    stock: 12,
    status: 'low_stock',
    categoryId: 'cat-2',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60',
    createdAt: '2023-08-05'
  },
  {
    id: 'prod-3',
    name: 'Smart Watch',
    description: 'Fitness tracker and smartwatch',
    price: 149.00,
    stock: 0,
    status: 'out_of_stock',
    categoryId: 'cat-1',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
    createdAt: '2023-09-10'
  },
  {
    id: 'prod-4',
    name: 'Gaming Laptop',
    description: 'High performance gaming laptop',
    price: 1299.99,
    stock: 8,
    status: 'low_stock',
    categoryId: 'cat-1',
    imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&auto=format&fit=crop&q=60',
    createdAt: '2023-07-22'
  },
  {
    id: 'prod-5',
    name: 'Ceramic Vase',
    description: 'Handcrafted ceramic vase',
    price: 45.00,
    stock: 30,
    status: 'in_stock',
    categoryId: 'cat-3',
    imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=500&auto=format&fit=crop&q=60',
    createdAt: '2023-06-15'
  }
];
