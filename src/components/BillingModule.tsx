
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IndianRupee, CreditCard, Smartphone, Banknote, Download, Send, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BillingModuleProps {
  userRole: 'admin' | 'doctor' | 'receptionist';
}

const BillingModule = ({ userRole }: BillingModuleProps) => {
  const { toast } = useToast();
  const [selectedPatient, setSelectedPatient] = useState("");
  const [consultationFee, setConsultationFee] = useState(500);
  const [additionalItems, setAdditionalItems] = useState<Array<{
    description: string;
    amount: number;
  }>>([]);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemAmount, setNewItemAmount] = useState("");

  // Mock data
  const completedConsultations = [
    { 
      id: "CON001", 
      patientId: "PAT123456", 
      patientName: "Rajesh Kumar", 
      doctorName: "Dr. Rajesh Sharma", 
      consultationFee: 500,
      appointmentId: "APT001"
    },
    { 
      id: "CON002", 
      patientId: "PAT123457", 
      patientName: "Priya Sharma", 
      doctorName: "Dr. Priya Patel", 
      consultationFee: 600,
      appointmentId: "APT002"
    },
  ];

  const recentBills = [
    { id: "INV001", patient: "Rajesh Kumar", amount: 525, date: "2024-01-15", status: "paid" },
    { id: "INV002", patient: "Priya Sharma", amount: 630, date: "2024-01-15", status: "pending" },
    { id: "INV003", patient: "Amit Patel", amount: 450, date: "2024-01-14", status: "paid" },
  ];

  const calculateSubtotal = () => {
    const itemsTotal = additionalItems.reduce((sum, item) => sum + item.amount, 0);
    return consultationFee + itemsTotal;
  };

  const calculateGST = () => {
    return Math.round(calculateSubtotal() * 0.18); // 18% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST() - discount;
  };

  const addAdditionalItem = () => {
    if (newItemDescription && newItemAmount) {
      setAdditionalItems([
        ...additionalItems,
        { description: newItemDescription, amount: parseFloat(newItemAmount) }
      ]);
      setNewItemDescription("");
      setNewItemAmount("");
    }
  };

  const removeAdditionalItem = (index: number) => {
    setAdditionalItems(additionalItems.filter((_, i) => i !== index));
  };

  const generateInvoiceId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `INV${timestamp}${random}`;
  };

  const handleCreateBill = () => {
    if (!selectedPatient || !paymentMethod) {
      toast({
        title: "Missing Information",
        description: "Please select patient and payment method.",
        variant: "destructive",
      });
      return;
    }

    const invoiceId = generateInvoiceId();
    const selectedConsultation = completedConsultations.find(c => c.id === selectedPatient);
    
    console.log("Creating bill:", {
      invoiceId,
      patient: selectedConsultation?.patientName,
      subtotal: calculateSubtotal(),
      gst: calculateGST(),
      discount,
      total: calculateTotal(),
      paymentMethod,
      additionalItems
    });

    toast({
      title: "Bill Created Successfully",
      description: `Invoice ID: ${invoiceId}. Total: ₹${calculateTotal()}`,
    });

    // Reset form
    setSelectedPatient("");
    setAdditionalItems([]);
    setDiscount(0);
    setPaymentMethod("");
    setConsultationFee(500);
  };

  const canEdit = userRole === 'admin';
  const canDelete = userRole === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Billing & Invoicing</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Role: {userRole}</Badge>
          {userRole === 'receptionist' && (
            <Badge variant="secondary">Create & View Only</Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create New Bill */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <IndianRupee className="h-5 w-5" />
              <span>Create New Bill</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Patient Selection */}
            <div>
              <Label htmlFor="patient">Select Completed Consultation *</Label>
              <Select value={selectedPatient} onValueChange={(value) => {
                setSelectedPatient(value);
                const consultation = completedConsultations.find(c => c.id === value);
                if (consultation) {
                  setConsultationFee(consultation.consultationFee);
                }
              }}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose patient consultation" />
                </SelectTrigger>
                <SelectContent>
                  {completedConsultations.map((consultation) => (
                    <SelectItem key={consultation.id} value={consultation.id}>
                      <div className="flex flex-col">
                        <span>{consultation.patientName}</span>
                        <span className="text-xs text-gray-500">
                          {consultation.doctorName} • ₹{consultation.consultationFee}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bill Details */}
            {selectedPatient && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="consultationFee">Consultation Fee</Label>
                    <Input
                      id="consultationFee"
                      type="number"
                      value={consultationFee}
                      onChange={(e) => setConsultationFee(parseFloat(e.target.value) || 0)}
                      readOnly={!canEdit}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="discount">Discount (₹)</Label>
                    <Input
                      id="discount"
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Additional Items */}
                <div className="space-y-3">
                  <Label>Additional Items</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Item description"
                      value={newItemDescription}
                      onChange={(e) => setNewItemDescription(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={newItemAmount}
                      onChange={(e) => setNewItemAmount(e.target.value)}
                      className="w-32"
                    />
                    <Button onClick={addAdditionalItem}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {additionalItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span>{item.description}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">₹{item.amount}</span>
                        <Button size="sm" variant="outline" onClick={() => removeAdditionalItem(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bill Summary */}
                <Card className="bg-gray-50">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{calculateSubtotal()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (18%):</span>
                      <span>₹{calculateGST()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount:</span>
                      <span>-₹{discount}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <div>
                  <Label htmlFor="paymentMethod">Payment Method *</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">
                        <div className="flex items-center space-x-2">
                          <Banknote className="h-4 w-4" />
                          <span>Cash</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="upi">
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-4 w-4" />
                          <span>UPI</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="card">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Card</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Generate PDF
                  </Button>
                  <Button variant="outline">
                    <Send className="h-4 w-4 mr-2" />
                    Send WhatsApp
                  </Button>
                  <Button 
                    onClick={handleCreateBill}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <IndianRupee className="h-4 w-4 mr-2" />
                    Create Bill
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Recent Bills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <IndianRupee className="h-5 w-5" />
              <span>Recent Bills</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBills.map((bill) => (
              <Card key={bill.id} className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{bill.patient}</span>
                        <Badge 
                          className={bill.status === 'paid' ? 'bg-green-500' : 'bg-orange-500'}
                        >
                          {bill.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {bill.date} • {bill.id}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">₹{bill.amount}</div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        {canEdit && (
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        )}
                        {canDelete && (
                          <Button size="sm" variant="outline" className="text-red-600">
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {recentBills.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <IndianRupee className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No bills created yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillingModule;
