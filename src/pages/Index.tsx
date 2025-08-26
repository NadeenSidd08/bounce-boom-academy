import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PlayCircle } from "lucide-react";

const Index = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be implemented with Supabase authentication
    console.log("Login attempted:", loginForm);
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Bounce Boom</h1>
                <p className="text-sm text-muted-foreground">Racquet Sports Training</p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Employee Training Platform
            </Badge>
          </div>
        </div>
      </header>

      {/* Login Section */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto px-4">
            <Card className="shadow-lg border-0 bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-center text-primary">Login</CardTitle>
                <CardDescription className="text-center">
                  Access your training materials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm(prev => ({...prev, username: e.target.value}))}
                      className="border-input focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({...prev, password: e.target.value}))}
                      className="border-input focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="default"
                    className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </form>
                
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    Need access? Contact your administrator to create an account.
                  </p>
                </div>
              </CardContent>
            </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <PlayCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-primary">Bounce Boom Racquet Sports</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Bounce Boom Racquet Sports. Professional training platform for tennis and pickleball coaching.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;