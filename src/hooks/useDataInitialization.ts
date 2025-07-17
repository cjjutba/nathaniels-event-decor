import { useEffect } from 'react';
import { weddingPortfolio, birthdayPortfolio, corporatePortfolio } from '@/assets/images';

// Sample data for initialization
const INITIAL_EVENTS = [
  {
    id: '1',
    title: 'Johnson Wedding',
    clientName: 'Sarah & Mike Johnson',
    clientEmail: 'sarah.johnson@email.com',
    clientPhone: '+1 (555) 123-4567',
    eventType: 'Wedding',
    eventDate: '2024-06-15',
    eventTime: '16:00',
    location: 'Manila Hotel, Philippines',
    budget: '₱180,000',
    status: 'confirmed' as const,
    description: 'Elegant wedding ceremony and reception with white and gold theme. Includes floral arrangements, table settings, and backdrop decorations.',
    services: ['Floral Arrangements', 'Table Settings', 'Backdrop Design', 'Lighting'],
    createdAt: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-01-20T14:45:00Z'
  },
  {
    id: '2',
    title: 'Corporate Annual Gala',
    clientName: 'TechCorp Inc.',
    clientEmail: 'events@techcorp.com',
    clientPhone: '+1 (555) 987-6543',
    eventType: 'Corporate Event',
    eventDate: '2024-03-20',
    eventTime: '19:00',
    location: 'BGC Convention Center',
    budget: '₱120,000',
    status: 'planning' as const,
    description: 'Annual company gala with modern professional theme. Blue and silver color scheme to match brand colors.',
    services: ['Stage Design', 'Audio Visual', 'Table Settings', 'Entrance Decor'],
    createdAt: '2024-01-14T14:20:00Z',
    lastUpdated: '2024-01-25T16:30:00Z'
  },
  {
    id: '3',
    title: 'Rodriguez 50th Birthday',
    clientName: 'Maria Rodriguez',
    clientEmail: 'maria.rodriguez@email.com',
    clientPhone: '+1 (555) 456-7890',
    eventType: 'Birthday Party',
    eventDate: '2024-02-28',
    eventTime: '14:00',
    location: 'Private Residence, Makati',
    budget: '₱45,000',
    status: 'in-progress' as const,
    description: 'Surprise 50th birthday party with vintage theme. Sophisticated decorations for intimate gathering.',
    services: ['Vintage Decor', 'Balloon Arrangements', 'Photo Booth Setup'],
    createdAt: '2024-01-13T09:15:00Z',
    lastUpdated: '2024-02-01T11:20:00Z'
  }
];

const INITIAL_SERVICES = [
  {
    id: '1',
    title: 'Wedding Planning & Decor',
    description: 'Complete wedding planning and decor services including venue styling, floral arrangements, lighting design, and coordination to make your special day absolutely perfect.',
    category: 'Wedding',
    status: 'active' as const,
    basePrice: '₱80,000',
    features: ['Ceremony & Reception Decor', 'Floral Design', 'Lighting & Ambiance', 'Day-of Coordination'],
    icon: 'Heart',
    image: '/images/wedding-portfolio.jpg',
    popularity: 95,
    totalBookings: 45,
    averageRating: 4.9,
    createdAt: '2024-01-01T00:00:00Z',
    lastUpdated: '2024-01-20T10:30:00Z'
  },
  {
    id: '2',
    title: 'Birthday Celebrations',
    description: 'Fun and memorable birthday party planning with custom themes, decorations, entertainment coordination, and party favors for all ages.',
    category: 'Birthday',
    status: 'active' as const,
    basePrice: '₱35,000',
    features: ['Custom Theme Design', 'Balloon Decorations', 'Party Games & Activities', 'Photo Booth Setup'],
    icon: 'Gift',
    image: '/images/birthday-portfolio.jpg',
    popularity: 88,
    totalBookings: 32,
    averageRating: 4.7,
    createdAt: '2024-01-01T00:00:00Z',
    lastUpdated: '2024-01-18T14:20:00Z'
  },
  {
    id: '3',
    title: 'Corporate Events',
    description: 'Professional corporate event services including conferences, product launches, team building events, and company celebrations with sophisticated styling.',
    category: 'Corporate',
    status: 'active' as const,
    basePrice: '₱60,000',
    features: ['Brand Integration', 'Professional Staging', 'Tech Setup', 'Networking Areas'],
    icon: 'Building2',
    image: '/images/corporate-portfolio.jpg',
    popularity: 82,
    totalBookings: 28,
    averageRating: 4.8,
    createdAt: '2024-01-01T00:00:00Z',
    lastUpdated: '2024-01-15T16:45:00Z'
  }
];

