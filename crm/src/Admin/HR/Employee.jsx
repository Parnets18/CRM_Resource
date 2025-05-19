import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, User, CalendarCheck, ClipboardList, Wallet, Download, Clock } from "lucide-react";
import Nav from "../Nav";

export default function Employee() {
 
  const attendanceRecords = [
    { date: "2024-03-15", status: "Present", time: "09:02 AM" },
    { date: "2024-03-14", status: "Late", time: "09:15 AM" },
    { date: "2024-03-13", status: "Present", time: "08:58 AM" }
  ];

  const leaveApplications = [
    { id: 1, type: "Vacation", start: "2024-04-01", end: "2024-04-05", status: "Pending" },
    { id: 2, type: "Sick", start: "2024-03-10", end: "2024-03-11", status: "Approved" }
  ];

  const payslips = [
    { month: "March 2024", downloadUrl: "#" },
    { month: "February 2024", downloadUrl: "#" },
    { month: "January 2024", downloadUrl: "#" }
  ];

  return (
    <div className="min-h-screen bg-black lg:ml-64">
     
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <Nav />

      
        <div className="flex-1 p-8 mt-16 md:mt-0">
        
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Employee Dashboard</h2>
              <p className="text-gray-400">Welcome back, John Doe</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-900/50">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           
            <div className="space-y-6">
             
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <User className="w-5 h-5" /> Personal Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center">
                      <User className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">John Doe</h3>
                      <p className="text-gray-400">Software Engineer</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="text-white">john.doe@company.com</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Department</p>
                      <p className="text-white">Engineering</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Join Date</p>
                      <p className="text-white">2022-01-15</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Leave Balance</p>
                      <p className="text-white">12 days</p>
                    </div>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

             
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5" /> Attendance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-900/50">
                    <div>
                      <p className="text-sm text-gray-400">Today's Status</p>
                      <p className="text-xl font-bold text-green-400">Present</p>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Clock className="w-4 h-4 mr-2" /> Mark Attendance
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-300">Recent Records</h4>
                    {attendanceRecords.map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                        <div>
                          <p className="text-sm text-white">{record.date}</p>
                          <p className="text-xs text-gray-400">{record.time}</p>
                        </div>
                        <span className={`text-sm ${
                          record.status === "Present" ? "text-green-400" : 
                          record.status === "Late" ? "text-yellow-400" : "text-red-400"
                        }`}>
                          {record.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            
            <div className="space-y-6">
       
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <ClipboardList className="w-5 h-5" /> Leave Application
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Leave Type</label>
                      <select className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white">
                        <option>Vacation</option>
                        <option>Sick</option>
                        <option>Personal</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Start Date</label>
                        <input type="date" className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">End Date</label>
                        <input type="date" className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Notes</label>
                      <textarea 
                        className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white" 
                        rows={3}
                      />
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Submit Application
                    </Button>
                  </form>

                  <div className="pt-4 border-t border-gray-800">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Recent Applications</h4>
                    {leaveApplications.map((application) => (
                      <div key={application.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 mb-2">
                        <div>
                          <p className="text-sm text-white">{application.type}</p>
                          <p className="text-xs text-gray-400">{application.start} to {application.end}</p>
                        </div>
                        <span className={`text-sm ${
                          application.status === "Approved" ? "text-green-400" :
                          application.status === "Pending" ? "text-yellow-400" : "text-red-400"
                        }`}>
                          {application.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Wallet className="w-5 h-5" /> Payslips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {payslips.map((payslip, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50 mb-2"
                      >
                        <span className="text-gray-300">{payslip.month}</span>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Download className="w-4 h-4 mr-2" /> Download
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}