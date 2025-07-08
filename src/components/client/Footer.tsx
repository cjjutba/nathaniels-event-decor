import React from 'react';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import { PATHS, COMPANY_INFO, CONTACT_INFO } from '@/lib/constants';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const quickLinks = [
    { label: 'About Us', path: PATHS.ABOUT },
    { label: 'Services', path: PATHS.SERVICES },
    { label: 'Portfolio', path: PATHS.PORTFOLIO },
    { label: 'Contact', path: PATHS.CONTACT },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">
              <span className="text-primary">Nathaniel's</span> Event & Decor
            </h3>
            <p className="text-muted mb-4">
              {COMPANY_INFO.TAGLINE}. {COMPANY_INFO.DESCRIPTION}
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
              <Instagram className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
              <Twitter className="h-5 w-5 cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-muted">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{CONTACT_INFO.PHONE}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{CONTACT_INFO.EMAIL}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{CONTACT_INFO.LOCATION}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-muted/20 mt-8 pt-8 text-center text-muted">
          <p>{COMPANY_INFO.COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  );
};
