
import { useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  joinedAt: string;
  stats: {
    wins: number;
    losses: number;
    earnings: number;
  };
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage on mount
    const savedUser = localStorage.getItem('competecore_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('competecore_users') || '[]');
    const existingUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (existingUser) {
      const userWithoutPassword = { ...existingUser };
      delete userWithoutPassword.password;
      
      localStorage.setItem('competecore_user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = async (email: string, password: string, username: string): Promise<{ success: boolean; error?: string }> => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('competecore_users') || '[]');
    
    // Check if user already exists
    const existingUser = users.find((u: any) => u.email === email || u.username === username);
    if (existingUser) {
      return { success: false, error: 'User already exists with this email or username' };
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      username,
      joinedAt: new Date().toISOString(),
      stats: {
        wins: 0,
        losses: 0,
        earnings: 0
      }
    };
    
    // Save to users array
    users.push(newUser);
    localStorage.setItem('competecore_users', JSON.stringify(users));
    
    // Set current user (without password)
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    localStorage.setItem('competecore_user', JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);
    
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('competecore_user');
    setUser(null);
  };

  const getAllUsers = (): User[] => {
    const users = JSON.parse(localStorage.getItem('competecore_users') || '[]');
    return users.map((u: any) => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });
  };

  return {
    user,
    isLoading,
    login,
    signup,
    logout,
    getAllUsers,
    isAuthenticated: !!user
  };
};
