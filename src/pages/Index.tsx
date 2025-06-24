
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, FileText, IndianRupee, UserPlus, Clock, Activity, TrendingUp } from "lucide-react";
import PatientRegistration from "@/components/PatientRegistration";
import AppointmentScheduler from "@/components/AppointmentScheduler";
import DoctorDashboard from "@/components/DoctorDashboard";
import BillingModule from "@/components/BillingModule";
import AdminReports from "@/components/AdminReports";

const Index = () => {
  const [activeRole, setActiveRole] = useState<'admin' | 'doctor' | 'receptionist'>('receptionist');
  const [activeModule, setActiveModule] = useState('dashboard');

  const roleColors = {
    admin: 'bg-blue-500',
    doctor: 'bg-green-500',
    receptionist: 'bg-purple-500'
  };

  const todayStats = {
    patients: 24,
    appointments: 18,
    revenue: 12500,
    pending: 6
  };

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
              <div className="flex space-x-2">
                {(['receptionist', 'doctor', 'admin'] as const).map((role) => (
                  <Button
                    key={role}
                    variant={activeRole === role ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveRole(role)}
                    className={activeRole === role ? roleColors[role] : ''}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeModule} onValueChange={setActiveModule} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Patients</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Appointments</span>
            </TabsTrigger>
            {activeRole === 'doctor' && (
              <TabsTrigger value="consultation" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Consultation</span>
              </TabsTrigger>
            )}
            <TabsTrigger value="billing" className="flex items-center space-x-2">
              <IndianRupee className="h-4 w-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
            {activeRole === 'admin' && (
              <TabsTrigger value="reports" className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Reports</span>
              </TabsTrigger>
            )}
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="space-y-6">
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
                  <Button 
                    className="h-20 flex flex-col space-y-2" 
                    variant="outline"
                    onClick={() => setActiveModule('billing')}
                  >
                    <IndianRupee className="h-6 w-6" />
                    <span>Create Bill</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patient Management */}
          <TabsContent value="patients">
            <PatientRegistration />
          </TabsContent>

          {/* Appointment Scheduler */}
          <TabsContent value="appointments">
            <AppointmentScheduler />
          </TabsContent>

          {/* Doctor Consultation Dashboard */}
          {activeRole === 'doctor' && (
            <TabsContent value="consultation">
              <DoctorDashboard />
            </TabsContent>
          )}

          {/* Billing Module */}
          <TabsContent value="billing">
            <BillingModule userRole={activeRole} />
          </TabsContent>

          {/* Admin Reports */}
          {activeRole === 'admin' && (
            <TabsContent value="reports">
              <AdminReports />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
