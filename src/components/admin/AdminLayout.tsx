import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  Plus, 
  PlayCircle, 
  Shield, 
  Settings, 
  ArrowLeft,
  Calendar
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/admin/users', label: 'User Management', icon: Users },
    { path: '/admin/add-user', label: 'Add User', icon: Plus },
    { path: '/admin/videos', label: 'Video Management', icon: PlayCircle },
    { path: '/admin/temp-access', label: 'Temp Access', icon: Calendar },
  ];

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { label: 'Home', path: '/' },
    ];

    if (pathSegments.length > 0) {
      breadcrumbs.push({ label: 'Admin', path: '/admin' });
      
      if (pathSegments.length > 1) {
        const currentItem = navigationItems.find(item => 
          item.path === location.pathname
        );
        if (currentItem) {
          breadcrumbs.push({ label: currentItem.label, path: location.pathname });
        }
      }
    }

    return breadcrumbs;
  };

  const isCurrentPath = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Platform
              </Button>
              
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              
              <div>
                <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
                <p className="text-sm text-muted-foreground">Platform Management</p>
              </div>
            </div>

            {/* Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                {getBreadcrumbs().map((breadcrumb, index) => (
                  <BreadcrumbItem key={breadcrumb.path}>
                    {index === getBreadcrumbs().length - 1 ? (
                      <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                    ) : (
                      <>
                        <BreadcrumbLink
                          onClick={() => navigate(breadcrumb.path)}
                          className="cursor-pointer"
                        >
                          {breadcrumb.label}
                        </BreadcrumbLink>
                        <BreadcrumbSeparator />
                      </>
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant={isCurrentPath(item.path) ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => navigate(item.path)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;