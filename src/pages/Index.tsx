
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
    superadmin: 'bg-gradient-to-r from-purple-600 to-violet-700',
    admin: 'bg-gradient-to-r from-blue-600 to-indigo-700',
    doctor: 'bg-gradient-to-r from-emerald-600 to-green-700',
    receptionist: 'bg-gradient-to-r from-orange-500 to-amber-600'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Premium Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Activity className="h-10 w-10 text-blue-600" />
                  <Sparkles className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    ClinicOS
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">Healthcare Management System</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700">
                CMS v2.0 Pro
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
              <Button variant="outline" size="sm" onClick={handleLogout} className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeModule} onValueChange={setActiveModule} className="space-y-8">
          {/* Premium Navigation Tabs */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/20">
            <TabsList className="grid w-full bg-transparent p-0 h-auto" style={{ gridTemplateColumns: `repeat(${getAvailableTabs().length}, 1fr)` }}>
              {getAvailableTabs().map((tab) => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value} 
                  className="flex items-center space-x-3 px-6 py-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-blue-700 transition-all duration-300 hover:bg-white/50"
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="space-y-8">
            {activeRole === 'superadmin' ? (
              // Super Admin Branch Overview
              <>
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-purple-700 to-slate-900 bg-clip-text text-transparent">
                      System Overview
                    </h2>
                    <p className="text-slate-600 text-lg">Monitor and manage your healthcare network</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-4 py-2 shadow-lg">
                    Super Administrator
                  </Badge>
                </div>

                {/* Overall Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-violet-50 hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-700">Total Branches</CardTitle>
                      <Building className="h-5 w-5 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-700">{branchOverview.length}</div>
                      <p className="text-xs text-purple-600 mt-1">Active branches</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-cyan-50 hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-700">Total Patients</CardTitle>
                      <Users className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-700">{branchOverview.reduce((acc, branch) => acc + branch.patients, 0)}</div>
                      <p className="text-xs text-blue-600 mt-1">Across all branches</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-emerald-50 to-green-50 hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-700">Total Revenue</CardTitle>
                      <IndianRupee className="h-5 w-5 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-emerald-700">₹{branchOverview.reduce((acc, branch) => acc + branch.revenue, 0).toLocaleString()}</div>
                      <p className="text-xs text-emerald-600 mt-1">This month</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-amber-50 hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-700">Total Staff</CardTitle>
                      <Users className="h-5 w-5 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-orange-700">{branchOverview.reduce((acc, branch) => acc + branch.staff, 0)}</div>
                      <p className="text-xs text-orange-600 mt-1">Active staff members</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Branch Details */}
                <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg">
                    <CardTitle className="text-xl">Branch Performance Analytics</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {branchOverview.map((branch, index) => (
                      <Card key={index} className="border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-purple-50/30">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <h3 className="text-xl font-bold text-slate-800">{branch.name}</h3>
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                  {branch.location}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="bg-blue-50 p-3 rounded-lg">
                                  <span className="text-blue-600 font-medium">Patients</span>
                                  <div className="text-xl font-bold text-blue-700">{branch.patients}</div>
                                </div>
                                <div className="bg-emerald-50 p-3 rounded-lg">
                                  <span className="text-emerald-600 font-medium">Staff</span>
                                  <div className="text-xl font-bold text-emerald-700">{branch.staff}</div>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg">
                                  <span className="text-purple-600 font-medium">Revenue</span>
                                  <div className="text-xl font-bold text-purple-700">₹{branch.revenue.toLocaleString()}</div>
                                </div>
                                <div className="bg-orange-50 p-3 rounded-lg">
                                  <span className="text-orange-600 font-medium">Today's Apps</span>
                                  <div className="text-xl font-bold text-orange-700">{branch.appointments}</div>
                                </div>
                              </div>
                            </div>
                            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg">
                              View Analytics
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
                  <div className="space-y-2">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-700 to-slate-900 bg-clip-text text-transparent">
                      {activeRole === 'admin' ? 'Administrative Dashboard' : 
                       activeRole === 'doctor' ? 'Clinical Dashboard' : 
                       'Reception Dashboard'}
                    </h2>
                    <p className="text-slate-600 text-lg">
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
                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-cyan-50 hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-700">Today's Patients</CardTitle>
                      <Users className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-700">{todayStats.patients}</div>
                      <p className="text-xs text-blue-600 mt-1">+3 from yesterday</p>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-emerald-50 to-green-50 hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-700">Appointments</CardTitle>
                      <Calendar className="h-5 w-5 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-emerald-700">{todayStats.appointments}</div>
                      <p className="text-xs text-emerald-600 mt-1">{todayStats.pending} pending</p>
                    </CardContent>
                  </Card>

                  {activeRole !== 'doctor' && (
                    <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-violet-50 hover:scale-105">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-700">Revenue</CardTitle>
                        <IndianRupee className="h-5 w-5 text-purple-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-purple-700">₹{todayStats.revenue.toLocaleString()}</div>
                        <p className="text-xs text-purple-600 mt-1">Today's collection</p>
                      </CardContent>
                    </Card>
                  )}

                  <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-amber-50 hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-700">Queue Status</CardTitle>
                      <Clock className="h-5 w-5 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-orange-700">{todayStats.pending}</div>
                      <p className="text-xs text-orange-600 mt-1">Patients waiting</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg">
                    <CardTitle className="text-xl">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <Button 
                        className="h-24 flex flex-col space-y-3 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg" 
                        onClick={() => setActiveModule('patients')}
                      >
                        <UserPlus className="h-8 w-8" />
                        <span className="font-medium">New Patient</span>
                      </Button>
                      <Button 
                        className="h-24 flex flex-col space-y-3 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg" 
                        onClick={() => setActiveModule('appointments')}
                      >
                        <Calendar className="h-8 w-8" />
                        <span className="font-medium">Book Appointment</span>
                      </Button>
                      {activeRole === 'doctor' && (
                        <Button 
                          className="h-24 flex flex-col space-y-3 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg" 
                          onClick={() => setActiveModule('consultation')}
                        >
                          <FileText className="h-8 w-8" />
                          <span className="font-medium">Consultation</span>
                        </Button>
                      )}
                      {activeRole !== 'doctor' && (
                        <Button 
                          className="h-24 flex flex-col space-y-3 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg" 
                          onClick={() => setActiveModule('billing')}
                        >
                          <IndianRupee className="h-8 w-8" />
                          <span className="font-medium">Create Bill</span>
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
