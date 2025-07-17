import React from 'react';
import { useSearchData } from '@/hooks/useSearchData';

interface SearchDataProviderProps {
  children: React.ReactNode;
}

export const SearchDataProvider: React.FC<SearchDataProviderProps> = ({ children }) => {
  // Initialize search data
  useSearchData();
  
  return <>{children}</>;
};
