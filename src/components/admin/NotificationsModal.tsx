import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Bell,
  ClipboardList,
  CalendarDays,
  GalleryHorizontal,
  Star,
  Users,
  Settings,
  CheckCircle,
  X,
  Trash2,
  MoreHorizontal,
  Filter,
  Plus,
  Edit,
  Archive,
  Package,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotificationContext } from '@/contexts/NotificationContext';
import { AdminNotification } from '@/types/notifications';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');

  // Use real notification system
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getNotificationsByCategory,
    clearAllNotifications
  } = useNotificationContext();

  const getNotificationIcon = (notification: AdminNotification) => {
    const iconProps = { className: "h-3 w-3" };

    // Use the icon from the notification data
    switch (notification.icon) {
      case 'Plus': return <Plus {...iconProps} />;
      case 'Edit': return <Edit {...iconProps} />;
      case 'Trash2': return <Trash2 {...iconProps} />;
      case 'CheckCircle': return <CheckCircle {...iconProps} />;
      case 'Archive': return <Archive {...iconProps} />;
      case 'Settings': return <Settings {...iconProps} />;
      case 'Calendar': return <CalendarDays {...iconProps} />;
      case 'Package': return <Package {...iconProps} />;
      case 'GalleryHorizontal': return <GalleryHorizontal {...iconProps} />;
      case 'Users': return <Users {...iconProps} />;
      case 'ClipboardList': return <ClipboardList {...iconProps} />;
      case 'Star': return <Star {...iconProps} />;
      default: return <Bell {...iconProps} />;
    }
  };


  // Helper function to format timestamp
  const formatNotificationTime = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast({
      title: "Success",
      description: "All notifications marked as read",
    });
  };



  const handleDeleteNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    deleteNotification(id);
    toast({
      title: "Notification Deleted",
      description: `"${notification?.title}" deleted successfully`,
    });
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notif => {
      if (activeTab === 'all') return true;
      if (activeTab === 'unread') return !notif.isRead;
      return notif.category === activeTab;
    });
  }, [notifications, activeTab]);



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </DialogTitle>
              <DialogDescription>
                Stay updated with your business activities and important updates
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark all read
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              <ScrollArea className="h-[300px] pr-4">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No notifications found</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                          notification.isRead
                            ? 'bg-background border-border'
                            : 'bg-primary/5 border-primary/20'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-2 flex-1">
                            <div className={`p-1.5 rounded-full ${notification.bgColor} ${notification.color}`}>
                              {getNotificationIcon(notification)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`text-xs font-medium ${
                                  notification.isRead ? 'text-foreground' : 'text-foreground font-semibold'
                                }`}>
                                  {notification.title}
                                </h4>
                                <Badge
                                  variant="secondary"
                                  className="text-xs capitalize h-4 px-1.5"
                                >
                                  {notification.category}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {formatNotificationTime(notification.timestamp)}
                                </span>
                                <Badge
                                  variant={notification.priority === 'high' ? 'destructive' :
                                          notification.priority === 'medium' ? 'default' : 'secondary'}
                                  className="text-xs h-4 px-1.5"
                                >
                                  {notification.priority}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.isRead && (
                                <DropdownMenuItem onClick={() => handleMarkAsRead(notification.id)}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark as read
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onClick={() => handleDeleteNotification(notification.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
