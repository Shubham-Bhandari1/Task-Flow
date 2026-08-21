'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { api, getToken, setToken, clearToken } from '@/lib/api';
import { User } from '@/lib/types';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  loginAsGuest: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const USER_KEY = 'taskflow-user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    api
      .get<User>('/auth/me')
      .then((profile) => {
        window.localStorage.setItem(USER_KEY, JSON.stringify(profile));
        setUser(profile);
      })
      .catch(() => {
        clearToken();
        window.localStorage.removeItem(USER_KEY);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const loginAsGuest = async () => {
    const result = await api.post<{ accessToken: string; user: User }>('/auth/guest');
    setToken(result.accessToken);
    window.localStorage.setItem(USER_KEY, JSON.stringify(result.user));
    setUser(result.user);
    router.push('/tasks');
  };

  const logout = () => {
    clearToken();
    window.localStorage.removeItem(USER_KEY);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
