import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { 
  Menu, 
  X, 
  Heart, 
  Star, 
  Calendar, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  PartyPopper,
  Building2,
  Crown,
  Cake,
  Home,
  // Admin icons
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  Package,
  GalleryHorizontal,
  Settings,
  CircleUser,
  Bell,
  LogOut,
  LineChart,
  DollarSign,
  ShoppingCart,
  Activity,
  Eye,
  EyeOff
} from 'lucide-react';

// Import generated images
import heroImage from '@/assets/hero-events.jpg';
import weddingPortfolio from '@/assets/portfolio-wedding-1.jpg';
import birthdayPortfolio from '@/assets/portfolio-birthday-1.jpg';
import corporatePortfolio from '@/assets/portfolio-corporate-1.jpg';
import fiestaPortfolio from '@/assets/portfolio-fiesta-1.jpg';
import pageantPortfolio from '@/assets/portfolio-pageant-1.jpg';
import wedding2Portfolio from '@/assets/portfolio-wedding-2.jpg';
import teamPhoto from '@/assets/team-photo.jpg';

const App = () => {
  const [currentPage, setCurrentPage] = useState('/');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState('All');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    guests: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminLoginForm, setAdminLoginForm] = useState({
    username: '',
    password: ''
  });
  const [adminLoginError, setAdminLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  
  const { toast } = useToast();

  // Navigation handler
  const navigate = (path: string) => {
    setCurrentPage(path);
    setIsMenuOpen(false);
    setIsAdminMenuOpen(false);
    window.history.pushState(null, '', path);
  };

  // Admin authentication functions
  const handleAdminLogin = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('adminToken', 'true');
      setAdminLoginError('');
      navigate('/admin/dashboard/');
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard!",
      });
    } else {
      setAdminLoginError('Invalid credentials. Please try again.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('adminToken');
    navigate('/admin');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  // Handle browser back/forward and check admin authentication
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname);
    };
    
    // Check for existing admin session
    const adminToken = sessionStorage.getItem('adminToken');
    if (adminToken === 'true') {
      setIsAdminAuthenticated(true);
    }
    
    // Set initial page from URL
    setCurrentPage(window.location.pathname);
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Route protection for admin dashboard
  useEffect(() => {
    if (currentPage.startsWith('/admin/dashboard') && !isAdminAuthenticated) {
      navigate('/admin');
    }
  }, [currentPage, isAdminAuthenticated]);

  // Navbar Component
  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-xl font-bold">
              <span className="text-primary">Nathaniel's</span>{' '}
              <span className="text-foreground">Event & Decor</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'About Us', 'Services', 'Portfolio', 'Contact'].map((item) => {
              const path = item === 'Home' ? '/' : 
                         item === 'About Us' ? '/about' : 
                         `/${item.toLowerCase()}`;
              return (
                <button
                  key={item}
                  onClick={() => navigate(path)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    currentPage === path ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button onClick={() => navigate('/signup')}>
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
              {['Home', 'About Us', 'Services', 'Portfolio', 'Contact'].map((item) => {
                const path = item === 'Home' ? '/' : 
                           item === 'About Us' ? '/about' : 
                           `/${item.toLowerCase()}`;
                return (
                  <button
                    key={item}
                    onClick={() => navigate(path)}
                    className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                      currentPage === path ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
              <div className="border-t pt-4 space-y-2">
                <Button variant="ghost" className="w-full" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button className="w-full" onClick={() => navigate('/signup')}>
                  Start Free
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">
              <span className="text-primary">Nathaniel's</span> Event & Decor
            </h3>
            <p className="text-muted mb-4">
              Crafting unforgettable moments with premium event planning and decor services. 
              Your vision, our expertise, exceptional results.
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
              {['About Us', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => navigate(item === 'About Us' ? '/about' : `/${item.toLowerCase()}`)}
                    className="text-muted hover:text-primary transition-colors"
                  >
                    {item}
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
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@nathanielsevents.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Downtown Event District</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-muted/20 mt-8 pt-8 text-center text-muted">
          <p>&copy; 2024 Nathaniel's Event & Decor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  // Home Page
  const HomePage = () => (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
              onClick={() => navigate('/services')}
              className="animate-scale-in"
            >
              Explore Our Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/portfolio')}
              className="bg-white/10 border-white text-white hover:bg-white hover:text-foreground"
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 lg:py-24 bg-background">
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

      {/* Featured Services */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Signature Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Specializing in events that matter most to you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Weddings',
                description: 'Creating magical moments for your special day with elegant decor and flawless planning.',
                image: weddingPortfolio
              },
              {
                icon: Cake,
                title: 'Birthdays',
                description: 'Celebrating life\'s milestones with creative themes and joyful decorations.',
                image: birthdayPortfolio
              },
              {
                icon: Building2,
                title: 'Corporate Events',
                description: 'Professional setups that enhance your brand and create memorable business experiences.',
                image: corporatePortfolio
              }
            ].map((service, index) => (
              <Card key={index} className="group hover:shadow-hover transition-all duration-300 cursor-pointer">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <service.icon className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/services')}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Portfolio Showcase */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Recent Masterpieces
            </h2>
            <p className="text-lg text-muted-foreground">
              A glimpse into our portfolio of stunning events
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[weddingPortfolio, birthdayPortfolio, corporatePortfolio, fiestaPortfolio, pageantPortfolio, wedding2Portfolio].map((image, index) => (
              <div 
                key={index} 
                className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
              >
                <img 
                  src={image} 
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button onClick={() => navigate('/portfolio')}>
              View All Portfolio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );

  // About Page
  const AboutPage = () => (
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
          <Button size="lg" onClick={() => navigate('/contact')}>
            Start Planning Your Event
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // Services Page
  const ServicesPage = () => (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Comprehensive Event & Decor Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From intimate gatherings to grand celebrations, we offer complete event planning and decor solutions tailored to your unique vision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              title: 'Weddings',
              description: 'Complete wedding planning and decor services including venue styling, floral arrangements, lighting design, and coordination to make your special day absolutely perfect.',
              image: weddingPortfolio,
              features: ['Ceremony & Reception Decor', 'Floral Design', 'Lighting & Ambiance', 'Day-of Coordination']
            },
            {
              icon: Cake,
              title: 'Birthdays',
              description: 'Creative birthday celebrations for all ages with custom themes, balloon arrangements, table settings, and entertainment coordination to create unforgettable memories.',
              image: birthdayPortfolio,
              features: ['Custom Themes', 'Balloon Artistry', 'Party Favors', 'Entertainment Setup']
            },
            {
              icon: PartyPopper,
              title: 'Fiestas',
              description: 'Vibrant cultural celebrations featuring traditional decorations, colorful arrangements, authentic styling, and festive atmospheres that honor cultural heritage.',
              image: fiestaPortfolio,
              features: ['Traditional Decor', 'Cultural Styling', 'Festive Lighting', 'Authentic Ambiance']
            },
            {
              icon: Building2,
              title: 'Corporate Events',
              description: 'Professional corporate event services including conferences, product launches, team building events, and company celebrations with sophisticated styling.',
              image: corporatePortfolio,
              features: ['Brand Integration', 'Professional Staging', 'Tech Setup', 'Networking Areas']
            },
            {
              icon: Crown,
              title: 'Pageants',
              description: 'Elegant pageant productions with professional stage design, runway setup, lighting systems, and backstage coordination for memorable competitions.',
              image: pageantPortfolio,
              features: ['Stage Design', 'Runway Setup', 'Professional Lighting', 'Backstage Coordination']
            },
            {
              icon: Sparkles,
              title: 'Special Occasions',
              description: 'Custom event planning for anniversaries, graduations, baby showers, and other special milestones with personalized touches and unique styling.',
              image: wedding2Portfolio,
              features: ['Custom Design', 'Personalized Touches', 'Flexible Packages', 'Full Coordination']
            }
          ].map((service, index) => (
            <Card key={index} className="group hover:shadow-hover transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-primary/90 p-2 rounded-lg">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground mb-4">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2 mb-4">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/contact')}
                >
                  Inquire About This Service
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-hero-gradient rounded-lg p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Don't See What You're Looking For?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              We specialize in custom event solutions. Whether it's a unique celebration or a special request, 
              we're here to bring any vision to life.
            </p>
            <Button size="lg" onClick={() => navigate('/contact')}>
              Discuss Custom Solutions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // Portfolio Page
  const PortfolioPage = () => {
    const portfolioItems = [
      { image: weddingPortfolio, category: 'Weddings', title: 'Elegant Garden Wedding' },
      { image: birthdayPortfolio, category: 'Birthdays', title: 'Colorful Birthday Celebration' },
      { image: corporatePortfolio, category: 'Corporate', title: 'Professional Corporate Gala' },
      { image: fiestaPortfolio, category: 'Fiestas', title: 'Vibrant Cultural Festival' },
      { image: pageantPortfolio, category: 'Pageants', title: 'Glamorous Beauty Pageant' },
      { image: wedding2Portfolio, category: 'Weddings', title: 'Romantic Ceremony Setup' },
      { image: weddingPortfolio, category: 'Weddings', title: 'Luxury Reception Decor' },
      { image: birthdayPortfolio, category: 'Birthdays', title: 'Themed Party Celebration' },
      { image: corporatePortfolio, category: 'Corporate', title: 'Conference & Networking Event' },
      { image: fiestaPortfolio, category: 'Fiestas', title: 'Traditional Celebration' },
      { image: pageantPortfolio, category: 'Pageants', title: 'Stage & Runway Design' },
      { image: wedding2Portfolio, category: 'Weddings', title: 'Outdoor Wedding Paradise' }
    ];

    const filteredItems = portfolioFilter === 'All' 
      ? portfolioItems 
      : portfolioItems.filter(item => item.category === portfolioFilter);

    return (
      <div className="animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Masterpieces: A Gallery of Past Events
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our portfolio of stunning events and see how we transform visions into reality
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['All', 'Weddings', 'Birthdays', 'Fiestas', 'Corporate', 'Pageants'].map((filter) => (
              <Button
                key={filter}
                variant={portfolioFilter === filter ? 'default' : 'outline'}
                onClick={() => setPortfolioFilter(filter)}
                className="transition-all duration-200"
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-medium text-primary mb-1">{item.category}</div>
                    <div className="text-sm font-semibold">{item.title}</div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-muted/30 rounded-lg p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Create Your Own Masterpiece?
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Let's discuss your event vision and create something truly spectacular together.
              </p>
              <Button size="lg" onClick={() => navigate('/contact')}>
                Start Planning Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Service Detail Page
  const ServiceDetailPage = () => (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Wedding Decor & Planning
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your special day into a magical celebration with our comprehensive wedding services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src={weddingPortfolio} 
              alt="Wedding Decor"
              className="w-full h-96 object-cover rounded-lg shadow-card"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Your Dream Wedding Awaits
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Every wedding is a unique love story, and we're here to bring your vision to life. 
              From intimate ceremonies to grand celebrations, our wedding planning and decor services 
              ensure every detail is perfect for your special day.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-primary" />
                <span>Custom ceremony and reception design</span>
              </div>
              <div className="flex items-center space-x-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Premium floral arrangements and decor</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-primary" />
                <span>Full-service event coordination</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-primary" />
                <span>Personalized theme development</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[weddingPortfolio, wedding2Portfolio, weddingPortfolio].map((image, index) => (
            <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg aspect-video">
              <img 
                src={image} 
                alt={`Wedding Gallery ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" onClick={() => navigate('/contact')}>
            Inquire About This Service
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // Contact Page
  const ContactPage = () => {
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
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="fiesta">Fiesta</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="pageant">Pageant</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
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
                      <div className="text-muted-foreground">(555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">hello@nathanielsevents.com</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-muted-foreground">Downtown Event District<br />Available for events citywide</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl mb-4">Business Hours</CardTitle>
                </CardHeader>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-muted-foreground">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-muted-foreground">By Appointment</span>
                  </div>
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

  // Login Page
  const LoginPage = () => (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back, Client!</CardTitle>
          <CardDescription>
            Sign in to access your client dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input id="login-email" type="email" placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <Input id="login-password" type="password" />
          </div>
          <Button className="w-full" onClick={() => navigate('/client/dashboard')}>
            Sign In
          </Button>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <button
              onClick={() => navigate('/signup')}
              className="text-primary hover:underline"
            >
              Sign Up
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Signup Page
  const SignupPage = () => (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Your Client Account</CardTitle>
          <CardDescription>
            Join us to start planning your perfect event
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-name">Full Name</Label>
            <Input id="signup-name" placeholder="Your full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input id="signup-email" type="email" placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input id="signup-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button className="w-full" onClick={() => navigate('/client/dashboard')}>
            Create Account
          </Button>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <button
              onClick={() => navigate('/login')}
              className="text-primary hover:underline"
            >
              Sign In
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Client Dashboard Page
  const ClientDashboardPage = () => (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            Welcome to Your Client Dashboard!
          </h1>
          <div className="bg-card rounded-lg p-8 max-w-2xl mx-auto">
            <Home className="h-16 w-16 text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-6">
              Coming Soon: View your inquiries, track booking status, and more!
            </p>
            <p className="text-muted-foreground mb-8">
              This dashboard will allow you to manage all your event planning needs, 
              communicate with our team, and track the progress of your events.
            </p>
            <Button onClick={() => navigate('/')}>
              Return to Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // ===============================
  // ADMIN COMPONENTS
  // ===============================

  // Admin Login Page Component
  const AdminLoginPage = () => (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleAdminLogin(adminLoginForm.username, adminLoginForm.password);
          }}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="admin-username">Username</Label>
                <Input
                  id="admin-username"
                  type="text"
                  value={adminLoginForm.username}
                  onChange={(e) => setAdminLoginForm({
                    ...adminLoginForm,
                    username: e.target.value
                  })}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={adminLoginForm.password}
                    onChange={(e) => setAdminLoginForm({
                      ...adminLoginForm,
                      password: e.target.value
                    })}
                    placeholder="Enter password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              {adminLoginError && (
                <div className="text-sm text-destructive text-center">
                  {adminLoginError}
                </div>
              )}
              
              <Button type="submit" className="w-full">
                Login to Dashboard
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  // Admin Header Component
  const AdminHeader = () => (
    <header className="bg-foreground text-background border-b shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-background hover:bg-background/10"
            onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">
            <span className="text-primary">Admin</span> Dashboard
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-background hover:bg-background/10">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="text-background hover:bg-background/10">
                <CircleUser className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48" align="end">
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate('/admin/dashboard/profile/')}
                >
                  <CircleUser className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={handleAdminLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );

  // Admin Sidebar Component
  const AdminSidebar = () => {
    const adminNavItems = [
      { path: '/admin/dashboard/', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/admin/dashboard/inquiries/', icon: ClipboardList, label: 'Inquiries' },
      { path: '/admin/dashboard/events/', icon: CalendarDays, label: 'Events' },
      { path: '/admin/dashboard/services/', icon: Package, label: 'Services' },
      { path: '/admin/dashboard/portfolio/', icon: GalleryHorizontal, label: 'Portfolio' },
      { path: '/admin/dashboard/clients/', icon: Users, label: 'Clients' },
      { path: '/admin/dashboard/settings/', icon: Settings, label: 'Settings' },
      { path: '/admin/dashboard/profile/', icon: CircleUser, label: 'Profile' },
    ];

    return (
      <aside className={`bg-primary text-primary-foreground w-64 fixed inset-y-0 left-0 z-50 transform ${
        isAdminMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col`}>
        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="space-y-2 px-4">
            {adminNavItems.map((item) => {
              const isActive = currentPage === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left ${
                    isActive 
                      ? "bg-primary-foreground text-primary" 
                      : "text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </aside>
    );
  };

  // Admin Dashboard Page
  const AdminDashboardPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your business.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: ClipboardList, title: 'New Inquiries', value: '5', color: 'text-blue-600' },
          { icon: CalendarDays, title: 'Upcoming Events', value: '2', color: 'text-green-600' },
          { icon: Package, title: 'Total Services', value: '10', color: 'text-purple-600' },
          { icon: Users, title: 'Total Clients', value: '15', color: 'text-orange-600' },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <p className="text-sm">New inquiry received for wedding planning</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <p className="text-sm">Birthday event confirmed for next week</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <p className="text-sm">Portfolio updated with new images</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/admin/dashboard/inquiries/')}>
                <ClipboardList className="h-4 w-4 mr-2" />
                View All Inquiries
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/admin/dashboard/events/')}>
                <CalendarDays className="h-4 w-4 mr-2" />
                Manage Events
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/admin/dashboard/portfolio/')}>
                <GalleryHorizontal className="h-4 w-4 mr-2" />
                Update Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Admin Content Pages (Placeholders)
  const AdminInquiriesPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Client Inquiries</h1>
        <p className="text-muted-foreground">Manage and respond to client inquiries</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <ClipboardList className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">List of client inquiries will go here.</p>
        </CardContent>
      </Card>
    </div>
  );

  const AdminEventsPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Event Bookings</h1>
        <p className="text-muted-foreground">Track and manage confirmed events</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <CalendarDays className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">Manage confirmed event bookings.</p>
        </CardContent>
      </Card>
    </div>
  );

  const AdminServicesPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manage Services</h1>
        <p className="text-muted-foreground">Add, edit, and organize your service offerings</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">Add, edit, or delete services.</p>
        </CardContent>
      </Card>
    </div>
  );

  const AdminPortfolioPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manage Portfolio</h1>
        <p className="text-muted-foreground">Upload and organize your portfolio images</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <GalleryHorizontal className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">Upload and organize portfolio images.</p>
        </CardContent>
      </Card>
    </div>
  );

  const AdminClientsPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Client Accounts</h1>
        <p className="text-muted-foreground">View and manage registered clients</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">View and manage registered clients.</p>
        </CardContent>
      </Card>
    </div>
  );

  const AdminSettingsPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure application settings</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">Application settings and configurations.</p>
        </CardContent>
      </Card>
    </div>
  );

  const AdminProfilePage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Profile</h1>
        <p className="text-muted-foreground">Manage your admin account details</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <CircleUser className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">Manage admin account details.</p>
        </CardContent>
      </Card>
    </div>
  );

  // Admin Layout Component
  const AdminLayout = () => {
    const renderAdminContent = () => {
      if (currentPage === '/admin/dashboard/') return <AdminDashboardPage />;
      if (currentPage === '/admin/dashboard/inquiries/') return <AdminInquiriesPage />;
      if (currentPage === '/admin/dashboard/events/') return <AdminEventsPage />;
      if (currentPage === '/admin/dashboard/services/') return <AdminServicesPage />;
      if (currentPage === '/admin/dashboard/portfolio/') return <AdminPortfolioPage />;
      if (currentPage === '/admin/dashboard/clients/') return <AdminClientsPage />;
      if (currentPage === '/admin/dashboard/settings/') return <AdminSettingsPage />;
      if (currentPage === '/admin/dashboard/profile/') return <AdminProfilePage />;
      return <AdminDashboardPage />; // Default fallback
    };

    return (
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 md:ml-64 p-6">
            <div className="max-w-7xl mx-auto">
              {renderAdminContent()}
            </div>
          </main>
        </div>
        
        {/* Mobile overlay */}
        {isAdminMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsAdminMenuOpen(false)}
          />
        )}
      </div>
    );
  };

  // Main App rendering with routing
  const renderPage = () => {
    // Admin routes handling
    if (currentPage === '/admin') {
      return <AdminLoginPage />;
    }
    
    if (currentPage.startsWith('/admin/dashboard')) {
      if (!isAdminAuthenticated) {
        // This will be handled by useEffect redirect, but just in case
        return <AdminLoginPage />;
      }
      return <AdminLayout />;
    }
    
    // Client routes handling
    switch (currentPage) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/services':
        return <ServicesPage />;
      case '/services/wedding':
        return <ServiceDetailPage />;
      case '/portfolio':
        return <PortfolioPage />;
      case '/contact':
        return <ContactPage />;
      case '/login':
        return <LoginPage />;
      case '/signup':
        return <SignupPage />;
      case '/client/dashboard':
        return <ClientDashboardPage />;
      default:
        return <HomePage />;
    }
  };

  // Render the appropriate layout based on the current route
  const renderLayout = () => {
    // Admin routes don't use the main client layout
    if (currentPage === '/admin' || currentPage.startsWith('/admin/dashboard')) {
      return renderPage();
    }
    
    // Client routes use the standard layout with Navbar and Footer
    return (
      <div className="min-h-screen bg-background font-sans">
        <Navbar />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer />
      </div>
    );
  };

  return renderLayout();
};

export default App;