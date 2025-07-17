// Search utilities for global admin search functionality

export interface SearchableItem {
  id: string;
  type: 'event' | 'service' | 'client' | 'inquiry' | 'portfolio';
  title: string;
  description: string;
  searchableFields: Record<string, any>;
  metadata: Record<string, any>;
}

export interface SearchResult extends SearchableItem {
  score: number;
  matchedFields: string[];
  highlightedTitle: string;
  highlightedDescription: string;
}

export interface SearchResults {
  events: SearchResult[];
  services: SearchResult[];
  clients: SearchResult[];
  inquiries: SearchResult[];
  portfolio: SearchResult[];
  totalResults: number;
  query: string;
  executionTime: number;
}

// Search field weights for scoring
const SEARCH_WEIGHTS = {
  event: {
    title: 3,
    clientName: 2.5,
    eventType: 2,
    location: 1.5,
    description: 1,
    clientEmail: 1,
    services: 1.5
  },
  service: {
    title: 3,
    category: 2,
    description: 1,
    features: 1.5
  },
  client: {
    name: 3,
    email: 2,
    location: 1.5,
    preferredServices: 1.5,
    notes: 1
  },
  inquiry: {
    clientName: 3,
    eventType: 2,
    email: 2,
    location: 1.5,
    message: 1
  },
  portfolio: {
    title: 3,
    category: 2,
    clientName: 2,
    description: 1,
    tags: 1.5
  }
};

// Normalize search query
export const normalizeQuery = (query: string): string => {
  return query.toLowerCase().trim().replace(/\s+/g, ' ');
};

// Calculate search score for a field
const calculateFieldScore = (fieldValue: string | string[], query: string, weight: number): number => {
  if (!fieldValue) return 0;
  
  const normalizedQuery = normalizeQuery(query);
  const queryWords = normalizedQuery.split(' ');
  
  // Handle array fields (like services, tags, features)
  if (Array.isArray(fieldValue)) {
    const arrayText = fieldValue.join(' ').toLowerCase();
    return calculateTextScore(arrayText, queryWords) * weight;
  }
  
  const normalizedField = fieldValue.toLowerCase();
  return calculateTextScore(normalizedField, queryWords) * weight;
};

// Calculate text matching score
const calculateTextScore = (text: string, queryWords: string[]): number => {
  let score = 0;
  
  queryWords.forEach(word => {
    if (text.includes(word)) {
      // Exact word match
      if (text.split(' ').includes(word)) {
        score += 2;
      }
      // Partial match
      else {
        score += 1;
      }
      
      // Bonus for match at beginning
      if (text.startsWith(word)) {
        score += 1;
      }
    }
  });
  
  return score;
};

