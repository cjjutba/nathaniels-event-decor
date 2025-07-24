import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PATHS, COMPANY_INFO } from '@/lib/constants';

interface LoginPageProps {
  navigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
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

      {/* Login Form */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-lg border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-semibold text-foreground mb-2">Welcome Back, Client!</CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to access your client dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="login-email" className="text-sm font-medium text-foreground">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="your@email.com"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-password" className="text-sm font-medium text-foreground">Password</Label>
            <Input
              id="login-password"
              type="password"
              className="h-11"
            />
          </div>
          <Button
            className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-medium"
            onClick={() => navigate(PATHS.CLIENT_DASHBOARD)}
          >
            Sign In
          </Button>
          <div className="text-center text-sm pt-2">
            <span className="text-muted-foreground">Don't have an account? </span>
            <button
              onClick={() => navigate(PATHS.SIGNUP)}
              className="text-primary hover:underline font-medium"
            >
              Sign Up
            </button>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};
