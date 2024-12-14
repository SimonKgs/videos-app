'use client';

import { create } from 'zustand';
import { login, logout, register, validateToken } from '../actions/auth/authActions';

interface AuthState {
  user: User | null;
  token: string | null;
  message: string | null; // Holds success or error messages
  loading: boolean, // Add loading state
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  validateToken: () => Promise<void>;
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
  loading: false,
  message: null,
  login: async (email, password) => {
    try {
      const { user, token, isAuthenticated, message } = await login(email, password);
      if (token) {
        localStorage.setItem('videos_token', token);
        localStorage.setItem('userId', user.id);
      }
      set({ user, token, isAuthenticated, message });
    } catch (error) {
      console.error('Login error:', error);
    }
  },
  /**
   * Logs out the current user.
   *
   * If the user is authenticated, it calls the logout action and removes the
   * user id and token from local storage. It then updates the user and
   * isAuthenticated state in the store.
   *
   * @remarks If the user is not authenticated, it does nothing.
   */
  logout: async () => {
    const { user } = useAuthStore.getState();
    if (user) {
      await logout(user.id);
    }
    localStorage.removeItem('videos_token');
    localStorage.removeItem('userId');

    set({ user: null, token: null, isAuthenticated: false });
  },
  /**
   * Registers a new user.
   *
   * @param name - The name of the new user.
   * @param email - The email of the new user.
   * @param password - The password of the new user.
   *
   * @returns A promise that resolves if the registration is successful and
   * rejects if there is an error.
   *
   * @remarks If the registration is successful, it will update the user and
   * isAuthenticated state in the store. If the registration fails, it will
   * set an error message in the store.
   */
  register: async (name, email, password) => {
    try {
      const response = await register(name, email, password);
      console.log('Response:', response);

      if (!response.ok) {
        set({ message: response.msg }); // Set error message
        return;
      }
  
      const { user, token } = response;

      if (token) {
        localStorage.setItem('videos_token', token);
        localStorage.setItem('userId', user.id);
      }

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
  /**
   * Validates the stored token in local storage and updates the user and
   * isAuthenticated state accordingly. If the token is invalid or has expired,
   * it removes the token and user id from local storage and sets the user and
   * isAuthenticated state to null and false respectively.
   */
  validateToken: async () => {
    set({ loading: true }); // Start loading

    const storedToken = localStorage.getItem('videos_token');
    const storedUserId = localStorage.getItem('userId');

    if (!storedToken || !storedUserId) {
      set({ isAuthenticated: false, user: null, token: null });
      return;
    }

    const result = await validateToken(storedToken);
    if (result.isAuthenticated && result.user?.id === storedUserId) {
      set({ user: result.user, isAuthenticated: true, token: storedToken });
    } else {
      set({ isAuthenticated: false, user: null, token: null });
      localStorage.removeItem('videos_token');
      localStorage.removeItem('userId');
    }

    set({ loading: false });
  },
  
}));
