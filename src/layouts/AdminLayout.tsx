import React from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/hooks/useSidebar';

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
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar
        currentPage={currentPage}
        isAdminMenuOpen={isAdminMenuOpen}
        navigate={navigate}
      />

      {/* Main content area with responsive margin */}
      <div className={`transition-all duration-300 ease-in-out ml-0 ${isCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        <AdminHeader
          isAdminMenuOpen={isAdminMenuOpen}
          setIsAdminMenuOpen={setIsAdminMenuOpen}
          navigate={navigate}
          handleAdminLogout={handleAdminLogout}
        />

        <main className="min-h-[calc(100vh-4rem)]">
          {children}
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
