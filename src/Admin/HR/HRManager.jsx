import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, UserPlus, CalendarCheck, ClipboardList, Wallet, Mail, BadgeCheck, Users } from "lucide-react";
import Nav from "../Nav";

export default function HRManager() {
  
  const leaveRequests = [
    { id: 1, name: "John Doe", type: "Vacation", days: 5, status: "pending" },
    { id: 2, name: "Jane Smith", type: "Sick", days: 2, status: "pending" }
  ];

  const recentPayslips = [
    { id: 1, month: "March 2024", sent: true },
    { id: 2, month: "February 2024", sent: false }
  ];

  return (
    <div className="min-h-screen bg-white lg:ml-64 ">
    
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/30 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-300/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <Nav />

        <div className="flex-1 p-8 mt-16 md:mt-0">
         
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-black">HR Management Dashboard</h2>
              <p className="text-gray-600">Employee management portal</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100/50">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Employee Management</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="First Name" 
                      className="w-full p-2 rounded bg-gray-100/50 border border-gray-300 text-black"
                    />
                    <input 
                      type="text" 
                      placeholder="Last Name" 
                      className="w-full p-2 rounded bg-gray-100/50 border border-gray-300 text-black"
                    />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full p-2 rounded bg-gray-100/50 border border-gray-300 text-black"
                  />
                  <div className="flex gap-4">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <UserPlus className="w-4 h-4 mr-2" /> Add Employee
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Attendance Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100/50">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Today's Present</p>
                      <p className="text-2xl font-bold text-black">132</p>
                    </div>
                    <BadgeCheck className="text-green-500 w-8 h-8" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100/50">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Absent Today</p>
                      <p className="text-2xl font-bold text-black">10</p>
                    </div>
                    <CalendarCheck className="text-red-500 w-8 h-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Leave Management Card */}
            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Leave Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {leaveRequests.map((request) => (
                  <motion.div 
                    key={request.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-100/50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-700">{request.name}</p>
                      <p className="text-xs text-gray-500">{request.type} - {request.days} days</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                      <Button size="sm" variant="destructive">Reject</Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Payroll Management Card */}
            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black">Payroll Processing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Process Monthly Payroll
                </Button>
                <div className="space-y-2">
                  {recentPayslips.map((payslip) => (
                    <div key={payslip.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-100/50">
                      <span className="text-gray-700">{payslip.month}</span>
                      <div className="flex items-center gap-2">
                        {payslip.sent ? (
                          <Mail className="w-4 h-4 text-green-500" />
                        ) : (
                          <Button size="sm">Send Payslip</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}