const INITIAL_PORTFOLIO = [
  {
    id: '1',
    title: 'Elegant Garden Wedding',
    description: 'A breathtaking outdoor wedding ceremony with romantic garden theme, featuring white and gold decorations, floral arrangements, and ambient lighting.',
    category: 'Weddings',
    status: 'published' as const,
    image: weddingPortfolio,
    tags: ['outdoor', 'garden', 'romantic', 'white', 'gold'],
    eventDate: '2024-06-15',
    clientName: 'Sarah & Mike Johnson',
    views: 1250,
    likes: 89,
    featured: true,
    createdAt: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-01-20T14:45:00Z'
  },
  {
    id: '2',
    title: 'Colorful Birthday Celebration',
    description: 'A vibrant and fun birthday party setup with rainbow theme, balloon arrangements, and interactive entertainment areas for kids and adults.',
    category: 'Birthdays',
    status: 'published' as const,
    image: birthdayPortfolio,
    tags: ['colorful', 'fun', 'rainbow', 'balloons', 'kids'],
    eventDate: '2024-02-28',
    clientName: 'Maria Rodriguez',
    views: 890,
    likes: 67,
    featured: false,
    createdAt: '2024-01-13T09:15:00Z',
    lastUpdated: '2024-02-01T11:20:00Z'
  },
  {
    id: '3',
    title: 'Professional Corporate Gala',
    description: 'Sophisticated corporate event with modern staging, professional lighting, and elegant table settings for annual company celebration.',
    category: 'Corporate',
    status: 'published' as const,
    image: corporatePortfolio,
    tags: ['professional', 'modern', 'elegant', 'corporate', 'gala'],
    eventDate: '2024-03-20',
    clientName: 'TechCorp Inc.',
    views: 1100,
    likes: 78,
    featured: true,
    createdAt: '2024-01-14T14:20:00Z',
    lastUpdated: '2024-01-25T16:30:00Z'
  }
];

const INITIAL_CLIENTS = [
  {
    id: '1',
    name: 'Sarah & Mike Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Manila, Philippines',
    status: 'vip' as const,
    joinDate: '2024-01-15',
    lastActivity: '2024-01-20T14:45:00Z',
    totalEvents: 3,
    totalSpent: '₱540,000',
    preferredServices: ['Wedding Planning', 'Floral Arrangements', 'Lighting Design'],
    notes: 'VIP client with multiple high-value events. Prefers elegant, classic themes with white and gold color schemes.',
    rating: 5,
    communicationPreference: 'email' as const,
    createdAt: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-01-20T14:45:00Z'
  },
  {
    id: '2',
    name: 'TechCorp Inc.',
    email: 'events@techcorp.com',
    phone: '+1 (555) 987-6543',
    location: 'BGC, Taguig',
    status: 'active' as const,
    joinDate: '2024-01-14',
    lastActivity: '2024-01-25T16:30:00Z',
    totalEvents: 2,
    totalSpent: '₱240,000',
    preferredServices: ['Corporate Events', 'Audio Visual', 'Professional Staging'],
    notes: 'Corporate client with annual events. Prefers modern, professional themes with brand color integration.',
    rating: 4,
    communicationPreference: 'both' as const,
    createdAt: '2024-01-14T14:20:00Z',
    lastUpdated: '2024-01-25T16:30:00Z'
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Makati, Philippines',
    status: 'active' as const,
    joinDate: '2024-01-13',
    lastActivity: '2024-02-01T11:20:00Z',
    totalEvents: 1,
    totalSpent: '₱45,000',
    preferredServices: ['Birthday Parties', 'Vintage Decor', 'Photo Booth'],
    notes: 'Loves vintage and classic themes. Very detail-oriented and appreciates personalized touches.',
    rating: 5,
    communicationPreference: 'phone' as const,
    createdAt: '2024-01-13T09:15:00Z',
    lastUpdated: '2024-02-01T11:20:00Z'
  }
];

const INITIAL_INQUIRIES = [
  {
    id: '1',
    clientName: 'Jennifer Chen',
    email: 'jennifer.chen@email.com',
    phone: '+1 (555) 234-5678',
    eventType: 'Wedding',
    eventDate: '2024-08-15',
    location: 'Tagaytay, Philippines',
    budget: '₱200,000',
    message: 'Looking for a romantic outdoor wedding setup with garden theme. We want something elegant but not too formal. Please include floral arrangements and lighting.',
    status: 'new' as const,
    submittedAt: '2024-01-25T09:30:00Z',
    lastUpdated: '2024-01-25T09:30:00Z'
  },
  {
    id: '2',
    clientName: 'Robert Kim',
    email: 'robert.kim@email.com',
    phone: '+1 (555) 345-6789',
    eventType: 'Corporate Event',
    eventDate: '2024-04-10',
    location: 'Makati Business District',
    budget: '₱150,000',
    message: 'Need professional setup for product launch event. Modern theme with tech integration. Expecting 200 guests.',
    status: 'in-progress' as const,
    submittedAt: '2024-01-24T14:15:00Z',
    lastUpdated: '2024-01-25T10:45:00Z'
  }
];

/**
 * Hook to initialize localStorage with sample data if empty
 */
export function useDataInitialization() {
  useEffect(() => {
    // Check if data already exists in localStorage
    const eventsExist = localStorage.getItem('admin_events');
    const servicesExist = localStorage.getItem('admin_services');
    const portfolioExist = localStorage.getItem('admin_portfolio');
    const clientsExist = localStorage.getItem('admin_clients');
    const inquiriesExist = localStorage.getItem('admin_inquiries');

    // Initialize with sample data if localStorage is empty
    if (!eventsExist) {
      localStorage.setItem('admin_events', JSON.stringify(INITIAL_EVENTS));
    }
    
    if (!servicesExist) {
      localStorage.setItem('admin_services', JSON.stringify(INITIAL_SERVICES));
    }
    
    if (!portfolioExist) {
      localStorage.setItem('admin_portfolio', JSON.stringify(INITIAL_PORTFOLIO));
    }
    
    if (!clientsExist) {
      localStorage.setItem('admin_clients', JSON.stringify(INITIAL_CLIENTS));
    }
    
    if (!inquiriesExist) {
      localStorage.setItem('admin_inquiries', JSON.stringify(INITIAL_INQUIRIES));
    }
  }, []);
}
