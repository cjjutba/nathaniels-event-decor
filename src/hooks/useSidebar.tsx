import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

const SIDEBAR_STORAGE_KEY = 'admin-sidebar-collapsed';

interface AdminSidebarContextType {
  isCollapsed: boolean;
  isTransitioning: boolean;
  toggleSidebar: () => void;
}

const AdminSidebarContext = createContext<AdminSidebarContextType | undefined>(undefined);

interface AdminSidebarProviderProps {
  children: ReactNode;
}

export const AdminSidebarProvider: React.FC<AdminSidebarProviderProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Check localStorage for saved state, default to false (expanded)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(isCollapsed));
    }
  }, [isCollapsed]);

  const toggleSidebar = useCallback(() => {
    console.log('toggleSidebar called, current state:', isCollapsed);
    setIsTransitioning(true);

    setIsCollapsed((prev: boolean) => {
      const newValue = !prev;
      console.log('Setting isCollapsed to:', newValue);
      return newValue;
    });

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match the transition duration
  }, [isCollapsed]);

  const value = {
    isCollapsed,
    isTransitioning,
    toggleSidebar,
  };

  return (
    <AdminSidebarContext.Provider value={value}>
      {children}
    </AdminSidebarContext.Provider>
  );
};

export const useAdminSidebar = (): AdminSidebarContextType => {
  const context = useContext(AdminSidebarContext);
  if (context === undefined) {
    throw new Error('useAdminSidebar must be used within an AdminSidebarProvider');
  }
  return context;
};
