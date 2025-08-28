import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  Shield, 
  PlayCircle,
  Upload,
  Search,
  MoreHorizontal,
  AlertTriangle
} from "lucide-react";

const AdminPanel = () => {
  const [users] = useState([
    { 
      id: 1, 
      username: 'john_coach', 
      name: 'John Smith', 
      role: 'employee', 
      createdAt: '2024-01-15',
      lastLogin: '2024-01-20',
      status: 'active'
    },
    { 
      id: 2, 
      username: 'temp_sarah', 
      name: 'Sarah Johnson', 
      role: 'temporary', 
      createdAt: '2024-01-18',
      lastLogin: '2024-01-19',
      status: 'active',
      expiresAt: '2024-01-25'
    },
    { 
      id: 3, 
      username: 'admin_mike', 
      name: 'Gregg Deinhart', 
      role: 'admin', 
      createdAt: '2024-01-10',
      lastLogin: '2024-01-20',
      status: 'active'
    }
  ]);

  const [videos] = useState([
    {
      id: 1,
      title: 'Proper Tennis Serve Technique',
      category: 'technique',
      duration: '12:30',
      uploadDate: '2024-01-15',
      views: 145,
      featured: true,
      tempAccess: true
    },
    {
      id: 2,
      title: 'Pickleball Court Safety Guidelines',
      category: 'safety', 
      duration: '8:15',
      uploadDate: '2024-01-12',
      views: 89,
      featured: false,
      tempAccess: true
    },
    {
      id: 3,
      title: 'Customer Interaction Best Practices',
      category: 'customer',
      duration: '15:45',
      uploadDate: '2024-01-10',
      views: 203,
      featured: true,
      tempAccess: false
    }
  ]);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-primary text-primary-foreground">Administrator</Badge>;
      case 'employee':
        return <Badge variant="secondary">Coach</Badge>;
      case 'temporary':
        return <Badge variant="destructive">Temporary Access</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge className="bg-success text-success-foreground">Active</Badge>
    ) : (
      <Badge variant="destructive">Inactive</Badge>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Administrator Dashboard</h1>
        <p className="text-muted-foreground">Manage users, videos, and platform settings</p>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users" className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center">
            <PlayCircle className="w-4 h-4 mr-2" />
            Video Library
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* User Management Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-primary">User Management</h2>
              <p className="text-muted-foreground">Create and manage user accounts with role-based access</p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-primary-light">
              <Plus className="w-4 h-4 mr-2" />
              Add New User
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search users..."
              className="pl-10"
            />
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Users ({users.length})</CardTitle>
              <CardDescription>
                Manage employee access and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-primary-foreground font-semibold">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                        {user.role === 'temporary' && user.expiresAt && (
                          <div className="flex items-center mt-1">
                            <AlertTriangle className="w-3 h-3 text-warning mr-1" />
                            <span className="text-xs text-warning">Expires {user.expiresAt}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {getRoleBadge(user.role)}
                      {getStatusBadge(user.status)}
                      <div className="text-xs text-muted-foreground text-right">
                        <p>Created: {user.createdAt}</p>
                        <p>Last login: {user.lastLogin}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          {/* Video Management Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-primary">Video Library Management</h2>
              <p className="text-muted-foreground">Upload, organize, and control access to training videos</p>
            </div>
            <Button className="bg-gradient-to-r from-secondary to-secondary-light text-secondary-foreground">
              <Upload className="w-4 h-4 mr-2" />
              Upload Video
            </Button>
          </div>

          {/* Video Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Videos</p>
                    <p className="text-2xl font-bold text-primary">45</p>
                  </div>
                  <PlayCircle className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Temporary Access</p>
                    <p className="text-2xl font-bold text-secondary">5</p>
                  </div>
                  <Calendar className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold text-success">1,247</p>
                  </div>
                  <Users className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Videos Table */}
          <Card>
            <CardHeader>
              <CardTitle>Video Library</CardTitle>
              <CardDescription>
                Manage training videos and access permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {videos.map((video) => (
                  <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                        <PlayCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary">{video.title}</h3>
                        <p className="text-sm text-muted-foreground capitalize">
                          {video.category} • {video.duration} • {video.views} views
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Uploaded: {video.uploadDate}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {video.featured && (
                        <Badge className="bg-secondary text-secondary-foreground">Featured</Badge>
                      )}
                      {video.tempAccess ? (
                        <Badge className="bg-success text-success-foreground">Temp Access</Badge>
                      ) : (
                        <Badge variant="outline">Full Only</Badge>
                      )}
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-2">Platform Settings</h2>
            <p className="text-muted-foreground">Configure access policies and platform behavior</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Temporary Access Settings</CardTitle>
                <CardDescription>
                  Configure policies for temporary employee accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="access-duration">Access Duration (days)</Label>
                  <Input id="access-duration" type="number" defaultValue="7" />
                </div>
                <div>
                  <Label htmlFor="video-limit">Video Access Limit</Label>
                  <Input id="video-limit" type="number" defaultValue="5" />
                </div>
                <Button>Update Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Configuration</CardTitle>
                <CardDescription>
                  General platform settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="Bounce Boom Training" />
                </div>
                <div>
                  <Label htmlFor="contact-email">Admin Contact Email</Label>
                  <Input id="contact-email" type="email" defaultValue="admin@bounceboom.com" />
                </div>
                <Button>Save Configuration</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;