// Highlight matching text with improved styling
export const highlightText = (text: string, query: string): string => {
  if (!query.trim()) return text;

  const normalizedQuery = normalizeQuery(query);
  const queryWords = normalizedQuery.split(' ').filter(word => word.length > 0);
  let highlightedText = text;

  queryWords.forEach(word => {
    if (word.length > 0) { // Highlight all words
      const regex = new RegExp(`(${escapeRegExp(word)})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-primary/20 text-primary font-medium px-0.5 rounded">$1</mark>');
    }
  });

  return highlightedText;
};

// Helper function to escape special regex characters
const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Convert data items to searchable format
export const convertToSearchableItem = (item: any, type: SearchableItem['type']): SearchableItem => {
  switch (type) {
    case 'event':
      return {
        id: item.id,
        type: 'event',
        title: item.title,
        description: item.description,
        searchableFields: {
          title: item.title,
          clientName: item.clientName,
          clientEmail: item.clientEmail,
          eventType: item.eventType,
          location: item.location,
          description: item.description,
          services: item.services
        },
        metadata: {
          status: item.status,
          eventDate: item.eventDate,
          budget: item.budget,
          clientPhone: item.clientPhone
        }
      };
      
    case 'service':
      return {
        id: item.id,
        type: 'service',
        title: item.title,
        description: item.description,
        searchableFields: {
          title: item.title,
          description: item.description,
          category: item.category,
          features: item.features
        },
        metadata: {
          status: item.status,
          basePrice: item.basePrice,
          popularity: item.popularity,
          averageRating: item.averageRating
        }
      };
      
    case 'client':
      return {
        id: item.id,
        type: 'client',
        title: item.name,
        description: item.notes || `${item.email} • ${item.location}`,
        searchableFields: {
          name: item.name,
          email: item.email,
          location: item.location,
          preferredServices: item.preferredServices,
          notes: item.notes
        },
        metadata: {
          status: item.status,
          totalEvents: item.totalEvents,
          totalSpent: item.totalSpent,
          rating: item.rating,
          phone: item.phone
        }
      };
      
    case 'inquiry':
      return {
        id: item.id,
        type: 'inquiry',
        title: `${item.eventType} - ${item.clientName}`,
        description: item.message,
        searchableFields: {
          clientName: item.clientName,
          email: item.email,
          eventType: item.eventType,
          location: item.location,
          message: item.message
        },
        metadata: {
          status: item.status,
          eventDate: item.eventDate,
          budget: item.budget,
          phone: item.phone,
          submittedAt: item.submittedAt
        }
      };
      
    case 'portfolio':
      return {
        id: item.id,
        type: 'portfolio',
        title: item.title,
        description: item.description,
        searchableFields: {
          title: item.title,
          description: item.description,
          category: item.category,
          clientName: item.clientName,
          tags: item.tags
        },
        metadata: {
          status: item.status,
          eventDate: item.eventDate,
          views: item.views,
          likes: item.likes,
          featured: item.featured
        }
      };
      
    default:
      throw new Error(`Unknown searchable item type: ${type}`);
  }
};

// Search within a specific data type
export const searchInDataType = (items: any[], query: string, type: SearchableItem['type']): SearchResult[] => {
  if (!query.trim() || !items.length) return [];
  
  const searchableItems = items.map(item => convertToSearchableItem(item, type));
  const weights = SEARCH_WEIGHTS[type];
  
  const results: SearchResult[] = searchableItems
    .map(item => {
      let totalScore = 0;
      const matchedFields: string[] = [];
      
      // Calculate score for each searchable field
      Object.entries(item.searchableFields).forEach(([fieldName, fieldValue]) => {
        const weight = weights[fieldName as keyof typeof weights] || 1;
        const fieldScore = calculateFieldScore(fieldValue, query, weight);
        
        if (fieldScore > 0) {
          totalScore += fieldScore;
          matchedFields.push(fieldName);
        }
      });
      
      return {
        ...item,
        score: totalScore,
        matchedFields,
        highlightedTitle: highlightText(item.title, query),
        highlightedDescription: highlightText(item.description, query)
      };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);
  
  return results;
};

// Main global search function
export const performGlobalSearch = (
  data: {
    events: any[];
    services: any[];
    clients: any[];
    inquiries: any[];
    portfolio: any[];
  },
  query: string
): SearchResults => {
  const startTime = performance.now();
  
  if (!query.trim()) {
    return {
      events: [],
      services: [],
      clients: [],
      inquiries: [],
      portfolio: [],
      totalResults: 0,
      query: '',
      executionTime: 0
    };
  }
  
  const results: SearchResults = {
    events: searchInDataType(data.events, query, 'event'),
    services: searchInDataType(data.services, query, 'service'),
    clients: searchInDataType(data.clients, query, 'client'),
    inquiries: searchInDataType(data.inquiries, query, 'inquiry'),
    portfolio: searchInDataType(data.portfolio, query, 'portfolio'),
    totalResults: 0,
    query: normalizeQuery(query),
    executionTime: 0
  };
  
  results.totalResults = results.events.length + results.services.length + 
                        results.clients.length + results.inquiries.length + 
                        results.portfolio.length;
  
  results.executionTime = performance.now() - startTime;
  
  return results;
};

// Get search suggestions based on existing data
export const getSearchSuggestions = (
  data: {
    events: any[];
    services: any[];
    clients: any[];
    inquiries: any[];
    portfolio: any[];
  },
  query: string,
  limit: number = 5
): string[] => {
  if (!query.trim()) return [];
  
  const suggestions = new Set<string>();
  const normalizedQuery = normalizeQuery(query);
  
  // Extract suggestions from various data sources
  const extractSuggestions = (items: any[], fields: string[]) => {
    items.forEach(item => {
      fields.forEach(field => {
        const value = item[field];
        if (typeof value === 'string' && value.toLowerCase().includes(normalizedQuery)) {
          suggestions.add(value);
        } else if (Array.isArray(value)) {
          value.forEach(v => {
            if (typeof v === 'string' && v.toLowerCase().includes(normalizedQuery)) {
              suggestions.add(v);
            }
          });
        }
      });
    });
  };
  
  // Extract from different data types
  extractSuggestions(data.events, ['title', 'clientName', 'eventType', 'location']);
  extractSuggestions(data.services, ['title', 'category']);
  extractSuggestions(data.clients, ['name', 'location']);
  extractSuggestions(data.inquiries, ['clientName', 'eventType']);
  extractSuggestions(data.portfolio, ['title', 'category', 'tags']);
  
  return Array.from(suggestions).slice(0, limit);
};
