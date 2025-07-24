import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Star,
  Users,
  ArrowRight,
  Calendar,
  Award,
  TrendingUp,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Eye,
  ThumbsUp,
  Briefcase,
  Target,
  Zap,
  Shield,
  CheckCircle,
  Sparkles,
  Crown,
  PartyPopper,
  Cake
} from 'lucide-react';
import { teamPhoto } from '@/assets/images';
import { PATHS, COMPANY_INFO, CONTACT_INFO, BUSINESS_HOURS } from '@/lib/constants';
import { useAdminServices, useAdminPortfolio, useAdminStats, useAdminClients, useAdminEvents } from '@/hooks/useAdminData';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  const { featuredServices } = useAdminServices();
  const { featuredItems: featuredPortfolio } = useAdminPortfolio();
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About {COMPANY_INFO.NAME}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {COMPANY_INFO.TAGLINE}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stats.events.completed}+</div>
              <div className="text-sm text-muted-foreground">Events Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stats.clients.active}+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{COMPANY_INFO.FOUNDED_YEAR}</div>
              <div className="text-sm text-muted-foreground">Founded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stats.services.rating.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
          </div>
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
            <p className="text-muted-foreground leading-relaxed mb-6">
              Founded with a simple yet powerful vision: to transform ordinary spaces into extraordinary experiences.
              {COMPANY_INFO.NAME} began as a passion project in {COMPANY_INFO.FOUNDED_YEAR}, born from the belief that every celebration
              deserves to be magical and memorable.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              What started as a small family business has grown into a premier event planning and decor company,
              trusted by {stats.clients.total}+ clients across the region. Our success is built on attention to detail,
              creative innovation, and an unwavering commitment to exceeding expectations.
            </p>

            {/* Company Timeline */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Our Journey</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{COMPANY_INFO.FOUNDED_YEAR} - The Beginning</div>
                    <div className="text-sm text-muted-foreground">Started as a passion project with a vision to create extraordinary experiences</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">2020 - Rapid Growth</div>
                    <div className="text-sm text-muted-foreground">Expanded services and built a team of creative professionals</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">2022 - Recognition</div>
                    <div className="text-sm text-muted-foreground">Achieved industry recognition and client satisfaction excellence</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">2024 - Innovation</div>
                    <div className="text-sm text-muted-foreground">Launched digital platform and enhanced service offerings</div>
                  </div>
                </div>
              </div>
            </div>
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

        {/* Comprehensive Statistics Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time metrics showcasing our commitment to excellence and client satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stats.events.total}</div>
              <div className="text-sm text-muted-foreground mb-2">Total Events</div>
              <div className="text-xs text-primary font-medium">{stats.events.completed} Completed</div>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stats.clients.total}</div>
              <div className="text-sm text-muted-foreground mb-2">Happy Clients</div>
              <div className="text-xs text-primary font-medium">{stats.clients.active} Active</div>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stats.portfolio.views.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mb-2">Portfolio Views</div>
              <div className="text-xs text-primary font-medium">{stats.portfolio.total} Items</div>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stats.services.rating.toFixed(1)}</div>
              <div className="text-sm text-muted-foreground mb-2">Average Rating</div>
              <div className="text-xs text-primary font-medium">{stats.services.total} Services</div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">{stats.portfolio.likes}</div>
              <div className="text-sm text-muted-foreground">Portfolio Likes</div>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">{stats.services.bookings}</div>
              <div className="text-sm text-muted-foreground">Total Bookings</div>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">₱{(stats.clients.revenue / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </Card>
          </div>
        </section>

        {/* Services Preview Section */}
        <section className="py-16 bg-muted/30 rounded-2xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What We Do Best
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive range of event planning and decor services
            </p>
          </div>

          {featuredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredServices.slice(0, 6).map((service) => {
                const IconComponent = getServiceIcon(service.icon);
                return (
                  <Card key={service.id} className="group hover:shadow-hover transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{service.title}</CardTitle>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {service.category}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="text-muted-foreground line-clamp-2">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {service.features.slice(0, 2).map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-primary" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="font-semibold text-primary">{service.basePrice}</span>
                          <div className="text-xs text-muted-foreground">⭐ {service.averageRating.toFixed(1)} rating</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Services information will be displayed here once available.</p>
            </div>
          )}

          <div className="text-center">
            <Button onClick={() => navigate(PATHS.SERVICES)} size="lg">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Portfolio Showcase Section */}
        <section className="py-16 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Creative Portfolio
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore some of our most stunning event transformations and creative designs
            </p>
          </div>

          {featuredPortfolio.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {featuredPortfolio.slice(0, 8).map((item) => (
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
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-xs font-medium text-primary mb-1">{item.category}</div>
                      <div className="text-sm font-semibold truncate">{item.title}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span className="text-xs">{item.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span className="text-xs">{item.likes}</span>
                        </div>
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
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Portfolio items will be displayed here once available.</p>
            </div>
          )}

          <div className="text-center">
            <Button onClick={() => navigate(PATHS.PORTFOLIO)} size="lg" variant="outline">
              View Full Portfolio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Client Success Stories Section */}
        <section className="py-16 bg-muted/30 rounded-2xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Client Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from our satisfied clients about their experience with {COMPANY_INFO.NAME}
            </p>
          </div>

          {happyClients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {happyClients.slice(0, 6).map((client) => (
                <Card key={client.id} className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 mr-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < client.rating ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {client.status === 'vip' ? 'VIP Client' : 'Valued Client'}
                    </Badge>
                  </div>
                  <blockquote className="text-muted-foreground mb-4 italic flex-grow">
                    "{client.notes}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary font-semibold">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{client.name}</div>
                        <div className="text-sm text-muted-foreground">{client.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-primary">{client.totalEvents} events</div>
                      <div className="text-xs text-muted-foreground">{client.totalSpent}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Client testimonials will be displayed here once available.</p>
            </div>
          )}

          <div className="text-center">
            <Button onClick={() => navigate(PATHS.CONTACT)} variant="outline">
              Share Your Experience
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to start planning your perfect event? We're here to help bring your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-2">{CONTACT_INFO.PHONE}</p>
              <p className="text-sm text-muted-foreground">Available during business hours</p>
            </Card>

            <Card className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-2">{CONTACT_INFO.EMAIL}</p>
              <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
            </Card>

            <Card className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Visit Us</h3>
              <p className="text-muted-foreground mb-2">{CONTACT_INFO.LOCATION}</p>
              <p className="text-sm text-muted-foreground">{CONTACT_INFO.LOCATION_DETAIL}</p>
            </Card>
          </div>

          <div className="bg-white/50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-xl font-semibold text-foreground">Business Hours</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              {BUSINESS_HOURS.map((schedule, index) => (
                <div key={index} className="text-sm">
                  <div className="font-medium text-foreground">{schedule.day}</div>
                  <div className="text-muted-foreground">{schedule.hours}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" onClick={() => navigate(PATHS.CONTACT)} className="mr-4">
              Start Planning Your Event
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate(PATHS.SERVICES)}>
              View Our Services
            </Button>
          </div>
        </section>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Create Magic Together?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the {stats.clients.total}+ clients who have trusted us to make their events extraordinary.
            Let's discuss your upcoming celebration and discover how we can bring your vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => navigate(PATHS.CONTACT)}>
              Get Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate(PATHS.PORTFOLIO)}>
              View Our Work
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
