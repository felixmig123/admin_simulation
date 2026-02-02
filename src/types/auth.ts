import type { User } from './models';

export interface LoginCredentials {
  username: string;
  password?: string;
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
