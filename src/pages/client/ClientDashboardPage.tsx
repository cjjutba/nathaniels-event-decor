import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from 'lucide-react';
import { PATHS } from '@/lib/constants';

interface ClientDashboardPageProps {
  navigate: (path: string) => void;
}

export const ClientDashboardPage: React.FC<ClientDashboardPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            Welcome to Your Client Dashboard!
          </h1>
          <div className="bg-card rounded-lg p-8 max-w-2xl mx-auto">
            <Home className="h-16 w-16 text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-6">
              Coming Soon: View your inquiries, track booking status, and more!
            </p>
            <p className="text-muted-foreground mb-8">
              This dashboard will allow you to manage all your event planning needs, 
              communicate with our team, and track the progress of your events.
            </p>
            <Button onClick={() => navigate(PATHS.HOME)}>
              Return to Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
