import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing localStorage with automatic persistence
 * @param key - The localStorage key
 * @param initialValue - The initial value if no stored value exists
 * @returns [value, setValue, clearValue] - The current value, setter function, and clear function
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Function to clear the value from both state and localStorage
  const clearValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error clearing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes to localStorage from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [key]);

  return [storedValue, setValue, clearValue] as const;
}

/**
 * Hook for managing admin data with localStorage persistence
 * Provides a unified interface for all admin data types
 */
export function useAdminData() {
  const [events, setEvents, clearEvents] = useLocalStorage('admin_events', []);
  const [services, setServices, clearServices] = useLocalStorage('admin_services', []);
  const [portfolioItems, setPortfolioItems, clearPortfolioItems] = useLocalStorage('admin_portfolio', []);
  const [clients, setClients, clearClients] = useLocalStorage('admin_clients', []);
  const [inquiries, setInquiries, clearInquiries] = useLocalStorage('admin_inquiries', []);

  // Function to clear all admin data
  const clearAllData = useCallback(() => {
    clearEvents();
    clearServices();
    clearPortfolioItems();
    clearClients();
    clearInquiries();
  }, [clearEvents, clearServices, clearPortfolioItems, clearClients, clearInquiries]);

  // Function to export all data
  const exportData = useCallback(() => {
    return {
      events,
      services,
      portfolioItems,
      clients,
      inquiries,
      exportedAt: new Date().toISOString()
    };
  }, [events, services, portfolioItems, clients, inquiries]);

  // Function to import data
  const importData = useCallback((data: any) => {
    try {
      if (data.events) setEvents(data.events);
      if (data.services) setServices(data.services);
      if (data.portfolioItems) setPortfolioItems(data.portfolioItems);
      if (data.clients) setClients(data.clients);
      if (data.inquiries) setInquiries(data.inquiries);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }, [setEvents, setServices, setPortfolioItems, setClients, setInquiries]);

  return {
    // Data and setters
    events,
    setEvents,
    services,
    setServices,
    portfolioItems,
    setPortfolioItems,
    clients,
    setClients,
    inquiries,
    setInquiries,
    
    // Utility functions
    clearAllData,
    exportData,
    importData
  };
}

/**
 * Hook for managing localStorage with automatic backup
 * Creates periodic backups and provides restore functionality
 */
export function useLocalStorageBackup() {
  const createBackup = useCallback(() => {
    try {
      const adminData = {
        events: JSON.parse(localStorage.getItem('admin_events') || '[]'),
        services: JSON.parse(localStorage.getItem('admin_services') || '[]'),
        portfolioItems: JSON.parse(localStorage.getItem('admin_portfolio') || '[]'),
        clients: JSON.parse(localStorage.getItem('admin_clients') || '[]'),
        inquiries: JSON.parse(localStorage.getItem('admin_inquiries') || '[]'),
        backupDate: new Date().toISOString()
      };

      const backupKey = `admin_backup_${Date.now()}`;
      localStorage.setItem(backupKey, JSON.stringify(adminData));
      
      // Keep only the last 5 backups
      const allKeys = Object.keys(localStorage);
      const backupKeys = allKeys.filter(key => key.startsWith('admin_backup_')).sort();
      
      if (backupKeys.length > 5) {
        const keysToRemove = backupKeys.slice(0, backupKeys.length - 5);
        keysToRemove.forEach(key => localStorage.removeItem(key));
      }
      
      return backupKey;
    } catch (error) {
      console.error('Error creating backup:', error);
      return null;
    }
  }, []);

  const getBackups = useCallback(() => {
    try {
      const allKeys = Object.keys(localStorage);
      const backupKeys = allKeys.filter(key => key.startsWith('admin_backup_')).sort().reverse();
      
      return backupKeys.map(key => {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        return {
          key,
          date: data.backupDate,
          size: JSON.stringify(data).length
        };
      });
    } catch (error) {
      console.error('Error getting backups:', error);
      return [];
    }
  }, []);

  const restoreBackup = useCallback((backupKey: string) => {
    try {
      const backupData = JSON.parse(localStorage.getItem(backupKey) || '{}');
      
      if (backupData.events) localStorage.setItem('admin_events', JSON.stringify(backupData.events));
      if (backupData.services) localStorage.setItem('admin_services', JSON.stringify(backupData.services));
      if (backupData.portfolioItems) localStorage.setItem('admin_portfolio', JSON.stringify(backupData.portfolioItems));
      if (backupData.clients) localStorage.setItem('admin_clients', JSON.stringify(backupData.clients));
      if (backupData.inquiries) localStorage.setItem('admin_inquiries', JSON.stringify(backupData.inquiries));
      
      // Trigger storage event to update all components
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'admin_data_restored',
        newValue: Date.now().toString()
      }));
      
      return true;
    } catch (error) {
      console.error('Error restoring backup:', error);
      return false;
    }
  }, []);

  return {
    createBackup,
    getBackups,
    restoreBackup
  };
}
