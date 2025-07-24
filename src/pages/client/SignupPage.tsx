import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PATHS, COMPANY_INFO } from '@/lib/constants';

interface SignupPageProps {
  navigate: (path: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-muted/30 relative">
      {/* Company Logo in Top Left */}
      <div className="absolute top-6 left-20 z-10">
        <button
          onClick={() => navigate(PATHS.HOME)}
          className="text-xl font-bold hover:opacity-80 transition-opacity"
        >
          <span className="text-primary">Nathaniel's</span>{' '}
          <span className="text-foreground">Event & Decor</span>
        </button>
      </div>

      {/* Signup Form */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-lg border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-semibold text-foreground mb-2">Create Your Client Account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Join us to start planning your perfect event
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="signup-name" className="text-sm font-medium text-foreground">Full Name</Label>
            <Input
              id="signup-name"
              placeholder="Your full name"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-sm font-medium text-foreground">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="your@email.com"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-sm font-medium text-foreground">Password</Label>
            <Input
              id="signup-password"
              type="password"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-sm font-medium text-foreground">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              className="h-11"
            />
          </div>
          <Button
            className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-medium mt-6"
            onClick={() => navigate(PATHS.CLIENT_DASHBOARD)}
          >
            Create Account
          </Button>
          <div className="text-center text-sm pt-2">
            <span className="text-muted-foreground">Already have an account? </span>
            <button
              onClick={() => navigate(PATHS.LOGIN)}
              className="text-primary hover:underline font-medium"
            >
              Sign In
            </button>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};
