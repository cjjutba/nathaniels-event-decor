import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLoginPageProps {
  navigate: (path: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ navigate }) => {
  const {
    adminLoginForm,
    setAdminLoginForm,
    adminLoginError,
    showPassword,
    setShowPassword,
    handleAdminLogin,
  } = useAuth();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleAdminLogin(adminLoginForm.username, adminLoginForm.password, navigate);
          }}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="admin-username">Username</Label>
                <Input
                  id="admin-username"
                  type="text"
                  value={adminLoginForm.username}
                  onChange={(e) => setAdminLoginForm({
                    ...adminLoginForm,
                    username: e.target.value
                  })}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={adminLoginForm.password}
                    onChange={(e) => setAdminLoginForm({
                      ...adminLoginForm,
                      password: e.target.value
                    })}
                    placeholder="Enter password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              {adminLoginError && (
                <div className="text-sm text-destructive text-center">
                  {adminLoginError}
                </div>
              )}
              
              <Button type="submit" className="w-full">
                Login to Dashboard
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
