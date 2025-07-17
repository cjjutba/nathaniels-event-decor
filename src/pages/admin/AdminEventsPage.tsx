import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  CalendarDays,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Package,
  Users,
  Star,
  Trash2,
  Archive,
  FileText,
} from 'lucide-react';

interface Event {
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

interface FilterState {
  eventTypes: string[];
  statuses: string[];
  dateRange: string;
  budgetRange: string;
}

export const AdminEventsPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [isEditEventDialogOpen, setIsEditEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    eventTypes: [],
    statuses: [],
    dateRange: 'all',
    budgetRange: 'all'
  });

  // Sample event data
  const [events, setEvents] = useState<Event[]>([
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
    },
    {
      id: '4',
      title: 'Kim 25th Anniversary',
      clientName: 'David & Lisa Kim',
      clientEmail: 'david.kim@email.com',
      clientPhone: '+1 (555) 321-0987',
      eventType: 'Anniversary',
      eventDate: '2024-04-10',
      eventTime: '18:30',
      location: 'Garden Restaurant, Quezon City',
      budget: '₱75,000',
      status: 'completed',
      description: '25th wedding anniversary celebration with romantic garden theme and extensive floral arrangements.',
      services: ['Floral Arrangements', 'Garden Lighting', 'Table Settings'],
      createdAt: '2024-01-12T16:45:00Z',
      lastUpdated: '2024-04-11T10:00:00Z'
    },
    {
      id: '5',
      title: 'Thompson Graduation Party',
      clientName: 'Lisa Thompson',
      clientEmail: 'lisa.thompson@email.com',
      clientPhone: '+1 (555) 654-3210',
      eventType: 'Graduation Party',
      eventDate: '2024-05-05',
      eventTime: '15:00',
      location: 'University Club, Diliman',
      budget: '₱55,000',
      status: 'cancelled',
      description: 'Graduation celebration with fun, colorful theme. Event was cancelled due to scheduling conflicts.',
      services: ['Colorful Decor', 'Balloon Arch', 'Photo Booth'],
      createdAt: '2024-01-11T13:20:00Z',
      lastUpdated: '2024-04-20T09:30:00Z'
    }
  ]);

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'planning':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'planning':
        return <Calendar className="h-4 w-4" />;
      case 'in-progress':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <Star className="h-4 w-4" />;
      case 'cancelled':
        return <X className="h-4 w-4" />;
      default:
        return <CalendarDays className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Get unique values for filters
  const uniqueEventTypes = [...new Set(events.map(event => event.eventType))];
  const uniqueStatuses = [...new Set(events.map(event => event.status))];

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      eventTypes: [],
      statuses: [],
      dateRange: 'all',
      budgetRange: 'all'
    });
  };

  // Check if any filters are active
  const hasActiveFilters = filters.eventTypes.length > 0 ||
                          filters.statuses.length > 0 ||
                          filters.dateRange !== 'all' ||
                          filters.budgetRange !== 'all';

  // Filter events based on active tab, search query, and filters
  const filteredEvents = events.filter(event => {
    // Search filter
    const matchesSearch = searchQuery === '' ||
                         event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter (tab)
    const matchesStatus = activeTab === 'all' || event.status === activeTab;

    // Event type filter
    const matchesEventType = filters.eventTypes.length === 0 ||
                            filters.eventTypes.includes(event.eventType);

    // Status filter (from dropdown)
    const matchesStatusFilter = filters.statuses.length === 0 ||
                               filters.statuses.includes(event.status);

    // Date range filter (simplified for demo)
    const matchesDateRange = filters.dateRange === 'all' ||
                            (filters.dateRange === 'this-month' &&
                             new Date(event.eventDate).getMonth() === new Date().getMonth()) ||
                            (filters.dateRange === 'next-month' &&
                             new Date(event.eventDate).getMonth() === new Date().getMonth() + 1);

    // Budget range filter (simplified for demo)
    const matchesBudgetRange = filters.budgetRange === 'all' ||
                              (filters.budgetRange === 'low' && parseInt(event.budget.replace(/[₱,]/g, '')) < 60000) ||
                              (filters.budgetRange === 'medium' && parseInt(event.budget.replace(/[₱,]/g, '')) >= 60000 && parseInt(event.budget.replace(/[₱,]/g, '')) < 120000) ||
                              (filters.budgetRange === 'high' && parseInt(event.budget.replace(/[₱,]/g, '')) >= 120000);

    return matchesSearch && matchesStatus && matchesEventType && matchesStatusFilter && matchesDateRange && matchesBudgetRange;
  });

  // Statistics
  const stats = [
    {
      icon: CalendarDays,
      title: 'Total Events',
      value: events.length.toString(),
      change: '+15%',
      trend: 'up',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'This year'
    },
    {
      icon: CheckCircle,
      title: 'Confirmed Events',
      value: events.filter(e => e.status === 'confirmed').length.toString(),
      change: '+20%',
      trend: 'up',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Ready to go'
    },
    {
      icon: Clock,
      title: 'In Progress',
      value: events.filter(e => e.status === 'in-progress').length.toString(),
      change: '+5%',
      trend: 'up',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: 'Being prepared'
    },
    {
      icon: Star,
      title: 'Completed',
      value: events.filter(e => e.status === 'completed').length.toString(),
      change: '+12%',
      trend: 'up',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Successfully done'
    }
  ];

  // Action handlers
  const updateEventStatus = (id: string, newStatus: Event['status']) => {
    setEvents(prev => prev.map(event =>
      event.id === id
        ? { ...event, status: newStatus, lastUpdated: new Date().toISOString() }
        : event
    ));

    toast({
      title: "Status Updated",
      description: `Event status changed to ${newStatus}`,
    });
  };

  const editEvent = (event: Event) => {
    setEditingEvent(event);
    setIsEditEventDialogOpen(true);
  };

  const deleteEvent = (id: string) => {
    const event = events.find(e => e.id === id);
    setEvents(prev => prev.filter(event => event.id !== id));

    toast({
      title: "Event Deleted",
      description: `"${event?.title}" has been deleted`,
    });
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Event Bookings</h1>
        <p className="text-muted-foreground">Track and manage confirmed events</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center space-x-1">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-3 w-3 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-600" />
                    )}
                    <span className={`text-xs font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">{stat.description}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <CardTitle>Event Management</CardTitle>
              <CardDescription>
                View and manage all event bookings
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>

              <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className={hasActiveFilters ? 'bg-primary/10 border-primary' : ''}>
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                        {filters.eventTypes.length + filters.statuses.length + (filters.dateRange !== 'all' ? 1 : 0) + (filters.budgetRange !== 'all' ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    Filter Options
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="h-6 px-2 text-xs"
                      >
                        Clear All
                      </Button>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* Event Type Filter */}
                  <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                    Event Type
                  </DropdownMenuLabel>
                  {uniqueEventTypes.map((eventType) => (
                    <DropdownMenuCheckboxItem
                      key={eventType}
                      checked={filters.eventTypes.includes(eventType)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilters(prev => ({
                            ...prev,
                            eventTypes: [...prev.eventTypes, eventType]
                          }));
                        } else {
                          setFilters(prev => ({
                            ...prev,
                            eventTypes: prev.eventTypes.filter(type => type !== eventType)
                          }));
                        }
                      }}
                    >
                      {eventType}
                    </DropdownMenuCheckboxItem>
                  ))}

                  <DropdownMenuSeparator />

                  {/* Status Filter */}
                  <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                    Status
                  </DropdownMenuLabel>
                  {uniqueStatuses.map((status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={filters.statuses.includes(status)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilters(prev => ({
                            ...prev,
                            statuses: [...prev.statuses, status]
                          }));
                        } else {
                          setFilters(prev => ({
                            ...prev,
                            statuses: prev.statuses.filter(s => s !== status)
                          }));
                        }
                      }}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button size="sm" onClick={() => setIsAddEventDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Event
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Active Filters Display */}
          {(searchQuery || hasActiveFilters) && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: "{searchQuery}"
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.eventTypes.map((eventType) => (
                <Badge key={eventType} variant="secondary" className="gap-1">
                  {eventType}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        eventTypes: prev.eventTypes.filter(type => type !== eventType)
                      }));
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {filters.statuses.map((status) => (
                <Badge key={status} variant="secondary" className="gap-1">
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        statuses: prev.statuses.filter(s => s !== status)
                      }));
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {(searchQuery || hasActiveFilters) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    clearFilters();
                  }}
                  className="text-xs"
                >
                  Clear All
                </Button>
              )}
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All ({events.length})</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed ({events.filter(e => e.status === 'confirmed').length})</TabsTrigger>
              <TabsTrigger value="planning">Planning ({events.filter(e => e.status === 'planning').length})</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress ({events.filter(e => e.status === 'in-progress').length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({events.filter(e => e.status === 'completed').length})</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled ({events.filter(e => e.status === 'cancelled').length})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? 'Try adjusting your search terms.' : 'No events match the current filter.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <Card key={event.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-4">
                            {/* Header Row */}
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-3">
                                  <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                                  <Badge className={`${getStatusColor(event.status)} border`}>
                                    <div className="flex items-center space-x-1">
                                      {getStatusIcon(event.status)}
                                      <span className="capitalize">{event.status.replace('-', ' ')}</span>
                                    </div>
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Created {formatDateTime(event.createdAt)}
                                </p>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuItem onClick={() => setSelectedEvent(event)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => editEvent(event)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Event
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => updateEventStatus(event.id, 'confirmed')}>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Mark Confirmed
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => updateEventStatus(event.id, 'in-progress')}>
                                    <Clock className="h-4 w-4 mr-2" />
                                    Mark In Progress
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => updateEventStatus(event.id, 'completed')}>
                                    <Star className="h-4 w-4 mr-2" />
                                    Mark Completed
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => deleteEvent(event.id)}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            {/* Event Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">{event.clientName}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">{event.clientEmail}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">{event.clientPhone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">{event.budget}</span>
                              </div>
                            </div>

                            {/* Event Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">Event Type</p>
                                <p className="text-sm text-muted-foreground">{event.eventType}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">Date & Time</p>
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    {formatDate(event.eventDate)} at {formatTime(event.eventTime)}
                                  </span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">Location</p>
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">{event.location}</span>
                                </div>
                              </div>
                            </div>

                            {/* Services */}
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-foreground">Services</p>
                              <div className="flex flex-wrap gap-2">
                                {event.services.map((service, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    <Package className="h-3 w-3 mr-1" />
                                    {service}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-foreground">Description</p>
                              <div className="bg-muted/50 rounded-lg p-4">
                                <p className="text-sm text-foreground">{event.description}</p>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-2 pt-2">
                              <Button
                                size="sm"
                                onClick={() => setSelectedEvent(event)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Event
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateEventStatus(event.id, 'confirmed')}
                                disabled={event.status === 'confirmed'}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Confirm
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      <Dialog open={selectedEvent !== null} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
            <DialogDescription>
              Complete information for {selectedEvent?.title}
            </DialogDescription>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-6">
              {/* Event Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">{selectedEvent.title}</h2>
                  <Badge className={`${getStatusColor(selectedEvent.status)} border w-fit`}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(selectedEvent.status)}
                      <span className="capitalize">{selectedEvent.status.replace('-', ' ')}</span>
                    </div>
                  </Badge>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>Created: {formatDateTime(selectedEvent.createdAt)}</p>
                  <p>Updated: {formatDateTime(selectedEvent.lastUpdated)}</p>
                </div>
              </div>

              <Separator />

              {/* Client Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Client Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Client Name:</span>
                      <span className="text-sm text-foreground">{selectedEvent.clientName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Email:</span>
                      <span className="text-sm text-foreground">{selectedEvent.clientEmail}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Phone:</span>
                      <span className="text-sm text-foreground">{selectedEvent.clientPhone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Event Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Event Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Event Type:</span>
                      <span className="text-sm text-foreground">{selectedEvent.eventType}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Date:</span>
                      <span className="text-sm text-foreground">{formatDate(selectedEvent.eventDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Time:</span>
                      <span className="text-sm text-foreground">{formatTime(selectedEvent.eventTime)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Location:</span>
                      <span className="text-sm text-foreground">{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Budget:</span>
                      <span className="text-sm text-foreground">{selectedEvent.budget}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.services.map((service, index) => (
                    <Badge key={index} variant="outline">
                      <Package className="h-3 w-3 mr-1" />
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Description</h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-foreground">{selectedEvent.description}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                  Close
                </Button>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Event
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Event Dialog */}
      <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create a new event booking with client and event details
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Client Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Client Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input id="clientName" placeholder="Enter client full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Email Address *</Label>
                  <Input id="clientEmail" type="email" placeholder="client@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientPhone">Phone Number *</Label>
                  <Input id="clientPhone" placeholder="+63 XXX XXX XXXX" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Event Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Event Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventTitle">Event Title *</Label>
                  <Input id="eventTitle" placeholder="Enter event title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type *</Label>
                  <select id="eventType" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">Select event type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Event Date *</Label>
                  <Input id="eventDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventTime">Event Time *</Label>
                  <Input id="eventTime" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input id="location" placeholder="Event venue/location" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget *</Label>
                  <Input id="budget" placeholder="₱50,000" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Services Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Services Required</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Floral Arrangements</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Table Settings</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Backdrop Design</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Lighting</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Sound System</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Photography</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Catering</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Entertainment</span>
                </label>
              </div>
            </div>

            <Separator />

            {/* Description Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Event Description</h3>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed description of the event requirements, theme, special requests, etc."
                  rows={4}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddEventDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                toast({
                  title: "Event Created",
                  description: "New event has been added successfully",
                });
                setIsAddEventDialogOpen(false);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={isEditEventDialogOpen} onOpenChange={setIsEditEventDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update event details and information
            </DialogDescription>
          </DialogHeader>

          {editingEvent && (
            <div className="space-y-6">
              {/* Client Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Client Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editClientName">Client Name *</Label>
                    <Input id="editClientName" defaultValue={editingEvent.clientName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editClientEmail">Email Address *</Label>
                    <Input id="editClientEmail" type="email" defaultValue={editingEvent.clientEmail} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editClientPhone">Phone Number *</Label>
                    <Input id="editClientPhone" defaultValue={editingEvent.clientPhone} />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Event Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Event Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editEventTitle">Event Title *</Label>
                    <Input id="editEventTitle" defaultValue={editingEvent.title} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editEventType">Event Type *</Label>
                    <select id="editEventType" defaultValue={editingEvent.eventType} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="Wedding">Wedding</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editEventDate">Event Date *</Label>
                    <Input id="editEventDate" type="date" defaultValue={editingEvent.eventDate} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editEventTime">Event Time *</Label>
                    <Input id="editEventTime" type="time" defaultValue={editingEvent.eventTime} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editLocation">Location *</Label>
                    <Input id="editLocation" defaultValue={editingEvent.location} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editBudget">Budget *</Label>
                    <Input id="editBudget" defaultValue={editingEvent.budget} />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Services Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Services Required</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Floral Arrangements', 'Table Settings', 'Backdrop Design', 'Lighting', 'Sound System', 'Photography', 'Catering', 'Entertainment'].map((service) => (
                    <label key={service} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded"
                        defaultChecked={editingEvent.services.includes(service)}
                      />
                      <span className="text-sm">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Description Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Event Description</h3>
                <div className="space-y-2">
                  <Label htmlFor="editDescription">Description</Label>
                  <Textarea
                    id="editDescription"
                    defaultValue={editingEvent.description}
                    rows={4}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditEventDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast({
                    title: "Event Updated",
                    description: "Event details have been updated successfully",
                  });
                  setIsEditEventDialogOpen(false);
                  setEditingEvent(null);
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Update Event
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
