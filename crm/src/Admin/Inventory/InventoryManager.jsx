import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, ClipboardList, AlertCircle, ArrowUp, Clock, Warehouse, Construction } from "lucide-react";
import Nav from "../Nav";

export default function InventoryManager() {
 
  const indentRequests = [
    { id: 1, project: "Highrise Tower", materials: "Steel Beams, Concrete", status: "pending", urgent: true },
    { id: 2, project: "Shopping Complex", materials: "Electrical Wiring, PVC Pipes", status: "pending", urgent: false },
    { id: 3, project: "Residential Block", materials: "Cement, Tiles", status: "pending", urgent: true }
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
              <p className="text-gray-400">Material requests and project oversight</p>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-900/50">
              <Bell className="w-5 h-5" />
            </Button>
          </div>

        

        
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Pending Indent Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {indentRequests.map((request) => (
                  <motion.div 
                    key={request.id}
                    whileHover={{ x: 5 }}
                    className="group flex items-center justify-between p-3 rounded-lg bg-gray-900/50 relative"
                  >
                    {request.urgent && (
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-red-500 rounded-full"></div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-300">
                        {request.project}
                        {request.urgent && (
                          <span className="ml-2 px-2 py-1 bg-red-900/50 text-red-400 text-xs rounded-full">Urgent</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">{request.materials}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                      <Button size="sm" variant="destructive">Reject</Button>
                      {request.urgent && (
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

           
            <Card className="border border-purple-500/20 bg-black/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Project Prioritization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-gray-900/50">
                  <p className="text-sm font-medium text-gray-300 mb-4">Active Projects</p>
                  <div className="space-y-3">
                    {[
                      { id: 1, name: "Highrise Tower", progress: "75%", priority: 1 },
                      { id: 2, name: "Shopping Complex", progress: "45%", priority: 2 },
                      { id: 3, name: "Residential Block", progress: "30%", priority: 3 }
                    ].map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-800/50">
                        <div className="flex items-center gap-3">
                          <Construction className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-gray-300">{project.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{project.progress}</span>
                          <Button 
                            size="sm" 
                            className="bg-purple-600 hover:bg-purple-700"
                            disabled={project.priority === 1}
                          >
                            <ArrowUp className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Update Project Priorities
                </Button>
              </CardContent>
            </Card>
          </div> 
        </div>
      </div>
    </div>
  );
}