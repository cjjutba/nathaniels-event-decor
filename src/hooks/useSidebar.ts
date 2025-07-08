import { useState, useEffect } from 'react';

const SIDEBAR_STORAGE_KEY = 'admin-sidebar-collapsed';

export const useSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Check localStorage for saved state, default to false (expanded)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(isCollapsed));
    }
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  return {
    isCollapsed,
    toggleSidebar,
  };
};
