import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList } from 'lucide-react';

export const AdminInquiriesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Client Inquiries</h1>
        <p className="text-muted-foreground">Manage and respond to client inquiries</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <ClipboardList className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">List of client inquiries will go here.</p>
        </CardContent>
      </Card>
    </div>
  );
};
