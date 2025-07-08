import { useState, useEffect } from 'react';
import { adminAuth } from '@/lib/auth';
import { PATHS } from '@/lib/constants';
import { useToast } from './use-toast';

export const useAuth = () => {
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
    const success = adminAuth.login(username, password);
    
    if (success) {
      setIsAdminAuthenticated(true);
      setAdminLoginError('');
      navigate(PATHS.ADMIN_DASHBOARD);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard!",
      });
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

  return {
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    adminLoginForm,
    setAdminLoginForm,
    adminLoginError,
    setAdminLoginError,
    showPassword,
    setShowPassword,
    handleAdminLogin,
    handleAdminLogout,
  };
};
