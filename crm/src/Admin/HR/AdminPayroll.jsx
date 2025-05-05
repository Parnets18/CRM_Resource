import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { UserPlus, Wallet, Calendar, FileText, Clock, Download, Settings, Users } from "lucide-react";
import Nav from "../Nav";

export default function AdminPayroll() {
  return (
    <div className="min-h-screen bg-black">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        {/* Navigation would be here */}
        <Nav/>
        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">HR & Payroll Administration</h2>
              <p className="text-gray-400">Employee management and payroll configuration</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-900/50">
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          {/* HR Management Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* Create HR Manager Card */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-blue-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    HR Managers
                  </CardTitle>
                  <UserPlus className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="text-2xl font-bold text-white">3 HR Managers</div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Create New HR Manager
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Salary Structure Card */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-blue-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Salary Structures
                  </CardTitle>
                  <Wallet className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">5 Structures</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>Basic Pay</span>
                      <span>₹4.2L - ₹15.8L</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>Allowances</span>
                      <span>4 Types</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Leave Policy Card */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-blue-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Leave Policies
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">8 Policies</div>
                  <div className="flex gap-4 text-sm">
                    <div className="text-green-400">+2 New</div>
                    <div className="text-gray-400">12 Avg. Days/Month</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Attendance Tracking Card */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-blue-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Attendance
                  </CardTitle>
                  <Clock className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">94% Average</div>
                  <div className="flex gap-4 text-sm">
                    <div className="text-red-400">6% Absent</div>
                    <div className="text-gray-400">4 Late/Month</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reports Card */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="border border-blue-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">
                    Reports
                  </CardTitle>
                  <FileText className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Payroll Summary</span>
                    <Download className="h-4 w-4 text-blue-400 cursor-pointer" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Attendance Records</span>
                    <Download className="h-4 w-4 text-blue-400 cursor-pointer" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Tax Compliance</span>
                    <Download className="h-4 w-4 text-blue-400 cursor-pointer" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* System Alerts Section */}
          <Card className="border border-blue-500/20 bg-black/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">System Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Payroll Processing', 'Tax Filing Deadline', 'New HR Policy'].map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-300">
                      {item}
                    </p>
                    <p className="text-xs text-gray-500">Requires immediate attention</p>
                  </div>
                  <Button variant="outline" className="text-blue-400 border-blue-400/50">
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