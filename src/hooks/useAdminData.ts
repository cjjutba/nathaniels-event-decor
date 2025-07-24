import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

// Types for admin data structures
export interface AdminService {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'active' | 'inactive' | 'draft';
  basePrice: string;
  features: string[];
  icon: string;
  image: string;
  popularity: number;
  totalBookings: number;
  averageRating: number;
  createdAt: string;
  lastUpdated: string;
}

export interface AdminPortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'published' | 'draft' | 'archived';
  image: string;
  tags: string[];
  eventDate: string;
  clientName: string;
  views: number;
  likes: number;
  featured: boolean;
  createdAt: string;
  lastUpdated: string;
}

export interface AdminEvent {
  id: string;
  title: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  location: string;
  budget: string;
  status: 'confirmed' | 'planning' | 'in-progress' | 'completed' | 'cancelled';
  description: string;
  services: string[];
  createdAt: string;
  lastUpdated: string;
}

export interface AdminClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'active' | 'inactive' | 'pending' | 'vip';
  joinDate: string;
  lastActivity: string;
  totalEvents: number;
  totalSpent: string;
  preferredServices: string[];
  notes: string;
  rating: number;
  communicationPreference: 'email' | 'phone' | 'both';
  createdAt: string;
  lastUpdated: string;
}

/**
 * Hook to access admin services data for client-side display
 */
export function useAdminServices() {
  const [services] = useLocalStorage<AdminService[]>('admin_services', []);
  
  // Filter only active services for client display
  const activeServices = services.filter(service => service.status === 'active');
  
  // Get featured services (top rated or most popular)
  const featuredServices = activeServices
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 6);
  
  // Get services by category
  const getServicesByCategory = (category: string) => {
    return activeServices.filter(service => 
      service.category.toLowerCase() === category.toLowerCase()
    );
  };
  
  return {
    services: activeServices,
    featuredServices,
    getServicesByCategory,
    totalServices: activeServices.length,
    averageRating: activeServices.length > 0 
      ? activeServices.reduce((acc, s) => acc + s.averageRating, 0) / activeServices.length 
      : 0,
    totalBookings: activeServices.reduce((acc, s) => acc + s.totalBookings, 0)
  };
}

/**
 * Hook to access admin portfolio data for client-side display
 */
export function useAdminPortfolio() {
  const [portfolio] = useLocalStorage<AdminPortfolioItem[]>('admin_portfolio', []);
  
  // Filter only published portfolio items for client display
  const publishedItems = portfolio.filter(item => item.status === 'published');
  
  // Get featured portfolio items
  const featuredItems = publishedItems.filter(item => item.featured);
  
  // Get recent portfolio items
  const recentItems = publishedItems
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 12);
  
  // Get portfolio items by category
  const getItemsByCategory = (category: string) => {
    if (category === 'All') return publishedItems;
    return publishedItems.filter(item => 
      item.category.toLowerCase() === category.toLowerCase()
    );
  };
  
  // Get unique categories
  const categories = ['All', ...Array.from(new Set(publishedItems.map(item => item.category)))];
  
  return {
    portfolio: publishedItems,
    featuredItems,
    recentItems,
    getItemsByCategory,
    categories,
    totalItems: publishedItems.length,
    totalViews: publishedItems.reduce((acc, item) => acc + item.views, 0),
    totalLikes: publishedItems.reduce((acc, item) => acc + item.likes, 0)
  };
}

/**
 * Hook to access admin events data for client-side display
 */
export function useAdminEvents() {
  const [events] = useLocalStorage<AdminEvent[]>('admin_events', []);
  
  // Get completed events for showcase
  const completedEvents = events.filter(event => event.status === 'completed');
  
  // Get recent completed events
  const recentCompletedEvents = completedEvents
    .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())
    .slice(0, 6);
  
  // Get upcoming events (confirmed and in-progress)
  const upcomingEvents = events
    .filter(event => ['confirmed', 'in-progress'].includes(event.status))
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
  
  // Get events by type
  const getEventsByType = (type: string) => {
    return completedEvents.filter(event => 
      event.eventType.toLowerCase() === type.toLowerCase()
    );
  };
  
  return {
    events: completedEvents,
    recentCompletedEvents,
    upcomingEvents,
    getEventsByType,
    totalEvents: events.length,
    completedEventsCount: completedEvents.length,
    upcomingEventsCount: upcomingEvents.length
  };
}

/**
 * Hook to access admin clients data for client-side display (testimonials, stats)
 */
export function useAdminClients() {
  const [clients] = useLocalStorage<AdminClient[]>('admin_clients', []);
  
  // Get clients with high ratings for testimonials
  const happyClients = clients
    .filter(client => client.rating >= 4 && client.notes.length > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
  
  // Get VIP clients
  const vipClients = clients.filter(client => client.status === 'vip');
  
  // Calculate total revenue
  const totalRevenue = clients.reduce((acc, client) => {
    const amount = parseInt(client.totalSpent.replace(/[₱,]/g, '') || '0');
    return acc + amount;
  }, 0);
  
  // Get average rating
  const averageRating = clients.length > 0
    ? clients.reduce((acc, client) => acc + client.rating, 0) / clients.length
    : 0;
  
  return {
    clients,
    happyClients,
    vipClients,
    totalClients: clients.length,
    activeClients: clients.filter(c => ['active', 'vip'].includes(c.status)).length,
    totalRevenue,
    averageRating,
    totalEvents: clients.reduce((acc, client) => acc + client.totalEvents, 0)
  };
}

/**
 * Combined hook for all admin data statistics
 */
export function useAdminStats() {
  const { totalServices, totalBookings, averageRating: servicesRating } = useAdminServices();
  const { totalItems: portfolioItems, totalViews, totalLikes } = useAdminPortfolio();
  const { totalEvents, completedEventsCount } = useAdminEvents();
  const { totalClients, activeClients, totalRevenue, averageRating: clientsRating } = useAdminClients();
  
  return {
    services: {
      total: totalServices,
      bookings: totalBookings,
      rating: servicesRating
    },
    portfolio: {
      total: portfolioItems,
      views: totalViews,
      likes: totalLikes
    },
    events: {
      total: totalEvents,
      completed: completedEventsCount
    },
    clients: {
      total: totalClients,
      active: activeClients,
      revenue: totalRevenue,
      rating: clientsRating
    }
  };
}
