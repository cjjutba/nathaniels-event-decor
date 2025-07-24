import { useState } from 'react';
import { useToast } from './use-toast';
import { useLocalStorage } from './useLocalStorage';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  guests: string;
  budget: string;
  location: string;
  servicePreferences: string[];
  message: string;
}

interface AdminInquiry {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  location: string;
  budget: string;
  message: string;
  status: 'new' | 'in-progress' | 'responded' | 'converted' | 'archived';
  submittedAt: string;
  lastUpdated: string;
}

export const useContactForm = () => {
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    guests: '',
    budget: '',
    location: '',
    servicePreferences: [],
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [inquiries, setInquiries] = useLocalStorage<AdminInquiry[]>('admin_inquiries', []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!contactForm.name || !contactForm.email || !contactForm.eventType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, Event Type)",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create new inquiry for admin system
      const newInquiry: AdminInquiry = {
        id: Date.now().toString(),
        clientName: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone || 'Not provided',
        eventType: contactForm.eventType,
        eventDate: contactForm.date || 'To be determined',
        location: contactForm.location || 'To be determined',
        budget: contactForm.budget || 'Not specified',
        message: `${contactForm.message}${contactForm.guests ? `\n\nExpected guests: ${contactForm.guests}` : ''}${contactForm.servicePreferences.length > 0 ? `\n\nService preferences: ${contactForm.servicePreferences.join(', ')}` : ''}`,
        status: 'new',
        submittedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };

      // Add to admin inquiries
      setInquiries(prev => [newInquiry, ...prev]);

      setIsSubmitted(true);
      toast({
        title: "Inquiry Submitted Successfully!",
        description: "We'll get back to you within 24 hours to discuss your event.",
      });

      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        date: '',
        guests: '',
        budget: '',
        location: '',
        servicePreferences: [],
        message: ''
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your inquiry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    contactForm,
    setContactForm,
    isSubmitted,
    setIsSubmitted,
    isSubmitting,
    handleSubmit,
  };
};
