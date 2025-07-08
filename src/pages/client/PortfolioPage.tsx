import React from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from 'lucide-react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { PATHS } from '@/lib/constants';

interface PortfolioPageProps {
  navigate: (path: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ navigate }) => {
  const { portfolioFilter, setPortfolioFilter, filteredItems, categories } = usePortfolio();

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Masterpieces: A Gallery of Past Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our portfolio of stunning events and see how we transform visions into reality
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((filter) => (
            <Button
              key={filter}
              variant={portfolioFilter === filter ? 'default' : 'outline'}
              onClick={() => setPortfolioFilter(filter)}
              className="transition-all duration-200"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-medium text-primary mb-1">{item.category}</div>
                  <div className="text-sm font-semibold">{item.title}</div>
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          ))}
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
            <Button size="lg" onClick={() => navigate(PATHS.CONTACT)}>
              Start Planning Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
