import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Package } from 'lucide-react';

export const AdminServicesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manage Services</h1>
        <p className="text-muted-foreground">Add, edit, and organize your service offerings</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">Add, edit, or delete services.</p>
        </CardContent>
      </Card>
    </div>
  );
};
