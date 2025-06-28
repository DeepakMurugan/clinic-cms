
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Activity, LogIn, User, Lock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginDashboardProps {
  onLogin: (role: 'admin' | 'doctor' | 'receptionist' | 'superadmin', userData: any) => void;
}

const LoginDashboard = ({ onLogin }: LoginDashboardProps) => {
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: ""
  });

  // Mock user database
  const users = {
    superadmin: {
      username: "superadmin",
      password: "super123",
      name: "Super Administrator",
      permissions: "all"
    },
    admin: {
      username: "admin",
      password: "admin123",
      name: "Clinic Administrator",
      permissions: "branch_management"
    },
    doctor: {
      username: "doctor",
      password: "doc123",
      name: "Dr. Rajesh Sharma",
      speciality: "General Medicine"
    },
    receptionist: {
      username: "receptionist",
      password: "rec123",
      name: "Priya Receptionist",
      department: "Front Desk"
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password || !credentials.role) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields.",
        variant: "destructive",
      });
      return;
    }

    const user = users[credentials.role as keyof typeof users];
    
    if (user && user.username === credentials.username && user.password === credentials.password) {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
      onLogin(credentials.role as 'admin' | 'doctor' | 'receptionist' | 'superadmin', user);
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'superadmin': return <Shield className="h-5 w-5" />;
      case 'admin': return <User className="h-5 w-5" />;
      case 'doctor': return <Activity className="h-5 w-5" />;
      case 'receptionist': return <LogIn className="h-5 w-5" />;
      default: return <User className="h-5 w-5" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'superadmin': return 'bg-purple-500';
      case 'admin': return 'bg-blue-500';
      case 'doctor': return 'bg-green-500';
      case 'receptionist': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Activity className="h-10 w-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Clinic OS</h1>
          </div>
          <Badge variant="outline" className="text-xs">CMS v2.0</Badge>
          <p className="text-gray-600 mt-2">Clinic Management System</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5" />
              <span>Login to Dashboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="role">Select Role *</Label>
                <Select 
                  value={credentials.role} 
                  onValueChange={(value) => setCredentials({...credentials, role: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="superadmin">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <span>Super Administrator</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Administrator</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="doctor">
                      <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4" />
                        <span>Doctor</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="receptionist">
                      <div className="flex items-center space-x-2">
                        <LogIn className="h-4 w-4" />
                        <span>Receptionist</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  placeholder="Enter username"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  placeholder="Enter password"
                  className="mt-1"
                />
              </div>

              <Button 
                type="submit" 
                className={`w-full ${credentials.role ? getRoleColor(credentials.role) : 'bg-gray-500'}`}
              >
                <div className="flex items-center space-x-2">
                  {credentials.role && getRoleIcon(credentials.role)}
                  <span>Login as {credentials.role || 'User'}</span>
                </div>
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-sm text-blue-800">Demo Credentials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            <div><strong>Super Admin:</strong> superadmin / super123</div>
            <div><strong>Admin:</strong> admin / admin123</div>
            <div><strong>Doctor:</strong> doctor / doc123</div>
            <div><strong>Receptionist:</strong> receptionist / rec123</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginDashboard;
