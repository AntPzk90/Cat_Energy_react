import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/services/api';
import type { UserI, UserWithPasswordI } from '@/types';

const STORAGE_KEY = 'cat-energy-user';

interface AuthStateI {
  user: UserI | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (
    email: string,
    password: string,
    name: string,
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthStateI>()(
  persist(
    (set) => ({
      user: null,

      login: async (email, password) => {
        const users = await api.get<UserWithPasswordI[]>(
          `/users?email:eq=${encodeURIComponent(email)}`,
        );

        const found = users[0];

        if (!found || found.password !== password) {
          return { success: false, message: 'Неверный email или пароль' };
        }

        const safeUser: UserI = { id: found.id, email: found.email, name: found.name };
        set({ user: safeUser });

        return { success: true };
      },

      register: async (email, password, name) => {
        const existing = await api.get<UserWithPasswordI[]>(
          `/users?email:eq=${encodeURIComponent(email)}`,
        );

        if (existing.length > 0) {
          return { success: false, message: 'Пользователь с таким email уже существует' };
        }

        const created = await api.post<UserWithPasswordI>('/users', { email, password, name });

        const safeUser: UserI = { id: created.id, email: created.email, name: created.name };
        set({ user: safeUser });

        return { success: true };
      },

      logout: () => set({ user: null }),
    }),
    { name: STORAGE_KEY },
  ),
);

export const selectIsAuthenticated = (state: AuthStateI) => !!state.user;
