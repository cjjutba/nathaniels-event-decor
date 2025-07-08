import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ClipboardList, 
  CalendarDays, 
  Package, 
  Users,
  GalleryHorizontal,
} from 'lucide-react';
import { PATHS } from '@/lib/constants';

interface AdminDashboardPageProps {
  navigate: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ navigate }) => {
  const stats = [
    { icon: ClipboardList, title: 'New Inquiries', value: '5', color: 'text-blue-600' },
    { icon: CalendarDays, title: 'Upcoming Events', value: '2', color: 'text-green-600' },
    { icon: Package, title: 'Total Services', value: '10', color: 'text-purple-600' },
    { icon: Users, title: 'Total Clients', value: '15', color: 'text-orange-600' },
  ];

  const recentActivities = [
    { color: 'bg-blue-600', text: 'New inquiry received for wedding planning' },
    { color: 'bg-green-600', text: 'Birthday event confirmed for next week' },
    { color: 'bg-purple-600', text: 'Portfolio updated with new images' },
  ];

  const quickActions = [
    { icon: ClipboardList, label: 'View All Inquiries', path: PATHS.ADMIN_INQUIRIES },
    { icon: CalendarDays, label: 'Manage Events', path: PATHS.ADMIN_EVENTS },
    { icon: GalleryHorizontal, label: 'Update Portfolio', path: PATHS.ADMIN_PORTFOLIO },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your business.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
                  <p className="text-sm">{activity.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate(action.path)}
                >
                  <action.icon className="h-4 w-4 mr-2" />
                  {action.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
