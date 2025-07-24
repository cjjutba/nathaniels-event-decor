import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Heart,
  Star,
  Users,
  Sparkles,
  Clock,
  Award,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  Calendar,
  DollarSign,
  Building2,
  Cake,
  PartyPopper,
  Crown,
  ExternalLink,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Loader2
} from 'lucide-react';
import { useContactForm } from '@/hooks/useContactForm';
import { useAdminServices, useAdminStats, useAdminClients } from '@/hooks/useAdminData';
import { EVENT_TYPES, CONTACT_INFO, BUSINESS_HOURS, PATHS } from '@/lib/constants';

interface ContactPageProps {
  navigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  const { contactForm, setContactForm, isSubmitted, setIsSubmitted, isSubmitting, handleSubmit } = useContactForm();

  // Admin data hooks with safe defaults
  const { featuredServices = [] } = useAdminServices();
  const { happyClients = [] } = useAdminClients();
  const stats = useAdminStats();

  // Local state for FAQ
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  // Budget options
  const budgetOptions = [
    { value: '₱50,000 - ₱100,000', label: '₱50,000 - ₱100,000' },
    { value: '₱100,000 - ₱200,000', label: '₱100,000 - ₱200,000' },
    { value: '₱200,000 - ₱500,000', label: '₱200,000 - ₱500,000' },
    { value: '₱500,000+', label: '₱500,000+' },
    { value: 'Not sure yet', label: 'Not sure yet' }
  ];

  // Service preferences
  const servicePreferences = [
    { id: 'decoration', label: 'Event Decoration' },
    { id: 'planning', label: 'Event Planning' },
    { id: 'catering', label: 'Catering Coordination' },
    { id: 'photography', label: 'Photography Services' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'venue', label: 'Venue Selection' }
  ];

