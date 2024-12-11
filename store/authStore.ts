import { create } from 'zustand';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (email, password) => {
    // TODO: Validate email and password and return the token
    const user = { id: '1', name: 'John Doe', email, password };
    const token = 'abc123';
    set({ user, token, isAuthenticated: true })
  },
  logout: () => 
    set({ user: null, token: null, isAuthenticated: false }),
}));
