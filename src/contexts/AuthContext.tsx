
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'individual' | 'business' | 'superadmin';
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string, role: 'individual' | 'superadmin') => boolean;
  signup: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('cardcraft_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string, role: 'individual' | 'superadmin'): boolean => {
    // Check for admin credentials
    if (email === "admin@gmail.com" && password === "PASSWORD") {
      const adminUser: AuthUser = {
        id: 'admin-1',
        email: email,
        name: 'Admin User',
        role: 'superadmin'
      };
      setUser(adminUser);
      localStorage.setItem('cardcraft_user', JSON.stringify(adminUser));
      return true;
    }

    // Check for existing users in localStorage
    const usersData = localStorage.getItem('cardcraft_users');
    const users = usersData ? JSON.parse(usersData) : [];
    
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    if (foundUser) {
      const authUser: AuthUser = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: role
      };
      setUser(authUser);
      localStorage.setItem('cardcraft_user', JSON.stringify(authUser));
      return true;
    }

    return false;
  };

  const signup = (email: string, password: string, name: string): boolean => {
    // Check if user already exists
    const usersData = localStorage.getItem('cardcraft_users');
    const users = usersData ? JSON.parse(usersData) : [];
    
    if (users.find((u: any) => u.email === email)) {
      return false; // User already exists
    }

    // Create new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password,
      name,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('cardcraft_users', JSON.stringify(users));

    // Auto login the new user
    const authUser: AuthUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: 'individual'
    };
    setUser(authUser);
    localStorage.setItem('cardcraft_user', JSON.stringify(authUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cardcraft_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
