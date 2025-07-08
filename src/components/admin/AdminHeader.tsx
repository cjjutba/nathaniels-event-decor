import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Menu, Bell, CircleUser, LogOut } from 'lucide-react';
import { PATHS } from '@/lib/constants';

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
  return (
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
                  onClick={() => navigate(PATHS.ADMIN_PROFILE)}
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
};
