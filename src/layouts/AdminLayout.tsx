import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useAdminSidebar } from '@/hooks/useSidebar';
import { SearchProvider } from '@/contexts/SearchContext';
import { SearchDataProvider } from '@/components/admin/SearchDataProvider';
import { LoadingProvider, useLoading } from '@/contexts/LoadingContext';
import { GlobalLoading } from '@/components/ui/global-loading';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  isAdminMenuOpen: boolean;
  setIsAdminMenuOpen: (open: boolean) => void;
  navigate: (path: string) => void;
  handleAdminLogout: () => void;
}

const AdminLayoutContent: React.FC<AdminLayoutProps> = ({
  children,
  currentPage,
  isAdminMenuOpen,
  setIsAdminMenuOpen,
  navigate,
  handleAdminLogout,
}) => {
  const { isCollapsed } = useAdminSidebar();
  const { isLoading, loadingMessage } = useLoading();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle sidebar transition state
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [isCollapsed, isTransitioning, mounted]);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      <GlobalLoading isVisible={isLoading} message={loadingMessage} />
      <div className="min-h-screen bg-muted/30 relative">
        <AdminSidebar
          currentPage={currentPage}
          isAdminMenuOpen={isAdminMenuOpen}
          navigate={navigate}
        />

        {/* Main content wrapper with dynamic margin and smooth transitions */}
        <div
          className="transition-all duration-300 ease-in-out"
          style={{
            marginLeft: isCollapsed ? '4rem' : '16rem',
            // Force hardware acceleration for smoother transitions
            transform: 'translateZ(0)',
            willChange: 'margin-left',
          }}
        >
          <AdminHeader
            isAdminMenuOpen={isAdminMenuOpen}
            setIsAdminMenuOpen={setIsAdminMenuOpen}
            navigate={navigate}
            handleAdminLogout={handleAdminLogout}
          />

          <main className="relative">
            <div className="min-h-[calc(100vh-4rem)]">
              {children}
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
    </>
  );
};

export const AdminLayout: React.FC<AdminLayoutProps> = (props) => {
  return (
    <LoadingProvider>
      <SearchProvider>
        <SearchDataProvider>
          <AdminLayoutContent {...props} />
        </SearchDataProvider>
      </SearchProvider>
    </LoadingProvider>
  );
};

