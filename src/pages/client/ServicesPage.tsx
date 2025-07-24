import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Cake,
  PartyPopper,
  Building2,
  Crown,
  Sparkles,
  ArrowRight,
  Star,
  Users,
  Calendar,
  Award,
  TrendingUp,
  Eye,
  ThumbsUp,
  MapPin,
  Phone,
  Mail,
  Gift,
  Briefcase,
  Filter,
  ChevronRight,
} from 'lucide-react';
import {
  weddingPortfolio,
  birthdayPortfolio,
  corporatePortfolio,
  fiestaPortfolio,
  pageantPortfolio,
  wedding2Portfolio,
  heroImage
} from '@/assets/images';
import { PATHS, COMPANY_INFO, CONTACT_INFO } from '@/lib/constants';
import { useAdminServices, useAdminPortfolio, useAdminStats, useAdminClients, useAdminEvents } from '@/hooks/useAdminData';

interface ServicesPageProps {
  navigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('services');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get admin data with safe defaults
  const { featuredServices = [], activeServices = [], getServicesByCategory } = useAdminServices();
  const { recentItems: recentPortfolio = [], featuredItems = [] } = useAdminPortfolio();
  const { happyClients = [] } = useAdminClients();
  const { recentCompletedEvents = [] } = useAdminEvents();
  const stats = useAdminStats();

