import { useState, useEffect } from 'react';

export const useNavigation = () => {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  // Navigation handler
  const navigate = (path: string) => {
    setCurrentPage(path);
    setIsMenuOpen(false);
    setIsAdminMenuOpen(false);
    window.history.pushState(null, '', path);
  };

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname);
    };
    
    // Set initial page from URL
    setCurrentPage(window.location.pathname);
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return {
    currentPage,
    setCurrentPage,
    isMenuOpen,
    setIsMenuOpen,
    isAdminMenuOpen,
    setIsAdminMenuOpen,
    navigate,
  };
};
