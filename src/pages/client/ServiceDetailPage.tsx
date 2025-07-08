import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Users, Star, ArrowRight } from 'lucide-react';
import { weddingPortfolio, wedding2Portfolio } from '@/assets/images';
import { PATHS } from '@/lib/constants';

interface ServiceDetailPageProps {
  navigate: (path: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ navigate }) => {
  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Wedding Decor & Planning
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your special day into a magical celebration with our comprehensive wedding services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src={weddingPortfolio} 
              alt="Wedding Decor"
              className="w-full h-96 object-cover rounded-lg shadow-card"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Your Dream Wedding Awaits
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Every wedding is a unique love story, and we're here to bring your vision to life. 
              From intimate ceremonies to grand celebrations, our wedding planning and decor services 
              ensure every detail is perfect for your special day.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-primary" />
                <span>Custom ceremony and reception design</span>
              </div>
              <div className="flex items-center space-x-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Premium floral arrangements and decor</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-primary" />
                <span>Full-service event coordination</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-primary" />
                <span>Personalized theme development</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[weddingPortfolio, wedding2Portfolio, weddingPortfolio].map((image, index) => (
            <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg aspect-video">
              <img 
                src={image} 
                alt={`Wedding Gallery ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" onClick={() => navigate(PATHS.CONTACT)}>
            Inquire About This Service
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
