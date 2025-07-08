import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useAdminSidebar } from '@/hooks/useSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  isAdminMenuOpen: boolean;
  setIsAdminMenuOpen: (open: boolean) => void;
  navigate: (path: string) => void;
  handleAdminLogout: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  currentPage,
  isAdminMenuOpen,
  setIsAdminMenuOpen,
  navigate,
  handleAdminLogout,
}) => {
  const { isCollapsed, isTransitioning } = useAdminSidebar();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Debug logging to track state changes
  useEffect(() => {
    if (mounted) {
      console.log('AdminLayout: Sidebar state changed', { isCollapsed, isTransitioning });
    }
  }, [isCollapsed, isTransitioning, mounted]);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
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
  );
};