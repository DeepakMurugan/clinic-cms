
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, FileText, IndianRupee, UserPlus, Clock, Activity, TrendingUp, LogOut, Settings, Building } from "lucide-react";
import PatientRegistration from "@/components/PatientRegistration";
import AppointmentScheduler from "@/components/AppointmentScheduler";
import DoctorDashboard from "@/components/DoctorDashboard";
import BillingModule from "@/components/BillingModule";
import AdminReports from "@/components/AdminReports";
import AdminManagement from "@/components/AdminManagement";
import LoginDashboard from "@/components/LoginDashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeRole, setActiveRole] = useState<'admin' | 'doctor' | 'receptionist' | 'superadmin'>('receptionist');
  const [activeModule, setActiveModule] = useState('dashboard');

  const handleLogin = (role: 'admin' | 'doctor' | 'receptionist' | 'superadmin', userData: any) => {
    setActiveRole(role);
    setCurrentUser(userData);
    setIsLoggedIn(true);
    setActiveModule('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveRole('receptionist');
    setActiveModule('dashboard');
  };

  if (!isLoggedIn) {
    return <LoginDashboard onLogin={handleLogin} />;
  }

  const roleColors = {
    superadmin: 'bg-purple-500',
    admin: 'bg-blue-500',
    doctor: 'bg-green-500',
    receptionist: 'bg-orange-500'
  };

  const todayStats = {
    patients: 24,
    appointments: 18,
    revenue: 12500,
    pending: 6
  };

  const getAvailableTabs = () => {
    // Super Admin only sees reports and management
    if (activeRole === 'superadmin') {
      return [
        { value: "dashboard", label: "Branch Overview", icon: Building },
        { value: "reports", label: "Reports", icon: TrendingUp },
        { value: "management", label: "Management", icon: Settings }
      ];
    }

    const baseTabs = [
      { value: "dashboard", label: "Dashboard", icon: Activity },
      { value: "patients", label: "Patients", icon: Users },
      { value: "appointments", label: "Appointments", icon: Calendar }
    ];

    if (activeRole === 'doctor') {
      baseTabs.push({ value: "consultation", label: "Consultation", icon: FileText });
    }

    if (activeRole !== 'doctor') {
      baseTabs.push({ value: "billing", label: "Billing", icon: IndianRupee });
    }

    if (activeRole === 'admin') {
      baseTabs.push(
        { value: "reports", label: "Reports", icon: TrendingUp },
        { value: "management", label: "Management", icon: Settings }
      );
    }

    return baseTabs;
  };

  // Super Admin branch overview data
  const branchOverview = [
    {
      name: "Main Clinic",
      location: "Mumbai",
      patients: 150,
      staff: 12,
      revenue: 45600,
      appointments: 24
    },
    {
      name: "North Branch",
      location: "Delhi", 
      patients: 95,
      staff: 8,
      revenue: 28400,
      appointments: 16
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">ClinicOS</h1>
              </div>
              <Badge variant="outline" className="text-xs">CMS v1.0</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Badge className={`${roleColors[activeRole]} text-white`}>
                  {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
                </Badge>
                <span className="text-sm font-medium">{currentUser?.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeModule} onValueChange={setActiveModule} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full lg:w-auto lg:inline-flex" style={{ gridTemplateColumns: `repeat(${getAvailableTabs().length}, 1fr)` }}>
            {getAvailableTabs().map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex items-center space-x-2">
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="space-y-6">
            {activeRole === 'superadmin' ? (
              // Super Admin Branch Overview
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-gray-900">Branch Overview</h2>
                  <Badge className="bg-purple-500 text-white">Super Admin View</Badge>
                </div>

                {/* Overall Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
                      <Building className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{branchOverview.length}</div>
                      <p className="text-xs text-muted-foreground">Active branches</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                      <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{branchOverview.reduce((acc, branch) => acc + branch.patients, 0)}</div>
                      <p className="text-xs text-muted-foreground">Across all branches</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <IndianRupee className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹{branchOverview.reduce((acc, branch) => acc + branch.revenue, 0).toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                      <Users className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{branchOverview.reduce((acc, branch) => acc + branch.staff, 0)}</div>
                      <p className="text-xs text-muted-foreground">Active staff members</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Branch Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Branch Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {branchOverview.map((branch, index) => (
                      <Card key={index} className="border-l-4 border-l-purple-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <h3 className="text-lg font-semibold">{branch.name}</h3>
                                <Badge variant="outline">{branch.location}</Badge>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-600">Patients:</span>
                                  <div className="font-semibold">{branch.patients}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Staff:</span>
                                  <div className="font-semibold">{branch.staff}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Revenue:</span>
                                  <div className="font-semibold">₹{branch.revenue.toLocaleString()}</div>
                                </div>
                                <div>
                                  <span className="text-gray-600">Today's Appointments:</span>
                                  <div className="font-semibold">{branch.appointments}</div>
                                </div>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : (
              // Regular dashboard for other roles
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
                  <Badge className={`${roleColors[activeRole]} text-white`}>
                    {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)} View
                  </Badge>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Today's Patients</CardTitle>
                      <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{todayStats.patients}</div>
                      <p className="text-xs text-muted-foreground">+3 from yesterday</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Appointments</CardTitle>
                      <Calendar className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{todayStats.appointments}</div>
                      <p className="text-xs text-muted-foreground">{todayStats.pending} pending</p>
                    </CardContent>
                  </Card>

                  {activeRole !== 'doctor' && (
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                        <IndianRupee className="h-4 w-4 text-purple-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">₹{todayStats.revenue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Today's collection</p>
                      </CardContent>
                    </Card>
                  )}

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Queue Status</CardTitle>
                      <Clock className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{todayStats.pending}</div>
                      <p className="text-xs text-muted-foreground">Patients waiting</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button 
                        className="h-20 flex flex-col space-y-2" 
                        variant="outline"
                        onClick={() => setActiveModule('patients')}
                      >
                        <UserPlus className="h-6 w-6" />
                        <span>New Patient</span>
                      </Button>
                      <Button 
                        className="h-20 flex flex-col space-y-2" 
                        variant="outline"
                        onClick={() => setActiveModule('appointments')}
                      >
                        <Calendar className="h-6 w-6" />
                        <span>Book Appointment</span>
                      </Button>
                      {activeRole === 'doctor' && (
                        <Button 
                          className="h-20 flex flex-col space-y-2" 
                          variant="outline"
                          onClick={() => setActiveModule('consultation')}
                        >
                          <FileText className="h-6 w-6" />
                          <span>Consultation</span>
                        </Button>
                      )}
                      {activeRole !== 'doctor' && (
                        <Button 
                          className="h-20 flex flex-col space-y-2" 
                          variant="outline"
                          onClick={() => setActiveModule('billing')}
                        >
                          <IndianRupee className="h-6 w-6" />
                          <span>Create Bill</span>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Patient Management - Only for non-superadmin */}
          {activeRole !== 'superadmin' && (
            <TabsContent value="patients">
              <PatientRegistration />
            </TabsContent>
          )}

          {/* Appointment Scheduler - Only for non-superadmin */}
          {activeRole !== 'superadmin' && (
            <TabsContent value="appointments">
              <AppointmentScheduler />
            </TabsContent>
          )}

          {/* Doctor Consultation Dashboard */}
          {activeRole === 'doctor' && (
            <TabsContent value="consultation">
              <DoctorDashboard />
            </TabsContent>
          )}

          {/* Billing Module - Only for non-superadmin and non-doctor */}
          {activeRole !== 'doctor' && activeRole !== 'superadmin' && (
            <TabsContent value="billing">
              <BillingModule userRole={activeRole} />
            </TabsContent>
          )}

          {/* Admin Reports */}
          {(activeRole === 'admin' || activeRole === 'superadmin') && (
            <TabsContent value="reports">
              <AdminReports />
            </TabsContent>
          )}

          {/* Admin Management */}
          {(activeRole === 'admin' || activeRole === 'superadmin') && (
            <TabsContent value="management">
              <AdminManagement userRole={activeRole} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
