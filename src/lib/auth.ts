import { DEMO_CREDENTIALS, STORAGE_KEYS } from './constants';

// Session duration: 24 hours in milliseconds
const SESSION_DURATION = 24 * 60 * 60 * 1000;

interface AdminSession {
  token: string;
  expiresAt: number;
  loginTime: number;
}

// Admin authentication functions with persistent session management
export const adminAuth = {
  login: (username: string, password: string): boolean => {
    if (username === DEMO_CREDENTIALS.ADMIN_USERNAME && password === DEMO_CREDENTIALS.ADMIN_PASSWORD) {
      const now = Date.now();
      const session: AdminSession = {
        token: 'admin_authenticated',
        expiresAt: now + SESSION_DURATION,
        loginTime: now
      };

      localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, JSON.stringify(session));
      return true;
    }
    return false;
  },

  logout: (): void => {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
  },

  isAuthenticated: (): boolean => {
    return adminAuth.checkSession();
  },

  checkSession: (): boolean => {
    try {
      const sessionData = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
      if (!sessionData) {
        return false;
      }

      const session: AdminSession = JSON.parse(sessionData);
      const now = Date.now();

      // Check if session has expired
      if (now > session.expiresAt) {
        // Session expired, clean up
        localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
        return false;
      }

      // Session is valid
      return session.token === 'admin_authenticated';
    } catch (error) {
      // Invalid session data, clean up
      localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
      return false;
    }
  },

  getSessionInfo: (): { isValid: boolean; expiresAt?: number; loginTime?: number } => {
    try {
      const sessionData = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
      if (!sessionData) {
        return { isValid: false };
      }

      const session: AdminSession = JSON.parse(sessionData);
      const now = Date.now();

      if (now > session.expiresAt) {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
        return { isValid: false };
      }

      return {
        isValid: true,
        expiresAt: session.expiresAt,
        loginTime: session.loginTime
      };
    } catch (error) {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
      return { isValid: false };
    }
  },

  extendSession: (): boolean => {
    try {
      const sessionData = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
      if (!sessionData) {
        return false;
      }

      const session: AdminSession = JSON.parse(sessionData);
      const now = Date.now();

      // Only extend if session is still valid
      if (now <= session.expiresAt) {
        session.expiresAt = now + SESSION_DURATION;
        localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, JSON.stringify(session));
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }
};

// Token handling utilities (updated for backward compatibility)
export const tokenUtils = {
  setAdminToken: (): void => {
    const now = Date.now();
    const session: AdminSession = {
      token: 'admin_authenticated',
      expiresAt: now + SESSION_DURATION,
      loginTime: now
    };
    localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, JSON.stringify(session));
  },

  removeAdminToken: (): void => {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
  },

  hasAdminToken: (): boolean => {
    return adminAuth.checkSession();
  }
};
