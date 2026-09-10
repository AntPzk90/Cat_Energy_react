// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';
import { api } from '@/services/api';
import type { UserI, UserWithPasswordI } from '@/types';

const STORAGE_KEY = 'cat-energy-user';

interface AuthContextValueI {
  user: UserI | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (
    email: string,
    password: string,
    name: string,
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValueI | null>(null);

const readUserFromStorage = (): UserI | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserI | null>(readUserFromStorage);

  const login: AuthContextValueI['login'] = async (email, password) => {
    const users = await api.get<UserWithPasswordI[]>(
      `/users?email:eq=${encodeURIComponent(email)}`,
    );

    const found = users[0];

    if (!found || found.password !== password) {
      return { success: false, message: 'Неверный email или пароль' };
    }

    const { password: _password, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));

    return { success: true };
  };

  const register: AuthContextValueI['register'] = async (email, password, name) => {
    const existing = await api.get<UserWithPasswordI[]>(
      `/users?email:eq=${encodeURIComponent(email)}`,
    );

    if (existing.length > 0) {
      return { success: false, message: 'Пользователь с таким email уже существует' };
    }

    const created = await api.post<UserWithPasswordI>('/users', { email, password, name });

    const { password: _password, ...safeUser } = created;
    setUser(safeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри <AuthProvider>');
  }
  return context;
}
