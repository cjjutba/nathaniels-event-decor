import { useState } from 'react';
import { useToast } from './use-toast';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  guests: string;
  message: string;
}

export const useContactForm = () => {
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    guests: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      message: ''
    });
  };

  return {
    contactForm,
    setContactForm,
    isSubmitted,
    setIsSubmitted,
    handleSubmit,
  };
};
