
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'Free' | 'Pro' | 'Business';
  status: 'Active' | 'Inactive';
  createdAt: Date;
}

interface UserContextType {
  users: User[];
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUser: (id: string) => User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  // Load users from localStorage on mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('cardcraft_users');
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      const formattedUsers = parsedUsers.map((user: any) => ({
        ...user,
        createdAt: new Date(user.createdAt)
      }));
      setUsers(formattedUsers);
    }
  }, []);

  // Save users to localStorage whenever users changes
  useEffect(() => {
    if (users.length > 0) {
      const usersToSave = users.map(user => ({
        ...user,
        createdAt: user.createdAt.toISOString()
      }));
      localStorage.setItem('cardcraft_users', JSON.stringify(usersToSave));
    }
  }, [users]);

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, updatedData: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...updatedData } : user
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const getUser = (id: string) => {
    return users.find(user => user.id === id);
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
