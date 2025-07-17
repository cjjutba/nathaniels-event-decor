import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearch, useDebouncedSearch } from '@/contexts/SearchContext';
import { SearchResultCard } from './SearchResultCard';
import {
  Search,
  X,
  Loader2,
  CalendarDays,
  Package,
  Users,
  ClipboardList,
  GalleryHorizontal,
  Command
} from 'lucide-react';

interface GlobalSearchModalProps {
  navigate: (path: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ navigate }) => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    globalSearchQuery,
    setGlobalSearchQuery,
    searchResults,
    isSearching,
    clearSearch
  } = useSearch();

  const [activeTab, setActiveTab] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSearch = useDebouncedSearch(500);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Focus input when modal opens
  useEffect(() => {
    if (isSearchModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchModalOpen]);

  // Handle input change with optimized debouncing and typing indicator
  const handleInputChange = (value: string) => {
    setInputValue(value);
    setGlobalSearchQuery(value);
    setIsTyping(true);

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set typing indicator to false after user stops typing
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 600);

    if (value.trim()) {
      debouncedSearch(value);
    } else {
      clearSearch();
      setIsTyping(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    setIsSearchModalOpen(false);
    setInputValue('');
    setIsTyping(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    clearSearch();
  };

  // Memoize tab counts to prevent unnecessary re-renders
  const tabCounts = useMemo(() => {
    if (!searchResults) return {};
    return {
      all: searchResults.totalResults,
      events: searchResults.events.length,
      services: searchResults.services.length,
      clients: searchResults.clients.length,
      inquiries: searchResults.inquiries.length,
      portfolio: searchResults.portfolio.length
    };
  }, [searchResults]);

  // Removed suggestions dropdown for cleaner interface

  // Render empty state with consistent height
  const renderEmptyState = () => {
    const baseClasses = "flex flex-col items-center justify-center h-96";

    if (isSearching || isTyping) {
      return (
        <div className={baseClasses}>
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">Searching...</p>
        </div>
      );
    }

    if (!inputValue.trim()) {
      return (
        <div className={baseClasses}>
          <Search className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Search across all data</h3>
          <p className="text-sm text-muted-foreground text-center mb-4 max-w-md">
            Find events, services, clients, inquiries, and portfolio items instantly
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs">K</kbd>
            <span>to search</span>
          </div>
        </div>
      );
    }

    if (searchResults && searchResults.totalResults === 0) {
      return (
        <div className={baseClasses}>
          <Search className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No results found</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Try adjusting your search terms or check for typos
          </p>
        </div>
      );
    }

    return null;
  };

  // Render results for a specific tab
  const renderTabResults = (tabType: string) => {
    if (!searchResults) return null;

    let results;
    switch (tabType) {
      case 'events':
        results = searchResults.events;
        break;
      case 'services':
        results = searchResults.services;
        break;
      case 'clients':
        results = searchResults.clients;
        break;
      case 'inquiries':
        results = searchResults.inquiries;
        break;
      case 'portfolio':
        results = searchResults.portfolio;
        break;
      default:
        results = [
          ...searchResults.events,
          ...searchResults.services,
          ...searchResults.clients,
          ...searchResults.inquiries,
          ...searchResults.portfolio
        ].sort((a, b) => b.score - a.score);
    }

    if (results.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-6">
          <p className="text-sm text-muted-foreground">No {tabType} results found</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {results.map((result) => (
          <SearchResultCard
            key={`${result.type}-${result.id}`}
            result={result}
            navigate={navigate}
            onClose={handleClose}
          />
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isSearchModalOpen} onOpenChange={setIsSearchModalOpen}>
      <DialogContent className="max-w-4xl w-[90vw] h-[80vh] p-0 flex flex-col search-modal-content">
        <DialogHeader className="px-4 py-3 border-b shrink-0">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Search className="h-4 w-4" />
            Global Search
          </DialogTitle>
          <DialogDescription className="sr-only">
            Search across all admin data including events, services, clients, inquiries, and portfolio items
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 py-3 border-b shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search across all data..."
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className="pl-10 pr-10 h-10"
            />
            {inputValue && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => handleInputChange('')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {searchResults && (
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-muted-foreground">
                {searchResults.totalResults} results found
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Ctrl</kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">K</kbd>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-hidden min-h-0">
          {renderEmptyState() || (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="px-4 border-b shrink-0">
                <TabsList className="grid w-full grid-cols-6 h-9">
                  <TabsTrigger value="all" className="text-xs px-2">
                    All
                    {tabCounts.all > 0 && (
                      <Badge variant="secondary" className="ml-1 text-xs h-4 px-1">
                        {tabCounts.all}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="events" className="text-xs px-2">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    Events
                    {tabCounts.events > 0 && (
                      <Badge variant="secondary" className="ml-1 text-xs h-4 px-1">
                        {tabCounts.events}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="services" className="text-xs px-2">
                    <Package className="h-3 w-3 mr-1" />
                    Services
                    {tabCounts.services > 0 && (
                      <Badge variant="secondary" className="ml-1 text-xs h-4 px-1">
                        {tabCounts.services}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="clients" className="text-xs px-2">
                    <Users className="h-3 w-3 mr-1" />
                    Clients
                    {tabCounts.clients > 0 && (
                      <Badge variant="secondary" className="ml-1 text-xs h-4 px-1">
                        {tabCounts.clients}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="inquiries" className="text-xs px-2">
                    <ClipboardList className="h-3 w-3 mr-1" />
                    Inquiries
                    {tabCounts.inquiries > 0 && (
                      <Badge variant="secondary" className="ml-1 text-xs h-4 px-1">
                        {tabCounts.inquiries}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="portfolio" className="text-xs px-2">
                    <GalleryHorizontal className="h-3 w-3 mr-1" />
                    Portfolio
                    {tabCounts.portfolio > 0 && (
                      <Badge variant="secondary" className="ml-1 text-xs h-4 px-1">
                        {tabCounts.portfolio}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-hidden min-h-0">
                <ScrollArea className="h-full">
                  <div className="p-4 search-results-container">
                    <TabsContent value="all" className="mt-0">
                      {renderTabResults('all')}
                    </TabsContent>
                    <TabsContent value="events" className="mt-0">
                      {renderTabResults('events')}
                    </TabsContent>
                    <TabsContent value="services" className="mt-0">
                      {renderTabResults('services')}
                    </TabsContent>
                    <TabsContent value="clients" className="mt-0">
                      {renderTabResults('clients')}
                    </TabsContent>
                    <TabsContent value="inquiries" className="mt-0">
                      {renderTabResults('inquiries')}
                    </TabsContent>
                    <TabsContent value="portfolio" className="mt-0">
                      {renderTabResults('portfolio')}
                    </TabsContent>
                  </div>
                </ScrollArea>
              </div>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
