import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, UserPlus, CalendarCheck, ClipboardList, Wallet, Mail, BadgeCheck, Users } from "lucide-react";
import Nav from "../Nav";

export default function HRManager() {
  // Sample data
  const leaveRequests = [
    { id: 1, name: "John Doe", type: "Vacation", days: 5, status: "pending" },
    { id: 2, name: "Jane Smith", type: "Sick", days: 2, status: "pending" }
  ];

  const recentPayslips = [
    { id: 1, month: "March 2024", sent: true },
    { id: 2, month: "February 2024", sent: false }
  ];

  return (
    <div className="min-h-screen bg-black lg:ml-64">
    
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <Nav />

        <div className="flex-1 p-8">
         
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">HR Management Dashboard</h2>
              <p className="text-gray-400">Employee management portal</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-900/50">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Employees Card */}
            {/* <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Total Employees
                  </CardTitle>
                  <Users className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">142</div>
                  <p className="text-xs text-green-400">+5 this month</p>
                </CardContent>
              </Card>
            </motion.div> */}

            {/* Pending Leaves Card */}
            {/* <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Pending Leaves
                  </CardTitle>
                  <ClipboardList className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">8</div>
                  <p className="text-xs text-red-400">3 overdue</p>
                </CardContent>
              </Card>
            </motion.div> */}

            {/* Attendance Card */}
            {/* <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Monthly Attendance
                  </CardTitle>
                  <CalendarCheck className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">94%</div>
                  <p className="text-xs text-green-400">+2% from last month</p>
                </CardContent>
              </Card>
            </motion.div> */}

            {/* Payroll Card */}
            {/* <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Payroll Status
                  </CardTitle>
                  <Wallet className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">$1.2M</div>
                  <p className="text-xs text-green-400">Due in 3 days</p>
                </CardContent>
              </Card>
            </motion.div> */}
          </div>

         
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Employee Management</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="First Name" 
                      className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                    />
                    <input 
                      type="text" 
                      placeholder="Last Name" 
                      className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                    />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                  />
                  <div className="flex gap-4">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <UserPlus className="w-4 h-4 mr-2" /> Add Employee
                    </Button>
                    
                  </div>
                </form>
              </CardContent>
            </Card>

           
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Attendance Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                    <div>
                      <p className="text-sm font-medium text-gray-300">Today's Present</p>
                      <p className="text-2xl font-bold text-white">132</p>
                    </div>
                    <BadgeCheck className="text-green-400 w-8 h-8" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                    <div>
                      <p className="text-sm font-medium text-gray-300">Absent Today</p>
                      <p className="text-2xl font-bold text-white">10</p>
                    </div>
                    <CalendarCheck className="text-red-400 w-8 h-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Leave Management Card */}
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Leave Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {leaveRequests.map((request) => (
                  <motion.div 
                    key={request.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-300">{request.name}</p>
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
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Payroll Processing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Process Monthly Payroll
                </Button>
                <div className="space-y-2">
                  {recentPayslips.map((payslip) => (
                    <div key={payslip.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                      <span className="text-gray-300">{payslip.month}</span>
                      <div className="flex items-center gap-2">
                        {payslip.sent ? (
                          <Mail className="w-4 h-4 text-green-400" />
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