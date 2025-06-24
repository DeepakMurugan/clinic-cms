
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, UserPlus, QrCode, Phone, Calendar, MapPin, Eye, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PatientRegistration = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    parentGuardianName: "",
    parentGuardianPhone: ""
  });

  const currentAge = parseInt(formData.age) || 0;
  const requiresGuardian = currentAge < 20 && currentAge > 0;

  const generatePatientId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PAT${timestamp}${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (requiresGuardian && (!formData.parentGuardianName || !formData.parentGuardianPhone)) {
      toast({
        title: "Guardian Required",
        description: "Parent/Guardian details are required for patients under 20 years.",
        variant: "destructive",
      });
      return;
    }

    const patientId = generatePatientId();
    console.log("Patient registered:", { ...formData, patientId, age: currentAge });
    
    toast({
      title: "Patient Registered Successfully",
      description: `Patient ID: ${patientId}`,
    });

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      emergencyContact: "",
      parentGuardianName: "",
      parentGuardianPhone: ""
    });
  };

  // Mock existing patients for search
  const existingPatients = [
    { 
      id: "PAT123456", 
      name: "Rajesh Kumar", 
      phone: "+91 9876543210", 
      age: 45, 
      lastVisit: "2024-01-15",
      gender: "Male",
      address: "123 Main Street, Mumbai",
      emergencyContact: "+91 9876543220",
      totalVisits: 5,
      lastDiagnosis: "Hypertension Follow-up"
    },
    { 
      id: "PAT123457", 
      name: "Priya Sharma", 
      phone: "+91 9876543211", 
      age: 32, 
      lastVisit: "2024-01-10",
      gender: "Female",
      address: "456 Park Avenue, Delhi",
      emergencyContact: "+91 9876543221",
      totalVisits: 3,
      lastDiagnosis: "Common Cold"
    },
    { 
      id: "PAT123458", 
      name: "Amit Patel", 
      phone: "+91 9876543212", 
      age: 28, 
      lastVisit: "2024-01-08",
      gender: "Male",
      address: "789 Garden Road, Pune",
      emergencyContact: "+91 9876543222",
      totalVisits: 7,
      lastDiagnosis: "Diabetes Management"
    },
  ];

  const filteredPatients = existingPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const PatientProfileDialog = ({ patient }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" onClick={() => setSelectedPatient(patient)}>
          <Eye className="h-4 w-4 mr-1" />
          View Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Patient Profile - {patient?.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Patient ID</Label>
                <p className="font-semibold">{patient?.id}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Name</Label>
                <p className="font-semibold">{patient?.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Age</Label>
                <p className="font-semibold">{patient?.age} years</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Gender</Label>
                <p className="font-semibold">{patient?.gender}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Phone</Label>
                <p className="font-semibold">{patient?.phone}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Emergency Contact</Label>
                <p className="font-semibold">{patient?.emergencyContact}</p>
              </div>
            </CardContent>
          </Card>

          {/* Medical Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Medical Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Total Visits</Label>
                <p className="font-semibold">{patient?.totalVisits}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Last Visit</Label>
                <p className="font-semibold">{patient?.lastVisit}</p>
              </div>
              <div className="col-span-2">
                <Label className="text-sm font-medium text-gray-600">Last Diagnosis</Label>
                <p className="font-semibold">{patient?.lastDiagnosis}</p>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{patient?.address}</p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Patient Management</h2>
      </div>

      <Tabs defaultValue="search" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search" className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Search Patients</span>
          </TabsTrigger>
          <TabsTrigger value="register" className="flex items-center space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>New Registration</span>
          </TabsTrigger>
        </TabsList>

        {/* Search Existing Patients */}
        <TabsContent value="search" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search Existing Patients</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search by Name, Phone or Patient ID</Label>
                  <Input
                    id="search"
                    placeholder="Enter name, phone number, or patient ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button className="mt-6">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              {/* Search Results */}
              <div className="space-y-3">
                {filteredPatients.map((patient) => (
                  <Card key={patient.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">{patient.name}</span>
                            <Badge variant="outline">{patient.age} years</Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Phone className="h-3 w-3" />
                              <span>{patient.phone}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>Last visit: {patient.lastVisit}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{patient.id}</Badge>
                        <PatientProfileDialog patient={patient} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {searchTerm && filteredPatients.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No patients found matching your search.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* New Patient Registration */}
        <TabsContent value="register" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5" />
                <span>New Patient Registration</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      min="0"
                      max="120"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      required
                      className="mt-1"
                      placeholder="Enter age in years"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => setFormData({...formData, gender: value})}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Guardian Information (if required) */}
                {requiresGuardian && (
                  <Card className="bg-yellow-50 border-yellow-200">
                    <CardHeader>
                      <CardTitle className="text-lg text-yellow-800">
                        Guardian Information Required
                      </CardTitle>
                      <p className="text-sm text-yellow-700">
                        Patient is under 20 years old. Guardian details are mandatory.
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="parentGuardianName">Parent/Guardian Name *</Label>
                          <Input
                            id="parentGuardianName"
                            value={formData.parentGuardianName}
                            onChange={(e) => setFormData({...formData, parentGuardianName: e.target.value})}
                            required={requiresGuardian}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="parentGuardianPhone">Guardian Phone *</Label>
                          <Input
                            id="parentGuardianPhone"
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            value={formData.parentGuardianPhone}
                            onChange={(e) => setFormData({...formData, parentGuardianPhone: e.target.value})}
                            required={requiresGuardian}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Additional Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button type="button" variant="outline">
                    <QrCode className="h-4 w-4 mr-2" />
                    Generate QR
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register Patient
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientRegistration;
