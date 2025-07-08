import { useState } from 'react';
import { PORTFOLIO_CATEGORIES } from '@/lib/constants';
import {
  weddingPortfolio,
  birthdayPortfolio,
  corporatePortfolio,
  fiestaPortfolio,
  pageantPortfolio,
  wedding2Portfolio,
} from '@/assets/images';

export interface PortfolioItem {
  image: string;
  category: string;
  title: string;
}

export const usePortfolio = () => {
  const [portfolioFilter, setPortfolioFilter] = useState<string>('All');

  const portfolioItems: PortfolioItem[] = [
    { image: weddingPortfolio, category: 'Weddings', title: 'Elegant Garden Wedding' },
    { image: birthdayPortfolio, category: 'Birthdays', title: 'Colorful Birthday Celebration' },
    { image: corporatePortfolio, category: 'Corporate', title: 'Professional Corporate Gala' },
    { image: fiestaPortfolio, category: 'Fiestas', title: 'Vibrant Cultural Festival' },
    { image: pageantPortfolio, category: 'Pageants', title: 'Glamorous Beauty Pageant' },
    { image: wedding2Portfolio, category: 'Weddings', title: 'Romantic Ceremony Setup' },
    { image: weddingPortfolio, category: 'Weddings', title: 'Luxury Reception Decor' },
    { image: birthdayPortfolio, category: 'Birthdays', title: 'Themed Party Celebration' },
    { image: corporatePortfolio, category: 'Corporate', title: 'Conference & Networking Event' },
    { image: fiestaPortfolio, category: 'Fiestas', title: 'Traditional Celebration' },
    { image: pageantPortfolio, category: 'Pageants', title: 'Stage & Runway Design' },
    { image: wedding2Portfolio, category: 'Weddings', title: 'Outdoor Wedding Paradise' }
  ];

  const filteredItems = portfolioFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === portfolioFilter);

  return {
    portfolioFilter,
    setPortfolioFilter,
    portfolioItems,
    filteredItems,
    categories: PORTFOLIO_CATEGORIES,
  };
};
