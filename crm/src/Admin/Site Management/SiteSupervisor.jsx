import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ClipboardList, UploadCloud, Hammer, AlertCircle } from "lucide-react";
import Nav from "../Nav";

export default function SiteSupervisor() {
  return (
    <div className="min-h-screen bg-black lg:ml-64">
  
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-600/10 to-transparent"></div>
      </div>

      <div className="relative z-10 flex">
        <Nav />

        
        <div className="flex-1 p-8 mt-16 md:mt-0">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">Site Supervisor Dashboard</h2>
            <p className="text-gray-400">Daily site operations and reporting</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-purple-400" /> Daily Attendance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <input type="text" placeholder="Worker Name" className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white" />
                    <select className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white">
                      <option>Present</option>
                      <option>Absent</option>
                      <option>Late</option>
                    </select>
                    <Button className="bg-purple-600 hover:bg-purple-700 w-full">Submit Attendance</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

           
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <UploadCloud className="w-5 h-5 text-purple-400" /> Upload Site Log
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <textarea placeholder="Daily summary..." className="w-full h-28 p-2 rounded bg-gray-900/50 border border-gray-700 text-white" />
                    <input type="file" className="text-white" />
                    <Button className="bg-purple-600 hover:bg-purple-700 w-full">Upload Log</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Hammer className="w-5 h-5 text-purple-400" /> Request Tools/Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <input type="text" placeholder="Tool/Resource Name" className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white" />
                    <input type="number" placeholder="Quantity" className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white" />
                    <Button className="bg-purple-600 hover:bg-purple-700 w-full">Send Request</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

           
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-purple-400" /> Report Issue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <select className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white">
                      <option>Injury</option>
                      <option>Theft</option>
                      <option>Delay</option>
                      <option>Other</option>
                    </select>
                    <textarea placeholder="Describe the issue..." className="w-full h-28 p-2 rounded bg-gray-900/50 border border-gray-700 text-white" />
                    <Button className="bg-red-600 hover:bg-red-700 w-full">Report</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
