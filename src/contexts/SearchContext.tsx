import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { performGlobalSearch, getSearchSuggestions, SearchResults } from '@/lib/searchUtils';

const SEARCH_HISTORY_KEY = 'admin-search-history';
const MAX_SEARCH_HISTORY = 10;

interface SearchContextType {
  // Search state
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  searchResults: SearchResults | null;
  isSearching: boolean;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  
  // Search functionality
  performSearch: (query: string) => void;
  clearSearch: () => void;
  
  // Search history
  searchHistory: string[];
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  
  // Search suggestions
  searchSuggestions: string[];
  getSuggestions: (query: string) => void;
  
  // Data management
  updateSearchData: (data: SearchData) => void;
  searchData: SearchData;
}

interface SearchData {
  events: any[];
  services: any[];
  clients: any[];
  inquiries: any[];
  portfolio: any[];
}

interface SearchProviderProps {
  children: ReactNode;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  // Search state
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  
  // Search history
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SEARCH_HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  
  // Search suggestions
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  
  // Search data
  const [searchData, setSearchData] = useState<SearchData>({
    events: [],
    services: [],
    clients: [],
    inquiries: [],
    portfolio: []
  });
  
  // Save search history to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory));
    }
  }, [searchHistory]);
  
  // Perform global search
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    
    setIsSearching(true);
    
    try {
      // Simulate async search (in real app, this might be an API call)
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const results = performGlobalSearch(searchData, query);
      setSearchResults(results);
      
      // Add to search history if results found
      if (results.totalResults > 0) {
        addToSearchHistory(query);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults(null);
    } finally {
      setIsSearching(false);
    }
  }, [searchData]);
  
  // Clear search
  const clearSearch = useCallback(() => {
    setGlobalSearchQuery('');
    setSearchResults(null);
    setSearchSuggestions([]);
  }, []);
  
  // Add to search history
  const addToSearchHistory = useCallback((query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    
    setSearchHistory(prev => {
      // Remove if already exists
      const filtered = prev.filter(item => item !== trimmedQuery);
      // Add to beginning
      const updated = [trimmedQuery, ...filtered];
      // Limit to max history
      return updated.slice(0, MAX_SEARCH_HISTORY);
    });
  }, []);
  
  // Clear search history
  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
    }
  }, []);
  
  // Get search suggestions
  const getSuggestions = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchSuggestions([]);
      return;
    }
    
    const suggestions = getSearchSuggestions(searchData, query, 5);
    setSearchSuggestions(suggestions);
  }, [searchData]);
  
  // Update search data
  const updateSearchData = useCallback((data: SearchData) => {
    setSearchData(data);
  }, []);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchModalOpen(true);
      }
      
      // Escape to close search modal
      if (event.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
        clearSearch();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, clearSearch]);
  
  const value: SearchContextType = {
    // Search state
    globalSearchQuery,
    setGlobalSearchQuery,
    searchResults,
    isSearching,
    isSearchModalOpen,
    setIsSearchModalOpen,
    
    // Search functionality
    performSearch,
    clearSearch,
    
    // Search history
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,
    
    // Search suggestions
    searchSuggestions,
    getSuggestions,
    
    // Data management
    updateSearchData,
    searchData
  };
  
  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

// Custom hook for debounced search
export const useDebouncedSearch = (delay: number = 300) => {
  const { performSearch } = useSearch();
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedQuery.trim()) {
        performSearch(debouncedQuery);
      }
    }, delay);
    
    return () => clearTimeout(timer);
  }, [debouncedQuery, delay, performSearch]);
  
  return setDebouncedQuery;
};

// Custom hook for search keyboard navigation
export const useSearchKeyboard = (
  suggestions: string[],
  onSelect: (suggestion: string) => void
) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
        
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          onSelect(suggestions[selectedIndex]);
          setSelectedIndex(-1);
        }
        break;
        
      case 'Escape':
        setSelectedIndex(-1);
        break;
    }
  }, [suggestions, selectedIndex, onSelect]);
  
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);
  
  return {
    selectedIndex,
    handleKeyDown,
    setSelectedIndex
  };
};
