import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Settings } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure application settings</p>
      </div>
      <Card>
        <CardContent className="p-8 text-center">
          <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
          <p className="text-muted-foreground">Application settings and configurations.</p>
        </CardContent>
      </Card>
    </div>
  );
};
