import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Cake,
  Building2,
  ArrowRight, 
  Sparkles,
} from 'lucide-react';
import { heroImage, weddingPortfolio, birthdayPortfolio, corporatePortfolio, fiestaPortfolio, pageantPortfolio, wedding2Portfolio } from '@/assets/images';
import { PATHS } from '@/lib/constants';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-foreground/40"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-scale-in">
            Crafting Unforgettable Moments
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in">
            Premium event planning and decor services that transform your vision into extraordinary reality
          </p>
          <div className="space-x-4">
            <Button 
              size="lg" 
              onClick={() => navigate(PATHS.SERVICES)}
              className="animate-scale-in"
            >
              Explore Our Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate(PATHS.PORTFOLIO)}
              className="bg-white/10 border-white text-white hover:bg-white hover:text-foreground"
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Where Dreams Meet Reality
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Nathaniel's Event & Decor, we believe every celebration deserves to be extraordinary. 
              With years of experience and an eye for detail, we transform ordinary spaces into magical 
              experiences that leave lasting impressions. From intimate gatherings to grand celebrations, 
              we bring your vision to life with unmatched creativity and professionalism.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Signature Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Specializing in events that matter most to you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Weddings',
                description: 'Creating magical moments for your special day with elegant decor and flawless planning.',
                image: weddingPortfolio
              },
              {
                icon: Cake,
                title: 'Birthdays',
                description: 'Celebrating life\'s milestones with creative themes and joyful decorations.',
                image: birthdayPortfolio
              },
              {
                icon: Building2,
                title: 'Corporate Events',
                description: 'Professional setups that enhance your brand and create memorable business experiences.',
                image: corporatePortfolio
              }
            ].map((service, index) => (
              <Card key={index} className="group hover:shadow-hover transition-all duration-300 cursor-pointer">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <service.icon className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(PATHS.SERVICES)}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Portfolio Showcase */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Recent Masterpieces
            </h2>
            <p className="text-lg text-muted-foreground">
              A glimpse into our portfolio of stunning events
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[weddingPortfolio, birthdayPortfolio, corporatePortfolio, fiestaPortfolio, pageantPortfolio, wedding2Portfolio].map((image, index) => (
              <div 
                key={index} 
                className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
              >
                <img 
                  src={image} 
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button onClick={() => navigate(PATHS.PORTFOLIO)}>
              View All Portfolio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