  // Icon mapping for services
  const getServiceIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
      'Heart': Heart,
      'Cake': Cake,
      'Gift': Gift,
      'Building2': Building2,
      'PartyPopper': PartyPopper,
      'Crown': Crown,
      'Briefcase': Briefcase,
      'Sparkles': Sparkles,
    };
    return iconMap[iconName] || Heart;
  };

  // Fallback services if admin data is empty
  const fallbackServices = [
    {
      id: 'fallback-1',
      title: 'Wedding Planning & Decor',
      description: 'Complete wedding planning and decor services including venue styling, floral arrangements, lighting design, and coordination to make your special day absolutely perfect.',
      category: 'Wedding',
      status: 'active' as const,
      basePrice: '₱80,000',
      features: ['Ceremony & Reception Decor', 'Floral Design', 'Lighting & Ambiance', 'Day-of Coordination'],
      icon: 'Heart',
      image: weddingPortfolio,
      popularity: 95,
      totalBookings: 45,
      averageRating: 4.9,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'fallback-2',
      title: 'Birthday Celebrations',
      description: 'Creative birthday celebrations for all ages with custom themes, balloon arrangements, table settings, and entertainment coordination to create unforgettable memories.',
      category: 'Birthday',
      status: 'active' as const,
      basePrice: '₱35,000',
      features: ['Custom Themes', 'Balloon Artistry', 'Party Favors', 'Entertainment Setup'],
      icon: 'Gift',
      image: birthdayPortfolio,
      popularity: 88,
      totalBookings: 32,
      averageRating: 4.7,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'fallback-3',
      title: 'Corporate Events',
      description: 'Professional corporate event services including conferences, product launches, team building events, and company celebrations with sophisticated styling.',
      category: 'Corporate',
      status: 'active' as const,
      basePrice: '₱60,000',
      features: ['Brand Integration', 'Professional Staging', 'Tech Setup', 'Networking Areas'],
      icon: 'Building2',
      image: corporatePortfolio,
      popularity: 82,
      totalBookings: 28,
      averageRating: 4.8,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    }
  ];

  // Use admin services or fallback with safe checks
  const displayServices = (activeServices && activeServices.length > 0) ? activeServices : fallbackServices;
  const categories = ['All', ...Array.from(new Set(displayServices.map(s => s.category)))];

  // Filter services by category
  const filteredServices = selectedCategory === 'All'
    ? displayServices
    : displayServices.filter(service => service.category === selectedCategory);

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Comprehensive Event & Decor Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            From intimate gatherings to grand celebrations, we offer complete event planning and decor solutions tailored to your unique vision
          </p>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-hero-gradient rounded-lg p-4">
              <div className="text-2xl font-bold text-foreground">{stats?.services?.total || displayServices.length}+</div>
              <div className="text-sm text-muted-foreground">Services Offered</div>
            </div>
            <div className="bg-hero-gradient rounded-lg p-4">
              <div className="text-2xl font-bold text-foreground">{stats?.services?.bookings || 50}+</div>
              <div className="text-sm text-muted-foreground">Events Completed</div>
            </div>
            <div className="bg-hero-gradient rounded-lg p-4">
              <div className="text-2xl font-bold text-foreground">{stats?.services?.rating || 4.8}</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="bg-hero-gradient rounded-lg p-4">
              <div className="text-2xl font-bold text-foreground">{stats?.clients?.total || 100}+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services">Our Services</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="contact">Get Started</TabsTrigger>
          </TabsList>

          {/* Services Tab Content */}
          <TabsContent value="services" className="space-y-8">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-200"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {category}
                </Button>
              ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => {
                const ServiceIcon = getServiceIcon(service.icon);
                return (
                  <Card key={service.id} className="group hover:shadow-hover transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-primary/90 p-2 rounded-lg">
                        <ServiceIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Badge variant="secondary" className="bg-white/90 text-foreground">
                          {service.basePrice}
                        </Badge>
                        {service.averageRating > 0 && (
                          <Badge variant="secondary" className="bg-white/90 text-foreground">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                            {service.averageRating}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <Badge variant="outline">{service.category}</Badge>
                      </div>
                      <CardDescription className="text-muted-foreground mb-4">
                        {service.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      {/* Service Stats */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{service.totalBookings} bookings</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{service.popularity}% popular</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2 mb-4">
                        {service.features.slice(0, 3).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                        {service.features.length > 3 && (
                          <div className="text-sm text-muted-foreground">
                            +{service.features.length - 3} more features
                          </div>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => navigate(PATHS.CONTACT)}
                      >
                        Inquire About This Service
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Portfolio Tab Content */}
          <TabsContent value="portfolio" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Recent Work
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our portfolio of stunning events and see how we transform visions into reality
              </p>
            </div>

            {((featuredItems && featuredItems.length > 0) || (recentPortfolio && recentPortfolio.length > 0)) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {((featuredItems && featuredItems.length > 0) ? featuredItems : recentPortfolio).slice(0, 6).map((item) => (
                  <Card key={item.id} className="group hover:shadow-hover transition-all duration-300 cursor-pointer"
                        onClick={() => navigate(PATHS.PORTFOLIO)}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Badge variant="secondary" className="bg-white/90 text-foreground">
                          <Eye className="h-3 w-3 mr-1" />
                          {item.views}
                        </Badge>
                        <Badge variant="secondary" className="bg-white/90 text-foreground">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {item.likes}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      <CardDescription className="text-muted-foreground">
                        {item.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(item.eventDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{item.clientName}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-muted/30 rounded-lg p-8">
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Portfolio Coming Soon
                  </h3>
                  <p className="text-muted-foreground">
                    We're currently working on amazing events that will be featured in our portfolio. Stay tuned!
                  </p>
                </div>
              </div>
            )}

            <div className="text-center">
              <Button size="lg" onClick={() => navigate(PATHS.PORTFOLIO)}>
                View Full Portfolio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Testimonials Tab Content */}
          <TabsContent value="testimonials" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Don't just take our word for it - hear from our satisfied clients
              </p>
            </div>

            {(happyClients && happyClients.length > 0) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {happyClients.slice(0, 6).map((client) => (
                  <Card key={client.id} className="p-6">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < client.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-muted-foreground">
                          {client.rating}/5
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4 italic">
                        "{client.notes}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-foreground">{client.name}</div>
                          <div className="text-sm text-muted-foreground">{client.location}</div>
                        </div>
                        <Badge variant="outline">
                          {client.totalEvents} events
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-muted/30 rounded-lg p-8">
                  <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Building Our Testimonials
                  </h3>
                  <p className="text-muted-foreground">
                    We're working hard to create amazing events for our clients. Check back soon for testimonials!
                  </p>
                </div>
              </div>
            )}

            <div className="text-center">
              <Button size="lg" onClick={() => navigate(PATHS.ABOUT)}>
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Contact Tab Content */}
          <TabsContent value="contact" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Plan Your Perfect Event?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get in touch with us today and let's create something extraordinary together
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <Card className="p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl mb-4">Get In Touch</CardTitle>
                </CardHeader>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Phone</div>
                      <div className="text-muted-foreground">{CONTACT_INFO.PHONE}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Email</div>
                      <div className="text-muted-foreground">{CONTACT_INFO.EMAIL}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Location</div>
                      <div className="text-muted-foreground">
                        {CONTACT_INFO.LOCATION}<br />
                        {CONTACT_INFO.LOCATION_DETAIL}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Stats & CTA */}
              <div className="space-y-6">
                <Card className="p-6 bg-hero-gradient">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-xl mb-4">Why Choose {COMPANY_INFO.NAME}?</CardTitle>
                  </CardHeader>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{stats?.events?.completed || 50}+</div>
                      <div className="text-sm text-muted-foreground">Events Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{stats?.clients?.rating || 4.8}</div>
                      <div className="text-sm text-muted-foreground">Client Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{stats?.clients?.total || 100}+</div>
                      <div className="text-sm text-muted-foreground">Happy Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">5+</div>
                      <div className="text-sm text-muted-foreground">Years Experience</div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-primary" />
                      <span>Professional team of designers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-primary" />
                      <span>Personalized service for every client</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span>Award-winning event designs</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>Creative solutions for any budget</span>
                    </li>
                  </ul>
                </Card>

                <div className="space-y-4">
                  <Button size="lg" className="w-full" onClick={() => navigate(PATHS.CONTACT)}>
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="w-full" onClick={() => navigate(PATHS.ABOUT)}>
                    Learn More About Us
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-hero-gradient rounded-lg p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Don't See What You're Looking For?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              We specialize in custom event solutions. Whether it's a unique celebration or a special request,
              we're here to bring any vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={() => navigate(PATHS.CONTACT)}>
                Discuss Custom Solutions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate(PATHS.HOME)}>
                Explore More
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Events Preview */}
        {(recentCompletedEvents && recentCompletedEvents.length > 0) && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Recently Completed Events
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See our latest successful events and celebrations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(recentCompletedEvents || []).slice(0, 3).map((event) => (
                <Card key={event.id} className="group hover:shadow-hover transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Completed
                      </Badge>
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {event.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{event.clientName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
