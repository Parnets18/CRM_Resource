import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Bell, ClipboardList, CheckCircle, AlertTriangle, Clock, Users } from "lucide-react";
import Nav from "../Nav";

export default function SalesProject() {
 
  const projects = [
    { id: 1, name: "Website Redesign", client: "Acme Corp" },
    { id: 2, name: "Mobile App Development", client: "StartUp Inc" }
  ];

  const tasks = [
    { id: 1, name: "UI Design", status: "completed", assigned: "Design Team" },
    { id: 2, name: "API Integration", status: "in-progress", assigned: "Dev Team" },
    { id: 3, name: "QA Testing", status: "pending", assigned: "Testing Team" }
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
              <p className="text-gray-400">Project tracking and task management</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-900/50">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

         

          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Generate Work Order</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Select>
                    <SelectTrigger className="w-full bg-gray-900/50 border border-gray-700 text-white">
                      <SelectValue placeholder="Select Project" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border border-gray-700 text-white">
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id.toString()}>
                          {project.name} - {project.client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="w-full bg-gray-900/50 border border-gray-700 text-white">
                      <SelectValue placeholder="Select Task" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border border-gray-700 text-white">
                      {tasks.map((task) => (
                        <SelectItem key={task.id} value={task.id.toString()}>
                          {task.name} ({task.assigned})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="date" 
                      placeholder="Due Date" 
                      className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                    />
                    <input 
                      type="number" 
                      placeholder="Estimated Hours" 
                      className="w-full p-2 rounded bg-gray-900/50 border border-gray-700 text-white"
                    />
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <ClipboardList className="w-4 h-4 mr-2" /> Create Work Order
                  </Button>
                </form>
              </CardContent>
            </Card>

           
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Active Work Orders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tasks.map((task) => (
                  <motion.div 
                    key={task.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-300">{task.name}</p>
                      <p className="text-xs text-gray-500">{task.assigned}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.status === 'completed' ? 'bg-green-900/50 text-green-400' :
                        task.status === 'in-progress' ? 'bg-yellow-900/50 text-yellow-400' :
                        'bg-gray-800 text-gray-400'
                      }`}>
                        {task.status}
                      </span>
                      {task.status === 'completed' && (
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Notify Billing
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Billing Ready Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tasks.filter(t => t.status === 'completed').map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                  <div>
                    <p className="text-sm font-medium text-gray-300">{task.name}</p>
                    <p className="text-xs text-gray-500">Completed: {new Date().toLocaleDateString()}</p>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" /> Mark as Billed
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}