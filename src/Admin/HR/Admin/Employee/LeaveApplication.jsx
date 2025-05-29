import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Calendar, FileText } from "lucide-react";
import { useState } from "react";
import Nav from "@/Admin/Nav";
export default function LeaveApplication() {
  const [leaveForm, setLeaveForm] = useState({
    leaveType: "Vacation",
    startDate: "",
    endDate: "",
    notes: ""
  });

  const [leaveApplications, setLeaveApplications] = useState([
    { id: 1, type: "Vacation", start: "2024-04-01", end: "2024-04-05", status: "Pending", notes: "Family vacation" },
    { id: 2, type: "Sick", start: "2024-03-10", end: "2024-03-11", status: "Approved", notes: "Flu symptoms" },
    { id: 3, type: "Personal", start: "2024-02-15", end: "2024-02-15", status: "Approved", notes: "Personal appointment" }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!leaveForm.startDate || !leaveForm.endDate) {
      alert("Please fill in all required fields");
      return;
    }

    const newApplication = {
      id: Date.now(),
      type: leaveForm.leaveType,
      start: leaveForm.startDate,
      end: leaveForm.endDate,
      status: "Pending",
      notes: leaveForm.notes
    };

    setLeaveApplications(prev => [newApplication, ...prev]);
    setLeaveForm({
      leaveType: "Vacation",
      startDate: "",
      endDate: "",
      notes: ""
    });

    alert("Leave application submitted successfully!");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600 bg-green-100/50";
      case "Pending":
        return "text-yellow-600 bg-yellow-100/50";
      case "Rejected":
        return "text-red-600 bg-red-100/50";
      default:
        return "text-gray-600 bg-gray-100/50";
    }
  };

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  return (
    <div className="ml-64">
     <Nav/>
      <div className="min-h-screen bg-white p-8">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/30 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-300/10 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black">Leave Management</h2>
          <p className="text-gray-600">Apply for leave and track your applications</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leave Application Form */}
          <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <ClipboardList className="w-5 h-5" /> Apply for Leave
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Leave Type *</label>
                  <select 
                    name="leaveType"
                    value={leaveForm.leaveType}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-gray-100/50 border border-gray-300 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Vacation">Vacation Leave</option>
                    <option value="Sick">Sick Leave</option>
                    <option value="Personal">Personal Leave</option>
                    <option value="Emergency">Emergency Leave</option>
                    <option value="Maternity">Maternity Leave</option>
                    <option value="Paternity">Paternity Leave</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Start Date *</label>
                    <input 
                      type="date" 
                      name="startDate"
                      value={leaveForm.startDate}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-gray-100/50 border border-gray-300 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">End Date *</label>
                    <input 
                      type="date" 
                      name="endDate"
                      value={leaveForm.endDate}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-gray-100/50 border border-gray-300 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                      required
                    />
                  </div>
                </div>

                {leaveForm.startDate && leaveForm.endDate && (
                  <div className="p-3 bg-purple-100/50 rounded-lg">
                    <p className="text-sm text-purple-700">
                      Total Days: <span className="font-semibold">{calculateDays(leaveForm.startDate, leaveForm.endDate)} days</span>
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Reason/Notes</label>
                  <textarea 
                    name="notes"
                    value={leaveForm.notes}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg bg-gray-100/50 border border-gray-300 text-black focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                    rows={4}
                    placeholder="Please provide reason for leave..."
                  />
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Leave Balance */}
          <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Leave Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-blue-100/50">
                  <p className="text-2xl font-bold text-blue-600">12</p>
                  <p className="text-sm text-gray-600">Available Days</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-orange-100/50">
                  <p className="text-2xl font-bold text-orange-600">8</p>
                  <p className="text-sm text-gray-600">Used Days</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Leave Types</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded bg-gray-100/50">
                    <span className="text-sm text-gray-700">Annual Leave</span>
                    <span className="text-sm font-medium text-black">10/20 days</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-gray-100/50">
                    <span className="text-sm text-gray-700">Sick Leave</span>
                    <span className="text-sm font-medium text-black">2/10 days</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-gray-100/50">
                    <span className="text-sm text-gray-700">Personal Leave</span>
                    <span className="text-sm font-medium text-black">0/5 days</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leave Applications History */}
        <Card className="mt-6 border border-purple-500/20 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-black flex items-center gap-2">
              <ClipboardList className="w-5 h-5" /> Application History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaveApplications.map((application) => (
                <div key={application.id} className="p-4 rounded-lg bg-gray-100/50 hover:bg-gray-200/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium text-black">{application.type} Leave</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {calculateDays(application.start, application.end)} days
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{application.start} to {application.end}</span>
                  </div>
                  {application.notes && (
                    <p className="text-sm text-gray-700 mt-2">{application.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
   
  );
}