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
import {
  ClipboardList,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Send,
  Archive,
  Trash2,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  X,
} from 'lucide-react';
import { HighlightableCard } from '@/components/ui/highlightable-card';

interface Inquiry {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  location: string;
  budget: string;
  message: string;
  status: 'new' | 'in-progress' | 'responded' | 'converted' | 'archived';
  submittedAt: string;
  lastUpdated: string;
}

interface FilterState {
  eventTypes: string[];
  dateRange: string;
  budgetRange: string;
}

export const AdminInquiriesPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    eventTypes: [],
    dateRange: 'all',
    budgetRange: 'all'
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

  // Sample inquiry data
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: '1',
      clientName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      eventType: 'Wedding',
      eventDate: '2024-06-15',
      location: 'Manila Hotel, Philippines',
      budget: '₱150,000 - ₱200,000',
      message: 'Hi! I\'m planning my wedding for June 2024 and would love to discuss decoration options. We\'re looking for an elegant, romantic theme with white and gold accents.',
      status: 'new',
      submittedAt: '2024-01-15T10:30:00Z',
      lastUpdated: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      clientName: 'Michael Chen',
      email: 'michael.chen@company.com',
      phone: '+1 (555) 987-6543',
      eventType: 'Corporate Event',
      eventDate: '2024-03-20',
      location: 'BGC Convention Center',
      budget: '₱80,000 - ₱120,000',
      message: 'We need event decoration for our annual company gala. The theme should be modern and professional with our brand colors (blue and silver).',
      status: 'in-progress',
      submittedAt: '2024-01-14T14:20:00Z',
      lastUpdated: '2024-01-14T16:45:00Z'
    },
    {
      id: '3',
      clientName: 'Maria Rodriguez',
      email: 'maria.rodriguez@email.com',
      phone: '+1 (555) 456-7890',
      eventType: 'Birthday Party',
      eventDate: '2024-02-28',
      location: 'Private Residence, Makati',
      budget: '₱30,000 - ₱50,000',
      message: 'Planning a surprise 50th birthday party for my husband. Looking for sophisticated decorations with a vintage theme.',
      status: 'responded',
      submittedAt: '2024-01-13T09:15:00Z',
      lastUpdated: '2024-01-13T11:30:00Z'
    },
    {
      id: '4',
      clientName: 'David Kim',
      email: 'david.kim@email.com',
      phone: '+1 (555) 321-0987',
      eventType: 'Anniversary',
      eventDate: '2024-04-10',
      location: 'Garden Restaurant, Quezon City',
      budget: '₱60,000 - ₱90,000',
      message: 'Celebrating our 25th wedding anniversary. We want something romantic and elegant with floral arrangements.',
      status: 'converted',
      submittedAt: '2024-01-12T16:45:00Z',
      lastUpdated: '2024-01-12T18:20:00Z'
    },
    {
      id: '5',
      clientName: 'Lisa Thompson',
      email: 'lisa.thompson@email.com',
      phone: '+1 (555) 654-3210',
      eventType: 'Graduation Party',
      eventDate: '2024-05-05',
      location: 'University Club, Diliman',
      budget: '₱40,000 - ₱70,000',
      message: 'Graduation party for my daughter. Looking for fun, colorful decorations with a celebration theme.',
      status: 'archived',
      submittedAt: '2024-01-11T13:20:00Z',
      lastUpdated: '2024-01-11T15:10:00Z'
    }
  ]);

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'responded':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'converted':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="h-4 w-4" />;
      case 'in-progress':
        return <Clock className="h-4 w-4" />;
      case 'responded':
        return <MessageSquare className="h-4 w-4" />;
      case 'converted':
        return <CheckCircle className="h-4 w-4" />;
      case 'archived':
        return <Archive className="h-4 w-4" />;
      default:
        return <ClipboardList className="h-4 w-4" />;
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

  // Get unique event types for filter
  const uniqueEventTypes = [...new Set(inquiries.map(inquiry => inquiry.eventType))];

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      eventTypes: [],
      dateRange: 'all',
      budgetRange: 'all'
    });
  };

  // Check if any filters are active
  const hasActiveFilters = filters.eventTypes.length > 0 ||
                          filters.dateRange !== 'all' ||
                          filters.budgetRange !== 'all';

  // Filter inquiries based on active tab, search query, and filters
  const filteredInquiries = inquiries.filter(inquiry => {
    // Search filter
    const matchesSearch = searchQuery === '' ||
                         inquiry.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inquiry.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inquiry.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inquiry.message.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter (tab)
    const matchesStatus = activeTab === 'all' || inquiry.status === activeTab;

    // Event type filter
    const matchesEventType = filters.eventTypes.length === 0 ||
                            filters.eventTypes.includes(inquiry.eventType);

    // Date range filter (simplified for demo)
    const matchesDateRange = filters.dateRange === 'all' ||
                            (filters.dateRange === 'this-month' &&
                             new Date(inquiry.eventDate).getMonth() === new Date().getMonth()) ||
                            (filters.dateRange === 'next-month' &&
                             new Date(inquiry.eventDate).getMonth() === new Date().getMonth() + 1);

    // Budget range filter (simplified for demo)
    const matchesBudgetRange = filters.budgetRange === 'all' ||
                              (filters.budgetRange === 'low' && inquiry.budget.includes('30,000')) ||
                              (filters.budgetRange === 'medium' && (inquiry.budget.includes('80,000') || inquiry.budget.includes('60,000'))) ||
                              (filters.budgetRange === 'high' && inquiry.budget.includes('150,000'));

    return matchesSearch && matchesStatus && matchesEventType && matchesDateRange && matchesBudgetRange;
  });

  // Statistics
  const stats = [
    {
      icon: ClipboardList,
      title: 'Total Inquiries',
      value: inquiries.length.toString(),
      change: '+12%',
      trend: 'up',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'This month'
    },
    {
      icon: AlertCircle,
      title: 'New Inquiries',
      value: inquiries.filter(i => i.status === 'new').length.toString(),
      change: '+25%',
      trend: 'up',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Pending review'
    },
    {
      icon: Clock,
      title: 'In Progress',
      value: inquiries.filter(i => i.status === 'in-progress').length.toString(),
      change: '+8%',
      trend: 'up',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: 'Being processed'
    },
    {
      icon: CheckCircle,
      title: 'Converted',
      value: inquiries.filter(i => i.status === 'converted').length.toString(),
      change: '+15%',
      trend: 'up',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'This month'
    }
  ];

  // Action handlers
  const updateInquiryStatus = (id: string, newStatus: Inquiry['status']) => {
    setInquiries(prev => prev.map(inquiry =>
      inquiry.id === id
        ? { ...inquiry, status: newStatus, lastUpdated: new Date().toISOString() }
        : inquiry
    ));

    toast({
      title: "Status Updated",
      description: `Inquiry status changed to ${newStatus}`,
    });
  };

  const deleteInquiry = (id: string) => {
    const inquiry = inquiries.find(i => i.id === id);
    setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));

    toast({
      title: "Inquiry Deleted",
      description: `Inquiry from ${inquiry?.clientName} has been deleted`,
    });
  };

  const sendResponse = () => {
    if (!selectedInquiry || !responseMessage.trim()) return;

    updateInquiryStatus(selectedInquiry.id, 'responded');
    setResponseMessage('');
    setIsResponseDialogOpen(false);

    toast({
      title: "Response Sent",
      description: `Response sent to ${selectedInquiry.clientName}`,
    });
  };

  return (
    <div ref={containerRef} className="space-y-8 p-6 overflow-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Client Inquiries</h1>
        <p className="text-muted-foreground">Manage and respond to client inquiries</p>
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
              <CardTitle>Inquiry Management</CardTitle>
              <CardDescription>
                View and manage all client inquiries
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search inquiries..."
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
                        {filters.eventTypes.length + (filters.dateRange !== 'all' ? 1 : 0) + (filters.budgetRange !== 'all' ? 1 : 0)}
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

                  {/* Date Range Filter */}
                  <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                    Event Date
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={filters.dateRange === 'this-month'}
                    onCheckedChange={(checked) => {
                      setFilters(prev => ({
                        ...prev,
                        dateRange: checked ? 'this-month' : 'all'
                      }));
                    }}
                  >
                    This Month
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.dateRange === 'next-month'}
                    onCheckedChange={(checked) => {
                      setFilters(prev => ({
                        ...prev,
                        dateRange: checked ? 'next-month' : 'all'
                      }));
                    }}
                  >
                    Next Month
                  </DropdownMenuCheckboxItem>

                  <DropdownMenuSeparator />

                  {/* Budget Range Filter */}
                  <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                    Budget Range
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={filters.budgetRange === 'low'}
                    onCheckedChange={(checked) => {
                      setFilters(prev => ({
                        ...prev,
                        budgetRange: checked ? 'low' : 'all'
                      }));
                    }}
                  >
                    Low (₱30,000 - ₱50,000)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.budgetRange === 'medium'}
                    onCheckedChange={(checked) => {
                      setFilters(prev => ({
                        ...prev,
                        budgetRange: checked ? 'medium' : 'all'
                      }));
                    }}
                  >
                    Medium (₱60,000 - ₱120,000)
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.budgetRange === 'high'}
                    onCheckedChange={(checked) => {
                      setFilters(prev => ({
                        ...prev,
                        budgetRange: checked ? 'high' : 'all'
                      }));
                    }}
                  >
                    High (₱150,000+)
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
              {filters.dateRange !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {filters.dateRange === 'this-month' ? 'This Month' : 'Next Month'}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => setFilters(prev => ({ ...prev, dateRange: 'all' }))}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.budgetRange !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {filters.budgetRange === 'low' ? 'Low Budget' :
                   filters.budgetRange === 'medium' ? 'Medium Budget' : 'High Budget'}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => setFilters(prev => ({ ...prev, budgetRange: 'all' }))}
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
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All ({inquiries.length})</TabsTrigger>
              <TabsTrigger value="new">New ({inquiries.filter(i => i.status === 'new').length})</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress ({inquiries.filter(i => i.status === 'in-progress').length})</TabsTrigger>
              <TabsTrigger value="responded">Responded ({inquiries.filter(i => i.status === 'responded').length})</TabsTrigger>
              <TabsTrigger value="converted">Converted ({inquiries.filter(i => i.status === 'converted').length})</TabsTrigger>
              <TabsTrigger value="archived">Archived ({inquiries.filter(i => i.status === 'archived').length})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredInquiries.length === 0 ? (
                <div className="text-center py-12">
                  <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No inquiries found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? 'Try adjusting your search terms.' : 'No inquiries match the current filter.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredInquiries.map((inquiry) => (
                    <HighlightableCard
                      key={inquiry.id}
                      itemId={inquiry.id}
                      isHighlighted={isHighlighted(inquiry.id)}
                    >
                      <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-4">
                            {/* Header Row */}
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-3">
                                  <h3 className="text-lg font-semibold text-foreground">{inquiry.clientName}</h3>
                                  <Badge className={`${getStatusColor(inquiry.status)} border`}>
                                    <div className="flex items-center space-x-1">
                                      {getStatusIcon(inquiry.status)}
                                      <span className="capitalize">{inquiry.status.replace('-', ' ')}</span>
                                    </div>
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Submitted {formatDateTime(inquiry.submittedAt)}
                                </p>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuItem onClick={() => setSelectedInquiry(inquiry)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedInquiry(inquiry);
                                      setIsResponseDialogOpen(true);
                                    }}
                                  >
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Send Response
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => updateInquiryStatus(inquiry.id, 'in-progress')}>
                                    <Clock className="h-4 w-4 mr-2" />
                                    Mark In Progress
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => updateInquiryStatus(inquiry.id, 'converted')}>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Mark Converted
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => updateInquiryStatus(inquiry.id, 'archived')}>
                                    <Archive className="h-4 w-4 mr-2" />
                                    Archive
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => deleteInquiry(inquiry.id)}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            {/* Contact Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">{inquiry.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">{inquiry.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">{formatDate(inquiry.eventDate)}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-foreground">{inquiry.budget}</span>
                              </div>
                            </div>

                            {/* Event Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">Event Type</p>
                                <p className="text-sm text-muted-foreground">{inquiry.eventType}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-foreground">Location</p>
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">{inquiry.location}</span>
                                </div>
                              </div>
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-foreground">Message</p>
                              <div className="bg-muted/50 rounded-lg p-4">
                                <p className="text-sm text-foreground">{inquiry.message}</p>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-2 pt-2">
                              <Button
                                size="sm"
                                onClick={() => {
                                  setSelectedInquiry(inquiry);
                                  setIsResponseDialogOpen(true);
                                }}
                              >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Send Response
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateInquiryStatus(inquiry.id, 'in-progress')}
                                disabled={inquiry.status === 'in-progress'}
                              >
                                <Clock className="h-4 w-4 mr-2" />
                                Mark In Progress
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateInquiryStatus(inquiry.id, 'converted')}
                                disabled={inquiry.status === 'converted'}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Convert
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

      {/* Response Dialog */}
      <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Response</DialogTitle>
            <DialogDescription>
              Send a response to {selectedInquiry?.clientName} regarding their {selectedInquiry?.eventType} inquiry.
            </DialogDescription>
          </DialogHeader>

          {selectedInquiry && (
            <div className="space-y-4">
              {/* Inquiry Summary */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">Inquiry Details</h4>
                  <Badge className={`${getStatusColor(selectedInquiry.status)} border`}>
                    {selectedInquiry.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Event:</span>
                    <span className="ml-2 text-foreground">{selectedInquiry.eventType}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date:</span>
                    <span className="ml-2 text-foreground">{formatDate(selectedInquiry.eventDate)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="ml-2 text-foreground">{selectedInquiry.budget}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <span className="ml-2 text-foreground">{selectedInquiry.location}</span>
                  </div>
                </div>
              </div>

              {/* Response Form */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Your Response</label>
                <Textarea
                  placeholder="Type your response here..."
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsResponseDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={sendResponse}
                  disabled={!responseMessage.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Response
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
