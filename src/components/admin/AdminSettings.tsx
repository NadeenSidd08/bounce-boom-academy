import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Clock, 
  Shield, 
  Mail, 
  Globe,
  Save,
  RotateCcw,
  AlertTriangle,
  Users,
  PlayCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlatformSettings {
  platformName: string;
  adminEmail: string;
  supportEmail: string;
  tempAccessDuration: string;
  videoAccessLimit: string;
  autoExpireEnabled: boolean;
  emailNotificationsEnabled: boolean;
  maintenanceMode: boolean;
  allowSelfRegistration: boolean;
  defaultRole: 'employee' | 'temporary';
}

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<PlatformSettings>({
    platformName: "Bounce Boom Training",
    adminEmail: "admin@bounceboom.com",
    supportEmail: "support@bounceboom.com",
    tempAccessDuration: "7",
    videoAccessLimit: "5",
    autoExpireEnabled: true,
    emailNotificationsEnabled: true,
    maintenanceMode: false,
    allowSelfRegistration: false,
    defaultRole: "employee"
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof PlatformSettings, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings saved",
        description: "Platform settings have been updated successfully.",
      });
      
      setHasChanges(false);
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSettings({
      platformName: "Bounce Boom Training",
      adminEmail: "admin@bounceboom.com",
      supportEmail: "support@bounceboom.com",
      tempAccessDuration: "7",
      videoAccessLimit: "5",
      autoExpireEnabled: true,
      emailNotificationsEnabled: true,
      maintenanceMode: false,
      allowSelfRegistration: false,
      defaultRole: "employee"
    });
    setHasChanges(false);
    toast({
      title: "Settings reset",
      description: "All settings have been reset to default values.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Platform Settings</h1>
          <p className="text-muted-foreground">Configure platform behavior and policies</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleReset}
            disabled={isLoading}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!hasChanges || isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Unsaved Changes Alert */}
      {hasChanges && (
        <Card className="border-warning bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <p className="text-warning-foreground">
                You have unsaved changes. Don't forget to save your settings.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              General Settings
            </CardTitle>
            <CardDescription>
              Basic platform configuration and branding
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                value={settings.platformName}
                onChange={(e) => handleInputChange('platformName', e.target.value)}
                placeholder="e.g. Bounce Boom Training"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminEmail">Administrator Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                placeholder="admin@company.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Contact Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                placeholder="support@company.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Access Control Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Access Control
            </CardTitle>
            <CardDescription>
              User access and permission settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default User Role</Label>
              <Select 
                value={settings.defaultRole} 
                onValueChange={(value) => handleInputChange('defaultRole', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Default role assigned to new users
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Self Registration</Label>
                <p className="text-sm text-muted-foreground">
                  Let users create their own accounts
                </p>
              </div>
              <Switch
                checked={settings.allowSelfRegistration}
                onCheckedChange={(checked) => handleInputChange('allowSelfRegistration', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable platform access
                </p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Temporary Access Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Temporary Access Settings
            </CardTitle>
            <CardDescription>
              Configure policies for temporary user accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tempAccessDuration">Default Access Duration (Days)</Label>
              <Select 
                value={settings.tempAccessDuration} 
                onValueChange={(value) => handleInputChange('tempAccessDuration', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Day</SelectItem>
                  <SelectItem value="3">3 Days</SelectItem>
                  <SelectItem value="7">1 Week</SelectItem>
                  <SelectItem value="14">2 Weeks</SelectItem>
                  <SelectItem value="30">1 Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoAccessLimit">Video Access Limit</Label>
              <Select 
                value={settings.videoAccessLimit} 
                onValueChange={(value) => handleInputChange('videoAccessLimit', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Videos</SelectItem>
                  <SelectItem value="5">5 Videos</SelectItem>
                  <SelectItem value="10">10 Videos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-Expire Accounts</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically deactivate expired temporary accounts
                </p>
              </div>
              <Switch
                checked={settings.autoExpireEnabled}
                onCheckedChange={(checked) => handleInputChange('autoExpireEnabled', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure email notifications and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send email notifications for important events
                </p>
              </div>
              <Switch
                checked={settings.emailNotificationsEnabled}
                onCheckedChange={(checked) => handleInputChange('emailNotificationsEnabled', checked)}
              />
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Notification Types</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">✓</Badge>
                  <span>User account creation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">✓</Badge>
                  <span>Temporary account expiration warnings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">✓</Badge>
                  <span>Password reset requests</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">✓</Badge>
                  <span>System maintenance alerts</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Platform Status */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Status</CardTitle>
          <CardDescription>
            Current platform statistics and health
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">6</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg">
              <PlayCircle className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-2xl font-bold text-secondary">8</p>
              <p className="text-sm text-muted-foreground">Training Videos</p>
            </div>
            <div className="text-center p-4 bg-success/5 rounded-lg">
              <Clock className="w-8 h-8 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-success">99.9%</p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div className="text-center p-4 bg-warning/5 rounded-lg">
              <Shield className="w-8 h-8 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold text-warning">
                {settings.maintenanceMode ? "Maintenance" : "Operational"}
              </p>
              <p className="text-sm text-muted-foreground">System Status</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;