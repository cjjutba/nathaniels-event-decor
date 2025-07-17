import { AdminNotification, NotificationTemplates } from '@/types/notifications';

/**
 * Utility functions for creating standardized notifications
 */

// Event notifications
export const createEventNotifications = {
  created: (eventTitle: string, clientName: string, eventId?: string) => ({
    type: 'create' as const,
    category: 'events' as const,
    title: 'New Event Created',
    message: NotificationTemplates.EVENT_CREATED(eventTitle, clientName),
    entityId: eventId,
    entityName: eventTitle,
    actionBy: 'Admin User',
    priority: 'medium' as const,
    icon: 'Plus',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  }),

  updated: (eventTitle: string, eventId?: string) => ({
    type: 'update' as const,
    category: 'events' as const,
    title: 'Event Updated',
    message: NotificationTemplates.ENTITY_UPDATED('Event', eventTitle),
    entityId: eventId,
    entityName: eventTitle,
    actionBy: 'Admin User',
    priority: 'low' as const,
    icon: 'Edit',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  }),

  statusChanged: (eventTitle: string, oldStatus: string, newStatus: string, eventId?: string) => ({
    type: 'status_change' as const,
    category: 'events' as const,
    title: 'Event Status Updated',
    message: NotificationTemplates.STATUS_CHANGED(eventTitle, oldStatus, newStatus),
    entityId: eventId,
    entityName: eventTitle,
    actionBy: 'Admin User',
    priority: 'medium' as const,
    icon: 'CheckCircle',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    metadata: {
      oldValue: oldStatus,
      newValue: newStatus,
    },
  }),

  deleted: (eventTitle: string, eventId?: string) => ({
    type: 'delete' as const,
    category: 'events' as const,
    title: 'Event Deleted',
    message: NotificationTemplates.ENTITY_DELETED('Event', eventTitle),
    entityId: eventId,
    entityName: eventTitle,
    actionBy: 'Admin User',
    priority: 'high' as const,
    icon: 'Trash2',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  }),
};

// Service notifications
export const createServiceNotifications = {
  created: (serviceTitle: string, serviceId?: string) => ({
    type: 'create' as const,
    category: 'services' as const,
    title: 'New Service Added',
    message: NotificationTemplates.SERVICE_CREATED(serviceTitle),
    entityId: serviceId,
    entityName: serviceTitle,
    actionBy: 'Admin User',
    priority: 'medium' as const,
    icon: 'Plus',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  }),

  updated: (serviceTitle: string, serviceId?: string) => ({
    type: 'update' as const,
    category: 'services' as const,
    title: 'Service Updated',
    message: NotificationTemplates.ENTITY_UPDATED('Service', serviceTitle),
    entityId: serviceId,
    entityName: serviceTitle,
    actionBy: 'Admin User',
    priority: 'low' as const,
    icon: 'Edit',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  }),

  statusChanged: (serviceTitle: string, oldStatus: string, newStatus: string, serviceId?: string) => ({
    type: 'status_change' as const,
    category: 'services' as const,
    title: 'Service Status Updated',
    message: NotificationTemplates.STATUS_CHANGED(serviceTitle, oldStatus, newStatus),
    entityId: serviceId,
    entityName: serviceTitle,
    actionBy: 'Admin User',
    priority: 'medium' as const,
    icon: 'CheckCircle',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    metadata: {
      oldValue: oldStatus,
      newValue: newStatus,
    },
  }),

  deleted: (serviceTitle: string, serviceId?: string) => ({
    type: 'delete' as const,
    category: 'services' as const,
    title: 'Service Deleted',
    message: NotificationTemplates.ENTITY_DELETED('Service', serviceTitle),
    entityId: serviceId,
    entityName: serviceTitle,
    actionBy: 'Admin User',
    priority: 'high' as const,
    icon: 'Trash2',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  }),
};

// Portfolio notifications
export const createPortfolioNotifications = {
  created: (itemTitle: string, itemId?: string) => ({
    type: 'create' as const,
    category: 'portfolio' as const,
    title: 'New Portfolio Item',
    message: NotificationTemplates.PORTFOLIO_CREATED(itemTitle),
    entityId: itemId,
    entityName: itemTitle,
    actionBy: 'Admin User',
    priority: 'medium' as const,
    icon: 'Plus',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  }),

  updated: (itemTitle: string, itemId?: string) => ({
    type: 'update' as const,
    category: 'portfolio' as const,
    title: 'Portfolio Item Updated',
    message: NotificationTemplates.ENTITY_UPDATED('Portfolio item', itemTitle),
    entityId: itemId,
    entityName: itemTitle,
    actionBy: 'Admin User',
    priority: 'low' as const,
    icon: 'Edit',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  }),

  featured: (itemTitle: string, itemId?: string) => ({
    type: 'update' as const,
    category: 'portfolio' as const,
    title: 'Portfolio Item Featured',
    message: NotificationTemplates.PORTFOLIO_FEATURED(itemTitle),
    entityId: itemId,
    entityName: itemTitle,
    actionBy: 'Admin User',
    priority: 'low' as const,
    icon: 'Star',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  }),

  deleted: (itemTitle: string, itemId?: string) => ({
    type: 'delete' as const,
    category: 'portfolio' as const,
    title: 'Portfolio Item Deleted',
    message: NotificationTemplates.ENTITY_DELETED('Portfolio item', itemTitle),
    entityId: itemId,
    entityName: itemTitle,
    actionBy: 'Admin User',
    priority: 'high' as const,
    icon: 'Trash2',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  }),
};

