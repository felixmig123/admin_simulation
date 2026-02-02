export interface User {
  id: string;
  username: string;
  email: string;
  roleId: string;
  avatarUrl?: string;
  bio?: string;
}

export interface LoginCredentials {
  username: string;
  password?: string; // Optional if just for type shape
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
