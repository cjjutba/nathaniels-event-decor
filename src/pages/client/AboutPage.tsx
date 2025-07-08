import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, Star, Users, ArrowRight } from 'lucide-react';
import { teamPhoto } from '@/assets/images';
import { PATHS } from '@/lib/constants';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Story & Passion
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the heart behind Nathaniel's Event & Decor and our commitment to creating extraordinary experiences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src={teamPhoto} 
              alt="Nathaniel's Event & Decor Team"
              className="w-full h-96 object-cover rounded-lg shadow-card"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Where It All Began
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded with a simple yet powerful vision: to transform ordinary spaces into extraordinary experiences. 
              Nathaniel's Event & Decor began as a passion project in 2018, born from the belief that every celebration 
              deserves to be magical and memorable.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What started as a small family business has grown into a premier event planning and decor company, 
              trusted by hundreds of clients across the region. Our success is built on attention to detail, 
              creative innovation, and an unwavering commitment to exceeding expectations.
            </p>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Passion',
                description: 'We pour our heart into every event, treating each celebration as if it were our own.'
              },
              {
                icon: Star,
                title: 'Excellence',
                description: 'We strive for perfection in every detail, ensuring exceptional quality in all we deliver.'
              },
              {
                icon: Users,
                title: 'Partnership',
                description: 'We work closely with our clients, making their vision our shared mission and commitment.'
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Create Magic Together?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your upcoming event and discover how we can bring your vision to life with our expertise and creativity.
          </p>
          <Button size="lg" onClick={() => navigate(PATHS.CONTACT)}>
            Start Planning Your Event
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
