import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, ClipboardList, Upload, AlertTriangle, Users, ChevronDown } from "lucide-react";
import Nav from "../Nav";

export default function SiteProject() {

  const tasks = [
    { id: 1, name: "Foundation Pouring", status: "In Progress", assigned: "John Smith", deadline: "2024-04-25" },
    { id: 2, name: "Steel Framing", status: "Delayed", assigned: "Sarah Wilson", deadline: "2024-04-28" }
  ];

  const manpower = [
    { trade: "Carpenters", allocated: 15, total: 20 },
    { trade: "Electricians", allocated: 8, total: 12 },
    { trade: "Plumbers", allocated: 6, total: 10 }
  ];

  const alerts = [
    { id: 1, message: "Concrete delivery delayed", severity: "high" },
    { id: 2, message: "Safety inspection pending", severity: "medium" }
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
              <h2 className="text-2xl font-bold text-white">Project Management Dashboard</h2>
              <p className="text-gray-400">Site: Downtown Tower Construction</p>
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
                    <ClipboardList className="w-5 h-5" /> Assign Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Task Name</label>
                      <input 
                        type="text" 
                        className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Assign To</label>
                      <select className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white">
                        <option value="">Select Team Member</option>
                        <option>Supervisor: John Smith</option>
                        <option>Worker: Mike Johnson</option>
                        <option>Worker: Sarah Wilson</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Deadline</label>
                        <input 
                          type="date" 
                          className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Priority</label>
                        <select className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white">
                          <option>Normal</option>
                          <option>High</option>
                          <option>Urgent</option>
                        </select>
                      </div>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Assign Task
                    </Button>
                  </form>
                </CardContent>
              </Card>

              
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="w-5 h-5" /> Manpower Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {manpower.map((group, index) => (
                      <div key={index} className="p-3 rounded-lg bg-gray-900/50">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">{group.trade}</span>
                          <span className="text-purple-400">{group.allocated}/{group.total}</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${(group.allocated/group.total)*100}%` }}
                          />
                        </div>
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
                    <ClipboardList className="w-5 h-5" /> Task Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map(task => (
                      <motion.div 
                        key={task.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-3 rounded-lg bg-gray-900/50"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-white">{task.name}</h3>
                            <p className="text-sm text-gray-400">{task.assigned}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 rounded-full text-sm ${
                              task.status === "In Progress" ? "bg-yellow-500/20 text-yellow-400" :
                              task.status === "Delayed" ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
                            }`}>
                              {task.status}
                            </span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Upload className="w-5 h-5" /> Daily Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-6 text-center">
                      <input type="file" className="hidden" id="file-upload" multiple />
                      <label 
                        htmlFor="file-upload" 
                        className="cursor-pointer text-purple-400 hover:text-purple-300"
                      >
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <p>Drag & drop photos/videos or click to upload</p>
                        <p className="text-xs text-gray-400 mt-1">Max file size: 2GB</p>
                      </label>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-300">Recent Uploads</h4>
                      <div className="flex flex-wrap gap-2">
                        <div className="p-2 rounded bg-gray-900/50 text-sm">report_0424.pdf</div>
                        <div className="p-2 rounded bg-gray-900/50 text-sm">site_photo1.jpg</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              
              <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" /> Site Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      Raise New Alert
                    </Button>
                    {alerts.map(alert => (
                      <div 
                        key={alert.id}
                        className="p-3 rounded-lg bg-red-500/10 border border-red-500/30"
                      >
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="text-sm text-white">{alert.message}</span>
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
    </div>
  );
}