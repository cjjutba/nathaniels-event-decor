import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Menu,
  Bell,
  CircleUser,
  LogOut,
  Settings,
  Search,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  Eye,
  Command
} from 'lucide-react';
import { PATHS } from '@/lib/constants';
import { useAdminSidebar } from '@/hooks/useSidebar';
import { NotificationsModal } from './NotificationsModal';
import { GlobalSearchModal } from './GlobalSearchModal';
import { useSearch } from '@/contexts/SearchContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { isCollapsed } = useAdminSidebar();
  const { toast } = useToast();
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const {
    globalSearchQuery,
    setGlobalSearchQuery,
    setIsSearchModalOpen,
    getSuggestions
  } = useSearch();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Sample notification data for the dropdown preview
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New inquiry received',
      description: 'Wedding planning request from Sarah Johnson',
      isRead: false,
      time: '2 hours ago'
    },
    {
      id: '2',
      title: 'Event confirmed',
      description: 'Birthday party for next weekend',
      isRead: false,
      time: '4 hours ago'
    },
    {
      id: '3',
      title: 'Portfolio updated',
      description: 'New images added to gallery',
      isRead: true,
      time: '1 day ago'
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
    toast({
      title: "Notification Read",
      description: "Notification marked as read",
    });
  };

  const deleteNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification Deleted",
      description: `"${notification?.title}" deleted successfully`,
    });
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      <header className="bg-background border-b border-border shadow-sm sticky top-0 z-30">
      <div className={`flex items-center justify-between h-16 px-6 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'md:pl-6' : 'md:pl-6'
      }`}>
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

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search... (Ctrl+K)"
              value={globalSearchQuery}
              onChange={(e) => {
                setGlobalSearchQuery(e.target.value);
                if (e.target.value.trim()) {
                  getSuggestions(e.target.value);
                }
              }}
              onFocus={() => {
                setIsSearchFocused(true);
                setIsSearchModalOpen(true);
              }}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                  e.preventDefault();
                  setIsSearchModalOpen(true);
                }
              }}
              className={`pl-10 pr-20 w-64 transition-all duration-200 cursor-pointer ${
                isSearchFocused ? 'ring-2 ring-primary/20' : ''
              }`}
              readOnly
              onClick={() => setIsSearchModalOpen(true)}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border">
                <Command className="h-2.5 w-2.5 inline mr-0.5" />
                K
              </kbd>
            </div>
          </div>
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
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">Notifications</h4>
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                <Separator />
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`group relative p-3 rounded-md hover:bg-muted cursor-pointer transition-colors ${
                          !notification.isRead ? 'bg-primary/5 border-l-2 border-l-primary' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className={`text-sm font-medium truncate ${
                                !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {notification.title}
                              </p>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 truncate">
                              {notification.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.time}
                            </p>
                          </div>

                          {/* Action Menu */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                              >
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem
                                onClick={() => markAsRead(notification.id)}
                                disabled={notification.isRead}
                              >
                                <CheckCircle className="h-3 w-3 mr-2" />
                                Mark as read
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {}}>
                                <Eye className="h-3 w-3 mr-2" />
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteNotification(notification.id)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="h-3 w-3 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <Separator />
                <Button
                  variant="ghost"
                  className="w-full text-sm"
                  onClick={() => setIsNotificationsModalOpen(true)}
                >
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

    <NotificationsModal
      isOpen={isNotificationsModalOpen}
      onClose={() => setIsNotificationsModalOpen(false)}
    />

    <GlobalSearchModal navigate={navigate} />
  </>
  );
};