import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  ArrowRight,
  Search,
  Filter,
  Eye,
  Heart,
  Calendar,
  Users,
  Star,
  TrendingUp,
  Award,
  Building2,
  Cake,
  PartyPopper,
  Crown,
  X,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  ExternalLink
} from 'lucide-react';
import { useAdminPortfolio, useAdminServices, useAdminStats } from '@/hooks/useAdminData';
import { PATHS } from '@/lib/constants';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface PortfolioPageProps {
  navigate: (path: string) => void;
}

interface FilterState {
  categories: string[];
  featured: boolean | null;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ navigate }) => {
  // Admin data hooks with safe defaults
  const { portfolio: publishedItems = [], featuredItems = [], recentItems = [], getItemsByCategory } = useAdminPortfolio();
  const { featuredServices = [] } = useAdminServices();
  const stats = useAdminStats();

  // Local state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular' | 'featured'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    featured: null
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Categories from admin data with safe fallback
  const categories = React.useMemo(() => {
    if (!publishedItems || publishedItems.length === 0) {
      return ['All', 'Weddings', 'Birthdays', 'Corporate', 'Fiestas', 'Pageants'];
    }
    return ['All', ...Array.from(new Set(publishedItems.map(item => item.category)))];
  }, [publishedItems]);

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'Weddings': Heart,
      'Birthdays': Cake,
      'Fiestas': PartyPopper,
      'Corporate': Building2,
      'Pageants': Crown,
      'Special Events': Sparkles
    };
    return iconMap[category] || Sparkles;
  };

  // Safe stats with defaults
  const safeStats = React.useMemo(() => ({
    portfolio: {
      total: stats?.portfolio?.total || 0,
      views: stats?.portfolio?.views || 0,
      likes: stats?.portfolio?.likes || 0
    }
  }), [stats]);

  // Filter and sort portfolio items
  const filteredAndSortedItems = React.useMemo(() => {
    if (!publishedItems || publishedItems.length === 0) {
      return [];
    }
    let items = publishedItems;

    // Search filter
    if (searchQuery) {
      items = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      items = items.filter(item => item.category === selectedCategory);
    }

    // Advanced filters
    if (filters.categories.length > 0) {
      items = items.filter(item => filters.categories.includes(item.category));
    }

    if (filters.featured !== null) {
      items = items.filter(item => item.featured === filters.featured);
    }

    // Sort items
    switch (sortBy) {
      case 'newest':
        items = items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        items = items.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'popular':
        items = items.sort((a, b) => b.views - a.views);
        break;
      case 'featured':
        items = items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return items;
  }, [publishedItems, searchQuery, selectedCategory, filters, sortBy]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setFilters({ categories: [], featured: null });
  };

  // Check if any filters are active
  const hasActiveFilters = searchQuery || selectedCategory !== 'All' ||
                          filters.categories.length > 0 || filters.featured !== null;

  // Loading state
  const isLoading = !publishedItems;

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading portfolio...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Masterpieces: A Gallery of Past Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore our portfolio of stunning events and see how we transform visions into reality
          </p>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{safeStats.portfolio.total}</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{featuredItems.length}</div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{safeStats.portfolio.views.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{Math.max(0, categories.length - 1)}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search portfolio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
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

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {sortBy === 'newest' && <SortDesc className="h-4 w-4 mr-2" />}
                  {sortBy === 'oldest' && <SortAsc className="h-4 w-4 mr-2" />}
                  {sortBy === 'popular' && <TrendingUp className="h-4 w-4 mr-2" />}
                  {sortBy === 'featured' && <Star className="h-4 w-4 mr-2" />}
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy('newest')}>
                  <SortDesc className="h-4 w-4 mr-2" />
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('oldest')}>
                  <SortAsc className="h-4 w-4 mr-2" />
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('popular')}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Most Popular
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('featured')}>
                  <Star className="h-4 w-4 mr-2" />
                  Featured First
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Advanced Filter */}
            <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className={hasActiveFilters ? 'bg-primary/10 border-primary' : ''}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                      {(filters.categories.length + (filters.featured !== null ? 1 : 0))}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="flex items-center justify-between">
                  Advanced Filters
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
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Mode Toggle */}
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => {
            const CategoryIcon = getCategoryIcon(category);
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-200"
              >
                {category !== 'All' && <CategoryIcon className="h-4 w-4 mr-2" />}
                {category}
              </Button>
            );
          })}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 mb-6 p-3 bg-muted/50 rounded-lg">
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
            {selectedCategory !== 'All' && (
              <Badge variant="secondary" className="gap-1">
                {selectedCategory}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => setSelectedCategory('All')}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
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
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Portfolio Grid/List */}
        {publishedItems.length === 0 ? (
          <div className="text-center py-16">
            <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">No Portfolio Items Available</h3>
            <p className="text-muted-foreground mb-6">
              We're currently updating our portfolio. Please check back soon to see our amazing work!
            </p>
            <Button onClick={() => navigate(PATHS.SERVICES)} variant="outline">
              View Our Services
            </Button>
          </div>
        ) : filteredAndSortedItems.length === 0 ? (
          <div className="text-center py-16">
            <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">No portfolio items found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try adjusting your search terms or filters.' : 'No items match the current filter.'}
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredAndSortedItems.length} of {publishedItems.length} items
              </p>
            </div>

            {viewMode === 'grid' ? (
              /* Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedItems.map((item) => {
                  const CategoryIcon = getCategoryIcon(item.category);
                  return (
                    <Card
                      key={item.id}
                      className="group relative overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                      onClick={() => {
                        setSelectedItem(item);
                        setIsItemDialogOpen(true);
                      }}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <div className="flex items-center gap-1 text-xs font-medium text-primary mb-1">
                              <CategoryIcon className="h-3 w-3" />
                              {item.category}
                            </div>
                            <div className="text-sm font-semibold mb-1">{item.title}</div>
                            <div className="text-xs opacity-90">{item.clientName}</div>
                          </div>
                        </div>

                        {/* Top badges */}
                        <div className="absolute top-2 left-2 flex gap-1">
                          {item.featured && (
                            <Badge className="bg-yellow-500/90 text-white text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>

                        {/* Stats overlay */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-white text-xs">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {item.views}
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                {item.likes}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* View details button */}
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button size="sm" className="h-8 px-3 text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredAndSortedItems.map((item) => {
                  const CategoryIcon = getCategoryIcon(item.category);
                  return (
                    <Card
                      key={item.id}
                      className="group cursor-pointer hover:shadow-md transition-all duration-300"
                      onClick={() => {
                        setSelectedItem(item);
                        setIsItemDialogOpen(true);
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-6">
                          <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                  <CategoryIcon className="h-4 w-4" />
                                  {item.category}
                                  {item.featured && (
                                    <Badge variant="secondary" className="text-xs">
                                      <Star className="h-3 w-3 mr-1" />
                                      Featured
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {item.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {item.clientName}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(item.eventDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  {item.views} views
                                </div>
                                <div className="flex items-center gap-1">
                                  <Heart className="h-3 w-3" />
                                  {item.likes} likes
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {item.tags.slice(0, 3).map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                                {item.tags.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{item.tags.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Related Services Section */}
        {selectedCategory !== 'All' && featuredServices.length > 0 && (
          <div className="mt-16 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Related Services for {selectedCategory}
              </h2>
              <p className="text-muted-foreground">
                Discover our services that can help create your perfect {selectedCategory.toLowerCase()} event
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.slice(0, 3).map((service) => (
                <Card key={service.id} className="group hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        {React.createElement(getCategoryIcon(service.category), {
                          className: "h-6 w-6 text-primary"
                        })}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-primary">
                            From {service.basePrice}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(PATHS.SERVICES);
                            }}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View Service
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button onClick={() => navigate(PATHS.SERVICES)} variant="outline">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Client Page Previews */}
        <div className="mt-16 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Explore More About Nathaniel's Event & Decor
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our story, services, and how we can bring your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Preview */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(PATHS.ABOUT)}>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Our Story</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Learn about our journey, values, and the passionate team behind every memorable event we create.
                  </p>
                  <div className="flex items-center justify-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    Learn More About Us
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services Preview */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(PATHS.SERVICES)}>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Our Services</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Explore our comprehensive range of event planning and decoration services tailored to your needs.
                  </p>
                  <div className="flex items-center justify-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    View All Services
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Preview */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(PATHS.CONTACT)}>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Get In Touch</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Ready to start planning? Contact us to discuss your event vision and get a personalized quote.
                  </p>
                  <div className="flex items-center justify-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    Contact Us Today
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-muted/30 rounded-lg p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Create Your Own Masterpiece?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's discuss your event vision and create something truly spectacular together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate(PATHS.CONTACT)}>
                Start Planning Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate(PATHS.SERVICES)}>
                View Our Services
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Item Detail Modal */}
      <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
                      <Badge variant="outline">{selectedItem.category}</Badge>
                      {selectedItem.featured && (
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>Created: {new Date(selectedItem.createdAt).toLocaleDateString()}</p>
                  <p>Updated: {new Date(selectedItem.lastUpdated).toLocaleDateString()}</p>
                </div>
              </div>

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
                    <span className="text-lg font-bold">{new Date(selectedItem.eventDate).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Event Date</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {React.createElement(getCategoryIcon(selectedItem.category), {
                      className: "h-5 w-5 text-purple-500"
                    })}
                    <span className="text-lg font-bold">{selectedItem.category}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Category</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Description</h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-foreground">{selectedItem.description}</p>
                </div>
              </div>

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
                      <p className="text-sm text-muted-foreground">{new Date(selectedItem.eventDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

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
              <div className="flex items-center justify-between pt-4 border-t">
                <Button variant="outline" onClick={() => setIsItemDialogOpen(false)}>
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => navigate(PATHS.SERVICES)}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Services
                  </Button>
                  <Button onClick={() => navigate(PATHS.CONTACT)}>
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Get Quote
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
