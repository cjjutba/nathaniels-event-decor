import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminAuth } from '@/lib/auth';
import { PATHS } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAdminAuthenticated: boolean;
  adminLoginForm: {
    username: string;
    password: string;
  };
  setAdminLoginForm: React.Dispatch<React.SetStateAction<{
    username: string;
    password: string;
  }>>;
  adminLoginError: string;
  setAdminLoginError: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleAdminLogin: (username: string, password: string, navigate: (path: string) => void) => void;
  handleAdminLogout: (navigate: (path: string) => void) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminLoginForm, setAdminLoginForm] = useState({
    username: '',
    password: ''
  });
  const [adminLoginError, setAdminLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  // Check for existing admin session on mount
  useEffect(() => {
    const isAuthenticated = adminAuth.checkSession();
    setIsAdminAuthenticated(isAuthenticated);
  }, []);

  const handleAdminLogin = (username: string, password: string, navigate: (path: string) => void) => {
    console.log('Login attempt:', { username, password });
    const success = adminAuth.login(username, password);
    console.log('Login success:', success);

    if (success) {
      console.log('Setting authenticated to true');
      setIsAdminAuthenticated(true);
      setAdminLoginError('');
      // Clear the form after successful login
      setAdminLoginForm({ username: '', password: '' });

      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard!",
      });

      console.log('Navigating to dashboard');
      // Navigate immediately
      navigate(PATHS.ADMIN_DASHBOARD);
    } else {
      setAdminLoginError('Invalid credentials. Please try again.');
    }
  };

  const handleAdminLogout = (navigate: (path: string) => void) => {
    adminAuth.logout();
    setIsAdminAuthenticated(false);
    navigate(PATHS.ADMIN_LOGIN);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const value: AuthContextType = {
    isAdminAuthenticated,
    adminLoginForm,
    setAdminLoginForm,
    adminLoginError,
    setAdminLoginError,
    showPassword,
    setShowPassword,
    handleAdminLogin,
    handleAdminLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
