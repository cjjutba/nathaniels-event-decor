import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from 'lucide-react';

export const AdminEventsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Event Bookings</h1>
        <p className="text-muted-foreground">Track and manage confirmed events</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <CalendarDays className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">Manage confirmed event bookings.</p>
        </CardContent>
      </Card>
    </div>
  );
};
