import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  Package,
  GalleryHorizontal,
  Users,
  Settings,
  CircleUser,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
} from 'lucide-react';
import { PATHS, COMPANY_INFO } from '@/lib/constants';
import { useAdminSidebar } from '@/hooks/useSidebar';

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
  const { isCollapsed, toggleSidebar } = useAdminSidebar();

  // Debug logging
  React.useEffect(() => {
    console.log('AdminSidebar: isCollapsed changed to', isCollapsed);
  }, [isCollapsed]);

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

  const NavItem: React.FC<{ item: typeof adminNavItems[0] }> = ({ item }) => {
    const isActive = currentPage === item.path;

    const handleClick = React.useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('NavItem clicked:', item.path);
      navigate(item.path);
    }, [item.path, navigate]);

    const buttonContent = (
      <Button
        variant="ghost"
        className={`w-full transition-all duration-200 select-none ${
          isCollapsed ? 'justify-center px-2' : 'justify-start px-3'
        } ${
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
        onClick={handleClick}
        onMouseDown={(e) => e.preventDefault()} // Prevent focus issues
      >
        <item.icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0`} />
        {!isCollapsed && (
          <span className="font-medium text-sm truncate opacity-100 transition-opacity duration-200">
            {item.label}
          </span>
        )}
      </Button>
    );

    if (isCollapsed) {
      return (
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              {buttonContent}
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return buttonContent;
  };

  return (
    <aside
      className={`bg-background border-r border-border fixed inset-y-0 left-0 z-50 transform ${
        isAdminMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-all duration-300 ease-in-out flex flex-col shadow-sm`}
      style={{
        width: isCollapsed ? '4rem' : '16rem',
        // Force hardware acceleration for smoother transitions
        willChange: 'width, transform',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        // Improve touch responsiveness
        touchAction: 'manipulation',
      }}
    >
      
      {/* Header */}
      <div className={`p-4 border-b border-border ${isCollapsed ? 'px-2' : ''}`}>
        {!isCollapsed ? (
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <div className="relative">
                  <Heart className="h-5 w-5 text-primary fill-current" />
                  <Sparkles className="h-2.5 w-2.5 text-primary/60 absolute -top-0.5 -right-0.5 animate-pulse" />
                </div>
                <h2 className="text-lg font-bold text-foreground truncate">
                  <span className="text-primary">Admin</span>
                </h2>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {COMPANY_INFO.NAME}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                console.log('Collapse button clicked');
                toggleSidebar();
              }}
              className="h-8 w-8 p-0 hover:bg-muted flex-shrink-0 ml-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <Heart className="h-6 w-6 text-primary fill-current" />
              <Sparkles className="h-3 w-3 text-primary/60 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                console.log('Expand button clicked');
                toggleSidebar();
              }}
              className="h-6 w-6 p-0 hover:bg-muted"
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <nav className={`space-y-1 ${isCollapsed ? 'px-2' : 'px-3'}`} role="navigation" aria-label="Admin navigation">
          {adminNavItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className={`p-4 border-t border-border ${isCollapsed ? 'px-2' : ''}`}>
        {!isCollapsed ? (
          <div className="text-center">
            <p className="text-xs text-muted-foreground truncate">
              © 2025 {COMPANY_INFO.NAME}
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <Heart className="h-4 w-4 text-primary fill-current" />
          </div>
        )}
      </div>
    </aside>
  );
};