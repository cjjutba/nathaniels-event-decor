import { useEffect } from 'react';
import { useSearch } from '@/contexts/SearchContext';

// Sample data - in a real app, this would come from your data management system
const sampleEvents = [
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
    status: 'confirmed',
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
    status: 'planning',
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
    status: 'in-progress',
    description: 'Surprise 50th birthday party with vintage theme. Sophisticated decorations for intimate gathering.',
    services: ['Vintage Decor', 'Balloon Arrangements', 'Photo Booth Setup'],
    createdAt: '2024-01-13T09:15:00Z',
    lastUpdated: '2024-02-01T11:20:00Z'
  }
];

const sampleServices = [
  {
    id: '1',
    title: 'Wedding Planning & Coordination',
    description: 'Complete wedding planning service from concept to execution. Includes venue coordination, vendor management, timeline creation, and day-of coordination.',
    category: 'Wedding Services',
    status: 'active',
    basePrice: '₱85,000',
    features: ['Full Planning', 'Vendor Coordination', 'Day-of Management', 'Timeline Creation'],
    icon: 'Heart',
    image: '/api/placeholder/400/300',
    popularity: 95,
    totalBookings: 127,
    averageRating: 4.9,
    createdAt: '2024-01-01T00:00:00Z',
    lastUpdated: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Birthday Party Decoration',
    description: 'Themed birthday party decorations for all ages. Custom balloon arrangements, table settings, backdrop design, and party favors.',
    category: 'Birthday Services',
    status: 'active',
    basePrice: '₱25,000',
    features: ['Balloon Arrangements', 'Table Decorations', 'Backdrop Design', 'Party Favors'],
    icon: 'Cake',
    image: '/api/placeholder/400/300',
    popularity: 88,
    totalBookings: 89,
    averageRating: 4.7,
    createdAt: '2024-01-01T00:00:00Z',
    lastUpdated: '2024-01-10T14:20:00Z'
  }
];

const sampleClients = [
  {
    id: '1',
    name: 'Sarah & Mike Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Manila, Philippines',
    status: 'vip',
    joinDate: '2024-01-15',
    lastActivity: '2024-01-20T14:45:00Z',
    totalEvents: 3,
    totalSpent: '₱540,000',
    preferredServices: ['Wedding Planning', 'Floral Arrangements', 'Lighting Design'],
    notes: 'VIP client with multiple high-value events. Prefers elegant, classic themes with white and gold color schemes.',
    rating: 5,
    communicationPreference: 'email',
    createdAt: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-01-20T14:45:00Z'
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Makati, Philippines',
    status: 'active',
    joinDate: '2024-01-13',
    lastActivity: '2024-02-01T11:20:00Z',
    totalEvents: 1,
    totalSpent: '₱45,000',
    preferredServices: ['Birthday Parties', 'Vintage Decor', 'Photo Booth'],
    notes: 'Loves vintage themes and intimate gatherings. Very detail-oriented and appreciates personalized service.',
    rating: 5,
    communicationPreference: 'phone',
    createdAt: '2024-01-13T09:15:00Z',
    lastUpdated: '2024-02-01T11:20:00Z'
  }
];

const sampleInquiries = [
  {
    id: '1',
    clientName: 'Jennifer Chen',
    email: 'jennifer.chen@email.com',
    phone: '+1 (555) 789-0123',
    eventType: 'Wedding',
    eventDate: '2024-08-15',
    location: 'Tagaytay, Philippines',
    budget: '₱200,000',
    message: 'Looking for a complete wedding package for an outdoor ceremony in Tagaytay. We want a romantic, garden-style theme with lots of flowers and natural elements.',
    status: 'new',
    submittedAt: '2024-01-25T09:30:00Z',
    lastUpdated: '2024-01-25T09:30:00Z'
  },
  {
    id: '2',
    clientName: 'Robert Kim',
    email: 'robert.kim@company.com',
    phone: '+1 (555) 234-5678',
    eventType: 'Corporate Event',
    eventDate: '2024-04-10',
    location: 'Makati Business District',
    budget: '₱150,000',
    message: 'Need event planning for our company\'s 10th anniversary celebration. Looking for professional setup with modern theme and audio-visual equipment.',
    status: 'in-progress',
    submittedAt: '2024-01-20T14:15:00Z',
    lastUpdated: '2024-01-22T16:45:00Z'
  }
];

const samplePortfolio = [
  {
    id: '1',
    title: 'Elegant Garden Wedding',
    description: 'A beautiful outdoor wedding ceremony with white and green theme, featuring natural floral arrangements and rustic wooden elements.',
    category: 'Weddings',
    status: 'published',
    image: '/api/placeholder/600/400',
    tags: ['Wedding', 'Outdoor', 'Garden', 'White Theme', 'Floral'],
    eventDate: '2023-12-15',
    clientName: 'Sarah & Mike Johnson',
    views: 1247,
    likes: 89,
    featured: true,
    createdAt: '2023-12-20T10:00:00Z',
    lastUpdated: '2024-01-05T14:30:00Z'
  },
  {
    id: '2',
    title: 'Corporate Gala Night',
    description: 'Sophisticated corporate event with modern lighting, elegant table settings, and professional stage design for annual company celebration.',
    category: 'Corporate',
    status: 'published',
    image: '/api/placeholder/600/400',
    tags: ['Corporate', 'Gala', 'Modern', 'Professional', 'Lighting'],
    eventDate: '2023-11-20',
    clientName: 'TechCorp Inc.',
    views: 892,
    likes: 67,
    featured: false,
    createdAt: '2023-11-25T16:20:00Z',
    lastUpdated: '2023-12-01T09:15:00Z'
  }
];

// Hook to provide search data to the search context
export const useSearchData = () => {
  const { updateSearchData } = useSearch();

  useEffect(() => {
    // In a real application, you would fetch this data from your API or state management
    // For now, we'll use the sample data
    updateSearchData({
      events: sampleEvents,
      services: sampleServices,
      clients: sampleClients,
      inquiries: sampleInquiries,
      portfolio: samplePortfolio
    });
  }, [updateSearchData]);

  // Return the data in case components need direct access
  return {
    events: sampleEvents,
    services: sampleServices,
    clients: sampleClients,
    inquiries: sampleInquiries,
    portfolio: samplePortfolio
  };
};

// Hook for individual page data updates
export const useUpdateSearchData = () => {
  const { updateSearchData, searchData } = useSearch();

  const updateEvents = (events: any[]) => {
    updateSearchData({
      ...searchData,
      events
    });
  };

  const updateServices = (services: any[]) => {
    updateSearchData({
      ...searchData,
      services
    });
  };

  const updateClients = (clients: any[]) => {
    updateSearchData({
      ...searchData,
      clients
    });
  };

  const updateInquiries = (inquiries: any[]) => {
    updateSearchData({
      ...searchData,
      inquiries
    });
  };

  const updatePortfolio = (portfolio: any[]) => {
    updateSearchData({
      ...searchData,
      portfolio
    });
  };

  return {
    updateEvents,
    updateServices,
    updateClients,
    updateInquiries,
    updatePortfolio
  };
};
