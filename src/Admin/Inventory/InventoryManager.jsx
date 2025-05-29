import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, ClipboardList, AlertCircle, ArrowUp, Clock, Warehouse, Construction, Check, X, ChevronUp, ChevronDown } from "lucide-react";
import Nav from "../Nav"; 

export default function InventoryManager() {
  const [indentRequests, setIndentRequests] = useState([
    { id: 1, project: "Highrise Tower", materials: "Steel Beams, Concrete", status: "pending", urgent: true, timestamp: "2 hours ago" },
    { id: 2, project: "Shopping Complex", materials: "Electrical Wiring, PVC Pipes", status: "pending", urgent: false, timestamp: "4 hours ago" },
    { id: 3, project: "Residential Block", materials: "Cement, Tiles", status: "pending", urgent: true, timestamp: "1 hour ago" }
  ]);

  const [projects, setProjects] = useState([
    { id: 1, name: "Highrise Tower", progress: 75, priority: 1, status: "active" },
    { id: 2, name: "Shopping Complex", progress: 45, priority: 2, status: "active" },
    { id: 3, name: "Residential Block", progress: 30, priority: 3, status: "active" }
  ]);

  const [notifications, setNotifications] = useState(3);
  const [actionHistory, setActionHistory] = useState([]);

  const handleApprove = (requestId) => {
    setIndentRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: "approved" }
        : req
    ));
    
    const request = indentRequests.find(req => req.id === requestId);
    setActionHistory(prev => [...prev, {
      id: Date.now(),
      action: "approved",
      project: request.project,
      timestamp: new Date().toLocaleTimeString()
    }]);
    
    setNotifications(prev => Math.max(0, prev - 1));
  };

  const handleReject = (requestId) => {
    setIndentRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: "rejected" }
        : req
    ));
    
    const request = indentRequests.find(req => req.id === requestId);
    setActionHistory(prev => [...prev, {
      id: Date.now(),
      action: "rejected",
      project: request.project,
      timestamp: new Date().toLocaleTimeString()
    }]);
    
    setNotifications(prev => Math.max(0, prev - 1));
  };

  const handlePriorityUp = (requestId) => {
    const request = indentRequests.find(req => req.id === requestId);
    if (request && !request.urgent) {
      setIndentRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { ...req, urgent: true }
          : req
      ));
      
      setActionHistory(prev => [...prev, {
        id: Date.now(),
        action: "prioritized",
        project: request.project,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  };

  const moveProjectPriority = (projectId, direction) => {
    setProjects(prev => {
      const projectIndex = prev.findIndex(p => p.id === projectId);
      const project = prev[projectIndex];
      
      if (direction === 'up' && project.priority > 1) {
        const newPriority = project.priority - 1;
        const otherProject = prev.find(p => p.priority === newPriority);
        
        return prev.map(p => {
          if (p.id === projectId) return { ...p, priority: newPriority };
          if (p.id === otherProject.id) return { ...p, priority: project.priority };
          return p;
        });
      } else if (direction === 'down' && project.priority < prev.length) {
        const newPriority = project.priority + 1;
        const otherProject = prev.find(p => p.priority === newPriority);
        
        return prev.map(p => {
          if (p.id === projectId) return { ...p, priority: newPriority };
          if (p.id === otherProject.id) return { ...p, priority: project.priority };
          return p;
        });
      }
      
      return prev;
    });
  };

  const updateAllPriorities = () => {
    setActionHistory(prev => [...prev, {
      id: Date.now(),
      action: "updated priorities",
      project: "All Projects",
      timestamp: new Date().toLocaleTimeString()
    }]);
    
    // Simulate priority update
    alert("Project priorities have been updated and saved to the system!");
  };

  const pendingRequests = indentRequests.filter(req => req.status === "pending");
  const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority);

  return (
    <div className="min-h-screen bg-white ml-64">
        <Nav/>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200/30 via-gray-100 to-white"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-300/10 to-transparent"></div>
      </div>

      <div className="relative z-10 p-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-black">Project Management Dashboard</h2>
            <p className="text-gray-600">Material requests and project oversight</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              {pendingRequests.length} pending requests
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-700 hover:bg-gray-100/50 relative"
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-black flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Pending Indent Requests ({pendingRequests.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Check className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  All requests processed!
                </div>
              ) : (
                pendingRequests.map((request) => (
                  <div 
                    key={request.id}
                    className="group flex items-center justify-between p-4 rounded-lg bg-gray-100/50 relative border-l-4 border-l-transparent hover:border-l-purple-500 transition-all duration-200"
                  >
                    {request.urgent && (
                      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-red-500 rounded-full"></div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-700">{request.project}</p>
                        {request.urgent && (
                          <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{request.materials}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {request.timestamp}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(request.id)}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleReject(request.id)}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      {!request.urgent && (
                        <Button 
                          size="sm" 
                          className="bg-purple-600 hover:bg-purple-700"
                          onClick={() => handlePriorityUp(request.id)}
                          title="Mark as urgent"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            
            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Construction className="w-5 h-5" />
                  Project Priorities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {sortedProjects.map((project) => (
                    <div key={project.id} className="p-3 rounded-lg bg-gray-100/50 border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                            {project.priority}
                          </span>
                          <span className="text-sm font-medium text-gray-700">{project.name}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => moveProjectPriority(project.id, 'up')}
                            disabled={project.priority === 1}
                          >
                            <ChevronUp className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="h-6 w-6 p-0"
                            onClick={() => moveProjectPriority(project.id, 'down')}
                            disabled={project.priority === projects.length}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{project.progress}% complete</div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={updateAllPriorities}
                >
                  <Warehouse className="w-4 h-4 mr-2" />
                  Save Priority Changes
                </Button>
              </CardContent>
            </Card>

            
            <Card className="border border-purple-500/20 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-black text-sm">Recent Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {actionHistory.length === 0 ? (
                    <p className="text-xs text-gray-500">No recent actions</p>
                  ) : (
                    actionHistory.slice(-5).reverse().map((action) => (
                      <div key={action.id} className="text-xs p-2 bg-gray-50 rounded">
                        <span className="font-medium capitalize">{action.action}</span> {action.project}
                        <div className="text-gray-500">{action.timestamp}</div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}