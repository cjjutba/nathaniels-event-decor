import React, { useEffect } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { useAuth } from '@/hooks/useAuth';
import { ClientLayout } from '@/layouts/ClientLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { PATHS } from '@/lib/constants';

// Client Pages
import { HomePage } from '@/pages/client/HomePage';
import { AboutPage } from '@/pages/client/AboutPage';
import { ServicesPage } from '@/pages/client/ServicesPage';
import { ServiceDetailPage } from '@/pages/client/ServiceDetailPage';
import { PortfolioPage } from '@/pages/client/PortfolioPage';
import { ContactPage } from '@/pages/client/ContactPage';
import { LoginPage } from '@/pages/client/LoginPage';
import { SignupPage } from '@/pages/client/SignupPage';
import { ClientDashboardPage } from '@/pages/client/ClientDashboardPage';

// Admin Pages
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminInquiriesPage } from '@/pages/admin/AdminInquiriesPage';
import { AdminEventsPage } from '@/pages/admin/AdminEventsPage';
import { AdminServicesPage } from '@/pages/admin/AdminServicesPage';
import { AdminPortfolioPage } from '@/pages/admin/AdminPortfolioPage';
import { AdminClientsPage } from '@/pages/admin/AdminClientsPage';
import { AdminSettingsPage } from '@/pages/admin/AdminSettingsPage';
import { AdminProfilePage } from '@/pages/admin/AdminProfilePage';

export const AppComponent: React.FC = () => {
  const {
    currentPage,
    isMenuOpen,
    setIsMenuOpen,
    isAdminMenuOpen,
    setIsAdminMenuOpen,
    navigate,
  } = useNavigation();

  const {
    isAdminAuthenticated,
    handleAdminLogout,
  } = useAuth();

  // Route protection for admin dashboard
  useEffect(() => {
    if (currentPage.startsWith('/admin/dashboard') && !isAdminAuthenticated) {
      navigate(PATHS.ADMIN_LOGIN);
    }
  }, [currentPage, isAdminAuthenticated, navigate]);

  // Render the appropriate page content
  const renderPageContent = () => {
    // Admin routes handling
    if (currentPage === PATHS.ADMIN_LOGIN) {
      return <AdminLoginPage navigate={navigate} />;
    }
    
    if (currentPage.startsWith('/admin/dashboard')) {
      if (!isAdminAuthenticated) {
        return <AdminLoginPage navigate={navigate} />;
      }
      
      // Render admin page content based on current path
      switch (currentPage) {
        case PATHS.ADMIN_DASHBOARD:
          return <AdminDashboardPage navigate={navigate} />;
        case PATHS.ADMIN_INQUIRIES:
          return <AdminInquiriesPage />;
        case PATHS.ADMIN_EVENTS:
          return <AdminEventsPage />;
        case PATHS.ADMIN_SERVICES:
          return <AdminServicesPage />;
        case PATHS.ADMIN_PORTFOLIO:
          return <AdminPortfolioPage />;
        case PATHS.ADMIN_CLIENTS:
          return <AdminClientsPage />;
        case PATHS.ADMIN_SETTINGS:
          return <AdminSettingsPage />;
        case PATHS.ADMIN_PROFILE:
          return <AdminProfilePage />;
        default:
          return <AdminDashboardPage navigate={navigate} />;
      }
    }
    
    // Client routes handling
    switch (currentPage) {
      case PATHS.HOME:
        return <HomePage navigate={navigate} />;
      case PATHS.ABOUT:
        return <AboutPage navigate={navigate} />;
      case PATHS.SERVICES:
        return <ServicesPage navigate={navigate} />;
      case '/services/wedding':
        return <ServiceDetailPage navigate={navigate} />;
      case PATHS.PORTFOLIO:
        return <PortfolioPage navigate={navigate} />;
      case PATHS.CONTACT:
        return <ContactPage />;
      case PATHS.LOGIN:
        return <LoginPage navigate={navigate} />;
      case PATHS.SIGNUP:
        return <SignupPage navigate={navigate} />;
      case PATHS.CLIENT_DASHBOARD:
        return <ClientDashboardPage navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  // Render the appropriate layout based on the current route
  const renderLayout = () => {
    // Admin routes don't use the main client layout
    if (currentPage === PATHS.ADMIN_LOGIN || currentPage.startsWith('/admin/dashboard')) {
      if (currentPage === PATHS.ADMIN_LOGIN) {
        return renderPageContent();
      }
      
      return (
        <AdminLayout
          currentPage={currentPage}
          isAdminMenuOpen={isAdminMenuOpen}
          setIsAdminMenuOpen={setIsAdminMenuOpen}
          navigate={navigate}
          handleAdminLogout={() => handleAdminLogout(navigate)}
        >
          {renderPageContent()}
        </AdminLayout>
      );
    }
    
    // Client routes use the standard layout with Navbar and Footer
    return (
      <ClientLayout
        currentPage={currentPage}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navigate={navigate}
      >
        {renderPageContent()}
      </ClientLayout>
    );
  };

  return renderLayout();
};
