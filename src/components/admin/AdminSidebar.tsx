import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  Package,
  GalleryHorizontal,
  Users,
  Settings,
  CircleUser,
} from 'lucide-react';
import { PATHS } from '@/lib/constants';

interface AdminSidebarProps {
  currentPage: string;
  isAdminMenuOpen: boolean;
  navigate: (path: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentPage,
  isAdminMenuOpen,
  navigate,
}) => {
  const adminNavItems = [
    { path: PATHS.ADMIN_DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
    { path: PATHS.ADMIN_INQUIRIES, icon: ClipboardList, label: 'Inquiries' },
    { path: PATHS.ADMIN_EVENTS, icon: CalendarDays, label: 'Events' },
    { path: PATHS.ADMIN_SERVICES, icon: Package, label: 'Services' },
    { path: PATHS.ADMIN_PORTFOLIO, icon: GalleryHorizontal, label: 'Portfolio' },
    { path: PATHS.ADMIN_CLIENTS, icon: Users, label: 'Clients' },
    { path: PATHS.ADMIN_SETTINGS, icon: Settings, label: 'Settings' },
    { path: PATHS.ADMIN_PROFILE, icon: CircleUser, label: 'Profile' },
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
