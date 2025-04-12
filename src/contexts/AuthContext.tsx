
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, name: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Admin emails list (hardcoded for MVP)
const ADMIN_EMAILS = ['admin@igdtuw.ac.in'];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (err) {
        console.error('Failed to parse stored user data', err);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const validateEmail = (email: string): boolean => {
    // Validate email is from igdtuw.ac.in domain
    const emailRegex = /^[a-zA-Z0-9._%+-]+@igdtuw\.ac\.in$/;
    return emailRegex.test(email);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Validate email is from igdtuw.ac.in domain
      if (!validateEmail(email)) {
        toast.error("Only IGDTUW email addresses (@igdtuw.ac.in) are allowed");
        return false;
      }

      // For MVP, simulate backend validation with mock data
      // In production, this would be an API call to backend
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if admin
      const isAdmin = ADMIN_EMAILS.includes(email);
      
      // Create user object
      const userData: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0], // Just use email prefix as name for now
        isAdmin
      };
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      toast.success(`Welcome back, ${userData.name}!`);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, name: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Validate email is from igdtuw.ac.in domain
      if (!validateEmail(email)) {
        toast.error("Only IGDTUW email addresses (@igdtuw.ac.in) are allowed");
        return false;
      }

      // For MVP, simulate backend validation with mock data
      // In production, this would be an API call to backend
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if admin
      const isAdmin = ADMIN_EMAILS.includes(email);
      
      // Create user object
      const userData: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        isAdmin
      };
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      toast.success(`Welcome to IGDTUW Connect Hub, ${name}!`);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error("Signup failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success("You've been logged out");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
