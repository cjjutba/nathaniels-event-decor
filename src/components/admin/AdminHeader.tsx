import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Menu, Bell, CircleUser, LogOut, Settings, Search } from 'lucide-react';
import { PATHS } from '@/lib/constants';
import { useSidebar } from '@/hooks/useSidebar';

interface AdminHeaderProps {
  isAdminMenuOpen: boolean;
  setIsAdminMenuOpen: (open: boolean) => void;
  navigate: (path: string) => void;
  handleAdminLogout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  isAdminMenuOpen,
  setIsAdminMenuOpen,
  navigate,
  handleAdminLogout,
}) => {
  const { isCollapsed } = useSidebar();

  return (
    <header className="bg-background border-b border-border shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-foreground hover:bg-muted"
            onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search Button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Bell className="h-5 w-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                >
                  3
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">Notifications</h4>
                  <Badge variant="secondary" className="text-xs">3 new</Badge>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="p-2 rounded-md hover:bg-muted cursor-pointer">
                    <p className="text-sm font-medium">New inquiry received</p>
                    <p className="text-xs text-muted-foreground">Wedding planning request from Sarah Johnson</p>
                  </div>
                  <div className="p-2 rounded-md hover:bg-muted cursor-pointer">
                    <p className="text-sm font-medium">Event confirmed</p>
                    <p className="text-xs text-muted-foreground">Birthday party for next weekend</p>
                  </div>
                  <div className="p-2 rounded-md hover:bg-muted cursor-pointer">
                    <p className="text-sm font-medium">Portfolio updated</p>
                    <p className="text-xs text-muted-foreground">New images added to gallery</p>
                  </div>
                </div>
                <Separator />
                <Button variant="ghost" className="w-full text-sm">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <CircleUser className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="space-y-2">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@nathanielsevents.com</p>
                </div>
                <Separator />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => navigate(PATHS.ADMIN_PROFILE)}
                >
                  <CircleUser className="h-4 w-4 mr-2" />
                  Profile Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                  onClick={() => navigate(PATHS.ADMIN_SETTINGS)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Preferences
                </Button>
                <Separator />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleAdminLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};
