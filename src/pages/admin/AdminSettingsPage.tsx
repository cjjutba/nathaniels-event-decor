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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  Building2,
  Users,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Check,
  X,
  AlertTriangle,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Star,
  Package,
  FileText,
  Database,
  Zap,
  Lock,
  Unlock,
} from 'lucide-react';
import { COMPANY_INFO, CONTACT_INFO, BUSINESS_HOURS, EVENT_TYPES } from '@/lib/constants';
import { useAdminActions } from '@/hooks/useAdminActions';

interface BusinessSettings {
  companyName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  locationDetail: string;
  foundedYear: number;
  businessHours: Array<{ day: string; hours: string; enabled: boolean }>;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  newInquiries: boolean;
  eventReminders: boolean;
  clientUpdates: boolean;
  systemAlerts: boolean;
  marketingEmails: boolean;
}

interface SystemSettings {
  maintenanceMode: boolean;
  autoBackup: boolean;
  dataRetention: number;
  sessionTimeout: number;
  maxFileSize: number;
  allowRegistration: boolean;
  requireApproval: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  passwordExpiry: number;
  loginAttempts: number;
  sessionSecurity: boolean;
  auditLogging: boolean;
  ipWhitelist: string[];
}

export const AdminSettingsPage: React.FC = () => {
  const { toast } = useToast();
  const adminActions = useAdminActions({
    entityName: 'settings',
    entityDisplayName: 'Settings'
  });
  const [activeTab, setActiveTab] = useState('business');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Business Settings State
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>({
    companyName: COMPANY_INFO.NAME,
    tagline: COMPANY_INFO.TAGLINE,
    description: COMPANY_INFO.DESCRIPTION,
    phone: CONTACT_INFO.PHONE,
    email: CONTACT_INFO.EMAIL,
    location: CONTACT_INFO.LOCATION,
    locationDetail: CONTACT_INFO.LOCATION_DETAIL,
    foundedYear: COMPANY_INFO.FOUNDED_YEAR,
    businessHours: BUSINESS_HOURS.map(hour => ({ ...hour, enabled: true }))
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    newInquiries: true,
    eventReminders: true,
    clientUpdates: true,
    systemAlerts: true,
    marketingEmails: false
  });

  // System Settings State
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    maintenanceMode: false,
    autoBackup: true,
    dataRetention: 365,
    sessionTimeout: 24,
    maxFileSize: 10,
    allowRegistration: true,
    requireApproval: false
  });

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    passwordExpiry: 90,
    loginAttempts: 5,
    sessionSecurity: true,
    auditLogging: true,
    ipWhitelist: []
  });

  // Statistics for settings overview
  const stats = [
    {
      icon: Building2,
      title: 'Business Profile',
      value: 'Active',
      change: 'Updated',
      trend: 'up',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Company information'
    },
    {
      icon: Bell,
      title: 'Notifications',
      value: Object.values(notificationSettings).filter(Boolean).length.toString(),
      change: 'Enabled',
      trend: 'up',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Active alerts'
    },
    {
      icon: Shield,
      title: 'Security',
      value: securitySettings.twoFactorAuth ? 'Enhanced' : 'Standard',
      change: 'Protected',
      trend: 'up',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Security level'
    },
    {
      icon: Database,
      title: 'System Health',
      value: systemSettings.maintenanceMode ? 'Maintenance' : 'Online',
      change: 'Operational',
      trend: 'up',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'System status'
    }
  ];

  // Helper functions
  const handleBusinessSettingChange = (key: keyof BusinessSettings, value: any) => {
    setBusinessSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleNotificationSettingChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSystemSettingChange = (key: keyof SystemSettings, value: any) => {
    setSystemSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSecuritySettingChange = (key: keyof SecuritySettings, value: any) => {
    setSecuritySettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleBusinessHourChange = (index: number, field: 'day' | 'hours' | 'enabled', value: any) => {
    const updatedHours = [...businessSettings.businessHours];
    updatedHours[index] = { ...updatedHours[index], [field]: value };
    setBusinessSettings(prev => ({ ...prev, businessHours: updatedHours }));
    setHasUnsavedChanges(true);
  };

  const saveSettings = () => {
    // In a real application, this would save to a backend
    toast({
      title: "Settings Saved",
      description: "All settings have been saved successfully.",
    });
    setHasUnsavedChanges(false);
  };

  const resetSettings = () => {
    const performReset = () => {
      // Reset to default values
      setBusinessSettings({
        companyName: COMPANY_INFO.NAME,
        tagline: COMPANY_INFO.TAGLINE,
        description: COMPANY_INFO.DESCRIPTION,
        phone: CONTACT_INFO.PHONE,
        email: CONTACT_INFO.EMAIL,
        location: CONTACT_INFO.LOCATION,
        locationDetail: CONTACT_INFO.LOCATION_DETAIL,
        foundedYear: COMPANY_INFO.FOUNDED_YEAR,
        businessHours: BUSINESS_HOURS.map(hour => ({ ...hour, enabled: true }))
      });

      setNotificationSettings({
        emailNotifications: true,
        smsNotifications: false,
        newInquiries: true,
        eventReminders: true,
        clientUpdates: true,
        systemAlerts: true,
        marketingEmails: false
      });

      setSystemSettings({
        maintenanceMode: false,
        autoBackup: true,
        dataRetention: 365,
        sessionTimeout: 24,
        maxFileSize: 10,
        allowRegistration: true,
        requireApproval: false
      });

      setSecuritySettings({
        twoFactorAuth: false,
        passwordExpiry: 90,
        loginAttempts: 5,
        sessionSecurity: true,
        auditLogging: true,
        ipWhitelist: []
      });

      setHasUnsavedChanges(false);
    };

    adminActions.handleReset(performReset);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure application settings</p>
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
                <Button size="sm" variant="outline" onClick={resetSettings}>
                  <X className="h-4 w-4 mr-2" />
                  Discard
                </Button>
                <Button size="sm" onClick={saveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>
            Configure your business settings, notifications, security, and system preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="business">
                <Building2 className="h-4 w-4 mr-2" />
                Business
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="system">
                <Settings className="h-4 w-4 mr-2" />
                System
              </TabsTrigger>
            </TabsList>

            {/* Business Settings Tab */}
            <TabsContent value="business" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Company Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={businessSettings.companyName}
                        onChange={(e) => handleBusinessSettingChange('companyName', e.target.value)}
                        placeholder="Enter company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="foundedYear">Founded Year</Label>
                      <Input
                        id="foundedYear"
                        type="number"
                        value={businessSettings.foundedYear}
                        onChange={(e) => handleBusinessSettingChange('foundedYear', parseInt(e.target.value))}
                        placeholder="Enter founded year"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={businessSettings.tagline}
                      onChange={(e) => handleBusinessSettingChange('tagline', e.target.value)}
                      placeholder="Enter company tagline"
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={businessSettings.description}
                      onChange={(e) => handleBusinessSettingChange('description', e.target.value)}
                      placeholder="Enter company description"
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={businessSettings.phone}
                          onChange={(e) => handleBusinessSettingChange('phone', e.target.value)}
                          placeholder="Enter phone number"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={businessSettings.email}
                          onChange={(e) => handleBusinessSettingChange('email', e.target.value)}
                          placeholder="Enter email address"
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
                        value={businessSettings.location}
                        onChange={(e) => handleBusinessSettingChange('location', e.target.value)}
                        placeholder="Enter business location"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="locationDetail">Location Details</Label>
                    <Input
                      id="locationDetail"
                      value={businessSettings.locationDetail}
                      onChange={(e) => handleBusinessSettingChange('locationDetail', e.target.value)}
                      placeholder="Enter location details"
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Business Hours</h3>
                  <div className="space-y-3">
                    {businessSettings.businessHours.map((hour, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={hour.enabled}
                            onCheckedChange={(checked) => handleBusinessHourChange(index, 'enabled', checked)}
                          />
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            value={hour.day}
                            onChange={(e) => handleBusinessHourChange(index, 'day', e.target.value)}
                            placeholder="Day(s)"
                            disabled={!hour.enabled}
                          />
                          <Input
                            value={hour.hours}
                            onChange={(e) => handleBusinessHourChange(index, 'hours', e.target.value)}
                            placeholder="Hours"
                            disabled={!hour.enabled}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Settings Tab */}
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
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationSettingChange('emailNotifications', checked)}
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
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) => handleNotificationSettingChange('smsNotifications', checked)}
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
                        checked={notificationSettings.newInquiries}
                        onCheckedChange={(checked) => handleNotificationSettingChange('newInquiries', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="font-medium text-foreground">Event Reminders</p>
                          <p className="text-sm text-muted-foreground">Receive reminders for upcoming events</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.eventReminders}
                        onCheckedChange={(checked) => handleNotificationSettingChange('eventReminders', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-foreground">Client Updates</p>
                          <p className="text-sm text-muted-foreground">Get notified about client activity and updates</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.clientUpdates}
                        onCheckedChange={(checked) => handleNotificationSettingChange('clientUpdates', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">System Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium text-foreground">System Alerts</p>
                          <p className="text-sm text-muted-foreground">Important system notifications and alerts</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.systemAlerts}
                        onCheckedChange={(checked) => handleNotificationSettingChange('systemAlerts', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Star className="h-5 w-5 text-orange-500" />
                        <div>
                          <p className="font-medium text-foreground">Marketing Emails</p>
                          <p className="text-sm text-muted-foreground">Promotional and marketing communications</p>
                        </div>
                      </div>
                      <Switch
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={(checked) => handleNotificationSettingChange('marketingEmails', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Security Settings Tab */}
            <TabsContent value="security" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Authentication & Access</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium text-foreground">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                        </div>
                      </div>
                      <Switch
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={(checked) => handleSecuritySettingChange('twoFactorAuth', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Lock className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-foreground">Session Security</p>
                          <p className="text-sm text-muted-foreground">Enhanced session security and monitoring</p>
                        </div>
                      </div>
                      <Switch
                        checked={securitySettings.sessionSecurity}
                        onCheckedChange={(checked) => handleSecuritySettingChange('sessionSecurity', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="font-medium text-foreground">Audit Logging</p>
                          <p className="text-sm text-muted-foreground">Log all administrative actions and changes</p>
                        </div>
                      </div>
                      <Switch
                        checked={securitySettings.auditLogging}
                        onCheckedChange={(checked) => handleSecuritySettingChange('auditLogging', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Password & Login Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                      <Select
                        value={securitySettings.passwordExpiry.toString()}
                        onValueChange={(value) => handleSecuritySettingChange('passwordExpiry', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select expiry period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="180">180 days</SelectItem>
                          <SelectItem value="365">1 year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                      <Select
                        value={securitySettings.loginAttempts.toString()}
                        onValueChange={(value) => handleSecuritySettingChange('loginAttempts', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select max attempts" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 attempts</SelectItem>
                          <SelectItem value="5">5 attempts</SelectItem>
                          <SelectItem value="10">10 attempts</SelectItem>
                          <SelectItem value="15">15 attempts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">IP Whitelist</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Info className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-foreground">IP Whitelist Configuration</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Add IP addresses that are allowed to access the admin panel. Leave empty to allow all IPs.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ipWhitelist">Allowed IP Addresses (one per line)</Label>
                      <Textarea
                        id="ipWhitelist"
                        value={securitySettings.ipWhitelist.join('\n')}
                        onChange={(e) => handleSecuritySettingChange('ipWhitelist', e.target.value.split('\n').filter(ip => ip.trim()))}
                        placeholder="192.168.1.1&#10;10.0.0.1&#10;203.0.113.1"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* System Settings Tab */}
            <TabsContent value="system" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">System Operations</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <div>
                          <p className="font-medium text-foreground">Maintenance Mode</p>
                          <p className="text-sm text-muted-foreground">Put the system in maintenance mode</p>
                        </div>
                      </div>
                      <Switch
                        checked={systemSettings.maintenanceMode}
                        onCheckedChange={(checked) => handleSystemSettingChange('maintenanceMode', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Database className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-foreground">Auto Backup</p>
                          <p className="text-sm text-muted-foreground">Automatically backup system data</p>
                        </div>
                      </div>
                      <Switch
                        checked={systemSettings.autoBackup}
                        onCheckedChange={(checked) => handleSystemSettingChange('autoBackup', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Data Management</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dataRetention">Data Retention (days)</Label>
                      <Select
                        value={systemSettings.dataRetention.toString()}
                        onValueChange={(value) => handleSystemSettingChange('dataRetention', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select retention period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="180">180 days</SelectItem>
                          <SelectItem value="365">1 year</SelectItem>
                          <SelectItem value="1095">3 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                      <Select
                        value={systemSettings.maxFileSize.toString()}
                        onValueChange={(value) => handleSystemSettingChange('maxFileSize', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select file size limit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 MB</SelectItem>
                          <SelectItem value="10">10 MB</SelectItem>
                          <SelectItem value="25">25 MB</SelectItem>
                          <SelectItem value="50">50 MB</SelectItem>
                          <SelectItem value="100">100 MB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">User Management</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium text-foreground">Allow Registration</p>
                          <p className="text-sm text-muted-foreground">Allow new users to register accounts</p>
                        </div>
                      </div>
                      <Switch
                        checked={systemSettings.allowRegistration}
                        onCheckedChange={(checked) => handleSystemSettingChange('allowRegistration', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium text-foreground">Require Approval</p>
                          <p className="text-sm text-muted-foreground">New registrations require admin approval</p>
                        </div>
                      </div>
                      <Switch
                        checked={systemSettings.requireApproval}
                        onCheckedChange={(checked) => handleSystemSettingChange('requireApproval', checked)}
                        disabled={!systemSettings.allowRegistration}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Session Management</h3>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                    <Select
                      value={systemSettings.sessionTimeout.toString()}
                      onValueChange={(value) => handleSystemSettingChange('sessionTimeout', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select session timeout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="8">8 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                        <SelectItem value="168">1 week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">Save Settings</h3>
              <p className="text-sm text-muted-foreground">
                {hasUnsavedChanges ? 'You have unsaved changes' : 'All settings are saved'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={resetSettings}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button onClick={saveSettings} disabled={!hasUnsavedChanges}>
                <Save className="h-4 w-4 mr-2" />
                Save All Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
