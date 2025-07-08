import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  Star,
  Users,
  Sparkles,
} from 'lucide-react';
import { useContactForm } from '@/hooks/useContactForm';
import { EVENT_TYPES, CONTACT_INFO, BUSINESS_HOURS } from '@/lib/constants';

export const ContactPage: React.FC = () => {
  const { contactForm, setContactForm, isSubmitted, setIsSubmitted, handleSubmit } = useContactForm();

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's Plan Your Perfect Event
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your vision into reality? Get in touch with us and let's create something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-6 lg:p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-2xl mb-2">Send Us Your Inquiry</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    required
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
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type *</Label>
                  <Select onValueChange={(value) => setContactForm({...contactForm, eventType: value})}>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={contactForm.date}
                    onChange={(e) => setContactForm({...contactForm, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    placeholder="e.g., 100"
                    value={contactForm.guests}
                    onChange={(e) => setContactForm({...contactForm, guests: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Tell us about your event vision</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Describe your event ideas, theme preferences, budget range, or any special requirements..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Submit Inquiry
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl mb-4">Get In Touch</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-muted-foreground">{CONTACT_INFO.PHONE}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">{CONTACT_INFO.EMAIL}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
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

            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl mb-4">Business Hours</CardTitle>
              </CardHeader>
              <div className="space-y-2 text-sm">
                {BUSINESS_HOURS.map((schedule, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{schedule.day}</span>
                    <span className="text-muted-foreground">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-hero-gradient">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl mb-2">Why Choose Us?</CardTitle>
              </CardHeader>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span>5+ years of event planning experience</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-primary" />
                  <span>Personalized service for every client</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Professional team of designers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Creative solutions for any budget</span>
                </li>
              </ul>
            </Card>
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
