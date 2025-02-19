"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

type UserRole = 'User' | 'Facility';

interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  role: UserRole;
  totalPoint?: number;
  badges?: Array<{ level: string; rank: string; }>;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check both localStorage and cookies
    const savedToken = localStorage.getItem('token') || Cookies.get('token');
    const savedUser = localStorage.getItem('user') || Cookies.get('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(typeof savedUser === 'string' ? JSON.parse(savedUser) : savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    
    Cookies.set('token', newToken, { 
      secure: true,
      sameSite: 'strict',
      expires: 7
    });
    Cookies.set('user', JSON.stringify(userData), {
      secure: true,
      sameSite: 'strict',
      expires: 7
    });
    
    const redirectPath = userData.role === 'User' ? '/userhome' : '/facilityhome';
    window.location.href = redirectPath;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    Cookies.remove('token');
    Cookies.remove('user');
    
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};