import React, { useState } from 'react';
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
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  type: 'inquiry' | 'event' | 'portfolio' | 'review' | 'system';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  actionUrl?: string;
}

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
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'inquiry',
      title: 'New inquiry received',
      description: 'Wedding planning request from Sarah Johnson for June 2025',
      time: '2 hours ago',
      isRead: false,
      actionUrl: '/admin/dashboard/inquiries'
    },
    {
      id: '2',
      type: 'event',
      title: 'Event confirmed',
      description: 'Birthday party for next weekend has been confirmed by client',
      time: '4 hours ago',
      isRead: false,
      actionUrl: '/admin/dashboard/events'
    },
    {
      id: '3',
      type: 'portfolio',
      title: 'Portfolio updated',
      description: 'New images added to wedding gallery - 15 photos uploaded',
      time: '1 day ago',
      isRead: true,
      actionUrl: '/admin/dashboard/portfolio'
    },
    {
      id: '4',
      type: 'review',
      title: 'New client review',
      description: '5-star review received from Maria Rodriguez for recent event',
      time: '2 days ago',
      isRead: true
    },
    {
      id: '5',
      type: 'system',
      title: 'System maintenance scheduled',
      description: 'Scheduled maintenance on Dec 20, 2024 from 2:00 AM - 4:00 AM',
      time: '3 days ago',
      isRead: false
    },
    {
      id: '6',
      type: 'inquiry',
      title: 'Follow-up required',
      description: 'Client inquiry from last week needs follow-up response',
      time: '5 days ago',
      isRead: true,
      actionUrl: '/admin/dashboard/inquiries'
    }
  ]);

  const getNotificationIcon = (type: Notification['type']) => {
    const iconProps = { className: "h-4 w-4" };
    switch (type) {
      case 'inquiry': return <ClipboardList {...iconProps} />;
      case 'event': return <CalendarDays {...iconProps} />;
      case 'portfolio': return <GalleryHorizontal {...iconProps} />;
      case 'review': return <Star {...iconProps} />;
      case 'system': return <Settings {...iconProps} />;
      default: return <Bell {...iconProps} />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'inquiry': return 'text-blue-600 bg-blue-100';
      case 'event': return 'text-green-600 bg-green-100';
      case 'portfolio': return 'text-purple-600 bg-purple-100';
      case 'review': return 'text-yellow-600 bg-yellow-100';
      case 'system': return 'text-gray-600 bg-gray-100';
      default: return 'text-primary bg-primary/10';
    }
  };



  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
    toast({
      title: "Success",
      description: "All notifications marked as read",
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

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notif.isRead;
    return notif.type === activeTab;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {unreadCount} new
                  </Badge>
                )}
              </DialogTitle>
              <DialogDescription>
                Stay updated with your business activities and important updates
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
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
              <TabsTrigger value="inquiry">Inquiries</TabsTrigger>
              <TabsTrigger value="event">Events</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              <ScrollArea className="h-[400px] pr-4">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No notifications found</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                          notification.isRead 
                            ? 'bg-background border-border' 
                            : 'bg-primary/5 border-primary/20'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`text-sm font-medium ${
                                  notification.isRead ? 'text-foreground' : 'text-foreground font-semibold'
                                }`}>
                                  {notification.title}
                                </h4>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {notification.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {notification.time}
                                </span>
                                {notification.actionUrl && (
                                  <Button variant="ghost" size="sm" className="text-xs h-6">
                                    View Details
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.isRead && (
                                <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark as read
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                onClick={() => deleteNotification(notification.id)}
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
