'use client';

import { create } from 'zustand';
import { login, register } from '../actions/auth/authActions';

interface AuthState {
  user: User | null;
  token: string | null;
  message: string | null; // Holds success or error messages
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  message: null,
  login: async (email, password) => {
    try {
      const { user, token, isAuthenticated, message } = await login(email, password);
      set({ user, token, isAuthenticated, message });
    } catch (error) {
      console.error('Login error:', error);
    }
  },
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
  register: async (name, email, password) => {
    try {
      const response = await register(name, email, password);
      console.log('Response:', response);

      if (!response.ok) {
        set({ message: response.msg }); // Set error message
        return;
      }
  
      const { user, token } = response;
      set({
        user, // Update user in the store
        token,
        isAuthenticated: true,
        message: response.msg, // Set success message
      });
    } catch (error) {
      set({ message: 'Unexpected error occurred during registration.' });
      console.error('Unexpected registration error:', error);
    }
  },
  
}));
