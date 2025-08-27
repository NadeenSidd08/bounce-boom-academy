import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Dashboard from "./Dashboard";
import AdminPanel from "./AdminPanel";
import Index from "@/pages/Index";

type ViewState = 'login' | 'employee-dashboard' | 'temp-dashboard' | 'admin-dashboard' | 'admin-panel';

const PlatformDemo = () => {
  const [currentView, setCurrentView] = useState<ViewState>('login');
  const [currentUser, setCurrentUser] = useState({ name: '', type: 'employee' as 'employee' | 'temporary' | 'admin' });

  const handleLogin = (userType: 'employee' | 'temporary' | 'admin', name: string) => {
    setCurrentUser({ name, type: userType });
    if (userType === 'admin') {
      // Navigate to admin layout instead of dashboard
      window.location.href = '/admin';
    } else if (userType === 'employee') {
      setCurrentView('employee-dashboard');
    } else {
      setCurrentView('temp-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentView('login');
    setCurrentUser({ name: '', type: 'employee' });
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return <Index />;
      case 'employee-dashboard':
        return (
          <Dashboard 
            userType="employee" 
            userName={currentUser.name} 
            onLogout={handleLogout}
          />
        );
      case 'temp-dashboard':
        return (
          <Dashboard 
            userType="temporary" 
            userName={currentUser.name} 
            onLogout={handleLogout}
          />
        );
      case 'admin-dashboard':
        return (
          <Dashboard 
            userType="admin" 
            userName={currentUser.name} 
            onLogout={handleLogout}
          />
        );
      case 'admin-panel':
        return <AdminPanel />;
      default:
        return <Index />;
    }
  };

  const demoUsers = [
    { type: 'employee' as const, name: 'John Smith', label: 'Full Access Employee' },
    { type: 'temporary' as const, name: 'Sarah Johnson', label: 'Temporary Employee (5 videos)' },
    { type: 'admin' as const, name: 'Mike Wilson', label: 'Administrator' }
  ];

  return (
    <div className="min-h-screen">
      {currentView === 'login' && (
        <div className="fixed top-4 right-4 z-50">
          <Card className="w-80 shadow-lg border-2 border-secondary bg-card/95 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-primary">Demo Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">
                Try different user types to see role-based access:
              </p>
              {demoUsers.map((user) => (
                <Button
                  key={user.type}
                  onClick={() => handleLogin(user.type, user.name)}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <div className="text-left">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.label}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {(currentView === 'admin-dashboard' || currentView === 'admin-panel') && (
        <div className="fixed top-4 right-4 z-50">
          <div className="flex space-x-2">
            <Button
              onClick={() => setCurrentView('admin-dashboard')}
              variant={currentView === 'admin-dashboard' ? 'default' : 'outline'}
              size="sm"
            >
              Dashboard
            </Button>
            <Button
              onClick={() => setCurrentView('admin-panel')}
              variant={currentView === 'admin-panel' ? 'default' : 'outline'}
              size="sm"
            >
              Admin Panel
            </Button>
          </div>
        </div>
      )}

      {renderCurrentView()}
    </div>
  );
};

export default PlatformDemo;