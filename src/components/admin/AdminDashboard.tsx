import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  PlayCircle, 
  TrendingUp, 
  Calendar, 
  Plus,
  AlertTriangle,
  Eye,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockAdminStats, mockUsers, mockVideos } from "@/data/mockData";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = mockAdminStats;
  const recentUsers = mockUsers.slice(-3).reverse();
  const popularVideos = mockVideos
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);
  
  const expiringUsers = mockUsers.filter(user => 
    user.role === 'temporary' && user.expiresAt
  );

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      description: `${stats.activeUsers} active`,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Total Videos",
      value: stats.totalVideos,
      description: `${stats.tempAccessVideos} for temp access`,
      icon: PlayCircle,
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      description: "Across all videos",
      icon: Eye,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Temp Users",
      value: stats.temporaryUsers,
      description: "Active temporary accounts",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard Overview</h1>
          <p className="text-muted-foreground">Platform analytics and quick actions</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => navigate('/admin/add-user')}>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
          <Button variant="outline" onClick={() => navigate('/admin/videos')}>
            <PlayCircle className="w-4 h-4 mr-2" />
            Manage Videos
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Expiring Users Alert */}
        {expiringUsers.length > 0 && (
          <Card className="border-warning bg-warning/5">
            <CardHeader>
              <CardTitle className="flex items-center text-warning-foreground">
                <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
                Expiring Temporary Access
              </CardTitle>
              <CardDescription>
                Users with expiring temporary accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expiringUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                    <div>
                      <p className="font-medium text-primary">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive">
                        Expires {user.expiresAt}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="ml-2"
                        onClick={() => navigate('/admin/users')}
                      >
                        <Calendar className="w-3 h-3 mr-1" />
                        Extend
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>
              Latest user registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground text-sm font-semibold">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-primary">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={user.role === 'administrator' ? 'default' : 
                              user.role === 'temporary' ? 'destructive' : 'secondary'}
                    >
                      {user.role}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {user.createdAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => navigate('/admin/users')}
            >
              View All Users
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Popular Videos */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Videos</CardTitle>
          <CardDescription>
            Most viewed training content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {popularVideos.map((video) => (
              <div key={video.id} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-16 h-12 bg-primary/10 rounded flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-primary line-clamp-1">{video.title}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-muted-foreground capitalize">
                      {video.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{video.views} views</Badge>
                      {video.tempAccess && (
                        <Badge className="bg-success text-success-foreground">
                          Temp Access
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => navigate('/admin/videos')}
          >
            Manage All Videos
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;