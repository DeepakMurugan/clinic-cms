
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, FileText, IndianRupee, UserPlus, Clock, Activity, TrendingUp, LogOut, Settings, Building, Sparkles } from "lucide-react";
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
    superadmin: 'bg-gradient-to-r from-violet-500 to-purple-600',
    admin: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    doctor: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    receptionist: 'bg-gradient-to-r from-rose-500 to-pink-600'
  };

  const todayStats = {
    patients: 24,
    appointments: 18,
    revenue: 12500,
    pending: 6
  };

  const getAvailableTabs = () => {
    // Super Admin gets overview and management
    if (activeRole === 'superadmin') {
      return [
        { value: "dashboard", label: "Network Overview", icon: Building },
        { value: "reports", label: "Analytics", icon: TrendingUp },
        { value: "management", label: "Branch Management", icon: Settings }
      ];
    }

    // All other roles get full functionality
    const baseTabs = [
      { value: "dashboard", label: "Dashboard", icon: Activity },
      { value: "patients", label: "Patients", icon: Users },
      { value: "appointments", label: "Appointments", icon: Calendar }
    ];

    // Doctor-specific tabs
    if (activeRole === 'doctor') {
      baseTabs.push({ value: "consultation", label: "Consultation", icon: FileText });
    }

    // Non-doctor roles get billing
    if (activeRole !== 'doctor') {
      baseTabs.push({ value: "billing", label: "Billing", icon: IndianRupee });
    }

    // Admin gets additional management features
    if (activeRole === 'admin') {
      baseTabs.push(
        { value: "reports", label: "Reports", icon: TrendingUp },
        { value: "management", label: "Staff Management", icon: Settings }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Activity className="h-8 w-8 text-indigo-600" />
                  <Sparkles className="h-4 w-4 text-emerald-500 absolute -top-1 -right-1" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                    ClinicOS
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">Healthcare Management Platform</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 border-indigo-200 text-indigo-700">
                v2.0 Professional
              </Badge>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <Badge className={`${roleColors[activeRole]} text-white px-4 py-2 font-medium shadow-lg`}>
                  {activeRole === 'superadmin' ? 'Super Admin' : activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
                </Badge>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-700">{currentUser?.name}</p>
                  <p className="text-xs text-slate-500">Welcome back!</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 transition-all">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeModule} onValueChange={setActiveModule} className="space-y-6">
          {/* Premium Navigation */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-1.5 shadow-lg border border-white/60">
            <TabsList className="grid w-full bg-transparent p-0 h-auto" style={{ gridTemplateColumns: `repeat(${getAvailableTabs().length}, 1fr)` }}>
              {getAvailableTabs().map((tab) => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value} 
                  className="flex items-center space-x-2 px-4 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-slate-50/80"
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="font-medium text-sm">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="space-y-6">
            {activeRole === 'superadmin' ? (
              // Super Admin Dashboard
              <>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                      Network Overview
                    </h2>
                    <p className="text-slate-600">Monitor your healthcare network performance</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-2 shadow-lg">
                    Super Administrator
                  </Badge>
                </div>

                {/* Network Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-violet-50 to-purple-100 hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-700">Total Branches</CardTitle>
                      <Building className="h-5 w-5 text-violet-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-violet-700">{branchOverview.length}</div>
                      <p className="text-xs text-violet-600 mt-1">Active locations</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-indigo-100 hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-700">Total Patients</CardTitle>
                      <Users className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-700">{branchOverview.reduce((acc, branch) => acc + branch.patients, 0)}</div>
                      <p className="text-xs text-blue-600 mt-1">Network-wide</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-emerald-50 to-teal-100 hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-700">Total Revenue</CardTitle>
                      <IndianRupee className="h-5 w-5 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-emerald-700">₹{branchOverview.reduce((acc, branch) => acc + branch.revenue, 0).toLocaleString()}</div>
                      <p className="text-xs text-emerald-600 mt-1">This month</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-rose-50 to-pink-100 hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-700">Total Staff</CardTitle>
                      <Users className="h-5 w-5 text-rose-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-rose-700">{branchOverview.reduce((acc, branch) => acc + branch.staff, 0)}</div>
                      <p className="text-xs text-rose-600 mt-1">Active members</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Branch Performance */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-t-xl">
                    <CardTitle className="text-lg">Branch Performance Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {branchOverview.map((branch, index) => (
                      <Card key={index} className="border-l-4 border-l-indigo-400 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-indigo-50/30">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <h3 className="text-lg font-bold text-slate-800">{branch.name}</h3>
                                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                                  {branch.location}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                <div className="bg-blue-50/80 p-3 rounded-lg">
                                  <span className="text-blue-600 font-medium">Patients</span>
                                  <div className="text-xl font-bold text-blue-700">{branch.patients}</div>
                                </div>
                                <div className="bg-emerald-50/80 p-3 rounded-lg">
                                  <span className="text-emerald-600 font-medium">Staff</span>
                                  <div className="text-xl font-bold text-emerald-700">{branch.staff}</div>
                                </div>
                                <div className="bg-purple-50/80 p-3 rounded-lg">
                                  <span className="text-purple-600 font-medium">Revenue</span>
                                  <div className="text-xl font-bold text-purple-700">₹{branch.revenue.toLocaleString()}</div>
                                </div>
                                <div className="bg-rose-50/80 p-3 rounded-lg">
                                  <span className="text-rose-600 font-medium">Today</span>
                                  <div className="text-xl font-bold text-rose-700">{branch.appointments}</div>
                                </div>
                              </div>
                            </div>
                            <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-lg">
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
              // Regular User Dashboard
              <>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                      {activeRole === 'admin' ? 'Administrative Dashboard' : 
                       activeRole === 'doctor' ? 'Clinical Dashboard' : 
                       'Reception Dashboard'}
                    </h2>
                    <p className="text-slate-600">
                      {activeRole === 'admin' ? 'Manage your clinic operations' : 
                       activeRole === 'doctor' ? 'Patient care and consultations' : 
                       'Patient registration and appointments'}
                    </p>
                  </div>
                  <Badge className={`${roleColors[activeRole]} text-white px-4 py-2 shadow-lg`}>
                    {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)} Portal
                  </Badge>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-indigo-100 hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-700">Today's Patients</CardTitle>
                      <Users className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-700">{todayStats.patients}</div>
                      <p className="text-xs text-blue-600 mt-1">+3 from yesterday</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-emerald-50 to-teal-100 hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-700">Appointments</CardTitle>
                      <Calendar className="h-5 w-5 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-emerald-700">{todayStats.appointments}</div>
                      <p className="text-xs text-emerald-600 mt-1">{todayStats.pending} pending</p>
                    </CardContent>
                  </Card>

                  {activeRole !== 'doctor' && (
                    <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-violet-100 hover:scale-105">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-700">Revenue</CardTitle>
                        <IndianRupee className="h-5 w-5 text-purple-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-purple-700">₹{todayStats.revenue.toLocaleString()}</div>
                        <p className="text-xs text-purple-600 mt-1">Today's collection</p>
                      </CardContent>
                    </Card>
                  )}

                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-rose-50 to-pink-100 hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-700">Queue Status</CardTitle>
                      <Clock className="h-5 w-5 text-rose-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-rose-700">{todayStats.pending}</div>
                      <p className="text-xs text-rose-600 mt-1">Patients waiting</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-t-xl">
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <Button 
                        className="h-20 flex flex-col space-y-2 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl" 
                        onClick={() => setActiveModule('patients')}
                      >
                        <UserPlus className="h-6 w-6" />
                        <span className="font-medium text-sm">New Patient</span>
                      </Button>
                      <Button 
                        className="h-20 flex flex-col space-y-2 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl" 
                        onClick={() => setActiveModule('appointments')}
                      >
                        <Calendar className="h-6 w-6" />
                        <span className="font-medium text-sm">Book Appointment</span>
                      </Button>
                      {activeRole === 'doctor' && (
                        <Button 
                          className="h-20 flex flex-col space-y-2 bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white shadow-lg hover:shadow-xl" 
                          onClick={() => setActiveModule('consultation')}
                        >
                          <FileText className="h-6 w-6" />
                          <span className="font-medium text-sm">Consultation</span>
                        </Button>
                      )}
                      {activeRole !== 'doctor' && (
                        <Button 
                          className="h-20 flex flex-col space-y-2 bg-gradient-to-br from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl" 
                          onClick={() => setActiveModule('billing')}
                        >
                          <IndianRupee className="h-6 w-6" />
                          <span className="font-medium text-sm">Create Bill</span>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Patient Management */}
          {activeRole !== 'superadmin' && (
            <TabsContent value="patients">
              <PatientRegistration />
            </TabsContent>
          )}

          {/* Appointment Scheduler */}
          {activeRole !== 'superadmin' && (
            <TabsContent value="appointments">
              <AppointmentScheduler />
            </TabsContent>
          )}

          {/* Doctor Consultation */}
          {activeRole === 'doctor' && (
            <TabsContent value="consultation">
              <DoctorDashboard />
            </TabsContent>
          )}

          {/* Billing Module */}
          {activeRole !== 'doctor' && activeRole !== 'superadmin' && (
            <TabsContent value="billing">
              <BillingModule userRole={activeRole} />
            </TabsContent>
          )}

          {/* Reports */}
          {(activeRole === 'admin' || activeRole === 'superadmin') && (
            <TabsContent value="reports">
              <AdminReports />
            </TabsContent>
          )}

          {/* Management */}
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
