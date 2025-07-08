import { DEMO_CREDENTIALS, STORAGE_KEYS } from './constants';

// Admin authentication functions
export const adminAuth = {
  login: (username: string, password: string): boolean => {
    if (username === DEMO_CREDENTIALS.ADMIN_USERNAME && password === DEMO_CREDENTIALS.ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, 'true');
      return true;
    }
    return false;
  },

  logout: (): void => {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
  },

  isAuthenticated: (): boolean => {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN) === 'true';
  },

  checkSession: (): boolean => {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN) === 'true';
  }
};

// Token handling utilities
export const tokenUtils = {
  setAdminToken: (): void => {
    sessionStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, 'true');
  },

  removeAdminToken: (): void => {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
  },

  hasAdminToken: (): boolean => {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN) === 'true';
  }
};
