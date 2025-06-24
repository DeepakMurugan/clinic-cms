import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Users, UserPlus, Edit, Trash2, MapPin, Phone, Mail, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminManagementProps {
  userRole: 'admin' | 'superadmin';
}

const AdminManagement = ({ userRole }: AdminManagementProps) => {
  const { toast } = useToast();
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
      case 'doctor': return 'bg-green-500';
      case 'receptionist': return 'bg-blue-500';
      case 'admin': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Admin Management</h2>
        <Badge variant="outline">Role: {userRole}</Badge>
      </div>

      <Tabs defaultValue="branches" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="branches" className="flex items-center space-x-2">
            <Building className="h-4 w-4" />
            <span>Branches</span>
          </TabsTrigger>
          <TabsTrigger value="staff" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Staff Management</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>Create New</span>
          </TabsTrigger>
        </TabsList>

        {/* Branches Tab */}
        <TabsContent value="branches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>Branch Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {branches.map((branch) => (
                <Card key={branch.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold">{branch.name}</h3>
                          <Badge variant="outline">{branch.id}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{branch.address}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{branch.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{branch.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>Manager: {branch.manager}</span>
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <Badge variant="secondary">{branch.staff} Staff</Badge>
                          <Badge variant="secondary">{branch.patients} Patients</Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {userRole === 'superadmin' && (
                          <Button size="sm" variant="outline" className="text-red-600">
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

        {/* Staff Management Tab */}
        <TabsContent value="staff" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Staff Directory</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {staff.map((member) => (
                <Card key={member.id} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold">{member.name}</h3>
                          <Badge className={getRoleColor(member.role)}>
                            {member.role}
                          </Badge>
                          <Badge variant="outline">{member.id}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{member.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{member.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Building className="h-3 w-3" />
                            <span>{member.branch}</span>
                          </div>
                          {member.role === 'doctor' && (
                            <div>
                              <span>{member.speciality} • ₹{member.consultationFee}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {userRole === 'superadmin' && (
                          <Button size="sm" variant="outline" className="text-red-600">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Create Branch */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Create New Branch</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateBranch} className="space-y-4">
                  <div>
                    <Label htmlFor="branchName">Branch Name *</Label>
                    <Input
                      id="branchName"
                      value={branchForm.name}
                      onChange={(e) => setBranchForm({...branchForm, name: e.target.value})}
                      placeholder="Enter branch name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="branchAddress">Address *</Label>
                    <Input
                      id="branchAddress"
                      value={branchForm.address}
                      onChange={(e) => setBranchForm({...branchForm, address: e.target.value})}
                      placeholder="Enter complete address"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="branchPhone">Phone Number *</Label>
                    <Input
                      id="branchPhone"
                      type="tel"
                      value={branchForm.phone}
                      onChange={(e) => setBranchForm({...branchForm, phone: e.target.value})}
                      placeholder="+91 XXXXX XXXXX"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="branchEmail">Email</Label>
                    <Input
                      id="branchEmail"
                      type="email"
                      value={branchForm.email}
                      onChange={(e) => setBranchForm({...branchForm, email: e.target.value})}
                      placeholder="branch@clinic.com"
                      className="mt-1"
                    />
                  </div>
                  
                  {/* Admin Login Credentials */}
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Key className="h-4 w-4" />
                      <Label className="text-sm font-medium">Branch Admin Login (Optional)</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="adminUsername">Username</Label>
                        <Input
                          id="adminUsername"
                          value={branchForm.adminUsername}
                          onChange={(e) => setBranchForm({...branchForm, adminUsername: e.target.value})}
                          placeholder="admin_username"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="adminPassword">Password</Label>
                        <Input
                          id="adminPassword"
                          type="password"
                          value={branchForm.adminPassword}
                          onChange={(e) => setBranchForm({...branchForm, adminPassword: e.target.value})}
                          placeholder="password123"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    <Building className="h-4 w-4 mr-2" />
                    Create Branch
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Create Staff */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserPlus className="h-5 w-5" />
                  <span>Add New Staff</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateStaff} className="space-y-4">
                  <div>
                    <Label htmlFor="staffName">Full Name *</Label>
                    <Input
                      id="staffName"
                      value={staffForm.name}
                      onChange={(e) => setStaffForm({...staffForm, name: e.target.value})}
                      placeholder="Enter full name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="staffEmail">Email *</Label>
                    <Input
                      id="staffEmail"
                      type="email"
                      value={staffForm.email}
                      onChange={(e) => setStaffForm({...staffForm, email: e.target.value})}
                      placeholder="staff@clinic.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="staffPhone">Phone Number</Label>
                    <Input
                      id="staffPhone"
                      type="tel"
                      value={staffForm.phone}
                      onChange={(e) => setStaffForm({...staffForm, phone: e.target.value})}
                      placeholder="+91 XXXXX XXXXX"
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="staffRole">Role *</Label>
                      <Select value={staffForm.role} onValueChange={(value) => setStaffForm({...staffForm, role: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="doctor">Doctor</SelectItem>
                          <SelectItem value="receptionist">Receptionist</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="staffBranch">Branch *</Label>
                      <Select value={staffForm.branch} onValueChange={(value) => setStaffForm({...staffForm, branch: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.map((branch) => (
                            <SelectItem key={branch.id} value={branch.name}>
                              {branch.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {staffForm.role === 'doctor' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="speciality">Speciality</Label>
                        <Input
                          id="speciality"
                          value={staffForm.speciality}
                          onChange={(e) => setStaffForm({...staffForm, speciality: e.target.value})}
                          placeholder="e.g., General Medicine"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="consultationFee">Consultation Fee (₹)</Label>
                        <Input
                          id="consultationFee"
                          type="number"
                          value={staffForm.consultationFee}
                          onChange={(e) => setStaffForm({...staffForm, consultationFee: e.target.value})}
                          placeholder="500"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Staff Login Credentials */}
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Key className="h-4 w-4" />
                      <Label className="text-sm font-medium">Login Credentials (Optional)</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="staffUsername">Username</Label>
                        <Input
                          id="staffUsername"
                          value={staffForm.username}
                          onChange={(e) => setStaffForm({...staffForm, username: e.target.value})}
                          placeholder="staff_username"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="staffPassword">Password</Label>
                        <Input
                          id="staffPassword"
                          type="password"
                          value={staffForm.password}
                          onChange={(e) => setStaffForm({...staffForm, password: e.target.value})}
                          placeholder="password123"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    <UserPlus className="h-4 w-4 mr-2" />
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
