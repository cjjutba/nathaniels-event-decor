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
import {
  GalleryHorizontal,
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
  Upload,
  Download,
  Share,
  Settings,
} from 'lucide-react';
import { HighlightableCard } from '@/components/ui/highlightable-card';
import {
  weddingPortfolio,
  birthdayPortfolio,
  corporatePortfolio,
  fiestaPortfolio,
  pageantPortfolio,
  wedding2Portfolio,
} from '@/assets/images';

interface PortfolioItem {
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

interface FilterState {
  categories: string[];
  statuses: string[];
  tags: string[];
  featured: boolean | null;
}

export const AdminPortfolioPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isEditItemDialogOpen, setIsEditItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    statuses: [],
    tags: [],
    featured: null
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

  // Sample portfolio data based on the client portfolio
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: '1',
      title: 'Elegant Garden Wedding',
      description: 'A breathtaking outdoor wedding ceremony with romantic garden theme, featuring white and gold decorations, floral arrangements, and ambient lighting.',
      category: 'Weddings',
      status: 'published',
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
      description: 'Vibrant and fun birthday party setup with colorful balloons, themed decorations, and creative party arrangements for a memorable celebration.',
      category: 'Birthdays',
      status: 'published',
      image: birthdayPortfolio,
      tags: ['colorful', 'fun', 'balloons', 'themed', 'party'],
      eventDate: '2024-02-28',
      clientName: 'Maria Rodriguez',
      views: 890,
      likes: 67,
      featured: false,
      createdAt: '2024-01-13T09:15:00Z',
      lastUpdated: '2024-01-18T11:30:00Z'
    },
    {
      id: '3',
      title: 'Professional Corporate Gala',
      description: 'Sophisticated corporate event with modern staging, professional lighting, and brand-integrated decorations for a successful business gathering.',
      category: 'Corporate',
      status: 'published',
      image: corporatePortfolio,
      tags: ['professional', 'corporate', 'modern', 'branding', 'networking'],
      eventDate: '2024-03-20',
      clientName: 'TechCorp Inc.',
      views: 1100,
      likes: 78,
      featured: true,
      createdAt: '2024-01-14T14:20:00Z',
      lastUpdated: '2024-01-25T16:30:00Z'
    },
    {
      id: '4',
      title: 'Vibrant Cultural Festival',
      description: 'Traditional fiesta celebration with authentic cultural decorations, colorful arrangements, and festive atmosphere honoring cultural heritage.',
      category: 'Fiestas',
      status: 'published',
      image: fiestaPortfolio,
      tags: ['cultural', 'traditional', 'colorful', 'festive', 'heritage'],
      eventDate: '2024-04-10',
      clientName: 'Cultural Association',
      views: 750,
      likes: 56,
      featured: false,
      createdAt: '2024-01-12T16:45:00Z',
      lastUpdated: '2024-01-15T18:20:00Z'
    },
    {
      id: '5',
      title: 'Glamorous Beauty Pageant',
      description: 'Elegant pageant production with professional stage design, runway setup, sophisticated lighting, and backstage coordination.',
      category: 'Pageants',
      status: 'published',
      image: pageantPortfolio,
      tags: ['glamorous', 'stage', 'runway', 'lighting', 'professional'],
      eventDate: '2024-05-05',
      clientName: 'Beauty Pageant Organization',
      views: 980,
      likes: 92,
      featured: true,
      createdAt: '2024-01-11T13:20:00Z',
      lastUpdated: '2024-01-12T15:10:00Z'
    },
    {
      id: '6',
      title: 'Romantic Ceremony Setup',
      description: 'Intimate wedding ceremony with romantic ambiance, elegant floral arrangements, and personalized touches for a perfect celebration of love.',
      category: 'Weddings',
      status: 'published',
      image: wedding2Portfolio,
      tags: ['romantic', 'intimate', 'elegant', 'floral', 'personalized'],
      eventDate: '2024-07-20',
      clientName: 'David & Lisa Kim',
      views: 1350,
      likes: 105,
      featured: false,
      createdAt: '2024-01-10T09:15:00Z',
      lastUpdated: '2024-01-11T11:45:00Z'
    }
  ]);

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="h-4 w-4" />;
      case 'draft':
        return <Clock className="h-4 w-4" />;
      case 'archived':
        return <Archive className="h-4 w-4" />;
      default:
        return <GalleryHorizontal className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'Weddings': Heart,
      'Birthdays': Cake,
      'Fiestas': PartyPopper,
      'Corporate': Building2,
      'Pageants': Crown,
      'Special Events': Sparkles
    };
    return iconMap[category] || GalleryHorizontal;
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

  // Get unique values for filters
  const uniqueCategories = [...new Set(portfolioItems.map(item => item.category))];
  const uniqueStatuses = [...new Set(portfolioItems.map(item => item.status))];
  const uniqueTags = [...new Set(portfolioItems.flatMap(item => item.tags))];

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      categories: [],
      statuses: [],
      tags: [],
      featured: null
    });
  };

  // Check if any filters are active
  const hasActiveFilters = filters.categories.length > 0 ||
                          filters.statuses.length > 0 ||
                          filters.tags.length > 0 ||
                          filters.featured !== null;

  // Filter portfolio items based on active tab, search query, and filters
  const filteredItems = portfolioItems.filter(item => {
    // Search filter
    const matchesSearch = searchQuery === '' ||
                         item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Status filter (tab)
    const matchesStatus = activeTab === 'all' || item.status === activeTab;

    // Category filter
    const matchesCategory = filters.categories.length === 0 ||
                           filters.categories.includes(item.category);

    // Status filter (from dropdown)
    const matchesStatusFilter = filters.statuses.length === 0 ||
                               filters.statuses.includes(item.status);

    // Tags filter
    const matchesTags = filters.tags.length === 0 ||
                       filters.tags.some(tag => item.tags.includes(tag));

    // Featured filter
    const matchesFeatured = filters.featured === null ||
                           item.featured === filters.featured;

    return matchesSearch && matchesStatus && matchesCategory && matchesStatusFilter && matchesTags && matchesFeatured;
  });

  // Statistics
  const stats = [
    {
      icon: GalleryHorizontal,
      title: 'Total Items',
      value: portfolioItems.length.toString(),
      change: '+15%',
      trend: 'up',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Portfolio items'
    },
    {
      icon: CheckCircle,
      title: 'Published',
      value: portfolioItems.filter(i => i.status === 'published').length.toString(),
      change: '+20%',
      trend: 'up',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Live on website'
    },
    {
      icon: Eye,
      title: 'Total Views',
      value: portfolioItems.reduce((acc, i) => acc + i.views, 0).toLocaleString(),
      change: '+25%',
      trend: 'up',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'All time views'
    },
    {
      icon: Star,
      title: 'Featured Items',
      value: portfolioItems.filter(i => i.featured).length.toString(),
      change: '+10%',
      trend: 'up',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: 'Highlighted work'
    }
  ];

  // Action handlers
  const updateItemStatus = (id: string, newStatus: PortfolioItem['status']) => {
    setPortfolioItems(prev => prev.map(item =>
      item.id === id
        ? { ...item, status: newStatus, lastUpdated: new Date().toISOString() }
        : item
    ));

    toast({
      title: "Status Updated",
      description: `Portfolio item status changed to ${newStatus}`,
    });
  };

  const toggleFeatured = (id: string) => {
    setPortfolioItems(prev => prev.map(item =>
      item.id === id
        ? { ...item, featured: !item.featured, lastUpdated: new Date().toISOString() }
        : item
    ));

    const item = portfolioItems.find(i => i.id === id);
    toast({
      title: item?.featured ? "Removed from Featured" : "Added to Featured",
      description: `"${item?.title}" ${item?.featured ? 'removed from' : 'added to'} featured items`,
    });
  };

  const deleteItem = (id: string) => {
    const item = portfolioItems.find(i => i.id === id);
    setPortfolioItems(prev => prev.filter(item => item.id !== id));

    toast({
      title: "Portfolio Item Deleted",
      description: `"${item?.title}" has been deleted`,
    });
  };

  const editItem = (item: PortfolioItem) => {
    setEditingItem(item);
    setIsEditItemDialogOpen(true);
  };

  return (
    <div ref={containerRef} className="space-y-8 p-6 overflow-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Manage Portfolio</h1>
        <p className="text-muted-foreground">Upload and organize your portfolio images</p>
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
              <CardTitle>Portfolio Management</CardTitle>
              <CardDescription>
                View and manage all portfolio items
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search portfolio..."
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
                        {filters.categories.length + filters.statuses.length + filters.tags.length + (filters.featured !== null ? 1 : 0)}
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

                  {/* Featured Filter */}
                  <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                    Featured
                  </DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={filters.featured === true}
                    onCheckedChange={(checked) => {
                      setFilters(prev => ({
                        ...prev,
                        featured: checked ? true : null
                      }));
                    }}
                  >
                    Featured Only
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.featured === false}
                    onCheckedChange={(checked) => {
                      setFilters(prev => ({
                        ...prev,
                        featured: checked ? false : null
                      }));
                    }}
                  >
                    Non-Featured Only
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button size="sm" onClick={() => setIsAddItemDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
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
              {filters.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  #{tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        tags: prev.tags.filter(t => t !== tag)
                      }));
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {filters.featured !== null && (
                <Badge variant="secondary" className="gap-1">
                  {filters.featured ? 'Featured' : 'Non-Featured'}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => setFilters(prev => ({ ...prev, featured: null }))}
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
              <TabsTrigger value="all">All ({portfolioItems.length})</TabsTrigger>
              <TabsTrigger value="published">Published ({portfolioItems.filter(i => i.status === 'published').length})</TabsTrigger>
              <TabsTrigger value="draft">Draft ({portfolioItems.filter(i => i.status === 'draft').length})</TabsTrigger>
              <TabsTrigger value="archived">Archived ({portfolioItems.filter(i => i.status === 'archived').length})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <GalleryHorizontal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No portfolio items found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? 'Try adjusting your search terms.' : 'No items match the current filter.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map((item) => {
                    const CategoryIcon = getCategoryIcon(item.category);
                    return (
                      <HighlightableCard
                        key={item.id}
                        itemId={item.id}
                        isHighlighted={isHighlighted(item.id)}
                      >
                        <Card className="hover:shadow-md transition-shadow group overflow-hidden">
                        <div className="relative">
                          <div className="aspect-square overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Overlay with status and featured badge */}
                          <div className="absolute top-2 left-2 flex items-center space-x-2">
                            <Badge className={`${getStatusColor(item.status)} border text-xs`}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(item.status)}
                                <span className="capitalize">{item.status}</span>
                              </div>
                            </Badge>
                            {item.featured && (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>

                          {/* Category badge */}
                          <div className="absolute top-2 right-2">
                            <Badge variant="outline" className="bg-white/90 text-xs">
                              <CategoryIcon className="h-3 w-3 mr-1" />
                              {item.category}
                            </Badge>
                          </div>

                          {/* Action menu */}
                          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={() => setSelectedItem(item)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => editItem(item)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Item
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleFeatured(item.id)}>
                                  <Star className="h-4 w-4 mr-2" />
                                  {item.featured ? 'Remove from Featured' : 'Add to Featured'}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateItemStatus(item.id, 'published')}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Publish
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => updateItemStatus(item.id, 'archived')}>
                                  <Archive className="h-4 w-4 mr-2" />
                                  Archive
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteItem(item.id)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        <CardContent className="p-4">
                          <div className="space-y-3">
                            {/* Title and description */}
                            <div>
                              <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">{item.title}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                            </div>

                            {/* Client and date */}
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span className="truncate">{item.clientName}</span>
                              <span>{formatDate(item.eventDate)}</span>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1">
                              {item.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                                  #{tag}
                                </Badge>
                              ))}
                              {item.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  +{item.tags.length - 3}
                                </Badge>
                              )}
                            </div>

                            {/* Stats */}
                            <div className="flex items-center justify-between pt-2 border-t">
                              <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{item.views}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Heart className="h-3 w-3" />
                                  <span>{item.likes}</span>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-6 px-2 text-xs"
                                onClick={() => setSelectedItem(item)}
                              >
                                View
                              </Button>
                            </div>
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

      {/* Portfolio Item Details Dialog */}
      <Dialog open={selectedItem !== null} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Portfolio Item Details</DialogTitle>
            <DialogDescription>
              Complete information for {selectedItem?.title}
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-6">
              {/* Item Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">{selectedItem.title}</h2>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getStatusColor(selectedItem.status)} border`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(selectedItem.status)}
                          <span className="capitalize">{selectedItem.status}</span>
                        </div>
                      </Badge>
                      <Badge variant="outline">{selectedItem.category}</Badge>
                      {selectedItem.featured && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>Created: {formatDateTime(selectedItem.createdAt)}</p>
                  <p>Updated: {formatDateTime(selectedItem.lastUpdated)}</p>
                </div>
              </div>

              <Separator />

              {/* Item Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Eye className="h-5 w-5 text-blue-500" />
                    <span className="text-2xl font-bold">{selectedItem.views.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span className="text-2xl font-bold">{selectedItem.likes}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Likes</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Calendar className="h-5 w-5 text-green-500" />
                    <span className="text-2xl font-bold">{formatDate(selectedItem.eventDate)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Event Date</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {React.createElement(getCategoryIcon(selectedItem.category), { className: "h-5 w-5 text-purple-500" })}
                    <span className="text-2xl font-bold">{selectedItem.category}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Category</p>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Description</h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-foreground">{selectedItem.description}</p>
                </div>
              </div>

              <Separator />

              {/* Client Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Event Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Client</p>
                      <p className="text-sm text-muted-foreground">{selectedItem.clientName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Event Date</p>
                      <p className="text-sm text-muted-foreground">{formatDate(selectedItem.eventDate)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Tags */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setSelectedItem(null)}>
                  Close
                </Button>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Item
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Portfolio Item Dialog */}
      <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Portfolio Item</DialogTitle>
            <DialogDescription>
              Upload and add a new item to your portfolio
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter item title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="Enter category" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter item description" rows={3} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input id="clientName" placeholder="Enter client name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input id="eventDate" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input id="tags" placeholder="romantic, elegant, outdoor, etc." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image Upload</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddItemDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                toast({
                  title: "Portfolio Item Added",
                  description: "New portfolio item has been created successfully",
                });
                setIsAddItemDialogOpen(false);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Portfolio Item Dialog */}
      <Dialog open={isEditItemDialogOpen} onOpenChange={setIsEditItemDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Portfolio Item</DialogTitle>
            <DialogDescription>
              Update portfolio item information and details
            </DialogDescription>
          </DialogHeader>

          {editingItem && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editItemTitle">Title *</Label>
                  <Input id="editItemTitle" defaultValue={editingItem.title} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editItemCategory">Category *</Label>
                  <select id="editItemCategory" defaultValue={editingItem.category} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editItemDate">Event Date</Label>
                  <Input id="editItemDate" type="date" defaultValue={editingItem.eventDate} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editItemLocation">Location</Label>
                  <Input id="editItemLocation" defaultValue={editingItem.location} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editItemDescription">Description *</Label>
                <Textarea
                  id="editItemDescription"
                  defaultValue={editingItem.description}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editItemTags">Tags (comma separated)</Label>
                <Input
                  id="editItemTags"
                  defaultValue={editingItem.tags.join(', ')}
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editItemImages">Image Upload</Label>
                <Input id="editItemImages" type="file" multiple accept="image/*" />
                <p className="text-xs text-muted-foreground">Upload new images to replace existing ones</p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="editItemFeatured"
                  defaultChecked={editingItem.featured}
                  className="rounded"
                />
                <Label htmlFor="editItemFeatured">Featured Item</Label>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditItemDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast({
                    title: "Portfolio Item Updated",
                    description: "Portfolio item has been updated successfully",
                  });
                  setIsEditItemDialogOpen(false);
                  setEditingItem(null);
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Update Item
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
