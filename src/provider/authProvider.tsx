// TODO : redo the whole thing

"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  totalPoint: number;
}

export type UserRole = 'User' | 'Facility';

interface AuthContextType {
  token: string | null;
  login: (token: string, userRole: User, isNewUser: boolean) => void;
  logout: () => void;
  userRole: UserRole | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUserRole = Cookies.get('user_role');
      const savedToken = Cookies.get('access_token');
      const savedUserId = Cookies.get('user_id');
      if (savedToken) {
        setToken(savedToken);
      }

      if (savedUserRole) {
        setUserRole(savedUserRole as UserRole);
      }

      if (savedUserId) {
        setUserId(savedUserId);
      }

    } catch (error) {
      console.error('Error loading auth state:', error);
      Cookies.remove('access_token');
      Cookies.remove('user_role');
      Cookies.remove('user_id');
    } finally {
      setIsLoading(false);
    }
  }, [token, isLoading]);

  const login = (newToken: string, userRole: User, isNewUser: boolean = false) => {
    setToken(newToken);
    setUserRole(userRole.role);
    setUserId(userRole.id);
    Cookies.set('access_token', newToken, { 
      secure: true,
      sameSite: 'strict',
      expires: 7
    });

    Cookies.set('user_role', userRole.role, {
      secure: true,
      sameSite: 'strict',
      expires: 7
    });

    Cookies.set('user_id', userRole.id, {
      secure: true,
      sameSite: 'strict',
      expires: 7
    });

    const redirectPath = isNewUser ? '/auth/congratulations' : userRole.role === 'User' ? '/userhome' : '/facilityhome';
    window.location.href = redirectPath;
  };  

  const logout = () => {
    setToken(null);
    Cookies.remove('access_token');
    Cookies.remove('user_role');
    Cookies.remove('user_id');
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ token, login , logout, isLoading, userRole }}>
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