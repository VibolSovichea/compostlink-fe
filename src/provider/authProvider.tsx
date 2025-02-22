// TODO : redo the whole thing

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
  token: string | null;
  login: (token: string, userRole: UserRole, isNewUser: boolean) => void;
  logout: () => void;
  userRole: UserRole | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUserRole = Cookies.get('user_role');
      const savedToken = Cookies.get('access_token');
      if (savedToken) {
        setToken(savedToken);
      }

      if (savedUserRole) {
        setUserRole(savedUserRole as UserRole);
      }

    } catch (error) {
      console.error('Error loading auth state:', error);
      Cookies.remove('access_token');
      Cookies.remove('user_role');
    } finally {
      setIsLoading(false);
    }
  }, [token, isLoading]);

  const login = (newToken: string, userRole: UserRole, isNewUser: boolean = false) => {
    setToken(newToken);
    setUserRole(userRole);
    
    Cookies.set('access_token', newToken, { 
      secure: true,
      sameSite: 'strict',
      expires: 7
    });

    Cookies.set('user_role', userRole as UserRole, {
      secure: true,
      sameSite: 'strict',
      expires: 7
    });

    const redirectPath = isNewUser ? '/auth/congratulations' : userRole === 'User' ? '/userhome' : '/facilityhome';
    window.location.href = redirectPath;
  };  

  const logout = () => {
    setToken(null);
    Cookies.remove('access_token');
    Cookies.remove('user_role');
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoading, userRole }}>
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