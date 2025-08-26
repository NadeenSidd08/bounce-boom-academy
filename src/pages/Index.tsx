import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Users, Shield, Clock } from "lucide-react";
import heroImage from "@/assets/hero-tennis.jpg";

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

  const features = [
    {
      icon: PlayCircle,
      title: "Professional Video Library",
      description: "Comprehensive training videos covering technique, rules, and safety protocols"
    },
    {
      icon: Users,
      title: "Role-Based Access",
      description: "Different access levels for employees, temporary staff, and administrators"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Admin-controlled user management with automatic access expiration"
    }
  ];

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

      {/* Hero Section */}
      <section className="relative">
        <div 
          className="h-96 bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-xl text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Professional Training
                <span className="block text-secondary-light">Made Simple</span>
              </h2>
              <p className="text-lg mb-6 text-white/90">
                Access our comprehensive video library of tennis and pickleball training materials, 
                designed for coaching professionals at every level.
              </p>
              <div className="flex items-center space-x-2 text-secondary-light">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Available 24/7 • Mobile Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Login Form */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-center text-primary">Employee Login</CardTitle>
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

          {/* Features */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-primary mb-4">Training Platform Features</h3>
              <p className="text-muted-foreground text-lg">
                Everything you need for comprehensive racquet sports training and development.
              </p>
            </div>
            
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-secondary">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary-muted flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-secondary-foreground" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-primary mb-2">{feature.title}</h4>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

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