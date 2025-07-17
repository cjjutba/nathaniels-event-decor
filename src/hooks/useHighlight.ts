import { useState, useEffect, useCallback } from 'react';

export interface HighlightState {
  highlightedId: string | null;
  isHighlighted: (id: string) => boolean;
  clearHighlight: () => void;
  setHighlight: (id: string) => void;
}

/**
 * Hook to manage item highlighting based on URL parameters
 * Reads 'highlight' query parameter and manages highlight state
 */
export const useHighlight = (): HighlightState => {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Read highlight parameter from URL on mount and URL changes
  useEffect(() => {
    const readHighlightFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const highlightParam = urlParams.get('highlight');
      
      if (highlightParam) {
        setHighlightedId(highlightParam);
        
        // Auto-clear highlight after 5 seconds
        const timer = setTimeout(() => {
          setHighlightedId(null);
          // Remove highlight parameter from URL without page reload
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete('highlight');
          window.history.replaceState({}, '', newUrl.toString());
        }, 5000);

        return () => clearTimeout(timer);
      }
    };

    // Read on mount
    const cleanup = readHighlightFromUrl();

    // Listen for URL changes (back/forward navigation)
    const handlePopState = () => {
      readHighlightFromUrl();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (cleanup) cleanup();
    };
  }, []);

  // Check if a specific ID is highlighted
  const isHighlighted = useCallback((id: string): boolean => {
    return highlightedId === id;
  }, [highlightedId]);

  // Clear highlight manually
  const clearHighlight = useCallback(() => {
    setHighlightedId(null);
    // Remove highlight parameter from URL
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('highlight');
    window.history.replaceState({}, '', newUrl.toString());
  }, []);

  // Set highlight manually (useful for testing)
  const setHighlight = useCallback((id: string) => {
    setHighlightedId(id);
  }, []);

  return {
    highlightedId,
    isHighlighted,
    clearHighlight,
    setHighlight
  };
};

/**
 * Hook for scroll-to-element functionality
 * Scrolls to highlighted element when highlight changes
 */
export const useScrollToHighlight = (highlightedId: string | null, containerRef?: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!highlightedId) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const element = document.querySelector(`[data-item-id="${highlightedId}"]`);
      
      if (element) {
        const container = containerRef?.current || document.documentElement;
        
        // Calculate scroll position
        const elementRect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        const scrollTop = container.scrollTop + elementRect.top - containerRect.top - 100; // 100px offset from top
        
        // Smooth scroll to element
        container.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [highlightedId, containerRef]);
};
