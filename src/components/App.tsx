import React, { useEffect, Suspense } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { useAuth } from '@/contexts/AuthContext';
import { ClientLayout } from '@/layouts/ClientLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AdminSidebarProvider } from '@/hooks/useSidebar';
import { PATHS } from '@/lib/constants';

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Lazy load Client Pages
const HomePage = React.lazy(() => import('@/pages/client/HomePage').then(module => ({ default: module.HomePage })));
const AboutPage = React.lazy(() => import('@/pages/client/AboutPage').then(module => ({ default: module.AboutPage })));
const ServicesPage = React.lazy(() => import('@/pages/client/ServicesPage').then(module => ({ default: module.ServicesPage })));
const ServiceDetailPage = React.lazy(() => import('@/pages/client/ServiceDetailPage').then(module => ({ default: module.ServiceDetailPage })));
const PortfolioPage = React.lazy(() => import('@/pages/client/PortfolioPage').then(module => ({ default: module.PortfolioPage })));
const ContactPage = React.lazy(() => import('@/pages/client/ContactPage').then(module => ({ default: module.ContactPage })));
const LoginPage = React.lazy(() => import('@/pages/client/LoginPage').then(module => ({ default: module.LoginPage })));
const SignupPage = React.lazy(() => import('@/pages/client/SignupPage').then(module => ({ default: module.SignupPage })));
const ClientDashboardPage = React.lazy(() => import('@/pages/client/ClientDashboardPage').then(module => ({ default: module.ClientDashboardPage })));

// Lazy load Admin Pages
const AdminLoginPage = React.lazy(() => import('@/pages/admin/AdminLoginPage').then(module => ({ default: module.AdminLoginPage })));
const AdminDashboardPage = React.lazy(() => import('@/pages/admin/AdminDashboardPage').then(module => ({ default: module.AdminDashboardPage })));
const AdminInquiriesPage = React.lazy(() => import('@/pages/admin/AdminInquiriesPage').then(module => ({ default: module.AdminInquiriesPage })));
const AdminEventsPage = React.lazy(() => import('@/pages/admin/AdminEventsPage').then(module => ({ default: module.AdminEventsPage })));
const AdminServicesPage = React.lazy(() => import('@/pages/admin/AdminServicesPage').then(module => ({ default: module.AdminServicesPage })));
const AdminPortfolioPage = React.lazy(() => import('@/pages/admin/AdminPortfolioPage').then(module => ({ default: module.AdminPortfolioPage })));
const AdminClientsPage = React.lazy(() => import('@/pages/admin/AdminClientsPage').then(module => ({ default: module.AdminClientsPage })));
const AdminSettingsPage = React.lazy(() => import('@/pages/admin/AdminSettingsPage').then(module => ({ default: module.AdminSettingsPage })));
const AdminProfilePage = React.lazy(() => import('@/pages/admin/AdminProfilePage').then(module => ({ default: module.AdminProfilePage })));

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
    isSessionLoading,
    handleAdminLogout,
  } = useAuth();

  // Route protection for admin dashboard with session loading consideration
  useEffect(() => {
    // Don't redirect while session is still loading
    if (isSessionLoading) return;

    // If user is on admin routes but not authenticated, redirect to login
    if (currentPage.startsWith('/admin/dashboard') && !isAdminAuthenticated) {
      console.log('Redirecting to admin login - not authenticated');
      navigate(PATHS.ADMIN_LOGIN);
    }

    // If user is on admin login page but already authenticated, redirect to dashboard
    if (currentPage === PATHS.ADMIN_LOGIN && isAdminAuthenticated) {
      console.log('Redirecting to dashboard - already authenticated');
      navigate(PATHS.ADMIN_DASHBOARD);
    }
  }, [currentPage, isAdminAuthenticated, isSessionLoading, navigate]);

  // Render the appropriate page content
  const renderPageContent = () => {
    // Show loading state while checking session
    if (isSessionLoading && currentPage.startsWith('/admin')) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Checking authentication...</p>
          </div>
        </div>
      );
    }

    // Admin routes handling
    if (currentPage === PATHS.ADMIN_LOGIN) {
      return (
        <Suspense fallback={<PageLoader />}>
          <AdminLoginPage navigate={navigate} />
        </Suspense>
      );
    }

    if (currentPage.startsWith('/admin/dashboard')) {
      if (!isAdminAuthenticated) {
        return (
          <Suspense fallback={<PageLoader />}>
            <AdminLoginPage navigate={navigate} />
          </Suspense>
        );
      }

      // Render admin page content based on current path (handle query parameters)
      const basePath = currentPage.split('?')[0]; // Remove query parameters for routing
      return (
        <Suspense fallback={<PageLoader />}>
          {(() => {
            switch (basePath) {
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
          })()}
        </Suspense>
      );
    }

    // Client routes handling
    return (
      <Suspense fallback={<PageLoader />}>
        {(() => {
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
              return <ContactPage navigate={navigate} />;
            case PATHS.LOGIN:
              return <LoginPage navigate={navigate} />;
            case PATHS.SIGNUP:
              return <SignupPage navigate={navigate} />;
            case PATHS.CLIENT_DASHBOARD:
              return <ClientDashboardPage navigate={navigate} />;
            default:
              return <HomePage navigate={navigate} />;
          }
        })()}
      </Suspense>
    );
  };

  // Render the appropriate layout based on the current route
  const renderLayout = () => {
    // Admin routes and client auth pages don't use the main client layout
    if (currentPage === PATHS.ADMIN_LOGIN || currentPage.startsWith('/admin/dashboard') ||
        currentPage === PATHS.LOGIN || currentPage === PATHS.SIGNUP) {
      if (currentPage === PATHS.ADMIN_LOGIN || currentPage === PATHS.LOGIN || currentPage === PATHS.SIGNUP) {
        return renderPageContent();
      }
      
      return (
        <AdminSidebarProvider>
          <AdminLayout
            currentPage={currentPage}
            isAdminMenuOpen={isAdminMenuOpen}
            setIsAdminMenuOpen={setIsAdminMenuOpen}
            navigate={navigate}
            handleAdminLogout={() => handleAdminLogout(navigate)}
          >
            {renderPageContent()}
          </AdminLayout>
        </AdminSidebarProvider>
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
