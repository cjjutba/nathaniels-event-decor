import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Cake,
  PartyPopper,
  Building2,
  Crown,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { 
  weddingPortfolio, 
  birthdayPortfolio, 
  corporatePortfolio, 
  fiestaPortfolio, 
  pageantPortfolio, 
  wedding2Portfolio 
} from '@/assets/images';
import { PATHS } from '@/lib/constants';

interface ServicesPageProps {
  navigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ navigate }) => {
  const services = [
    {
      icon: Heart,
      title: 'Weddings',
      description: 'Complete wedding planning and decor services including venue styling, floral arrangements, lighting design, and coordination to make your special day absolutely perfect.',
      image: weddingPortfolio,
      features: ['Ceremony & Reception Decor', 'Floral Design', 'Lighting & Ambiance', 'Day-of Coordination']
    },
    {
      icon: Cake,
      title: 'Birthdays',
      description: 'Creative birthday celebrations for all ages with custom themes, balloon arrangements, table settings, and entertainment coordination to create unforgettable memories.',
      image: birthdayPortfolio,
      features: ['Custom Themes', 'Balloon Artistry', 'Party Favors', 'Entertainment Setup']
    },
    {
      icon: PartyPopper,
      title: 'Fiestas',
      description: 'Vibrant cultural celebrations featuring traditional decorations, colorful arrangements, authentic styling, and festive atmospheres that honor cultural heritage.',
      image: fiestaPortfolio,
      features: ['Traditional Decor', 'Cultural Styling', 'Festive Lighting', 'Authentic Ambiance']
    },
    {
      icon: Building2,
      title: 'Corporate Events',
      description: 'Professional corporate event services including conferences, product launches, team building events, and company celebrations with sophisticated styling.',
      image: corporatePortfolio,
      features: ['Brand Integration', 'Professional Staging', 'Tech Setup', 'Networking Areas']
    },
    {
      icon: Crown,
      title: 'Pageants',
      description: 'Elegant pageant productions with professional stage design, runway setup, lighting systems, and backstage coordination for memorable competitions.',
      image: pageantPortfolio,
      features: ['Stage Design', 'Runway Setup', 'Professional Lighting', 'Backstage Coordination']
    },
    {
      icon: Sparkles,
      title: 'Special Occasions',
      description: 'Custom event planning for anniversaries, graduations, baby showers, and other special milestones with personalized touches and unique styling.',
      image: wedding2Portfolio,
      features: ['Custom Design', 'Personalized Touches', 'Flexible Packages', 'Full Coordination']
    }
  ];

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Comprehensive Event & Decor Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From intimate gatherings to grand celebrations, we offer complete event planning and decor solutions tailored to your unique vision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-hover transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-primary/90 p-2 rounded-lg">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground mb-4">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2 mb-4">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(PATHS.CONTACT)}
                >
                  Inquire About This Service
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-hero-gradient rounded-lg p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Don't See What You're Looking For?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              We specialize in custom event solutions. Whether it's a unique celebration or a special request, 
              we're here to bring any vision to life.
            </p>
            <Button size="lg" onClick={() => navigate(PATHS.CONTACT)}>
              Discuss Custom Solutions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
