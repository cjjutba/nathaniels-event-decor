import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PATHS } from '@/lib/constants';

interface SignupPageProps {
  navigate: (path: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Your Client Account</CardTitle>
          <CardDescription>
            Join us to start planning your perfect event
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-name">Full Name</Label>
            <Input id="signup-name" placeholder="Your full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input id="signup-email" type="email" placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input id="signup-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button className="w-full" onClick={() => navigate(PATHS.CLIENT_DASHBOARD)}>
            Create Account
          </Button>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <button
              onClick={() => navigate(PATHS.LOGIN)}
              className="text-primary hover:underline"
            >
              Sign In
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
