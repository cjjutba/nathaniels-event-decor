import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Cake,
  Building2,
  ArrowRight,
  Star,
  Users,
  Calendar,
  Award,
  TrendingUp,
  PartyPopper,
  Crown,
  Briefcase,
} from 'lucide-react';
import { heroImage } from '@/assets/images';
import { PATHS } from '@/lib/constants';
import { useAdminServices, useAdminPortfolio, useAdminStats, useAdminClients, useAdminEvents } from '@/hooks/useAdminData';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { featuredServices } = useAdminServices();
  const { recentItems: recentPortfolio } = useAdminPortfolio();
  const { happyClients } = useAdminClients();
  const { recentCompletedEvents } = useAdminEvents();
  const stats = useAdminStats();

  // Icon mapping for services
  const getServiceIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
      'Heart': Heart,
      'Cake': Cake,
      'Building2': Building2,
      'PartyPopper': PartyPopper,
      'Crown': Crown,
      'Briefcase': Briefcase,
    };
    return iconMap[iconName] || Heart;
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
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
      <section id="about" className="py-16 lg:py-24 bg-background">
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

      {/* Statistics Section */}
      <section id="stats" className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stats.events.completed}+</div>
              <div className="text-sm text-muted-foreground">Events Completed</div>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stats.clients.active}+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stats.portfolio.total}+</div>
              <div className="text-sm text-muted-foreground">Portfolio Items</div>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stats.services.rating.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section id="services" className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Signature Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Premium event planning services tailored to your vision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.slice(0, 6).map((service) => {
              const IconComponent = getServiceIcon(service.icon);
              return (
                <Card key={service.id} className="group hover:shadow-hover transition-all duration-300 cursor-pointer">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-primary/90 text-white px-2 py-1 rounded-full text-xs font-medium">
                      ⭐ {service.averageRating.toFixed(1)}
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-6 w-6 text-primary" />
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {service.category}
                      </Badge>
                    </div>
                    <CardDescription className="text-muted-foreground line-clamp-3">
                      {service.description}
                    </CardDescription>
                    <div className="mt-3 space-y-1">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-primary">{service.basePrice}</span>
                      <span className="text-sm text-muted-foreground">{service.totalBookings} bookings</span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate(PATHS.SERVICES)}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {featuredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No services available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Dynamic Portfolio Showcase */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Recent Masterpieces
            </h2>
            <p className="text-lg text-muted-foreground">
              Showcasing our latest completed events and creative designs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {recentPortfolio.slice(0, 12).map((item) => (
              <div
                key={item.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
                onClick={() => navigate(PATHS.PORTFOLIO)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <div className="text-xs font-medium text-primary mb-1">{item.category}</div>
                    <div className="text-sm font-semibold truncate">{item.title}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs">{item.likes}</span>
                      </div>
                      <div className="text-xs opacity-75">•</div>
                      <div className="text-xs opacity-75">{item.views} views</div>
                    </div>
                  </div>
                </div>
                {item.featured && (
                  <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full">
                    <Award className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {recentPortfolio.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No portfolio items available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-8">
            <Button onClick={() => navigate(PATHS.PORTFOLIO)}>
              View All Portfolio ({stats.portfolio.total} items)
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Preview Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story & Passion
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Founded in 2018 with a simple yet powerful vision: to transform ordinary spaces into extraordinary experiences.
                What started as a passion project has grown into a premier event planning company, trusted by hundreds of clients.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Passion</h3>
                  <p className="text-sm text-muted-foreground">We pour our heart into every event</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Excellence</h3>
                  <p className="text-sm text-muted-foreground">Perfection in every detail</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Partnership</h3>
                  <p className="text-sm text-muted-foreground">Your vision, our shared mission</p>
                </div>
              </div>
              <Button onClick={() => navigate(PATHS.ABOUT)} size="lg">
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">6+ Years</h3>
                  <p className="text-muted-foreground">Creating magical moments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>

          {happyClients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {happyClients.slice(0, 6).map((client) => (
                <Card key={client.id} className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < client.rating ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {client.rating}/5
                    </span>
                  </div>
                  <blockquote className="text-muted-foreground mb-4 italic">
                    "{client.notes}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-semibold">
                        {client.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{client.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {client.totalEvents} event{client.totalEvents !== 1 ? 's' : ''} • {client.location}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Client testimonials will appear here once available.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Button onClick={() => navigate(PATHS.CONTACT)} variant="outline">
              Share Your Experience
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Preview Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Planning?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let's discuss your upcoming event and discover how we can bring your vision to life with our expertise and creativity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Free Consultation</h3>
              <p className="text-muted-foreground">Schedule a complimentary consultation to discuss your event vision</p>
            </Card>

            <Card className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Custom Planning</h3>
              <p className="text-muted-foreground">Tailored event planning services to match your unique style</p>
            </Card>

            <Card className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Full Support</h3>
              <p className="text-muted-foreground">From planning to execution, we're with you every step</p>
            </Card>
          </div>

          <div className="text-center">
            <Button onClick={() => navigate(PATHS.CONTACT)} size="lg" className="mr-4">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={() => navigate(PATHS.PORTFOLIO)} variant="outline" size="lg">
              View Our Work
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
