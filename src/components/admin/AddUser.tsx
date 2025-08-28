import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, UserPlus, Calendar, Shield, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { addUser } from "@/data/mockData";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  role: z.enum(['employee', 'temporary', 'administrator'], {
    required_error: "Please select a role",
  }),
  accessDuration: z.string().optional(),
  notes: z.string().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

const AddUser = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = addUser({
        name: data.name,
        email: data.email,
        username: data.username,
        role: data.role,
        status: 'active',
        ...(data.role === 'temporary' && {
          expiresAt: new Date(Date.now() + parseInt(data.accessDuration || '7') * 24 * 60 * 60 * 1000)
            .toISOString().split('T')[0]
        })
      });

      toast({
        title: "User created successfully",
        description: `${newUser.name} has been added to the platform with ${data.role} access.`,
      });

      navigate('/admin/users');
    } catch (error) {
      toast({
        title: "Error creating user",
        description: "There was a problem creating the user account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const roleDescriptions = {
    employee: "Full access to all training materials and platform features",
    temporary: "Limited access to selected training videos for a specified duration",
    administrator: "Complete platform management access including user and content management"
  };

  const roleIcons = {
    employee: Users,
    temporary: Calendar,
    administrator: Shield
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/admin/users')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Users
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-primary">Add New User</h1>
          <p className="text-muted-foreground">Create a new user account with role-based access</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="w-5 h-5 mr-2" />
                User Information
              </CardTitle>
              <CardDescription>
                Enter the new user's details and select their access level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. John Smith"
                      {...register('name')}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e.g. john.smith@company.com"
                      {...register('email')}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="e.g. john_coach"
                    {...register('username')}
                    className={errors.username ? "border-destructive" : ""}
                  />
                  {errors.username && (
                    <p className="text-sm text-destructive">{errors.username.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Username will be used for login. Only letters, numbers, and underscores allowed.
                  </p>
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <Label>User Role</Label>
                  <Select onValueChange={(value) => setValue('role', value as any)}>
                    <SelectTrigger className={errors.role ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select a role for this user" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          Coach
                        </div>
                      </SelectItem>
                      <SelectItem value="temporary">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Temporary Access
                        </div>
                      </SelectItem>
                      <SelectItem value="administrator">
                        <div className="flex items-center">
                          <Shield className="w-4 h-4 mr-2" />
                          Administrator
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-sm text-destructive">{errors.role.message}</p>
                  )}
                </div>

                {/* Temporary Access Duration */}
                {selectedRole === 'temporary' && (
                  <div className="space-y-2">
                    <Label htmlFor="accessDuration">Access Duration (Days)</Label>
                    <Select onValueChange={(value) => setValue('accessDuration', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select access duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Day</SelectItem>
                        <SelectItem value="3">3 Days</SelectItem>
                        <SelectItem value="7">1 Week</SelectItem>
                        <SelectItem value="14">2 Weeks</SelectItem>
                        <SelectItem value="30">1 Month</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Temporary users will have access to 5 selected training videos for the specified duration.
                    </p>
                  </div>
                )}

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional information about this user..."
                    {...register('notes')}
                    rows={3}
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex space-x-4 pt-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? "Creating User..." : "Create User"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/admin/users')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Role Information Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Understand what each role can access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(roleDescriptions).map(([role, description]) => {
                const Icon = roleIcons[role as keyof typeof roleIcons];
                const isSelected = selectedRole === role;
                
                return (
                  <div 
                    key={role}
                    className={`p-4 rounded-lg border transition-all ${
                      isSelected ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                      <Badge 
                        variant={
                          role === 'administrator' ? 'default' : 
                          role === 'temporary' ? 'destructive' : 'secondary'
                        }
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Current User Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Coaches</span>
                <Badge variant="secondary">3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Temporary Access</span>
                <Badge variant="destructive">2</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Administrators</span>
                <Badge>1</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddUser;