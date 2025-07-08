import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { PATHS, COMPANY_INFO } from '@/lib/constants';

interface NavbarProps {
  currentPage: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  isMenuOpen, 
  setIsMenuOpen, 
  navigate 
}) => {
  const navItems = [
    { label: 'Home', path: PATHS.HOME },
    { label: 'About Us', path: PATHS.ABOUT },
    { label: 'Services', path: PATHS.SERVICES },
    { label: 'Portfolio', path: PATHS.PORTFOLIO },
    { label: 'Contact', path: PATHS.CONTACT },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate(PATHS.HOME)}>
            <h1 className="text-xl font-bold">
              <span className="text-primary">Nathaniel's</span>{' '}
              <span className="text-foreground">Event & Decor</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === item.path ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate(PATHS.LOGIN)}>
              Login
            </Button>
            <Button onClick={() => navigate(PATHS.SIGNUP)}>
              Start Free
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                    currentPage === item.path ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t pt-4 space-y-2">
                <Button variant="ghost" className="w-full" onClick={() => navigate(PATHS.LOGIN)}>
                  Login
                </Button>
                <Button className="w-full" onClick={() => navigate(PATHS.SIGNUP)}>
                  Start Free
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
