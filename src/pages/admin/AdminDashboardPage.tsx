import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardList,
  CalendarDays,
  Users,
  GalleryHorizontal,
  DollarSign,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  MoreHorizontal,
} from 'lucide-react';
import { PATHS } from '@/lib/constants';
import { RecentActivitiesModal } from '@/components/admin/RecentActivitiesModal';

interface AdminDashboardPageProps {
  navigate: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ navigate }) => {
  const [isActivitiesModalOpen, setIsActivitiesModalOpen] = useState(false);

  const stats = [
    {
      icon: ClipboardList,
      title: 'New Inquiries',
      value: '5',
      change: '+12%',
      trend: 'up',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'This week'
    },
    {
      icon: CalendarDays,
      title: 'Upcoming Events',
      value: '2',
      change: '+25%',
      trend: 'up',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Next 7 days'
    },
    {
      icon: DollarSign,
      title: 'Revenue',
      value: '₱124,500',
      change: '+8%',
      trend: 'up',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'This month'
    },
    {
      icon: Users,
      title: 'Total Clients',
      value: '15',
      change: '+3%',
      trend: 'up',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Active clients'
    },
  ];

  const recentActivities = [
    {
      icon: ClipboardList,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      title: 'New inquiry received',
      description: 'Wedding planning request from Sarah Johnson',
      time: '2 hours ago'
    },
    {
      icon: CalendarDays,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      title: 'Event confirmed',
      description: 'Birthday party for next weekend',
      time: '4 hours ago'
    },
    {
      icon: GalleryHorizontal,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      title: 'Portfolio updated',
      description: 'New images added to wedding gallery',
      time: '1 day ago'
    },
    {
      icon: Star,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      title: 'Client review received',
      description: '5-star review from Maria Rodriguez',
      time: '2 days ago'
    },
  ];

  const quickActions = [
    {
      icon: Plus,
      label: 'Create New Event',
      path: PATHS.ADMIN_EVENTS,
      description: 'Set up a new event booking',
      color: 'bg-primary text-primary-foreground hover:bg-primary/90'
    },
    {
      icon: ClipboardList,
      label: 'View Inquiries',
      path: PATHS.ADMIN_INQUIRIES,
      description: 'Review pending client requests',
      color: 'bg-blue-600 text-white hover:bg-blue-700'
    },
    {
      icon: GalleryHorizontal,
      label: 'Update Portfolio',
      path: PATHS.ADMIN_PORTFOLIO,
      description: 'Add new project images',
      color: 'bg-purple-600 text-white hover:bg-purple-700'
    },
  ];

  const upcomingEvents = [
    {
      title: 'Johnson Wedding',
      date: 'Dec 15, 2024',
      time: '4:00 PM',
      status: 'confirmed',
      client: 'Sarah & Mike Johnson'
    },
    {
      title: 'Corporate Gala',
      date: 'Dec 18, 2024',
      time: '7:00 PM',
      status: 'planning',
      client: 'TechCorp Inc.'
    },
    {
      title: 'Birthday Celebration',
      date: 'Dec 20, 2024',
      time: '2:00 PM',
      status: 'confirmed',
      client: 'Maria Rodriguez'
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="secondary"
                      className={`${stat.trend === 'up' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}
                    >
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {stat.change}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{stat.description}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
              <CardDescription>Latest updates and actions across your business</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsActivitiesModalOpen(true)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`p-2 rounded-full ${activity.bgColor}`}>
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  className={`w-full justify-start h-auto p-4 ${action.color}`}
                  onClick={() => navigate(action.path)}
                >
                  <div className="flex items-center space-x-3">
                    <action.icon className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">{action.label}</p>
                      <p className="text-xs opacity-90">{action.description}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Upcoming Events</CardTitle>
            <CardDescription>Events scheduled for the next 30 days</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate(PATHS.ADMIN_EVENTS)}>
            <CalendarDays className="h-4 w-4 mr-2" />
            Manage Events
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <CalendarDays className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.client}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{event.date}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                  <Badge variant={event.status === 'confirmed' ? 'default' : 'secondary'}>
                    {event.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <RecentActivitiesModal
        isOpen={isActivitiesModalOpen}
        onClose={() => setIsActivitiesModalOpen(false)}
      />
    </div>
  );
};
