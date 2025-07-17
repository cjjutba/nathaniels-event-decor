import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CircleUser,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Save,
  Edit,
  Camera,
  Key,
  Clock,
  Activity,
  Settings,
  LogOut,
  Check,
  X,
  AlertTriangle,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Award,
  Briefcase,
  Globe,
  Lock,
  Unlock,
  Smartphone,
  Monitor,
  Tablet,
} from 'lucide-react';
import { DEMO_CREDENTIALS } from '@/lib/constants';

interface AdminProfile {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  location: string;
  bio: string;
  role: string;
  department: string;
  joinDate: string;
  lastLogin: string;
  avatar: string;
  timezone: string;
  language: string;
}

interface SecurityInfo {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  loginAttempts: number;
  activeSessions: number;
  trustedDevices: number;
}

interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  ipAddress: string;
  device: string;
  location: string;
}

interface NotificationPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  newInquiries: boolean;
  eventUpdates: boolean;
  systemAlerts: boolean;
  weeklyReports: boolean;
  marketingEmails: boolean;
}

export const AdminProfilePage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);

  // Admin Profile State
  const [adminProfile, setAdminProfile] = useState<AdminProfile>({
    id: '1',
    username: DEMO_CREDENTIALS.ADMIN_USERNAME,
    email: 'admin@nathanielsevents.com',
    firstName: 'Nathaniel',
    lastName: 'Administrator',
    phone: '+1 (555) 123-4567',
    location: 'Manila, Philippines',
    bio: 'Lead administrator for Nathaniel\'s Event & Decor. Passionate about creating unforgettable experiences and managing exceptional events.',
    role: 'Super Administrator',
    department: 'Management',
    joinDate: '2024-01-01',
    lastLogin: '2024-01-20T14:45:00Z',
    avatar: '',
    timezone: 'Asia/Manila',
    language: 'English'
  });

  // Security Information
  const [securityInfo] = useState<SecurityInfo>({
    twoFactorEnabled: false,
    lastPasswordChange: '2024-01-15T10:30:00Z',
    loginAttempts: 0,
    activeSessions: 2,
    trustedDevices: 3
  });

  // Notification Preferences
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newInquiries: true,
    eventUpdates: true,
    systemAlerts: true,
    weeklyReports: true,
    marketingEmails: false
  });

  // Recent Activity Logs
  const [activityLogs] = useState<ActivityLog[]>([
    {
      id: '1',
      action: 'Login',
      description: 'Successful login to admin dashboard',
      timestamp: '2024-01-20T14:45:00Z',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows',
      location: 'Manila, Philippines'
    },
    {
      id: '2',
      action: 'Profile Update',
      description: 'Updated profile information',
      timestamp: '2024-01-20T10:30:00Z',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows',
      location: 'Manila, Philippines'
    },
    {
      id: '3',
      action: 'Settings Change',
      description: 'Modified notification preferences',
      timestamp: '2024-01-19T16:20:00Z',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows',
      location: 'Manila, Philippines'
    },
    {
      id: '4',
      action: 'Event Created',
      description: 'Created new event: Johnson Wedding',
      timestamp: '2024-01-19T11:15:00Z',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows',
      location: 'Manila, Philippines'
    },
    {
      id: '5',
      action: 'Client Added',
      description: 'Added new client: Sarah Johnson',
      timestamp: '2024-01-18T09:45:00Z',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows',
      location: 'Manila, Philippines'
    }
  ]);

  // Helper functions
  const handleProfileChange = (key: keyof AdminProfile, value: any) => {
    setAdminProfile(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleNotificationChange = (key: keyof NotificationPreferences, value: boolean) => {
    setNotificationPreferences(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'Login':
        return <LogOut className="h-4 w-4 text-green-500" />;
      case 'Profile Update':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'Settings Change':
        return <Settings className="h-4 w-4 text-purple-500" />;
      case 'Event Created':
        return <Calendar className="h-4 w-4 text-orange-500" />;
      case 'Client Added':
        return <User className="h-4 w-4 text-teal-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getDeviceIcon = (device: string) => {
    if (device.includes('Mobile') || device.includes('iPhone') || device.includes('Android')) {
      return <Smartphone className="h-4 w-4 text-muted-foreground" />;
    } else if (device.includes('Tablet') || device.includes('iPad')) {
      return <Tablet className="h-4 w-4 text-muted-foreground" />;
    } else {
      return <Monitor className="h-4 w-4 text-muted-foreground" />;
    }
  };

  // Statistics for profile overview
  const stats = [
    {
      icon: User,
      title: 'Profile Status',
      value: 'Active',
      change: 'Verified',
      trend: 'up',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Account status'
    },
    {
      icon: Shield,
      title: 'Security Level',
      value: securityInfo.twoFactorEnabled ? 'Enhanced' : 'Standard',
      change: 'Protected',
      trend: 'up',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Security status'
    },
    {
      icon: Activity,
      title: 'Active Sessions',
      value: securityInfo.activeSessions.toString(),
      change: 'Online',
      trend: 'up',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Current sessions'
    },
    {
      icon: Clock,
      title: 'Last Login',
      value: 'Today',
      change: 'Recent',
      trend: 'up',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: formatDateTime(adminProfile.lastLogin)
    }
  ];

  const saveProfile = () => {
    // In a real application, this would save to a backend
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    setHasUnsavedChanges(false);
  };

  const changePassword = () => {
    // In a real application, this would change the password
    toast({
      title: "Password Changed",
      description: "Your password has been changed successfully.",
    });
    setIsChangePasswordDialogOpen(false);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Admin Profile</h1>
        <p className="text-muted-foreground">Manage your admin account details</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center space-x-1">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-3 w-3 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-600" />
                    )}
                    <span className={`text-xs font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">{stat.description}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Unsaved Changes Alert */}
      {hasUnsavedChanges && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">You have unsaved changes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" onClick={() => setHasUnsavedChanges(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Discard
                </Button>
                <Button size="sm" onClick={saveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Profile Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Management</CardTitle>
          <CardDescription>
            Manage your personal information, security settings, and account preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="activity">
                <Activity className="h-4 w-4 mr-2" />
                Activity
              </TabsTrigger>
            </TabsList>

            {/* Profile Information Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={adminProfile.avatar} alt={`${adminProfile.firstName} ${adminProfile.lastName}`} />
                      <AvatarFallback className="text-lg">
                        {adminProfile.firstName.charAt(0)}{adminProfile.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                      onClick={() => {
                        toast({
                          title: "Feature Coming Soon",
                          description: "Avatar upload functionality will be available soon.",
                        });
                      }}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      {adminProfile.firstName} {adminProfile.lastName}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        <Award className="h-3 w-3 mr-1" />
                        {adminProfile.role}
                      </Badge>
                      <Badge variant="outline">
                        <Briefcase className="h-3 w-3 mr-1" />
                        {adminProfile.department}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Member since {formatDate(adminProfile.joinDate)}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={adminProfile.firstName}
                        onChange={(e) => handleProfileChange('firstName', e.target.value)}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={adminProfile.lastName}
                        onChange={(e) => handleProfileChange('lastName', e.target.value)}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={adminProfile.bio}
                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                      placeholder="Tell us about yourself"
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={adminProfile.email}
                          onChange={(e) => handleProfileChange('email', e.target.value)}
                          placeholder="Enter email address"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={adminProfile.phone}
                          onChange={(e) => handleProfileChange('phone', e.target.value)}
                          placeholder="Enter phone number"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        value={adminProfile.location}
                        onChange={(e) => handleProfileChange('location', e.target.value)}
                        placeholder="Enter location"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={adminProfile.timezone}
                        onValueChange={(value) => handleProfileChange('timezone', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Manila">Asia/Manila (GMT+8)</SelectItem>
                          <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
                          <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                          <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                          <SelectItem value="Asia/Tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={adminProfile.language}
                        onValueChange={(value) => handleProfileChange('language', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Filipino">Filipino</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="Chinese">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <div className="space-y-6">
                {/* Security Overview */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Security Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Shield className="h-5 w-5 text-green-500" />
                        <span className="text-2xl font-bold">{securityInfo.twoFactorEnabled ? 'ON' : 'OFF'}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Two-Factor Auth</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Monitor className="h-5 w-5 text-blue-500" />
                        <span className="text-2xl font-bold">{securityInfo.activeSessions}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Active Sessions</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Smartphone className="h-5 w-5 text-purple-500" />
                        <span className="text-2xl font-bold">{securityInfo.trustedDevices}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Trusted Devices</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Password Management */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Password & Authentication</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Key className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-foreground">Password</p>
                          <p className="text-sm text-muted-foreground">
                            Last changed {formatDate(securityInfo.lastPasswordChange)}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => setIsChangePasswordDialogOpen(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium text-foreground">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">
                            {securityInfo.twoFactorEnabled ? 'Enabled for enhanced security' : 'Add an extra layer of security'}
                          </p>
                        </div>
                      </div>
                      <Button variant={securityInfo.twoFactorEnabled ? "destructive" : "default"}>
                        {securityInfo.twoFactorEnabled ? (
                          <>
                            <Unlock className="h-4 w-4 mr-2" />
                            Disable 2FA
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            Enable 2FA
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Account Information */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Account Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Username</Label>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium">{adminProfile.username}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Account Type</Label>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium">{adminProfile.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Member Since</Label>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium">{formatDate(adminProfile.joinDate)}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Last Login</Label>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium">{formatDateTime(adminProfile.lastLogin)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Login Attempts */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Security Status</h3>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Account Security: Good</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      No suspicious activity detected. {securityInfo.loginAttempts} failed login attempts in the last 30 days.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Notification Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-foreground">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationPreferences.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium text-foreground">SMS Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationPreferences.smsNotifications}
                        onCheckedChange={(checked) => handleNotificationChange('smsNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="font-medium text-foreground">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationPreferences.pushNotifications}
                        onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Event Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="font-medium text-foreground">New Inquiries</p>
                          <p className="text-sm text-muted-foreground">Get notified when new inquiries are received</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationPreferences.newInquiries}
                        onCheckedChange={(checked) => handleNotificationChange('newInquiries', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-foreground">Event Updates</p>
                          <p className="text-sm text-muted-foreground">Receive updates about event changes</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationPreferences.eventUpdates}
                        onCheckedChange={(checked) => handleNotificationChange('eventUpdates', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium text-foreground">System Alerts</p>
                          <p className="text-sm text-muted-foreground">Important system notifications and alerts</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationPreferences.systemAlerts}
                        onCheckedChange={(checked) => handleNotificationChange('systemAlerts', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Star className="h-5 w-5 text-orange-500" />
                        <div>
                          <p className="font-medium text-foreground">Weekly Reports</p>
                          <p className="text-sm text-muted-foreground">Receive weekly business summary reports</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationPreferences.weeklyReports}
                        onCheckedChange={(checked) => handleNotificationChange('weeklyReports', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {activityLogs.map((log) => (
                      <div key={log.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="p-2 bg-muted rounded-full">
                          {getActionIcon(log.action)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-foreground">{log.action}</p>
                            <span className="text-xs text-muted-foreground">{formatDateTime(log.timestamp)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{log.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Globe className="h-3 w-3" />
                              <span>{log.ipAddress}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {getDeviceIcon(log.device)}
                              <span>{log.device}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{log.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Change Password Dialog */}
      <Dialog open={isChangePasswordDialogOpen} onOpenChange={setIsChangePasswordDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new one
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsChangePasswordDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={changePassword}>
                <Key className="h-4 w-4 mr-2" />
                Change Password
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">Save Profile</h3>
              <p className="text-sm text-muted-foreground">
                {hasUnsavedChanges ? 'You have unsaved changes' : 'All changes are saved'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setHasUnsavedChanges(false)}>
                <X className="h-4 w-4 mr-2" />
                Discard Changes
              </Button>
              <Button onClick={saveProfile} disabled={!hasUnsavedChanges}>
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
