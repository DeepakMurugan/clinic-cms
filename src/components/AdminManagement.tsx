import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Users, UserPlus, Edit, Trash2, MapPin, Phone, Mail, Key, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminManagementProps {
  userRole: 'admin' | 'superadmin';
}

const AdminManagement = ({ userRole }: AdminManagementProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  const [branchForm, setBranchForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    manager: "",
    adminUsername: "",
    adminPassword: ""
  });

  const [staffForm, setStaffForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    branch: "",
    speciality: "",
    consultationFee: "",
    username: "",
    password: ""
  });

  // Mock data
  const branches = [
    { 
      id: "BR001", 
      name: "Main Clinic", 
      address: "123 Health Street, Mumbai", 
      phone: "+91 9876543210", 
      email: "main@clinic.com",
      manager: "Dr. Rajesh Sharma",
      staff: 12,
      patients: 150
    },
    { 
      id: "BR002", 
      name: "North Branch", 
      address: "456 Care Avenue, Delhi", 
      phone: "+91 9876543211", 
      email: "north@clinic.com",
      manager: "Dr. Priya Patel",
      staff: 8,
      patients: 95
    }
  ];

  const staff = [
    {
      id: "ST001",
      name: "Dr. Rajesh Sharma",
      email: "rajesh@clinic.com",
      phone: "+91 9876543201",
      role: "doctor",
      branch: "Main Clinic",
      speciality: "General Medicine",
      consultationFee: 500
    },
    {
      id: "ST002",
      name: "Priya Receptionist",
      email: "priya@clinic.com",
      phone: "+91 9876543202",
      role: "receptionist",
      branch: "Main Clinic",
      speciality: "-",
      consultationFee: 0
    },
    {
      id: "ST003",
      name: "Dr. Amit Kumar",
      email: "amit@clinic.com",
      phone: "+91 9876543203",
      role: "doctor",
      branch: "North Branch",
      speciality: "Cardiology",
      consultationFee: 800
    }
  ];

  const generateBranchId = () => {
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `BR${random}`;
  };

  const generateStaffId = () => {
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ST${random}`;
  };

  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!branchForm.name || !branchForm.address || !branchForm.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    const branchId = generateBranchId();
    console.log("Creating branch:", { 
      ...branchForm, 
      branchId,
      adminCredentials: {
        username: branchForm.adminUsername,
        password: branchForm.adminPassword
      }
    });
    
    toast({
      title: "Branch Created Successfully",
      description: `Branch ID: ${branchId}${branchForm.adminUsername ? ` | Admin Login: ${branchForm.adminUsername}` : ''}`,
    });

    setBranchForm({
      name: "",
      address: "",
      phone: "",
      email: "",
      manager: "",
      adminUsername: "",
      adminPassword: ""
    });
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!staffForm.name || !staffForm.email || !staffForm.role || !staffForm.branch) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    const staffId = generateStaffId();
    console.log("Creating staff:", { 
      ...staffForm, 
      staffId,
      loginCredentials: {
        username: staffForm.username,
        password: staffForm.password
      }
    });
    
    toast({
      title: "Staff Member Added Successfully",
      description: `Staff ID: ${staffId}${staffForm.username ? ` | Login: ${staffForm.username}` : ''}`,
    });

    setStaffForm({
      name: "",
      email: "",
      phone: "",
      role: "",
      branch: "",
      speciality: "",
      consultationFee: "",
      username: "",
      password: ""
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'doctor': return 'bg-gradient-to-r from-emerald-500 to-green-600';
      case 'receptionist': return 'bg-gradient-to-r from-blue-500 to-cyan-600';
      case 'admin': return 'bg-gradient-to-r from-purple-500 to-violet-600';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-600';
    }
  };

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine which tabs to show based on role
  const getTabsList = () => {
    if (userRole === 'superadmin') {
      return (
        <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 rounded-xl">
          <TabsTrigger value="branches" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all">
            <Building className="h-4 w-4" />
            <span>Branches</span>
          </TabsTrigger>
          <TabsTrigger value="staff" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all">
            <Users className="h-4 w-4" />
            <span>Staff Management</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all">
            <UserPlus className="h-4 w-4" />
            <span>Create New</span>
          </TabsTrigger>
        </TabsList>
      );
    } else {
      return (
        <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-xl">
          <TabsTrigger value="staff" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all">
            <Users className="h-4 w-4" />
            <span>Staff Management</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all">
            <UserPlus className="h-4 w-4" />
            <span>Add Staff</span>
          </TabsTrigger>
        </TabsList>
      );
    }
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent">
            {userRole === 'superadmin' ? 'System Administration' : 'Staff Management'}
          </h2>
          <p className="text-slate-600 text-lg">
            {userRole === 'superadmin' ? 'Manage branches and system-wide settings' : 'Manage your clinic staff and roles'}
          </p>
        </div>
        <Badge 
          variant="outline" 
          className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-800"
        >
          {userRole === 'superadmin' ? 'Super Administrator' : 'Administrator'}
        </Badge>
      </div>

      <Tabs defaultValue={userRole === 'superadmin' ? 'branches' : 'staff'} className="space-y-8">
        {getTabsList()}

        {/* Branches Tab - Only for Super Admin */}
        {userRole === 'superadmin' && (
          <TabsContent value="branches" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <Building className="h-6 w-6" />
                  <span>Branch Network</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {branches.map((branch) => (
                  <Card key={branch.id} className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-blue-50/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-xl font-bold text-slate-800">{branch.name}</h3>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {branch.id}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-blue-500" />
                              <span>{branch.address}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-green-500" />
                              <span>{branch.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-purple-500" />
                              <span>{branch.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-orange-500" />
                              <span>Manager: {branch.manager}</span>
                            </div>
                          </div>
                          <div className="flex space-x-4">
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                              {branch.staff} Staff Members
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                              {branch.patients} Patients
                            </Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:border-blue-300">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 hover:border-red-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Staff Management Tab */}
        <TabsContent value="staff" className="space-y-6">
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6" />
                  <span className="text-xl">Staff Directory</span>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
                  <Input
                    placeholder="Search staff..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 w-64"
                  />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {filteredStaff.map((member) => (
                <Card key={member.id} className="border-l-4 border-l-emerald-500 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-emerald-50/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-bold text-slate-800">{member.name}</h3>
                          <Badge className={`${getRoleColor(member.role)} text-white px-3 py-1 rounded-full`}>
                            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                          </Badge>
                          <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                            {member.id}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-blue-500" />
                            <span>{member.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-green-500" />
                            <span>{member.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4 text-purple-500" />
                            <span>{member.branch}</span>
                          </div>
                          {member.role === 'doctor' && (
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{member.speciality}</span>
                              <span className="text-green-600 font-semibold">₹{member.consultationFee}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="hover:bg-blue-50 hover:border-blue-300">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {userRole === 'superadmin' && (
                          <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 hover:border-red-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create New Tab */}
        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Create Branch - Only for Super Admin */}
            {userRole === 'superadmin' && (
              <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <Building className="h-6 w-6" />
                    <span>Create New Branch</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleCreateBranch} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="branchName" className="text-sm font-semibold text-slate-700">Branch Name *</Label>
                      <Input
                        id="branchName"
                        value={branchForm.name}
                        onChange={(e) => setBranchForm({...branchForm, name: e.target.value})}
                        placeholder="Enter branch name"
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branchAddress" className="text-sm font-semibold text-slate-700">Address *</Label>
                      <Input
                        id="branchAddress"
                        value={branchForm.address}
                        onChange={(e) => setBranchForm({...branchForm, address: e.target.value})}
                        placeholder="Enter complete address"
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branchPhone" className="text-sm font-semibold text-slate-700">Phone Number *</Label>
                      <Input
                        id="branchPhone"
                        type="tel"
                        value={branchForm.phone}
                        onChange={(e) => setBranchForm({...branchForm, phone: e.target.value})}
                        placeholder="+91 XXXXX XXXXX"
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branchEmail" className="text-sm font-semibold text-slate-700">Email</Label>
                      <Input
                        id="branchEmail"
                        type="email"
                        value={branchForm.email}
                        onChange={(e) => setBranchForm({...branchForm, email: e.target.value})}
                        placeholder="branch@clinic.com"
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="border-t border-slate-200 pt-5">
                      <div className="flex items-center space-x-2 mb-4">
                        <Key className="h-5 w-5 text-blue-600" />
                        <Label className="text-sm font-semibold text-slate-700">Branch Admin Login Credentials</Label>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="adminUsername" className="text-sm font-medium text-slate-600">Username</Label>
                          <Input
                            id="adminUsername"
                            value={branchForm.adminUsername}
                            onChange={(e) => setBranchForm({...branchForm, adminUsername: e.target.value})}
                            placeholder="admin_username"
                            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="adminPassword" className="text-sm font-medium text-slate-600">Password</Label>
                          <Input
                            id="adminPassword"
                            type="password"
                            value={branchForm.adminPassword}
                            onChange={(e) => setBranchForm({...branchForm, adminPassword: e.target.value})}
                            placeholder="password123"
                            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg">
                      <Building className="h-5 w-5 mr-2" />
                      Create Branch
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Create Staff */}
            <Card className={`border-0 shadow-xl bg-white/70 backdrop-blur-sm ${userRole === 'admin' ? 'lg:col-span-2' : ''}`}>
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <UserPlus className="h-6 w-6" />
                  <span>Add New Staff Member</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleCreateStaff} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="staffName" className="text-sm font-semibold text-slate-700">Full Name *</Label>
                      <Input
                        id="staffName"
                        value={staffForm.name}
                        onChange={(e) => setStaffForm({...staffForm, name: e.target.value})}
                        placeholder="Enter full name"
                        className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="staffEmail" className="text-sm font-semibold text-slate-700">Email *</Label>
                      <Input
                        id="staffEmail"
                        type="email"
                        value={staffForm.email}
                        onChange={(e) => setStaffForm({...staffForm, email: e.target.value})}
                        placeholder="staff@clinic.com"
                        className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="staffPhone" className="text-sm font-semibold text-slate-700">Phone Number</Label>
                      <Input
                        id="staffPhone"
                        type="tel"
                        value={staffForm.phone}
                        onChange={(e) => setStaffForm({...staffForm, phone: e.target.value})}
                        placeholder="+91 XXXXX XXXXX"
                        className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="staffRole" className="text-sm font-semibold text-slate-700">Role *</Label>
                      <Select value={staffForm.role} onValueChange={(value) => setStaffForm({...staffForm, role: value})}>
                        <SelectTrigger className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="doctor">Doctor</SelectItem>
                          <SelectItem value="receptionist">Receptionist</SelectItem>
                          {userRole === 'superadmin' && <SelectItem value="admin">Admin</SelectItem>}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="staffBranch" className="text-sm font-semibold text-slate-700">Branch *</Label>
                    <Select value={staffForm.branch} onValueChange={(value) => setStaffForm({...staffForm, branch: value})}>
                      <SelectTrigger className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.name}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {staffForm.role === 'doctor' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="speciality" className="text-sm font-semibold text-slate-700">Speciality</Label>
                        <Input
                          id="speciality"
                          value={staffForm.speciality}
                          onChange={(e) => setStaffForm({...staffForm, speciality: e.target.value})}
                          placeholder="e.g., General Medicine"
                          className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="consultationFee" className="text-sm font-semibold text-slate-700">Consultation Fee (₹)</Label>
                        <Input
                          id="consultationFee"
                          type="number"
                          value={staffForm.consultationFee}
                          onChange={(e) => setStaffForm({...staffForm, consultationFee: e.target.value})}
                          placeholder="500"
                          className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t border-slate-200 pt-5">
                    <div className="flex items-center space-x-2 mb-4">
                      <Key className="h-5 w-5 text-emerald-600" />
                      <Label className="text-sm font-semibold text-slate-700">Login Credentials</Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="staffUsername" className="text-sm font-medium text-slate-600">Username</Label>
                        <Input
                          id="staffUsername"
                          value={staffForm.username}
                          onChange={(e) => setStaffForm({...staffForm, username: e.target.value})}
                          placeholder="staff_username"
                          className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="staffPassword" className="text-sm font-medium text-slate-600">Password</Label>
                        <Input
                          id="staffPassword"
                          type="password"
                          value={staffForm.password}
                          onChange={(e) => setStaffForm({...staffForm, password: e.target.value})}
                          placeholder="password123"
                          className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3 rounded-lg shadow-lg">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Add Staff Member
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminManagement;
