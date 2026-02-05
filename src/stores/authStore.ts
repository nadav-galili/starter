import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthUser } from '@/repositories/interfaces/IAuthRepository';

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  setAuth: (user: AuthUser, token: string) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user: AuthUser, token: string) =>
        set({ user, token, isAuthenticated: true }),
      setToken: (token: string) => set({ token }),
      clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
