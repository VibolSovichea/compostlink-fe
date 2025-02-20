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
  login: (token: string, userData: User, isSignUp?: boolean) => void;
  updateRole: (newRole: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedToken = Cookies.get('token');
      const savedUserStr = Cookies.get('user');
      
      if (savedToken && savedUserStr) {
        setToken(savedToken);
        setUser(JSON.parse(savedUserStr));
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      // Clear potentially corrupted cookies
      Cookies.remove('token');
      Cookies.remove('user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (newToken: string, userData: User, isSignUp: boolean = false) => {
    setToken(newToken);
    setUser(userData);
    
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

    // For new signups, go to role selection
    if (isSignUp) {
      window.location.href = '/roleselection';
    } else {
      // For regular login, go to appropriate home
      const homePath = userData.role === 'User' ? '/userhome' : '/facilityhome';
      window.location.href = homePath;
    }
  };

  const updateRole = async (newRole: UserRole) => {
    if (!user?.id || !token) return;

    try {
      const response = await fetch(`http://localhost:5550/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      Cookies.set('user', JSON.stringify(updatedUser), {
        secure: true,
        sameSite: 'strict',
        expires: 7
      });

      // Redirect based on role choice
      if (newRole === 'Facility') {
        window.location.href = '/facilityform';
      } else {
        window.location.href = '/congratulations';
      }
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    Cookies.remove('token');
    Cookies.remove('user');
    window.location.href = '/signin';
  };

  return (
    <AuthContext.Provider value={{ user, token, login, updateRole, logout, isLoading }}>
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