
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, AlertTriangle, CheckCircle, MessageSquare, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AppointmentScheduler = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [isHipaaRegulation, setIsHipaaRegulation] = useState(false);
  const [appointmentType, setAppointmentType] = useState("");

  // Mock data
  const doctors = [
    { id: "doc1", name: "Dr. Rajesh Sharma", speciality: "General Medicine", available: true, consultationFee: 500 },
    { id: "doc2", name: "Dr. Priya Patel", speciality: "Pediatrics", available: true, consultationFee: 600 },
    { id: "doc3", name: "Dr. Amit Kumar", speciality: "Cardiology", available: false, consultationFee: 800 },
    { id: "doc4", name: "Dr. Sunita Singh", speciality: "Dermatology", available: true, consultationFee: 700 },
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30"
  ];

  const patients = [
    { id: "PAT123456", name: "Rajesh Kumar", phone: "+91 9876543210", age: 45 },
    { id: "PAT123457", name: "Priya Sharma", phone: "+91 9876543211", age: 32 },
    { id: "PAT123458", name: "Amit Patel", phone: "+91 9876543212", age: 28 },
  ];

  const todaysAppointments = [
    { id: "APT001", patient: "Rajesh Kumar", doctor: "Dr. Rajesh Sharma", time: "10:00", status: "completed" },
    { id: "APT002", patient: "Priya Sharma", doctor: "Dr. Priya Patel", time: "11:00", status: "in-progress" },
    { id: "APT003", patient: "Amit Patel", doctor: "Dr. Rajesh Sharma", time: "14:30", status: "pending" },
    { id: "APT004", patient: "Sunita Devi", doctor: "Dr. Sunita Singh", time: "15:00", status: "pending" },
  ];

  const generateAppointmentId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `APT${timestamp}${random}`;
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPatient || !selectedDoctor || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    const appointmentId = generateAppointmentId();
    const selectedDoc = doctors.find(d => d.id === selectedDoctor);
    const selectedPat = patients.find(p => p.id === selectedPatient);
    
    console.log("Appointment booked:", {
      appointmentId,
      patient: selectedPat?.name,
      doctor: selectedDoc?.name,
      date: selectedDate,
      time: selectedTime,
      isHipaaRegulation,
      appointmentType
    });

    toast({
      title: "Appointment Booked Successfully",
      description: `Appointment ID: ${appointmentId}. WhatsApp confirmation sent.`,
    });

    // Reset form
    setSelectedDate("");
    setSelectedTime("");
    setSelectedDoctor("");
    setSelectedPatient("");
    setIsHipaaRegulation(false);
    setAppointmentType("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Appointment Scheduler</h2>
        <Badge variant="outline">
          <Calendar className="h-4 w-4 mr-1" />
          {new Date().toLocaleDateString('en-IN')}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New Appointment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Book New Appointment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBookAppointment} className="space-y-4">
              {/* Patient Selection */}
              <div>
                <Label htmlFor="patient">Select Patient *</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{patient.name}</span>
                          <Badge variant="outline" className="ml-2">
                            {patient.age}y
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Doctor Selection */}
              <div>
                <Label htmlFor="doctor">Select Doctor *</Label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem 
                        key={doctor.id} 
                        value={doctor.id}
                        disabled={!doctor.available}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-2">
                            <span>{doctor.name}</span>
                            {!doctor.available && (
                              <Badge variant="destructive" className="text-xs">
                                Unavailable
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {doctor.speciality} • ₹{doctor.consultationFee}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Appointment Type */}
              <div>
                <Label htmlFor="appointmentType">Appointment Type</Label>
                <Select value={appointmentType} onValueChange={setAppointmentType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">General Consultation</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="routine-checkup">Routine Checkup</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* HIPAA Regulations Checkbox */}
              <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Checkbox
                  id="hipaaRegulation"
                  checked={isHipaaRegulation}
                  onCheckedChange={(checked) => {
                    if (typeof checked === 'boolean') {
                      setIsHipaaRegulation(checked);
                    }
                  }}
                />
                <div className="flex flex-col">
                  <Label htmlFor="hipaaRegulation" className="text-blue-800 font-medium">
                    Mark as HIPAA Regulation Case
                  </Label>
                  <p className="text-xs text-blue-600">
                    This will alert the doctor during consultation about privacy regulations
                  </p>
                </div>
                <Shield className="h-5 w-5 text-blue-600 ml-auto" />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button type="button" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send WhatsApp
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Today's Appointments</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaysAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{appointment.patient}</span>
                        <Badge 
                          className={`${getStatusColor(appointment.status)} text-white`}
                        >
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(appointment.status)}
                            <span className="capitalize">{appointment.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{appointment.doctor}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-lg font-semibold">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <Badge variant="outline" className="mt-1">
                        {appointment.id}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {todaysAppointments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No appointments scheduled for today.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
