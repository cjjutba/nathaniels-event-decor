import { useState, useCallback, useMemo, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { 
  AdminNotification, 
  NotificationStyles, 
  CategoryStyles 
} from '@/types/notifications';

/**
 * Custom hook for managing admin notifications with localStorage persistence
 */
export function useNotifications() {
  const [notifications, setNotifications] = useLocalStorage<AdminNotification[]>('admin_notifications', []);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Calculate unread count
  const unreadCount = useMemo(() => {
    return notifications.filter(notification => !notification.isRead).length;
  }, [notifications]);

  // Add a new notification
  const addNotification = useCallback((
    notification: Omit<AdminNotification, 'id' | 'timestamp' | 'isRead'>
  ) => {
    const newNotification: AdminNotification = {
      ...notification,
      id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Optional: Play notification sound (can be enabled later)
    // playNotificationSound();

    // Optional: Show browser notification (can be enabled later)
    // showBrowserNotification(newNotification);

    return newNotification.id;
  }, [setNotifications]);

  // Mark a notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, [setNotifications]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  }, [setNotifications]);

  // Delete a specific notification
  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  }, [setNotifications]);

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, [setNotifications]);

  // Clear old notifications (older than 30 days)
  const clearOldNotifications = useCallback(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    setNotifications(prev =>
      prev.filter(notification =>
        new Date(notification.timestamp) > thirtyDaysAgo
      )
    );
  }, [setNotifications]);

  // Auto-refresh functionality and cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
      // In a real application, you might want to check for new notifications from a server here
    }, 30000); // Refresh every 30 seconds

    // Clean up old notifications daily
    const cleanupInterval = setInterval(() => {
      clearOldNotifications();
    }, 24 * 60 * 60 * 1000); // Run daily

    return () => {
      clearInterval(interval);
      clearInterval(cleanupInterval);
    };
  }, [clearOldNotifications]);

  // Get notifications by category
  const getNotificationsByCategory = useCallback((category: AdminNotification['category']) => {
    return notifications.filter(notification => notification.category === category);
  }, [notifications]);

  // Get notifications by type
  const getNotificationsByType = useCallback((type: AdminNotification['type']) => {
    return notifications.filter(notification => notification.type === type);
  }, [notifications]);

  // Get notifications grouped by time periods
  const getGroupedNotifications = useCallback(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    return {
      today: notifications.filter(n => new Date(n.timestamp) >= today),
      yesterday: notifications.filter(n => {
        const date = new Date(n.timestamp);
        return date >= yesterday && date < today;
      }),
      thisWeek: notifications.filter(n => {
        const date = new Date(n.timestamp);
        return date >= weekAgo && date < yesterday;
      }),
      older: notifications.filter(n => new Date(n.timestamp) < weekAgo)
    };
  }, [notifications]);

  // Helper function to create notification with proper styling
  const createNotificationWithStyle = useCallback((
    type: AdminNotification['type'],
    category: AdminNotification['category'],
    title: string,
    message: string,
    options?: {
      entityId?: string;
      entityName?: string;
      priority?: AdminNotification['priority'];
      metadata?: AdminNotification['metadata'];
    }
  ) => {
    const typeStyle = NotificationStyles[type];
    const categoryStyle = CategoryStyles[category];

    return addNotification({
      type,
      category,
      title,
      message,
      actionBy: 'Admin User', // This could be dynamic based on auth context
      priority: options?.priority || 'medium',
      icon: typeStyle.icon,
      color: typeStyle.color,
      bgColor: typeStyle.bgColor,
      entityId: options?.entityId,
      entityName: options?.entityName,
      metadata: options?.metadata,
    });
  }, [addNotification]);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    clearOldNotifications,
    getNotificationsByCategory,
    getNotificationsByType,
    getGroupedNotifications,
    createNotificationWithStyle,
    lastRefresh,
  };
}

// Helper functions for notification sounds and browser notifications
// These can be enabled later if needed

const playNotificationSound = () => {
  try {
    const audio = new Audio('/notification-sound.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Handle autoplay restrictions silently
    });
  } catch (error) {
    // Silently handle any audio errors
  }
};

const showBrowserNotification = (notification: AdminNotification) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(notification.title, {
      body: notification.message,
      icon: '/favicon.ico',
      tag: notification.id,
    });
  }
};

// Function to request notification permission (can be called from settings)
export const requestNotificationPermission = async (): Promise<boolean> => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};
