export interface AdminNotification {
  id: string;
  type: 'create' | 'update' | 'delete' | 'status_change' | 'archive' | 'system';
  category: 'events' | 'services' | 'portfolio' | 'clients' | 'inquiries' | 'system';
  title: string;
  message: string;
  entityId?: string;
  entityName?: string;
  actionBy: string; // Admin user
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  icon: string;
  color: string;
  bgColor: string;
  metadata?: {
    oldValue?: any;
    newValue?: any;
    additionalInfo?: string;
  };
}

export interface NotificationContextType {
  notifications: AdminNotification[];
  unreadCount: number;
  addNotification: (notification: Omit<AdminNotification, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  getNotificationsByCategory: (category: AdminNotification['category']) => AdminNotification[];
  getNotificationsByType: (type: AdminNotification['type']) => AdminNotification[];
}

// Notification templates for consistent messaging
export const NotificationTemplates = {
  // Create operations
  EVENT_CREATED: (eventTitle: string, clientName: string) => 
    `New event "${eventTitle}" created for ${clientName}`,
  SERVICE_CREATED: (serviceTitle: string) => 
    `New service "${serviceTitle}" has been added`,
  PORTFOLIO_CREATED: (itemTitle: string) => 
    `New portfolio item "${itemTitle}" has been published`,
  CLIENT_CREATED: (clientName: string) => 
    `New client "${clientName}" has been registered`,
  INQUIRY_CREATED: (inquiryType: string, clientName: string) => 
    `New ${inquiryType} inquiry received from ${clientName}`,
  
  // Update operations
  STATUS_CHANGED: (entityName: string, oldStatus: string, newStatus: string) => 
    `${entityName} status changed from ${oldStatus} to ${newStatus}`,
  ENTITY_UPDATED: (entityType: string, entityName: string) => 
    `${entityType} "${entityName}" has been updated`,
  PORTFOLIO_FEATURED: (itemTitle: string) => 
    `Portfolio item "${itemTitle}" is now featured`,
  
  // Delete operations
  ENTITY_DELETED: (entityType: string, entityName: string) => 
    `${entityType} "${entityName}" has been permanently deleted`,
  
  // Archive operations
  ENTITY_ARCHIVED: (entityType: string, entityName: string) => 
    `${entityType} "${entityName}" has been archived`,
  
  // Confirmation operations
  BULK_DELETE: (count: number, entityType: string) => 
    `${count} ${entityType}(s) have been deleted`,
  BULK_STATUS_CHANGE: (count: number, entityType: string, newStatus: string) => 
    `${count} ${entityType}(s) status changed to ${newStatus}`,
  
  // System operations
  DATA_EXPORTED: (entityType: string) => 
    `${entityType} data has been exported successfully`,
  DATA_IMPORTED: (entityType: string) => 
    `${entityType} data has been imported successfully`,
};

// Notification styling configuration
export const NotificationStyles = {
  create: { 
    icon: 'Plus', 
    color: 'text-green-600', 
    bgColor: 'bg-green-100' 
  },
  update: { 
    icon: 'Edit', 
    color: 'text-blue-600', 
    bgColor: 'bg-blue-100' 
  },
  delete: { 
    icon: 'Trash2', 
    color: 'text-red-600', 
    bgColor: 'bg-red-100' 
  },
  status_change: { 
    icon: 'CheckCircle', 
    color: 'text-yellow-600', 
    bgColor: 'bg-yellow-100' 
  },
  archive: { 
    icon: 'Archive', 
    color: 'text-gray-600', 
    bgColor: 'bg-gray-100' 
  },
  system: { 
    icon: 'Settings', 
    color: 'text-purple-600', 
    bgColor: 'bg-purple-100' 
  }
};

// Category styling configuration
export const CategoryStyles = {
  events: {
    icon: 'Calendar',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  services: {
    icon: 'Package',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  portfolio: {
    icon: 'GalleryHorizontal',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  clients: {
    icon: 'Users',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  inquiries: {
    icon: 'ClipboardList',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100'
  },
  system: {
    icon: 'Settings',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100'
  }
};
