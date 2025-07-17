import React, { useState, useEffect, useRef } from 'react';
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
import { HighlightableCard } from '@/components/ui/highlightable-card';
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  Heart,
  Cake,
  PartyPopper,
  Building2,
  Crown,
  Sparkles,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Star,
  Trash2,
  Archive,
  FileText,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  MapPin,
  User,
  UserCheck,
  UserX,
  MessageSquare,
  CalendarDays,
  Settings,
} from 'lucide-react';
import { useAdminActions } from '@/hooks/useAdminActions';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useDataInitialization } from '@/hooks/useDataInitialization';

interface Client {
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

interface FilterState {
  statuses: string[];
  services: string[];
  locations: string[];
  spendingRange: string;
}

export const AdminClientsPage: React.FC = () => {
  const { toast } = useToast();
  const adminActions = useAdminActions({
    entityName: 'client',
    entityDisplayName: 'Client'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [isEditClientDialogOpen, setIsEditClientDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [newClientForm, setNewClientForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    preferredServices: [] as string[],
    notes: '',
    communicationPreference: 'email' as 'email' | 'phone' | 'both'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    statuses: [],
    services: [],
    locations: [],
    spendingRange: 'all'
  });

  // URL parameter handling for search highlighting
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const highlightId = urlParams.get('highlight');

    if (highlightId) {
      setHighlightedItemId(highlightId);

      // Scroll to highlighted item after a short delay to ensure rendering
      setTimeout(() => {
        const element = document.querySelector(`[data-item-id="${highlightId}"]`);
        if (element && containerRef.current) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 100);

      // Clear highlight after 3 seconds
      setTimeout(() => {
        setHighlightedItemId(null);
        // Remove highlight parameter from URL
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete('highlight');
        window.history.replaceState({}, '', newUrl.toString());
      }, 3000);
    }
  }, []);

  const isHighlighted = (itemId: string) => highlightedItemId === itemId;

  // Initialize data in localStorage if empty
  useDataInitialization();

  // Use localStorage for clients data
  const [clients, setClients] = useLocalStorage<Client[]>('admin_clients', []);

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'vip':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <UserCheck className="h-4 w-4" />;
      case 'inactive':
        return <UserX className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'vip':
        return <Star className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getServiceIcon = (service: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'Wedding Planning': Heart,
      'Birthday Celebrations': Cake,
      'Cultural Events': PartyPopper,
      'Corporate Events': Building2,
      'Anniversary Celebrations': Heart,
      'Graduation Parties': Sparkles
    };
    return iconMap[service] || Users;
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Get unique values for filters
  const uniqueStatuses = [...new Set(clients.map(client => client.status))];
  const uniqueServices = [...new Set(clients.flatMap(client => client.preferredServices))];
  const uniqueLocations = [...new Set(clients.map(client => client.location))];

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      statuses: [],
      services: [],
      locations: [],
      spendingRange: 'all'
    });
  };

  // Check if any filters are active
  const hasActiveFilters = filters.statuses.length > 0 ||
                          filters.services.length > 0 ||
                          filters.locations.length > 0 ||
                          filters.spendingRange !== 'all';

  // Filter clients based on active tab, search query, and filters
  const filteredClients = clients.filter(client => {
    // Search filter
    const matchesSearch = searchQuery === '' ||
                         client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.preferredServices.some(service => service.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         client.notes.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter (tab)
    const matchesStatus = activeTab === 'all' || client.status === activeTab;

    // Status filter (from dropdown)
    const matchesStatusFilter = filters.statuses.length === 0 ||
                               filters.statuses.includes(client.status);

    // Services filter
    const matchesServices = filters.services.length === 0 ||
                           filters.services.some(service => client.preferredServices.includes(service));

    // Location filter
    const matchesLocation = filters.locations.length === 0 ||
                           filters.locations.includes(client.location);

    // Spending range filter (simplified for demo)
    const matchesSpendingRange = filters.spendingRange === 'all' ||
                                (filters.spendingRange === 'low' && parseInt(client.totalSpent.replace(/[₱,]/g, '')) < 100000) ||
                                (filters.spendingRange === 'medium' && parseInt(client.totalSpent.replace(/[₱,]/g, '')) >= 100000 && parseInt(client.totalSpent.replace(/[₱,]/g, '')) < 300000) ||
                                (filters.spendingRange === 'high' && parseInt(client.totalSpent.replace(/[₱,]/g, '')) >= 300000);

    return matchesSearch && matchesStatus && matchesStatusFilter && matchesServices && matchesLocation && matchesSpendingRange;
  });

  // Statistics
  const stats = [
    {
      icon: Users,
      title: 'Total Clients',
      value: clients.length.toString(),
      change: '+15%',
      trend: 'up',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Registered clients'
    },
    {
      icon: UserCheck,
      title: 'Active Clients',
      value: clients.filter(c => c.status === 'active' || c.status === 'vip').length.toString(),
      change: '+20%',
      trend: 'up',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Currently engaged'
    },
    {
      icon: DollarSign,
      title: 'Total Revenue',
      value: '₱' + clients.reduce((acc, c) => acc + parseInt(c.totalSpent.replace(/[₱,]/g, '') || '0'), 0).toLocaleString(),
      change: '+25%',
      trend: 'up',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'From all clients'
    },
    {
      icon: Star,
      title: 'VIP Clients',
      value: clients.filter(c => c.status === 'vip').length.toString(),
      change: '+10%',
      trend: 'up',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Premium clients'
    }
  ];

  // Action handlers
  const updateClientStatus = (id: string, newStatus: Client['status']) => {
    adminActions.handleStatusChange(
      id,
      newStatus,
      clients,
      setClients,
      (client) => client.name
    );
  };

  const editClient = (client: Client) => {
    setEditingClient(client);
    setIsEditClientDialogOpen(true);
  };

  const deleteClient = (id: string) => {
    adminActions.handleDelete(
      id,
      clients,
      setClients,
      (client) => client.name
    );
  };

  const createClient = () => {
    if (!newClientForm.name || !newClientForm.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email)",
        variant: "destructive"
      });
      return;
    }

    const newClient: Client = {
      id: Date.now().toString(),
      name: newClientForm.name,
      email: newClientForm.email,
      phone: newClientForm.phone,
      location: newClientForm.location || 'Not specified',
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString(),
      totalEvents: 0,
      totalSpent: '₱0',
      preferredServices: newClientForm.preferredServices,
      notes: newClientForm.notes,
      rating: 0,
      communicationPreference: newClientForm.communicationPreference,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    setClients(prev => [newClient, ...prev]);

    // Reset form
    setNewClientForm({
      name: '',
      email: '',
      phone: '',
      location: '',
      preferredServices: [],
      notes: '',
      communicationPreference: 'email'
    });

    setIsAddClientDialogOpen(false);

    toast({
      title: "Client Added",
      description: `"${newClient.name}" has been added successfully`,
    });
  };

  return (
    <div ref={containerRef} className="space-y-8 p-6 overflow-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Client Accounts</h1>
        <p className="text-muted-foreground">View and manage registered clients</p>
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
              <CardTitle>Client Management</CardTitle>
              <CardDescription>
                View and manage all registered clients
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
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
                        {filters.statuses.length + filters.services.length + filters.locations.length + (filters.spendingRange !== 'all' ? 1 : 0)}
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
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </DropdownMenuCheckboxItem>
                  ))}

                  <DropdownMenuSeparator />

                  {/* Location Filter */}
                  <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                    Location
                  </DropdownMenuLabel>
                  {uniqueLocations.slice(0, 5).map((location) => (
                    <DropdownMenuCheckboxItem
                      key={location}
                      checked={filters.locations.includes(location)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilters(prev => ({
                            ...prev,
                            locations: [...prev.locations, location]
                          }));
                        } else {
                          setFilters(prev => ({
                            ...prev,
                            locations: prev.locations.filter(loc => loc !== location)
                          }));
                        }
                      }}
                    >
                      {location}
                    </DropdownMenuCheckboxItem>
                  ))}

                  <DropdownMenuSeparator />

                  {/* Spending Range Filter */}
                  <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                    Spending Range
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={filters.spendingRange === 'low'}
                    onCheckedChange={(checked) => {
                      setFilters(prev => ({
                        ...prev,
                        spendingRange: checked ? 'low' : 'all'
                      }));
                    }}
                  >
                    Low (Under ₱100,000)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.spendingRange === 'medium'}
                    onCheckedChange={(checked) => {
                      setFilters(prev => ({
                        ...prev,
                        spendingRange: checked ? 'medium' : 'all'
                      }));
                    }}
                  >
                    Medium (₱100,000 - ₱300,000)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.spendingRange === 'high'}
                    onCheckedChange={(checked) => {
                      setFilters(prev => ({
                        ...prev,
                        spendingRange: checked ? 'high' : 'all'
                      }));
                    }}
                  >
                    High (₱300,000+)
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button size="sm" onClick={() => setIsAddClientDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Client
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
              {filters.statuses.map((status) => (
                <Badge key={status} variant="secondary" className="gap-1">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
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
              {filters.locations.map((location) => (
                <Badge key={location} variant="secondary" className="gap-1">
                  {location}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        locations: prev.locations.filter(loc => loc !== location)
                      }));
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {filters.spendingRange !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {filters.spendingRange === 'low' ? 'Low Spending' :
                   filters.spendingRange === 'medium' ? 'Medium Spending' : 'High Spending'}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => setFilters(prev => ({ ...prev, spendingRange: 'all' }))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
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
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All ({clients.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({clients.filter(c => c.status === 'active').length})</TabsTrigger>
              <TabsTrigger value="vip">VIP ({clients.filter(c => c.status === 'vip').length})</TabsTrigger>
              <TabsTrigger value="inactive">Inactive ({clients.filter(c => c.status === 'inactive').length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({clients.filter(c => c.status === 'pending').length})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredClients.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No clients found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? 'Try adjusting your search terms.' : 'No clients match the current filter.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredClients.map((client) => (
                    <HighlightableCard
                      key={client.id}
                      itemId={client.id}
                      isHighlighted={isHighlighted(client.id)}
                    >
                      <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-4">
                            {/* Header Row */}
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-3">
                                  <h3 className="text-lg font-semibold text-foreground">{client.name}</h3>
                                  <Badge className={`${getStatusColor(client.status)} border`}>
                                    <div className="flex items-center space-x-1">
                                      {getStatusIcon(client.status)}
                                      <span className="capitalize">{client.status}</span>
                                    </div>
                                  </Badge>
                                  {client.rating > 0 && (
                                    <div className="flex items-center space-x-1">
                                      {renderStars(client.rating)}
                                      <span className="text-sm text-muted-foreground">({client.rating})</span>
                                    </div>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Joined {formatDate(client.joinDate)} • Last active {formatDateTime(client.lastActivity)}
                                </p>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuItem onClick={() => setSelectedClient(client)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => editClient(client)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Client
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Send Message
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => updateClientStatus(client.id, 'vip')}>
                                    <Star className="h-4 w-4 mr-2" />
                                    Mark as VIP
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => updateClientStatus(client.id, 'active')}>
                                    <UserCheck className="h-4 w-4 mr-2" />
                                    Mark Active
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => deleteClient(client.id)}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            {/* Client Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">{client.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">{client.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">{client.location}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">{client.totalSpent}</span>
                              </div>
                            </div>

                            {/* Client Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">Total Events</p>
                                <div className="flex items-center space-x-2">
                                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">{client.totalEvents} events</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">Communication</p>
                                <div className="flex items-center space-x-2">
                                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground capitalize">{client.communicationPreference}</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">Client Since</p>
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">{formatDate(client.joinDate)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Preferred Services */}
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-foreground">Preferred Services</p>
                              <div className="flex flex-wrap gap-2">
                                {client.preferredServices.map((service, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {React.createElement(getServiceIcon(service), { className: "h-3 w-3 mr-1" })}
                                    {service}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Notes */}
                            {client.notes && (
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-foreground">Notes</p>
                                <div className="bg-muted/50 rounded-lg p-4">
                                  <p className="text-sm text-foreground">{client.notes}</p>
                                </div>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-2 pt-2">
                              <Button
                                size="sm"
                                onClick={() => setSelectedClient(client)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => editClient(client)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Client
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                              >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      </Card>
                    </HighlightableCard>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Client Details Dialog */}
      <Dialog open={selectedClient !== null} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
            <DialogDescription>
              Complete information for {selectedClient?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedClient && (
            <div className="space-y-6">
              {/* Client Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">{selectedClient.name}</h2>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getStatusColor(selectedClient.status)} border`}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(selectedClient.status)}
                        <span className="capitalize">{selectedClient.status}</span>
                      </div>
                    </Badge>
                    {selectedClient.rating > 0 && (
                      <div className="flex items-center space-x-1">
                        {renderStars(selectedClient.rating)}
                        <span className="text-sm text-muted-foreground">({selectedClient.rating})</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>Joined: {formatDate(selectedClient.joinDate)}</p>
                  <p>Last Active: {formatDateTime(selectedClient.lastActivity)}</p>
                </div>
              </div>

              <Separator />

              {/* Client Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <CalendarDays className="h-5 w-5 text-blue-500" />
                    <span className="text-2xl font-bold">{selectedClient.totalEvents}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Total Events</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <span className="text-2xl font-bold">{selectedClient.totalSpent}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="text-2xl font-bold">{selectedClient.rating || 'N/A'}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <MessageSquare className="h-5 w-5 text-purple-500" />
                    <span className="text-2xl font-bold capitalize">{selectedClient.communicationPreference}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Prefers</p>
                </div>
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{selectedClient.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{selectedClient.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{selectedClient.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Communication</p>
                      <p className="text-sm text-muted-foreground capitalize">{selectedClient.communicationPreference}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Preferred Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Preferred Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedClient.preferredServices.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      {React.createElement(getServiceIcon(service), { className: "h-4 w-4 text-muted-foreground" })}
                      <span className="text-sm text-foreground">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Notes */}
              {selectedClient.notes && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Notes</h3>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-foreground">{selectedClient.notes}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedClient(null)}>
                  Close
                </Button>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Client
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Client Dialog */}
      <Dialog open={isAddClientDialogOpen} onOpenChange={setIsAddClientDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>
              Register a new client in the system
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Client Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter client name"
                  value={newClientForm.name}
                  onChange={(e) => setNewClientForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={newClientForm.email}
                  onChange={(e) => setNewClientForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  value={newClientForm.phone}
                  onChange={(e) => setNewClientForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter location"
                  value={newClientForm.location}
                  onChange={(e) => setNewClientForm(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="services">Preferred Services (comma separated)</Label>
              <Input
                id="services"
                placeholder="Wedding Planning, Corporate Events, etc."
                value={newClientForm.preferredServices.join(', ')}
                onChange={(e) => setNewClientForm(prev => ({ ...prev, preferredServices: e.target.value.split(',').map(s => s.trim()).filter(s => s) }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter any notes about the client"
                rows={3}
                value={newClientForm.notes}
                onChange={(e) => setNewClientForm(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddClientDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createClient}>
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Client Dialog */}
      <Dialog open={isEditClientDialogOpen} onOpenChange={setIsEditClientDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>
              Update client information and details
            </DialogDescription>
          </DialogHeader>

          {editingClient && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editClientName">Full Name *</Label>
                  <Input id="editClientName" defaultValue={editingClient.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editClientEmail">Email Address *</Label>
                  <Input id="editClientEmail" type="email" defaultValue={editingClient.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editClientPhone">Phone Number *</Label>
                  <Input id="editClientPhone" defaultValue={editingClient.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editClientCompany">Company</Label>
                  <Input id="editClientCompany" defaultValue={editingClient.company} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editClientLocation">Location</Label>
                  <Input id="editClientLocation" defaultValue={editingClient.location} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editClientStatus">Status</Label>
                  <select id="editClientStatus" defaultValue={editingClient.status} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="vip">VIP</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editClientServices">Preferred Services (comma separated)</Label>
                <Input
                  id="editClientServices"
                  defaultValue={editingClient.preferredServices.join(', ')}
                  placeholder="Wedding Planning, Corporate Events, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editClientNotes">Notes</Label>
                <Textarea
                  id="editClientNotes"
                  defaultValue={editingClient.notes}
                  placeholder="Enter any notes about the client"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditClientDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast({
                    title: "Client Updated",
                    description: "Client information has been updated successfully",
                  });
                  setIsEditClientDialogOpen(false);
                  setEditingClient(null);
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Update Client
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
