import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  PlayCircle, 
  LogOut, 
  Search, 
  Filter, 
  Users, 
  Settings, 
  Calendar,
  Clock,
  Star
} from "lucide-react";

interface DashboardProps {
  userType: 'employee' | 'temporary' | 'admin';
  userName: string;
  onLogout: () => void;
}

const Dashboard = ({ userType, userName, onLogout }: DashboardProps) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Videos', count: 30 },
    { id: 'technique', name: 'Fundamental Techniques', count: 6 },
    { id: 'rules', name: 'Drills & Games', count: 10 },
    { id: 'safety', name: 'Safety Protocols', count: 6 },
    { id: 'equipment', name: 'Equipment Care', count: 5 },
    { id: 'customer', name: 'Customer Service', count: 3 }
  ];

  const sampleVideos = [
    {
      id: 1,
      title: "Proper Tennis Serve Technique",
      duration: "1:45",
      category: "technique",
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Touch the Net - Tennis Game Kids & Teens", 
      duration: "2:05",
      category: "safety",
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Customer Interaction Best Practices",
      duration: "1:30",
      category: "customer", 
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: 4,
      title: "Equipment Maintenance Checklist",
      duration: "1:55",
      category: "equipment",
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: 5,
      title: "Surfer & Golfer - Tennis Strokes",
      duration: "2:00",
      category: "rules", 
      thumbnail: "/api/placeholder/300/200"
    }
  ];

  const getAccessBadge = () => {
    switch (userType) {
      case 'admin':
        return <Badge className="bg-primary text-primary-foreground">Administrator</Badge>;
      case 'employee':
        return <Badge variant="secondary">Full Access Employee</Badge>;
      case 'temporary':
        return <Badge variant="destructive">Temporary Access (5 days remaining)</Badge>;
      default:
        return null;
    }
  };

  const filteredVideos = selectedCategory === 'all' 
    ? sampleVideos 
    : sampleVideos.filter(video => video.category === selectedCategory);

  const accessibleVideos = userType === 'temporary' ? filteredVideos.slice(0, 5) : filteredVideos;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Bounce Boom Training</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {userName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {getAccessBadge()}
              {userType === 'admin' && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/admin/users')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Settings
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          {/* Sidebar - Only show for non-temporary users */}
          {userType !== 'temporary' && (
            <aside className="lg:col-span-1">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Filter className="w-5 h-5 mr-2" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </aside>
          )}

          {/* Main Content */}
          <main className={userType === 'temporary' ? 'lg:col-span-4' : 'lg:col-span-3'}>
            {/* Limited Access Warning for Temporary Users */}
            {userType === 'temporary' && (
              <Card className="border-warning bg-warning/5 mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-warning" />
                    <span className="font-semibold text-warning-foreground">Limited Access</span>
                  </div>
                  <p className="text-sm text-warning-foreground/80">
                    You have access to 5 selected videos. Access expires in 5 days.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search training videos..."
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
            </div>

            {/* Video Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary">
                  {selectedCategory === 'all' ? 'All Training Videos' : 
                   categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-muted-foreground">
                  {accessibleVideos.length} video{accessibleVideos.length !== 1 ? 's' : ''} available
                </p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {accessibleVideos.map((video) => (
                  <Card key={video.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <PlayCircle className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      
                      <div className="absolute bottom-2 right-2">
                        <Badge variant="secondary" className="bg-black/70 text-white">
                          {video.duration}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-primary mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="capitalize">{video.category}</span>
                        <span>{video.duration}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;