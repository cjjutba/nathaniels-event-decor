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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Activity,
  ClipboardList,
  CalendarDays,
  GalleryHorizontal,
  Star,
  Users,
  Settings,
  DollarSign,
  Package,
  Search,
  Filter,
  Clock,
  TrendingUp,
  FileText,
  Mail,
  Phone,
  Trash2,
  MoreHorizontal,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActivityItem {
  id: string;
  type: 'inquiry' | 'event' | 'portfolio' | 'review' | 'client' | 'payment' | 'system';
  title: string;
  description: string;
  time: string;
  date: string;
  user?: string;
  status?: 'completed' | 'pending' | 'in-progress' | 'cancelled';
  metadata?: {
    amount?: string;
    client?: string;
    eventType?: string;
    rating?: number;
  };
}

interface RecentActivitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecentActivitiesModal: React.FC<RecentActivitiesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'inquiry',
      title: 'New inquiry received',
      description: 'Wedding planning request from Sarah Johnson for June 2025',
      time: '2 hours ago',
      date: '2024-12-08',
      user: 'System',
      status: 'pending',
      metadata: { client: 'Sarah Johnson', eventType: 'Wedding' }
    },
    {
      id: '2',
      type: 'event',
      title: 'Event confirmed',
      description: 'Birthday party for next weekend has been confirmed by client',
      time: '4 hours ago',
      date: '2024-12-08',
      user: 'Admin',
      status: 'completed',
      metadata: { client: 'Maria Rodriguez', eventType: 'Birthday Party' }
    },
    {
      id: '3',
      type: 'portfolio',
      title: 'Portfolio updated',
      description: 'New images added to wedding gallery - 15 photos uploaded',
      time: '1 day ago',
      date: '2024-12-07',
      user: 'Admin',
      status: 'completed'
    },
    {
      id: '4',
      type: 'review',
      title: 'Client review received',
      description: '5-star review from Maria Rodriguez for recent birthday event',
      time: '2 days ago',
      date: '2024-12-06',
      user: 'Maria Rodriguez',
      status: 'completed',
      metadata: { rating: 5, client: 'Maria Rodriguez' }
    },
    {
      id: '5',
      type: 'payment',
      title: 'Payment received',
      description: 'Full payment received for Johnson Wedding event',
      time: '3 days ago',
      date: '2024-12-05',
      user: 'System',
      status: 'completed',
      metadata: { amount: '₱85,000', client: 'Sarah Johnson' }
    },
    {
      id: '6',
      type: 'client',
      title: 'New client registered',
      description: 'TechCorp Inc. registered for corporate event planning',
      time: '4 days ago',
      date: '2024-12-04',
      user: 'System',
      status: 'completed',
      metadata: { client: 'TechCorp Inc.', eventType: 'Corporate Event' }
    },
    {
      id: '7',
      type: 'event',
      title: 'Event proposal sent',
      description: 'Detailed proposal sent to client for anniversary celebration',
      time: '5 days ago',
      date: '2024-12-03',
      user: 'Admin',
      status: 'pending',
      metadata: { client: 'John & Mary Smith', eventType: 'Anniversary' }
    },
    {
      id: '8',
      type: 'system',
      title: 'Backup completed',
      description: 'Daily system backup completed successfully',
      time: '1 week ago',
      date: '2024-12-01',
      user: 'System',
      status: 'completed'
    }
  ]);

  const deleteActivity = (id: string) => {
    const activity = activities.find(a => a.id === id);
    setActivities(prev => prev.filter(activity => activity.id !== id));
    toast({
      title: "Activity Deleted",
      description: `"${activity?.title}" deleted successfully`,
    });
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    const iconProps = { className: "h-4 w-4" };
    switch (type) {
      case 'inquiry': return <ClipboardList {...iconProps} />;
      case 'event': return <CalendarDays {...iconProps} />;
      case 'portfolio': return <GalleryHorizontal {...iconProps} />;
      case 'review': return <Star {...iconProps} />;
      case 'client': return <Users {...iconProps} />;
      case 'payment': return <DollarSign {...iconProps} />;
      case 'system': return <Settings {...iconProps} />;
      default: return <Activity {...iconProps} />;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'inquiry': return 'text-blue-600 bg-blue-100';
      case 'event': return 'text-green-600 bg-green-100';
      case 'portfolio': return 'text-purple-600 bg-purple-100';
      case 'review': return 'text-yellow-600 bg-yellow-100';
      case 'client': return 'text-indigo-600 bg-indigo-100';
      case 'payment': return 'text-emerald-600 bg-emerald-100';
      case 'system': return 'text-gray-600 bg-gray-100';
      default: return 'text-primary bg-primary/10';
    }
  };

  const getStatusColor = (status: ActivityItem['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredActivities = activities
    .filter(activity => {
      if (activeTab !== 'all' && activity.type !== activeTab) return false;
      if (searchQuery && !activity.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !activity.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
      return 0;
    });

  const getTabCount = (type: string) => {
    if (type === 'all') return activities.length;
    return activities.filter(activity => activity.type === type).length;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activities
                <Badge variant="secondary" className="text-xs">
                  {activities.length} total
                </Badge>
              </DialogTitle>
              <DialogDescription>
                Complete history of all business activities and system events
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6">
          {/* Search and Filter Controls */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="overflow-x-auto">
              <TabsList className="grid w-full grid-cols-8 min-w-[800px]">
                <TabsTrigger value="all" className="text-xs">All ({getTabCount('all')})</TabsTrigger>
                <TabsTrigger value="inquiry" className="text-xs">Inquiries ({getTabCount('inquiry')})</TabsTrigger>
                <TabsTrigger value="event" className="text-xs">Events ({getTabCount('event')})</TabsTrigger>
                <TabsTrigger value="portfolio" className="text-xs">Portfolio ({getTabCount('portfolio')})</TabsTrigger>
                <TabsTrigger value="review" className="text-xs">Reviews ({getTabCount('review')})</TabsTrigger>
                <TabsTrigger value="client" className="text-xs">Clients ({getTabCount('client')})</TabsTrigger>
                <TabsTrigger value="payment" className="text-xs">Payments ({getTabCount('payment')})</TabsTrigger>
                <TabsTrigger value="system" className="text-xs">System ({getTabCount('system')})</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-4">
              <ScrollArea className="h-[380px] pr-4">
                {filteredActivities.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No activities found</p>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="p-4 rounded-lg border bg-background hover:shadow-sm transition-all duration-200"
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`p-2 rounded-full ${getActivityColor(activity.type)} flex-shrink-0`}>
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-medium text-foreground">
                                  {activity.title}
                                </h4>
                                {activity.status && (
                                  <Badge 
                                    variant="secondary" 
                                    className={`text-xs ${getStatusColor(activity.status)}`}
                                  >
                                    {activity.status}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {activity.time}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {activity.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                {activity.user && (
                                  <span>By: {activity.user}</span>
                                )}
                                {activity.metadata?.client && (
                                  <span>Client: {activity.metadata.client}</span>
                                )}
                                {activity.metadata?.amount && (
                                  <span className="text-green-600 font-medium">
                                    {activity.metadata.amount}
                                  </span>
                                )}
                                {activity.metadata?.rating && (
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span>{activity.metadata.rating}/5</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="text-xs h-6">
                                  View Details
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => deleteActivity(activity.id)}
                                      className="text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
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