  // FAQ data
  const faqData = [
    {
      id: 'pricing',
      question: 'How much do your services cost?',
      answer: 'Our pricing varies based on the type of event, guest count, and specific requirements. We offer packages starting from ₱50,000 and provide custom quotes for larger events. Contact us for a personalized estimate.'
    },
    {
      id: 'timeline',
      question: 'How far in advance should I book?',
      answer: 'We recommend booking at least 2-3 months in advance for smaller events and 6-12 months for weddings or large celebrations. However, we can accommodate shorter timelines based on availability.'
    },
    {
      id: 'services',
      question: 'What services do you provide?',
      answer: 'We offer comprehensive event planning and decoration services including venue decoration, event planning, catering coordination, entertainment booking, and vendor management.'
    },
    {
      id: 'consultation',
      question: 'Do you offer free consultations?',
      answer: 'Yes! We provide free initial consultations to discuss your event vision, requirements, and how we can help bring your ideas to life.'
    },
    {
      id: 'changes',
      question: 'Can I make changes to my event plan?',
      answer: 'Absolutely! We understand that plans can evolve. We work closely with you throughout the planning process to accommodate changes and ensure your event meets your expectations.'
    }
  ];

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'Weddings': Heart,
      'Birthdays': Cake,
      'Fiestas': PartyPopper,
      'Corporate': Building2,
      'Pageants': Crown,
      'Special Events': Sparkles
    };
    return iconMap[category] || Sparkles;
  };

  // Handle service preference change
  const handleServicePreferenceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setContactForm({
        ...contactForm,
        servicePreferences: [...contactForm.servicePreferences, serviceId]
      });
    } else {
      setContactForm({
        ...contactForm,
        servicePreferences: contactForm.servicePreferences.filter(id => id !== serviceId)
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's Plan Your Perfect Event
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Ready to transform your vision into reality? Get in touch with us and let's create something extraordinary together.
          </p>

          {/* Contact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{stats?.clients?.total || 0}+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{stats?.events?.completed || 0}+</div>
              <div className="text-sm text-muted-foreground">Events Completed</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">24</div>
              <div className="text-sm text-muted-foreground">Hours Response</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">6+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Form */}
          <Card className="p-6 lg:p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-2xl mb-2">Send Us Your Inquiry</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours with a personalized quote
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+63 XXX XXX XXXX"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type *</Label>
                  <Select
                    onValueChange={(value) => setContactForm({...contactForm, eventType: value})}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={contactForm.date}
                    onChange={(e) => setContactForm({...contactForm, date: e.target.value})}
                    disabled={isSubmitting}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    placeholder="e.g., 100"
                    min="1"
                    value={contactForm.guests}
                    onChange={(e) => setContactForm({...contactForm, guests: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Event Location</Label>
                  <Input
                    id="location"
                    placeholder="City or venue name"
                    value={contactForm.location}
                    onChange={(e) => setContactForm({...contactForm, location: e.target.value})}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select
                    onValueChange={(value) => setContactForm({...contactForm, budget: value})}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Service Preferences */}
              <div className="space-y-3">
                <Label>Service Preferences (Optional)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {servicePreferences.map((service) => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={service.id}
                        checked={contactForm.servicePreferences.includes(service.id)}
                        onCheckedChange={(checked) =>
                          handleServicePreferenceChange(service.id, checked as boolean)
                        }
                        disabled={isSubmitting}
                      />
                      <Label htmlFor={service.id} className="text-sm font-normal">
                        {service.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Tell us about your event vision</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Describe your event ideas, theme preferences, special requirements, or any questions you have..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  disabled={isSubmitting}
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Inquiry
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Enhanced Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl mb-4 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                  Get In Touch
                </CardTitle>
              </CardHeader>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-muted-foreground">{CONTACT_INFO.PHONE}</div>
                    <div className="text-xs text-muted-foreground">Available during business hours</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">{CONTACT_INFO.EMAIL}</div>
                    <div className="text-xs text-muted-foreground">24/7 response within 24 hours</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-muted-foreground">
                      {CONTACT_INFO.LOCATION}<br />
                      {CONTACT_INFO.LOCATION_DETAIL}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Business Hours */}
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <div className="space-y-3">
                {BUSINESS_HOURS.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded-lg bg-muted/20">
                    <span className="font-medium">{schedule.day}</span>
                    <span className="text-muted-foreground">{schedule.hours}</span>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <div className="text-sm text-primary font-medium">Emergency Contact</div>
                  <div className="text-xs text-muted-foreground">For urgent event day support, call our 24/7 hotline</div>
                </div>
              </div>
            </Card>

            {/* Social Media */}
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl mb-4 flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  Follow Us
                </CardTitle>
              </CardHeader>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="justify-start">
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Youtube className="h-4 w-4 mr-2" />
                  YouTube
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Client Testimonials */}
        {happyClients.length > 0 && (
          <div className="mt-16 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                What Our Clients Say
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Don't just take our word for it - hear from some of our satisfied clients
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {happyClients.slice(0, 3).map((client) => (
                <Card key={client.id} className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < client.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-muted-foreground">
                        {client.rating}/5
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 italic">
                      "{client.notes}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{client.name}</div>
                        <div className="text-xs text-muted-foreground">{client.location}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-16 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our services and process
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq) => (
              <Card key={faq.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{faq.question}</h3>
                    {openFAQ === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  {openFAQ === faq.id && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <Button variant="outline">
              <HelpCircle className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>

        {/* Featured Services Preview */}
        {featuredServices.length > 0 && (
          <div className="mt-16 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Popular Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover the services that make us the preferred choice for memorable events
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.slice(0, 3).map((service) => {
                const ServiceIcon = getCategoryIcon(service.category);
                return (
                  <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                        onClick={() => navigate(PATHS.SERVICES)}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <ServiceIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-primary">
                              From {service.basePrice}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                              {service.averageRating.toFixed(1)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <Button onClick={() => navigate(PATHS.SERVICES)} variant="outline">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Client Page Previews */}
        <div className="mt-16 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Explore More About Nathaniel's Event & Decor
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our story, services, and portfolio to see why we're the perfect choice for your event
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Home Preview */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(PATHS.HOME)}>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Home</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Discover our premium event planning services and see what makes us special.
                  </p>
                  <div className="flex items-center justify-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    Visit Homepage
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Preview */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(PATHS.ABOUT)}>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">About Us</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Learn about our journey, values, and the passionate team behind every event.
                  </p>
                  <div className="flex items-center justify-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    Our Story
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services Preview */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(PATHS.SERVICES)}>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Services</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Explore our comprehensive range of event planning and decoration services.
                  </p>
                  <div className="flex items-center justify-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    View Services
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Preview */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(PATHS.PORTFOLIO)}>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Portfolio</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Browse our gallery of stunning events and see our work in action.
                  </p>
                  <div className="flex items-center justify-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    View Portfolio
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="text-center mt-16 mb-8">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Start Planning Your Dream Event?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the {stats?.clients?.total || 0}+ satisfied clients who trusted us to make their events extraordinary.
              Let's discuss your vision and create something magical together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => {
                document.getElementById('name')?.scrollIntoView({ behavior: 'smooth' });
                document.getElementById('name')?.focus();
              }}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Inquiry Now
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate(PATHS.PORTFOLIO)}>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Our Work
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24hrs</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Free</div>
                <div className="text-sm text-muted-foreground">Consultation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-primary" />
              <span>Thank You!</span>
            </DialogTitle>
            <DialogDescription>
              Your inquiry has been submitted successfully. Our team will review your request and get back to you within 24 hours to discuss your event planning needs.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setIsSubmitted(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
