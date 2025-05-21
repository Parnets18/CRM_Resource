import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { UserPlus, Wallet, Calendar, FileText, Clock, Download, Settings, Users } from "lucide-react";
import Nav from "../Nav";

export default function AdminPayroll() {
  return (
    <div className="min-h-screen bg-white lg:ml-64">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/30 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-300/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        
        <Nav/>
       
        <div className="flex-1 p-8 mt-16 md:mt-0">
        
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-black">HR & Payroll Administration</h2>
              <p className="text-gray-600">Employee management and payroll configuration</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100/50">
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-black">
                    HR Managers
                  </CardTitle>
                  <UserPlus className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="text-2xl font-bold text-black">3 HR Managers</div>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Create New HR Manager
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

         
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-black">
                    Salary Structures
                  </CardTitle>
                  <Wallet className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black mb-2">5 Structures</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>Basic Pay</span>
                      <span>₹4.2L - ₹15.8L</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>Allowances</span>
                      <span>4 Types</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

         
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-black">
                    Leave Policies
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black mb-2">8 Policies</div>
                  <div className="flex gap-4 text-sm">
                    <div className="text-green-600">+2 New</div>
                    <div className="text-gray-600">12 Avg. Days/Month</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-black">
                    Attendance
                  </CardTitle>
                  <Clock className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-black mb-2">94% Average</div>
                  <div className="flex gap-4 text-sm">
                    <div className="text-red-600">6% Absent</div>
                    <div className="text-gray-600">4 Late/Month</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

         
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-black">
                    Reports
                  </CardTitle>
                  <FileText className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Payroll Summary</span>
                    <Download className="h-4 w-4 text-purple-600 cursor-pointer" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Attendance Records</span>
                    <Download className="h-4 w-4 text-purple-600 cursor-pointer" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Tax Compliance</span>
                    <Download className="h-4 w-4 text-purple-600 cursor-pointer" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

        
          <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-black">System Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Payroll Processing', 'Tax Filing Deadline', 'New HR Policy'].map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-100/50"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-700">
                      {item}
                    </p>
                    <p className="text-xs text-gray-500">Requires immediate attention</p>
                  </div>
                  <Button variant="outline" className="text-purple-600 border-purple-400/50">
                    Resolve
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}