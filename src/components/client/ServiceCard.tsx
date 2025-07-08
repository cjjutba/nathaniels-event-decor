import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  features?: string[];
  onLearnMore: () => void;
  onInquire?: () => void;
  showFeatures?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  image,
  features = [],
  onLearnMore,
  onInquire,
  showFeatures = false,
}) => {
  return (
    <Card className="group hover:shadow-hover transition-all duration-300 cursor-pointer">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {showFeatures && (
          <div className="absolute top-4 left-4 bg-primary/90 p-2 rounded-lg">
            <Icon className="h-6 w-6 text-white" />
          </div>
        )}
      </div>
      
      <CardHeader>
        {!showFeatures && (
          <div className="flex items-center space-x-3 mb-2">
            <Icon className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
        )}
        {showFeatures && (
          <CardTitle className="text-xl mb-2">{title}</CardTitle>
        )}
        <CardDescription className="text-muted-foreground mb-4">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {showFeatures && features.length > 0 && (
          <div className="space-y-2 mb-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onInquire || onLearnMore}
        >
          {onInquire ? 'Inquire About This Service' : 'Learn More'}
        </Button>
      </CardContent>
    </Card>
  );
};
