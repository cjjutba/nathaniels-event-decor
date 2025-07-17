import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useHighlight, useScrollToHighlight } from "@/hooks/useHighlight";
import { HighlightableCard } from "@/components/common/HighlightableCard";
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
  Package,
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
  Users,
  Calendar,
  Image,
  Settings,
} from 'lucide-react';
import { useAdminActions } from '@/hooks/useAdminActions';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useDataInitialization } from '@/hooks/useDataInitialization';

interface Service {
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

interface FilterState {
  categories: string[];
  statuses: string[];
  priceRange: string;
}

export const AdminServicesPage: React.FC = () => {
  const { toast } = useToast();
  const adminActions = useAdminActions({
    entityName: 'service',
    entityDisplayName: 'Service'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
  const [isEditServiceDialogOpen, setIsEditServiceDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newServiceForm, setNewServiceForm] = useState({
    title: '',
    description: '',
    category: '',
    basePrice: '',
    features: [] as string[]
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    statuses: [],
    priceRange: 'all'
  });

  // Highlighting functionality
  const { highlightedId, isHighlighted } = useHighlight();
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollToHighlight(highlightedId, containerRef);

  // Initialize data in localStorage if empty
  useDataInitialization();

  // Use localStorage for services data
  const [services, setServices] = useLocalStorage<Service[]>('admin_services', []);

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'inactive':
        return <X className="h-4 w-4" />;
      case 'draft':
        return <Clock className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getServiceIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      Heart,
      Cake,
      PartyPopper,
      Building2,
      Crown,
      Sparkles,
      Package
    };
    return iconMap[iconName] || Package;
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

  // Get unique values for filters
  const uniqueCategories = [...new Set(services.map(service => service.category))];
  const uniqueStatuses = [...new Set(services.map(service => service.status))];

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      categories: [],
      statuses: [],
      priceRange: 'all'
    });
  };

  // Check if any filters are active
  const hasActiveFilters = filters.categories.length > 0 ||
                          filters.statuses.length > 0 ||
                          filters.priceRange !== 'all';

  // Filter services based on active tab, search query, and filters
  const filteredServices = services.filter(service => {
    // Search filter
    const matchesSearch = searchQuery === '' ||
                         service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));

    // Status filter (tab)
    const matchesStatus = activeTab === 'all' || service.status === activeTab;

    // Category filter
    const matchesCategory = filters.categories.length === 0 ||
                           filters.categories.includes(service.category);

    // Status filter (from dropdown)
    const matchesStatusFilter = filters.statuses.length === 0 ||
                               filters.statuses.includes(service.status);

    // Price range filter (simplified for demo)
    const matchesPriceRange = filters.priceRange === 'all' ||
                             (filters.priceRange === 'low' && parseInt(service.basePrice.replace(/[₱,]/g, '')) < 40000) ||
                             (filters.priceRange === 'medium' && parseInt(service.basePrice.replace(/[₱,]/g, '')) >= 40000 && parseInt(service.basePrice.replace(/[₱,]/g, '')) < 80000) ||
                             (filters.priceRange === 'high' && parseInt(service.basePrice.replace(/[₱,]/g, '')) >= 80000);

    return matchesSearch && matchesStatus && matchesCategory && matchesStatusFilter && matchesPriceRange;
  });

  // Statistics
  const stats = [
    {
      icon: Package,
      title: 'Total Services',
      value: services.length.toString(),
      change: '+8%',
      trend: 'up',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Available services'
    },
    {
      icon: CheckCircle,
      title: 'Active Services',
      value: services.filter(s => s.status === 'active').length.toString(),
      change: '+12%',
      trend: 'up',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Currently offered'
    },
    {
      icon: Star,
      title: 'Avg Rating',
      value: (services.reduce((acc, s) => acc + s.averageRating, 0) / services.length).toFixed(1),
      change: '+0.2',
      trend: 'up',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: 'Customer satisfaction'
    },
    {
      icon: Users,
      title: 'Total Bookings',
      value: services.reduce((acc, s) => acc + s.totalBookings, 0).toString(),
      change: '+18%',
      trend: 'up',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'All time bookings'
    }
  ];

  // Action handlers
  const updateServiceStatus = (id: string, newStatus: Service['status']) => {
    adminActions.handleStatusChange(
      id,
      newStatus,
      services,
      setServices,
      (service) => service.title
    );
  };

  const editService = (service: Service) => {
    setEditingService(service);
    setIsEditServiceDialogOpen(true);
  };

  const deleteService = (id: string) => {
    adminActions.handleDelete(
      id,
      services,
      setServices,
      (service) => service.title
    );
  };

  const createService = () => {
    if (!newServiceForm.title || !newServiceForm.description || !newServiceForm.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Title, Description, Category)",
        variant: "destructive"
      });
      return;
    }

    const newService: Service = {
      id: Date.now().toString(),
      title: newServiceForm.title,
      description: newServiceForm.description,
      category: newServiceForm.category,
      status: 'active',
      basePrice: newServiceForm.basePrice || '₱0',
      features: newServiceForm.features,
      icon: 'Star',
      image: '/images/service-placeholder.jpg',
      popularity: 0,
      totalBookings: 0,
      averageRating: 0,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    setServices(prev => [newService, ...prev]);

    // Reset form
    setNewServiceForm({
      title: '',
      description: '',
      category: '',
      basePrice: '',
      features: []
    });

    setIsAddServiceDialogOpen(false);

    toast({
      title: "Service Created",
      description: `"${newService.title}" has been added successfully`,
    });
  };

  return (
    <div ref={containerRef} className="space-y-8 p-6 overflow-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Manage Services</h1>
        <p className="text-muted-foreground">Add, edit, and organize your service offerings</p>
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
              <CardTitle>Service Management</CardTitle>
              <CardDescription>
                View and manage all service offerings
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
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
                        {filters.categories.length + filters.statuses.length + (filters.priceRange !== 'all' ? 1 : 0)}
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

                  {/* Category Filter */}
                  <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                    Category
                  </DropdownMenuLabel>
                  {uniqueCategories.map((category) => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilters(prev => ({
                            ...prev,
                            categories: [...prev.categories, category]
                          }));
                        } else {
                          setFilters(prev => ({
                            ...prev,
                            categories: prev.categories.filter(cat => cat !== category)
                          }));
                        }
                      }}
                    >
                      {category}
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
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </DropdownMenuCheckboxItem>
                  ))}

                  <DropdownMenuSeparator />

                  {/* Price Range Filter */}
                  <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                    Price Range
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={filters.priceRange === 'low'}
                    onCheckedChange={(checked) => {
                      setFilters(prev => ({
                        ...prev,
                        priceRange: checked ? 'low' : 'all'
                      }));
                    }}
                  >
                    Low (Under ₱40,000)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.priceRange === 'medium'}
                    onCheckedChange={(checked) => {
                      setFilters(prev => ({
                        ...prev,
                        priceRange: checked ? 'medium' : 'all'
                      }));
                    }}
                  >
                    Medium (₱40,000 - ₱80,000)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.priceRange === 'high'}
                    onCheckedChange={(checked) => {
                      setFilters(prev => ({
                        ...prev,
                        priceRange: checked ? 'high' : 'all'
                      }));
                    }}
                  >
                    High (₱80,000+)
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button size="sm" onClick={() => setIsAddServiceDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
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
              {filters.categories.map((category) => (
                <Badge key={category} variant="secondary" className="gap-1">
                  {category}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        categories: prev.categories.filter(cat => cat !== category)
                      }));
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
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
              {filters.priceRange !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {filters.priceRange === 'low' ? 'Low Price' :
                   filters.priceRange === 'medium' ? 'Medium Price' : 'High Price'}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => setFilters(prev => ({ ...prev, priceRange: 'all' }))}
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({services.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({services.filter(s => s.status === 'active').length})</TabsTrigger>
              <TabsTrigger value="inactive">Inactive ({services.filter(s => s.status === 'inactive').length})</TabsTrigger>
              <TabsTrigger value="draft">Draft ({services.filter(s => s.status === 'draft').length})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredServices.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No services found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? 'Try adjusting your search terms.' : 'No services match the current filter.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => {
                    const ServiceIcon = getServiceIcon(service.icon);
                    return (
                      <HighlightableCard
                        key={service.id}
                        itemId={service.id}
                        isHighlighted={isHighlighted(service.id)}
                      >
                        <Card className="hover:shadow-md transition-shadow group">
                        <div className="relative">
                          <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 rounded-t-lg flex items-center justify-center">
                            <ServiceIcon className="h-16 w-16 text-primary" />
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge className={`${getStatusColor(service.status)} border`}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(service.status)}
                                <span className="capitalize">{service.status}</span>
                              </div>
                            </Badge>
                          </div>
                          <div className="absolute top-4 left-4">
                            <Badge variant="secondary" className="text-xs">
                              {service.category}
                            </Badge>
                          </div>
                        </div>

                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                              <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                                {service.description}
                              </CardDescription>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={() => setSelectedService(service)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Service
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateServiceStatus(service.id, 'active')}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark Active
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateServiceStatus(service.id, 'inactive')}>
                                  <X className="h-4 w-4 mr-2" />
                                  Mark Inactive
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteService(service.id)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>

                        <CardContent>
                          {/* Service Metrics */}
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                              <div className="flex items-center justify-center space-x-1 mb-1">
                                <Star className="h-3 w-3 text-yellow-500" />
                                <span className="text-sm font-medium">{service.averageRating}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Rating</p>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center space-x-1 mb-1">
                                <Users className="h-3 w-3 text-blue-500" />
                                <span className="text-sm font-medium">{service.totalBookings}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Bookings</p>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center space-x-1 mb-1">
                                <DollarSign className="h-3 w-3 text-green-500" />
                                <span className="text-sm font-medium">{service.basePrice}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Base Price</p>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="space-y-2 mb-4">
                            <p className="text-sm font-medium text-foreground">Key Features</p>
                            <div className="space-y-1">
                              {service.features.slice(0, 3).map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2 text-xs text-muted-foreground">
                                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                                  <span>{feature}</span>
                                </div>
                              ))}
                              {service.features.length > 3 && (
                                <p className="text-xs text-muted-foreground">+{service.features.length - 3} more features</p>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() => setSelectedService(service)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={() => editService(service)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={() => setSelectedService(service)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => editService(service)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Service
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => updateServiceStatus(service.id, 'active')}
                                  disabled={service.status === 'active'}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark Active
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => updateServiceStatus(service.id, 'inactive')}
                                  disabled={service.status === 'inactive'}
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Mark Inactive
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => deleteService(service.id)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Service
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
                        </Card>
                      </HighlightableCard>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Service Details Dialog */}
      <Dialog open={selectedService !== null} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Service Details</DialogTitle>
            <DialogDescription>
              Complete information for {selectedService?.title}
            </DialogDescription>
          </DialogHeader>

          {selectedService && (
            <div className="space-y-6">
              {/* Service Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    {React.createElement(getServiceIcon(selectedService.icon), { className: "h-8 w-8 text-primary" })}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">{selectedService.title}</h2>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getStatusColor(selectedService.status)} border`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(selectedService.status)}
                          <span className="capitalize">{selectedService.status}</span>
                        </div>
                      </Badge>
                      <Badge variant="outline">{selectedService.category}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>Created: {formatDateTime(selectedService.createdAt)}</p>
                  <p>Updated: {formatDateTime(selectedService.lastUpdated)}</p>
                </div>
              </div>

              <Separator />

              {/* Service Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="text-2xl font-bold">{selectedService.averageRating}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span className="text-2xl font-bold">{selectedService.totalBookings}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <span className="text-2xl font-bold">{selectedService.basePrice}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Base Price</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Package className="h-5 w-5 text-purple-500" />
                    <span className="text-2xl font-bold">{selectedService.popularity}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Popularity</p>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Description</h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-foreground">{selectedService.description}</p>
                </div>
              </div>

              <Separator />

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Features & Inclusions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedService.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedService(null)}>
                  Close
                </Button>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Service
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Service Dialog */}
      <Dialog open={isAddServiceDialogOpen} onOpenChange={setIsAddServiceDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a new service offering for your business
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Service Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter service title"
                  value={newServiceForm.title}
                  onChange={(e) => setNewServiceForm(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newServiceForm.category}
                  onChange={(e) => setNewServiceForm(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="">Select category</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Enter service description"
                rows={3}
                value={newServiceForm.description}
                onChange={(e) => setNewServiceForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price</Label>
              <Input
                id="basePrice"
                placeholder="₱0"
                value={newServiceForm.basePrice}
                onChange={(e) => setNewServiceForm(prev => ({ ...prev, basePrice: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Features (one per line)</Label>
              <Textarea
                id="features"
                placeholder="Enter features, one per line"
                rows={4}
                value={newServiceForm.features.join('\n')}
                onChange={(e) => setNewServiceForm(prev => ({ ...prev, features: e.target.value.split('\n').filter(f => f.trim()) }))}
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddServiceDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createService}>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={isEditServiceDialogOpen} onOpenChange={setIsEditServiceDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update service information and details
            </DialogDescription>
          </DialogHeader>

          {editingService && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editServiceTitle">Service Title *</Label>
                  <Input id="editServiceTitle" defaultValue={editingService.title} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editServiceCategory">Category *</Label>
                  <select id="editServiceCategory" defaultValue={editingService.category} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editServicePrice">Price *</Label>
                  <Input id="editServicePrice" defaultValue={editingService.price} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editServiceDuration">Duration</Label>
                  <Input id="editServiceDuration" defaultValue={editingService.duration} placeholder="e.g., 8 hours" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editServiceDescription">Description *</Label>
                <Textarea
                  id="editServiceDescription"
                  defaultValue={editingService.description}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editServiceFeatures">Features (comma separated)</Label>
                <Textarea
                  id="editServiceFeatures"
                  defaultValue={editingService.features.join(', ')}
                  placeholder="Feature 1, Feature 2, Feature 3"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditServiceDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast({
                    title: "Service Updated",
                    description: "Service details have been updated successfully",
                  });
                  setIsEditServiceDialogOpen(false);
                  setEditingService(null);
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Update Service
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
