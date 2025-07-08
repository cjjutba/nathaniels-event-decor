// Navigation paths
export const PATHS = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  PORTFOLIO: '/portfolio',
  CONTACT: '/contact',
  LOGIN: '/login',
  SIGNUP: '/signup',
  CLIENT_DASHBOARD: '/client/dashboard',
  
  // Admin paths
  ADMIN_LOGIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard/',
  ADMIN_INQUIRIES: '/admin/dashboard/inquiries/',
  ADMIN_EVENTS: '/admin/dashboard/events/',
  ADMIN_SERVICES: '/admin/dashboard/services/',
  ADMIN_PORTFOLIO: '/admin/dashboard/portfolio/',
  ADMIN_CLIENTS: '/admin/dashboard/clients/',
  ADMIN_SETTINGS: '/admin/dashboard/settings/',
  ADMIN_PROFILE: '/admin/dashboard/profile/',
} as const;

// Demo credentials
export const DEMO_CREDENTIALS = {
  ADMIN_USERNAME: 'admin',
  ADMIN_PASSWORD: 'admin123',
} as const;

// Event types
export const EVENT_TYPES = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'fiesta', label: 'Fiesta' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'pageant', label: 'Pageant' },
  { value: 'other', label: 'Other' },
] as const;

// Portfolio categories
export const PORTFOLIO_CATEGORIES = [
  'All',
  'Weddings',
  'Birthdays',
  'Fiestas',
  'Corporate',
  'Pageants',
] as const;

// Contact information
export const CONTACT_INFO = {
  PHONE: '(555) 123-4567',
  EMAIL: 'hello@nathanielsevents.com',
  LOCATION: 'Downtown Event District',
  LOCATION_DETAIL: 'Available for events citywide',
} as const;

// Business hours
export const BUSINESS_HOURS = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
  { day: 'Sunday', hours: 'By Appointment' },
] as const;

// Company information
export const COMPANY_INFO = {
  NAME: "Nathaniel's Event & Decor",
  TAGLINE: 'Crafting unforgettable moments with premium event planning and decor services',
  DESCRIPTION: 'Your vision, our expertise, exceptional results.',
  FOUNDED_YEAR: 2018,
  COPYRIGHT: '© 2024 Nathaniel\'s Event & Decor. All rights reserved.',
} as const;

// Session storage keys
export const STORAGE_KEYS = {
  ADMIN_TOKEN: 'adminToken',
} as const;
