
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Clock, AlertTriangle, User, Calendar, Download, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DoctorDashboard = () => {
  const { toast } = useToast();
  const [selectedPatient, setSelectedPatient] = useState("");
  const [consultationNotes, setConsultationNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [selectedMedicines, setSelectedMedicines] = useState<string[]>([]);
  const [customMedicine, setCustomMedicine] = useState("");

  // Mock patient queue
  const patientQueue = [
    { 
      id: "PAT123456", 
      name: "Rajesh Kumar", 
      age: 45, 
      appointmentTime: "10:00",
      appointmentId: "APT001",
      isChronicCondition: false,
      status: "waiting",
      lastVisit: "2024-01-10"
    },
    { 
      id: "PAT123457", 
      name: "Priya Sharma", 
      age: 17, 
      appointmentTime: "10:30",
      appointmentId: "APT002",
      isChronicCondition: true,
      status: "in-consultation",
      lastVisit: "2023-12-15"
    },
    { 
      id: "PAT123458", 
      name: "Amit Patel", 
      age: 28, 
      appointmentTime: "11:00",
      appointmentId: "APT003",
      isChronicCondition: false,
      status: "waiting",
      lastVisit: null
    },
  ];

  // Mock medicine database
  const medicines = [
    "Paracetamol 500mg",
    "Ibuprofen 400mg",
    "Amoxicillin 250mg",
    "Cough Syrup",
    "Vitamin D3",
    "Omeprazole 20mg",
    "Metformin 500mg",
    "Atorvastatin 10mg"
  ];

  // Mock patient history
  const patientHistory = [
    {
      date: "2024-01-10",
      diagnosis: "Common Cold",
      medicines: ["Paracetamol 500mg", "Cough Syrup"],
      notes: "Patient complained of runny nose and mild fever."
    },
    {
      date: "2023-12-15",
      diagnosis: "Hypertension Follow-up",
      medicines: ["Atorvastatin 10mg", "Metformin 500mg"],
      notes: "Blood pressure controlled. Continue current medication."
    }
  ];

  const handleStartConsultation = (patientId: string) => {
    setSelectedPatient(patientId);
    toast({
      title: "Consultation Started",
      description: "Patient profile loaded successfully.",
    });
  };

  const handleGeneratePrescription = () => {
    if (!selectedPatient || !diagnosis) {
      toast({
        title: "Missing Information",
        description: "Please add diagnosis before generating prescription.",
        variant: "destructive",
      });
      return;
    }

    console.log("Generating prescription:", {
      patient: selectedPatient,
      diagnosis,
      medicines: selectedMedicines,
      notes: consultationNotes
    });

    toast({
      title: "Prescription Generated",
      description: "Prescription PDF created and saved to patient record.",
    });
  };

  const handleCompleteConsultation = () => {
    if (!selectedPatient) return;

    console.log("Consultation completed for:", selectedPatient);
    
    toast({
      title: "Consultation Completed",
      description: "Patient moved to billing queue.",
    });

    // Reset form
    setSelectedPatient("");
    setConsultationNotes("");
    setDiagnosis("");
    setSelectedMedicines([]);
    setCustomMedicine("");
  };

  const addCustomMedicine = () => {
    if (customMedicine.trim()) {
      setSelectedMedicines([...selectedMedicines, customMedicine.trim()]);
      setCustomMedicine("");
    }
  };

  const removeMedicine = (index: number) => {
    setSelectedMedicines(selectedMedicines.filter((_, i) => i !== index));
  };

  const currentPatient = patientQueue.find(p => p.id === selectedPatient);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h2>
        <Badge variant="outline" className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{patientQueue.filter(p => p.status === 'waiting').length} patients waiting</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Patient Queue</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {patientQueue.map((patient) => (
              <Card 
                key={patient.id} 
                className={`border-l-4 cursor-pointer transition-colors ${
                  patient.status === 'in-consultation' ? 'border-l-blue-500 bg-blue-50' :
                  patient.status === 'waiting' ? 'border-l-orange-500' : 'border-l-gray-300'
                } ${selectedPatient === patient.id ? 'ring-2 ring-blue-300' : ''}`}
                onClick={() => handleStartConsultation(patient.id)}
              >
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{patient.name}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span className="text-sm">{patient.appointmentTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{patient.age} years</Badge>
                      {patient.isChronicCondition && (
                        <Badge variant="destructive" className="flex items-center space-x-1">
                          <AlertTriangle className="h-3 w-3" />
                          <span>Chronic</span>
                        </Badge>
                      )}
                    </div>

                    <div className="text-xs text-gray-500">
                      {patient.lastVisit ? (
                        <span>Last visit: {patient.lastVisit}</span>
                      ) : (
                        <span className="text-green-600 font-medium">New Patient</span>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{patient.appointmentId}</Badge>
                      <Badge 
                        className={
                          patient.status === 'in-consultation' ? 'bg-blue-500' :
                          patient.status === 'waiting' ? 'bg-orange-500' : 'bg-gray-500'
                        }
                      >
                        {patient.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Consultation Interface */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <Tabs defaultValue="consultation" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="consultation">Consultation</TabsTrigger>
                <TabsTrigger value="history">Patient History</TabsTrigger>
                <TabsTrigger value="prescription">Prescription</TabsTrigger>
              </TabsList>

              {/* Current Consultation */}
              <TabsContent value="consultation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5" />
                        <span>Consultation - {currentPatient?.name}</span>
                      </div>
                      {currentPatient?.isChronicCondition && (
                        <Badge variant="destructive" className="flex items-center space-x-1">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Chronic Condition Alert</span>
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Patient ID</Label>
                        <p className="font-semibold">{currentPatient?.id}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Age</Label>
                        <p className="font-semibold">{currentPatient?.age} years</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Appointment Time</Label>
                        <p className="font-semibold">{currentPatient?.appointmentTime}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Last Visit</Label>
                        <p className="font-semibold">
                          {currentPatient?.lastVisit || "First Visit"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="diagnosis">Diagnosis *</Label>
                      <Input
                        id="diagnosis"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        placeholder="Enter primary diagnosis..."
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Consultation Notes</Label>
                      <Textarea
                        id="notes"
                        value={consultationNotes}
                        onChange={(e) => setConsultationNotes(e.target.value)}
                        placeholder="Patient complaints, symptoms, examination findings..."
                        className="mt-1"
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Patient History */}
              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Medical History</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {patientHistory.map((record, index) => (
                      <Card key={index} className="border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold">{record.diagnosis}</h4>
                                <p className="text-sm text-gray-600">{record.date}</p>
                              </div>
                            </div>
                            <p className="text-sm">{record.notes}</p>
                            <div className="flex flex-wrap gap-1">
                              {record.medicines.map((medicine, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {medicine}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Prescription */}
              <TabsContent value="prescription" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Prescription</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="medicineSelect">Add Medicine</Label>
                      <Select onValueChange={(value) => setSelectedMedicines([...selectedMedicines, value])}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select medicine from database" />
                        </SelectTrigger>
                        <SelectContent>
                          {medicines.map((medicine) => (
                            <SelectItem key={medicine} value={medicine}>
                              {medicine}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter custom medicine..."
                        value={customMedicine}
                        onChange={(e) => setCustomMedicine(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addCustomMedicine()}
                      />
                      <Button onClick={addCustomMedicine}>Add</Button>
                    </div>

                    {/* Selected Medicines */}
                    <div className="space-y-2">
                      <Label>Selected Medicines:</Label>
                      <div className="space-y-2">
                        {selectedMedicines.map((medicine, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span>{medicine}</span>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => removeMedicine(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      <Button 
                        variant="outline"
                        onClick={handleGeneratePrescription}
                        disabled={!diagnosis}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Generate PDF
                      </Button>
                      <Button 
                        variant="outline"
                        disabled={!diagnosis}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send WhatsApp
                      </Button>
                      <Button 
                        onClick={handleCompleteConsultation}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={!diagnosis}
                      >
                        Complete Consultation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center text-gray-500">
                  <User className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Select a Patient</h3>
                  <p>Click on a patient from the queue to start consultation.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