// Client notifications
export const createClientNotifications = {
  created: (clientName: string, clientId?: string) => ({
    type: 'create' as const,
    category: 'clients' as const,
    title: 'New Client Registered',
    message: NotificationTemplates.CLIENT_CREATED(clientName),
    entityId: clientId,
    entityName: clientName,
    actionBy: 'Admin User',
    priority: 'medium' as const,
    icon: 'Plus',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  }),

  updated: (clientName: string, clientId?: string) => ({
    type: 'update' as const,
    category: 'clients' as const,
    title: 'Client Updated',
    message: NotificationTemplates.ENTITY_UPDATED('Client', clientName),
    entityId: clientId,
    entityName: clientName,
    actionBy: 'Admin User',
    priority: 'low' as const,
    icon: 'Edit',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  }),

  statusChanged: (clientName: string, oldStatus: string, newStatus: string, clientId?: string) => ({
    type: 'status_change' as const,
    category: 'clients' as const,
    title: 'Client Status Updated',
    message: NotificationTemplates.STATUS_CHANGED(clientName, oldStatus, newStatus),
    entityId: clientId,
    entityName: clientName,
    actionBy: 'Admin User',
    priority: 'medium' as const,
    icon: 'CheckCircle',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    metadata: {
      oldValue: oldStatus,
      newValue: newStatus,
    },
  }),

  deleted: (clientName: string, clientId?: string) => ({
    type: 'delete' as const,
    category: 'clients' as const,
    title: 'Client Deleted',
    message: NotificationTemplates.ENTITY_DELETED('Client', clientName),
    entityId: clientId,
    entityName: clientName,
    actionBy: 'Admin User',
    priority: 'high' as const,
    icon: 'Trash2',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  }),
};

// Inquiry notifications
export const createInquiryNotifications = {
  created: (inquiryType: string, clientName: string, inquiryId?: string) => ({
    type: 'create' as const,
    category: 'inquiries' as const,
    title: 'New Inquiry Received',
    message: NotificationTemplates.INQUIRY_CREATED(inquiryType, clientName),
    entityId: inquiryId,
    entityName: `${inquiryType} inquiry from ${clientName}`,
    actionBy: 'System',
    priority: 'high' as const,
    icon: 'Plus',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  }),

  statusChanged: (inquiryTitle: string, oldStatus: string, newStatus: string, inquiryId?: string) => ({
    type: 'status_change' as const,
    category: 'inquiries' as const,
    title: 'Inquiry Status Updated',
    message: NotificationTemplates.STATUS_CHANGED(inquiryTitle, oldStatus, newStatus),
    entityId: inquiryId,
    entityName: inquiryTitle,
    actionBy: 'Admin User',
    priority: 'medium' as const,
    icon: 'CheckCircle',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    metadata: {
      oldValue: oldStatus,
      newValue: newStatus,
    },
  }),

  archived: (inquiryTitle: string, inquiryId?: string) => ({
    type: 'archive' as const,
    category: 'inquiries' as const,
    title: 'Inquiry Archived',
    message: NotificationTemplates.ENTITY_ARCHIVED('Inquiry', inquiryTitle),
    entityId: inquiryId,
    entityName: inquiryTitle,
    actionBy: 'Admin User',
    priority: 'low' as const,
    icon: 'Archive',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
  }),

  deleted: (inquiryTitle: string, inquiryId?: string) => ({
    type: 'delete' as const,
    category: 'inquiries' as const,
    title: 'Inquiry Deleted',
    message: NotificationTemplates.ENTITY_DELETED('Inquiry', inquiryTitle),
    entityId: inquiryId,
    entityName: inquiryTitle,
    actionBy: 'Admin User',
    priority: 'high' as const,
    icon: 'Trash2',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  }),
};

// System notifications
export const createSystemNotifications = {
  dataExported: (entityType: string) => ({
    type: 'system' as const,
    category: 'system' as const,
    title: 'Data Exported',
    message: NotificationTemplates.DATA_EXPORTED(entityType),
    actionBy: 'Admin User',
    priority: 'low' as const,
    icon: 'Download',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  }),

  dataImported: (entityType: string) => ({
    type: 'system' as const,
    category: 'system' as const,
    title: 'Data Imported',
    message: NotificationTemplates.DATA_IMPORTED(entityType),
    actionBy: 'Admin User',
    priority: 'medium' as const,
    icon: 'Upload',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  }),

  bulkDelete: (count: number, entityType: string) => ({
    type: 'delete' as const,
    category: 'system' as const,
    title: 'Bulk Delete Completed',
    message: NotificationTemplates.BULK_DELETE(count, entityType),
    actionBy: 'Admin User',
    priority: 'high' as const,
    icon: 'Trash2',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  }),

  bulkStatusChange: (count: number, entityType: string, newStatus: string) => ({
    type: 'status_change' as const,
    category: 'system' as const,
    title: 'Bulk Status Update',
    message: NotificationTemplates.BULK_STATUS_CHANGE(count, entityType, newStatus),
    actionBy: 'Admin User',
    priority: 'medium' as const,
    icon: 'CheckCircle',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  }),
};
