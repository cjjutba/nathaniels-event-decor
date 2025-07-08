import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminAuth } from '@/lib/auth';
import { PATHS } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAdminAuthenticated: boolean;
  isSessionLoading: boolean;
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
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [adminLoginForm, setAdminLoginForm] = useState({
    username: '',
    password: ''
  });
  const [adminLoginError, setAdminLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  // Check for existing admin session on mount and set up session monitoring
  useEffect(() => {
    const checkAndRestoreSession = () => {
      const isAuthenticated = adminAuth.checkSession();
      setIsAdminAuthenticated(isAuthenticated);
      setIsSessionLoading(false);

      if (isAuthenticated) {
        // Extend session on activity
        adminAuth.extendSession();
        console.log('Admin session restored and extended');
      }
    };

    // Initial session check
    checkAndRestoreSession();

    // Set up periodic session validation (every 5 minutes)
    const sessionCheckInterval = setInterval(() => {
      const isAuthenticated = adminAuth.checkSession();
      if (isAuthenticated !== isAdminAuthenticated) {
        setIsAdminAuthenticated(isAuthenticated);
        if (!isAuthenticated) {
          toast({
            title: "Session Expired",
            description: "Your session has expired. Please log in again.",
            variant: "destructive",
          });
        }
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    // Set up activity listener to extend session
    const handleUserActivity = () => {
      if (adminAuth.checkSession()) {
        adminAuth.extendSession();
      }
    };

    // Listen for user activity to extend session
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      document.addEventListener(event, handleUserActivity, { passive: true });
    });

    // Cleanup
    return () => {
      clearInterval(sessionCheckInterval);
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [isAdminAuthenticated, toast]);

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
    isSessionLoading,
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
